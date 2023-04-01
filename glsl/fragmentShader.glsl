uniform sampler2D uTexture;
uniform float uHover;

varying vec2 vUv;
varying float vWave;

void main(){
  float wave = vWave * 0.05;
  
  float r = texture2D(uTexture, vUv + vec2(0., 0.) + uHover *  wave * 0.05).r;
  float g = texture2D(uTexture, vUv + vec2(0., 0.) +  uHover * wave * 0.0).g;
  float b = texture2D(uTexture, vUv + vec2(0., 0.) +   uHover * wave *  -0.02).b;

  vec4 texture = vec4(r, g, b, 1.);
  gl_FragColor = texture;
}