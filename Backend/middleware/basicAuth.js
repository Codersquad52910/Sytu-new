const { findUserByUsername } = require('../db');

/**
 * Express middleware for HTTP Basic Authentication
 */
async function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
    return res.status(401).json({ message: 'Authentication required. Please provide standard Basic Auth credentials.' });
  }

  // Extract base64 credentials
  const base64Credentials = authHeader.split(' ')[1];
  if (!base64Credentials) {
    return res.status(400).json({ message: 'Invalid Authorization header format.' });
  }

  // Decode the Base64 credentials
  const decoded = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = decoded.split(':');

  if (!username || !password) {
    return res.status(400).json({ message: 'Invalid credentials format.' });
  }

  try {
    // Find user in DB
    const user = await findUserByUsername(username);
    if (!user) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Verify password match using bcrypt
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Attach user (excluding password hash) to request
    req.user = { id: user._id, username: user.username };
    next();
  } catch (error) {
    console.error('Basic Auth error:', error);
    return res.status(500).json({ message: 'Internal server error during authentication.' });
  }
}

module.exports = basicAuth;
