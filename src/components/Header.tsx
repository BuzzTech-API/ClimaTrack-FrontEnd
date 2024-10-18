import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <View style={styles.title}>
        <Feather name="search" size={20} color="black" />
        <Text style={styles.textTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 80,
    position: 'absolute',
    alignSelf: 'center',
    top: 40,
  },
  line: {
    backgroundColor: 'rgba(147, 147, 147, 1)',
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
    fontSize: 20,
    fontWeight: '700',
    paddingLeft: 20,
  },
});

export default Header;
