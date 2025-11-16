import { PerspectiveCamera } from 'three';
export class GameCamera extends PerspectiveCamera {
    constructor() {
        super(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }
}
