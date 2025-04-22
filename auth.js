const { authenticator } = otplib;

document.getElementById('generate').addEventListener('click', () => {
  const secret = document.getElementById('secret').value.trim();

  if (!secret) {
    alert('Insira uma chave secreta TOTP.');
    return;
  }

  try {
    const token = authenticator.generate(secret);
    document.getElementById('code').textContent = `🔢 ${token}`;
  } catch (err) {
    alert('Erro ao gerar código. Verifique se a chave está no formato correto (base32).');
    console.error(err);
  }
});
