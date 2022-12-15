const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  title: String,
  color: String,
  form: String,
});

const contactedTimesCounterSchema = mongoose.Schema({
  phoneCounter: Number,
  smsCounter: Number,
  emailCounter: Number,
});

const emailSchema = mongoose.Schema({
  type: String,
  email: String,
});

const phoneSchema = mongoose.Schema({
  type: String,
  number: String,
  country: String,
  areaCode: String,
});

const contactSchema = mongoose.Schema({
  name: String,
  firstName: String,
  emails: [emailSchema],
  phones: [phoneSchema],
  birthday: String,
  tags: [tagSchema],
  contactedTimesCounter: [contactedTimesCounterSchema],
});

const userSchema = mongoose.Schema({
  name: String,
  firstName: String,
  emailMain: String,
  emails: [emailSchema],
  phones: [phoneSchema],
  password: String,
  token: String,
  birthday: String,
  tagsPerso: [tagSchema],
  contacts: [contactSchema],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
