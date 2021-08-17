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

    const hundler = ()=>{
        if(props.name == null){
            props.handler()
        }else{
            alert()
        }
    };

    const Stats = ()=>{
        return(
            <p>
            --ここにでんこの日本語名--
            </p>
        )
    }

    return(
        // TODO
        // 右側にステータスの要素を作って、それにonClickでprops.handlerを割り当てる
        // でんこの画像には設定を変えるための関数をonClickで割り当てる
        <div className="dencoh" onClick={hundler} >
        <Stats className="dencoh-stats"/>
        <BackImage />
        </div>
    )
}

export default Dencoh;
