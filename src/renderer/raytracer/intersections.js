function Intersections(intersections) {
    this.intersections = intersections;
}

Intersections.prototype.getHit = function () {
    
    let closest = null;
    let minDistance = Number.MAX_VALUE; //might break in uncannily large distances / scenes

    //I tried to minimize branching here
    for (let i = 0; i < this.intersections.length; i++) {
        const t = this.intersections[i].t;
        const use = +(t >= 0 && t < minDistance);
        minDistance = use * t + (1 - use) * minDistance;
        closest = use ? this.intersections[i] : closest;
    }

    return closest;
}

export default Intersections;