import React from 'react';
import {Sprite , AnimatedSprite, BitmapText} from '@inlet/react-pixi';
import boat from '../../media/images/sprites/boat_lvl1.png';
import world from './world.json';

export default props => {
    return(
        <>
            {Object.keys(props.otherVisiblePlayers).map(id => (
                <Sprite 
                    image={boat} 
                    x={window.innerWidth/2 + props.otherVisiblePlayers[id].x -props.player.x} 
                    y={window.innerHeight/2 + props.otherVisiblePlayers[id].y -props.player.y} 
                    rotation = {props.otherVisiblePlayers[id].rotation} 
                    anchor={[0.5, 0.5]}
                />
            ))}
        </>)
    ;
}