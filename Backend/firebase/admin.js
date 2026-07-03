const { initializeApp, getApps, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

/**
 * Decode the service account credentials supplied via the
 * FIREBASE_SERVICE_ACCOUNT_BASE64 env var (base64-encoded JSON).
 */
function loadServiceAccount() {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (!b64) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_BASE64 is not set. Add the base64-encoded ' +
      'Firebase service account JSON to the backend .env file.'
    );
  }
  try {
    return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
  } catch (err) {
    throw new Error('Could not parse FIREBASE_SERVICE_ACCOUNT_BASE64: ' + err.message);
  }
}

let initialized = false;

/**
 * Initialize the Firebase Admin app once. Safe to call multiple times.
 */
function initFirebaseAdmin() {
  if (!initialized && getApps().length === 0) {
    const serviceAccount = loadServiceAccount();
    initializeApp({
      credential: cert(serviceAccount),
    });
    initialized = true;
    console.log('Firebase Admin initialized for project:', serviceAccount.project_id);
  }
}

module.exports = { getAuth, initFirebaseAdmin };
