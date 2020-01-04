import React from 'react';
import {Container, Graphics, withFilters} from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
const BlurFilter = withFilters(Container, PIXI.filters.BlurFilter)

export default props => {
    return (
        <BlurFilter enable={true} blurFilter={{'blur': 1}} >
            <Graphics 
                preventRedraw={true}
                alpha={0.1}
                cachedTexture = {true} 
                ref={ref => props.setMask(ref)} 
                draw={g => {
                    g.beginFill()
                    g.drawRect(-window.innerWidth/2,-window.innerHeight/2,window.innerWidth*2, window.innerHeight*2)
                    g.beginHole()
                    g.drawCircle(window.innerWidth/2, window.innerHeight/2, props.player.viewRadius-20)
                    g.endHole();
            }} />
        </BlurFilter>
    )

}