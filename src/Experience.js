import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import model from "./assets/spiderman.glb?url";
// import gradientT from "./assets/3.jpg?url";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import toonVertexShader from './Shaders/toon/vertex.glsl'
import toonFragmentShader from './Shaders/toon/fragment.glsl'

import oilVertexShader from './Shaders/oil/vertex.glsl'
import oilFragmentShader from './Shaders/oil/fragment.glsl'

import transparentVertexShader from './Shaders/Transparent/vertex.glsl'
import transparentFragmentShader from './Shaders/Transparent/fragment.glsl'

import rainbowVertexShader from './Shaders/rainbow/vertex.glsl'
import rainbowFragmentShader from './Shaders/rainbow/fragment.glsl'


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

const convertToRadians = (angle) => {
    return angle * (Math.PI / 180);
}

camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 30;
scene.add(camera);


const oilShader = new THREE.RawShaderMaterial({
    vertexShader: oilVertexShader,
    fragmentShader: oilFragmentShader,
    // wireframe: true,
});
const toonShader = new THREE.RawShaderMaterial({
    vertexShader: toonVertexShader,
    fragmentShader: toonFragmentShader,
    // wireframe: true,
});

const transparentShader = new THREE.RawShaderMaterial({
    vertexShader: transparentVertexShader,
    fragmentShader: transparentFragmentShader,
    // wireframe: true,
});

const rainbowShader = new THREE.RawShaderMaterial({
    vertexShader: rainbowVertexShader,
    fragmentShader: rainbowFragmentShader,
    wireframe: true,
});

const shadersArray = [toonShader,oilShader , transparentShader, rainbowShader];
let CONT = 0;


const tourus = new THREE.Mesh(
    new THREE.TorusKnotGeometry(10, 3, 143, 15),
    shadersArray[CONT]
);
scene.add(tourus);

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
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xff0000, 1);
// pointLight.position.set(-1, 2, 0);
// scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xfff, 1);
pointLight2.position.set(1, 2, 0);
scene.add(pointLight2);


// event on key press
document.addEventListener("keydown", (event) => {
    if (event.code == "KeyA") {
        CONT++;
        if (CONT >= shadersArray.length) {
            CONT = 0;
        }
        tourus.material = shadersArray[CONT];
    }
});

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