import { WebGLRenderer, Scene, Mesh, Material, BufferGeometry, BoxGeometry, MeshStandardMaterial } from "three";
import type { CollideEvent } from "../module/component/gravity/Gravity.component"
import { BaseComponent } from "./component/BaseComponent.component";




export class GameMesh extends Mesh {
    script: GameObject | null = null;
    components: BaseComponent[] = [];

    setComponent<T extends BaseComponent>(
        Ctor: new (mesh: GameMesh, ...args: any[]) => T,
        ...args: any[]
    ): T {
        const component = new Ctor(this, ...args);
        this.components.push(component);
        return component;
    }

    getComponent<T extends BaseComponent>(
        Ctor: new (...args: any[]) => T
    ): T | undefined {
        return this.components!.find(c => c instanceof Ctor) as T | undefined;
    }
}

export abstract class GameObject {
    scene: Scene | null;
    renderer: WebGLRenderer | null;

    constructor(scene: Scene, renderer: WebGLRenderer) {
        this.scene = scene;
        this.renderer = renderer;
    }
    awake() {

    }
    abstract start(): void;
    abstract update(delta: number): void;
}

export abstract class Pawn extends GameObject {
    gameObject!: GameMesh;

    constructor(scene: Scene, renderer: WebGLRenderer) {
        super(scene, renderer);
    }
    awake(): void {
        const geometry = this.createGeometry();   // 기본 or override
        const material = this.createMaterial();   // 기본 or override

        this.gameObject = new GameMesh(geometry, material);
        this.gameObject.script = this;

        this.onAwake(); // 서브클래스 훅(선택)
    }

    protected createGeometry(): BufferGeometry {
        return new BoxGeometry(1, 1, 1);
    }

    protected createMaterial(): Material {
        return new MeshStandardMaterial({ color: 0xffffff });
    }

    protected onAwake(): void { }

    init(): void {
        const geometry = this.createGeometry();
        const material = this.createMaterial();
        this.gameObject = new GameMesh(geometry, material);
        this.gameObject!.script = this;
    }

    start(): void {
        this.gameObject?.components.forEach((e) => {
            e.start();
        })
    }

    update(delta: number): void {
        this.gameObject?.components.forEach((e) => {
            e.update(delta);
        })
    }

    onCollisionEnter?(other: GameMesh, e: CollideEvent): void;
    onCollisionStay?(other: GameMesh, e: CollideEvent): void;
}
