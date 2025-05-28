  //create a canvas to display clock
  let canvas = new Canvas(100, 100);
  const red = new Color(0.8, 0.3, 0);

  const pointCount = 24;

  const clockRad = 2 * Math.PI / pointCount;

  const radius = 20;
  
  //loop through 12 points, position and rotate them, map them to the canvas.
  for (let i = 0; i < pointCount; i++) {
      let clockPoint = new Point(0, radius, 0);
      console.log("clockPoint is point? ", (clockPoint instanceof Point));

      rotMat = rotationMatrix_Z(clockRad * i);

      console.log("rotation mat? ", (rotMat.toString()));

      console.log("clockPoint.x? ", (clockPoint.x));
      //next, multiply it by a rotation Z matrix, by (clockRad * i) radians
      clockPoint = rotMat.pointMultiply(clockPoint);
      console.log("clockPoint is point? ", (clockPoint instanceof Point));
      console.log("clockPoint.x? ", (clockPoint.x));

      //map to canvas coordinates
      const canvasX = Math.max(Math.min(Math.round(clockPoint.x + canvas.width / 2), canvas.width), 0);
      const canvasY = Math.max(Math.min(Math.round(clockPoint.y + canvas.height / 2), canvas.width), 0);

      //write position to pixel on canvas
      canvas.writePixel(canvasX, canvasY, red);

  }

  //Canvas to PPM String
  let output = canvas.toPPMString();

  //Output PPM String as file
  fs.writeFileSync('output/image.ppm', output, 'utf-8');
