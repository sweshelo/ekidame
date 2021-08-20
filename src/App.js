import React, {useState, useEffect} from 'react';
import Battle from './Battle';
import {InfoModal, SelectModal} from './Modal.js';
import Formation from './Formation';
import './css/App.css';

function App() {

    //テンプレ
    class Dencoh {
        constructor(){
            this.id = null;
            this.name = null;
            this.element = '';
            this.ap = 0;
            this.level = null;
            this.atk = 0;
            this.def = 0;
            this.skill = false;
            this.skillMethod = null;
        }
    };

    const TemplateBattler = [ 0, 0 ];

    //編成
    const [formA, setFormA] = useState([ new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh() ]);
    const [formB, setFormB] = useState([ new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh() ]);
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

    //でんこデータ検索
    const searchDencoh = (name)=>{
        const max = dencohTable.length;
        for(let i=0;i<max;i++){
            if (dencohTable[i].name == name || dencohTable[i].name_en == name) return dencohTable[i];
        }
    };

    //編成をクリア
    const clearFormation = (formationId)=> {
        setFormations[formationId]([ new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh(), new Dencoh() ]);
    };

    //編成に追加
    const addFormation = (dencohName)=>{
        let includes = false;
        const newArr = [...formations[activeFormation]];
        newArr.forEach((d)=>{
            if (d.id == dencohName) includes = true;
        });
        if (!includes){
            const info = searchDencoh(dencohName);
            console.log(info);
            newArr[activeCar].id = info.name_en;
            newArr[activeCar].name = info.name;
            newArr[activeCar].element = info.element;
            newArr[activeCar].skill = true;
            newArr[activeCar].level = 80;
            newArr[activeCar].color = (info.theme_color != null ? info.theme_color : 'gray');
            setFormations[activeFormation](newArr);
        }else{
            alert('そのでんこは編成内に既に存在します。');
        };
        console.log(newArr)
        setSelectModalShownState(false);
    };

    //車両をクリックした際の処理
    const clickForm = (formId, carNumber)=>{
        setActiveFormation(formId)
        setActiveCar(carNumber);
        if (formations[formId][carNumber].name == null){
            //車両が空の場合 : でんこを選択
            setSelectModalShownState(true);
        }else{
            //TODO : 車両が空でない場合 : でんこを選択するか、でんこの設定を調整するか選択させる
            setInfoModalShownState(true);
            alert(formations[formId][carNumber].name);
        }
    };

    //でんこ情報モーダルでの変更値を受け取る関数
    const recieveInfo = ()=>{
        return 0;
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
        <SelectModal table={dencohTable} addFunc={addFormation} closeFunc={()=>{setSelectModalShownState(false)}}shown={isSelectModalShown}/>
        <InfoModal table={dencohTable} handler={recieveInfo} closeFunc={()=>{setInfoModalShownState(false)}} shown={isInfoModalShown}/>
        </div>
    );
}

export default App;
