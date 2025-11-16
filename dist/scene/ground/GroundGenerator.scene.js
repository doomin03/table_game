import { GameObject } from "../../module/GameObject.module";
import { GameManager } from "../../module/GameManager.module";
import { Ground } from "./Ground.scene";
import { GameTextureLoader } from "../../module/GameTextureLoader.module";
import { Mesh, Vector3 } from "three";
export class GroundGenerater extends GameObject {
    constructor() {
        super(...arguments);
        this.groundArray = [];
        this.loader = null;
        this.gameManager = null;
        this.depth = 4;
        this.standardVector = null;
    }
    Start() {
        this.standardVector = new Vector3(0, 0, 0);
        this.gameManager = new GameManager();
        this.generator();
    }
    update(delta) {
    }
    generator() {
        const row = 2 * this.depth + 1;
        const cx = this.standardVector.x;
        const cz = this.standardVector.z;
        for (let i = 0; i < row * row; i += row) {
            const r = i / row;
            for (let j = 0; j < row; j++) {
                const dx = j - this.depth;
                const dz = r - this.depth;
                const ground = this.gameManager.instantiate(Ground);
                ground.gameObject.position.set(cx + dx, 0.5, cz + dz);
                this.groundArray.push(ground.gameObject);
            }
        }
    }
}
