const readline = require('readline-sync');

let primo = true;
const numero = readline.question("Insira um Nº para saber se ele é primo: ");


for(let i = 2; i < Math.sqrt(numero) + 1; i++){
    if (numero % i === 0){
        primo = false;
        console.log(`${numero} é divisível por ${i} e por ${numero / i}`);
    }
}

if (primo) { console.log(`\n${numero} é um Nº primo`); }
else { console.log(`\n${numero} não é um Nº primo`); }