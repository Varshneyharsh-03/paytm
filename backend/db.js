const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
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

const accountSchema = new mongoose.Schema({
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  balance: {
    type: Number,
    default: 0.0,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
