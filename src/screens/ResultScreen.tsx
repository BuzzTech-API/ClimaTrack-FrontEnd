import Feather from '@expo/vector-icons/Feather';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { addLocation } from '~/api/addLocation';

import { fetchPluviTemp } from '~/api/getPluvTemp';
import ButtonComponent from '~/components/ButtonComponent';
import ButtonWithIcon from '~/components/ButtonWithIcon';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import InputComponent from '~/components/InputComponent';
import GraphicRainfall from '~/components/graphicRainfall';
import GraphicTemperature from '~/components/graphicTemperature';
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
  const [startDate, setStartDate] = React.useState<string>(''); // Para a data de início
  const [endDate, setEndDate] = React.useState<string>(''); // Para a data de fim
  const [dataPluvTemp, setdataPluvTemp] = React.useState<TempPluvData>();

  const [loading, setLoading] = React.useState<boolean>(false); // Novo estado de carregamento
  const [error, setError] = React.useState<string | null>(null);

  const handleSave = async () => {
    try {
      // Dados que você deseja salvar
      const locationData = {
        nome: `Local ${params.latNumber.toFixed(5)}, ${params.longNumber.toFixed(5)}`, 
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
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>Resultado da pesquisa</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        {/* Exibindo Latitude e Longitude */}
        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinateText}>
            Latitude: {params.latNumber.toFixed(5)} | Longitude: {params.longNumber.toFixed(5)}{' '}
          </Text>
        </View>

        <View style={{ height: 800 }}>
          <View style={styles.serieHistorica}>
            <Text style={styles.textTitle}>Série Histórica</Text>
            <View style={{ height: 45, width: 45 }}>
              <ButtonWithIcon
                icon={<Feather name="more-horizontal" size={24} color="black" />}
                title=""
                width={45}
                borderRadius={45}
                height={45}
              />
            </View>
          </View>
          {dataPluvTemp !== undefined && <GraphicRainfall dataPluvTemp={dataPluvTemp.data} />}
          {dataPluvTemp !== undefined && <GraphicTemperature dataPluvTemp={dataPluvTemp.data} />}
        </View>

        {/* Contêiner para os campos de data lado a lado */}
        <View style={styles.dateContainer}>
          <InputComponent
            label="Data de Início"
            placeHolder="Dia/Mês/Ano"
            value={startDate}
            onChangeText={setStartDate}
            maxLength={8}
            inputWidth={150}
            inputHeight={40}
          />
          <InputComponent
            label="Data de Fim"
            placeHolder="Dia/Mês/Ano"
            value={endDate}
            onChangeText={setEndDate}
            maxLength={8}
            inputWidth={150}
            inputHeight={40}
          />
        </View>
        
        {/* Botão "Salvar" adicionado */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.customButton}
          >
            <Feather name="save" size={24} color="black" style={styles.icon} />
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    alignItems: 'center',
    paddingBottom: 80,
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
    marginBottom: 20,
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
