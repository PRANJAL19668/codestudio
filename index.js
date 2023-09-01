//setting up the express
const express=require('express');
//setting up the port
const port=8000;
//Setting up the app to the express.This app has all the functionalities which is requured to the server.
const app = express();
// requiring up the path
const path=require('path');
//setting up the express-layouts
const expressLayouts=require('express-ejs-layouts');
//setting up the database
const db=require('./config/mongoose');
//setting up the view engine
app.set('view engine','ejs');
//setting up the path
app.set('views',path.join(__dirname,'views'));
//setting up the path another way
app.set('views','./views');
//midddleware
app.use(express.urlencoded());
//setting up the statics folder
app.use(express.static('./assets'));
//using expressLayouts
app.use(expressLayouts);
//extract styles and scripts from subpages into layout.
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//use express router
app.use('/', require('./routes'));

//server
app.listen(port,function(err){
    if(err){
        console.log(`Error is running up the server:${err}`);
    }
    console.log(`Yup !My Express Server is running on the port:${port}`);
});