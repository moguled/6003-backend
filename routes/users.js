const express = require("express");
const {addUser,LoginUser} = require('../controllers/users.js');
const router = express.Router();



router.route("/").post(addUser);
router.route("/login").post(LoginUser);

module.exports = router;