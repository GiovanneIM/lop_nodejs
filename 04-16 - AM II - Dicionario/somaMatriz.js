const a =[[-5, 8, 0], [3, 7, 10], [1, -8, 2]];
const b =[[5, 7, 4], [-1, -1, -1], [0, 10, 9]];
const soma = [[],[],[]];


for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        soma[i][j] = a[i][j] + b[i][j];
    }
}

console.log(a);
console.log(b);
console.log(soma);

console.log();

console.table(a);
console.table(b);
console.table(soma);