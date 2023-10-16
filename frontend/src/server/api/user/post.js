import clientAxios from '../../clientAxios'

export const sendNewUser = async data => {
    try {
        const response = await clientAxios.post(`/user`, data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "An error occurred" };
    }
};

export const sendLogin= async (data) => {
    try {
        const response = await clientAxios.post(`/user/login`, data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "An error occurred" };
    }
};


export const getUserProfile = async config => {
    try {
        const response = await clientAxios.get(`/user/profile`, config);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "An error occurred" };
    }
};


export const depositAmount = async (data, token) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        const response = await clientAxios.post(`/account/deposit`, data, config);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "An error occurred" };
    }
};

export const withdrawAmount = async (data, token) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        const response = await clientAxios.post(`/account/withdraw`, data, config);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "An error occurred" };
    }
};

export const transferAmount = async (data, token) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        const response = await clientAxios.post(`/account/transfer`, data, config);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "An error occurred" };
    }
};
