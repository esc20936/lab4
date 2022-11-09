
precision highp float;
precision highp int;

uniform mat4 modelMatrix;



uniform vec3 cameraPosition;



uniform vec3 edgecolor;
uniform vec3 lightPosition;

varying vec3 vPosition;
varying vec3 vNormal;


void main() {
    vec3 color = vec3(1.0, 0.0, 0.0);
   
    vec3 worldPosition = ( modelMatrix * vec4( vPosition, 1.0 )).xyz;

    vec3 worldNormal = normalize( vec3( modelMatrix * vec4( vNormal, 0.0 ) ) );

    vec3 lightVector = normalize( lightPosition - worldPosition );
    
    vec3 cameraVector = normalize( cameraPosition - worldPosition );
    
    float colordiff = 0.6;
    
    vec3 unlitColor = vec3(color.x - colordiff, color.y - colordiff, color.z - colordiff);
    
    vec3 specularColor = vec3(color.x + colordiff, color.y + colordiff, color.z + colordiff);

    float brightness = dot( worldNormal, lightVector );
    
    vec3 reflectance = normalize(2.0 * dot(lightVector,worldNormal)*worldNormal-lightVector);

    
    if(dot(cameraVector,worldNormal)<0.3){
        gl_FragColor = vec4(edgecolor,1.0);
    } else {
        if (dot(worldNormal,lightVector)>0.0){
            gl_FragColor = vec4(color,1.0);
            if (length(cameraVector - reflectance)<0.6){
                if(length(worldNormal - reflectance) > 0.2){
                    gl_FragColor = vec4(specularColor,1.0);
                }
            }
        } else {
            gl_FragColor = vec4(unlitColor,1.0);
        }
        

    }
    

}