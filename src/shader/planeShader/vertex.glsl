uniform sampler2D uTrail;
uniform float uProgress;

varying vec2 vUv;

void main() {
    vUv = uv;

    float trailValue = texture2D(uTrail, uv).r;

    float distortion = trailValue * 0.3;

    vec3 newPosition = position;
    newPosition.z += distortion;
    if(uProgress != 0.0){
      newPosition.z += distortion * uProgress;
          newPosition.z += sin(uv.x * 10.0 + uProgress * 3.14) * 0.05 * uProgress;
    }






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
