import express from 'express';
import { checkEmail, register } from './auth.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', authMiddleware, register);
router.post('/check-email', checkEmail);

export default router;
