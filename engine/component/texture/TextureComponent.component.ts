import { MeshStandardMaterial } from "three";
import { BaseComponent } from "../BaseComponent.component";
import { GameMesh } from "../../object/GameObject.module";
import { TextureManager } from "../../TextureManager.module";

export class MaterialComponent extends BaseComponent {
    private material: MeshStandardMaterial;
    private folderName?: string;

    constructor(mesh: GameMesh) {
        super(mesh);
        this.material = mesh.gameMesh.material as MeshStandardMaterial;
    }

    setFolder(folderName:string) {
        this.folderName = folderName;
    }

    setBrickTexture(name: string) {
        const tex = TextureManager.instance.get("brick", name, this.folderName);
        this.material.map = tex;
        this.material.needsUpdate = true;
    }

    setUiTexture(name: string) {
        const tex = TextureManager.instance.get("ui", name, this.folderName);
        this.material.map = tex;
        this.material.needsUpdate = true;
    }
}
