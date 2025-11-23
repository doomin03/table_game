import { GameMesh } from "../GameObject.module";


export abstract class BaseComponent {
    mesh: GameMesh | null = null;

    constructor(mesh: GameMesh){
        this.mesh = mesh;
    }

    start(): void{

    }

    update(delta:number): void{

    }
}