const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Productd', // Ensure the correct reference to the Product model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
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
    color: {
      type: String,
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
    about: {
      type: String,
      required: true,
    },
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  address: {
    pincode: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    fullname:{
      type:String,
      required:true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    
    },
    addressType: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
   
      
    },
  },
  status: {
    type: String,
    default: 'Pending',
    required: true,
  },
  canceled: {
    type: Boolean,
    default: false,
  },
  paymentStatus: {
    type: String,
    default: 'Pending',
  },
  transactionId: {
    type: String,
    required: false,
  },
  deliveryDate: {
    type: Date,
    defult:Date.now.apply,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  statusHistory: [
    {
      status: {
        type: String,
        required: true,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  userFeedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: false,
    },
    userFeedbackProvided: {
      type: Boolean,
      default: false,
    },
  },
}, { timestamps: true });

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

// Export the Order model
module.exports = Order;
