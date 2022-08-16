const User = require("../models/user");
const fs = require('fs');
const path = require('path');



module.exports.usersProfile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "profile",
            profile_user: user
        });
    });
}

module.exports.update = async function (req, res) {

    if (req.user.id == req.params.id) {
        try {

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('******Multer Eroor: ', err)
                }
                user.name = req.body.name;
                user.email = req.body.email;


                if (req.file) {

                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }

    } else {
        req.flash('error', 'Unauthorised');
        return res.status(401).send('Unauthorized');
    }
}




//render sign-in page
module.exports.userSignIn = function (req, res) {

    if (req.isAuthenticated()) {
        res.redirect('/users/usersProfile');
    }

    return res.render('user_sign_in', {
        title: "codeial/sign in"
    });
}

//render sign-up page
module.exports.userSignUp = function (req, res) {

    if (req.isAuthenticated()) {
        res.redirect('/users/usersProfile');
    }

    return res.render('user_sign_up', {
        title: "codeial/sign up"
    });
}

//get the sign-up data
module.exports.create = function (req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up', err); return }

                return res.redirect('/users/sign_in');
            })
        } else {
            return res.redirect('back');
        }
    });
}

// module.exports.createSession = function( req, res){
//     req.logout();

//     return res.redirect('/');
// }

//render createSession
module.exports.createSession = function (req, res) {
    //req.logout();
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {

    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        //    return res.redirect('/');
    });
    // req.logout();
    req.flash('success', 'You have logged out');
    return res.redirect('/')
}

