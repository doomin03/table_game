import { BaseComponent } from "../BaseComponent.component";
import { Body, Vec3 } from "cannon-es";
import { Gravity } from "../gravity/Gravity.component";
import { Vector3 } from "three";

export class GravityMovent extends BaseComponent {
    private body: Body | null = null;

    start(): void {
        const gravityComponent = this.gameObject.getComponent(Gravity);
        this.body = gravityComponent!.getBody;
    }

    update(delta: number): void {
        
    }

    translate(dir: Vector3, distance: number) {
        if (!this.body) return;
        if (dir.lengthSq() === 0) return;

        const d = dir.clone().normalize();

        this.body.position.x += d.x * distance;
        this.body.position.y += d.y * distance;
        this.body.position.z += d.z * distance;
    }
}