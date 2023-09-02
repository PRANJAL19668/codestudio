
//require the models folder.
//.. one level up
const User=require('../models/user');
module.exports.profile=function(req,res){
  //return res.end('<h1>User Profile </h1>');  
  return res.render('User_Profile',{
    title:'Profile Page'
  });
}
//RENDER SIGN-UP PAGE
module.exports.signup=function(req,res){
  return res.render('user_sign_up',{
    title:"LEET CODING/SIGN UP"
  });
}
//RENDER SIGN-IN PAGE
module.exports.signin=function(req,res){
  return res.render('user_sign_in',{
    title:"LEET CODING/SIGN IN"
  });
}
//GET THE SIGN-UP DATA
//using async await only with functions.
// module.exports.create = async (req, res) => {
//   try {
//      if (req.body.password != req.body.confirm_password) {
//          return res.redirect("back");
//     }

//      const user = await User.findOne({ email: req.body.email });
//             if (!user) {
//             await User.create(req.body);
//             } else {
//                // req.flash('error', 'User is Alredy Present ! Please Sign-In !')
//                 console.log('User is already present !!')
//             }
//            // req.flash('success', 'You have Signed-Up Successfully !')
//             return res.redirect("/users/sign-in");

//   } catch (error) {
//     // console.log("Error", error);
//     let errMeg = error.message;
//     if(process.env.environment == 'production') {
//       return res.status(500).json({
//         message: 'Internal Server Error!'
//       })
//     }
//     return res.status(500).json({
//       message: errMeg
//     })
//   }
// };
module.exports.create= async function(req,res){
  if(req.body.password != req.body.Confirm_password){
    return res.redirect('back');
  }
  try{
    //finding by email
    const user = await User.findOne({ email: req.body.email});
    if(!user){
      //user with a specified email does not exist,create a new User
       const newUser= await User.create(req.body);
        return res.redirect('/users/sign-in');
    } 
    else{
      return res.redirect('back');
    }
     } catch(err){
    console.log('Error in creating user while signing-up',err);
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

module.exports.createSession = async function(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // Check if the provided password matches the user's password
      if (user.password === req.body.password) {
        // If the password matches, set the user_id cookie
        res.cookie('user_id', user._id);
        return res.redirect('/users/profile');
      } else {
        // Password does not match, redirect back
        return res.redirect('back');
      }
    } else {
      // User with the given email doesn't exist, redirect back
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error in creating user while signing-in', err);
    // Handle the error appropriately, e.g., send an error response
    return res.status(500).send('Internal Server Error');
};
}
