import express from 'express';
import { addExtraInfo } from '../controllers/authController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

import { getUserInfo } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/addinfo', verifyUser, addExtraInfo);

router.get('/user', verifyToken, getUserInfo);

export default router;
