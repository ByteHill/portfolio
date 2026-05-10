// interactive mini-game scene loaded from game.glb
// D-pad arrow buttons move a PlayerCube around a 5x5 grid (75-unit tiles, clamped ±2 from centre)
// useFrame lerps the cube toward targetPosition each frame; a rim-glow shell follows via position.copy
import React, { useRef, useEffect } from 'react'
import { useGLTF, OrthographicCamera, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function RoomFour(props) {
  const { nodes } = useGLTF('/models/game.glb')

  const yellowMatcap = useTexture('/images/textures/yellow-matcap.jpg')

  yellowMatcap.colorSpace = THREE.SRGBColorSpace

  const cube_Mat = new THREE.MeshMatcapMaterial({
    matcap: yellowMatcap,
    transparent: true,
    opacity: 1,
  })

  const platformMat = new THREE.MeshStandardMaterial({
    color: '#bfc0c8',
    roughness: 0.55,
  })

  const gridMat = new THREE.MeshStandardMaterial({
    color: '#5f6470',
    roughness: 0.6,
  })

  const arrowMat = new THREE.MeshStandardMaterial({
    color: '#00a878',
    roughness: 0.45,
  })

  const arrowTextMat = new THREE.MeshStandardMaterial({
    color: '#f5f5f5',
    roughness: 0.35,
  })

  const cubeMat = new THREE.MeshPhysicalMaterial({
    color: '#f4c542',
    roughness: 0.18,
    metalness: 0.05,
    transparent: true,
    opacity: 0.78,
    transmission: 0.25,
    thickness: 0.6,
  })

  const cubeRef = useRef()
  const cubeShellRef = useRef()
  const targetPosition = useRef(new THREE.Vector3(200, 73.9, -200))

  const rightRef = useRef()
  const leftRef = useRef()
  const upRef = useRef()
  const downRef = useRef()

  const pressedButtons = useRef({
    up: false,
    down: false,
    left: false,
    right: false,
  })

  const TILE = 75
  const START_X = 200
  const START_Z = -200
  const CUBE_Y = 73.9

  const MIN_X = START_X - TILE * 2
  const MAX_X = START_X + TILE * 2
  const MIN_Z = START_Z - TILE * 2
  const MAX_Z = START_Z + TILE * 2

  useEffect(() => {
    const moveLeft = setTimeout(() => {
      targetPosition.current.set(START_X , CUBE_Y, START_Z + TILE);
    }, 1000);

    const moveDown = setTimeout(() => {
      targetPosition.current.set(START_X + TILE, CUBE_Y, START_Z + TILE);
    }, 2500);

    const moveBack = setTimeout(() => {
      targetPosition.current.set(START_X, CUBE_Y, START_Z);
    }, 4500);

    return () => {
      clearTimeout(moveLeft);
      clearTimeout(moveDown);
      clearTimeout(moveBack);
    };
  }, []);


  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
  }

  function moveCube(direction) {
    let nextX = targetPosition.current.x
    let nextZ = targetPosition.current.z

    // corrected mapping
    if (direction === 'right') nextZ -= TILE
    if (direction === 'left') nextZ += TILE
    if (direction === 'up') nextX -= TILE
    if (direction === 'down') nextX += TILE

    targetPosition.current.set(
        clamp(nextX, MIN_X, MAX_X),
        CUBE_Y,
        clamp(nextZ, MIN_Z, MAX_Z)
    )
  }

  function pressButton(direction) {
    pressedButtons.current[direction] = true
    moveCube(direction)

    setTimeout(() => {
      pressedButtons.current[direction] = false
    }, 120)
  }

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.position.lerp(targetPosition.current, 0.05)
    }

    // Keep rim shell in sync with the cube
    if (cubeShellRef.current && cubeRef.current) {
      cubeShellRef.current.position.copy(cubeRef.current.position)
    }

    const animateButton = (ref, key) => {
      if (!ref.current) return

      const targetScale = pressedButtons.current[key] ? 1.18 : 1
      ref.current.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale),
          0.18
      )
    }

    animateButton(rightRef, 'right')
    animateButton(leftRef, 'left')
    animateButton(upRef, 'up')
    animateButton(downRef, 'down')
  })

  const pointerProps = {
    onPointerEnter: () => (document.body.style.cursor = 'pointer'),
    onPointerLeave: () => (document.body.style.cursor = 'default'),
  }

  return (
      <group {...props} dispose={null}>
        <group scale={0.01}>

          {/* arrowRight */}
          <group
              ref={rightRef}
              position={[353.193, 5.5, 122.422]}
              rotation={[0, -Math.PI / 2, 0]}
              onClick={() => pressButton('right')}
              {...pointerProps}
          >
            <mesh geometry={nodes.Text.geometry} material={arrowTextMat} position={[25.56, 4.933, -5.567]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
            <mesh geometry={nodes.Rectangle.geometry} material={arrowMat} position={[-0.057, -4.5, 0]} rotation={[-Math.PI / 2, 0.013, -Math.PI / 2]} />
          </group>

          {/* arrowUp */}
          <group
              ref={upRef}
              position={[517.33, 5.5, -158.081]}
              rotation={[0, 0, -0.005]}
              onClick={() => pressButton('up')}
              {...pointerProps}
          >
            <mesh geometry={nodes.Rectangle_1.geometry} material={arrowMat} position={[-0.057, -4.5, 0]} rotation={[-Math.PI / 2, 0.013, -Math.PI / 2]} />
            <mesh geometry={nodes.Text_1.geometry} material={arrowTextMat} position={[25.56, 4.933, -5.567]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
          </group>

          {/* arrowLeft */}
          <group
              ref={leftRef}
              position={[243.394, 5.5, 114.659]}
              rotation={[0, -Math.PI / 2, 0]}
              onClick={() => pressButton('left')}
              {...pointerProps}
          >
            <mesh geometry={nodes.Rectangle_2.geometry} material={arrowMat} position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
            <mesh geometry={nodes.Down.geometry} material={arrowTextMat} position={[-70.811, 4.6, 14.947]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
          </group>

          {/* arrowDown */}
          <group
              ref={downRef}
              position={[513.33, 5.5, -48.081]}
              onClick={() => pressButton('down')}
              {...pointerProps}
          >
            <mesh geometry={nodes.Rectangle_3.geometry} material={arrowMat} position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
            <mesh geometry={nodes.Down_1.geometry} material={arrowTextMat} position={[-70.811, 4.6, 14.947]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
          </group>

          <OrthographicCamera makeDefault={false} far={100000} near={0} position={[660.18, 405.14, 230.361]} rotation={[-0.739, 0.672, 0.516]} />

          {/* PlayerCube */}
          <mesh
              ref={cubeRef}
              castShadow
              receiveShadow
              geometry={nodes.PlayerCube.geometry}
              material={cube_Mat}
              position={[200, 73.9, -200]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          />

          {/* Rim glow shell — slightly larger inverted cube that shows only around the edges */}
          <mesh
              ref={cubeShellRef}
              geometry={nodes.PlayerCube.geometry}
              position={[200, 73.9, -200]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1.045}
          >
            <meshBasicMaterial
                color="#a5f3fc"
                side={THREE.BackSide}
                transparent
                opacity={0.35}
                depthWrite={false}
            />
          </mesh>

          {/* platform + grid */}
          <mesh receiveShadow geometry={nodes.platform.geometry} material={platformMat} position={[205.5, 1, -199]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
            <group position={[-5.839, -10.96, 32]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
              <group position={[0, 0, -149.961]}>
                <mesh geometry={nodes.topRec_6.geometry} material={gridMat} position={[150, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_5.geometry} material={gridMat} position={[75, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_4.geometry} material={gridMat} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_3.geometry} material={gridMat} position={[-75, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_2.geometry} material={gridMat} position={[-150, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
              </group>

              <group position={[0, 0, -74.961]}>
                <mesh geometry={nodes.topRec_6_1.geometry} material={gridMat} position={[150, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_5_1.geometry} material={gridMat} position={[75, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_4_1.geometry} material={gridMat} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_3_1.geometry} material={gridMat} position={[-75, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_2_1.geometry} material={gridMat} position={[-150, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
              </group>

              <group position={[0, 0, 0.039]}>
                <mesh geometry={nodes.topRec_6_2.geometry} material={gridMat} position={[150, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_5_2.geometry} material={gridMat} position={[75, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_4_2.geometry} material={gridMat} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_3_2.geometry} material={gridMat} position={[-75, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_2_2.geometry} material={gridMat} position={[-150, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
              </group>

              <group position={[0, 0, 75.039]}>
                <mesh geometry={nodes.topRec_6_3.geometry} material={gridMat} position={[150, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_5_3.geometry} material={gridMat} position={[75, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_4_3.geometry} material={gridMat} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_3_3.geometry} material={gridMat} position={[-75, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_2_3.geometry} material={gridMat} position={[-150, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
              </group>

              <group position={[0, 0, 149.961]}>
                <mesh geometry={nodes.topRec_6_4.geometry} material={gridMat} position={[150, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_5_4.geometry} material={gridMat} position={[75, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_4_4.geometry} material={gridMat} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_3_4.geometry} material={gridMat} position={[-75, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                <mesh geometry={nodes.topRec_2_4.geometry} material={gridMat} position={[-150, -1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
              </group>
            </group>
          </mesh>
        </group>
      </group>
  )
}

useGLTF.preload('/models/game.glb')