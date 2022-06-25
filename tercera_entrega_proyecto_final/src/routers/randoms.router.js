import express from 'express';
import * as RandomsController from '../controllers/randoms.controller.js';
import * as validationMiddleware from '../middlewares/validation.middleware.js';

const router = express.Router();

// Signup
router.get('/:cant', RandomsController.getRandoms);

router.get('/', RandomsController.getRandoms);

export default router;
