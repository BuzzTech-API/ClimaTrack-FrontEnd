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
  mt?: number;
  mb?: number;
  p?: number;
  borderRadius?: number;
};

export default function ButtonWithIcon({
  onPress,
  icon,
  title,
  width,
  height,
  backgroundColor = '#F1F3F0',
  activeBackgroudColor,
  mt,
  mb,
  p,
  borderRadius = 5,
  color = '#000',
}: Props) {
  const styles = StyleSheet.create({
    btnClickContain: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor,
      borderRadius,
      width,
      height,
      padding: p,
      marginTop: mt,
      marginBottom: mb,
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
        {title.length > 0 && <Text style={styles.btnText}>{title}</Text>}
      </View>
    </TouchableHighlight>
  );
}
