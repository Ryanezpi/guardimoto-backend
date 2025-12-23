import admin from '../config/firebase-admin.js';
import { query } from '../config/db.js';

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid auth token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Sync Firebase user to Postgres users table if not exists
    const { uid, email, name, picture } = decodedToken;

    const userRes = await query(
      `INSERT INTO users (firebase_uid, email, first_name, last_name, photo_url, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       ON CONFLICT (firebase_uid) DO UPDATE
       SET email = EXCLUDED.email,
           first_name = EXCLUDED.first_name,
           last_name = EXCLUDED.last_name,
           photo_url = EXCLUDED.photo_url,
           updated_at = NOW()
       RETURNING *`,
      [
        uid,
        email,
        name?.split(' ')[0] || '',
        name?.split(' ')[1] || '',
        picture || null,
      ]
    );

    req.user = userRes.rows[0];
    next();
  } catch (err) {
    console.error('[AUTH] Firebase auth failed', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
