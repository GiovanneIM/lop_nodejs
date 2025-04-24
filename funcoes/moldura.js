// Código que cria uma moldura ao redor de uma frase

// Importação de bibliotecas
const readline = require('readline-sync');


// CÓDIGO PRINCIPAL
const frase = readline.question('\nDigite uma frase: ');
const ch = '█';

barra(frase.length)
console.log(`${ch} ${frase} ${ch}`)
barra(frase.length)


// FUNÇÕES
function barra(tamanho) {
    /* Desenha uma barra horizontal */

    for (let i = 0; i < tamanho + 4; i++) {
        process.stdout.write(ch)
    }
    console.log()
}