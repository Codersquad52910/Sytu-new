require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const { connectRedis, getIsConnected } = require('./redis/client');
const { connectDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup API routes
app.use('/api/auth', authRoutes);

// Base Status Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    redisStatus: getIsConnected() ? 'connected' : 'disconnected/offline',
    message: 'Backend Authentication Service is running.',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      protectedBasic: 'GET /api/auth/protected/basic',
      protectedJwt: 'GET /api/auth/protected/jwt',
      slowDataDemo: 'GET /api/auth/slow-data'
    }
  });
});

// Start the server
app.listen(PORT, async () => {
  console.log(` Server running on: http://localhost:${PORT}`);
  // Initialize MongoDB Connection
  await connectDB();
  // Initialize Redis Connection
  await connectRedis();
});
