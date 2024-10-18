const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  inStock: {
    type: Boolean,
    default: true,
    required: true,
  },
  cuisine: {
    type: String, 
  },
  time: {
    type: Number, 
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true, // price * quantity
  },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  cartItems: [cartItemSchema], // Embedding the cart items as an array of objects
  totalAmount: {
    type: Number,
    required: true, // Sum of totalPrice for all cart items
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'canceled'],
    default: 'pending',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
