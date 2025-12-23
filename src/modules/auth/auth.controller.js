import { registerUser } from './auth.service.js';
import { logAuth } from '../../utils/logger.js';

/**
 * POST /auth/register
 * Headers: { Authorization: "Bearer <idToken>" }
 * Body: { first_name, last_name, phone }
 */
export async function register(req, res, next) {
  try {
    // Extract idToken from Authorization header
    const authHeader = req.headers.authorization || '';
    const idToken = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (!idToken) {
      return res.status(400).json({ success: false, message: 'Authorization header with Bearer token is required' });
    }

    const { first_name, last_name, phone } = req.body;

    const user = await registerUser(idToken, { first_name, last_name, phone });
    logAuth(`User registered: ${user.id} (${user.email})`);

    return res.json({ success: true, user });
  } catch (err) {
    // If user already exists, return 400
    if (err.message === 'User already exists') {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    next(err);
  }
}
