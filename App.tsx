import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import HelpScreen from '~/screens/HelpScreen';

import MyAreas from '~/screens/MyAreas';
import ResultScreen from '~/screens/ResultScreen';
import SavedLocation from '~/screens/SavedLocation';
import SearchLocation from '~/screens/SearchLocation';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <GestureHandlerRootView>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="search">
                    <Stack.Screen
                        name="search"
                        component={SearchLocation}
                        options={{ headerShown: false }}
                    />
                    {/* esse erro é estranho mas ele continua funcionando normal, olhe e ignore */}
                    <Stack.Screen
                        name="result"
                        component={ResultScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="saved"
                        component={SavedLocation}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="areas"
                        component={MyAreas}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="help"
                        component={HelpScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </GestureHandlerRootView>
    );
}
