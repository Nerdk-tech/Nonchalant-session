<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
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
