/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react'; // Ivan Germano: ActivityIndicator é uma classe do react-native que
// estamos usando com Toast nessa página
import {
    View,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
} from 'react-native';

import AreaCard from '~/components/AreaCard';
import Footer from '~/components/Footer';
import Header from '~/components/Header';

// Ivan Germano: Aqui é o import do serviço que faz a requisição para a rota do backend 'find_all_locations'
import { fetchCurrentClimate } from '~/services/currentLocationService';
import { fetchLocations, fetchLocationsById } from '~/services/locationService';
// Ivan Germano: Aqui é o import do serviço que faz a requisição para a rota do backend 'get_current_climate_data'

// Ivan Germano: Aqui estamos definindo uma interface para a estrutura dos dados da localização.
interface Location {
    id: string;
    nome: string;
    latitude: number;
    longitude: number;
}

interface MyAreasProps {
    navigation: any;
}

const MyAreas: React.FC<MyAreasProps> = ({ navigation }) => {
    // Ivan Germano: useState de Location para armazenar as localizações e seus dados
    const [locations, setLocations] = useState<Location[]>([]);
    // Ivan Germano: Estado para controlar se os dados estão sendo carregados
    const [loading, setLoading] = useState<boolean>(false);

    // Ivan Germano: useEffect para buscar os dados das localizações ao montar o componente
    useEffect(() => {
        const getLocations = async () => {
            try {
                // Ivan Germano: Inicia o estado de carregamento com loading = true
                setLoading(true);
                // Pega as localização do armazenamento do celular
                const storageItem = await AsyncStorage.getItem('locais');
                if (storageItem) {
                    const locais = JSON.parse(storageItem);
                    if (typeof locais.locais === 'object' && locais.locais instanceof Array) {
                        // Faz o request de cada localização pelo seu id
                        const locaisRequest = locais.locais.map(async (local: string) => {
                            if (local !== null && local !== undefined) {
                                return await fetchLocationsById(local);
                            }
                        });

                        const responses = await Promise.all(locaisRequest);

                        // Filtra para vê se não tem nenhuma resposta undefined
                        const location: Location[] = responses.map((response) => {
                            if (response !== undefined) {
                                return response.location;
                            }
                        });

                        // Chama o hook para atualizar a lista de localizações
                        setLocations(location);
                    }
                }
            } catch {
                Alert.alert('Erro', 'Erro ao buscar localizações.');
            } finally {
                // Ivan Germano: Finaliza o estado de carregamento do 'Toast'.
                setLoading(false);
            }
        };

        // Ivan Germano: Aqui chamamos a função para buscar as localizações
        getLocations();

        return () => {};
    }, [navigation.navigate]);

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
                        {
                            /* Ivan Germano: Caso o dado seja 'undefined' ou 'null' ele retorna um valor padrão para evitar erros.*/
                        }
                        return (
                            <AreaCard
                                key={location.id}
                                areaId={location.id}
                                areaName={location.nome || 'Desconhecido'}
                                latValue={location.latitude || 0}
                                longValue={location.longitude || 0}
                                navigation={navigation}
                                alertNumber={0}
                            />
                        );
                    })}
                    {/* Ivan Germano: Esse é um container para impedir que o container principal fique sob os botões do navigation */}
                </ScrollView>
            )}
            <Footer navigation={navigation} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
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
        paddingBottom: 120,
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
