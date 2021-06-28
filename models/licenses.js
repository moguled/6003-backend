const mongoose = require("mongoose");

const LicenseSchema = mongoose.Schema({
      companyname: {
        type: String,
        required: true,
        unique: true,
      },
      companytype: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['new','pending','accepted','rejected'],
        default: 'new',
        required: true,
      },
      details: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
      },
      name:{
        type: String,
        required: true,
      }
});

module.exports = mongoose.model("Licenses", LicenseSchema);