import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GraphicRainfall from '~/components/graphicRainfall';
import GraphicTemperature from '~/components/graphicTemperature';
import LineChart from '~/components/TesteGrafico';

import ResultScreen from '~/screens/ResultScreen';
import SearchLocation from '~/screens/SearchLocation';
import TestResult from '~/screens/TestResultScreen';
import MyAreas from '~/screens/MyAreas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="search">
          <Stack.Screen name="search" component={SearchLocation} options={{ headerShown: false }} />
          {/* esse erro é estranho mas ele continua funcionando normal, olhe e ignore */}
          <Stack.Screen name="result" component={ResultScreen} options={{ headerShown: false }} />
          <Stack.Screen name="areas" component={MyAreas} options={{ headerShown: false }} />          
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
