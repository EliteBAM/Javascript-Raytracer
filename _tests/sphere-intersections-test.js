  //sphere intersection tests

  let r = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1));
  console.log("a ray is created at point: " + r.origin.x + ", " + r.origin.y + ", " + r.origin.z + " in direction: " + r.direction.x + ", " + r.direction.y + ", " + r.direction.z);

  let s = new Sphere(1);
  console.log("a sphere is created at point: ", s.origin.x, ", ", s.origin.y, ", ", s.origin.z, " of radius: ", s.radius);

  let xs = s.intersect(r);
  console.log("intersections array is length: ", xs.length);
  console.log("intersection 1 = 5?: ", xs[0]);
  console.log("intersection 2 = 5?: ", xs[1]);

  //getHit tests

  let i1 = new Intersection(5, s);
  console.log("hit 1 = ", i1.t);

  let i2 = new Intersection(7, s);
  console.log("hit 2 = ", i2.t);

  let i3 = new Intersection(-3, s);
  console.log("hit 3 = ", i3.t);

  let i4 = new Intersection(2, s);
  console.log("hit 4 = ", i4.t);
  
  let is = new Intersections([i1, i2, i3, i4]);
  console.log("the 'hit' of the interections is: ", is.getHit().t);