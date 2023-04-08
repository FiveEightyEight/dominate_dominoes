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
console.log(dominoes);
