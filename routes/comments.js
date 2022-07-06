const express = require('express');
const router=express.Router();
const passport = require('passport'); //this is required to check authentication in router.post

const commentsController=require('../controllers/comments_controller');
router.post('/create', passport.checkAuthentication, commentsController.create);

module.exports=router;