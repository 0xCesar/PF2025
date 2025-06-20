varying vec2 vUv;
uniform vec2 uMouse;
uniform sampler2D uPrev;

void main(){
    vec4 prev = texture2D(uPrev, vUv);

    float dist = distance(vUv, uMouse);
    float strength = exp(-dist * 100.0); // Circle around mouse;

    vec4 ink = vec4(strength);

    gl_FragColor = max(prev * 0.98, ink);
}