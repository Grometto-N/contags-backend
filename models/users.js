const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  title: String,
  color: String,
  border: String,
});

const contactedTimesCounterSchema = mongoose.Schema({
  phoneCounter: Number,
  smsCounter: Number,
  emailCounter: Number,
});

const emailSchema = mongoose.Schema({
  emailType: String,
  email: String,
}); 

const phoneSchema = mongoose.Schema({
  phoneType: String,
  number: String,
  country: String,
  areaCode: String,
});

const contactSchema = mongoose.Schema({
  lastName: String,
  firstName: String,
  emails: [emailSchema],
  phones: [phoneSchema],
  dob: String,
  tags: [tagSchema],
  contactedTimesCounter: [contactedTimesCounterSchema],
});

const userSchema = mongoose.Schema({
  lastName: String,
  firstName: String,
  emailMain: String,
  emails: [emailSchema],
  phones: [phoneSchema],
  password: String,
  token: String,
  dob: String,
  tagsPerso: [tagSchema],
  contacts: [contactSchema],
}

);

const User = mongoose.model("users", userSchema);

module.exports = User;
