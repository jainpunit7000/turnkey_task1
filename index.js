// Importing Main Libraries for Node Server and Database 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// creating Server 
const app = express() ;

// Mongo DB URI Connector
const MONGO_DB_URI = "mongodb+srv://pjain:DyMpOzlue13h13xP@cluster0.gxnuq.mongodb.net/users"

//configuring body-parser for Api Requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//Importing routes
const authRoutes = require('./routes/auth');


//Enabling Routes in app
app.use(authRoutes) ;


//error Handler
app.use((req,res,next) => {
    res.status(404).json({message:"Page not Found"}) ;
})


// Running the Server after connecting to MONGODB
mongoose.connect(MONGO_DB_URI)
    .then( conn => {
        console.log(":: app connected to DB") ;
        app.listen(5000,() => {
            console.log(":: Server is Runnning at port 5000") ;
        })
    } )
    .catch( err => {
        console.log(":: Connection to DB failed") ;
        console.log(err);
    } )
