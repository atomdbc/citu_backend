// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import waitlistRoutes from './routes/waitlist.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/waitlist', waitlistRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
