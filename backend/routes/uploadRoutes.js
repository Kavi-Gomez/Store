// backend/routes/uploadRoutes.js
import express from 'express';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert buffer to base64
    const fileStr = req.file.buffer.toString('base64');
    const fileUri = `data:${req.file.mimetype};base64,${fileStr}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      folder: 'my_uploads',
    });

    res.json({
      message: 'Upload successful',
      imageUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

router.delete('/delete/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;
    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Image deleted', result });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

export default router;