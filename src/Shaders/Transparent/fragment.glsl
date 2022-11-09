#extension GL_OES_standard_derivatives : enable

precision highp float;

vec3 color= vec3(0.59, 0.59, 0.59);
float start = 0.5;
float end=0.26;
float alpha=0.51;

varying vec3 fPosition;
varying vec3 fNormal;

void main()
{
  vec3 normal = normalize(fNormal);
  vec3 eye = normalize(-fPosition.xyz);
  float rim = smoothstep(start, end, 1.0 - dot(normal, eye));
  float value = clamp( rim, 0.0, 1.0 ) * alpha;
  gl_FragColor = vec4( value * color, length( value ) );
}