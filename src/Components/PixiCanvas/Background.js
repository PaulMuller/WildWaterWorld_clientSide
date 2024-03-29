import React, { useState } from 'react'
import useInterval from 'use-interval'
import { Sprite, TilingSprite } from '@inlet/react-pixi'
import water from '../../media/images/sprites/water/water.js'
import world from '../../media/images/sprites/islands/world.js'
import waterOne from '../../media/images/sprites/water/water_058_c_0001.jpg'


const Background = props => {
    const [waterTexture, setWaterTexture] = useState(waterOne)
    const [counter, setCounter] = useState(1)
    const [delay, setDelay] = useState(1)


    useInterval(() => {
        setWaterTexture(water[counter]);
        setCounter(counter > 250 ? 1 : counter + 1)
        setDelay(counter > 250 ? 50 : delay)
    }, delay)


    return(
        <>
            <TilingSprite
                image={waterTexture}
                width={window.innerWidth*2}
                height={window.innerHeight*2}
                x={-window.innerWidth/2}
                y={-window.innerHeight/2}
                tilePosition={{ x: -props.player[0], y: -props.player[1]}}
                tileScale={{ x: 0.5, y: 0.5 }}
            />
            <TilingSprite
                image={world[6]}
                alpha={0.3}
                width={window.innerWidth*2}
                height={window.innerHeight*2}
                x={-window.innerWidth/2}
                y={-window.innerHeight/2}
                tilePosition={{ x: -props.player[0], y: -props.player[1] }}
                tileScale={{ x: 10, y: 10 }}
            />
            <Sprite 
                image={world[4]} 
                x={window.screen.width/2 + 0 -props.player[0]} 
                y={window.screen.height/2 + 0 -props.player[1]} 
                rotation = {0} 
                scale ={10}
                anchor={[0.5, 0.5]}
                alpha={0.7}
            />
        </>
    )
}

export default Background