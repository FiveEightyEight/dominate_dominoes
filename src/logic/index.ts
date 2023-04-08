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


console.log(dominoes);