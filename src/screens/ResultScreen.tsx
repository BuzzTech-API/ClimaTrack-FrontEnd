import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import ButtonComponent from '~/components/ButtonComponent';
import InputComponent from '~/components/InputComponent';
import { StackNavigationProp } from '@react-navigation/stack';


type ResultScreenNavigationProp = StackNavigationProp<ParamList, 'result'>;

interface ResultScreenProps {
  navigation: ResultScreenNavigationProp;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation }) => {
  // Adicionando estados para as datas
  const [startDate, setStartDate] = React.useState<string>(''); // Para a data de início
  const [endDate, setEndDate] = React.useState<string>(''); // Para a data de fim


  const lat = ''; 
  const long = ''; 

  const handleNewSearch = () => {
    navigation.navigate('search'); // Navega para a tela SearchLocation
  };

  return (
    <View style={styles.container}>
      <Header title="Resultado da pesquisa" />
      <View style={styles.bodyContainer}>
        {/* Exibindo Latitude e Longitude */}
        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinateText}>Latitude: {lat}</Text>
          <Text style={styles.coordinateText}>Longitude: {long}</Text>
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

        {/* Contêiner para centralizar o botão */}
        <View style={styles.buttonContainer}>
          <ButtonComponent 
            buttonText="Nova pesquisa" 
            onPress={handleNewSearch} 
            width={200} 
            height={60} 
            fontSize={18} 
          />
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "rgba(0, 0, 0, 1)",
    width: "100%",
    height: "100%",
  },
  bodyContainer: {
    marginTop: "20%", 
    alignItems: 'center', 
  },
  coordinatesContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20, 
    width: '80%', 
  },
  coordinateText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 1)',
    flex: 1, 
    textAlign: 'center', 
  },
  dateContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20, 
    width: '80%', 
  },
  buttonContainer: {
    alignItems: 'center', 
  },
});

export default ResultScreen;
