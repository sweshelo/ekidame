import React, {useState} from 'react';
import './css/Dencoh.css';

function Dencoh(props){
    var image = null;
    if (props.name != null){
        image = <img src={"img/face/"+props.name+".png"} className="dencoh-form-face" alt={props.name}/>;
    }
    return(
        <div className="dencoh" onClick={props.handler}>
        {image}
        {String(props.name)}
        </div>
    )
}

export default Dencoh;
