import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface AreaCardProps {
  areaName: string;
  temperatureValue: number;
  humidityValue: number;
  latValue: number;
  longValue: number;
  alertNumber: number;
  alertWarning1?: string;
  alertWarning2?: string;
}

const AreaCard: React.FC<AreaCardProps> = ({
  areaName,
  temperatureValue,
  humidityValue,
  latValue,
  longValue,
  alertNumber,
  alertWarning1,
  alertWarning2,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.name}> {areaName} </Text>
          <View style={styles.stats}>
            <FontAwesome6 name="temperature-half" size={40} color="white" />
            <Text style={styles.statsText}> {temperatureValue}°C  </Text>
            <MaterialIcons name="water-drop" size={40} color="white" />
            <Text style={styles.statsText}>{humidityValue}</Text>
            <Text style={styles.statsTextMM}>mm</Text>
          </View>
          <View style={styles.coordenates}>
            <Text style={styles.coordenatesText}> Lat: {latValue} </Text>
            <Text style={styles.coordenatesText}> Long: {longValue} </Text>
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
      </View>
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
    borderRightColor: 'white',
    borderRightWidth: 1,
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

