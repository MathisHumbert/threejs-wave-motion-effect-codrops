import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import fragmentShader from '../glsl/fragmentShader.glsl';
import vertexShader from '../glsl/vertexShader.glsl';

export default class Scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.clock = new THREE.Clock();
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    const perspective = 800;
    const fov = 2 * Math.atan(this.height / 2 / perspective) * (180 / Math.PI);

    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = perspective;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(this.width, this.height);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/img/img-03.jpg');

    // Object
    this.geometry = new THREE.PlaneGeometry(400, 600, 16, 16);
    this.material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
      },
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.mesh);

    this.update();
  }

  update() {
    const elaspedTime = this.clock.getElapsedTime();

    this.material.uniforms.uTime.value = elaspedTime;

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.update());
  }
}
