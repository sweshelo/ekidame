import React, {useState} from 'react';
import './css/Dencoh.css';

const Dencoh = (props)=>{

    const BackImage = ()=>{
        if (props.name != null){
            return(
                <img src={"img/slot/"+props.name+".png"} className="dencoh-form-face" alt={props.name}/>
            );
        }else{
            return null;
        }
    };

    const Stats = ()=>{
        return(
            <div className="dencoh-stats-panel">
            <p className="dencoh-stats-carnum">{props.carNumber == 0 ? '先頭車両' : String(props.carNumber + 1)+'両目' }</p>
            <p className="dencoh-stats-name">でんこ名</p>
            <p className="dencoh-stats-element">flat</p>
            <p className="dencoh-stats-status">AP999</p>
            <p className="dencoh-stats-level">Lv80</p>
            <p className="dencoh-stats-skill">skill activated</p>
            </div>
        )
    }

    return(
        <div className="dencoh" onClick={props.handler} >
        <Stats />
        <BackImage />
        </div>
    )
}

export default Dencoh;
