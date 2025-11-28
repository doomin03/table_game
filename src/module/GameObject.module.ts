import { Mesh, BufferGeometry, Material, Object3D, Vector3 } from "three";

import { BaseComponent } from "./component/BaseComponent.component";

export class TransformData {
    position = new Vector3(0, 0, 0);
    scale = new Vector3(1, 1, 1);
    rotation = new Vector3(0, 0, 0);
}

export class GameObject extends Object3D {
    public components: BaseComponent[] = [];
    public transform: TransformData = new TransformData();

    setComponent<T extends BaseComponent>(
        Ctor: new (obejct: Object3D, ...args: any[]) => T,
        ...args: any[]
    ): T {
        const component = new Ctor(this, ...args);
        this.components.push(component);
        return component;
    }

    getComponent<T extends BaseComponent>(
        Ctor: new (...args: any[]) => T
    ): T | undefined {
        return this.components!.find(c => c instanceof Ctor) as T | undefined;
    }
}

export class GameMesh extends GameObject {
    gameMesh!: Mesh;

    constructor(geometry: BufferGeometry, material: Material){
        super();
        this.gameMesh = new Mesh(geometry, material);
        super.add(this.gameMesh)
    }
}