import { BaseComponent } from "../BaseComponent.component";
import { Body, Vec3 } from "cannon-es";
import { Gravity } from "../gravity/Gravity.component";
import { Vector3 } from "three";

export class MoventComponent extends BaseComponent {

    start(): void {


    }

    update(delta: number): void {
        
    }

    translate(dir: Vector3, distance: number) {
        if (dir.lengthSq() === 0) return;

        const d = dir.clone().normalize();

        this.gameObject.transform.position.x += d.x * distance;
        this.gameObject.transform.position.x += d.y * distance;
        this.gameObject.transform.position.x += d.z * distance;
    }
}