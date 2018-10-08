const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({  
    username: {
        type: String,
        unique: true,
        required: [true, 'username cant be empty'],
        lowercase: true
    },
    password: String,
    age: Number,
    marriage_status: String
});
module.exports = mongoose.model('User', UserSchema)