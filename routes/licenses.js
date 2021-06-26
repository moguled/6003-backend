const express = require("express");
const router = express.Router();
const authenticate = require('../middlewares/auth.js');
const LicensesCtrl = require('../controllers/licenses.js');



router.route("/")
  .get(authenticate, LicensesCtrl. getLicenses)
  .post(authenticate, LicensesCtrl.addLicenses)

router.route("/update")
  .post(authenticate, LicensesCtrl.updateLicenses)




module.exports = router;
