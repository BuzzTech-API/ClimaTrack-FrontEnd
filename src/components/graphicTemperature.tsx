import { Circle, useFont } from '@shopify/react-native-skia';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import { CartesianChart, Line, useChartPressState } from 'victory-native';

const DATA = [
  { day: new Date('2024-08-10').getTime(), temperature: 30 },
  { day: new Date('2024-08-11').getTime(), temperature: 27 },
  { day: new Date('2024-08-12').getTime(), temperature: 26 },
  { day: new Date('2024-08-13').getTime(), temperature: 39 },
  { day: new Date('2024-08-14').getTime(), temperature: 30 },
  { day: new Date('2024-08-16').getTime(), temperature: 28 },
  { day: new Date('2024-08-17').getTime(), temperature: 25 },
  { day: new Date('2024-08-18').getTime(), temperature: 29 },
  { day: new Date('2024-08-19').getTime(), temperature: 35 },
];

interface DataPoint {
  day: number; // Timestamp do dia
  temperature: number; // Temperatura registrada
}

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextImput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

function GraphicTemperature() {
  const { state, isActive } = useChartPressState({ x: 0, y: { temperature: 0 } });
  const font = useFont(require('src/fonts/Inter_24pt-Regular.ttf'));
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Requisição para a API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(''); 
        const result = await response.json();
        // Supondo que a API retorna um array de objetos com campos "day" e "rainfall"
        const formattedData = Array.isArray(result) ? result.map(item => ({
          day: new Date(item.day).getTime(),
          temperature: item.temperature,
        })) : [];
        setData(formattedData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    }
      

    fetchData();
}, []);

*/

  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.temperature.value.value.toFixed(2)} °C`,
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

  /* if (loading) {
   return <ActivityIndicator size="large" color="#0000ff" />;
 }

 if (error) {
   return <Text>{error}</Text>;
 }
   */

  return (
    <View>
      <View style={{ width: '90%', height: 300, margin: 'auto' }}>
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
              {DATA[DATA.length - 1].temperature.toFixed(2)}°C
            </Text>
            <Text>Hoje</Text>
          </View>
        )}
        <CartesianChart
          data={DATA}
          xKey="day"
          yKeys={['temperature']}
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
              <Line points={points.temperature} color="blue" strokeWidth={3} />
              {isActive && <ToolTip x={state.x.position} y={state.y.temperature.position} />}
            </>
          )}
        </CartesianChart>
      </View>
    </View>
  );
}

export default GraphicTemperature;
