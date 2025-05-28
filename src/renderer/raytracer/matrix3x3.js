import matrix from './matrix';
import Matrix2x2 from './matrix2x2';

function Matrix3x3(elements) {
    this.size = 3;
    this.elements = elements || new Float32Array(9).fill(0);
}

Matrix3x3.prototype = Object.create(matrix);
Matrix3x3.prototype.constructor = Matrix3x3;


Matrix3x3.prototype.subMatrix = function(removeRowIndex, removeColIndex) {
    // hardcoded to avoid branching for performance
    switch (`${removeRowIndex}${removeColIndex}`) {
        case '00': return new Matrix2x2([this.getElement(1, 1), this.getElement(1, 2), this.getElement(2, 1), this.getElement(2, 2)]);
        case '01': return new Matrix2x2([this.getElement(1, 0), this.getElement(1, 2), this.getElement(2, 0), this.getElement(2, 2)]);
        case '02': return new Matrix2x2([this.getElement(1, 0), this.getElement(1, 1), this.getElement(2, 0), this.getElement(2, 1)]);
    
        case '10': return new Matrix2x2([this.getElement(0, 1), this.getElement(0, 2), this.getElement(2, 1), this.getElement(2, 2)]);
        case '11': return new Matrix2x2([this.getElement(0, 0), this.getElement(0, 2), this.getElement(2, 0), this.getElement(2, 2)]);
        case '12': return new Matrix2x2([this.getElement(0, 0), this.getElement(0, 1), this.getElement(2, 0), this.getElement(2, 1)]);
    
        case '20': return new Matrix2x2([this.getElement(0, 1), this.getElement(0, 2), this.getElement(1, 1), this.getElement(1, 2)]);
        case '21': return new Matrix2x2([this.getElement(0, 0), this.getElement(0, 2), this.getElement(1, 0), this.getElement(1, 2)]);
        case '22': return new Matrix2x2([this.getElement(0, 0), this.getElement(0, 1), this.getElement(1, 0), this.getElement(1, 1)]);
    }
    
    throw new Error('Invalid row/col');
}

Matrix3x3.prototype.minor = function (row, col) {
    return this.subMatrix(row, col).determinant();
}

Matrix3x3.prototype.cofactor = function (row, col) {
    return (row + col) % 2 == 0 ? this.minor(row, col) : -this.minor(row, col);
}

Matrix3x3.prototype.determinant = function () {
    return this.getElement(0, 0) * this.cofactor(0, 0) + this.getElement(0, 1) * this.cofactor(0, 1) + this.getElement(0, 2) * this.cofactor(0, 2);
}

Matrix3x3.prototype.toString = function() {
    return `[${this.getElement(0, 0)}, ${this.getElement(0, 1)}, ${this.getElement(0, 2)}]\n
            [${this.getElement(1, 0)}, ${this.getElement(1, 1)}, ${this.getElement(1, 2)}]\n
            [${this.getElement(2, 0)}, ${this.getElement(2, 1)}, ${this.getElement(2, 2)}]`;
}

export default Matrix3x3;