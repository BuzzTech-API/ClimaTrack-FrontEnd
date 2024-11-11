import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';

import { delLocation } from '~/api/deleteLocation';

interface ConfirmDelLocationProps {
    modalVisible: boolean;
    onCancel: () => void;
    idLocation: string;
    navigation: any;
}

export const ConfirmDelLocation: React.FC<ConfirmDelLocationProps> = ({
    modalVisible,
    onCancel,
    idLocation,
    navigation,
}) => {
    const handleDelete = async () => {
        try {
            const res = await delLocation(idLocation);
            if (res.sucesss) {
                alert('Localização deletada com sucesso!');
                onCancel();
                const storageItem = await AsyncStorage.getItem('locais');
                if (storageItem) {
                    const locais = JSON.parse(storageItem);
                    if (typeof locais.locais === 'object' && locais.locais instanceof Array) {
                        locais.locais = locais.locais.filter(
                            (local: string) => local !== idLocation
                        );
                        await AsyncStorage.setItem('locais', JSON.stringify(locais));
                    }
                }
                navigation.replace('areas');
            } else {
                alert('Erro ao excluir localização: ' + res.status);
            }
        } catch (error) {
            alert('Erro inesperado ao tentar excluir a localização: ' + error);
        }
    };

    return (
        <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={onCancel}>
            <View style={styles.centralizerContainer}>
                <View style={styles.mainContainer}>
                    <View style={styles.containerText}>
                        <Text style={styles.text}>Realmente deseja excluir a área salva?</Text>
                    </View>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity style={styles.buttonLeft} onPress={handleDelete}>
                            <Text style={styles.textButton}>Sim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRigth} onPress={onCancel}>
                            <Text style={styles.textButton}>Não</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centralizerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    mainContainer: {
        backgroundColor: '#F1F3F0',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    containerText: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
    containerButtons: {
        flexDirection: 'row',
    },
    buttonLeft: {
        width: '50%',
        borderBottomStartRadius: 10,
        backgroundColor: '#53B853',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    buttonRigth: {
        width: '50%',
        borderBottomEndRadius: 10,
        backgroundColor: '#D10000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    textButton: {
        color: '#FFFFFF',
    },
});
