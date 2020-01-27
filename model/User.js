const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date:{
        type: String,   
        default : Date.now      
    }
});

module.exports = User = mongoose.model('user',UserSchema);