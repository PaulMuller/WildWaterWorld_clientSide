import React, {useState} from 'react'
import {Stage, Container} from '@inlet/react-pixi'
import '../../App.css'
import Background from './Background'
import Player from './Player'
import OtherPlayers from './OtherPlayers'
import ReactViewport from './ReactViewport/index'
import Labels from '../Labels/Labels'

import FogOfWar from './FogOfWar'


export default props => {
    // const [mask, setMask] = useState(null)
    const [scaling, setScaling] = useState(1)
    return(
        <>
            <Stage 
                width={window.innerWidth}
                height={window.innerHeight}
                options={{
                    resolution: 1,
                    transparent:true
                }}
            >
                <Container >
                    <ReactViewport setScaling={setScaling}>
                        <Background
                            player={props.player}
                            // mask={mask}
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
                            // setMask = {setMask}
                        />
                    </ReactViewport>
                </Container>
            </Stage>
            <Labels
                scaling={scaling}
                player={props.player}
                nickName={props.nickName}
                otherVisiblePlayers={props.otherVisiblePlayers}
            />
        </>
    )
}
