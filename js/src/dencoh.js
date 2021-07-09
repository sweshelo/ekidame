class Ekidame extends React.Component {
    render() {
        return(
            <React.Fragment>
            <div id="battle-wrapper">
            <Dencoh_battle id="battle-left" addClass="mirror" />
            <Dencoh_battle id="battle-right" />
            </div>
            <div id="formations-wrapper">
            <div id="form-left" className="cf">
            <Dencoh />
            <Dencoh />
            <Dencoh />
            <Dencoh />
            <Dencoh />
            <Dencoh />
            <Dencoh />
            </div>
            <div id="form-right">
            <Dencoh />
            <Dencoh />
            <Dencoh />
            <Dencoh />
            <Dencoh />
            <Dencoh />
            <Dencoh />
            </div>
            </div>
            </React.Fragment>
        )
    }
}

function Dencoh(){
    return(
        <div className="denco-form">
        <div className="denco-form-info">
        <div className="text-wrapper">
        <div className="denco-text">
        <p className="smallest">2両目 - supporter</p>
        <p className="denco-name">リト Lv. 80</p>
        </div>
        <div className="skill-text">
        <p className="small">Unable</p>
        </div>
        </div>
        <div className="image-wrapper">
        <img src="data/icon_denco_eco.png" className="element-icon" />
        <img src="face/77.png" className="denco-image" />
        </div>
        </div>
        </div>
    )
}

function Dencoh_battle(props){
    return(
        <div className="denco" id={props.id}>
        <div className="text-wrapper">
        <p className="smallest">先頭車両 - supporter</p>
        <p>リト Lv.80</p>
        </div>
        <div className={"image-wrapper " + props.addClass}>
        <img src="data/icon_denco_eco.png" className="element-icon" />
        <img src="face/77.png" className="denco-image" />
        </div>
        <div className="status-wrapper">
        <p>HP 999 / 999</p>
        <p className="smallest">AP 999(+0.0% / -0.0%)</p>
        <p className="smallest">DEF +0.0% / -0.0% </p>
        </div>
        </div>

    )
}
