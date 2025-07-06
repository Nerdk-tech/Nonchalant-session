<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8">
  const express = require('express');
const app = express();
__path = process.cwd()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
let server = require('./qr'),
    code = require('./pair');
require('events').EventEmitter.defaultMaxListeners = 500;
app.use('/server', server);
app.use('/code', code);
app.use('/pair',async (req, res, next) => {
res.sendFile(__path + '/pair.html')
})
app.use('/qr',async (req, res, next) => {
res.sendFile(__path + '/qr.html')
})
app.use('/',async (req, res, next) => {
res.sendFile(__path + '/main.html')
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`
Don't Forgot To Give Star MALVIN-XD 

 Server running on http://localhost:` + PORT)
})

module.exports = app
 { cyberid } = require('./id'); 
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { Storage } = require("megajs");

const {
    default: Cyber_Dev,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

// Function to generate a random Mega ID
function randomMegaId(length = 6, numberLength = 4) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const number = Math.floor(Math.random() * Math.pow(10, numberLength));
    return `${result}${number}`;
}

// Function to upload credentials to Mega
async function uploadCredsToMega(credsPath) {
    try {
        const storage = await new Storage({
            email: 'nexusxd.bot@gmail.com', // Your Mega A/c Email Here
            password: 'cyberlord127' // Your Mega A/c Password Here
        }).ready;
        console.log('Mega storage initialized.');

        if (!fs.existsSync(credsPath)) {
            throw new Error(`File not found: ${credsPath}`);
        }

        const fileSize = fs.statSync(credsPath).size;
        const uploadResult = await storage.upload({
            name: `${randomMegaId()}.json`,
            size: fileSize
        }, fs.createReadStream(credsPath)).complete;

        console.log('Session successfully uploaded to Mega.');
        const fileNode = storage.files[uploadResult.nodeId];
        const megaUrl = await fileNode.link();
        console.log(`Session Url: ${megaUrl}`);
        return megaUrl;
    } catch (error) {
        console.error('Error uploading to Mega:', error);
        throw error;
    }
}

// Function to remove a file
function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

// Router to handle pairing code generation
router.get('/', async (req, res) => {
    const id = malvinid(); 
    let num = req.query.number;

    async function CYBER_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);

        try {
            let Cyber = Cyber_Dev({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari")
            });

            if (!Cyber.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Cyber.requestPairingCode(num);
                console.log(`Your Code: ${code}`);

                if (!res.headersSent) {
                    res.send({ code });
                }
            }

            Cyber.ev.on('creds.update', saveCreds);
            Cyber.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                    await delay(5000);
                    const filePath = __dirname + `/temp/${id}/creds.json`;

                    if (!fs.existsSync(filePath)) {
                        console.error("File not found:", filePath);
                        return;
                    }

                    const megaUrl = await uploadCredsToMega(filePath);
                    const sid = megaUrl.includes("https://mega.nz/file/")
                        ? 'LITE-CLD~' + megaUrl.split("https://mega.nz/file/")[1]
                        : 'Error: Invalid URL';

                    console.log(`Session ID: ${sid}`);

                    const session = await Malvin.sendMessage(Malvin.user.id, { text: sid });

                    const CYBER_TEXT = `
🎉 *Welcome to NONCHALANT-MD!* 🚀  

🔒 *Your Session ID* is ready!  ⚠️ _Keep it private and secure — dont share it with anyone._ 

🔑 *Copy & Paste the SESSION_ID Above*🛠️ Add it to your environment variable: *SESSION_ID*.  

💡 *Whats Next?* 
1️⃣ Explore all the cool features of LITE-CLD.
2️⃣ Stay updated with our latest releases and support.
3️⃣ Enjoy seamless WhatsApp automation! 🤖  

🔗 *Join Our Support Channel:* 👉 [Click Here to Join](https://whatsapp.com/channel/0029Vb4pakq47Xe8cU8o5e2q) 

⭐ *Show Some Love!* Give us a ⭐ on GitHub and support the developer of: 👉 [Cyber Lord GitHub Repo](https://github.com/Nerdk-tech/)  

🚀 _Thanks for choosing NONCHALANT-MD — Let the automation begin!_ ✨`;

                    await Cyber.sendMessage(Cyber.user.id, { text: CYBER_TEXT }, { quoted: session });

                    await delay(100);
                    await Cyber.ws.close();
                    return removeFile('./temp/' + id);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    await delay(10000);
                    CYBER_PAIR_CODE();
                }
            });
        } catch (err) {
            console.error("Service Has Been Restarted:", err);
            removeFile('./temp/' + id);

            if (!res.headersSent) {
                res.send({ code: "Service is Currently Unavailable" });
            }
        }
    }

    await CYBER_PAIR_CODE();
});

module.exports = router;
meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="og:title" content="PAIR CODE">
  <meta property="og:description" content="Pair-code linker for WhatsApp bot.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://github.com/Nerdk-tech/NONCHALANT-MD">
  <meta property="og:image" content="https://files.catbox.moe/y65ffs.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="PAIR CODE">
  <meta name="twitter:description" content="Pair-code linker for WhatsApp bot.">
  <meta name="twitter:image" content="https://files.catbox.moe/y65ffs.jpg">
  <link rel="shortcut icon" href="" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Graduate&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <style>
    body {
      background: linear-gradient(to bottom, #a8dff0, #001f33);
      height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      color: white;
      font-family: 'Graduate', sans-serif;
    }
    .snowflake {
      position: absolute;
      top: -10px;
      width: 10px;
      height: 10px;
      background: white;
      border-radius: 50%;
      opacity: 0.8;
      animation: snow linear infinite;
    }
    @keyframes snow {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(100vh); opacity: 0; }
    }
    .container {
      text-align: center;
      background: rgba(0, 0, 0, 0.7);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      max-width: 400px;
      width: 100%;
    }
    h3 {
      margin-top: 0;
      opacity: 0;
      transform: translateY(-100px);
      animation: slideIn 2s ease-out forwards, fadeIn 2s ease-out forwards;
    }
    @keyframes slideIn { to { transform: translateY(0); } }
    @keyframes fadeIn { to { opacity: 1; } }
    .input-container {
      display: flex;
      background: #ffffff;
      border-radius: 1rem;
      padding: 0.3rem;
      gap: 0.3rem;
      max-width: 300px;
      width: 100%;
      margin: 0 auto;
    }
    .input-container input {
      border-radius: 0.8rem 0 0 0.8rem;
      background: #000000;
      width: 89%;
      flex-basis: 75%;
      padding: 1rem;
      border: none;
      border-left: 2px solid #075e54;
      color: #ecf0f1;
      transition: all 0.2s ease-in-out;
    }
    .input-container input:focus {
      border-left: 2px solid #075e54;
      outline: none;
      box-shadow: inset 13px 13px 10px #075e54, inset -13px -13px 10px #2c3e50;
    }
    .input-container button {
      flex-basis: 25%;
      padding: 1rem;
      background: #25d366;
      font-weight: 900;
      letter-spacing: 0.3rem;
      text-transform: uppercase;
      color: white;
      border: none;
      width: 100%;
      border-radius: 0 1rem 1rem 0;
      transition: all 0.2s ease-in-out;
    }
    .input-container button:hover {
      background: #2980b9;
    }
    #loading-spinner {
      display: none;
      color: white;
      margin-top: 10px;
    }
    .fa-spinner {
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      padding: 10px 0;
      text-align: center;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <!-- Snowflakes -->
  <div class="snowflake"></div>
  <div class="snowflake"></div>
  <div class="snowflake"></div>
  <div class="snowflake"></div>
  <div class="snowflake"></div>
  <div class="snowflake"></div>
  <div class="snowflake"></div>
  <div class="snowflake"></div>
  <div class="snowflake"></div>
  <div class="snowflake"></div>  <div class="container">
    <h3>❄️ Nonchalant-session 🪀</h3>
    <h3>𝚡𝚶𝛅𝚳𝛉𝚸 Dami🍗</h3>
    <p>🔢Enter Your WhatsApp Number with Country Code.</p>
    <div class="input-container">
      <input placeholder="234xxxxxx" type="number" id="number" name="">
      <button id="submit">Code</button>
    </div>
    <div id="loading-spinner">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <main id="pair"></main>
  </div>  <footer>
    DAMINI &copy; <span id="currentYear"></span>
  </footer>  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js"></script>  <script>
    const pairBox = document.getElementById("pair");
    const submitBtn = document.getElementById("submit");
    const numberInput = document.getElementById("number");

    async function Copy() {
      const text = document.getElementById("copy").innerText;
      const obj = document.getElementById("copy");
      await navigator.clipboard.writeText(text.replace('CODE: ', ''));
      obj.innerText = "✔️ COPIED";
      obj.style.color = 'red';
      obj.style.fontWeight = 'bold';
      setTimeout(() => {
        obj.innerText = text;
        obj.style.color = 'white';
      }, 500);
    }

    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const rawNumber = numberInput.value.replace(/[^0-9]/g, "");

      if (!rawNumber) {
        pairBox.innerHTML = '<span style="color:red;font-weight:bold">❗ Enter your WhatsApp number with country code.</span><br><br>';
        return;
      }
      if (rawNumber.length < 11) {
        pairBox.innerHTML = '<span style="color:red;font-weight:bold">❗ Invalid number format. Please try again.</span><br><br>';
        return;
      }

      numberInput.type = "text";
      numberInput.value = "+" + rawNumber;
      numberInput.style.color = "white";
      numberInput.style.fontSize = "20px";

      document.getElementById("loading-spinner").style.display = "block";
      pairBox.innerHTML = '';

      try {
        const res = await axios(`/code?number=${rawNumber}`);
        const code = res.data.code || "❗ Service Unavailable";
        pairBox.innerHTML = `<font id="copy" onclick="Copy()" style="color:red;font-weight:bold" size="5">CODE: <span style="color:white;font-weight:bold">${code}</span></font><br><br><br>`;
      } catch (err) {
        pairBox.innerHTML = '<span style="color:red;font-weight:bold">❗ Error fetching code. Try again.</span>';
      }

      document.getElementById("loading-spinner").style.display = "none";
    });

    document.getElementById("currentYear").textContent = new Date().getFullYear();
  </script></body>
</html>
