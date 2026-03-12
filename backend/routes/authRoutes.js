const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => res.json({ token: 'dummy_token_123' }));
router.post('/register', (req, res) => res.json({ message: 'Registered successfully' }));

module.exports = router;
