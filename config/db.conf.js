const mongoose = require('mongoose') ;

const connect_to_database = (uri)=>{
    mongoose.connect(uri)
     .then(
        (result) => {
          if(result)
            console.log('Connected succesfully');
          else
            console.log('not connected');
        })
      .catch((err) => console.log(  err)); 
}

module.exports = {connect_to_database}