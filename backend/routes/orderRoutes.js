const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json([{ id: 101, status: 'Shipped', amount: 150 }]));

module.exports = router;
