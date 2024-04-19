import express from 'express';
import { registerUser, verifyOTP, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);

export default router;