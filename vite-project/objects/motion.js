import * as helpers from '../utility/helpers.js';

export function rotateObjects(x, y, z, element) {
    const isArray = helpers.isArrayObject(element);
    if (isArray) {
        element.forEach(element => {
          rotateObject( x, y, z, element );
        });
        return
      }
      rotateObject( x, y, z, element );
}

export function rotateObject(x, y, z, element) {
    element.rotation.x += x;
    element.rotation.y += y;
    element.rotation.z += z;
}