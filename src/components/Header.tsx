import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { View, StyleSheet, Text, Dimensions, StatusBar } from 'react-native';

interface HeaderProps {
  title?: string;
}

const { width } = Dimensions.get('window');

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (

    <View style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.title}>
        <Feather name="search" size={20} color="black" />
        <Text style={styles.textTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(220, 220, 220, 0)',
    height: 90,
    position: 'absolute',
    alignSelf: 'center',
    top: 40,
  },
  line: {
    //backgroundColor: 'rgba(147, 147, 147, 1)',
    width: '100%',
    height: 25,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  textTitle: {
    fontSize: 25,
    fontWeight: '700',
    paddingLeft: 20,
  },
});

export default Header;
