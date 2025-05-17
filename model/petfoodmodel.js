const mongoose = require('mongoose');

const petFoodSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    flavor: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    foodprice: {
        type: Number,
        required: true,
    },
    nutritionalInfo: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    detailfoodImage: {
        type: String,
        required: true,
    },
    pfooddescription: {
        type: String,
        required: true,
    },
    units:{
        type: String,
        required: true,
    },
    stock: {  // New field added
        type: Number,
        required: true,
        default: 0, // Default value can be set to 0
    },

});

const PetFood = mongoose.model('PetFood', petFoodSchema);
module.exports = PetFood;
