import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Backgroud } from "../Background";
import { MainDice } from "../models/MainDice";

export const Scene = () => {
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
      }}
      camera={{
        fov: 75,
        near: 0.1,
        far: 2000,
        position: [0, 0, 5],
      }}
    >
      <ambientLight intensity={10} />
      <pointLight position={[10, 10, 10]} intensity={10} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <OrbitControls
        makeDefault
        enableRotate={false}
        enablePan={false}
        enableZoom={false}
      />
      <Environment preset="city" />
      <Backgroud />
      <MainDice />
    </Canvas>
  );
};
