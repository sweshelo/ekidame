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
        if (this.state.dencohTable.length === 0){
            const dummyObj = {
                "name": "セリア",
                "name_en": "seria",
                "id": 1,
                "no": "1",
                "element": "eco",
                "theme_color": "yellow",
                "description": "黄陽セリア：設備メンテを行う救護型。面倒見がよく、癒し系なみんなのお姉さん的存在。でんこは修復できるのに超絶家電オンチ。少しいじくるだけで爆発物に変えてしまう......。"
            };

            leftFormElm = <Dencoh denco={dummyObj} />;
        }else{
            leftFormElm = this.state.leftForm.map((name)=>{
                return this.state.dencohTable.find(e=>e.name_en == name)
            }).map((denco, cnt)=>
                <Dencoh denco={denco} position={cnt+1} />
            );

            rightFormElm = this.state.rightForm.map((name)=>{
                return this.state.dencohTable.find(e=>e.name_en == name)
            }).map((denco, cnt)=>
                <Dencoh denco={denco} position={cnt+1} />
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
            <DencohSelector dataTable={this.state.dencohTable}/>
            </React.Fragment>
        );
    }

    componentDidMount = ()=>{
        fetch("data/denco.json")
            .then(res => res.json())
            .then((res)=>{
                this.setState({
                    dencohTable : res
                });
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
        <p className="denco-name">{props.denco.name} Lv. 80</p>
        </div>
        <div className="skill-text">
        <p className="small">Unable</p>
        </div>
        </div>
        <div className="image-wrapper">
        <img src={"data/icon_denco_"+props.denco.element+".png"} className="element-icon" />
        <img src={"face/"+props.denco.name_en+".png"} className="denco-image" />
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
        <img src="face/reto.png" className="denco-image" />
        </div>
        <div className="status-wrapper">
        <p>HP 999 / 999</p>
        <p className="smallest">AP 999(+0.0% / -0.0%)</p>
        <p className="smallest">DEF +0.0% / -0.0% </p>
        </div>
        </div>

    )
}

function DencohSelector(props){
    let DencohElem = {
        "heat":[],
        "eco" :[],
        "cool":[],
        "flat":[]
    };
    props.dataTable.forEach((denco)=>{
        DencohElem[denco.element].push(<DencohIcon name={denco.name_en} />);
    })

    let hide = ()=>{
        $('#dencohSelectModal').addClass('hide');
        console.log('clicked');
    };

    return (
        <div id="dencohSelectModal">
        <input type="radio" id="elem-heat" name="elem" defaultChecked />
        <label className="elem-tab" htmlFor="elem-heat">heat</label>
        <input type="radio" id="elem-eco" name="elem" />
        <label className="elem-tab" htmlFor="elem-eco">eco</label>
        <input type="radio" id="elem-cool" name="elem" />
        <label className="elem-tab" htmlFor="elem-cool">cool</label>
        <input type="radio" id="elem-flat" name="elem" />
        <label className="elem-tab" htmlFor="elem-flat">flat</label>
        <div className={"dencoh-list heat-color"} id="elem-heat-dencoh">{DencohElem["heat"]}</div>
        <div className={"dencoh-list eco-color"} id="elem-eco-dencoh">{DencohElem["eco"]}</div>
        <div className={"dencoh-list cool-color"} id="elem-cool-dencoh">{DencohElem["cool"]}</div>
        <div className={"dencoh-list flat-color"} id="elem-flat-dencoh">{DencohElem["flat"]}</div>
        <button onClick={hide}>戻る</button>
        </div>
    )

    function DencohIcon(props){
        return(
            <div className="dencoh-list-icon">
            <img src={"face/"+props.name+".png"} />
            </div>
        )
    }
}
