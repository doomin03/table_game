import { WebGLRenderer, Scene, Mesh, Material, BufferGeometry } from "three";
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
    gameObject: GameMesh | null = null;
    material: Material | null = null;
    geometry: BufferGeometry | null = null;

    constructor(scene: Scene, renderer: WebGLRenderer) {
        super(scene, renderer);
    }
    awake(): void {
        this.init()
    }
    init(): void {
        if (!this.geometry || !this.material)
            return
        this.gameObject = new GameMesh(this.geometry, this.material);
        this.gameObject!.script = this;
    }

    start(): void {
        this.gameObject?.components.forEach((e)=>{
            e.start();
        })    
    }

    update(delta: number): void {
        this.gameObject?.components.forEach((e)=>{
            e.update();
        })    
    }
}
