const express=require('express');
const router=express.Router();
const passport=require('passport');

//defined usersController
const usersController=require('../controller/users_controller');

//access the usersController
router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/sign-up',usersController.signup);
router.get('/sign-in',usersController.signin);
router.post('/create',usersController.create);
//use passport as a middleware to authenticate
//passort.authenticate is a inbuilt function
router.post('/create-Session', passport.authenticate
('local',
//if the createSession fails so we redirect to sign-in page
{failureRedirect:'/users/sign-in'},
),usersController.createSession);

module.exports=router;