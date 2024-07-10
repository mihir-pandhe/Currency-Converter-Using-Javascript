async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value.toUpperCase();
    const toCurrency = document.getElementById('toCurrency').value.toUpperCase();

    if (isNaN(amount) || amount <= 0 || !fromCurrency || !toCurrency) {
        document.getElementById('result').textContent = "Please enter valid values.";
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
            document.getElementById('result').textContent = `Failed to fetch conversion rate.`;
        }
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}
