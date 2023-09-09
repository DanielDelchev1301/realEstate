import Property from '../models/Property.js';

export const createProperty = async (propertyInfo) => {
    return await Property.create(propertyInfo);
};

export const getAllProperties = async () => {
    return await Property.find();
};

export const getPropertyById = async (id) => {
    return await Property.findById(id);
};

export const getPropertiesById = async (ids) => {
    return await Property.find({'_id': {$in: ids}})
};

export const editProperty = async (propertyInfo) => {
    return await Property.findByIdAndUpdate(propertyInfo._id, propertyInfo, {new: true});
};

export const deleteProperty = async (id) => {
    return await Property.findByIdAndDelete(id);
};

export const getAllPropertiesByType = async (type) => {
    return await Property.find({type: type});
};