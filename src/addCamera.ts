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

    const size = 100;
    const cameras: Cameras = {
        perspective: new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000),
        top: new OrthographicCamera(-1 * size, size, size, -1 * size),
        side: new OrthographicCamera(-1 * size, size, size, -1 * size),
        front: new OrthographicCamera(-1 * size, size, size, -1 * size),
    };

    cameras.top.position.set(0, size, 0);
    cameras.top.lookAt(0, 0, 0);
    cameras.side.position.set(size, 0, 0);
    cameras.side.lookAt(0, 0, 0);
    cameras.front.position.set(0, 0, size);
    cameras.front.lookAt(0, 0, 0);

    cameras.perspective.position.set(-4, 5, -5);

    let activeCamera: PerspectiveCamera | OrthographicCamera = cameras.perspective;
    const getActiveCamera = (): PerspectiveCamera | OrthographicCamera => activeCamera;

    let cameraControls = new OrbitControls(cameras.perspective, canvas);
    cameraControls.enableDamping = true;
    cameraControls.autoRotate = false;
    cameraControls.update();

    scene.add(cameras.perspective, cameras.top);

    const cameraDebug = {
        options: cameraOptions,
        active: cameraOptions[0],
    };
    const cameraFolder = gui.addFolder('🎥 Cameras');
    cameraFolder.add(cameraDebug, 'active', cameraOptions)
        .onChange((curCam: keyof Cameras) => {
            activeCamera = cameras[curCam];
            cameraControls.dispose();
            cameraControls = new OrbitControls(activeCamera, canvas);
            cameraControls.enableDamping = true;
            cameraControls.autoRotate = false;
            cameraControls.enableRotate = !(activeCamera as OrthographicCamera).isOrthographicCamera;
            cameraControls.update();
        });

    function resizeCamera() {
        const { width, height } = canvas;
        const aspect = width / height;
        if ((activeCamera as OrthographicCamera).isOrthographicCamera) {
            const orthoCam = activeCamera as OrthographicCamera;
            orthoCam.left = -size * aspect;
            orthoCam.right = size * aspect;
            orthoCam.top = size;
            orthoCam.bottom = -size;
        } else {
            (activeCamera as PerspectiveCamera).aspect = aspect;
        }
        activeCamera.updateProjectionMatrix();
    }

    return { cameras, cameraControls, getActiveCamera, resizeCamera };
}