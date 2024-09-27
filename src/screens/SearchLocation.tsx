import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import InputComponent from '~/components/InputComponent';
import ButtonComponent from '~/components/ButtonComponent';
import { StackNavigationProp } from '@react-navigation/stack';

type ParamList = {
  
  search: undefined
  result:{
    latNumber: number,
    longNumber: number,
    startDateNumber: number,
    endDateNumber: number
  }
}

type InputScreenNavigationProp = StackNavigationProp<ParamList, 'search'>;

interface SearchLocationProps {
  navigation: InputScreenNavigationProp
}

const SearchLocation: React.FC<SearchLocationProps> = ({navigation}) => {

  const [lat, setLat] = useState<string>('');
  const [long, setLong] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [latError, setLatError] = useState<string>('');
  const [longError, setLongError] = useState<string>('');
  const [startDateError, setStartDateError] = useState<string>('');
  const [endDateError, setEndDateError] = useState<string>('');

  let latNumber: number;
  let longNumber: number;
  let startDateNumber: number;
  let endDateNumber: number;

  const validateInputs = () => {
    let isValid = true;

    latNumber = +lat;
    longNumber = +long;
    startDateNumber = +startDate;
    endDateNumber = +endDate;

    setLatError('');
    setLongError('');
    setStartDateError('');
    setEndDateError('');

    if (isNaN(latNumber) || latNumber < -90 || latNumber > 90 || lat == '') {
      setLatError('Valor inválido');
      isValid = false;
    }

    if (isNaN(longNumber) || longNumber < -180 || longNumber > 180 || long == '') {
      setLongError('Valor inválido');
      isValid = false;
    }

    if (!/^\d{8}$/.test(startDate)) {
      setStartDateError('Data inválida');
      isValid = false;
    }

    if (!/^\d{8}$/.test(endDate)) {
      setEndDateError('Data inválida');
      isValid = false;
    }

    return isValid;
  };

  const handleSearch = () => {
    if (validateInputs()) {
      const inputValues = {
        latNumber,
        longNumber,
        startDateNumber,
        endDateNumber
      };

      //aqui vai ser o redirecionamento para a outra página
      navigation.navigate('result', inputValues)

      console.log(inputValues); // FETCH AQUI
    } else {
      Alert.alert('Por favor, corrija os campos destacados.');
    }
  };

  return (
    <View style={styles.container}>
      {/*<View style={styles.headerContainer}>*/}
        <Header title="Pesquisar Local"/>
      {/*</View>*/}
      <View style={styles.bodyContainer}>
        <View style={styles.coordenateContainer}>
          <InputComponent 
            label="Latitude" 
            placeHolder='Digite a latitude'
            inputWidth={280} 
            value={lat} 
            onChangeText={setLat} 
            maxLength={10} 
            warning={latError}/>
          <InputComponent 
            label="Longitude" 
            placeHolder='Digite a longitude'
            inputWidth={280} 
            value={long} 
            onChangeText={setLong} 
            maxLength={10} 
            warning={longError}/>
        </View>
      </View>
      <View style={styles.dateContainer}>
        <InputComponent 
          label="Data de Início"
          placeHolder="Dia/Mês/Ano"
          inputWidth={115} 
          value={startDate} 
          onChangeText={setStartDate} 
          maxLength={8} 
          warning={startDateError}/>
        <InputComponent 
          label="Data de Fim" 
          placeHolder='Dia/Mês/Ano'
          inputWidth={115} 
          value={endDate} 
          onChangeText={setEndDate}
          maxLength={8} 
          warning={endDateError}/>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent buttonText='Pesquisar' onPress={handleSearch}/>
      </View>
      {/*<View style={styles.footerContainer}>*/}
        <Footer />
      {/*</View>*/}
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
  headerContainer: {
    position: "absolute",
    paddingBottom: 0,
    },
  bodyContainer: {
    
  },
  coordenateContainer: {
    flexDirection: "column",
    gap: 30,
    paddingTop: "35%"
  },
  dateContainer: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 60,
    marginTop: 50,
  },
  buttonContainer: {
    marginTop: 40,
  },
  footerContainer: {
    position: "absolute",
    paddingBottom: 0,
  },
});

export default SearchLocation;
