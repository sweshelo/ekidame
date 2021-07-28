import React, {useState} from 'react';

function Dencoh(props){
    return(
        <div className="dencoh">
        <button onClick={props.handler}>{props.name}</button>
        </div>
    )
}

export default Dencoh;
