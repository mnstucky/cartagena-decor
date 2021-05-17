const mongoose = require('mongoose');

const { Schema } = mongoose;

const invoicedItemSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    city: String,
    country: String,
    line1: String,
    line2: String,
    postal_code: String,
    state: String,
  },
  shipping: {
    address: {
      city: String,
      country: String,
      line1: String,
      line2: String,
      postal_code: String,
      state: String,
    },
    name: String,
    phone: String,
    hasShipped: Boolean,
    tracking: String,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  items: {
    type: [invoicedItemSchema],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

let Order;
try {
  Order = mongoose.model('Order');
} catch {
  Order = mongoose.model('Order', orderSchema);
}

module.exports = Order;
