const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { createHmac } = crypto;
const uuid = require('uuid');
const { v1 } = uuid;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 32,
    trim : true,
  },
  lastname: {
    type: String,
    maxLength: 32,
    trim : true,
  },
  email: {
    type: String,
    required: true,
    maxLength: 32,
    trim : true,
    unique: true,
  },
  userInfo: {
    type: String,
    trim: true,
  },
  //TODO: come back here
  encryptedPassword: {
    type: String,
    required: true,
  },
  salt: String,
  
},
{
  timestamps: true,
});

UserSchema.virtual('password').set(function(password){
  this._password = password;
  this.salt = v1();
  this.encryptedPassword = this.securePassword(password, this.salt);
}).get(function() {
  return this._password;
});

UserSchema.method('securePassword' , function(plainPassword, salt) {
    if(!plainPassword) return "";
    try {
      return createHmac('sha256', salt)
      .update(plainPassword)
      .digest('hex');
    } catch(err) {
      console.log(err.message);
      return ""
    }
});

UserSchema.method('authenticate', function(plainPassword) {
  return this.securePassword(plainPassword, this.salt) === this.encryptedPassword;
});

module.exports = mongoose.model("User", UserSchema);