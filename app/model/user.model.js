const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

var UserSchema = new mongoose.Schema({  
    username: {
        type: String,
        unique: true,
        required: [true, 'username cant be empty'],
        lowercase: true
    },
    password: { type: String, select: false },
    age: Number,
    marriage_status: String
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err)
  
      bcrypt.hash(this.password, salt, null, (err, hash) => {
        if (err) return next(err)
        this.password = hash
        next()
      })
    })
  })

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch)
    });
  }


mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');