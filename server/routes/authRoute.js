import express from 'express';
import { googleLogin } from '../controllers/authController.js'; 

const authRouter = express.Router();

// Google Login Route
authRouter.post('/google', googleLogin);

export default authRouter;