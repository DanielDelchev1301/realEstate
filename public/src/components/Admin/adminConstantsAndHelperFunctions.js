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
        currency: 0 // 0=BGN, 1=EUR
    },
    categories: [],
    type: '',
    images: []
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
    formData.append('type', propertyInfo.type);
    return formData;
};

export const categoriesInfo = [
    'House',
    'Apartment',
    'Office',
    'Land',
    'Garage',
    'Other',
    'One room apartment',
    'Two room apartment',
    'Three room apartment',
    'Multiple room apartment',
    'Exclusive offer',
    'Studio',
    'Maisonette',
    'Floor of a house',
];

export const typeOptions = [
    'Rent',
    'Sale'
];