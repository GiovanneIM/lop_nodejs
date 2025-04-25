const readline = require('readline-sync');

const quantidade = readline.question("Insira a quantidade de Nº primos desejados:")
let primo = true;

let numero = 2;
let primos = 0;
while (primos < quantidade){
    primo = true;

    if (numero != 2){
        for(let i = 2; i < Math.sqrt(numero) + 1; i++){
            if (numero % i === 0){
                primo = false;
                break;
            }   
        }
    }

    if (primo) { 
        console.log(numero); 
        primos++;
    }

    numero++;
}