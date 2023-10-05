import axios from 'axios';
axios.defaults.baseURL = 'https://realestatebulgariaserver.onrender.com';

export const createProperty = async (property) => {
    return await axios.post('admin/create', property, { headers: { "Content-Type": "multipart/form-data" } });
};

export const sendMail = async (mail) => {
    return await axios.post('admin/sendMail', mail);
};

export const loginAsAdmin = async (data) => {
    return await axios.post('admin/login', data);
}