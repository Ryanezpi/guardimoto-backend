import express from 'express';
const router = express.Router();

// optional fallback endpoint
router.post('/ingest', (req, res) => res.json({ ok: true }));

export default router;
