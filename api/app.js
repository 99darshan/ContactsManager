var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var contactsRouter = require('./routes/contacts');

var app = express();
app.use(cors()); //TODO: add only trusted origins, 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors({
//     origin: 'http://localhost:3001/',
// }))

app.use('/', indexRouter);
app.use('/contacts', contactsRouter);

module.exports = app;
