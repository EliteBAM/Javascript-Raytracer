import Matrix4x4 from './matrix4x4';

export function translationMatrix(x, y, z) {
    return new Matrix4x4([
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1
    ]);
}

export function scalingMatrix(x, y, z) {
    return new Matrix4x4([
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    ]);
}

export function rotationMatrix_X(rad) {
    return new Matrix4x4([
        1, 0, 0, 1,
        0, Math.cos(rad), -Math.sin(rad), 0,
        0, Math.sin(rad), Math.cos(rad), 0,
        0, 0, 0, 1
    ]);
}

export function rotationMatrix_Y(rad) {
    return new Matrix4x4([
        Math.cos(rad), 0, Math.sin(rad), 0,
        0, 1, 0, 0,
        -Math.sin(rad), 0, Math.cos(rad), 0,
        0, 0, 0, 1
    ]);
}

export function rotationMatrix_Z(rad) {
    return new Matrix4x4([
        Math.cos(rad), -Math.sin(rad), 0, 0,
        Math.sin(rad), Math.cos(rad), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
}

export function shearingMatrix() { //must finish implementation
    return new Matrix4x4([

    ]);
}