import { WebGLRenderer, Scene, PerspectiveCamera, Clock } from "three";
export class GameObject {
    constructor(scene, renderer) {
        this.scene = scene;
        this.renderer = renderer;
    }
}
export class GameManager {
    constructor() {
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.objects = null;
        this.initData();
    }
    initData() {
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.append(this.renderer.domElement);
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.scene.add(this.camera);
    }
    setInitialObject(object) {
        const objectInstance = new object(this.scene, this.renderer);
        this.objects?.push(objectInstance);
        return this;
    }
    start() {
        const clock = new Clock();
        if (!this.objects)
            throw new Error("연결된 게임 오브젝트가 존재하지 않음");
        this.objects.forEach((e) => {
            e.Start();
        });
        this.renderer?.setAnimationLoop(() => {
            const delta = clock.getDelta();
            this.objects?.forEach((e) => {
                e.update(delta);
            });
        });
    }
    setEvent() {
        window.addEventListener('resize', () => {
            if (!this.renderer || !this.camera || !this.scene)
                return;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.render(this.scene, this.camera);
        });
    }
}
