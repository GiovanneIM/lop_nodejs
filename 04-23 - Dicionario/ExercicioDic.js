const frutas = {
    'fruta1' : {
        'nome' : 'maçã',
        'cor' : 'vermelha',
        'peso' : 300,
        'preco' : 7.00.toFixed(2)
    },

    'fruta3' : {
        'nome' : 'banana',
        'cor' : 'amarela',
        'peso' : 100,
        'preco' : 10.00.toFixed(2)
    },

    'fruta2' : {
        'nome' : 'limão',
        'cor' : 'verde',
        'peso' : 150,
        'preco' : 12.50.toFixed(2)
    }
};

console.log(frutas);


// Exibindo informações a respeito de cada fruta
console.log();
for (const fruta in frutas) {
    console.log(`• A fruta ${frutas[fruta].nome} é ${frutas[fruta].cor}, pesa ${frutas[fruta].peso} e custa R$ ${frutas[fruta].preco}.`);
};

// Aumento de 10%
console.log();
for (const fruta in frutas) {
    frutas[fruta].peso = (frutas[fruta].peso * 1.10).toFixed(2);
    frutas[fruta].preco = (frutas[fruta].preco * 1.10).toFixed(2);

    console.log(`• A fruta ${frutas[fruta].nome} é ${frutas[fruta].cor}, pesa ${frutas[fruta].peso} e custa R$ ${frutas[fruta].preco}.`);
};


// Adicionando a propriedade 'estragou' às frutas
let j = 0;
for (const fruta in frutas) {
    if (j % 2 == 0) { frutas[fruta]['estragou'] = false; }
    else { frutas[fruta]['estragou'] = true; }

    j++;
};

console.log();
for (const fruta in frutas) {
    if (frutas[fruta]['estragou']) {
        console.log(`• Puts grila, a ${frutas[fruta].nome} está podre!`);
    } 
    else {
        console.log(`• A fruta ${frutas[fruta].nome} é ${frutas[fruta].cor}, pesa ${frutas[fruta].peso} e custa R$ ${frutas[fruta].preco}.`);
    }
};
