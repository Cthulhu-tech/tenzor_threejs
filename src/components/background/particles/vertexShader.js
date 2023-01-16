export const vertexShader = `
uniform float uTime;
uniform float uRadius;

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}


void main() {
  float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
  // rotation3dY(время * скорость * растояние)
  vec3 particlePosition = position * rotation3dY(uTime * 0.025 * distanceFactor);

  vec4 modelPosition = modelMatrix * vec4(particlePosition, .5);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  // размер партиклов
  gl_PointSize = 1.0;
}

`
