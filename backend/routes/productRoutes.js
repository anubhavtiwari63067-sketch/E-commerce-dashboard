const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json([{ id: 1, name: 'AI Product', price: 99.99 }]));
router.post('/', (req, res) => res.json({ message: 'Product added' }));

module.exports = router;
