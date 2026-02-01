const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName:
  {
    type: String,
    maxLength: 20
  },
  lastName: {
    type: String,
    maxLength: 20
  },
  emailId: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  age: {
    type: String,
    min: 16,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","other"].includes(value)){
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
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);