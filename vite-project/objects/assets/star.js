import * as THREE from 'three';

export function createStar() {
    const shapeGeometry = { radius: 0.25, widthSegments: 24, heightSegments: 24 };
    const starShape = new THREE.SphereGeometry(
        shapeGeometry.radius,
        shapeGeometry.widthSegments,
        shapeGeometry.heightSegments,
    );
    const startMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(starShape,startMaterial)
    return star
}