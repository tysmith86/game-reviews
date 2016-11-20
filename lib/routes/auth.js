'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const validator = require('validator');
const token = require('../auth/token');
const User = require('../models/user');

router
  .post('/signup', bodyParser, (req, res, next) => {
    const { email, username, password } = req.body;
    delete req.body.password;

    if(!email || !username || !password) {
      return next({
        code: 400,
        error: 'All fields are required.'
      });
    }
    if (!validator.isLength(username, { min: 5, max: 15 })) {
      return next({
        code: 400,
        error: 'Username must be between 5 and 15 characters in length.'
      });
    }
    if(!validator.isLength(password, { min: 8 })) {
      return next({
        code: 400,
        error: 'Password must be at least 8 characters in length.'
      });
    }
    if (!validator.isEmail(req.body.email)) 
      return next({
        code: 400,
        error: 'That is not a valid email address.'
      });
    Promise.all([
      User.find({ username })
        .count()
        .then(count => {
          if (count > 0) throw {
            code: 400,
            error: `Username ${username} already exists.`
          };
        }),
      User.find({ email })
          .count()
          .then(count => {
            if (count > 0) throw {
              code: 400,
              error: 'An account with that email already exists.'
            };
            const user = new User(req.body);
            user.generateHash(password);
            return user.save();
          })
    ])
    .then(user => token.sign(user))
    .then(token => res.send({ token, username, email }))
    .catch(next);
  })

  .post('/signin', bodyParser, (req, res, next) => {
    const { username, password } = req.body;
    delete req.body.password;

    User
      .findOne({ username })
      .then(user => {
        if (!user || !user.compareHash(password)) {
          throw({
            code: 400,
            error: 'Invalid username or password.'
          });
        }
        return token.sign(user);
      })
      .then(token => res.send({ token, username }))
      .catch(next);
  });

module.exports = router;

