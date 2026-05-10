// lighting rig for the game scene — warm directional sun + cool fill + coloured point lights for mood
import * as THREE from 'three'

export const HeroLightsGame = () => {
    return (
        <>
            {/* bright global fill */}
            <ambientLight
                intensity={0.8}
                color="white"
            />

            {/* main sunlight */}
            <directionalLight
                castShadow
                position={[5, 8, 6]}
                intensity={1.25}
                color="#F7A634"
            />

            {/* softer cool fill */}
            <directionalLight
                position={[-4, 4, 2]}
                intensity={0.7}
                color="#7654F7"
            />

            {/* soft cube/front illumination */}
            <pointLight
                position={[0, 4, 4]}
                intensity={100}
                distance={12}
                color="#D591D9"
            />

            {/* subtle blue edge glow */}
            <pointLight
                position={[5, 2, -4]}
                intensity={1000}
                distance={10}
                color="#D69B1E"
            />

            {/* subtle blue edge glow from LEFT */}
            <pointLight
                position={[-5, -2, 4]}
                intensity={1000}
                distance={5}
                color="#E3AC32"
            />

            {/* subtle blue edge glow */}
            <pointLight
                position={[2, 1, -4]}
                intensity={10}
                distance={10}
                color="#F0B4E3"
            />

            {/* VERY subtle orange atmosphere */}
            <pointLight
                position={[-2, 2, 3]}
                intensity={50}
                distance={3}
                color="#E38219"
            />

            {/* softer area light */}
            <primitive
                object={new THREE.RectAreaLight(
                    '#ffffff',
                    2,
                    5,
                    3
                )}
                position={[-1, 5, 4]}
                rotation={[0, Math.PI / 6, 0]}
            />
        </>
    )
}