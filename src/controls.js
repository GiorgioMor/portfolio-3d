import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export class PlayerControls {
    constructor(camera, canvas) {
        this.camera = camera;
        this.canvas = canvas;

        this.moveSpeed = 4; // m/s
        this.jumpSpeed = 5;

        this.ptr = new PointerLockControls(camera, canvas);

        // stato tasti
        this.keys = { forward: false, backward: false, left: false, right: false };
        this.velocity = new THREE.Vector3();

        // bind eventi
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));

        // HUD
        this.hudSpeed = null;
        const el = document.createElement('div'); el.id = 'hudSpeed'; el.textContent = 'Speed: 0'; document.body.appendChild(el); this.hudSpeed = el;

        // gestione blocco pointer
        this.ptr.addEventListener('lock', () => { document.getElementById('instructions').style.display = 'none'; });
        this.ptr.addEventListener('unlock', () => { document.getElementById('instructions').style.display = 'block'; });
    }

    lockPointer() { this.ptr.lock(); }

    onKeyDown(e) {
        switch (e.code) {
            case 'KeyW': this.keys.forward = true; break;
            case 'KeyS': this.keys.backward = true; break;
            case 'KeyA': this.keys.left = true; break;
            case 'KeyD': this.keys.right = true; break;
        }
    }
    onKeyUp(e) {
        switch (e.code) {
            case 'KeyW': this.keys.forward = false; break;
            case 'KeyS': this.keys.backward = false; break;
            case 'KeyA': this.keys.left = false; break;
            case 'KeyD': this.keys.right = false; break;
        }
    }

    update(dt) {
        // dt in secondi
        const dir = new THREE.Vector3();
        const forward = (this.keys.forward ? 1 : 0) - (this.keys.backward ? 1 : 0);
        const strafe = (this.keys.right ? 1 : 0) - (this.keys.left ? 1 : 0);

        // vettore locale
        dir.set(strafe, 0, forward).normalize();
        if (dir.lengthSq() > 0) {
            // muovi nella direzione della camera (senza y)
            const quat = this.camera.quaternion.clone();
            const forwardVec = new THREE.Vector3(0, 0, -1).applyQuaternion(quat);
            const rightVec = new THREE.Vector3(1, 0, 0).applyQuaternion(quat);

            // proietta su piano y=0
            forwardVec.y = 0; forwardVec.normalize();
            rightVec.y = 0; rightVec.normalize();

            const move = new THREE.Vector3();
            move.addScaledVector(forwardVec, forward);
            move.addScaledVector(rightVec, strafe);
            move.normalize();

            move.multiplyScalar(this.moveSpeed * dt);

            // applica la traslazione tramite il controller pointerLock (che gestisce posizione internamente)
            this.ptr.position.add(move);

            // aggiorna HUD
            this.hudSpeed.textContent = 'Speed: ' + (this.moveSpeed).toFixed(1);
        } else {
            // ferma HUD
            this.hudSpeed.textContent = 'Speed: 0';
        }
    }
}
