class Domino {
    private sideA: number;
    private sideB: number;
    private value: number;
    private id: string;

    constructor(sideA: number, sideB: number) {
        this.sideA = sideA;
        this.sideB = sideB;
        this.value = sideA + sideB;
        this.id = `${sideA}|${sideB}`;
    }

    getSideA(): number {
        return this.sideA;
    }

    getSideB(): number {
        return this.sideB;
    }

    getValue(): number {
        return this.value;
    }

    isDouble(): boolean {
        return this.sideA === this.sideB;
    }

    toString(): string {
        return `[${this.sideA}|${this.sideB}]`;
    }
    getID(): string {
        return this.id;
    }
}

class Team {
    private players: Player[];

    constructor(player1: Player, player2: Player) {
        this.players = [player1, player2];
    }

    getPlayers(): Player[] {
        return this.players;
    }
}

class Player {
    private id: number;
    private moves: Domino[];
    private team: Team;

    constructor(id: number, team: Team) {
        this.id = id;
        this.moves = [];
        this.team = team;
    }

    getId(): number {
        return this.id;
    }

    getMoves(): Domino[] {
        return this.moves;
    }

    getTeam(): Team {
        return this.team;
    }

    play(domino: Domino): void {
        this.moves.push(domino);
    }

    // predictOpponentMoves(remainingDominoes: Domino[], currentPlayerHand: Domino[]): Domino[] {
    // Implement prediction logic based on the player's move history
    // }
}

type TableDomino = {
    domino: Domino;
    player: Player;
    //           [played, in play] 
    // position: [number, number];
    position: number[];
    id: string;
    value: number;
}
class Table {
    private table: TableDomino[];
    constructor() {
        this.table = [];
    }

    add(domino: Domino, player: Player): void {
        const sideA: number = domino.getSideA();
        const sideB: number = domino.getSideB();
        const newTile: TableDomino = {
            domino: domino,
            player: player,
            position: [sideA, sideB],
            id: domino.getID(),
            value: domino.getValue()
        }
        if (this.table.length === 0) {
            this.table.push(newTile);
            return;
        }
        const firstTile: TableDomino = this.table[0];
        const lastTile: TableDomino = this.table[this.table.length - 1];

        if (firstTile.position[0] === sideA) {
            this.table.unshift(newTile);
            return;
        } else if (firstTile.position[0] === sideB) {
            this.table.unshift({
                ...newTile,
                position: [sideB, sideA]
            });
            return;
        } else if (lastTile.position[1] === sideA) {
            this.table.push(newTile);
            return;
        } else if (lastTile.position[1] === sideB) {
            this.table.push({
                ...newTile,
                position: [sideB, sideA]
            });
            return;
        }
    }

    getTableValue(): number {
        return this.table.reduce((acc, tile) => {
            return acc + tile.value;
        }, 0);
    }

}

// Create teams and players
// const team1: Team = new Team(new Player(1, team1), new Player(3, team1));
// const team2: Team = new Team(new Player(2, team2), new Player(4, team2));

// const players: Player[] = [...team1.getPlayers(), ...team2.getPlayers()];

// Separate variable to store Player 1's hand
const player1Hand: Domino[] = [];
type TilesElements = {
    [key: string]: string;
}
const tileElements: TilesElements = {};
const dominoes: Domino[] = [];

for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
        dominoes.push(new Domino(i, j));
    }
}


// get element by class name domino-container
const dominoTable = document.querySelector('.top-left-2');
const rightSide = document.querySelector('.right');
let dominoesTiles = ``;
// dominoTable.innerHTML = dominoesTiles;

// ------- GAME STATE --------->
// type GameState = {
//     rightSelectedTitle: string;
// }
// class GameState {
//     rightSelectedTile: string;
//     constructor() {
//         this.rightSelectedTile = '';
//     }

//     setRightSelectedTile(title: string) {
//         this.rightSelectedTile = title;
//     }
// }
// const state: GameState = {
//     rightSelectedTile: '',

// };

// function setGameState(state: GameState, key) {

// }

// ------- SETUP --------->
for (let i = 0; i < dominoes.length; i++) {
    const sideA = dominoes[i].getSideA();
    const sideB = dominoes[i].getSideB();
    const topDots = sideA ? `dot-${sideA}` : '';
    const bottomDots = sideB ? `dot-${sideB}` : '';
    const topDotList = sideA ? `<span class="dot"></span>`.repeat(sideA) : '';
    const bottomDotList = sideB ? `<span class="dot"></span>`.repeat(sideB) : '';
    const id = dominoes[i].getID();
    tileElements[id] = `
        <div class="domino-tile" data-id=${id}>
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

rightSide?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const dominoTile = target.closest('.domino-tile');
    if (dominoTile) {
        if (dominoTile.classList.contains('selected')) {
            dominoTile.classList.remove('selected')
        } else {
            dominoTile.classList.add('selected')
        }
    }
});

function renderRightSide() {
    if (!rightSide) return;
    for (let i = 0; i < 7; i++) {
        const rowToRender = dominoes.filter((domino) => domino.getSideB() === i);
        for (let j = 0; j < rowToRender.length; j++) {
            const sideA = rowToRender[j].getSideA();
            const sideB = rowToRender[j].getSideB();
            const topDots = sideA ? `dot-${sideA}` : '';
            const bottomDots = sideB ? `dot-${sideB}` : '';
            const topDotList = sideA ? `<span class="dot"></span>`.repeat(sideA) : '';
            const bottomDotList = sideB ? `<span class="dot"></span>`.repeat(sideB) : '';
            const id = rowToRender[j].getID();

            rightSide.innerHTML += `
            <div class="domino-tile" data-id=${id}>
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
        const row = rowToRender.length;
        rightSide.innerHTML += `
            <div id="cell-${row}">
            </div>
        `;

    }
}
renderRightSide();