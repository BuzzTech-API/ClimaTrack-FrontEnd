import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ResultScreen from '~/screens/ResultScreen';
import SearchLocation from '~/screens/SearchLocation';
import TestResult from '~/screens/TestResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="search">
          <Stack.Screen name="search" component={SearchLocation} options={{ headerShown: false }} />
          {/* esse erro é estranho mas ele continua funcionando normal, olhe e ignore */}
          <Stack.Screen name="result" component={ResultScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
