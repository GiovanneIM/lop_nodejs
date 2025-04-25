const readline = require('readline-sync');

const base = readline.question("Insira a base: ");
const expoente = readline.question("Insira o expoente: ");
let potencia = 1;

for (let i = 1; i <= expoente; i++){
    potencia *= base;
}

console.log(`${base} ^ ${expoente} =`, potencia);