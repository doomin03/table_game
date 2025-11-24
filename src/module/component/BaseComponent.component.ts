import { GameMesh } from "../GameObject.module";


export abstract class BaseComponent {
    mesh!: GameMesh;

    constructor(mesh: GameMesh){
        this.mesh = mesh;
    }

    start(): void{

    }

    update(delta:number): void{

    }
}