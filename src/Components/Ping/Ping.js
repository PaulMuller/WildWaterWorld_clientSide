import React, {useState, useEffect} from 'react';
import useInterval from 'use-interval';
import '../../App.css';


export default (props) => {
    const [ping, setPing] = useState(NaN);
    const [pingSended, setPingSended] = useState(false);
    const [connection, setConnection] = useState(false);

    useEffect(()=>{
        props.io.on(1, (res) => {
            setPing(Date.now()% 1e5 -res);
            setPingSended(false);
        })
    },[]);

    useInterval(() => {
        if (pingSended){
            setConnection(false);
        }else{
            setConnection(true);
        }
        props.io.emit(1, Date.now()% 1e5);
        setPingSended(true);
    }, 2000);

    return <span className="pingIndicator">{connection? ping + " ms ": " not connected "}🌍</span>;
}
