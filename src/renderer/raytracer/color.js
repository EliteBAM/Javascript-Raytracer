import tuple from './tuple';

function Color(r, g, b) {
    this.data = new Float32Array([r, g, b, 0]);
}

Color.prototype = Object.create(tuple);
Color.prototype.constructor = Color;

Object.defineProperties(Color.prototype, {
    r: { get() { return this.data[0]; }, set(v) { this.data[0] = v; } },
    g: { get() { return this.data[1]; }, set(v) { this.data[1] = v; } },
    b: { get() { return this.data[2]; }, set(v) { this.data[2] = v; } }
});

Color.prototype.colorMult = function (other) {
    return new Color( this.r * other.r, 
                      this.g * other.g, 
                      this.b * other.b);
}

export default Color;