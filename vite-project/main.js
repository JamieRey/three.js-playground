import './style.css'

import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';

function mainScene() {

  rotatingDontScene();
}



// Region: Scenes
//
const donut = CreateDonut();
function rotatingDontScene() {
  const rotation = { x: 0.01, y: 0.005, z: 0.01,}
  rotateObject(
    rotation.x,
    rotation.y,
    rotation.z,
    donut
    )
  }
// End Region

//
  
// Region: Objects
//
function CreateDonut() {
  const shapeGeometry = { radius: 10, tube: 3, radialSegments: 16, tubularSegments: 100, }
  const donutShape = new THREE.TorusBufferGeometry(
    shapeGeometry.radius,
    shapeGeometry.tube,
    shapeGeometry.radialSegments,
    shapeGeometry.tubularSegments
  );
  const material = new THREE.MeshBasicMaterial({
    color : 0xFF6347,
    wireframe: true,
  });
  return new THREE.Mesh(donutShape, material);
}
// End Region



// Region: Object Manipulation
//
function rotateObject(x, y, z, object) {
  object.rotation.x += x;
  object.rotation.y += y;
  object.rotation.z += z;
}
// End Region



// Region: Utility
function makeFullScreen() {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
}
// End Region



// Region: Animation Engine
//
const scene = new THREE.Scene();
const viewFrustrum = { fov: 75, aspect: window.innerWidth / window.innerHeight, near: 0.1, far: 1000, }
const camera = new THREE.PerspectiveCamera( 
  viewFrustrum.fov,
  viewFrustrum.aspect,
  viewFrustrum.near,
  viewFrustrum.far,
);
const webPageCanvas = document.querySelector('#bg')
const renderer = new THREE.WebGLRenderer({ canvas : webPageCanvas, });

function runEnviroment() {
  requestAnimationFrame(runEnviroment);
  mainScene();  
  renderer.render(scene, camera);
}

function renderEnviroment() {
  makeFullScreen();
  camera.position.setZ(30);
  scene.add(donut);
  runEnviroment();
}
// End Region

//

// Main Script
renderEnviroment()