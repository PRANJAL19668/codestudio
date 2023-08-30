const express=require('express');
const router=express.Router();
//defined usersController
const usersController=require('../controller/users_controller');


//access the usersController
router.get('/profile',usersController.profile);







module.exports=router;