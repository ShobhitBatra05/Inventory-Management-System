import axios from 'axios';

const API_URL = 'http://localhost:8000/api/products';

export const fetchProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
    // return response.json;
};

export const addProduct = async (productData) => {
    const response = await axios.post(API_URL, productData);
    return response.data;
};

export const updateProduct = async (productId, productData) => {
    const response = await axios.put(`${API_URL}/${productId}`, productData);
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await axios.delete(`${API_URL}/${productId}`);
    return response.data;
};