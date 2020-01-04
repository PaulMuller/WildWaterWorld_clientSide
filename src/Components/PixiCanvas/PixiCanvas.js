import React, {useState} from 'react';
import {Stage, Container} from '@inlet/react-pixi';
import '../../App.css';
import Background from './Background';
import Player from './Player';
import OtherPlayers from './OtherPlayers';
import ReactViewport from './ReactViewport/index';
import FogOfWar from './FogOfWar';


export default props => {
    const [mask, setMask] = useState(null);
    return(
        <Stage 
            width={window.innerWidth}
            height={window.innerHeight}
            options={{
                resolution: 1,
                transparent:true
            }}
        >
            <Container >
                <ReactViewport>
                    <Background
                        player={props.player}
                    />
                    <Player
                        player={props.player}
                    />
                    <OtherPlayers
                        player={props.player}
                        otherVisiblePlayers = {props.otherVisiblePlayers}
                    />
                    <FogOfWar
                        player={props.player}
                        setMask = {setMask}
                    />
                </ReactViewport>
            </Container>
        </Stage>
    );
}
