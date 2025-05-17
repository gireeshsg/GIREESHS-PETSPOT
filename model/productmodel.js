const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: [{
        type: String,
        required: false,
    }],
    detailImage: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    petcount: {
        type: Number,
        required: true,
    },
    stock: {  // New field added
        type: Number,
        required: true,
        default: 0, // Default value can be set to 0
    },
    availability: { // New field for availability status
        type: Boolean,
        default: true, // Default to true unless specified otherwise
    },
    soldOut: { // New field for sold-out status
        type: Boolean,
        default: false, // Default to false unless specified otherwise
    },
});

// Export Product Model
const Productd = mongoose.model('Productd', productSchema);
module.exports = Productd;
