import { GameObject } from "../object/GameObject.module";


export abstract class BaseComponent {
    gameObject!: GameObject;

    constructor(object: GameObject){
        this.gameObject = object;
    }

    awake?():void {

    }

    start?(): void;
    update?(delta:number): void;
}