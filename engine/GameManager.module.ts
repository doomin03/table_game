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

    renderer!: WebGLRenderer;
    scene!: Scene;
    world!: World;

    camera: PerspectiveCamera | null = null;

    objects: GameObject[] = [];


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
        this.world = new World();
        this.world.gravity.set(0, -9.8, 0);


        const controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.scene.add(this.camera);
    }



    setInitialObject(object: GameObject): GameManager {
        const objectInstance = object;
        objectInstance.components.forEach((e: BaseComponent) => {
            e.awake?.();
        })
        this.objects.push(objectInstance);

        this.scene.add(objectInstance);
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

            this.scene.add(objectInstance);
        });
        return this;
    }

    addObject(object: GameObject): GameObject {
        const objectInstance = object;
        objectInstance.components.forEach((e: BaseComponent) => {
            e.awake?.();
        })
        this.objects.push(objectInstance);

        this.scene.add(objectInstance);

        const basicComponents: BaseComponent[] = objectInstance.components.filter(
            (e: BaseComponent) => !(e instanceof ScriptComponent)
        );
        basicComponents.forEach(e => e.start?.());

        const scriptComponents: ScriptComponent[] = objectInstance.components.filter(
            (e: BaseComponent) => (e instanceof ScriptComponent)
        );

        scriptComponents.forEach(e => e.start?.());
        
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
        }

        this.renderer?.setAnimationLoop(() => {
            const delta = clock.getDelta();

            this.world?.step(1 / 60, delta);

            for (let i = 0; i < this.objects!.length; i++) {
                this.objects![i].components.forEach(
                    (e: BaseComponent) => e.update?.(delta)
                );
            }

            this.renderer.render(this.scene!, this.camera!);
        });
    }

    setEvent(): void {
        window.addEventListener('resize', () => {
            if (!this.renderer || !this.camera || !this.scene) return;

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.render(this.scene, this.camera);
        });
    }

}