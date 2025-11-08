import { WebGLRenderer, Scene, PerspectiveCamera, Clock } from "three";

export abstract class GameObject {
    scene: Scene | null;
    renderer: WebGLRenderer | null;

    constructor(scene: Scene, renderer: WebGLRenderer) {
        this.scene = scene;
        this.renderer = renderer;
    }

    abstract Start(): void;

    abstract update(delta: number): void;

}


export class GameManager {
    renderer: WebGLRenderer | null = null;
    scene: Scene | null = null;
    camera: PerspectiveCamera | null = null


    objects: GameObject[] | null = null;


    constructor() {
        this.initData()
    }

    initData() {
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



    setInitialObject<T extends GameObject>(object: new (...args: any) => T): GameManager {
        const objectInstance = new object(this.scene, this.renderer);
        this.objects?.push(objectInstance);
        return this;
    }

    start(): void {
        const clock = new Clock();

        if(!this.objects)
            throw new Error("연결된 게임 오브젝트가 존재하지 않음");

        this.objects.forEach((e: GameObject) => {
            e.Start();
        });

        this.renderer?.setAnimationLoop(() => {
            const delta = clock.getDelta();
            this.objects?.forEach((e: GameObject) => {
                e.update(delta);
            });
        });
    }

    setEvent(): void {
        window.addEventListener('resize', () => {
            if (!this.renderer || !this.camera || !this.scene) return
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.render(this.scene, this.camera);
        });
    }
}