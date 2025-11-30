import { TextureLoader, Texture, LoadingManager } from "three";

type TextureTag = "brick" | "metal" | "ui" | "etc";

export class TextureManager {
  private static _instance: TextureManager | null = null;
  static get instance(): TextureManager {
    if (!this._instance) {
      this._instance = new TextureManager();
    }
    return this._instance;
  }

  private loader: TextureLoader;
  private basePath = "../../assets/textures/";
  private tagPathMap = new Map<TextureTag, string>();
  private cache = new Map<string, Texture>();

  private constructor() {
    const manager = new LoadingManager();
    this.loader = new TextureLoader(manager);

    this.tagPathMap.set("brick", "brick/");
    this.tagPathMap.set("metal", "metal/");
    this.tagPathMap.set("ui", "ui/");
    this.tagPathMap.set("etc", "");
  }

  setBasePath(path: string) {
    this.basePath = path.endsWith("/") ? path : path + "/";
  }

  setTagPath(tag: TextureTag, relativePath: string) {
    this.tagPathMap.set(tag, relativePath.endsWith("/") ? relativePath : relativePath + "/");
  }

  get(tag: TextureTag, fileName: string, folderName: string = ""): Texture {
    const relativeDir = this.tagPathMap.get(tag) ?? "";
    const folder =
      folderName.length > 0
        ? folderName.endsWith("/") ? folderName : folderName + "/"
        : "";

    const fullPath = this.basePath + relativeDir + folder + fileName;
    
    console.log(fullPath);

    if (this.cache.has(fullPath)) {
      return this.cache.get(fullPath)!;
    }

    const tex = this.loader.load(fullPath);
    this.cache.set(fullPath, tex);
    return tex;
  }
}
