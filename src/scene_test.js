import * as THREE from 'three';

export function createTestScene(scene) {
    // terreno
    const geo = new THREE.PlaneGeometry(200, 200);
    const mat = new THREE.MeshStandardMaterial({ color: 0x228833, roughness: 1 });
    const plane = new THREE.Mesh(geo, mat);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // cubi
    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    const boxMat1 = new THREE.MeshStandardMaterial({ color: 0xff5555 });
    const boxMat2 = new THREE.MeshStandardMaterial({ color: 0x5555ff });
    const positions = [[-8, 1, -8], [6, 1, -10], [10, 1, 5], [-4, 1, 12]];
    positions.forEach((p, i) => {
        const m = new THREE.Mesh(boxGeo, i % 2 ? boxMat1 : boxMat2);
        m.position.set(p[0], p[1], p[2]);
        scene.add(m);
    });

    // luce ambient e hemisphere per cielo - non funge
    const hemi = new THREE.HemisphereLight(0x87CEEB, 0x444422, 0.6);
    scene.add(hemi);

    // qualche albero/oggetto low poly
    for (let i = 0; i < 8; i++) {
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1), new THREE.MeshStandardMaterial({ color: 0x6b3 }));
        const crown = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2, 8), new THREE.MeshStandardMaterial({ color: 0x1e8b2f }));
        trunk.position.set((Math.random() * 80) - 40, 0.5, (Math.random() * 80) - 40);
        crown.position.set(trunk.position.x, 1.7, trunk.position.z);
        scene.add(trunk); scene.add(crown);
    }
}
