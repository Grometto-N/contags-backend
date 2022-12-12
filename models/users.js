const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    title:String,
    color: String,
    form: String,
});

const contactedTimesCounterSchema = mongoose.Schema({
    phoneCounter:Number,
    smsCounter: Number,
    emailCounter: Number,
});

const contactSchema = mongoose.Schema({
    name:String,
    firstName: String,
    emailPro: String,
    emailPerso: String,
    phonePerso:String,
    phonePro: String,
    birthday: String,
    tags: [tagSchema],
    contactedTimesCounter: [contactedTimesCounterSchema]
});

const userSchema = mongoose.Schema({
    name:String,
    firstName: String,
    emailPro: String,
    emailPerso: String,
    phonePerso:String,
    phonePro: String,
    birthday: String,
    tagsPerso: [tagSchema]
});

const User = mongoose.model('users', userSchema);

module.exports = User;