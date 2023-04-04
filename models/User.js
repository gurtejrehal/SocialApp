const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

// create schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true
    }, // email
    password: String // password
})

// hash password (protect)
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);

