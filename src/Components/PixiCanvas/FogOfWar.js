import React from 'react'
import { Container, Graphics, withFilters } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js';
const Filters = withFilters(Container, { blur: PIXI.filters.BlurFilter})

export default props => {
    return (
        <Filters enable={true} blurFilter={{'blur': 1}}>
            <Graphics 
                preventRedraw={true}
                alpha={0.5}
                cachedTexture = {true} 
                // ref={ref => props.setMask(ref)} 
                draw={g => {
                    g.beginFill()
                    g.drawRect(-window.innerWidth/2,-window.innerHeight/2,window.innerWidth*2, window.innerHeight*2)
                    g.beginHole()
                    g.drawCircle(window.innerWidth/2, window.innerHeight/2, props.player[3]-20)
                    g.endHole();
                }} 
            />
        </Filters>
    )

}