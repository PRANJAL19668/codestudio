const express = require('express');
const router = express.Router();
const passport = require('passport');
//defined commentController
const commentController = require('../controller/comments_controller');
//acessed
router.post('/create', passport.checkAuthentication, commentController.create);
module.exports = router;