const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

// import mongoose
const mongoose = require('./models/db_connect');

// import routes
const indexRouter = require('./routes/index');
const cocktailRouter = require('./routes/cocktail');

// create express app
const app = express();

// use middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// ENABLE CORS for all routes
app.use(cors());

// if need to serve static files
//      //  const path = require('path');
//      //  app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/', indexRouter);
app.use('/cocktail', cocktailRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // set error status and send error message
    res.status(err.status || 500);
    res.setHeader('Content-Type', 'application/json');
    res.json({ 'data': 'error', 'error': 'error' });
});


module.exports = app;