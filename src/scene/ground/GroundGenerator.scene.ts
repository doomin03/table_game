import { Pawn } from "../../module/GameManager.module";
import { GameTextureLoader } from "../../module/GameTextureLoader.module";
import { BoxGeometry, MeshStandardMaterial, Mesh, Vector3 } from "three";


export class GroundGenerater extends Pawn {
    groundArray: Mesh[] = [];
    groundMaterial: MeshStandardMaterial | null = null;
    loader: GameTextureLoader | null = null;


    groundGeometry: BoxGeometry | null = null;
    width: number = 1;
    height: number = 1;


    depth = 4;
    standardVector = new Vector3(0, 0, 0);

    Start(): void {
        this.setGround();
    }

    update(delta: number): void {

    }


    setGround() {
        this.loader = new GameTextureLoader();
        this.loader.setPath('../../../assets/Snow/');

        const colorTex = this.loader.getLoader('color.jpg');
        const normTex = this.loader.getLoader('norm.png');

        this.groundGeometry = new BoxGeometry(this.width, 0.5, this.height);

        this.groundMaterial = new MeshStandardMaterial({
            map: colorTex,
            normalMap: normTex,

        });

        this.generator();
    }

    generator() {
        const row = 2 * this.depth + 1;
        const cx = this.standardVector.x;
        const cz = this.standardVector.y;

        for (let i = 0; i < row * row; i += row) {
            const r = i / row;
            for (let j = 0; j < row; j++) {
                const dx = j - this.depth;
                const dz = r - this.depth;

                const ground = new Mesh(this.groundGeometry!, this.groundMaterial!);
                ground.position.set(cx + dx, 0.5, cz + dz);
                this.groundArray.push(ground);
                this.scene!.add(ground);
            }
        }
    }


}