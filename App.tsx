import { View, TextInput, Text } from 'react-native';
import { CartesianChart, Line, useChartPressState } from "victory-native";
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import { Circle } from '@shopify/react-native-skia';


const DATA = [
  {day: new Date("2024-08-10").getTime(), rainfall: 50},
  {day: new Date("2024-08-11").getTime(), rainfall: 30},
  {day: new Date("2024-08-12").getTime(), rainfall: 60},
  {day: new Date("2024-08-13").getTime(), rainfall: 20},
  {day: new Date("2024-08-14").getTime(), rainfall: 80},
  {day: new Date("2024-08-16").getTime(), rainfall: 10},
  {day: new Date("2024-08-17").getTime(), rainfall: 15},
  {day: new Date("2024-08-18").getTime(), rainfall: 20},
  {day: new Date("2024-08-19").getTime(), rainfall: 85},

]

Animated.addWhitelistedNativeProps({text: true})
const AnimatedTextImput = Animated.createAnimatedComponent(TextInput)

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

export default function App() {
  const {state, isActive} = useChartPressState({x: 0, y: {rainfall: 0}})


  const animatedText = useAnimatedProps(() =>{
    return {
      text: `${state.y.rainfall.value.value.toFixed(2)} mm`,
      defaultValue: ""
    }
  })

  const animatedDateText = useAnimatedProps(() =>{
    const date = new Date(state.x.value.value)
    return {
      text: `${date.toLocaleDateString("pt-BR")}`,
      defaultValue: ""
    }
  })

  return (
    <View>
      <View style={{width: '100%', height: 300}}>
      {isActive &&(
        <View>
          <AnimatedTextImput
          editable={false}
          underlineColorAndroid={"transparent"}
          style={{fontSize: 25, fontWeight: 'bold', color: "#000"}}
          animatedProps={animatedText}
          >
          </AnimatedTextImput>

          <AnimatedTextImput
          editable={false}
          underlineColorAndroid={"transparent"}
          animatedProps={animatedDateText}
          >
          </AnimatedTextImput>
        </View>
)}
      {!isActive && (
        <View>
          <Text
            style={{fontSize: 25, fontWeight: 'bold', color: "#000"}}
          >
            {DATA[DATA.length - 1].rainfall.toFixed(2)}mm
          </Text>
          <Text>
            Hoje
          </Text>
        </View>
      

      )}
      <CartesianChart 
        data={DATA} xKey="day" yKeys={["rainfall"]}
        chartPressState={state}
        axisOptions={{
          tickCount: 10,
          labelOffset: {x:3, y: 2},
          labelPosition: "inset"
        }}
        >

        {({ points }) => (
          <>
            <Line points={points.rainfall} color="blue" strokeWidth={3} />
            {isActive && (
              <ToolTip x={state.x.position} y={state.y.rainfall.position}/>
            )}
          </>
          
        )}
      </CartesianChart>

      </View>
    </View>
  );
}
