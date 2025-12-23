import admin from 'firebase-admin';
import serviceAccount from '../../guard-imoto-project-firebase-adminsdk-fbsvc-6da6790360.json' with { type: 'json' };

export function initFirebase() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin;
}
