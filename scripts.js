document.addEventListener('DOMContentLoaded', () => {
    populateCurrencyOptions();
    document.getElementById('convertBtn').addEventListener('click', convertCurrency);
});

async function populateCurrencyOptions() {
    const url = 'https://api.exchangerate-api.com/v4/latest/USD';
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const currencyOptions = Object.keys(data.rates);
            const fromCurrencySelect = document.getElementById('fromCurrency');
            const toCurrencySelect = document.getElementById('toCurrency');

            currencyOptions.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = currency;
                fromCurrencySelect.appendChild(option);
                toCurrencySelect.appendChild(option.cloneNode(true));
            });
        } else {
            document.getElementById('result').textContent = 'Failed to fetch currency options.';
        }
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (isNaN(amount) || amount <= 0 || !fromCurrency || !toCurrency) {
        document.getElementById('result').textContent = 'Please enter valid values.';
        return;
    }

    const apiKey = '74cb2f8726a2b15f71f0e7b7';
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const rate = data.rates[toCurrency];
            if (rate) {
                const convertedAmount = (amount * rate).toFixed(2);
                document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                document.getElementById('result').textContent = `Conversion rate for ${toCurrency} not found.`;
            }
        } else {
            document.getElementById('result').textContent = 'Failed to fetch conversion rate.';
        }
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}
