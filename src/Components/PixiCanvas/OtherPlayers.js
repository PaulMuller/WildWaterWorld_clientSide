import React from 'react'
import {Sprite} from '@inlet/react-pixi'
import boat from '../../media/images/sprites/boat_lvl1.png'

export default props => {
    return(
        <>
            {props.otherVisiblePlayers.map( otherPlayer => (
                <Sprite 
                    image={boat} 
                    x={window.innerWidth/2 + otherPlayer[0] -props.player[0]} 
                    y={window.innerHeight/2 + otherPlayer[1] -props.player[1]} 
                    rotation = {otherPlayer[2]} 
                    anchor={[0.5, 0.5]}
                />
            ))}
        </>
    )
}