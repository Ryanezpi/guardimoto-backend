CREATE TABLE IF NOT EXISTS rfid_history (
    id SERIAL PRIMARY KEY,
    device_id INT REFERENCES devices(id) ON DELETE CASCADE,
    tag_id VARCHAR(100),
    scanned_at TIMESTAMP DEFAULT NOW()
);
