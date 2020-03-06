import React, { useState, useEffect } from 'react'
import Ping from './Components/Ping/Ping.js'
import PixiCanvas from './Components/PixiCanvas/PixiCanvas.js'
import LoginPage from './Components/LoginPage/LoginPage.js'
import socketIoClient from 'socket.io-client'
import config from './config.json'
// import TronWeb from 'tronweb'
// const tronWeb = new TronWeb({
//     fullHost: config.fullHost,
// })

const io = socketIoClient(config.serverAddress)

export default () => {
    const [inGame, setInGame] = useState(false)
    const [playerState, setPlayerState] = useState([0, 0, 0, 1000])
    const [otherVisiblePlayers, setOtherVisiblePlayers] = useState([])
    const [status, setStatus] = useState({registered: false})
    const [currentAddress, setCurrentAddress] = useState('')
    const [tronWeb, setTronWeb] = useState({installed: false,loggedIn: false})

    useEffect(() => {window.onbeforeunload = event => window.tronWeb = undefined}, [])
    useEffect(() => {
        initiateTronNetwork()
    }, [tronWeb])


    const initiateTronNetwork = async () => {
        if (!tronWeb.installed) {
            await checkTronWeb() 
            return
        }

        if (tronWeb.installed && !tronWeb.loggedIn) {
            checkLogin()
            return
        }

        setCurrentAddress(window.tronWeb.defaultAddress.base58)
        window.tronWeb.on("addressChanged", () => {
            if (window.tronWeb.defaultAddress.base58 !== currentAddress) setTronWeb({installed: false,loggedIn: false})
            setCurrentAddress(window.tronWeb.defaultAddress.base58)
        })

        if (tronWeb.installed && tronWeb.loggedIn) {
            await checkStatus()
            return
        }
    }

    const checkTronWeb = async() => {
        await new Promise(resolve => {
            let tries = 0

            const timer = setInterval(async () => {
                if (tries >= 10) {
                    clearInterval(timer)
                    tries = 0

                    return resolve()
                }

                let tronWebState = {
                    installed: !!window.tronWeb,
                    loggedIn: (window.tronWeb && window.tronWeb.ready) || false
                }

                if (!tronWebState.installed || !tronWebState.loggedIn)  return tries++
                   
                setTronWeb(tronWebState)
                clearInterval(timer)

                resolve()
            }, 200)
        })
    }

    const checkLogin = () => tronWeb.loggedIn || setTronWeb({installed: true,loggedIn: true})
    const checkStatus = async () => { 
        const contract = await window.tronWeb.contract().at(config.WWT_management_contract_address)
        setStatus(await contract.checkStatus().call())
    }
    

    useEffect(() => {
        io.on(2, newPlayerState => {
            let playerState = newPlayerState
            if (!playerState) return
            setOtherVisiblePlayers(playerState[4].map(i => i.map(i => +i)) || [])
            setPlayerState(playerState.slice(0, 4).map(i => +i))
        });

        (['keydown', 'keyup']).forEach(type => {
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

    const register = async registerFields => {
        if (!registerFields.nickName) return console.log('bad nickname')
        
        const contract = await window.tronWeb.contract().at(config.WWT_management_contract_address)
        await contract.register(registerFields.referalAddress || config.ownerAddress, registerFields.nickName).send({callValue: 50* 1e6})
        checkStatus()
    }

    const enterTheGame = () => {
        io.emit('in', [currentAddress, status])
        setInGame(true)
    }

    useEffect(() => {
        io.on('out', () => {
            setInGame(false)
        })
    }, [])


    return (
        <>
            <span>{otherVisiblePlayers.length + 1} ships, x:{playerState[0].toFixed(2)}/y:{playerState[1].toFixed(2)}</span>
            <Ping io={io} />
            {
                inGame ?
                    <PixiCanvas
                        player={playerState}
                        nickName={status.nickname}
                        otherVisiblePlayers={otherVisiblePlayers}
                    />
                    :
                    <LoginPage 
                        status={status}
                        register={register}
                        enterTheGame={enterTheGame}
                    />
            }
        </>
    )
}