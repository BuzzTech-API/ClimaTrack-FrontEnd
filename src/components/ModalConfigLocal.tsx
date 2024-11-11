import { Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    View,
    Switch,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import ButtonWithIcon from './ButtonWithIcon';
import { ConfirmDelLocation } from './ConfirmDelLocation';

import { SavedScreenNavigationProp } from '~/screens/SavedLocation';
type props = {
    navigation: SavedScreenNavigationProp;
    idLocation: string;
    nomeLocal: string;
    setNomeLocal: React.Dispatch<React.SetStateAction<string>>;
};
const ModalConfigLocal = ({ navigation, idLocation, nomeLocal, setNomeLocal }: props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [disponivelOffline, setDisponivelOffline] = useState(false); // Estado para a checkbox (usando Switch)
    const [calorMin, setCalorMin] = useState(20); // Estado para o valor mínimo de calor
    const [calorMax, setCalorMax] = useState(40); // Estado para o valor máximo de calor
    const [pluviosidadeMin, setPluviosidadeMin] = useState(0); // Estado para o valor mínimo de pluviosidade
    const [pluviosidadeMax, setPluviosidadeMax] = useState(100); // Estado para o valor máximo de pluviosidade
    const [calorMinProlongado, setCalorMinProlongado] = useState(20); // Estado para calor mínimo (alerta prolongado)
    const [calorMaxProlongado, setCalorMaxProlongado] = useState(40); // Estado para calor máximo (alerta prolongado)
    const [pluviosidadeMinProlongado, setPluviosidadeMinProlongado] = useState(0); // Estado para pluviosidade mínima (alerta prolongado)
    const [pluviosidadeMaxProlongado, setPluviosidadeMaxProlongado] = useState(100); // Estado para pluviosidade máxima (alerta prolongado)
    const [duracaoDias, setDuracaoDias] = useState(''); // Estado para armazenar a duração em dias

    const [isOpen, setIsOpen] = React.useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

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
                        {/* Botão de Fechar*/}
                        <Feather
                            name="x"
                            size={24}
                            color="black"
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        />

                        {/* ScrollView para permitir rolagem */}
                        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                            {/*Nome do Local*/}
                            <Text style={styles.label}>Nome do local</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Digite o nome do local"
                                value={nomeLocal}
                                onChangeText={setNomeLocal}
                            />

                            {/* Switch para Disponível sem acesso à internet */}
                            <View style={styles.checkboxContainer}>
                                <Switch
                                    value={disponivelOffline}
                                    onValueChange={setDisponivelOffline}
                                />
                                <Text style={styles.checkboxLabel}>
                                    Disponível sem acesso à internet
                                </Text>
                            </View>

                            {/*Configuração de alertas*/}
                            <Text style={styles.subTitle}>Configuração de alertas</Text>

                            {/* Calor: Min - Max */}
                            <Text style={styles.rangeLabel}>
                                Calor: {calorMin}°C - {calorMax}°C
                            </Text>
                            <View style={styles.sliderContainer}>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={50}
                                    step={1}
                                    value={calorMin}
                                    onValueChange={setCalorMin}
                                    minimumTrackTintColor="#FF6347"
                                    maximumTrackTintColor="#D3D3D3"
                                />
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={50}
                                    step={1}
                                    value={calorMax}
                                    onValueChange={setCalorMax}
                                    minimumTrackTintColor="#FF6347"
                                    maximumTrackTintColor="#D3D3D3"
                                />
                            </View>

                            {/* Pluviosidade: Min - Max */}
                            <Text style={styles.rangeLabel}>
                                Pluviosidade: {pluviosidadeMin}% - {pluviosidadeMax}%
                            </Text>
                            <View style={styles.sliderContainer}>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={200}
                                    step={1}
                                    value={pluviosidadeMin}
                                    onValueChange={setPluviosidadeMin}
                                    minimumTrackTintColor="#1E90FF"
                                    maximumTrackTintColor="#D3D3D3"
                                />
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={200}
                                    step={1}
                                    value={pluviosidadeMax}
                                    onValueChange={setPluviosidadeMax}
                                    minimumTrackTintColor="#1E90FF"
                                    maximumTrackTintColor="#D3D3D3"
                                />
                            </View>

                            {/*Configuração de alertas prolongado" */}
                            <Text style={styles.subTitle}>Configuração de alertas Prolongado</Text>

                            {/* Calor Prolongado: Min - Max */}
                            <Text style={styles.rangeLabel}>
                                Calor: {calorMinProlongado}°C - {calorMaxProlongado}°C
                            </Text>
                            <View style={styles.sliderContainer}>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={50}
                                    step={1}
                                    value={calorMinProlongado}
                                    onValueChange={setCalorMinProlongado}
                                    minimumTrackTintColor="#FF6347"
                                    maximumTrackTintColor="#D3D3D3"
                                />
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={50}
                                    step={1}
                                    value={calorMaxProlongado}
                                    onValueChange={setCalorMaxProlongado}
                                    minimumTrackTintColor="#FF6347"
                                    maximumTrackTintColor="#D3D3D3"
                                />
                            </View>

                            {/* Pluviosidade Prolongada: Min - Max */}
                            <Text style={styles.rangeLabel}>
                                Pluviosidade: {pluviosidadeMinProlongado}% -{' '}
                                {pluviosidadeMaxProlongado}%
                            </Text>
                            <View style={styles.sliderContainer}>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={200}
                                    step={1}
                                    value={pluviosidadeMinProlongado}
                                    onValueChange={setPluviosidadeMinProlongado}
                                    minimumTrackTintColor="#1E90FF"
                                    maximumTrackTintColor="#D3D3D3"
                                />
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={200}
                                    step={1}
                                    value={pluviosidadeMaxProlongado}
                                    onValueChange={setPluviosidadeMaxProlongado}
                                    minimumTrackTintColor="#1E90FF"
                                    maximumTrackTintColor="#D3D3D3"
                                />
                            </View>

                            {/* Campo de Entrada para a Duração em Dias */}
                            <Text style={styles.label}>Duração em dias</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite a duração em dias"
                                value={duracaoDias}
                                onChangeText={setDuracaoDias}
                                keyboardType="numeric"
                            />

                            {/* Botões Excluir Local e Atualizar*/}
                            <View style={styles.buttonsContainer}>
                                <ConfirmDelLocation
                                    modalVisible={isOpen}
                                    navigation={navigation}
                                    onCancel={onClose}
                                    idLocation={idLocation}
                                />
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        onOpen();
                                    }}>
                                    <Text style={styles.buttonText}>Excluir local</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => {}}>
                                    <Text style={styles.buttonText}>Atualizar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <View style={{ height: 45, width: 45, alignSelf: 'center' }}>
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
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: '90%',
    },
    closeButton: {
        alignSelf: 'flex-end',
        margin: 5,
    },
    scrollViewContainer: {
        paddingBottom: 50,
        paddingRight: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    checkboxLabel: {
        marginLeft: 5,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
    },
    rangeLabel: {
        fontSize: 14,
        marginVertical: 3,
    },
    sliderContainer: {
        marginBottom: 15,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ModalConfigLocal;
