const express = require('express');
const { requestLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/', router);
app.use('/users', require('./routes/users'));

app.use(errorHandler);

module.exports = app;
