import React, {useState} from 'react';
import BattleDencoh from './Battle.dencoh';

function Battle(props){
    console.log(props.formations[0][0]);
    return(
        <div className="dencoh-battle">
            <BattleDencoh dencoh={props.formations[0][props.battler[0]]} key="left"/>
            <BattleDencoh dencoh={props.formations[1][props.battler[1]]} key="right"/>
        </div>
    )
}

export default Battle;
