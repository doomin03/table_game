import { Vector3, } from "three";

import { Pawn } from "@engine/component/script/Script.component";
import { BoxShape, type CollideEvent } from "@engine/component/gravity/Gravity.component";
import { MoventComponent } from "@engine/component/movement/MoventComponent";
import { Input } from "@engine/input/GameController.module";
import { Ground } from "../../ground/script/Ground.script";
import type { GameMesh } from "@engine/object/GameObject.module";

export class Player extends Pawn {
    movement!: MoventComponent;
    private START_POS = new Vector3(0, 10, 1);

    private _inputDir = new Vector3();
    private speed = 6;


    awake(): void {
        this.gameObject.transform.position.set(this.START_POS.x, this.START_POS.y, this.START_POS.z)
    }

    start(): void {
        super.start();
        this.movement = this.gameObject.getComponent(MoventComponent)!; 
    }

    update(delta: number): void {
        const x =
            (Input.isDown("KeyD") ? 1 : 0) - (Input.isDown("KeyA") ? 1 : 0);
        const z =
            (Input.isDown("KeyS") ? 1 : 0) - (Input.isDown("KeyW") ? 1 : 0);

        this._inputDir.set(x, 0, z);

        if (this._inputDir.lengthSq() === 0) return;

        this.movement.translate(this._inputDir, this.speed * delta);

    }
    
    onCollisionEnter(other: GameMesh, e: CollideEvent): void {
        if(other.getComponent(Ground)){
            other.getComponent(Ground)!.returnBullet(10);
        }
    }
}
