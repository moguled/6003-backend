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
      },
      telephone: {
        type: String,
      }
});

module.exports = mongoose.model("Licenses", LicenseSchema);