export const adaptProperty = (property, images) => {
    return {
        title: property.title,
        description: property.description,
        ownerName: property.ownerName,
        ownerPhoneNumber: property.ownerPhoneNumber,
        squareMeters: property.squareMeters,
        rooms: property.rooms,
        builtIn: property.builtIn,
        address: (JSON.parse(property.address)),
        date: property.date,
        price: (JSON.parse(property.price)),
        categories: (JSON.parse(property.categories)),
        type: property.type,
        images: images
    };
};