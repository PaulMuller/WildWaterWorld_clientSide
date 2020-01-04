import React from 'react';
import {Sprite , AnimatedSprite, BitmapText} from '@inlet/react-pixi';
import boat from '../../media/images/sprites/boat_lvl1.png';

export default props => {
    return(
        <>
                        {/* <BitmapText
                anchor={0.5}
                x={window.screen.width/2}
                y={window.screen.height/2 - 50}
                text="_name_"
                style={{ font: '50px Desyrel' }}
            /> */}
            <Sprite 
                image={boat} 
                x={window.innerWidth/2} 
                y={window.innerHeight/2} 
                rotation = {props.player.rotation} 
                anchor={[0.5, 0.5]}
            />
        </>)
    ;
}