import { WebGLRenderer, Scene, PerspectiveCamera, Clock, AmbientLight, } from "three";
import { World } from "cannon-es"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GameObject } from "./object/GameObject.module";
import { BaseComponent } from "./component/BaseComponent.component";
import { ScriptComponent } from "./component/script/Script.component";

export type GameContext = {
    scene: Scene;
    renderer: WebGLRenderer;
    world: World;
};

export class GameManager {
    private static instance: GameManager | null = null;

    private _renderer!: WebGLRenderer;
    private _scene!: Scene;
    private _world!: World;

    camera: PerspectiveCamera | null = null;

    objects: GameObject[] = [];

    public get renderer() {
        return this._renderer;
    }

    public get scene() {
        return this._scene;
    }

    public get world() {
        return this._world;
    }
    private constructor() {
        this.initData();
        this.setEvent();
    }

    static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    initData() {
        this._renderer = new WebGLRenderer({ antialias: true });
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.append(this._renderer.domElement);

        this._scene = new Scene();

        const light = new AmbientLight(0xffffff, 1);
        this._scene.add(light);

        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );
        this.camera.position.set(0, 3, -2);
        this._world = new World();
        this._world.gravity.set(0, -9.8, 0);


        const controls = new OrbitControls(this.camera, this._renderer.domElement);

        this._scene.add(this.camera);
    }



    setInitialObject(object: GameObject): GameManager {
        const objectInstance = object;
        objectInstance.components.forEach((e: BaseComponent) => {
            e.awake?.();
        })
        this.objects.push(objectInstance);

        this._scene.add(objectInstance);
        return this;
    }

    setInitialObjects(objects: GameObject[]): GameManager {
        if (!this.objects) this.objects = [];

        objects.forEach((object) => {
            const objectInstance = object;
            objectInstance.components.forEach((e: BaseComponent) => {
                e.awake?.();
            })
            this.objects.push(objectInstance);

            this._scene.add(objectInstance);
        });
        return this;
    }

    addObject(object: GameObject): GameObject {
        const objectInstance = object;
        objectInstance.components.forEach((e: BaseComponent) => {
            e.awake?.();
        })
        this.objects.push(objectInstance);

        this._scene.add(objectInstance);
        return objectInstance;
    }


    runGame(): void {
        const clock = new Clock();

        if (!this.objects)
            throw new Error("연결된 게임 오브젝트가 존재하지 않음");

        for (let i = 0; i < this.objects!.length; i++) {
            const basicComponents: BaseComponent[] = this.objects[i].components.filter(
                (e: BaseComponent) => !(e instanceof ScriptComponent)
            );
            basicComponents.forEach(e => e.start?.());
    
            const scriptComponents: ScriptComponent[] = this.objects[i].components.filter(
                (e: BaseComponent) => (e instanceof ScriptComponent)
            );
            scriptComponents.forEach(e => e.start?.());
            console.log(scriptComponents);
            
        }

        this._renderer?.setAnimationLoop(() => {
            const delta = clock.getDelta();

            this._world?.step(1 / 60, delta);

            for (let i = 0; i < this.objects!.length; i++) {
                this.objects![i].components.forEach(
                    (e: BaseComponent) => e.update?.(delta)
                );
            }

            this._renderer.render(this._scene!, this.camera!);
        });
    }

    setEvent(): void {
        window.addEventListener('resize', () => {
            if (!this._renderer || !this.camera || !this._scene) return;

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this._renderer.setSize(window.innerWidth, window.innerHeight);
            this._renderer.render(this._scene, this.camera);
        });
    }

}