import { registerUser } from './auth.service.js';
import { logAuth } from '../../utils/logger.js';
import { getAuth } from 'firebase-admin/auth';

/**
 * POST /auth/register
 * Headers: Authorization: "Bearer <idToken>"
 * Body: { first_name, last_name, phone }
 * Assumes authMiddleware has already run and set req.user
 */
export async function register(req, res, next) {
  try {
    const { first_name, last_name, phone } = req.body;
    const user = await registerUser(req.user.uid, req.user.email, { first_name, last_name, phone });
    logAuth(`User registered: ${user.id}`);
    return res.json({ success: true, user });
  } catch (err) {
    if (err.message === 'User already exists') {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    next(err);
  }
}

export async function checkEmail(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  try {
    await getAuth().getUserByEmail(email);
    return res.json({ exists: true });
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      return res.json({ exists: false });
    }
    return res.status(500).json({ error: 'Internal error' });
  }
}
