import { WebGLRenderer, Scene, PerspectiveCamera } from "three";

interface GameModule {
    readonly scene: Scene | null;
    readonly renderer: WebGLRenderer | null;
}

export abstract class GameObject implements GameModule {
    scene: Scene | null;
    renderer: WebGLRenderer | null;

    constructor(scene: Scene, renderer: WebGLRenderer) {
        this.scene = scene;
        this.renderer = renderer;
    }
    abstract Start(): void;

    abstract update(): void;

}


export class GameManager {
    renderer: WebGLRenderer | null = null;
    scene: Scene | null = null;
    camera: PerspectiveCamera | null = null


    constructor() {
        this.init()
    }

    init() {
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.append(this.renderer.domElement);

        this.scene = new Scene();

        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );

        this.scene.add(this.camera);
    }

    start(){
        
    }

    setEvent() {
        window.addEventListener('resize', () => {
            if (!this.renderer || !this.camera || !this.scene) return
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.render(this.scene, this.camera);
        });
    }
}