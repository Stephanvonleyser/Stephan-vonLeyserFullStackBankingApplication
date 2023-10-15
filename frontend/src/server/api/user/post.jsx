import clientAxios from '../../clientAxios'

export const sendNewUser = async data => await clientAxios.post(`/user`, data )
export const sendLogin= async (data) => await clientAxios.post(`/user/login`, data)
