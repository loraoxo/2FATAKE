const { authenticator } = otplib;

document.getElementById('generate-totp').addEventListener('click', () => {
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri('usuario', '2FATAKE', secret);

  QRCode.toCanvas(document.getElementById('qrcode'), otpauth, function (error) {
    if (error) console.error(error);
    document.getElementById('qrcode').hidden = false;
    document.getElementById('totp-input-container').hidden = false;
    document.getElementById('result').textContent = '';
  });

  // Guardar o segredo numa variável global para verificar depois
  window.generatedSecret = secret;
});

document.getElementById('verify-totp').addEventListener('click', () => {
  const userCode = document.getElementById('totp-code').value.trim();
  const isValid = authenticator.check(userCode, window.generatedSecret);

  const result = document.getElementById('result');
  if (isValid) {
    result.textContent = '✅ Código TOTP válido!';
    result.style.color = '#4ef18b';
  } else {
    result.textContent = '❌ Código inválido!';
    result.style.color = '#f14e4e';
  }
});
