import { AmbientLight, PointLight, Scene } from 'three';

export function getLights(scene: Scene) {
    const ambientLight = new AmbientLight('white', 0.4);
    const pointLight = new PointLight('white', 80, 100);
    pointLight.position.set(-2, 2, 2);

    return { ambientLight, pointLight };
}