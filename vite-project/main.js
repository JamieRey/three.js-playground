import './style.css'

import * as THREE from 'three';
import { Color, MeshBasicMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Custom imports
import { MaterialType } from './objects/properties.js';
import { createDonut } from './objects/assets/donut.js';
import { createStar } from './objects/assets/star';
import { rotateObjects } from './objects/motion.js';
import { randomlyPositionObjects } from './objects/position.js'
import * as screenUtility from './utility/screen.js'
import * as helpers from './utility/helpers.js';
import * as textureHelper from './objects/textures.js';


// Scene objects - Create once
// const donut = createDonut(MaterialType.Grid.name, helpers.getRandomColor());
const donuts = Array.from({length: 1}, () => createDonut(MaterialType.Grid.name, helpers.getRandomColor())); 
const pointLight = new THREE.PointLight(0xffffff);
const floodLight = new THREE.AmbientLight(0xffffff);
const stars = Array.from({length: 200}, () => randomlyGenerateStars());

const scene = new THREE.Scene();
const includedObjects = [donuts, floodLight, pointLight, helpers.lightHelper, stars];

// Region: Scenes
function manyMovingDonuts(element) {
  const rotation = { x: 0.01, y: 0.005, z: 0.01,}
  rotateObjects( rotation.x, rotation.y, rotation.z, element )
}

function positionPointLight() {
  pointLight.position.set(20,25,25)
}

function positionFloodLight() {
  floodLight.position.set(20,25,25)
}

function randomlyGenerateStars() {
  const star = createStar();
  return star;
}
// End Region

// Region: Animation Engine
const viewFrustrum = { fov: 75, aspect: window.innerWidth / window.innerHeight, near: 0.1, far: 1000, }
const camera = new THREE.PerspectiveCamera( 
  viewFrustrum.fov,
  viewFrustrum.aspect,
  viewFrustrum.near,
  viewFrustrum.far,
);
const webPageCanvas = document.querySelector('#bg')
const renderer = new THREE.WebGLRenderer({ canvas : webPageCanvas, });

function setupStaticObjectProperties() {
  // randomlyPositionObjects(donuts);
  scene.background = textureHelper.getTexture('../space-background.jpg')   
  randomlyPositionObjects(stars);
  positionPointLight();
  positionFloodLight();
  randomlyGenerateStars();
}

function animationLoop() {
  manyMovingDonuts(donuts);
}

function renderEnviroment() {
  requestAnimationFrame(renderEnviroment);
  animationLoop();
  controls.update();  
  renderer.render(scene, camera);
}

function runEnviroment() {
  screenUtility.makeFullScreen(renderer, window);
  camera.position.setZ(30);
  helpers.mapSceens(includedObjects, scene)
  setupStaticObjectProperties();
  renderEnviroment();
}
// End Region

// Region: Controls
const controls = new OrbitControls(camera, renderer.domElement);
// End Region

// Main Script
runEnviroment()