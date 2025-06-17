const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  usernmae: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 50,
    minLength: 5,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 100,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

//hi theere

module.exports = {
  User,
};
