import React from 'react'
import { Sprite } from '@inlet/react-pixi'
import boat from '../../media/images/sprites/boat_lvl1.png'

const Player = props => {
    return(
        <Sprite 
            image={boat} 
            x={window.innerWidth/2} 
            y={window.innerHeight/2} 
            rotation = {props.player[2]} 
            anchor={[0.5, 0.5]}
        />
    )
}

export default Player