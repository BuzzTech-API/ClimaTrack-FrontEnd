import axios from 'axios';

// Arquivo para definir as configurações das requisições como url, headers e etc..

const baseURL = 'http://192.168.1.9:8000';

const api = axios.create({
  baseURL,
  // headers: {}
});

export default api;
