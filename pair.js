const express = require('express');
const path = require('path');
const fs = require('fs');
const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/pair', async (req, res) => {
  const phone = req.body.phone;
  if (!phone) return res.status(400).send({ error: 'Phone number is required' });

  const sessionPath = path.join(__dirname, 'sessions', phone);
  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    auth: state,
    version,
    printQRInTerminal: false,
    browser: ['Nonchalant', 'Chrome', '1.0'],
  });

  sock.ev.on('connection.update', async ({ pairingCode }) => {
    if (pairingCode) {
      res.json({ pairingCode });
    }
  });

  sock.ev.on('creds.update', saveCreds);
});

app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));
