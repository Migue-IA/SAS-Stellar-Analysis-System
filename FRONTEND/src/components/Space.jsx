import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Earth from "./Earth";
import Nebula from "./Nebula";
import Starfield from "./Starfield";
import Controls from "./Controls";
import AtmosphereMesh from "./AtmosphereMesh";
import Asteroid from "./Asteroid";
import { Physics } from "@react-three/cannon";

const sunDirection = new THREE.Vector3(0, 0, 0);

export default function Space({ asteroid, isLaunched, onImpact }) {
  const availableModels = ["433 Eros (A898 PA)"];
  const radius = 1.5;
  const { x, y, z } = sunDirection;

  return (
    <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
      <directionalLight position={[x, y, z]} intensity={1.5} />

      <Physics>
        {asteroid &&
          <Asteroid asteroid={asteroid} isLaunched={isLaunched} onImpact={onImpact} />
        }
        <Earth />
      </Physics>

      <Nebula />
      <Starfield />
      <AtmosphereMesh radius={radius * 1.02} />
      <Controls />
    </Canvas>
  );
}
