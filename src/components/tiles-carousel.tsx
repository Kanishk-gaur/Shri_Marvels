"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Box } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

interface TileItemProps {
  position: [number, number, number]
  text: string
  color: string
}

function TileItem({ position, text, color }: TileItemProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state: { clock: THREE.Clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.1
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  return (
    <group position={position}>
      <Box ref={meshRef} args={[2.5, 2.5, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      <Text position={[0, 0, 0.2]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state: { clock: THREE.Clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      <TileItem position={[0, 0, 0]} text="Ceramic" color="#74b9ff" />
      <TileItem position={[4, 0, 0]} text="Marble" color="#0984e3" />
      <TileItem position={[8, 0, 0]} text="Mosaic" color="#00b894" />
      <TileItem position={[12, 0, 0]} text="Stone" color="#00cec9" />
      <TileItem position={[-4, 0, 0]} text="Granite" color="#6c5ce7" />
      <TileItem position={[-8, 0, 0]} text="Porcelain" color="#a29bfe" />
    </group>
  )
}

export function TilesCarousel() {
  return (
    <motion.div
      className="h-96 w-full"
      initial={{ rotateX: -90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        <Scene />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </motion.div>
  )
}