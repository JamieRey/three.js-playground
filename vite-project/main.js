import './style.css'

import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Region: Object Properties
class MaterialType {
  static Grid = new MaterialType('Grid');
  static SolidColour = new MaterialType('SolidColour');
  constructor(name) {this.name = name;}
}
// End Region

// Region: Scenes
const donut = CreateDonut(MaterialType.SolidColour.name);
function RotateDonut() {
  const rotation = { x: 0.01, y: 0.005, z: 0.01,}
  rotateObject( rotation.x, rotation.y, rotation.z, donut )
}
// End Region
  
// Region: Objects
function CreateDonut(materialType) {
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
      color : 0xFF6347,
      wireframe: true,
    });
  }
  if (materialType == MaterialType.SolidColour.name) {
    material = new THREE.MeshStandardMaterial({
      color : 0xFF6347,
    });
  }
  return new THREE.Mesh(donutShape, material);
}

const pointLight = new THREE.PointLight(0xffffff)
function PositionPointLight() {
  pointLight.position.set(20,25,25)
}

const floodLight = new THREE.AmbientLight(0xffffff)
function PositionFloodLight() {
  floodLight.position.set(20,25,25)
}
// End Region

// Region: Object Manipulation
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

// Region: Helper
const lightHelper = new THREE.GridHelper(200, 50);
// End Region

// Region: Animation Engine
const scene = new THREE.Scene();
const includedObjects = [donut, floodLight, pointLight, lightHelper];
const viewFrustrum = { fov: 75, aspect: window.innerWidth / window.innerHeight, near: 0.1, far: 1000, }
const camera = new THREE.PerspectiveCamera( 
  viewFrustrum.fov,
  viewFrustrum.aspect,
  viewFrustrum.near,
  viewFrustrum.far,
);
const webPageCanvas = document.querySelector('#bg')
const renderer = new THREE.WebGLRenderer({ canvas : webPageCanvas, });

function animateObjects() {
  PositionPointLight();
  PositionFloodLight();
  RotateDonut();
}

function runEnviroment() {
  requestAnimationFrame(runEnviroment);
  animateObjects();
  controls.update();  
  renderer.render(scene, camera);
}

function renderEnviroment() {
  makeFullScreen();
  camera.position.setZ(30);
  includedObjects.forEach(element => {
    scene.add(element)
  });
  runEnviroment();
}
// End Region

// Region: Controls
const controls = new OrbitControls(camera, renderer.domElement);
// End Region

// Main Script
renderEnviroment()