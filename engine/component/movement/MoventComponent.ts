import { BaseComponent } from "../BaseComponent.component";
import { Gravity } from "../gravity/Gravity.component";
import { Vector3 } from "three";

export class MoventComponent extends BaseComponent {

    private gravity?: Gravity;

    start(): void {
        // 이때는 없을 수도 있음 → 그냥 시도만 해두고, translate에서 한 번 더 확인
        this.gravity = this.gameObject.getComponent(Gravity);
    }

    private getGravity(): Gravity | undefined {
        if (!this.gravity) {
            this.gravity = this.gameObject.getComponent(Gravity);
        }
        return this.gravity;
    }

    update(delta: number): void {

    }

    translate(dir: Vector3, distance: number) {
        if (dir.lengthSq() === 0) return;

        const d = dir.clone().normalize();

        this.gameObject.transform.position.x += d.x * distance;
        this.gameObject.transform.position.y += d.y * distance;
        this.gameObject.transform.position.z += d.z * distance;

        const gravity = this.getGravity();
        gravity?.syncTransformToBody();
    }
}