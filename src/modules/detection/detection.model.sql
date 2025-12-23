CREATE TABLE IF NOT EXISTS detections (
    id SERIAL PRIMARY KEY,
    device_id INT REFERENCES devices(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'movement', 'vibration', 'tremor'
    severity VARCHAR(20),
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
