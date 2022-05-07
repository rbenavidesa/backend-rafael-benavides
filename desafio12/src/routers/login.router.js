import express from 'express';
import * as loginController from '../controllers/login.controller.js';
import auth from '../middleware/auth.middleware.js';

const routerLogin = express.Router();

routerLogin.get('/', loginController.getLoginController);

routerLogin.post('/login', loginController.loginController);

routerLogin.get('/login', auth, loginController.loginController);

routerLogin.post('/logout', loginController.logoutController);

export default routerLogin;
