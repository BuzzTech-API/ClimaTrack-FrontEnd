import { FontAwesome, Fontisto } from '@expo/vector-icons';
import { max } from 'date-fns';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { rgbaColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import AlertCard from '~/components/AlertCard';
import ButtonComponent from '~/components/ButtonComponent';
import Footer from '~/components/Footer';
import GraphicRainfall from '~/components/graphicRainfall';
import GraphicTemperature from '~/components/graphicTemperature';
import Header from '~/components/Header';

type SavedLocationParams = {
    maxTemp: number
    minTemp: number
    pluviometry: number
    areaName: string

}


const SavedLocation: React.FC<SavedLocationParams> = ({ maxTemp, minTemp, pluviometry, areaName }) => {
    maxTemp = 34
    minTemp = 17
    pluviometry = 130
    areaName = "Casa do Seu zé"

    const [showHistory, setShowHistory] = useState(true);


    return (


        <View style={styles.container}>
            <Header title={areaName} />
            <ScrollView style={{ marginTop: 60, marginBottom: 55 }}>

                <View /* Temperatura e Pluviosidade */>
                    {/* Title */}
                    <Text style={styles.title}>Temperatura do dia</Text>
                    <View style={styles.row}>
                        {/* Max Temperature */}
                        <View style={[styles.tempContainer, { minWidth: 190 }]}>
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
                    {/* Rain */}
                    <View style={[styles.tempContainer, { marginTop: 20, marginBottom: 20 }]}>

                        <Fontisto name="rain" size={24} color="lightblue" style={styles.icon} />
                        <Text style={styles.value}>{pluviometry}</Text><Text>mm</Text>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <View style={{marginRight: 40}}>
                        <ButtonComponent buttonText='Histórico' onPress={() => setShowHistory(true)} fontSize={20}></ButtonComponent>
                    </View>
                    <View>
                        <ButtonComponent buttonText='Alertas' onPress={() => setShowHistory(false)} fontSize={20}></ButtonComponent>
                    </View>
                </View>

                {showHistory ? <GraphicTemperature /> : <AlertCard />}


            </ScrollView>
            <Footer/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 23,
        color: '#333',
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'left',
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
    },
    icon: {
        marginRight: 8,
    },
    value: {
        fontSize: 30,
        color: '#666',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }
});


export default SavedLocation