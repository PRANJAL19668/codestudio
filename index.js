//setting up the express
const express=require('express');
//setting up the port
const port=8000;
//Setting up the app to the express.This app has all the functionalities which is requured to the server.
const app=express();
// requiring up the path
const path=require('path');
//use express router
app.use('/', require('./routes'));
//setting up the view engine
app.set('view engine','ejs');
//setting up the path
app.set('views',path.join(__dirname,'views'));
//setting up the path another way
app.set('views','./views');





//server
app.listen(port,function(err){
    if(err){
        console.log(`Error is running up the server:${err}`);
    }
    console.log(`Yup !My Express Server is running on the port:${port}`);
});