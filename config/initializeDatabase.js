import mongoose from 'mongoose';
const connectionString = 'mongodb+srv://danieldelchev1301:O8weLclK94381oTn@realestateprojectcluste.abzilmx.mongodb.net/realEstateProject?retryWrites=true&w=majority';

export const connect = () => mongoose.connect(connectionString);