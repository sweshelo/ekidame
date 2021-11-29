import React, {useState} from 'react';
import './css/DencohBattle.css';

function DencohBattle(props){
    var image = null;
    if (props.dencoh.id != null){
        image = <img src={"img/slot/"+props.dencoh.id+".png"} className="dencoh-battle-dencoh-image" alt={props.dencoh.name}/>;
    }
    return(
        <div className={"dencoh-battle-dencoh "+props.key} >
            {image}
            <p>{props.dencoh.name}</p>
        </div>
    )
}

export default DencohBattle;
