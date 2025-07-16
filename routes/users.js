const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Aid = require('../models/aid');
const { validateuser, checklogin, checkuser } = require('../middleware');
const passport = require('passport');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const usersController = require("../controller/users.js");


function storeReturnTo(req, res, next) {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
   
  }
  next();
}

// Registration form
router.get('/register',usersController.registerform );

// Register user
router.post('/register', validateuser, usersController.postnewuser);

// Login form
router.get('/login',usersController.loginform);


// Login user
router.post('/login',storeReturnTo,
  passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }),
  usersController.loginuser
);

// Dashboard
router.get('/:id/dashboard', checklogin, usersController.userdashboard);

// Logout
router.get('/logout', usersController.logout);

module.exports = router;
