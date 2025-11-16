import { WebGLRenderer, Scene, Mesh, Material, BufferGeometry } from "three";
import type { MeshStandardMaterialParameters } from "three";
import { GameTextureLoader } from "../module/GameTextureLoader.module";



class Component {

}

class GameMesh extends Mesh {
    script: GameObject | null = null;
    components: Component[] | null = null;

    setComponet<T extends Component>(component: GameObject): void{
        this.components!.push(component)
    }

    getComponet(){
        
    }
}

export abstract class GameObject {
    scene: Scene | null;
    renderer: WebGLRenderer | null;

    constructor(scene: Scene, renderer: WebGLRenderer) {
        this.scene = scene;
        this.renderer = renderer;
    }
    awake(){

    }
    abstract Start(): void;
    abstract update(delta: number): void;
}

export abstract class Pawn extends GameObject {
    gameObject: GameMesh | null = null;
    material: Material | null = null;
    geometry: BufferGeometry | null = null;
    
    constructor(scene: Scene, renderer: WebGLRenderer){
        super(scene, renderer);
    }
    init():void{
        this.gameObject = new GameMesh(this.geometry!, this.material!);
        this.gameObject!.script = this;
    }

    setGeomatry(geometry: BufferGeometry){
        if(!this.gameObject)
            this.geometry = geometry;
    }

    setMatrial(
        material: new (parameters: MeshStandardMaterialParameters) => Material, 
        parameters: MeshStandardMaterialParameters
    ){
        if(!this.material)
            this.material = new material(parameters);
    }

}
