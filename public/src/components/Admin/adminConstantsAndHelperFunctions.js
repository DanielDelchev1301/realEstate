export const initialPropertyInfo = {
    title: '',
    description: '',
    ownerName: '',
    ownerPhoneNumber: '',
    squareMeters: '',
    rooms: '',
    builtIn: '',
    addressInfo: {
        address: '',
        lat: 0,
        lng: 0
    },
    date: Date.now(),
    price: {
        number: '',
        numberInBGN: '',
        currency: 0 // 0=BGN, 1=EUR
    },
    categories: [],
    condition: '',
    type: '',
    images: [],
    seen: 0
};

export const isButtonDisabled = (propertyInfo) => {
    return !(propertyInfo.title
        && propertyInfo.description
        && propertyInfo.ownerName
        && propertyInfo.ownerPhoneNumber
        && propertyInfo.squareMeters
        && propertyInfo.rooms
        && propertyInfo.builtIn
        && propertyInfo.addressInfo.address
        && propertyInfo.price.number
        && propertyInfo.categories.length
        && propertyInfo.type
        && propertyInfo.images.length);
};

export const appendPropertyInfo = (formData, propertyInfo) => {
    formData.append('title', propertyInfo.title);
    formData.append('description', propertyInfo.description);
    formData.append('ownerName', propertyInfo.ownerName);
    formData.append('ownerPhoneNumber', propertyInfo.ownerPhoneNumber);
    formData.append('squareMeters', propertyInfo.squareMeters);
    formData.append('rooms', propertyInfo.rooms);
    formData.append('builtIn', propertyInfo.builtIn);
    formData.append('address', JSON.stringify(propertyInfo.addressInfo));
    formData.append('date', propertyInfo.date);
    formData.append('price', JSON.stringify(propertyInfo.price));
    formData.append('categories', JSON.stringify(propertyInfo.categories));
    formData.append('condition', propertyInfo.condition);
    formData.append('type', propertyInfo.type);
    formData.append('seen', propertyInfo.seen);
    return formData;
};

export const categoriesInfo = [
    'Exclusive offer',
    'House',
    'Floor of a house',
    'Land',
    'Apartment',
    'One room apartment',
    'Two room apartment',
    'Three room apartment',
    'Multiple room apartment',
    'Studio',
    'Maisonette',
    'Office',
    'Garage',
    'Other',
];

export const typeOptions = [
    'Rent',
    'Sale'
];

export const conditionOptions = [
    'Already Built',
    'In Construction'
];

export const typeMaterial = [
    'Bricks',
    'Panel',
    'Reinforced Concrete',
    'Other'
];