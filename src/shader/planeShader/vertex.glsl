uniform sampler2D uTrail;
uniform float uProgress;

varying vec2 vUv;

void main() {
    vUv = uv;

    float trailValue = texture2D(uTrail, uv).r;

    float distortion = trailValue * 23.11;

    vec3 newPosition = position;
    newPosition.z += distortion * 2.5;
    if (uProgress > 0.001){
      /*
     // Effet Radio
       vec2 center = vec2(0.5);
      vec2 offset = vUv - center;
      vec2 dir = length(offset) > 0.0001 ? normalize(offset) : vec2(0.0);

      // Radial deformation
      float strength = clamp(1.0 - abs(uProgress - 0.5) * 2.0, 0.0, 1.0);
      float amount = strength * 0.25;
      vec2 radialDisplacement = dir * amount;

      // Wave setting
      float waveFreq = 50.0; // nombre d’ondes sur l’axe
      float waveAmp = 0.9;  // amplitude des ondes
      float wave = sin(vUv.x * waveFreq + uProgress * 6.2831) * waveAmp * strength; // 2π ≈ 6.2831

      // Appliquer tout sur la position
      newPosition.xy += radialDisplacement;
      newPosition.y += wave; */

      /**
      // Refactor Simple
      vec2 center = vec2(0.5);
      vec2 offset = vUv - center;
      float dist = length(offset);


      vec2 dir = dist > 0.0001 ? normalize(offset) : vec2(0.0);
      float strength = clamp(1.0 - abs(uProgress - 0.5) * 2.0, 0.0, 1.0);
      float amount = strength * 0.2;

      float wave = sin(dist * 30.0 - uProgress * 6.2831) * 0.05 * strength;
      newPosition.xy += dir * (amount + wave); */

      vec2 center = vec2(0.5);
      vec2 offset = vUv - center;
      float dist = length(offset);

      vec2 dir = dist > 0.0001 ? normalize(offset) : vec2(0.0);
      

      float strength = clamp(1.0 - abs(uProgress - 0.5) * 2.0, 0.0, 1.0);
      float amount = strength * 0.2;

 
      float frequency = 20.0;     
      float amplitude = 8.0; 
      float wave = sin(dist * frequency - uProgress * 6.2831) * amplitude * strength;

      newPosition.xy += dir * (amount + wave);
    } 


    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
