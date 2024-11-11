/* eslint-disable prettier/prettier */
import api from '../api/api';

// Ivan Germano: Função para buscar todas as localizações do backend
export const fetchLocations = async () => {
    try {
        // Ivan Germano: Faz uma requisição GET para a rota '/find_all_locations/' do backend
        const response = await api.get('/find_all_locations/');
        // Ivan Germano: Retorna os dados da resposta da requisição
        return response.data;
    } catch (error) {
        // Ivan Germano: Lança um erro caso a requisição falhe
        throw new Error('Erro ao buscar localizações.');
    }
};

// Função para buscar localização por id no backend
export const fetchLocationsById = async (id: string) => {
    try {
        // Ivan Germano: Faz uma requisição GET para a rota '/find_locations_by_id/' do backend
        const response = await api.get('/find_locations_by_id/' + id + '/');
        // Ivan Germano: Retorna os dados da resposta da requisição
        return response.data;
    } catch (error) {
        // Ivan Germano: Lança um erro caso a requisição falhe
        throw new Error('Erro ao buscar localizações.');
    }
};
