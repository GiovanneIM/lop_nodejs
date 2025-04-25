const m = [[3,5], [0,4]];

console.log(m[0][0] ** 2);
console.log(m[0][1] ** 2);
console.log(m[1][0] ** 2);
console.log(m[1][1] ** 2);

// Equivalente a
for (let linha = 0; linha < m.length; linha++) {
    for (let coluna = 0; coluna < m[linha].length; coluna++) {
        console.log(m[linha][coluna] ** 2);
    }
}    
