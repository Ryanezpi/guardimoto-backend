import { query } from '../config/db.js';
import { publishMessage } from '../config/pubnub.js';
import { sendFcmNotification } from '../config/fcm.js';

// Example detection thresholds
const THRESHOLDS = {
  vibration: 2.5,
  movement: 1.5,
  tremor: 3.0,
  low_battery: 15, // percent
};

async function evaluateDetections() {
  try {
    // Example: fetch latest unprocessed gyro data
    const { rows: gyroData } = await query(`
      SELECT * FROM gyro_history
      WHERE processed = false
    `);

    for (const data of gyroData) {
      const alerts = [];

      if (Math.abs(data.x) > THRESHOLDS.vibration) alerts.push('vibration');
      if (Math.abs(data.y) > THRESHOLDS.movement) alerts.push('movement');
      if (Math.abs(data.z) > THRESHOLDS.tremor) alerts.push('tremor');

      for (const type of alerts) {
        // Insert alert into DB
        const alertRes = await query(
          `INSERT INTO alerts (device_id, user_id, type, severity, resolved, created_at)
           VALUES ($1, $2, $3, $4, false, NOW()) RETURNING *`,
          [data.device_id, data.user_id, type, 'high']
        );

        const alertEntry = alertRes.rows[0];

        // Push to PubNub channel for live monitoring
        await publishMessage(`device-${data.device_id}`, {
          event: 'alert',
          payload: alertEntry,
        });

        // Send FCM if user subscribed
        const { rows: tokens } = await query(
          `SELECT token FROM user_fcm_tokens WHERE user_id = $1`,
          [data.user_id]
        );

        for (const tokenObj of tokens) {
          await sendFcmNotification(tokenObj.token, {
            notification: {
              title: `Alert: ${type}`,
              body: `Device ${data.device_id} triggered ${type} alert.`,
            },
          });
        }
      }

      // Mark as processed
      await query(`UPDATE gyro_history SET processed = true WHERE id = $1`, [data.id]);
    }

    console.log('[DETECTION] Detection job finished');
  } catch (err) {
    console.error('[DETECTION] Error in detection job', err);
  }
}

// Run every minute
setInterval(evaluateDetections, 60 * 1000);

export default evaluateDetections;
