import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

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

const DataCloud = ({ scrollSpeed, color }: { scrollSpeed: React.MutableRefObject<number>, color: string }) => {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => generateSpherePoints(3000, 2), []);

  useFrame((state, delta) => {
    if (ref.current) {
      const baseRotation = delta / 15;
      const warpRotation = scrollSpeed.current * delta * 2;
      
      ref.current.rotation.x -= baseRotation + warpRotation;
      ref.current.rotation.y -= baseRotation / 2;
      
      const pulseFrequency = 0.5 + (scrollSpeed.current * 5);
      const scale = 1 + Math.sin(state.clock.elapsedTime * pulseFrequency) * 0.05;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
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

const NetworkConnections = ({ scrollSpeed, color }: { scrollSpeed: React.MutableRefObject<number>, color: string }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
     if(groupRef.current) {
         groupRef.current.rotation.z += delta * 0.1 * (1 + scrollSpeed.current * 10);
     }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Line
            points={[[-2, -1, 0], [2, 1, 0]]}
            color={color}
            lineWidth={1}
            transparent
            opacity={0.1}
        />
        <Line
            points={[[-2, 1, 0], [2, -1, 0]]}
            color={color}
            lineWidth={1}
            transparent
            opacity={0.1}
        />
         {/* Floating Geometric Nodes */}
        <mesh position={[1, 0.5, 0]}>
            <icosahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color={color} wireframe />
        </mesh>
         <mesh position={[-1.5, -0.5, 0.5]}>
            <octahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial color={color} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

const CameraController = ({ scrollSpeed }: { scrollSpeed: React.MutableRefObject<number> }) => {
  useFrame((state) => {
    const x = (state.mouse.x * 0.5);
    const y = (state.mouse.y * 0.5);
    
    const shake = scrollSpeed.current * 0.1;
    const shakeX = (Math.random() - 0.5) * shake;
    const shakeY = (Math.random() - 0.5) * shake;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x + shakeX, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y + shakeY, 0.02);
    
    const targetZ = 2.5 + scrollSpeed.current;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);

    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const Background3D: React.FC = () => {
  const scrollSpeed = useRef(0);
  const lastScrollY = useRef(0);
  const { colors, theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      
      const speed = Math.min(delta / 5, 5);
      scrollSpeed.current = speed;
      
      lastScrollY.current = currentScrollY;

      setTimeout(() => {
          if (window.scrollY === currentScrollY) {
             const decayInterval = setInterval(() => {
                 scrollSpeed.current *= 0.9;
                 if (scrollSpeed.current < 0.01) {
                     scrollSpeed.current = 0;
                     clearInterval(decayInterval);
                 }
             }, 50);
          }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-bg-primary transition-colors duration-1000">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 60 }}>
        <CameraController scrollSpeed={scrollSpeed} />
        <ambientLight intensity={theme === 'neon' ? 0.5 : 0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color={colors.accent} />
        
        <group>
            <DataCloud scrollSpeed={scrollSpeed} color={colors.accent} />
            <NetworkConnections scrollSpeed={scrollSpeed} color={colors.accent} />
            <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </group>
      </Canvas>
      
      {/* Gradient Overlays adjusted for theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--bg-primary)_100%)] opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/30 via-transparent to-bg-primary/90 pointer-events-none" />
    </div>
  );
};

export default Background3D;