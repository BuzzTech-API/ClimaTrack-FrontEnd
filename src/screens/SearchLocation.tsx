import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import InputComponent from '~/components/InputComponent';
import ButtonComponent from '~/components/ButtonComponent';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

interface SearchLocationProps {}

const SearchLocation: React.FC<SearchLocationProps> = () => { 

  const [lat, setLat] = useState<string>('')
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
  let nowDate: Date;
  let nowDay: string;
  let nowMonth: string;
  let nowYear: string;

  const validateDate = (date: string) => {

    let day:string;
    let month:string;
    let year: string;

    if (parseInt((date[4] + date[5])) > 12) {
      day = (date[0] + date[1])
      month = (date[2] + date[3])
      year = (date[4] + date[5] + date[6] + date[7])

      return (parseInt(year+month+day));
    }
    if (parseInt((date[4] + date[5])) <= 12) {
      day = (date[6] + date[7])
      month = (date[4] + date[5])
      year = (date[0] + date[1] + date[2] + date[3])

      return (parseInt(year+month+day));
    }
  }

  const validateInputs = () => {
    let isValid = true;

    latNumber = +lat;
    longNumber = +long;
    startDateNumber = +startDate;
    endDateNumber = +endDate;
    nowDate = new Date();    

    setLatError('');
    setLongError('');
    setStartDateError('');
    setEndDateError('');

    nowDate.setDate(nowDate.getDate()-3);

    if (nowDate.getDate() < 10) {
      nowDay = "0" + (nowDate.getDate().toString());
    } else {
      nowDay = nowDate.getDate().toString();
    }

    if (nowDate.getMonth() < 10) {
      nowMonth = "0" + ((nowDate.getMonth()+1).toString());
    } else {
      nowMonth = (nowDate.getMonth()+1).toString();
    }

    nowYear = nowDate.getFullYear().toString();

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
    } else {
      startDateNumber = validateDate(startDate);
    }

    if (!/^\d{8}$/.test(endDate)) {
      setEndDateError('Data inválida');
      isValid = false;
    } else {
      endDateNumber = validateDate(endDate)
    }

    if (startDateNumber >= endDateNumber) {
      setStartDateError('Data inválida');
      setEndDateError('Data inválida');
      isValid = false;
    }
    
    if (startDateNumber < 19810101) {
      setStartDateError('Data inválida');
      isValid = false;
    } 

    if (endDateNumber > parseInt(nowYear+nowMonth+nowDay)) {
      setEndDateError('Data inválida');
      isValid = false;
    } 

    return isValid;
  };

  const handleSearch = () => {
    if (validateInputs()) {
      const inputValues = {
        latNumber, //Valor de Latitude a ser enviado ao back
        longNumber, //Valor de Longitude a ser enviado ao back
        startDateNumber, //Valor de Data de Inicio a ser enviado ao back
        endDateNumber //Valor de Data de Fim a ser enviado ao back
      };
      console.log(inputValues); // Dicionario com todos os valores
    } else {
      Alert.alert('Por favor, corrija os campos destacados.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header title="Pesquisar Local"/>
      <ScrollView style={styles.bodyContainer}>
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
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
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
    flexGrow: 1,
    width: "100%",
    marginTop: 85,
    marginBottom: 75,
  },
  coordenateContainer: {
    flexDirection: "column",
    gap: 30,
    paddingTop: "20%",
  },
  dateContainer: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 60,
    marginTop: 50,
  },
  buttonContainer: {
    marginTop: 40,
    alignSelf: "center",
  },
});

export default SearchLocation;