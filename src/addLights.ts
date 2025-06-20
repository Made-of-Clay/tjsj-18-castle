import { AmbientLight, PointLight, PointLightHelper, Scene } from 'three';

export function addLights(scene: Scene) {
    const ambientLight = new AmbientLight('white', 0.4);

    const pointLight = new PointLight('white', 80, 100);
    pointLight.position.set(-2, 2, 2);
    const pointHelper = new PointLightHelper(pointLight);

    scene.add(ambientLight, pointLight, pointHelper);

    return { ambientLight, pointLight };
}