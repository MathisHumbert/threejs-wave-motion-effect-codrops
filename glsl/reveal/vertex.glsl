#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform float uTime;
uniform float uHover;

varying vec2 vUv;

void main(){
  vec3 pos = position;

  pos.z += smoothstep(0., 0.5 - sin(pos.y), uHover) * 55.;

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}