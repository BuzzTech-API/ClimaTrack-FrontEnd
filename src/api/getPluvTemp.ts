import api from "./api";
import {reqPluvTempType} from "../types/reqPluvTempType";

// Código para pegar os dados de pluviosidade e temperatura do backend.

export const fetchPluviTemp = async(infosReq: reqPluvTempType) => {
    await api.get("/getPluviTemp",{
        params: infosReq
    } )
    .then(response => {
        return response.data;
    }).catch(error => {
        throw new Error(`Erro ao pegar os dados de pluviosidade e temperatura: ${error.message}`)
    })
}