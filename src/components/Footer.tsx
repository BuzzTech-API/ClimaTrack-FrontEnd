import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

interface FooterProps {
  title?: string;
  navigation: any;
}

const Footer: React.FC<FooterProps> = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('search')}>
        <Text style={styles.buttonText}> Pesquisar </Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('areas')}>
        <Text style={styles.buttonText}> Meus Locais </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'rgba(147, 147, 147, 1)',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    alignItems: 'center',
    position: 'absolute',
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
