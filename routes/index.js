const express=require('express');
const router=express.Router();
//defined home controller in routes/index.js is the entry point of all the routes.
//.. means on level up
const homeController=require('../controller/home_controller');
console.log('router loaded');


//accessing homeController in routes
// '/' means home path url
router.get('/', homeController.home);
//further routes can be accessed from here,i.e.., making new routes and calling them in this.
router.use('/users', require('./users'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));






module.exports=router;