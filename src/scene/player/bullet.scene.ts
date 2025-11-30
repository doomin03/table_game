import {
    BoxGeometry,
    BufferGeometry,
    Material,
    MeshStandardMaterial,
    Vector3,
} from "three";

import { GameMesh, Pawn } from "../../module/object/GameObject.module";
import { BoxShape, type CollideEvent } from "../../module/component/gravity/Gravity.component";
import { GravityMovent } from "../../module/component/movement/MoventComponent";
import { Input } from "../../module/input/GameController.module";
import { Ground } from "../ground/Ground.scene";

export class Bullet extends Pawn {
    movement!: GravityMovent;

    private static readonly SIZE = new Vector3(0.5, 1, 0.5);
    private static readonly START_POS = new Vector3(0, 10, 1);
    private static readonly MASS = 1;

    private _inputDir = new Vector3();
    private speed = 6;

    protected createGeometry(): BufferGeometry {
        const s = Bullet.SIZE;
        return new BoxGeometry(s.x, s.y, s.z);
    }

    protected createMaterial(): Material {
        return new MeshStandardMaterial({ color: "white" });
    }

    awake(): void {
        super.awake();

        const go = this.gameObject!;
        go.position.copy(Bullet.START_POS);

        const gravity = go.setComponent(BoxShape);
        gravity.scale.copy(Bullet.SIZE);
        gravity.mass = Bullet.MASS;

        this.movement = go.setComponent(GravityMovent);
    }

    start(): void {
        super.start();
    }

    update(delta: number): void {
        super.update(delta);

        
    }
    
    onCollisionEnter(other: GameMesh, e: CollideEvent): void {
        if(other.script instanceof Ground){
            console.log(1);
            
        }
    }
}
