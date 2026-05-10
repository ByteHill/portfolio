// the active 3D canvas for the hero — wraps RoomFour (the mini-game scene) with lighting and orbit controls
// speech bubble fades out on first drag interaction
import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMediaQuery } from 'react-responsive'
import { RoomFour } from './RoomFour.jsx'
import * as THREE from 'three'
import { HeroLightsGame } from './HeroLights_Game.jsx'
import gsap from 'gsap'

const HeroExperience3 = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [isDragging, setIsDragging] = useState(false)
    const bubbleFaded = useRef(false)

    return (
        <Canvas
            shadows
            camera={{
                position: isMobile ? [0, 2, 10.5] : [0, 2, 10.5],
                fov: 45
            }}
            gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.2,
            }}
            style={{ background: 'transparent', cursor: isDragging ? 'grabbing' : 'grab' }}
            onPointerDown={() => setIsDragging(true)}
            onPointerUp={() => setIsDragging(false)}
            onPointerLeave={() => setIsDragging(false)}
        >
            <HeroLightsGame />

            <group
                scale={isMobile ? 1 : 1.1}
                position={
                    isMobile
                        ? [-2.8, -0.5, 0]
                        : [-3.2, -1.1, 0]
                }
                rotation={
                    isMobile
                        ? [0.12, -0.7, 0.03]
                        : [0.2, -0.65, 0.05]
                }
            >
                <RoomFour />
            </group>

            <OrbitControls
                enablePan={false}
                enableZoom={!isTablet}
                target={[0, 0, 0]}
                minDistance={6}
                maxDistance={24}
                onStart={() => {
                    if (!bubbleFaded.current) {
                        bubbleFaded.current = true
                        gsap.to('.hero-bubble', { opacity: 0, duration: 0.6, ease: 'power2.out' })
                    }
                }}
            />
        </Canvas>
    )
}

export default HeroExperience3