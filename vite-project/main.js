import './style.css'

import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Creating a shape
const geometry = new THREE.TorusBufferGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color : 0xFF6347,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Game loop
function animate() {
  requestAnimationFrame( animate );

  // Rotating object
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();