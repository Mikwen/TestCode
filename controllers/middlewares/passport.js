const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

// Gets username, matches what you put in and then validates password
// If username does not match any users, returns 'unknown user'.
// Keeps going on match
passport.use(new LocalStrategy((username, password, done) => {
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) return done(null, false, { message: 'Unknown User' });

    // Gets password and matches it for the user.
    // If there is no match the user you put in, returns ' invalid password'
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) return done(null, user);
      return done(null, false, { message: 'Invalid password' });
    });
  });
}));

// since each subsequent request will not contain credentials,
// but have unique cookies that identifies
// sessions, one has to use serializer and deserializer to support
// login sessions.
// Passport will serialize and deserialize instances to and from the session.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => User
.getUserById(id, (err, user) => done(err, user)));

module.exports = passport;
