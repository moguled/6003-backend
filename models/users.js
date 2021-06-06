const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({

      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['user','admin'],
        required: true,
      }
});

UserSchema.methods.checkPassword = async function checkPassword(data) {
  return bcrypt.compare(data, this.password);
};


module.exports = mongoose.model("Users", UserSchema);