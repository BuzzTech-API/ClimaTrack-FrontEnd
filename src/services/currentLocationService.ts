/* eslint-disable prettier/prettier */
import api from '../api/api';

export const fetchCurrentClimate = async (latitude: number, longitude: number) => {
    try {
        const response = await api.get('/climate/current', {
            params: { latitude, longitude }
        });
        console.log('Dados climáticos recebidos:', response.data);

        // Ivan Germano: Aqui retorna apenas o valor do dia atual (segundo elemento do JSON)
        const currentClimate = response.data[1];
        return currentClimate;
    } catch (error) {
        throw new Error('Erro ao buscar dados climáticos atuais.');
    }
};