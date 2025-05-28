function Ray(origin, direction) {
    this.origin = origin;
    this.direction = direction;
}


Ray.prototype.position = function (t) {
    return this.origin.add(this.direction.scalarMult(t));
}

Ray.prototype.transform = function(matrix) {
    return new Ray(this.origin.transform(matrix), this.direction.transform(matrix));
}

export default Ray;