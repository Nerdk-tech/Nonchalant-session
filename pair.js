const express = require('express');
const fs = require('fs');
const path = require('path');
const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');

const router = express.Router();

router.post('/', async (req, res) => {
  const phone = req.body.phone;
  if (!phone) return res.status(400).json({ error: 'Phone number required' });

  try {
    const sessionPath = path.join(__dirname, 'sessions', phone);
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      auth: state,
      version,
      printQRInTerminal: false,
      browser: ['Nonchalant', 'Chrome', '1.0']
    });

    let codeSent = false;

    sock.ev.on('connection.update', async (update) => {
      const { connection, pairingCode } = update;

      if (pairingCode && !codeSent && !res.headersSent) {
        codeSent = true;
        res.json({ pairingCode }); // ✅ PAIRING CODE SENT HERE
      }

      if (connection === 'open') {
        console.log('✅ Connected to WhatsApp');
        await saveCreds();
      }

      if (connection === 'close') {
        console.log('❌ Connection closed');
      }
    });

    sock.ev.on('creds.update', saveCreds);
  } catch (err) {
    console.error('❗ Error generating pairing code:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: '❗ Service Unavailable' });
    }
  }
});

module.exports = router;
