const readline = require('readline-sync');

let continuar = true;
let numero;
let entradaUsuario;

while (continuar){
    console.log("\nInsira um número:")
    numero = readline.question(">> ");

    if (numero % 2 === 0){
        console.log("O número é par.");
    }
    else { console.log("O número é ímpar."); }

    console.log("\nDeseja continuar? \n[1] Sim \n[2] Nao");
    entradaUsuario = readline.question(">> ")

    if (entradaUsuario == "2"){ continuar = false; }
}