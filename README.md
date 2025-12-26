# Guard Imoto Backend

A Node.js backend application for the Guard Imoto security system, providing device management, telemetry, alerts, and user authentication for IoT security devices.

## Overview

This backend serves as the central API for managing IoT security devices, handling real-time telemetry data, user authentication, device pairing, NFC interactions, and security alerts. It integrates with Firebase for notifications, PubNub for real-time messaging, and PostgreSQL for data storage.

## Features

- **User Authentication**: Registration and login for users.
- **Device Management**: Pairing, unpairing, and configuration of security devices.
- **Telemetry**: Real-time data collection from devices (GPS, gyroscope, battery, RFID).
- **Alerts**: Security alert management and notifications.
- **NFC Integration**: Handling NFC tags and interactions.
- **Audit Logging**: Tracking user and system activities.
- **Real-time Communication**: Using PubNub for device-to-server messaging.
- **Push Notifications**: Firebase Cloud Messaging (FCM) for alerts.
- **Background Jobs**: Automated cleanup and detection tasks.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ryanezpi/guardimoto-backend.git
   cd guard-imoto-backend-new
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file based on `src/config/env.js` with your database, Firebase, PubNub, and other configurations.

4. Initialize the database:

   ```bash
   ./generate_db.sh
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

## Usage

- **Development**: `npm run dev` (uses nodemon for auto-restart)
- **Production**: `npm start`
- **Device Listener**: `npm run listen` (runs the PubNub device listener script)

The server runs on port 3000 by default (configurable via `PORT` env variable).

## Project Structure

```js
src/
├── server.js                 # Main server entry point
├── config/                   # Configuration files
│   ├── db.js                 # Database connection
│   ├── env.js                # Environment variables
│   ├── fcm.js                # Firebase Cloud Messaging
│   ├── firebase-admin.js     # Firebase Admin SDK
│   └── pubnub.js             # PubNub configuration
├── jobs/                     # Background jobs
│   ├── cleanup.job.js        # Database cleanup tasks
│   └── detection.job.js      # Security detection logic
├── middlewares/              # Express middlewares
│   ├── auth.middleware.js    # User authentication
│   ├── device-auth.middleware.js # Device authentication
│   ├── error.middleware.js   # Error handling
│   └── rate-limit.middleware.js # Rate limiting
├── modules/                  # Feature modules
│   ├── alerts/               # Alert management (creation, retrieval)
│   ├── audit/                # Audit logging and tracking
│   ├── auth/                 # User authentication (register, login)
│   ├── detection/            # Security detection engine and rules
│   ├── devices/              # Device management (pairing, config, telemetry)
│   ├── nfc/                  # NFC tag handling
│   ├── notifications/        # FCM service and notification templates
│   ├── telemetry/            # Telemetry data processing
│   ├── user-fcm/             # User FCM token management
│   └── users/                # User profile management
└── utils/                    # Utility functions
    ├── constants.js          # Application constants
    ├── hmac.js               # HMAC utilities
    ├── logger.js             # Logging utilities
    ├── validators.js         # Input validation
    └── others...             # Additional utilities
scripts/
└── pubnub-device-listener.js # Script for listening to PubNub messages from devices
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user

### Users

- `GET /users` - List users
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user

### Devices

- `GET /devices` - List user's devices
- `POST /devices` - Create a new device
- `GET /devices/:id` - Get device details
- `PATCH /devices/:id/config` - Update device config
- `POST /devices/pair` - Pair a device
- `POST /devices/unpair` - Unpair a device
- `GET /devices/:id/nfc` - Get NFC tags for device
- `GET /devices/:id/gps` - Get GPS telemetry
- `GET /devices/:id/gyro` - Get gyroscope telemetry
- `GET /devices/:id/battery` - Get battery telemetry
- `GET /devices/:id/rfid` - Get RFID telemetry

### Alerts

- `GET /alerts` - List alerts
- `POST /alerts` - Create an alert

### Telemetry

- `POST /telemetry` - Submit telemetry data (device auth required)

### NFC

- `GET /nfc` - NFC operations

### Audit

- `GET /audit` - Audit logs

## Dependencies

- **Express**: Web framework
- **PostgreSQL (pg)**: Database
- **Firebase Admin**: Firebase services
- **PubNub**: Real-time messaging
- **bcrypt**: Password hashing
- **cors**: Cross-origin resource sharing
- **helmet**: Security middleware
- **morgan**: HTTP request logger
- **express-rate-limit**: Rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (if any)
5. Submit a pull request

## License

ISC
