import tuple from './tuple';

function Vector(x, y, z) {
    this.data = new Float32Array([x, y, z, 0]);
}

Vector.prototype = Object.create(tuple);
Vector.prototype.constructor = Vector;

Object.defineProperties(Vector.prototype, {
    x: { get() { return this.data[0]; }, set(v) { this.data[0] = v; } },
    y: { get() { return this.data[1]; }, set(v) { this.data[1] = v; } },
    z: { get() { return this.data[2]; }, set(v) { this.data[2] = v; } },
    w: { get() { return this.data[3]; }, set(v) { this.data[3] = v; } }
});

Vector.prototype.dot = function (other) {
    return this.data[0] * other.data[0] + this.data[1] * other.data[1] + this.data[2] * other.data[2] + this.data[3] * other.data[3];
};

Vector.prototype.cross = function (other) {
    return new Float32Array([
        this.data[1] * other.data[2] - this.data[2] * other.data[1],
        this.data[2] * other.data[0] - this.data[0] * other.data[2],
        this.data[0] * other.data[1] - this.data[1] * other.data[0],
        0
    ]);
};

Vector.prototype.transform = function (matrix) {
    return new Vector(
        //w would be 0 in all cases
        matrix.getElement(0, 0) * this.x + matrix.getElement(0, 1) * this.y + matrix.getElement(0, 2) * this.z + matrix.getElement(0, 3) * this.w,
        matrix.getElement(1, 0) * this.x + matrix.getElement(1, 1) * this.y + matrix.getElement(1, 2) * this.z + matrix.getElement(1, 3) * this.w,
        matrix.getElement(2, 0) * this.x + matrix.getElement(2, 1) * this.y + matrix.getElement(2, 2) * this.z + matrix.getElement(2, 3) * this.w
    );
};

Vector.prototype.reflect = function (normal) {
    return this.subtract(normal.scalarMult(2 * this.dot(normal)));
};

export default Vector;