// Importing Main Libraries for Node Server and Database 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// creating Server 
const app = express() ;

//configuring body-parser for Api Requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


//Creating a test Api
app.use("/",(req,res,next) => {
    console.log("GET / request received") ;
    return res.status(200).json({
        message : "test GET request Successful"
    })
})

// Running the Server
app.listen(5000,() => {
    console.log("Server is Runnning at port 5000") ;
})