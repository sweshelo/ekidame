class Ekidame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            forms : [
                [
                    "reto", "reto", "reto", "reto", "reto", "reto", "reto"
                ],
                [
                    "naru", "naru", "naru", "naru", "naru", "naru", "naru"
                ]
            ],
            dencohTable : [],
            attacker : null,
            blocker : null,
            keyFlg : false,
            selectingDencoh : null,
        }
    }

    render(){
        var formsElements = [];
        var cnt = 1;
        if (this.state.dencohTable.length === 0){
            const dummyObj = {
                "name": "",
                "name_en": "",
                "id": null,
                "no": "",
                "element": "",
                "theme_color": "",
                "description": ""
            };

            return null;
        }else{

            let formationID = 0;
            this.state.forms.forEach((e)=>{
                formationID++;
                formsElements.push(
                e.map((formDencoName, formID)=>{
                    return this.state.dencohTable.find(tableDencoObj=>tableDencoObj.name_en == formDencoName);
                }).map((dencoObj, PositionID)=>{
                    key = formation + "/" + PositionID;
                    return <Dencoh denco={dencoObj} position={PositionID+1} formation={formationID} func={this.selectDencohWindowOpen} key={key}/>
                }));
            });
            console.log(formsElements);

        }

        return(
            <React.Fragment>
            <div id="battle-wrapper">
            <Dencoh_battle id="battle-left" addClass="mirror" />
            <div id="battle-config-wrapper">
            <button id="battle-config-open">設定</button>
            <div className="battle-result-wrapper">
            <div className="battle-result-damage"><p>9999 damage</p></div>
            <div className={"battle-result-allow"} id="right">
            <p>attack</p>
            </div>
            </div>
            <div className="battle-result-wrapper">
            <div className="battle-result-damage"><p>9999 damage</p></div>
            <div className={"battle-result-allow"} id="left">
            <p>counter</p>
            </div>
            </div>
            </div>
            <Dencoh_battle id="battle-right" />
            </div>
            <div id="formations-wrapper">
            <div id="form-left" className="cf">
            {formsElements[0]}
            </div>
            <div id="form-right">
            {formsElements[1]}
            </div>
            </div>
            <DencohSelector dataTable={this.state.dencohTable} selectDencohFunc={this.choose} />
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

    choose = (form)=>{
        console.log(form, this.state.selectingDencoh);
        //this.state.selectingDencoh;
        const replace = this.state.dencohTable.find(tableDencoObj=>tableDencoObj.name_en == form);
        this.state.selectingDencoh.denco = replace;
        console.log(replace, this.state.selectingDencoh, "<= SWAP");
        const formsClone = this.state.forms.slice();
        formsClone[this.state.selectingDencoh.formation-1][this.state.selectingDencoh.position-1] = replace.name_en;
        this.setState({
            forms : formsClone
        })
        hide();
    }

    selectDencohWindowOpen = (props)=>{
        console.log('windowOpen', props);
        this.setState({
            selectingDencoh : props
        });
        console.log(this.state.selectingDencoh);
        $('#dencohSelectModal').removeClass('hide');
    }

}


const hide = ()=>{
    $('#dencohSelectModal').addClass('hide');
    console.log('clicked');
};

function Dencoh(props){
    return(
        <div className="denco-form" onClick={()=>props.func(props)}>
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
        DencohElem[denco.element].push(<DencohIcon name={denco.name_en} func={()=>props.selectDencohFunc(denco.name_en)} key={Math.floor(Math.random()*0xFFFFFF)}/>);
    })

    return (
        <div id="dencohSelectModal" className="hide">
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
            <div className="dencoh-list-icon" onClick={props.func}>
            <img src={"face/"+props.name+".png"} />
            </div>
        )
    }
}
