// routes/imageRoutes.js
import express from 'express';
import multer from 'multer';
import { 
  uploadImage, 
  getUserImages, 
  updateImage, 
  deleteImage 
} from '../controllers/imageController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Protect all routes
//router.use(protect);

router.post('/upload', upload.single('image'), uploadImage);
router.get('/myimages', getUserImages);
router.put('/:id', updateImage);
router.delete('/:id', deleteImage);

export default router;