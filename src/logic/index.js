var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Domino = /** @class */ (function () {
    function Domino(sideA, sideB) {
        this.sideA = sideA;
        this.sideB = sideB;
        this.value = sideA + sideB;
        this.id = "".concat(sideA, "|").concat(sideB);
    }
    Domino.prototype.getSideA = function () {
        return this.sideA;
    };
    Domino.prototype.getSideB = function () {
        return this.sideB;
    };
    Domino.prototype.getValue = function () {
        return this.value;
    };
    Domino.prototype.isDouble = function () {
        return this.sideA === this.sideB;
    };
    Domino.prototype.toString = function () {
        return "[".concat(this.sideA, "|").concat(this.sideB, "]");
    };
    Domino.prototype.getID = function () {
        return this.id;
    };
    return Domino;
}());
var Team = /** @class */ (function () {
    function Team(player1, player2) {
        this.players = [player1, player2];
    }
    Team.prototype.getPlayers = function () {
        return this.players;
    };
    return Team;
}());
var Player = /** @class */ (function () {
    // private team: Team;
    function Player(id) {
        this.id = id;
        this.moves = [];
        this.favorableMove = [];
        // this.team = team;
    }
    Player.prototype.getId = function () {
        return this.id;
    };
    Player.prototype.getMoves = function () {
        return this.moves;
    };
    // getTeam(): Team {
    //     return this.team;
    // }
    Player.prototype.addMove = function (domino) {
        this.moves.push(domino);
    };
    Player.prototype.addFavorableMove = function (number) {
        this.favorableMove.push(number);
    };
    Player.prototype.play = function (domino) {
        this.moves.push(domino);
    };
    return Player;
}());
var Table = /** @class */ (function () {
    function Table() {
        this.table = [];
    }
    Table.prototype.add = function (domino, player) {
        var sideA = domino.getSideA();
        var sideB = domino.getSideB();
        var newTile = {
            domino: domino,
            player: player,
            position: [sideA, sideB],
            id: domino.getID(),
            value: domino.getValue(),
            rotation: domino.isDouble() ? 'none' : 'right',
        };
        if (this.table.length === 0) {
            this.table.push(newTile);
            return true;
        }
        var firstTile = this.table[0];
        var lastTile = this.table[this.table.length - 1];
        if (firstTile.position[0] === sideA) {
            this.table.unshift(__assign(__assign({}, newTile), { rotation: domino.isDouble() ? 'none' : 'left', position: [sideB, sideA] }));
            return true;
        }
        else if (firstTile.position[0] === sideB) {
            this.table.unshift(__assign(__assign({}, newTile), { rotation: domino.isDouble() ? 'none' : 'left' }));
            return true;
        }
        else if (lastTile.position[1] === sideA) {
            this.table.push(__assign(__assign({}, newTile), { rotation: domino.isDouble() ? 'none' : 'right' }));
            return true;
        }
        else if (lastTile.position[1] === sideB) {
            this.table.push(__assign(__assign({}, newTile), { position: [sideB, sideA] }));
            return true;
        }
        return false;
    };
    Table.prototype.getTable = function () {
        return this.table;
    };
    Table.prototype.getTableValue = function () {
        return this.table.reduce(function (acc, tile) {
            return acc + tile.value;
        }, 0);
    };
    return Table;
}());
// Create teams and players
// const team1: Team = new Team(new Player(1, team1), new Player(3, team1));
// const team2: Team = new Team(new Player(2, team2), new Player(4, team2));
// const players: Player[] = [...team1.getPlayers(), ...team2.getPlayers()];
// Separate variable to store Player 1's hand
var player1Hand = [];
var tileElements = {};
var dominoes = [];
var player1 = new Player(1);
var table = new Table();
for (var i = 0; i <= 6; i++) {
    for (var j = i; j <= 6; j++) {
        dominoes.push(new Domino(i, j));
    }
}
// get element by class name domino-container
var dominoTable = document.querySelector('.top-left-2');
var rightSide = document.querySelector('.right');
var score = document.querySelector('.game-score-payed');
var scoreRemaining = document.querySelector('.game-score-remaining');
var dominoesTiles = "";
var gameHistory = [];
var state = {
    selected: null,
    total: 168,
    currentScore: 0,
    oldScore: 0,
};
// function setGameState(state: GameState, key) {
// }
// ------- SETUP --------->
for (var i = 0; i < dominoes.length; i++) {
    var sideA = dominoes[i].getSideA();
    var sideB = dominoes[i].getSideB();
    var topDots = sideA ? "dot-".concat(sideA) : '';
    var bottomDots = sideB ? "dot-".concat(sideB) : '';
    var topDotList = sideA ? "<span class=\"dot\"></span>".repeat(sideA) : '';
    var bottomDotList = sideB ? "<span class=\"dot\"></span>".repeat(sideB) : '';
    var id = dominoes[i].getID();
    tileElements[id] = "\n        <div>\n        <div class=\"domino-tile\" data-id=".concat(id, ">\n            <div class=\"tile-top ").concat(topDots, "\">\n                ").concat(topDotList, "\n            </div>\n            <div class=\"tile-divider\"></div>\n            <div class=\"tile-bottom ").concat(bottomDots, "\">\n                ").concat(bottomDotList, "\n            </div>\n        </div>\n        </div>\n    ");
}
rightSide === null || rightSide === void 0 ? void 0 : rightSide.addEventListener('click', function (e) {
    var _a;
    var target = e.target;
    var dominoTile = target.closest('.domino-tile');
    if (dominoTile) {
        if (state.selected && state.selected !== dominoTile) {
            var previousTile = state === null || state === void 0 ? void 0 : state.selected;
            (_a = previousTile === null || previousTile === void 0 ? void 0 : previousTile.classList) === null || _a === void 0 ? void 0 : _a.remove('selected');
        }
        if (dominoTile.classList.contains('selected')) {
            dominoTile.classList.remove('selected');
        }
        else {
            dominoTile.classList.add('selected');
            state.selected = dominoTile;
        }
    }
});
function renderScore() {
    if (!score || !scoreRemaining)
        return;
    score.innerHTML = "Played: ".concat(state.currentScore);
    scoreRemaining.innerHTML = "Remaining: ".concat(state.total - state.currentScore);
}
function renderRightSide() {
    if (!rightSide)
        return;
    var _loop_1 = function (i) {
        var rowToRender = dominoes.filter(function (domino) { return domino.getSideB() === i; });
        for (var j = 0; j < rowToRender.length; j++) {
            var sideA = rowToRender[j].getSideA();
            var sideB = rowToRender[j].getSideB();
            var topDots = sideA ? "dot-".concat(sideA) : '';
            var bottomDots = sideB ? "dot-".concat(sideB) : '';
            var topDotList = sideA ? "<span class=\"dot\"></span>".repeat(sideA) : '';
            var bottomDotList = sideB ? "<span class=\"dot\"></span>".repeat(sideB) : '';
            var id = rowToRender[j].getID();
            rightSide.innerHTML += "\n            <div>\n            <div class=\"domino-tile\" data-id=".concat(id, ">\n                <div class=\"tile-top ").concat(topDots, "\">\n                    ").concat(topDotList, "\n                </div>\n                <div class=\"tile-divider\"></div>\n                <div class=\"tile-bottom ").concat(bottomDots, "\">\n                    ").concat(bottomDotList, "\n                </div>\n            </div>\n            </div>\n            ");
        }
        var row = rowToRender.length;
        rightSide.innerHTML += "\n            <div id=\"cell-".concat(row, "\">\n            </div>\n        ");
    };
    for (var i = 0; i < 7; i++) {
        _loop_1(i);
    }
}
dominoTable === null || dominoTable === void 0 ? void 0 : dominoTable.addEventListener('click', function (e) {
    if (!state.selected)
        return;
    var target = state.selected;
    var domino = dominoes.find(function (domino) { var _a; return domino.getID() === ((_a = target === null || target === void 0 ? void 0 : target.dataset) === null || _a === void 0 ? void 0 : _a.id); });
    if (!domino)
        return;
    var pieceAdded = table.add(domino, player1);
    if (pieceAdded) {
        gameHistory.push(state);
        target.classList.remove('selected');
        target.classList.add('played-tile');
        state.selected = null;
        renderTable();
        state.currentScore += domino.getValue();
        renderScore();
    }
});
function renderTable() {
    if (!dominoTable)
        return;
    var tableTiles = table.getTable();
    var tableTilesHTML = tableTiles.map(function (tile) {
        var sideA = tile.domino.getSideA();
        var sideB = tile.domino.getSideB();
        var topDots = sideA ? "dot-".concat(sideA) : '';
        var bottomDots = sideB ? "dot-".concat(sideB) : '';
        var topDotList = sideA ? "<span class=\"dot\"></span>".repeat(sideA) : '';
        var bottomDotList = sideB ? "<span class=\"dot\"></span>".repeat(sideB) : '';
        var rotation = tile.rotation !== 'none' ? "domino-rotate-".concat(tile.rotation) : '';
        var rotatedSize = rotation ? 'domino-rotate-size' : '';
        var id = tile.domino.getID();
        return "\n            <div class=\"".concat(rotatedSize, "\">\n            <div class=\"domino-tile ").concat(rotation, "\" data-id=").concat(id, ">\n                <div class=\"tile-top ").concat(topDots, "\">\n                    ").concat(topDotList, "\n                </div>\n                <div class=\"tile-divider\"></div>\n                <div class=\"tile-bottom ").concat(bottomDots, "\">\n                    ").concat(bottomDotList, "\n                </div>\n            </div>\n            </div>\n        ");
    }).join('');
    dominoTable.innerHTML = tableTilesHTML;
}
// Execute
renderScore();
renderRightSide();
