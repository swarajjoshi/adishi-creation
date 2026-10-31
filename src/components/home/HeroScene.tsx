'use client';

/**
 * Stylised procedural bouquet built from simple geometry (no GLB model needed).
 * This is an artistic illustration in 3D, NOT a photographic or real product model.
 * Performance: shared geometries, ~100 meshes, no shadows, no particles, capped pixel ratio,
 * and the render loop pauses whenever the hero is off-screen.
 */

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type Vec3 = [number, number, number];

const FLOWER_COLORS = ['#E5AFA7', '#F7F0E4', '#8E2B38', '#E6CDA3', '#D4848E'];

interface Geo {
  cap: THREE.SphereGeometry;
  cone: THREE.ConeGeometry;
  stem: THREE.CylinderGeometry;
  leaf: THREE.SphereGeometry;
  ring: THREE.TorusGeometry;
}

// Each rose is a few nested, slightly rotated "bowls" (spherical caps) = layered petals.
const PETAL_LAYERS = [
  { s: 0.17, sy: 0.8, y: 0.0, ry: 0.0, tilt: 0.0 },
  { s: 0.14, sy: 0.85, y: 0.025, ry: 0.9, tilt: 0.05 },
  { s: 0.105, sy: 0.9, y: 0.045, ry: 1.7, tilt: 0.0 },
  { s: 0.07, sy: 1.0, y: 0.06, ry: 2.6, tilt: 0.06 },
];

function Rose({ geo, material, position, rotation }: { geo: Geo; material: THREE.Material; position: Vec3; rotation: Vec3 }) {
  return (
    <group position={position} rotation={rotation}>
      {PETAL_LAYERS.map((l, i) => (
        <mesh
          key={i}
          geometry={geo.cap}
          material={material}
          position={[0, l.y, 0]}
          rotation={[Math.PI + l.tilt, l.ry, 0]}
          scale={[l.s, l.s * l.sy, l.s]}
        />
      ))}
    </group>
  );
}

function Stem({ geo, material, from, to }: { geo: Geo; material: THREE.Material; from: Vec3; to: Vec3 }) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return { position: a.clone().add(b).multiplyScalar(0.5), quaternion: q, length: len };
  }, [from, to]);

  return <mesh geometry={geo.stem} material={material} position={position} quaternion={quaternion} scale={[1, length, 1]} />;
}

function Bouquet() {
  const geo = useMemo<Geo>(
    () => ({
      cap: new THREE.SphereGeometry(1, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.55),
      cone: new THREE.ConeGeometry(1, 1, 40, 1, true),
      stem: new THREE.CylinderGeometry(0.014, 0.016, 1, 6),
      leaf: new THREE.SphereGeometry(1, 10, 6),
      ring: new THREE.TorusGeometry(1, 0.05, 8, 48),
    }),
    [],
  );

  const mats = useMemo(
    () => ({
      flowers: FLOWER_COLORS.map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0, side: THREE.DoubleSide })),
      stem: new THREE.MeshStandardMaterial({ color: '#3F6B4F', roughness: 0.7 }),
      leaf: new THREE.MeshStandardMaterial({ color: '#4E7A5A', roughness: 0.65, side: THREE.DoubleSide }),
      wrapOuter: new THREE.MeshStandardMaterial({ color: '#F4ECDD', roughness: 0.85, side: THREE.DoubleSide }),
      wrapInner: new THREE.MeshStandardMaterial({ color: '#E9CFC7', roughness: 0.85, side: THREE.DoubleSide }),
      gold: new THREE.MeshStandardMaterial({ color: '#C6A15B', roughness: 0.28, metalness: 0.9 }),
    }),
    [],
  );

  // Free GPU memory when the scene unmounts.
  useEffect(
    () => () => {
      Object.values(geo).forEach((g) => g.dispose());
      mats.flowers.forEach((m) => m.dispose());
      [mats.stem, mats.leaf, mats.wrapOuter, mats.wrapInner, mats.gold].forEach((m) => m.dispose());
    },
    [geo, mats],
  );

  // Flower heads laid out on a gentle dome using a sunflower-style spiral (deterministic, no randomness).
  const heads = useMemo(() => {
    const out: { pos: Vec3; rot: Vec3; color: number }[] = [];
    const N = 15;
    for (let i = 0; i < N; i++) {
      const a = i * 2.39996;
      const r = 0.2 * Math.sqrt(i + 0.5) * 1.05;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const y = 0.38 - r * r * 0.55;
      const tilt = r * 0.9;
      out.push({ pos: [x, y, z], rot: [Math.sin(a) * tilt, 0, -Math.cos(a) * tilt], color: (i * 7) % FLOWER_COLORS.length });
    }
    return out;
  }, []);

  const base: Vec3 = useMemo(() => [0, -1.5, 0], []);
  const stems = useMemo(() => heads.map((h) => ({ from: base, to: [h.pos[0], h.pos[1] - 0.04, h.pos[2]] as Vec3 })), [heads, base]);

  const leaves = useMemo(() => Array.from({ length: 7 }, (_, i) => (i / 7) * Math.PI * 2 + 0.3), []);

  return (
    <group position={[0, 0.55, 0]}>
      {stems.map((s, i) => (
        <Stem key={i} geo={geo} material={mats.stem} from={s.from} to={s.to} />
      ))}

      {leaves.map((a, i) => (
        <group key={i} rotation={[0, -a, 0]} position={[Math.cos(a) * 0.62, -0.02, Math.sin(a) * 0.62]}>
          <mesh geometry={geo.leaf} material={mats.leaf} position={[0.2, 0.04, 0]} rotation={[0, 0, 0.45]} scale={[0.3, 0.035, 0.12]} />
        </group>
      ))}

      {heads.map((h, i) => (
        <Rose key={i} geo={geo} material={mats.flowers[h.color]} position={h.pos} rotation={h.rot} />
      ))}

      {/* Layered wrapping: blush inner liner + ivory outer cone, apex pointing down */}
      <mesh geometry={geo.cone} material={mats.wrapInner} position={[0.02, -0.82, 0]} rotation={[Math.PI, 0.5, 0.06]} scale={[0.9, 1.5, 0.9]} />
      <mesh geometry={geo.cone} material={mats.wrapOuter} position={[0, -0.9, 0]} rotation={[Math.PI, 0, 0]} scale={[0.95, 1.6, 0.95]} />

      {/* Gold ribbon tie */}
      <mesh geometry={geo.ring} material={mats.gold} position={[0, -0.85, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.52, 0.52, 0.52]} />
    </group>
  );
}

/** Gentle float, mouse-responsive rotation and a slow dolly-in on load. Skipped entirely for reduced motion. */
function Motion({ children, animate }: { children: React.ReactNode; animate: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    if (!group.current || !animate) return;
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.5 + Math.sin(t * 0.4) * 0.12, 3, dt);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.12, 3, dt);
    group.current.position.y = Math.sin(t * 0.9) * 0.04;

    const k = Math.min(t / 2.2, 1);
    state.camera.position.z = 6.4 - 1.2 * (1 - Math.pow(1 - k, 3));
  });

  return <group ref={group}>{children}</group>;
}

interface HeroSceneProps {
  /** false when the hero is scrolled off-screen: rendering pauses to save battery/GPU */
  active: boolean;
  reducedMotion: boolean;
  onContextLost?: () => void;
}

export default function HeroScene({ active, reducedMotion, onContextLost }: HeroSceneProps) {
  const animate = !reducedMotion;
  return (
    <Canvas
      frameloop={animate && active ? 'always' : 'demand'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.1, animate ? 6.4 : 5.2], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          onContextLost?.();
        });
      }}
      aria-label="Interactive 3D illustration of a bouquet"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 3]} scale={[8, 3, 1]} color="#fff6e6" />
        <Lightformer form="rect" intensity={1.2} position={[-5, 1, 2]} scale={[3, 6, 1]} color="#f3dcc0" />
        <Lightformer form="rect" intensity={0.8} position={[5, 0, -2]} scale={[3, 6, 1]} color="#cfe5da" />
      </Environment>
      <Motion animate={animate}>
        <Bouquet />
      </Motion>
    </Canvas>
  );
}
