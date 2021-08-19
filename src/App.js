import React, {useState, useEffect} from 'react';
import Battle from './Battle';
import Modal from './Modal';
import Formation from './Formation';
import './css/App.css';

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
    const [isSelectModalShown, setSelectModalShownState] = useState(false);

    //でんこ情報モーダルの表示 / 非表示
    const [isInfoModalShown, setInfoModalShownState] = useState(false);

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
        setFormations[formationId](TemplateFormation);
    };

    //編成に追加
    const addFormation = (dencohName)=>{
        const newArr = [...formations[activeFormation]];
        if (!newArr.includes(dencohName)){
            newArr[activeCar] = dencohName;
            console.log(dencohName);
            setFormations[activeFormation](newArr);
        }else{
            alert('そのでんこは編成内に既に存在します。');
        }
        setSelectModalShownState(false);
    };

    //車両をクリックした際の処理
    const clickForm = (formId, carNumber)=>{
        setActiveFormation(formId)
        setActiveCar(carNumber);
        if (formations[formId][carNumber] == null){
            //車両が空の場合 : でんこを選択
            setSelectModalShownState(true);
        }else{
            //TODO : 車両が空でない場合 : でんこを選択するか、でんこの設定を調整するか選択させる
            setInfoModalShownState(true);
            alert(formations[formId][carNumber]);
        }
    }

    return (
        <div className="App">
        <nav>ekidame - 駅メモ! ダメージ計算ツール</nav>
        <Battle battler={battler} />
        <div id="formations">
        <Formation dencohs={formA} formId={0} handler={clickForm} />
        <Formation dencohs={formB} formId={1} handler={clickForm} />
        </div>
        <button onClick={()=>{clearFormation(0)}}>clear 1</button>
        <button onClick={()=>{clearFormation(1)}}>clear 2</button>
        <Modal table={dencohTable} addFunc={addFormation} closeFunc={()=>{setSelectModalShownState(false)}}shown={isSelectModalShown}/>
        </div>
    );
}

export default App;
