import { query } from '../../config/db.js';
import { initFirebase } from '../../config/firebase-admin.js';
const admin = initFirebase();

/**
 * Register a user using Firebase ID token
 * @param {string} idToken - Firebase ID token from client
 * @param {Object} profile - additional user details
 * @param {string} profile.first_name
 * @param {string} profile.last_name
 * @param {string} profile.phone
 */
export async function registerUser(idToken, { first_name, last_name, phone }) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebase_uid = decodedToken.uid;
    const email = decodedToken.email;
    const photo_url = decodedToken.picture || null;

    // Check if user exists
    const { rows } = await query(`SELECT * FROM users WHERE firebase_uid = $1`, [firebase_uid]);

    if (rows.length) {
      // User already exists → throw error
      throw new Error('User already exists');
    }

    // Insert new user if not exists
    const insertRes = await query(
      `INSERT INTO users (firebase_uid, first_name, last_name, email, phone, photo_url)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [firebase_uid, first_name, last_name, email, phone, photo_url]
    );

    return insertRes.rows[0];
  } catch (err) {
    throw err;
  }
}
