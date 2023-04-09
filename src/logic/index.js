var Domino = /** @class */ (function () {
    function Domino(sideA, sideB) {
        this.sideA = sideA;
        this.sideB = sideB;
    }
    Domino.prototype.getSideA = function () {
        return this.sideA;
    };
    Domino.prototype.getSideB = function () {
        return this.sideB;
    };
    Domino.prototype.isDouble = function () {
        return this.sideA === this.sideB;
    };
    Domino.prototype.toString = function () {
        return "[".concat(this.sideA, "|").concat(this.sideB, "]");
    };
    return Domino;
}());
var dominoes = [];
for (var i = 0; i <= 6; i++) {
    for (var j = i; j <= 6; j++) {
        dominoes.push(new Domino(i, j));
    }
}
// get element by class name domino-container
var dominoContainer = document.querySelector('.domino-container');
var dominoesTiles = "";
for (var i = 0; i < dominoes.length; i++) {
    var sideA = dominoes[i].getSideA();
    var sideB = dominoes[i].getSideB();
    var topDots = sideA ? "dot-".concat(sideA) : '';
    var bottomDots = sideB ? "dot-".concat(sideB) : '';
    var topDotList = sideA ? "<span class=\"dot\"></span>".repeat(sideA) : '';
    var bottomDotList = sideB ? "<span class=\"dot\"></span>".repeat(sideB) : '';
    dominoesTiles += "\n        <div class=\"domino-tile\">\n            <div class=\"tile-top ".concat(topDots, "\">\n                ").concat(topDotList, "\n            </div>\n            <div class=\"tile-divider\"></div>\n            <div class=\"tile-bottom ").concat(bottomDots, "\">\n                ").concat(bottomDotList, "\n            </div>\n        </div>\n    ");
}
dominoContainer.innerHTML = dominoesTiles;
