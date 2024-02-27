const boton = document.getElementById('boton');
boton.addEventListener('click', buscarPrecio);

function buscarPrecio() {
    const cryptoName = document.getElementById('cryptoName').value;
    
    console.log("SI");
    console.log(cryptoName);

    fetch('https://api.coinlore.net/api/tickers/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const cryptoData = data.data.find(crypto => crypto.name.toLowerCase() === cryptoName.toLowerCase());
            if (cryptoData) {
                document.getElementById('resultado').innerHTML = `La criptomoneda ${cryptoName.toUpperCase()} vale ${cryptoData.price_usd} USD`;
            } else {
                document.getElementById('resultado').innerHTML = `No se encontró la criptomoneda ${cryptoName.toUpperCase()}`;
            }
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud fetch:', error);
        });
}



