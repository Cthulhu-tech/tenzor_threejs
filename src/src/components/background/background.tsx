import { Particles } from "./particles/particles"
import { Canvas } from '@react-three/fiber'
import { Stars } from "./stars/stars"
import './background.scss'



export const Background = () => {

    return <div className="wrapper-canvas">
        <Canvas camera={{ position: [0, 1, 0.5] }}>
            <Stars countStars={10}/>
            <Particles countParticles={5000}/>
            <ambientLight intensity={.5} />
        </Canvas>
    </div>
}