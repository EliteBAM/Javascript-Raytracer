import Point from './point';
import Ray from './ray';
import Intersection from './intersection';
import Matrix4x4 from './matrix4x4';
import Intersections from './intersections';
import Vector from './vector';

function Sphere(id, material) {
    this.id = id;
    this.origin = new Point(0, 0, 0);
    this.radius = 1;

    this.transform = Matrix4x4.getIdentity();
    this.material = material;

    console.log("radius of sphere is " + this.radius);
}

Sphere.prototype.intersect = function(ray) {

    let transformedRay = ray.transform(this.transform.inverse());
    transformedRay.direction = transformedRay.direction.normalize();

    console.log("ray is a ray: ", transformedRay instanceof Ray);
    console.log("origin is a point: ", this.origin instanceof Point);


    let sphereToRay = transformedRay.origin.subtract(this.origin); //any operation between points returns a vector
    console.log("sphereToRay: "  + sphereToRay.x + ", " + sphereToRay.y + ", " + sphereToRay.z);

    let a = transformedRay.direction.dot(transformedRay.direction);
    console.log("a: "  + a);

    let b = 2 * transformedRay.direction.dot(sphereToRay);
    console.log("b: "  + b);

    let c = sphereToRay.dot(sphereToRay) - this.radius * this.radius;
    console.log("s2r dot: " + sphereToRay.dot(sphereToRay));
    console.log("c: "  + c);


    let discriminant = b**2 - 4 * a * c;
    console.log("discriminant: "  + discriminant);

    if (discriminant < 0) {
        console.log("intersection returning early-- no intersections")
        return new Intersections([]);
    }

    let t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    let t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

    return new Intersections([new Intersection(t1, this), new Intersection(t2, this)]);
}

Sphere.prototype.normalAt = function (worldPoint) {
    let objectPoint = worldPoint.transform(this.transform.inverse());
    let objectNormal = new Vector(objectPoint.x, objectPoint.y, objectPoint.z); //same thing as subtracting by origin?
    let worldNormal = objectNormal.transform(this.transform.inverse().transpose());
    worldNormal.w = 0;
    return worldNormal.normalize();
}

export default Sphere;