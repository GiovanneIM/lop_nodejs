const readline = require('readline-sync');

const frase = "Exemplo de laço for...";
const ch = "█";

let saida = "";

for (let i = 0; i < frase.length + 2; i++){ saida += ch; }
console.log(saida);
saida = "";

console.log(ch + frase + ch);

for (let i = 0; i < frase.length + 2; i++){ saida += ch; }
console.log(saida);
saida = "";