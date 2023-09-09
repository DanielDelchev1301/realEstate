
export const CATEGORIES_OBJECT = {
    HOUSE: 'House',
    APARTMENT: 'Apartment',
    OFFICE: 'Office',
    LAND: 'Land',
    GARAGE: 'Garage',
    OTHER: 'Other',
    ONE_ROOM_APARTMENT: 'One room apartment',
    TWO_ROOM_APARTMENT: 'Two room apartment',
    THREE_ROOM_APARTMENT: 'Three room apartment',
    MULTIPLE_ROOM_APARTMENT: 'Multiple room apartment',
    EXCLUSIVE_OFFER: 'Exclusive offer',
    STUDIO: 'Studio',
    MAISONETTE: 'Maisonette',
    FLOOR_OF_A_HOUSE: 'Floor of a house'
};

export const SORTING_OPTIONS = {
    PRICE_LOW_TO_HIGH: 'Price Low to High',
    PRICE_HIGH_TO_LOW: 'Price High to Low',
    SQUARE_METERS_HIGH_TO_LOW: 'SQM High to Low',
    SQUARE_METERS_LOW_TO_HIGH: 'SQM Low to High',
    REMOVE_SORTING: 'Remove Sorting'
};

export const FILTERS = {
    price: {
        number: [0, 1000000],
        currency: 0
    },
    squareMeters: [0, 1000],
    rooms: [0, 10],
    builtIn: [1700, new Date().getFullYear()],
    categories: []
};