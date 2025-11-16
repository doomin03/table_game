import { WebGLRenderer, Scene, Mesh, Material, BufferGeometry } from "three";
import { GameTextureLoader } from "../module/GameTextureLoader.module";
class Component {
}
class GameMesh extends Mesh {
    constructor() {
        super(...arguments);
        this.script = null;
        this.components = null;
    }
    setComponet(component) {
        this.components.push(component);
    }
    getComponet() {
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
    init() {
        this.gameObject = new GameMesh(this.geometry, this.material);
        this.gameObject.script = this;
    }
    setGeomatry(geometry) {
        if (!this.gameObject)
            this.geometry = geometry;
    }
    setMatrial(material, parameters) {
        if (!this.material)
            this.material = new material(parameters);
    }
}
