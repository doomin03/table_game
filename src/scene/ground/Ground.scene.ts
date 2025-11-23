import { Pawn } from "../../module/GameObject.module";
import { BoxShape } from "../../module/component/gravity/Gravity.component";
import { BoxGeometry, MeshStandardMaterial, Mesh, Vector3 } from "three";
import { GameTextureLoader } from "../../module/GameTextureLoader.module";

export class Ground extends Pawn {
    bullets: number = 10;
    width: number = 1;
    height: number = 1;
    loader: GameTextureLoader | null = null;
    static sharedGeometry: BoxGeometry;
    static sharedMaterial: MeshStandardMaterial;

    static loaded = false;

    awake(): void {
        if (!Ground.loaded) {
            const loader = new GameTextureLoader();
            loader.setPath('../../../assets/Snow/');

            const colorTex = loader.getLoader('color.jpg');
            const normTex = loader.getLoader('norm.png');

            Ground.sharedGeometry = new BoxGeometry(1, 0.5, 1);
            Ground.sharedMaterial = new MeshStandardMaterial({
                map: colorTex,
                normalMap: normTex,
            });

            Ground.loaded = true;
        }

        this.geometry = Ground.sharedGeometry;
        this.material = Ground.sharedMaterial;

        super.awake();

        const gravity = this.gameObject!.setComponent(BoxShape);
        gravity.scale = new Vector3(1, 0.5, 1);
    }



    start(): void {
        super.start();
        console.log(1);
        
    }

    update(delta: number): void {
        super.update(delta);
    }

}