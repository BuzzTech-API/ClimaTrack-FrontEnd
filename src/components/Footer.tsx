import React from 'react';
import { View, StyleSheet } from 'react-native';


interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return <View style={styles.footer} />;
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "rgba(0, 73, 11, 0.2)",
    width: '100%',
    height: "9%",
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: "absolute",
    bottom: 0,
  },
});

export default Footer;