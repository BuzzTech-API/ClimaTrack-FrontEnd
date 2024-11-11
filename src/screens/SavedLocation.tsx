/* eslint-disable prettier/prettier */
import { Feather, FontAwesome, Fontisto } from '@expo/vector-icons';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { fetchPluviTemp } from '~/api/getPluvTemp';
import ButtonComponent from '~/components/ButtonComponent';
import ButtonWithIcon from '~/components/ButtonWithIcon';
import { ConfirmDelLocation } from '~/components/ConfirmDelLocation';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import InputComponent from '~/components/InputComponent';
import ModalConfigGrafico from '~/components/ModalConfigGrafico';
import ModalConfigLocal from '~/components/ModalConfigLocal';
import GraphicRainfall from '~/components/graphicRainfall';
import GraphicTemperature from '~/components/graphicTemperature';
import { fetchCurrentClimate } from '~/services/currentLocationService';
import { TempPluvData } from '~/types/resquestTempPluv';

type ParamList = {
    search: undefined;
    result: {
        latNumber: number;
        longNumber: number;
        startDateNumber: number;
        endDateNumber: number;
    };

    //Aqui teoricamente é onde decide o que vem da outra tela como não tem outra tela no momento desse comentário
    //eu coloquei o básico ai tem que configurar lá, setar um objeto que tenha todos esses parametros e enviar para cá
    //na dúvida faz igual a tela de Pesquisa envia para -> Resultado to me baseando nisso espero que funcione
    saved: {
        latNumber: number;
        longNumber: number;
        areaName: string;
        areaId: string;
    };
};

type Props = StackScreenProps<ParamList, 'saved'>;
export type SavedScreenNavigationProp = StackNavigationProp<ParamList, 'saved'>;

interface SavedScreenProps {
    navigation: SavedScreenNavigationProp;
}

function converterDataParaNumero(dataStr: string): number {
    // Divida a string da data em dia, mês e ano
    const [dia, mes, ano] = dataStr.split('/');

    // Concatene ano, mês e dia no formato YYYYMMDD e converta para número
    const dataFormatada = `${ano}${mes}${dia}`;
    // Retorne como número
    return parseInt(dataFormatada, 10);
}
//Esse "navigation" é a navegação de telas. Se eu não me engano é usado na tela q vem antes dessa (a de locais salvos)
//de novo acredito que se basear-se na tela de Pesquisa -> Resultado deve se deus quiser dar tudo certo
const SavedLocation: React.FC<Props & SavedScreenProps> = ({ navigation, route }) => {
    //!!!!!!!!!!!!!!!!!!!!!
    //Desses params faz o novo fetch, ouuu a gnt troca as props q vem no route para vir direto os dados mais facil assim
    //Aqui ta todos os parametros que vem de outra tela
    const params = route.params;

    //parametros necessários para funcionar o site, só fazer o fetch novo ou trazer da outra tela

    //todos esses parametros estão sendo utilizados para mostrar para o usuário, troque eles nas tags <>
    //e pegue eles vindo da outra tela ouu fazendo um fetch novo com a lat e long que vem da outra tela

    //ai a data tem q vir de lá tbm eu acho pq o usuário ja colocou né enfim o campo ta ai em baixo o useState só trocar ali
    // Pega a data de 2 dias antes de hoje e seta como data inicial e a data de um mes atras como data de inicio
    const nowDate = new Date();
    nowDate.setDate(nowDate.getDate() - 2);
    const day = nowDate.getDate().toString();
    const nowMonth =
        nowDate.getMonth() + 1 >= 10
            ? (nowDate.getMonth() + 1).toString()
            : '0'.concat((nowDate.getMonth() + 1).toString());
    nowDate.setMonth(nowDate.getMonth() - 1);
    const month =
        nowDate.getMonth() + 1 >= 10
            ? (nowDate.getMonth() + 1).toString()
            : '0'.concat((nowDate.getMonth() + 1).toString());
    const year = nowDate.getFullYear().toString();
    const date = day + '/' + month + '/' + year;
    const date2 = day + '/' + nowMonth + '/' + year;

    const [startDate, setStartDate] = React.useState<string>(date); // Para a data de início
    const [endDate, setEndDate] = React.useState<string>(date2); // Para a data de fim
    const [isOpen, setIsOpen] = React.useState(false);
    const [maxTemp, setMaxTemp] = useState(0);
    const [minTemp, setMinTemp] = useState(0);
    const [pluviometry, setPluviometry] = useState(0);
    const [dataPluvTemp, setdataPluvTemp] = useState<TempPluvData>();
    // ignora isso aqui é pra notificação depois
    // const [showHistory, setShowHistory] = useState(true);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    React.useEffect(() => {
        (async () => {
            const climateData = await fetchCurrentClimate(params.latNumber, params.longNumber);
            setPluviometry(climateData['precipitation (mm)']);
            setMaxTemp(climateData['temperature_max (C°)']);
            setMinTemp(climateData['temperature_min (C°)']);
        })();
        return () => {};
    }, []);

    const getGraphicsData = async () => {
        try {
            const data: TempPluvData = await fetchPluviTemp({
                latitude: params.latNumber,
                longitude: params.longNumber,
                startDate: converterDataParaNumero(startDate),
                endDate: converterDataParaNumero(endDate),
            });
            setdataPluvTemp(data);
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Os dados climáticos foram carregados com sucesso.',
            });
        } catch (err) {
            if (err instanceof Error) {
            }
            Toast.show({
                type: 'error',
                text1: 'Erro ao buscar dados.',
                text2: 'Não foi possível carregar os dados climáticos.',
            });
        } finally {
        }
    };

    React.useEffect(() => {
        getGraphicsData();

        return () => {};
    }, []);

    return (
        <View style={styles.container}>
            <Header
                title={params.areaName}
                icon={<ModalConfigLocal navigation={navigation} idLocation={params.areaId} />}
                flexDirection="row-reverse"
                justifyContent="space-between"
                gap={150}
                width="99%"
            />
            <View style={[styles.buttonsContainer, { paddingHorizontal: 2, flexDirection: 'row' }]}>
                {/* Esse é o botão de APAGAR!!! */}
            </View>
            <ScrollView style={{ marginTop: 60, marginBottom: 55 }}>
                <View style={styles.tempEchuva} /* Temperatura e Pluviosidade */>
                    {/* Title */}
                    <Text style={styles.title}>Temperatura do dia</Text>
                    <View style={styles.row}>
                        {/* Max Temperature */}
                        <View style={[styles.tempContainer, { minWidth: 170 }]}>
                            <Text style={styles.label}>Max</Text>
                            <FontAwesome
                                name="thermometer-full"
                                size={24}
                                color="red"
                                style={styles.icon}
                            />
                            <Text style={styles.value}>{maxTemp.toFixed(1)}°C</Text>
                        </View>
                        {/* Min Temperature */}
                        <View style={styles.tempContainer}>
                            <Text style={styles.label}>Min</Text>
                            <FontAwesome
                                name="thermometer-empty"
                                size={24}
                                color="blue"
                                style={styles.icon}
                            />
                            <Text style={styles.value}>{minTemp.toFixed(1)}°C</Text>
                        </View>
                    </View>
                    <View style={[styles.row, { marginBottom: 10 }]}>
                        {/* Rain */}
                        <View style={[styles.tempContainer, { minWidth: 170 }]}>
                            <Fontisto name="rain" size={24} color="lightblue" style={styles.icon} />
                            <Text style={styles.value}>{pluviometry.toFixed(2)}</Text>
                            <Text>mm</Text>
                        </View>
                        {/* Lat & Long */}
                        <View style={styles.latlongContainer}>
                            <Text style={styles.latlongText}>{params.latNumber.toFixed(5)}</Text>
                            <Text style={styles.latlongText}>{params.longNumber.toFixed(5)}</Text>
                        </View>
                    </View>
                </View>

                {/* COLOCAR OS 2 TIPOS DE GRÁFICOS AQUI IGUAL ESSES AQUI NORMAL SEM BO (teoricamente) */}
                <View style={{ gap: 20 }}>
                    <View style={styles.serieHistorica}>
                        <Text style={styles.textTitle}>Série Histórica</Text>
                        <View style={{ height: 45, width: 45 }}>
                            <ModalConfigGrafico
                                startDate={startDate}
                                endDate={endDate}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                                setdataPluvTemp={setdataPluvTemp}
                                latNumber={params.latNumber}
                                longNumber={params.longNumber}
                            />
                        </View>
                    </View>
                    {dataPluvTemp !== undefined && (
                        <GraphicTemperature dataPluvTemp={dataPluvTemp.data} />
                    )}
                    {dataPluvTemp !== undefined && (
                        <GraphicRainfall dataPluvTemp={dataPluvTemp.data} />
                    )}
                </View>
                {/*ignora isso aqui é da notificação depois 
                {showHistory ? <GraphicTemperature /> : <AlertCard />} */}

                <View style={styles.dateContainer} />
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
};

//Esse css ta uma dresgraça mas é a vida. se deus quiser eu não terei que me especializar em frontend
//ta realmente uma maluquisse boa sorte quem mexer nisso aqui futuramente >:)

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
        fontWeight: 'bold',
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
        marginLeft: 10,
    },
    icon: {
        marginRight: 8,
        marginLeft: 10,
    },
    value: {
        fontSize: 30,
        color: '#666',
    },
    buttonsContainer: {
        flexDirection: 'row-reverse', // Align buttons horizontally
        zIndex: 2, // Ensure buttons are above the header if needed
        justifyContent: 'space-between',
        width: '100%',
    },
    tempEchuva: {
        backgroundColor: 'rgba(238, 238, 238, 1)',
        borderRadius: 12,
        padding: 10,
        elevation: 6,
        marginBottom: 20,
    },
    latlongContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 10,
    },
    latlongText: {
        fontSize: 18,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '90%',
        left: 20,
    },

    textTitle: {
        fontSize: 20,
        fontWeight: '700',
        paddingLeft: 20,
    },
    serieHistorica: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
    },
});

export default SavedLocation;
