import admin from './firebase-admin.js';

export async function sendFcmNotification(token, payload) {
  try {
    const response = await admin.messaging().send({
      token,
      ...payload,
    });
    console.log('[FCM] Notification sent:', response);
    return response;
  } catch (err) {
    console.error('[FCM] Error sending notification:', err);
    throw err;
  }
}
