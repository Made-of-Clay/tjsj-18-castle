import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export function getCamera(canvas: HTMLCanvasElement) {
    const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(2, 2, 5);

    const cameraControls = new OrbitControls(camera, canvas);
    cameraControls.enableDamping = true;
    cameraControls.autoRotate = false;
    cameraControls.update();
    return { camera, cameraControls };
}