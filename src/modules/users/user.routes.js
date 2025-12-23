import express from 'express';
import { getProfile, updateProfile } from './user.controller.js';

const router = express.Router();

// GET own profile
router.get('/me', getProfile);

// PATCH own profile
router.patch('/me', updateProfile);

export default router;
