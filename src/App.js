import React, {useState, useEffect} from 'react'
import useInterval from 'use-interval'
import Ping from './Components/Ping/Ping.js'
import PixiCanvas from './Components/PixiCanvas/PixiCanvas.js'
import socketIoClient from 'socket.io-client'
import config from './config.json'
const io = socketIoClient(config.serverAddress)

export default () => {
    const [playerConsts, setPlayerConsts] = useState([
        'TUFEL9h9zN8KNMwRgcTxd9jDXUU3E8Kwbx',
        'boat_lvl1'
    ])
    const [playerState, setPlayerState] = useState([
        0,
        0, 
        0, 
        500
    ])
    const [otherVisiblePlayers, setOtherVisiblePlayers] = useState([])

    useEffect(() => {
        io.on(2, playerState => {
            playerState = playerState.map(i => +i)
            if (!playerState) return
            setOtherVisiblePlayers(playerState[4] || [])
            setPlayerState(playerState.slice(0, 4))
            console.log(playerState)
        });
    
        (['keydown', 'keyup']).forEach( type => {
            window.addEventListener(type, e => {
                if (e.repeat) return
                io.emit(3, [
                    e.keyCode,
                    e.type,
                    e.ctrlKey,
                    e.shiftKey,
                    e.altKey
                ])
            })
        })
    }, [])

    

    


    return (
        <>
            <span>{otherVisiblePlayers.length + 1} ships, x:{playerState[0].toFixed(2)}/y:{playerState[1].toFixed(2)}</span>
            <Ping io={io}/>
            <PixiCanvas
                player={playerState}
                otherVisiblePlayers={otherVisiblePlayers}
            />
        </>
    )
}