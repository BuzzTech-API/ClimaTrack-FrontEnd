import { StackScreenProps } from '@react-navigation/stack';
import { Circle, useFont } from '@shopify/react-native-skia';
import { format } from 'date-fns';
import React from 'react';
import { useEffect, useState } from 'react';
import { View, TextInput, Text, ActivityIndicator } from 'react-native';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { fetchPluviTemp } from '~/api/getPluvTemp';
import { TempPluvData } from '~/types/resquestTempPluv';



const DATA = [
  { day: new Date('2024-08-10').getTime(), rainfall: 50 },
  { day: new Date('2024-08-11').getTime(), rainfall: 30 },
  { day: new Date('2024-08-12').getTime(), rainfall: 60 },
  { day: new Date('2024-08-13').getTime(), rainfall: 20 },
  { day: new Date('2024-08-14').getTime(), rainfall: 80 },
  { day: new Date('2024-08-16').getTime(), rainfall: 10 },
  { day: new Date('2024-08-17').getTime(), rainfall: 15 },
  { day: new Date('2024-08-18').getTime(), rainfall: 20 },
  { day: new Date('2024-08-19').getTime(), rainfall: 85 },
];

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
        const fetchedData: TempPluvData = await fetchPluviTemp({
          latitude: params.latNumber,
          longitude: params.longNumber,
          startDate: params.startDateNumber,
          endDate: params.endDateNumber,
        });

        setDataPluvTemp(fetchedData);

        const formattedData = fetchedData.data.map(item => ({
          day: new Date(item.day).getTime(),
          rainfall: item.precipitation,
        }));   

        setData(formattedData)
        console.log(fetchedData);
        ;
      } catch (error) {
        setError('Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);



  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.rainfall.value.value.toFixed(2)} mm`,
      defaultValue: '',
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString('pt-BR')}`,
      defaultValue: '',
    };
  });

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }


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
        {!isActive && (
          <View>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>
              {data[data.length - 1].rainfall.toFixed(2)}mm
            </Text>
            <Text>Hoje</Text>
          </View>
        )}
        <CartesianChart
          data={data}
          xKey="day"
          yKeys={['rainfall']}
          chartPressState={state}
          axisOptions={{
            tickCount: 10,
            labelOffset: { x: 3, y: 2 },
            labelPosition: 'outset',
            font,
            formatYLabel: (value) => `${value}`,
            formatXLabel: (value) => format(new Date(), 'MM/yy'),
          }}>
          {({ points }) => (
            <>
              <Line points={points.rainfall} color="blue" strokeWidth={3} />
              {isActive && <ToolTip x={state.x.position} y={state.y.rainfall.position} />}
            </>
          )}
        </CartesianChart>
      </View>
    </View>
  );
}

export default GraphicRainfall;
