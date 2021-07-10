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
            leftForm: ["luna", "akehi", "maze"],
            rightForm: ["miroku", "moe", "himegi"],
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
                    "name": "セリア",
                    "name_en": "seria",
                    "id": 1,
                    "no": "1",
                    "element": "eco",
                    "theme_color": "yellow",
                    "description": "黄陽セリア：設備メンテを行う救護型。面倒見がよく、癒し系なみんなのお姉さん的存在。でんこは修復できるのに超絶家電オンチ。少しいじくるだけで爆発物に変えてしまう......。"
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
                React.createElement(DencohSelector, null)
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
                React.createElement("img", { src: "face/" + props.denco.no + ".png", className: "denco-image" })
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
            React.createElement("img", { src: "face/77.png", className: "denco-image" })
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
    var heatDencoh = [4, 51, 64, 67];
    var heatDencohElem = heatDencoh.map(function (denco) {
        return React.createElement(DencohIcon, { id: denco });
    });

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
            { className: "dencoh-list", id: "elem-heat-dencoh" },
            heatDencohElem
        ),
        React.createElement("div", { className: "dencoh-list", id: "elem-eco-dencoh" }),
        React.createElement("div", { className: "dencoh-list", id: "elem-cool-dencoh" }),
        React.createElement("div", { className: "dencoh-list", id: "elem-flat-dencoh" })
    );

    function DencohIcon(props) {
        return React.createElement(
            "div",
            { className: "dencoh-list-icon" },
            React.createElement("img", { src: "face/" + props.id + ".png" })
        );
    }
}