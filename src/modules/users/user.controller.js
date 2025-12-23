import { getUserByUid, updateUser } from './user.service.js';
import { logAuth } from '../../utils/logger.js';
import { initFirebase } from '../../config/firebase-admin.js';

const admin = initFirebase();

/**
 * GET /users/me
 */
export async function getProfile(req, res, next) {
  try {
    const idToken = req.headers.authorization?.split(' ')[1];
    if (!idToken) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const decoded = await admin.auth().verifyIdToken(idToken);
    const user = await getUserByUid(decoded.uid);

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /users/me
 * body: { first_name, last_name, phone }
 */
export async function updateProfile(req, res, next) {
  try {
    const idToken = req.headers.authorization?.split(' ')[1];
    if (!idToken) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const decoded = await admin.auth().verifyIdToken(idToken);
    const updates = req.body;

    const user = await updateUser(decoded.uid, updates);

    logAuth(`User profile updated: ${user.id}`);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
}
