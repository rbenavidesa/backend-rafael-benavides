import express from 'express';
import passport from '../utils/passport.util.js';
import * as AuthController from '../controllers/auth.controller.js';

const router = express.Router();

// Signup
router.get('/signup', AuthController.getSignup);
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failSignup' }), AuthController.postSignup);
router.get('/failSignup', AuthController.failSignup);

// Login
router.get('/login', AuthController.login);
router.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }), AuthController.login);
router.get('/failLogin', AuthController.failLogin);

// Logout
router.post('/logout', AuthController.logout);

// Info
router.get('/info', AuthController.getInfo);

export default router;
