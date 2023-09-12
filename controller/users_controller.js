const User = require("../models/user");
module.exports.profile = async function (req, res) {
  //using promises(.then(function(user){})
  try {
    let user = await User.findById(req.params.id); //string params
    return res.render("user_profile", {
      title: "User Profile",
      //json object creted
      profile_user: user
    });
  } catch (err) {
    console.log("Error in finding user", err);
    return res.redirect("back");
  }
};

//UPDATING PROFILE PAGE
module.exports.update = async function(req,res){
  try{
    //CHECKING UPDATE REQUEST,IF SOMEONE WANTS TO FIDDLE WITH MY ACCOUNT i.e,, ANY LOGGED IN USER CAN EDIT ANY OF THE USER PROFILE,IF I DONT PUT CHECKS HERE.
    if(req.user.id == req.params.id ){
      User.findByIdAndUpdate(req.params.id, {name:req.body.name, email: req.body.email});
      User.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect('back');
    } else{
      //IF SOMEONNE IS FIDDLING WITH MY ACCOUNT.
      return res .status(401).send('Unauthorized');
    }

  } catch(err){
    console.log('Error in updating profile page',err);
    return res.redirect('back');
  }
}


























// module.exports.profile = async function (req, res) {
//   if (req.cookies.user_id) {
//     //check if the cookies with user_id is present or not.
//     try {
//       let user = await User.findById(req.cookies.user_id);
//       //if the user found
//       return res.render("user_profile", {
//         title: "Profile Page",
//         //json object created
//         user_profile: user,
//       });
//     } catch (err) {
//       console.log("Error in showing the details of signed-in user", err);
//       return res.redirect("back");
//     }
//   }
// };

//return res.end('<h1>User Profile </h1>');
//return res.render('User_Profile',{
//title:'Profile Page'
//});
//}
//RENDER SIGN-UP PAGE
module.exports.signup = function (req, res) {
  return res.render("user_sign_up", {
    title: "LEET CODING/SIGN UP",
  });
};
//RENDER SIGN-IN PAGE
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    //isAuthenticated() is the function given by passport.js only.
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "LEET CODING/SIGN IN",
  });
};
//GET THE SIGN-UP DATA
//using async await only with functions.
module.exports.create = async function (req, res) {
  if (req.isAuthenticated()) {
    //isAuthenticated() is  a function given by passport.js only.
    return res.redirect("/users/profile");
  }
  if (req.body.password != req.body.Confirm_password) {
    return res.redirect("back");
  }
  try {
    //finding by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      //user with a specified email does not exist,create a new User
      const newUser = await User.create(req.body);
      return res.redirect("/users/sign-in");
    }
    //user with a specified email does not exist,return back
    else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in creating user while signing-up", err);
  }
};

//CREATING SIGN-IN SESSION
//USING ASYNC AWAIT ONLY WITH FUNCTIONS WHEN USE.
// module.exports.createSession = async function(req,res){
//   //find the user
//   try{
//     const user = await User.findOne({email: req.body.email});

//   } catch(err){
//     console.log('Error in creating user while signing-in',err);
//   }
//   if(User){
//     //user password which does not matches.
//     if(User.password != req.body.password){
//       return res.redirect('back');
//     }
//     //handle user creation
//     //if the password matches,we set the cookie
//     res.cookie('user_id',User._id)
//       return res.redirect('/users/profile');
//     }
//     else{
//       return res.redirect('back');
//     }

//   }
//signed-in using manual authentication
module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    //if user found
    if (user) {
      // Check if the provided password matches the user's password
      if (user.password === req.body.password) {
        // If the password matches, set the user_id cookie
        //.id converts it into string
        //._id converts it into objectId
        res.cookie("user_id", user._id);
        return res.redirect("/users/profile");
      } else {
        // Password does not match, redirect back
        return res.redirect("back");
      }
    } else {
      // User with the given email doesn't exist, redirect back
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in creating user while signing-in", err);
    // Handle the error appropriately, e.g., send an error response
    return res.status(500).send("Internal Server Error");
  }
};

//LOCAL AUTHENTICATION
//when passport.js uses LocalStrategy () to authenticate the user,controlls come here and it will redirect to home page.
// module.exports.createSession=function(req,res){
//   return res.redirect('/');
// }

//DESTROY SESSION
module.exports.destroySession = function (req, res) {
  //req.logout() is the function given by passport.js

  req.logout(function (err) {
    if (err) {
      // Handle the error, if any
      console.log(err);
    }
    return res.redirect("/");
  });
};
