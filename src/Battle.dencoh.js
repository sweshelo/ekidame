import React, {useState} from 'react';
import './css/DencohBattle.css';

function DencohBattle(props){
    var image = null;
    if (props.dencoh != null){
        image = <img src={"img/face/"+props.dencoh+".png"} className="dsm-face" alt={props.dencoh}/>;
    }
    return(
        <div className="dencoh-battle">
            {image}
            <p>{props.dencoh}</p>
        </div>
    )
}

export default DencohBattle;
