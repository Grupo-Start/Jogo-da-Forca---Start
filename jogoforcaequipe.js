
const fs = require("fs"); 
const readline = require('readline-sync'); 
const arquivo = "categorias.json"; 
const desenhoForca = require ("./desenhoForcaequipe")

let categorias = {};
if (fs.existsSync(arquivo)) {
    const dados = fs.readFileSync(arquivo, "utf-8");
    categorias = JSON.parse(dados);
} else {
    categorias = {
        frutas: ["banana", "laranja", "kiwi", "uva", "pera", "maracuja", "abacate", "morango", "melancia", "lichia"],
        animal: ["veado", "cachorro", "caranguejo", "dromedario", "cabrito", "camaleao", "galo", "ornitorrinco","coruja", "avestruz"],
        lugares: ["pernambuco", "paulista", "luxemburgo", "afeganistao", "trindade e tobago", "igarassu", "alagoas", "roraima", "recife"]
    };
    fs.writeFileSync(arquivo, JSON.stringify(categorias, null, 2));
}

const arquivoRanking = "ranking.json"; 
let ranking = [];

if (fs.existsSync(arquivoRanking)) {
    ranking = JSON.parse(fs.readFileSync(arquivoRanking)); 
}

function mostrarCategorias(){ 
    const nomeCategoria = Object.keys(categorias);
    nomeCategoria.forEach((cat, posicao) => {
        console.log(`${posicao + 1} - ${cat.toUpperCase()}`);
    })
    return nomeCategoria;
}

let sair = false;

while (!sair){ 

// Menu principal
console.log("\n--- JOGO DA FORCA ---\n");
console.log("1 - Jogar");
console.log("2 - Adicionar palavra");
console.log("3 - Mostrar Ranking");
console.log("4 - Sair");

let opcao = Number(readline.question("\nEscolha uma opcao: ")); 
if (opcao == 1){ 
    
console.log("\n--- JOGO DA FORCA ---\n");


 console.log("CATEGORIAS\n") 
    const nomeCategoria = mostrarCategorias(); 
    let escolherCategoria = Number(readline.question("\nEscolha uma categoria: ")); 

    if (escolherCategoria <= 0 || escolherCategoria > nomeCategoria.length){ 
        console.log("Escolha inválida!");
        continue;
    }

    let categoriaEscolhida = nomeCategoria[escolherCategoria - 1];
    const palavra = categorias[categoriaEscolhida]; 

    const palavraSorteada = palavra[Math.floor(Math.random()*palavra.length)].toUpperCase(); 

    const letrasDescobertas = Array.from(palavraSorteada).map(l => l === " " ? " " : "_"); 

    
    console.log(`\nCategoria: ${categoriaEscolhida.toUpperCase()}`); 

    let letrasErradas = []; 
    let tentativasRestantes = 6;

     while (tentativasRestantes > 0 && letrasDescobertas.includes("_")) { 
        desenhoForca(tentativasRestantes)  
        console.log(`\nPalavra: ${letrasDescobertas.join(" ")}`); 
        console.log(`Tentativas restantes: ${tentativasRestantes}`); 
        console.log(`Letras erradas: ${letrasErradas.join(", ") || "nenhuma"}`); 
    
        let letra = readline.question("\nDigite uma letra: ").toUpperCase(); 
    
        
        if (!letra.match(/^[a-zà-ú]$/i)) { 
          console.log("Digite apenas uma letra válida!");
          continue;
        }
    
        if (letrasDescobertas.includes(letra) || letrasErradas.includes(letra)) { 
          console.log("Você já falou essa letra!");
          continue;
        }
    
        
        if (palavraSorteada.includes(letra)) {
          for (let i = 0; i < palavraSorteada.length; i++) { 
            if (palavraSorteada[i] === letra) { 
              letrasDescobertas[i] = letra; 
            }
          }
          console.log("Letra correta!");
        } 
        else {
          tentativasRestantes--; 
          letrasErradas.push(letra); 
        }
      }
    if (!letrasDescobertas.includes("_")) { 
        console.log(`\nParabéns! Você acertou a palavra: ${palavraSorteada.toUpperCase()}!`);
       const nomeJogador = readline.question("Digite seu nome para o ranking: ").trim();
       const jogadorExistente = ranking.find(j => j.nome.toUpperCase() === nomeJogador.toUpperCase()); 

        if (jogadorExistente) { 
        jogadorExistente.acertos += 1;
        } 
        else {
        ranking.push({ nome: nomeJogador, acertos: 1 }); 
        }

        ranking.sort((a, b) => b.acertos - a.acertos);

        fs.writeFileSync(arquivoRanking, JSON.stringify(ranking, null, 2)); 
        console.log("Pontuação salva no ranking!");
    } 
    else {
      desenhoForca(0) 
      console.log(`\nFim de jogo! A palavra era: ${palavraSorteada.toUpperCase()}`); 
    }
  }
else if (opcao === 2){
    console.log("CATEGORIAS") 
    const nomeCategoria = mostrarCategorias(); 
    console.log("0 - Adicionar nova categoria");
    
    escolherCategoria = Number(readline.question("Escolha uma categoria: "));

    if (escolherCategoria == 0){
        let novaCategoria = readline.question("Digite o nome da nova categoria: ").toLowerCase(); 
        if (categorias[novaCategoria]){ 
            console.log("Categoria existente");

        }
        else {
            categorias[novaCategoria] = []; 
            console.log("Categoria criada com sucesso");
        }
    }
    else if (escolherCategoria > 0 && escolherCategoria <= nomeCategoria.length){ 
        categoriaEscolhida = nomeCategoria[escolherCategoria - 1]; 
        let novaPalavra=readline.question("Digite a nova palavra: ").toLowerCase();

            if (categorias[categoriaEscolhida].includes(novaPalavra)){ 
                console.log(`A palavra ${novaPalavra} ja existe`);
            } 
            else {
                categorias[categoriaEscolhida].push(novaPalavra);
                console.log(`${novaPalavra} adicionada com sucesso!`);
            }

    }
    else {
        console.log(" Escolha inválida"); 
    }
    fs.writeFileSync(arquivo, JSON.stringify(categorias, null, 2)); 
}
else if (opcao ===3 ){ 
    console.log("\n--- RANKING DOS JOGADORES ---\n");
    if (ranking.length === 0) { 
    console.log("Nenhum jogador no ranking ainda.");
    }
    else{
    ranking.forEach((jogador, i) => { 
    console.log(`${i + 1}º - ${jogador.nome} → ${jogador.acertos} palavras acertadas`);
    });
    }
}
else if (opcao ===4 ){ 
    console.log("Obrigada pela preferência! Volte sempre!😊");
    sair=true;
}
}
