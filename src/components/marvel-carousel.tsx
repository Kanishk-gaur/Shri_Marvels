"use client"

import { useRef } from "react"
import { Canvas, useFrame, type RootState } from "@react-three/fiber"
import { OrbitControls, Text, Box } from "@react-three/drei"
import { motion } from "framer-motion"
import type * as THREE from "three"

function CarouselItem({ position, text, color }: { position: [number, number, number]; text: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + position[0]) * 0.1
    }
  })

  return (
    <group position={position}>
      <Box ref={meshRef} args={[2, 3, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      <Text position={[0, 0, 0.2]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state: RootState) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <CarouselItem position={[0, 0, 0]} text="Iron Man" color="#ff6b6b" />
      <CarouselItem position={[4, 0, 0]} text="Thor" color="#4ecdc4" />
      <CarouselItem position={[8, 0, 0]} text="Hulk" color="#45b7d1" />
      <CarouselItem position={[12, 0, 0]} text="Captain America" color="#96ceb4" />
      <CarouselItem position={[-4, 0, 0]} text="Spider-Man" color="#ffeaa7" />
      <CarouselItem position={[-8, 0, 0]} text="Black Widow" color="#dda0dd" />
    </group>
  )
}

export function MarvelCarousel() {
  return (
    <motion.div
      className="h-96 w-full"
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Scene />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </motion.div>
  )
}