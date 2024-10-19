import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

/*Props para modificar alguns elementos do style
direto na pagina em que o componente foi utilizado
sendo 'buttonText' e 'onPress' obrigatórios*/
interface ButtonComponentProps {
  buttonText: string | any;
  fontSize?: number;
  fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  width?: number;
  height?: number;
  borderRadius?: number;
  elevation?: number;

  onPress: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  buttonText,
  fontSize,
  fontWeight,
  width,
  height,
  borderRadius,
  elevation,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { width, height, borderRadius, elevation}]} onPress={onPress}>
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
  borderRadius:20,
  elevation: 0
};

const styles = StyleSheet.create({
  container: {},
  button: {
    borderRadius: 10,
    backgroundColor: '#F1F3F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    color: 'rgba(0, 0, 0, 1)',
  },
});

export default ButtonComponent;
