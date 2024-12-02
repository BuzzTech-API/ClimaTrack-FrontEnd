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
      <ScrollView contentContainerStyle={styles.scrollContainer} >
        <Text style={styles.title}>Como podemos ajudar você?</Text>

        <View style={styles.section}>
          {/* Sessão de Pesquisa */}
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

          {/* Linha entre as Sections */}
          <View style={styles.line} />

          {/* Sessão de resultados */}
          <Text style={styles.subTitle}>
            Tela de Resultados.
          </Text>

          <Image
            source={require('../img/Resultado1_Help.png')} // Replace with the path to your image
            style={styles.image}
          />
          <Text style={styles.text}>
            1. Latitude e logintude do local pesquisado {"\n"}
            2. Média de temperatura dos dias selecionados {"\n"}
            3. Gráfico de temperatura dos dias selecionados{"\n"}
            4. Média de pluviosidade dos dias selecionados{"\n"}
            5. Gráfico de temperatura dos dias selecionados {"\n"}
            6. Pressione o botão "..." para atualizar as datas de pesquisa
          </Text>

          <Text style={styles.subTitle}>
            Botão "..."
          </Text>
          <Image
            source={require('../img/Resultado3_Help.png')} // Replace with the path to your image
            style={styles.image}
          />
          <Text style={styles.text}>
            1. Selecione a data de início {"\n"}
            2. Selecione a data de termino {"\n"}
            3. Clique no botão "Atualizar" para pesquisar novamente com as datas novas no mesmo local
          </Text>


          <Text style={styles.subTitle}>
            Final da tela de resultados
          </Text>
          <Image
            source={require('../img/Resultado2_Help.png')} // Replace with the path to your image
            style={styles.image}
          />
          <Text style={styles.text}>
            1. Digite o nome desejado para o local {"\n"}
            2. Clique no botão "Salvar" para salvar o local pesquisado {"\n"}
          </Text>


          {/* Linha entre as Sections */}
          <View style={styles.line} />

          {/* Sessão de locais */}
          <Text style={styles.subTitle}>
            Tela de Meus Locais.
          </Text>

          <Image
            source={require('../img/MyAreas_Help.png')} // Replace with the path to your image
            style={styles.image}
          />
          <Text style={styles.text}>
            1. Selecione a aba "Meus Locais" {"\n"}
            2. Tela com todos os locais salvos {"\n"}
            3. Nome do local salvo {"\n"}
            4. Temperatura e pluviosidade atual do local {"\n"}
            5. Coordenadas do local {"\n"}
            6. Pressione o botão para editar o nome do local
          </Text>

          <Text style={styles.subTitle}>
            Editar nome do local.
          </Text>

          <Image
            source={require('../img/MyAreas2_Help.png')} // Replace with the path to your image
            style={styles.image}
          />
          <Text style={styles.text}>
            Ao clicar no botão de edição {"\n"}
            1. Digite o novo nome para o local {"\n"}
            2. Clique no botão "Salvar" para guardar as alterações
          </Text>

          {/* Linha entre as Sections */}
          <View style={styles.line} />

          {/* Sessão de locais salvos */}
          <Text style={styles.subTitle}>
            Tela de Local Salvo.
          </Text>
          <View>
            <Image
              source={require('../img/LocalSalvo1_Help.png')} // Replace with the path to your image
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>
            Ao clicar em um dos locais salvos na aba de "Meus Locais" {"\n"}
            1. Nome do local {"\n"}
            2. Botão de configuração dos alertas {"\n"}
            3. Informações gerais do dia atual {"\n"}
            4. Campo de alertas (caso tenha algum) {"\n"}
            5. Gráficos com os dados históricos do local{"\n"}
            6. Botão de pesquisa de datas específicas dentro da série histórica
          </Text>

          <Text style={styles.subTitle}>
            Configurações do local.
          </Text>
          <View>
            <Image
              source={require('../img/LocalSalvo3_Help.png')} // Replace with the path to your image
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>
            Ao clicar no botão de configurações do local {"\n"}
            1. Campo para editar o nome do local {"\n"}
            2. Botão para permitir que o local fique disponível offline {"\n"}
            3. Configurações de alerta para temperatura e pluviosidade. Selecione o mínimo e a máxima permitida {"\n"}
            4. Configurações de alerta prologado para temperatura e pluviosidade. Selecione o mínimo e a máxima permitida {"\n"}
            5. Campo para digitar os dias que a notificação de alerta prologado irá funcionar {"\n"}
            6. Clique no botão "Excluir local" para deletar o local {"\n"}
            7. Clique no botão "Atualizar" para salvar as alterações
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
    paddingTop: 90,
    paddingHorizontal: 16,
    paddingBottom: 100,
    flexGrow: 1
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
    color: '#333',
    marginTop: 20
  },
  section: {
    marginBottom: 0,
    alignItems: 'center',
    marginTop: 5,
  },
  image: {
    marginVertical: 0,
    resizeMode: 'contain',
    width: 350
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    color: '#555',
    paddingHorizontal: 20
  },
  line: {
    height: 1, // Thin horizontal line
    backgroundColor: 'rgba(165, 165, 165, 1)', // Light gray color
    marginVertical: 30, // Add space around the line
    width: '100%',
  },
});

export default HelpScreen;

