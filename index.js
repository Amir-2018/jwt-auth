const express = require("express");
const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const dbConnection  = require("./config/db.conf");
require("dotenv").config();



const app = express();
const PORT = process.env.PORT || 3000;;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
}); 

 // middlewares
  app.use(cors({
    origin : '*'
  }))
  
  app.use(express.json());

  app.use(express.urlencoded({
    extended: true
  }));
  app.use(cookieParser()) ; 
  // define routes
  app.use('/auth',authRoutes);
  app.use('/user',userRoutes);


const uri = process.env.MONGO_URI;
dbConnection.connect_to_database(uri)

