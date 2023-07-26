// server.js

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Set up session middleware
app.use(session({
  secret: 'sec', // Replace with your secret key for session encryption
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Replace these with your actual Google OAuth credentials
const GOOGLE_CLIENT_ID = '444451465392-m7b6tl3a1bl00gjvrqhapl92ictsrgp4.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// Passport.js configuration
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  // You can customize how the user profile data is handled here.
  // For simplicity, we'll pass the entire profile to the done function.
  console.log(profile)
  return done(null, profile);
}));

// Routes for authentication
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Handle successful authentication and redirect the user to the appropriate page.
    res.redirect('/post');
  });

  app.get('/post',(req,res)=>{
    res.json('done');
  })

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
