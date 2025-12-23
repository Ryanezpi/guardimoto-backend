import { query } from '../../config/db.js';

export const UserFcmModel = {
  async addToken(userId, fcmToken) {
    const text = `
      INSERT INTO user_fcm_tokens (user_id, fcm_token)
      VALUES ($1, $2)
      ON CONFLICT (user_id, fcm_token) DO NOTHING
      RETURNING *;
    `;
    const res = await query(text, [userId, fcmToken]);
    return res.rows[0];
  },

  async listTokens(userId) {
    const res = await query('SELECT * FROM user_fcm_tokens WHERE user_id=$1', [userId]);
    return res.rows;
  },

  async removeToken(userId, fcmToken) {
    await query('DELETE FROM user_fcm_tokens WHERE user_id=$1 AND fcm_token=$2', [userId, fcmToken]);
    return true;
  }
};
