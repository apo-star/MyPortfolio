import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useAction } from "../../../store";
import { useEffect, useMemo } from "react";

type GLTFResult = GLTF & {
  nodes: {
    Solid002_letters_0: THREE.Mesh;
    Solid002_Material001_0: THREE.Mesh;
  };
  materials: {
    letters: THREE.MeshPhysicalMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

export function MainDice(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/dice.glb") as GLTFResult;
  const { startRoll } = useAction(["startRoll"]);

  useMemo(() => {
    if (startRoll) {
      console.log("startRoll");
    }
  }, [startRoll]);

  return (
    <group {...props} dispose={null}>
      <group
        rotation={[0.3, Math.PI, 0]}
        scale={[2.5, 2.5, 2.5]}
        position={[0, 0.8, 0]}
      >
        <mesh
          geometry={nodes.Solid002_letters_0.geometry}
          material={materials.letters}
        />
        <mesh geometry={nodes.Solid002_Material001_0.geometry}>
          <meshStandardMaterial
            transparent
            opacity={0.9}
            roughness={0.1}
            metalness={1}
            emissive={0xffffff}
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/dice.glb");
