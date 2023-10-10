import clientAxios from '../server/clientAxios';

export const getAxios = async (url) => {
    try {
        const { data } = await clientAxios.get(url);
        return [data, null];
    } catch (error) {
        console.log(error);
        return [null, error];
    }
}

export const postAxios = async (url, postData) => {
    try {
        const { data } = await clientAxios.post(url, postData);
        return [data, null];
    } catch (error) {
        console.log(error);
        return [null, error];
    }
}

export const putAxios = async (url, putData) => {
    try {
        const { data } = await clientAxios.put(url, putData);
        return [data, null];
    } catch (error) {
        console.log(error);
        return [null, error];
    }
}

export const deleteAxios = async (url) => {
    try {
        const { data } = await clientAxios.delete(url);
        return [data, null];
    } catch (error) {
        console.log(error);
        return [null, error];
    }
}