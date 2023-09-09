const express = require('express');
const router= express.Router();
const passport = require('passport');
//defined postController
const postController = require('../controller/posts_controller');
//access the postController in routes
router.post('/create', passport.checkAuthentication, postController.create);
router.get('/destroy/:id', passport.checkAuthentication , postController.destroy);


module.exports = router;