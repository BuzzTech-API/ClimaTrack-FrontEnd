import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <View style={styles.line} />
      <View style={styles.title}>
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
    top: 0,
    left: 0,
    right: 0,
  },
  line: {
    //backgroundColor: 'rgba(147, 147, 147, 1)',
    width: '100%',
    height: 25,
  },
  title: {
    width: '65%',
    height: 65,
    borderBottomRightRadius: 40,
    backgroundColor: 'rgba(147, 147, 147, 1)',
  },
  textTitle: {
    fontSize: 25,
    fontWeight: '700',
    alignSelf: 'flex-start',
    paddingLeft: 50,
    paddingTop: 15,
  },
});

export default Header;

