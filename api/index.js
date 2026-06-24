import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import apiRoutes from '../server/routes/api.js';
import authRoutes from '../server/routes/auth.js';

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

let cachedDb = null;

async function connectDB() {
  if (cachedDb && mongoose.connection.readyState === 1) return;
  cachedDb = await mongoose.connect(process.env.MONGO_URI);
}

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: err.message || 'Server error' });
});

export default async function handler(req, res) {
  try {
    await connectDB();
    app(req, res);
  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
}
