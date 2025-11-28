import { BoxGeometry, BufferGeometry, Material, MeshStandardMaterial, Vector3, } from "three";
import { GameMesh, Pawn } from "../../module/object/GameObject.module";
import { BoxShape } from "../../module/component/gravity/Gravity.component";
import { GravityMovent } from "../../module/component/movement/GravityMovement.component";
import { Input } from "../../module/input/GameController.module";
import { Ground } from "../ground/Ground.scene";
export class Player extends Pawn {
    constructor() {
        super(...arguments);
        this._inputDir = new Vector3();
        this.speed = 6;
    }
    createGeometry() {
        const s = Player.SIZE;
        return new BoxGeometry(s.x, s.y, s.z);
    }
    createMaterial() {
        return new MeshStandardMaterial({ color: "white" });
    }
    awake() {
        super.awake();
        const go = this.gameObject;
        go.position.copy(Player.START_POS);
        const gravity = go.setComponent(BoxShape);
        gravity.scale.copy(Player.SIZE);
        gravity.mass = Player.MASS;
        this.movement = go.setComponent(GravityMovent);
    }
    start() {
        super.start();
    }
    update(delta) {
        super.update(delta);
        const x = (Input.isDown("KeyD") ? 1 : 0) - (Input.isDown("KeyA") ? 1 : 0);
        const z = (Input.isDown("KeyS") ? 1 : 0) - (Input.isDown("KeyW") ? 1 : 0);
        this._inputDir.set(x, 0, z);
        if (this._inputDir.lengthSq() === 0)
            return;
        this.movement.translate(this._inputDir, this.speed * delta);
    }
    onCollisionEnter(other, e) {
        if (other.script instanceof Ground) {
            console.log(1);
        }
    }
}
Player.SIZE = new Vector3(0.5, 1, 0.5);
Player.START_POS = new Vector3(0, 10, 1);
Player.MASS = 1;
