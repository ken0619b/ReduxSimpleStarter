const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  console.log('timestamp', timestamp)
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already email their email and password
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {

    if(err) { return next(err); }

    // ion case of missing any params
    if(!email || !password) {
      return res.status(422).send({ error: 'Email or Password is missing'});
    }

    // If a user with email does exists, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use'});
    }

    // If a user with email does NOT exist, create and save record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if(err) { return next(err); }
      console.log(tokenForUser(user))

      // Respond to request indicatiing the user was creared
      res.json({ token: tokenForUser(user) })
    });
  });
};
