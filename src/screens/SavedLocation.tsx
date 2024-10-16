import { FontAwesome, Fontisto } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AlertCard from '~/components/AlertCard';
import ButtonComponent from '~/components/ButtonComponent';
import Footer from '~/components/Footer';
import GraphicTemperature from '~/components/graphicTemperature';
import Header from '~/components/Header';
import Ionicons from '@expo/vector-icons/Ionicons';

type SavedLocationParams = {
    maxTemp: number
    minTemp: number
    pluviometry: number
    areaName: string
    latitude: string
    longitude: string

}


const SavedLocation: React.FC<SavedLocationParams> = ({ maxTemp, minTemp, pluviometry, areaName, latitude, longitude }) => {
    maxTemp = 34
    minTemp = 17
    pluviometry = 130
    areaName = "Casa do Seu zé"
    latitude = '-25.123123123123'
    longitude = '-45.123124542134'

    const [showHistory, setShowHistory] = useState(true);


    return (


        <View style={styles.container}>
            <Header title={areaName} />
            <View style={[styles.buttonsContainer, {paddingHorizontal:2}]}>

            <ButtonComponent borderRadius={100} width={48} buttonText={<FontAwesome name="trash" size={24} color="white" />} onPress={() => setShowHistory(false)} fontSize={20}></ButtonComponent>
            <ButtonComponent borderRadius={100} width={48} buttonText={<Ionicons name="notifications-sharp" size={24} color="white" />} onPress={() => setShowHistory(true)} fontSize={20}></ButtonComponent>
            
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
                    <View style={[styles.row, {marginBottom: 10}]}>

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

                {showHistory ? <GraphicTemperature /> : <AlertCard />}


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
        top: 40, // Adjust to position buttons beside the header
        right: 20, // Space from the left edge
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
    }
});


export default SavedLocation