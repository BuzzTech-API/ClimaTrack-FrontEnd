/* eslint-disable prettier/prettier */
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import Toast from 'react-native-toast-message';

import ButtonComponent from './ButtonComponent';
import ButtonWithIcon from './ButtonWithIcon';

import { fetchPluviTemp } from '~/api/getPluvTemp';
import { TempPluvData } from '~/types/resquestTempPluv';
type props = {
    latNumber: number;
    longNumber: number;
    startDate: string;
    endDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>
    setEndDate: React.Dispatch<React.SetStateAction<string>>
    setdataPluvTemp: React.Dispatch<React.SetStateAction<TempPluvData | undefined>>
}

function converterDataParaNumero(dataStr: string): number {
    // Divida a string da data em dia, mês e ano
    const [dia, mes, ano] = dataStr.split("/");

    // Concatene ano, mês e dia no formato YYYYMMDD e converta para número
    const dataFormatada = `${ano}${mes}${dia}`;

    // Retorne como número
    return parseInt(dataFormatada, 10);
}


const ModalConfigGrafico = ({ startDate, endDate, setStartDate, setEndDate, setdataPluvTemp, latNumber, longNumber }: props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const getGraphicsData = async () => {
        try {
            const data: TempPluvData = await fetchPluviTemp({
                latitude: latNumber,
                longitude: longNumber,
                startDate: converterDataParaNumero(startDate),
                endDate: converterDataParaNumero(endDate),
            });
            setdataPluvTemp(data);
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Os dados climáticos foram carregados com sucesso.',
            });
        } catch (err) {
            if (err instanceof Error) {
            }
            Toast.show({
                type: 'error',
                text1: 'Erro ao buscar dados.',
                text2: 'Não foi possível carregar os dados climáticos.',
            });
        } finally {
        }


    }

    React.useEffect(() => {

        getGraphicsData()

        return () => {

        }
    }, [])


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent

                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Atualizar Grafico</Text>
                        <TextInputMask
                            type="datetime"
                            options={{
                                format: 'DD/MM/YYYY',
                            }}
                            value={startDate}
                            onChangeText={(text) => {
                                setStartDate(text);
                            }}
                            style={styles.input}
                        />
                        <TextInputMask
                            type="datetime"
                            options={{
                                format: 'DD/MM/YYYY',
                            }}
                            value={endDate}
                            onChangeText={(text) => {
                                setEndDate(text);
                            }}
                            style={styles.input}
                        />
                        <ButtonComponent buttonText="Atualizar" onPress={() => {
                            setdataPluvTemp(undefined)
                            setModalVisible(!modalVisible)
                            getGraphicsData()
                        }
                        } />
                    </View>
                </View>
            </Modal>
            <View style={{ height: 45, width: 45 }}>
                <ButtonWithIcon
                    icon={<Feather name="more-horizontal" size={24} color="black" />}
                    title=""
                    width={45}
                    borderRadius={45}
                    height={45}
                    onPress={() => setModalVisible(true)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        gap: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderRadius: 10,
        backgroundColor: '#F1F3F0',
        color: '#000',
        paddingLeft: 11,
        alignSelf: 'center',
        width: 250,
        height: 45
    },
});
export default ModalConfigGrafico;
