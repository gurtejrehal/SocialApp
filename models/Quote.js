const mongoose = require('mongoose');
const timeSince = require('../utils/utils')

const passportLocalMongoose = require('passport-local-mongoose');

// create schema
const quoteSchema = new mongoose.Schema({
    quote: String, // email
    bgColor: {
        type: String,
        default: '46244c',
        unique: false
    },
    likes: {
        type: Number,
        default: 0,
        unique: false
    },
    username: {
        type: String,
        default: "",
        unique: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

quoteSchema.methods.formattedTime = function() {
    return timeSince(this.createdAt);
}

// hash password (protect)
quoteSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Quote', quoteSchema);

