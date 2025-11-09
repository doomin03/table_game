import { TextureLoader, Texture } from "three";
export class GameTextureLoader {
    constructor() {
        this.loader = null;
        this.loader = new TextureLoader();
    }
    setPath(path) {
        this.loader.setPath(path);
        return this;
    }
    getLoader(texture) {
        return this.loader.load(texture);
    }
}
