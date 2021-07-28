import React, {useState, useEffect} from 'react';
import Battle from './Battle';
import Modal from './Modal';
import Formation from './Formation';
import './App.css';

function App() {

    //テンプレ
    const TemplateFormation = [null, null, null, null, null, null, null];
    const TemplateBattler = [ 0, 0 ];

    //編成
    const [formA, setFormA] = useState(TemplateFormation);
    const [formB, setFormB] = useState(TemplateFormation);
    const formations = [formA, formB];
    const setFormations = [setFormA, setFormB];

    //アタッカー / ブロッカー
    const [battler, setBattler] = useState(TemplateBattler);

    //でんこ情報テーブル
    const [dencohTable, setDencohTable] = useState([]);

    //操作対象の編成
    const [activeFormation, setActiveFormation] = useState(0);

    //捜査対象の車両
    const [activeCar, setActiveCar] = useState(0);

    //でんこ選択モーダルの表示 / 非表示
    const [shownState, setShownState] = useState(false);

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
        <Formation dencohs={formA} formId={0} handler={setActiveCar} />
        <Formation dencohs={formB} formId={1} handler={setActiveCar} />
        <button onClick={()=>{clearFormation(0)}}>clear 1</button>
        <button onClick={()=>{clearFormation(1)}}>clear 2</button>
        <Modal table={dencohTable} addFunc={addFormation} targetFormation={activeFormation} target={activeCar} shown={shownState}/>
        </div>
    );
}

export default App;
