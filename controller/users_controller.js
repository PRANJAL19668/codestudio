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
module.exports.create=function(req,res){

}
//CREATING SIGN-IN SESSION
module.exports.createSession=function(req,res){
}