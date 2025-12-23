#!/bin/bash

# Create main directory structure
mkdir -p src/config \
         src/middlewares \
         src/modules/auth \
         src/modules/users \
         src/modules/devices \
         src/modules/nfc \
         src/modules/telemetry \
         src/modules/detection \
         src/modules/alerts \
         src/modules/audit \
         src/modules/notifications \
         src/utils \
         src/jobs

# 1. Root Files
touch src/app.js src/server.js

# 2. Config Files (SQL focus)
touch src/config/env.js \
      src/config/db.js \
      src/config/firebase-admin.js \
      src/config/pubnub.js \
      src/config/fcm.js

# 3. Middlewares
touch src/middlewares/auth.middleware.js \
      src/middlewares/device-auth.middleware.js \
      src/middlewares/error.middleware.js \
      src/middlewares/rate-limit.middleware.js

# 4. Modules - Auth
touch src/modules/auth/auth.controller.js \
      src/modules/auth/auth.service.js \
      src/modules/auth/auth.routes.js

# 5. Modules - Users
touch src/modules/users/user.model.sql \
      src/modules/users/user.controller.js \
      src/modules/users/user.service.js \
      src/modules/users/user.routes.js

# 6. Modules - Devices
touch src/modules/devices/device.model.sql \
      src/modules/devices/device.controller.js \
      src/modules/devices/device.service.js \
      src/modules/devices/pairing.service.js \
      src/modules/devices/device.routes.js

# 7. Modules - NFC
touch src/modules/nfc/nfc.model.sql \
      src/modules/nfc/nfc.service.js

# 8. Modules - Telemetry
touch src/modules/telemetry/gps.model.sql \
      src/modules/telemetry/gyro.model.sql \
      src/modules/telemetry/battery.model.sql \
      src/modules/telemetry/rfid.model.sql \
      src/modules/telemetry/telemetry.ingest.js \
      src/modules/telemetry/telemetry.routes.js

# 9. Modules - Detection
touch src/modules/detection/detection.model.sql \
      src/modules/detection/detection.engine.js \
      src/modules/detection/detection.rules.js \
      src/modules/detection/detection.service.js

# 10. Modules - Alerts
touch src/modules/alerts/alert.model.sql \
      src/modules/alerts/alert.controller.js \
      src/modules/alerts/alert.service.js \
      src/modules/alerts/alert.routes.js

# 11. Modules - Audit
touch src/modules/audit/audit.model.sql \
      src/modules/audit/audit.service.js \
      src/modules/audit/audit.utils.js

# 12. Modules - Notifications
touch src/modules/notifications/fcm.service.js \
      src/modules/notifications/notification.templates.js

# 13. Utils
touch src/utils/logger.js \
      src/utils/validators.js \
      src/utils/async-handler.js \
      src/utils/constants.js

# 14. Jobs
touch src/jobs/cleanup.job.js \
      src/jobs/detection.job.js

echo "🚀 SQL-based project structure created successfully!"