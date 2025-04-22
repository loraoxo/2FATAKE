document.getElementById('generate-totp').addEventListener('click', generateTOTP);
document.getElementById('verify-totp').addEventListener('click', verifyTOTP);

let secret = '';

function generateTOTP() {
  fetch('https://api.cryptototp.com/generate')
    .then(response => response.json())
    .then(data => {
      secret = data.secret;
      const qrCanvas = document.getElementById('qrcode');
      QRCode.toCanvas(qrCanvas, data.url, error => {
        if (error) console.error(error);
        qrCanvas.hidden = false;
        document.getElementById('totp-input-container').hidden = false;
        document.getElementById('result').textContent = '';
      });
    });
}

function verifyTOTP() {
  const code = document.getElementById('totp-code').value.trim();
  if (!code) return alert('Digite o código TOTP.');

  fetch('https://api.cryptototp.com/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, token: code })
  })
    .then(res => res.json())
    .then(data => {
      const result = document.getElementById('result');
      if (data.success) {
        result.textContent = '✅ Código TOTP válido!';
        result.style.color = '#4ef18b';
      } else {
        result.textContent = '❌ Código inválido!';
        result.style.color = '#f14e4e';
      }
    });
}
