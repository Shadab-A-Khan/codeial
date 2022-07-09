const { use } = require('passport');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy   //require('passport-local').Strategy;
const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },

    function (req, email, password, done) {  //here email and password to sign in
        //find a user and establish the identity
        User.findOne({ email: email }, function (err, user) { //first email is the email from the schema/model and second email is the user filled email
            if (err) {
                // console.log('Error in finding user --> passport');
                req.flash('error', err);
                return done(err);
            }

            if (!user || user.password != password) {
                // console.log('Invalid Username/password');
                req.flash('error', 'invalid user name/password')
                return done(null, false);  //null :- no error , false:- failed authentification
            }

            return done(null, user); ////null :- no error , user:- user found
        });
    }
));





//serializing the user to decide which key id to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);  //set the id into the cookie -> encrypted (usign library session-cookies)
});



//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user --> passport');
            return done(err);
        }
        return done(null, user);
    });
});




//check if user is authenticated  // to send the data to the views
passport.checkAuthentication = function (req, res, next) {
    //if the user is signed in , then opass on the request to the next function( controller's action )
    if (req.isAuthenticated()) {
        return next(); //if authentiated , passed it to the next page
    }
    // if the user is not signed in
    return res.redirect('/users/sign_in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user from the session cookies and we are just sending this to the locals for the view
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport; 