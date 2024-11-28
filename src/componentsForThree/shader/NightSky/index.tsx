import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

const particlesFrag = `
uniform float iTime;
uniform vec2 iResolution;

#define MAX_MOVEMENT_SPEED 0.02
#define MIN_RADIUS 0.01
#define MAX_RADIUS 0.3
#define STAR_COUNT 200
#define PI 3.14159265358979323
#define TWOPI 6.283185307

#define RADIUS_SEED 1337.0
#define START_POS_SEED 2468.0
#define THETA_SEED 1675.0

const vec3 backgroundColor = vec3(0.0, 0.0, 0.3);
const vec3 starColor = vec3(1.0, 1.0, 1.0);

float rand(float s1, float s2)
{
	return fract(sin(dot(vec2(s1, s2), vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 cartesian(vec2 p)
{
	return vec2(p.x * cos(p.y), p.x * sin(p.y));
}

vec3 renderBackground(vec2 uv, float aspect)
{
	vec2 center = vec2(0.0);
	float dist = length(uv - center);
	vec3 col = clamp(1.0 / (dist + 1.5), 0.0, 1.0) * backgroundColor;
	return col;
}

vec3 renderStars(vec2 uv, float aspect)
{
	vec3 col = vec3(0.0);
	float maxDistance = aspect;

	for (int i = 0; i < STAR_COUNT; ++i) {
		// setup radius
		float radiusrand = rand(float(i), RADIUS_SEED);
		float rad = MIN_RADIUS + radiusrand * (MAX_RADIUS - MIN_RADIUS);
		
		// compute star position
		float startr = rand(float(i), START_POS_SEED) * maxDistance;
		float speed = radiusrand * MAX_MOVEMENT_SPEED;
		float r = mod(startr + iTime * speed, max(1.0, maxDistance));
		float theta = rand(float(i), THETA_SEED) * TWOPI;
		vec2 pos = cartesian(vec2(r, theta));
		pos.x *= aspect;
		
		// blending/effects
		float dist = length(uv - pos);
		float distFromStarCenter = dist / rad;
		float distTraveled = r / maxDistance;
		float shape = clamp(1.0 / (50.0 * (1.0 / distTraveled) * distFromStarCenter) - 0.05, 0.0, 1.0);
		
		col += starColor * step(dist, rad) * shape;
	}
	return col;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	float aspect = iResolution.x / iResolution.y;
	vec2 uv = -1.0 + 2.0 * (fragCoord.xy / iResolution.xy);
	uv.x *= aspect;
	
	vec3 col = renderBackground(uv, aspect);
	col += renderStars(uv, aspect);
	
	fragColor = vec4(col.xyz, 1.0);
}

varying vec2 vUv;
void main() {
  mainImage(gl_FragColor, vUv * iResolution.xy);
}`;

const particlesVert = `varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 0.5 );
}`;

export const NightSky = () => {
  const ref = useRef<any>();
  const { camera } = useThree();
  const [uni] = useState({
    iTime: { value: 1.0 },
    iResolution: {
      type: "v2",
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
  });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useFrame(({ clock }) => {
    uni.iTime.value = clock.getElapsedTime();
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getPlaneSize = () => {
    if (!camera) return { width: 1, height: 1 };

    const aspect = windowSize.width / windowSize.height;
    const fov = 78 * (Math.PI / 180);
    const distance = 8;
    const planeWidth = 2 * Math.tan(fov / 2) * distance;
    const planeHeight = planeWidth / aspect;

    return { width: planeWidth, height: planeHeight };
  };

  const { width, height } = getPlaneSize();

  return (
    <mesh ref={ref}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        vertexShader={particlesVert}
        fragmentShader={particlesFrag}
        uniforms={uni}
        transparent
      />
    </mesh>
  );
};
