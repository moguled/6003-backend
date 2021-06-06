const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcrypt'); //module that encypts the password.
const asyncHandler = require('express-async-handler') //Stops errors crashing the whole process. Works as error-handling.


//Registering new user to database
const addUser = asyncHandler(async (req, res) => {
  var {
         email, 
         password,
         name,
         role } = req.body; // variables required for user creation

  //checking if user email is already in use. duplicate accounts not allowed.
  const UserDuplicate = await User.findOne({ email });

  if (UserDuplicate){
    res.status(404);
    throw new Error("Email is already in use by another account");
  }

  //Hashes the password before user is created.
  password  = bcrypt.hashSync(password, 10);

  //Creates the user.
  const user = await User.create({email,password,name,role});

  //Returns a json response including the all fields but password.
  if (user) {
    res.status(201).json({ //if successful
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } else { //if error occurs.
    res.status(400);
    throw new Error("Unable to find registered user."); //error message
  }
});


const LoginUser = asyncHandler(async (req,res) => {
  const {email, password} = req.body;
  
  const user = await User.findOne({ email });
  
  if (user && (await user.checkPassword(password))){
    res.json({ 
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  }else{
    res.status(401);
    throw new Error("Incorrect Credentials");
  }
});


module.exports = {addUser,LoginUser};