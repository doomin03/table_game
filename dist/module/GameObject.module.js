import { WebGLRenderer, Scene, Mesh, Material, BufferGeometry } from "three";
import { BaseComponent } from "./component/BaseComponent.component";
export class GameMesh extends Mesh {
    constructor() {
        super(...arguments);
        this.script = null;
        this.components = [];
    }
    setComponent(Ctor, ...args) {
        const component = new Ctor(this, ...args);
        this.components.push(component);
        return component;
    }
    getComponent(Ctor) {
        return this.components.find(c => c instanceof Ctor);
    }
}
export class GameObject {
    constructor(scene, renderer) {
        this.scene = scene;
        this.renderer = renderer;
    }
    awake() {
    }
}
export class Pawn extends GameObject {
    constructor(scene, renderer) {
        super(scene, renderer);
        this.gameObject = null;
        this.material = null;
        this.geometry = null;
    }
    awake() {
        this.init();
    }
    init() {
        if (!this.geometry || !this.material)
            return;
        this.gameObject = new GameMesh(this.geometry, this.material);
        this.gameObject.script = this;
    }
    start() {
        this.gameObject?.components.forEach((e) => {
            e.start();
        });
    }
    update(delta) {
        this.gameObject?.components.forEach((e) => {
            e.update();
        });
    }
}
