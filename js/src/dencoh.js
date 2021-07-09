class Ekidame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            leftForm : [
                "luna", "akehi", "maze"
            ],
            rightForm : [
                "miroku", "moe", "himegi"
            ],
            dencohTable : [],
            attacker : null,
            blocker : null
        }
    }

    render(){
        var leftFormElm = [], rightFormElm = [];
        var cnt = 1;
        if (this.state.dencohTable.find(e=>e.name_en == "nozomi") === void 0){
            leftFormElm = <Dencoh id="0" />;
        }else{
            leftFormElm = this.state.leftForm.map((name)=>{
                return this.state.dencohTable.find(e=>e.name_en == name)
            }).map((denco, cnt)=>
                <Dencoh id={denco.no} name={denco.name} key={denco.name_en} position={cnt+1} />
            );

            rightFormElm = this.state.rightForm.map((name)=>{
                cnt++;
                return this.state.dencohTable.find(e=>e.name_en == name)
            }).map((denco, cnt)=>
                <Dencoh id={denco.no} name={denco.name} key={denco.name_en} position={cnt+1} />
            );
        }

        return(
            <React.Fragment>
            <div id="battle-wrapper">
            <Dencoh_battle id="battle-left" addClass="mirror" />
            <Dencoh_battle id="battle-right" />
            </div>
            <div id="formations-wrapper">
            <div id="form-left" className="cf">
            {leftFormElm}
            </div>
            <div id="form-right">
            {rightFormElm}
            </div>
            </div>
            </React.Fragment>
        );
    }

    componentDidMount = ()=>{
        fetch("data/dencoList.json")
        .then(res => res.json())
        .then((res)=>{
            res["contents"].forEach(obj => {
                this.setState({
                    dencohTable : this.state.dencohTable.concat(obj["partners"])
                });
            })
        })
    }


}

function Dencoh(props){
    return(
        <div className="denco-form">
        <div className="denco-form-info">
        <div className="text-wrapper">
        <div className="denco-text">
        <p className="smallest">{props.position}両目 - supporter</p>
        <p className="denco-name">{props.name} Lv. 80</p>
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
