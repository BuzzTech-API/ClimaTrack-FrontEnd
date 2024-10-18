import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { View, StyleSheet, Text, Button, TouchableHighlight } from 'react-native';

import ButtonWithIcon from './ButtonWithIcon';
const Footer = () => {
  return (
    <View style={styles.footer}>
      <ButtonWithIcon
        title="Pesquisar"
        width={50}
        height={60}
        onPress={() => { }}
        icon={<Feather name="search" size={24} color="black" />}
        activeBackgroudColor="#F1F3F0"
        backgroundColor="#FFF"
      />
      <ButtonWithIcon
        title="Meus Locais"
        width={50}
        height={60}
        onPress={() => { }}
        icon={<Entypo name="location-pin" size={24} color="black" />}
        activeBackgroudColor="#F1F3F0"
        backgroundColor="#FFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#FFF',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    elevation: 20,
    position: 'absolute',
    gap: 10,
    paddingHorizontal: 20,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  button: {
    width: 170,
    height: 85,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '500',
    paddingTop: 25,
  },
  line: {
    height: 85,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

export default Footer;
