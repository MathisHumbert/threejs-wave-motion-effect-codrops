uniform sampler2D uTexture;

varying vec2 vUv;
varying float vWave;

void main(){
  float wave = vWave * 0.2;
  
  float r = texture2D(uTexture, vUv).r;
  float g = texture2D(uTexture, vUv).g;
  float b = texture2D(uTexture, vUv + wave).b;

  vec4 texture = vec4(r, g, b, 1.);
  gl_FragColor = texture;
}