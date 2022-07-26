const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        uniqe: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    avatar: {
        type: String
    }

}, {
    timestamps: true  //it will keep the track of created and updated time 
});




let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + Date.now()); //file.fieldname=avatar -->  avatar-1657847520947
    }
});

//static methods
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar'); //single indicate that only single file can be uploaded not multiple
userSchema.statics.avatarPath = AVATAR_PATH; //we made the AVATAR_PATH publically accessible




const User = mongoose.model('User', userSchema);

module.exports = User;