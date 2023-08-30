const express=require('express');
const router=express.Router();
//defined home controller
const homeController=require('../controller/home_controller');
console.log('router loaded');


//accessing homeController in routes
router.get('/',homeController.home);
module.exports=router;