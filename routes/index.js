const express=require('express');
const router=express.Router();
//defined home controller in routes/index.js is the entry point of all the routes.
//.. means on level up
const homeController=require('../controller/home_controller');
console.log('router loaded');


//accessing homeController in routes
router.get('/', homeController.home);
router.use('/users',require('./users'));
module.exports=router;