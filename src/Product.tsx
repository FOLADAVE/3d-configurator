import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import { useConfiguratorStore } from './store/useConfiguratorStore'

type ActionName = 'Anim_0'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Hand_Seconds_1: THREE.Mesh
    Hand_Seconds_2: THREE.Mesh
    Hand_Hours_1: THREE.Mesh
    Hand_Hours_2: THREE.Mesh
    Hand_Hours_3: THREE.Mesh
    Hand_Minutes_1: THREE.Mesh
    Hand_Minutes_2: THREE.Mesh
    Hand_Minutes_3: THREE.Mesh
    Hand_Setting_1: THREE.Mesh
    Hand_Setting_2: THREE.Mesh
    Backplate_Khronos: THREE.Mesh
    Band_Carbon_Fiber: THREE.Mesh
    Band_Plastic: THREE.Mesh
    Bezel_Frame: THREE.Mesh
    Button_Metal: THREE.Mesh
    Button_Plastic: THREE.Mesh
    Clasp_DGG: THREE.Mesh
    Glass_Face: THREE.Mesh
    Watch_Face: THREE.Mesh
  }
  materials: {
    ['Hand Plastic']: THREE.MeshStandardMaterial
    ['Hand Metal']: THREE.MeshStandardMaterial
    ['Hand Color Gold']: THREE.MeshStandardMaterial
    ['Backplate Khronos']: THREE.MeshStandardMaterial
    ['Band Carbon Fiber Gold']: THREE.MeshStandardMaterial
    ['Band Plastic Gold']: THREE.MeshStandardMaterial
    ['Bezel Frame Gold']: THREE.MeshStandardMaterial
    ['Button Metal']: THREE.MeshStandardMaterial
    ['Button Plastic Gold']: THREE.MeshStandardMaterial
    ['Clasp DGG']: THREE.MeshStandardMaterial
    ['Glass Face']: THREE.MeshPhysicalMaterial
    ['Watch Face']: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Product(props: React.ComponentProps<'group'>) {
  const group = React.useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/product.glb') as unknown as GLTFResult
  const { actions } = useAnimations(animations, group)

  const bandColor = useConfiguratorStore((state) => state.bandColor)
  const bezelColor = useConfiguratorStore((state) => state.bezelColor)

  // Play the built-in watch hand animation if available
  useEffect(() => {
    actions.Anim_0?.play()
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="Hands" position={[0.113, 0.158, 0.758]} rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Hand_Seconds" position={[-0.113, 0.758, -0.158]}>
            <mesh name="Hand_Seconds_1" geometry={nodes.Hand_Seconds_1.geometry} material={materials['Hand Plastic']} />
            <mesh name="Hand_Seconds_2" geometry={nodes.Hand_Seconds_2.geometry} material={materials['Hand Metal']} />
          </group>
          <group name="Hand_Hours" position={[-0.113, 0.752, -0.158]}>
            <mesh name="Hand_Hours_1" geometry={nodes.Hand_Hours_1.geometry} material={materials['Hand Plastic']} />
            <mesh name="Hand_Hours_2" geometry={nodes.Hand_Hours_2.geometry} material={materials['Hand Metal']} />
            <mesh name="Hand_Hours_3" geometry={nodes.Hand_Hours_3.geometry} material={materials['Hand Color Gold']} />
          </group>
          <group name="Hand_Minutes" position={[-0.113, 0.752, -0.158]}>
            <mesh name="Hand_Minutes_1" geometry={nodes.Hand_Minutes_1.geometry} material={materials['Hand Plastic']} />
            <mesh name="Hand_Minutes_2" geometry={nodes.Hand_Minutes_2.geometry} material={materials['Hand Metal']} />
            <mesh name="Hand_Minutes_3" geometry={nodes.Hand_Minutes_3.geometry} material={materials['Hand Color Gold']} />
          </group>
          <group name="Hand_Setting" position={[-0.113, 0.752, -0.158]}>
            <mesh name="Hand_Setting_1" geometry={nodes.Hand_Setting_1.geometry} material={materials['Hand Plastic']} />
            <mesh name="Hand_Setting_2" geometry={nodes.Hand_Setting_2.geometry} material={materials['Hand Metal']} />
          </group>
        </group>

        <mesh name="Backplate_Khronos" geometry={nodes.Backplate_Khronos.geometry} material={materials['Backplate Khronos']} position={[0, 0, 0.01]} rotation={[-Math.PI / 2, 0, 0]} />

        {/* Declarative Band Material Overrides */}
        <mesh name="Band_Carbon_Fiber" geometry={nodes.Band_Carbon_Fiber.geometry}>
          <meshStandardMaterial {...materials['Band Carbon Fiber Gold']} color={bandColor} />
        </mesh>
        <mesh name="Band_Plastic" geometry={nodes.Band_Plastic.geometry}>
          <meshStandardMaterial {...materials['Band Plastic Gold']} color={bandColor} />
        </mesh>

        {/* Declarative Bezel Material Override */}
        <mesh name="Bezel_Frame" geometry={nodes.Bezel_Frame.geometry}>
          <meshStandardMaterial {...materials['Bezel Frame Gold']} color={bezelColor} />
        </mesh>

        <mesh name="Button_Metal" geometry={nodes.Button_Metal.geometry} material={materials['Button Metal']} />
        <mesh name="Button_Plastic" geometry={nodes.Button_Plastic.geometry} material={materials['Button Plastic Gold']} />
        <mesh name="Clasp_DGG" geometry={nodes.Clasp_DGG.geometry} material={materials['Clasp DGG']} />
        <mesh name="Glass_Face" geometry={nodes.Glass_Face.geometry} material={materials['Glass Face']} />
        <mesh name="Watch_Face" geometry={nodes.Watch_Face.geometry} material={materials['Watch Face']} />
      </group>
    </group>
  )
}

useGLTF.preload('/product.glb')