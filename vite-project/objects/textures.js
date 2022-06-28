import * as THREE from 'three';

export function getTexture(textPath) {
    const texture = new THREE.TextureLoader().load(textPath);
    return texture
}