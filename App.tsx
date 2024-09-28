import React from 'react';
import { SafeAreaView, StatusBar, Text, TextInput, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SearchLocation from '~/screens/SearchLocation';
import TestResult from '~/screens/TestResultScreen';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='search'> 
        <Stack.Screen name="search" component={SearchLocation}  options={{ headerShown: false }}/>
        {/* esse erro é estranho mas ele continua funcionando normal, olhe e ignore */}
        <Stack.Screen name="result" component={TestResult} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
