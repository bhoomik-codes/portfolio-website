'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Robot Body Parts ─── */
function RobotHead({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const headRef  = useRef<THREE.Group>(null);
  const eyeL     = useRef<THREE.Mesh>(null);
  const eyeR     = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!headRef.current) return;
    const { x, y } = mousePos.current;
    // Smoothly rotate head toward cursor
    headRef.current.rotation.y += (-x * 0.6 - headRef.current.rotation.y) * 0.05;
    headRef.current.rotation.x += (y * 0.35 - headRef.current.rotation.x) * 0.05;

    // Eye glow pulse
    const t = Date.now() * 0.003;
    if (eyeL.current && eyeR.current) {
      const intensity = 0.6 + Math.sin(t) * 0.4;
      (eyeL.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
      (eyeR.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <group ref={headRef} position={[0, 0.9, 0]}>
      {/* Head */}
      <Box args={[1.1, 0.9, 0.85]} castShadow>
        <meshStandardMaterial
          color="#141828"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </Box>
      {/* Visor */}
      <Box args={[0.9, 0.32, 0.05]} position={[0, 0.05, 0.44]}>
        <meshStandardMaterial color="#0a0a1a" metalness={0.3} roughness={0.0} transparent opacity={0.9} />
      </Box>
      {/* Eyes */}
      <mesh ref={eyeL} position={[-0.24, 0.06, 0.45]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#5E5CE6" emissive="#5E5CE6" emissiveIntensity={1} />
      </mesh>
      <mesh ref={eyeR} position={[0.24, 0.06, 0.45]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#A358DF" emissive="#A358DF" emissiveIntensity={1} />
      </mesh>
      {/* Mouth grill lines */}
      {[-0.18, 0, 0.18].map((x, i) => (
        <Box key={i} args={[0.08, 0.02, 0.04]} position={[x, -0.22, 0.44]}>
          <meshStandardMaterial color="#5E5CE6" emissive="#5E5CE6" emissiveIntensity={0.5} />
        </Box>
      ))}
      {/* Antennas */}
      <Box args={[0.04, 0.35, 0.04]} position={[-0.25, 0.62, 0]}>
        <meshStandardMaterial color="#A358DF" metalness={0.9} roughness={0.1} />
      </Box>
      <mesh position={[-0.25, 0.82, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#A358DF" emissive="#A358DF" emissiveIntensity={1.5} />
      </mesh>
      <Box args={[0.04, 0.25, 0.04]} position={[0.25, 0.57, 0]}>
        <meshStandardMaterial color="#00E5CC" metalness={0.9} roughness={0.1} />
      </Box>
      <mesh position={[0.25, 0.72, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#00E5CC" emissive="#00E5CC" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function RobotBody() {
  const t = useRef(0);
  const chestRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    t.current += delta;
    if (chestRef.current) {
      (chestRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.3 + Math.sin(t.current * 2) * 0.2;
    }
  });

  return (
    <group position={[0, -0.35, 0]}>
      {/* Torso */}
      <Box args={[1.3, 1.1, 0.8]} castShadow>
        <meshStandardMaterial color="#0F1220" metalness={0.85} roughness={0.12} envMapIntensity={1.5} />
      </Box>
      {/* Chest core */}
      <mesh ref={chestRef} position={[0, 0.1, 0.42]}>
        <boxGeometry args={[0.45, 0.45, 0.06]} />
        <meshStandardMaterial color="#5E5CE6" emissive="#5E5CE6" emissiveIntensity={0.5} metalness={0.4} roughness={0.1} />
      </mesh>
      {/* Side details */}
      {([-0.45, 0.45] as const).map((x, i) => (
        <Box key={i} args={[0.12, 0.6, 0.06]} position={[x, 0, 0.41]}>
          <meshStandardMaterial color="#A358DF" emissive="#A358DF" emissiveIntensity={0.4} />
        </Box>
      ))}
      {/* Shoulders */}
      <mesh position={[-0.85, 0.3, 0]}>
        <sphereGeometry args={[0.3, 20, 20]} />
        <meshStandardMaterial color="#141828" metalness={0.9} roughness={0.08} />
      </mesh>
      <mesh position={[0.85, 0.3, 0]}>
        <sphereGeometry args={[0.3, 20, 20]} />
        <meshStandardMaterial color="#141828" metalness={0.9} roughness={0.08} />
      </mesh>
      {/* Arms */}
      <Box args={[0.28, 0.9, 0.28]} position={[-0.85, -0.3, 0]}>
        <meshStandardMaterial color="#0F1220" metalness={0.85} roughness={0.12} />
      </Box>
      <Box args={[0.28, 0.9, 0.28]} position={[0.85, -0.3, 0]}>
        <meshStandardMaterial color="#0F1220" metalness={0.85} roughness={0.12} />
      </Box>
      {/* Neck */}
      <Box args={[0.28, 0.26, 0.28]} position={[0, 0.68, 0]}>
        <meshStandardMaterial color="#1A1C2C" metalness={0.8} roughness={0.15} />
      </Box>
    </group>
  );
}

/* ─── Floating Orbs ─── */
function FloatingOrb({ position, color, size, speed }: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed) * 0.4;
    meshRef.current.rotation.x += 0.004;
    meshRef.current.rotation.y += 0.006;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <Sphere args={[size, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.2}
          distort={0.5}
          speed={2}
          transparent
          opacity={0.75}
        />
      </Sphere>
    </mesh>
  );
}

/* ─── Floating Ring ─── */
function NeonRing({ position, color, rotation }: {
  position: [number, number, number];
  color: string;
  rotation: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.008;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.6) * 0.25;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <Torus args={[0.6, 0.04, 16, 80]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} metalness={0.1} roughness={0} />
      </Torus>
    </mesh>
  );
}

/* ─── Grid Floor ─── */
function GridFloor() {
  return (
    <gridHelper args={[30, 30, '#5E5CE6', '#1A1C2C']} position={[0, -2.2, 0]}>
    </gridHelper>
  );
}

/* ─── Scene ─── */
function Scene({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {

  return (
    <>
      <Environment preset="city" />
      <Stars radius={80} depth={50} count={3000} factor={4} fade speed={1.2} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 4, 4]} intensity={1.5} color="#5E5CE6" />
      <pointLight position={[-4, 2, 2]} intensity={0.8} color="#A358DF" />
      <pointLight position={[4, 2, 2]}  intensity={0.8} color="#00E5CC" />
      <pointLight position={[0, -2, 3]} intensity={0.6} color="#5E5CE6" />

      {/* Robot */}
      <Float speed={1.4} rotationIntensity={0} floatIntensity={0.5}>
        <group position={[0, 0, 0]}>
          <RobotHead mousePos={mousePos} />
          <RobotBody />
        </group>
      </Float>

      {/* Floating orbs */}
      <FloatingOrb position={[-3.5, 0.5, -1]} color="#5E5CE6" size={0.38} speed={0.9} />
      <FloatingOrb position={[3.5, 1.0, -1]}  color="#A358DF" size={0.28} speed={1.2} />
      <FloatingOrb position={[-2.5, -1, -2]}  color="#00E5CC" size={0.22} speed={1.5} />
      <FloatingOrb position={[2.8, -0.5, -2]} color="#39FF14" size={0.18} speed={0.7} />

      {/* Neon rings */}
      <NeonRing position={[-3, 1.5, -2]}  color="#5E5CE6" rotation={[1.2, 0, 0.5]} />
      <NeonRing position={[3, -0.5, -2.5]}  color="#A358DF" rotation={[0.4, 1, 0.2]} />
      <NeonRing position={[0, 2.5, -3]}    color="#00E5CC" rotation={[0.8, 0.3, 0]}  />

      <GridFloor />
    </>
  );
}

/* ─── Exported Canvas Component ─── */
export default function RobotScene({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.5] }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Scene mousePos={mousePos} />
      </Suspense>
    </Canvas>
  );
}
