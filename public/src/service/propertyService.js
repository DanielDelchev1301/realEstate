import axios from 'axios';
axios.defaults.baseURL = 'https://realestatebulgariaserver.onrender.com';

export const getAllProperties = async (path) => {
    return await axios.get(`properties`, {params: { path: path }});
};

export const getPropertyById = async (id) => {
    return await axios.get(`properties/details/one/${id}`);
};

export const getPropertiesById = async (ids, path) => {
    return await axios.get(`properties/details/many/${ids}`, {params: { path: path }});
};

export const editProperty = async (data) => {
    return await axios.put(`properties/edit`, data);
};

export const deleteProperty = async (id) => {
    return await axios.delete(`properties/delete/${id}`);
};

export const getAllPropertiesByType = async (type, path) => {
    return await axios.get(`properties/type/${type}`, {params: { path: path }});
};