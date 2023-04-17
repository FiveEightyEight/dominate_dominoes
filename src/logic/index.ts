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
    private favorableMove: number[];
    // private team: Team;

    constructor(id: number) {
        this.id = id;
        this.moves = [];
        this.favorableMove = [];
        // this.team = team;
    }

    getId(): number {
        return this.id;
    }

    getMoves(): Domino[] {
        return this.moves;
    }

    // getTeam(): Team {
    //     return this.team;
    // }
    addMove(domino: Domino): void {
        this.moves.push(domino);
    }
    addFavorableMove(number: number): void {
        this.favorableMove.push(number);
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
    rotation: 'right' | 'left' | 'none';
}
class Table {
    private table: TableDomino[];
    constructor() {
        this.table = [];
    }

    add(domino: Domino, player: Player, closestTileID: string): boolean {
        const sideA: number = domino.getSideA();
        const sideB: number = domino.getSideB();
        const newTile: TableDomino = {
            domino: domino,
            player: player,
            position: [sideA, sideB],
            id: domino.getID(),
            value: domino.getValue(),
            rotation: domino.isDouble() ? 'none' :'right',
        }
        if (this.table.length === 0) {
            this.table.push(newTile);
            return true;
        }
        const middle = Math.floor(this.table.length / 2);
        const titleLocation = this.table.findIndex((tile) => tile.id === closestTileID);
        const firstTile: TableDomino = this.table[0];
        const lastTile: TableDomino = this.table[this.table.length - 1];
        if (titleLocation < middle) {
            // Left Side
            if (firstTile.position[0] === sideA) {
                this.table.unshift({
                    ...newTile,
                    rotation: domino.isDouble() ? 'none' : 'left',
                    position: [sideB, sideA]
                });
                return true;
            } else if (firstTile.position[0] === sideB) {
                this.table.unshift({ ...newTile, rotation: domino.isDouble() ? 'none' : 'left', });
                return true;
            }
        } else {
            if (lastTile.position[1] === sideA) {
                this.table.push({ ...newTile, rotation: domino.isDouble() ? 'none' : 'left', });
                return true;
            } else if (lastTile.position[1] === sideB) {
                this.table.push({
                    ...newTile,
                    position: [sideB, sideA]
                });
                return true;
            }
        }
        return false;
    }

    getTable(): TableDomino[] {
        return this.table;
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
const player1: Player = new Player(1);
const table: Table = new Table();

for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
        dominoes.push(new Domino(i, j));
    }
}


// get element by class name domino-container
const dominoTable = document.querySelector('.top-left-2');
const rightSide = document.querySelector('.right');
const score = document.querySelector('.game-score-played');
const scoreRemaining = document.querySelector('.game-score-remaining')
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

type State = {
    selected: HTMLElement | null;
    total: number;
    currentScore: number;
    oldScore: number;
}

const gameHistory = [];

const state: State = {
    selected: null,
    total: 168,
    currentScore: 0,
    oldScore: 0,
}

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
        if (state.selected && state.selected !== dominoTile) {
            const previousTile = state?.selected;
            previousTile?.classList?.remove('selected');
        }
        if (dominoTile.classList.contains('selected')) {
            dominoTile.classList.remove('selected')
        } else {
            dominoTile.classList.add('selected')
            state.selected = dominoTile as HTMLElement;
        }
    }
});

function renderScore() {
    if (!score || !scoreRemaining) return;
    score.innerHTML = `Played: ${state.currentScore}`;
    scoreRemaining.innerHTML = `Remaining: ${state.total - state.currentScore}`;
}

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

dominoTable?.addEventListener('click', (e) => {
    if (!state.selected) return;
    const selectedDomino = state.selected as HTMLElement;
    const target = e.target as HTMLElement;
    const closestTile = target.closest('.domino-tile');
    const closestTileID = closestTile?.getAttribute('data-id');
    const domino = dominoes.find((domino) => domino.getID() === selectedDomino?.dataset?.id);
    if (!domino) return;
    const pieceAdded = table.add(domino, player1, closestTileID);
    if (pieceAdded) {
        gameHistory.push(state);
        selectedDomino.classList.remove('selected')
        selectedDomino.classList.add('played-tile');
        state.selected = null;
        renderTable();
        state.oldScore = state.currentScore;
        state.currentScore += domino.getValue();
        renderScore();
    }
});

function renderTable() {
    if (!dominoTable) return;
    const tableTiles = table.getTable();
    const tableTilesHTML = tableTiles.map((tile) => {
        const sideA = tile.domino.getSideA();
        const sideB = tile.domino.getSideB();
        const topDots = sideA ? `dot-${sideA}` : '';
        const bottomDots = sideB ? `dot-${sideB}` : '';
        const topDotList = sideA ? `<span class="dot"></span>`.repeat(sideA) : '';
        const bottomDotList = sideB ? `<span class="dot"></span>`.repeat(sideB) : '';
        const rotation = tile.rotation !== 'none' ? `domino-rotate-${tile.rotation}` : '';
        const rotatedSize = rotation ? 'domino-rotate-size' : '';
        const id = tile.domino.getID();
        return `
            <div class="${rotatedSize}">
                <div class="domino-tile ${rotation}" data-id=${id}>
                    <div class="tile-top ${topDots}">
                        ${topDotList}
                    </div>
                    <div class="tile-divider"></div>
                    <div class="tile-bottom ${bottomDots}">
                        ${bottomDotList}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    dominoTable.innerHTML = tableTilesHTML;
}

// Execute
renderScore();
renderRightSide();