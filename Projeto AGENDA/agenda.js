const readline = require("readline-sync");
const fs = require('fs');

const contatos = {};

/* MODIFICADORES DE SAÍDA */
const VERMELHO  = '\u001b[31m';
const VERDE     = '\u001b[32m';
const AMARELO   = '\u001b[33m';
const AZUL      = '\u001b[34m';
const MAGENTA   = '\u001b[35m';

const NORMAL    = '\u001b[m';
const NEGRITO   = '\u001b[1m';

// ---------------------------------------------------------------------------------
/* FUNÇÕES */

function menu () {
    console.log(AMARELO + NEGRITO + "AGENDA DE CONTATOS\n" +  NORMAL);

    console.log("[1] Adicionar contatos");
    console.log("[2] Listar contatos");
    console.log("[3] Buscar contato");
    console.log("[4] Apagar contatos");
    console.log("[5] Salvar contatos");
    console.log("[6] Carregar contatos");
    console.log("[7] Sair\n");

    const opcao = validarOpcaoNumerica(1, 7)

    switch (opcao) {
        case 1:
            adicionarContato();
            break;

        case 2:
            listarContatos();
            break;

        case 3:
            buscarContato();
            break;

        case 4:
            apagarContatos();
            break;

        case 5:
            salvarContatos();
            break;

        case 6:
            carregarContatos();
            pressioneParaContinuar();
            break;

        case 7:
            sair();
            break;
    }
}

function adicionarContato () {
    console.clear();
    console.log(AMARELO + NEGRITO + "Adicionando contatos à agenda. \nDeixe o nome em branco para sair" + NORMAL);
    
    while (true) {
    // Coleta as informações do contato
        const nome = readline.question(MAGENTA + NEGRITO + "\nNome: " + NORMAL);
        if(nome === ''){ break; }

        const telefone = readline.question("Telefone: ");
        const email = readline.question("E-mail: ");

        const valido = validarCadastro(nome, telefone, email)

        // Se o cadastro for válido, adiciona o contato ao dicionário
        if (valido) { contatos[nome] = {"telefone": telefone, "email": email} }
    }

    console.clear()
}

function listarContatos () {
    console.clear();
    console.log(AMARELO + NEGRITO + "CONTATOS NA AGENDA" + NORMAL);
    
    // Ordenando as chaves (Nomes) alfabeticamente
    const nomesOrdenados = Object.keys(contatos).sort();

    // Listando os contatos
    for (const nome of nomesOrdenados) {
        imprimirContato(nome)
    }

    pressioneParaContinuar()
}

function buscarContato () {
    console.clear();
    console.log(AMARELO + NEGRITO + "Deseja realizar uma busca por" + NORMAL);
    console.log("[1] Nome \n[2] Telefone \n[3] E-Mail");
    
    const opcao = validarOpcaoNumerica(1, 3);

    switch (opcao) {
        // Busca por nome
        case 1:
            const nome = readline.question(AMARELO + NEGRITO +  "\nInsira o nome que deseja buscar: " + NORMAL);
            for (const nomeContato in contatos) {
                if (nomeContato.toLowerCase().includes(nome.toLowerCase())) {
                    imprimirContato(nomeContato)
                }
            }
            break;
        
        // Busca por telefone
        case 2:
            const telefone = readline.question(AMARELO + NEGRITO +  "\nInsira o telefone que deseja buscar: " + NORMAL);
            for (const nomeContato in contatos) {
                if (contatos[nomeContato].telefone.includes(telefone) ) {
                    imprimirContato(nomeContato)
                }
            }
            break;

        // Busca por E-Mail
        case 3:
            const email = readline.question(AMARELO + NEGRITO +  "\nInsira o E-Mail que deseja buscar: " + NORMAL);
            for (const nomeContato in contatos) {
                if (contatos[nomeContato].email.toLowerCase().includes(email.toLowerCase()) ) {
                    imprimirContato(nomeContato)
                }
            }
            break;
    }

    pressioneParaContinuar();
}

function apagarContatos () {
    // Buscando contatos que o usuário deseja apagar
    const contatosASeremApagados = contatosApagarBusca();

    // Exibindo contatos correspondente 
    console.log(`\n${contatosASeremApagados.length} contato(s) será(ão) apagado(s), sendo ele(s):`)
    for (const nomeContato of contatosASeremApagados) {
        imprimirContato(nomeContato)
    }

    // Pedindo confirmação
    console.log(AMARELO + NEGRITO + "\nDeseja confirmar a operação?" + NORMAL);
    console.log("[1] SIM \n[2] NÃO ");
    const opcao = validarOpcaoNumerica(1, 2);

    if (opcao == 1) {
        for (const nomeContato of contatosASeremApagados) {
            delete contatos[nomeContato];
        }

        console.log(VERMELHO + NEGRITO + "CONTATOS APAGADOS!" + NORMAL);
        console.log("Obs: Os contatos salvos em arquivo, continuam disponíveis para carregamento até que o arquivo seja sobreescrito.");
    }
    else
    {
        console.log(VERMELHO + NEGRITO + "OPERAÇÃO CANCELADA!" + NORMAL);
    }

    pressioneParaContinuar()
}

function contatosApagarBusca () {
    /* Retorna uma lista de contatos */

    console.clear();
    console.log(AMARELO + NEGRITO + "Deseja apagar um contato por meio de seu:" + NORMAL);
    console.log("[1] Nome \n[2] Telefone \n[3] E-mail \n[4] Apagar todos os contatos");
    
    const contatosASeremApagados = [];
    const opcao = validarOpcaoNumerica(1, 4);

    switch (opcao) {
        // por nome
        case 1:
            const nome = readline.question(AMARELO + NEGRITO + "\nInsira o nome que deseja buscar: " + NORMAL);
            for (const nomeContato in contatos) {
                if (nomeContato.toLowerCase().includes(nome.toLowerCase())) {
                    contatosASeremApagados.push(nomeContato);
                }
            }
            break;
        
        // por telefone
        case 2:
            const telefone = readline.question(AMARELO + NEGRITO + "\nInsira o telefone que deseja buscar: " + NORMAL);
            for (const nomeContato in contatos) {
                if (contatos[nomeContato].telefone.includes(telefone) ) {
                    contatosASeremApagados.push(nomeContato);
                }
            }
            break;

        // por e-mail
        case 3:
            const email = readline.question(AMARELO + NEGRITO + "\nInsira o E-Mail que deseja buscar: " + NORMAL);
            for (const nomeContato in contatos) {
                if (contatos[nomeContato].email.toLowerCase().includes(email.toLowerCase()) ) {
                    contatosASeremApagados.push(nomeContato);
                }
            }
            break;

        // Apagar todos os contatos
        case 4:
            for (const nomeContato in contatos) {
                contatosASeremApagados.push(nomeContato);
            }
    }

    return contatosASeremApagados;
}

function salvarContatos() {
    console.log(AMARELO + NEGRITO + "Deseja salvar seus contatos em um arquivo CSV ou JSON?" + NORMAL);
    console.log("[1] CSV \n[2] JSON");

    opcao = validarOpcaoNumerica(1, 2);
    
    if (opcao == 1 ){
        // Salvando em CSV

        let contatosSalvar = "";

        // Percorrendo o dicionário e adicionando as informações de cada contato como uma linha de csv
        for (const nome in contatos) {
            contatosSalvar += `${nome}, ${contatos[nome].telefone}, ${contatos[nome].emails}\n`;
        }
        
        // Escrevendo no arquivo de contatos
        fs.writeFileSync("contatos.csv", contatosSalvar)

        console.log(AZUL + NEGRITO + "\nContatos salvos em CSV!" + NORMAL);
    }
    else {
        // Salvando em JSON

        fs.writeFileSync("contatos.json", JSON.stringify(contatos, null, 4)); // 'null, 4' salva com identação

        console.log(AZUL + NEGRITO + "\nContatos salvos em JSON!" + NORMAL);
    }
    
    pressioneParaContinuar();
}

function carregarContatos () {
    console.log(AMARELO + NEGRITO + "\nDeseja carregar seus contatos de um arquivo CSV ou JSON?" + NORMAL);
    console.log("[1] CSV \n[2] JSON");

    opcao = validarOpcaoNumerica(1, 2);

    if (opcao == 1){
        // Lendo o arquivo de contatos salvos e salvando cada linha como elemento de um vetor
        const contatosSalvos = fs.readFileSync("contatos.csv", 'utf8').split(/\r?\n/);

        // Percorrendo cada contato
        for (const contato of contatosSalvos) {
            const dados = contato.split(',');

            // Verificando se a linhas está vazia e adicionando ao dicionário
            if (dados[0] != '') {
                contatos[dados[0]] = {"telefone": dados[1], "email": dados[2]}
            }
        }

        console.log(AZUL + NEGRITO + "\nContatos carregados do arquivo CSV!" + NORMAL);
    }
    else{
        const dados = fs.readFileSync("contatos.json", 'utf8');
        const contatosCarregados = JSON.parse(dados);
        
        for (const nome in contatosCarregados) {
            contatos[nome] = contatosCarregados[nome];
        }

        console.log(AZUL + NEGRITO + "\nContatos carregados do arquivo JSON!" + NORMAL);
    }
}

function sair() {
    console.clear();

    console.log(AMARELO + NEGRITO + "Deseja salvar os contatos em arquivo antes de encerrar o programa?" + NORMAL);
    console.log("[1] SIM \n[2] NÃO");
    
    const opcao = validarOpcaoNumerica(1, 2);

    if (opcao == 1) {
        salvarContatos();
    }

    agenda = false;
}


function pressioneParaContinuar() {
    readline.question(VERDE + NEGRITO + "\n--- Pressione ENTER para continuar ---\n" + NORMAL);
    console.clear();
}

function validarOpcaoNumerica (a, b) {
    let opcao;
    do{
        opcao = Number(readline.question(VERDE + NEGRITO + ">> " + NORMAL));

        if (a > opcao || opcao > b) {
            console.log(VERMELHO + NEGRITO + `\nErro: O índice ${opcao} não corresponde à uma opção válida.` + NORMAL);
        }
        else if (isNaN(opcao)){
            console.log(VERMELHO + NEGRITO + `\nErro: Escolha o índice realacionado à uma opção.` + NORMAL);
        }
    }
    while (a > opcao || opcao > b || isNaN(opcao) );

    return opcao;
}

function imprimirContato (nomeContato) {
    console.log(MAGENTA + NEGRITO + "\nNome: " + NORMAL + AMARELO + nomeContato + NORMAL) 
    console.log(`Telefone: ${contatos[nomeContato].telefone}`);
    console.log(`E-mail: ${contatos[nomeContato].email}`);
}

function validarCadastro (nome, telefone, email) {
    if (nome in contatos) {
        console.log(VERMELHO + NEGRITO + `\nErro: Já existe um usuário cadastrado como ${nome}.` + NORMAL);
        return false;
    }

    if (telefone[0] != '(' || telefone[3] != ')' || telefone[10] != '-' || telefone.length != 15) {
        console.log(VERMELHO + NEGRITO + `\nErro: O telefone deve seguir a seguinte identação "(xx) xxxxx-xxxx", com cada 'x' sendo um digito numérico".` + NORMAL);
        return false;
    }
    
    if(isNaN(Number(telefone.substring(1,2))) || isNaN(Number(telefone.substring(5,9))) || isNaN(11,14)){
        console.log(VERMELHO + NEGRITO + `\nErro: O telefone deve seguir a seguinte identação "(xx) xxxxx-xxxx", com cada 'x' sendo um digito numérico".` + NORMAL);
        return false;
    }

    if (email.indexOf("@") == -1) {
        console.log(VERMELHO + NEGRITO + `\nErro: O E-Mail deve seguir a seguinte identação: usuario@dominio.com` + NORMAL);
    }

    return true;
}
// ----------------------------------------------------------------------

/* CÓDIGO PRINCIPAL */

let agenda = true;
carregarContatos();
while (agenda){
    menu();
}
