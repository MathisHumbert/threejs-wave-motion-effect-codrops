uniform sampler2D uTexture;
uniform float uHover;

varying vec2 vUv;
varying float vWave;

void main(){
  float count = 10.;
  float smoothness = 0.5;

  float pr = smoothstep(-smoothness, 0., vUv.y - (1. - uHover) * (1. + smoothness));
  float s = 1. - step(pr, fract(count * vUv.y));

  vec4 texture = texture2D(uTexture, vUv * s);

  gl_FragColor = texture;
}