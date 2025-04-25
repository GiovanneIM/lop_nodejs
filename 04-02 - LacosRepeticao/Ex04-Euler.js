const readline = require('readline-sync');

console.log("Insira um valor de x para o qual calcular o Nº de Euler:");
const numero = readline.question(">> ");

const base = 1 + (1 / numero);
let euler = 1;

for (let i = 1; i <= numero; i++){
    euler *= base;
}

console.log(`Nº de Euler =`, euler);