const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const middleWarefunction = require("../middleware/auth-middleware");
const store = require("store2");
const authServices  = require('../services/auth-services')

module.exports.login_user = async (req, res) => {
  const isUserLoggedin  =  await authServices.login_user(req,res)
  if(isUserLoggedin == 'email invalid'){
    res.status(500).json({message : 'Email invalide'});
  }else if(isUserLoggedin == 'password invalid')
  res.status(500).json({message : 'password invalid'});
  else if(isUserLoggedin=="Login failed")
    res.status(500).json({message : 'Login failed'});
  else res.status(200).json({message : isUserLoggedin});
};

module.exports.logout_get = async (req, res) => {
  try {
    await middleWarefunction.deleteToken(res); // Added 'await' for async function call
    res.status(200).json({ message: 'You are logged out' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong while logging out' });
  }
};

const generateCode = ()=>{
  let code = Math.floor(Math.random() * 100000);
  return code.toString() ; 
}

function sendMail(user){
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'amir.maalaoui27@gmail.com',
        pass: 'hvcc kxhh bovj gely'
      }
    });

    var mailOptions = {
      from: 'amir.maalaoui27@gmail.com',
      to: user,
      subject: 'Sending Email using Node.js',
      text: codeV
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
} 

var codeV = generateCode();

module.exports.send_email = (req, res) => {  
  User.findOne({email : req.body.email })
  .then(user =>{
    if(user){
      const use = req.body.email
      sendMail(use);
      store('Code', {code:codeV,email:req.body.email}); 
      res.status(500).json({
        message : 'Verification code is sent to your email'
      })
    }else{
      res.status(500).json({
        message : 'User not found'
      })
    }
  }).catch(err=>{
    console.log(err)
  })
}

module.exports.verify_code = (req, res) => {   
  const code  = (store.getAll().Code.code)
  if((req.body.code)== code){  
    res.status(200).json({
      message : 'The same code now you can change your password'
    })
  }else{
    res.status(500).json({
      message : 'Verify your verification code '
    })
  }
}
module.exports.change_pass = async (req, res) => {   
  const newpass = req.body.newpass ; 
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newpass,salt);
  User.findOne({email:(store.getAll().Code.email)})
  .then(user =>{
    if(user){
      User.findOneAndUpdate({email:(store.getAll().Code.email)},{$set:{
        password : hashedPassword
      }})
      .then(pass =>{
        if(pass){
          res.status(200).json({
            message : 'password updated with success'
          })
        }else{
          res.status(500).json({
            message : 'password not updated'
          })
        }
      })
    }else{
      res.status(500).json({
        message : 'User not found'
      })
    }
  }).catch(err=>{
    res.status(200).json({    
      message : err
    })
  })
}



      
