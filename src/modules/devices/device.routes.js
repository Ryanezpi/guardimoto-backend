import express from 'express';
import { createDevice, getDevices } from './device.controller.js';
const router = express.Router();

router.post('/', createDevice);
router.get('/', getDevices);

export default router;
