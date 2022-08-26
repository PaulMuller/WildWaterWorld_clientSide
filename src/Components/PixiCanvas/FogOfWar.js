import React, {useCallback} from 'react'
import * as PIXI from 'pixi.js'
import { Container, Graphics, withFilters } from '@inlet/react-pixi'
const Filters = withFilters(Container, { blur: PIXI.filters.BlurFilter})

//TODO: bad perfomance
const FogOfWar = props => {
    const draw = useCallback(g => {
        g.beginFill()
        g.drawRect(-window.innerWidth/2,-window.innerHeight/2,window.innerWidth*2, window.innerHeight*2)
        g.beginHole()
        g.drawCircle(window.innerWidth/2, window.innerHeight/2, props.player[3]-20)
        g.endHole();
    }, [])

    return (
        <Filters enable={true}>
            <Graphics 
                alpha={0.0075}
                draw={draw} 
            />
        </Filters>
    )
}

export default FogOfWar