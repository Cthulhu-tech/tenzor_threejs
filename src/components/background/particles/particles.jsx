import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from "three"

import { fragmentShader } from './fragmentShader'
import { vertexShader } from './vertexShader'
import { Vector3 } from 'three'

export const Particles = ({countParticles}) => {

    const radius = 3
    const points = useRef()
    const [count] = useState(countParticles)

    const particlesPosition = useMemo(() => {

        const positions = new Float32Array(count * 3)
        
        for (let i = 0; i < count; i++) {

          const distance = Math.sqrt((Math.random() - .1)) * radius
          const theta = THREE.MathUtils.randFloatSpread(180)
          const phi = THREE.MathUtils.randFloatSpread(180)
    
          let x = distance * Math.sin(theta) * Math.cos(phi)
          let y = distance * Math.sin(theta) * Math.sin(phi)
          let z = distance * Math.cos(theta)

          positions.set([x, y, z], i * 3)
        }
        
        return positions
    }, [count]);

    const uniforms = useMemo(() => ({
        uTime: {
          value: 10
        },
        uRadius: {
          value: radius
        },
    }), [])
    

    useFrame((state) => {
      const { clock, mouse} = state
      const vector = new Vector3(mouse.x, mouse.y, 0)
      /// устанавливаем скорость смешения камеры относительно курсора
      points.current.position.set(vector.x * .15, vector.y * .15, 1)
      points.current.material.uniforms.uTime.value = clock.elapsedTime
    })

    return  <points ref={points}>
        <bufferGeometry>
        <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={4}
        />
        </bufferGeometry>
        <shaderMaterial depthWrite={true} fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms}/>
    </points>
}