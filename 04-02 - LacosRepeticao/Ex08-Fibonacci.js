const readline = require('readline-sync');

let elemento1 = 1;
let elemento2 = 1;

const quantidade = readline.question("Insira a quantidade de elementos desejada: ");

for (let i = 0; i < quantidade; i++){
    if (i === 0 || i === 1) { console.log(1) }
    else { 
        let auxiliar = elemento1 + elemento2;
        elemento1 = elemento2;
        elemento2 = auxiliar;
        
        console.log(elemento2) 
    }
}