const readline = require('readline-sync');

const num = Number(readline.question("Insira um número: "));

if (num % 2 == 0)
{
    console.log(`${num} é par.`);
}
else
{
    console.log(`${num} é ímpar.`);
}
