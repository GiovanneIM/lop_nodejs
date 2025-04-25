const readline = require('readline-sync');

// Entrada das notas

const notas = []

let i = 0;
while (i < 5) {
    notas.push( Number(readline.question(`Insira a nota ${i++ + 1}: `)));
}

console.log("\n\n")

// Processamento das notas

notas.sort((a, b) => a - b);

let somaNotas = 0;
for (let index in notas){
    somaNotas += notas[index];
}

let media = somaNotas / 5;

// Exibição das informações desejadas

console.log("Notas:", notas);
console.log(`Maior nota: ${notas[4]}`)
console.log(`Menor nota: ${notas[0]}`)
console.log(`Média das notas: ${media}`)

console.log("\n\n")

console.log("Situação:")
if(media >= 70) { console.log("APROVADO"); }
else { console.log("REPROVADO"); }