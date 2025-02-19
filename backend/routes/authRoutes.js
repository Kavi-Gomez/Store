// routes/authRoutes.js
import express from 'express';
import { 
  register, 
  login, 
  getAllUsers, 
  updateUser, 
  deleteUser 
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);

// Protected user management routes
router.get('/getAllUsers', getAllUsers);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;