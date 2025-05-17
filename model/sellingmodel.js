// models/petModel.js
const mongoose = require('mongoose');

// Create a schema for pet listings
const petSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    },
    sellerContact: {
        type: String,
        required: true
    },
    sellerAddress: {
        type: String,
        required: true
    },
    vaccinationStatus: {
        type: String,
        required: true
    },
    reasonForSelling: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    healthIssues: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        required: true // Ensure an image path is provided
    }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
