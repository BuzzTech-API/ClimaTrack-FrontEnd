import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

/*Props para modificar alguns elementos do style
direto na pagina em que o componente foi utilizado
sendo 'buttonText' e 'onPress' obrigatórios*/
interface ButtonComponentProps {
  buttonText: string;
  fontSize?: number;
  fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  width?: number;
  height?: number;

  onPress: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  buttonText,
  fontSize,
  fontWeight,
  width,
  height,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { width, height }]} onPress={onPress}>
        <Text style={[styles.buttonText, { fontSize, fontWeight }]}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

/*Valores de styles padrão caso não sejam passados as props
ao chamar o componente*/
ButtonComponent.defaultProps = {
  fontSize: 15,
  fontWeight: '500',
  width: 120,
  height: 45,
};

const styles = StyleSheet.create({
  container: {},
  button: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 73, 11, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default ButtonComponent;

