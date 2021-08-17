import React, {useState} from 'react';
import './css/Modal.css';

const Modal = (props)=>{

    const state = props;
    const [element, setElement] = useState('heat');

    const handler = (e)=>{
        setElement(e);
    }

    const TabControler = (props)=>{
        return(
            <>
            <input type="radio" id={props.id} className="element-radio" onChange={()=>{props.handler(props.id)}}/>
            <label className="element-tab" htmlFor={props.id}>{props.name}</label>
            </>
        )
    }

    const ElementSelector = ()=>{
        const elements = ["heat", "eco", "cool", "flat"];
        const components = elements.map((e) => (
            <TabControler id={e} name={e} handler={handler} key={e} />
        ));
        return(
            <div id="dsm-element">
            {components}
            </div>
        )
    }

    const DencohFace = (props)=>{
        return(
        <div className="dencoh-face" onClick={()=>{state.addFunc(props.name)}}>
            <img src={"img/face/"+props.name+".png"} className="dsm-face" alt={props.name}/>
        </div>
        );
    }

    const DencohSelector = (props)=>{
        const components = props.table.filter((e)=>{return (e.element === element)}).map((dencoh) => (
            <DencohFace name={dencoh.name_en} key={dencoh.name_en}/>
        ));

        return(
            <div id="dsm-body">
            {components}
            </div>
        )
    }

    if (props.shown === true){
        return(
            <div id="dencohSelectModal">
            <ElementSelector />
            <DencohSelector table={props.table}/>
            <button onClick={props.closeFunc}>戻る</button>
            </div>
        )
    }else{
        return null;
    }
}

export default Modal;
