import React, {useState, useEffect} from 'react';
import Ping from './Components/Ping/Ping.js';
import PixiCanvas from './Components/PixiCanvas/PixiCanvas.js';
import socketIoClient from 'socket.io-client';
import config from "./config.json";
const io = socketIoClient(config.serverAddress);

export default () => {
    const [player, setPlayer] = useState({
        name: "Incognito",
        ship: "boat_lvl1",
        x:0,
        y:0, 
        rotation: 0, 
        viewRadius:500
    });

    const [otherVisiblePlayers, setOtherVisiblePlayers] = useState({});
    const [islands, setIslands] = useState({});

    // const [gameStatus, setGameStatus] = useState({
    //     players: []
    // });

    useEffect(()=>{
        io.on(2, (data) => {//playerUpdate
            if (data.player == undefined) return;
            setPlayer(data.player);
            setOtherVisiblePlayers(data.otherVisiblePlayers)
            setIslands(Object.assign({},data.islands));
        });

        // io.on("_gameStatus", (data) => {
        //     setGameStatus(data)
        // });

        io.on("_otherPlayers", (data) => {
            setOtherVisiblePlayers(data);
        });

        window.addEventListener('keydown', e => {
            if (e.repeat) return;
            const key = e.code;
            io.emit(key + "_pressed");
        });

        window.addEventListener('keyup', e => {
            if (e.repeat) return;
            const key = e.code;
            io.emit(key + "_released");
        });
    },[]);

  


    return (
        <>
            <span>{Object.keys(otherVisiblePlayers).length + 1} ships, x:{player.x.toFixed(2)}/y:{player.y.toFixed(2)}</span>
            <Ping io={io}/>
            <PixiCanvas
                player={player}
                otherVisiblePlayers={otherVisiblePlayers}
                islands={islands}
            />
        </>
    );
}