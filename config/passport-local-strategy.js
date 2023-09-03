//setting up the models folder
const User=require('../models/user');
//setting up the passport
const passport = require('passport');
//setting up the passport-loacal 
const LocalStrategy = require('passport-local').Strategy;
//authentication using passport
passport.use(
    new LocalStrategy(
        //syntax is required
      { usernameField: "email",
      //ISTRATEGYOPTIONSWITHREQUEST:passReqToCallback:true
       passReqToCallback: true
      },
      //callback function is required
      function (req, email, password, done) {
        //done is inbuilt funcyrion which pass to
        //find a user and establish identity
  
        User.findOne({ email: email })
          .exec() // Execute the query
          .then(user => {
            if (!user || user.password !== password) {
             //req.flash("error", "Invalid Username/Password");
            console.log('Invalid Username/Password');
              return done(null, false);
            }
  
            return done(null, user);
          })
          .catch(err => {
            //req.flash("error", err.message);
            console.log('Error in finding user --> passport');
            return done(err);
          });
      }
    )
  );
  

//serializing the user to decide which key to kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


//deserializing the user from te key in cookies
passport.deserializeUser(function(id,done){
    // User.findById(id,function(err,user){
    //     if(err){
    //         console.log('Error in finding user in curtesy to passport');
    //     }
    //     return done(null,user);
    // });
    User.findById(id)
    .exec() // Execute the query
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      console.log("Error in finding user --> passport");
      return done(err);
    });
 });
//check if the user is authenticated or not
passport.checkAuthentication=function(req,res,next){
    //if the user is signed-in,then pass on the request to the next function()(controller's action)
    if(req.isAuthenticated()){
      //isAuthenticated() is the method given by the passport.js
    return next();
  }
  //if the user is not signed-in 
  return res.redirect('/users/sign-in');
}
//this is basically a middleware to check if the user is signed in or not
passport.setAuthenticatedUser=function(req,res,next){
  if(req.isAuthenticated()){
    //req.user contains the current sign-in user from the session-cookie and we are just sending this to locals for the views
    res.locals.user=req.user;
  }
  next();
}







module.exports=passport;
