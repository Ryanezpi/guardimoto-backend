import { query } from '../../config/db.js';
import { initFirebase } from '../../config/firebase-admin.js';
import { logDb } from '../../utils/logger.js';

const admin = initFirebase();

/**
 * Get user by Firebase UID
 * @param {string} firebase_uid
 */
export async function getUserByUid(firebase_uid) {
  const { rows } = await query(`SELECT * FROM users WHERE firebase_uid = $1`, [firebase_uid]);
  return rows[0] || null;
}

/**
 * Update user profile
 * @param {string} firebase_uid
 * @param {Object} updates
 * @param {string} [updates.first_name]
 * @param {string} [updates.last_name]
 * @param {string} [updates.phone]
 * @param {string} [updates.photo_url]
 * @param {boolean} [updates.notifications_enabled]
 */
export async function updateUser(firebase_uid, updates) {
  const { first_name, last_name, phone, photo_url, notifications_enabled } = updates;

  const { rows } = await query(
    `UPDATE users
     SET first_name = COALESCE($1, first_name),
         last_name = COALESCE($2, last_name),
         phone = COALESCE($3, phone),
         photo_url = COALESCE($4, photo_url),
         notifications_enabled = COALESCE($5, notifications_enabled),
         updated_at = NOW()
     WHERE firebase_uid = $6
     RETURNING *`,
    [first_name, last_name, phone, photo_url, notifications_enabled, firebase_uid]
  );

  logDb(`User updated: ${firebase_uid}`);
  return rows[0];
}