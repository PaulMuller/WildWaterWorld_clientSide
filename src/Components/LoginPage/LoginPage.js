import React, {useState} from 'react'
import '../../App.css'

const LoginPage = props => {
    const [registerFields, setRegisterFields] = useState({nickName: '', referalAddress: ''})

    return (
        <>
            <div className='loginForm'>
                <span>Welcome to the WILD WATER TRON</span><br/><br/>
                <span>MMO openworld sandbox RPG with blockchain-based economy.</span>
            </div>

            {
                !props.status.registered ?
                <>
                    <div className='loginForm'>
                        <span>To register in the game you need:</span><br/>
                        <ul>
                            <li>TronLink wallet(or analog)</li>
                            <li>Your own Tron account (address)</li>
                            <li>Press 'Register' button</li>
                        </ul>
                    </div>
                    <div className='loginForm'>
                        <input onChange = {e => setRegisterFields({nickName: e.target.value, referalAddress: registerFields.referalAddress})} placeholder='nickname'></input>
                        <input onChange = {e => setRegisterFields({nickName: registerFields.nickName, referalAddress: e.target.value})} placeholder='referal address'></input><br/>
                        <button onClick = {() => props.register(registerFields)}>REGISTER</button>
                    </div>
                    
                </>
                :
                <>
                    <div className='loginForm'>
                        <span>Hello, {props.status.nickname}</span><br/><br/>
                        <span>Referal count: {+props.status.referalCount}</span><br/>
                        <span>Referal profit: {+props.status.referalProfit/1e6} TRX</span><br/><br/>
                        <button onClick={() => void(0)}>withdraw profit</button><br/><br/>
                        <button onClick={() => void(0)}>generate referal link</button><br/><br/>
                        <button onClick={() => void(0)}>change nickname (500 TRX)</button><br/>
                    </div>
                    <div className='loginForm'>
                        <button onClick={() => props.enterTheGame()}>Enter the game</button>
                    </div>
                </>
            }
        </>
    )
}

export default LoginPage