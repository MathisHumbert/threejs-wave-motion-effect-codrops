uniform sampler2D uTexture;
uniform float uHover;

varying vec2 vUv;
varying float vWave;

void main(){
  vec2 newUv = vUv;
  newUv.y += vWave * 0.003;

  float r = texture2D(uTexture, newUv + vec2(0, 0)).r;
  float g = texture2D(uTexture, newUv + vec2(0, 0)).g;
  float b = texture2D(uTexture, newUv + vec2(0, -0.02)).b;

  gl_FragColor = vec4(r, g, b, 1.);
}