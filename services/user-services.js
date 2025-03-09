const User = require("../models/user.model");
const authMiddleware  =require('../middleware/auth-middleware')

module.exports.save_user = async (req) => {
    try {
         const hashedPassword = await authMiddleware.hashPassword(req) ;         
  
          const user = new User({
  
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword,                 
        })
          user
          .save()
          .then(result =>{
              if(result)
                return true;  
                else
                return false
                    
            })
          .catch(() =>false)
        }
        catch(err) {
         return false ; 
        }
    
  }
module.exports.get_all_users = async (res) => {
    try {
      const users = await User.find({},{_id:0,__v: 0}); 
      return users ; 
    } catch (err) {
      res.status(500).json({ error: "Cannot fetch the list of users" });
    }
  };
  
  module.exports.delete_user = async (req,res) => {
    try {
      const userId = req.params.id; 
      const deletedUser = await User.findByIdAndDelete(userId); 
  
      if (deletedUser) {
        return 'deleted'
      } else {
        return 'not deleted'

      }
    } catch (err) {
      return 'exception when trying to delete user'
    }
  };


  module.exports.update_user = async (req,res) => {
    try {

      const userId = req.params.id; 
      const filter = {_id:userId };
      const update =   {
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password

      }

      const isUserUpdate = await User.updateOne(filter, update);
     if(isUserUpdate)
        return true ; 
     else 
      return false ; 
      
    } catch (err) { 
      return false
    }
  };