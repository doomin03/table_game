import { GameObject } from "../GameObject.module";


export abstract class BaseComponent {
    gameObject!: GameObject;

    constructor(object: GameObject){
        this.gameObject = object;
    }

    awake?():void {

    }

    abstract start(): void;
    abstract update(delta:number): void;
}