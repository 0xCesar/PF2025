uniform sampler2D uTrail;
uniform sampler2D uTexture;
uniform float uProgress;

varying vec2 vUv;

void main() {
    float trailValue = texture2D(uTrail, vUv).r;

    vec3 textureColor = texture2D(uTexture, vUv).rgb;

  //vec3 finalColor = mix(textureColor, vec3(1.0, 0.8, 0.8), uProgress * trailValue);

   // vec3 baseColor = mix(textureColor, vec3(0.1, 0.0, 0.0), trailValue);
    gl_FragColor = vec4(textureColor, 1.0);
}



/*
uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.65;
  // gl_FragColor = textureColor;
    gl_FragColor = vec4(vUv, 0.5, 1.0);
}*/