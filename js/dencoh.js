var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ekidame = function (_React$Component) {
    _inherits(Ekidame, _React$Component);

    function Ekidame(props) {
        _classCallCheck(this, Ekidame);

        var _this = _possibleConstructorReturn(this, (Ekidame.__proto__ || Object.getPrototypeOf(Ekidame)).call(this, props));

        _this.componentDidMount = function () {
            fetch("data/denco.json").then(function (res) {
                return res.json();
            }).then(function (res) {
                _this.setState({
                    dencohTable: res
                });
            });
        };

        _this.state = {
            leftForm: ["reto", "reto", "reto", "reto", "reto", "reto", "reto"],
            rightForm: ["naru", "naru", "naru", "naru", "naru", "naru", "naru"],
            dencohTable: [],
            attacker: null,
            blocker: null
        };
        return _this;
    }

    _createClass(Ekidame, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var leftFormElm = [],
                rightFormElm = [];
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

                leftFormElm = React.createElement(Dencoh, { denco: dummyObj });
            } else {
                leftFormElm = this.state.leftForm.map(function (name) {
                    return _this2.state.dencohTable.find(function (e) {
                        return e.name_en == name;
                    });
                }).map(function (denco, cnt) {
                    return React.createElement(Dencoh, { denco: denco, position: cnt + 1 });
                });

                rightFormElm = this.state.rightForm.map(function (name) {
                    return _this2.state.dencohTable.find(function (e) {
                        return e.name_en == name;
                    });
                }).map(function (denco, cnt) {
                    return React.createElement(Dencoh, { denco: denco, position: cnt + 1 });
                });
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
                        leftFormElm
                    ),
                    React.createElement(
                        "div",
                        { id: "form-right" },
                        rightFormElm
                    )
                ),
                React.createElement(DencohSelector, { dataTable: this.state.dencohTable })
            );
        }
    }]);

    return Ekidame;
}(React.Component);

function Dencoh(props) {
    return React.createElement(
        "div",
        { className: "denco-form" },
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
                React.createElement("img", { src: "data/icon_denco_" + props.denco.element + ".png", className: "element-icon" }),
                React.createElement("img", { src: "face/" + props.denco.name_en + ".png", className: "denco-image" })
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
            React.createElement("img", { src: "data/icon_denco_eco.png", className: "element-icon" }),
            React.createElement("img", { src: "face/reto.png", className: "denco-image" })
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
        DencohElem[denco.element].push(React.createElement(DencohIcon, { name: denco.name_en }));
    });

    var hide = function hide() {
        $('#dencohSelectModal').addClass('hide');
        console.log('clicked');
    };

    return React.createElement(
        "div",
        { id: "dencohSelectModal" },
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
            { className: "dencoh-list-icon" },
            React.createElement("img", { src: "face/" + props.name + ".png" })
        );
    }
}