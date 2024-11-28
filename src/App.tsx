import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { FallingStar } from "./componentsForThree/shader/FallingStar";

function App() {
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
        far: 200,
        position: [10, 4, 10],
      }}
    >
      <ambientLight intensity={10} />
      <pointLight position={[10, 10, 10]} intensity={10} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <OrbitControls makeDefault />
      <Environment preset="city" />
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <FallingStar />
    </Canvas>
  );
}

export default App;