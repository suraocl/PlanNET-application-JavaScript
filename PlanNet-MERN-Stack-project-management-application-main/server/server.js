require('dotenv').config();

var cors = require('cors')
const express = require('express')
const app = express()

const mainRouter = require("./routes/mainRouter");
const  mysqlConnection  = require('./helpers/connectDB');

app.use(cors());

app.use('/api', mainRouter)

app.listen(process.env.PORT, () => {
  
  mysqlConnection.connect((error) => {
    if(error){
      throw error;
    }
    
    console.log("Mysql Connected!");
    console.log(`Server listening on ${ process.env.DBHOST + ":" + process.env.PORT}`)
  })
})





