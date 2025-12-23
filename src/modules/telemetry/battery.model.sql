CREATE TABLE IF NOT EXISTS battery_history (
    id SERIAL PRIMARY KEY,
    device_id INT REFERENCES devices(id) ON DELETE CASCADE,
    level INT,
    charging BOOLEAN,
    timestamp TIMESTAMP DEFAULT NOW()
);
