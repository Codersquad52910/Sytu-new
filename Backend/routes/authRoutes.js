const express = require('express');
const jwt = require('jsonwebtoken');
const { findUserByUsername, registerUser } = require('../db');
const basicAuth = require('../middleware/basicAuth');
const { jwtAuth, JWT_SECRET } = require('../middleware/jwtAuth');
const cacheMiddleware = require('../redis/cacheMiddleware');
const { verifyGoogleIdToken } = require('../services/oauthService');

const router = express.Router();

/**
 * @route   POST /api/auth/google
 * @desc    Verify a Firebase Google ID token and return an app JWT
 * @access  Public
 */
router.post('/google', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: 'idToken is required.' });
  }

  try {
    const { token, user } = await verifyGoogleIdToken(idToken);
    return res.json({
      message: 'Google authentication successful.',
      token,
      user,
    });
  } catch (error) {
    if (error.code === 'INVALID_TOKEN') {
      return res.status(401).json({ message: error.message });
    }
    console.error('Google auth error:', error);
    return res.status(500).json({ message: 'Error authenticating with Google.' });
  }
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  try {
    const newUser = await registerUser(username, password);
    return res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser._id,
        username: newUser.username
      }
    });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(400).json({ message: error.message });
    }
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Error registering user.' });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & return JWT token (For JWT-based auth flows)
 * @access  Public
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Check if user exists
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT payload
    const payload = {
      id: user._id,
      username: user.username
    };

    // Sign JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      message: 'Login successful.',
      token: `Bearer ${token}`,
      user: payload
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Error logging in.' });
  }
});

/**
 * @route   GET /api/auth/protected/basic
 * @desc    An endpoint protected by HTTP Basic Authentication
 * @access  Private (Basic Auth)
 */
router.get('/protected/basic', basicAuth, (req, res) => {
  return res.json({
    message: 'Access granted via HTTP Basic Authentication!',
    user: req.user
  });
});

/**
 * @route   GET /api/auth/protected/jwt
 * @desc    An endpoint protected by JWT Bearer Authentication
 * @access  Private (JWT Auth)
 */
router.get('/protected/jwt', jwtAuth, (req, res) => {
  return res.json({
    message: 'Access granted via JWT Token Authentication!',
    user: req.user
  });
});

/**
 * @route   GET /api/auth/slow-data
 * @desc    A simulated slow endpoint demonstrating Redis caching
 * @access  Public
 */
router.get('/slow-data', cacheMiddleware(30), async (req, res) => {
  // Simulate a heavy database query or external API call (2 seconds delay)
  await new Promise(resolve => setTimeout(resolve, 2000));

  return res.json({
    message: 'This is heavy data, cached using Redis for 30 seconds!',
    timestamp: new Date().toISOString(),
    randomValue: Math.floor(Math.random() * 10000)
  });
});

module.exports = router;
