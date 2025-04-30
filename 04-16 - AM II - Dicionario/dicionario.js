// const notas = {
//     mat : 10,
//     geo : 8,
//     por : 5,
//     bio : 7
// }

// console.table(notas);

// console.log(notas.mat);
// console.log(notas["mat"]);

console.log("\n", "-----------------------------------------------------------", "\n");

// const notas = {
//     juca : {
//         mat : 10,
//         geo : 8,
//         por : 5,
//         bio : 7
//     },

//     maria : {
//         mat : 5,
//         geo : 6,
//         por : 10,
//         bio : 9
//     },
// };

// console.log("Alunos\n", notas);
// console.log("Juca:\n", notas.juca);
// console.log("Juca - Geo:", notas.juca.geo);

// console.log("\n")

// console.table(notas);
// console.table(notas.juca);
// console.table(notas.maria);

console.log("\n", "-----------------------------------------------------------", "\n");

const notas = { mat : 10, geo : 8, por : 5, bio : 7 };

// Obtém as chaves do dicionario
for (let chave in notas){
    console.log(chave, "→", notas[chave])
}