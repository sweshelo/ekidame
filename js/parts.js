import React, {useState} from 'react';

// Atoms
function Text(props){
    return(
        <p className={props.class}>props.content</p>
    )
}

function Image(props){
    return(
        <img src={props.src} />
    )
}

// Molecules
function DencohInfoText(props){
    const position = (props.position == 1) : "先頭車両" ? props.position + "両目";
    return(
        <div className="dencoh-text">
            <Text content={position + " - " + props.type} size="smallest" />
            <Text content={props.name + " Lv. " + props.level} size="large" />
        </div>
    )
}

function DencohSkillText(props){
    return(
        <div className="dencoh-skill-text">
            <Text content={props.skillText} size="small" />
        </div>
    )
}

function DencohStatuses(props){
    return(
        <div className="dencoh-status-wrapper" />
            <Text content={props.hp['max'] + " / " + props.hp['current']} />
        </div>
    )
}

// Organisms
function DencohTexts(props){
    return(
        <div className="dencoh-text-wrapper">
            <DencohInfoText position={props.position} type={props.type} />
            <DencohSkillText skillText={props.skillText} />
        </div>
    )
}

function DencohImages(props){
    return(
        <div className="dencoh-image-wrapper">
            <Image src={"data/icon_denco_" + props.element + ".png"} className="element-icon" />
            <Image src={"face/" + props.name_en + ".png"} className="dencoh-image" />
        </div>
    )
}

// Templates
function Dencoh(props){
    return(
        <div className="dencoh">
            <DencohTexts position={props.position} type={props.type} level={props.level} name={props.name} />
            <DencohImages element={props.element} name_en={props.name_en} />
        </div>
    )
}

function DencohBattle(props){
    return(
        <div className="dencoh-battle">
            <DencohTexts position={props.position} type={props.type} level={props.level} name={props.name} />
            <DencohImages element={props.element} name_en={props.name_en} />
            <DencohStatuses hp={props.hp} ap={props.ap} atk={props.atk} def={props.def} />
        </div>
    )
}

function Battle(props){
    const Lform = props.battle.side['left'];
    const Rform = props.battle.side['right'];
    return(
        <div className="battle-wrapper">
        <DencohBattle position={Lform.position} type={Lform.type} level={Lform.level} name={Lform.name} element={Lform.element} name_en={Lform.name_en} id="battle-left"/>
        <BattleInfo damage={0} counter={false} />
        <DencohBattle position={Rform.position} type={Rform.type} level={Rform.level} name={Rform.name} element={Rform.element} name_en={Rform.name_en} id="battle-right"/>
        </div>
    )
}

// Page
function App(){
    return(
        <>
        <Battle battle={props.battle} />
        <Formations formation={props.formation} />
        </>
    )
}
