import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from "three"
import { Vector2 } from 'three'

export const Particles = ({countParticles, positionRoll, sizeParticle, paralaxParticle = false, speedParticle = .0025}) => {

    const points = useRef()

    const particlesPosition = useMemo(() => {

        const position = new Float32Array(countParticles * 3)
        
        for (let i = 0; i < countParticles; i++) {

          const distance = Math.sqrt((Math.random())) * 6
          const theta = THREE.MathUtils.randFloatSpread(10)
          const phi = THREE.MathUtils.randFloatSpread(10)

          const x = distance * Math.sin(theta) * Math.cos(phi)
          const y = distance * Math.sin(theta) * Math.sin(phi)
          const z = distance * Math.cos(theta)

          position.set([x, y, z], i * 3)
        }
        
        return position
    }, [countParticles]);

    const uniforms = useMemo(() => ({
        uTime: {
          value: 10
        },
    }), [])
    

    useFrame((state) => {
      const { clock, mouse } = state
      const vector = new Vector2(mouse.x, mouse.y)
      if(positionRoll === 'horizontall-mouse'){
        const x = vector.x >= 0 ? vector.x + .5 : vector.x - .5
        points.current.rotation.y += x * speedParticle
      }else if (positionRoll === 'vertical-mouse'){
        const y = vector.y >= 0 ? vector.y + .5 : vector.y - .5
        points.current.rotation.x += y * speedParticle
      }else if(positionRoll === 'horizontall'){
        points.current.rotation.y += speedParticle
      }else if (positionRoll === 'vertical'){
        points.current.rotation.x += speedParticle
      }

      points.current.size = 2
      /// устанавливаем скорость смешения камеры относительно курсора
      if(paralaxParticle) points.current.position.set(vector.x * .15, vector.y * -.15, 0)
      points.current.material.uniforms.uTime.value = clock.elapsedTime
    })

    return  <points ref={points}>
        <bufferGeometry>
        <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length}
            array={particlesPosition}
            itemSize={4}
        />
        </bufferGeometry>
        <pointsMaterial size={sizeParticle} color="#FFBF40" depthWrite={false} uniforms={uniforms} />
    </points>
}