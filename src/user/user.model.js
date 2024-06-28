import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModal = mongoose.model("user",userSchema );

export default UserModal;


// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema(
//   {
//     firstname: { type: String },
//     email: { type: String },
//     phoneNumber: { type: Number },
//     password: { type: String },
//     isEmailVerified: { type: Boolean, default: false },
//     emailVerifyCode: { type: Number },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", UserSchema);