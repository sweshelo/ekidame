var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ekidame = function (_React$Component) {
    _inherits(Ekidame, _React$Component);

    function Ekidame(props) {
        _classCallCheck(this, Ekidame);

        var _this = _possibleConstructorReturn(this, (Ekidame.__proto__ || Object.getPrototypeOf(Ekidame)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {
            forms: [["reto", "reto", "reto", "reto", "reto", "reto", "reto"], ["naru", "naru", "naru", "naru", "naru", "naru", "naru"]],
            dencohTable: [],
            attacker: null,
            blocker: null,
            keyFlg: false,
            selectingDencoh: null
        };
        return _this;
    }

    _createClass(Ekidame, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var formsElements = [];
            var cnt = 1;
            if (this.state.dencohTable.length === 0) {
                var dummyObj = {
                    "name": "",
                    "name_en": "",
                    "id": null,
                    "no": "",
                    "element": "",
                    "theme_color": "",
                    "description": ""
                };

                return null;
            } else {

                var formationID = 0;
                this.state.forms.forEach(function (e) {
                    formationID++;
                    formsElements.push(e.map(function (formDencoName, formID) {
                        return _this2.state.dencohTable.find(function (tableDencoObj) {
                            return tableDencoObj.name_en == formDencoName;
                        });
                    }).map(function (dencoObj, PositionID) {
                        key = formationID + "/" + PositionID;
                        return React.createElement(Dencoh, { denco: dencoObj, position: PositionID + 1, formation: formationID, func: _this2.selectDencohWindowOpen, key: key });
                    }));
                });
                console.log(formsElements);
            }

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "div",
                    { id: "battle-wrapper" },
                    React.createElement(Dencoh_battle, { id: "battle-left", addClass: "mirror" }),
                    React.createElement(
                        "div",
                        { id: "battle-config-wrapper" },
                        React.createElement(
                            "button",
                            { id: "battle-config-open" },
                            "\u8A2D\u5B9A"
                        ),
                        React.createElement(
                            "div",
                            { className: "battle-result-wrapper" },
                            React.createElement(
                                "div",
                                { className: "battle-result-damage" },
                                React.createElement(
                                    "p",
                                    null,
                                    "9999 damage"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "battle-result-allow", id: "right" },
                                React.createElement(
                                    "p",
                                    null,
                                    "attack"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "battle-result-wrapper" },
                            React.createElement(
                                "div",
                                { className: "battle-result-damage" },
                                React.createElement(
                                    "p",
                                    null,
                                    "9999 damage"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "battle-result-allow", id: "left" },
                                React.createElement(
                                    "p",
                                    null,
                                    "counter"
                                )
                            )
                        )
                    ),
                    React.createElement(Dencoh_battle, { id: "battle-right" })
                ),
                React.createElement(
                    "div",
                    { id: "formations-wrapper" },
                    React.createElement(
                        "div",
                        { id: "form-left", className: "cf" },
                        formsElements[0]
                    ),
                    React.createElement(
                        "div",
                        { id: "form-right" },
                        formsElements[1]
                    )
                ),
                React.createElement(DencohSelector, { dataTable: this.state.dencohTable, selectDencohFunc: this.choose })
            );
        }
    }]);

    return Ekidame;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.componentDidMount = function () {
        fetch("data/denco.json").then(function (res) {
            return res.json();
        }).then(function (res) {
            _this3.setState({
                dencohTable: res
            });
        });
    };

    this.choose = function (form) {
        console.log(form, _this3.state.selectingDencoh);
        //this.state.selectingDencoh;
        var replace = _this3.state.dencohTable.find(function (tableDencoObj) {
            return tableDencoObj.name_en == form;
        });
        _this3.state.selectingDencoh.denco = replace;
        console.log(replace, _this3.state.selectingDencoh, "<= SWAP");
        var formsClone = _this3.state.forms.slice();
        formsClone[_this3.state.selectingDencoh.formation - 1][_this3.state.selectingDencoh.position - 1] = replace.name_en;
        _this3.setState({
            forms: formsClone
        });
        hide();
    };

    this.selectDencohWindowOpen = function (props) {
        console.log('windowOpen', props);
        _this3.setState({
            selectingDencoh: props
        });
        console.log(_this3.state.selectingDencoh);
        $('#dencohSelectModal').removeClass('hide');
    };
};

var hide = function hide() {
    $('#dencohSelectModal').addClass('hide');
    console.log('clicked');
};

function Dencoh(props) {
    return React.createElement(
        "div",
        { className: "denco-form", onClick: function onClick() {
                return props.func(props);
            } },
        React.createElement(
            "div",
            { className: "denco-form-info" },
            React.createElement(
                "div",
                { className: "text-wrapper" },
                React.createElement(
                    "div",
                    { className: "denco-text" },
                    React.createElement(
                        "p",
                        { className: "smallest" },
                        props.position,
                        "\u4E21\u76EE - supporter"
                    ),
                    React.createElement(
                        "p",
                        { className: "denco-name" },
                        props.denco.name,
                        " Lv. 80"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "skill-text" },
                    React.createElement(
                        "p",
                        { className: "small" },
                        "Unable"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "image-wrapper" },
                React.createElement("img", { src: "img/icon_denco_" + props.denco.element + ".png", className: "element-icon" }),
                React.createElement("img", { src: "img/face/" + props.denco.name_en + ".png", className: "denco-image" })
            )
        )
    );
}

function Dencoh_battle(props) {

    return React.createElement(
        "div",
        { className: "denco", id: props.id },
        React.createElement(
            "div",
            { className: "text-wrapper" },
            React.createElement(
                "p",
                { className: "smallest" },
                "\u5148\u982D\u8ECA\u4E21 - supporter"
            ),
            React.createElement(
                "p",
                null,
                "\u30EA\u30C8 Lv.80"
            )
        ),
        React.createElement(
            "div",
            { className: "image-wrapper " + props.addClass },
            React.createElement("img", { src: "img/icon_denco_eco.png", className: "element-icon" }),
            React.createElement("img", { src: "img/face/reto.png", className: "denco-image" })
        ),
        React.createElement(
            "div",
            { className: "status-wrapper" },
            React.createElement(
                "p",
                null,
                "HP 999 / 999"
            ),
            React.createElement(
                "p",
                { className: "smallest" },
                "AP 999(+0.0% / -0.0%)"
            ),
            React.createElement(
                "p",
                { className: "smallest" },
                "DEF +0.0% / -0.0% "
            )
        )
    );
}

function DencohSelector(props) {
    var DencohElem = {
        "heat": [],
        "eco": [],
        "cool": [],
        "flat": []
    };

    props.dataTable.forEach(function (denco) {
        DencohElem[denco.element].push(React.createElement(DencohIcon, { name: denco.name_en, func: function func() {
                return props.selectDencohFunc(denco.name_en);
            }, key: denco.name_en }));
    });

    return React.createElement(
        "div",
        { id: "dencohSelectModal", className: "hide" },
        React.createElement("input", { type: "radio", id: "elem-heat", name: "elem", defaultChecked: true }),
        React.createElement(
            "label",
            { className: "elem-tab", htmlFor: "elem-heat" },
            "heat"
        ),
        React.createElement("input", { type: "radio", id: "elem-eco", name: "elem" }),
        React.createElement(
            "label",
            { className: "elem-tab", htmlFor: "elem-eco" },
            "eco"
        ),
        React.createElement("input", { type: "radio", id: "elem-cool", name: "elem" }),
        React.createElement(
            "label",
            { className: "elem-tab", htmlFor: "elem-cool" },
            "cool"
        ),
        React.createElement("input", { type: "radio", id: "elem-flat", name: "elem" }),
        React.createElement(
            "label",
            { className: "elem-tab", htmlFor: "elem-flat" },
            "flat"
        ),
        React.createElement(
            "div",
            { className: "dencoh-list heat-color", id: "elem-heat-dencoh" },
            DencohElem["heat"]
        ),
        React.createElement(
            "div",
            { className: "dencoh-list eco-color", id: "elem-eco-dencoh" },
            DencohElem["eco"]
        ),
        React.createElement(
            "div",
            { className: "dencoh-list cool-color", id: "elem-cool-dencoh" },
            DencohElem["cool"]
        ),
        React.createElement(
            "div",
            { className: "dencoh-list flat-color", id: "elem-flat-dencoh" },
            DencohElem["flat"]
        ),
        React.createElement(
            "button",
            { onClick: hide },
            "\u623B\u308B"
        )
    );

    function DencohIcon(props) {
        return React.createElement(
            "div",
            { className: "dencoh-list-icon", onClick: props.func },
            React.createElement("img", { src: "img/face/" + props.name + ".png" })
        );
    }
}