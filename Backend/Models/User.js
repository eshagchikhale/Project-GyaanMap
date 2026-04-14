const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email format"
    }
  },
  passwordHash: {
    type: String,
    required: [true, "Password is required"]
  },

  // 👇 New profile fields
  university: {
    type: String,
    trim: true,
    default: ""
  },
  graduationYear: {
    type: String,
    trim: true,
    default: ""
  },
  major: {
    type: String,
    trim: true,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
