import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import ButtonComponent from '~/components/ButtonComponent';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import InputComponent from '~/components/InputComponent';

type ParamList = {
  search: undefined;
  result: {
    latNumber: number;
    longNumber: number;
    startDateNumber: number;
    endDateNumber: number;
  };
};

type InputScreenNavigationProp = StackNavigationProp<ParamList, 'search'>;

interface SearchLocationProps {
  navigation: InputScreenNavigationProp;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ navigation }) => {
  const [lat, setLat] = useState<string>('-23.186648');
  const [long, setLong] = useState<string>('-45.881435');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [latError, setLatError] = useState<string>('');
  const [longError, setLongError] = useState<string>('');
  const [startDateError, setStartDateError] = useState<string>('');
  const [endDateError, setEndDateError] = useState<string>('');
  const [markerCood, setmarkerCood] = useState<LatLng>({
    latitude: -23.186648,
    longitude: -45.881435,
  });

  let latNumber: number;
  let longNumber: number;
  let startDateNumber: number;
  let endDateNumber: number;
  let nowDate: Date;
  let nowDay: string;
  let nowMonth: string;
  let nowYear: string;
  let startDay: string;
  let startMonth: string;
  let startYear: string;
  let endDay: string;
  let endMonth: string;
  let endYear: string;
  let startBissexto: boolean;
  let endBissexto: boolean;

  const validateDate = (date: string) => {
    if (date === startDate) {
      if (parseInt(date[4] + date[5], 10) > 12) {
        startDay = date[0] + date[1];
        startMonth = date[2] + date[3];
        startYear = date[4] + date[5] + date[6] + date[7];

        return parseInt(startYear + startMonth + startDay, 10);
      }
      if (parseInt(date[4] + date[5], 10) <= 12) {
        startDay = date[6] + date[7];
        startMonth = date[4] + date[5];
        startYear = date[0] + date[1] + date[2] + date[3];

        return parseInt(startYear + startMonth + startDay, 10);
      }
    }

    if (date === endDate) {
      if (parseInt(date[4] + date[5], 10) > 12) {
        endDay = date[0] + date[1];
        endMonth = date[2] + date[3];
        endYear = date[4] + date[5] + date[6] + date[7];

        return parseInt(endYear + endMonth + endDay, 10);
      }
      if (parseInt(date[4] + date[5], 10) <= 12) {
        endDay = date[6] + date[7];
        endMonth = date[4] + date[5];
        endYear = date[0] + date[1] + date[2] + date[3];

        return parseInt(endYear + endMonth + endDay, 10);
      }
    }
  };

  const validateInputs = () => {
    let isValid = true;

    latNumber = +lat;
    longNumber = +long;
    startDateNumber = +startDate;
    endDateNumber = +endDate;
    nowDate = new Date();
    startBissexto = false;
    endBissexto = false;

    setLatError('');
    setLongError('');
    setStartDateError('');
    setEndDateError('');

    nowDate.setDate(nowDate.getDate() - 3);

    if (nowDate.getDate() < 10) {
      nowDay = '0' + nowDate.getDate().toString();
    } else {
      nowDay = nowDate.getDate().toString();
    }

    if (nowDate.getMonth() < 10) {
      nowMonth = '0' + (nowDate.getMonth() + 1).toString();
    } else {
      nowMonth = (nowDate.getMonth() + 1).toString();
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
      endDateNumber = validateDate(endDate);
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

    if (endDateNumber > parseInt(nowYear + nowMonth + nowDay)) {
      setEndDateError('Data inválida');
      isValid = false;
    }

    if (parseInt(startMonth) > 12 || parseInt(startMonth) < 1) {
      setStartDateError('Data inválida');
      isValid = false;
    }

    if (parseInt(endMonth) > 12 || parseInt(endMonth) < 1) {
      setEndDateError('Data inválida');
      isValid = false;
    }

    if (parseInt(startDay) > 31 || parseInt(startDay) < 1) {
      setStartDateError('Data inválida');
      isValid = false;
    }

    if (parseInt(endDay) > 31 || parseInt(endDay) < 1) {
      setEndDateError('Data inválida');
      isValid = false;
    }

    if (['04', '06', '09', '11'].includes(startMonth)) {
      if (parseInt(startDay) > 30) {
        setStartDateError('Data inválida');
        isValid = false;
      }
    }

    if (['04', '06', '09', '11'].includes(endMonth)) {
      if (parseInt(endDay) > 30) {
        setEndDateError('Data inválida');
        isValid = false;
      }
    }

    if (parseInt(startYear) % 4 === 0) {
      if (parseInt(startYear) % 100 === 0) {
        if (parseInt(startYear) % 400 === 0) {
          startBissexto = true;
        }
        startBissexto = false;
      }
      startBissexto = true;
    }

    if (parseInt(endYear) % 4 === 0) {
      if (parseInt(endYear) % 100 === 0) {
        if (parseInt(endYear) % 400 === 0) {
          endBissexto = true;
        }
        endBissexto = false;
      }
      endBissexto = true;
    }

    if (['02'].includes(startMonth) && startBissexto == false) {
      if (parseInt(startDay) > 28) {
        setStartDateError('Data inválida');
        isValid = false;
      }
    }

    if (['02'].includes(endMonth) && endBissexto == false) {
      if (parseInt(endDay) > 28) {
        setEndDateError('Data inválida');
        isValid = false;
      }
    }

    if (['02'].includes(startMonth) && startBissexto == true) {
      if (parseInt(startDay) > 29) {
        setStartDateError('Data inválida');
        isValid = false;
      }
    }

    if (['02'].includes(endMonth) && endBissexto == true) {
      if (parseInt(endDay) > 29) {
        setEndDateError('Data inválida');
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSearch = () => {
    if (validateInputs()) {
      const inputValues = {
        latNumber, //Valor de Latitude a ser enviado ao back
        longNumber, //Valor de Longitude a ser enviado ao back
        startDateNumber, //Valor de Data de Inicio a ser enviado ao back
        endDateNumber, //Valor de Data de Fim a ser enviado ao back
      };

      //aqui vai ser o redirecionamento para a outra página
      navigation.navigate('result', inputValues);

      console.log(inputValues);
    } else {
      Alert.alert('Por favor, corrija os campos destacados.');
    }
  };

  const onRegionChange = (region: Region) => {
    setmarkerCood({
      latitude: region.latitude,
      longitude: region.longitude,
    });
    setLat(region.latitude + '');
    setLong(region.longitude + '');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/*<View style={styles.headerContainer}>*/}
      <Header title="Pesquisar Local" />
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFill}
            onRegionChangeComplete={onRegionChange}
            region={{
              latitude: -23.186648,
              longitude: -45.881435,
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}>
            <Marker coordinate={markerCood} />
          </MapView>
        </View>
        {/*</View>*/}
        <View style={styles.coordenateContainer}>
          <InputComponent
            label="Latitude"
            placeHolder="Digite a latitude"
            inputWidth={315}
            value={lat}
            onChangeText={setLat}
            maxLength={10}
            warning={latError}
          />
          <InputComponent
            label="Longitude"
            placeHolder="Digite a longitude"
            inputWidth={315}
            value={long}
            onChangeText={setLong}
            maxLength={10}
            warning={longError}
          />

          <InputComponent
            label="Data de Início"
            placeHolder="Data de Início"
            inputWidth={315}
            value={startDate}
            onChangeText={setStartDate}
            maxLength={8}
            warning={startDateError}
          />
          <InputComponent
            label="Data de Fim"
            placeHolder="Data de Fim"
            inputWidth={315}
            value={endDate}
            onChangeText={setEndDate}
            maxLength={8}
            warning={endDateError}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent buttonText="Pesquisar" onPress={handleSearch} />
        </View>
      </ScrollView>
      <Footer navigation={navigation}/>
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
    flexGrow: 1,
    width: '100%',
    marginTop: 85,
    marginBottom: 75,
  },
  coordenateContainer: {
    flexDirection: 'column',
    gap: 10,
    paddingTop: '5%',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },
  footerContainer: {
    position: 'absolute',
    paddingBottom: 10,
  },
  mapContainer: {
    marginTop: 0,
    display: 'flex',
    width: '100%',
    height: 280,
  },
});

export default SearchLocation;
