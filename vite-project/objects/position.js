import * as THREE from 'three';
import * as helpers from '../utility/helpers.js';

export function randomlyPositionObjects(element) {
    const isArray = helpers.isArrayObject(element);
    if (isArray) {
        element.forEach(element => {
          randomlyPositionObject(element);
        });
        return
      }
      randomlyPositionObject(element);
}

export function randomlyPositionObject(element) {
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    element.position.set(x, y, z);
}