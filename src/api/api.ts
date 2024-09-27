import axios from "axios";

// Arquivo para definir as configurações das requisições como url, headers e etc..

const baseURL = "http://10.0.2.2:8000";

const api = axios.create({
    baseURL,
    // headers: {}
})

export default api