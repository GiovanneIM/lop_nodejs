const readline = require('readline-sync');

function adicao (a,b) {
    return a + b;
}

function subtracao (a,b) {
    return a - b;
}

function multiplicacao (a,b) {
    return a * b;
}

function divisao (a,b) {
    return a / b;
}

while (true) {
    console.log()
    console.log("Qual operação deseja realizar");
    console.log("1 - Adição");
    console.log("2 - Subtração");
    console.log("3 - Multiplicação");
    console.log("4 - Divisão");

    console.log()
    const opcao = readline.question("Escolha: ");

    console.log()
    console.log("Insira os números para o calculo:");
    const a = parseFloat(readline.question("Numero 1: "));
    const b = parseFloat(readline.question("Numero 2: "));

    console.log()
    if (opcao == '1') { console.log(`${a} + ${b} =`, adicao(a,b)); }
    else if (opcao == '2') { console.log(`${a} - ${b} =`, subtracao(a,b)); }
    else if (opcao == '3') { console.log(`${a} * ${b} =`, multiplicacao(a,b)); }
    else { console.log(`${a} / ${b} =`, divisao(a,b)); }

    console.log()
    console.log("Deseja realizar um novo calculo? ");
    console.log("[1] Sim.   [2] Não. \n");

    console.log()
    const sair = readline.question("Escolha: ");

    if (sair === "2") { break; }
}