import { WebGLRenderer, Scene, PerspectiveCamera, Clock, AmbientLight } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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
        this.setEvent();
    }
    initData() {
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.append(this.renderer.domElement);
        this.scene = new Scene();
        const light = new AmbientLight(0xffffff, 1);
        this.scene.add(light);
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 3, -5);
        //TODO테스트
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.scene.add(this.camera);
    }
    setInitialObject(object) {
        const objectInstance = new object(this.scene, this.renderer);
        this.objects?.push(objectInstance);
        return this;
    }
    setInitialObjects(objects) {
        this.objects = objects.map((e) => {
            return new e(this.scene, this.renderer);
        });
        return this;
    }
    runGame() {
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
            this.renderer?.render(this.scene, this.camera);
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
