class CurrencyConverter {
    constructor(currencySelector,input,result) {
        this.select = document.querySelectorAll(currencySelector);
        this.input = document.getElementById(input);
        this.result = document.getElementById(result);
    }

    async currencyData() {
        const response = await fetch("https://api.frankfurter.app/currencies");
        const data = await response.json();
        this.currencyElement(data);
    }

    currencyElement(data) {
        const options = Object.entries(data)
        .map(entry => `<option value = "${entry[0]}">${entry[0]}</option>"`)
        .join('');
        this.select[0].innerHTML = options;
        this.select[1].innerHTML = options;
    }

    convert(currencyFirst,currencySecond,value) {
        const host = "api.frankfurter.app";
        fetch(`https://${host}/latest?amount=${value}&from=${currencyFirst}&to=${currencySecond}`)
        .then((response) => response.json())
        .then((data) => {
            this.result.value = data.rates[currencySecond];
        });
    }
}

const currencyConverter = new CurrencyConverter('.currency','input' ,'result');
currencyConverter.currencyData();

document.getElementById("sendData").addEventListener('click', () => {
    const currencyFirst = currencyConverter.select[0].value;
    const currencySecond = currencyConverter.select[1].value;
    const value = currencyConverter.input.value;
    if (currencyFirst !== currencySecond) {
        currencyConverter.convert(currencyFirst, currencySecond, value);
    } else {
        alert("Error : Currencies are the same.");
    }
    
    });
    