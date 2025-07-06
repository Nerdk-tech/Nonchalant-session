// pair.js
const express = require('express');
const router = express.Router();

// Function to generate random pairing code like "ABCD-1234"
function generatePairCode() {
    const letters = Math.random().toString(36).substring(2, 6).toUpperCase();
    const numbers = Math.floor(1000 + Math.random() * 9000);
    return `${letters}-${numbers}`;
}

router.get('/', (req, res) => {
    const pairCode = generatePairCode();
    res.json({ success: true, code: pairCode });
});

module.exports = router;
