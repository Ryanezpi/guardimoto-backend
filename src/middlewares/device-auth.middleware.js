import { query } from '../config/db.js';

export async function deviceAuthMiddleware(req, res, next) {
  const deviceKey = req.headers['x-device-key'];

  if (!deviceKey) {
    return res.status(401).json({ message: 'Missing device key' });
  }

  try {
    const { rows } = await query(
      `SELECT * FROM devices WHERE pubnub_channel = $1 AND paired = true`,
      [deviceKey]
    );

    if (!rows.length) {
      return res.status(401).json({ message: 'Unauthorized device' });
    }

    req.device = rows[0];
    next();
  } catch (err) {
    console.error('[DEVICE AUTH] Error validating device', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
