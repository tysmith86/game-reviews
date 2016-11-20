'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const Review = require('../models/review');
const ensureAuth = require('../auth/ensure-auth');


router
  .get('/', (req, res, next) => {
    Review.find({})
      .then(reviews => {
        res.send(reviews);
      })
      .catch(next);
  })

  .post('/', ensureAuth, bodyParser, (req, res, next) => {
    new Review(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  });

module.exports = router;
