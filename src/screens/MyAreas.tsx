/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import AreaCard from '~/components/AreaCard';

// Ivan Germano: Aqui é o import do serviço que faz a requisição para a rota do backend 'find_all_locations'
import { fetchLocations } from '~/services/locationService'; 
import { fetchCurrentClimate } from '~/services/currentLocationService';

// Definindo uma interface para a estrutura dos dados da localização
interface Location {
    id: string;
    nome: string;
    latitude: number;
    longitude: number;
    temperatureValue?: number;
    humidityValue?: number;
    alertNumber?: number;
    alertWarning1?: string;
    alertWarning2?: string;
}

interface MyAreasProps {
    navigation: any
};

const MyAreas: React.FC<MyAreasProps> = ({ navigation }) => {

    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        const getLocations = async () => {
            try {
                const response = await fetchLocations();
                console.log('Locais recebidos:', response.locations);
                const updatedLocations: Location[] = await Promise.all(response.locations.map(async (location: Location) => {
                    try {
                        const climateData = await fetchCurrentClimate(location.latitude, location.longitude);
                        console.log('Dados climáticos recebidos:', climateData);
                        return {
                            ...location,
                            temperatureValue: parseFloat(climateData["temperature_max (C°)"].toFixed(2)) ?? 0,
                            humidityValue: parseFloat(climateData["precipitation (mm)"].toFixed(2)) ?? 0,
                        };
                    } catch (error) {
                        console.error('Erro ao buscar dados climáticos:', error);
                        return {
                            ...location,
                            temperatureValue: 0,
                            humidityValue: 0,
                        };
                    }
                }));
                setLocations(updatedLocations);
            } catch (error) {
                Alert.alert('Erro', 'Erro ao buscar localizações.');
            }
        };

        getLocations();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Header title="Meus Locais" />
            <ScrollView style={styles.bodyContainer}>
                {locations.map((location: Location) => {
                    console.log('Dados do AreaCard:', location);
                    return (
                        <AreaCard
                            key={location.id}
                            areaName={location.nome || 'Desconhecido'}
                            temperatureValue={location.temperatureValue || 0}
                            humidityValue={location.humidityValue || 0}
                            latValue={location.latitude || 0}
                            longValue={location.longitude || 0}
                            alertNumber={location.alertNumber || 0}
                            alertWarning1={location.alertWarning1 || ''}
                            alertWarning2={location.alertWarning2 || ''}
                        />
                    );
                })}
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