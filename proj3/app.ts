// Enum que define os estados do semáforo
enum TrafficLightState {
    Red = 'red',
    Yellow = 'yellow',
    Green = 'green'
}

// Obtendo as divs de luz
const redLight = document.getElementById('red') as HTMLDivElement;
const yellowLight = document.getElementById('yellow') as HTMLDivElement;
const greenLight = document.getElementById('green') as HTMLDivElement;

// Variável para armazenar o estado atual do semáforo
let currentState: TrafficLightState = TrafficLightState.Red;

// Função para alternar entre as cores do semáforo
function changeLight() {
    // Remover a classe 'active' de todas as luzes
    redLight.classList.remove('active');
    yellowLight.classList.remove('active');
    greenLight.classList.remove('active');

    // Acender a luz correta com base no estado atual
    switch (currentState) {
        case TrafficLightState.Red:
            redLight.classList.add('active');
            currentState = TrafficLightState.Green;
            break;
        case TrafficLightState.Yellow:
            yellowLight.classList.add('active');
            currentState = TrafficLightState.Red;
            break;
        case TrafficLightState.Green:
            greenLight.classList.add('active');
            currentState = TrafficLightState.Yellow;
            break;
    }
}

// Função que inicia o ciclo do semáforo
function startTrafficLight() {
    setInterval(changeLight, 3000); // Alterna as cores a cada 3 segundos
}

// Iniciar o ciclo do semáforo assim que a página carregar
window.onload = startTrafficLight;
