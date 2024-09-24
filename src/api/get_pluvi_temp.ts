import api from "./api";

// Código para pegar os dados de pluviosidade e temperatura do backend.

export const fetchPluviTemp = async() => {
    await api.get("/infos")
    .then(response => {
        return response;
    }).catch(error => {
        throw new Error(`Erro ao pegar os dados de pluviosidade e temperatura: ${error}`)
    })
}