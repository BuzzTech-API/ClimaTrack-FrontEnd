import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

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
            <View style={styles.alert}>
            <Text style={styles.number}>{alertNumber ?? 0} Alertas!</Text>
                {alertWarning1 ? <Text style={styles.warning}>{alertWarning1}</Text> : null}
                {alertWarning2 ? <Text style={styles.warning}>{alertWarning2}</Text> : null}
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
    fontSize: 20,
    fontWeight: '500',
    padding: 8,
    color: 'white',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 10,
    width: '100%',
  },
  statsText: {
    fontSize: 25,
    color: 'white',
  },
  coordenates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    width: '100%',
    paddingLeft: 40,
    paddingRight: 20,
  },
  coordenatesText: {
    color: 'white',
  },
  alert: {
    height: '100%',
    width: '40%',
    alignItems: 'center',
  },
  number: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    paddingTop: 7,
  },
  warning: {
    width: '80%',
    paddingTop: 6,
    paddingLeft: 25,
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
  },
});

export default AreaCard;

