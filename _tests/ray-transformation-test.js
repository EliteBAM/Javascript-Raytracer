  console.log("TRANSLATION TEST \n\n");

  let r = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));

  console.log("ray origin: X: ", r.origin.x, " Y: ", r.origin.y, " Z: ", r.origin.z);
  console.log("ray direction: X: ", r.direction.x, " Y: ", r.direction.y, " Z: ", r.direction.z);

  let m = translationMatrix(3, 4, 5);
  console.log("m: " + "\n" + m.toString());

  let r2 = r.transform(m);

  console.log("transformed ray origin: X: ", r2.origin.x, " Y: ", r2.origin.y, " Z: ", r2.origin.z);
  console.log("transformed ray direction: X: ", r2.direction.x, " Y: ", r2.direction.y, " Z: ", r2.direction.z);

  console.log("SCALING TEST \n\n");

  let r3 = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));

  console.log("ray origin: X: ", r3.origin.x, " Y: ", r3.origin.y, " Z: ", r3.origin.z);
  console.log("ray direction: X: ", r3.direction.x, " Y: ", r3.direction.y, " Z: ", r3.direction.z);

  let m1 = scalingMatrix(2, 3, 4);
  console.log("m: " + "\n" + m1.toString());

  let r4 = r3.transform(m1);

  console.log("transformed ray origin: X: ", r4.origin.x, " Y: ", r4.origin.y, " Z: ", r4.origin.z);
  console.log("transformed ray direction: X: ", r4.direction.x, " Y: ", r4.direction.y, " Z: ", r4.direction.z);