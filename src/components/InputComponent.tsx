import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

/*Props para modificar alguns elementos do style
direto na pagina em que o componente foi utilizado
sendo 'label', 'value' e 'onChangeText' obrigatórios*/
interface InputComponentProps {
  label: string;
  fontSize?: number;
  fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  placeHolder?: string;
  placeHolderWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  inputSize?: number;
  inputWidth?: number;
  inputHeight?: number;
  maxLength?: number;

  warning?: string;

  value: string;
  onChangeText: (text: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  placeHolder,
  fontSize,
  fontWeight,
  placeHolderWeight,
  inputSize,
  inputWidth,
  inputHeight,
  warning,
  onChangeText,
  value,
  maxLength,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            fontSize: inputSize,
            fontWeight: placeHolderWeight,
            width: inputWidth,
            height: inputHeight,
          },
        ]}
        keyboardType="numeric"
        placeholder={placeHolder}
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
      />
      <Text style={styles.warning}> {warning} </Text>
    </View>
  );
};

/*Valores de styles padrão caso não sejam passados as props
ao chamar o componente*/
InputComponent.defaultProps = {
  fontSize: 22,
  fontWeight: '500',
  placeHolderWeight: '500',
  inputSize: 15,
  inputWidth: 200,
  inputHeight: 40,
  warning: '',
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#F1F3F0',
    color: '#000',
    paddingLeft: 11,
    alignSelf: 'center',
  },
  warning: {
    color: 'red',
    width: 100,
    height: 20,
    alignSelf: 'center',
  },
});

export default InputComponent;
