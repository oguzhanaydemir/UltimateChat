const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Model

const User = require('../models/User');


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_CLIENT_ID,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
  (accessToken, refreshToken, profile, done) => {
    const data = profile._json;
    User.findOrCreate({ googleId: data.id }, {
      username: data.name.givenName,
      surname: data.name.familyName,
      profilePhotoUrl: data.image.url,
    }, (err, user) => {
      done(err, user);
    });

  })
);

passport.serializeUser((user, done) => {
  done(null,user);
});

passport.deserializeUser((user, done) => {
  done(null,user);
});

module.exports = passport;