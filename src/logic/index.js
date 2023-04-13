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
    function Player(id, team) {
        this.id = id;
        this.moves = [];
        this.team = team;
    }
    Player.prototype.getId = function () {
        return this.id;
    };
    Player.prototype.getMoves = function () {
        return this.moves;
    };
    Player.prototype.getTeam = function () {
        return this.team;
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
            value: domino.getValue()
        };
        if (this.table.length === 0) {
            this.table.push(newTile);
            return;
        }
        var firstTile = this.table[0];
        var lastTile = this.table[this.table.length - 1];
        if (firstTile.position[0] === sideA) {
            this.table.unshift(newTile);
            return;
        }
        else if (firstTile.position[0] === sideB) {
            this.table.unshift(__assign(__assign({}, newTile), { position: [sideB, sideA] }));
            return;
        }
        else if (lastTile.position[1] === sideA) {
            this.table.push(newTile);
            return;
        }
        else if (lastTile.position[1] === sideB) {
            this.table.push(__assign(__assign({}, newTile), { position: [sideB, sideA] }));
            return;
        }
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
for (var i = 0; i <= 6; i++) {
    for (var j = i; j <= 6; j++) {
        dominoes.push(new Domino(i, j));
    }
}
// get element by class name domino-container
var dominoTable = document.querySelector('.top-left-2');
var rightSide = document.querySelector('.right');
var dominoesTiles = "";
var state = {
    selected: null,
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
    tileElements[id] = "\n        <div class=\"domino-tile\" data-id=".concat(id, ">\n            <div class=\"tile-top ").concat(topDots, "\">\n                ").concat(topDotList, "\n            </div>\n            <div class=\"tile-divider\"></div>\n            <div class=\"tile-bottom ").concat(bottomDots, "\">\n                ").concat(bottomDotList, "\n            </div>\n        </div>\n    ");
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
            rightSide.innerHTML += "\n            <div class=\"domino-tile\" data-id=".concat(id, ">\n                <div class=\"tile-top ").concat(topDots, "\">\n                    ").concat(topDotList, "\n                </div>\n                <div class=\"tile-divider\"></div>\n                <div class=\"tile-bottom ").concat(bottomDots, "\">\n                    ").concat(bottomDotList, "\n                </div>\n            </div>\n            ");
        }
        var row = rowToRender.length;
        rightSide.innerHTML += "\n            <div id=\"cell-".concat(row, "\">\n            </div>\n        ");
    };
    for (var i = 0; i < 7; i++) {
        _loop_1(i);
    }
}
renderRightSide();
