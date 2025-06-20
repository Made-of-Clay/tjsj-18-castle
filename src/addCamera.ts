import GUI from 'lil-gui';
import { OrthographicCamera, PerspectiveCamera, Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

interface Cameras {
    perspective: PerspectiveCamera
    top: OrthographicCamera
    side: OrthographicCamera
    front: OrthographicCamera
}

export function addCamera(canvas: HTMLCanvasElement, scene: Scene, gui: GUI) {
    const cameraOptions = ['perspective', 'top', 'side', 'front'] as const;

    const cameras: Cameras = {
        perspective: new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000),
        top: new OrthographicCamera(-1, -1, 10, -1),
        side: new OrthographicCamera(-1, -1, 10, -1),
        front: new OrthographicCamera(-1, -1, 10, -1),
    };

    // const cameras: Record<typeof cameraOptions[number], PerspectiveCamera | OrthographicCamera> = {};

    // cameras.perspective = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    // cameras.perspective = perspective;
    cameras.perspective.position.set(2, 2, 5);

    let activeCamera: PerspectiveCamera | OrthographicCamera = cameras.perspective;
    const getActiveCamera = (): PerspectiveCamera | OrthographicCamera => {
        // console.log('activeCamera', activeCamera);
        return activeCamera
    } ;

    const cameraControls = new OrbitControls(cameras.perspective, canvas);
    cameraControls.enableDamping = true;
    cameraControls.autoRotate = false;
    cameraControls.update();

    // cameras.top = new OrthographicCamera(-1, -1, 10, -1);

    scene.add(cameras.perspective, cameras.top);

    const cameraDebug = {
        options: cameraOptions,
        active: cameraOptions[0],
    };
    const cameraFolder = gui.addFolder('Cameras');
    cameraFolder.add(cameraDebug, 'active', cameraOptions).onChange(console.log);

    function resizeCamera() {
        if (activeCamera === cameras.perspective) {
            cameras.perspective.aspect = canvas.clientWidth / canvas.clientHeight;
            cameras.perspective.updateProjectionMatrix();
        } // maybe rules if ortho is focused and screen changes?
    }

    return { cameras, cameraControls, getActiveCamera, resizeCamera };
}