import { StyleSheet } from 'react-native';
import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { Entypo } from '@expo/vector-icons';

//Página temporária

interface HelpProps {
  navigation: any;
}

const HelpScreen: React.FC<HelpProps> = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Header title="Ajuda" icon={<Entypo name="help" size={20} color="black" />} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Como podemos ajudar você?</Text>




        {/* Sessão de Pesquisa */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>
            Como pesquisar um local.
          </Text>
          <Image
            source={require('../img/Pesquisa_Help.png')} // Replace with the path to your image
            style={styles.image}
          />
          <Text style={styles.text}>
            1. Selecione a aba "Pesquisa" {"\n"}
            2. Digite a Latitude (Ou selecione no mapa){"\n"}
            3. Digite a Longitude (Ou selecione no mapa){"\n"}
            4. Digite a data de início da sua busca de histórico{"\n"}
            5. Digite a data de fim. {"\n"}
            6. Pressione o botão "Pesquisar"

          </Text>
        </View>

        {/* Linha entre as Sections */}
        <View style={styles.line} />

        {/* Outra Sessão exemplo só pra ver como fica */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>
            Como pesquisar um local.
          </Text>
          <Image
            source={require('../img/Pesquisa_Help.png')} // Replace with the path to your image
            style={styles.image}
          />
          <Text style={styles.text}>
            1. Selecione a aba "Pesquisa" {"\n"}
            2. Digite a Latitude (Ou selecione no mapa){"\n"}
            3. Digite a Longitude (Ou selecione no mapa){"\n"}
            4. Digite a data de início da sua busca de histórico{"\n"}
            5. Digite a data de fim. {"\n"}
            6. Pressione o botão "Pesquisar"

          </Text>
        </View>

      </ScrollView>


      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    paddingTop: 80,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 65
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  section: {
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  image: {
    width: 300,
    height: 550,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    color: '#555',
  },
  line: {
    height: 1, // Thin horizontal line
    backgroundColor: 'rgba(165, 165, 165, 1)', // Light gray color
    marginVertical: 10, // Add space around the line
  },
});

export default HelpScreen;

