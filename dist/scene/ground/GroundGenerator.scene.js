import { GameObject } from "../../module/GameManager.module";
import { GameTextureLoader } from "../../module/GameTextureLoader.module";
import { PlaneGeometry, MeshStandardMaterial, Mesh, NearestFilter } from "three";
export class GroundGenerater extends GameObject {
    constructor() {
        super(...arguments);
        this.groundArray = [];
        this.groundMaterial = null;
        this.loader = null;
        this.groundGeometry = null;
        this.width = 1;
        this.height = 1;
    }
    Start() {
        this.setGround();
    }
    update(delta) {
    }
    setGround() {
        this.loader = new GameTextureLoader();
        this.loader.setPath('../../../assets/Snow/');
        const colorTex = this.loader.getLoader('color.jpg');
        const dispTex = this.loader.getLoader('disp.png');
        const normTex = this.loader.getLoader('norm.png');
        colorTex.magFilter = NearestFilter;
        dispTex.magFilter = NearestFilter;
        dispTex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        this.groundGeometry = new PlaneGeometry(this.width, this.height, 100, 100);
        this.groundMaterial = new MeshStandardMaterial({
            map: colorTex,
            displacementMap: dispTex,
            normalMap: normTex,
            displacementScale: 0.05,
        });
        const ground = new Mesh(this.groundGeometry, this.groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);
        this.groundArray.push(ground);
    }
}
