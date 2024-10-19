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



function converterStringParaData(dataStr: string): Date {
  const ano = parseInt(dataStr.substring(0, 4), 10);
  const mes = parseInt(dataStr.substring(4, 6), 10) - 1; // O mês começa do 0 em JavaScript/TypeScript
  const dia = parseInt(dataStr.substring(6, 8), 10);

  return new Date(ano, mes, dia);
}

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextImput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

type Props = {
  dataPluvTemp: {
    day: string;
    temperature: number;
    precipitation: number;
  }[];
};

const GraphicTemperature: React.FC<Props> = ({ dataPluvTemp }) => {
  const { state, isActive } = useChartPressState({ x: 0, y: { temperature: 0 } });
  const font = useFont(require('src/fonts/Inter_24pt-Regular.ttf'));


  const data = dataPluvTemp.map((item, index) => ({
    day: converterStringParaData(item.day).getTime(),
    temperature: item.temperature,
  }));

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

  const formatXLabel = (() => {
    let lastMonth: string | null = null; // Armazena o último mês exibido

    return (value: string | number | Date) => {
      const date = new Date(value);
      const currentMonth = format(date, 'MMM');

      if (currentMonth !== lastMonth) {
        lastMonth = currentMonth;
        return currentMonth; // Retorna o mês atual se houver mudança
      }

      return ''; // Caso contrário, retorna string vazia
    };
  })();

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
              {data[data.length - 1].temperature.toFixed(2)}°C
            </Text>
          </View>
        )}
        <CartesianChart
          data={data}
          xKey="day"
          yKeys={['temperature']}
          chartPressState={state}
          axisOptions={{
            tickCount: 10,
            labelOffset: { x: 3, y: 2 },
            labelPosition: 'outset',
            font,
            formatYLabel: (value) => `${value}`,
            formatXLabel,
          }}>
          {({ points }) => (
            <>
              <Line points={points.temperature} color="red" strokeWidth={3} />
              {isActive && <ToolTip x={state.x.position} y={state.y.temperature.position} />}
            </>
          )}
        </CartesianChart>
      </View>
    </View>
  );
}

export default GraphicTemperature;
