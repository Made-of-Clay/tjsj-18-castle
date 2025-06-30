import GUI from 'lil-gui';
import { CanvasTexture, InstancedMesh, Scene, Sprite, SpriteMaterial } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';

export async function addCastle(scene: Scene, gui: GUI) {
    // /modular_fort_01_1k/modular_fort_01_1k.gltf
    const loader = new GLTFLoader();
    loader.setResourcePath('/modular_fort_01_1k/');
    loader.load(
        '/modular_fort_01_1k/modular_fort_01_1k.gltf',
        (gtlf) => {
            console.log('gtlf', gtlf);
            buildGuiFromScene(gtlf);
            scene.add(gtlf.scene);
        },
        console.log,
        console.error,
    );

    function formatName(name: string) {
        const uniqueSnake = name.substring(16)
        return uniqueSnake.split('_')
            .map(word => word[0].toUpperCase() + word.substring(1))
            .join(' ');
    }

    function buildGuiFromScene(gtlf: GLTF) {
        const castleFolder = gui.addFolder('🏰 Castle');
        console.log('castleFolder', castleFolder);

        const castleTweaks = {
            openAllFolders() {
                for (const group of castleFolder.children) {
                    if ('open' in group && typeof group.open === 'function')
                        group.open();
                }
            },
            closeAllFolders() {
                for (const group of castleFolder.children) {
                    if ('close' in group && typeof group.close === 'function')
                        group.close();
                }
            },
            duplicate() {
                // add InstancedMesh to scene using existing geo/mat
                // const dup = new InstancedMesh(
                // )
                // loop group.children for each mesh
                // create InstancedMesh for each mesh with geo/mat
                // set position based on original within group
                // add new group
                // set group to 0
            },
        };
        castleFolder.add(castleTweaks, 'openAllFolders').name('Open All Parts');
        castleFolder.add(castleTweaks, 'closeAllFolders').name('Close All Parts');

        // Add child controls
        for (const curGroup of gtlf.scene.children) {
            if (curGroup.type !== 'Group') {
                console.warn('This is awkward. The current child is not a group!', curGroup);
                continue;
            }
            // const dup = new InstancedMesh(curGroup.)
            const groupName = formatName(curGroup.name);
            const groupFolder = castleFolder.addFolder(groupName);
            groupFolder.add(curGroup.position, 'x').min(-50).max(50).step(1).name(`Position X`);
            groupFolder.add(curGroup.position, 'y').min(-50).max(50).step(1).name(`Position Y`);
            groupFolder.add(curGroup.position, 'z').min(-50).max(50).step(1).name(`Position Z`);
            // TODO move transform origin to group center
            groupFolder.add(curGroup.rotation, 'y').min(0).max(Math.PI * 2).step(0.1).name('Rotation');
            groupFolder.add(curGroup, 'visible').name('Visible');
        }

        // Add child group "All" toggle
        // castleFolder
        // castleFolder.children
        
        return gtlf;
    }

    // NOTICE might remove this
    function makeTextSprite(text: string) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
 
        // Measure text width and set canvas size
        const metrics = context.measureText(text);
        const textWidth = Math.ceil(metrics.width) + 100;
        // const textWidth = 500;
        const textHeight = 60; // Adjust as needed for your font size

        // Redefine font after resizing (canvas resize resets context state)
        context.font = '48px Arial';
        context.textBaseline = 'top';
        context.fillStyle = 'white';
        context.fillText(text, 0, 0);
        // context.fillText(text, 10, 50);

        canvas.width = textWidth;
        canvas.height = textHeight;

        const texture = new CanvasTexture(canvas);
        const material = new SpriteMaterial({ map: texture, transparent: true });
        const sprite = new Sprite(material);
        return sprite;
    }
}
