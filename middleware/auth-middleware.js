const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async(req) => {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          return hashedPassword ; 
};

const deleteToken = async (res) => {
    res.cookie('token', '', { maxAge: 1, httpOnly: true }); 
  };
  
const testKey = async  (req,res,next)=>{
    const token = req.cookies.token;
  
    if (!token) return res.status(401).json({ error: 'Access denied' });
  
    try {
      const decoded = jwt.verify(token, 'your-secret-key');
      req.userId = decoded.userId;
      next() ;  
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  
module.exports = { hashPassword,deleteToken,testKey};