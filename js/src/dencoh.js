class Ekidame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            leftForm : [],
            rightForm : [],
            attacker : null,
            blocker : null
        }
    }
    componentDidMount = ()=>{
        fetch("data/dencoList.json")
        .then(res => res.json())
        .then((res)=>{
            console.log(res);
        });
    }
    render() {
        return(
            <React.Fragment>
            <div id="battle-wrapper">
            <Dencoh_battle id="battle-left" addClass="mirror" />
            <Dencoh_battle id="battle-right" />
            </div>
            <div id="formations-wrapper">
            <div id="form-left" className="cf">
            <Dencoh id="0"/>
            <Dencoh id="1"/>
            <Dencoh id="2"/>
            <Dencoh id="3"/>
            <Dencoh id="4"/>
            <Dencoh id="5"/>
            <Dencoh id="6"/>
            </div>
            <div id="form-right">
            <Dencoh id="7"/>
            <Dencoh id="8"/>
            <Dencoh id="9"/>
            <Dencoh id="10"/>
            <Dencoh id="11"/>
            <Dencoh id="12"/>
            <Dencoh id="13"/>
            </div>
            </div>
            </React.Fragment>
        )
    }
}

function Dencoh(props){
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
        <img src={"face/"+props.id+".png"} className="denco-image" />
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
