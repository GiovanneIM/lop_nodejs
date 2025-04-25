const readline = require('readline-sync');

const usuario = "Senai";
const senha = "Senai123"
let permissao = false;
let tentativas = 0;

let usuarioEntrada;
let senhaEntrada;

while(tentativas < 3){
    console.log(`\n----- ${tentativas + 1}ª tentativa de login -----`)

    console.log("\nInsira o usuário:");
    usuarioEntrada = readline.question(">> ");

    console.log("\nInsira a senha:");
    senhaEntrada = readline.question(">> ");

    if (usuarioEntrada == usuario && senhaEntrada == senha){
        console.log("\n----- Bem-vindo! -----");
        break;
    }

    console.log("\nUsuário e/ou senhas incorreto")
    tentativas++;
}