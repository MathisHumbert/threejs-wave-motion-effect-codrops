import * as THREE from 'three';
import gsap from 'gsap';

export default class Plane {
  constructor(plane, vertex, fragment, scene) {
    this.plane = plane;
    this.vertex = vertex;
    this.fragment = fragment;
    this.scene = scene.scene;
    this.width = scene.width;
    this.height = scene.height;
    this.scroll = scene.lenis.animatedScroll;
    this.hover = false;

    this.fig = this.plane.querySelector('.item__fig');
    this.img = this.plane.querySelector('.item__img');

    this.texture = scene.textures[this.img.attributes.src.value];

    this.initPlane();
    this.addEvents();
  }

  initPlane() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 16, 16);
    this.material = new THREE.ShaderMaterial({
      fragmentShader: this.fragment,
      vertexShader: this.vertex,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.texture },
        uHover: { value: 0 },
      },
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.mesh);

    this.setBounds();
  }

  setBounds() {
    const rect = this.fig.getBoundingClientRect();

    this.bounds = {
      left: rect.left,
      top: rect.top + this.scroll,
      width: rect.width,
      height: rect.height,
    };

    this.mesh.scale.set(this.bounds.width, this.bounds.height, 1);

    this.mesh.position.x =
      this.bounds.left - this.width / 2 + this.bounds.width / 2;
    this.mesh.position.y =
      this.scroll - this.bounds.top + this.height / 2 - this.bounds.height / 2;
  }

  setPosition() {
    this.mesh.position.y =
      this.scroll - this.bounds.top + this.height / 2 - this.bounds.height / 2;
  }

  onResize(width, height) {
    this.width = width;
    this.height = height;

    this.setBounds();
  }

  onScroll(scroll) {
    this.scroll = scroll;

    this.setPosition();
  }

  addEvents() {
    this.onMouseEnter();
    this.onMouseLeave();
  }

  onMouseEnter() {
    this.fig.addEventListener('mouseenter', () => {
      this.hover = true;
      gsap.to(this.material.uniforms.uHover, { value: 1 });
    });
  }

  onMouseLeave() {
    this.fig.addEventListener('mouseleave', () => {
      this.hover = false;
      gsap.to(this.material.uniforms.uHover, { value: 0 });
    });
  }

  update(time) {
    if (this.hover) {
      this.material.uniforms.uTime.value = time;
    }
  }
}
