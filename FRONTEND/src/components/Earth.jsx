import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from 'three'
import EarthMaterial from "./EarthMaterial";
import { useSphere } from "@react-three/cannon";


export default function Earth(props) {
 
    const [EarthRef] = useSphere(() => ({ args: [1.5], type: "Static", ...props }))

    const radius = 1.5

    return (
        <>
        <mesh ref={EarthRef} 
            rotation-z={THREE.MathUtils.degToRad(-23.5)}
            position={[10, 0, 0]}>
            <icosahedronGeometry args={[radius, 32]} />
            <EarthMaterial />

        </mesh>

        </>
        
    );
}
