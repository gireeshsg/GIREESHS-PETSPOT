const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Productd", // Ensure this matches the model name for Product
        },
    ],
    addresses: [
    {
        _id: mongoose.Schema.Types.ObjectId,  // Explicitly add _id field for address
        pincode: { type: String, required: true },
        locality: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        landmark: { type: String },
        addressType: { type: String, required: true },
        phone: { type: String  },
    }
],

    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Productd',
        }
    ],
    isBanned: {
        type: Boolean,
        default: false, // Default is not banned
    },
    banReason: {
        type: String,
        default: null, // Default is null (no reason provided)
    },
    bannedAt: {
        type: Date,
        default: null, // Default is null (not banned)
    },
    unbannedAt: {
        type: Date,
        default: null, // Default is null (not unbanned)
    },
});
// Export User Model
const User = mongoose.model("User", userSchema);
module.exports = User;
