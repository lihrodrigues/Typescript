class Snake {
    body: { x: number, y: number }[]; // Segmentos da cobra
    direction: { x: number, y: number }; // Direção do movimento

    constructor() {
        this.body = [{ x: 10, y: 10 }]; // Cobra começa com um segmento
        this.direction = { x: 1, y: 0 }; // Movendo para a direita
    }

    move() {
        const head = { x: this.body[0].x + this.direction.x, y: this.body[0].y + this.direction.y };
        this.body.unshift(head); // Adiciona a nova posição da cabeça
        this.body.pop(); // Remove o último segmento
    }

    changeDirection(newDirection: { x: number, y: number }) {
        this.direction = newDirection;
    }

    grow() {
        const tail = this.body[this.body.length - 1];
        this.body.push({ x: tail.x, y: tail.y }); // Adiciona um novo segmento à cobra
    }
}

class Food {
    position: { x: number, y: number };

    constructor() {
        this.position = this.randomPosition();
    }

    randomPosition() {
        const x = Math.floor(Math.random() * 20);
        const y = Math.floor(Math.random() * 20);
        return { x, y };
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "red";
        context.fillRect(this.position.x * 20, this.position.y * 20, 20, 20);
    }
}

class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    snake: Snake;
    food: Food;
    gridSize: number;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d")!;
        this.snake = new Snake();
        this.food = new Food();
        this.gridSize = 20;

        document.addEventListener("keydown", this.handleKey.bind(this)); // Ligações de eventos de teclado
    }

    start() {
        setInterval(() => {
            this.update();
            this.draw();
        }, 100);
    }

    update() {
        this.snake.move();
        // Verifica colisão com comida
        if (this.snake.body[0].x === this.food.position.x && this.snake.body[0].y === this.food.position.y) {
            this.snake.grow();
            this.food = new Food(); // Nova comida aparece
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpa o canvas

        // Desenha a cobra
        this.snake.body.forEach(segment => {
            this.context.fillStyle = "lime";
            this.context.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize);
        });

        // Desenha a comida
        this.food.draw(this.context);
    }

    handleKey(event: KeyboardEvent) {
        switch (event.key) {
            case "ArrowUp":
                this.snake.changeDirection({ x: 0, y: -1 });
                break;
            case "ArrowDown":
                this.snake.changeDirection({ x: 0, y: 1 });
                break;
            case "ArrowLeft":
                this.snake.changeDirection({ x: -1, y: 0 });
                break;
            case "ArrowRight":
                this.snake.changeDirection({ x: 1, y: 0 });
                break;
        }
    }
}

const game = new Game("gameCanvas");
game.start();
