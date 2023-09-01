const express=require('express');
const router=express.Router();
//defined usersController
const usersController=require('../controller/users_controller');


//access the usersController
router.get('/profile',usersController.profile);
router.get('/sign-up',usersController.signup);
router.get('/sign-in',usersController.signin);
router.post('/create', usersController.create);







module.exports=router;