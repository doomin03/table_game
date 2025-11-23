import { BoxGeometry, MeshStandardMaterial, Vector3 } from "three";
import { Pawn } from "../../module/GameObject.module";
import { BoxShape } from "../../module/component/gravity/Gravity.component";


export class Player extends Pawn {

    awake(): void {
        this.geometry = new BoxGeometry(0.5, 1, 0.5);
        this.material = new MeshStandardMaterial({
            color: "white"
        });
        super.awake();
        this.gameObject?.position.set(0, 10, 1);
        const gravity = this.gameObject!.setComponent(BoxShape);
        gravity.scale = new Vector3(0.5, 1, 0.5);
        gravity.mass = 1;
    }

    start(): void {
        super.start();
        console.log(1);
        
    }

    update(delta: number): void {
        super.update(delta);
    }
}