/* eslint-disable prettier/prettier */
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    BackHandler,
} from 'react-native';

import { editLocationName } from '~/api/editLocationName';
import { fetchCurrentClimate } from '~/services/currentLocationService';
import { editSavedLocation } from '~/types/editSavedLocation';

interface AreaCardProps {
    areaId: string;
    areaName: string;
    latValue: number;
    longValue: number;
    alertNumber: number;
    navigation: any;
}

const AreaCard: React.FC<AreaCardProps> = ({
    areaId,
    areaName,
    latValue,
    longValue,
    navigation,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(areaName);
    const [temperatureValue, settemperatureValue] = useState(0);
    const [humidityValue, setHumidityValue] = useState(0);

    useEffect(() => {
        (async () => {
            // Ivan Germano: Faz a requisição para buscar os dados climáticos da localização
            const climateData = await fetchCurrentClimate(latValue, longValue);

            // Ivan Germano: Arredonda a temperatura máxima e pluviosidade para 2 pontos depois da virgula.
            settemperatureValue(climateData['temperature_max (C°)']);
            setHumidityValue(climateData['precipitation (mm)']);
        })();
        return () => {};
    }, []);

    // Ivan Germano: UseEffect para capturar o evento do botão "voltar" e cancelar a edição do nome do local - Melhoria Heuristica.
    useEffect(() => {
        if (isEditing) {
            const backAction = () => {
                // Ivan Germano: Cancelar a edição quando o botão "voltar" for pressionado.
                setIsEditing(false);
                return true; // Ivan Germano: Indica que o evento foi tratado e não deve realizar a ação padrão (sair da tela).
            };

            // Ivan Germano: Adiciona o listener para o botão "voltar".
            BackHandler.addEventListener('hardwareBackPress', backAction);

            // Ivan Germano: Remove o listener quando o componente for desmontado ou quando não estiver mais editando.
            return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
        }
    }, [isEditing]);

    // Ivan Germano: Esse código não é meu, so estou comentando para facilitar o entendimento, esta função
    // envia os dados para a pagina de "Detalhes do Local" e direciona para a página.
    const handleClick = () => {
        const inputValues = {
            latNumber: latValue, //Valor de Latitude a ser enviado ao back
            longNumber: longValue, //Valor de Longitude a ser enviado ao back
            areaName,
            areaId,
        };

        //aqui vai ser o redirecionamento para a outra página
        navigation.navigate('saved', inputValues);
    };

    // Ivan Germano: Função para lidar com a edição do nome de local salvo
    const handleSaveEdit = async () => {
        if (!newName || newName.trim() === '') {
            Alert.alert('Erro', 'O nome do local não pode estar vazio.');
            return;
        }
        //console.log('Iniciando edição do nome do local:', areaId, newName);
        try {
            const locationData: editSavedLocation = {
                id_location: areaId,
                new_name: newName,
            };
            const response = await editLocationName(locationData);
            //console.log('Resposta do servidor:', response);
            Alert.alert('Sucesso', 'Nome do local atualizado com sucesso!');
            setIsEditing(false);
        } catch (error) {
            console.error('Erro ao tentar atualizar o nome do local:', error);
            Alert.alert('Erro', 'Erro ao atualizar o nome do local.');
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleClick}>
            <View style={styles.card}>
                <View style={styles.info}>
                    {isEditing ? (
                        <View style={styles.editContainer}>
                            <TextInput
                                style={styles.input}
                                value={newName}
                                onChangeText={setNewName}
                                placeholder="Novo nome do local"
                            />
                            <TouchableOpacity onPress={handleSaveEdit} style={styles.saveButton}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <View style={styles.header}>
                                <Text style={styles.name}>{areaName}</Text>
                                <TouchableOpacity onPress={() => setIsEditing(true)}>
                                    <FontAwesome6 name="edit" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.stats}>
                                <Text style={styles.statsText}>
                                    {temperatureValue.toFixed(2)}C°
                                </Text>
                                <Text style={styles.statsText}>{humidityValue.toFixed(2)}mm</Text>
                            </View>
                            <View style={styles.coordenates}>
                                <Text style={styles.coordenatesText}>
                                    {' '}
                                    Lat: {latValue.toFixed(5)}
                                </Text>
                                <Text style={styles.coordenatesText}>
                                    {' '}
                                    Long: {longValue.toFixed(5)}
                                </Text>
                            </View>
                        </>
                    )}
                </View>
            </View>
            {/*
        <View style={styles.alert}>
          Ivan Germano: Aqui eu precisei definir que caso o dado fosse 'undefined' ou 'null' ele deveria ser opcional
          <Text style={styles.number}>{alertNumber ?? 0} Alertas!</Text>
          {alertWarning1 ? <Text style={styles.warning}>{alertWarning1}</Text> : null}
          {alertWarning2 ? <Text style={styles.warning}>{alertWarning2}</Text> : null}
        </View>
      </View>
      <View style={styles.alert}>
        <View style={styles.warning}>
          <MaterialCommunityIcons name="bell-ring" size={24} color="black" />
          <Text style={styles.number}>{alertNumber} Alertas!</Text>
        </View>
        <View style={styles.warning}>
          <MaterialCommunityIcons name="alert" size={24} color="red" />
          <Text style={styles.warningText}>{alertWarning1}</Text>
        </View>
        <View style={styles.warning}>
          <MaterialCommunityIcons name="alert" size={24} color="red" />
          <Text style={styles.warningText}>{alertWarning2}</Text>
        </View>
      </View>
      */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    input: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 5,
        width: '70%',
        padding: 8,
    },
    editContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
    },
    saveButton: {
        backgroundColor: 'rgba(40, 167, 69, 1)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
    card: {
        backgroundColor: 'rgba(147, 147, 147, 1)',
        height: 130,
        width: '95%',
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    info: {
        height: '100%',
        width: '60%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 25,
        fontWeight: '600',
        width: '100%',
        paddingTop: 5,
        paddingLeft: 10,
        color: 'white',
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 8,
        paddingRight: 8,
        gap: 40,
    },
    statsText: {
        fontSize: 25,
        fontWeight: '400',
        color: 'white',
    },
    statsTextMM: {
        color: 'white',
        paddingTop: 10,
    },
    coordenates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40,
    },
    coordenatesText: {
        color: 'white',
    },
    alert: {
        height: '100%',
        width: '40%',
        alignItems: 'center',
        gap: 7,
        paddingTop: 10,
        paddingBottom: 10,
    },
    warning: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        paddingRight: 10,
        gap: 8,
    },
    number: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
    },
    warningText: {
        fontSize: 12,
        fontWeight: '400',
        color: 'white',
    },
});

export default AreaCard;
