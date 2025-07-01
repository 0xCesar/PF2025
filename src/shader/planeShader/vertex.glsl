uniform sampler2D uTrail;
uniform float uProgress;

varying vec2 vUv;

void main() {
    vUv = uv;

    float trailValue = texture2D(uTrail, uv).r;

    float distortion = trailValue * 0.3;

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

 
      float frequency = 35.0;     
      float amplitude = 0.2;    
      float wave = sin(dist * frequency - uProgress * 6.2831) * amplitude * strength;

      newPosition.xy += dir * (amount + wave);
    } 
  /**  if ( uProgress > 0.7){
         newPosition.x = position.x;
        newPosition.y = position.y;
    } */

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
/*varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}*/


/*
uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x  - uTime) * 0.1;
    elevation += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vElevation = elevation;
}
*/
