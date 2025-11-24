import { BaseComponent } from "../BaseComponent.component";
import { GameMesh, Pawn } from "../../GameObject.module";
import { Vector3, Quaternion } from "three";
import { Box, Sphere, Shape, Body, Vec3, ContactEquation } from "cannon-es";
import { GameManager } from "../../GameManager.module";

export type CollideEvent = {
    type: "collide";
    body: Body;
    contact: ContactEquation;
};

export class Gravity extends BaseComponent {

    private _body: Body | null = null
    mass: number = 0;
    protected shape!: Shape;

    private _colliding = new Set<number>();
    private _tmpPos = new Vector3();
    private _tmpQuat = new Quaternion();

    private onCollide = (e: CollideEvent) => {
        const mesh = (e.body as any).mesh;
        (this.mesh.script as Pawn)?.onCollisionStay?.(mesh, e);
        if (!this._colliding.has(e.body.id)) {
            this._colliding.add(e.body.id);
            (this.mesh.script as Pawn)?.onCollisionEnter?.(mesh, e);
        }
    }

    constructor(mesh: GameMesh) {
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
                this.mesh!.position.x,
                this.mesh!.position.y,
                this.mesh!.position.z
            ),
            mass: this.mass,
        });

        (this._body as any).mesh = this.mesh;
        this._body.addEventListener("collide", this.onCollide);
        this.world!.addBody(this._body);
    }



    update(delta: number): void {
        if (!this._body) return;

        const p = this._body.position;
        this._tmpPos.set(p.x, p.y, p.z);
        this.mesh!.position.copy(this._tmpPos);

        const q = this._body.quaternion;
        this._tmpQuat.set(q.x, q.y, q.z, q.w);
        this.mesh!.quaternion.copy(this._tmpQuat);
    }


}

export class BoxShape extends Gravity {

    scale: Vector3 = new Vector3(1, 1, 1);

    constructor(mesh: GameMesh) {
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
    constructor(mesh: GameMesh) {
        super(mesh);
    }

    start(): void {
        this.shape = new Sphere(this.radius);
        super.start();
    }

}