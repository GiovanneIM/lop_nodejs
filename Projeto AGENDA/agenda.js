const readline = require("readline-sync");
const fs = require('fs');

const contatos = {};
let agenda = true;

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
    console.log("[7] Sair");

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
    
    if (Object.keys(contatos).length == 0) {
        mensagemErro("A agenda está vazia.");
    }

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

    let correspondente = 0;


    switch (opcao) {
        // Busca por nome
        case 1:
            const nome = readline.question(AMARELO + NEGRITO +  "\nInsira o nome que deseja buscar: " + NORMAL);
            for (const nomeContato in contatos) {
                if (nomeContato.toLowerCase().includes(nome.toLowerCase())) {
                    imprimirContato(nomeContato)
                    correspondente++;
                }
            }

            if (correspondente === 0) {
                mensagemErro("Nenhum contato corresponde à busca.");
            }
            break;
        
        // Busca por telefone
        case 2:
            const telefone = readline.question(AMARELO + NEGRITO +  "\nInsira o telefone que deseja buscar: " + NORMAL);
            for (const nomeContato in contatos) {
                if (contatos[nomeContato].telefone.includes(telefone) ) {
                    imprimirContato(nomeContato)
                    correspondente++;
                }
            }

            if (correspondente === 0) {
                mensagemErro("Nenhum contato corresponde à busca.");
            }
            break;

        // Busca por E-Mail
        case 3:
            const email = readline.question(AMARELO + NEGRITO +  "\nInsira o E-Mail que deseja buscar: " + NORMAL);
            for (const nomeContato in contatos) {
                if (contatos[nomeContato].email.toLowerCase().includes(email.toLowerCase()) ) {
                    imprimirContato(nomeContato)
                    correspondente++;
                }
            }

            if (correspondente === 0) {
                mensagemErro("Nenhum contato corresponde à busca.");
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

        mensagemErro("CONTATOS APAGADOS!");
        console.log("Obs: Os contatos salvos em arquivo, continuam disponíveis para carregamento até que o arquivo seja sobreescrito.");
    }
    else
    {
        mensagemErro("OPERAÇÃO CANCELADA")
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
            contatosSalvar += `${nome},${contatos[nome].telefone},${contatos[nome].email}\n`;
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
    console.log("[1] CSV \n[2] JSON \n[3] Cancelar");

    const opcao = validarOpcaoNumerica(1, 3);

    let numContatos = 0;

    if (opcao == 1){
        // Lendo o arquivo de contatos salvos e salvando cada linha como elemento de um vetor
        const contatosSalvos = fs.readFileSync("contatos.csv", 'utf8').split(/\r?\n/);

        // Percorrendo cada contato
        for (const contato in contatosSalvos) {
            const dados = contatosSalvos[contato].split(',');

            // Verificando se a linhas não estão vazias e adicionando ao dicionário
            if (dados[0] != '') {
                let valido;

                if (dados[0] != undefined && dados[1] != undefined && dados[2] != undefined) {
                    valido = validarCadastro(dados[0], dados[1], dados[2]);
                }

                if (valido){
                    numContatos++;
                    contatos[dados[0]] = {"telefone": dados[1], "email": dados[2]}
                }
                else{;
                    mensagemErro(`Não foi possível cadastrar o contato na linha ${Number(contato) + 1} do arquivo csv.`);
                }
            }
        }

        console.log(AZUL + NEGRITO + `\n${numContatos} contatos foram carregados do arquivo CSV!` + NORMAL);
    }
    else if (opcao == 2){
        const dados = fs.readFileSync("contatos.json", 'utf8');
        const contatosCarregados = JSON.parse(dados);
        
        for (const nome in contatosCarregados) {
            let valido;

            if (nome != undefined && contatosCarregados[nome].telefone != undefined && contatosCarregados[nome].email != undefined) {
                valido = validarCadastro(nome, contatosCarregados[nome].telefone, contatosCarregados[nome].email);
            }

            if (valido){
                numContatos++;
                contatos[nome] = contatosCarregados[nome];
            }
            else{
                mensagemErro(`Não foi possível cadastrar o contato ${nome} (${numContatos + 1}º contato do arquivo json).`);
            }
        }

        console.log(AZUL + NEGRITO + `\n${numContatos} contatos foram carregados do arquivo JSON!` + NORMAL);
    }

    console.log();
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
    console.log(VERDE + NEGRITO + "\nPROGRAMA ENCERRADO" + NORMAL);
}



function pressioneParaContinuar() {
    readline.question(VERDE + NEGRITO + "\n--- Pressione ENTER para continuar ---\n" + NORMAL);
    console.clear();
}

function validarOpcaoNumerica (a, b) {
    let opcao;
    do{
        opcao = Number(readline.question(VERDE + NEGRITO + "\n>> " + NORMAL));

        if (a > opcao || opcao > b) {
            mensagemErro(`O índice ${opcao} não corresponde à uma opção válida.`)
        }
        else if (isNaN(opcao)){
            mensagemErro("Escolha o índice relacionado à uma opção.")
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
    const nome_valido = validarNome(nome);
    const telefone_valido = validarTelefone(telefone);
    const email_valido = validarEmail(email);

    if (nome_valido && telefone_valido && email_valido) {
        return true;
    }
    else{
        return false;
    }
}

function validarNome (nome) {
    if (nome in contatos) {
        mensagemErro(`Já existe um usuário cadastrado como ${nome}.`)
        return false;
    }

    return true;
}

function validarTelefone(telefone) {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (!regex.test(telefone)) {
        mensagemErro("O telefone deve seguir o formato: (xx) xxxxx-xxxx. Com \'x\' sendo digitos numéricos.");
        return false;
    }

    return true;
}

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9](?!.*\.\.)([a-zA-Z0-9._]{1,}[a-zA-Z0-9])?@[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
        mensagemErro("O E-Mail deve seguir o formato: usuario@dominio.extensão")
        return false;
    }

    const usuario = email.split('@')[0];
    if (usuario.length < 3) {
        mensagemErro("A parte do \"usuário\" deve ter pelo menos 3 dígitos.")
        return false;
    }

    return true;
}

function mensagemErro(mensagem) {
    console.log( VERMELHO + NEGRITO + "\nErro: " + mensagem + NORMAL);    
}
// ----------------------------------------------------------------------

/* CÓDIGO PRINCIPAL */

carregarContatos();
while (agenda){
    menu();
}
