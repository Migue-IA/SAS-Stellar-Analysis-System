import { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useSphere } from "@react-three/cannon";
import useAsteroid from "../data/useAsteroid";

export default function Asteroid({ asteroid, isLaunched, onImpact, ...props }) {
  const geometry = useLoader(STLLoader, `/models/${asteroid.name}.stl`);
  const [crater, setCrater] = useState({});
  const asteroidRef = useRef();

  const { everythingData, fetchEverythingData } = useAsteroid(asteroid.id);
  
  useEffect(() => {
      fetchEverythingData();
    }, []);
  console.log(everythingData)
  const visualScale = Math.min(Math.max(asteroid.diameter_km / 20, 0.05), 1);

  const [sphereRef, api] = useSphere(() => ({
    mass: 1000,
    position: [10, 10, 0],
    args: [visualScale * 0.5],
    restitution: 0.1,
    onCollide: () => {
      api.velocity.set(0, 0, 0);
      api.sleep();
      if (onImpact) onImpact();
    },
    ...props,
  }));

  useEffect(() => {
    if (isLaunched) {
      api.velocity.set(0, -5, 0);
    } else {
      api.position.set(10, 10, 0);
      api.velocity.set(0, 0, 0);
      api.sleep();
    }
  }, [isLaunched]);

  return (
    <mesh
      ref={(ref) => {
        asteroidRef.current = ref;
        sphereRef.current = ref;
      }}
      geometry={geometry}
      scale={[visualScale, visualScale, visualScale]}
    >
      <meshStandardMaterial roughness={0.8} metalness={0.2} color="#888" />
    </mesh>
  );
}
