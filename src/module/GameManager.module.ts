import { WebGLRenderer, Scene, PerspectiveCamera, Clock, AmbientLight, Mesh } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class GameMesh extends Mesh {
    script: GameObject | null = null;

}

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

export abstract class Pawn extends GameObject {
    gameObject: GameMesh | null = null;

    constructor(scene: Scene, renderer: WebGLRenderer){
        super(scene, renderer);
        this.gameObject!.script = this
    }
}


export class GameManager {
    renderer: WebGLRenderer | null = null;
    scene: Scene | null = null;
    camera: PerspectiveCamera | null = null


    objects: GameObject[] | null = null;


    constructor() {
        this.initData()
        this.setEvent()
    }

    initData() {
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.append(this.renderer.domElement);

        this.scene = new Scene();

        const light = new AmbientLight(0xffffff, 1);
        this.scene.add(light);

        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );
        this.camera.position.set(0, 3, -2);

        //TODO테스트
        const controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.scene.add(this.camera);
    }



    setInitialObject<T extends GameObject>(object: new (...args: any) => T): GameManager {
        const objectInstance = new object(this.scene, this.renderer);
        this.objects?.push(objectInstance);
        return this;
    }

    setInitialObjects(objects: (new (...args: any) => GameObject)[]): GameManager {
        this.objects = objects.map((e)=>{
            return new e(this.scene, this.renderer);
        });
        return this;
    }

    runGame(): void {
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

            this.renderer?.render(this.scene!, this.camera!);
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