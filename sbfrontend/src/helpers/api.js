import clientAxios from '../server/clientAxios';

const apiRequest = async (method, url, data = null) => {
    try {
        const response = await clientAxios[method](url, data);
        // Depending on your API response structure, adjust how you extract data.
        return [response.data, null];
    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        // Send a generic error message to avoid exposing API structure or sensitive info.
        return [null, 'An error occurred while processing your request.'];
    }
}

export const getAxios = (url) => apiRequest('get', url);

export const postAxios = (url, postData) => apiRequest('post', url, postData);

export const putAxios = (url, putData) => apiRequest('put', url, putData);

export const deleteAxios = (url) => apiRequest('delete', url);