import { Mesh, BufferGeometry, Material, Object3D, Vector3, Quaternion } from "three";

import { BaseComponent } from "../component/BaseComponent.component";

export class TransformData {
    position = new Vector3(0, 0, 0);
    scale = new Vector3(1, 1, 1);
    rotation = new Quaternion();
}

type ComponentCtor<T extends BaseComponent, A extends any[] = any[]> =
    new (object: GameObject, ...args: A) => T;

export class GameObject extends Object3D {
    public components: BaseComponent[] = [];
    public transform: TransformData = new TransformData();

    setComponent<T extends BaseComponent, A extends any[]>(
        Ctor: ComponentCtor<T, A>,
        ...args: A
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

    constructor(geometry: BufferGeometry, material: Material) {
        super();
        this.gameMesh = new Mesh(geometry, material);
        super.add(this.gameMesh)
    }
}