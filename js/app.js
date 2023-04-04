import FontFaceObserver from 'fontfaceobserver';
import imagesLoaded from 'imagesloaded';
import * as THREE from 'three';

import Scene from './Scene';

// Loading
const fontPragmaticaExtended = new Promise((resolve) => {
  new FontFaceObserver('pragmatica-extended').load().then(() => {
    resolve();
  });
});

const fontVorticeConcept = new Promise((resolve) => {
  new FontFaceObserver('vortice-concept').load().then(() => {
    resolve();
  });
});

const preloadImages = new Promise((resolve) => {
  imagesLoaded(document.querySelectorAll('img'), { background: true }, resolve);
});

const textureLoader = new THREE.TextureLoader();

const loadedTextures = {};

const textureUrls = [
  '/img/img-01.jpg',
  '/img/img-02.jpg',
  '/img/img-03.jpg',
  '/img/img-04.jpg',
  '/img/img-05.jpg',
  '/img/img-06.jpg',
  '/img/img-07.jpg',
  '/img/img-08.jpg',
  '/img/img-09.jpg',
];

const loadTextures = Promise.all(
  textureUrls.map(
    (url) =>
      new Promise((resolve) => {
        textureLoader.load(url, (texture) => {
          loadedTextures[url] = texture;
          resolve(texture);
        });
      })
  )
);

Promise.all([
  fontPragmaticaExtended,
  fontVorticeConcept,
  preloadImages,
  loadTextures,
]).then(() => {
  document.body.classList.remove('loading');
  new Scene(document.querySelector('.webgl'), loadedTextures);
});
