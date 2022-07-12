const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//these things will be matched from the google
passport.use(new googleStrategy({
    clientID: "768544295505-ha1n6sr75elqov237netcpvb4okum241.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
    function (accesToken, refreshToken, profile, done) { //profile will contain users info

        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err) { console.log('error in google stategy-passport', err); return }

            console.log(profile);

            if (user) {
                //if found set as req.user
                return done(null, user);
            } else {

                //if not found , create a user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) { console.log('error in google strategy-passport', err); return }

                    return done(null, user);
                })
            }
        })
    }


));

module.exports = passport;