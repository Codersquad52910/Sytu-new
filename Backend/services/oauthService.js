const jwt = require('jsonwebtoken');
const { getAuth, initFirebaseAdmin } = require('../firebase/admin');
const { findOrCreateGoogleUser } = require('../db');
const { JWT_SECRET } = require('../middleware/jwtAuth');

// Ensure the Admin SDK is ready before any verification happens.
initFirebaseAdmin();

/**
 * Verify a Firebase Google ID token (sent from the frontend after
 * signInWithPopup), upsert the user, and issue an application JWT.
 *
 * @param {string} idToken - The Firebase ID token from the client.
 * @returns {Promise<{ token: string, user: object }>}
 * @throws {Error} with code 'INVALID_TOKEN' if verification fails.
 */
async function verifyGoogleIdToken(idToken) {
  if (!idToken) {
    const err = new Error('No ID token provided.');
    err.code = 'INVALID_TOKEN';
    throw err;
  }

  let decoded;
  try {
    decoded = await getAuth().verifyIdToken(idToken);
  } catch (err) {
    const e = new Error('Firebase ID token verification failed.');
    e.code = 'INVALID_TOKEN';
    e.cause = err.message;
    throw e;
  }

  const user = await findOrCreateGoogleUser({
    uid: decoded.uid,
    email: decoded.email || null,
    name: decoded.name || null,
    picture: decoded.picture || null,
  });

  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    provider: 'google',
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  return {
    token: `Bearer ${token}`,
    user: payload,
  };
}

module.exports = { verifyGoogleIdToken };
