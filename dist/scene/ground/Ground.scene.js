import { Pawn } from "../../module/object/GameObject.module";
import { BoxShape } from "../../module/component/gravity/Gravity.component";
import { BoxGeometry, MeshStandardMaterial, Mesh, Vector3, BufferGeometry, Material } from "three";
import { GameTextureLoader } from "../../module/GameTextureLoader.module";
export class Ground extends Pawn {
    constructor() {
        super(...arguments);
        this.bullets = 10;
        this.width = 1;
        this.height = 1;
        this.loader = null;
    }
    createGeometry() {
        return Ground.sharedGeometry;
    }
    createMaterial() {
        return Ground.sharedMaterial;
    }
    awake() {
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
        super.awake();
        const gravity = this.gameObject.setComponent(BoxShape);
        gravity.scale = new Vector3(1, 0.5, 1);
    }
    start() {
        super.start();
        console.log(1);
    }
    update(delta) {
        super.update(delta);
    }
}
Ground.loaded = false;
