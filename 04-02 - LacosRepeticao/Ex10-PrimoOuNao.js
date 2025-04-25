const readline = require('readline-sync');

let primo = true;
const numero = readline.question("Insira um Nº para saber se ele é primo: ")


for(let i = 2; i < Math.sqrt(numero) + 1; i++){
    if (numero % i === 0){primo = false}
}

if (primo) { console.log(`${numero} é um Nº primo`) }
else { console.log(`${numero} não é um Nº primo`) }