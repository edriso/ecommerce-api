const mongoose = require('mongoose');

const singleCartItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const orderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    // subtotal is total for all cartItems (price * quantity)
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    // total = subtotal + shippingFee + tax
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    cartItems: [singleCartItemSchema],
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending',
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
