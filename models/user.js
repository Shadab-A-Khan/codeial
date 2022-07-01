const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    }

   

},{
    timestamps: true  //it will keep the track of created and updated time 
});


const user = mongoose.model('user',userSchema);

module.exports=user;