import { FontAwesome, Fontisto } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AlertCard from '~/components/AlertCard';
import ButtonComponent from '~/components/ButtonComponent';
import Footer from '~/components/Footer';
import GraphicTemperature from '~/components/graphicTemperature';
import Header from '~/components/Header';
import InputComponent from '~/components/InputComponent';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';



type ParamList = {
    search: undefined;
    result: {
      latNumber: number;
      longNumber: number;
      startDateNumber: number;
      endDateNumber: number;
    };
    saved: {
        latNumber: number;
        longNumber: number;
        startDateNumber: number;
        endDateNumber: number;
        areaName: string
    }
  };
  


type Props = StackScreenProps<ParamList, 'saved'>;
type SavedScreenNavigationProp = StackNavigationProp<ParamList, 'saved'>;

interface SavedScreenProps {
  navigation: SavedScreenNavigationProp;
}



const SavedLocation: React.FC<Props & SavedScreenProps> = ({navigation, route }) => {
    
    
    //Desses params faz o novo fetch, ouuu a gnt troca as props q vem no route para vir direto os dados mais facil assim
    const params = route.params
    

    //parametros necessários para funcionar o site, só fazer o fetch novo ou trazer da outra tela
    let maxTemp = 34
    let minTemp = 17
    let pluviometry = 130
    let areaName = "Casa do Seu zé"
    let latitude = '-25.123123123123'
    let longitude = '-45.123124542134'

  
    let date = '22062022'
    let date2 = '25072024'
    
    
    const [startDate, setStartDate] = React.useState<string>(date); // Para a data de início
    const [endDate, setEndDate] = React.useState<string>(date2); // Para a data de fim



    const [showHistory, setShowHistory] = useState(true);


    return (


        <View style={styles.container}>
        
            <Header title={areaName} />
            <View style={[styles.buttonsContainer, { paddingHorizontal: 2 }]}>

                {/* Esse é o botão de apagar */}
                <ButtonComponent elevation={10} borderRadius={100} width={48} buttonText={<FontAwesome name="trash" size={24} color="white" />} onPress={()=>('')} fontSize={20}></ButtonComponent>

                {/* Esse é o botão de notificações */}
                {/* <ButtonComponent borderRadius={100} width={48} buttonText={<Ionicons name="notifications-sharp" size={24} color="white" />} onPress={() => setShowHistory(true)} fontSize={20}></ButtonComponent> */}

            </View>
            <ScrollView style={{ marginTop: 60, marginBottom: 55 }}>

                <View style={styles.tempEchuva}/* Temperatura e Pluviosidade */>
                    {/* Title */}
                    <Text style={styles.title}>Temperatura do dia</Text>
                    <View style={styles.row}>
                        {/* Max Temperature */}
                        <View style={[styles.tempContainer, { minWidth: 170 }]}>
                            <Text style={styles.label}>Max</Text>
                            <FontAwesome name="thermometer-full" size={24} color="red" style={styles.icon} />
                            <Text style={styles.value}>{maxTemp}°C</Text>
                        </View>
                        {/* Min Temperature */}
                        <View style={styles.tempContainer}>
                            <Text style={styles.label}>Min</Text>
                            <FontAwesome name="thermometer-empty" size={24} color="blue" style={styles.icon} />
                            <Text style={styles.value}>{minTemp}°C</Text>
                        </View>
                    </View>
                    <View style={[styles.row, { marginBottom: 10 }]}>

                        {/* Rain */}
                        <View style={[styles.tempContainer, { minWidth: 170 }]}>

                            <Fontisto name="rain" size={24} color="lightblue" style={styles.icon} />
                            <Text style={styles.value}>{pluviometry}</Text><Text>mm</Text>
                        </View>
                        <View style={styles.latlongContainer}>
                            <Text style={styles.latlongText}>{latitude}</Text>
                            <Text style={styles.latlongText}>{longitude}</Text>
                        </View>
                    </View>
                </View>

                {/* COLOCAR OS 2 TIPOS DE GRÁFICOS AQUI IGUAL ESSES AQUI NORMAL SEM BO (teoricamente) */}
                <GraphicTemperature />
                <GraphicTemperature />

                {/* {showHistory ? <GraphicTemperature /> : <AlertCard />} */}

                <View style={styles.dateContainer}>
                    <InputComponent
                        label="Data de Início"
                        placeHolder="Dia/Mês/Ano"
                        value={startDate}
                        onChangeText={setStartDate}
                        maxLength={8}
                        inputWidth={150}
                        inputHeight={40}
                    />
                    <InputComponent
                        label="Data de Fim"
                        placeHolder="Dia/Mês/Ano"
                        value={endDate}
                        onChangeText={setEndDate}
                        maxLength={8}
                        inputWidth={150}
                        inputHeight={40}
                    />
                </View>



            </ScrollView>
            <Footer />
        </View>
    );
};

//Esse css ta uma dresgraça mas é a vida. se deus quiser eu não terei que me especializar em frontend
//ta realmente uma maluquisse boa sorte quem mexer nisso aqui futuramente


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 23,
        color: '#333',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 8,
        marginLeft: 10
    },
    icon: {
        marginRight: 8,
        marginLeft: 10
    },
    value: {
        fontSize: 30,
        color: '#666',
    },
    buttonsContainer: {
        flexDirection: 'row', // Align buttons horizontally
        position: 'absolute',
        top: 8, // Adjust to position buttons beside the header
        right: -10, // Space from the left edge
        zIndex: 2, // Ensure buttons are above the header if needed
        justifyContent: 'space-between',
        width: 110
    },
    tempEchuva: {
        backgroundColor: 'rgba(238, 238, 238, 1)',
        borderRadius: 12,
        padding: 10,
        elevation: 6,
        marginBottom: 20
    },
    latlongContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 10,
    },
    latlongText: {
        fontSize: 18
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '90%',
        left: 20
    }
});


export default SavedLocation