var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var logger = require('morgan');

var passport = require('passport');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dish');

const mongoose = require('mongoose');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

const User = require('./models/user');

connect.then(db => {
                console.log('Connected to the database!');
                User.findOne(
                    {username: config.adminUsername, admin: true}, 
                    (err, user) => {
                        if (err) {
                            console.log(err);
                        }
                        if (user) {
                            console.log('Superuser is already created!')
                            return;
                        }
                        User.register(new User({username: config.adminUsername, admin: true, firstname: "Admin", lastname: "Admin"}), config.adminPassword, (err, user) => {console.log('Created superuser!')})
                    }
                )
            }, 
            err => { console.log(err); })

var app = express();

app.use(cors());
app.all('*', (req, res, next) => {
    return next();
})

app.use(passport.initialize());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);

app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
