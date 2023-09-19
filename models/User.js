const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: validator.isEmail,
        message: 'Invalid email',
      },
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
