const readline = require('readline-sync');

const peso = Number(readline.question("Insira seu peso (kg): "));
const altura = Number(readline.question("Insira sua altura (m): "));

const imc = peso / (altura ** 2);

console.log(`Seu IMC é ${imc} kg/m²`);