const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
require('events').EventEmitter.defaultMaxListeners = 500;

const PORT = process.env.PORT || 8000;

// ✅ FIX: only require './pair' after it's exporting a function, not an object
const code = require('./pair'); // pair.js must export a router function!

// ✅ Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Attach code route (make sure pair.js uses module.exports = router)
app.use('/code', code);

// ✅ Serve the frontend page (pair.html)
app.use('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pair.html'));
});

app.listen(PORT, () => {
  console.log(`
✅ Deployment Successful!

🔌 Session-Server Running on http://localhost:` + PORT)
});

module.exports = app;
