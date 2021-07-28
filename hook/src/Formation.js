import Dencoh from './Dencoh.js';
import './css/formation.css'

function Formation(props){
    const components = props.dencohs.map( (dencoh, index) => (
        <Dencoh name={dencoh} id={dencoh} key={dencoh+index} handler={()=>{props.handler(index)}}/>
    ));
    return (
        <div className="formation">
        {components}
        </div>
    );
}

export default Formation;
