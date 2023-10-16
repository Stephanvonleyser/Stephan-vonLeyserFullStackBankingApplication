import axios from 'axios'

const clientAxios = axios.create({
    baseURL: process.env.REACT_APP_MONGO_BACKEND_URL + '/api'
})

export default clientAxios;