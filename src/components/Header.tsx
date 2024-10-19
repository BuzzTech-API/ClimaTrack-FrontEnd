import React, { ReactElement } from 'react';
import { View, StyleSheet, Text, Dimensions, StatusBar } from 'react-native';

interface HeaderProps {
  title?: string;
  icon?: ReactElement<any, any>;
}

const { width } = Dimensions.get('window');

const Header: React.FC<HeaderProps> = ({ title, icon }) => {
  return (
    <View style={styles.header}>
      <View style={styles.title}>
        {icon}
        <Text style={styles.textTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(220, 220, 220, 0)',
    height: 80,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
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
