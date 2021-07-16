import React, {useState} from 'react';

function Battle(props){
    return(
        <div>
            <p>{props.battler[0]}</p>
            <p>{props.battler[1]}</p>
        </div>
    )
}

export default Battle;
