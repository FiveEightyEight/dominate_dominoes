class Domino {
    private sideA: number;
    private sideB: number;

    constructor(sideA: number, sideB: number) {
        this.sideA = sideA;
        this.sideB = sideB;
    }

    getSideA(): number {
        return this.sideA;
    }

    getSideB(): number {
        return this.sideB;
    }

    isDouble(): boolean {
        return this.sideA === this.sideB;
    }

    toString(): string {
        return `[${this.sideA}|${this.sideB}]`;
    }
}

const dominoes: Domino[] = [];

for (let i = 0; i <= 6; i++) {
  for (let j = i; j <= 6; j++) {
    dominoes.push(new Domino(i, j));
  }
}


// get element by class name domino-container
const dominoContainer = document.querySelector('.domino-container');
let dominoesTiles = ``;

for (let i = 0; i < dominoes.length; i++) {
    const sideA = dominoes[i].getSideA();
    const sideB = dominoes[i].getSideB();
    const topDots = sideA ? `dot-${sideA}` : '';
    const bottomDots = sideB ? `dot-${sideB}` : '';
    const topDotList = sideA ? `<span class="dot"></span>`.repeat(sideA) : '';
    const bottomDotList = sideB ? `<span class="dot"></span>`.repeat(sideB) : '';
  dominoesTiles += `
        <div class="domino-tile">
            <div class="tile-top ${topDots}">
                ${topDotList}
            </div>
            <div class="tile-divider"></div>
            <div class="tile-bottom ${bottomDots}">
                ${bottomDotList}
            </div>
        </div>
    `;
}

dominoContainer.innerHTML = dominoesTiles;