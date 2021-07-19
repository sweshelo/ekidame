import React, {useState} from 'react';
import BattleDencoh from './Battle.dencoh';

function Battle(props){
    return(
        <div>
            <BattleDencoh dencoh={props.battler[0]} />
            <BattleDencoh dencoh={props.battler[1]} />
        </div>
    )
}

export default Battle;
