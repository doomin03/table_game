import { Pawn } from "../../module/GameObject.module";
import { BoxGeometry, MeshStandardMaterial, Mesh, Vector3 } from "three";
import { GameTextureLoader } from "../../module/GameTextureLoader.module";
export class Ground extends Pawn {
    constructor() {
        super(...arguments);
        this.bullets = 10;
        this.width = 1;
        this.height = 1;
        this.loader = null;
    }
    awake() {
        this.setGround();
    }
    Start() {
    }
    update(delta) {
    }
    setGround() {
        this.loader = new GameTextureLoader();
        this.loader.setPath('../../../assets/Snow/');
        const colorTex = this.loader.getLoader('color.jpg');
        const normTex = this.loader.getLoader('norm.png');
        this.geometry = new BoxGeometry(this.width, 0.5, this.height);
        this.material = new MeshStandardMaterial({
            map: colorTex,
            normalMap: normTex,
        });
    }
}
