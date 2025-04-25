const readline = require('readline-sync');

let elemento1 = 1;
let elemento2 = 1;
let numAureo;
const quantidade = readline.question("Insira a quantidade de elementos desejada: ");

for (let i = 0; i < quantidade; i++){

    if (i > 2) { 
        let auxiliar = elemento1 + elemento2;
        elemento1 = elemento2;
        elemento2 = auxiliar;
    }

    if (i > 1){
        numAureo = elemento2/elemento1;
        saida = `| ${elemento1} | ${elemento2} |Nº Áureo = ${numAureo} |`;
        console.log(saida)
    }
}