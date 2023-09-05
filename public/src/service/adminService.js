import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

export const createProperty = async (property) => {
    return await axios.post('admin/create', property, { headers: { "Content-Type": "multipart/form-data" } });
};

export const sendMail = async (mail) => {
    return await axios.post('admin/sendMail', mail);
};