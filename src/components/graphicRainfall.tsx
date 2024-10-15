import { StackScreenProps } from '@react-navigation/stack';
import { Circle, useFont } from '@shopify/react-native-skia';
import { format, formatDate } from 'date-fns';
import React from 'react';
import { useEffect, useState } from 'react';
import { View, TextInput, Text, ActivityIndicator } from 'react-native';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { fetchPluviTemp } from '~/api/getPluvTemp';
import { TempPluvData } from '~/types/resquestTempPluv';



/*const DATA = [
  { day: new Date('2024-08-10').getTime(), rainfall: 50 },
  { day: new Date('2024-08-11').getTime(), rainfall: 30 },
];*/

interface DataPoint {
  day: number; // Timestamp do dia
  rainfall: number; // Chuva registrada
}


Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextImput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

type ParamList = {
  search: undefined;
  result: {
    latNumber: number;
    longNumber: number;
    startDateNumber: number;
    endDateNumber: number;
  };
};
type Props = StackScreenProps<ParamList, 'result'>;

const GraphicRainfall: React.FC<Props> = ({ route }) => {
  const params = route.params;
  const { state, isActive } = useChartPressState({ x: 0, y: { rainfall: 0 } });
  const font = useFont(require('src/fonts/Inter_24pt-Regular.ttf'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataPluvTemp, setDataPluvTemp] = React.useState<TempPluvData>({
    message: '',
    status: '',
    data: [],
  });
  const [data, setData] = useState<DataPoint[]>([]);


  useEffect(() => {
    (async () => {
      try {
        const data: TempPluvData = await fetchPluviTemp({
          latitude: params.latNumber,
          longitude: params.longNumber,
          startDate: params.startDateNumber,
          endDate: params.endDateNumber,
        });

        setDataPluvTemp(data);

        const formattedData = dataPluvTemp.data.map(item => ({
          day: new Date(item.day).getTime(),
          rainfall: item.precipitation,
        }));

        setData(formattedData)

      } catch (error) {
        setError('Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);



  const animatedText = useAnimatedProps(() => {
    const value = state?.y?.rainfall?.value?.value || 0;
    return {
      text: `${value.toFixed(2)} mm`,  // Certifique-se de que o valor é uma string
      defaultValue: '',
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const dateValue = state?.x?.value?.value || Date.now();  // Verifica se o valor de data existe, caso contrário, usa a data atual
    const date = new Date(dateValue);
    return {
      text: `${date.toLocaleDateString('pt-BR')}`,
      defaultValue: '',
    };
  });

  return (
    <View>
      <View style={{ width: '90%', height: 300, margin: 'auto', marginBottom: 30 }}>
        {isActive && (
          <View>
            <AnimatedTextImput
              editable={false}
              underlineColorAndroid="transparent"
              style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}
              animatedProps={animatedText}
              
            />

            <AnimatedTextImput
              editable={false}
              underlineColorAndroid="transparent"
              animatedProps={animatedDateText}
            />
          </View>
        )}
        {!isActive && data.length > 0 ? (
          <View>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>
              {`${data[data.length - 1]?.rainfall?.toFixed(2) || '0'} mm`} {/* Convertendo para string */}
            </Text>
          </View>
        ) : (
          <Text style={{ fontSize: 18, color: '#000' }}>
            Nenhum dado disponível
          </Text>
        )}
        {dataPluvTemp.data.map((item, index)=> {
          return( 
          <CartesianChart
            data={data.length > 0 ? data : [{ day: Date.now(), rainfall: 0 }]}  // Garante que sempre haja dados válidos
            xKey={item.day}
            yKeys={item.precipitation}
            chartPressState={state}
            axisOptions={{
              labelOffset: { x: 3, y: 2 },
              labelPosition: 'outset',
              font,
              formatYLabel: (value) => `${value}`,
              formatXLabel: (value) => {
                const dateValue = isNaN(value) ? Date.now() : value; // Use um valor padrão se value não for válido
                return format(new Date(dateValue), 'MM/yy');
              }}}>
            {({ points }) => (
              <>
                <Line points={points.rainfall || []} color="blue" strokeWidth={3} />  // Garante que points.rainfall não seja undefined
                {isActive && points.rainfall && points.rainfall.length > 0 && (
                  <ToolTip x={state.x.position} y={state.y.rainfall.position} />
                )}
              </>
            )}
          </CartesianChart>)
        })}
        
      </View>
    </View>
  );
}

export default GraphicRainfall;
