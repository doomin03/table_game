import { ScriptComponent } from "@engine/component/script/Script.component";
import { GameManager } from "@engine/GameManager.module";
import { GameObject, GameMesh } from "@engine/object/GameObject.module";
import { BoxGeometry, MeshStandardMaterial, Vector3, } from "three";
import { TextureManager } from "@engine/TextureManager.module";
import { BoxShape } from "@engine/component/gravity/Gravity.component";
import type { BoxShapeGravityOption } from "@engine/component/gravity/Gravity.component";
import { Ground } from "./Ground.script";

export class GroundGenerater extends ScriptComponent {
    groundArray: GameObject[] = [];
    depth = 4;

    groundScle: Vector3 = new Vector3(1, 0.5, 1);
    standardVector: Vector3 = new Vector3(0, 0, 0);
    groundGeomatry:BoxGeometry = new BoxGeometry(this.groundScle.x, this.groundScle.y, this.groundScle.z);

    groundMaterial:MeshStandardMaterial = new MeshStandardMaterial({
        map: TextureManager.instance.get('brick', 'color.jpg', 'snow')
    });

    start(): void {

        this.generator();
    }

    update(delta: number): void {

    }

    generator() {
        const row = 2 * this.depth + 1;
        const cx = this.standardVector!.x;
        const cz = this.standardVector!.z;
        for (let i = 0; i < row * row; i += row) {
            const r = i / row;
            for (let j = 0; j < row; j++) {
                const dx = j - this.depth;
                const dz = r - this.depth;
                const ground = this.setGround();
                ground.transform.position.set(cx + dx, 0, cz + dz);
                GameManager.getInstance().addObject(ground);
                this.groundArray.push(ground);
            }
        }
    }

    setGround(): GameMesh{
        const ground = new GameMesh(this.groundGeomatry, this.groundMaterial);
        ground.setComponent(Ground);
        ground.setComponent<BoxShape, [BoxShapeGravityOption]>(BoxShape, {
            mass: 0,
            scale: this.groundScle,
        });
        

        return ground
    }

}