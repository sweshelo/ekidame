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
            <p className={"dencoh-stats-name is-char-"+props.color}>{props.name}</p>
            <p className="dencoh-stats-element dasher">{props.element}</p>
            <p className="dencoh-stats-status dasher">{props.ap ? 'AP'+String(props.ap) : ''}</p>
            </div>
        )
    }

    return(
        <div className="dencoh" onClick={props.handler} >
        <Stats />
        <BackImage />
        <div className={"dencoh-stats-allow is-color-"+props.color}></div>
        <div className="dencoh-stats-on-allow dasher">
        <div className={"dencoh-stats-level"}><span className="ds-level">{props.level ? 'Lv. ' : ''}</span><span className="ds-value">{String(props.level)}</span></div><div className="dencoh-stats-skill">{props.skill ? 'skill activated' : ''}</div>
        </div>
        </div>
    )
}

export default Dencoh;
