//Importing required packages.

const jwt = require('jsonwebtoken');
                              

//authenticates the currents users token against the one saved in env file.
const authenticate = (req, res, next) =>{
  try{
    const currenttoken = req.header("Authorisation") //requests token from this header sent from frontend.
    if(!currenttoken){
      return res.status(400).json({msg: "Authorisation failed"})
    }
    jwt.verify(currenttoken, process.env.TOKEN_SECRET, (err,user) =>{
      if(err){
        return res.status(400).json({msg: "Authorisation failed"})
      }
      else{
        req.user = user; //if verified sets user to current logged in user.
        next()
      }
    })
  }
  catch(err){
    return res.status(500).json({msg: "Authentication failed"})
  }
}


module.exports = authenticate;
