import './style.css';

import GUI from 'lil-gui';
import { AxesHelper, BoxGeometry, Clock, GridHelper, LoadingManager, Mesh, MeshStandardMaterial, PCFSoftShadowMap, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { getLights } from './getLights';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { getCamera } from './getCamera';
import { resizeRendererToDisplaySize } from './helpers/responsiveness';
import Stats from 'stats.js'
import { getCastle } from './getCastle';

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

// LIGHTS, CAMERA, ACTION
const { ambientLight, pointLight } = getLights();
scene.add(ambientLight, pointLight);

const { camera, cameraControls } = getCamera(canvas);
scene.add(camera);

// OBJECTS
const cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshStandardMaterial({ color: 'red' }),
);
scene.add(cube);

getCastle(scene, gui);

function animate() {
    requestAnimationFrame(animate);

    stats.begin();

    if (resizeRendererToDisplaySize(renderer)) {;
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    };

    cameraControls.update();

    renderer.render(scene, camera);
    stats.end();
}

animate();
