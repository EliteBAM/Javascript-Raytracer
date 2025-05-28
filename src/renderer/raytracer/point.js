import tuple from './tuple';
import Vector from './vector';

function Point(x, y, z) {
    this.data = new Float32Array([x, y, z, 1]);
}

Point.prototype = Object.create(tuple);
Point.prototype.constructor = Point;

Object.defineProperties(Point.prototype, {
    x: { get() { return this.data[0]; }, set(v) { this.data[0] = v; } },
    y: { get() { return this.data[1]; }, set(v) { this.data[1] = v; } },
    z: { get() { return this.data[2]; }, set(v) { this.data[2] = v; } },
    w: { get() { return this.data[3]; }, set(v) { this.data[3] = v; } }
});

Point.prototype.add = function(other) {
    return new Vector(
        this.data[0] + other.data[0],
        this.data[1] + other.data[1],
        this.data[2] + other.data[2]
    );
};

Point.prototype.subtract = function(other) {
    return new Vector(
        this.data[0] - other.data[0],
        this.data[1] - other.data[1],
        this.data[2] - other.data[2]
    );
};

Point.prototype.transform = function (matrix) {
    return new Point(
        //w would be 0 in all cases
        matrix.getElement(0, 0) * this.x + matrix.getElement(0, 1) * this.y + matrix.getElement(0, 2) * this.z + matrix.getElement(0, 3) * this.w,
        matrix.getElement(1, 0) * this.x + matrix.getElement(1, 1) * this.y + matrix.getElement(1, 2) * this.z + matrix.getElement(1, 3) * this.w,
        matrix.getElement(2, 0) * this.x + matrix.getElement(2, 1) * this.y + matrix.getElement(2, 2) * this.z + matrix.getElement(2, 3) * this.w
    );
};

export default Point;