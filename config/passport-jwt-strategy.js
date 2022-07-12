const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT  = require('passport-jwt').ExtractJwt; //it will help extract the jwt from the header

const user = require('../models/user'); //to establish the users identity we need the users models

let opts = {  //opts is the options
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial' //this is out encryption and decryption key . every encryption and decryption go through it
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){console.log('Error in finding from JWT'); return;}

        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
}));

module.exports = passport;