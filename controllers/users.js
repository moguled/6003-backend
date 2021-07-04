const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcrypt'); //module that encypts the password.
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); //Stops errors crashing the whole process. Works as error-handling.


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
    //returns an error message if that email is already in use.
    return res.status(400).json({"errmsg": "Email is already in use by another account" });
  }
  
  if (email==""){
    return res.status(400).json({"errmsg": "Email is empty" });
  }
                             
  if (name==""){
    return res.status(400).json({"errmsg": "Name is empty" });
  }
  
  if (password==""){
    return res.status(400).json({"errmsg": "Password is empty" });
  }
  
  //checks password length
  if (password.length < 6){
    return res.status(400).json({"errmsg": "Password  too short" });
  }
  
  //checks for number in password
  if (password.search(/[0-9]/) == -1){
    return res.status(400).json({"errmsg": "Password requires one number" });
  }
  
  //checks for capital letter in password
  if (password.search(/[A-Z]/) == -1){
    return res.status(400).json({"errmsg": "Password requires one capital letter" });
  }
  
  //checks for lower case letter in password
  if (password.search(/[a-z]/) == -1){
    return res.status(400).json({"errmsg": "Password requires at least one lower case letter" });
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
      errmsg: "Registration has been successful",
    });
  } else { //if error occurs.
    return res.status(404).json({"errmsg": "Unable to find registered user." }); //error message
  }
});

//Checks the inputted email and password against database.
const LoginUser = asyncHandler(async (req,res) => {
  const {email, password} = req.body;
  
  const user = await User.findOne({ email });
  
  if (user && (await user.checkPassword(password))){
    //jwt token signing
    const payload = {id: user._id, name: user.name, role:user.role}
    // token will carry payload which contains user information.
    const jwttoken = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn:"1d"})
    res.status(200).json({ 
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      jwttoken,
    });
    
  }else{ 
    return res.status(400).json({"errmsg": "Login has failed" })
    //res.status(401);
    //throw new Error("Incorrect Credentials");
  }
});

// Verifies the JWT token returned by login in the header Authorisation. Returns boolean values.
const verifyToken = asyncHandler( async(req,res)=>{
  try{
    const currenttoken = req.header("Authorisation")
    
    //checks if there is a token.
    if (!currenttoken){
      return res.send(false)
    }
    
    //checks the token against the secret token
    jwt.verify(currenttoken, process.env.TOKEN_SECRET, async(err, verified)=>{
      if(err){
        return res.send(false)
      }
      const user = await User.findById(verified.id)
      if(!user){
        return res.send(false)
      }
      //returns a boolean
      return res.send(true)
    })
  }
  catch{
    return res.status(500).json({msg: "Authentication failed"}) //error message
  }
})



module.exports = {addUser,LoginUser,verifyToken};