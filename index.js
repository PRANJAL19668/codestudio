//setting up the express
const express=require('express');
//setting up the port
const port=8000;
//Setting up the app to the express.This app has all the functionalities which is requured to the server.
const app=express();
//use express router
app.use('/', require('./routes'));




//server
app.listen(port,function(err){
    if(err){
        console.log(`Error is running up the server:${err}`);
    }
    console.log(`Yup !My Express Server is running on the port:${port}`);
});