var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate')
var cors = require('./cors')

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
      .get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
        User.find({})
            .then(users => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(users);
              })
            .catch(err => { next(err); });
      });

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
            return;
        }
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user.save((err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
                return;
            }
            passport.authenticate('local')(req, res, () => {
                var token = authenticate.getToken({_id: user._id});
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, token: token, userId: user._id, status: 'Registration Successful!'});
            });
        })
    });
});

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
    var token = authenticate.getToken({_id: req.user._id})
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, userId: req.user._id, admin: req.user.admin, status: 'You are successfully logged in!'});
});

module.exports = router;
