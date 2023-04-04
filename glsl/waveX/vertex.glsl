#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform float uTime;
uniform float uHover;

varying vec2 vUv;
varying float vWave;

void main(){
  vec3 pos = position;

  float noiseFreq = 4.;
  float noiseAmp = 20.; 
  
  pos.z += snoise3(vec3(pos.x * noiseFreq + uTime, pos.y, 0. )) * noiseAmp * uHover;
  vWave = pos.z;
  pos.z *= 3.;

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}