import axios from 'axios'

const clientAxios = axios.create({
   // baseURL: process.env.REACT_APP_MONGO_BACKEND_URL + '/api'
   baseURL: 'http://localhost:4000/api'
})

export default clientAxios;