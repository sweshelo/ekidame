import Dencoh from './Dencoh.js';

function Formation(props){
    const components = props.dencohs.map( dencoh => (
        <Dencoh name={dencoh} id={dencoh} key={dencoh}/>
    ));
    return components;
}

export default Formation;
