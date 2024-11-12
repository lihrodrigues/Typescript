// Definindo as cores
const colors = ['red', 'blue', 'yellow', 'green'];

// Obtendo referências aos elementos da página
const startButton = document.getElementById('start') as HTMLButtonElement;
const messageDisplay = document.getElementById('message') as HTMLDivElement;
const colorDivs = colors.map(color => document.getElementById(color) as HTMLDivElement);

// Variáveis do jogo
let sequence: string[] = [];
let userInput: string[] = [];
let level: number = 0;

// Função para gerar a sequência aleatória
function generateSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    level++;
    displaySequence();
}

// Função para exibir a sequência para o jogador
function displaySequence() {
    messageDisplay.textContent = `Nível ${level}`;
    let index = 0;
    const interval = setInterval(() => {
        if (index < sequence.length) {
            highlightColor(sequence[index]);
            index++;
        } else {
            clearInterval(interval);
            enableUserInput();
        }
    }, 1000);
}

// Função para destacar a cor
function highlightColor(color: string) {
    const colorDiv = document.getElementById(color) as HTMLDivElement;
    colorDiv.style.opacity = '1';
    setTimeout(() => {
        colorDiv.style.opacity = '0.5';
    }, 500);
}

// Função para habilitar a entrada do usuário
function enableUserInput() {
    colorDivs.forEach(div => {
        div.addEventListener('click', handleUserClick);
    });
}

// Função para lidar com a entrada do usuário
function handleUserClick(event: MouseEvent) {
    const color = (event.target as HTMLDivElement).id;
    userInput.push(color);
    checkInput();
}

// Função para verificar a entrada do usuário
function checkInput() {
    const lastIndex = userInput.length - 1;
    if (userInput[lastIndex] !== sequence[lastIndex]) {
        messageDisplay.textContent = 'Você perdeu! Tente novamente.';
        resetGame();
    } else if (userInput.length === sequence.length) {
        messageDisplay.textContent = 'Correto! Proximo nível...';
        userInput = [];
        setTimeout(generateSequence, 1000);
    }
}

// Função para reiniciar o jogo
function resetGame() {
    sequence = [];
    userInput = [];
    level = 0;
    messageDisplay.textContent = 'Clique em "Iniciar Jogo" para começar.';
}

// Adicionando evento de clique ao botão de início
startButton.addEventListener('click', () => {
    resetGame();
    generateSequence();
});
