import axios from "axios";

// Arquivo para definir as configurações das requisições como url, headers e etc..

const baseURL = "https://localhost:5000"

const api = axios.create({
    baseURL,
    // headers: {}
})

export default api