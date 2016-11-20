'use strict';

const express = require('express');
const app = express();
const path = require('path');
const pubDir = path.join(__dirname, '../public');
const ensureAuth = require('./auth/ensure-auth');
// const ensureRole = require('./auth/ensure-role');
const errorHandler = require('./error-handler');
const auth = require('./routes/auth');
// const users = require('./routes/users');
const reviews = require('./routes/reviews');

app.use('/', express.static(pubDir));
app.use('/auth', auth);
app.use('/reviews', reviews);

app.use(errorHandler);

module.exports = app;