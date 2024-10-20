/* eslint-disable prettier/prettier */
import api from '../api/api';

// Ivan Germano: Função para buscar os dados climáticos atuais de uma localização específica
export const fetchCurrentClimate = async (latitude: number, longitude: number) => {
    try {
        // Ivan Germano: Faz uma requisição GET para a rota '/climate/current' com os parâmetros de latitude e longitude
        const response = await api.get('/climate/current', {
            params: { latitude, longitude }
        });
        // Ivan Germano: Loga os dados climáticos recebidos para depuração
        console.log('Dados climáticos recebidos:', response.data);

        // Ivan Germano: Aqui retorna apenas o valor do dia atual (segundo elemento do JSON)
        const currentClimate = response.data[1];
        return currentClimate;
    } catch (error) {
        // Ivan Germano: Lança um erro caso a requisição falhe
        throw new Error('Erro ao buscar dados climáticos atuais.');
    }
};
