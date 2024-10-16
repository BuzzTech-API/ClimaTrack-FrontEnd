import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

interface HeaderProps {
  title?: string;
}
const { width } = Dimensions.get('window');


const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(0, 73, 11, 1)',
    width: width * 0.60,                 // Full width
    height: 60,                    // Set height as needed
    position: 'absolute',
    top: 30,
    left: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',    
    flexDirection: 'row',
    zIndex:100   
  },
  title: {
    width: '100%',
    alignItems: 'center',   
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',                 // Make text color white for contrast
  },
});

export default Header;

