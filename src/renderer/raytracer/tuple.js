const tuple = {

    add(other) { //takes in data property
        const thisdat = this.data;
        const otherdat = other.data;

        return new this.constructor(
            thisdat[0] + otherdat[0],
            thisdat[1] + otherdat[1],
            thisdat[2] + otherdat[2]
        );
    },

    subtract(other) { //takes in data property
        const thisdat = this.data;
        const otherdat = other.data;

        console.log("this object's data: ", thisdat[0], ", ", thisdat[1], ", ", thisdat[2]);
        console.log("other object's data: ", otherdat[0], ", ", otherdat[1], ", ", otherdat[2]);

        return new this.constructor(
            thisdat[0] - otherdat[0],
            thisdat[1] - otherdat[1],
            thisdat[2] - otherdat[2]
        );
    },

    negate() { //operates on the Float32Array of calling object
        const data = this.data;

        return new this.constructor(
            -data[0],
            -data[1],
            -data[2]
        );
    },

    scalarMult(scalar) { //operates on the Float32Array of calling object
        const data = this.data;

        return new this.constructor(
            data[0] * scalar,
            data[1] * scalar,
            data[2] * scalar
        );
    },

    scalarDiv(scalar) { //operates on the Float32Array of calling object
        const data = this.data;

        return new this.constructor(
            data[0] / scalar,
            data[1] / scalar,
            data[2] / scalar
        );
    },

    // dot (other) {
    //     return this.data[0] * other.data[0] + this.data[1] * other.data[1] + this.data[2] * other.data[2] + this.data[3] * other.data[3];
    // },
    //dot product should only be on vector class, because operation between two points should return a vector

    magnitude() {
        return Math.sqrt(this.data[0]**2 + this.data[1]**2 + this.data[2]**2 + this.data[3]**2)
    },

    normalize() { //operates on the Float32Array of calling object
        const magnitude = this.magnitude();
        if (magnitude === 0) return this;
        return this.scalarDiv(magnitude);
    }

};

export default tuple;