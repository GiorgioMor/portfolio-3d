import { Engine } from './engine.js';
import { createTestScene } from './scene_test.js';
import { PlayerControls } from './controls.js';

const canvas = document.getElementById('scene');
const engine = new Engine({ canvas });

createTestScene(engine.scene);

// inizializza i controlli (pointer lock + WASD)
const controls = new PlayerControls(engine.camera, canvas);
engine.scene.add(controls.ptr);
engine.addUpdateCallback((dt) => controls.update(dt));

// HUD: start button
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', () => controls.lockPointer());

engine.start();

// Mostra nome zona base
document.getElementById('zoneName').textContent = 'Roma — Infanzia (Zona di test)';
