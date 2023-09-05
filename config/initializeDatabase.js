import mongoose from 'mongoose';
const connectionString = 'mongodb://localhost:27017/realEstate';

export const connect = () => mongoose.connect(connectionString);