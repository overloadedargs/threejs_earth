import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

const loader = new THREE.TextureLoader();

loader.load('/images/bg.jpg' , function(texture) {
    scene.background = texture;  
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.SphereGeometry(6);
const texture = new THREE.TextureLoader().load('/images/earth.png');

const material = new THREE.MeshBasicMaterial({ map: texture, wireframe: false });
const shape = new THREE.Mesh(geometry, material);
shape.position.set(0, 4, 4);
scene.background = new THREE.Color( 0xffffff );

const texture2 = new THREE.TextureLoader().load('/images/sun.png');

const sphere_geometry = new THREE.SphereGeometry(10, 10, 10);
var material2 = new THREE.MeshLambertMaterial({map: texture2, wireframe: true });

const sphere = new THREE.Mesh(sphere_geometry, material2);
sphere.position.set(0, 4, 4);
scene.add(shape);
scene.add(sphere);

const pointLight = new THREE.PointLight(0xffffff, 10, 0, 0.4);
pointLight.position.set(-10, 5, 10);

scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addPlanet() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const planet = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  planet.position.set(x, y, z);
  scene.add(planet);
}


function animate() {
  requestAnimationFrame(animate);
  shape.rotation.x += 0.001;
  shape.rotation.y += 0.001;

  pointLight.position.x += 0.01
  pointLight.position.y += 0.01
  pointLight.position.z += 0.01;

  controls.update();

  sphere.rotation.x += 0.001;
  sphere.rotation.y += 0.001;
  renderer.render(scene, camera);
}

Array(8).fill().forEach(addPlanet);

animate();