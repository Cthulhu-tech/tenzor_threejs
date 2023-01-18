import { Particles } from "./particles/particles"
import { Canvas } from '@react-three/fiber'
import { Stars } from "./stars/stars"
import './background.scss'

import { UnrealBloomPass } from "three-stdlib"
import { extend } from '@react-three/fiber'

extend({ UnrealBloomPass })

export const Background = () => {

    return <div className="wrapper-canvas">
        <Canvas>
            <Stars countStars={10}/>
            <Particles countParticles={300} positionRoll={'horizontall-mouse'} sizeParticle={0.01} paralaxParticle={true} speedParticle={.0025}/>
            <Particles countParticles={300} positionRoll={'horizontall-mouse'} sizeParticle={0.01} paralaxParticle={true} speedParticle={.0025}/>
            <Particles countParticles={50} positionRoll={'horizontall'} sizeParticle={0.01} paralaxParticle={true} speedParticle={.0025}/>
            <Particles countParticles={100} positionRoll={'vertical'} sizeParticle={0.01} paralaxParticle={true} speedParticle={.00025}/>
            <ambientLight intensity={.5} />
        </Canvas>
    </div>
}
