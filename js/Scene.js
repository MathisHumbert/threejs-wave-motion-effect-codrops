import * as THREE from 'three';
import Lenis from '@studio-freight/lenis';

import Plane from './Plane';
export default class Scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.clock = new THREE.Clock();

    this.initScroll();
    this.initThree();
    this.initPlanes();
    this.addEvents();
    this.update();
  }

  initThree() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.perspective = 800;
    const fov =
      2 * Math.atan(this.height / 2 / this.perspective) * (180 / Math.PI);

    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.width / this.height,
      0.1,
      1000
    );

    this.camera.position.z = this.perspective;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(1);
  }

  initScroll() {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    this.lenis = lenis;
  }

  initPlanes() {
    const [...items] = document.querySelectorAll('.item');

    this.planes = items.map((el) => new Plane(el, this));
  }

  addEvents() {
    this.onResize();
    this.onScroll();
  }

  onResize() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(1);

      this.camera.aspect = this.width / this.height;
      this.camera.fov =
        2 * Math.atan(this.height / 2 / this.perspective) * (180 / Math.PI);
      this.camera.updateProjectionMatrix();

      for (const plane of this.planes) {
        plane.onResize(this.width, this.height);
      }
    });
  }

  onScroll() {
    this.lenis.on('scroll', (e) => {
      for (const plane of this.planes) {
        plane.onScroll(e.scroll);
      }
    });
  }

  update() {
    const elaspedTime = this.clock.getElapsedTime();

    for (const plane of this.planes) {
      plane.update(elaspedTime);
    }

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.update());
  }
}
