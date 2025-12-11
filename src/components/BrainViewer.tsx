"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Instances, Instance, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";

type Edge = { a: number; b: number };
type CapabilityTier = "low" | "standard" | "high";

const BASE_NODE_COUNT = 200;
const BASE_CONNECTIONS_PER_NODE = 4;
const BASE_SIGNAL_COUNT = 90;
const BASE_GLYPH_COUNT = 8;
const BASE_SPARK_COUNT = 1200;
const BASE_STAR_COUNT = 4000;

const createDeterministicRandom = (seed = 0.5) => {
  let value = seed % 1;
  return () => {
    value = (value + 0.6180339887498948) % 1;
    return value;
  };
};

function SparkParticles({ density }: { density: number }) {
  const random = useMemo(() => createDeterministicRandom(0.37 + density * 0.11), [density]);
  const positions = useMemo(() => {
    const count = Math.max(320, Math.floor(BASE_SPARK_COUNT * density));
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 * Math.cbrt(random());
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [density, random]);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function buildGraph(nodeCount: number, connectionsPerNode: number) {
  const random = createDeterministicRandom(0.12 + nodeCount * 0.01 + connectionsPerNode * 0.02);
  const nodes = new Array(nodeCount).fill(0).map(() => {
    const phi = Math.acos(2 * random() - 1);
    const theta = random() * Math.PI * 2;
    const r = 2.2 + random() * 0.4;
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
      .slice(0, connectionsPerNode);

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

function PostProcessing({ quality }: { quality: CapabilityTier }) {
  const { gl, scene, camera, size } = useThree();
  const chromaticPass = useMemo(() => {
    const pass = new ShaderPass(RGBShiftShader);
    pass.uniforms["amount"].value = quality === "high" ? 0.003 : 0.0012;
    return pass;
  }, [quality]);

  const bokehPass = useMemo(
    () =>
      new BokehPass(scene, camera, {
        focus: 5,
        aperture: 0.0002 * (quality === "high" ? 1.8 : 1),
        maxblur: 0.01,
      }),
    [camera, quality, scene]
  );

  const composer = useMemo(() => {
    const effectComposer = new EffectComposer(gl);
    effectComposer.addPass(new RenderPass(scene, camera));
    effectComposer.addPass(bokehPass);
    effectComposer.addPass(chromaticPass);
    return effectComposer;
  }, [bokehPass, camera, chromaticPass, gl, scene]);

  useEffect(() => {
    composer.setSize(size.width, size.height);
  }, [composer, size.height, size.width]);

  useFrame(() => composer.render(), 1);

  useEffect(() => () => composer.dispose(), [composer]);

  return null;
}

function NeuralAtlas({ density }: { density: number }) {
  const nodeCount = Math.max(120, Math.floor(BASE_NODE_COUNT * density));
  const connectionsPerNode = Math.max(3, Math.round(BASE_CONNECTIONS_PER_NODE * density));
  const signalCount = Math.max(30, Math.floor(BASE_SIGNAL_COUNT * density));
  const glyphCount = Math.max(4, Math.floor(BASE_GLYPH_COUNT * density));

  const { nodes, edges } = useMemo(() => buildGraph(nodeCount, connectionsPerNode), [connectionsPerNode, nodeCount]);
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
  const glyphsRef = useRef<THREE.InstancedMesh>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const signalGeometry = useMemo(() => new THREE.SphereGeometry(0.04, 8, 8), []);
  const signalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#00F0FF", emissiveIntensity: 2 }),
    []
  );
  const glyphGeometry = useMemo(() => new THREE.BoxGeometry(0.1, 0.1, 0.1), []);
  const glyphMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#BD00FF", emissiveIntensity: 1.5, metalness: 0.2, roughness: 0.3 }),
    []
  );

  // Precompute signal travel data
  const signals = useMemo(() => {
    const random = createDeterministicRandom(0.27 + edges.length * 0.013 + glyphCount * 0.01 + signalCount * 0.001);
    const sig = new Array(signalCount).fill(0).map((_, i) => {
      const edge = edges[i % edges.length];
      return {
        edge,
        offset: random(),
        speed: 0.1 + random() * 0.25,
        sign: random() > 0.5 ? 1 : -1,
      };
    });
    return sig;
  }, [edges, glyphCount, signalCount]);

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

    if (glyphsRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < glyphCount; i++) {
        const radius = 2.4 + (i % 3) * 0.5;
        const angle = t * 0.3 + (i / glyphCount) * Math.PI * 2;
        dummy.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.2) * 0.6, Math.sin(angle) * radius);
        dummy.rotation.set(angle, angle * 1.3, 0);
        dummy.scale.setScalar(0.4 + 0.1 * Math.sin(t * 1.5 + i));
        dummy.updateMatrix();
        glyphsRef.current.setMatrixAt(i, dummy.matrix);
      }
      glyphsRef.current.instanceMatrix.needsUpdate = true;
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
      <instancedMesh ref={signalsRef} args={[signalGeometry, signalMaterial, signalCount]}>
        <primitive object={signalGeometry} attach="geometry" />
        <primitive object={signalMaterial} attach="material" />
      </instancedMesh>

      {/* Orbiting glyphs */}
      <instancedMesh ref={glyphsRef} args={[glyphGeometry, glyphMaterial, glyphCount]}>
        <primitive object={glyphGeometry} attach="geometry" />
        <primitive object={glyphMaterial} attach="material" />
      </instancedMesh>

      {/* Sparkle particles */}
      <SparkParticles density={density} />

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
  const resolveCapability = useCallback((): CapabilityTier => {
    if (typeof window === "undefined") {
      return prefersReducedMotion ? "low" : "standard";
    }

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
      gpu?: unknown;
    };
    const connection = nav.connection;
    const saveData = Boolean(connection?.saveData);
    const deviceMemory = nav.deviceMemory ?? 8;
    const lowPowerQuery = window.matchMedia("(max-width: 640px)");
    const isLowPowerDevice = saveData || deviceMemory <= 4 || lowPowerQuery.matches;
    const hasWebGPU = typeof nav.gpu !== "undefined";

    if (prefersReducedMotion || isLowPowerDevice) return "low";
    if (deviceMemory >= 12 || hasWebGPU) return "high";
    return "standard";
  }, [prefersReducedMotion]);

  const [capability, setCapability] = useState<CapabilityTier>(() => resolveCapability());

  useEffect(() => {
    setCapability(resolveCapability());
  }, [resolveCapability]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lowPowerQuery = window.matchMedia("(max-width: 640px)");
    const onChange = () => setCapability(resolveCapability());

    lowPowerQuery.addEventListener("change", onChange);

    return () => {
      lowPowerQuery.removeEventListener("change", onChange);
    };
  }, [resolveCapability]);

  const simplifiedFallback = prefersReducedMotion || capability === "low";
  const particleDensity = capability === "high" ? 1.25 : capability === "low" ? 0.55 : 1;
  const starCount = Math.max(1200, Math.floor(BASE_STAR_COUNT * particleDensity));

  if (simplifiedFallback) {
    const simpleParticles = Array.from({ length: 18 }, (_, i) => ({
      left: `${(i * 37) % 100}%`,
      top: `${(i * 19) % 100}%`,
      delay: `${i * 150}ms`,
    }));

    return (
      <div className="w-full h-[500px] md:h-[600px] rounded-2xl border border-white/5 bg-gradient-to-br from-cyan/10 via-black to-purple/20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cyan/10 via-transparent to-purple/10" />
        <div className="absolute inset-0 opacity-50">
          {simpleParticles.map((particle, idx) => (
            <span
              key={idx}
              className="absolute h-2 w-2 rounded-full bg-white/70 blur-[1px] animate-pulse"
              style={{ left: particle.left, top: particle.top, animationDelay: particle.delay }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center space-y-2 px-6">
          <p className="text-sm uppercase tracking-widest text-gray-500">Low-power visual mode</p>
          <p className="text-lg font-semibold text-white">Gradient core with simplified particles active</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} frameloop={capability === "low" ? "demand" : "always"}>
        <color attach="background" args={["transparent"]} />
        <NeuralAtlas density={particleDensity} />
        <Stars radius={80} depth={40} count={starCount} factor={3} saturation={0} fade speed={0.8 * particleDensity} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6 * particleDensity} />
        <PostProcessing quality={capability} />
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


