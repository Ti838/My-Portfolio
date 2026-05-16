"use client";

import { Environment, Float, Html, MeshTransmissionMaterial, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps = {
  personalInfo: any;
};

type ChipProps = {
  label: string;
  index: number;
  total: number;
};

function OrbitChip({ label, index, total }: ChipProps) {
  const ref = useRef<THREE.Group>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 3.15;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.28 + angle;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.2) * 0.42 + 0.45, Math.sin(t) * radius);
    ref.current.rotation.y = -t + Math.PI / 2;
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[0.72, 0.32, 0.1]} radius={0.08} smoothness={8}>
        <meshStandardMaterial color="#07111f" roughness={0.28} metalness={0.25} emissive="#0891b2" emissiveIntensity={0.18} />
      </RoundedBox>
      <Text position={[0, 0, 0.065]} fontSize={0.12} color="#dff9ff" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
}

function StatCard({ label, value, position, accent }: { label: string; value: string; position: [number, number, number]; accent: string }) {
  return (
    <Float speed={1.8} rotationIntensity={0.18} floatIntensity={0.34}>
      <group position={position}>
        <RoundedBox args={[1.4, 0.76, 0.12]} radius={0.12} smoothness={10}>
          <meshStandardMaterial color="#050914" roughness={0.2} metalness={0.35} emissive={accent} emissiveIntensity={0.08} />
        </RoundedBox>
        <Text position={[0, 0.14, 0.08]} fontSize={0.16} color="#ffffff" anchorX="center" anchorY="middle">
          {value}
        </Text>
        <Text position={[0, -0.15, 0.08]} fontSize={0.075} color="#8aa3b5" anchorX="center" anchorY="middle">
          {label.toUpperCase()}
        </Text>
      </group>
    </Float>
  );
}

function CommandDesk({ personalInfo }: SceneProps) {
  const rig = useRef<THREE.Group>(null);
  const skills = useMemo(() => ["AI", "Next", "C++", "UI", "DB", "API", "ML", "UX"], []);
  const stats = personalInfo?.stats || {};

  useFrame(({ pointer, clock }) => {
    if (!rig.current) return;
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, pointer.x * 0.22, 0.055);
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -pointer.y * 0.12, 0.055);
    rig.current.position.y = Math.sin(clock.getElapsedTime() * 0.9) * 0.04;
  });

  return (
    <group ref={rig} rotation={[0.08, -0.18, 0]}>
      <Float speed={1.25} rotationIntensity={0.08} floatIntensity={0.18}>
        <group>
          <RoundedBox args={[3.55, 2.15, 0.12]} radius={0.16} smoothness={12} position={[0, 0.32, 0]}>
            <MeshTransmissionMaterial
              color="#0b1220"
              thickness={0.35}
              roughness={0.18}
              transmission={0.35}
              ior={1.2}
              chromaticAberration={0.04}
              backside
            />
          </RoundedBox>
          <RoundedBox args={[3.25, 1.78, 0.08]} radius={0.12} smoothness={10} position={[0, 0.32, 0.08]}>
            <meshStandardMaterial color="#030712" roughness={0.26} metalness={0.34} emissive="#0e7490" emissiveIntensity={0.08} />
          </RoundedBox>
          <Text position={[0, 1.02, 0.16]} fontSize={0.16} color="#67e8f9" anchorX="center" anchorY="middle">
            INTERACTIVE COMMAND PORTFOLIO
          </Text>
          <Text position={[0, 0.65, 0.17]} fontSize={0.28} color="#ffffff" anchorX="center" anchorY="middle">
            {personalInfo?.name || "Timon Biswas"}
          </Text>
          <Text position={[0, 0.28, 0.17]} fontSize={0.105} color="#a7b7c8" maxWidth={2.5} textAlign="center" anchorX="center" anchorY="middle">
            {personalInfo?.tagline || "AI focused full stack developer"}
          </Text>
          <group position={[0, -0.34, 0.17]}>
            {["build", "ship", "learn"].map((word, index) => (
              <group key={word} position={[(index - 1) * 0.72, 0, 0]}>
                <RoundedBox args={[0.58, 0.22, 0.04]} radius={0.05} smoothness={8}>
                  <meshStandardMaterial color={index === 1 ? "#0e7490" : "#111827"} roughness={0.32} metalness={0.2} />
                </RoundedBox>
                <Text position={[0, 0, 0.04]} fontSize={0.065} color="#f8fafc" anchorX="center" anchorY="middle">
                  {word.toUpperCase()}
                </Text>
              </group>
            ))}
          </group>
        </group>
      </Float>

      <RoundedBox args={[3.9, 0.16, 1.55]} radius={0.06} smoothness={8} position={[0, -0.88, 0.55]} rotation={[0.2, 0, 0]}>
        <meshStandardMaterial color="#05070d" roughness={0.22} metalness={0.52} />
      </RoundedBox>
      <RoundedBox args={[1.22, 0.035, 0.52]} radius={0.04} smoothness={8} position={[0, -0.76, 1.22]} rotation={[0.2, 0, 0]}>
        <meshStandardMaterial color="#16202f" roughness={0.18} metalness={0.42} emissive="#0891b2" emissiveIntensity={0.05} />
      </RoundedBox>

      {skills.map((skill, index) => (
        <OrbitChip key={skill} label={skill} index={index} total={skills.length} />
      ))}

      <StatCard label="projects" value={stats.projects || "14+"} position={[-2.15, -0.08, 1.05]} accent="#06b6d4" />
      <StatCard label="certificates" value={stats.certificates || "4+"} position={[2.1, 0.18, 0.9]} accent="#6366f1" />
      <StatCard label="icpc" value={stats.icpc_rank || "Ranked"} position={[0.08, -1.28, 1.35]} accent="#10b981" />

      <mesh position={[0, 0.1, -0.78]}>
        <torusGeometry args={[2.35, 0.01, 12, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.34} />
      </mesh>
      <mesh position={[0, 0.1, -0.82]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.9, 0.008, 12, 120]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100 backdrop-blur-xl">
        Loading 3D
      </div>
    </Html>
  );
}

export default function PortfolioScene3D({ personalInfo }: SceneProps) {
  return (
    <div className="relative h-[620px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/[0.18] shadow-[0_28px_100px_rgba(0,0,0,0.34)]">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.2, 6.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 6.5, 11]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[3.5, 4.8, 4.5]} intensity={2.1} color="#dff9ff" />
        <pointLight position={[-3.2, 1.7, 2.4]} intensity={4.2} color="#22d3ee" />
        <pointLight position={[3.1, -1.3, 2.2]} intensity={2.8} color="#6366f1" />
        <Suspense fallback={<Loader />}>
          <CommandDesk personalInfo={personalInfo} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.35} minPolarAngle={Math.PI / 2.7} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,transparent,rgba(2,6,23,0.18)_58%,rgba(2,6,23,0.72))]" />
      <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-xl">
        Spline-like live scene
      </div>
    </div>
  );
}
