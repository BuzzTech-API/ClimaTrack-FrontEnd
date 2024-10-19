import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { View, StyleSheet, Text, Button, TouchableHighlight } from 'react-native';

import ButtonWithIcon from './ButtonWithIcon';
type props = {
  navigation: any;
};
const Footer = ({ navigation }: props) => {
  return (
    <View style={styles.footer}>
      <ButtonWithIcon
        title="Pesquisar"
        width={150}
        height={60}
        onPress={() => {
          navigation.navigate('search');
        }}
        icon={<Feather name="search" size={24} color="black" />}
        activeBackgroudColor="#F1F3F0"
        backgroundColor="#FFF"
      />
      <ButtonWithIcon
        title="Meus Locais"
        width={150}
        height={60}
        onPress={() => {
          console.log('pressed');
        }}
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
  },
});

export default Footer;
