import clientAxios from '../../clientAxios';

export const getUserProfile = async config => await clientAxios.get(`/user/profile`, config)