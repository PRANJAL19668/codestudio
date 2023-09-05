const express = require('express');
const router= express.Router();
//defined postController
const postController = require('../controller/posts_controller');
//access the postController in rotes
router.post('/create',postController.create);



module.exports = router;