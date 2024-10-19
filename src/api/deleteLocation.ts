// fetchPluviTemp.js
import api from './api';

export const delLocation = async (idLocation: string) => {
  const parameters = `?id_location=${idLocation}`

  try {

    const response = await api.delete(`/del_location/${parameters}`);
    return {
      sucesss: true,
      detail: response.data.message
    };

  } catch (error: any) {

    if(error.response){
      return{
        sucess: false,
        status: error.response.status
      }
    }else{
      return{
        sucess: false,
        status: null,
        message: 'Erro de conexão ou requisição.'
      }
    }

  }
};
