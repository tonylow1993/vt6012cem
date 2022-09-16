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

var MatchDropDownList = function(_React$Component) {
    _inherits(MatchDropDownList, _React$Component);

    function MatchDropDownList() {
        _classCallCheck(this, MatchDropDownList);

        return _possibleConstructorReturn(this, (MatchDropDownList.__proto__ || Object.getPrototypeOf(MatchDropDownList)).apply(this, arguments));
    }

    _createClass(MatchDropDownList, [{
        key: "handleChange",
        value: function handleChange(e) {
            if (e.target.value.indexOf("--coupon") == -1) {
                setMatchId(e.target.value);
                try {
                    //this.setState({selectValue:e.target.value});
                    var newUrl = replaceUrlParam(location.href, "tmatchid", tMatchID);
                    window.history.pushState({
                        "html": "",
                        "pageTitle": document.title
                    }, "", newUrl);
                } catch (ex) {}
                renderTableAfterDropdownSelect(true);
                updatePushAllOdds(tMatchID);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _allData = this.props.allData;
            var _byCoupon = this.props.byCoupon;

            // re order current and presales matches in allodds and inplay all odds
            if (pageName == "INPLAYALL" || pageName == "ALL") {
                var _allData1 = [];
                var _allData2 = [];
                for (var i = 0; i < _allData[0].length; i++) {
                    var curData = [];
                    var preData = [];
                    for (var j = 0; j < _allData[0][i].length; j++) {
                        if (_allData[0][i][j].Cur != '1') preData.push(_allData[0][i][j]);
                        else curData.push(_allData[0][i][j]);
                    }
                    if (curData.length > 0) _allData1.push(curData);
                    if (preData.length > 0) _allData2.push(preData);
                }
                for (var i = 0; i < _allData2.length; i++) {
                    _allData1.push(_allData2[i]);
                }
                _allData[0] = _allData1;
            }

            var _options = [];

            var displayDDL = false;

            try {
                if (_byCoupon) {
                    _allData.forEach(function(_couponArr, _ind) {
                        if (_couponArr != null) {

                            var countMatch = 0;
                            _couponArr.forEach(function(_item, _ind) {
                                var formatedDate = getFormatDropDownListDate(_item.matchTime);
                                if (_item.matchID != tMatchID) {
                                    _options.push(React.createElement(
                                        "option", {
                                            key: _ind + "_" + _item.matchID,
                                            value: "" + _item.matchID
                                        },
                                        formatedDate,
                                        " ",
                                        _item.frontEndId,
                                        " ",
                                        jsLang == "EN" ? _item.homeTeam.teamNameEN : _item.homeTeam.teamNameCH,
                                        " ",
                                        jsVS,
                                        " ",
                                        jsLang == "EN" ? _item.awayTeam.teamNameEN : _item.awayTeam.teamNameCH
                                    ));
                                    countMatch++;
                                }
                            });

                            // prevent only one match in ddl and the match is selected
                            if (countMatch == 0) {
                                _options.pop();
                            } else {
                                displayDDL = true;
                            }
                        }
                    });
                } else {
                    _allData.forEach(function(tSel, tind) {
                        var _item = tSel;
                        if (_item.matchID != tMatchID) {
                            var formatedDate = getFormatDropDownListDate(_item.matchDate);
                            _options.push(React.createElement(
                                "option", {
                                    key: tind + "_" + _item.matchID,
                                    value: "" + _item.matchID
                                },
                                formatedDate,
                                " ",
                                GetGlobalResources(_item.matchDay, "js"),
                                " ",
                                _item.matchNum,
                                " ",
                                jsLang == "EN" ? _item.homeTeam.teamNameEN : _item.homeTeam.teamNameCH,
                                " ",
                                jsVS,
                                " ",
                                jsLang == "EN" ? _item.awayTeam.teamNameEN : _item.awayTeam.teamNameCH
                            ));
                        }
                    });
                    if (_options.length > 0) displayDDL = true;
                }
            } catch (ex) {
                debugLog(ex);
            }

            if (displayDDL) return React.createElement(
                "select", {
                    id: "MatchDropDownList",
                    className: "ddlAllMatches poolDetails",
                    onChange: this.handleChange,
                    style: {
                        width: 296
                    }
                },
                React.createElement(
                    "option", {
                        value: "--"
                    },
                    jssearchother
                ),
                _options
            );
            else return null;
        }
    }]);

    return MatchDropDownList;
}(React.Component);

var NTSInfoTable = function(_React$Component2) {
    _inherits(NTSInfoTable, _React$Component2);

    function NTSInfoTable() {
        _classCallCheck(this, NTSInfoTable);

        return _possibleConstructorReturn(this, (NTSInfoTable.__proto__ || Object.getPrototypeOf(NTSInfoTable)).apply(this, arguments));
    }

    _createClass(NTSInfoTable, [{
        key: "render",
        value: function render() {
            var _matchID = this.props._matchID;
            try {
                if (_matchID == undefined || _matchID == null || betValue[_matchID] == undefined || betValue[_matchID] == null) return;
                var ntsInfoDetails = [];
                var singleMatch = betValue[_matchID];
                var hometeam = singleMatch.homeTeam["teamName" + jsLang] + " (" + jsHOME + ")";
                var awayteam = singleMatch.awayTeam["teamName" + jsLang] + " (" + jsAWAY + ")";

                var NTS_DIV = [];
                //   let etsBase = 0;

                for (var _i = 1; _i <= 30; _i++) {
                    if (singleMatch.results["NTS" + _i] != null) NTS_DIV.push('NTS:' + _i + ':' + singleMatch.results["NTS" + _i]);
                }

                var secondHalfResult = $.grep(singleMatch.accumulatedscore, function(_as) {
                    return _as.periodvalue == "SecondHalf";
                });
                if (secondHalfResult != null) {
                    secondHalfResult = secondHalfResult[0];
                    //etsBase = parseInt(secondHalfResult.home, 10) + parseInt(secondHalfResult.away, 10);
                }
                for (var _i2 = 1; _i2 <= 30; _i2++) {
                    if (singleMatch.results["ENT" + _i2] != null) NTS_DIV.push('ENT:' + _i2 + ':' + singleMatch.results["ENT" + _i2]);
                }

                // draw ntsInfoPanel
                if (NTS_DIV.length > 0) {
                    for (var i = 0; i < NTS_DIV.length; i++) {
                        var ntsinfo = NTS_DIV[i].split(":");
                        var teamname = "-";
                        if (ntsinfo[2] == "H") {
                            teamname = hometeam;
                        } else if (ntsinfo[2] == "A") {
                            teamname = awayteam;
                        } else if (ntsinfo[2] == "N") {
                            teamname = bsnogoal;
                        } else if (ntsinfo[2] == "RFD") {
                            teamname = jsRFD;
                        }
                        var cntGoal = "";
                        var strExtraTimeText = "";
                        if (ntsinfo[0] == "ENT") {
                            strExtraTimeText = " [" + jsextratime + "]";
                        }
                        ntsInfoDetails.push(React.createElement(
                            "tr", {
                                key: "ntsInfoRow" + i
                            },
                            React.createElement(
                                "td", {
                                    className: "cgoaldiv"
                                },
                                jsntsfstpart,
                                ntsinfo[1],
                                cntGoalNumber(parseInt(ntsinfo[1])),
                                jsntslastpart,
                                strExtraTimeText
                            ),
                            React.createElement(
                                "td",
                                null,
                                teamname
                            )
                        ));
                    }
                } else {
                    ntsInfoDetails.push(React.createElement(
                        "tr", {
                            key: "ntsInfoRow0"
                        },
                        React.createElement(
                            "td", {
                                colSpan: "2"
                            },
                            jsnotyetgoal
                        )
                    ));
                }

                return React.createElement(
                    "div", {
                        key: "ntsinfo_panel",
                        id: "ntsinfo_panel",
                        style: {
                            'display': 'none'
                        }
                    },
                    React.createElement(
                        "table",
                        null,
                        React.createElement(
                            "tbody",
                            null,
                            React.createElement(
                                "tr", {
                                    className: "rhead"
                                },
                                React.createElement(
                                    "td", {
                                        className: "cgoal"
                                    },
                                    jsGOAL
                                ),
                                React.createElement(
                                    "td", {
                                        className: "cgoalteam"
                                    },
                                    jsscoreteam
                                )
                            ),
                            ntsInfoDetails
                        )
                    )
                );
            } catch (ex) {
                debugLog("NTSInfoTable: " + ex);
            }
            return null;
        }
    }]);

    return NTSInfoTable;
}(React.Component);

var MatchOddsAllSelectList = function(_React$Component3) {
    _inherits(MatchOddsAllSelectList, _React$Component3);

    function MatchOddsAllSelectList() {
        _classCallCheck(this, MatchOddsAllSelectList);

        return _possibleConstructorReturn(this, (MatchOddsAllSelectList.__proto__ || Object.getPrototypeOf(MatchOddsAllSelectList)).apply(this, arguments));
    }

    _createClass(MatchOddsAllSelectList, [{
        key: "render",
        value: function render() {
            var optionList = [];
            var tournamentList = this.props.OddsTableTournaments;
            var oddsTableMatchList = this.props.OddsTableMatches;
            selectedTabDateArra.forEach(function(singleSelectedDate) {
                oddsTableMatchList.forEach(function(item, couponIndex) {
                    var couponMatchDate = item.matchDate.split("T")[0];
                    if (couponMatchDate == singleSelectedDate) {
                        var matchDate = formatEsstStr(item.matchDate, false);
                        var frontEndId = item.frontEndId;
                        var code = "";
                        var homeAndAwayName = "";
                        if (jsLang.toLowerCase() == 'ch') {
                            homeAndAwayName = item.homeTeam.teamNameCH + " VS " + item.awayTeam.teamNameCH;
                        } else {
                            homeAndAwayName = item.homeTeam.teamNameEN + " VS " + item.awayTeam.teamNameEN;
                        }
                        tournamentList.forEach(function(tList) {
                            if (item.tournament != undefined) {
                                if (item.tournament.tournamentID == tList.tournamentID) {
                                    code = tList.tournamentShortName;
                                }
                            }
                        });
                        optionList.push(React.createElement(MatcheOddsAllOption, {
                            matchID: item.matchID,
                            matchDate: matchDate,
                            frontEndId: frontEndId,
                            code: code,
                            homeAndAwayName: homeAndAwayName
                        }));
                    }
                });
            });

            return React.createElement(
                "div", {
                    className: "clearfloat"
                },
                React.createElement(
                    "p",
                    null,
                    React.createElement("span", null)
                ),
                React.createElement(
                    "p", {
                        className: "float-right"
                    },
                    " ",
                    React.createElement(
                        "select", {
                            id: "matchAllSelectId"
                        },
                        React.createElement(
                            "option", {
                                value: "0"
                            },
                            jsSelectAnotherMatch
                        ),
                        optionList
                    )
                )
            );
        }
    }]);

    return MatchOddsAllSelectList;
}(React.Component);

var MatcheOddsAllOption = function(_React$Component4) {
    _inherits(MatcheOddsAllOption, _React$Component4);

    function MatcheOddsAllOption() {
        _classCallCheck(this, MatcheOddsAllOption);

        return _possibleConstructorReturn(this, (MatcheOddsAllOption.__proto__ || Object.getPrototypeOf(MatcheOddsAllOption)).apply(this, arguments));
    }

    _createClass(MatcheOddsAllOption, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "option", {
                    value: this.props.matchID
                },
                this.props.matchDate,
                " ",
                this.props.frontEndId,
                " ",
                this.props.code,
                " ",
                this.props.homeAndAwayName
            );
        }
    }]);

    return MatcheOddsAllOption;
}(React.Component);

function removeRepeat(date) {
    var mydateSiceThis = "";
    var mydateRes = "";
    var res = [date[0]];
    for (var i = 0; i < date.length; i++) {
        var repeat = false;
        if (pageName != "TQL") {
            mydateSiceThis = date[i].matchDate.split("T")[0];
            for (var j = 0; j < res.length; j++) {
                mydateRes = res[j].matchDate.split("T")[0];
                if (mydateSiceThis == mydateRes) {
                    repeat = true;
                }
            }
        }
        if (!repeat) {
            res.push(date[i]);
        }
    }
    return res;
};

//# sourceURL=/football/lib/AllOddsTable.js
//# sourceMappingURL=AllOddsTable.js.map