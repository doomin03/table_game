import { Gravity } from "@engine/component/gravity/Gravity.component";
import { Pawn } from "@engine/component/script/Script.component";
import { BoxGeometry, MeshStandardMaterial, Mesh, Vector3, BufferGeometry, Material } from "three";

export class Ground extends Pawn {
    private _bullets: number = 10;
    width: number = 1;
    height: number = 1;

    public get bullet() {
        return this._bullets;
    }

    start(): void {

    }

    update(delta: number): void {


        const gravity = this.gameObject.getComponent(Gravity);
        if (gravity && this._bullets <= 0) {
            gravity.setMass(1);
            console.log(1234);
        }
    }

    returnBullet(needBullet: number): number {
        if (this._bullets < 0) {
            return 0;
        }

        if (this._bullets - needBullet < 0) {
            const result = this._bullets - needBullet;
            const useBullet = this._bullets - result
            this._bullets -= useBullet;
            console.log(useBullet);

            return useBullet;
        }
        this._bullets -= needBullet;
        console.log(this._bullets);
        return needBullet;
    }
}