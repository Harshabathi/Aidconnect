const User = require('../models/user');
const Aid = require('../models/aid');
const dayjs = require('dayjs');
const geocode = require("../geocodeutility");

module.exports.registerform = (req, res) => {
    res.render('./user/register.ejs');
  }

module.exports.postnewuser = async (req, res) => {
    try {
      let { username, email, phoneno, location, role, help, password } = req.body.user;
      let newUser = new User({ username, email, phoneno, location, role, help });
      const [longitude, latitude] = await geocode(location);
      newUser.coordinates = { type: 'Point', coordinates: [longitude, latitude] };
      const reguser = await User.register(newUser, password);
      req.login(reguser, (err) => {
        if (err) {
          req.flash('error', err.message);
          return res.redirect('/users/register');
        }
        req.flash('success', 'User registered successfully');
        res.redirect(`/users/${reguser._id}/dashboard`);
      });
    } catch (err) {
      console.log(err);
      req.flash('error', 'Registration failed.');
      res.redirect('/users/register');
    }
  }

module.exports.loginform = (req, res) => {
    res.render('./user/login.ejs');
  }

module.exports.loginuser = (req, res) => {
    const redirectUrl = res.locals.returnTo || `/users/${req.user._id}/dashboard`;
    delete req.session.returnTo; // Clean up
    req.flash('success', 'Logged in successfully');
    res.redirect(redirectUrl);
  }

module.exports.userdashboard = async (req, res) => {
    let id = req.params.id;
    let user = await User.findById(id);
    if (user.role === 'donor') {
      let aids = await Aid.find({ donor: id }).populate('donor');
      aids = aids.map(aid => ({
        ...aid.toObject(),
        postedAgo: dayjs(aid.createdAt).fromNow()
      }));
      res.render('./user/donordashboard.ejs', { aids });
    } else {
      // Proximity search for recipient
      const maxDistance = 10000; // 10km in meters
      let aids = await Aid.find({
        coordinates: {
          $near: {
            $geometry: { type: 'Point', coordinates: user.coordinates.coordinates },
            $maxDistance: maxDistance
          }
        },
        status: 'available'
      }).populate('donor');
      aids = aids.map(aid => ({
        ...aid.toObject(),
        postedAgo: dayjs(aid.createdAt).fromNow()
      }));
      res.render('./user/recipientdashboard.ejs', { aids, user, dayjs });
    }
  }

module.exports.logout = (req, res) => {
    req.logout(() => {
      req.flash('success', 'Logged out successfully');
      res.redirect('/');
    });
  }