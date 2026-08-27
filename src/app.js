const express = require('express');
const { requestLogger } = require('./middlewares/logger');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/', router);

module.exports = app;
