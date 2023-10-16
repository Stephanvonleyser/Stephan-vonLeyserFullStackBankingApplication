import clientAxios from '../../clientAxios';

export const getUserProfile = async config => {
    try {
        const response = await clientAxios.get(`/user/profile`, config);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "An error occurred" };
    }
};