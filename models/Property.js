import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    ownerName: {
        type: String,
        required: [true, 'Owner name is required']
    },
    ownerPhoneNumber: {
        type: String,
        required: [true, 'Owner phone number is required']
    },
    squareMeters: {
        type: String,
        required: [true, 'Square Meters is required']
    },
    rooms: {
        type: String,
        required: [true, 'Rooms is required']
    },
    builtIn: {
        type: String,
        required: [true, 'Built In is required']
    },
    address: {
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        lat: {
            type: Number,
            required: [true, 'Latitude is required']
        },
        lng: {
            type: Number,
            required: [true, 'Longitude is required']
        }
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    price: {
        number: {
            type: String,
            required: [true, 'Number is required']
        },
        currency: {
            type: Number,
            required: [true, 'Currency is required']
        },
        numberInBGN: {
            type: String,
            required: [true, 'Number in BGN is required']
        }
    },
    categories: {
        type: Object,
        required: [true, 'Categories is required']
    },
    type: {
        type: String,
        required: [true, 'Type is required']
    },
    images: [
        {
            fieldname: {
                type: String,
                required: [true, 'Filename is required']
            },
            originalname: {
                type: String,
                required: [true, 'Originalname is required']
            },
            encoding: {
                type: String,
                required: [true, 'Encoding is required']
            },
            mimetype: {
                type: String,
                required: [true, 'Mimetype is required']
            },
            destination: {
                type: String,
                required: [true, 'Destination is required']
            },
            filename: {
                type: String,
                required: [true, 'Filename is required']
            },
            path: {
                type: String,
                required: [true, 'Path is required']
            },
            size: {
                type: Number,
                required: [true, 'Size is required']
            }
        }
    ]
});

const Property = mongoose.model('Property', propertySchema);
export default Property;