import React, {useState} from 'react';

function Dencoh(props){
    return(
        <div className="dencoh">
        <p onClick={props.handler}>{String(props.name)}</p>
        </div>
    )
}

export default Dencoh;
