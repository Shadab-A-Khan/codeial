const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/usersProfile/:id', passport.checkAuthentication, usersController.usersProfile);

router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign_in', usersController.userSignIn);
router.get('/sign_up', usersController.userSignUp);

router.post('/create', usersController.create);

router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign_in' },
), usersController.createSession);

router.get('/sign_out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), usersController.createSession);

module.exports = router;