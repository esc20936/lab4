import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import model from "./assets/spiderman.glb?url";
// import gradientT from "./assets/3.jpg?url";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);

camera.position.x = 0;
camera.position.y = 5;
camera.position.z = 3;
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
let gradientTexture = textureLoader.load("/3.jpg");
const material = new THREE.MeshToonMaterial({ 
                gradientMap: gradientTexture })
// load spiderman  glb model
let spiderman = null;
const gltfLoader = new GLTFLoader();
gltfLoader.load(model, (gltf) => {
  gltf.scene.traverse((child) => {

    if (child.isMesh) {
        console.log(child);
        child.material = material;
    }
    if (child.type == "SkinnedMesh") {
        child.frustumCulled = false;
        child.material = material;
      }

   
  });
  spiderman = gltf.scene;
  spiderman.scale.set(2, 2, 2);
  spiderman.position.set(0, -1, 0);

  scene.add(spiderman);
});


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add light to model
const ambientLight = new THREE.AmbientLight(0x000000, 0.5);
scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xff0000, 1);
// pointLight.position.set(-1, 2, 0);
// scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xfff, 1);
pointLight2.position.set(1, 2, 0);
scene.add(pointLight2);


window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

});
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    renderer.render(scene, camera);
    controls.update();

    window.requestAnimationFrame(tick);

};

tick();