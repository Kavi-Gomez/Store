import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Sample Route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
