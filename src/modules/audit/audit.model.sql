CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    actor_type VARCHAR(20) NOT NULL, -- 'user', 'system', 'device'
    actor_id INT,
    action TEXT NOT NULL,
    target_type VARCHAR(20), -- 'device', 'user', 'nfc'
    target_id INT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
