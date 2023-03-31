#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform float uTime;

varying vec2 vUv;
varying float vWave;

void main(){
  vec3 pos = position;

  float noiseFreq = 3.5;
  float noiseAmp = 150.; 
  vec3 noisePos = vec3(pos.x * 0.001 * noiseFreq + uTime, pos.y * 0.001, pos.z * 0.001);

  pos.z += snoise3(noisePos) * noiseAmp;

  vUv = uv;
  vWave = pos.z * 0.001;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}