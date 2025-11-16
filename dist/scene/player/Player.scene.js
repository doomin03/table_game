import { BoxGeometry, MeshStandardMaterial } from "three";
import { Pawn } from "../../module/GameObject.module";
export class Player extends Pawn {
    awake() {
        this.geometry = new BoxGeometry(0.5, 1, 0.5);
        this.material = new MeshStandardMaterial({
            color: "white"
        });
    }
    Start() {
        this.gameObject?.position.set(0, 1, 0);
    }
    update(delta) {
    }
}
