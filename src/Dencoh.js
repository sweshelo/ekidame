import React, {useState} from 'react';
import './css/Dencoh.css';

function Dencoh(props){
    return(
        <div className="dencoh" onClick={props.handler}>
        {String(props.name)}
        </div>
    )
}

export default Dencoh;
