import * as THREE from 'three';

export class Engine {
    constructor({ canvas }) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 1.6, 5);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.clock = new THREE.Clock();
        this._updateCallbacks = [];

        const amb = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(amb);
        
        const dir = new THREE.DirectionalLight(0xffffff, 0.8);
        dir.position.set(5, 10, 7);
        this.scene.add(dir);

        window.addEventListener('resize', () => this.onResize());
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    addUpdateCallback(cb) { this._updateCallbacks.push(cb); }

    start() {
        this.renderer.setAnimationLoop(() => this.loop());
    }

    loop() {
        const dt = this.clock.getDelta();
        for (const cb of this._updateCallbacks) try { cb(dt) } catch (e) { console.error(e) }
        this.renderer.render(this.scene, this.camera);
    }
}
