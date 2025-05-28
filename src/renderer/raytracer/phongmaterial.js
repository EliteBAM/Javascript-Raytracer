import Color from './color';

function PhongMaterial() {
    this.color = new Color(1, 1, 1);
    this.ambient = 0.1;
    this.diffuse = 0.9;
    this.specular = 0.9;
    this.shininess = 200;
}

PhongMaterial.prototype.lightPixel = function (light, point, eye, normal) {

    let effectiveColor = this.color.colorMult(light.intensity);

    let lightVector = light.position.subtract(point).normalize();
    let ambient = this.color.scalarMult(this.ambient);
    let lightDotNormal = lightVector.dot(normal);


    let diffuse;
    let specular;
    if(lightDotNormal < 0) {
        diffuse = new Color(0, 0, 0);
        specular = new Color(0, 0, 0);
    } else {
        diffuse = effectiveColor.scalarMult(this.diffuse * lightDotNormal);

        let reflectVector = lightVector.negate().reflect(normal);
        let reflectDotEye = reflectVector.dot(eye);
        if(reflectDotEye <= 0) {
            specular = new Color(0, 0, 0);
        } else {
            let factor = reflectDotEye ** this.shininess;
            specular = light.intensity.scalarMult(this.specular * factor);
        }
    }

    return ambient.add(diffuse).add(specular);
}

export default PhongMaterial;