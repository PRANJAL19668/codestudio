const express=require('express');
const router=express.Router();
const passport=require('passport');

//defined usersController
const usersController = require('../controller/users_controller');
//access the usersController
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);
router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);
router.post('/create', usersController.create);
//use passport as a middleware to authenticate
//passort.authenticate is a inbuilt function
router.post('/create-Session', passport.authenticate
('local',
//if the createSession fails so we redirect to sign-in page
{failureRedirect:'/users/sign-in'},
),usersController.createSession);
router.get('/sign-out', usersController.destroySession);

module.exports=router;