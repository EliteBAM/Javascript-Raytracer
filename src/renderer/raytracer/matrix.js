const matrix = {

    getElement(row, col) {
        return this.elements[row * this.size + col];
    },
    
    setElement(row, col, value) {
        this.elements[row * this.size + col] = value;
    },

    elementwiseMult(value) {
        for(let i = 0; i < this.elements.length; i++) {
            this.elements[i] *= value;
        }
    },

    elementwiseDiv(value) {
        for(let i = 0; i < this.elements.length; i++) {
            this.elements[i] /= value;
        }
    },
};

export default matrix;