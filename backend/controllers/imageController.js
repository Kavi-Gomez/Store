// controllers/imageController.js
import Image from '../models/Image.js';
import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'Please upload an image' 
      });
    }

    // Convert buffer to base64
    const fileStr = req.file.buffer.toString('base64');
    const fileUri = `data:${req.file.mimetype};base64,${fileStr}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      folder: 'user_uploads',
    });

    // Create image document
    const image = await Image.create({
      title: req.body.title || 'Untitled',
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      user: req.user.id,
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
    });

    res.status(201).json({
      success: true,
      image
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getUserImages = async (req, res) => {
  try {
    const images = await Image.find({ user: req.user.id })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: images.length,
      images
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updateImage = async (req, res) => {
  try {
    const { title, tags } = req.body;
    const image = await Image.findOne({ 
      _id: req.params.id,
      user: req.user.id 
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found or unauthorized'
      });
    }

    image.title = title || image.title;
    image.tags = tags ? tags.split(',').map(tag => tag.trim()) : image.tags;
    await image.save();

    res.status(200).json({
      success: true,
      image
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findOne({ 
      _id: req.params.id,
      user: req.user.id 
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found or unauthorized'
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);
    
    // Delete from database
    await image.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
