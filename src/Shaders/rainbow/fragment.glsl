precision lowp float;
precision lowp int;




float time = 1.0;


vec3 color = vec3(1.0, 0.0, 0.0);
vec3 lightPosition = vec3(0.0, 1.25, 1.25);

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec2 vUv2;

void main() {
const int ps = 1;
   float x = vUv.x * 640.;
   float y = vUv.y * 480.;
   
	if (ps > 0)
	{
	   x = float(int(x / float(ps)) * ps);
	   y = float(int(y / float(ps)) * ps);
	}
	
   float mov0 = x+y+sin(time)*10.+sin(x/90.)*70.+time*2.;
   float mov1 = (mov0 / 5. + sin(mov0 / 30.))/ 10. + time * 3.;
   float mov2 = mov1 + sin(mov1)*5. + time*1.0;
   float cl1 = sin(sin(mov1/4. + time)+mov1);
   float c1 = cl1 +mov2/2.-mov1-mov2+time;
   float c2 = sin(c1+sin(mov0/100.+time)+sin(y/57.+time/50.)+sin((x+y)/200.)*2.);
   float c3 = abs(sin(c2+cos((mov1+mov2+c2) / 10.)+cos((mov2) / 10.)+sin(x/80.)));
  
   float dc = float(16-ps);
	
	if (ps > 0)
	{
   		cl1 = float(int(cl1*dc))/dc;
   		c2 = float(int(c2*dc))/dc;
   		c3 = float(int(c3*dc))/dc;
	}
	
    // ( red, green, blue, alpha ).
    gl_FragColor = vec4( cl1,c2,c3,1.0);

}