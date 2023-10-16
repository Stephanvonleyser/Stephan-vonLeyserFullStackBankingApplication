import axios from 'axios';

// If REACT_APP_BACKEND_URL is defined, use it. Otherwise, default to 'http://localhost:4000/api'.
const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/api';
console.log(baseURL);


const clientAxios = axios.create({
    baseURL: baseURL
});

export default clientAxios;