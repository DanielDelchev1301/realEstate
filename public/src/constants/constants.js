export const GOOGLE_MAP_API_KEY = "AIzaSyCWahxjyEg-dd9mNCPfk1N4_SnnCqTqyPs";

export const CATEGORIES_OBJECT = {
    EXCLUSIVE_OFFER: 'Exclusive offer',
    HOUSE: 'House',
    FLOOR_OF_A_HOUSE: 'Floor of a house',
    LAND: 'Land',
    APARTMENT: 'Apartment',
    ONE_ROOM_APARTMENT: 'One room apartment',
    TWO_ROOM_APARTMENT: 'Two room apartment',
    THREE_ROOM_APARTMENT: 'Three room apartment',
    MULTIPLE_ROOM_APARTMENT: 'Multiple room apartment',
    STUDIO: 'Studio',
    MAISONETTE: 'Maisonette',
    OFFICE: 'Office',
    GARAGE: 'Garage',
    OTHER: 'Other',
};

export const SORTING_OPTIONS = {
    PRICE_LOW_TO_HIGH: 'Price Low to High',
    PRICE_HIGH_TO_LOW: 'Price High to Low',
    SQUARE_METERS_HIGH_TO_LOW: 'M² High to Low',
    SQUARE_METERS_LOW_TO_HIGH: 'M² Low to High',
    REMOVE_SORTING: 'Remove Sorting'
};

export const FILTERS = {
    price: {
        from: '',
        to: ''
    },
    squareMeters: {
        from: '',
        to: ''
    },
    rooms: [0, 20],
    builtIn: [1700, new Date().getFullYear()],
    categories: [],
    condition: '',
};

export const defaultProps = {
    center: {
      lat: 42.00703,
      lng: 24.8762844
    },
    zoom: 10
};

export const defaultFreeEvaluationInfo = {
    email: '',
    name: '',
    message: '',
    phone: '',
    address: '',
    squareMeters: '',
    type: '',
    material: '',
    furniture: '',
    garage: '',
    yard: '',
};