'use client';

import { useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF, useAnimations, Environment, Stars,
  Float, Sparkles, useProgress, Html, Trail,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/* ─── Preload the model ─── */
useGLTF.preload('/portfolio-website/models/robot.glb');

/* ─── Robot model with animations ─── */
function RobotModel({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/portfolio-website/models/robot.glb');
  const { actions, names } = useAnimations(animations, group);

  // Play idle/wave animation
  useEffect(() => {
    const idleAnim = names.find(n => n.toLowerCase().includes('idle') || n.toLowerCase().includes('wave') || n.toLowerCase().includes('walk'));
    if (idleAnim && actions[idleAnim]) {
      actions[idleAnim]!.reset().fadeIn(0.5).play();
    } else if (names[0] && actions[names[0]]) {
      actions[names[0]]!.reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    // Mouse tracking rotation
    const { x, y } = mousePos.current;
    group.current.rotation.y += (x * 0.5 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-y * 0.2 - group.current.rotation.x) * 0.04;
    // Subtle breathing
    const breathe = Math.sin(clock.elapsedTime * 0.8) * 0.01;
    group.current.scale.setScalar(1.3 + breathe);
  });

  // Clone and set up materials to respect shadows
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  return (
    <group ref={group} position={[0, -1.6, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

/* ─── Floating holographic rings ─── */
function HoloRing({ radius, color, tiltX, tiltZ, speed, offset = 0 }: {
  radius: number; color: string; tiltX: number; tiltZ: number; speed: number; offset?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * speed + offset;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.5 + offset) * 0.15;
  });
  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.012, 3, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
        transparent
        opacity={0.7}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ─── DNA-helix data stream ─── */
function DataHelix({ side }: { side: 1 | -1 }) {
  const ref = useRef<THREE.Points>(null);
  const count = 80;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const accent1 = new THREE.Color('#6366f1');
    const accent2 = new THREE.Color('#06b6d4');
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 6;
      const y = (i / count) * 5 - 2.5;
      pos[i * 3]     = side * (Math.cos(t) * 0.4 + 1.8);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(t) * 0.4;
      const c = i % 2 === 0 ? accent1 : accent2;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [side]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.3 * side;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors sizeAttenuation transparent opacity={0.85} toneMapped={false} />
    </points>
  );
}

/* ─── Orbiting energy node ─── */
function OrbitNode({ radius, speed, color, size, yOffset = 0 }: {
  radius: number; speed: number; color: string; size: number; yOffset?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = yOffset + Math.sin(clock.elapsedTime * 0.7) * 0.1;
  });
  return (
    <Trail width={1.5} length={6} color={color} attenuation={t => t * t}>
      <mesh ref={ref} castShadow>
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} toneMapped={false} />
      </mesh>
    </Trail>
  );
}

/* ─── Ground scan ring ─── */
function ScanRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.8) * 0.08);
    (ref.current.material as THREE.MeshStandardMaterial).opacity = 0.3 + Math.sin(clock.elapsedTime * 1.5) * 0.15;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.15, 0]}>
      <ringGeometry args={[1.4, 1.6, 64]} />
      <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={2} transparent opacity={0.35} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ─── Full scene ─── */
function Scene({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 5, 4]} intensity={8} color="#6366f1" />
      <pointLight position={[-5, 3, 2]} intensity={5} color="#8b5cf6" />
      <pointLight position={[5, 3, 2]}  intensity={5} color="#06b6d4" />
      <pointLight position={[0, -2, 4]} intensity={3} color="#d946ef" />
      <spotLight position={[0, 8, 0]} angle={0.4} penumbra={0.8} intensity={10} color="#818cf8" castShadow />

      <Environment preset="city" />
      <Stars radius={90} depth={60} count={4000} factor={3.5} fade speed={0.8} />

      {/* Sparkles around robot */}
      <Sparkles count={60} scale={[4, 5, 4]} size={1.5} speed={0.4} color="#818cf8" opacity={0.6} />
      <Sparkles count={30} scale={[6, 6, 6]} size={2}   speed={0.2} color="#22d3ee" opacity={0.4} />

      {/* Robot */}
      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.4}>
        <RobotModel mousePos={mousePos} />
      </Float>

      {/* Holographic rings around robot */}
      <group position={[0, 0, 0]}>
        <HoloRing radius={2.2} color="#6366f1" tiltX={Math.PI / 2.2} tiltZ={0.2}   speed={0.4} />
        <HoloRing radius={2.8} color="#8b5cf6" tiltX={Math.PI / 3}   tiltZ={-0.5}  speed={-0.3} offset={1} />
        <HoloRing radius={3.4} color="#06b6d4" tiltX={Math.PI / 4}   tiltZ={0.8}   speed={0.25} offset={2} />
      </group>

      {/* Data helices */}
      <DataHelix side={1} />
      <DataHelix side={-1} />

      {/* Orbiting energy nodes */}
      <OrbitNode radius={3}   speed={0.6}  color="#d946ef" size={0.08} yOffset={0.5} />
      <OrbitNode radius={3.8} speed={-0.4} color="#06b6d4" size={0.06} yOffset={-0.3} />
      <OrbitNode radius={2.5} speed={0.9}  color="#f59e0b" size={0.05} yOffset={1} />

      {/* Ground scan */}
      <ScanRing />

      {/* Grid floor */}
      <gridHelper args={[20, 20, '#6366f1', '#111530']} position={[0, -2.2, 0]} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={1.8}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration offset={[0.0008, 0.0008] as unknown as THREE.Vector2} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </>
  );
}

/* ─── Loading fallback ─── */
function ModelLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: '#818cf8', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', textAlign: 'center' }}>
        <div style={{ marginBottom: 8 }}>LOADING {Math.round(progress)}%</div>
        <div style={{ width: 120, height: 2, background: 'rgba(99,102,241,0.2)', borderRadius: 99 }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg,#6366f1,#d946ef)', borderRadius: 99, transition: 'width 100ms' }} />
        </div>
      </div>
    </Html>
  );
}

/* ─── Exported canvas ─── */
export default function RobotScene({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      shadows
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={<ModelLoader />}>
        <Scene mousePos={mousePos} />
      </Suspense>
    </Canvas>
  );
}
