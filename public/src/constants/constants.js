export const GOOGLE_MAP_API_KEY = "AIzaSyCWahxjyEg-dd9mNCPfk1N4_SnnCqTqyPs";

export const CATEGORIES_OBJECT = {
    EXCLUSIVE_OFFER: 'Ексклузивна оферта',
    HOUSE: 'Къща',
    FLOOR_OF_A_HOUSE: 'Етаж от къща',
    LAND: 'Парцел',
    APARTMENT: 'Апартамент',
    ONE_ROOM_APARTMENT: 'Едностаен апартамент',
    TWO_ROOM_APARTMENT: 'Двустаен апартамент',
    THREE_ROOM_APARTMENT: 'Тристаен апартамент',
    MULTIPLE_ROOM_APARTMENT: 'Многостаен апартамент',
    STUDIO: 'Студио',
    MAISONETTE: 'Мезонет',
    OFFICE: 'Офис',
    GARAGE: 'Гараж',
    OTHER: 'Друго',
};

export const SORTING_OPTIONS = {
    PRICE_LOW_TO_HIGH: 'Цена възходящо',
    PRICE_HIGH_TO_LOW: 'Цена низходящо',
    SQUARE_METERS_HIGH_TO_LOW: 'M² възходящо',
    SQUARE_METERS_LOW_TO_HIGH: 'M² низходящо',
    REMOVE_SORTING: 'Без сортиране'
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