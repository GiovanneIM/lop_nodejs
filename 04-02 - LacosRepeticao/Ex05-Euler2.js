const readline = require('readline-sync');

let base;
let euler;

console.log("Insira um valor inicial de x para o qual calcular o Nº de Euler:");
let numero = readline.question(">> ");

console.log("Insira o Nº de calculos desejados:");
const repeticoes = readline.question(">> ");

for (let i = 0; i <= repeticoes; i ++){
    base = 1 + (1 / numero);
    euler = 1;

    for (let j = 1; j <= numero; j++){
        euler *= base;
    }

    console.log('\nx =', numero);
    console.log('Nº de Euler =', euler);
    numero++;
}