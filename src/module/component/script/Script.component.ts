import { GameObject } from "../../GameObject.module";
import { BaseComponent } from "../BaseComponent.component";
import type { CollideEvent } from "../../component/gravity/Gravity.component"


export abstract class ScriptComponent extends BaseComponent {
    
    constructor(object:GameObject){
        super(object);
    }
}

export abstract class Pawn extends ScriptComponent {
  
    constructor(object:GameObject) {
        super(object);
    }

    start(): void {
        
    }

    update(delta: number): void {
        
    }
    onCollisionEnter?(other: GameObject, e: CollideEvent): void;
    onCollisionStay?(other: GameObject, e: CollideEvent): void;
}
