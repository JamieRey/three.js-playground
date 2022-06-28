import * as THREE from 'three';

export const lightHelper = new THREE.GridHelper(200, 50);

export function mapSceens(includedObjects, scene) {
    includedObjects.forEach(element => {
        const isArray = isArrayObject(element);
        if (isArray) {
            element.forEach(element => {
                // Attempt at recurive fun. Not allowed :(
                // TODO Make recurive when required
                // mapSceens(element, scene);
                scene.add(element)
            });
            return
        }
        scene.add(element) // Add individual item
    });
}

export function getRandomColor() {
    return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');;
}

export function isArrayObject(value) {
    return Object.prototype.toString.call(value) == "[object Array]";
}