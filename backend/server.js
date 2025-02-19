// index.js
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv'
//import uploadRoutes from './routes/uploadRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || process.env.ATLAS_URI, {})
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch((err) => console.log('MongoDB connection error: ', err));

// Health check route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Routes
app.use('/users/auth', authRoutes);
//app.use('/api/cloudinary', uploadRoutes);
app.use('/api/images', imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!"
    });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});