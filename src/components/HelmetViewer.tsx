"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Float } from "@react-three/drei";
import { Suspense } from "react";

function PlaceholderHelmet({ color }: { color: string }) {
  return (
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
    </mesh>
  );
}

/* 
  NOTE: To use a real GLB model:
  1. Place your .glb file in the public/models/ folder (e.g., public/models/helmet.glb)
  2. Import { useGLTF } from "@react-three/drei"
  3. Use the component below:
  
  function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
  }
*/

export default function HelmetViewer({ color = "#D4F711" }: { color?: string }) {
  return (
    <div className="w-full h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
              <PlaceholderHelmet color={color} />
            </Float>
          </Stage>
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={4} enableZoom={false} />
      </Canvas>
    </div>
  );
}
