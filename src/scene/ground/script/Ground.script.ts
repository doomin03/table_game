import { Pawn } from "../../../module/component/script/Script.component";
import { BoxGeometry, MeshStandardMaterial, Mesh, Vector3, BufferGeometry, Material } from "three";

export class Ground extends Pawn {
    bullets: number = 10;
    width: number = 1;
    height: number = 1;
    static sharedGeometry: BoxGeometry;
    static sharedMaterial: MeshStandardMaterial;

    static loaded = false;

    awake(): void {
    }



    start(): void {

    }

    update(delta: number): void {
        
    }

}