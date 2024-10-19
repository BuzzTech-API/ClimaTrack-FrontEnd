/* eslint-disable prettier/prettier */
import api from '../api/api';

export const fetchLocations = async () => {
    try {
        const response = await api.get('/find_all_locations/');
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar localizações.');
    }
};
