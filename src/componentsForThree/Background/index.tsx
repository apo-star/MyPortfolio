import { FallingStar } from "../shader/FallingStar"
import { NightSky } from "../shader/NightSky"

export const Backgroud = () => {
    return (
        <group position={[0,0,-3]}>
            <NightSky />
            <FallingStar />
        </group>
    )
}