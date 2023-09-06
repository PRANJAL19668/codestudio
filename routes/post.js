const express = require('express');
const router= express.Router();
const passport = require('passport');
//defined postController
const postController = require('../controller/posts_controller');
//access the postController in rotes
router.post('/create', passport.checkAuthentication, postController.create);



module.exports = router;