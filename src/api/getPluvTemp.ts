// fetchPluviTemp.js
import api from './api';
import { reqPluvTempType } from '../types/reqPluvTempType';

export const fetchPluviTemp = async (infosReq: reqPluvTempType) => {
  const parameters = `?longitude=${infosReq.longitude}&latitude=${infosReq.latitude}&start=${infosReq.startDate}&end=${infosReq.endDate}`;

  try {
    const response = await api.get(`/climate/${parameters}`);
    if(response.status == 200){
      return response.data
    }
  } catch (error) {
    throw new Error("Erro ao buscar dados climáticos")
  }
};
