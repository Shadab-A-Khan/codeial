const User = require("../models/user");

module.exports.profile = function(req,res){
    return res.end('<h1> Users profile <h1>');
}

//usersProfile
module.exports.usersProfile=function(req,res){

    return res.render("user_profile",{
        title:"profile"
    });
}


//render sign-in page
module.exports.userSignIn=function(req,res){

    if(req.isAuthenticated()){
        res.redirect('/users/usersProfile');
    }
    
    return res.render('user_sign_in',{
        title:"codeial/sign in"
    });
}

//render sign-up page
module.exports.userSignUp=function(req,res){

    if(req.isAuthenticated()){
        res.redirect('/users/usersProfile');
    }

    return res.render('user_sign_up',{
        title:"codeial/sign up"
    });
}

//get the sign-up data
module.exports.create=function(req, res){
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){ 
        if(err){console.log('error in finding user in signing up'); return}
    
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing up',err); return}

                return res.redirect('/users/sign_in');
            })
        } else{
                return res.redirect('back');    
              }
    });
}

//render createSession
 module.exports.createSession=function(req,res){
    return res.redirect('/');
 }