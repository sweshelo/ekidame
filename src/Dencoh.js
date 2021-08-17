import React, {useState} from 'react';
import './css/Dencoh.css';

function Dencoh(props){
    var image = null;
    if (props.name != null){
        image = <img src={"img/face/"+props.name+".png"} className="dencoh-form-face" alt={props.name}/>;
    }

    const hundler = ()=>{
        if(props.name == null){
            props.handler()
        }else{
            alert()
        }
    };

    return(
        // TODO
        // 右側にステータスの要素を作って、それにonClickでprops.handlerを割り当てる
        // でんこの画像には設定を変えるための関数をonClickで割り当てる
        <div className="dencoh" onClick={hundler} >
        {image}
        {String(props.name)}
        </div>
    )
}

export default Dencoh;
