//tuples
import Vector from './raytracer/vector';
import Point from './raytracer/point';
import Canvas from './raytracer/canvas';
import Color from './raytracer/color';

//matrices
import Matrix4x4 from './raytracer/matrix4x4';
import Matrix2x2 from './raytracer/matrix2x2';
import Matrix3x3 from './raytracer/matrix3x3';

//transformations
import {
    translationMatrix,
    scalingMatrix,
    rotationMatrix_X,
    rotationMatrix_Y,
    rotationMatrix_Z,
    shearingMatrix
} from './raytracer/transformations';

//Ray
import Ray from './raytracer/ray';

//Sphere
import Sphere from './raytracer/sphere';

//Intersections
import Intersection from './raytracer/intersection';
import Intersections from './raytracer/intersections';

//Materials
import PhongMaterial from './raytracer/phongmaterial';

//Lights
import PointLight from './raytracer/pointlight';


console.log("passed imports!");


let canvas;
let ctx;
//set up the canvas
/** @type {HTMLCanvasElement} */

window.onload = function() {
    canvas = document.getElementById("viewport");
    ctx = canvas.getContext('2d');
    resizeCanvas();
}

//window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set style size to match the actual drawing size
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    // Clear & redraw
    rayTraceSphere();
}

function testNormals() {
    let s = new Sphere(1);
    let rotation = rotationMatrix_Z(Math.PI * Math.sqrt(5));
    let scale = scalingMatrix(1, 0.5, 1);
    let transformMat = scale.matrixMultiply(rotation);
    s.transform = transformMat;

    let n = s.normalAt(new Point(0, 2 * Math.sqrt(2), 2 * Math.sqrt(2)));
    console.log("normal vector should be 0, 0.97014, -0.24254 ---> ", n.x, ", ", n.y, ", ", n.z);
}

function testReflections() {
    let v = new Vector(0, -1, 0);   
    let n = new Vector(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
    let r = v.reflect(n);
    console.log("r = 1, 1, 0 ---> ", r.x, ", ", r.y, ", ", r.z);
}

function testLighting() {
    let eye = new Vector(0, 0, -1);
    let normal = new Vector(0, 0, -1);
    let light = new PointLight(new Point(0, 0, 10), new Color(1, 1, 1))
    let m = new PhongMaterial();
    let r = m.lightPixel(light, new Point(0, 0, 0), eye, normal);
    console.log("r = ", r.r, ", ", r.g, ", ", r.b);
}


function drawClockToCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //running some tests
    //create a canvas to display clock
    let buffer = new Canvas(100, 100);
    const red = new Color(0.8, 0.3, 0);

    const pointCount = 24;

    const clockRad = 2 * Math.PI / pointCount;

    const radius = 20;

    //loop through 12 points, position and rotate them, map them to the buffer.
    for (let i = 0; i < pointCount; i++) {
        let clockPoint = new Point(0, radius, 0);
        console.log("clockPoint is point? ", (clockPoint instanceof Point));

        let rotMat = rotationMatrix_Z(clockRad * i);

        console.log("rotation mat? ", (rotMat.toString()));

        console.log("clockPoint.x? ", (clockPoint.x));
        //next, multiply it by a rotation Z matrix, by (clockRad * i) radians
        clockPoint = rotMat.pointMultiply(clockPoint);
        console.log("clockPoint is point? ", (clockPoint instanceof Point));
        console.log("clockPoint.x? ", (clockPoint.x));

        //map to buffer coordinates
        const bufferX = Math.max(Math.min(Math.round(clockPoint.x + buffer.width / 2), buffer.width), 0);
        const bufferY = Math.max(Math.min(Math.round(clockPoint.y + buffer.height / 2), buffer.width), 0);

        //write position to pixel on buffer
        buffer.writePixel(bufferX, bufferY, red);

    }

    let imageDataBuffer = new Uint8ClampedArray(100 * 100 * 4);

    for (let y = 0; y < 100; y++) {
        for (let x = 0; x < 100; x++) {
            const idx = (y * 100 + x) * 4;
            const color = buffer.pixels[y][x];  // assuming buffer.pixels[y][x] is a Color

            imageDataBuffer[idx] = Math.min(255, Math.max(0, Math.round(color.r * 255)));;
            imageDataBuffer[idx + 1] = Math.min(255, Math.max(0, Math.round(color.g * 255)));
            imageDataBuffer[idx + 2] = Math.min(255, Math.max(0, Math.round(color.b * 255)));
            imageDataBuffer[idx + 3] = 255; // full opacity
        }
    }
    let imageData = new ImageData(imageDataBuffer, 100, 100);

    ctx.putImageData(imageData, 0, 0);
}

function rayTraceSphere() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    //Set Up Scene
    let rayOrigin = new Point(0, 0, -5);
    let wall_z = 10;
    let wall_size = 7;
    let canvas_pixels = canvas.width;
    let pixel_size = wall_size / canvas_pixels;
    let half = wall_size / 2;

    let raytracerCanvas = new Canvas(canvas_pixels, canvas_pixels);
    const red = new Color(0, 0.6, 1);

    //CREATE SPHERE
    let sphere = new Sphere(1); //unit sphere at origin with ID: 1

    //Set Sphere Transform
    let scaleMat = scalingMatrix(1, 0.7, 1.35);
    let rotY = rotationMatrix_Y(.2);
    let rotZ = rotationMatrix_Z(Math.PI/2 * 1.5);
    sphere.transform = rotY.matrixMultiply(rotZ).matrixMultiply(scaleMat);

    //Set Sphere Material
    sphere.material = new PhongMaterial();
    sphere.material.color = red;//new Color(1, 0.2, 1);

    //CREATE LIGHT
    let light = new PointLight(new Point(-10, 10, -10), new Color(1, 1, 1));


    //Shoot Rays from origin to virtual pixel wall
    for (let y = 0; y < raytracerCanvas.height; y++) {
        let world_y = half - pixel_size * y;
        for (let x = 0; x < raytracerCanvas.width; x++) {

            let world_x = -half + pixel_size * x;

            let position = new Point(world_x, world_y, wall_z);

            let ray = new Ray(rayOrigin, position.subtract(rayOrigin).normalize());

            let hit = sphere.intersect(ray).getHit();

            if(hit != null) {
                //get hit point
                let worldPoint = ray.position(hit.t);

                //get normal at point on the hit object
                let normal = hit.object.normalAt(worldPoint);

                //get eye vector
                let eye = ray.direction.negate();

                //calculate the final color of the pixel using phong lighting model
                let pixelColor = hit.object.material.lightPixel(light, worldPoint, eye, normal);
                
                //write position to pixel on buffer
                raytracerCanvas.writePixel(x, y, pixelColor);
            }


        }
    }

    let imageData = new ImageData(raytracerCanvas.toPixelBuffer(), raytracerCanvas.width, raytracerCanvas.height);

    ctx.putImageData(imageData, 0, 0);
}