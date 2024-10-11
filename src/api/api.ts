import axios from 'axios';

// Arquivo para definir as configurações das requisições como url, headers e etc..

const baseURL = 'http://172.23.144.1:8000';

const api = axios.create({
  baseURL,
  // headers: {}
});

export default api;
