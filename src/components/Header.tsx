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
        <Text style={styles.textTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(0, 73, 11, 1)',
    width: width * (2 / 3),              // Set width to two-thirds of the screen
    height: 60,                           // Keep height as 60
    position: 'absolute',
    top: 0,                               // Move to the top of the screen
    left: 0,                              // Start from the left edge
    borderBottomRightRadius: 50,          // Rounded bottom-right corner
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 100,
  },
  title: {
    width: '100%',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
});

export default Header;

