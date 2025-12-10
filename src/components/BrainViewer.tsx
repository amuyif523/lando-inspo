"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function NeuralConnections({ count = 40 }: { count?: number }) {
  const points = useMemo(() => {
    const p = new Array(count).fill(0).map(() => (
      new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      )
    ));
    return p;
  }, [count]);

  const lines = useMemo(() => {
    const l: THREE.Vector3[] = [];
    points.forEach((p1, i) => {
      points.forEach((p2, j) => {
        if (i !== j && p1.distanceTo(p2) < 1.5) {
          l.push(p1);
          l.push(p2);
        }
      });
    });
    return l;
  }, [points]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} />
        </mesh>
      ))}
      
      {/* Connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(lines.flatMap(v => [v.x, v.y, v.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#BD00FF" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

export default function BrainViewer() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="w-full h-[500px] md:h-[600px] rounded-2xl border border-white/5 bg-gradient-to-br from-cyan/5 via-black to-purple/10 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-widest text-gray-500">3D view paused</p>
          <p className="text-lg font-semibold text-white">Prefers reduced motion enabled</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <NeuralConnections />
        </Float>
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}


