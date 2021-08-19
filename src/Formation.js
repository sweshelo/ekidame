import Dencoh from './Dencoh.js';
import './css/formation.css'

function Formation(props){
    const components = props.dencohs.map( (dencoh, index) => (
        <Dencoh {...dencoh} key={dencoh.id+String(index)} handler={()=>{props.handler(props.formId, index)}} carNumber={index}/>
    ));
    return (
        <div className="formation">
        {components}
        </div>
    );
}

export default Formation;
