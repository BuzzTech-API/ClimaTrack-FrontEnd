import Feather from '@expo/vector-icons/Feather';
import { Component, ReactElement } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, GestureResponderEvent } from 'react-native';

type Props = {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  icon: ReactElement<any, any>;
  title: string;
  width: number;
  height: number;
  color?: string;
  backgroundColor?: string;
  activeBackgroudColor?: string;
};

export default function ButtonWithIcon({
  onPress,
  icon,
  title,
  width,
  height,
  backgroundColor = '#F1F3F0',
  activeBackgroudColor,
  color = '#000',
}: Props) {
  const styles = StyleSheet.create({
    btnClickContain: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor,
      borderRadius: 5,
      width,
      height,
      padding: 5,
      marginTop: 5,
      marginBottom: 5,
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      borderRadius: 10,
    },
    btnIcon: {
      height: 25,
      width: 25,
    },
    btnText: {
      fontSize: 18,
      color,
      marginLeft: 10,
      marginTop: 2,
    },
  });
  return (
    <TouchableHighlight
      style={styles.btnClickContain}
      underlayColor={activeBackgroudColor}
      onPress={onPress}>
      <View style={styles.btnContainer}>
        {icon}
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}
