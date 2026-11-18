import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useConfiguratorStore, type CameraView } from '../store/useConfiguratorStore'

const CAMERA_PRESETS: Record<CameraView, { position: [number, number, number]; target: [number, number, number] }> = {
  default: { position: [0, 1.5, 16], target: [0, 0, 0] },
  bezel: { position: [1.2, 1.0, 10.5], target: [0, 0.3, 0] },
  band: { position: [10.5, 4.0, 9.5], target: [0, -0.3, 0] },
}

export function CameraRig() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const activeView = useConfiguratorStore((state) => state.activeView)
  const targetPos = useRef(new THREE.Vector3(...CAMERA_PRESETS.default.position))
  const targetLookAt = useRef(new THREE.Vector3(...CAMERA_PRESETS.default.target))
  const isTransitioning = useRef(false)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    const preset = CAMERA_PRESETS[activeView]
    targetPos.current.set(...preset.position)
    targetLookAt.current.set(...preset.target)
    isTransitioning.current = true
  }, [activeView])

  useFrame((state, delta) => {
    if (!isTransitioning.current || !controlsRef.current) return

    const lambda = 4
    state.camera.position.set(
      THREE.MathUtils.damp(state.camera.position.x, targetPos.current.x, lambda, delta),
      THREE.MathUtils.damp(state.camera.position.y, targetPos.current.y, lambda, delta),
      THREE.MathUtils.damp(state.camera.position.z, targetPos.current.z, lambda, delta)
    )

    controlsRef.current.target.set(
      THREE.MathUtils.damp(controlsRef.current.target.x, targetLookAt.current.x, lambda, delta),
      THREE.MathUtils.damp(controlsRef.current.target.y, targetLookAt.current.y, lambda, delta),
      THREE.MathUtils.damp(controlsRef.current.target.z, targetLookAt.current.z, lambda, delta)
    )

    controlsRef.current.update()

    if (state.camera.position.distanceTo(targetPos.current) < 0.02) {
      isTransitioning.current = false
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      minDistance={7}
      maxDistance={26}
      onStart={() => {
        isTransitioning.current = false
      }}
    />
  )
}

export function SnapshotTrigger({ registerExport }: { registerExport: (fn: () => void) => void }) {
  const { gl, scene, camera } = useThree()

  useEffect(() => {
    registerExport(() => {
      gl.render(scene, camera)
      const dataUrl = gl.domElement.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `chronograph-edition-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    })
  }, [gl, scene, camera, registerExport])

  return null
}