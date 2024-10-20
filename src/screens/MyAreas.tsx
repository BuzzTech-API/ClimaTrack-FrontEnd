/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';               // Ivan Germano: ActivityIndicator é uma classe do react-native que 
                                                                  // estamos usando com Toast nessa página
import { View, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import Footer from '~/components/Footer';
import Header from '~/components/Header';
import AreaCard from '~/components/AreaCard';

// Ivan Germano: Aqui é o import do serviço que faz a requisição para a rota do backend 'find_all_locations'
import { fetchLocations } from '~/services/locationService';
// Ivan Germano: Aqui é o import do serviço que faz a requisição para a rota do backend 'get_current_climate_data'
import { fetchCurrentClimate } from '~/services/currentLocationService';

// Ivan Germano: Aqui estamos definindo uma interface para a estrutura dos dados da localização.
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

    // Ivan Germano: useState de Location para armazenar as localizações e seus dados
    const [locations, setLocations] = useState<Location[]>([]);
    // Ivan Germano: Estado para controlar se os dados estão sendo carregados
    const [loading, setLoading] = useState<boolean>(true);

    // Ivan Germano: useEffect para buscar os dados das localizações ao montar o componente
    useEffect(() => {
        const getLocations = async () => {
            try {
                // Ivan Germano: Inicia o estado de carregamento com loading = true
                setLoading(true); 
                const response = await fetchLocations();
                console.log('Locais recebidos:', response.locations);
                // Ivan Germano: Atualiza as localizações com os dados climáticos atuais
                const updatedLocations: Location[] = await Promise.all(response.locations.map(async (location: Location) => {
                    try {
                        // Ivan Germano: Faz a requisição para buscar os dados climáticos da localização
                        const climateData = await fetchCurrentClimate(location.latitude, location.longitude);
                        console.log('Dados climáticos recebidos:', climateData);
                        return {
                            ...location,
                            // Ivan Germano: Arredonda a temperatura máxima e pluviosidade para 2 pontos depois da virgula.
                            temperatureValue: parseFloat(climateData["temperature_max (C°)"].toFixed(2)) ?? 0,
                            humidityValue: parseFloat(climateData["precipitation (mm)"].toFixed(2)) ?? 0,
                        };
                    } catch (error) {
                        // Ivan Germano: console.error para debug.
                        console.error('Erro ao buscar dados climáticos:', error);

                        // Ivan Germano: Retorna a localização original caso ocorra um erro ao buscar os dados climáticos.
                        return {
                            ...location,
                            temperatureValue: 0,
                            humidityValue: 0,
                        };
                    }
                }));
                // Ivan Germano: Atualiza o estado com as localizações atualizadas.
                setLocations(updatedLocations);
            } catch (error) {
                Alert.alert('Erro', 'Erro ao buscar localizações.');
            } finally {
                // Ivan Germano: Finaliza o estado de carregamento do 'Toast'.
                setLoading(false);
            }
        };
        // Ivan Germano: Aqui chamamos a função para buscar as localizações
        getLocations();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Header title="Meus Locais" />
            {loading ? (
                // Ivan Germano: Esse trecho mostra o 'ActivityIndicator' enquanto os dados estão sendo carregados.
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
            <ScrollView style={styles.bodyContainer}>
                {/* Ivan Germano: Mapeia as localizações para renderizar um componente AreaCard para cada Local*/}
                {locations.map((location: Location) => {
                    console.log('Dados do AreaCard:', location);
                    {/* Ivan Germano: Caso o dado seja 'undefined' ou 'null' ele retorna um valor padrão para evitar erros.*/}
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
                {/* Ivan Germano: Esse é um container para impedir que o container principal fique sob os botões do navigation */}
                <View style={styles.placeholderContainer}>
                <View style={styles.placeholder} />
                </View>
            </ScrollView>
            )}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyContainer: {
        flexGrow: 1,
        width: '100%',
        marginTop: 85,
        marginBottom: 72,
        paddingTop: 60,
        paddingBottom: 60,
    },
    placeholderContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    placeholder: {
        width: '90%',
        height: 55,
        backgroundColor: 'rgba(220, 220, 220, 1)',
        borderRadius: 10,
    },
});

export default MyAreas;