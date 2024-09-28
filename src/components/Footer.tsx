import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
  
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'rgba(0, 73, 11, 0.2)', 
    height: 75,
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute', 
    bottom: 0, 
    left: 0,
    right: 0,
  },
});

export default Footer;
