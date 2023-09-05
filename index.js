//setting up the express
const express=require('express');
//setting up the cookie-parser
const cookieParser=require('cookie-parser');
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
//setting up the session-cookie for passport:
const session=require('express-session');
//setting up the passport
const passport=require('passport');
//setting up the passport-local
const passportLocal=require('./config/passport-local-strategy');
// //setting Mongostore
// const Mongostore=require('connect-mongo');
//midddleware 
app.use(express.urlencoded());
//using the cookie-parser
app.use(cookieParser());
//setting up the statics folder
app.use(express.static('./assets'));
//using expressLayouts
app.use(expressLayouts);
//extract styles and scripts from subpages into layout.
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up the view engine
app.set('view engine','ejs');
//setting up the path
app.set('views',path.join(__dirname,'views'));
//setting up the path another way
app.set('views','./views');

//setting up the express-session
app.use(session({
    //name of the cookie
    name:'codestudio',
    //whenever encryption happens,there is a key to encode and decode,so to encode it we use a key something random text,later on we generate it when we deploy it for server,when we deploy it for production we need a proper key which is not shared by anyone.
    secret:'blah something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        //we need to give the age of the cookie how long it should survive after that it expires the cookie when calculating it expires the setCookie attribute. 
        maxAge:(1000*60*100)
    }
    }));
//we need to the app to use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//use express router
app.use('/', require('./routes'));


//server
app.listen(port,function(err){
    if(err){
        //interpolation used
        console.log(`Error is running up the server:${err}`);
    }
    //interpolation used
    console.log(`Yup !My Express Server is running on the port:${port}`);
});