
const fs = require("fs");
const readline = require('readline-sync'); // para funcionar as perguntas
const arquivo = "categorias.json"; // variavel que fica salvo as mudanças das categorias para os próximos jogos
const desenhoForca = require ("./desenhoForcaequipe") //função que importa o arquivo do desenho

let categorias = {};
if (fs.existsSync(arquivo)) {
    const dados = fs.readFileSync(arquivo, "utf-8");
    categorias = JSON.parse(dados); // função que salva as mudanças nas categorias
} else {
    categorias = {
        frutas: ["banana", "laranja", "kiwi", "uva", "pera", "maracuja", "abacate", "morango", "melancia", "lichia"],
        animal: ["veado", "cachorro", "caranguejo", "dromedario", "cabrito", "camaleao", "galo", "ornitorrinco","coruja", "avestruz"],
        lugares: ["pernambuco", "paulista", "luxemburgo", "afeganistao", "trindade e tobago", "igarassu", "alagoas", "roraima", "recife"]
    };
    fs.writeFileSync(arquivo, JSON.stringify(categorias, null, 2));
}

const arquivoRanking = "ranking.json"; // variavel que fica salvo os rankings
let ranking = [];

if (fs.existsSync(arquivoRanking)) {
    ranking = JSON.parse(fs.readFileSync(arquivoRanking)); //função que salva as mudanças no ranking
}

function mostrarCategorias(){ //função de mostrar as categorias no menu, fizemos para não ter que repetir 2x aqui e na opção 2
    const nomeCategoria = Object.keys(categorias); // cria uma variavel para guardar as chaves do objeto categoria: ex fruta:, Animal:, Lugares:
    nomeCategoria.forEach((cat, posicao) => {// imprimir cada valor do chaves da categorias
        console.log(`${posicao + 1} - ${cat.toUpperCase()}`);
    })
    return nomeCategoria;
}

let sair = false; // variavel boleana pra usar no while

while (!sair){ //Loop pra funcionar as opções enquanto a pessoa não digitar 0

// Menu principal
console.log("\n--- JOGO DA FORCA ---\n");
console.log("1 - Jogar");
console.log("2 - Adicionar palavra");
console.log("3 - Mostrar Ranking");
console.log("4 - Sair");

let opcao = Number(readline.question("\nEscolha uma opcao: ")); //escolhe a opção do menu

if (opcao == 1){ // caso o jogador selecione jogar
    
console.log("\n--- JOGO DA FORCA ---\n");


 console.log("CATEGORIAS\n") // imprimir a palavra categorias 
    const nomeCategoria = mostrarCategorias(); //a função de mostrar as categorias na ordem que a gente fez lá em cima
    let escolherCategoria = Number(readline.question("\nEscolha uma categoria: ")); //escolhe uma categoria

    if (escolherCategoria <= 0 || escolherCategoria > nomeCategoria.length){ // se o numero digitado não tiver dentro das opçoes dá invalido
        console.log("Escolha inválida!");
        continue;
    }

    let categoriaEscolhida = nomeCategoria[escolherCategoria - 1]; //diminui 1 numero do numero digitado para poder ficar correta a ordem da lista
    const palavra = categorias[categoriaEscolhida]; // recebe palavras dentro da categoria escolhida(ainda não sorteada)

    const palavraSorteada = palavra[Math.floor(Math.random()*palavra.length)].toUpperCase(); // Sorteia uma palavra dentro da categoria escolhida

    const letrasDescobertas = Array.from(palavraSorteada).map(l => l === " " ? " " : "_"); // vai substituir as letras das palavras enquanto o usuario não fala a correta

    
    console.log(`\nCategoria: ${categoriaEscolhida.toUpperCase()}`); //imprimi as categorias em letras maiusculas

    let letrasErradas = []; // Botado antes do loop principal pq se fosse la no começo ia ficar salvo pros prox jogos
    let tentativasRestantes = 6;// Botado antes do loop principal pq se fosse la no começo ia ficar salvo pros prox jogos

    //  Loop principal do jogo
     while (tentativasRestantes > 0 && letrasDescobertas.includes("_")) { //enquanto não acabar as tentativas e ainda tiver letra a ser preenchida vai ficar rodando
        desenhoForca(tentativasRestantes)  // pra mostrar o desenho da forca
        console.log(`\nPalavra: ${letrasDescobertas.join(" ")}`); // as letras já acertadas
        console.log(`Tentativas restantes: ${tentativasRestantes}`); //imprime as tentativas restantes
        console.log(`Letras erradas: ${letrasErradas.join(", ") || "nenhuma"}`); //imprimi as letras erradas
      
        let letra = readline.question("\nDigite uma letra: ").toUpperCase(); // pede uma letra e transforma em maiuscula
    
        // Validar entrada
        if (!letra.match(/^[a-zà-ú]$/i)) { //função que valida apenas as letras, tiver numero descarta
          console.log("Digite apenas uma letra válida!");
          continue;
        }
    
        if (letrasDescobertas.includes(letra) || letrasErradas.includes(letra)) { //se já falou a letra, ele vai dizer e não conta como tentativa nova
          console.log("Você já falou essa letra!");
          continue;
        }
    
        // Verificar se a letra está na palavra
        if (palavraSorteada.includes(letra)) {
          for (let i = 0; i < palavraSorteada.length; i++) { //loop pra procurar nas letras da palavra
            if (palavraSorteada[i] === letra) { //se a palavra sorteada tiver a letra
              letrasDescobertas[i] = letra; //ela adiciona a letra em letrasdescobertas
            }
          }
          console.log("Letra correta!");
        } 
        else {
          tentativasRestantes--; //diminui uma tentativa se errar
          letrasErradas.push(letra); //adiciona a letra errada na lista de letras erradas
        }
      }
    if (!letrasDescobertas.includes("_")) { //se preencher todos os espaços com letras, ele imprime que acertou tudo
        console.log(`\nParabéns! Você acertou a palavra: ${palavraSorteada.toUpperCase()}!`);
       const nomeJogador = readline.question("Digite seu nome para o ranking: ").trim(); //trim() é pra desconsiderar os espaços em brancos antes e depois do nome
       const jogadorExistente = ranking.find(j => j.nome.toUpperCase() === nomeJogador.toUpperCase()); // verifica se já existe o jogador

        if (jogadorExistente) { //se já existe, adiciona 1 ponto se ele acertar a palavra
        jogadorExistente.acertos += 1;
        } 
        else {
        ranking.push({ nome: nomeJogador, acertos: 1 }); //se não exite, vai criar o nome com o numero de acertos e adicionar no ranking
        }

        ranking.sort((a, b) => b.acertos - a.acertos); // ordena a ordem do ranking do maior numero de acertos pro menor

        fs.writeFileSync(arquivoRanking, JSON.stringify(ranking, null, 2)); //salva o ranking pros proximos jogos
        console.log("Pontuação salva no ranking!");
    } 
    else {
      desenhoForca(0) // pra aparecer o game over quando errar tudo
      console.log(`\nFim de jogo! A palavra era: ${palavraSorteada.toUpperCase()}`); // fala que errou
    }
  }
else if (opcao === 2){// opção para adicionar categorias e palavras
    console.log("Categorias") // imprimir a palavra categorias 
    const nomeCategoria = mostrarCategorias(); //a função que mostra as categorias
    console.log("0 - Adicionar nova categoria");
    
    escolherCategoria = Number(readline.question("Escolha uma categoria: "));

    if (escolherCategoria == 0){
        let novaCategoria = readline.question("Digite o nome da nova categoria: ").toLowerCase(); // cria uma variavel para adicionar uma nova categoria
        if (categorias[novaCategoria]){ // Verifica se nova categoria existe dentro do objeto categorias
            console.log("Categoria existente");

        }
        else {
            categorias[novaCategoria] = []; //pra criar uma nova categoria
            console.log("Categoria criada com sucesso");
        }
    }
    else if (escolherCategoria > 0 && escolherCategoria <= nomeCategoria.length){ //pra escolher o numero da categoria dentro das opções
        categoriaEscolhida = nomeCategoria[escolherCategoria - 1]; // normaliza a ordem pq a lista sempre vai ser 0 na primeira posição
        let novaPalavra=readline.question("Digite a nova palavra: ").toLowerCase();

            if (categorias[categoriaEscolhida].includes(novaPalavra)){ //verifica se a palavra já existe dentro da categoria escolhida ex: uva existe dentro de frutas
                console.log(`A palavra ${novaPalavra} ja existe`);
            } 
            else {
                categorias[categoriaEscolhida].push(novaPalavra); //Adiciona a nova palavra na categoria escolhida
                console.log(`${novaPalavra} adicionada com sucesso!`);
            }

    }
    else {
        console.log(" Escolha inválida"); //se digitar errado o numero
    }
    fs.writeFileSync(arquivo, JSON.stringify(categorias, null, 2)); // salva as categorias a cada mudança
}
else if (opcao ===3 ){ //para ver o ranking
    console.log("\n--- RANKING DOS JOGADORES ---\n");
    if (ranking.length === 0) { //se o ranking tiver vazio ele imprime que não tem ninguem
    console.log("Nenhum jogador no ranking ainda.");
    }
    else{
    ranking.forEach((jogador, i) => { //função que mostra cada jogador e sua posição
    console.log(`${i + 1}º - ${jogador.nome} → ${jogador.acertos} palavras acertadas`);
    });
    }
}
else if (opcao ===4 ){ //pra sair
    console.log("Obrigada pela preferência! Volte sempre!😊");
    sair=true;
}
}
