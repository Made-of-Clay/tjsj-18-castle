import GUI from 'lil-gui';
import { Group, Mesh, Scene } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';

export function getCastle(scene: Scene, gui: GUI) {
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
        console.log('name', name);
        // modular_fort_01_ index 16
        // const uniqueSnake = modular_fort_01_ ? name.substring(16) : name;
        const uniqueSnake = name.substring(16)
        return uniqueSnake.split('_')
            .map(word => word[0].toUpperCase() + word.substring(1))
            .join(' ');
    }
    // if type is group, add group to GUI
    // if type is mesh,  add position & rotation controls to GUI
    function buildGuiFromScene(gtlf: GLTF) {
        const castleFolder = gui.addFolder('Castle');
        for (const curGroup of gtlf.scene.children) {
            if (curGroup.type !== 'Group') {
                console.warn('This is awkward. The current child is not a group!', curGroup);
                continue;
            }
            const groupName = formatName(curGroup.name);
            // TODO group again based on group, but list group pos & rot instead of each child's pos/rot
            // TODO consider maybe adding colors, wireframe toggle, and/or text name above obj/in group to help w/ id
            // NOTICE: might just want to move the groups as a whole
            const groupFolder = castleFolder.addFolder(groupName);
            groupFolder.add(curGroup.position, 'x').min(-50).max(50).step(1).name(`Position X`);
            groupFolder.add(curGroup.position, 'y').min(-50).max(50).step(1).name(`Position Y`);
            groupFolder.add(curGroup.position, 'z').min(-50).max(50).step(1).name(`Position Z`);
            // folder.close();

            // for (const groupKid of sceneKid.children) {
            //     if (groupKid.type !== 'Mesh') {
            //         console.warn('This is awkward. The current child is not a mesh!', groupKid);
            //         continue;
            //     }
            //     folder.add(groupKid.position, 'x').min(-40).max(20).step(1).name(`${groupKid.name} Pos X`);
            //     folder.add(groupKid.position, 'y').min(-40).max(20).step(1).name(`${groupKid.name} Pos Y`);
            //     folder.add(groupKid.position, 'z').min(-40).max(20).step(1).name(`${groupKid.name} Pos Z`);
            // }
        }
    }
    // loop gtlf.scene.children
    // if node is group, add group to gui; loop children
    // if node is Mesh, add pos/rot ctrls to current group
}
