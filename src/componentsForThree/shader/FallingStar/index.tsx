import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

const particlesFrag = `
uniform float iTime;
uniform vec2 iResolution;

highp float hash(highp vec2 x) {
    return fract(sin(dot(x,vec2(11,57)))*4e3);
}

highp float star(highp vec2 x) {
    x *= mat2(cos(0.5),-sin(0.5),sin(0.5),cos(0.5));
    x.y += iTime*16.0;
    highp float shape = (1.0-length(fract(x-vec2(0,0.5))-0.5));
    x *= vec2(1, 0.1);
    highp vec2 fr = fract(x);
    highp float random = step(hash(floor(x)),0.01), tall = (1.0-(abs(fr.x-0.5)+fr.y))*random;

    return clamp(clamp((shape-random)*step(hash(floor(x+vec2(0,0.05))),0.01),0.0,1.0)+tall,0.0,1.0);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord.xy-iResolution.xy*0.5)/(
    iResolution.x, iResolution.y);

    fragColor = pow(vec4(star(uv*24.0))*1.1, vec4(16,6,4,1));
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

export const FallingStar = () => {
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
