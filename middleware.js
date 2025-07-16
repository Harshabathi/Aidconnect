const Joi = require("joi");
const {userJoi} = require("./schema.js");
const expressError = require("./utils/expressError.js");
const Aid = require("./models/aid.js");

function validateuser(req, res, next) {
  let { error } = userJoi.validate(req.body);
  if (error) {
    
    let message = error.details.map((el) => el.message).join(",");

    next(new expressError(400,message));
  }
  else {
    next();
  }
}


function checklogin (req,res,next){
  if(!req.isAuthenticated()){
    req.session.returnTo = req.originalUrl;
    req.flash("error","You must be signed in first!")
     res.redirect("/users/login");
  }else{
    next();
  }
}



async function checkuser(req, res, next) {
  let aid = await Aid.findById(req.params.id).populate("donor");
  let id = req.params.id;
  if (!aid) {
    req.flash("error", "Aid not found");
    return res.redirect("/aids");
  }
  if (!aid.donor) {
    req.flash("error", "Donor not found");
    return res.redirect("/aids");
  }
  let owner = aid.donor.username;
  let curruser = req.user;
  if (owner !== curruser.username) {
    req.flash("error", "You do not have permission to access this aid.");
    return res.redirect("/aids");
  }
  next();
}

module.exports = {validateuser,checklogin,checkuser};