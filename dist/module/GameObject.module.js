import { WebGLRenderer, Scene, Mesh, Material, BufferGeometry, BoxGeometry, MeshStandardMaterial } from "three";
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
    }
    awake() {
        const geometry = this.createGeometry(); // 기본 or override
        const material = this.createMaterial(); // 기본 or override
        this.gameObject = new GameMesh(geometry, material);
        this.gameObject.script = this;
        this.onAwake(); // 서브클래스 훅(선택)
    }
    createGeometry() {
        return new BoxGeometry(1, 1, 1);
    }
    createMaterial() {
        return new MeshStandardMaterial({ color: 0xffffff });
    }
    onAwake() { }
    init() {
        const geometry = this.createGeometry();
        const material = this.createMaterial();
        this.gameObject = new GameMesh(geometry, material);
        this.gameObject.script = this;
    }
    start() {
        this.gameObject?.components.forEach((e) => {
            e.start();
        });
    }
    update(delta) {
        this.gameObject?.components.forEach((e) => {
            e.update(delta);
        });
    }
}
