// routes/auth.js
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/AuthController.js';
import { validateRegistration, validateLogin } from '../middleware/validators.js';

const router = Router();

// User registration route
router.post('/register', validateRegistration, registerUser);

// User login route
router.post('/login', validateLogin, loginUser);

export default router;