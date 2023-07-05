import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky, Stars } from '@react-three/drei'

import Backdrop from './Backdrop'
import CameraRig from './CameraRig'
import Shirt from './Shirt'
import ErrorBoundary from '../utils/ErrorBoundary'

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={.4} />
      <directionalLight position={[0, 10, 0]} intensity={0.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <Sky sunPosition={[100, 100, 100]} />
      <Stars sunPosition={[100, 100, 100]} />

      <CameraRig>
        <Backdrop />
        <Shirt />
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel