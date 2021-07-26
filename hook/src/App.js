import React, {useState, useEffect} from 'react';
import Battle from './Battle';
import Modal from './Modal';
import Formation from './Formation';
import './App.css';

function App() {

    //テンプレ
    const TemplateFormation = ['reto'];
    const TemplateBattler = [ 0, 0 ];

    //編成
    var [formA, setFormA] = useState(TemplateFormation);
    var [formB, setFormB] = useState(TemplateFormation);
    var formations = [formA, formB];
    var setFormations = [setFormA, setFormB];

    //アタッカー / ブロッカー
    var [battler, setBattler] = useState(TemplateBattler);

    //でんこ情報テーブル
    var [dencohTable, setDencohTable] = useState([]);

    var selectDencohWindow = false;

    //componentDidMount
    useEffect(()=> {
        fetch("data/data.json")
            .then(res => res.json())
            .then((res)=>{
                setDencohTable(res);
            });
    },[]);

    //編成をクリア
    const clearFormation = (formationId)=> {
        setFormations[formationId]([]);
    };

    //編成に追加
    const addFormation = (formationId, dencohName)=>{
        let newArr = [...formations[formationId]];
        newArr.push(dencohName);
        console.log(newArr);
        setFormations[formationId](newArr);
    };

    return (
        <div className="App">
        <p>ekidame - 駅メモ! ダメージ計算ツール</p>
        <Battle battler={battler} />
        <Formation dencohs={formA} formId={0} />
        <Formation dencohs={formB} formId={1} />
        <button onClick={()=>{addFormation(0, 'reto')}}>add reto</button>
        <button onClick={()=>{addFormation(1, 'chizu')}}>add chizu</button>
        <button onClick={()=>{clearFormation(0)}}>clear 1</button>
        <button onClick={()=>{clearFormation(1)}}>clear 2</button>
        <Modal table={dencohTable} addFunc={addFormation}/>
        </div>
    );
}

export default App;
