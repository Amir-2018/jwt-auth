const userServices  = require('../services/user-services')


module.exports.save_user = async (req, res) => {
    try { 

          const isUserSaved = userServices.save_user(req) ; 

          if(isUserSaved){
            res.status(200).json({message : "User saved with success"})
          }else{
            res.status(400).json({error : "User save failed"})
          }
    
    }catch(err)  {

      res.status(500).json({error : "User could not be saved"})

    }
}

module.exports.get_all_users = async (req, res) => {
  try {
    const users = await userServices.get_all_users(); // Awaiting the service call
    if (users.length > 0) {
      res.status(200).json(users); // Returning users if the length is greater than 0
    } else {
      res.status(404).json({ message: "No users found" }); // Handling case when no users are found
    }
  } catch (err) {
    res.status(500).json({ error: "Cannot get the list of users" });
  }
};


module.exports.delete_user = async (req,res) => {
  try {
    const deletedUserMessage = await userServices.delete_user(req,res); 

    if (deletedUserMessage =='deleted') {
      res.status(200).json({ message: "User deleted successfully" });
    } else if (deletedUserMessage =='not deleted'){
      res.status(500).json({ error: "Could not delete user" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
}
  module.exports.update_user = async (req,res) => {
    try {
      const isUserUpdated = await userServices.update_user(req,res); 
  
      if (isUserUpdated) {
        res.status(200).json({ message: "User updated successfully" });
      } else
        res.status(500).json({ error: "Could not update user" });
      
    } catch (err) {
      res.status(500).json({ error: "Exception while updating user" });
    }
  }
  