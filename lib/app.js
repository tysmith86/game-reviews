'use strict';

const express = require('express');
const app = express();
const path = require('path');
// const auth = require('./routes/auth');
const pubDir = path.join(__dirname, '../public');
// const ensureAuth = require('./auth/ensure-auth');
// const ensureRole = require('./auth/ensure-role');
// const errorHandler = require('./error-handler');
// const users = require('./routes/users');

app.use('/', express.static(pubDir));
// app.use('/auth', auth);

module.exports = app;