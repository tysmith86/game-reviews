'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcyrpt = require('bcryptjs');

const minLength = [8, 'Your `{PATH}` must be at least 8 characters long.'];

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minLength: minLength,
    required: true
  },
  roles: {
    type: [String],
    default: 'user'
  },
  following: Array
});

userSchema.methods.generateHash = function(password) {
  return this.password = bcyrpt.hashSync(password, 10);
};

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);