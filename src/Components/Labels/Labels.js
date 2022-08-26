import React from 'react'
import '../../App.css'

const Labels = props => {
    return (
        <>
            <div 
                style={{
                    left: (window.innerWidth/2 -35), 
                    top: (window.innerHeight/2 -60)
                }} 
                className='playerLable'
            >
                {props.nickName.slice(0,15)}
            </div>
            {props.otherVisiblePlayers.map( otherPlayer => (
                <div 
                    style={{
                        left: window.innerWidth/2 + otherPlayer[0] * props.scaling  -props.player[0] * props.scaling -35, 
                        top:  window.innerHeight/2 + otherPlayer[1]* props.scaling  -props.player[1] * props.scaling -60
                    }} 
                    className='playerLable'
                >
                    {otherPlayer[3]}...
                </div>
            ))}
        </>
    )
}

export default Labels