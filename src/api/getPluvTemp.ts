// fetchPluviTemp.js
import api from './api';
import { reqPluvTempType } from '../types/reqPluvTempType';

export const fetchPluviTemp = async (infosReq: reqPluvTempType) => {

  const parameters = `?longitude=${infosReq.longitude}&latitude=${infosReq.latitude}&start=${infosReq.startDate}&end=${infosReq.endDate}`;

  try {
    const response = await api.get(`/climate/${parameters}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados climáticos:", error);
    throw new Error('Erro ao buscar dados climáticos');
  }
};