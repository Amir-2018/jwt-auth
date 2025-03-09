const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.login_user = async (req, res) => {
    const { email, password } = req.body;
    try { 
      const user = await User.findOne({ email });
      if (!user) {
        return 'email invalid'
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return 'password invalid'
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRE, {
        expiresIn: '1h',
      });
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 3600000,
      });
      
      return token ; 
    } 
    catch (err) {
      return 'Login failed' ; 
    }
  };