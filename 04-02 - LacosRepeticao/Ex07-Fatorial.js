const readline = require('readline-sync');

let numero;
let fatorial = 1;

console.log("Insira um Nº para calcular seu fatorial:");
numero = readline.question(">> ");

for (let i = numero; i > 0; i--){
    fatorial *= i;
}

console.log(`${numero}! =`, fatorial);