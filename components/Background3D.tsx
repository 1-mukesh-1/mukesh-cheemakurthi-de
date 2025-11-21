import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';

// Generate points for the data cloud
function generateSpherePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

const DataCloud = () => {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => generateSpherePoints(2000, 2), []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate the entire cloud
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
      
      // Pulse effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const NetworkConnections = () => {
  // visual aesthetic only - geometric shapes representing data packets/nodes
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Line
            points={[[-2, -1, 0], [2, 1, 0]]}
            color="#3b82f6"
            lineWidth={1}
            transparent
            opacity={0.1}
        />
        <Line
            points={[[-2, 1, 0], [2, -1, 0]]}
            color="#3b82f6"
            lineWidth={1}
            transparent
            opacity={0.1}
        />
         {/* Floating Geometric Nodes */}
        <mesh position={[1, 0.5, 0]}>
            <icosahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#06b6d4" wireframe />
        </mesh>
         <mesh position={[-1.5, -0.5, 0.5]}>
            <octahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </Float>
    </group>
  );
}

const CameraController = () => {
  useFrame((state) => {
    // Smooth parallax based on mouse position
    const x = (state.mouse.x * 0.5);
    const y = (state.mouse.y * 0.5);
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y, 0.02);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-slate-950">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 60 }}>
        <CameraController />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#06b6d4" />
        
        <group>
            <DataCloud />
            <NetworkConnections />
            <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </group>
      </Canvas>
      
      {/* Vignette and Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)] opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/90 pointer-events-none" />
    </div>
  );
};

export default Background3D;