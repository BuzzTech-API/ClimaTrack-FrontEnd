import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import AreaCard from '~/components/AreaCard';

interface MyAreasProps {
    navigation: any
};

const MyAreas: React.FC<MyAreasProps> = ({ navigation }) => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Header title="Meus Locais" />
            <ScrollView style={styles.bodyContainer}>
                {/* Teste 1 */}
                <AreaCard areaName='Arroz' temperatureValue={30} humidityValue={999} latValue={90} longValue={90} alertNumber={2} alertWarning1='Temperatura Maxima Atingida' alertWarning2='Umidade Maxima Atingida'>
                </AreaCard>
                {/* Teste 2 */}
                <AreaCard areaName='Milho' temperatureValue={20} humidityValue={900} latValue={50} longValue={50} alertNumber={0}>
                </AreaCard>
            </ScrollView>
            <Footer navigation={navigation}/>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(220, 220, 220, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 1)',
        width: '100%',
        height: '100%',
    },
    bodyContainer: {
        flexGrow: 1,
        width: '100%',
        marginTop: 85,
        marginBottom: 72,
        paddingTop: 60,
        paddingBottom: 60,
    },
});

export default MyAreas;