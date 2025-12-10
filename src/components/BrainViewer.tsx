"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

type Edge = { a: number; b: number };

const NODE_COUNT = 140;
const CONNECTIONS_PER_NODE = 4;
const SIGNAL_COUNT = 90;

function buildGraph() {
  const nodes = new Array(NODE_COUNT).fill(0).map(() => {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 2.2 + Math.random() * 0.4;
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  });

  const edges: Edge[] = [];
  const edgeSet = new Set<string>();

  nodes.forEach((node, i) => {
    const distances = nodes
      .map((other, j) => ({ j, dist: i === j ? Infinity : node.distanceTo(other) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, CONNECTIONS_PER_NODE);

    distances.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({ a: i, b: j });
      }
    });
  });

  return { nodes, edges };
}

function NeuralAtlas() {
  const { nodes, edges } = useMemo(buildGraph, []);
  const linePositions = useMemo(() => {
    const arr: number[] = [];
    edges.forEach((edge) => {
      const a = nodes[edge.a];
      const b = nodes[edge.b];
      arr.push(a.x, a.y, a.z, b.x, b.y, b.z);
    });
    return new Float32Array(arr);
  }, [nodes, edges]);

  const colorsRef = useRef<THREE.BufferAttribute | null>(null);
  const signalsRef = useRef<THREE.InstancedMesh>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // Precompute signal travel data
  const signals = useMemo(() => {
    const sig = new Array(SIGNAL_COUNT).fill(0).map((_, i) => {
      const edge = edges[i % edges.length];
      return {
        edge,
        offset: Math.random(),
        speed: 0.1 + Math.random() * 0.25,
        sign: Math.random() > 0.5 ? 1 : -1,
      };
    });
    return sig;
  }, [edges]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Animate edge colors
    if (colorsRef.current) {
      const colorArr = colorsRef.current.array as Float32Array;
      for (let i = 0; i < edges.length; i++) {
        const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.2 + i));
        const c = new THREE.Color().lerpColors(
          new THREE.Color("#00F0FF"),
          new THREE.Color("#BD00FF"),
          (Math.sin(t * 0.6 + i) + 1) / 2
        );
        const r = c.r * pulse;
        const g = c.g * pulse;
        const b = c.b * pulse;
        // each edge has 2 vertices -> 6 entries
        const idx = i * 6;
        colorArr[idx] = r;
        colorArr[idx + 1] = g;
        colorArr[idx + 2] = b;
        colorArr[idx + 3] = r;
        colorArr[idx + 4] = g;
        colorArr[idx + 5] = b;
      }
      colorsRef.current.needsUpdate = true;
    }

    // Animate signal instanced spheres along edges
    if (signalsRef.current) {
      const dummy = new THREE.Object3D();
      signals.forEach((sig, idx) => {
        const { edge, offset, speed, sign } = sig;
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const alpha = ((t * speed + offset) % 1) * (sign > 0 ? 1 : -1);
        const pos = new THREE.Vector3().lerpVectors(a, b, 0.5 + alpha / 2);
        dummy.position.copy(pos);
        dummy.scale.setScalar(0.08 + 0.04 * Math.sin(t * 2 + idx));
        dummy.updateMatrix();
        signalsRef.current!.setMatrixAt(idx, dummy.matrix);
      });
      signalsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={1} color="#00F0FF" />
      <pointLight position={[-6, -4, -6]} intensity={0.8} color="#BD00FF" />

      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute
            ref={colorsRef}
            attach="attributes-color"
            args={[new Float32Array(edges.length * 6), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.35} />
      </lineSegments>

      {/* Nodes */}
      <Instances limit={nodes.length}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} />
        {nodes.map((node, i) => (
          <Instance
            key={i}
            position={node}
            scale={hovered === i ? 1.6 : 1}
            onPointerOver={() => setHovered(i)}
            onPointerOut={() => setHovered(null)}
          />
        ))}
      </Instances>

      {/* Signal particles */}
      <instancedMesh ref={signalsRef} args={[undefined, undefined, SIGNAL_COUNT]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ffffff" emissive="#00F0FF" emissiveIntensity={2} />
      </instancedMesh>

      {/* Background glow planes */}
      <mesh position={[0, 0, -2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="#00F0FF" opacity={0.05} transparent />
      </mesh>
      <mesh position={[0, 0, -3]} rotation={[0, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial color="#BD00FF" opacity={0.04} transparent />
      </mesh>
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
    <div className="w-full h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <color attach="background" args={["transparent"]} />
        <NeuralAtlas />
        <Stars radius={80} depth={40} count={4000} factor={3} saturation={0} fade speed={0.8} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
      {/*
        Simple HUD overlay showing hovered node index.
        Could be expanded to show capability labels if desired.
      */}
      <div className="pointer-events-none absolute top-4 right-4 text-xs uppercase tracking-[0.3em] text-gray-500 bg-black/50 px-3 py-2 rounded-full border border-white/10">
        Neural Atlas
      </div>
    </div>
  );
}


