import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface AreaCardProps {
  areaId: string;
  areaName: string;
  temperatureValue: number;
  humidityValue: number;
  latValue: number;
  longValue: number;
  alertNumber: number;
  navigation: any;
  alertWarning1?: string;
  alertWarning2?: string;
}

const AreaCard: React.FC<AreaCardProps> = ({
  areaId,
  areaName,
  temperatureValue,
  humidityValue,
  latValue,
  longValue,
  navigation,
  alertNumber,
  alertWarning1,
  alertWarning2,
}) => {
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

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.name}>{areaName}</Text>
          <View style={styles.stats}>
            <Text style={styles.statsText}>{temperatureValue}C</Text>
            <Text style={styles.statsText}>{humidityValue}mm</Text>
          </View>
          <View style={styles.coordenates}>
            <Text style={styles.coordenatesText}> Lat:{latValue}</Text>
            <Text style={styles.coordenatesText}> Long:{longValue}</Text>
          </View>
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
