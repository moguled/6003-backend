const express = require("express");
const {addUser,LoginUser, verifyToken} = require('../controllers/users.js');
const router = express.Router();



router.route("/register").post(addUser);
router.route("/login").post(LoginUser);
router.route("/authenticate").get(verifyToken);

module.exports = router;