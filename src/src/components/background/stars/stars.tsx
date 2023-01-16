import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'


export const Stars = ({countStars} : {countStars: number}) => {

    const points = useRef<any>(null!)
    const [count] = useState(countStars)

    useFrame((state) => {
        
    })
    return  <points ref={points}>
        <bufferGeometry>

        </bufferGeometry>
    </points>
}