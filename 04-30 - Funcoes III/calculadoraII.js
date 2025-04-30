const readline = require('readline-sync');

function input () {
    const entrada = readline.question("Insira sua conta: ");
    return entrada.split(" ");
}

function somar (a,b) { return a + b; }
function subtrair (a,b) { return a - b; }
function multiplicar (a,b) { return a * b; }
function dividir (a,b) { 
    if (b === 0){ console.log("\nErro: Não é possível dividir por 0."); return null; }
    return a / b; 
}

function continuar () {
    console.log("Deseja realizar um novo calculo? ");
    console.log("[1] Sim.   [2] Não. \n");

    console.log();
    const sair = readline.question("Escolha: ");

    return (sair === "2");
}

while (true) {
    console.log();
    const conta = input();

    const num1 = Number(conta[0]);
    const operator = conta[1];
    const num2 = Number(conta[2]);

    let resultado;

    if (Number.isNaN(num1) || Number.isNaN(num2)) {
        console.log("Erro: A entrada deve ser uma operação entre dois números.");
    }
    else {
        if      (operator === '+') { resultado = somar(num1, num2); }
        else if (operator === '-') { resultado = subtrair(num1, num2); }
        else if (operator === '*') { resultado = multiplicar(num1, num2); }
        else if (operator === '/') { resultado = dividir(num1, num2); }
        else                       { console.log('-- Operador desconhecido --'); }
    }

    if (resultado !== null && resultado !== undefined) {
        console.log(`${num1} ${operator} ${num2} =`, resultado);
    }

    console.log();
    const sair = continuar();
    if (sair) { break; }
}