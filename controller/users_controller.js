
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

module.exports.create= async function(req,res){
  if(req.body.password!==req.body.confirm_password){
    return res.redirect('back');
  }
  try{
    //finding by email
    const user=await User.findOne({email:req.body.email});
    if(!user){
      //user with a specified email does not exist,create a new User
      const newUser=await User.create(req.body);
      return res.redirect('/users/sign-in');
    } 
  } catch(err){
    console.log('Error in finding/creating user while signing-up');
  } 
  return res.redirect('back');
  }


//CREATING SIGN-IN SESSION
module.exports.createSession=function(req,res){
}