/* eslint-disable prettier/prettier */
// import api from './api';
// import { editSavedLocation } from '../types/editSavedLocation';

// // Ivan Germano: Função para atualizar o nome de uma localização salva no backend
// export const editLocationName = async (locationData: editSavedLocation) => {
//   try {
//     console.log('Enviando dados para atualização:', locationData);
//     const response = await api.put('/edit_location_name', locationData);
//     console.log('Resposta recebida do servidor:', response);
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error('Erro ao atualizar o nome da localização:', error.response.data);
//     } else {
//       console.error('Erro ao atualizar o nome da localização:', error.message);
//     }
//     throw new Error('Erro ao atualizar o nome da localização.');
//   }
// };

import api from './api';
import { editSavedLocation } from '../types/editSavedLocation';

// Ivan Germano: Função para atualizar o nome de uma localização salva no backend
export const editLocationName = async (locationData: editSavedLocation) => {
  try {
    const response = await api.put('/edit_location_name', null, {
      params: {
        id_location: locationData.id_location,
        new_name: locationData.new_name,
      },
    });
    console.log('Resposta recebida do servidor:', response);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o nome da localização:', error);
    throw new Error('Erro ao atualizar o nome da localização.');
  }
};
