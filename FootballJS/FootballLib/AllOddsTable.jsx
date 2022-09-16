class MatchDropDownList extends React.Component {
    handleChange(e) {
        if (e.target.value.indexOf("--coupon") == -1) {
            setMatchId(e.target.value);
            try {
                //this.setState({selectValue:e.target.value});
                var newUrl = replaceUrlParam(location.href, "tmatchid", tMatchID);
                window.history.pushState({ "html": "", "pageTitle": document.title }, "", newUrl);
            } catch (ex) { }
            renderTableAfterDropdownSelect(true);
            updatePushAllOdds(tMatchID);
        }
    }

    render() {
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
                    if (_allData[0][i][j].Cur != '1')
                        preData.push(_allData[0][i][j]);
                    else
                        curData.push(_allData[0][i][j]);
                }
                if (curData.length > 0)
                    _allData1.push(curData);
                if (preData.length > 0)
                    _allData2.push(preData);
            }
            for (var i = 0; i < _allData2.length; i++) {
                _allData1.push(_allData2[i]);
            }
            _allData[0] = _allData1;
        }

        var _options = [];

        let displayDDL = false;

        try {
            if (_byCoupon) {
                _allData.forEach(function (_couponArr, _ind) {
                    if (_couponArr != null) {

                        let countMatch = 0;
                        _couponArr.forEach(function (_item, _ind) {
                            let formatedDate = getFormatDropDownListDate(_item.matchTime);
                            if (_item.matchID != tMatchID) {
                                _options.push(<option key={`${_ind}_${_item.matchID}`} value={`${_item.matchID}`}>
                                    {formatedDate} {_item.frontEndId} {jsLang == "EN" ? _item.homeTeam.teamNameEN : _item.homeTeam.teamNameCH} {jsVS} {jsLang == "EN" ? _item.awayTeam.teamNameEN : _item.awayTeam.teamNameCH}</option>);
                                countMatch++;
                            }
                        })

                        // prevent only one match in ddl and the match is selected
                        if (countMatch == 0) {
                            _options.pop();
                        } else {
                            displayDDL = true;
                        }
                    }
                });
            } else {
                _allData.forEach(function (tSel, tind) {
                    let _item = tSel;
                    if (_item.matchID != tMatchID) {
                        let formatedDate = getFormatDropDownListDate(_item.matchDate);
                        _options.push(<option key={`${tind}_${_item.matchID}`} value={`${_item.matchID}`}>
                            {formatedDate} {GetGlobalResources(_item.matchDay, "js")} {_item.matchNum} {jsLang == "EN" ? _item.homeTeam.teamNameEN : _item.homeTeam.teamNameCH} {jsVS} {jsLang == "EN" ? _item.awayTeam.teamNameEN : _item.awayTeam.teamNameCH}</option>);

                    }
                });
                if (_options.length > 0)
                    displayDDL = true;
            }

        } catch (ex) { debugLog(ex); }

        if (displayDDL)
            return <select id="MatchDropDownList" className="ddlAllMatches poolDetails" onChange={this.handleChange} style={{ width: 296 }}>
                <option value="--">{jssearchother}</option>
                {_options}
            </select>
        else
            return null;
    }

}

class NTSInfoTable extends React.Component {
    render() {
        let _matchID = this.props._matchID;
        try {
            if (_matchID == undefined || _matchID == null || betValue[_matchID] == undefined || betValue[_matchID] == null) return;
            let ntsInfoDetails = [];
            let singleMatch = betValue[_matchID];
            let hometeam = singleMatch.homeTeam["teamName" + jsLang] + " (" + jsHOME + ")";
            let awayteam = singleMatch.awayTeam["teamName" + jsLang] + " (" + jsAWAY + ")";

            let NTS_DIV = [];
            //   let etsBase = 0;

            for (let i = 1; i <= 30; i++) {
                if (singleMatch.results["NTS" + i] != null)
                    NTS_DIV.push('NTS:' + i + ':' + singleMatch.results["NTS" + i]);
            }

            let secondHalfResult = $.grep(singleMatch.accumulatedscore, function (_as) { return _as.periodvalue == "SecondHalf"; });
            if (secondHalfResult != null) {
                secondHalfResult = secondHalfResult[0];
                //etsBase = parseInt(secondHalfResult.home, 10) + parseInt(secondHalfResult.away, 10);
            }
            for (let i = 1; i <= 30; i++) {
                if (singleMatch.results["ENT" + i] != null)
                    NTS_DIV.push('ENT:' + i + ':' + singleMatch.results["ENT" + i]);
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
                    }
                    else if (ntsinfo[2] == "RFD") {
                        teamname = jsRFD;
                    }
                    var cntGoal = "";
                    var strExtraTimeText = "";
                    if (ntsinfo[0] == "ENT") {
                        strExtraTimeText = " [" + jsextratime + "]";
                    }
                    ntsInfoDetails.push(<tr key={`ntsInfoRow${i}`}><td className={`cgoaldiv`}>{jsntsfstpart}{ntsinfo[1]}{cntGoalNumber(parseInt(ntsinfo[1]))}{jsntslastpart}{strExtraTimeText}</td><td>{teamname}</td></tr>);
                }
            }
            else {
                ntsInfoDetails.push(<tr key={`ntsInfoRow0`}><td colSpan='2'>{jsnotyetgoal}</td></tr>);
            }

            return <div key={`ntsinfo_panel`} id='ntsinfo_panel' style={{ 'display': 'none' }}>
                <table>
                    <tbody>
                        <tr className='rhead'>
                            <td className='cgoal'>{jsGOAL}</td>
                            <td className='cgoalteam'>{jsscoreteam}</td>
                        </tr>
                        {ntsInfoDetails}
                    </tbody>
                </table>
            </div>;

        } catch (ex) {
            debugLog("NTSInfoTable: " + ex);
        }
        return null;
    }
}

class MatchOddsAllSelectList extends React.Component {
    render() {
        let optionList = [];
        let tournamentList = this.props.OddsTableTournaments;
        let oddsTableMatchList = this.props.OddsTableMatches;
        selectedTabDateArra.forEach(function (singleSelectedDate) {
            oddsTableMatchList.forEach(function (item, couponIndex) {
                let couponMatchDate = item.matchDate.split("T")[0];
                if (couponMatchDate == singleSelectedDate) {
                    let matchDate = formatEsstStr(item.matchDate, false);
                    let frontEndId = item.frontEndId;
                    let code = "";
                    let homeAndAwayName = "";
                    if (jsLang.toLowerCase() == 'ch') {
                        homeAndAwayName = item.homeTeam.teamNameCH + " VS " + item.awayTeam.teamNameCH;
                    } else {
                        homeAndAwayName = item.homeTeam.teamNameEN + " VS " + item.awayTeam.teamNameEN;
                    }
                    tournamentList.forEach(function (tList) {
                        if (item.tournament != undefined) {
                            if (item.tournament.tournamentID == tList.tournamentID) {
                                code = tList.tournamentShortName;
                            }
                        }
                    })
                    optionList.push(<MatcheOddsAllOption matchID={item.matchID} matchDate={matchDate} frontEndId={frontEndId} code={code} homeAndAwayName={homeAndAwayName} />);
                }
            });
        });

        return <div className={"clearfloat"}><p><span></span></p>
            <p className={"float-right"}> <select id="matchAllSelectId">
                <option value="0">{jsSelectAnotherMatch}</option>
                {optionList}
            </select></p></div>;
    }
}

class MatcheOddsAllOption extends React.Component {
    render() {
        return <option value={this.props.matchID}>{this.props.matchDate} {this.props.frontEndId} {this.props.code} {this.props.homeAndAwayName}</option>
    }
}

function removeRepeat(date) {
    var mydateSiceThis = "";
    var mydateRes = "";
    var res = [date[0]];
    for (var i = 0; i < date.length; i++) {
        var repeat = false;
        if (pageName != "TQL") {
            mydateSiceThis = date[i].matchDate.split("T")[0];
            for (var j = 0; j < res.length; j++) {
                mydateRes = res[j].matchDate.split("T")[0]
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