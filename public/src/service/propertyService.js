import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

export const getAllProperties = async () => {
    return await axios.get('properties');
};

export const getPropertyById = async (id) => {
    return await axios.get(`properties/details/one/${id}`);
};

export const getPropertiesById = async (ids) => {
    return await axios.get(`properties/details/many/${ids}`);
};

export const editProperty = async (data) => {
    return await axios.put(`properties/edit`, data);
};

export const deleteProperty = async (id) => {
    return await axios.delete(`properties/delete/${id}`);
};

export const getAllPropertiesByType = async (type) => {
    return await axios.get(`properties/type/${type}`);
};