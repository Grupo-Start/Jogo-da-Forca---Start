🎮 **Jogo da Forca - Start tarde - Grupo 1**

Um jogo da forca interativo desenvolvido em JavaScript para ser executado no terminal/console, com sistema
de categorias, ranking de jogadores e interface visual da forca.

📋 **Descrição**

Este projeto é uma implementação completa do clássico Jogo da Forca em Node.js. O jogo oferece uma
experiência interativa no terminal com recursos avançados como múltiplas categorias, sistema de pontuação e
persistência de dados.

✨ **Funcionalidades**

✨ Jogo Principal: Interface clássica da forca com 6 tentativas\
✨ Categorias: Frutas, Animais e Lugares (com possibilidade de adicionar mais)\
✨ Sistema de Ranking: Salva e exibe o ranking dos jogadores\
✨ Gerenciamento de Conteúdo: Adicionar novas categorias e palavras\
✨ Interface Visual: Desenho da forca que evolui conforme os erros\
✨ Persistência: Dados salvos em arquivos JSON

🛠️ **Tecnologias Utilizadas**

Node.js readline-sync File System (fs) JavaScript

📁 **Estrutura do Projeto**

jogo-forca/
├── jogoforcaequipe.js # Arquivo principal do jogo
├── desenhoForcaequipe.js # Funções de desenho da forca
├── categorias.json # Armazena categorias e palavras (gerado automaticamente)
└── ranking.json # Armazena o ranking dos jogadores (gerado automaticamente)

🚀 **Como Executar**

Pré-requisitos

Node.js instalado na sua máquina

Instalação e Execução

1. Clone ou baixe os arquivos do projeto
2. Instale as dependências
npm install readline-sync
3. Execute o jogo
node jogoforcaequipe.js

🎮 **Como Jogar**

Menu Principal

--- JOGO DA FORCA ---
1 - Jogar
2 - Adicionar palavra
3 - Mostrar Ranking
4 - Sair

Fluxo do Jogo
1. Escolha a opção 1 - Jogar
2. Selecione uma categoria disponível
3. Digite letras para adivinhar a palavra
4. Você tem 6 tentativas para acertar
5. Ao vencer, seu nome será salvo no ranking
   
Adicionando Novas Palavras

Use a opção 2 - Adicionar palavra

Escolha uma categoria existente ou crie uma nova
Digite a palavra a ser adicionada

🎯 **Regras do Jogo**

Apenas letras são aceitas como entrada
Letras repetidas não contam como tentativa
Cada erro reduz uma tentativa restante
O jogo termina quando:
Você acerta todas as letras da palavra (VITÓRIA)
Suas tentativas chegam a zero (DERROTA)

📊 **Sistema de Ranking**

Pontuação baseada no número de palavras acertadas
Ranking ordenado por maior número de acertos
Dados persistidos entre sessões
Nomes de jogadores únicos (acumulam pontuação)

🎨 **Interface Visual**

O jogo inclui desenhos ASCII da forca que evoluem conforme os erros:
6 tentativas: Forca vazia
0 tentativas: Personagem completo (Game Over)

🔧 **Personalização**

Adicionar Novas Categorias
Através do menu ou editando diretamente o arquivo categorias.json :

{
 "nova_categoria": ["palavra1", "palavra2", "palavra3"]
}

📝 **Notas de Desenvolvimento**

Desenvolvido com JavaScript e Node.js\
Código modular\
Tratamento de erros e validações de entrada\
Persistência de dados em JSON

**Divirta-se jogando!** 🎉

Documentação grupo 1\
Bianca Gonçalves\
Davison Evangelista\
Deivson Sena\
Eder Barbosa\
Marcelo França\
Taliita Apolo



