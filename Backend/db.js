const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

/**
 * Connect to MongoDB using the MONGODB_URI env variable.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌  MONGODB_URI is not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅  MongoDB connected successfully');
  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  }
}

/**
 * Find a user by username (case-insensitive).
 * @param {string} username
 * @returns {Promise<object|null>}
 */
async function findUserByUsername(username) {
  return User.findOne({ username: username.toLowerCase() });
}

/**
 * Register a new local user.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object>}
 */
async function registerUser(username, password) {
  const existing = await findUserByUsername(username);
  if (existing) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    username: username.toLowerCase(),
    passwordHash,
    provider: 'local',
  });

  return user;
}

/**
 * Find an existing user by their Firebase UID, or create one from the
 * verified Google profile. OAuth users have no password hash.
 * @param {{ uid: string, email: string|null, name: string|null, picture: string|null }} profile
 * @returns {Promise<object>}
 */
async function findOrCreateGoogleUser({ uid, email, name, picture }) {
  let user = await User.findOne({ firebaseUid: uid });
  if (user) return user;

  user = await User.create({
    firebaseUid: uid,
    username: (name || email || `user_${uid.slice(0, 6)}`).toLowerCase(),
    email: email || null,
    photoURL: picture || null,
    provider: 'google',
  });

  return user;
}

module.exports = {
  connectDB,
  findUserByUsername,
  registerUser,
  findOrCreateGoogleUser,
};
