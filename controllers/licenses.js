const express = require('express');
const Licenses = require('../models/licenses');
const asyncHandler = require('express-async-handler'); //Stops errors crashing the whole process. Works as error-handling.
const sgMail = require('@sendgrid/mail');  //for sending  emails

const LicensesCtrl = {
  //function to grab license applications. from databases
  getLicenses : asyncHandler(async (req, res) => {
    try{
      //checks if the user currently logged has the admin role.
      if(req.user.role=="admin"){
        const licenses = await Licenses.find() //returns all licenses founds.
        res.json(licenses)
      }else{
        const licenses = await Licenses.find({user_id: req.user.id}) //returns licenses for that specific user
        res.json(licenses)
      }
    }
    catch(err){
      return res.status(400).json({"errmsg": "Unable to get licenses" });
    }
  }),
  //function to create new license applications.
  addLicenses: asyncHandler(async (req,res) => {
    try{
      const {companyname, companytype, details, status} = req.body;
      const LicenseDuplicate = await Licenses.findOne({ companyname });

      if (LicenseDuplicate){
        //returns an error message if that email is already in use.
        return res.status(400).json({"errmsg": "That company has a pending application currently" });
      }
      
      const newLicense = new Licenses({
        companyname,
        companytype,
        status,
        details,
        user_id: req.user.id,
        name: req.user.name
        })
      await newLicense.save();
      res.status(201).json({ //if successful         
      errmsg: "License application is complete.",
    });
      
       //send email to administrator to alert that a new application has been 
      //received
      
         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
          const msg = {
            to: 'mguled99@hotmail.co.uk', // Change to your recipient
            from: 'guled.coding@gmail.com', // Change to your verified sender
            subject: 'New License application received',
            text: companyname + 'has sent in an application',
            html: '<strong> {companyname} has sent in an application </strong>',
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            });
                               
    }
    catch(err){
      return res.status(400).json({"errmsg": err.message });
    }
  }),
  
  updateLicenses: asyncHandler(async (req,res) => {
    try{
      
      if(req.user.role=="admin"){
        const {license_id, newstatus} = req.body;

        await Licenses.findByIdAndUpdate(license_id ,{"status": newstatus}, function(err, result){

          if(err){
              console.log(err)
             // res.send(err)
          }
          else{
              console.log(result)
              //res.send(result)
          }

        })
        return res.status(200).json({"msg": "success"});
      }else{
        return res.status(400).json({"errmsg": "This is not an admin account" });
      }
    }
    catch(err){
      return res.status(400).json({"errmsg": "Unable to update the  license" });
    }
    
  })
    
  
  
}


module.exports = LicensesCtrl;