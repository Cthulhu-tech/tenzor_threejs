import { Float, Sphere, Trail } from "@react-three/drei"
import { useRef } from 'react'

export const Stars = () => {

    const ref = useRef()

    return <>
        <Trail
            width={.01}
            length={10}
            color={'#FFBF40'}
            attenuation={(t) => {
              return t * .5
            }}
            target={ref}
          />
          <Float speed={3} floatIntensity={10} ref={ref}>
            <Sphere args={[.0001, .0001, .0001]} position={[0, -1, 0.5]}>
              <meshNormalMaterial />
            </Sphere>
          </Float>
        </>
}