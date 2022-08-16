const express = require('express');
const postApi = require('../../../controllers/api/v1/posts_api');
const router = express.Router();
const passport = require('passport');


router.get('/', postApi.index);
router.delete('/:id', passport.authenticate('jwt', { session: false }), postApi.destroy); //to prevent session cookies to be generatd we made it false
module.exports = router;
