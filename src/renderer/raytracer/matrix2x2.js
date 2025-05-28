import matrix from './matrix';

function Matrix2x2(elements) {
    this.size = 2;
    this.elements = elements || new Float32Array(4).fill(0);
}

Matrix2x2.prototype = Object.create(matrix);
Matrix2x2.prototype.constructor = Matrix2x2;

Matrix2x2.prototype.determinant = function () {
    return this.getElement(0, 0) * this.getElement(1, 1) - this.getElement(0, 1) * this.getElement(1, 0);
}

Matrix2x2.prototype.toString = function() {
    return `[${this.getElement(0, 0)}, ${this.getElement(0, 1)}]\n
            [${this.getElement(1, 0)}, ${this.getElement(1, 1)}]`;
}

export default Matrix2x2;