import * as THREE from 'three';
import {MaterialType} from '../properties.js'

export function createDonut(materialType, color) {
    const shapeGeometry = { radius: 10, tube: 3, radialSegments: 16, tubularSegments: 100, }
    const donutShape = new THREE.TorusBufferGeometry(
      shapeGeometry.radius,
      shapeGeometry.tube,
      shapeGeometry.radialSegments,
      shapeGeometry.tubularSegments
    );
    let material;
    if (materialType == MaterialType.Grid.name) {
      material = new THREE.MeshBasicMaterial({
        color : color,
        wireframe: true,
      });
    }
    if (materialType == MaterialType.SolidColour.name) {
      material = new THREE.MeshStandardMaterial({
        color : color,
      });
    }
    return new THREE.Mesh(donutShape, material);
}