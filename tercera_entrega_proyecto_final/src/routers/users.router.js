import express from 'express';
import * as UserController from '../controllers/users.controller.js';

const router = express.Router();

// Info
router.get('/profile', UserController.getUserProfileController);

export default router;
