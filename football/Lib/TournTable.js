"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function renderCHPTable(data, firstLoad) {

    allTournaments = pushOddsTableTournamentsArr(allTournaments, true);

    selectedTournamentIds = JSON.parse(sessionStorage.getItem("__extendShareSelectedTournsId"));

    if (allTournaments.length > 0) {
        var _tournamentData = void 0;
        try {
            // get CHP list by CHP sub type
            // get all tournaments if chpSubType == 0
            if (chpSubType == '0') {
                allTournaments = _tournamentData = allTournaments;
            } else {
                allTournaments = _tournamentData = getCHPBySubType(allTournaments, chpSubType);
            }

            // set selected tournament as default value when first load
            if (firstLoad && selectedTournamentIds.length == 0 && _tournamentData.length > 0) {
                selectedTournamentIds.push(_tournamentData[0].tournamentID);
            } else {
                //if the selected tournament ids doesn't existing in current tournament list then set default as first element
                var isTournExistCount = jQuery.grep(_tournamentData, function (_singleTourn) {
                    return $.inArray(_singleTourn.tournamentID, selectedTournamentIds) >= 0;
                });
                if (isTournExistCount == 0 && _tournamentData.length > 0) {
                    selectedTournamentIds = [];
                    selectedTournamentIds.push(_tournamentData[0].tournamentID);
                }
            }

            // group tournament by seasons
            selectedTournamentIds = getTournGroupIdsBytName(selectedTournamentIds);
            sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify(selectedTournamentIds));

            _tournamentData = jQuery.grep(_tournamentData, function (_singleTourn) {
                return $.inArray(_singleTourn.tournamentID, selectedTournamentIds) >= 0;
            });

            if (_tournamentData.length > 0) {
                var _activeTable = [];
                // gen tourn table
                _tournamentData.forEach(function (_singleTourn, sid) {
                    _singleTourn = new Tournament(_singleTourn, "ActiveTournaments");
                    if (_singleTourn.chpodds != undefined && _singleTourn.chpodds != null) {
                        var _tournTable = React.createElement(CHPContainer, { singleObj: _singleTourn, key: "dCHP" + _singleTourn.tournamentID, objType: "tournament", tableType: "ActiveTournaments", refStr: "", objID: "" + _singleTourn.tournamentID });
                        _activeTable.push(_tournTable);
                    }
                });

                if (_activeTable.length > 0) {
                    ReactDOM.render(React.createElement(
                        "div",
                        null,
                        React.createElement(TournPoolPageHeader, { tableType: "Active" }),
                        React.createElement(OddsTableDateTournTab, { OddsTableTournaments: data }),
                        _activeTable,
                        React.createElement(AddBetBtn, { position: "footer" })
                    ), document.getElementById("dCHP"), function () {
                        oddsChpTableLoaded();
                    });
                    $('#NoPoolMsg').hide();
                    $('#dCHP').show();
                }
            } else {
                displayNoMatch(true, true);
                $('#dCHP').hide();
            }
        } catch (ex) {
            debugLog("renderCHPTable:" + ex);
        }
    } else {
        displayNoMatch(true, true);
        $('#dCHP').hide();
    }
}

function getCHPBySubType(tournaments, subType) {
    //chpSubType: Champion=null, Finalists=3, Winning Continent=2, Winning Country=1
    return jQuery.grep(tournaments, function (_singleTourn) {

        var _displayOnPage = false;
        if (_singleTourn.chpodds.CHPType == subType) _displayOnPage = true;

        return _displayOnPage;
    });
}

var CHPContainer = function (_React$Component) {
    _inherits(CHPContainer, _React$Component);

    function CHPContainer(props) {
        _classCallCheck(this, CHPContainer);

        var _this = _possibleConstructorReturn(this, (CHPContainer.__proto__ || Object.getPrototypeOf(CHPContainer)).call(this, props));

        _this.state = { hideLSE: true };
        _this.onEliminateBtnClicked = _this.onEliminateBtnClicked.bind(_this);
        return _this;
    }

    _createClass(CHPContainer, [{
        key: "onEliminateBtnClicked",
        value: function onEliminateBtnClicked(event) {
            this.setState({ hideLSE: !this.state.hideLSE });
        }
    }, {
        key: "render",
        value: function render() {
            try {
                var tableType = this.props.tableType;
                var objID = this.props.objID;
                var singleObj = this.props.singleObj;
                var _oddsSet = singleObj["chpodds"];
                var displayEliminateBtn = true;

                var eliminateBtn = React.createElement(EliminateBtn, { display: displayEliminateBtn, hideLSE: this.state.hideLSE, _oddsType: "CHP", objID: objID, onClick: this.onEliminateBtnClicked });

                var innerContent = React.createElement(
                    "div",
                    { className: "oddsCHP" },
                    React.createElement(
                        "div",
                        { id: "dCHPTable" + objID, className: "betTypeAllOdds" },
                        React.createElement(OddsSelectionTourn, { hideLSE: this.state.hideLSE, singleTourn: singleObj, tableType: tableType, key: singleObj.tournamentID + "CHP", oddsType: "CHP", refOdds: "" })
                    )
                );
                var expectedStopSellingTime = void 0;
                //if (pageName == "CHP") {
                expectedStopSellingTime = React.createElement(
                    "div",
                    { className: "right", style: { paddingRight: "5px" } },
                    jsesst1,
                    jsesst2,
                    ":",
                    formatEsstStr(_oddsSet.ExpectedStopTime, true)
                );
                //}
                return React.createElement(OddsTypeOuterTable, { key: "dCHPTable" + objID, _oddsType: oddsType, tableType: tableType, objID: objID, innerContent: innerContent, eliminateBtn: eliminateBtn, expectedStopSellingTime: expectedStopSellingTime });
            } catch (ex) {
                return null;
            }
        }
    }]);

    return CHPContainer;
}(React.Component);

function renderTournTable(data, firstLoad) {
    var keepRefresh = false;
    var displayNoPoolMsg = false;
    //var tournAvailable = (getTournamentLength(data[0]) + getTournamentLength(data[1]))>0;
    var tournAvailable = data != "" && data != undefined;
    var _activeTable = [];
    var _oddtable = [];
    if (tournAvailable) {
        for (var i = 0; i < data.length; i++) {
            var isFirstElement = i == 0 ? true : false;
            var isLastElement = i == data.length - 1 ? true : false;
            var singleTourn = new Tournament(data[i], "ActiveTournaments");
            var _tournID = singleTourn.tournamentID;

            if (singleTourn != null) {
                // odds table
                if (singleTourn.arrPools.length > 0) {
                    _activeTable.push(drawTournamentContainer(singleTourn, "Active", _tournID, isFirstElement, isLastElement));
                }

                singleTourn.arrPools.forEach(function (_oddsType) {
                    var _dataOddsType = _oddsType.toLowerCase();
                    try {
                        // normal odds
                        var _oddsTypeTable;
                        if (_dataOddsType == "tps") {
                            var _allOddsTypeTable = [];
                            for (var k = 0; k < singleTourn[_dataOddsType + "odds"].length; k++) {
                                var _formattedOddsType = _oddsType + (singleTourn[_dataOddsType + "odds"][k].TPSTYPE == "Player" ? "0" : "1");
                                _allOddsTypeTable.push(React.createElement(OddsTypeOuterTable, { key: "d" + _tournID + _formattedOddsType, _oddsType: _formattedOddsType, tableType: "ActiveTournaments", objID: _tournID, refOdds: "", _dataOddsType: _dataOddsType }));
                            }
                            _oddsTypeTable = React.createElement(
                                "div",
                                { key: "dAllTPSContainer", _oddsType: _oddsType, objID: _tournID },
                                _allOddsTypeTable
                            );
                        } else {
                            _oddsTypeTable = React.createElement(OddsTypeOuterTable, { _oddsType: _oddsType, tableType: "ActiveTournaments", objID: _tournID, refOdds: "", _dataOddsType: _dataOddsType });
                        }
                        _oddtable.push(_oddsTypeTable);
                    } catch (ex) {
                        debugLog(_dataOddsType + " " + ex);
                    }
                });
            }
        }

        if (_activeTable.length > 0) {
            ReactDOM.render(React.createElement(
                "div",
                null,
                _activeTable
            ), document.getElementById("dTourn"));
            _oddtable.forEach(function (_singlePool, id) {
                try {
                    ReactDOM.render(React.createElement(
                        "div",
                        null,
                        _singlePool
                    ), document.getElementById("d" + _singlePool.props._oddsType + _singlePool.props.objID));
                } catch (ex) {
                    debugLog(ex);
                }
            });
            $('#NoPoolMsg').hide();
            $('.nopool').hide();
            $('#todds .OddsDetails').show();
            $(".poolDetails").show();
            $('#dTourn').show();
        } else {
            displayNoMatch(true, true);
            $('#dTourn').hide();
        }
        keepRefresh = true;
    } else {
        displayNoMatch(true, true);
        $('#dTourn').hide();
    }
    return keepRefresh;
}

// Tourn Page Header

var TournPoolPageHeader = function (_React$Component2) {
    _inherits(TournPoolPageHeader, _React$Component2);

    function TournPoolPageHeader() {
        _classCallCheck(this, TournPoolPageHeader);

        return _possibleConstructorReturn(this, (TournPoolPageHeader.__proto__ || Object.getPrototypeOf(TournPoolPageHeader)).apply(this, arguments));
    }

    _createClass(TournPoolPageHeader, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "oHeader" },
                React.createElement(
                    "div",
                    { className: "tblHeader" },
                    React.createElement(
                        "div",
                        { className: "normalheader" },
                        React.createElement(
                            "div",
                            { className: "left" },
                            React.createElement(
                                "span",
                                { className: "cDelim" },
                                React.createElement("img", { src: "/info/include/images/stroke_yellow.gif" + cacheVersion, alt: "", title: "" })
                            ),
                            formatOddsHeader(pageName, this.props.tableType, "", "")
                        ),
                        this.props.tableType == "NoMatch" ? null : React.createElement(
                            "div",
                            { className: "right" },
                            React.createElement(
                                "span",
                                null,
                                React.createElement(
                                    "a",
                                    { className: "cActionsPrint", href: "javascript:printNow('" + location.pathname + location.search + "&pv=1');" },
                                    jsprintdata
                                ),
                                React.createElement(
                                    "a",
                                    { className: "spiconPrint" },
                                    React.createElement(
                                        "span",
                                        { className: "spicon" },
                                        React.createElement("img", { src: "/info/include/images/icon_print.gif" + cacheVersion, className: "pointer icon", onClick: function onClick() {
                                                printNow("" + location.pathname + location.search + "&pv=1");
                                            }, alt: jsprintdata, title: jsprintdata })
                                    )
                                ),
                                React.createElement(
                                    "a",
                                    { className: "nolnk" },
                                    jsrefreshat,
                                    ":",
                                    React.createElement("label", { id: "sRefreshTime" })
                                ),
                                React.createElement(
                                    "a",
                                    { className: "refresh", href: "javascript:refreshOddsPage();" },
                                    jsrefresh
                                ),
                                React.createElement(
                                    "a",
                                    { className: "refresh" },
                                    React.createElement(
                                        "span",
                                        { className: "spicon" },
                                        React.createElement("img", { src: "/info/include/images/icon_refresh.gif" + cacheVersion, className: "pointer icon", alt: jsrefresh, title: jsrefresh, onClick: function onClick() {
                                                refreshOddsPage();
                                            } })
                                    )
                                )
                            ),
                            React.createElement(AddBetBtn, null)
                        )
                    )
                )
            );
        }
    }]);

    return TournPoolPageHeader;
}(React.Component);

function renderTQLTable(data, firstLoad) {
    allTournaments = pushOddsTableTournamentsArr(allTournaments, true);
    selectedTournamentIds = JSON.parse(sessionStorage.getItem("__extendShareSelectedTournsId"));

    if (allTournaments.length > 0) {
        var _tournamentData = allTournaments;
        try {
            // set selected tournament as default value when first load
            if (firstLoad && selectedTournamentIds.length == 0 && _tournamentData.length > 0) {
                selectedTournamentIds.push(_tournamentData[0].tournamentID);

                pushHistoryAfterTabChange(selectedTournamentIds[0], true);
            } else {
                //if the selected tournament ids doesn't existing in current tournament list then set default as first element
                var isTournExistCount = jQuery.grep(_tournamentData, function (_singleTourn) {
                    return $.inArray(_singleTourn.tournamentID, selectedTournamentIds) >= 0;
                });
                if (isTournExistCount == 0 && _tournamentData.length > 0) {
                    selectedTournamentIds = [];
                    selectedTournamentIds.push(_tournamentData[0].tournamentID);
                }
            }

            // group tournament by seasons
            selectedTournamentIds = getTournGroupIdsBytName(selectedTournamentIds);
            sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify(selectedTournamentIds));

            _tournamentData = jQuery.grep(_tournamentData, function (_singleTourn) {
                return $.inArray(_singleTourn.tournamentID, selectedTournamentIds) >= 0;
            });

            totalMatch = 0;
            _tournamentData.forEach(function (singleTourn, tournIndex) {
                totalMatch += singleTourn.tqlodds.length;
            });
            startMatch = (curPage - 1) * maxMatch;
            endMatch = startMatch + maxMatch;
            endMatch = endMatch > totalMatch ? totalMatch : endMatch;

            // extract the TQL rows of curPage
            var tmpTQLData = [];
            var cnt = 0;
            _tournamentData.forEach(function (singleTourn, tournIndex) {
                var tmpOdds = [];
                for (var i = 0; i < singleTourn.tqlodds.length; i++) {
                    if (cnt >= startMatch && cnt < endMatch) {
                        tmpOdds.push(singleTourn.tqlodds[i]);
                    }
                    cnt++;
                }
                if (tmpOdds.length > 0) {
                    var tmpTourn = $.extend(true, {}, singleTourn);
                    tmpTourn.tqlodds = tmpOdds;
                    tmpTQLData.push(tmpTourn);
                }
            });

            if (tmpTQLData.length > 0) {
                var _activeTable = [];

                // gen tourn table
                tmpTQLData.forEach(function (_singleTourn, sid) {
                    _singleTourn = new Tournament(_singleTourn, "ActiveTournaments");
                    var _tournTable = React.createElement(TQLContainer, { singleObj: _singleTourn, key: "dTQL" + _singleTourn.tournamentID, objID: "" + _singleTourn.tournamentID });
                    _activeTable.push(_tournTable);
                });

                if (_activeTable.length > 0) {
                    ReactDOM.render(React.createElement(
                        "div",
                        null,
                        React.createElement(TournPoolPageHeader, { tableType: "Active" }),
                        React.createElement(OddsTableDateTournTab, { OddsTableTournaments: data }),
                        React.createElement(PageInfo, { type: "header" }),
                        React.createElement(ColumnTitle, { poolType: "TQL" }),
                        _activeTable,
                        React.createElement(AddBetBtn, { position: "footer" }),
                        React.createElement(PageInfo, { type: "footer" })
                    ), document.getElementById("ActiveMatchesOdds"), function () {
                        oddsChpTableLoaded();
                    });
                    $('#NoPoolMsg').hide();
                }
            } else {
                displayNoMatch(true, true);
            }
        } catch (ex) {
            debugLog("renderTQLTable:" + ex);
        }
    } else {
        displayNoMatch(true, true);
    }
}

var TQLContainer = function (_React$Component3) {
    _inherits(TQLContainer, _React$Component3);

    function TQLContainer() {
        _classCallCheck(this, TQLContainer);

        return _possibleConstructorReturn(this, (TQLContainer.__proto__ || Object.getPrototypeOf(TQLContainer)).apply(this, arguments));
    }

    _createClass(TQLContainer, [{
        key: "render",
        value: function render() {
            try {
                var objID = this.props.objID;
                var singleObj = this.props.singleObj;
                var _tournID = singleObj.tournamentID;
                var _oddsSet = singleObj.tqlodds;

                var allTQLRows = [];
                var altRow = 1;
                _oddsSet.forEach(function (_singleOddsSet, _ind) {
                    var _React$createElement;

                    allTQLRows.push(React.createElement(MatchTournTQLRow, (_React$createElement = { altRow: altRow % 2, key: _tournID + "_TQL_" + _ind }, _defineProperty(_React$createElement, "altRow", altRow % 2), _defineProperty(_React$createElement, "oddsType", "TQL"), _defineProperty(_React$createElement, "tournID", _tournID), _defineProperty(_React$createElement, "oddsSet", _singleOddsSet), _defineProperty(_React$createElement, "tableType", "ActiveTournaments"), _React$createElement)));
                    altRow++;
                });

                var innerContent = React.createElement(
                    "div",
                    { className: "oddsTQL" },
                    React.createElement(
                        "div",
                        { id: "dTQLTable" + objID, className: "betTypeAllOdds" },
                        React.createElement(
                            "div",
                            { key: _tournID + "TQL_Sel" },
                            allTQLRows
                        )
                    )
                );

                return React.createElement(OddsTypeOuterTable, { key: "dTQLTable" + objID, _oddsType: "TQL", tableType: "ActiveTournaments", objID: objID, innerContent: innerContent });
            } catch (ex) {
                return null;
            }
        }
    }]);

    return TQLContainer;
}(React.Component);

function renderCHPResults() {
    var filterJson = [];
    for (var i = 0; i < champJson.length; i++) {
        var poolObj = champJson[i].poolCHP;
        if (daydiff(new Date(poolObj.lastConcludedTS), new Date(parseInt(new Date().getTime(), 10) + parseInt(jsOffsetTime) * 1000)) < parseInt(chpDaysResult)) {
            filterJson.push(champJson[i]);
        }
    }

    ReactDOM.render(React.createElement(CHPResultsTable, { chpJson: filterJson }), document.getElementById('chpRes'));
    return false;
}

var CHPResultsTable = function (_React$Component4) {
    _inherits(CHPResultsTable, _React$Component4);

    function CHPResultsTable(props) {
        _classCallCheck(this, CHPResultsTable);

        return _possibleConstructorReturn(this, (CHPResultsTable.__proto__ || Object.getPrototypeOf(CHPResultsTable)).call(this, props));
    }

    _createClass(CHPResultsTable, [{
        key: "render",
        value: function render() {
            var tmpBody = [];
            if (this.props.chpJson.length == 0) {
                tmpBody.push(React.createElement(
                    "div",
                    { className: "chpRes", style: { width: "100%" } },
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement(
                        "p",
                        { style: { textAlign: "center", color: "#CC0000" } },
                        jsnoresultannounced
                    ),
                    React.createElement("br", null),
                    React.createElement("br", null)
                ));
            } else {
                tmpBody.push(React.createElement(
                    "div",
                    { className: "tableRow" },
                    React.createElement(
                        "div",
                        { className: "tableContentHead tableCell", style: { width: "15%" } },
                        jsoddstable_eventid
                    ),
                    React.createElement(
                        "div",
                        { className: "tableContentHead tableCell", style: { width: "10%" } },
                        React.createElement(
                            "a",
                            { href: "javascript:goFlagUrl();" },
                            React.createElement("img", { src: "/football/info/images/icon_flag.gif" + cacheVersion, alt: jsleagues_and_tournaments, title: jsleagues_and_tournaments })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "tableContentHead tableCell", style: { width: "30%" } },
                        jstournamentname
                    ),
                    React.createElement(
                        "div",
                        { className: "tableContentHead tableCell", style: { width: "45%" } },
                        jswinningteam
                    )
                ));

                for (var i in this.props.chpJson) {
                    var cJson = this.props.chpJson[i];
                    var poolObj = cJson.poolCHP;
                    var _resultTxt = void 0;
                    if (poolObj.refund == "1") {
                        _resultTxt = React.createElement(
                            "div",
                            { className: "refund center" },
                            jsrefundforall
                        );
                    } else {
                        _resultTxt = React.createElement(
                            "span",
                            null,
                            React.createElement(
                                "span",
                                { style: { width: "30px", display: "inline-block" } },
                                poolObj.sel.num
                            ),
                            curLang == "ch" ? poolObj.sel.nameC : poolObj.sel.nameE
                        );
                    }

                    var _tournName = curLang == "ch" ? cJson.tournNameC : cJson.tournNameE;
                    tmpBody.push(React.createElement(
                        "div",
                        { className: "couponRow tableRow rAlt" + i % 2 },
                        React.createElement(
                            "div",
                            { className: "tableCell", style: { width: "15%" } },
                            cJson.tournNum
                        ),
                        React.createElement(
                            "div",
                            { className: "tableCell", style: { width: "10%" } },
                            formatTournFlag(cJson.tournCode, _tournName)
                        ),
                        React.createElement(
                            "div",
                            { className: "tableCell", style: { width: "30%" } },
                            _tournName
                        ),
                        React.createElement(
                            "div",
                            { className: "tableCell", style: { width: "45%" } },
                            _resultTxt
                        )
                    ));
                }
            }

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "fbGenHeader" },
                    React.createElement(
                        "div",
                        { className: "left" },
                        React.createElement(
                            "span",
                            { className: "cDelim" },
                            React.createElement("img", { src: "/info/include/images/stroke_yellow.gif" + cacheVersion, alt: "", title: "" })
                        ),
                        jschpresults
                    ),
                    React.createElement(
                        "div",
                        { className: "right divCalPrint text-left", onClick: function onClick() {
                                window.print();
                            }, title: jsprintdata },
                        jsprintdata
                    ),
                    React.createElement("div", { style: { clear: "both" } })
                ),
                React.createElement(
                    "div",
                    { id: "chpResult", className: "table tblResults" },
                    tmpBody
                )
            );
        }
    }]);

    return CHPResultsTable;
}(React.Component);

var tmpData;
function renderTournResults() {
    ReactDOM.render(React.createElement(TournResultsTable, null), document.getElementById('tournResultsDiv'));
    return false;
}

var TournResultsTable = function (_React$Component5) {
    _inherits(TournResultsTable, _React$Component5);

    function TournResultsTable(props) {
        _classCallCheck(this, TournResultsTable);

        var _this5 = _possibleConstructorReturn(this, (TournResultsTable.__proto__ || Object.getPrototypeOf(TournResultsTable)).call(this, props));

        _this5.state = {
            expandCHP: true,
            expandTQL: true,
            expandGPW: true,
            expandGPF: true,
            expandTPS: true,
            expandTST: true,
            expandTSP: true
        };
        return _this5;
    }

    _createClass(TournResultsTable, [{
        key: "render",
        value: function render() {
            var _this6 = this;

            var curTournID = getParameterByName("tournid");
            var _pools = pools.split(',');
            var tourn = $.grep(tournJson, function (_obj) {
                return _obj.tournId == curTournID;
            })[0];
            if (tourn == null) {
                $('.noinfo').show();
                return React.createElement(
                    "span",
                    null,
                    jstournamentno,
                    " :"
                );
            }

            var _tournName = curLang == "ch" ? tourn.tournNameC : tourn.tournNameE;
            var _tournTitle = React.createElement(
                "span",
                null,
                tourn.tournNum,
                " ",
                formatTournFlag(tourn.tournCode, _tournName),
                " ",
                _tournName
            );

            var cellStyle = ["oddsContent2", "oddsContent1"];
            var tmpBody = [];

            for (var i = 0; i < _pools.length; i++) {
                var _poolType = _pools[i].toUpperCase();
                var _pool = tourn["pool" + _poolType];
                if (_pool == null) continue;

                // render CHP
                if (_poolType == "CHP") {
                    tmpBody.push(React.createElement(
                        "div",
                        { style: { marginTop: "5px" }, className: "tgAlupCalCoupon", id: "divCalCoupon", onClick: function onClick() {
                                _this6.setState({ expandCHP: !_this6.state.expandCHP });
                            } },
                        React.createElement("span", { className: this.state.expandCHP ? "spBtnMinus" : "spBtnPlus" }),
                        React.createElement(
                            "span",
                            { style: { fontWeight: "bold" } },
                            jsCHP
                        )
                    ));

                    if (this.state.expandCHP) {
                        var winStr = "";
                        var _selRefund = [];
                        var _pool2 = tourn.poolCHP;
                        if (_pool2.refund == "1") {
                            winStr = React.createElement(
                                "span",
                                { className: "refundAll" },
                                jsrefundforall
                            );
                        } else {
                            winStr = _pool2.sel.num + ' ' + (curLang == "en" ? _pool2.sel.nameE : _pool2.sel.nameC);
                            var rfdArr = _pool2.rfdSels;
                            for (var _i = 0; _i < rfdArr.length; _i++) {
                                _selRefund.push(React.createElement(
                                    "div",
                                    null,
                                    rfdArr[_i].num,
                                    " ",
                                    curLang == "en" ? rfdArr[_i].nameE : rfdArr[_i].nameC
                                ));
                            }
                        }

                        tmpBody.push(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                { className: "contHead table" },
                                React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    jswinningteam
                                ),
                                _selRefund.length > 0 ? React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    jsRFD
                                ) : null
                            ),
                            React.createElement(
                                "div",
                                { className: "table tournCont center" },
                                React.createElement(
                                    "div",
                                    { className: "tableRow oddsContent2" },
                                    React.createElement(
                                        "div",
                                        { className: "tableCell" },
                                        winStr
                                    ),
                                    _selRefund.length > 0 ? React.createElement(
                                        "div",
                                        { className: "tableCell" },
                                        _selRefund
                                    ) : null
                                )
                            )
                        ));
                    }
                }

                // render TQL
                if (_poolType == "TQL" && tourn.poolTQL.length > 0) {
                    tmpBody.push(React.createElement(
                        "div",
                        { style: { marginTop: "5px" }, className: "tgAlupCalCoupon", id: "divCalCoupon", onClick: function onClick() {
                                _this6.setState({ expandTQL: !_this6.state.expandTQL });
                            } },
                        React.createElement("span", { className: this.state.expandTQL ? "spBtnMinus" : "spBtnPlus" }),
                        React.createElement(
                            "span",
                            { style: { fontWeight: "bold" } },
                            jsTQL
                        )
                    ));

                    if (this.state.expandTQL) {
                        var showRefundCol = false;
                        $(tourn.poolTQL).each(function (i) {
                            if (this.rfdSels.length > 0 && this.refund != "1") {
                                showRefundCol = true;
                            }
                        });
                        var tqlBody = [];
                        for (var j = 0; j < tourn.poolTQL.length; j++) {
                            var _pool3 = tourn.poolTQL[j];
                            var _winStr = [];
                            var _selRefund2 = [];
                            if (_pool3.refund == "1") {
                                _winStr = React.createElement(
                                    "span",
                                    { className: "refundAll" },
                                    jsrefundforall
                                );
                            } else {
                                _winStr = _pool3.sel1.num + ' ' + (curLang == "en" ? _pool3.sel1.nameE : _pool3.sel1.nameC);
                                var _rfdArr = _pool3.rfdSels;
                                for (var _i2 = 0; _i2 < _rfdArr.length; _i2++) {
                                    _selRefund2.push(React.createElement(
                                        "div",
                                        null,
                                        _rfdArr[_i2].num,
                                        " ",
                                        curLang == "en" ? _rfdArr[_i2].nameE : _rfdArr[_i2].nameC
                                    ));
                                }
                            }
                            tqlBody.push(React.createElement(
                                "div",
                                { className: "tableRow " + cellStyle[j % 2] },
                                React.createElement(
                                    "div",
                                    { className: "tableCell center" },
                                    _pool3.sel.num
                                ),
                                React.createElement(
                                    "div",
                                    { className: "tableCell center" },
                                    _winStr
                                ),
                                showRefundCol ? React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    _selRefund2
                                ) : null
                            ));
                        }

                        tmpBody.push(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                { className: "contHead table" },
                                React.createElement(
                                    "div",
                                    { style: { width: "auto" }, className: "tableCell" },
                                    jsTQLCode
                                ),
                                React.createElement(
                                    "div",
                                    { style: { width: "auto" }, className: "tableCell" },
                                    jsqualifiedTeam
                                ),
                                showRefundCol ? React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    jsRFD
                                ) : null
                            ),
                            React.createElement(
                                "div",
                                { className: "table tournCont" },
                                tqlBody
                            )
                        ));
                    }
                }

                // render GPW
                if (_poolType == "GPW" && tourn.poolGPW.length > 0) {
                    tmpBody.push(React.createElement(
                        "div",
                        { style: { marginTop: "5px" }, className: "tgAlupCalCoupon", id: "divCalCoupon", onClick: function onClick() {
                                _this6.setState({ expandGPW: !_this6.state.expandGPW });
                            } },
                        React.createElement("span", { className: this.state.expandGPW ? "spBtnMinus" : "spBtnPlus" }),
                        React.createElement(
                            "span",
                            { style: { fontWeight: "bold" } },
                            jsGPW
                        )
                    ));

                    if (this.state.expandGPW) {
                        var _showRefundCol = false;
                        $(tourn.poolGPW).each(function (i) {
                            if (this.rfdSels.length > 0) {
                                _showRefundCol = true;
                            }
                        });
                        var gpwBody = [];
                        for (var j = 0; j < tourn.poolGPW.length; j++) {
                            var _pool4 = tourn.poolGPW[j];
                            var _winStr2 = [];
                            var _selRefund3 = [];
                            if (_pool4.refund == "1") {
                                _winStr2 = React.createElement(
                                    "span",
                                    { className: "refundAll" },
                                    jsrefundforall
                                );
                            } else {
                                _winStr2 = _pool4.sel1.num + ' ' + (curLang == "en" ? _pool4.sel1.nameE : _pool4.sel1.nameC);
                                var _rfdArr2 = _pool4.rfdSels;
                                for (var _i3 = 0; _i3 < _rfdArr2.length; _i3++) {
                                    _selRefund3.push(React.createElement(
                                        "div",
                                        null,
                                        _rfdArr2[_i3].num,
                                        " ",
                                        curLang == "en" ? _rfdArr2[_i3].nameE : _rfdArr2[_i3].nameC
                                    ));
                                }
                            }
                            gpwBody.push(React.createElement(
                                "div",
                                { className: "tableRow " + cellStyle[j % 2] },
                                React.createElement(
                                    "div",
                                    { className: "grpNo tableCell" },
                                    _pool4.sel.num
                                ),
                                React.createElement(
                                    "div",
                                    { className: "grpName tableCell" },
                                    curLang == "en" ? _pool4.sel.nameE : _pool4.sel.nameC
                                ),
                                React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    _winStr2
                                ),
                                _showRefundCol ? React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    _selRefund3
                                ) : null
                            ));
                        }

                        tmpBody.push(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                { className: "contHead table" },
                                React.createElement(
                                    "div",
                                    { className: "grpNo tableCell" },
                                    jsgroupno
                                ),
                                React.createElement(
                                    "div",
                                    { className: "grpName tableCell" },
                                    jsgroup
                                ),
                                React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    jsgpwwinner
                                ),
                                _showRefundCol ? React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    jsRFD
                                ) : null
                            ),
                            React.createElement(
                                "div",
                                { className: "table tournCont" },
                                gpwBody
                            )
                        ));
                    }
                }

                // render GPF
                if (_poolType == "GPF" && tourn.poolGPF.length > 0) {
                    tmpBody.push(React.createElement(
                        "div",
                        { style: { marginTop: "5px" }, className: "tgAlupCalCoupon", id: "divCalCoupon", onClick: function onClick() {
                                _this6.setState({ expandGPF: !_this6.state.expandGPF });
                            } },
                        React.createElement("span", { className: this.state.expandGPF ? "spBtnMinus" : "spBtnPlus" }),
                        React.createElement(
                            "span",
                            { style: { fontWeight: "bold" } },
                            jsGPF
                        )
                    ));

                    if (this.state.expandGPF) {
                        var _showRefundCol2 = false;
                        $(tourn.poolGPF).each(function (i) {
                            if (this.rfdSels.length > 0) {
                                _showRefundCol2 = true;
                            }
                        });
                        var gpfBody = [];
                        for (var j = 0; j < tourn.poolGPF.length; j++) {
                            var _pool5 = tourn.poolGPF[j];
                            var _winStr3 = [];
                            var runnerupStr = [];
                            var _selRefund4 = [];
                            if (_pool5.refund == "1") {
                                _winStr3 = React.createElement(
                                    "span",
                                    { className: "refundAll" },
                                    jsrefundforall
                                );
                            } else {
                                _winStr3 = _pool5.sel1.num + ' ' + (curLang == "en" ? _pool5.sel1.nameE : _pool5.sel1.nameC);
                                runnerupStr = _pool5.sel2.num + ' ' + (curLang == "en" ? _pool5.sel2.nameE : _pool5.sel2.nameC);
                                var _rfdArr3 = _pool5.rfdSels;
                                for (var _i4 = 0; _i4 < _rfdArr3.length; _i4++) {
                                    _selRefund4.push(React.createElement(
                                        "div",
                                        null,
                                        _rfdArr3[_i4].num,
                                        " ",
                                        curLang == "en" ? _rfdArr3[_i4].nameE : _rfdArr3[_i4].nameC
                                    ));
                                }
                            }
                            gpfBody.push(React.createElement(
                                "div",
                                { className: "tableRow " + cellStyle[j % 2] },
                                React.createElement(
                                    "div",
                                    { className: "grpNo tableCell" },
                                    _pool5.sel.num
                                ),
                                React.createElement(
                                    "div",
                                    { className: "grpName tableCell" },
                                    curLang == "en" ? _pool5.sel.nameE : _pool5.sel.nameC
                                ),
                                React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    _winStr3
                                ),
                                React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    runnerupStr
                                ),
                                _showRefundCol2 ? React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    _selRefund4
                                ) : null
                            ));
                        }

                        tmpBody.push(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                { className: "contHead table" },
                                React.createElement(
                                    "div",
                                    { className: "grpNo tableCell" },
                                    jsgroupno
                                ),
                                React.createElement(
                                    "div",
                                    { className: "grpName tableCell" },
                                    jsgroup
                                ),
                                React.createElement(
                                    "div",
                                    { className: "cotitle tableCell" },
                                    React.createElement(
                                        "div",
                                        { className: "rBottomBorder" },
                                        jswinningcombination
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "table" },
                                        React.createElement(
                                            "span",
                                            { className: "codds r2" },
                                            jswinner
                                        ),
                                        React.createElement(
                                            "span",
                                            { className: "codds r2" },
                                            jsrunnerup
                                        )
                                    )
                                ),
                                _showRefundCol2 ? React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    jsRFD
                                ) : null
                            ),
                            React.createElement(
                                "div",
                                { className: "table tournCont" },
                                gpfBody
                            )
                        ));
                    }
                }

                // render TPS
                if (_poolType == "TPS") {
                    tmpBody.push(React.createElement(
                        "div",
                        { style: { marginTop: "5px" }, className: "tgAlupCalCoupon", id: "divCalCoupon", onClick: function onClick() {
                                _this6.setState({ expandTPS: !_this6.state.expandTPS });
                            } },
                        React.createElement("span", { className: this.state.expandTPS ? "spBtnMinus" : "spBtnPlus" }),
                        React.createElement(
                            "span",
                            { style: { fontWeight: "bold" } },
                            jsTPS
                        )
                    ));

                    if (this.state.expandTPS) {
                        var _winStr4 = [];
                        var _selRefund5 = [];
                        var _pool6 = tourn.poolTPS;
                        if (_pool6.refund == "1") {
                            _winStr4 = React.createElement(
                                "span",
                                { className: "refundAll" },
                                jsrefundforall
                            );
                        } else {
                            var winArr = _pool6.winSels;
                            if (winArr != null) {
                                for (var _i5 = 0; _i5 < winArr.length; _i5++) {
                                    _winStr4.push(React.createElement(
                                        "div",
                                        null,
                                        winArr[_i5].num,
                                        " ",
                                        curLang == "en" ? winArr[_i5].nameE : winArr[_i5].nameC
                                    ));
                                }
                            }
                            var _rfdArr4 = _pool6.rfdSels;
                            for (var _i6 = 0; _i6 < _rfdArr4.length; _i6++) {
                                _selRefund5.push(React.createElement(
                                    "div",
                                    null,
                                    _rfdArr4[_i6].num,
                                    " ",
                                    curLang == "en" ? _rfdArr4[_i6].nameE : _rfdArr4[_i6].nameC
                                ));
                            }
                        }

                        tmpBody.push(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                { className: "contHead table" },
                                React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    jsTPS
                                ),
                                _selRefund5.length > 0 ? React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    jsRFD
                                ) : null
                            ),
                            React.createElement(
                                "div",
                                { className: "table tournCont center" },
                                React.createElement(
                                    "div",
                                    { className: "tableRow oddsContent2" },
                                    React.createElement(
                                        "div",
                                        { className: "tableCell" },
                                        _winStr4
                                    ),
                                    _selRefund5.length > 0 ? React.createElement(
                                        "div",
                                        { className: "tableCell" },
                                        _selRefund5
                                    ) : null
                                )
                            )
                        ));
                    }
                }

                // render TST
                if (_poolType == "TST") {
                    tmpBody.push(React.createElement(
                        "div",
                        { style: { marginTop: "5px" }, className: "tgAlupCalCoupon", id: "divCalCoupon", onClick: function onClick() {
                                _this6.setState({ expandTST: !_this6.state.expandTST });
                            } },
                        React.createElement("span", { className: this.state.expandTST ? "spBtnMinus" : "spBtnPlus" }),
                        React.createElement(
                            "span",
                            { style: { fontWeight: "bold" } },
                            jsTST
                        )
                    ));

                    if (this.state.expandTST) {
                        var _winStr5 = [];
                        var _selRefund6 = [];
                        var _pool7 = tourn.poolTST;
                        if (_pool7.refund == "1") {
                            _winStr5 = React.createElement(
                                "span",
                                { className: "refundAll" },
                                jsrefundforall
                            );
                        } else {
                            var _winArr = _pool7.winSels;
                            if (_winArr != null) {
                                for (var _i7 = 0; _i7 < _winArr.length; _i7++) {
                                    _winStr5.push(React.createElement(
                                        "div",
                                        null,
                                        _winArr[_i7].num,
                                        " ",
                                        curLang == "en" ? _winArr[_i7].nameE : _winArr[_i7].nameC
                                    ));
                                }
                            }
                            var _rfdArr5 = _pool7.rfdSels;
                            for (var _i8 = 0; _i8 < _rfdArr5.length; _i8++) {
                                _selRefund6.push(React.createElement(
                                    "div",
                                    null,
                                    _rfdArr5[_i8].num,
                                    " ",
                                    curLang == "en" ? _rfdArr5[_i8].nameE : _rfdArr5[_i8].nameC
                                ));
                            }
                        }

                        tmpBody.push(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                { className: "contHead table" },
                                React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    jswinningteam
                                ),
                                _selRefund6.length > 0 ? React.createElement(
                                    "div",
                                    { className: "tableCell" },
                                    jsRFD
                                ) : null
                            ),
                            React.createElement(
                                "div",
                                { className: "table tournCont center" },
                                React.createElement(
                                    "div",
                                    { className: "tableRow oddsContent2" },
                                    React.createElement(
                                        "div",
                                        { className: "tableCell" },
                                        _winStr5
                                    ),
                                    _selRefund6.length > 0 ? React.createElement(
                                        "div",
                                        { className: "tableCell" },
                                        _selRefund6
                                    ) : null
                                )
                            )
                        ));
                    }
                }

                // render TSP
                if (_poolType == "TSP" && tourn.poolTSP.length > 0) {
                    tmpBody.push(React.createElement(
                        "div",
                        { style: { marginTop: "5px" }, className: "tgAlupCalCoupon", id: "divCalCoupon", onClick: function onClick() {
                                _this6.setState({ expandTSP: !_this6.state.expandTSP });
                            } },
                        React.createElement("span", { className: this.state.expandTSP ? "spBtnMinus" : "spBtnPlus" }),
                        React.createElement(
                            "span",
                            { style: { fontWeight: "bold" } },
                            jsSPC
                        )
                    ));

                    if (this.state.expandTSP) {
                        var tspBody = [];
                        for (var j = 0; j < tourn.poolTSP.length; j++) {
                            var _pool8 = tourn.poolTSP[j];
                            var _winStr6 = [];
                            if (_pool8.refund == "1") {
                                _winStr6 = React.createElement(
                                    "span",
                                    { className: "refundAll" },
                                    jsrefundforall
                                );
                            } else {
                                var _winArr2 = _pool8.winSels;
                                if (_winArr2 != null) {
                                    for (var _i9 = 0; _i9 < _winArr2.length; _i9++) {
                                        _winStr6.push(React.createElement(
                                            "div",
                                            null,
                                            "(",
                                            _winArr2[_i9].num,
                                            ") ",
                                            curLang == "en" ? _winArr2[_i9].nameE : _winArr2[_i9].nameC
                                        ));
                                    }
                                }
                                var _rfdArr6 = _pool8.rfdSels;
                                for (var _i10 = 0; _i10 < _rfdArr6.length; _i10++) {
                                    _winStr6.push(React.createElement(
                                        "div",
                                        null,
                                        "(",
                                        _rfdArr6[_i10].num,
                                        ") ",
                                        curLang == "en" ? _rfdArr6[_i10].nameE : _rfdArr6[_i10].nameC,
                                        React.createElement(
                                            "span",
                                            { className: "refund" },
                                            " - ",
                                            jsRFD
                                        )
                                    ));
                                }
                            }
                            tspBody.push(React.createElement(
                                "div",
                                { className: "tableRow " + cellStyle[j % 2] },
                                React.createElement(
                                    "div",
                                    { className: "tableCell spcNo center" },
                                    _pool8.sel.num
                                ),
                                React.createElement(
                                    "div",
                                    { className: "tableCell spcQuestion center" },
                                    curLang == "en" ? _pool8.sel.nameE : _pool8.sel.nameC
                                ),
                                React.createElement(
                                    "div",
                                    { className: "tableCell spcAnswer" },
                                    _winStr6
                                )
                            ));
                        }

                        tmpBody.push(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                { className: "contHead table" },
                                React.createElement(
                                    "div",
                                    { className: "tableCell spcNo center" },
                                    jsitemno
                                ),
                                React.createElement(
                                    "div",
                                    { className: "tableCell spcQuestion center" },
                                    jsitem
                                ),
                                React.createElement(
                                    "div",
                                    { className: "tableCell spcAnswer" },
                                    jsresults
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "table tournCont" },
                                tspBody
                            )
                        ));
                    }
                }
            }

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "fbGenHeader" },
                    React.createElement(
                        "div",
                        { style: { float: "left", fontWeight: "bold" } },
                        _tournTitle
                    ),
                    React.createElement(
                        "div",
                        { style: { float: "right" }, className: "divCalPrint", onClick: function onClick() {
                                window.print();
                            }, title: jsprintdata },
                        jsprintdata
                    ),
                    React.createElement("div", { style: { clear: "both" } })
                ),
                tmpBody
            );
        }
    }]);

    return TournResultsTable;
}(React.Component);

var OddsSelectionTourn = function (_React$Component6) {
    _inherits(OddsSelectionTourn, _React$Component6);

    function OddsSelectionTourn() {
        _classCallCheck(this, OddsSelectionTourn);

        return _possibleConstructorReturn(this, (OddsSelectionTourn.__proto__ || Object.getPrototypeOf(OddsSelectionTourn)).apply(this, arguments));
    }

    _createClass(OddsSelectionTourn, [{
        key: "render",
        value: function render() {
            try {
                var _singleTourn = this.props.singleTourn;
                var _tournID = pageName == "INPLAYALL" ? _singleTourn.matchIDinofficial : _singleTourn.tournamentID;
                if (_tournID == null) {
                    _tournID = _singleTourn.tournament.tournamentID;
                }
                var _oddsType = this.props.oddsType;
                var _oddsSet = _singleTourn[_oddsType.toLowerCase() + "odds" + this.props.refOdds];
                var _tableType = this.props.tableType;
                var _rowClasses = "coddsSelections";
                var _lineNum = 0;
                var hideLSE = this.props.hideLSE;

                var isExpanded = false;
                if (_oddsType == "GPW") {
                    var allSelections = [];
                    var allGroupSelections = [];
                    var maxLengthOfGroup = 0;

                    var tmpOddsSet = _oddsSet;

                    tmpOddsSet.forEach(function (_singleOddsSet, _ind) {
                        var groupSelections = [];
                        _singleOddsSet.SELLIST.forEach(function (item, _sInd) {
                            var validItem = true;
                            if (hideLSE) {
                                if (item.ODDS.indexOf("LSE") >= 0) {
                                    validItem = false;
                                }
                            }
                            if (validItem) {
                                _lineNum = _singleOddsSet.GROUP + "_" + item.SEL;
                                groupSelections.push(React.createElement(
                                    "div",
                                    { className: "gpwSelectionCells", key: _oddsType + "_LINE_" + _lineNum },
                                    React.createElement(
                                        "div",
                                        { className: "rRightWhiteBorder" },
                                        formatOddsSelection(_oddsType, _tournID, item, "ODDS", _lineNum, _tableType, isExpanded, _singleOddsSet.POOLID)
                                    ),
                                    React.createElement(
                                        "div",
                                        null,
                                        React.createElement(OddsCell, { key: "" + _tournID + _oddsType + _lineNum + "OC", rkey: "" + _tournID + _oddsType + _lineNum + "OC", _oddsType: _oddsType, _matchID: _tournID, oddsSet: item, checkboxType: "ODDS", lineNum: "" + _lineNum, _tableType: _tableType, poolStatus: _singleOddsSet.POOLSTATUS, isAllup: _singleOddsSet.ALLUP, poolId: _singleOddsSet.POOLID })
                                    )
                                ));
                            }
                        });
                        allGroupSelections[_ind] = [];
                        allGroupSelections[_ind].push(React.createElement(
                            "div",
                            { className: "gpwHead rBottomBorder", title: jsLang === "CH" ? _singleOddsSet.GROUPCH : _singleOddsSet.GROUPEN, key: _oddsType + "_GRPNAME_" + _singleOddsSet.GROUP },
                            React.createElement(
                                "div",
                                null,
                                jsLang === "CH" ? _singleOddsSet.GROUPCH : _singleOddsSet.GROUPEN,
                                " / ",
                                jsgroupno,
                                ": ",
                                _singleOddsSet.GROUP
                            )
                        ));
                        allGroupSelections[_ind].push(React.createElement(
                            "div",
                            { className: "gpwHead rBottomBorder", key: _oddsType + "_CLOSEDATE_" + _singleOddsSet.GROUP },
                            React.createElement(
                                "div",
                                null,
                                _singleOddsSet.ExpectedStopTime != "" ? jsesst1 : null,
                                _singleOddsSet.ExpectedStopTime != "" ? jsesst2 : null,
                                " ",
                                React.createElement("br", null),
                                _singleOddsSet.ExpectedStopTime != "" ? formatEsstStr(_singleOddsSet.ExpectedStopTime, true) : null
                            )
                        ));
                        allGroupSelections[_ind].push(React.createElement(
                            "div",
                            { className: "gpwHead rBottomBorder", key: _oddsType + "_TITLE_" + _singleOddsSet.GROUP },
                            React.createElement(
                                "div",
                                { className: "" },
                                jsteam
                            ),
                            React.createElement(
                                "div",
                                { className: "" },
                                jsodds
                            )
                        ));

                        allGroupSelections[_ind] = allGroupSelections[_ind].concat(groupSelections);

                        if (allGroupSelections[_ind].length > maxLengthOfGroup) {
                            maxLengthOfGroup = allGroupSelections[_ind].length;
                        }
                    });

                    // 4 groups a row
                    for (var i = 0; i < (tmpOddsSet.length - 1) / 4 + 1; i++) {
                        for (var grpRowCount = 0; grpRowCount < maxLengthOfGroup; grpRowCount++) {
                            var fourGroupsRow = [];
                            for (var k = 0; k < 4; k++) {
                                if (tmpOddsSet.length <= i * 4 + k) {
                                    break;
                                }
                                if (allGroupSelections[i * 4 + k].length > grpRowCount) {
                                    fourGroupsRow.push(allGroupSelections[i * 4 + k][grpRowCount]);
                                } else {
                                    fourGroupsRow.push(React.createElement("div", { className: "gpwSelectionCells", key: "" + _tournID + _oddsType + "_Row" + allSelections.length + "_" + (i * 4 + k) }));
                                }
                            }
                            var _rowClassName = "flex";
                            if (grpRowCount >= 2) {
                                _rowClassName += " rAlt" + (grpRowCount + 1) % 2;
                            }
                            allSelections.push(React.createElement(
                                "div",
                                { className: "" + _rowClassName, key: "" + _tournID + _oddsType + "_Row" + allSelections.length + "_" + grpRowCount },
                                fourGroupsRow
                            ));
                        }
                    }

                    return React.createElement(
                        "div",
                        { className: "allSelections", key: "" + _tournID + _oddsType + "_Sel" },
                        allSelections
                    );
                } else if (_oddsType == "GPF") {
                    var allSelections = [];
                    _oddsSet.forEach(function (_singleOddsSet, _ind) {
                        allSelections.push(React.createElement(
                            "div",
                            { key: "" + _tournID + _oddsType + "_" + _ind + "_Sel", className: "" + _rowClasses },
                            formatGPFSelection(_oddsType, _tournID, _singleOddsSet, "ODDS", 0, _tableType, isExpanded)
                        ));
                    });
                    return React.createElement(
                        "div",
                        { key: "" + _tournID + _oddsType + "_Sel", className: "allSelections" },
                        allSelections
                    );
                } else if (_oddsType == "CHP" || _oddsType == "TPS") {
                    if (_oddsType == "TPS") {
                        var tpsIndex = this.props.tpsIndex;
                        return React.createElement(
                            "div",
                            { key: "" + _tournID + _oddsType + tpsIndex + "_Sel" },
                            React.createElement(NColumnsTable, { hideLSE: hideLSE, key: _tournID + "_" + _oddsType + "_" + tpsIndex, oddsType: _oddsType, tournID: _tournID, oddsSet: _oddsSet[tpsIndex], tableType: _tableType, isExpanded: isExpanded, noOfCol: 4 })
                        );
                    } else if (_oddsType == "CHP") {
                        //_oddsSet.TagMatchId
                        // display inplay msg()
                        // check if TagMatchId exists for tourn pages
                        if (pageName == "TOURN" || pageName == "CHP") {
                            if (_oddsSet.TagMatchId != undefined && _oddsSet.TagMatchId != null && _oddsSet.TagMatchId != "" && _oddsSet.INPLAY == "true") {
                                return InplayMsgByMatchID(_oddsSet.TagMatchId);
                            }
                        }

                        var _temptournId = pageName == "ALL" || pageName == "INPLAYALL" ? _singleTourn.matchIDinofficial : _tournID;
                        return React.createElement(
                            "div",
                            null,
                            React.createElement(NColumnsTable, { hideLSE: hideLSE, key: _tournID + "_" + _oddsType, oddsType: _oddsType, tournID: _temptournId, oddsSet: _oddsSet, tableType: _tableType, isExpanded: isExpanded, noOfCol: 4 })
                        );
                    }
                } else if (_oddsType == "TQL") {
                    var allTQLRows = [];
                    var altRow = 0;
                    _oddsSet.forEach(function (_singleOddsSet, _ind) {
                        var _React$createElement2;

                        altRow++;
                        allTQLRows.push(React.createElement(MatchTournTQLRow, (_React$createElement2 = { altRow: altRow % 2, key: _tournID + "_" + _oddsType + "_" + _ind }, _defineProperty(_React$createElement2, "altRow", altRow % 2), _defineProperty(_React$createElement2, "oddsType", _oddsType), _defineProperty(_React$createElement2, "tournID", _tournID), _defineProperty(_React$createElement2, "oddsSet", _singleOddsSet), _defineProperty(_React$createElement2, "tableType", _tableType), _React$createElement2)));
                    });
                    return React.createElement(
                        "div",
                        { key: "" + _tournID + _oddsType + "_Sel" },
                        React.createElement(ColumnTitle, { poolType: "TQL" }),
                        allTQLRows
                    );
                }
            } catch (ex) {
                debugLog("OddsSelectionTourn: " + ex);
            }
        }
    }]);

    return OddsSelectionTourn;
}(React.Component);

var NColumnsTable = function (_React$Component7) {
    _inherits(NColumnsTable, _React$Component7);

    function NColumnsTable(props) {
        _classCallCheck(this, NColumnsTable);

        var _this8 = _possibleConstructorReturn(this, (NColumnsTable.__proto__ || Object.getPrototypeOf(NColumnsTable)).call(this, props));

        _this8.oddsType = _this8.props.oddsType;
        _this8.tournID = _this8.props.tournID;
        _this8.tableType = _this8.props.tableType;
        _this8.noOfCol = _this8.props.noOfCol;
        _this8.state = { showSellingOnly: true };
        _this8.key = _this8.tournID + "_" + _this8.oddsType + "_" + _this8.tableType;

        return _this8;
    }

    _createClass(NColumnsTable, [{
        key: "render",
        value: function render() {
            // set height for browser version lower than IE10
            var noOfSel = void 0,
                tmpOddsSet = void 0;
            var isExpanded = this.props.isExpanded;
            var hideLSE = this.props.hideLSE;
            this.oddsSet = this.props.oddsSet;
            if (hideLSE) {
                // deep clone oddset
                tmpOddsSet = jQuery.extend(true, {}, this.oddsSet);
                tmpOddsSet.SELLIST = $.grep(tmpOddsSet.SELLIST, function (_sel) {
                    return _sel.ODDS.indexOf("LSE") < 0;
                });
                noOfSel = tmpOddsSet.SELLIST.length;
            } else {
                tmpOddsSet = this.props.oddsSet;
                noOfSel = this.props.oddsSet.SELLIST.length;
            }
            var colCount = noOfSel > 2 ? 4 : 2;
            var colClassName = void 0;
            if (colCount == "2") {
                colClassName = "twoCols";
            } else {
                colClassName = "fourCols";
            }
            var tableCells = [];
            var selType = this.oddsType == "TPS" ? tmpOddsSet.TPSTYPE.toLowerCase().toString() : "team";
            var _lineNum = "";

            for (var i = 0; i < colCount; i++) {
                tableCells.push(React.createElement(
                    "div",
                    { key: this.key + "_title1_" + i, className: "codds center rTopBorder rBottomBorder" },
                    eval("js" + selType)
                ));
                tableCells.push(React.createElement(
                    "div",
                    { key: this.key + "_title2_" + i, className: "codds center rTopBorder rBottomBorder" },
                    jsodds
                ));
            }

            var noOfRow = Math.ceil(noOfSel / colCount);
            var noOfRowInCol = [];
            var noOfSelectionsBeforeCol = [];
            for (var i = 0; i < colCount; i++) {
                noOfRowInCol[i] = Math.floor(noOfSel / 4) + (noOfSel % 4 > i ? 1 : 0);
                if (i > 0) {
                    noOfSelectionsBeforeCol[i] = noOfSelectionsBeforeCol[i - 1] + noOfRowInCol[i - 1];
                } else {
                    noOfSelectionsBeforeCol[0] = 0;
                }
            }
            for (var ri = 0; ri < noOfRow; ri++) {
                for (var i = 0; i < colCount; i++) {
                    var tIndex = ri + noOfSelectionsBeforeCol[i];
                    if (ri < noOfRowInCol[i]) {
                        _lineNum = selType + "_" + tmpOddsSet.SELLIST[tIndex].SEL;
                        tableCells.push(formatOddsSelection(this.oddsType, this.tournID, tmpOddsSet.SELLIST[tIndex], "ODDS", _lineNum, this.tableType, isExpanded, tmpOddsSet.POOLID));
                        tableCells.push(React.createElement(OddsCell, { key: "" + this.tournID + this.oddsType + _lineNum + "OC", rkey: "" + this.tournID + this.oddsType + _lineNum + "OC", _oddsType: this.oddsType, _matchID: this.tournID, oddsSet: tmpOddsSet.SELLIST[tIndex], checkboxType: "ODDS", lineNum: "" + _lineNum, _tableType: this.tableType, poolStatus: tmpOddsSet.POOLSTATUS, isAllup: tmpOddsSet.ALLUP, poolId: tmpOddsSet.POOLID }));
                    } else {
                        tableCells.push(React.createElement("div", { className: "codds cname", key: this.key + "_blank0_" + i }));
                        tableCells.push(React.createElement("div", { className: "codds", key: this.key + "_blank1_" + i }));
                    }
                }
            }
            return React.createElement(
                "div",
                { className: "allSelections " + colClassName, key: this.key },
                tableCells
            );
        }
    }]);

    return NColumnsTable;
}(React.Component);

var MatchTournTQLRow = function (_React$Component8) {
    _inherits(MatchTournTQLRow, _React$Component8);

    function MatchTournTQLRow(props) {
        _classCallCheck(this, MatchTournTQLRow);

        var _this9 = _possibleConstructorReturn(this, (MatchTournTQLRow.__proto__ || Object.getPrototypeOf(MatchTournTQLRow)).call(this, props));

        _this9.oddsType = _this9.props.oddsType;
        _this9.tournID = _this9.props.tournID;
        _this9.tableType = _this9.props.tableType;
        _this9.key = _this9.tournID + "_" + _this9.oddsType + "_" + _this9.tableType;
        return _this9;
    }

    _createClass(MatchTournTQLRow, [{
        key: "getSingleMatch",
        value: function getSingleMatch(oddsSet) {

            if (oddsSet.Match) {
                return new Match(oddsSet.Match, false);
            }

            return null;
        }
    }, {
        key: "renderOdds",
        value: function renderOdds() {

            var output = [];

            var hTeamName = this.oddsSet.homeTeam['teamName' + curLang.toUpperCase()];
            var aTeamName = this.oddsSet.awayTeam['teamName' + curLang.toUpperCase()];
            var selList = this.oddsSet.SELLIST;

            var singleMatch = this.getSingleMatch(this.oddsSet);
            var tagMatchId = this.oddsSet.TagMatchId;

            var firstOddsType = "1";
            var secondOddsType = "2";

            for (var i = 0; i < selList.length; i++) {
                var teamId = selList[i].TEAMID;
                if (teamId == this.oddsSet.homeTeam.teamID) {
                    firstOddsType = selList[i].SEL;
                } else {
                    secondOddsType = selList[i].SEL;
                }
            }

            if (tagMatchId != null && tagMatchId != "" && this.oddsSet.INPLAY == "true") {
                output.push(getInplayLinkOddsCellSet(singleMatch, this.oddsType, tagMatchId, null));
            } else {
                output.push(React.createElement(
                    "div",
                    { className: "cteams" },
                    hTeamName
                ));
                output.push(React.createElement(
                    "div",
                    { className: "codds" },
                    React.createElement(OddsCell, { key: "" + this.tournID + this.oddsType + "H_0OC", rkey: "" + this.tournID + this.oddsType + "H_0OC", _oddsType: this.oddsType, _matchID: this.tournID, oddsSet: this.oddsSet, checkboxType: firstOddsType, lineNum: "0", _tableType: this.tableType, poolStatus: this.oddsSet.POOLSTATUS, isAllup: this.oddsSet.ALLUP, poolId: this.oddsSet.POOLID })
                ));
                output.push(React.createElement(
                    "div",
                    { className: "cteams" },
                    aTeamName
                ));
                output.push(React.createElement(
                    "div",
                    { className: "codds" },
                    React.createElement(OddsCell, { key: "" + this.tournID + this.oddsType + "A_0OC", rkey: "" + this.tournID + this.oddsType + "A_0OC", _oddsType: this.oddsType, _matchID: this.tournID, oddsSet: this.oddsSet, checkboxType: secondOddsType, lineNum: "0", _tableType: this.tableType, poolStatus: this.oddsSet.POOLSTATUS, isAllup: this.oddsSet.ALLUP, poolId: this.oddsSet.POOLID })
                ));
            }

            return output;
        }
    }, {
        key: "render",
        value: function render() {
            this.oddsSet = this.props.oddsSet;
            var tmpOddsSet = this.oddsSet;
            var stage = tmpOddsSet['STAGE' + curLang.toUpperCase()];

            return React.createElement(
                "div",
                { className: "couponRow rAlt" + this.props.altRow + " " + this.props.couponID + " " + this.props.tournID, key: this.key },
                React.createElement(
                    "div",
                    { className: "cesst" },
                    formatEsstStr(tmpOddsSet.ExpectedStopTime, true)
                ),
                React.createElement(
                    "div",
                    { className: "ccode" },
                    tmpOddsSet.CODE
                ),
                React.createElement(
                    "div",
                    { className: "ctage" },
                    stage
                ),
                this.renderOdds()
            );
        }
    }]);

    return MatchTournTQLRow;
}(React.Component);

var EliminateBtn = function (_React$Component9) {
    _inherits(EliminateBtn, _React$Component9);

    function EliminateBtn(props) {
        _classCallCheck(this, EliminateBtn);

        var _this10 = _possibleConstructorReturn(this, (EliminateBtn.__proto__ || Object.getPrototypeOf(EliminateBtn)).call(this, props));

        _this10.state = { hideLSE: true };
        _this10.onItemClick = _this10.onItemClick.bind(_this10);
        return _this10;
    }

    _createClass(EliminateBtn, [{
        key: "onItemClick",
        value: function onItemClick(event) {
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(event.target.value);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _oddsType = this.props._oddsType;
            var objID = this.props.objID;
            var _ref = this.props._ref;
            var imgUrl = this.props.hideLSE ? "showall" : "sellonly";
            var isDisplay = this.props.display;
            var visibilityValue = void 0;
            if (isDisplay != null && isDisplay == false) {
                visibilityValue = "hidden";
            } else {
                visibilityValue = "visible";
            }
            /*
            return <span className={`eliminationButton`} onClick={(e)=>{e.stopPropagation();}} key={`handleSellFor${_oddsType}${objID}`} id={`handleSellFor${_oddsType}${objID}`} style={{float:"right", visibility: visibilityValue, marginRight: "5px", marginTop: "-1px"}}>
                    <a><img src={`${footImagePath}${jsLang}/btn_${imgUrl}_off.gif${cacheVersion}`} id={`handleBtn${_oddsType}${objID}`} onClick={this.onItemClick} /> </a>
                </span>;
                */
            return React.createElement(
                "span",
                { className: "eliminationButton", onClick: function onClick(e) {
                        e.stopPropagation();
                    }, key: "handleSellFor" + _oddsType + objID, id: "handleSellFor" + _oddsType + objID, style: { visibility: visibilityValue } },
                React.createElement(
                    "a",
                    null,
                    React.createElement("img", { src: "" + footImagePath + jsLang + "/btn_" + imgUrl + "_off.gif" + cacheVersion, id: "handleBtn" + _oddsType + objID, onClick: this.onItemClick }),
                    " "
                )
            );
        }
    }]);

    return EliminateBtn;
}(React.Component);

function drawTournamentContainer(singleTourn, tableType, tournID, isFirstElement, isLastElement) {
    var _allOddsTable = [];
    //var tmp = [];
    if (singleTourn !== null) {
        singleTourn.arrPools.forEach(function (_oddsType) {
            _oddsType = _oddsType.replace("ref", "");
            _allOddsTable.push(drawOddsTypeTable(_oddsType, tableType, tournID));
        });
    }

    return React.createElement(
        "div",
        { key: "" + (singleTourn != null ? singleTourn.tournamentID : "") + tableType },
        isFirstElement ? React.createElement(TournTableInfo, { singleTourn: singleTourn, tableType: tableType }) : null,
        _allOddsTable,
        isLastElement ? React.createElement(OddsTableFooter, { tableType: tableType }) : null
    );
}

// tourn header

var TournTableInfo = function (_React$Component10) {
    _inherits(TournTableInfo, _React$Component10);

    function TournTableInfo() {
        _classCallCheck(this, TournTableInfo);

        return _possibleConstructorReturn(this, (TournTableInfo.__proto__ || Object.getPrototypeOf(TournTableInfo)).apply(this, arguments));
    }

    _createClass(TournTableInfo, [{
        key: "render",
        value: function render() {
            //var _oddsType = this.props.oddsType;
            var singleTournament = this.props.singleTourn;
            return React.createElement(
                "div",
                { className: "oHeader" },
                React.createElement(
                    "div",
                    { className: "tblHeader" },
                    React.createElement(
                        "div",
                        { className: "normalheader" },
                        React.createElement(
                            "div",
                            { className: "left" },
                            React.createElement(
                                "span",
                                { className: "cDelim" },
                                React.createElement("img", { src: "/info/include/images/stroke_yellow.gif" + cacheVersion, alt: "", title: "" })
                            ),
                            React.createElement(
                                "span",
                                null,
                                singleTournament != null ? formatPageHeader(singleTournament, this.props.tableType, true, false) : null
                            )
                        ),
                        this.props.tableType.toLowerCase().indexOf("presales") >= 0 || this.props.tableType == "NoMatch" ? null : React.createElement(
                            "div",
                            { className: "right" },
                            React.createElement(
                                "span",
                                null,
                                React.createElement(
                                    "a",
                                    { className: "cActionsPrint", href: "javascript:printNow('" + location.pathname + location.search + "&pv=1');" },
                                    jsprintdata
                                ),
                                React.createElement(
                                    "a",
                                    { className: "spiconPrint" },
                                    React.createElement(
                                        "span",
                                        { className: "spicon" },
                                        React.createElement("img", { src: "/info/include/images/icon_print.gif" + cacheVersion, className: "pointer icon", onClick: function onClick() {
                                                printNow("" + location.pathname + location.search + "&pv=1");
                                            }, alt: jsprintdata, title: jsprintdata })
                                    )
                                ),
                                React.createElement(
                                    "a",
                                    { className: "nolnk" },
                                    jsrefreshat,
                                    ":",
                                    React.createElement("label", { id: "sRefreshTime" })
                                ),
                                React.createElement(
                                    "a",
                                    { className: "refresh", href: "javascript:refreshOddsPage();" },
                                    jsrefresh
                                ),
                                React.createElement(
                                    "a",
                                    { className: "refresh" },
                                    React.createElement(
                                        "span",
                                        { className: "spicon" },
                                        React.createElement("img", { src: "/info/include/images/icon_refresh.gif" + cacheVersion, className: "pointer icon", alt: jsrefresh, title: jsrefresh, onClick: function onClick() {
                                                refreshOddsPage();
                                            } })
                                    )
                                )
                            ),
                            React.createElement(AddBetBtn, null)
                        )
                    )
                )
            );
        }
    }]);

    return TournTableInfo;
}(React.Component);

//# sourceURL=/football/lib/TournTable.js
//# sourceMappingURL=TournTable.js.map