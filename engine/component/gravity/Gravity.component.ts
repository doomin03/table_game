import { BaseComponent } from "../BaseComponent.component";
import { Pawn } from "../script/Script.component";

import { GameMesh, GameObject } from "../../object/GameObject.module";
import { Vector3, Quaternion, } from "three";
import { Box, Sphere, Shape, Body, Vec3, ContactEquation } from "cannon-es";
import { GameManager } from "../../GameManager.module";

export type CollideEvent = {
    type: "collide";
    body: Body;
    contact: ContactEquation;
};

export class Gravity extends BaseComponent {

    private _body!: Body;
    public mass: number = 0;
    protected shape!: Shape;

    private _colliding = new Set<number>();
    private _tmpQuat = new Quaternion();

    private onCollide = (e: CollideEvent) => {
        const mesh = (e.body as any).mesh;
        this.gameObject.components.forEach((script: BaseComponent) => {
            if (script instanceof Pawn)
                script.onCollisionStay?.(mesh, e);
        });

        if (!this._colliding.has(e.body.id)) {
            this._colliding.add(e.body.id);
            this.gameObject.components.forEach((script: BaseComponent) => {
                if (script instanceof Pawn)
                    script.onCollisionEnter?.(mesh, e);
            });
        }
    }

    constructor(mesh: GameObject) {
        super(mesh);
    }
    private get world() {
        return GameManager.getInstance().world;
    }

    public get getBody() {
        return this._body
    }

    start(): void {
        this._body = new Body({
            shape: this.shape!,
            position: new Vec3(
                this.gameObject!.transform.position.x,
                this.gameObject!.transform.position.y,
                this.gameObject!.transform.position.z
            ),
            mass: this.mass,
        });

        (this._body as any).mesh = this.gameObject;
        this._body.addEventListener("collide", this.onCollide);
        this.world!.addBody(this._body);
    }



    update(delta: number): void {
        const p = this._body.position;
        this.gameObject.transform.position.set(p.x, p.y, p.z);
        this.gameObject.position.copy(this.gameObject.transform.position);

        const q = this._body.quaternion;

        this.gameObject.transform.rotation.set(q.x, q.y, q.z, q.w);

        this.gameObject.quaternion.copy(this.gameObject.transform.rotation);
    }


}

export class BoxShape extends Gravity {

    scale: Vector3 = new Vector3(1, 1, 1);

    constructor(mesh: GameObject) {
        super(mesh);
    }

    start(): void {
        this.shape = new Box(
            new Vec3(
                this.scale.x / 2,
                this.scale.y / 2,
                this.scale.z / 2,
            ),
        );
        super.start();
    }
}

export class SphereGravity extends Gravity {
    radius: number = 1;
    constructor(mesh: GameObject) {
        super(mesh);
    }

    start(): void {
        this.shape = new Sphere(this.radius);
        super.start();
    }

}