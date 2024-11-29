import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import Footer from '~/components/Footer';
import Header from '~/components/Header';

//Página temporária

interface HelpProps {
  navigation: any;
}

const HelpScreen: React.FC<HelpProps> = ({ navigation }) => {

  return (
    <View>
     <Header title="Ajuda" />



     <Footer navigation={navigation} />
    </View>
  );
};

export default HelpScreen;

