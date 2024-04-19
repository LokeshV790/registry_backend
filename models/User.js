// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  location: {
    type: String,
  },
  age: {
    type: Number,
  },
  workDetails: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
