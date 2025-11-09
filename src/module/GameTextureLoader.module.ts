import { TextureLoader, Texture } from "three";


export class GameTextureLoader {
    loader: TextureLoader | null = null;

    constructor() {
        this.loader = new TextureLoader();
    }

    setPath(path: string): GameTextureLoader {
        this.loader!.setPath(path);
        return this;
    }

    getLoader(texture: string): Texture {
        return this.loader!.load(texture);
    }
}