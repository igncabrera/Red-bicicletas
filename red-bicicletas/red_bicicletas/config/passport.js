const passport = require('passport');
const LocalStratetgy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(
  new LocalStratetgy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err);
        if (!user || !user.validPassword(password))
          return done(null, false, { message: 'Credenciales invalidas' });

        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, cb);
});

module.exports = passport;
