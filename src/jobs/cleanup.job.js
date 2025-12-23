// src/jobs/cleanup.job.js
import { query } from '../config/db.js';
import { setIntervalAsync } from 'set-interval-async/fixed'; // npm i set-interval-async
import { logDb } from '../utils/logger.js'; // use centralized logger

// Retention periods in days
const RETENTION = {
  gyro_history: 30,
  gps_history: 30,
  battery_history: 30,
  rfid_history: 60,
  alerts: 90,
  audit_logs: 365,
};

async function cleanupTable(table, days) {
  const sql = `
    DELETE FROM ${table}
    WHERE created_at < NOW() - INTERVAL '${days} days'
  `;
  try {
    const res = await query(sql);
    logDb(`Table ${table} - removed ${res.rowCount} rows older than ${days} days`);
  } catch (err) {
    logDb(`Error cleaning table ${table}: ${err.message}`, '\x1b[31m'); // red for errors
  }
}

async function runCleanup() {
  await cleanupTable('gyro_history', RETENTION.gyro_history);
  await cleanupTable('gps_history', RETENTION.gps_history);
  await cleanupTable('battery_history', RETENTION.battery_history);
  await cleanupTable('rfid_history', RETENTION.rfid_history);
  await cleanupTable('alerts', RETENTION.alerts);
  await cleanupTable('audit_logs', RETENTION.audit_logs);
}

// Run every day at midnight
setIntervalAsync(runCleanup, 24 * 60 * 60 * 1000);

export default runCleanup;
