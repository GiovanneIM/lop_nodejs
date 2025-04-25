const nomes = ["Maria", "Joaquim", "Juca"];
const notas = [10, 5, 7];

console.log(nomes, "→ Declarado");

// Adiciona elemento ao Array, os elementos são adicionados ao fim do Array
nomes.push("Joca", "Mariana");
console.log(nomes, "→ Push");


// Organiza os elementos em um Array
nomes.sort();
console.log(nomes, "→ Sort");

// Exclui o último elemento do Array
nomes.pop();
console.log(nomes, "→ Pop");

// Inverte a ordem do Array
nomes.reverse();
console.log(nomes, "→ Reverse");

// Adiciona ou remove um elemento em uma posição específica do array
// (index, remover elemento atual?, elemento_adicionado)
nomes.splice(1, 0, "Caio");
console.log(nomes, "→ Splice");

nomes.splice(1, 1,);
console.log(nomes, "→ Splice (Remover)");