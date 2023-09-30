const Order = require('../models/Order');
const Product = require('../models/Product');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'some-random-value';
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided');
  }

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee',
    );
  }

  let orderItems = [];
  let subtotal = 0;

  // await inside forEach or map wont work as expected, therefore we'll use for of loop
  for (const item of cartItems) {
    const dbProduct = await Product.findById(item.product);
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id: ${item.product}`,
      );
    }

    const { name, price, image } = dbProduct;
    // remember: singleOrderItem same as singleOrderItemSchema
    const singleOrderItem = {
      product: item.product,
      amount: item.amount,
      name,
      price,
      image,
    };

    orderItems.push(singleOrderItem);
    subtotal += item.amount * price; // always when dealing with money get prices and check items from db
  }

  const total = subtotal + shippingFee + tax;
  // get client secret from stripeAPI - normally as we did in stripe payment project
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    tax,
    shippingFee,
    subtotal,
    total,
    orderItems,
    user: req.user.userId,
    clientSecret: paymentIntent.client_secret,
  });

  res.status(201).json({ order, clientSecret: order.clientSecret });
  // Then the frontend can proceed to checkout, and when payment is made, the status will change to 'paid'
};

const getAllOrders = async (req, res) => {
  res.json('getAllOrder');
};

const getSingleOrder = async (req, res) => {
  res.json('getSingleOrder');
};

const getCurrentUserOrders = async (req, res) => {
  res.json('getCurrentUserOrders');
};

const updateOrder = async (req, res) => {
  res.json('updateOrder');
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
};
