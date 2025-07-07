const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
require('events').EventEmitter.defaultMaxListeners = 500;

// Setup paths
const __path = process.cwd();

// Routers (both exporting express.Router instances)
const server = require('./qr');
const code = require('./pair');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use('/server', server); // GET /server for QR
app.use('/code', code);     // POST /code for pairing

// Pages
app.use('/pair', (req, res) => {
  res.sendFile(path.join(__path, 'pair.html'));
});
app.use('/qr', (req, res) => {
  res.sendFile(path.join(__path, 'qr.html'));
});
app.use('/', (req, res) => {
  res.sendFile(path.join(__path, 'main.html'));
});

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`
✅ Server running on http://localhost:${PORT}
⭐ Don't forget to give a star on GitHub: github.com/Nerdk-tech/NONCHALANT-MD
  `);
});

module.exports = app;
