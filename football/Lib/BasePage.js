"use strict";

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

//build string.format function
//http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
if (!String.format) {
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

String.IsNullOrEmpty = function(item) {
    if (item !== undefined && item !== null && item !== "") {
        return false;
    }
    return true;
};

String.prototype.TrimStart = function(trimStr) {
    if (!trimStr) {
        return this;
    }
    var temp = this;
    while (true) {
        if (temp.substr(0, trimStr.length) != trimStr) {
            break;
        }
        temp = temp.substr(trimStr.length);
    }
    return temp;
};
String.prototype.TrimEnd = function(trimStr) {
    if (!trimStr) {
        return this;
    }
    var temp = this;
    while (true) {
        if (temp.substr(temp.length - trimStr.length, trimStr.length) != trimStr) {
            break;
        }
        temp = temp.substr(0, temp.length - trimStr.length);
    }
    return temp;
};
String.prototype.Trim = function(trimStr) {
    var temp = trimStr;
    if (!trimStr) {
        temp = " ";
    }
    return this.TrimStart(temp).TrimEnd(temp);
};
//http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value
function removeA(arr) {
    var what,
        a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

var Img = function(_React$Component) {
    _inherits(Img, _React$Component);

    function Img(props) {
        _classCallCheck(this, Img);

        var _this = _possibleConstructorReturn(this, (Img.__proto__ || Object.getPrototypeOf(Img)).call(this, props));

        _this.state = {
            errored: false
        };
        _this.handleError = _this.handleError.bind(_this);
        return _this;
    }

    _createClass(Img, [{
        key: "handleError",
        value: function handleError(event) {
            this.setState({
                errored: true
            });
            //this.state.errored = true;
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.src !== nextProps.src) {
                this.setState({
                    errored: false
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.errored) {
                return null;
            } else {
                return React.createElement("img", {
                    onError: this.handleError,
                    src: this.props.src,
                    alt: this.props.alt,
                    title: this.props.title,
                    onClick: this.props.onClick,
                    className: this.props.className
                });
            }
        }
    }]);

    return Img;
}(React.Component);

var OddsCheckbox = function(_React$Component2) {
    _inherits(OddsCheckbox, _React$Component2);

    function OddsCheckbox(props) {
        _classCallCheck(this, OddsCheckbox);

        var _this2 = _possibleConstructorReturn(this, (OddsCheckbox.__proto__ || Object.getPrototypeOf(OddsCheckbox)).call(this, props));

        _this2.objID = _this2.props.objID;
        _this2.poolType = _this2.props.poolType;
        _this2.poolStatus = _this2.props.poolStatus;
        _this2.selectionType = _this2.props.selectionType;
        _this2.state = {
            checked: false
        };
        _this2.onItemClick = _this2.onItemClick.bind(_this2);
        return _this2;
    }

    _createClass(OddsCheckbox, [{
        key: "onItemClick",
        value: function onItemClick(event) {
            var _currentTarget = event.currentTarget;
            this.setState({
                checked: _currentTarget.checked
            });

            tgTD(_currentTarget, this.poolType);
            if (pageName == "MIXALLUP" || pageName == "MIXALLUPSHORTCUT") {
                if (!uncheckingSameMatchOtherPoolsSelection) {
                    mixFormula(_currentTarget, this.objID, this.poolType, this.selectionType);
                    calculateBet2(true);
                } else {
                    _currentTarget.value = "trigger";
                }
            }
            //this.props.toggleCheckbox();
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps) {
            if (nextProps.disabled && this.state.checked) {
                this.setState({
                    checked: false
                });
                this.props.removeCheckedOdds();
                if (pageName == "MIXALLUP" && (nextProps.poolStatus.toLowerCase() == invalidBetTypes.Refund || nextProps.poolStatus.toLowerCase() == invalidBetTypes.Suspended) && invalidBetTypeArr.indexOf(this._matchID) == -1) {
                    invalidBetTypeArr.push(this._matchID);
                }
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevState, prevProps) {
            // we access props with this.props
            // and state with this.state

            // prevState contains state before update
            // prevProps contains props before update
            if (pageName == "MIXALLUP" && prevState.disabled != null && this.props.disabled != prevState.disabled && !prevState.disabled) {
                updateMixAllUpFormual();
                calculateBet2(true);
            }
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement("input", {
                checked: this.state.checked,
                type: "checkbox",
                disabled: this.props.disabled,
                name: this.props.name,
                id: this.props.id,
                value: "",
                onClick: this.onItemClick,
                className: "" + this.props.className
            });
        }
    }]);

    return OddsCheckbox;
}(React.Component);

var OddsCheckboxPariMutuel = function(_React$Component3) {
    _inherits(OddsCheckboxPariMutuel, _React$Component3);

    function OddsCheckboxPariMutuel(props) {
        _classCallCheck(this, OddsCheckboxPariMutuel);

        var _this3 = _possibleConstructorReturn(this, (OddsCheckboxPariMutuel.__proto__ || Object.getPrototypeOf(OddsCheckboxPariMutuel)).call(this, props));

        _this3.matchID = _this3.props.matchID;
        _this3.rInd = _this3.props.rInd;
        _this3._poolType = _this3.props._poolType;

        var selectionVal = _this3.props.selectionVal;
        var checkboxValue = void 0;
        if (pageName == "DHCP") {
            if (_this3.props.selectionVal == "F") {
                checkboxValue = "F";
            } else if (selectionVal == "SM1MH" || selectionVal == "SM1MA" || selectionVal == "SM1MD") {
                selectionVal = selectionVal.substr(4, 1) + "O";
                checkboxValue = selectionVal;
            } else {
                selectionVal = selectionVal.substr(2, 1) + selectionVal.substr(4, 1);
                checkboxValue = selectionVal[0] + ":" + selectionVal[1];
            }
        } else {
            checkboxValue = selectionVal;
        }
        _this3.selectionVal = selectionVal;
        _this3.checkboxValue = checkboxValue;

        _this3.state = {
            checked: false
        };
        _this3.onItemClick = _this3.onItemClick.bind(_this3);
        return _this3;
    }

    _createClass(OddsCheckboxPariMutuel, [{
        key: "onItemClick",
        value: function onItemClick(event) {
            var _currentTarget = event.currentTarget;
            this.setState({
                checked: _currentTarget.checked
            });

            toggleCheckBox(this.matchID + "_" + this.selectionVal, this._poolType);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("input", {
                checked: this.state.checked,
                className: "checkbox",
                key: this.matchID + "_" + this.selectionVal + "_" + this.rInd,
                name: "chk_" + this.rInd,
                disabled: this.props.isDisabled,
                id: this.matchID + "_" + this.selectionVal,
                type: "checkbox",
                value: "" + this.checkboxValue,
                onClick: this.onItemClick
            });
        }
    }]);

    return OddsCheckboxPariMutuel;
}(React.Component);

var OddsCell = function(_React$Component4) {
    _inherits(OddsCell, _React$Component4);

    function OddsCell(props) {
        _classCallCheck(this, OddsCell);

        var _this4 = _possibleConstructorReturn(this, (OddsCell.__proto__ || Object.getPrototypeOf(OddsCell)).call(this, props));

        _this4._oddsType = _this4.props._oddsType;
        _this4._matchID = _this4.props._matchID;
        _this4.checkboxType = _this4.props.checkboxType;
        _this4.lineNum = _this4.props.lineNum;
        _this4._tableType = _this4.props._tableType;
        _this4.isFocusMatch = _this4.props.isFocusMatch;
        _this4.state = {
            isExpanded: isDisplayMultiplePoolPage(pageName) || pageName == "SPC",
            checkedOdds: ""
        };
        _this4.tgTD = _this4.tgTD.bind(_this4);
        _this4.removeCheckedOdds = _this4.removeCheckedOdds.bind(_this4);
        _this4.key = _this4.props.rkey;
        _this4._id = "";
        return _this4;
    }

    _createClass(OddsCell, [{
        key: "componentWillUpdate",
        value: function componentWillUpdate() {}
    }, {
        key: "removeCheckedOdds",
        value: function removeCheckedOdds() {
            this.setState({
                checkedOdds: ""
            });

            setTimeout(this.tgTD, 500);
        }
    }, {
        key: "tgTD",
        value: function(_tgTD) {
            function tgTD() {
                return _tgTD.apply(this, arguments);
            }

            tgTD.toString = function() {
                return _tgTD.toString();
            };

            return tgTD;
        }(function() {

            var _obj = $("#" + this._id);
            tgTD(_obj, this._oddsType);

            if (this.state.checkedOdds == "") {
                this.setState({
                    checkedOdds: "checkedOdds"
                });
            } else {
                this.setState({
                    checkedOdds: ""
                });
            }
        })
    }, {
        key: "render",
        value: function render() {
            var oddsCell = [];
            var tmpOddsSet = this.props.oddsSet;
            var poolStatus = this.props.poolStatus;
            var poolId = this.props.poolId;
            var isAllup = this.props.isAllup.toLowerCase() == "true" && !isPoolRefund(poolStatus) && !this.isFocusMatch;
            var extraClass = this.props.extraClass || "";
            var displayValue = this.props.displayValue || "";
            var lineId = tmpOddsSet.LINEID;
            var combId = tmpOddsSet[this.checkboxType + "COMBID"];
            if (!tmpOddsSet[this.checkboxType + "COMBID"]) {
                combId = tmpOddsSet["COMBID"];
                if (pageName == "SPC") combId = tmpOddsSet[tmpOddsSet.SEL + "COMBID"];
            }

            if (tmpOddsSet[this.checkboxType] == null) {
                // to cater null selection case for very old last odds match
            } else if (this._tableType.toLowerCase().indexOf("presales") >= 0) {
                oddsCell = React.createElement(
                    "div",
                    null,
                    formatRefOdds(this._oddsType, this._matchID, tmpOddsSet, this.checkboxType, 0)
                );
            } else {
                if (pageName == "INDEX") {
                    oddsCell = React.createElement(
                        "span", {
                            className: "s1"
                        },
                        formatOddsLink(this._oddsType, this._matchID, tmpOddsSet, this.checkboxType, this.lineNum, poolStatus, isAllup, poolId)
                    );
                } else {
                    var isDisabled = void 0,
                        selectionType = void 0,
                        _id = void 0;
                    if (!isTournPool(this._oddsType) && !isInplay && betValue[this._matchID].IsMatchKickOff()) {
                        isDisabled = true;
                    } else if (tmpOddsSet != null) {
                        if (tmpOddsSet.length != undefined) {
                            isDisabled = !isSelling(poolStatus, tmpOddsSet[this.lineNum][this.checkboxType], "1");
                        } else {
                            if (isML(this._oddsType)) {
                                isDisabled = !isSelling(poolStatus, tmpOddsSet[this.checkboxType], tmpOddsSet.LINESTATUS);
                            } else {
                                isDisabled = !isSelling(poolStatus, tmpOddsSet[this.checkboxType], "1");
                            }
                        }
                    } else {
                        isDisabled = !isSelling(poolStatus, "100", "1");
                    }
                    if (isDisabled && this.state.checkedOdds != "") {
                        this.setState({
                            checkedOdds: ""
                        });
                    }

                    if (this._oddsType == "FGS") {
                        selectionType = tmpOddsSet.SEL;
                    } else if (isTournPool(this._oddsType)) {
                        if (this._oddsType == "GPW" || this._oddsType == "TPS" || this._oddsType == "GPF" || this._oddsType == "SPC" || this._oddsType == "TSP") {
                            selectionType = this.lineNum; // add group num
                        } else if (this._oddsType == "TQL") {
                            selectionType = "n_" + this.checkboxType;
                        } else {
                            selectionType = "n_" + tmpOddsSet.SEL;
                        }
                    } else {
                        selectionType = this.checkboxType;
                    }

                    if (isTournPool(this._oddsType)) {
                        if (this._oddsType == "TSP") {
                            _id = "tourn_TSP_" + this._matchID + "_" + selectionType + "_" + poolId + "_" + lineId + "_" + combId + "_c";
                        } else {
                            _id = "tourn_" + this._oddsType + "_" + this._matchID + "_" + selectionType + "_" + poolId + "_" + lineId + "_" + combId + "_c";
                        }
                    } else if (this._oddsType.match(/^(SPC|SGA)$/)) {
                        combId = tmpOddsSet[tmpOddsSet.SEL + "COMBID"];
                        _id = this._matchID + "_" + this._oddsType + "_" + this.lineNum + "_" + poolId + "_" + lineId + "_" + combId + "_c";
                    } else {
                        _id = this._matchID + "_" + this._oddsType + "_" + selectionType + "_" + this.lineNum + "_" + poolId + "_" + lineId + "_" + combId + "_c";
                    }
                    this._id = _id;

                    var lbl = '';
                    switch (this.checkboxType) {
                        case 'H':
                            lbl = jsHomeWin;
                            break;
                        case 'D':
                            lbl = jsDRAW;
                            break;
                        case 'A':
                            lbl = jsAwayWin;
                            break;
                    }

                    oddsCell = React.createElement(
                        "span", {
                            className: "s1"
                        },
                        React.createElement(OddsCheckbox, {
                            key: _id,
                            disabled: isDisabled,
                            objID: this._matchID,
                            selectionType: selectionType,
                            type: "checkbox",
                            name: "chk" + this._oddsType,
                            id: _id,
                            value: "",
                            poolType: this._oddsType,
                            className: _id,
                            toggleCheckbox: this.tgTD,
                            removeCheckedOdds: this.removeCheckedOdds,
                            poolStatus: poolStatus
                        }),
                        this.isFocusMatch ? React.createElement(
                            "span", {
                                className: "oddsLinkText"
                            },
                            lbl
                        ) : null,
                        formatOddsLink(this._oddsType, this._matchID, tmpOddsSet, this.checkboxType, this.lineNum, poolStatus, isAllup, poolId)
                    );
                }
            }

            return React.createElement(
                "div", {
                    className: "codds " + extraClass + " " + this.state.checkedOdds,
                    style: {
                        display: displayValue
                    }
                },
                oddsCell
            );
        }
    }]);

    return OddsCell;
}(React.Component);

var OddsLink = function(_React$Component5) {
    _inherits(OddsLink, _React$Component5);

    function OddsLink(props) {
        _classCallCheck(this, OddsLink);

        //this.spanClassName = "";
        var _this5 = _possibleConstructorReturn(this, (OddsLink.__proto__ || Object.getPrototypeOf(OddsLink)).call(this, props));

        _this5.state = {
            spanClassName: "",
            icon: ""
        };
        return _this5;
    }

    _createClass(OddsLink, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this6 = this;

            if (pageName != "INDEX" && this.props.oddsStr != "---" && this.props.oddsStr != nextProps.oddsStr) {
                this.setState({
                    spanClassName: "oupt"
                });
                clearTimeout(this.removeBoldText);

                if (isInplay) {
                    // display upper arrow
                    if (this.props.oddsStr == "---" || nextProps.oddsStr == "---" || this.props.oddsStr == "LSE" || nextProps.oddsStr == "LSE" || this.props.oddsStr == "RFD" || nextProps.oddsStr == "RFD") {
                        this.removeOddsLinkBoldText();
                    } else if (parseFloat(this.props.oddsStr, 10) > parseFloat(nextProps.oddsStr, 10)) {
                        this.state.icon = React.createElement("span", {
                            className: "oddsDown"
                        });
                    } else {
                        this.state.icon = React.createElement("span", {
                            className: "oddsUp"
                        });
                    }
                }
                this.removeBoldText = setTimeout(function() {
                    return _this6.removeOddsLinkBoldText();
                }, 2000 * 60);
            }
        }
    }, {
        key: "removeOddsLinkBoldText",
        value: function removeOddsLinkBoldText() {
            this.setState({
                spanClassName: ""
            });
            this.setState({
                icon: ""
            });
        }
    }, {
        key: "render",
        value: function render() {
            var maxLeg = 1;
            try {
                maxLeg = allupInfo[this.props.poolType];
            } catch (ex) {}
            var customClass = getOddsStrClass(this.props.oddsStr, this.props.poolType);
            var oddsStr = formatOddsStr(this.props.oddsStr, this.props.poolType);
            if (pageName.indexOf("TOURN") == -1 && maxLeg > 1 && this.props.link == "true" && pageName.indexOf("MIXALLUP") == -1) {
                return React.createElement(
                    "a", {
                        className: "oddsLink",
                        href: this.props.href,
                        title: this.props.title
                    },
                    React.createElement(
                        "span", {
                            id: this.props.spanID,
                            className: "oddsVal " + this.state.spanClassName + " " + customClass
                        },
                        oddsStr
                    ),
                    this.state.icon
                );
            } else {
                return React.createElement(
                    "span", {
                        className: "oddsLink",
                        href: this.props.href,
                        title: this.props.title
                    },
                    React.createElement(
                        "span", {
                            id: this.props.spanID,
                            className: "oddsVal " + this.state.spanClassName + " " + customClass
                        },
                        oddsStr
                    ),
                    this.state.icon
                );
            }
        }
    }]);

    return OddsLink;
}(React.Component);

function errImgNew(_imgObj) {
    try {
        if (_imgObj == undefined) {
            return;
        }
        if (typeof _imgObj != "undefined" && typeof _imgObj.style != "undefined" && typeof _imgObj.style.display != "undefined") {
            _imgObj.style.display = "none";
        }
    } catch (ex) {}
}

// format delay msg
function formatDelayMsg(_matchID) {
    return [React.createElement(
        "div", {
            className: "delayMsg delayMsgInRow width300"
        },
        React.createElement(
            "div",
            null,
            jsdelayMsg
        )
    ), formatEmptyOddsCell(_matchID + "HADD_codds"), formatEmptyOddsCell(_matchID + "HADA_codds")];
}

// format inplay icon
function formatInplayIco(_singleMatch, _type, _oddsType, _lineNum) {
    if (pageName == "INDEX" || pageName == "INDEX_HAD") {
        _oddsType = "HAD";
    }
    var _url = pageName == "SPC" ? "odds/odds_ipspc" : "odds/odds_inplay_all";

    var _inplayPools;
    if (_oddsType != "MIXALLUP") _inplayPools = GetInplayOrHTPools(Utilities.sortInplayPool(_singleMatch.inplayPools));
    var _status = _singleMatch.GetMatchPoolStatus(_oddsType, _lineNum);

    function genImg(props) {
        return img = React.createElement(Img, {
            src: "" + nasImagePath + props[0] + cacheVersion,
            alt: "" + props[1],
            title: "" + props[1]
        });
    }

    function genUrl(props) {
        return React.createElement(
            "a", {
                href: "" + _url
            },
            props[0]
        );
    }

    var tvtext = "";
    var tv = _singleMatch.channel;
    if (tv != null && tv.length > 0) {
        tv.map(function(s, i) {
            var channelName = jsLang == "CH" ? s.channelNameCH : s.channelNameEN;
            tvtext += "\n" + channelName;
        });
    }

    var img, url;
    var msg = "";
    var statustext = "";

    switch (_status) {
        case MatchPoolStatus.KICKOFF_WITH_FIRST_HALF_SELLING:
            msg = jsfirsthalf;
            img = genImg(["icon_clock_green_1st.png", msg + tvtext, msg + tvtext]);
            statustext = jsmatchinprogress_acceptbetnow;
            url = genUrl([statustext]);
            break;
        case MatchPoolStatus.KICKOFF_WITH_FIRST_HALF_NOT_SELLING:
            msg = jsinplay_available_soon;
            img = genImg(["icon_clock_red_1st.png", msg + tvtext, msg + tvtext]);
            statustext = jsinplay_available;
            url = genUrl([statustext]);
            break;
        case MatchPoolStatus.KICKOFF_WITH_HALF_SELLING:
            msg = jshalftimecompleted;
            img = genImg(["icon_clock_green_ht.png", msg + tvtext, msg + tvtext]);
            statustext = jsmatchinprogress_acceptbetnow;
            url = genUrl([statustext]);
            break;
        case MatchPoolStatus.KICKOFF_WITH_HALF_NOT_SELLING:
            msg = jsinplay_available_soon;
            img = genImg(["icon_clock_red_ht.png", msg + tvtext, msg + tvtext]);
            statustext = jsinplay_available;
            url = genUrl([statustext]);
            break;
        case MatchPoolStatus.KICKOFF_WITH_SECOND_HALF_SELLING:
            msg = jssecondhalf;
            img = genImg(["icon_clock_green_2nd.png", msg + tvtext, msg + tvtext]);
            statustext = jsmatchinprogress_acceptbetnow;
            url = genUrl([statustext]);
            break;
        case MatchPoolStatus.KICKOFF_WITH_SECOND_HALF_NOT_SELLING:
            msg = jsinplay_available_soon;
            img = genImg(["icon_clock_red_2nd.png", msg + tvtext, msg + tvtext]);
            statustext = jsinplay_available;
            url = genUrl([statustext]);
            break;
        case MatchPoolStatus.KICKOFF_WITH_SECOND_SELLING:
            msg = jssecondhalfcompleted;
            img = genImg(["icon_clock_green_ft.png", msg + tvtext, msg + tvtext]);
            statustext = jsmatchinprogress_acceptbetnow;
            url = genUrl([statustext]);
            break;
        case MatchPoolStatus.KICKOFF_WITH_SECOND_NOT_SELLING:
            msg = jsinplay_available_soon;
            img = genImg(["icon_clock_red_ft.png", msg + tvtext, msg + tvtext]);
            statustext = jsinplay_available;
            url = genUrl([statustext]);
            break;
        case MatchPoolStatus.KICKOFF_WITH_AET_SELLING:
            msg = jsextratimefulltime;
            img = genImg(["icon_clock_green_aet.png", msg + tvtext, msg + tvtext]);
            statustext = jsmatchinprogress_acceptbetnow;
            url = genUrl([statustext]);
            break;
        case MatchPoolStatus.KICKOFF_WITH_AET_NOT_SELLING:
            msg = jsinplay_available_soon;
            img = genImg(["icon_clock_red_aet.png", msg + tvtext, msg + tvtext]);
            statustext = jsinplay_available;
            url = genUrl([statustext]);
            break;
            //kickoff && Inplay Enabled && Pool in selling && when Penalty Shootout case 6, case 5
        case MatchPoolStatus.KICKOFF_WITH_PS_NOT_SELLING:
            //8
            msg = jsinplay_available_soon;
            img = genImg(["icon_clock_red_pso.png", msg + tvtext, msg + tvtext]);
            statustext = jsinplay_available;
            url = genUrl([statustext]);
            break;
            // kickoff && Inplay Enabled && Pool in selling && when Extra Time
        case MatchPoolStatus.KICKOFF_WITH_ET_NOT_SELLING:
            //7
            msg = jsinplay_available_soon;
            img = genImg(["icon_clock_red_et.png", msg + tvtext, msg]);
            statustext = jsinplay_available;
            url = genUrl([statustext]);
            break;
        case MatchPoolStatus.KICKOFF_WITH_PS_SELLING:
            //6
            msg = jspenaltyshootout;
            img = genImg(["icon_clock_green_pso.png", msg + tvtext, msg]);
            statustext = jsmatchinprogress_acceptbetnow;
            url = genUrl([statustext]);
            break;
            // kickoff && Inplay Enabled && Pool in selling && when Extra Time
        case MatchPoolStatus.KICKOFF_WITH_ET_SELLING:
            //5
            msg = jsextratime;
            img = genImg(["icon_clock_green_et.png", msg + tvtext, msg]);
            statustext = jsmatchinprogress_acceptbetnow;
            url = genUrl([statustext]);
            break;
            // kickoff && Inplay Enabled && Pool in selling
        case MatchPoolStatus.KICKOFF_WITH_INPLAY_SELLING:
            //4
            msg = jsacceptbetnow;
            img = genImg(["clock_on.gif", msg + tvtext, msg]);
            statustext = jsmatchinprogress_acceptbetnow;
            url = genUrl([statustext]);
            break;
            // kickoff && Inplay Enabled && Pool not in selling
        case MatchPoolStatus.KICKOFF_WITH_INPLAY_NON_SELLING:
            //3
            msg = jsinplay_available_soon;
            img = genImg(["clock_off.gif", msg + tvtext, msg]);
            statustext = jsinplay_available;
            url = genUrl([statustext]);
            break;
            // kickoff && HT Enabled && Pool in selling
        case MatchPoolStatus.KICKOFF_WITH_HALFTIME_SELLING:
            //5
            msg = jsaccepthalftime;
            img = genImg(["icon_clock_green_ht.png", msg + tvtext, msg]);
            statustext = jsmatchinprogress_acceptbetnow;
            url = genUrl([statustext]);
            break;
            // kickoff && HT Enabled && Pool not in selling
        case MatchPoolStatus.KICKOFF_WITH_HALFTIME_NON_SELLING:
            //6
            msg = jshalftime_available;
            img = genImg(["icon_clock_red_ht.png", msg + tvtext, msg]);
            statustext = jshalftime_available;
            url = genUrl([statustext]);
            break;
            //not yet kick off
        case MatchPoolStatus.BEFORE_KICKOFF_WITH_INPLAY:
            //1
            msg = jsinplay_available_soon;
            img = genImg(["clock_off.gif", msg + tvtext, msg]);
            break;
        case MatchPoolStatus.BEFORE_KICKOFF_WITH_HALFTIME:
            //2
            msg = jshalftime_available;
            img = genImg(["icon_clock_red_ht.png", msg + tvtext, msg]);
            break;
        case MatchPoolStatus.BEFORE_KICKOFF:
            //0
            img = "";
            break;
        default:
            msg = "";
            img = "";
            url = "";
            break;
            //icon_halftime.gif
    }
    if (_type == "url") {
        return genAllOddsDivLink("alloddsLink", "", _url, _singleMatch.matchID, statustext);;
    } else if (_type == "ico") {
        return React.createElement(
            "a", {
                href: "javascript:goPTUrl();",
                className: "inplay-clock"
            },
            img
        );
    } else if (_type == "refurl") {
        return statustext;
    } else if (_type == "focusmatch") {
        return React.createElement(
            "a", {
                href: "javascript:openFocusMatch(\"" + _url + "\");void(0);"
            },
            statustext
        );
    }

    return "";
}

function genAllOddsDivLink(_className, _title, _linkUrl, _matchID, _linkText) {
    return React.createElement(
        "div", {
            className: _className,
            title: _title,
            onClick: function onClick() {
                switchTo('football', "" + _linkUrl, "" + jsLang, {
                    "tmatchid": "" + _matchID
                });
            }
        },
        " ",
        _linkText,
        " "
    );
}

function displayMatchDayDiv(_matchID, _matchDay, _matchNum, _ipPageType, _isInplay) {
    var className = "alloddsLink";
    var allOddsStr = GetGlobalResources("AllOdds");
    var linktext = GetGlobalResources(_matchDay, "js") + " " + _matchNum;
    var linkurl = "odds/odds_allodds";
    //  if (_ipPageType == "INPLAYHAD" || _isInplay) {
    //      linkurl = "odds/odds_inplay_all";
    //  }
    return genAllOddsDivLink(className, allOddsStr, linkurl, _matchID, linktext);
}

function displayInplayMatchDiv(_isVoid, _matchID, _matchNum) {
    var className = "alloddsLink";
    var allOddsStr = GetGlobalResources("INPLAY");
    var linktext = _matchNum;
    var linkurl = "odds/odds_inplay_all";

    return genAllOddsDivLink(className, allOddsStr, linkurl, _matchID, linktext);
}

function displayInplayAllOddsIcon(_isVoid, _matchID) {
    var className = _isVoid ? "cdAllIn" : "cdAllIn inplayAllOddsIconLink";
    var allOddsStr = GetGlobalResources("AllOdds");
    var linkurl = "odds/odds_inplay_all";
    return genAllOddsDivLink(className, allOddsStr, linkurl, _matchID, "");
}

function displayInplayAllOddsAfterHADStopsell(match, _matchID) {
    var className = "alloddsLink";
    var allOddsStr = GetGlobalResources("INPLAY");
    var linktext = pageName == "INPLAYHAD" || match.IsMatchKickOff() ? jsClickToOtherInPlayPools : jsClickToOtherPools;
    var linkurl = pageName == "INPLAYHAD" || match.IsMatchKickOff() ? "odds/odds_inplay_all" : "odds/odds_allodds";
    return [genAllOddsDivLink(className, allOddsStr, linkurl, match.matchID, linktext), React.createElement(
        "div", {
            className: "oddsLink"
        },
        "(",
        jsHADStoppedSell,
        ")"
    )];
}

//check show inplay link
function checkInplayLink(_match, _oddsType, _pagename) {
    //change odds to link during inplay  
    var inplaystatus = _match.GetMatchPoolStatus(_oddsType);

    var poolclose = 0;
    if (_match.arrPools == null || _match.arrPools.indexOf(_oddsType.toUpperCase()) == -1) {
        if (_pagename != "INPLAYHAD" && _pagename != "OFM" && _match.anyInplaySelling != undefined && _match.anyInplaySelling != null) {
            return true;
        } else {
            return false;
        }
    }

    var pool = _match[_oddsType.toLowerCase() + "odds"];
    var poolstatus;
    if (pool == undefined || pool == null) {
        return false;
    } else {
        poolstatus = pool.POOLSTATUS;
    }

    if (!String.IsNullOrEmpty(poolstatus) && poolstatus == "Closed") {
        poolclose = 1;
    }

    //display had odds in inplay had page if pool is not closed
    //show inplay link if pool is closed
    if (_pagename == "INPLAYHAD") {
        return false;
    }

    return displayInplayLink(inplaystatus, _oddsType);
}

//return show inplay link or not
function displayInplayLink(_inplaystatus, _oType) {
    return isInplayEnabled(_oType) && (_inplaystatus == MatchPoolStatus.KICKOFF_WITH_INPLAY_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_INPLAY_NON_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_HALFTIME_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_HALFTIME_NON_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_PS_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_ET_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_PS_NOT_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_ET_NOT_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_FIRST_HALF_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_FIRST_HALF_NOT_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_HALF_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_HALF_NOT_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_SECOND_HALF_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_SECOND_HALF_NOT_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_SECOND_SELLING || _inplaystatus == MatchPoolStatus.KICKOFF_WITH_SECOND_NOT_SELLING);
}

//format inplay status team let and status
function formatInplayTeamAndStatus(_ipstatus, _type, _matchTime, _isHalfTime) {
    var matchinplaystatus = _ipstatus;
    var isBettingDelayNeeded = void 0;
    try {
        isBettingDelayNeeded = matchinplaystatus[0] === true;
    } catch (ex) {
        isBettingDelayNeeded = false;
    }
    var matchstage = matchinplaystatus[1];
    var anyInplaySelling = matchinplaystatus[5];
    var stagemsg = matchstage;
    //in play stage message
    //"InPlayESST_nobr", "firsthalf", "halftimecompleted", 
    //"secondhalf", "secondhalfcompleted", "extratime", "fulltime", "voidmatch"

    var isVoidMatch = matchstage == "voidmatch";
    stagemsg = GetGlobalResources(matchstage, "js");

    if (pageName != "INPLAYHAD") {
        stagemsg = GetGlobalResources("matchstatus") + " : " + stagemsg;
    }
    if (matchstage == "InPlayESST_nobr") {
        if (pageName == "INPLAYHAD") {
            stagemsg = "---"; //jsInPlayESST + ": <br />" + formatEsstStr(_matchTime, false);
        } else {
            stagemsg = jsesst_nobr + ": " + formatEsstStr(_matchTime, false);
        }

        if (_isHalfTime) {
            stagemsg = jslivebettingESST + ": <br />" + formatEsstStr(_matchTime, false);
        }
    }

    var matchresult = matchinplaystatus[2];

    if (String.IsNullOrEmpty(matchresult) || matchresult.indexOf("-1") != -1 || matchresult.indexOf("N/A") != -1) {
        matchresult = jsVS;
    } else if (!anyInplaySelling && (pageName == "INPLAYALL" || pageName == "INPLAYHAD")) {
        switch (matchstage) {
            case "halftimecompleted":
            case "secondhalfcompleted":
            case "fulltime":
            case "extratimefulltime":
            case "penaltyshootout":
                matchresult = matchinplaystatus[2];
                break;
            case "firsthalf":
            case "secondhalf":
                matchresult = "---:---";
                break;
            case "extratime":
                matchresult = "---:---";
                _ipstatus[3] = "---:---";
                break;
            default:
                matchresult = "---:---";
                break;
        }
    }

    switch (_type) {
        case "stagemsg":
            if (isVoidMatch) {
                stagemsg = "<span class=\"oupt voidmatch\">" + stagemsg + "</span>";
            }
            return stagemsg;
        case "matchresult":
            return matchresult;
        default:
            return "";
    }
}

//format flag image string
function formatImageStr(props) {
    return React.createElement(Img, {
        src: "" + props[0],
        alt: "" + props[1],
        title: "" + props[1],
        className: "cf" + props[2],
        onError: errImgNew(this)
    });
}

function formatJumpHeadStr(_m) {
    //var imgUrl = props[0];
    var imgUrl = "/ContentServer/jcbw/images/icon_h2h.png";
    return React.createElement(
        "a", {
            href: "javascript:;",
            className: "h2hLink",
            onClick: function onClick() {
                callFootyLogic('0', _m.tournament.tournamentID, _m.matchID);
            },
            title: "" + jsheadtohead
        },
        React.createElement(Img, {
            src: imgUrl
        })
    );
}

//format total corner icon string
function formatTotalCornerStr(corner, _display, _isCornerSelling, prefix) {
    return React.createElement(
        "span", {
            className: "btext spTotalCornerWrapper",
            style: {
                display: _display ? "inline-block" : "none"
            }
        },
        prefix,
        " ",
        React.createElement(Img, {
            src: footImagePath + "icon_corner.gif" + cacheVersion,
            alt: jsinrunningTotalCorners,
            title: jsinrunningTotalCorners
        }),
        React.createElement(
            "span", {
                className: "spTotalCorner"
            },
            _isCornerSelling ? corner : "---"
        )
    );
}

//format venu icon and text
function formatNeutralGroundIcon(_ng, _cssClass) {
    //http://jcbw.hongkongjockeyclub.com/football/info/images//icon_tv-631.gif
    //var sb = new StringBuilder();
    if (_ng != null) {
        var venueName = jsLang.toLowerCase() == 'ch' ? _ng.venueNameCH : _ng.venueNameEN;
        var venueStr = jsneutralground1 + " " + venueName + " " + jsneutralground2;
        return React.createElement(
            "span", {
                className: "" + _cssClass
            },
            React.createElement(Img, {
                src: footImagePath + "icon_neutral.gif" + cacheVersion,
                alt: venueStr,
                title: venueStr,
                onError: errImgNew(this)
            })
        );
    } else {
        return null;
    }
    //return sb.ToString();
}

//format tournament flag
function formatTournFlag(_tournShortName, _tournName) {
    var flagImg = function flagImg(arrPara) {
        return React.createElement(Img, {
            src: nasImagePath + "flag_" + arrPara[0] + ".gif" + cacheVersion,
            alt: arrPara[1],
            title: arrPara[1],
            className: "cf" + 0,
            onError: errImgNew(this)
        });
    };
    return flagImg([_tournShortName, _tournName]);
}

//format match flag
function formatMatchFlag(_shortName, _name) {
    //return `<img src="${League.GetFlagPath(_shortName)}" alt=${_name} title=${_name} onError={errImgNew(this)} />`;
    return React.createElement(Img, {
        src: League.GetFlagPath(_shortName),
        alt: _name,
        title: _name,
        onError: errImgNew(this)
    });
}

//format pool text string array
//get inplay or half  time pools
function GetInplayOrHTPools(ipools) {
    var inplayPools = [];
    try {
        if (ipools != null) {
            ipools.map(function(s, ind) {
                var key = s;
                if (pageName == 'ALL' || pageName == key) inplayPools.push(GetGlobalResources(key, "js"));
            });
        }
    } catch (ex) {}
    return inplayPools.join(',');
}

//format pool status
function formatPoolStatus(_poolstatus, _matchID, _oddsType, _extrainfo) {
    var poolstatus = "<label class=\"poolstatus{1}\" id=\"{2}_{3}_plst\">{0}{4}</label>";
    var pool_delim = "";
    var poolstatusmsg = "";
    var poolstatus_updated = "";
    var extrainfo = "";
    var oddsType = _oddsType;
    if (_oddsType == "HHAD") {
        oddsType = "HHA";
    } else if (_oddsType == "FHAD") {
        oddsType = "FHA";
    } else if (_oddsType == "HILO") {
        oddsType = "HIL";
    } else if (_oddsType == "CHLO") {
        oddsType = "CHL";
    } else if (_oddsType == "FHLO") {
        oddsType = "FHL";
    } else if (_oddsType == "FCRS") {
        oddsType = "FCS";
    }
    if (!String.IsNullOrEmpty(_extrainfo)) {
        extrainfo = _extrainfo;
    }
    if (!String.IsNullOrEmpty(_poolstatus) && !"start-sell" == _poolstatus) {
        poolstatusmsg = eval("js" + _poolstatus);
        pool_delim = "-";
        poolstatus_updated = " stUpd";
    }

    // For TQL in inplay, suspended msg should be shown after ExtraTime msg
    if (_oddsType == "TQL") {
        return extrainfo + "&nbsp;" + String.format(poolstatus, pool_delim, poolstatus_updated, _matchID, oddsType, poolstatusmsg);
    } else {
        return String.format(poolstatus, pool_delim, poolstatus_updated, _matchID, oddsType, poolstatusmsg) + extrainfo;
    }
}

function formatHeaderAllupLegs(_oddsType) {
    var legstext = "";

    if (formatAllupLegs(_oddsType, "").Trim() != "") {
        if (!poolIsAllUpOnly(_oddsType)) {
            legstext = "[" + jssingle + "+" + jsallup + "(" + formatAllupLegs(_oddsType, "") + ")]";
        } else {
            legstext = "[" + jsalluponlytext + "(" + formatAllupLegs(_oddsType, "") + ")]";
        }
    }

    return legstext;
}

function drawSPCResultRows(_singleObjectResult, _couponID, type) {
    var _resultRow = [];

    // sort item by item num
    //  _singleObjectResult = _singleObjectResult.sort(sort_by("ITEM", false, parseInt));

    for (var k = 1; k <= 99; k++) {
        //assume maximum 99 SPC / SGA items
        if (_singleObjectResult.HasPoolResults(type + k)) {
            var itemA = [];
            var _allResults = _singleObjectResult.results[type + k];
            var itemQ = jsLang == "CH" ? _allResults.ITEMCH : _allResults.ITEMEN;
            var itemNo = _allResults.ITEMNO;

            if (_allResults.RFDLIST == "RFD") {
                itemA.push(React.createElement(
                    "div", {
                        key: _couponID + "_" + k + "_r"
                    },
                    React.createElement(
                        "font", {
                            color: "red"
                        },
                        jsRFD
                    )
                ));
            } else {
                // answer
                if (_allResults.WINLIST != null) {
                    _allResults.WINLIST.sort(sort_by("SEL", false, parseInt));
                    for (var _a = 0; _a < _allResults.WINLIST.length; _a++) {
                        var selNum = _allResults.WINLIST[_a].SEL != null ? '(' + parseInt(_allResults.WINLIST[_a].SEL, 10) + ')' : '';
                        var answer = jsLang == "CH" ? _allResults.WINLIST[_a].CONTENTCH : _allResults.WINLIST[_a].CONTENTEN;
                        itemA.push(React.createElement(
                            "div", {
                                key: _couponID + "_" + k + "_" + _a + "_a"
                            },
                            selNum,
                            " ",
                            answer
                        ));
                    }
                }
                // refund
                if (_allResults.RFDLIST != null) {
                    _allResults.RFDLIST.sort(sort_by("SEL", false, parseInt));
                    for (var _a = 0; _a < _allResults.RFDLIST.length; _a++) {
                        var rfdAnswer = jsLang == "CH" ? _allResults.RFDLIST[_a].CONTENTCH : _allResults.RFDLIST[_a].CONTENTEN;
                        itemA.push(React.createElement(
                            "div", {
                                key: _couponID + "_" + k + "_" + _a + "_r"
                            },
                            "(",
                            parseInt(_allResults.RFDLIST[_a].SEL, 10),
                            ") ",
                            rfdAnswer,
                            " ",
                            React.createElement(
                                "font", {
                                    color: "red"
                                },
                                " - ",
                                jsRFD
                            )
                        ));
                    }
                }

                if (_allResults.RESULT != null) {
                    var res = "-";
                    switch (_allResults.RESULT) {
                        case "WIN":
                            res = jsWIN;
                            break;
                        case "LSE":
                            res = jsLOSE;
                            break;
                        case "RFD":
                            res = jsRFD;
                            break;
                    }
                    itemA.push(React.createElement(
                        "div", {
                            key: _couponID + "_" + k + "_" + _a + "_a"
                        },
                        res
                    ));
                }
            }

            var centerQuestion = "";
            //if ( pageName=="RESULT")
            //    centerQuestion = "center";

            _resultRow.push(React.createElement(
                "div", {
                    key: _couponID + "_" + k,
                    className: "couponRow tableRow rAlt" + ++noOfSPCRow % 2
                },
                React.createElement(
                    "div", {
                        className: "tableCell middle"
                    },
                    itemNo
                ),
                React.createElement(
                    "div", {
                        className: "tableCell " + centerQuestion + " middle"
                    },
                    itemQ
                ),
                React.createElement(
                    "div", {
                        className: "tableCell middle"
                    },
                    itemA
                )
            ));
        }
    }

    return _resultRow;
}

/// <summary>
/// format odds header for all odds page or pool header(aluponly)
/// </summary>    
/// <returns></returns>
function formatOddsHeader(_oddsType, tableType, _matchtournID, poolStatus, displaySuspended, code, stage, frontEndId) {
    if (pageName == "CHP" && _matchtournID != null && _matchtournID != "") {
        var singleObj = betValue[_matchtournID];
        var couponHeaderTxt = formatPageHeader(singleObj, tableType, false, isSuspended(singleObj["chpodds"].POOLSTATUS));
        return couponHeaderTxt;
    }
    if (pageName == "TQL" && _matchtournID != null && _matchtournID != "") {
        var _singleObj = betValue[_matchtournID];
        var _couponHeaderTxt = formatPageHeader(_singleObj, tableType, false, false);
        return _couponHeaderTxt;
    }

    var legstext = "";
    var poolStatusInfo = "";
    var refOddsText = "";
    var _isMix = pageName == "MIXALLUP" || pageName == "MIXALLUPSHORTCUT";
    var _isInplay = isInplay;
    var _isHalfTime = isHalfTime;
    var singleonly;
    if (pageName == "RESULT") {
        singleonly = "[" + jssingle + "]";
    } else {
        singleonly = "[" + jssingleonly + "]";
    }
    var extraInfo = [];
    var stagemsg = "";
    var tournName = "";
    var isExtraTime = false;
    var goalnumbertxt = "";
    displaySuspended = displaySuspended == undefined || displaySuspended == null ? false : displaySuspended;
    if (tableType != "NoMatch") {
        if (pageName != "INPLAYALL") {
            var tmpOddsType = _oddsType;
            if (pageName == "RESULT") {
                tmpOddsType = tmpOddsType.replace("INPLAY", "");
            } else {
                legstext = formatHeaderAllupLegs(tmpOddsType);
            }
            switch (tmpOddsType.toUpperCase()) {
                case "CRS":
                case "FGS":
                case "HFT":
                case "FCS":
                    if (_isMix) {
                        legstext = "[" + formatAllupLegs(tmpOddsType, "short") + "]";
                    }
                    break;
                case "TQL":
                    legstext = "";
                    var _singleMatch2 = betValue[_matchtournID];
                    if (stage == null && _singleMatch2 != null) {
                        stage = '';
                        var tmpStage = _singleMatch2.tqlodds['STAGE' + curLang.toUpperCase()];
                        if (tmpStage != null && tmpStage != '') stage = ' (' + tmpStage + ')';
                    }
                    if (_isMix) {
                        legstext = "";
                    }
                    //if (singleMatch != null) {
                    //    if (singleMatch.tqlodds != null) {
                    //        let status = singleMatch.tqlodds.POOLSTATUS == null ? singleMatch.tqlodds[0].POOLSTATUS : singleMatch.tqlodds.POOLSTATUS
                    //        displaySuspended = isSuspended(status);
                    //    }
                    //}
                    break;
                case "CHP":
                    legstext = "";
                    if (betValue[_matchtournID] != null) {
                        displaySuspended = isSuspended(betValue[_matchtournID]["chpodds"].POOLSTATUS);
                    }
                case "SPC":
                case "TPS":
                case "NTS":
                    legstext = "";
                    break;
                case "CHP_ALL":
                    headertext = "<span class=\"spoddsheader1\"" + (_isRefOdds ? " style=\"width:100%;\"" : "") + "><label class=\"btext\">" + _pagename + "</label>";
                    showIcon = false;
                    legstext = "";
                    break;
                case "CHP_INPLAY":
                    //icon display is controlled here
                    headertext = "<span class=\"spoddsheader\"><label class=\"btext\">" + isFinalist ? jsfinalist : jsCHP + "</label>" + (showIcon ? icontext : "") + " - <label class=\"btext\">" + _pagename + "</label>";
                    showIcon = false;
                    legstext = "";
                    break;
                default:
                    //legstext = legs2to8;
                    if (_isMix) {
                        legstext = "";
                    }
                    break;
            }
        } else {
            var _singleMatch3 = betValue[_matchtournID];
            if (_oddsType.match(/^(CHP|TQL)$/)) {
                tournName = "" + _singleMatch3.tournament['tournamentName' + curLang.toUpperCase()];
            }
            if (_oddsType.match(/^(CHL|ECH)$/)) {
                var displayCorner = _singleMatch3.IsMatchKickOff();
                var displayCornerNo = _singleMatch3[_oddsType.toLowerCase() + "odds"] != null && isSelling(_singleMatch3[_oddsType.toLowerCase() + "odds"].POOLSTATUS, "100", "1");
                extraInfo.push(React.createElement(
                    "span", {
                        key: "litTotalCorner",
                        className: "litTotalCorner"
                    },
                    formatTotalCornerStr(_singleMatch3.ipinfo[4], displayCorner, displayCornerNo, "")
                ));
            } else if (_oddsType.match(/^(NTS|ETS|ENT)$/)) {
                var _display = _singleMatch3.IsMatchKickOff() && _singleMatch3[_oddsType.toLowerCase() + "odds"] != null;
                extraInfo.push(React.createElement("input", {
                    key: _matchtournID + "_NTS_isETS",
                    type: "hidden",
                    id: _matchtournID + "_NTS_isETS",
                    value: "" + (_oddsType == "ETS").toString().toLowerCase()
                }));

                if (_display) {
                    //let ntspart = GetGlobalResources("ntsfstpart","js") + "{0}" + GetGlobalResources("ntslastpart","js");
                    var goalnumber = _singleMatch3[_oddsType.toLowerCase() + "odds"].ITEM;

                    goalnumbertxt = React.createElement(
                        "span", {
                            key: "goalno",
                            className: "btext"
                        },
                        React.createElement("span", {
                            "class": "space"
                        }),
                        "(",
                        jsntsfstpart,
                        React.createElement(
                            "span", {
                                id: "ntspart_" + _matchtournID
                            },
                            goalnumber,
                            jsLang == "EN" ? React.createElement(
                                "label", {
                                    className: "lblSup"
                                },
                                getNumberSuffix(goalnumber)
                            ) : "",
                            jsntslastpart,
                            ") ",
                            stagemsg
                        )
                    );
                }
            } else if (_oddsType != "INPLAYALL") {
                var _singleMatch = $.grep(dataCache["matches"], function(match, index) {
                    return match.matchID == tMatchID;
                })[0];
                if (typeof _singleMatch[_oddsType.toLowerCase() + "odds"] !== 'undefined' && _singleMatch[_oddsType.toLowerCase() + "odds"] != null) {
                    isExtraTime = _singleMatch[_oddsType.toLowerCase() + "odds"].ET == "1" ? true : false;
                } else {
                    isExtraTime = false;
                }
            }

            var bettingclosedText = _oddsType == "NTS" ? "" : React.createElement(
                "label", {
                    className: "poolstatus stUpd",
                    id: _matchtournID + "_" + _oddsType + "_plst"
                },
                " -",
                GetGlobalResources("bettingclosed")
            );

            if (_oddsType != "INPLAYALL") {
                if (_singleMatch3[_oddsType.toLowerCase() + "odds"].length != undefined) {
                    if (_oddsType != "SPC" && _singleMatch3[_oddsType.toLowerCase() + "odds"][0].POOLSTATUS != undefined && _singleMatch3[_oddsType.toLowerCase() + "odds"][0].POOLSTATUS != null) {
                        if (isPoolClosed(_singleMatch3[_oddsType.toLowerCase() + "odds"][0].POOLSTATUS)) {
                            poolStatusInfo = bettingclosedText;
                        } else if (isSuspended(_singleMatch3[_oddsType.toLowerCase() + "odds"][0].POOLSTATUS)) {
                            displaySuspended = true;
                        }
                    }
                } else if (_singleMatch3[_oddsType.toLowerCase() + "odds"].POOLSTATUS != undefined && _singleMatch3[_oddsType.toLowerCase() + "odds"].POOLSTATUS != null) {
                    if (isPoolClosed(_singleMatch3[_oddsType.toLowerCase() + "odds"].POOLSTATUS)) {
                        poolStatusInfo = bettingclosedText;
                    } else if (isSuspended(_singleMatch3[_oddsType.toLowerCase() + "odds"].POOLSTATUS)) {
                        displaySuspended = true;
                    }
                }
            }
        }
    }

    var headerDisplayName = _oddsType;
    if (pageName == "INPLAYHAD" || pageName == "INPLAYALL" && _oddsType == "INPLAYALL") {
        headerDisplayName = "INPLAY";
    } else if (pageName == "CHP" && finalistsOnly && (_matchtournID != null || _matchtournID != "")) {
        headerDisplayName = getCHPDisplayName(chpSubType);
    } else if (pageName == "TOURN") {
        if (_oddsType.indexOf("TPS") >= 0) headerDisplayName = "TPS";
        else if (_oddsType == "CHP" && _matchtournID != null && _matchtournID != "") {
            var singleMatch = betValue[_matchtournID];
            if (singleMatch != null) {
                var CHPType = singleMatch[_oddsType.toLowerCase() + "odds"].CHPType;
                headerDisplayName = getCHPDisplayName(CHPType);
            }
        }
    } else if (pageName == "INDEX") {
        headerDisplayName = "CURRENTODDS";
    } else if (pageName == "ALL" && _oddsType == "ALL") {
        headerDisplayName = "AllOdds";
    } else if (pageName == "RESULT") {
        if (_oddsType.indexOf("INPLAY") >= 0 || _oddsType.match(/^(NTS|EHA|EDC|EHL|ECH|ECS|ETG|ENT)$/)) {
            headerDisplayName = headerDisplayName.replace("INPLAY", "");
            refOddsText = "- " + jsinplay_last_odds;
        }
    } else if (pageName == "INDEX_HAD") {
        headerDisplayName = "HAD";
    } else if (_oddsType == "MIXALLUPLIST" || _oddsType == "MIXALLUP") {
        headerDisplayName = "allupmixallup";
    }

    var isShowTvLink = pageName != "INPLAYALL" && pageName != "ALL" || pageName == "INPLAYALL" && _oddsType == "INPLAYALL" || pageName == "ALL" && _oddsType == "ALL";

    var frontEndIdText = frontEndId != null && frontEndId.length > 0 ? React.createElement(
        "span",
        null,
        React.createElement("span", {
            "class": "space"
        }),
        React.createElement("span", {
            "class": "space"
        }),
        React.createElement(
            "span",
            null,
            frontEndId
        )
    ) : null;

    return React.createElement(
        "span",
        null,
        React.createElement(
            "label", {
                className: "btext"
            },
            GetGlobalResources(headerDisplayName),
            frontEndIdText,
            goalnumbertxt
        ),
        pageName.match(/^(ALL|INPLAYALL)$/) && _oddsType == "TQL" ? "(" + jsTQLShort + " " + code + ")" + "(" + stage + ")" : null,
        pageName != "INPLAYALL" && _oddsType == "CHP" && typeof finalistsOnly !== 'undefined' && finalistsOnly ? formatFinalistImg(pageName == "CHP" ? "" : "2") : "",
        pageName == "RESULT" || pageName == "INDEX" || _oddsType == "ALL" ? null : React.createElement(HelpIcon, {
            oddsType: _oddsType
        }),
        React.createElement(
            "span", {
                style: {
                    display: tableType == "NoMatch" ? "none" : "inline"
                }
            },
            poolIsSingleOnly(_oddsType) ? singleonly : "",
            legstext,
            extraInfo,
            poolStatusInfo,
            _oddsType == "CHP" ? formatPoolSellingStatus(_oddsType, _matchtournID, poolStatus) : "",
            refOddsText,
            pageName == "RESULT" ? React.createElement(HelpIcon, {
                oddsType: _oddsType
            }) : null,
            isShowTvLink ? React.createElement(PerformTVLink, null) : null,
            displaySuspended ? displaySuspendedText() : null
        )
    );
}

function getNumberSuffix(_intGoal) {
    var intGoal = parseInt(_intGoal);
    var cntGoal = "th";

    if (intGoal < 11 || intGoal > 20) {
        if (intGoal % 10 == 1) {
            cntGoal = "st";
        } else if (intGoal % 10 == 2) {
            cntGoal = "nd";
        } else if (intGoal % 10 == 3) {
            cntGoal = "rd";
        }
    }
    return cntGoal;
}

function formatPoolSellingStatus(_oddsType, _matchtournID, _poolStatus) {
    return React.createElement("label", {
        className: "poolstatus",
        id: _matchtournID + "_" + _oddsType + "_plst"
    });
}

//format mix allup checkbox and text
function formatAllupInfo(_otype, _legs) {
    var otype = _otype;

    var otypetxt = GetGlobalResources(otype);

    var chkstr = "<input type=\"checkbox\" name=\"chkoddsel\" id=\"chksel{0}\" value=\"{0}\" onClick=\"toggleMixContent(this, '" + otype + "');\"{1}/>";
    var preselected = false;
    var valchecked = preselected ? " checked " : "";
    var typetext = "<span id='" + otype + "_mixallupspan'>{0}{1}</span>";
    var legstr = formatAllupLegs(_otype, "mix_check");

    return String.format(chkstr, _otype, valchecked) + String.format(typetext, otypetxt, legstr);
}

function renderGoalLine(_singleMatch, _oddsType, _oddsOptionGL, _isInplay, _isHalfTime, _lineNum) {

    var id = _singleMatch.matchIDinofficial + "_" + _oddsType + "_" + _oddsOptionGL;
    if (isML(_oddsType) && _lineNum != "0") {
        id += "_" + _lineNum;
    }
    return React.createElement(
        "span", {
            id: id
        },
        renderGoalLineStr(_singleMatch, _oddsType, _oddsOptionGL, _isInplay, _isHalfTime, _lineNum)
    );
}

//add team string
function sTeamString(_hasLink, _isRefOdds, singleMatch, displayHGAG, displayLineNo, _poolType) {
    var strArr = [];
    //team urls
    var miH2HPara = "tdate=" + singleMatch.tdate + "&tday=" + singleMatch.matchDay + "&tnum=" + singleMatch.matchNum;
    //string miH2HPara = "";
    //home and away hha / hdc goal line
    var hgStr = "";
    var agStr = "";

    if (displayHGAG || displayLineNo || pageName == "INPLAYALL") {
        //renderGoalLine(singleMatch, "HHA", "HG", false, false, "0")
        if (displayLineNo && (_poolType == "HHA" || _poolType == "HDC")) {
            hgStr = React.createElement(
                "span", {
                    id: singleMatch.matchIDinofficial + "_" + _poolType + "_HG"
                },
                renderGoalLineStr(singleMatch, _poolType, "HG", false, false, "0")
            );
            agStr = React.createElement(
                "span", {
                    id: singleMatch.matchIDinofficial + "_" + _poolType + "_AG"
                },
                renderGoalLineStr(singleMatch, _poolType, "AG", false, false, "0")
            );
        }
        if (displayHGAG || pageName == "INPLAYALL") {
            if (pageName == "FOCUSMATCH") {
                hgStr = " (" + bshomecomb + ")";
                agStr = " (" + bsawaycomb + ")";
            } else {
                hgStr = " (" + jsHOME + ")";
                agStr = " (" + jsAWAY + ")";
            }
        }
    }

    if (jsLang.toLowerCase() == 'ch') {
        strArr = [miH2HPara, singleMatch.homeTeam.teamNameCH, hgStr, singleMatch.awayTeam.teamNameCH, agStr];
    } else {
        strArr = [miH2HPara, singleMatch.homeTeam.teamNameEN, hgStr, singleMatch.awayTeam.teamNameEN, agStr];
    }

    //set team vs string
    if (_isRefOdds) {
        return React.createElement(
            "span", {
                className: "refteam",
                onClick: function onClick() {
                    return false;
                }
            },
            strArr[1],
            strArr[2],
            " ",
            React.createElement(
                "label", {
                    className: "lblvs"
                },
                jsVS
            ),
            " ",
            strArr[3],
            strArr[4]
        );
    }
    if (_hasLink) {
        return React.createElement(
            "span",
            null,
            strArr[1],
            strArr[2],
            " ",
            React.createElement(
                "label", {
                    className: "lblvs"
                },
                jsVS
            ),
            " ",
            strArr[3],
            strArr[4]
        );
    } else {
        if (isInplay) {
            var _vsStr = "";
            if (!singleMatch.isVoidMatch() && singleMatch.IsMatchKickOff()) {
                _vsStr = formatInplayTeamAndStatus(singleMatch.ipinfo, "matchresult", singleMatch.matchTime, _isHalfTimePage);
            } else {
                _vsStr = jsVS;
            }
            return React.createElement(
                "span", {
                    className: "teambox"
                },
                React.createElement(
                    "span", {
                        className: "teamname teamnleft"
                    },
                    strArr[1],
                    strArr[2]
                ),
                React.createElement(
                    "span", {
                        className: "nolnk span_vs",
                        id: "sr" + singleMatch.matchIDinofficial
                    },
                    React.createElement(
                        "span", {
                            className: "matchresult"
                        },
                        _vsStr
                    )
                ),
                React.createElement(
                    "span", {
                        className: "teamname teamnright"
                    },
                    strArr[3],
                    strArr[4]
                )
            );
        } else return React.createElement(
            "span",
            null,
            React.createElement(
                "span", {
                    className: "teamname"
                },
                strArr[1],
                strArr[2]
            ),
            React.createElement(
                "span", {
                    className: "nolnk span_vs",
                    id: "sr" + singleMatch.matchIDinofficial
                },
                jsVS
            ),
            React.createElement(
                "span", {
                    className: "teamname"
                },
                strArr[3],
                strArr[4]
            )
        );
    }
}

function oddsAllJump(matchID, endId, isInplayOdds) {
    var className = "alloddsLink";
    var allOddsStr = GetGlobalResources("AllOdds");
    var linkurl = "odds/odds_allodds";

    if (isInplayOdds) {
        allOddsStr = GetGlobalResources("INPLAY");
        linkurl = "odds/odds_inplay_all";
    }

    return genAllOddsDivLink(className, allOddsStr, linkurl, matchID, endId);
}

function InplayMsgByMatchID(_matchID) {
    return React.createElement(
        "div", {
            className: "chpInplayLink"
        },
        React.createElement(
            "div", {
                className: "nopoolmsg"
            },
            genAllOddsDivLink("alloddsLink", "", "odds/odds_inplay_all", _matchID, jsinplay_available)
        )
    );
}

function displayNoMatchSection() {
    return React.createElement(
        "div", {
            className: "nopool"
        },
        React.createElement(
            "div", {
                id: "NoPoolMsgContent",
                className: "nopoolmsg"
            },
            jsInfoUpdate
        )
    );
}

function InplayMsg(_match, _oType, inplaystatus) {
    return React.createElement(
        "div", {
            key: "nopool",
            className: "nopool"
        },
        React.createElement(
            "div", {
                className: "nopoolmsg inplaymsg"
            },
            formatInplayIco(_match, "url", pageName)
        )
    );
}

function GetDateTimeLegName(tabDateTime) {
    var day = new Date(Date.parse(tabDateTime));
    return "======" + formatDDMMYYYY(tabDateTime) + "(" + DateWeekLanguageSwitch(toWeekDay(day.getDay())) + ") " + jstabletitlematches + "======";
}

function toWeekDay(_d) {
    var d = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return d[_d];
}

//parimuteul pool leg name
function GetLegName(index) {
    switch (index) {
        case 0:
            return jsfirstleg;
        case 1:
            return jssecondleg;
        case 2:
            return jsthirdleg;
        case 3:
            return jsforthleg;
        case 4:
            return jsfifthleg;
        case 5:
            return jssixthleg;
        default:
            return "";
    }
}

function cntGoalNumber(_GoalNum) {
    var cntGoal = [];
    var intGoal = parseInt(_GoalNum);
    if (isNaN(intGoal)) {
        intGoal = 0;
    }
    if (jsLang == "EN") {
        if (intGoal < 11 || intGoal > 20) {
            if (intGoal % 10 == 1) {
                cntGoal.push(React.createElement(
                    "label", {
                        className: "lblSup"
                    },
                    "st"
                ));
            } else if (intGoal % 10 == 2) {
                cntGoal.push(React.createElement(
                    "label", {
                        "class": "lblSup"
                    },
                    "nd"
                ));
            } else if (intGoal % 10 == 3) {
                cntGoal.push(React.createElement(
                    "label", {
                        "class": "lblSup"
                    },
                    "rd"
                ));
            } else {
                cntGoal.push(React.createElement(
                    "label", {
                        "class": "lblSup"
                    },
                    "th"
                ));
            }
        } else {
            cntGoal.push(React.createElement(
                "label", {
                    "class": "lblSup"
                },
                "th"
            ));
        }
    }
    return cntGoal;
}
/*new added*/
function getConfig(key) {
    if (key == "nas_image_path") {
        return nasImagePath;
    } else if (key == "football_image_path") {
        return footImagePath;
    }
    return "";
}

function displaySuspendedText() {
    return React.createElement(
        "span", {
            style: {
                display: "inlineBlock",
                fontWeight: "bold"
            },
            className: "redtext"
        },
        "-",
        GetGlobalResources("suspended")
    );
}

function displayNoMatch(renderNoPoolMsgHeader, renderNoPoolMsgContent) {
    //renderNoPoolMsgHeader
    //if(pageName!="ALL" && pageName!="DHCP" && pageName!="HFMP") {
    if (renderNoPoolMsgHeader) {
        ReactDOM.render(React.createElement(OddsTableInfo, {
            tableType: "NoMatch",
            oddsType: pageName
        }), document.getElementById("NoPoolMsgHeader"));
    } else {
        $('.footerAddslip').hide();
        $('.tHead').hide();
    }
    if (renderNoPoolMsgContent) {
        $('#NoPoolMsgContent').html(jsNoPoolMsg);
    }
    // show noPoolMsg
    $('#NoPoolMsg').show();
    $('.nopool').show();
    $('#todds .OddsDetails').hide();
    $(".poolDetails").hide();
    $(".dMixSingleMatch").hide();

    //clearInterval(refreshTableInterval);
}

function displayInplayMsg(_singleMatch) {
    ReactDOM.render(InplayMsg(_singleMatch), document.getElementById("litMsg"));
}

function formatFinalistImg(_iconType) {
    var finalistImgPath = "finalist" + _iconType + ".gif" + cacheVersion;
    if (jsLang == "CH") {
        finalistImgPath = jsLang + "/finalist" + _iconType + ".gif";
    }
    return React.createElement(
        "label", {
            className: "finalistimg" + _iconType
        },
        React.createElement(Img, {
            src: "" + nasImagePath + finalistImgPath,
            onError: errImgNew(this)
        })
    );
}

function formatLastOddsString(_singleMatch) {
    if (_singleMatch != null) {
        var _img = React.createElement(Img, {
            src: footImagePath + "icon_odds.gif" + cacheVersion,
            title: jslastodds_nobr
        });
        //return <a href={`last_odds.aspx?lang=${jsLang}&id=${_singleMatch.matchID}`} title={jslastodds_nobr}>{_img}</a>;
        return React.createElement(
            "span", {
                onClick: function onClick() {
                    renderLastOdds(_singleMatch.matchID);
                },
                title: jslastodds_nobr,
                className: "pointer"
            },
            _img
        );
    }
    return null;
}

function formatDetailsString(_singleMatch) {
    function detailStr(arr) {
        return React.createElement(Img, {
            src: "" + footImagePath + arr[0] + ".gif" + cacheVersion,
            title: arr[1]
        });
    }
    var strResultPageTitle = jsdetailsResult;
    var result = detailStr(["icon_details_off", strResultPageTitle]);
    var strHalfTimeDiv = "FCS,FHA"; // "fcs,fts,fgs,fha";

    if (_singleMatch != null) {
        if (_singleMatch.HasConfirmedResults()) {
            if (_singleMatch.isEndOfHalfTimeWithDiv(strHalfTimeDiv)) {
                strResultPageTitle = jsdetailsResult_half;
            }
            //result = <a href={`/football/result_details.aspx?lang=${jsLang}&id=${_singleMatch.matchID}`} title={strResultPageTitle}>{detailStr(["icon_details", strResultPageTitle])}</a>;
            result = React.createElement(
                "span", {
                    onClick: function onClick() {
                        renderResultDetails(_singleMatch.matchID);
                    },
                    title: strResultPageTitle,
                    className: "pointer"
                },
                detailStr(["icon_details", strResultPageTitle])
            );
        }
    }

    return result;
}

function formatOddsStr(_oddsStr, poolType) {
    if (_oddsStr == "RFD") _oddsStr = jsRFD;
    else if (_oddsStr == "LSE") {
        _oddsStr = jsLSE_NOBR;
    }
    return _oddsStr;
}

function getOddsStrClass(_oddsStr, poolType) {
    if (_oddsStr == "LSE" && poolType != "GPF") {
        return "lseOdds";
    }
    return "";
}

function getMatchLength(_obj) {
    try {
        return _obj.matches.length;
    } catch (ex) {}
    return 0;
}

function getTournamentLength(_obj) {
    try {
        return _obj.tournaments.length;
    } catch (ex) {}
    return 0;
}

function hasOdds(str) {
    if (str != undefined && str.indexOf("---") < 0) {
        return true;
    }
    return false;
}

function checkIfHybridPool(_poolType) {
    for (var k = 1; k < _poolType.length; k++) {
        if (_poolType[k].Cur != _poolType[k - 1].Cur) return true;
    }
    return false;
}

function checkIfRefPool(_poolType) {
    if ("Cur" in _poolType) {
        if (_poolType.Cur == "0") return true;
    } else {
        for (var k = 1; k < _poolType.length; k++) {
            if (_poolType[k].Cur == "0") return true;
        }
    }
    return false;
}

function drawDivCalFormulaDropdown(obj) {
    var opts = [];
    var dataArr = getDataArr();
    var selIdx = obj.state.formulaIdx;
    if (dataArr.length > 1) {
        var tmpArr = formula[dataArr.length];
        for (var i = 0; i < tmpArr.length; i++) {
            opts.push(React.createElement(
                "option", {
                    value: i,
                    selected: selIdx == i
                },
                tmpArr[i]
            ));
        }
    }
    return React.createElement(
        "select", {
            className: "allup_calculator_select",
            id: "selFormula",
            onChange: function onChange(e) {
                divCalErrMsg = '';
                obj.setState({
                    formulaIdx: parseInt(e.target.value)
                });
            }
        },
        opts
    );
}

function drawDelBtn(obj, i) {
    return React.createElement("div", {
        className: "divCalDelBtn",
        onClick: function onClick() {
            removeItem(obj, i);
        }
    });
}

function drawWinLossIcon(obj, n, i) {
    var iconCss = 'divCalNoIcon';
    if (n[17] == "W") iconCss = 'divCalYesIcon';
    return React.createElement("div", {
        className: iconCss,
        onClick: function onClick() {
            changeWinLoss(obj, i);
        }
    });
}

function drawHILSelect(obj, n, i) {
    var tHILcond = n[12];
    var absHILcond = getHILcond(tHILcond);
    var tstr = jsdivcal_hilabove.replace('{0}', absHILcond);
    var opts = [];
    var tvalue = n[5] == 'High' ? 'W' : '0';
    opts.push(React.createElement(
        "option", {
            value: tvalue,
            selected: n[17] == tvalue
        },
        tstr
    ));
    if (tHILcond.indexOf('/') >= 0 || tHILcond.indexOf('.5') < 0) {
        tstr = absHILcond > 1 ? jsdivcal_hilgoals.replace('{0}', absHILcond) : jsdivcal_hilgoal.replace('{0}', absHILcond);
        if (tHILcond.indexOf('/') >= 0) {
            var hilDataArr = tHILcond.split('/');
            // H .5/.0 = W/1
            // H .0/.5 = 1/0
            // L .5/.0 = 0/1
            // L .0/.5 = 1/W
            if (handicapType(hilDataArr[0]) == '+F' && n[5] == 'High') tvalue = 'W/1';
            if (handicapType(hilDataArr[1]) == '+F' && n[5] == 'High') tvalue = '1/0';
            if (handicapType(hilDataArr[0]) == '+F' && n[5] != 'High') tvalue = '0/1';
            if (handicapType(hilDataArr[1]) == '+F' && n[5] != 'High') tvalue = '1/W';
        } else {
            tvalue = "1";
        }
        opts.push(React.createElement(
            "option", {
                value: tvalue,
                selected: n[17] == tvalue
            },
            tstr
        ));

        tstr = jsdivcal_hilbelow.replace('{0}', absHILcond);
    } else {
        tstr = jsdivcal_hilorbelow.replace('{0}', absHILcond);
    }
    tvalue = n[5] == 'High' ? '0' : 'W';
    opts.push(React.createElement(
        "option", {
            value: tvalue,
            selected: n[17] == tvalue
        },
        tstr
    ));

    return React.createElement(
        "select", {
            className: "sltresult",
            onChange: function onChange(e) {
                changeLineSel(obj, e.target.value, i);
            }
        },
        opts
    );
}

function drawHDCSelect(obj, n, i) {
    var thomeHDC = n[12];
    var tvalue = n[5] == 'H' ? 'W' : '0';
    var opts = [];
    opts.push(React.createElement(
        "option", {
            value: tvalue,
            selected: n[17] == tvalue
        },
        jsdivcal_hdchome
    ));
    if (thomeHDC.indexOf('/') < 0) {
        // no split line
        if (handicapType(thomeHDC) == '') // NO decimal pt
            opts.push(React.createElement(
                "option", {
                    value: "1"
                },
                jsdivcal_hdcdraw
            ));
    } else {
        var hdcDataArr = thomeHDC.split('/');
        var tstr = '';
        // +.5/+ = A/Draw
        // -.5/- = H/Draw
        // +/+.5 = Draw/H
        // -/-.5 = Draw/A
        if (handicapType(hdcDataArr[0]) == '+F') {
            tvalue = n[5] == 'H' ? '0/1' : 'W/1';
            tstr = jsdivcal_hdcaway + '/' + jsdivcal_hdcdraw;
        } else if (handicapType(hdcDataArr[0]) == '-F') {
            tvalue = n[5] == 'H' ? 'W/1' : '0/1';
            tstr = jsdivcal_hdchome + '/' + jsdivcal_hdcdraw;
        } else if (handicapType(hdcDataArr[1]) == '+F') {
            tvalue = n[5] == 'H' ? '1/W' : '1/0';
            tstr = jsdivcal_hdcdraw + '/' + jsdivcal_hdchome;
        } else if (handicapType(hdcDataArr[1]) == '-F') {
            tvalue = n[5] == 'H' ? '1/0' : '1/W';
            tstr = jsdivcal_hdcdraw + '/' + jsdivcal_hdcaway;
        }
        if (tstr != '') opts.push(React.createElement(
            "option", {
                value: tvalue,
                selected: n[17] == tvalue
            },
            tstr
        ));
    }
    tvalue = n[5] == 'H' ? '0' : 'W';
    opts.push(React.createElement(
        "option", {
            value: tvalue,
            selected: n[17] == tvalue
        },
        jsdivcal_hdcaway
    ));
    return React.createElement(
        "select", {
            className: "sltresult",
            onChange: function onChange(e) {
                changeLineSel(obj, e.target.value, i);
            }
        },
        opts
    );
}

function changeLineSel(obj, val, i) {
    divCalErrMsg = '';
    var d = getDataArr();
    d[i][17] = val;
    setDataArr(d);
    obj.forceUpdate();
}

function changeWinLoss(obj, i) {
    divCalErrMsg = '';
    var d = getDataArr();
    if (d[i][17] == 'W') {
        d[i][17] = '0';
    } else {
        d[i][17] = 'W';
    }
    setDataArr(d);
    obj.forceUpdate();
}

function getCHPDisplayName(type) {
    var headerDisplayName = "CHP";

    switch (type) {
        case "1":
            headerDisplayName = "winningCountry";
            break;
        case "2":
            headerDisplayName = "winningContinent";
            break;
        case "3":
            headerDisplayName = "finalist";
            break;
        default:
            headerDisplayName = "CHP";
            break;
    }

    return headerDisplayName;
}

//# sourceURL=/football/lib/BasePage.js
//# sourceMappingURL=BasePage.js.map