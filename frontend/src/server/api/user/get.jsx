import clientAxios from '../../clientAxios';

export const confirmNewUser = async token => await clientAxios(`/user/confirm-account/${token}`)
export const getUserProfile = async config => await clientAxios.get(`/user/profile`, config)