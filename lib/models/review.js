'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  game: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Review', schema);