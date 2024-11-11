import api from '../api/api';

import { LocationParameters } from '~/types/LocationParameters';

// Função para buscar todas as notifações do local
export const fetchNotification = async (id_local: string) => {
    try {
        const response = await api.get('/notifications/' + id_local);
        console.log('notifications', response.data);

        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar as notificações');
    }
};

export const addLocationParameters = async (body: LocationParameters) => {
    try {
        const response = await api.post('/parameters_location/', body);

        return response;
    } catch (error: any) {
        console.error(error);
    }
};
