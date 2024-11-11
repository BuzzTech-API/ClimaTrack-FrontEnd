import api from './api';
import { addLocationType } from '../types/addLocationType';

export const addLocation = async ({ nome, latitude, longitude }: addLocationType) => {
    try {
        const response = await api.post('/add_location/', {
            nome,
            latitude,
            longitude,
        });

        return {
            sucesss: true,
            id: response.data.id,
            message: response.data.message,
        };
    } catch (error: any) {
        if (error.response) {
            return {
                sucess: false,
                status: error.response.status,
            };
        } else {
            return {
                sucess: false,
                status: null,
                message: 'Erro de conexão ou requisição.',
            };
        }
    }
};
