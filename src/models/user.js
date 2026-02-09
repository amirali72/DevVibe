const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName:
  {
    type: String,
    trim: true,
    maxLength: 20
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 20
  },
  emailId: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address: " + value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Please add a strong password " + value);
      }
    }
  },
  age: {
    type: Number,
    min: 16,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Gender is not valid");
      }
    }
  },
  photoUrl: {
    type: String,
    default: "https://i.pinimg.com/736x/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg",
  },
  about: {
    type: String,
    default: "This is about section of my profile",
  },
  skills: {
    type: [String],
  }
}, { timestamps: true });

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, 'Dev@123', { expiresIn: '7d' });
  return token;
}

userSchema.methods.validatePassword = async function (passwordEntered) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(passwordEntered, user.password);
  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);