import Feather from '@expo/vector-icons/Feather';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { addLocation } from '~/api/addLocation';
import { fetchPluviTemp } from '~/api/getPluvTemp';
import ButtonComponent from '~/components/ButtonComponent';
import ButtonWithIcon from '~/components/ButtonWithIcon';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import InputComponent from '~/components/InputComponent';
import ModalConfigGrafico from '~/components/ModalConfigGrafico';
import GraphicRainfall from '~/components/graphicRainfall';
import GraphicTemperature from '~/components/graphicTemperature';
import converterDataParaString from '~/functions/converterDataParaStringFormatada';
import converterStringParaData from '~/functions/converterStringParaData';
import { TempPluvData } from '~/types/resquestTempPluv';

type ParamList = {
  search: undefined;
  result: {
    latNumber: number;
    longNumber: number;
    startDateNumber: number;
    endDateNumber: number;
  };
};

type Props = StackScreenProps<ParamList, 'result'>;
type ResultScreenNavigationProp = StackNavigationProp<ParamList, 'result'>;

interface ResultScreenProps {
  navigation: ResultScreenNavigationProp;
}

const ResultScreen: React.FC<ResultScreenProps & Props> = ({ navigation, route }) => {
  // Adicionando estados para as datas
  const params = route.params;
  const [startDate, setStartDate] = React.useState<string>(
    converterDataParaString(converterStringParaData(params.startDateNumber.toString()))
  ); // Para a data de início
  const [endDate, setEndDate] = React.useState<string>(
    converterDataParaString(converterStringParaData(params.endDateNumber.toString()))
  ); // Para a data de fim
  const [dataPluvTemp, setdataPluvTemp] = React.useState<TempPluvData>();
  const [nomeLocal, setNomeLocal] = React.useState('');

  const [loading, setLoading] = React.useState<boolean>(false); // Novo estado de carregamento
  const [error, setError] = React.useState<string | null>(null);

  const handleSave = async () => {
    try {
      // Dados que você deseja salvar
      if (nomeLocal.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao salvar!',
          text2: `Nome do local não informado!`,
        });
        return;
      }
      const locationData = {
        nome: nomeLocal,
        latitude: params.latNumber,
        longitude: params.longNumber,
      };

      const response = await addLocation(locationData);

      if (response.sucesss) {
        Toast.show({
          type: 'success',
          text1: 'Salvo!',
          text2: response.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao salvar!',
          text2: `Status: ${response.status}`,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao salvar!',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Inicia o estado de carregamento
      setError(null); // Reseta o estado de erro antes de cada fetch

      try {
        const data: TempPluvData = await fetchPluviTemp({
          latitude: params.latNumber,
          longitude: params.longNumber,
          startDate: params.startDateNumber,
          endDate: params.endDateNumber,
        });
        setdataPluvTemp(data);
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Os dados climáticos foram carregados com sucesso.',
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        Toast.show({
          type: 'error',
          text1: 'Erro ao buscar dados.',
          text2: 'Não foi possível carregar os dados climáticos.',
        });
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchData();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Feedback de carregamento */}
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingContainer} />
      )}
      {dataPluvTemp === undefined && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingContainer} />
      )}
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>Resultado da pesquisa</Text>
        </View>
      </View>
      <ScrollView style={styles.bodyContainer}>
        {/* Exibindo Latitude e Longitude */}
        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinateText}>
            Latitude: {params.latNumber.toFixed(5)} | Longitude: {params.longNumber.toFixed(5)}{' '}
          </Text>
        </View>
        <View style={{ gap: 20 }}>
          <View style={styles.serieHistorica}>
            <Text style={styles.textTitle}>Série Histórica</Text>
            <View style={{ height: 45, width: 45 }}>
              <ModalConfigGrafico
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setdataPluvTemp={setdataPluvTemp}
                latNumber={params.latNumber}
                longNumber={params.longNumber}
              />
            </View>
          </View>
          {dataPluvTemp !== undefined && <GraphicTemperature dataPluvTemp={dataPluvTemp.data} />}
          {dataPluvTemp !== undefined && <GraphicRainfall dataPluvTemp={dataPluvTemp.data} />}
        </View>
        {/* Botão "Salvar" adicionado */}
        <View style={styles.buttonContainer}>
          <InputComponent
            label="Salvar Local"
            value={nomeLocal}
            inputWidth={300}
            onChangeText={(text: string) => {
              setNomeLocal(text);
            }}
          />
          <TouchableOpacity onPress={handleSave} style={styles.customButton}>
            <Feather name="save" size={24} color="black" style={styles.icon} />
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  bodyContainer: {
    marginTop: '20%',
    paddingBottom: 120,
  },
  coordinatesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  coordinateText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(140,140,140,0.9)',
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '80%',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  customButton: {
    backgroundColor: 'green',
    width: 350,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Para ficar por cima de tudo
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 80,
    position: 'absolute',
    alignSelf: 'flex-start',
    top: 40,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '700',
    paddingLeft: 20,
  },
  serieHistorica: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ResultScreen;
