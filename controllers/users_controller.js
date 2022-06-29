module.exports.profile = function(req,res){
    return res.end('<h1> Users profile <h1>');
}

//usersProfile
module.exports.usersProfile=function(req,res){
    return res.render("user_profile",{
        title:"profile"
    });
}