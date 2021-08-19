import React, {useState} from 'react';
import './css/Dencoh.css';

const Dencoh = (props)=>{

    const BackImage = ()=>{
        if (props.id != null){
            return(
                <img src={"img/slot/"+props.id+".png"} className="dencoh-form-face" alt={props.name}/>
            );
        }else{
            return null;
        }
    };

    const Stats = ()=>{
        return(
            <div className="dencoh-stats-panel">
            <p className="dencoh-stats-carnum">{props.carNumber == 0 ? '先頭車両' : String(props.carNumber + 1)+'両目' }</p>
            <p className="dencoh-stats-name">{props.name}</p>
            <p className="dencoh-stats-element">{props.element}</p>
            <p className="dencoh-stats-status">{props.ap ? 'AP'+String(props.ap) : ''}</p>
            </div>
        )
    }

    return(
        <div className="dencoh" onClick={props.handler} >
        <Stats />
        <BackImage />
        <div className="dencoh-stats-allow">
        <span className="dencoh-stats-level">{props.level ? 'Lv'+String(props.level) : ''}</span><span className="dencoh-stats-skill">{props.skill ? 'skill activated' : ''}</span>
        </div>
        </div>
    )
}

export default Dencoh;
