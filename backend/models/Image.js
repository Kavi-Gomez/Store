// models/Image.js
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an image title'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  publicId: {
    type: String,
    required: [true, 'Cloudinary public ID is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Image = mongoose.model('Image', imageSchema);
export default Image;