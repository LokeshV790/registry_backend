import express from 'express';
import { addExtraInfo } from '../controllers/authController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/addinfo', verifyUser, addExtraInfo);

export default router;
