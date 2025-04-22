document.getElementById('generate-totp').addEventListener('click', generateTOTP);
document.getElementById('verify-totp').addEventListener('click', verifyTOTP);

let secret = '';

function generateTOTP() {
    fetch('https://api.cryptototp.com/generate')
        .then(response => response.json())
        .then(data => {
            secret = data.secret;
            QRCode.toCanvas(document.getElementById('qrcode'), data.url, function(error) {
                if (error) console.error(error);
            });
            document.getElementById('totp-input-container').style.display = 'block';
            document.getElementById('result').textContent = '';
        });
}

function verifyTOTP() {
    const totpCode = document.getElementById('totp-code').value;
    
    if (!totpCode) {
        alert('Por favor, insira o código TOTP.');
        return;
    }

    fetch('https://api.cryptototp.com/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            secret: secret,
            token: totpCode
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('result').textContent = 'Código TOTP válido!';
            document.getElementById('result').style.color = 'green';
        } else {
            document.getElementById('result').textContent = 'Código TOTP inválido!';
            document.getElementById('result').style.color = 'red';
        }
    });
}
