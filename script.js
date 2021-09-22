const display = document.querySelector("#display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");
const igual = document.querySelector("#igual");
const ce = document.querySelector("#limparDisplay");
const backspace = document.querySelector("#backspace");
const inverter = document.querySelector("#inverter");
const decimal = document.querySelector("#decimal");

let novoNumero = true;
let operador;
let numeroAnterior;

const atualizaDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto;
        novoNumero = false;
    } else {
        display.textContent += texto;
    }
}

const inserirNumero = (event) =>
    atualizaDisplay(event.target.textContent);

numeros.forEach(i => {
    i.addEventListener("click", inserirNumero);
});

const selecionaOperador = (event) => {
    novoNumero = true;
    operador = event.target.textContent;
    numeroAnterior = display.textContent.replace(",", ".");
};

operadores.forEach(operador => {
    operador.addEventListener("click", selecionaOperador);
});


const calcular = () => {
    if (operador !== undefined) {
        const numeroAtual = display.textContent.replace(",", ".");
        const result = eval(`${numeroAnterior} ${operador} ${numeroAtual}`);

        novoNumero = true;
        operador = undefined;
        atualizaDisplay(result);
    }
}

igual.addEventListener("click", calcular);

const limparCalculador = () => {
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
    atualizaDisplay("");
}

ce.addEventListener("click", limparCalculador);

const limpaUltimoNumeroDigitado = () => {
    display.textContent = display.textContent.slice(0, -1);
}

backspace.addEventListener("click", limpaUltimoNumeroDigitado);

const inverterSinal = () => {
    novoNumero = true;
    atualizaDisplay(display.textContent * -1);
}

inverter.addEventListener("click", inverterSinal);

const existeValor = () => {
    display.textContent.length > 0;
}

const existeDecimal = () => {
    display.textContent.indexOf(",") !== -1;
}

const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizaDisplay(",");
        } else {
            atualizaDisplay("0,");
        }
    }
}

decimal.addEventListener("click", inserirDecimal);