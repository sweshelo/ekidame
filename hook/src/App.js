import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import Dencoh from './Dencoh';
import Battle from './Battle';
import './App.css';

function App() {
    const TemplateFormation = [
        ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
        ['Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty']
    ];
    const TemplateBattler = [ 0, 0 ];

    var [formation, setFormation] = useState(TemplateFormation);
    var [battler, setBattler] = useState(TemplateBattler);

    var dataLoadFlag = false;

    const [count, setCount] = useState(0);
    var dencohTable = [];

    //componentDidMount
    useEffect(()=> {
        fetch("data/denco.json")
            .then(res => res.json())
            .then((res)=>{
                dencohTable = res;
            });
    },[]);

    //編成変更
    const changeFormation = ()=> {
        setCount(count + 1);
        console.log('called : changeFormation')
    };

    return (
        <div className="App">
        <Battle battler={battler} />
        <button onClick={changeFormation}>{count}</button>
        </div>
    );
}

export default App;
