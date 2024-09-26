import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.header}>
        <View style={styles.line} />
        <View style={styles.title}>
            <Text style={styles.textTitle}>{title}</Text>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '6%', 
  },
  line: {
    backgroundColor: "rgba(147, 147, 147, 1)",
    width: '100%',
    height: '55%',
  },
  title: {
    width: '100%',
    height: '100%',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "flex-start",
    paddingLeft: 20,
    paddingTop: 20,
  }
});

export default Header;