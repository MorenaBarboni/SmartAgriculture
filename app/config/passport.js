var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      //Errore
      if (err) { return done(err); }
      // Utente non presente nel database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Password Errata
      if (!user.verifyPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      return done(null, user);
    });
  }
));