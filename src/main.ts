import './style.css';

import GUI from 'lil-gui';
import { AxesHelper, BoxGeometry, Clock, GridHelper, LoadingManager, Mesh, MeshStandardMaterial, PCFSoftShadowMap, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { addLights } from './addLights';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { addCamera } from './addCamera';
import { resizeRendererToDisplaySize } from './helpers/responsiveness';
import Stats from 'stats.js'
import { addCastle } from './addCastle';

// SETUP
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
const scene = new Scene();

const gui = new GUI({ title: '⚙️ Tinkering', width: 400 });

const loadingManager = new LoadingManager(console.log, console.log, console.error);

const clock = new Clock();
const stats = new Stats();
document.body.appendChild(stats.dom);

const gridHelper = new GridHelper(20, 20, 'teal', 'darkgray');
gridHelper.position.y = -0.01;
scene.add(gridHelper);

const axesHelper = new AxesHelper();
scene.add(axesHelper);

// LIGHTS, CAMERA, ACTION
addLights(scene);
// scene.add(ambientLight, pointLight);

const { cameraControls, resizeCamera, getActiveCamera } = addCamera(canvas, scene, gui);

// OBJECTS
addCastle(scene, gui);

function animate() {
    requestAnimationFrame(animate);

    stats.begin();

    if (resizeRendererToDisplaySize(renderer))
        resizeCamera();

    cameraControls.update();

    renderer.render(scene, getActiveCamera());
    stats.end();
}

animate();
