function Projectile(position, velocity) {
    this.position = position;
    this.velocity = velocity;
}

function Environment(grav, wind) {
    this.grav = grav;
    this.wind = wind;
}

function Tick(env, proj, canvas) {
    //move projectile
    proj.position.add(proj.velocity);
    console.log("new position -> X: " + proj.position.x + ", Y: " + proj.position.y + ", Z: " + proj.position.z);

    //update velocity
    proj.velocity.add(env.grav);
    proj.velocity.add(env.wind);

    let canvasX = Math.min(Math.max(Math.round(proj.position.x), 0), (canvas.width - 1));
    let canvasY = Math.min(Math.max(Math.round(canvas.height - proj.position.y), 0), (canvas.height - 1));

    console.log("Canvas X: " + canvasX);
    console.log("Canvas Y: " + canvasY);

    canvas.writePixel(
        canvasX,
        canvasY,
        new Color(0.8, 0.3, 0)
    );

    return new Projectile(proj.position, proj.velocity);
}

let initVelocity = new Vector(1, 1.8, 0);
initVelocity.normalize();
initVelocity.scalarMult(11.25);
let proj = new Projectile(new Point(0, 1, 0), initVelocity);
let env = new Environment(new Vector(0, -0.1, 0), new Vector(-0.01, 0, 0));

let canvas = new Canvas(900, 550);

let canvasX = Math.min(Math.max(Math.round(proj.position.x), 0), canvas.width - 1);
let canvasY = Math.min(Math.max(Math.round(canvas.height - proj.position.y), 0), canvas.height - 1);

console.log("Canvas X: " + canvasX);
console.log("Canvas Y: " + canvasY);

canvas.writePixel(
    canvasX,
    canvasY,
    new Color(0.8, 0.3, 0)
);

while(proj.position.y > 0) {
    proj = Tick(env, proj, canvas);
}

const ppmString = canvas.toPPMString();   // your P3 header + data
const filePath  = 'output/myImage.ppm';   // ← note the .ppm extension

fs.writeFile(filePath, ppmString, err => {
  if (err) {
    console.error('Error writing PPM:', err);
    return;
  }
  console.log('PPM file written to', filePath);
});