// Define default colors
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

// Map module names to default colors
const MODULE_COLORS = {
  PUBNUB: COLORS.magenta,
  DB: COLORS.cyan,
  AUTH: COLORS.green,
  SERVER: COLORS.yellow,
  DEFAULT: COLORS.gray,
};

// Fixed width for module names for consistent spacing
const MODULE_NAME_WIDTH = 7;

/**
 * Generic logger with consistent spacing
 * @param {string} module - Module name (e.g., PUBNUB, DB)
 * @param {string} message - Message to log
 * @param {string} [colorCode] - Optional custom color
 */
export function log(module, message, colorCode) {
  const color = colorCode || MODULE_COLORS[module] || MODULE_COLORS.DEFAULT;
  const paddedModule = module.padEnd(MODULE_NAME_WIDTH, ' ');
  console.log(`[${color}${paddedModule}${COLORS.reset}] ${message}`);
}

// Module-specific shortcuts
export function logDb(message) {
  log('DB', message);
}

export function logPubNub(message) {
  log('PUBNUB', message);
}

export function logAuth(message) {
  log('AUTH', message);
}

export function logServer(message) {
  log('SERVER', message);
}

// Optionally export COLORS if needed externally
export { COLORS };

export default log;
