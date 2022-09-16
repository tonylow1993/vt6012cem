var _isInplayHADPage = false, _isHalfTimePage = false;
var tmp;

/* for all odds page*/
var allOddsType = '';
var schema = '';
var matches = '';
var pools = '';
var oddsType = '';

var startMatch = 1;
var endMatch = 1;
var totalMatch = 0;
var maxMatch = 60; // 60 for odds page, 20 for results page
var curPage = 1;
var refreshTableInterval;
var refreshSimpleMatchInterval;
var couponCount = 0
var rawDataForAllOdds;
var dateTournaTabInited = false;
var matchDataList = [];
var selectedTournamentIds = [];
var tmpSelectedTournamentIds = [];

var mixInplayBetType = [];
var selectedTabDateArra = [];
var selectedMatcheId = "0";
var otherTabDates;
var allTabDateList;
var dateType = { Single: "Single", Other: "Others", groupMidnight: "groupMidnight", groupCur: "groupCur", All: "All" };
var invalidBetTypes = { Refund: "refund", Suspended: "suspended" };// value is lowercase
var curTabType = '';
var curDateType = '';
var groupCurType = '';
var otherLength = '';
var countFeatureMatch = 0;
var dateTabCount = 0;
var dropdownCount = 0;
var allTournaments = [];

try {
    curPage = parseInt(getParameterByName('pageno'), 10);
    curPage = (isNaN(curPage) ? 1 : curPage); // set curPage to 1 if pageNo is not number
} catch (ex) {

}
try {
    if (sessionStorage.getItem("__extendShareSelectedTournsId") === null) {
        sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify([]));
    }
} catch (ex) {

}

class NoDataDiv extends React.Component {
    render() {
        return <div className="nopool"><div id="noPoolContentMsg" className="nopoolmsg"></div></div>;
    }
}

class OddsTable extends React.Component {
    render() {
        var coupons = [];
        var tableType = this.props.tableType;
        let oddsTable_tournaments = checkTournamentEmpty(this.props.tournaments);
        let oddsTable_coupons = this.props.coupons;
        var _oddsType = oddsType;

        // check if mdate in other tab
        if (curTabType == tabType.Date) {
            let availableDateList = getAvailabDateListFromMatches(oddsTable_coupons);

            // assign to first date tab if mdate not in available date list
            if ($.inArray(mdate, availableDateList) == -1) {
                mdate = (pageName!="OFM" && availableDateList.length > 0) ? availableDateList[0] : "";
                selectedTabDateArra = [];
                selectedTabDateArra.push(mdate);
            }
            let tempOtherTabList = getOtherTabList(availableDateList);
            let inOtherTab = $.inArray(mdate, tempOtherTabList) != -1;
            if (inOtherTab && pageName != 'MIXALLUPLIST') {
                selectedTabDateArra = tempOtherTabList;
                curDateType = dateType.Other;
            }
        }

        if (curTabType == tabType.Date) {
            if (curDateType == dateType.Other) {
                coupons = oddsTabOtherDateTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType);
            } else if (curDateType == dateType.All) {
                coupons = oddsTabOtherDateTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType);
            } else {
                coupons = oddsTabDateTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType);
            }
        } else if (curTabType == tabType.Feature) {
            coupons = oddsTabAllFeaturedMatchesDateTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType);
        } else {
            coupons = oddsTabCompetitionTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType);
        }

        let oddsFooter = <OddsTableFooter tableType={tableType} />;
        return <div className={`matchesOddsTable ${this.props.oddsType}Table ${tableType}`}>
            <OddsTableHeader tableType={tableType} oddsType={this.props.oddsType} tournaments={oddsTable_tournaments} coupons={matchDataList} />
            {curTabType == tabType.Competition ? (oddsTable_tournaments.length > 0 ? coupons : <NoDataDiv />) : coupons}
            {curTabType == tabType.Competition ? (oddsTable_tournaments.length > 0 ? oddsFooter : null) : oddsFooter}
        </div>;
    }
}

function oddsTabCompetitionTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType) { 
    let selectedTournaMatches = [];
    let couponTmpArr = [];
    let tNameMap = [];
    let tournamentData = [];
    let tournamentIds = [];

    // get all availabel date
    let allTabDates = [];
    for (var i = 0; i < oddsTable_coupons.length; i++) {
        if (oddsTable_coupons[i] != undefined && oddsTable_coupons[i].matchDate != undefined) {
            let _matchDate = getFormattedDateStr(oddsTable_coupons[i].matchDate);
            if (jQuery.inArray(_matchDate, allTabDates) == -1) {
                allTabDates.push(_matchDate);
            }
        }
    }


    allTabDates.sort();
    // get available tournment list
    let availabledate = getDateTabList(allTabDates);

    for (var i = 0; i < oddsTable_tournaments.length; i++) {
        let _tourn = oddsTable_tournaments[i];
        for (var j = 0; j < oddsTable_coupons.length; j++) {
            let _matchDate = getFormattedDateStr(oddsTable_coupons[j].matchDate);
            if (jQuery.inArray(_matchDate, availabledate) != -1 && jQuery.inArray(_tourn.tournamentID, tournamentIds) == -1) {
                tournamentIds.push(_tourn.tournamentID);
                tournamentData.push(_tourn);
            }
        }
    }

    if (selectedTournamentIds.length == 0 || (selectedTournamentIds.length > 0 && jQuery.inArray(selectedTournamentIds[0], tournamentIds) == -1)) {
        selectedTournamentIds.push(tournamentData[0].tournamentID);
    }

    
    // group tournament id by tournament name
    let _selectedTournamentIds = getTournGroupIdsBytName(selectedTournamentIds);
    //sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify(selectedTournamentIds));

    _selectedTournamentIds.forEach(function (value, index) {
        tournamentData.forEach(function (singleTournament, tounaIndex) {
            if (singleTournament.tournamentID == value) {
                oddsTable_coupons.forEach(function (singleCoupon, couponIndex) {
                    let _matchDate = getFormattedDateStr(singleCoupon.matchDate);
                    if (singleCoupon.tournament.tournamentID == value && jQuery.inArray(_matchDate, availabledate) != -1) {
                        selectedTournaMatches.push(singleCoupon);
                    }
                });
            }
        });
    });

    paginationCalculator([selectedTournaMatches]);

    selectedTournaMatches = selectedTournaMatches.slice(startMatch, endMatch);

    let tempTournNameList = [];

    var matchRow = [];
    var altRow = 0;
    var hasMLMatch = false;
    var couponID = '';
    var couponCount = 0;
    _selectedTournamentIds.forEach(function (value, index) {
        oddsTable_tournaments.forEach(function (singleTournament, tounaIndex) {
            if (singleTournament.tournamentID == value) {
                if (jQuery.inArray(singleTournament.tName, tempTournNameList) == -1) {
                    hasMLMatch = false;
                    matchRow = [];
                    altRow = 0;
                    couponCount++;
                    couponID = 'tgCou' + couponCount;
                }
                selectedTournaMatches.forEach(function (singleCoupon, couponIndex) {
                    var tmpTournamentID = singleCoupon.tournament.tournamentID;
                    if (tmpTournamentID == value) {
                        altRow++;

                        if (isML(_oddsType) && !hasMLMatch && singleCoupon[_oddsType.toLowerCase() + "odds"].LINELIST.length > 1 && !checkInplayLink(singleCoupon, _oddsType, pageName)) {
                            hasMLMatch = true;
                        }

                        if (selectedMatcheId != "0" && selectedMatcheId == singleCoupon.matchID) {
                            curPage = 1;
                            matchRow.push(<MatchRow altRow={altRow % 2} match={singleCoupon} tournament={singleTournament} key={singleCoupon.matchID} tableType={tableType} couponID={couponID} />);
                        } else if (selectedMatcheId == "0") {
                            matchRow.push(<MatchRow altRow={altRow % 2} match={singleCoupon} tournament={singleTournament} key={singleCoupon.matchID} tableType={tableType} couponID={couponID} />);
                        }

                    }
                });
                if (matchRow.length > 0) {

                    let param = {
                        "tName": singleTournament.tName,
                        "matchRow": matchRow,
                        "singleTournament": singleTournament,
                        "key": curPage + singleTournament.tournamentID,
                        "hasMLMatch": hasMLMatch,
                        "couponID": couponID
                    };
                    tempTournNameList.push(singleTournament.tName);
                    tNameMap.push(param);
                }
                else {
                    couponCount--;
                }
            }
        });
    });

    let actionTNameList = [];

    for (let i = 0; i < tNameMap.length; i++) {
        let tempMatchRow = tNameMap[i].matchRow;
        if (jQuery.inArray(tNameMap[i].tName, actionTNameList) == -1) {
            actionTNameList.push(tNameMap[i].tName);
            //for (let j = 0; j < tNameMap.length; j++) {
            //    if (i != j && tNameMap[i].tName == tNameMap[j].tName) {
            //        tempMatchRow = $.merge(tNameMap[j].matchRow, tempMatchRow);
            //    }
            //}
            let couponNo = parseInt(tempMatchRow[0].props.couponID.replace('tgCou',''));
            couponTmpArr.push(
                <Coupon matchRow={tempMatchRow} tournament={tNameMap[i].singleTournament}
                    key={tNameMap[i].key} hasMLMatch={tNameMap[i].hasMLMatch} couponID={tNameMap[i].couponID} couponNo={couponNo} />);
            
        }
    }

    couponCount = 0;

    return couponTmpArr; 
}
// Change the drop-down box event function
function matchOptionChange(oddsList, _matchDay, hasMLMatch, _oddsType)
{
    let couponTmpArr = [];
 
    oddsList.forEach(function (item, index) {
        let couponId = "";
        let cyrPageKey = "";
        if (item.key == selectedMatcheId && groupCurType == dateType.groupCur) {
            couponTmpArr.push(<Coupon matchRow={item}  matchDay={_matchDay} key={curPage + "selectedDate"} hasMLMatch={hasMLMatch} couponID="tgCou1" />);
        } else if (item.key == selectedMatcheId && groupCurType == dateType.groupMidnight) {
            couponTmpArr.push(<Coupon matchRow={item} matchDate={jsaftermidnight} matchDateType="NextDay" matchDay={_matchDay} key={curPage + "midNightDate"} hasMLMatch={hasMLMatch} couponID='tgCou2' />);
        }
    });
   
    return couponTmpArr;
}

// Load Single data list
function oddsTabDateTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType) {
    var matchRow = [];
    let couponTmpArr = [];
    let _matchDay;
    var midNightMatchRow = [];
    var ordinaryFeaturedMatchRow = [];
    var topFeaturedMatchRow = [];
    let altRow = 1;
    let altRowMid = 1;
    let dateMatchTournament;
    if (tableType.toLowerCase().indexOf("presales") >= 0) {
        couponID += "ref";
    }
    if (mdate != "") {
        selectedTabDateArra = [];
        selectedTabDateArra.push(mdate);
    }

    selectedTabDateArra.sort();
    selectedTabDateArra.forEach(function (tabDateItem) {
        let selectedTabDate = tabDateItem;
        let hasMLMatch = false;
        let hasMLMatchNextDay = false;
        oddsTable_coupons.forEach(function (singleCoupon, couponIndex) {
            oddsTable_tournaments.forEach(function (singleTournament, tounaIndex) {
                if (singleTournament.tournamentID == singleCoupon.tournament.tournamentID) {
                    dateMatchTournament = singleTournament;
                }
            });
            let dateMatchRow;
            let matchDateObj = new Date(singleCoupon.matchDate);
            let matchDateYYYYMMDD = singleCoupon.matchDate.split("T")[0];
            let groupCur = matchDateYYYYMMDD == selectedTabDate;
            let groupNextDay = matchDateObj.getTime() >= getNextDateZeroOclock(selectedTabDate).getTime() && matchDateObj.getTime() <= getNextDate(selectedTabDate).getTime();

            if (groupCur || groupNextDay) {
                let tgCouName = "";
                if (groupCur) {
                    if (pageName == "OFM" && (singleCoupon.featureMatch == null || singleCoupon.featureMatch.topPriority == null || singleCoupon.featureMatch.topPriority == "false")) {
                        tgCouName = "tgCou3";
                    } else if (pageName == "OFM" && singleCoupon.featureMatch.topPriority == "true") {
                        tgCouName = "tgCou4";
                    } else {
                        tgCouName = "tgCou1";
                    }
                } else if (groupNextDay) {
                    tgCouName = "tgCou2";
                }
                dateMatchRow = <MatchRow altRow={groupCur ? altRow % 2 : altRowMid % 2} match={singleCoupon} tournament={dateMatchTournament} key={singleCoupon.matchID} tableType={tableType} couponID={tgCouName} />;

                //check to show expand button
                if (isML(_oddsType) && singleCoupon[_oddsType.toLowerCase() + "odds"].LINELIST.length > 1 && !checkInplayLink(singleCoupon, _oddsType, pageName)) {
                    if (groupCur) {
                        hasMLMatch = true;
                    }
                    if (groupNextDay) {
                        hasMLMatchNextDay = true;
                    }
                }
                //need current datetime >= start datetime?
                if (groupCur) {
                    _matchDay = singleCoupon.matchDay;
                    if (pageName == "OFM" && (singleCoupon.featureMatch == null || singleCoupon.featureMatch.topPriority == null || singleCoupon.featureMatch.topPriority == "false")) {
                        ordinaryFeaturedMatchRow.push(dateMatchRow);
                    } else if (pageName == "OFM" && singleCoupon.featureMatch.topPriority == "true") {
                        topFeaturedMatchRow.push(dateMatchRow);
                    } else {
                        matchRow.push(dateMatchRow);
                    }
                    altRow++;
                }
                if (groupNextDay) {
                    midNightMatchRow.push(dateMatchRow);
                    altRowMid++;
                }
            }
        });

        if (matchRow.length > 0) {

            var selectedTabDateFormat = formatDDMMYYYY(selectedTabDate);
            var selectedNextDateFormat = getNextDateFormatDDMMYYYY(selectedTabDate);

            paginationCalculator([matchRow, midNightMatchRow]);

            //The number of matches on the last page of matches for the current date
            let matchRowEndMatchCount = "";
            //end page of the current date
            let matchRowEndPage = "";
            let totalRow = [];
            if (pageName == "OFM") {
                paginationCalculator([topFeaturedMatchRow, ordinaryFeaturedMatchRow]);
                matchRowEndMatchCount = topFeaturedMatchRow.length % maxMatch;
                //end page of the current date
                matchRowEndPage = Math.ceil(topFeaturedMatchRow.length / maxMatch);
                totalRow = [].concat.apply(topFeaturedMatchRow, ordinaryFeaturedMatchRow);

            } else {
                matchRowEndMatchCount = matchRow.length % maxMatch;
                //end page of the current date
                matchRowEndPage = Math.ceil(matchRow.length / maxMatch);
                totalRow = [].concat.apply(matchRow, midNightMatchRow);
            }

            let matchNum = startMatch + matchRowEndMatchCount;
            if (totalRow.length > 0 && selectedMatcheId != "0") {
                curPage = 1;
                couponTmpArr = matchOptionChange(totalRow, _matchDay, hasMLMatch, _oddsType);
            } else {
                if (pageName == "OFM") {
                    if (topFeaturedMatchRow.length > 0 && (curPage < matchRowEndPage || (curPage == matchRowEndPage && matchRowEndMatchCount >= 0) || totalMatch <= maxMatch)) {
                        topFeaturedMatchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch
                            && curPage == matchRowEndPage ? totalRow.slice(startMatch, matchNum) : totalRow.slice(startMatch, endMatch);
                        couponTmpArr.push(<Coupon matchRow={topFeaturedMatchRow} matchDate={jstopfeaturedmatches} matchDateType="NextDay" matchDay={_matchDay} key={curPage + "topFeaturedMatch"} hasMLMatch={hasMLMatch} couponID='tgCou4' couponNo={4} />);

                    }
                    if (ordinaryFeaturedMatchRow.length > 0 && (curPage > matchRowEndPage || (curPage == matchRowEndPage && matchRowEndMatchCount > 0) || totalMatch <= maxMatch)) {
                        ordinaryFeaturedMatchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch
                            && curPage == matchRowEndPage ? totalRow.slice(matchNum, endMatch) : totalRow.slice(startMatch, endMatch);
                        couponTmpArr.push(<Coupon matchRow={ordinaryFeaturedMatchRow} matchDate={jsordinaryfeaturedmatches} matchDateType="NextDay" matchDay={_matchDay} key={curPage + "OrdinaryFeaturedMatches"} hasMLMatch={hasMLMatch} couponID='tgCou3' couponNo={3} />);

                    }
                } else {

                    if (matchRow.length > 0 && (curPage < matchRowEndPage || (curPage == matchRowEndPage && matchRowEndMatchCount >= 0) || totalMatch <= maxMatch)) {
                        matchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch
                            && curPage == matchRowEndPage ? totalRow.slice(startMatch, matchNum) : totalRow.slice(startMatch, endMatch);
                        couponTmpArr.push(<Coupon matchRow={matchRow} matchDate={selectedTabDateFormat} matchDateType="CurrentDay" matchDay={_matchDay} key={curPage + "selectedDate"} hasMLMatch={hasMLMatch} couponID='tgCou1' couponNo={1} />);
                    }

                    if (midNightMatchRow.length > 0 && (curPage > matchRowEndPage || (curPage == matchRowEndPage && matchRowEndMatchCount > 0) || totalMatch <= maxMatch)) {
                        midNightMatchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch
                            && curPage == matchRowEndPage ? totalRow.slice(matchNum, endMatch) : totalRow.slice(startMatch, endMatch);
                        couponTmpArr.push(<Coupon matchRow={midNightMatchRow} matchDate={selectedNextDateFormat} matchDateType="NextDay" matchDay={getNextMatchDay(_matchDay)} key={curPage + "midNightDate"} hasMLMatch={hasMLMatchNextDay} couponID='tgCou2' couponNo={2} />);
                    }
                }
            }
        }
    });

    return couponTmpArr;
}

// Load "other" data list
function oddsTabOtherDateTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType) {
    let otherDateMatches = [];
    let couponTmpArr = [];

    if (curDateType == dateType.All) {
        selectedTabDateArra = [];
        oddsTable_coupons.forEach(function (singleCoupon, couponIndex) {
            let couponMatchDate = singleCoupon.matchDate.split("T")[0];
            if (jQuery.inArray(couponMatchDate, selectedTabDateArra) === -1) {
                selectedTabDateArra.push(couponMatchDate);
            }
        });
    }

    if (pageName == "MIXALLUPLIST" && curTabType != tabType.Feature)
        selectedTabDateArra.sort();

    oddsTable_coupons.forEach(function (singleCoupon, couponIndex) {
        selectedTabDateArra.forEach(function (singleSelectedDate) {
            let couponMatchDate = singleCoupon.matchDate.split("T")[0];
            if (couponMatchDate == singleSelectedDate) {
                if (selectedMatcheId != "0" && selectedMatcheId == singleCoupon.matchID) {
                    curPage = 1;
                    otherDateMatches.push(singleCoupon);
                } else if (selectedMatcheId == "0") {
                    otherDateMatches.push(singleCoupon);
                }
            }
        });
    });
    if (pageName != "OFM") {
        paginationCalculator([otherDateMatches]);

        otherDateMatches = otherDateMatches.slice(startMatch, endMatch);
    }
    let _matchDay;
    let altRow = 1;
    let altRowMid = 1;
    var hasMLMatch = false;
    let dateMatchTournament;
    let ordinaryFeaturedMatchRow = [];
    let topFeaturedMatchRow = [];
    couponCount = 0;
    if (curDateType != dateType.All || (pageName == "MIXALLUPLIST" && curDateType == dateType.All)) {

        selectedTabDateArra.forEach(function (tabDateItem) {
            hasMLMatch = false;
            let selectedTabDate = tabDateItem;
            let ofmSum = "1";
            var couponID = 'tgCou' + ++couponCount;
            let otherMatchRow = [];
            if (tableType.toLowerCase().indexOf("presales") >= 0) {
                couponID += "ref";
            }
            otherDateMatches.forEach(function (singleCoupon, couponIndex) {
                let couponMatchDate = singleCoupon.matchDate.split("T")[0];
                if (couponMatchDate == tabDateItem) {
                    _matchDay = singleCoupon.matchDay;
                    oddsTable_tournaments.forEach(function (singleTournament, tounaIndex) {
                        if (singleTournament.tournamentID == singleCoupon.tournament.tournamentID) {
                            dateMatchTournament = singleTournament;
                        }
                    });

                    if (isML(_oddsType) && !hasMLMatch && singleCoupon[_oddsType.toLowerCase() + "odds"].LINELIST.length > 1 && !checkInplayLink(singleCoupon, _oddsType, pageName)) {
                        hasMLMatch = true;
                    }
                    let dateMatchRow;
                    if (pageName == "OFM") {
                        if (singleCoupon.featureMatch == null || singleCoupon.featureMatch.topPriority == null || singleCoupon.featureMatch.topPriority == "false") {
                            dateMatchRow = <MatchRow altRow={altRow % 2} match={singleCoupon} tournament={dateMatchTournament} key={singleCoupon.matchID} tableType={tableType} couponID={"tgCouordinaryId"} />;
                            ordinaryFeaturedMatchRow.push(dateMatchRow);
                            altRow++;
                        } else if (singleCoupon.featureMatch.topPriority == "true") {
                            dateMatchRow = <MatchRow altRow={altRowMid % 2} match={singleCoupon} tournament={dateMatchTournament} key={singleCoupon.matchID} tableType={tableType} couponID={"tgCoutopFeaturedId"} />;
                            topFeaturedMatchRow.push(dateMatchRow);
                            altRowMid++;
                        }
                    } else {
                        dateMatchRow = <MatchRow altRow={altRow % 2} match={singleCoupon} tournament={dateMatchTournament} key={singleCoupon.matchID} tableType={tableType} couponID={couponID} />;
                        otherMatchRow.push(dateMatchRow);
                        altRow++;
                    }
                }
            });
            if (pageName == "OFM") {
                couponTmpArr = getOFMTableList(topFeaturedMatchRow, ordinaryFeaturedMatchRow, _matchDay, hasMLMatch);
            } else {
                if (otherMatchRow.length > 0) {
                    var selectedTabDateFormat = formatDDMMYYYY(selectedTabDate);
                    let selectedTabDateObj = new Date(selectedTabDate);
                    couponTmpArr.push(<Coupon matchRow={otherMatchRow} matchDate={selectedTabDateFormat} matchDateType="CurrentDay" matchDay={_matchDay} key={selectedTabDateObj.getTime()} hasMLMatch={hasMLMatch} couponID={couponID} couponNo={couponCount} />);
                }
            }
        });
    } else {

        otherDateMatches.forEach(function (singleCoupon, couponIndex) {

            let ofmSum = "1";
            var selectedTabDate = "";
            var couponID = 'tgCou' + ++couponCount;
            let otherMatchRow = [];
            if (tableType.toLowerCase().indexOf("presales") >= 0) {
                couponID += "ref";
            }

            selectedTabDateArra.forEach(function (tabDateItem) {

                selectedTabDate = tabDateItem;
                let couponMatchDate = singleCoupon.matchDate.split("T")[0];
                if (couponMatchDate == tabDateItem) {
                    _matchDay = singleCoupon.matchDay;
                    oddsTable_tournaments.forEach(function (singleTournament, tounaIndex) {
                        if (singleTournament.tournamentID == singleCoupon.tournament.tournamentID) {
                            dateMatchTournament = singleTournament;
                        }
                    });

                    if (isML(_oddsType) && !hasMLMatch && singleCoupon[_oddsType.toLowerCase() + "odds"].LINELIST.length > 1 && !checkInplayLink(singleCoupon, _oddsType, pageName)) {
                        hasMLMatch = true;
                    }
                    let dateMatchRow;
                    if (pageName == "OFM") {
                        if (singleCoupon.featureMatch == null || singleCoupon.featureMatch.topPriority == null || singleCoupon.featureMatch.topPriority == "false") {
                            dateMatchRow = <MatchRow altRow={altRow % 2} match={singleCoupon} tournament={dateMatchTournament} key={singleCoupon.matchID} tableType={tableType} couponID={"tgCouordinaryId"} />;
                            ordinaryFeaturedMatchRow.push(dateMatchRow);
                            altRow++;
                        } else if (singleCoupon.featureMatch.topPriority == "true") {
                            dateMatchRow = <MatchRow altRow={altRowMid % 2} match={singleCoupon} tournament={dateMatchTournament} key={singleCoupon.matchID} tableType={tableType} couponID={"tgCoutopFeaturedId"} />;
                            topFeaturedMatchRow.push(dateMatchRow);
                            altRowMid++;
                        }
                    } else {
                        dateMatchRow = <MatchRow altRow={altRow % 2} match={singleCoupon} tournament={dateMatchTournament} key={singleCoupon.matchID} tableType={tableType} couponID={couponID} />;
                        otherMatchRow.push(dateMatchRow);
                        altRow++;
                    }
                }
            });
            if (pageName == "OFM") {
                couponTmpArr = getOFMTableList(topFeaturedMatchRow, ordinaryFeaturedMatchRow, _matchDay, hasMLMatch);
            } else {
                if (otherMatchRow.length > 0) {
                    var selectedTabDateFormat = formatDDMMYYYY(selectedTabDate);
                    let selectedTabDateObj = new Date(selectedTabDate);
                    couponTmpArr.push(<Coupon matchRow={otherMatchRow} matchDate={selectedTabDateFormat} matchDateType="CurrentDay" matchDay={_matchDay} key={selectedTabDateObj.getTime()} hasMLMatch={hasMLMatch} couponID={couponID} couponNo={couponCount} />);
                }
            }
        });
    }


    couponCount = 0;
    return couponTmpArr;
}

// Load "All" Featured Matches data list
function oddsTabAllFeaturedMatchesDateTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType) {
    let otherDateMatches = [];
    let couponTmpArr = [];

    selectedTabDateArra = [];
    let dt = new Date();
    dt.setTime(dt.getTime() + (jsOffsetTime * 1000));
    oddsTable_coupons.forEach(function (singleCoupon, couponIndex) {
        if (singleCoupon.featureMatch != null && (singleCoupon.featureMatch.startTime == null || dt >= new Date(singleCoupon.featureMatch.startTime))) {
            let couponMatchDate = singleCoupon.matchDate.split("T")[0];
            if (jQuery.inArray(couponMatchDate, selectedTabDateArra) === -1) {
                selectedTabDateArra.push(couponMatchDate);
            }
            otherDateMatches.push(singleCoupon);
        }
    });

    otherDateMatches.sort(function (x, y) {
        if (x.featureMatch.seq < y.featureMatch.seq) {
            return -1;
        }
        else if (x.featureMatch.seq > y.featureMatch.seq) {
            return 1;
        }
        return 0;
    });

    let _matchDay;
    let altRow = 1;
    let altRowMid = 1;
    var hasMLMatch = false;
    let dateMatchTournament;
    let ordinaryFeaturedMatchRow = [];
    let topFeaturedMatchRow = [];

    otherDateMatches.forEach(function (singleCoupon, couponIndex) {
        var couponID = 'tgCou' + ++couponCount;
        let otherMatchRow = [];
        hasMLMatch = false;

        if (tableType.toLowerCase().indexOf("presales") >= 0) {
            couponID += "ref";
        }
        selectedTabDateArra.forEach(function (tabDateItem) {
            let couponMatchDate = singleCoupon.matchDate.split("T")[0];

            if (couponMatchDate == tabDateItem) {
                oddsTable_tournaments.forEach(function (singleTournament, tounaIndex) {
                    if (singleTournament.tournamentID == singleCoupon.tournament.tournamentID) {
                        dateMatchTournament = singleTournament;
                    }
                });

                if (isML(_oddsType) && !hasMLMatch && singleCoupon[_oddsType.toLowerCase() + "odds"].LINELIST.length > 1 && !checkInplayLink(singleCoupon, _oddsType, pageName)) {
                    hasMLMatch = true;
                }
                let dateMatchRow = <MatchRow altRow={altRow % 2} match={singleCoupon} tournament={dateMatchTournament} key={singleCoupon.matchID} tableType={tableType} couponID={"tgCouordinaryId"} />;
                ordinaryFeaturedMatchRow.push(dateMatchRow);
                altRow++;
            }

        });
        couponTmpArr = getOFMTableList(topFeaturedMatchRow, ordinaryFeaturedMatchRow, _matchDay, hasMLMatch);
    });

    couponCount = 0;

    return couponTmpArr;
}

function getOFMTableList(topFeaturedMatchRow, ordinaryFeaturedMatchRow, _matchDay,hasMLMatch)
{ 
    let couponTmpArr = [];
    //The number of matches on the last page of matches for the current date
    let matchRowEndMatchCount = "";
    //end page of the current date
    let matchRowEndPage = "";
    let totalRow = [];
  
    paginationCalculator([topFeaturedMatchRow, ordinaryFeaturedMatchRow]);
    matchRowEndMatchCount = topFeaturedMatchRow.length % maxMatch;
    //end page of the current date
    matchRowEndPage = Math.ceil(topFeaturedMatchRow.length / maxMatch);  
     totalRow = [].concat.apply(topFeaturedMatchRow, ordinaryFeaturedMatchRow);
    
    let matchNum = startMatch + matchRowEndMatchCount;
    if (totalRow.length > 0 && selectedMatcheId != "0") {
        curPage = 1;
        couponTmpArr = matchOptionChange(totalRow, _matchDay, hasMLMatch, _oddsType);
    } else {
        if (topFeaturedMatchRow.length > 0 && (curPage < matchRowEndPage || (curPage == matchRowEndPage && matchRowEndMatchCount >= 0) || totalMatch <= maxMatch)) {
            topFeaturedMatchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch
                && curPage == matchRowEndPage ? totalRow.slice(startMatch, matchNum) : totalRow.slice(startMatch, endMatch);
            couponTmpArr.push(<Coupon matchRow={topFeaturedMatchRow} matchDate={jstopfeaturedmatches} matchDateType="NextDay" matchDay={_matchDay} key={curPage + "topFeaturedMatch"} hasMLMatch={hasMLMatch} couponID='tgCoutopFeaturedId' />);

        }
        if (ordinaryFeaturedMatchRow.length > 0 && (curPage > matchRowEndPage || (curPage == matchRowEndPage && matchRowEndMatchCount > 0) || totalMatch <= maxMatch)) {
            ordinaryFeaturedMatchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch
                && curPage == matchRowEndPage ? totalRow.slice(matchNum, endMatch) : totalRow.slice(startMatch, endMatch);
            couponTmpArr.push(<Coupon matchRow={ordinaryFeaturedMatchRow} matchDate={jsordinaryfeaturedmatches} matchDateType="NextDay" matchDay={_matchDay} key={curPage + "OrdinaryFeaturedMatches"} hasMLMatch={hasMLMatch} couponID='tgCouordinaryId' />);

        } 
    }
    return couponTmpArr;
}
    
class OddsTableHeader extends React.Component {
    render() { 

        // Screening date
        var coupsonList = this.props.coupons;//removeRepeat(this.props.coupons);
        if (this.props.oddsType.match(/^(SPC|CRS|FCS|FGS|DHCP|CHP|ALL)$/)) {
            // WUCHeader
            return <div>
                <OddsTableInfo tableType={this.props.tableType} oddsType={this.props.oddsType} />
                <div id="oddAllUpCalDiv"><OddsTableAllUpCalculator /></div>
                <OddsTableDateTournTab OddsTableTournaments={this.props.tournaments} OddsTableMatches={coupsonList} oddsType={this.props.oddsType} />
                <MatchSelectList OddsTableTournaments={this.props.tournaments} OddsTableMatches={this.props.coupons}  />
                <PageInfo type="header" />
                <ColumnTitle />
            </div>;
        } else {
            return <div>
                <OddsTableInfo tableType={this.props.tableType} oddsType={this.props.oddsType} />
                {pageName == "MIXALLUPLIST" ? null : < div id="oddAllUpCalDiv"><OddsTableAllUpCalculator /></div>}
                {pageName == "OFM" ? null : <OddsTableDateTournTab OddsTableTournaments={this.props.tournaments} OddsTableMatches={coupsonList} oddsType={this.props.oddsType} />}
                {curTabType == tabType.Competition ? (this.props.tournaments.length > 0 ? <PageInfo type="header" /> : null) : <PageInfo type="header" />}
                {curTabType == tabType.Competition ? (this.props.tournaments.length > 0 ? <ColumnTitle /> : null) : <ColumnTitle />}
            </div>;
        }
    }
}

class OddsTableAllUpCalculator extends React.Component {
    constructor(props) {
        super(props);
        divCalErrMsg = '';
        this.state = {
            expand: getDataArr().length > 0,
            unitBet: parseInt(getDivCalUnitbet("ALUPX")),
            validUnitBet: true,
            formulaIdx: this.props.formulaIdx == null ? 0 : this.props.formulaIdx
        };
        this.onItemClick = this.onItemClick.bind(this);
    }
    onItemClick(event) {
        this.setState({ expand: !this.state.expand });
    }
    onUpdateUnitBet(e) {
        divCalErrMsg = '';
        if (chkAmount(e, 0)) {
            this.setState({ unitBet: parseInt(e.target.value), validUnitBet: true });
        } else if (e.target.value == '') {
            this.setState({ unitBet: '', validUnitBet: false });
        }
    }
    onBlurUnitBet(e) {
        if (!chkAmount(e, 10)) {
            alert(jsunitbeterror);
            this.setState({ unitBet: parseInt(getDefaultAmount("ALUPX")), validUnitBet: true });
        }
    }
    render() {
        var para = dataStore.getItem("tmpAllupBetline");
        if (para != null && para != '') {
            var isAddedEntry = tryAddArr(JSON.parse(para));
            dataStore.removeItem("tmpAllupBetline");
            this.setState({ expand: true, formulaIdx: 0});
        }

        var dataArr = getDataArr();
        var hasLine = hasLinePools();
        var widthStyles = [91, 60, 215, 0, 67, 75, 85, 60];
        if (hasLine)
            widthStyles = [91, 60, 130, 79, 67, 75, 85, 60];

        let dCalTable = [];
        let dCalRes = [];
        if (dataArr.length > 0) {
            dCalTable.push(<div className="divCalRow">
                <div className="divCalTableHead" style={{ width: widthStyles[0] + 'px' }}>{jsdivcal_type}</div>
                <div className="divCalTableHead" style={{ textAlign: 'left', width: widthStyles[1] + 'px' }}>{jsoddstable_eventid}</div>
                <div className="divCalTableHead" style={{ width: widthStyles[2] + 'px' }}>{jsteams1}<br />{jsteams2}</div>
                {hasLine ? <div className="divCalTableHead" style={{ width: widthStyles[3] + 'px' }}>{jsdivcal_line}</div> : null}
                <div className="divCalTableHead" style={{ width: widthStyles[4] + 'px' }}>{jsdivcal_selection}</div>
                <div className="divCalTableHead" style={{ width: widthStyles[5] + 'px' }}>{jsdivcal_odds}</div>
                <div className="divCalTableHead" style={{ width: widthStyles[6] + 'px' }}>{jsdivcal_results}</div>
                <div className="divCalTableHead" style={{ width: widthStyles[7] + 'px' }}>{jsdivcal_delete}</div>
            </div>);

            var bgColor = ['divCalTableBg1', 'divCalTableBg2'];
            for (var i = 0; i < dataArr.length; i++) {
                var pool = dataArr[i][1];
                var isLinePool = pool.match(/^(HIL|EHL|FHL|CHL|ECH)$/);
                let winSel = null;
                let delBtn = drawDelBtn(this, i);
                if (pool.match(/^(HDC|EDC)$/)) {
                    winSel = drawHDCSelect(this, dataArr[i], i);
                } else if (isLinePool) {
                    winSel = drawHILSelect(this, dataArr[i], i);
                } else {
                    winSel = drawWinLossIcon(this, dataArr[i], i);
                }

                let itemGoalNo = '';
                if (pool.match(/^(NTS|ENT)$/)) {
                    itemGoalNo = getGoalNoByItemNo(dataArr[i][23], curLang);
                }

                dCalTable.push(<div className="divCalRow">
                    <div className={`divCalTableCellLeft ${bgColor[i % 2]}`}>{GetResourcesByLang(pool, curLang)}{itemGoalNo}</div>
                    <div className={`divCalTableCellLeft ${bgColor[i % 2]}`}>{dataArr[i][3]}</div>
                    <div className={`divCalTableCellLeft ${bgColor[i % 2]}`}>{getTeamVs(dataArr[i])}</div>
                    {hasLine ? <div className={`divCalTableCellCenter ${bgColor[i % 2]}`}>{isLinePool ? '[' + dataArr[i][12] + ']' : '-'}</div> : null}
                    <div className={`divCalTableCellCenter ${bgColor[i % 2]}`}>{curLang == 'ch' ? dataArr[i][6] : dataArr[i][5]}</div>
                    <div className={`divCalTableCellCenter ${bgColor[i % 2]}`}><span className="red">{dataArr[i][4]}</span></div>
                    <div className={`divCalTableCellCenter ${bgColor[i % 2]}`}>{winSel}</div>
                    <div className={`divCalTableCellCenter ${bgColor[i % 2]}`}>{delBtn}</div>
                </div>);
            }
            
        }

        var unitBet = this.state.unitBet;
        var totalDiv = 0;
        var winningBet = 0;
        var comb = this.state.formulaIdx;
        var noOfComb = dataArr.length > 0 ? 1 : '-';
        var combArr = ['1'];
        var totalInv = '-';
        var totalAmount = '-';
        var netReturn = '-';
        if (dataArr.length > 1) {
            comb = this.state.formulaIdx;
            var tmp = formulaItem[dataArr.length][comb];
            combArr = tmp.split('#');	//if 3x7, 1#2#3#12#13#23#123
            noOfComb = combArr.length;
        }

        var netReturnStyle = 'divCalResultCell';
        if (dataArr.length > 0) {
            for (var i = 0; i < noOfComb; i++) {
                var tmpDiv = 1;
                for (var j = 0; j < combArr[i].length; j++) {
                    var idx = parseInt(combArr[i].charAt(j)) - 1;
                    var factor = 0;
                    if (dataArr[idx][17].indexOf('/') >= 0) {
                        var tmpLine = dataArr[idx][17].split('/');
                        for (var k = 0; k < tmpLine.length; k++) {
                            if (tmpLine[k] == 'W')
                                factor += 0.5 * parseFloat(dataArr[idx][4]);
                            else
                                factor += 0.5 * parseFloat(tmpLine[k]);
                        }
                    }
                    else {
                        if (dataArr[idx][17] == 'W')
                            factor = parseFloat(dataArr[idx][4]);
                        else
                            factor = parseFloat(dataArr[idx][17]);
                    }
                    tmpDiv *= factor;
                }
                if (tmpDiv > 0)
                    winningBet++;
                totalDiv += tmpDiv;
            }

            if (this.state.validUnitBet) {
                totalInv = unitBet * noOfComb;
                totalAmount = ToDollarsAndCents_calculator(unitBet * totalDiv);
                netReturn = ToDollarsAndCents_calculator(totalAmount - totalInv);

                if (hasHDCPool() && totalInv < 200 && divCalErrMsg.length == 0) {
                    divCalErrMsg = jsdivcal_msg_hdcWarningMsg;
                }

                checkExceedMaxDiv(dataArr.length, this.state.formulaIdx, totalAmount);
            }

            netReturnStyle += netReturn > 0 ? ' green-bold' : ' red-bold';

        } else {
            netReturnStyle += ' red-bold';
        }

        totalInv = totalInv == '-' ? totalInv : '$' + totalInv
        totalAmount = totalAmount == '-' ? totalAmount : '$' + totalAmount
        netReturn = netReturn == '-' ? netReturn : '$' + netReturn

        dCalRes.push(<div style={{ width: "634px" }}>
            <div style={{ float: "left", width: "80%" }}>
                <div className="divCalRow">
                    <div style={{ display: "table-cell", width: "100px" }}>{jsformula}</div>
                    <div style={{ display: "table-cell", width: "90px" }}>{jsunitbet} $</div>
                    <div className="divCalResultHeadCell" style={{ width: "60px" }}>{jsbet}</div>
                    <div className="divCalResultHeadCell" style={{ width: "92px" }}>{jstotalinvestment}</div>
                    <div className="divCalResultHeadCell" style={{ width: "80px" }}>{jsmaxDividend}</div>
                    <div className="divCalResultHeadCell" style={{ width: "93px" }}>{jsmaxNetReturn}</div>
                </div>
                <div className="divCalRow">
                    <div style={{ display: "table-cell" }}>{drawDivCalFormulaDropdown(this)}</div>
                    <div style={{ display: "table-cell" }}><input id="calDivUnitbet" value={this.state.unitBet} maxLength="6" onChange={(e) => { this.onUpdateUnitBet(e); }} onBlur={(e) => { this.onBlurUnitBet(e); }} className="allup_calculator_input" /></div>
                    <div className="divCalResultCell">{noOfComb}</div>
                    <div className="divCalResultCell">{totalInv}</div>
                    <div className="divCalResultCell">{totalAmount}</div>
                    <div className={netReturnStyle}>{netReturn}</div>
                </div>
            </div>
            <div style={{ float: "right", width: "20%", padding: "5px 0px 0px 0px" }}>
                <div className="addBet" onClick={() => { addDivCalBS(); }} title={jsaddSlip}></div>
            </div>
            <div style={{ clear: "both" }}></div>
            </div>);


        return <div className={"allUpCalDiv"}>
            <div className="tgAlupCalCoupon" id="divCalCoupon" onClick={this.onItemClick}>
                <span className={this.state.expand ? "divCalBtnMinus" : "divCalBtnPlus"}></span>
                <span style={{fontWeight: "bold"}}>{jsAllupCalculator}</span>
            </div>
            {this.state.expand ?
                <div>
                    <div id="divCalTable">{dCalTable}</div>
                    <div id="divCalResult">{dCalRes}</div>
                    <div id="divCalMsg" style={{ padding: "0px 0px 0px 5px" }}>{divCalErrMsg}</div>
                    <div className="divCalButton">
                        <div className="divCalResetBtn" onClick={() => deleteDivCalData(this)} title={jsreset}></div>
                        <div className="clear:both"></div>
                    </div>
                </div>
                : null}
        </div>
    }
}

class OddsTableDateTournTab extends React.Component {

    constructor(props) {
        super(props);

        var tournExp = location.href.match(new RegExp("&tournid=[\\da-z]+"));
        var isExpandTourn = false;
        if (tournExp != null && tournExp.length > 0) {
            isExpandTourn = tournExp[0].split("=")[1].toLowerCase() == "all";
        }
        this.state = {
            defaultShowCount: 16,
            expandTourn: isExpandTourn
        };
    }

    onClickExpandTournBtn() {
        this.setState({ expandTourn: !this.state.expandTourn });
    }

    renderMoreBtn(totalTournamentCount) {

        let showShowallBtn = totalTournamentCount > this.state.defaultShowCount ? { display: "" } : { display: "none" };

        if (this.state.expandTourn) {
            return <p style={showShowallBtn} className="more" onClick={() => this.onClickExpandTournBtn()}>
                <span> {jsoddstab_hide} &#9650;</span>
            </p>
        }
        else {
            return <p style={showShowallBtn} className="more" onClick={() => this.onClickExpandTournBtn()}>
                <span> {jsoddstab_showall} &#9660;</span>
            </p>
        }
    }

    onClickSelectAll() {
        selectAllTournaments();
        this.setState({ expandTourn: true });
    }

    onClickReset() {
        resetTournaments();
        this.setState({ expandTourn: false });
    }

    renderTournAllBtn() {

        return <div className="btn_submit f_clear">
            <p className="btn_left">
                <span id="oddstab_selectall" onClick={() => this.onClickSelectAll()}>{jsoddstab_selectall}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span id="oddstab_reset" onClick={() => this.onClickReset()}>{jsoddstab_reset}</span>
            </p>
            <p className="btn_right"><span id="oddstab_searchbtn">{jsoddstab_searchbtn}</span></p>
        </div>;
    }

    componentDidUpdate(prevProps) {

        let onfocusTournTab = $("span[class=cur]").attr("data-value") == "1" ? false : true;
        if (!onfocusTournTab && this.state.expandTourn) {
            this.setState({ expandTourn: false });
        }
    }

    componentDidMount() {
        if (this.state.expandTourn) {
            selectAllTournaments();
        }

        if ($(".second_ul input:checked").length > 0) {
            this.setState({ expandTourn: true });
            $(".second_ul").show()
        }
    }

    render() {
        var TournamentSpans = [];
        var TournamentSecondSpans = [];
        var TournamentRows = [];
        var TournamentSecondRows = [];
        var MatcheList = [];
        let tournamentBoxCount = 1;
        let tournaRowCount = 1;
        let tournamentData = [];
        let tournamentIds = [];
        let allTabDates = [];
        let defaultShowCount = this.state.defaultShowCount;

        if (pageName == "TQL") {
            tournamentData = this.props.OddsTableTournaments;
        }
        else if (pageName == "CHP") {
            tournamentData = jQuery.grep(this.props.OddsTableTournaments, function (item) {

                // hidden Comprtions tab on Champion page which CHP sub type is not null or CHP sub type is not 0
                let hasCHPSubType = item.chpodds.CHPType == chpSubType || chpSubType == '0' ? true : false;

                if (hasCHPSubType) {
                    return true;
                }
            });
        } else {
            for (var i = 0; i < this.props.OddsTableMatches.length; i++) {
                let _poolcloseDate = "";
                if (this.props.OddsTableMatches[i] != undefined && this.props.OddsTableMatches[i].matchDate != undefined) {
                    _poolcloseDate = this.props.OddsTableMatches[i].matchDate;
                }
                if (jQuery.inArray(_poolcloseDate.split("T")[0], allTabDates) == -1) {
                    allTabDates.push(_poolcloseDate.split("T")[0]);
                }
            }
            allTabDates.sort();

            // get available tournment list
            for (var i = 0; i < this.props.OddsTableTournaments.length; i++) {

                let _tourn = this.props.OddsTableTournaments[i];

                for (var j = 0; j < this.props.OddsTableMatches.length; j++) {

                    let _match = this.props.OddsTableMatches[j];
                    let _tournId = "";

                    if (_match != undefined && _match.matchDate != undefined) {
                        _tournId = _match.tournament.tournamentID;
                    }

                    if (jQuery.inArray(_tourn.tournamentID, tournamentIds) == -1 && _tourn.tournamentID == _tournId) {
                        tournamentIds.push(_tourn.tournamentID);
                        tournamentData.push(_tourn);
                    }
                }
            }

        }
        let tempTournNameList = [];
        tournamentData.forEach(function (item) {

            if (jQuery.inArray(item.tName, tempTournNameList) == -1) {
                tempTournNameList.push(item.tName);

                 // R0a : check sessionStorage if tournmentID match.
                var tmpSessionSelectedTournmentIds = JSON.parse(sessionStorage.getItem("__extendShareSelectedTournsId"));
                if (tmpSessionSelectedTournmentIds == null)
                    tmpSessionSelectedTournmentIds = [];

                if (tournamentBoxCount <= defaultShowCount) {
                    if (tournamentBoxCount == 1 && selectedTournamentIds.length == 0) {
                        TournamentSpans.push(<TournamentSpan key={tournamentBoxCount} tournaments={item} selected="cur" />);
                    }
                    else if (selectedTournamentIds.length > 0 && jQuery.inArray(item.tournamentID, selectedTournamentIds) !== -1) {
                        TournamentSpans.push(<TournamentSpan key={tournamentBoxCount} tournaments={item} selected="cur" />);
                    } else if (tmpSessionSelectedTournmentIds.length > 0 && jQuery.inArray(item.tournamentID, tmpSessionSelectedTournmentIds) !== -1) {
                        TournamentSpans.push(<TournamentSpan key={tournamentBoxCount} tournaments={item} selected="cur" />);
                    }
                    else {
                        TournamentSpans.push(<TournamentSpan key={tournamentBoxCount} tournaments={item} selected="" />);
                    }
                }
                else {
                    if (tournamentBoxCount == 1 && selectedTournamentIds.length == 0) {
                        TournamentSecondSpans.push(<TournamentSpan key={tournamentBoxCount} tournaments={item} selected="cur" />);
                    }
                    else if (selectedTournamentIds.length > 0 && jQuery.inArray(item.tournamentID, selectedTournamentIds) !== -1) {
                        TournamentSecondSpans.push(<TournamentSpan key={tournamentBoxCount} tournaments={item} selected="cur" />);
                    } else if (tmpSessionSelectedTournmentIds.length > 0 && jQuery.inArray(item.tournamentID, tmpSessionSelectedTournmentIds) !== -1) {
                        TournamentSecondSpans.push(<TournamentSpan key={tournamentBoxCount} tournaments={item} selected="cur" />);
                    }
                    else {
                        TournamentSecondSpans.push(<TournamentSpan key={tournamentBoxCount} tournaments={item} selected="" />);
                    }
                    
                }
                if ((tournamentBoxCount % 4 == 0 && tournamentBoxCount <= defaultShowCount) || (tournamentBoxCount == totalTournamentCount)) {
                    TournamentRows.push(<TournamentRow key={tournaRowCount} fourTournaments={TournamentSpans} classStr="f_clear js_selectCompetitionNav" />);
                    TournamentSpans = [];
                    tournaRowCount++;
                }
                if ((tournamentBoxCount % 4 == 0 && tournamentBoxCount > defaultShowCount) || (tournamentBoxCount == totalTournamentCount)) {
                    TournamentSecondRows.push(<TournamentRow key={tournaRowCount} fourTournaments={TournamentSecondSpans} classStr="second_ul f_clear js_selectCompetitionNav" />);
                    TournamentSecondSpans = [];
                    tournaRowCount++;
                }
                tournamentBoxCount++;
            }
        });

        if (TournamentSpans.length > 0) {
            TournamentSecondRows.push(<TournamentRow key={tournaRowCount} fourTournaments={TournamentSpans} classStr="f_clear js_selectCompetitionNav" />);
            TournamentSpans = [];
            tournamentBoxCount++;
        }
        if (TournamentSecondSpans.length > 0) {
            TournamentSecondRows.push(<TournamentRow key={tournaRowCount} fourTournaments={TournamentSecondSpans} classStr="second_ul f_clear js_selectCompetitionNav" />);
            TournamentSecondSpans = [];
            tournamentBoxCount++;
        }
        let totalTournamentCount = tournamentBoxCount - 1;
        let hasOtherTab = false;
 
        // Filter Date
        if (pageName != "TQL" && this.props.OddsTableMatches != null && this.props.OddsTableMatches != undefined && this.props.OddsTableMatches != "" && this.props.OddsTableMatches.length > 0) { 
            
            let _hasCurTab = false;
            let dateTabList = getNormalTabList(allTabDates);

            let tempMatches = removeRepeat(this.props.OddsTableMatches);
            for (var i = 0; i < dateTabList.length; i++) {
                for (var y = 0; y < tempMatches.length; y++) {
                    let _matcheDay = tempMatches[y].matchDay;
                    let _matcheDate = GetDateStr(tempMatches[y].matchDate, "0");
                    let _selectedTabDate = getFormattedDateStr(tempMatches[y].matchDate);

                    if (_selectedTabDate == dateTabList[i] && pageName != "OFM" && pageName != "MIXALLUPLIST") {
                        let _seletedTab = "";
                        if (selectedTabDateArra.length > 0 && selectedTabDateArra[0] == _selectedTabDate) {
                            _seletedTab = "cur";
                            _hasCurTab = true;
                        }
                        if (i >= otherLength - 1) {
                            hasOtherTab = true;
                        }
                        MatcheList.push(<MatcheSpan key={tempMatches[y].matchID} selectedTabDate={_selectedTabDate} matchDate={_matcheDate} matchDay={_matcheDay} selected={_seletedTab} otherNum={i} />);

                    } else if ((pageName == "OFM" || pageName == "MIXALLUPLIST") && i == 0 && y == 0) {
                        MatcheList.push(<div data-value="All" className="cur">{jsAll}<span></span></div>);
                        _hasCurTab = true;
                    }
                }
                
            }

            allTabDateList = allTabDates;
            otherTabDates = getOtherTabList(allTabDates);

            if (selectedTabDateArra.length == 1) {
                let isInOtherTab = false;
                otherTabDates.forEach(function (_otherTabDate, index) {
                    if (_otherTabDate == selectedTabDateArra[0]) {
                        selectedTabDateArra = [];
                        otherTabDates.forEach(function (_otherTabDate2, index) {
                            selectedTabDateArra.push(_otherTabDate2.split("T")[0]);
                        });
                        isInOtherTab = true;
                    }
                });

                curDateType = isInOtherTab ? dateType.Other : dateType.Single;
            }

            if (otherTabDates.length > 0 && !hasOtherTab) {
                MatcheList.push(<div data-value="Others"><span className="otherdate">{jsOthers}</span></div>);
            }
        }

        let tournAllBtn = this.renderTournAllBtn();
        dateTournaTabInited = false;
 
        return <div className={pageName == "OFM" ? "DataCompetition_hide" : "DataCompetition_nav"}>
            <div className="nav f_clear js_selectNav">
                <OddsTableSelectNav onlyCompetition={MatcheList != null && MatcheList.length > 0 ? false : true} /> 
                <div id="tabLoading"></div>
            </div>
            <div className={curTabType == tabType.Date ? "date_nav" : "date_nav DataCompetition_hide"}>
                <div id="SelectDateTimeId">
                    {MatcheList}
                </div>
            </div>
            <div className={curTabType == tabType.Competition ? "competition_nav" : "competition_nav DataCompetition_hide"}>
                {TournamentRows}
                {TournamentSecondRows}
                <ul className="third_ul f_clear js_selectCompetitionNav">
                </ul>
                {this.renderMoreBtn(totalTournamentCount)}
                {curTabType == tabType.Competition ? (this.props.OddsTableTournaments.length > 0 ?
                    tournAllBtn : null) : tournAllBtn}
            </div>
            {/*<p id="showall_tournament" style={{ display: "none" }} className="page">{jsPagination1} 1 - {totalTournamentCount} {jsPagination2_tab} {totalTournamentCount}{jsLang.toLowerCase() == 'ch' ? jsPagination3_tab : ""}</p>*/}
            {/*<p id="datepage" className="page">Matches 1 - 2 out of 3</p>*/}
        </div>
    }
}

class OddsTableSelectNav extends React.Component {
    render() {
        let onlyCompetition = this.props.onlyCompetition == null || this.props.onlyCompetition == undefined ? false : this.props.onlyCompetition;
        
        if (pageName == "MIXALLUPLIST") {
            return <p>
                <span className={(countFeatureMatch == 0 && curTabType != tabType.Competition)|| curTabType == tabType.Date ? "cur" : ""} data-value="1">{jsoddstab_bydate}</span>
                <span data-value="2" className={curTabType == tabType.Competition ? "cur" : ""}>{jsoddstab_bycompetitions}</span>
                {countFeatureMatch > 0 ? <span className={curTabType == tabType.Feature ? "cur" : ""} data-value="0">{jsoddstab_byfeaturedmatches}</span> : null}
            </p>
        }else{
            return <p>
                <span className={onlyCompetition || curTabType == tabType.Competition ? "" : "cur"} data-value="1" style={{ display: onlyCompetition ? "none" : "" }}>{jsoddstab_bydate}</span>
                <span data-value="2" className={onlyCompetition || curTabType == tabType.Competition ? "cur" : ""}>{jsoddstab_bycompetitions}</span>
        </p>
        }
    }
}

class TournamentRow extends React.Component {
    render() {
        let tournaRow = [];

        this.props.fourTournaments.forEach(function (singleTournament) {
            tournaRow.push(singleTournament);
        });

        return <ul className={this.props.classStr}>{tournaRow}</ul>
    }
}

class TournamentSpan extends React.Component {

    render() {
        let item = this.props.tournaments;
        let _tournamentName = item['tournamentName' + curLang.toUpperCase()];
        let tabId = "cbTourn_" + item.frontEndId

        return <li className={this.props.selected} data-value={item.tName} data-frontEndId={item.frontEndId}
            data-code={item.tournamentShortName} data-namecn={item.tournamentNameCH} data-nameen={item.tournamentNameEN}>
            <div>
                <input id={tabId} type="checkbox" defaultChecked={this.props.selected == "cur"} />
                <span>{_tournamentName}</span> 
            </div>
        </li>
    }
}

class MatcheSpan extends React.Component {
    render() {
        let tabDate = this.props.selectedTabDate.split("T")[0];
        var spanMatchDay = DateWeekLanguageSwitch(this.props.matchDay);
         
        if (this.props.otherNum < otherLength - 1) {
            return <div className={this.props.selected} data-value={tabDate}>{this.props.matchDate}<br /><span>({spanMatchDay})</span></div>
        } else {
            return <div className={this.props.selected} data-value="Others"><span className="otherdate">{jsOthers}</span></div>
        }
    }
}

// green bar on top of the odds table, may appear twice in a page
class OddsTableInfo extends React.Component {
    render() {
        let _oddsType = this.props.oddsType;
        let displayRefreshInfo = pageName != "DHCP";

        let _displayAddBet = (this.props.tableType.toLowerCase().indexOf("presales") == -1 && this.props.tableType != "NoMatch" && pageName != "INDEX" && pageName != "MIXALLUPLIST" && pageName != "MIXALLUP");
        let _displayPrint = _displayAddBet || (pageName == "DHCP" || pageName == "INDEX" || pageName == "MIXALLUPLIST" || pageName == "MIXALLUP");

        let refreshInfo = "";
        let extraInfo = "";
        if (pageName == "DHCP") {
            // calculator
            let _clink = <a href={`javascript:NewWindow('/football/cal/dhcp_cal/dhcpcalculator2.aspx?Lang=${jsLang}', 'dhcpcalculator2', '730', '550', 'no', 'no')`}>{jsdhcpcalculator}</a>
            let _cimg = <Img src={`${commonImagePath}icon_calculator.gif${cacheVersion}`} title={jsdhcpcalculator} alt="" onClick={() => NewWindow(`/football/cal/dhcp_cal/dhcpcalculator2.aspx?Lang=${jsLang}`, 'dhcpcalculator2', '730', '550', 'no', 'no')} />;

            // dhcpdividend
            let _dlink = <a href={'#'} onClick={() => switchTo('football', 'results/dhcp_results', curLang)}>{jsdhcpdividend}</a>;
            let _dimg = <img src={`${commonImagePath}icon_6hafu.gif${cacheVersion}`} title={jsdhcpdividend} alt="" onClick={() => switchTo('football', 'results/dhcp_results', curLang)} />;

            extraInfo = <span> {_clink}{_cimg}  {_dlink}{_dimg} </span>;
        } else {
            refreshInfo = <span>
                <a className="nolnk">{jsrefreshat}:<label id="sRefreshTime"></label></a>
                <a className="refresh" href="javascript:refreshOddsPage();">{jsrefresh}</a>
                <a className="refresh">
                    <span className="spicon">
                        <img src={`/info/include/images/icon_refresh.gif${cacheVersion}`} className="pointer icon" alt={jsrefresh} title={jsrefresh} onClick={() => { refreshOddsPage() }} />
                    </span>
                </a>
            </span>;
        }

        if (pageName == "MIXALLUPLIST") {
            refreshInfo = null;
            extraInfo = null;
            _displayAddBet = false;
        }

        let rightContent = null;

        if (this.props.tableType != "NoMatch" && this.props.tableType != "PresalesMatches" && (this.props.hidebutton == undefined || !this.props.hidebutton)) {
            rightContent = <div className="right">
                {_displayPrint ?
                    <span>
                        <a className="cActionsPrint" href={`javascript:printNow('${location.pathname}${location.search}&pv=1');`}>{jsprintdata}</a>
                        <a className="spiconPrint"><span className="spicon"><img src={`/info/include/images/icon_print.gif${cacheVersion}`} className="pointer icon" onClick={() => { printNow(`${location.pathname}${location.search}&pv=1`) }} alt={jsprintdata} title={jsprintdata} /></span></a>
                    </span>
                    : null
                }
                {refreshInfo}
                {extraInfo}
                {_displayAddBet ?
                    <AddBetBtn /> : null}
            </div>
        }

        return <div className="oHeader">
            <div className="tblHeader">
                <div className="normalheader">
                    <div className="left">
                        <span className="cDelim">
                            <img src="/info/include/images/stroke_yellow.gif?CV=L1.00R1a" alt="" title="" />
                        </span>
                        {formatOddsHeader(pageName, this.props.tableType, "", "")}
                    </div>
                    {rightContent}
                </div>
            </div>
        </div>;
    }
}

class PageInfo extends React.Component {

    pageInfo() {

        if (isResultPage(pageName)) {
            return <div className="left">
                {jsPagination1} {startMatch} - {endMatch} {jsPagination2} {totalMatch} {jsLang.toLowerCase() == 'ch' ? jsPagination3 : ""}
            </div>
        }
        else if (this.props.type == "header") {
            return <div className="left">
                {jsPagination1} {startMatch + 1} - {endMatch} {jsPagination2} {totalMatch} {jsLang.toLowerCase() == 'ch' ? jsPagination3 : ""}
            </div>
        } else {
            return null;
        }
    }

    render() {
        if (this.props.type != "header" || couponCount == 0) {
            return <div className="pagination">
                <div className="row">
                    {this.pageInfo()}
                    <Pagination />
                    <div className="clear"></div>
                </div>
                {isResultPage(pageName) ? null : <div className="separator"></div>}
            </div>
        } else {
            return null;
        }
    }
}

class Pagination extends React.Component {
    render() {
        if (totalMatch > maxMatch) {
            let totalPage = Math.ceil(totalMatch / maxMatch);
            let maxPage = 10;
            let pagination;
            let prevPages = [];
            let nextPages = [];

            let pStartPage, pEndPage;
            if (totalPage > maxPage) {
                pStartPage = (Math.floor((curPage - 1) / 10) * 10) + 1;
                if ((pStartPage + 9) > totalPage) {
                    pEndPage = totalPage;
                } else {
                    pEndPage = pStartPage + 9;
                }
            } else {
                pStartPage = 1;
                pEndPage = totalPage;
            }
            if (pStartPage > 1) {
                prevPages.push(<PageSelection _className={`ppnBG`} key={`psPrev`} targetPage={pStartPage - 1} displayText={`...`} />)
            }
            for (let i = pStartPage; i < curPage; i++) {
                prevPages.push(<PageSelection _className={`pnBG pgNum`} key={`ps${i}`} targetPage={i} displayText={i} />)
            }
            for (let i = curPage + 1; i <= pEndPage; i++) {
                nextPages.push(<PageSelection _className={`pnBG pgNum`} key={`ps${i}`} targetPage={i} displayText={i} />)
            }
            if (pEndPage < totalPage) {
                nextPages.push(<PageSelection key={`psBext`} targetPage={pEndPage + 1} displayText={`...`} />)
            }
            let pageContent = <span>
                {(curPage != 1) ? <span className="spnLink" onClick={() => goToPage(curPage - 1)}>{jsPrevious}</span> : null} &nbsp;
              {prevPages}
                <span className="cpnBG pgNum">{curPage}</span>&nbsp;
              {nextPages}
                {(curPage != totalPage) ? <span className="spnLink" onClick={() => goToPage(curPage + 1)}>{jsNext}</span> : null} &nbsp;
            </span>
            pagination = <div className="right">
                <span className="sOpen">&lt;&lt;</span>
                {pageContent}
                <span className="sClose">&gt;&gt;</span>
            </div>
            return pagination
        } else {
            return null;
        }
    }
}

class PageSelection extends React.Component {
    render() {
        var i = this.props.targetPage;
        var displayText = this.props.displayText;
        var _className = this.props._className;
        //return <span><span className="spnLink pnBG" onClick={()=>goToPage(i)}>{displayText}</span> </span>
        return <span><span className={`spnLink ${_className}`} onClick={() => goToPage(i)}>{displayText}</span> </span>;
    }
}

class MatchSelectList extends React.Component {
    render() {
        let optionList = [];  
        let tournamentList = this.props.OddsTableTournaments;
        let matchList = this.props.OddsTableMatches;
        let singleMatch = this.props.SingleMatch;
        var _oddsType = oddsType;
        if (pageName == "INDEX" || pageName == "INDEX_HAD") {
            _oddsType = "HAD";
        }

        if (curTabType == tabType.Date) {
            optionList = getDateOptinList(tournamentList, matchList, singleMatch.matchID); 
        } else {
            optionList = getCompetitionOptinList(tournamentList, matchList, singleMatch.matchID); 
        }

        homeTeamName = jsLang.toLowerCase() == 'ch' ? singleMatch.homeTeam.teamNameCH : singleMatch.homeTeam.teamNameEN;
        awayTeamName = jsLang.toLowerCase() == 'ch' ? singleMatch.awayTeam.teamNameCH : singleMatch.awayTeam.teamNameEN;
        let tournamentName = "";
        let code = "";

        let _vsStr = jsVS;
        let headerEsst = null;
        let litTotalCorner = null;
        let _ninetyMinsScore = null;
        let spInplay = null;
        if (isInplay) {
            if (!singleMatch.isVoidMatch() && singleMatch.IsMatchKickOff()) {
                _vsStr = formatInplayTeamAndStatus(singleMatch.ipinfo, "matchresult", singleMatch.matchTime, _isHalfTimePage);
            }

            if (singleMatch.ipinfo[3] != "-1") {
                let _scoure = _vsStr == "---:---" ? "---:---" : singleMatch.ipinfo[3];
                _ninetyMinsScore = <span>
                    <span className="utext">{jsres_fulltime}</span> [{_scoure}]
                    </span>;
            }

            let statemsg;
            // check if nts available
            if (singleMatch.isNTSDefined()) {
                statemsg = <span className="spntsinfo" id="ntsinfo"><span className="space"></span>
                    <a href={`javascript:showNTSPanel();`} title={`${jsscoringInformationAlt}`}>
                        {jsscoringInformation}
                    </a>
                    <NTSInfoTable _matchID={singleMatch.matchIDinofficial} />
                </span>;
                //;
            } else {
                statemsg = null;
            }

            headerEsst = <span key="headerEsst" className="esst left">
                <input type="hidden" id={`hsst${singleMatch.matchID}`} value={`${singleMatch.ipinfo[1]}`} />
                <span>{formatInplayTeamAndStatus(singleMatch.ipinfo, "stagemsg", singleMatch.matchTime, _isHalfTimePage)}</span>
                <span id="statemsg">{statemsg}</span>
            </span>;


            // only display corner no. if match is kick off and CHL is selling
            let displayCorner = ((singleMatch.arrPools.indexOf("CHL") != -1 || singleMatch.arrPools.indexOf("ECH") != -1) && singleMatch.IsMatchKickOff());
            let displayCornerNo = ((singleMatch.chlodds != null && isSelling(singleMatch.chlodds.POOLSTATUS, "100", "1"))
                || (singleMatch.echodds != null && isSelling(singleMatch.echodds.POOLSTATUS, "100", "1")));
            litTotalCorner = formatTotalCornerStr(singleMatch.ipinfo[4], displayCorner, displayCornerNo, "");
        }
        let homeAndAwayName = <span>{homeTeamName} <label> {_vsStr} </label>{awayTeamName}</span>;

        tournamentList.forEach(function (tList) {
            if (singleMatch.tournament != undefined) {
                if (singleMatch.tournament.tournamentID == tList.tournamentID) {
                    code = tList.tournamentShortName;
                    tournamentName = tList['tournamentName' + curLang.toUpperCase()];
                }
            }
        });

        let matchOdds = singleMatch[_oddsType.toLowerCase() + "odds"];
        let isInplayOdds = matchOdds != null ? (singleMatch.IsMatchKickOff() && matchOdds.INPLAY == "true") : false;

        return <div className={"clearfloat"}>
            <p>
                <span id="matchValue">{formatEsstStr(singleMatch.matchDate, false) + " " + singleMatch.frontEndId} </span>
                <span className="space"></span>
                <span title={tournamentName}>{formatImageStr([League.GetFlagPath(code), tournamentName, code])} </span>
                <span className="space"></span>
                <span>
                {
                    (pageName != "ALL" && pageName != "INPLAYALL") ? 
                    oddsAllJump(singleMatch.matchID, sTeamString(!isInplay, false, singleMatch, false, true, _oddsType), isInplayOdds)
                    : homeAndAwayName
                }
                </span>
                <span className="space"></span>
                <span className="cvenue">{singleMatch.venue == null ? "" : formatNeutralGroundIcon(singleMatch.venue, "ng")}</span>
                <span className="space"></span>
                {displayInplayClock(pageName) ?
                    <div className="hinplay">{formatInplayIco(singleMatch, "ico", pageName)}</div>
                    : null}
                {_ninetyMinsScore}
                <span className="space"></span>
                <span>{displayHead2Head(pageName) ? formatJumpHeadStr(singleMatch) : ""}</span>
                <span className="space"></span>
                {formatTVIcon(singleMatch.channel, "tvall")}
                <span className="space"></span>
                {litTotalCorner}
            </p>
            {headerEsst}
            <div className={"float-right"}>
                {(optionList.length > 1) ? <select id="matchSelectId">
                    <option value="0" >{jsSelectAnotherMatch}</option>
                    {optionList}
                </select> : null}
            </div>
        </div>;
    }
}

// getDateOptinList
function getDateOptinList(tournamentList, matchList, matchId) { 
    let groupCurOptionList = [];
    let optionList = [];
    selectedTabDateArra.forEach(function (tabDateItem) {
        let tabDateTimeName = GetDateTimeLegName(tabDateItem);
        let hasMatch = false;
        groupCurOptionList.push(<MatcheOption key={"curTabTypeOption" + tabDateItem} matchID={""} matchDate={""} frontEndId={""} code={""} homeAndAwayName={""} optionTyple={curTabType} optionTitle={tabDateTimeName} disabled={true} />);
        matchList.forEach(function (item, index) {
            if (matchId != item.matchID) {
                let selectedTabDate = tabDateItem;
                let matchDateYYYYMMDD = item.matchDate.split("T")[0];
                let groupCur = matchDateYYYYMMDD == selectedTabDate; 
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

                if (groupCur) {
                    groupCurOptionList.push(<MatcheOption key={"groupCurOption" + item.matchID} matchID={item.matchID} matchDate={matchDate} frontEndId={frontEndId} code={code} homeAndAwayName={homeAndAwayName} optionTyple={dateType.groupCur} optionTitle={""} />);
                    hasMatch = true;
                }

            }
        });
        if (!hasMatch) {
            groupCurOptionList.splice(-1, 1);
        }
    });  
    return groupCurOptionList;
}

// getCompetitionOptinList
function getCompetitionOptinList(tournamentList, matchList, matchId)
{
    let optionList = [];
    let selectedTournaMatches = [];

    selectedTournamentIds.forEach(function (value, index) {
        let selectedTournCount = 0;
        tournamentList.forEach(function (singleTournament, tounaIndex) {
            if (singleTournament.tournamentID == value) {
                let tournamentName = singleTournament['tournamentName' + curLang.toUpperCase()]; 
                matchList.forEach(function (item, couponIndex) {
                    if (item.tournament != "" && item.tournament != undefined && item.matchID != matchId) {  
                        if (item.tournament.tournamentID == value) { 
                            if (selectedTournCount == 0)
                                selectedTournaMatches.push("======" + tournamentName + "======");
                            selectedTournaMatches.push(item);
                            selectedTournCount++;
                        }
                    }
                });
            }
        });
    }); 

    selectedTournaMatches.forEach(function (item, couponIndex) { 
        if (item.matchDate != undefined) { 
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
            if ((tMatchID == null || tMatchID == "") && item.chlodds != undefined) {
                selectedMatcheId = item.matchID;
                setMatchId(selectedMatcheId);
            }
            optionList.push(<MatcheOption key={"curTabTypeOption" + item.matchID} matchID={item.matchID} matchDate={matchDate} frontEndId={frontEndId} code={code} homeAndAwayName={homeAndAwayName} optionTyple={curTabType} optionTitle={""}/>);
        } else {
            optionList.push(<MatcheOption key={"curTabTypeOption" + couponIndex} matchID={""} matchDate={""} frontEndId={""} code={""} homeAndAwayName={""} optionTyple={curTabType} optionTitle={item} disabled={true}/>);
        }
    }); 
    return optionList;
}

class MatcheOption extends React.Component {
    render() {
        var disabled = this.props.disabled != null ? "disabled" : null;
        if (this.props.optionTitle == "") {
            return <option value={this.props.matchID} data-type={this.props.optionTyple} disabled={disabled}>
                {this.props.matchDate} {this.props.frontEndId} {this.props.code} {this.props.homeAndAwayName}
            </option> 
        } else {
            return <option value="0" data-type={this.props.optionTyple} disabled={disabled}>{this.props.optionTitle}</option> 

        }
    }
}

class ColumnTitle extends React.Component {
    render() {
        try {
            var oddsTD;
            var _poolType;
            if (this.props.poolType === undefined || this.props.poolType === null) {
                _poolType = oddsType;
            } else {
                _poolType = this.props.poolType;
            }
            oddsTD = getOddsTD(_poolType, "", "");

            if (pageName == "MIXALLUPLIST") {
                return <div className="rhead couponRow">
                    <div className="cesst">
                        {jsesst1}
                        <br />
                        {jsesst2}
                    </div>
                    <div className="cday">{jsoddstable_eventid}</div>
                    <div className="cflag">
                        <a href="javascript:goFlagUrl();">
                            <img src={`/football/info/images/icon_flag.gif${cacheVersion}`} alt={jsleagues_and_tournaments} title={jsleagues_and_tournaments} />
                        </a>
                    </div>
                    <div className="cteams mixallup_team">
                        {jsteams1}
                        <br />
                        {jsteams2}
                    </div>
                    <div className="cvenue"></div>
                    <div className="selectedandclear">
                        {jsmixallupselected}
                        <span id="mixallup_selected">0</span><br />
                        <a href={"javascript:mixUnSelectedAll()"}>{jsmixallupclear}</a>
                    </div>
                </div>
            } else if (pageName == "TQL" || (pageName == "TOURN" && _poolType == "TQL")) {
                let btmborderStyle = pageName == "TQL" ? "" : "rBottomBorder";
                
                return <div className="rhead couponRow">
                        <div className={`cesst ${btmborderStyle}`}>
                            {jsesst1}
                            <br />
                            {jsesst2}
                        </div>
                        <div className={`ccode ${btmborderStyle}`}>{jsTQLCode}</div>
                        <div className={`ctage ${btmborderStyle}`}>{qualifyingStage}</div>
                        <div className={`cteams ${btmborderStyle}`}>{jsteam}</div>
                        <div className={`codds ${btmborderStyle}`}>{jsodds}</div>
                        <div className={`cteams ${btmborderStyle}`}>{jsteam}</div>
                        <div className={`codds ${btmborderStyle}`}>{jsodds}</div>   
                   </div>


            } else {
                return <div className="rhead couponRow">

                    <div className="closeDay">
                        {jsesst1}
                        <br />
                        {jsesst2}
                    </div>

                    <div className="cday">{jsoddstable_eventid}</div>
                    <div className="cflag">
                        <a href="javascript:goFlagUrl();">
                            <img src={`/football/info/images/icon_flag.gif${cacheVersion}`} alt={jsleagues_and_tournaments} title={jsleagues_and_tournaments} />
                        </a>
                    </div>
                    <div className="cteams" >
                        {jsteams1}
                        <br />
                        {jsteams2}
                    </div>
                    <div className="cvenue">
                    </div>
                    {
                        pageName == "INPLAYHAD" ? <div className="ctv">
                            {jsliveinfo}
                        </div> : null
                    }
                    {displayInplayClock(pageName) ?
                        <div className="cinplay">
                            {jsinplaybet1}
                            <br />
                            {jsinplaybet2}
                        </div> : null}
                    {pageName == "INDEX" ?
                        <div className="ctv">
                            <Img src={`${footImagePath}icon_tv.gif${cacheVersion}`} alt="" title="" />
                        </div>
                        :
                        null
                    }
                    {
                        pageName == "INPLAYHAD" ?
                        <div className="cesst">
                            {jsmatchstatus}
                        </div>
                        :
                        null
                    }
                    {
                        isML(_poolType) ?
                            <div className="cline">
                                {jsLine}
                            </div>
                            :
                            null
                    }
                    <div className="cotitle">
                        <div className={pageName == "TTG" ? "" : `rBottomBorder`}>
                            {(pageName == "INPLAYHAD" || pageName == "INDEX") ? jsHAD : jsodds}
                        </div>
                        {pageName == "TTG" ? null : oddsTD}
                    </div>
                    {
                        isML(_poolType) ?
                            <div className="tgIndMl">
                            </div>
                            :
                            null
                    }
                    <div className="cheadtohead">
                        {jsLang.toLowerCase() == "ch" ? jsheadtohead : jshead1}<br />
                        {jsLang.toLowerCase() == "ch" ? "" : jshead2}
                    </div>
                </div>

            }
        } catch (ex) {
            debugLog("ColumnTitle:" + ex);
        }
    }
}

class ColumnTitleSPCByItem extends React.Component {
    render() {
        let _itemInfo = this.props.itemInfo;
        let _couponID = this.props.couponID;
        let oddsTD = [];

        _itemInfo.SELLIST.forEach(function (_selInfo, _sInd) {
            oddsTD.push(<div key={`itemAns${_couponID}${_sInd}`} className="codds">
                ({parseInt(_selInfo.SEL, 10)})<br />
                {jsLang == "CH" ? _selInfo.CONTENTCH : _selInfo.CONTENTEN}
            </div>);
        });

        return <div className={`rhead couponRow ${_couponID}`}> 
            {oddsTD}
        </div>
    }
}

function getOddsTD(_poolType, _cellClassName, _rowClassName) {
    if (_cellClassName == undefined || _cellClassName == null) {
        _cellClassName = "";
    }
    if (_rowClassName == undefined || _rowClassName == null) {
        _rowClassName = "";
    }
    if (_poolType == "HAD" || _poolType == "FHA" || _poolType == "HHA") {
        return <div className={`table ${_rowClassName}`}>
            <span className="codds r2">{jsHomeTeamWin}</span>
            <span className="codds r2">{jsDRAW}</span>
            <span className="codds r2">{jsAwayTeamWin}</span>
        </div>
    } else if (_poolType == "HIL" || _poolType == "CHL" || _poolType == "FHL") {
        return <div className="table">
            <span className="codds r2">{jsHight}</span>
            <span className="codds r2">{jsLow}</span>
        </div>
    } else if (_poolType == "HDC") {
        return <div className="table">
            <span className="codds r2">{jsHomeTeamWin}</span>
            <span className="codds r2">{jsAwayTeamWin}</span>
        </div>
    } else if (_poolType == "FTS") {
        return <div className="table">
            <span className="codds r2">{jsHomeTeam}</span>
            <span className="codds r2">{jsNoGoal}</span>
            <span className="codds r2">{jsAwayTeam}</span>
        </div>
    } else if (_poolType == "TQL") {
        return <div className="table">
            <span className="codds r2">{jsHometeamtql}</span>
            <span className="codds r2">{jsAwayteamtql}</span>
        </div>
    } else if (_poolType == "OOE") {
        return <div className="table">
            <span className="codds r2">{bsodd}</span>
            <span className="codds r2">{bseven}</span>
        </div>
    } else if (_poolType == "HFT") {
        return <div className={`table ${_cellClassName}`}>
            <div className="tableRow">
                <span className="codds r2">{bshomecomb}</span>
                <span className="codds r2">{bshomecomb}</span>
                <span className="codds r2">{bshomecomb}</span>
                <span className="codds hftd">{bsdrawcomb}</span>
                <span className="codds hftd">{bsdrawcomb}</span>
                <span className="codds hftd">{bsdrawcomb}</span>
                <span className="codds r2">{bsawaycomb}</span>
                <span className="codds r2">{bsawaycomb}</span>
                <span className="codds r2">{bsawaycomb}</span>
            </div>
            <div className="tableRow">
                <span className="codds r2">{bshomecomb}</span>
                <span className="codds r2">{bsdrawcomb}</span>
                <span className="codds r2">{bsawaycomb}</span>
                <span className="codds hftd">{bshomecomb}</span>
                <span className="codds hftd">{bsdrawcomb}</span>
                <span className="codds hftd">{bsawaycomb}</span>
                <span className="codds r2">{bshomecomb}</span>
                <span className="codds r2">{bsdrawcomb}</span>
                <span className="codds r2">{bsawaycomb}</span>
            </div>
        </div>
    } else {
        return <div className="table"></div>
    }

}

function getOddsTDForAllOdds(_singleMatch, _poolType, _cellClassName, _rowClassName) {
    if (_cellClassName == undefined || _cellClassName == null) {
        _cellClassName = "";
    }
    if (_rowClassName == undefined || _rowClassName == null) {
        _rowClassName = "";
    }
    let hTeamName = (jsLang == "CH" ? _singleMatch.homeTeam.teamNameCH : _singleMatch.homeTeam.teamNameEN);
    let aTeamName = (jsLang == "CH" ? _singleMatch.awayTeam.teamNameCH : _singleMatch.awayTeam.teamNameEN);

    if (_poolType.match(/^(HAD|EHA|HADINPLAY|FHA|FHAINPLAY)$/)) {
        return <div className={`table ${_rowClassName}`}>
            <span className="codds r2">{hTeamName}({jsHomeTeamWin})</span>
            <span className="codds r2">{jsDRAW}</span>
            <span className="codds r2">{aTeamName}({jsAwayTeamWin})</span>
        </div>
    } else if (_poolType.match(/^(HHA|HHAINPLAY)$/)) {
        let hgStr = renderGoalLine(_singleMatch, _poolType, "HG", false, false, "0");
        let agStr = renderGoalLine(_singleMatch, _poolType, "AG", false, false, "0");

        return <div className={`table ${_rowClassName}`}>
            <span className="codds r2">{hTeamName}{hgStr}({jsHomeTeamWin})</span>
            <span className="codds r2">{jsDRAW}</span>
            <span className="codds r2">{aTeamName}{agStr}({jsAwayTeamWin})</span>
        </div>
    } else if (_poolType.match(/^(HIL|EHL|HILINPLAY|FHL|FHLINPLAY|CHL|ECH|CHLINPLAY)$/)) {
        return <div className={`table ${_rowClassName}`}>
            <span className="codds r2">{_poolType == "CHL" ? jsCornerLine : jsLine}</span>
            <span className="codds r2">{jsHight}</span>
            <span className="codds r2">{jsLow}</span>
        </div>
    } else if (_poolType.match(/^(HDC|EDC|HDCINPLAY)$/)) {
        return <div className={`table ${_rowClassName}`}>
            <span className="codds r2">{jshandicapline}</span>
            <span className="codds r2">{hTeamName}({jsHomeTeamWin})</span>
            <span className="codds r2">{aTeamName}({jsAwayTeamWin})</span>
        </div>
    } else if (_poolType.match(/^(FTS|NTS|ENT|ETS)$/)) {
        return <div className="table rBottomBorder">
            {(pageName == "RESULT" && _poolType.match(/^(NTS|ENT|ETS)$/)) ? <span className="codds r2"></span> : null}
            <span className="codds r2">{hTeamName}({jsHomeTeam})</span>
            <span className="codds r2">{jsNoGoal}</span>
            <span className="codds r2">{aTeamName}({jsAwayTeam})</span>
        </div>
    } else if (_poolType == "FGS") {
        return <div className="table tOdds rTopBorder rBottomBorder">
            <span className="codds r2">{hTeamName} ({jsHomeTeam})</span>
            <span className="codds r2">{aTeamName} ({jsAwayTeam})</span>
        </div>
    } else if (_poolType.match(/^(TQL|TQLINPLAY)$/)) {
        let tqlHTeamName = hTeamName;
        let tqlATeamName = aTeamName;
        if (pageName != 'RESULT' && _singleMatch.tqlodds != null) {
            tqlHTeamName = (jsLang == "CH" ? _singleMatch.tqlodds.homeTeam.teamNameCH : _singleMatch.tqlodds.homeTeam.teamNameEN);
            tqlATeamName = (jsLang == "CH" ? _singleMatch.tqlodds.awayTeam.teamNameCH : _singleMatch.tqlodds.awayTeam.teamNameEN);
        }
        return <div className="table rBottomBorder rTopBorder">
            <span className="codds r2">{tqlHTeamName}</span>
            <span className="codds r2">{tqlATeamName}</span>
        </div>
    } else if (_poolType == "OOE") {
        return <div className="table">
            <span className="codds r2">{bsodd}</span>
            <span className="codds r2">{bseven}</span>
        </div>
    } else if (_poolType.match(/^(CRS|ECS|CRSINPLAY|FCS|FCSINPLAY)$/)) {
        return <div className="table tOdds rTopBorder rBottomBorder">
            <span className="codds r2">{hTeamName} ({jsHomeTeamWin})</span>
            {pageName == "MIXALLUP" ? null : <span className="codds r2">{jsDRAW}</span>}
            <span className="codds r2">{aTeamName} ({jsAwayTeamWin})</span>
        </div>
    } else if (_poolType.match(/^(HFT|HFTINPLAY)$/)) {
        let _hLbl = bshomecomb;
        let _aLbl = bsawaycomb;
        let _dLbl = bsdrawcomb;
        if (pageName == "RESULT") {
            _hLbl = jsHOME;
            _aLbl = jsAWAY;
            _dLbl = jsDRAW;
        }
        return <div className={`rBottomBorder table`}>
            <div className="tableRow tableRow1">
                <span className="codds r2">{_hLbl}</span>
                <span className="codds r2">{_hLbl}</span>
                <span className="codds r2">{_hLbl}</span>
                <span className="codds r2">{_dLbl}</span>
                <span className="codds r2">{_dLbl}</span>
                <span className="codds r2">{_dLbl}</span>
                <span className="codds r2">{_aLbl}</span>
                <span className="codds r2">{_aLbl}</span>
                <span className="codds r2">{_aLbl}</span>
            </div>
            <div className="tableRow">
                <span className="codds r2">{_hLbl}</span>
                <span className="codds r2">{_dLbl}</span>
                <span className="codds r2">{_aLbl}</span>
                <span className="codds r2">{_hLbl}</span>
                <span className="codds r2">{_dLbl}</span>
                <span className="codds r2">{_aLbl}</span>
                <span className="codds r2">{_hLbl}</span>
                <span className="codds r2">{_dLbl}</span>
                <span className="codds r2">{_aLbl}</span>
            </div>
        </div>
    } else {
        return null;
    }
}

class OddsTableFooter extends React.Component {
    render() {
        return <div className="footerAddBet poolDetails">
            <AddBetBtn position="footer" />
        </div>;
    }
}

class ResultsCoupon extends React.Component {
    render() {
        var couponName;
        var _oddsType = oddsType;

        let tourns = this.props.tournaments;

        var matchRow = [];
        var altRow = 0;
        var tableType = this.props.tableType;
        var couponID = 'tgCou' + ++couponCount;
        this.props.coupon.forEach(function (singleMatch) {
            //couponName = GetGlobalResources("Coupon" + getMatchDayIndex(singleMatch.matchDay));
            couponName = formatDDMMYYYY(singleMatch.matchDate) + "(" + DateWeekLanguageSwitch(singleMatch.matchDay) + ") " + jstabletitlematches;
            matchRow.push(<MatchRow_ResultRow altRow={altRow % 2} match={singleMatch} key={singleMatch.matchIDinofficial} tableType={tableType} couponID={couponID} />);
            altRow++;
        });
        return <div className="couponTable">
            <CouponHeader couponName={couponName} couponID={couponID} hasMLMatch={false} couponCount={couponCount} />
            {matchRow}
        </div>;
    }
}

class Coupon extends React.Component {

    getCouponName() {
        let couponName = "";

        if (pageName == "TQL") {
            couponName = this.props.tournament.frontEndId + " " + this.props.tournament['tournamentName' + curLang.toUpperCase()];
        } else if (curTabType == tabType.Feature) {
            couponName = this.props.matchDate;
        } else if (curTabType == tabType.Date) {
            couponName = this.props.matchDate + "(" + DateWeekLanguageSwitch(this.props.matchDay) + ") " + jstabletitlematches;
        } else {
            couponName = this.props.tournament['tournamentName' + curLang.toUpperCase()];
        }
        return couponName;
    }

    render() {
        let couponName = this.getCouponName();
        let couponNo = this.props.couponNo == null ? couponCount : this.props.couponNo;

        return <div className="couponTable">
            {pageName == "OFM" ?
                <div className="separator tableCaption"></div>
                :
                <CouponHeader couponName={couponName} couponID={this.props.couponID} hasMLMatch={this.props.hasMLMatch} couponCount={couponNo} />
            }
            {this.props.matchRow}
        </div>;
    }
}

class CouponHeader extends React.Component {
    constructor(props) {
        super(props);
        var _oddsType = oddsType;

        this.mlExpander = null;
        if (isML(_oddsType)) {
            this.mlExpander = <span style={{ textAlign: "right", width: "100px", marginRight: "3px" }} onClick={(e) => { e.stopPropagation(); tgMl2(this, this.props.couponID); }} className={`tgMl mlHeader${this.props.couponCount}`}>
                <span className="mlLblExpand" style={{ display: "inline" }}>
                    {jsexpandAll}
                    <div className="emptyDiv" style={{ display: "none" }}></div>
                </span>
                <span className="mlLblCollapse" style={{ display: "none" }}>
                    {jscollapseAll}
                    <div className="emptyDiv" style={{ display: "none" }}></div>
                </span>
                <span className="mlBtnPlus">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </span>
        }
    }

    render() {
        let rightElement = null;
        let spBtnMinus = null;
        let couponClass = "tgCoupon couponRow";

        if (pageName == "MIXALLUPLIST") {
            rightElement = <span className="next" onClick={(e) => { e.stopPropagation(); mix_nextstep(e) }}>
                <label className="textcursor">
                    {jsnextstep}
                </label>
                <span className="nexticon" title={jsnextstep}></span>
            </span>
        } else if (this.props.rightText != undefined) {
            rightElement = <span className="next">
                <label>{this.props.rightText}</label>
            </span>;
        }

        if (pageName != "SPC")
            spBtnMinus = <span className="spBtnMinus"></span>;
        else
            couponClass = "rhead couponRow tOdds rTopBorder rBottomBorder";


        return <div id={this.props.couponID} className={couponClass} onClick={() => { pageName == "SPC" ? null : tgCoupon4(this, `${this.props.couponID}`) }}>
            {spBtnMinus}
            {this.props.couponName}
            {this.props.hasMLMatch ? this.mlExpander : null}
            {rightElement}
        </div>;
    }
}

class MatchRow extends React.Component {

    constructor(props) {
        super(props);

        var _oddsType = oddsType;
        if (pageName.match(/^(INDEX|INDEX_HAD|MIXALLUPLIST)$/)) {
            _oddsType = "HAD";
        }
        else if (pageName == "INPLAYHAD") {
            _oddsType = this.props.match.ehaodds != null ? "EHA" : "HAD";
        }

        this.state = {
            singleMatch: this.props.match,
            singleTournament: this.props.tournament,
            tableType: this.props.tableType,
            altRow: this.props.altRow,
            couponID: this.props.couponID,
            oddsType: _oddsType
        };
    }

    showOddsSelection() {

        let _singleMatch = this.state.singleMatch;
        let _oddsType = this.state.oddsType;
        let _tableType = this.state.tableType;
        let _matchID = _singleMatch.matchIDinofficial;
        let _showDelayMsg = pageName == "HAD" && _singleMatch.remarkstype == "A";
        let oddsSelection = null;

        // show delay message from index page
        if (_showDelayMsg) {
            oddsSelection = formatDelayMsg(_matchID);
        }
        else if (pageName != "MIXALLUPLIST" && curTabType != tabType.Feature) {
            oddsSelection = checkInplayLink(_singleMatch, _oddsType, pageName) ? getInplayLinkOddsCellSet(_singleMatch, _oddsType, _matchID, null) :
                getOddsSelection({ "singleMatch": _singleMatch, "tableType": _tableType, "oddsType": _oddsType, "inplayLink": checkInplayLink(_singleMatch, _oddsType, pageName), "_oddsSuffix": "odds" });
        }

        return oddsSelection;
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.match) !== JSON.stringify(prevProps.match)) {
            this.setState({ singleMatch: this.props.match, altRow: this.props.altRow, couponID: this.props.couponID });
        }
        else if (this.props.couponID != prevProps.couponID) {
            this.setState({ couponID: this.props.couponID });
        }
    }

    render() {
        let singleMatch = this.state.singleMatch;
        let singleTournament = this.state.singleTournament;
        let loadLink = this.state.tableType.indexOf("Presales") >= 0;
        let _oddsType = this.state.oddsType;
        let isInplayOdds = singleMatch.inplayPools.length > 0 && singleMatch.IsMatchKickOff();
        let _matchID = singleMatch.matchIDinofficial;

        return <div className={`couponRow rAlt${this.state.altRow} ${this.state.couponID} ${tempMixAlupSelectedList['chk' + singleMatch.matchID] ? 'checkedOdds': ''}`} id={`rmid${_matchID}`}>
            <div className="closeDay">
                {formatEsst(singleMatch, true, _oddsType)}
            </div>
            <div className="cday">{singleMatch.frontEndId}</div>
            <div className="cflag">{singleTournament != null ? formatImageStr([League.GetFlagPath(singleTournament.tournamentShortName), singleTournament['tournamentName' + curLang.toUpperCase()], singleTournament.tournamentShortName]) : ""}</div>
            <div className={pageName == "MIXALLUPLIST" ? "cteams mixallup_teamcontent" : "cteams"}>
                {
                    pageName == "INPLAYHAD" ? displayInplayMatchDiv(singleMatch.isVoidMatch(), singleMatch.matchID, sTeamString(!isInplay, loadLink, singleMatch, false, true, _oddsType))
                        : oddsAllJump(singleMatch.matchID, sTeamString(!isInplay, loadLink, singleMatch, false, true, _oddsType), isInplayOdds)
                }
            </div>
            <div className="cvenue">{singleMatch.venue == null ? "" : formatNeutralGroundIcon(singleMatch.venue, "ng")}</div>
            {pageName == "INPLAYHAD" ? <div className="ctv"><span>{getLiveCastStr(singleMatch)}</span><span>{getTvStr(singleMatch)}</span></div> : null}
            {displayInplayClock(pageName) ?
                <div className="cinplay">{formatInplayIco(singleMatch, "ico", pageName)}</div>
                : null}
            {pageName == "INDEX" ? <div className="ctv">{formatTVIcon(singleMatch.channel, "tv")}</div> : null}
            {pageName == "INPLAYHAD" ?
                <div className="cesst">
                    <span id={`sst${singleMatch.matchID}`}>
                        <input type="hidden" id={`hsst${singleMatch.matchID}`} value={`${singleMatch.ipinfo[1]}`} />
                        <span dangerouslySetInnerHTML={{ __html: formatInplayTeamAndStatus(singleMatch.ipinfo, "stagemsg", singleMatch.matchTime) }}></span>
                    </span>
                </div>
                :
                null}
            {this.showOddsSelection()}
            {pageName == "MIXALLUPLIST" ?
                <div className="selectedandclear"><input id={`chk${singleMatch.matchID}`} defaultChecked={tempMixAlupSelectedList['chk' + singleMatch.matchID]} name="chksel" type="checkbox" value={singleMatch.matchID} onClick={() => { toggleMix(`chk${singleMatch.matchID}`, `rmid${_matchID}`); mixSelectedCount(); }} /></div>
                : null
            }
            {pageName != "MIXALLUPLIST" ?
                <div className="cheadtohead">{singleTournament != null ? formatJumpHeadStr(singleMatch) : ""}
                </div>
                : null
            }
        </div>;
    }
}

class MatchRow_MatchInResults extends React.Component {
    render() {
        let singleMatch = this.props.match;
        let tourns = this.props.tournaments;
        let tourn = tourns.filter(function (valTourn) {
            return valTourn.tournamentID == singleMatch.tournament.tournamentID;
        });
        let fgsIsDefined = (this.props.match.fgsresult != undefined && this.props.match.fgsresult != null);
        let fgsResultsDetails = this.props.match.fgsresult;
        let _matchDate = singleMatch.matchDate2.substr(8, 2) + "-" + singleMatch.matchDate2.substr(5, 2) + "-" + singleMatch.matchDate2.substr(0, 4);
        let _matchFGSText = [];
        let _hRefund = []; /*********** */ // or notyetavailable
        let _aRefund = []; /*********** */
        let _refundCell;
        let _singleTournament = singleMatch.tournament;

        if (fgsIsDefined && singleMatch.HasPoolResults("fgs")) {
            if (isPoolRefund(fgsResultsDetails.POOLSTATUS)) {
                if (fgsResultsDetails.RESULTFINAL == "true") {
                    _matchFGSText = <div key={`${singleMatch.matchID}_result`} className="center middle">{jsnotyetavailable}</div>;
                } else {
                    _matchFGSText = <div key={`${singleMatch.matchID}_result`} className="red center middle"><a href="/football/results/fgs_results.aspx">{jsfgsrefund}</a></div>;
                }
            } else {
                let _allResult = fgsResultsDetails.RESULT;
                let displayedFGSResult = false;

                if (_allResult != undefined && _allResult != null && _allResult.length > 0) {
                    _matchFGSText = singleMatch.GetFGSResultDetailsText(false);
                    displayedFGSResult = true;
                }
                if (!displayedFGSResult) {
                    _matchFGSText = <div key={`${singleMatch.matchID}_result`}>{jsmatchinprogress}</div>;
                }
            }
        } else {
            _matchFGSText = <div key={`${singleMatch.matchID}_result`}>{jsmatchinprogress}</div>;
        }

        return <div className={`couponRow rAlt${this.props.altRow}`} id={`rmid${singleMatch.matchID}`}>
            <div className="tableCell matchNum">{singleMatch.frontEndId}</div>
            <div className="tableCell matchLeague">
                {formatImageStr
                    (
                        [
                            League.GetFlagPath(_singleTournament.tournamentShortName),
                            _singleTournament['tournamentName' + curLang.toUpperCase()],
                            _singleTournament.tournamentShortName
                        ]
                )}
            </div>
            <div className="tableCell resteamvs">{sTeamString(false, false, singleMatch, false, true, "FGS")}</div>
            <div className="tableCell matchFGS center">{_matchFGSText}</div>
            <div className="tableCell matchOdds center">{formatLastOddsString(singleMatch)}</div>
        </div>;
    }
}

class MatchRow_ResultRow extends React.Component {

    renderMatchNum(singleMatch) {
        if (singleMatch.isBAUResult) {
            return GetGlobalResources(singleMatch.matchDay, "js") + " " + singleMatch.matchNum
        }
        else {
            return singleMatch.frontEndId == "" ? GetGlobalResources(singleMatch.matchDay, "js") + " " + singleMatch.matchNum : singleMatch.frontEndId
        }
    }

    render() {
        let singleMatch = this.props.match;
        let firstHalfScore;
        let secondHalfScore = "";
        let extraTimeScore = "";
        let isFTVoid = false;

        let resultsScoreDetails = getResultScoreDetails(singleMatch);

        isFTVoid = resultsScoreDetails[0];
        firstHalfScore = resultsScoreDetails[1];
        secondHalfScore = resultsScoreDetails[2];
        extraTimeScore = resultsScoreDetails[3];

        let matchLeague = <div className={`tableCell matchLeague`}>
            {(singleMatch.tournament.tournamentShortName!=null && singleMatch.tournament.tournamentShortName != "") ? formatImageStr(
                [League.GetFlagPath(singleMatch.tournament.tournamentShortName),
                    singleMatch.tournament['tournamentName' + curLang.toUpperCase()],
                    singleMatch.tournament.tournamentShortName]) : null}
        </div>;

        let matchID = singleMatch.frontEndId == "" ? GetGlobalResources(singleMatch.matchDay, "js") + " " + singleMatch.matchNum : singleMatch.frontEndId;

        return <div className={`couponRow rAlt${this.props.altRow} ${this.props.couponID}`} id={`rmid${singleMatch.matchID}`}>
            <div className="tableCell matchDate">{formatEsstStr(singleMatch.matchTime, true).split(' ')[0]}</div>
            <div className="tableCell matchID">{this.renderMatchNum(singleMatch)}</div>
            <div className="tableCell matchLeague">{matchLeague}</div>
            <div className="tableCell resteamvs">{sTeamString(false, false, singleMatch, false, true, "FGS")}</div>
            {isFTVoid ? <div className="tableCell matchHalf matchFT"><div className="void">{jsvoidmatch}</div></div> : <div className="tableCell matchHalf">{firstHalfScore}</div>}
            {isFTVoid ? <div className="tableCell tableCellNoLeftBorder matchFull"></div> : <div className="tableCell matchFull">{secondHalfScore}{extraTimeScore}</div>}
            <div className="tableCell matchDetail">{formatDetailsString(singleMatch)}</div>
            <div className="tableCell matchOdds center">{formatLastOddsString(singleMatch)}</div>
        </div>;
    }
}

class MatchRow_FGSResults extends React.Component {
    render() {
        let singleMatch = this.props.match;
        let _matchFGSText = [];
        let _hRefund = [];
        let _aRefund = [];
        let _refundCell;

        if (singleMatch.refundForAll) {
            _matchFGSText.push(<div className="center middle">-</div>);
            _refundCell = <div className="crefund refundAll">{jsrefundforall}</div>
        } else {
            for (let i = 0; i < singleMatch.results.length; i++) {
                let res = singleMatch.results[i];
                if (singleMatch.results[i] != null) {
                    _matchFGSText.push(<div>{res.SEL} {(curLang == "ch" ? res.CONTENTCH : res.CONTENTEN)}</div>);
                }
                else {
                    _matchFGSText.push(<div className="center middle">-</div>);
                }
            }
            // display refund info
            let _allRefund = singleMatch.refunds;
            if (_allRefund.length == 0) {
                _hRefund.push(<div></div>);
                _aRefund.push(<div></div>);
            } else {
                for (let i = 0; i < _allRefund.length; i++) {
                    let _refundTxt = _allRefund[i].SEL + " " + (curLang == "ch" ? _allRefund[i].CONTENTCH : _allRefund[i].CONTENTEN);
                    if (_allRefund[i].SEL[0] == "1") {
                        // home
                        _hRefund.push(<div>{_refundTxt}</div>);
                    } else {
                        // away
                        _aRefund.push(<div>{_refundTxt}</div>);
                    }
                }
            }
            _refundCell = <div className="crefund flex">
                <div>{_hRefund}</div>
                <div>{_aRefund}</div>
            </div>
        }

        let matchKODt = singleMatch.matchKODateFormatted != null && singleMatch.matchKODateFormatted != '' ? singleMatch.matchKODateFormatted : singleMatch.matchKODate;
        let eventId = singleMatch.frontEndId != null && singleMatch.frontEndId != '' ? singleMatch.frontEndId : singleMatch.matchDay + ' ' + singleMatch.matchNum;

        return <div className={`couponRow rAlt${this.props.altRow}`}>
            <div className="cday">{matchKODt}</div>
            <div className="cdate">{eventId}</div>
            <div className="cflag">{formatTournFlag(singleMatch.leagueCode, curLang == 'ch' ? singleMatch.leagueCh : singleMatch.leagueEn)}</div>
            <div className="cteams">
                <span>
                    <span className="teamname">{(curLang == 'ch' ? singleMatch.homeCh : singleMatch.homeEn)}</span>
                    <span className="nolnk span_vs">{jsVS}</span>
                    <span className="teamname">{(curLang == 'ch' ? singleMatch.awayCh : singleMatch.awayEn)}</span>
                </span>
            </div>
            <div className="cresult">{_matchFGSText}</div>
            {_refundCell}
        </div>;
    }
}

class MatchRow_ParimutuelResults extends React.Component {
    render() {
        let singleMatch = this.props.match;
        let _couponID = this.props._couponID;
        let rInd = this.props.rInd;
        let _void = this.props._void
        let pmPool = (pools == "DHCP") ? this.props.pool.dhcodds : this.props.pool.hfmodds;
        let divHT = '';
        let divFT = '';
        if (pools == "DHCP" && pmPool.RESULT != null) {
            let legDivs = pmPool.RESULT.split('/');
            if (legDivs.length > 1) {
                var divs = legDivs[rInd - 1].split('#');
                if (divs.length > 1) {
                    divHT = divs[0];
                    divFT = divs[1];
                }
            }
        }

        let resultsScoreDetails = getResultScoreDetails(singleMatch);
        let isFTVoid = resultsScoreDetails[0];
        let firstHalfScore = resultsScoreDetails[1];
        let secondHalfScore = resultsScoreDetails[2];

        let flagStr = null;
        if (singleMatch.league != null) {
            flagStr = formatImageStr([League.GetFlagPath(singleMatch.league.leagueShortName), (jsLang.toLowerCase() == 'ch' ? singleMatch.league.leagueNameCH : singleMatch.league.leagueNameEN), singleMatch.league.leagueShortName]);
        }

        return <div className={`tableRow couponRow rAlt${this.props.altRow} ${_couponID}`}>
            <div className={`tableCell matchLeg`}>{GetLegName(rInd - 1)}</div>
            <div className={`tableCell matchNum`}>{GetGlobalResources(singleMatch.matchDay)} {singleMatch.matchNum}</div>
            <div className={`tableCell matchLeague`}>{flagStr}</div>
            <div className={`tableCell matchTeam`}>
                {sTeamString(false, false, singleMatch, false, true, pools)}
            </div>
            <div className={`tableCell matchDate`} >
                {formatYYYYMMDD(singleMatch.matchTime.substr(0, 10).replace(/-/g, ''))}
            </div>
            <div className="tableCell cotitle">
                {isFTVoid ? <span className="void">{jsvoid_match}</span> :
                    <div className="table">
                        <span className="codds r2 rRightWhiteBorder">{firstHalfScore}{formatDHCPSelectionText(pools, divHT)}</span>
                        <span className="codds r2">{secondHalfScore}{formatDHCPSelectionText(pools, divFT)}</span>
                    </div>}
            </div>
        </div>;
    }
}

class MatchRowSPCByItem extends React.Component {
    render() {
        var singleMatch = this.props.match;
        var _item = this.props.item;
        var _oddsType = oddsType;
        var loadLink = false;
        var displayInplayLink = checkInplayLink(singleMatch, _oddsType, pageName);
        let singleTournament = [];
 
        return <div className={`couponRow couponRowSPCItem rAlt${this.props.altRow} ${this.props.couponID}`} id={`rmid${singleMatch.matchID}`}>
             
            {displayInplayLink ? getInplayLinkOddsCellSet(singleMatch, _oddsType, singleMatch.matchIDinofficial, _item) :
                getOddsSelection({ "singleItem": _item, "singleMatch": singleMatch, "tableType": this.props.tableType, "oddsType": oddsType, "_oddsSuffix": "odds" })
            }

        </div>;
    }
}

class ParimutuelResultPoolDetails extends React.Component {
    render() {
        let _void = this.props._void;
        let _couponID = this.props.couponID;
        let _pool = this.props._pool;
        let spUnitDividends, spWinningInvestment;

        let pmPool = (pools == "DHCP") ? _pool.dhcodds : _pool.hfmodds;

        let _notPayout = (pmPool.POOLSTATUS != "Payout");

        if (!_void) {
            if (pools == "DHCP") {
                if (pmPool.winningdividend != '' && pmPool.winningdividend > 0)
                    spUnitDividends = `$${numberWithCommas(Math.round(pmPool.winningdividend * 100) / 100)}`;
                else
                    spUnitDividends = jsNowinner;
                spWinningInvestment = `$${numberWithCommas(Math.round(pmPool.winninginvestment * 100) / 100)}`;
            } else if (pools == "HFMP") {
                if (pmPool.consolationdividend == null)
                    spUnitDividends = <span> {formatHFMPDividend(pmPool.winningdividend)} </span>;
                else {
                    spUnitDividends = <span>
                        {jswinning} {formatHFMPDividend(pmPool.winningdividend)}<br />
                        {jsconsolation} {formatHFMPDividend(pmPool.consolationdividend)}
                    </span>;
                }
                var conInv = (pmPool.consolationinvestment != null) ? '$' + numberWithCommas(Math.round(pmPool.consolationinvestment * 100) / 100) : '';
                spWinningInvestment = <span>
                    ${numberWithCommas(Math.round(pmPool.winninginvestment * 100) / 100)}<br />
                    {conInv}<br />
                </span>;
            }
        }

        var jpGen = numberWithCommas(pmPool.jackpotgen);
        if (jpGen != '-')
            jpGen = '$' + jpGen;

        return <div className={`yellowBar poolDetails ${_couponID}`}>
            <div className="tdWinning">
                {jswinningcombination} :<br />
                {_void ? "-" : pmPool.RESULT}
            </div>
            <div className="tdJackpot">
                {jsjackpotgenerated} :<br />
                {_void ? "-" : jpGen}
            </div>
            <div className="tdInvestment">
                {jsinvestment} :<br />
                {_void ? "-" : `$${numberWithCommas(pmPool.investment)}`}
            </div>
            {(_void || _notPayout) ? null : <div className="tdUnitdividend">
                {jsunitdividend} :<br />
                {spUnitDividends}
            </div>}
            {(_void || _notPayout) ? null : <div className="tdAmount">
                {jswinninginvestment} :<br />
                {spWinningInvestment}
            </div>}
        </div>;
    }
}

class ParimutuelResultPoolTable extends React.Component {
    render() {
        let _void = this.props._void;
        let _couponID = this.props.couponID;
        let _pool = this.props._pool;

        let pmPool = (pools == "DHCP") ? _pool.dhcodds : _pool.hfmodds;
        let noOfLeg = (pools == "DHCP" ? 2 : 6);
        let _matchRows = [];
        //let _matchResult = pmPool.RESULT!=null ? pmPool.RESULT.split('/') : "";


        for (let _legInd = 1; _legInd <= noOfLeg; _legInd++) {
            //  if(_matchResult[_legInd]==undefined) {
            //    _matchResult[_legInd] = "";
            //  }
            _matchRows.push(<MatchRow_ParimutuelResults pool={_pool} key={`${_couponID}_${_legInd}`} rInd={_legInd} altRow={(_legInd + 1) % 2} _couponID={_couponID} match={new Match_Result(pmPool[`LEG${_legInd}`])} _void={_void} />);
        }

        return <div key={`poolTable${_couponID}`} className={`table ${_couponID}`}>
            <div className={`tableRow tblHead`}>
                <div className={`tableCell matchLeg`}>{jsleg}</div>
                <div className={`tableCell matchNum`}>{jsmatchno}</div>
                <div className={`tableCell matchLeague`}>
                    <a href="javascript:goFlagUrl();">
                        <img src={`/football/info/images/icon_flag.gif${cacheVersion}`} alt={jsleagues_and_tournaments} title={jsleagues_and_tournaments} />
                    </a>
                </div>
                <div className={`tableCell matchTeam`} >
                    {jsteams1}
                    <br />
                    {jsteams2}
                </div>
                <div className={`tableCell matchDate`} >
                    {jsdate}
                </div>
                <div className="tableCell cotitle">
                    <div className="rBottomBorder">{jsmatchresults}</div>
                    <div className="table">
                        <span className="codds r2">{jsres_halftime}</span>
                        <span className="codds r2">{jsres_fulltime}</span>
                    </div>
                </div>
            </div>
            {_matchRows}
        </div>;
    }
}

class ParimutuelNextDraw extends React.Component {
    render() {
        let lblNextDate;
        let _pool = this.props._pool;
        let _poolInfo;
        if (pools == "DHCP") {
            lblNextDate = jsnextdhcpdate;
            _poolInfo = _pool.dhcodds;
        }
        else if (pools == "HFMP") {
            lblNextDate = jsnext6hafudate;
            _poolInfo = _pool.hfmodds;
        }

        return <div className={`yellowBar poolNextDraw`}>
            <div className="tdNextDate">
                {lblNextDate} :<br />
                <a href={'#'} onClick={() => switchTo('football', `odds/odds_${pools.toLowerCase()}`, curLang)}>
                    {formatYYYYMMDD(_pool.matchTime.substr(0, 10).replace(/-/g, ''))} {GetGlobalResources(_pool.matchDay)} {_pool.matchNum}
                </a>
            </div>
            <div className="tdInvestment">
                {jsinvestment} :<br />
                {_poolInfo.investment == "" ? "-" : `$${numberWithCommas(_poolInfo.investment)}`}
            </div>
            <div className="tdJackpot">
                {jsjackpot} :<br />
                {_poolInfo.jackpot == "" ? "-" : `$${numberWithCommas(_poolInfo.jackpot)}`}
            </div>
            <div className="tdEsst">
                {jsesst_nobr} :<br />
                {formatEsstStr(_pool.matchTime, false)}
            </div>
        </div>;
    }
}

class OddsSelectionHeader extends React.Component {
    render() {
        let _poolType = this.props.poolType;
        let _specClass = this.props.specClass;
        let _singleMatch = this.props.singleMatch;
        return getOddsTDForAllOdds(_singleMatch, _poolType, `tableCell`, `tOdds ${_specClass}`);
    }
}

function getInplayLinkOddsCellSet(singleMatch, _oddsType, _matchID, item) {
    if (singleMatch == null) return;
    if (_oddsType.match(/^(HAD|HADINPLAY|FHA|FHAINPLAY|HHA|HHAINPLAY)$/)) {
        return [
            <div className="cInplayLnk inplayLnkInRow width300" key={_matchID + _oddsType + "inplay_codds"}>
                <div>{formatInplayIco(singleMatch, "url", pageName)}</div>
            </div>,
            formatEmptyOddsCell(_matchID + _oddsType + "D_codds"),
            formatEmptyOddsCell(_matchID + _oddsType + "A_codds")
        ];
    } else if (_oddsType.match(/^(HDC|HDCINPLAY)$/)) {
        return [
            <div className="cInplayLnk inplayLnkInRow width200" key={_matchID + _oddsType + "inplay_codds"}>
                <div>{formatInplayIco(singleMatch, "url", pageName)}</div>
            </div>,
            formatEmptyOddsCell(_matchID + _oddsType + "A_codds")
        ];
    } else if (_oddsType.match(/^(FTS|NTS|ETS)$/)) {
        return [
            <div className="cInplayLnk inplayLnkInRow width300" key={_matchID + _oddsType + "inplay_codds"}>
                <div>{formatInplayIco(singleMatch, "url", pageName)}</div>
            </div>,
            formatEmptyOddsCell(_matchID + _oddsType + "N_codds"),
            formatEmptyOddsCell(_matchID + _oddsType + "A_codds")
        ];
    } else if (_oddsType == "OOE") {
        return [
            <div className="cInplayLnk inplayLnkInRow width200" key={_matchID + _oddsType + "inplay_codds"}>
                <div>{formatInplayIco(singleMatch, "url", pageName)}</div>
            </div>,
            formatEmptyOddsCell(_matchID + _oddsType + "E_codds")
        ];
    } else if (_oddsType == "TQL") {
        return [
            <div className="cInplayLnk inplayLnkInRow width300" key={_matchID + _oddsType + "inplay_codds"}>
                <div>{formatInplayIco(singleMatch, "url", pageName)}</div>
            </div>,
            formatEmptyTQLOddsCell("codds", _matchID + _oddsType + "H_codds"),
            formatEmptyTQLOddsCell("cteams", _matchID + _oddsType + "A_team"),
            formatEmptyTQLOddsCell("codds", _matchID + _oddsType + "A_codds")
        ];
    } else if (_oddsType.match(/^(HFT|HFTINPLAY)$/)) {
        return [
            <div className="cInplayLnk inplayLnkInRow width900" key={_matchID + _oddsType + "inplay_codds"}>
                <div>{formatInplayIco(singleMatch, "url", pageName)}</div>
            </div>,
            formatEmptyOddsCell(_matchID + _oddsType + "HD_codds"),
            formatEmptyOddsCell(_matchID + _oddsType + "HA_codds"),
            formatEmptyOddsCell(_matchID + _oddsType + "DH_codds"),
            formatEmptyOddsCell(_matchID + _oddsType + "DD_codds"),
            formatEmptyOddsCell(_matchID + _oddsType + "DA_codds"),
            formatEmptyOddsCell(_matchID + _oddsType + "AH_codds"),
            formatEmptyOddsCell(_matchID + _oddsType + "AD_codds"),
            formatEmptyOddsCell(_matchID + _oddsType + "AA_codds")
        ];
    } else if (_oddsType.match(/^(TTG|ETG|TTGINPLAY)$/)) {
        return [
            <div className="cInplayLnk inplayLnkInRow width900" key={_matchID + _oddsType + "inplay_codds"}>
                <div>{formatInplayIco(singleMatch, "url", pageName)}</div>
            </div>
        ]
    } else if (isML(_oddsType)) {
        return [
            <div className="cInplayLnk inplayLnkInRow width350" key={_matchID + _oddsType + "inplay_codds"}>
                <div>{formatInplayIco(singleMatch, "url", pageName)}</div>
            </div>,
            formatEmptyOddsCell(_matchID + _oddsType + "H_codds"),
            formatEmptyOddsCell(_matchID + _oddsType + "L_codds"),
            <div className="noBorder tgIndMl" key={_matchID + _oddsType + "tg"}></div>
        ];
    } else if (_oddsType == "SPC") {
        if (item !== undefined && item !== null) {
            let singleItemAns = [];

            singleItemAns.push(
                <div className="cInplayLnk inplayLnkInRow width300" key={_matchID + _oddsType + "inplay_codds"}>
                    <div>{formatInplayIco(singleMatch, "url", pageName)}</div>
                </div>);
            item.SELLIST.forEach(function (selItem, ind2) {
                let _itemNum = selItem.SEL + "_" + item.ITEM;
                singleItemAns.push(formatEmptyOddsCell(_matchID + _oddsType + _itemNum + "_codds"));
            })
            return singleItemAns;
        }
    } else {
        return null;
    }
}

function getOddsSelection(props) {
    try {
        let singleMatch = props.singleMatch;
        let _matchID = singleMatch.matchIDinofficial;
        let _oddsType = props.oddsType;
        let _oddsSet = singleMatch[_oddsType.toLowerCase() + props._oddsSuffix];
        let _tableType = props.tableType;
        let _ref = ((props._ref == undefined || props._ref == null) ? "" : props._ref);
        let _rowClasses = "coddsSelections";
        let _checkboxTypeList = props.checkboxTypeList;

        if ((isDisplayMultiplePoolPage(pageName)) && !isMultiRowPool(_oddsType))
            _rowClasses += " rAlt0";
        if (_tableType == "result") {
            _tableType = "presales";
            //_oddsSet = singleMatch[_oddsType.toLowerCase()+"lastodds"]; 
        }

        let isExpanded = false;
        if (isML(_oddsType)) {
            isExpanded = $('#rmid' + _matchID).find('.mlBtnMinus').is(':visible');
        }

        if ((pageName == "INPLAYHAD" || pageName=="OFM") && (_oddsSet === undefined || _oddsSet === null || isPoolClosed(_oddsSet.POOLSTATUS))) {
            return [
                <div className={`codds`} key={_matchID + _oddsType + "D_codds"}>
                    <div className={`hadstopsell`}>
                        {displayInplayAllOddsAfterHADStopsell(singleMatch)}
                    </div>
                </div>,
                formatEmptyOddsCell(_matchID + _oddsType + "D_codds"),
                formatEmptyOddsCell(_matchID + _oddsType + "A_codds")
            ]
        }

        let poolStatus = "";
        let poolId = "";
        let lineId = "";
        let isAllup = false;
        if (_oddsType != "SPC") {
            poolStatus = _oddsSet.POOLSTATUS;
            poolId = _oddsSet.POOLID;
            lineId = _oddsSet.LINEID;
            isAllup = _oddsSet.ALLUP;
        }

        let tmpAllCheckBoxType;
        if (isMultiplePoolPage()) {
            tmpAllCheckBoxType = getCheckboxType(_oddsType);
        } else {
            tmpAllCheckBoxType = allCheckBoxType;
        }

        // XXXINPLAY are included for last odds page
        if (_oddsType.match(/^(HAD|EHA|HADINPLAY|FHA|FHAINPLAY|HHA|HHAINPLAY|HDC|EDC|HDCINPLAY|FTS|OOE|HFT|HFTINPLAY|TTG|ETG|TTGINPLAY)$/)
            || ((_oddsType == "NTS" || _oddsType == "ENT" || _oddsType == "ETS") && pageName != "RESULT")
            || ((_oddsType == "TQL" || _oddsType == "TQLINPLAY") && pageName == "RESULT") ) {
            let tmpCells = [];
            tmpAllCheckBoxType.forEach(function (_cbType) {
                tmpCells.push(<OddsCell key={`${_matchID}${_oddsType}${_cbType}_0OC`} rkey={`${_matchID}${_oddsType}${_cbType}_0OC`} _oddsType={_oddsType} _matchID={_matchID} oddsSet={_oddsSet} checkboxType={`${_cbType}`} lineNum={`0`} _tableType={_tableType} poolStatus={poolStatus} isAllup={isAllup} poolId={poolId} lineId={lineId}  />);
            });
            if (_oddsType.match(/^(TTG|ETG|TTGINPLAY)$/)) {
                return <div className="cotitle">
                    <div className="tOdds tSel rBottomBorder ttgNo">
                        <div className="codds">0</div>
                        <div className="codds">1</div>
                        <div className="codds">2</div>
                        <div className="codds">3</div>
                        <div className="codds">4</div>
                        <div className="codds">5</div>
                        <div className="codds">6</div>
                        <div className="codds">7+</div>
                    </div>
                    <div className={`${_rowClasses} tOdds`}>
                        {tmpCells}
                    </div>
                </div>;
            } else {
                return tmpCells;
            }
        } else if (_oddsType == "TQL") {
            let tmpCells = [];
            let firstOddsType = "1";
            let secondOddsType = "2";
            let _tournId = singleMatch.tournament.tournamentID;
            for (var i = 0; i < _oddsSet.SELLIST.length; i++) {
                let teamId = _oddsSet.SELLIST[i].TEAMID;
                if (teamId == _oddsSet.homeTeam.teamID) {
                    firstOddsType = _oddsSet.SELLIST[i].SEL;
                }
                else {
                    secondOddsType = _oddsSet.SELLIST[i].SEL;
                }
            }

            tmpAllCheckBoxType.forEach(function (_cbType, index) {
                let oddsName = "";
                if (index==0) {
                    oddsName = jsLang.toLowerCase() == 'ch' ? singleMatch.homeTeam.teamNameCH : singleMatch.homeTeam.teamNameEN;
                    _cbType = firstOddsType;
                } else {
                    oddsName = jsLang.toLowerCase() == 'ch' ? singleMatch.awayTeam.teamNameCH : singleMatch.awayTeam.teamNameEN;
                    _cbType = secondOddsType;
                } 
                 
                tmpCells.push(<OddsCell key={`${_tournId}${_oddsType}${_cbType}_0OC`} rkey={`${_tournId}${_oddsType}${_cbType}_0OC`} _oddsType={_oddsType} _matchID={_matchID} oddsSet={_oddsSet} checkboxType={`${_cbType}`} lineNum={`0`} _tableType={_tableType} poolStatus={poolStatus} isAllup={isAllup} poolId={poolId} oddsName={oddsName} />);
            });
            return tmpCells;
        } else if (_oddsType.match(/^(NTS|ETS|ENT)$/)) { // last odds NTS
            let tmpRows = [];
            for (let lineInd = 0; lineInd < _oddsSet.length; lineInd++) {
                let tmpOddsSet = _oddsSet[lineInd];
                let tmpCells = [];
                if (pageName == "RESULT") {
                    let goalnumber = tmpOddsSet.ITEM;
                    if (jsLang == "EN") {
                        goalnumber = <div className={`codds`} key={`goalno${lineInd}`}>{goalnumber}{<label className="lblSup">{getNumberSuffix(goalnumber)}</label>}{GetGlobalResources("ntslastpart", "js")}</div>;
                    } else {
                        goalnumber = <div className={`codds`} key={`goalno${lineInd}`}>{GetGlobalResources("ntsfstpart", "js")}{goalnumber}{GetGlobalResources("ntslastpart", "js")}</div>;
                    }
                    tmpCells.push(goalnumber);
                    /*
                    tmpCells.push(
                      <div className="codds">{GetGlobalResources("ntsfstpart", "js")}{tmpOddsSet.ITEM}</div>
                    );
                    */

                }
                tmpAllCheckBoxType.forEach(function (_cbType) {
                    tmpCells.push(<OddsCell key={`${_matchID}${_oddsType}${_cbType}_${lineInd}OC`} rkey={`${_matchID}${_oddsType}${_cbType}_${lineInd}OC`} _oddsType={_oddsType} _matchID={_matchID} oddsSet={tmpOddsSet} checkboxType={`${_cbType}`} lineNum={lineInd} _tableType={_tableType} poolStatus="" isAllup="false" poolId="" />);
                });
                tmpRows.push(<div key={`ntsLastOddsRow${lineInd}`} className={`coddsSelections rAlt${lineInd % 2}`}>{tmpCells}</div>);
            }
            return tmpRows;
        } else if (_oddsType == "FGS") {
            let allSelections = [];
            allSelections[0] = []; // home 
            allSelections[1] = []; // away
            let noScoreItem;
            _oddsSet.SELLIST.forEach(function (item) {
                if (item.SEL[0] == "1") {
                    //let poolId = "";
                    allSelections[0].push(formatSelectionInsideGroup(_oddsType, _matchID, item, "ODDS", 0, _tableType, isExpanded, item.SEL, poolStatus, isAllup, poolId));
                } else if (item.SEL[0] == "2") {
                    allSelections[1].push(formatSelectionInsideGroup(_oddsType, _matchID, item, "ODDS", 0, _tableType, isExpanded, item.SEL, poolStatus, isAllup, poolId));
                } else {
                    noScoreItem = item;
                }
            });

            if (allSelections[0].length > allSelections[1].length) {
                for (let addCellInd = allSelections[1].length; addCellInd < allSelections[0].length; addCellInd++) {
                    allSelections[1].push(formatEmptySelectionInsideGroup(_oddsType, allSelections[0].length));
                }
            } else {
                for (let addCellInd = allSelections[0].length; addCellInd < allSelections[1].length; addCellInd++) {
                    allSelections[0].push(formatEmptySelectionInsideGroup(_oddsType, allSelections[1].length));
                }
            }

            let oddsRows = [];
            for (let rInd = 0; rInd < allSelections[0].length; rInd++) {
                oddsRows.push(
                    <div key={`FGS${oddsRows.length}`} className={`${_rowClasses} rAlt${rInd % 2}`}>
                        {allSelections[0][rInd]}
                        {allSelections[1][rInd]}
                    </div>)
            }

            return <div className="table">
                {oddsRows}
                <div className="nofgs">
                    <div className={`rAlt0`}>
                        <div className="codds">
                            <span id={`s${_matchID}_${noScoreItem.SEL}`} className="sel">{"00 " + (jsLang == "CH" ? noScoreItem.CONTENTCH : noScoreItem.CONTENTEN)}</span>
                        </div>
                    </div>
                    <div className={`rAlt1`}>
                        <OddsCell key={`${_matchID}${_oddsType}${noScoreItem.SEL}_0OC`} rkey={`${_matchID}${_oddsType}${noScoreItem.SEL}_0OC`} _oddsType={_oddsType} _matchID={_matchID} oddsSet={noScoreItem} checkboxType={`ODDS`} lineNum={`0`} _tableType={_tableType} poolStatus={poolStatus} isAllup={isAllup} poolId={poolId} />
                    </div>
                </div>
            </div>
        } else if (_oddsType.match(/^(CRS|ECS|CRSINPLAY|FCS|FCSINPLAY)$/)) {
            if (pageName == "MIXALLUP") {
                return <div className="allSelections">
                    <div className={`${_rowClasses} rAlt0`}>
                        <div className="codds"></div>
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0100", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0200", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0201", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0300", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0301", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0302", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0400", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0401", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0402", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0500", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0501", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0502", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "SM1MH", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt1`}>
                        <div className="codds">{jsHOME}</div>
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0100", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0200", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0201", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0300", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0301", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0302", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0400", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0401", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0402", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0500", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0501", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0502", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "SM1MH", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt0`}>
                        <div className="codds"></div>
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0001", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0002", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0102", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0003", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0103", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0203", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0004", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0104", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0204", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0005", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0105", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0205", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "SM1MA", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt1`}>
                        <div className="codds">{jsAWAY}</div>
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0001", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0002", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0102", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0003", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0103", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0203", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0004", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0104", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0204", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0005", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0105", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0205", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "SM1MA", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt0 crsDrawRow`}>
                        <div className="codds"></div>
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0000", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0101", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0202", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0303", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "SM1MD", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt1 crsDrawRow`}>
                        <div className="codds">{jsDRAW}</div>
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0000", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0101", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0202", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0303", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "SM1MD", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                </div>
            } else {
                return <div className="allSelections">
                    <div className={`${_rowClasses} rAlt0`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0100", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0000", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0001", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt1`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0200", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0101", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0002", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt0`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0201", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0202", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0102", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt1`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0300", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0303", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0003", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt0`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0301", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        <div className="codds"></div>
                        <div className="codds"></div>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0103", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt1`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0302", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        <div className="codds"></div>
                        <div className="codds"></div>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0203", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt0`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0400", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        <div className="codds"></div>
                        <div className="codds"></div>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0004", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt1`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0401", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        <div className="codds"></div>
                        <div className="codds"></div>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0104", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt0`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0402", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        <div className="codds"></div>
                        <div className="codds"></div>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0204", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt1`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0500", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        <div className="codds"></div>
                        <div className="codds"></div>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0005", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt0`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0501", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        <div className="codds"></div>
                        <div className="codds"></div>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0105", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt1`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0502", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        <div className="codds"></div>
                        <div className="codds"></div>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0205", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                    <div className={`${_rowClasses} rAlt0`}>
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MH", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MD", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                        {formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MA", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)}
                    </div>
                </div>
            }
        } else if (isML(_oddsType)) {
            if (isDisplayMultiplePoolPage(pageName)) {
                let allSelections = [];
                let isSkipeOdds = false;
                _oddsSet.LINELIST.forEach(function (_singleOddsSet, _ind) {
                    isSkipeOdds = false;
                    if (_singleOddsSet["SKIPELINE"] != null && _singleOddsSet["SKIPELINE"] == "1" && !isResultPage())
                        isSkipeOdds = true;

                    let tmpCells = [];
                    tmpAllCheckBoxType.forEach(function (_cbType) {
                        if (_singleOddsSet[_cbType] != null) {

                            if (_singleOddsSet[_cbType].indexOf("LSE") >= 0)
                                isSkipeOdds = true;

                            tmpCells.push(<OddsCell key={`${_matchID}${_oddsType}${_cbType}_${_singleOddsSet.LINENUM}OC`} rkey={`${_matchID}${_oddsType}${_cbType}_${_singleOddsSet.LINENUM}OC`} _oddsType={_oddsType} _matchID={_matchID} oddsSet={_singleOddsSet} checkboxType={`${_cbType}`} lineNum={_singleOddsSet.LINENUM} _tableType={_tableType} poolStatus={poolStatus} isAllup={isAllup} poolId={poolId} />);
                        }
                    });

                    if (!isSkipeOdds) {
                        allSelections.push(
                            <div key={`${_oddsType}${_singleOddsSet.LINENUM}`} className={`${_rowClasses} rAlt` + _ind % 2}>
                                {formatLineNum(_oddsType, _matchID, [_singleOddsSet], isExpanded, poolStatus)}
                                {tmpCells}
                            </div>
                        );
                    }
                });

                return <div className="allSelections">{allSelections}</div>;
            } else {
                let tmpCells = [];
                tmpAllCheckBoxType.forEach(function (_cbType) {
                    let tmpTypeCells = [];
                    let hasMainLine = false;
                    _oddsSet.LINELIST.forEach(function (singleOddsSet, index) {
                        let _key = `${_matchID}${_oddsType}${_cbType}_0OC_${singleOddsSet.LINENUM}`;
                        let lineClass = "", lineDisplayValue = "";
                        if (index == 0) {
                            lineClass = "mlMainRow ";
                        } else {
                            lineClass = "mlSubRow ";
                        }
                        if (singleOddsSet["MAINLINE"] == "true") {
                            lineClass += "mainLineRow";
                            lineDisplayValue = "block";
                        } else {
                            lineClass += "otherLineRow";
                            if (isExpanded) {
                                lineDisplayValue = "block";
                            } else {
                                lineDisplayValue = "none";
                            }
                        }
                        tmpTypeCells.push(
                            <OddsCell key={_key} rkey={_key} _oddsType={_oddsType} _matchID={_matchID} oddsSet={singleOddsSet} checkboxType={`${_cbType}`} lineNum={singleOddsSet.LINENUM} _tableType={_tableType} poolStatus={poolStatus} isAllup={isAllup} extraClass={lineClass} displayValue={lineDisplayValue} poolId={poolId} />
                        );
                    });
                    tmpCells.push(<div className={`codds`}>
                        {tmpTypeCells}
                    </div>);
                });

                return [
                    formatLineNum(_oddsType, _matchID, _oddsSet, isExpanded, poolStatus),
                    tmpCells,
                    (_oddsSet.LINELIST.length > 1 ?
                        <div className="tgIndMl" key={_matchID + _oddsType + "tg"}>
                            <span onClick={() => { tgIndMl(singleMatch.matchIDinofficial) }} className="mlBtnPlus"></span>
                        </div> :
                        <div className="tgIndMl" key={_matchID + _oddsType + "tg"}>
                        </div>
                    )
                ];
            }
        } else if (_oddsType == "SPC" || _oddsType == "SPCINPLAY") {
            let item = props.singleItem;
            if (item !== undefined && item !== null) {
                let singleItemAns = [];
                poolStatus = item.POOLSTATUS;
                isAllup = item.ALLUP;
                poolId = item.POOLID;
                item.SELLIST.forEach(function (selItem, ind2) {
                    let _itemNum = selItem.SEL + "_" + item.ITEM;
                    singleItemAns.push(<OddsCell key={`${_matchID}${_oddsType}${_itemNum}OC`} rkey={`${_matchID}${_oddsType}${_itemNum}OC`} _oddsType={_oddsType} _matchID={_matchID} oddsSet={selItem} checkboxType={`ODDS`} lineNum={`${_itemNum}`} _tableType={_tableType} poolStatus={poolStatus} isAllup={isAllup} poolId={poolId} />);
                })
                return singleItemAns;
            } else {
                let _tableKey = singleMatch.matchID;
                if (_oddsType == "SPCINPLAY") {
                    _ref = "inplay";
                    _tableKey = singleMatch.matchID + _ref;
                }
                return <SPCTableByMatch singleMatch={singleMatch} tableType={_tableType} key={_tableKey} spcOddsType={_ref} />;
            }
        } else if (_oddsType == "SGA") {
            return <SGATable singleMatch={singleMatch} key={singleMatch.matchID} tableType={_tableType} />;
        } else {
            return null;
        }
    } catch (ex) {
        return null;
    }
}

class MultiPoolPageOddsSelection extends React.Component {
    render() {
        try {
            let singleMatch = this.props.singleMatch;
            let _tableType = this.props.tableType;
            let _oddsType = this.props.oddsType;
            let _oddsSuffix = "odds"

            let _rowClasses = "coddsSelections";
            if (!isMultiRowPool(_oddsType))
                _rowClasses += " rAlt0";
            if (_tableType == "result") {
                _tableType = "presales";
                //  _oddsSuffix = "lastodds";
                if (!(_oddsType.toLowerCase() + _oddsSuffix) in singleMatch)
                    return null;
                //_oddsSet = singleMatch[_oddsType.toLowerCase()+"lastodds"];
            }

            let _oddsSelection = getOddsSelection({ "singleMatch": singleMatch, "tableType": _tableType, "oddsType": _oddsType, "inplayLink": false, "_oddsSuffix": _oddsSuffix });

            if (_oddsType.match(/^(HAD|EHA|HADINPLAY|FHA|FHAINPLAY|HHA|HHAINPLAY|OOE|TQL|TQLINPLAY|HFT|HFTINPLAY)$/)) {
                return <div className={_rowClasses} >
                    {_oddsSelection}
                </div>;
            } else if (_oddsType.match(/^(HDC|HDCINPLAY|EDC)$/)) {
                let hTeamName = jsLang.toLowerCase() == 'ch' ? singleMatch.homeTeam.teamNameCH : singleMatch.homeTeam.teamNameEN;
                let aTeamName = jsLang.toLowerCase() == 'ch' ? singleMatch.awayTeam.teamNameCH : singleMatch.awayTeam.teamNameEN;

                return <div className={_rowClasses}>
                    <div id="hdcGL" className="cline">
                        {hTeamName}{renderGoalLine(singleMatch, _oddsType, "HG", false, false, "0")}<br />
                        {aTeamName}{renderGoalLine(singleMatch, _oddsType, "AG", false, false, "0")}
                    </div>
                    {_oddsSelection}
                </div>
            } else if (_oddsType.match(/^(FTS|NTS|ENT|ETS)$/)) {
                if (pageName == "RESULT") {
                    return <div className={`table`}>
                        {_oddsSelection}
                    </div>;
                } else {
                    return <div className={_rowClasses} >
                        {_oddsSelection}
                    </div>;
                }
            } else if (_oddsType.match(/^(TTG|ETG|TTGINPLAY|FGS|CRS|ECS|CRSINPLAY|FCS|FCSINPLAY|SPC|SPCINPLAY|SGA)$/) || isML(_oddsType)) {
                return _oddsSelection;
            } else {
                return null;
            }
        } catch (ex) {
            return null;
        }
    }
}

class OddsSelectionDHCP extends React.Component {
    render() {
        var couponID = this.props.couponID;
        var indexInCoupon = this.props.indexInCoupon;
        var lineNum = (parseInt(couponID, 10) - 1) * 2 + (parseInt(indexInCoupon, 10) - 1);
        var singleMatch = this.props.singleMatch;
        var _matchID = singleMatch.matchIDinofficial + "_" + indexInCoupon;
        var _oddsType = this.props.oddsType;
        var _oddsSet = singleMatch[_oddsType.toLowerCase() + "odds"];
        var _tableType = this.props.tableType;
        var poolStatus = this.props.poolStatus;
        var isAllup = singleMatch.isVoidMatch();  //used for void match checking
        var isDisabled = singleMatch.isVoidMatch() || !isSelling(poolStatus, "1", "1");
        var _rowClasses = "coddsSelections";

        var hTeamName, aTeamName;
        var wordsInGrayBar = "";

        if (jsLang == "CH") {
            hTeamName = singleMatch.homeTeam.teamNameCH;
            aTeamName = singleMatch.awayTeam.teamNameCH;
            if (indexInCoupon == "1") {
                // first half
                wordsInGrayBar = jsHT;
            } else {
                wordsInGrayBar = jsFT;

            }
        } else {
            hTeamName = singleMatch.homeTeam.teamNameEN;
            aTeamName = singleMatch.awayTeam.teamNameEN;
            if (indexInCoupon == "1") {
                // first half
                wordsInGrayBar = <span>F<br />I<br />R<br />S<br />T<br /><br />H<br />A<br />L<br />F</span>;
            } else {
                wordsInGrayBar = <span>F<br />U<br />L<br />L<br /><br />T<br />I<br />M<br />E</span>;
            }
        }
        hTeamName += " (" + jsHomeTeamWin + ")";
        aTeamName += " (" + jsAwayTeamWin + ")";

        _rowClasses += "";

        var isExpanded = false;


        return <div className="pariOddsInCoupon borderT">
            <div className="grayBar tdProgress">{wordsInGrayBar}</div>
            <div className="betTypeAllOdds allSelections">
                <div className="tOdds rBottomBorder">
                    <div className="codds">{hTeamName}</div>
                    <div className="codds">{jsDRAW}</div>
                    <div className="codds">{aTeamName}</div>
                </div>
                <div className={`${_rowClasses} rAlt0`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0100", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0000", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0001", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt1`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0200", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0101", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0002", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt0`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0201", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0202", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0102", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt1`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0300", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0303", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0003", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt0`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0301", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    <div className="codds"></div>
                    <div className="codds"></div>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0103", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt1`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0302", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    <div className="codds"></div>
                    <div className="codds"></div>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0203", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt0`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0400", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    <div className="codds"></div>
                    <div className="codds"></div>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0004", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt1`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0401", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    <div className="codds"></div>
                    <div className="codds"></div>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0104", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt0`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0402", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    <div className="codds"></div>
                    <div className="codds"></div>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0204", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt1`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0500", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    <div className="codds"></div>
                    <div className="codds"></div>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0005", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt0`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0501", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    <div className="codds"></div>
                    <div className="codds"></div>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0105", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt1`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0502", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    <div className="codds"></div>
                    <div className="codds"></div>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0205", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className={`${_rowClasses} rAlt0`}>
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MH", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MD", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                    {formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MA", lineNum, _tableType, isExpanded, poolStatus, isAllup)}
                </div>
                <div className="tdAll coddsSelections rAlt1">
                    <div className="codds fieldCell">
                        {jsallfield} <OddsCheckboxPariMutuel _poolType={_oddsType} matchID={_matchID} selectionVal={`F`} rInd={lineNum} isDisabled={isDisabled} />
                    </div>
                </div>
            </div>
        </div>
    }
}

class SPCTableByMatch extends React.Component {
    render() {
        let singleMatch = this.props.singleMatch;
        let _matchID = singleMatch.matchIDinofficial;
        let _tableType = this.props.tableType;
        let _oddsSet;
        if (this.props.spcOddsType == "Ref" || _tableType == "PresalesMatches") {
            _oddsSet = singleMatch["spcoddsref"];
            if (_oddsSet == undefined || _oddsSet == null) {
                _oddsSet = singleMatch["spcodds"];
            }
        } else if (this.props.spcOddsType == "inplay") {
            _oddsSet = singleMatch["spcinplayodds"];
        }
        else {
            _oddsSet = singleMatch["spcodds"];
        }

        let _rowClasses = "coddsSelections";
        let allItemTable = [];

        _oddsSet.forEach(function (item, ind) {
            if (item.GROUP == undefined || item.GROUP == null || item.GROUP == "Match" || pageName == "ALL" || pageName == "INPLAYALL" || pageName == "INPLAYSPC") {
                var singleItemTable;
                var singleItemAns = [];
                var singleItemOdds = [];
                item.SELLIST.forEach(function (selItem, ind2) {
                    let _lineNum = selItem.SEL + "_" + item.ITEM;
                    singleItemAns.push(
                        <div key={`SPCAns${item.ITEM}${selItem.SEL}`} className="codds cAns rBottomBorder">
                            ({parseInt(selItem.SEL, 10)})<br />{jsLang == "CH" ? selItem.CONTENTCH : selItem.CONTENTEN}
                        </div>);
                    singleItemOdds.push(
                        <div key={`SPCOdds${item.ITEM}${selItem.SEL}`} className="rAlt0 codds">
                            <OddsCell key={`${_matchID}SPC${_lineNum}OC`} rkey={`${_matchID}SPC${_lineNum}OC`} _oddsType={`SPC`} _matchID={_matchID} oddsSet={selItem} checkboxType={`ODDS`} lineNum={`${_lineNum}`} _tableType={_tableType} poolStatus={item.POOLSTATUS} isAllup={item.ALLUP} poolId={item.POOLID} />
                        </div>);
                });

                let _spcTitleEsst;
                if (isInplay || pageName == "RESULT") {
                    _spcTitleEsst = null;
          //      } else if (singleMatch.IsMatchKickOff()) {
          //          _spcTitleEsst = <div className="spcTitleEsst">
          //              {formatInplayIco(singleMatch, "ico", pageName)} {formatInplayIco(singleMatch, "url", pageName)}
          //          </div>;
                } else {
                    _spcTitleEsst = <div className="spcTitleEsst">
                        {jsesst1}{jsesst2}: {formatEsst(singleMatch, true, "SPC")}
                    </div>;
                }

                singleItemTable = <div key={`SPC${_matchID}${item.ITEM}`}>
                    {isInplay && pageName != "INPLAYALL" ?
                        <div className="spcMatchStatus">
                            <span dangerouslySetInnerHTML={{ __html: formatInplayTeamAndStatus(singleMatch.ipinfo, "stagemsg", singleMatch.matchTime, _isHalfTimePage) }}></span>
                        </div>
                        :
                        null}
                    <div className="spcQuestion">
                        <div className="spcTitleQuestion">
                            {jsitemno}: {item.ITEM} <span id={`spcq${_matchID}_${item.ITEM}`}>
                                {jsLang == "CH" ? item.ITEMCH : item.ITEMEN}
                            </span>
                            {(pageName!='RESULT' && item.POOLSTATUS != "" && isSuspended(item.POOLSTATUS)) ?
                                <div className="poolstatus redtext">
                                    {isInplay ? "-" : ""}{GetGlobalResources("suspended")}
                                </div>
                                :
                                ""
                            }
                        </div>
                        {_spcTitleEsst}
                    </div>
                    <div className="tblSpc">
                        <div className="betTypeAllOdds">
                            {singleItemAns}
                        </div>
                        <div className="betTypeAllOdds">
                            {singleItemOdds}
                        </div>
                    </div>
                </div>;
            }

            allItemTable.push(singleItemTable);
        })
        return <div>{allItemTable}</div>
    }

}

class SPCTableByTourn extends React.Component {
    render() {
        try {
            var singleTourn = this.props.singleTourn;
            var _tournID = singleTourn.tournamentID;
            var _tableType = this.props.tableType;
            var _oddsSet;
            if (this.props.spcOddsType == "Ref") {
                _oddsSet = singleTourn["tspoddsref"];
            } else {
                _oddsSet = singleTourn["tspodds"];
            }
            var _rowClasses = "coddsSelections";

            var allItemTable = [];

            _oddsSet.forEach(function (item, ind) {
                var singleItemTable;
                var singleItemAns = [];
                var singleItemOdds = [];

                item.SELLIST.forEach(function (selItem, ind2) {
                    var _lineNum = item.ITEM + "_" + selItem.SEL;
                    singleItemAns.push(
                        <div key={`SPCAns${selItem.ITEM}${selItem.SEL}`} className="cAns rBottomBorder codds">
                            ({parseInt(selItem.SEL, 10)})<br />{jsLang == "CH" ? selItem.CONTENTCH : selItem.CONTENTEN}
                        </div>);
                    singleItemOdds.push(
                        <div key={`SPCAns${selItem.ITEM}${selItem.SEL}`} className="rAlt0 codds">
                            <OddsCell key={`${_tournID}TSP${_lineNum}OC`} rkey={`${_tournID}TSP${_lineNum}OC`} _oddsType={`TSP`} _matchID={_tournID} oddsSet={selItem} checkboxType={`ODDS`} lineNum={_lineNum} _tableType={_tableType} poolStatus={item.POOLSTATUS} isAllup={item.ALLUP} poolId={item.POOLID} />
                        </div>);
                });
                singleItemTable = <div key={`TSP${_tournID}${item.POOLID}`}>
                    <div className="tspcQuestion">
                        <div className="tspcTitleQuestion">
                            {jsitemno}: {item.ITEM} <span id={`spcq${_tournID}_${item.ITEM}`}>
                                {jsLang == "CH" ? item.ITEMCH : item.ITEMEN}
                            </span>
                            {(_tableType == "ActiveTournaments" && item.POOLSTATUS != "" && isSuspended(item.POOLSTATUS)) ?
                                <div style={{ fontWeight: "bold" }} className="redtext">
                                    {GetGlobalResources("suspended")}
                                </div>
                                :
                                ""
                            }
                        </div>
                        <div className="spcTitleEsst">
                            {item.ExpectedStopTime != "" ? jsesst1 : null}
                            {item.ExpectedStopTime != "" ? jsesst2 : null}:
                        {item.ExpectedStopTime != "" ? formatEsstStr(item.ExpectedStopTime, true) : null}
                        </div>
                    </div>
                    <div className="tblSpc">
                        <div className="betTypeAllOdds">
                            {singleItemAns}
                        </div>
                        <div className="betTypeAllOdds">
                            {singleItemOdds}
                        </div>
                    </div>
                </div>;
                allItemTable.push(singleItemTable);
            });
            return <div>{allItemTable}</div>
        } catch (ex) {
            return null;
        }
    }
}

class SGATable extends React.Component {
    render() {
        let singleMatch = this.props.singleMatch;
        let _matchID = singleMatch.matchIDinofficial;
        let _tableType = this.props.tableType;
        let _oddsSet = singleMatch["sgaodds"];

        let _rowClasses = "coddsSelections";
        let allItemTable = [];

        _oddsSet.forEach(function (item, ind) {
            let selItem = item.SELLIST[0];
            let lineNum = item.SELLIST[0].id + '_' + item.ITEM;
            allItemTable.push(<div key={`SGA${_matchID}${item.ITEM}`}>
                <div className="betTypeAllOdds">
                    <div key={`SGAAns${item.ITEM}`} className={`cSGAItem rAlt${ind % 2}`}>
                        {jsLang == "CH" ? selItem.CONTENTCH : selItem.CONTENTEN}
                    </div>
                    <div key={`SGAOdds${item.ITEM}`} className={`codds rAlt${ind % 2}`}>
                        <OddsCell key={`${_matchID}SGA${item.ITEM}OC`} rkey={`${_matchID}SGA${item.ITEM}OC`} _oddsType={`SGA`} _matchID={_matchID} oddsSet={selItem} checkboxType={`ODDS`} lineNum={lineNum} _tableType={_tableType} poolStatus={item.POOLSTATUS} isAllup={item.ALLUP} poolId={item.POOLID} />
                    </div>
                </div>
            </div>);
        })
        return <div>{allItemTable}</div>
    }

}

function renderOddsTable(couponArr, oddsTableType, oddsType, tournamentsArr, firstLoad, dataName) {
    selectedTournamentIds = getTournGroupIdsBytName(selectedTournamentIds);

    if (dataName != "odds_featured_matches.aspx" && pageName == "OFM") {
        return;
    }

    ReactDOM.render(
        <OddsTable coupons={couponArr} key={oddsTableType} tableType={oddsTableType} oddsType={oddsType} tournaments={tournamentsArr} />,
        document.getElementById('ActiveMatchesOdds'), () => {
            oddsTableLoaded();
        }
    );
}
function adjustHeaderLayout() {
    var headerLeftInnerTextLength = 0;
    var headerLeft = $('.normalheader .left')[0];
    if (headerLeft != undefined) {
        headerLeftInnerTextLength = parseInt(headerLeft.innerText.length, 10);
    }
    var headerRight = $('.normalheader .right');

    if (headerLeftInnerTextLength > 40 && headerRight != undefined) {
        $('.normalheader .left span a').addClass("ntext");
        $('.normalheader .left span label').addClass("ntext");
        $('.normalheader .left span span').addClass("ntext");
    }
}

function adjustTabWidth() {

    let dateTabObj = $("#SelectDateTimeId");

    let dateTabWidth = dateTabObj.width() - 5;

    let dateTabCount = dateTabObj.find("div").length;

    dateTabObj.find("div").width((dateTabWidth / dateTabCount) - 2);
}

function initTablePage() {
    curPage = 1;
    endMatch = 0;
    startMatch = 0;
    totalMatch = 0;
    dateTournaTabInited = false;
    selectedTournamentIds = [];
    selectedTabDateArra = [];
    resetSpBtn();
}

function getAllSelectedTournaments() {
    selectedTournamentIds = [];
    // R0a: Remove unselected Torunament and a selected tournament to sessionStorage.
    var tmpSessionSelectedTournsId = JSON.parse(sessionStorage.getItem("__extendShareSelectedTournsId"));

    if (tmpSessionSelectedTournsId == null)
        tmpSessionSelectedTournsId = [];

    var newSelectedTournsId = [];
    var addSelect = [];
    var removeSelect = [];
    $(".js_selectCompetitionNav").find("li").each(function () {
        let temptName = $(this).attr("data-value");
        for (var i = 0; i < allTournaments.length; i++) {
            if (allTournaments[i].tName == temptName) {
                if ($(this).hasClass("cur")) {
                    selectedTournamentIds.push(allTournaments[i].tournamentID);
                    if ($.inArray(allTournaments[i].tournamentID, newSelectedTournsId) === -1) {
                        newSelectedTournsId.push(allTournaments[i].tournamentID);
                    }
                } else {
                    removeSelect.push(allTournaments[i].tournamentID);
                }
            }
        }      
    });
    tmpSessionSelectedTournsId = jQuery.grep(newSelectedTournsId, function (el) {
        return removeSelect.indexOf(el) < 0;
    });
    // R0a: update session
    sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify(tmpSessionSelectedTournsId));
}

function hasSelectedTournament() {

    let count = 0;
    $(".js_selectCompetitionNav").find("li").each(function () {
        if ($(this).hasClass("cur")) {
            let temptName = $(this).attr("data-value");

            for (var i = 0; i < allTournaments.length; i++) {
                if (allTournaments[i].tName == temptName) {
                    count++;
                }
            }
        }
    });

    return count > 0;
}

function hasRemovedCurTournamentTab() {

    let newSelectedTName = [];

    $(".js_selectCompetitionNav").find("li").each(function () {
        if ($(this).hasClass("cur")) {
            let temptName = $(this).attr("data-value");

            for (var i = 0; i < allTournaments.length; i++) {
                if (allTournaments[i].tName == temptName) {
                    newSelectedTName.push(temptName);
                }
            }
        }
    });

    
    let tournGroup = $.grep(allTournaments, function (elem) {
        return $.inArray(elem.tournamentID, selectedTournamentIds) !== -1;
    });

    for (var i = 0; i < tournGroup.length; i++) {

        if ($.inArray(tournGroup[i].tName, newSelectedTName) === -1) {
            return true;
        }
    }

    return false;
}

function setMatchIdFromTabSelectionForPush(dateSel) {    
    var matchSel = "";    
    var chkMatchLst;
    if (dataCache.length > 0) {
        for (var j = 0; j < dataCache.length; j++) {
            if (dataCache[j].name == "ActiveMatches") {
                chkMatchLst = dataCache[j].matches;
            }
        }
    } else {
        chkMatchLst = dataCache.matches;
    }

    if (chkMatchLst != undefined) {
        for (var i = 0; i < chkMatchLst.length; i++) {
            if (chkMatchLst[i].matchDate.indexOf(dateSel) != -1) {
                matchSel = chkMatchLst[i].matchID;
                break;
            }
        }
    } 
    return matchSel;
}
function oddsTableLoadedRender() {
    try {
        $('#divLoading').show();
        AMS.disconnect();

        if (pageName == "MIXALLUPLIST") {
            renderMixAllUpMatchList();
        } else if (pageName == "ALL" || pageName == "INPLAYALL") {
            renderAllTable(false);
        } else {
            renderAllTableRoute(dataCache, false);
        }
    } catch (ex) {

    } finally{
        $('#divLoading').hide();
        if (!AMS.hasConnected && allowOddsPush && isLogon()) {
            AMS.connect();
        }
    }
   
}

function oddsChpTableLoaded() {
    try {
        setCompetitionCheckbox();

        if (dateTournaTabInited == false) {
            dateTournaTabInited = true;
            hideTabLoading();

            //$(".competition_nav").show();
            curTabType = tabType.Competition;
            
            //selected competition
            $(".js_selectCompetitionNav li").unbind();
            $(".js_selectCompetitionNav li").click(function () {
                if ($(this).hasClass("cur")) {
                    $(this).removeClass("cur");

                    $(this).find("input").prop("checked", false)
                } else {
                    $(this).addClass("cur");

                    $(this).find("input").prop("checked", true)
                }
            })
            
            //show all tournaments
            $(".more span").unbind();
            $(".more span").click(function () {
                $(".competition_nav").find(".second_ul").each(function () {
                    if ($(this).css("display") == "none") {
                        $(this).show();
                        if ($("#oddstab_showall").css("display") != "none") {
                            $("#oddstab_showall").hide();
                            $("#oddstab_hide").show();
                        }
                    } else {
                        hiddenTournaOthers($(this));
                    }
                })
            })

            //applay filter event
            $("#oddstab_searchbtn").unbind();
            $("#oddstab_searchbtn").click(function () {
                let changeConfirm = $(".checkedOdds").length > 0 && (curTabType != tabType.Competition || (curTabType == tabType.Competition && hasRemovedCurTournamentTab())) ? window.confirm(jstabchangeconfirm) : true;
                if (changeConfirm) {
                    if (hasSelectedTournament()) {
                        initTablePage();
                        getAllSelectedTournaments();
                        pushHistoryAfterTabChange(selectedTournamentIds[0], true);
                        oddsTableLoadedRender();
                        $('.betTypeAllOdds').show();
                    } else {
                        alert(jsodds_tab_filtermsg);
                        return false;
                    }
                }
            });
        }
    } catch (ex) {
        debugLog("oddsChpTableLoaded:" + ex)
    }
}

function oddsTableLoaded() {
    try {
        adjustHeaderLayout();
        adjustTabWidth();
        setCompetitionCheckbox();
        let noPoolObj = $("#noPoolContentMsg");
        if (noPoolObj != null) {
            noPoolObj.html(jsNoPoolMsg);
        }
        
        if (dateTournaTabInited == false || (dateTournaTabInited == true && dateTabCount != $("#SelectDateTimeId").find("div").length) || dropdownCount != $("#matchSelectId").find("option").length) {
            dateTabCount = $("#SelectDateTimeId").find("div").length;
            dropdownCount = $("#matchSelectId").find("option").length;
            dateTournaTabInited = true;
            selectedTabDateArra = [];
            hideTabLoading();

            if (mdate != "" && curTabType == tabType.Date && curDateType != dateType.All) {
                otherTabDates.forEach(function (_otherTabDate, index) {
                    if (_otherTabDate.split("T")[0] == mdate) {
                        curDateType = dateType.Other
                    }
                });
            }

            if ($("#SelectDateTimeId div.cur").attr("data-value") == dateType.All || curTabType == tabType.Feature) {
                curTabType == tabType.Feature ? $(".date_nav").hide() : null
                selectedTabDateArra = $.map(allTabDateList, function (value) {
                    return value.split("T")[0];
                });
            } else if (mdate != "" && curDateType != dateType.Other && curTabType == tabType.Date) {
                selectedTabDateArra.push(mdate);
            } else if (mdate != "" && curDateType == dateType.Other && curTabType == tabType.Date) {
                $("#SelectDateTimeId").find("[data-value=" + dateType.Other + "]").attr('class', 'cur');
                selectedTabDateArra = $.map(otherTabDates, function (value) {
                    return value.split("T")[0];
                });
            } else if ($("#SelectDateTimeId div.cur").attr("data-value") == dateType.Other) {
                selectedTabDateArra = $.map(otherTabDates, function (value) {
                    return value.split("T")[0];
                });
            } else if ($($("#SelectDateTimeId div.cur")[0]).attr("data-value") !== undefined) {
                selectedTabDateArra.push($($("#SelectDateTimeId div.cur")[0]).attr("data-value").split("T")[0]);
            } else if ($($("#SelectDateTimeId div")[0]).attr("data-value") !== undefined){
                selectedTabDateArra.push($($("#SelectDateTimeId div")[0]).attr("data-value").split("T")[0]);
            }

            
            var hasSelectedDate = false;
            selectedTabDateArra.forEach(function (_date, index) {
                if (_date.split("T")[0] == mdate) {
                    hasSelectedDate = true;
                }
            });
            if (!hasSelectedDate && curTabType != tabType.Competition) {
                mdate = selectedTabDateArra[0];
            }
            bindUIEvent();
        }
    } catch (ex) {
        debugLog("oddsTableLoaded:" + ex);
    }
} 

var isSwitchingDateTournTab = false;
function bindUIEvent() {

    hideTabLoading();

    //Tab change
    $(".js_selectNav span").unbind();
    $(".js_selectNav span").click(function () {
        //$(".checkedOdds").length > 0 -> checked ODDS? > 0-> YES <=0 -> NO
        if (isSwitchingDateTournTab)
            return;

        var hasCheckedOdds = $(".checkedOdds").length > 0;
        var isAllupListPage = pageName == "MIXALLUPLIST";

        let changeConfirm = hasCheckedOdds && !isAllupListPage ? window.confirm(jstabchangeconfirm) : true;
        if (changeConfirm) {

            isSwitchingDateTournTab = true;
            tMatchID = "";
            mixUnSelectedAll();

            if (!$(this).hasClass("cur")) {
                $(this).addClass("cur").siblings().removeClass("cur");
                if ($(this).attr("data-value") == 1) {
                    initTablePage();
                    initTabDate();
                    dateTabChange($($("#SelectDateTimeId div.cur")[0]));
                    if (pageName == "MIXALLUPLIST") {
                        curDateType = dateType.All;
                    }
                    oddsTableLoadedRender();

                } else if ($(this).attr("data-value") == 0) {
                    initTablePage();
                    initTabFeature();
                    hideDatePage();
                    oddsTableLoadedRender();
                } else {
                    //competition shown
                    initTablePage();

                    hideDatePage();
                    initTabCompetition();
                    oddsTableLoadedRender();
                    pushHistoryAfterTabChange($(".competition_nav li")[0].getAttribute("data-value"), true)
                }
            }
        }
        setTimeout(function () { isSwitchingDateTournTab = false; }, 4000);
    })
    
    //selected competition
    $(".js_selectCompetitionNav li").unbind();
    $(".js_selectCompetitionNav li").click(function () {
        if ($(this).hasClass("cur")) {
            $(this).removeClass("cur");
            $(this).find("input").prop("checked", false)
        } else {
            $(this).addClass("cur");
            $(this).find("input").prop("checked", true)
        }
    })
    
    //show all tournaments
    $(".more span").unbind();
    $(".more span").click(function () {
        $(".competition_nav").find(".second_ul").each(function () {
            if ($(this).css("display") == "none") {
                $(this).show();
                if ($("#oddstab_showall").css("display") != "none") {
                    $("#oddstab_showall").hide();
                    $("#oddstab_hide").show();
                }
            } else {
                hiddenTournaOthers($(this));
            }
        })
    })
    //date tab change
    $("#SelectDateTimeId div").unbind();
    $("#SelectDateTimeId div").click(function () {
        if (!dateTournaTabInited)
            return;

        if (isSwitchingDateTournTab)
            return;

        if (!$(this).hasClass("cur")) {
            //$(".checkedOdds").length > 0 -> checked ODDS? > 0-> YES <=0 -> NO
            let changeConfirm = $(".checkedOdds").length > 0 ? window.confirm(jstabchangeconfirm) : true;
            if (changeConfirm) {

                showTabLoading();
                dateTournaTabInited = false;
                curTabType = tabType.Date;
                selectedMatcheId = "0";
                tMatchID = "";
                $("#matchSelectId option:eq(0)").prop("selected", true);
                isSwitchingDateTournTab = true;

                if (!$(this).hasClass("cur")) {
                    initTablePage();
                    $(this).addClass("cur").siblings("div").removeClass("cur");
                    dateTabChange(this);
                    if (oddsPushStatus == 'push') {
                        tMatchID = setMatchIdFromTabSelectionForPush($(this).attr("data-value"));
                    }                    
                    oddsTableLoadedRender()
                }
            }
        }

        setTimeout(function () { isSwitchingDateTournTab = false; }, 4000);
    });

    //applay filter event
    $("#oddstab_searchbtn").unbind();
    $("#oddstab_searchbtn").click(function () {
        if (selectedMatcheId != "0") {
            selectedMatcheId = "0";
            $("#matchSelectId option:eq(0)").prop("selected", true);
        }
        tMatchID = "";

        let isCompetitionTab = curTabType == tabType.Competition;
        let hasRemovedTournTab = pageName != "MIXALLUPLIST" && hasRemovedCurTournamentTab();

        //$(".checkedOdds").length > 0 -> checked ODDS? > 0-> YES <=0 -> NO
        let changeConfirm = $(".checkedOdds").length > 0 && (!isCompetitionTab || (isCompetitionTab && hasRemovedTournTab)) ? window.confirm(jstabchangeconfirm) : true;

        //let changeConfirm = $(".checkedOdds").length > 0 ? window.confirm(jstabchangeconfirm) : true;
        if (changeConfirm) {
            if (pageName == "MIXALLUPLIST") {
                mixUnSelectedAll();
            }

            if (curTabType == tabType.Date) {
                initTablePage();
                selectedTabDateArra.push($($("#SelectDateTimeId div.cur")[0]).attr("data-value"));
                if (selectedTabDateArra.length == 0 || (selectedTabDateArra.length > 0 && (selectedTabDateArra[0] == null || selectedTabDateArra[0] == undefined))) {
                    alert(jsodds_tab_filtermsg);
                    return false;
                }
            } else {
                if (hasSelectedTournament()) {
                    initTablePage();
                    getAllSelectedTournaments();
                    pushHistoryAfterTabChange(selectedTournamentIds.length == getAllTournamentIds().length ? "all" : selectedTournamentIds[0], true);
                    oddsTableLoadedRender();
                } else {
                    alert(jsodds_tab_filtermsg);
                    return false;
                }
            }
        }
    });
    //dropdown list chage
    $("#matchSelectId").unbind();
    $("#matchSelectId").change(function () {
        //$(".checkedOdds").length > 0 -> checked ODDS? > 0-> YES <=0 -> NO
        let changeConfirm = $(".checkedOdds").length > 0 ? window.confirm(jstabchangeconfirm) : true;
        if (changeConfirm) {
            if ($(this).val() != "0") {
                //$("#matchValue").html($(this).find("option:selected").text());
                dateTournaTabInited = false;
                selectedMatcheId = $(this).val();
                setMatchId(selectedMatcheId);
                matchDataList.forEach(function (_singleCoupon, couponIndex) {
                    if (tMatchID == _singleCoupon.matchID) {
                        mdate = _singleCoupon.matchDate2
                    }
                })

                pushHistoryAfterTabChange(mdate, true)

                groupCurType = $("#matchSelectId option:checked").attr("data-type");
                oddsTableLoadedRender();
            }
        } else {
            $(this).val($("#matchSelectId option:first").val());
        }
    });
    // oddsAll select
    $("#matchAllSelectId").unbind();
    $("#matchAllSelectId").change(function () {
        //$(".checkedOdds").length > 0 -> checked ODDS? > 0-> YES <=0 -> NO
        let changeConfirm = $(".checkedOdds").length > 0 ? window.confirm(jstabchangeconfirm) : true;
        if (changeConfirm) {
            if ($(this).val() == "0") {
                $("#litMDay").html("");
            } else {
                $("#litMDay").html($(this).find("option:selected").text());
            }

            selectedMatcheId = $(this).val();
            oddsTableLoadedRender();
        }
    });
}

function dateTabChange(obj) {
    let dateTabDataVal = $(obj).attr("data-value");
    if (dateTabDataVal == dateType.Other) {
        selectedTabDateArra = $.map(otherTabDates, function (value) {
            return value.split("T")[0];
        });
        curDateType = dateType.Other;
    } else if (dateTabDataVal == "All") {
        curDateType = dateType.All;
        selectedTabDateArra = $.map(allTabDateList, function (value) {
            return value.split("T")[0];
        });
    } else if (dateTabDataVal != null) {
        curDateType = dateType.Single;
        selectedTabDateArra.push($(obj).attr("data-value"));
    } else if (mdate != null) {
        selectedTabDateArra = [];
        selectedTabDateArra.push(mdate);
    } else {
        selectedTabDateArra = [];
        selectedTabDateArra.push("");
    }
    pushHistoryAfterTabChange(selectedTabDateArra[0], true)
}

function pushHistoryAfterTabChange(data, isPushState) {

    let newUrl = ""
    var para = trimPara2();

    if (tabType.Competition == curTabType) {
        var re = new RegExp("&mdate=\\d+[-]+\\d+[-]+\\d+");
        url = location.href.replace(re, '');
        newUrl = replaceUrlParam(url, "tournid", data);
        para.tournid = data;
        para.mdate = null;
    } else {
        var re = new RegExp("&tournid=[\\da-z]+");
        url = location.href.replace(re, '');
        newUrl = replaceUrlParam(url, "mdate", data);
        para.mdate = data;
        para.tournid = null;
        mdate = data;
    }

    if (isPushState) {
        window.history.pushState(
            {
                "html": "",
                "pageTitle": document.title,
                "product": curProduct,
                "page": curPageId,
                "lang": curLang,
                "para": para
            }, "", newUrl);
    }
    else {
        window.history.replaceState(
            {
                "html": "",
                "pageTitle": document.title,
                "product": curProduct,
                "page": curPageId,
                "lang": curLang,
                "para": para
            }, "", newUrl);
    }

}


function replaceHistoryAfterTabChange(data) {

    let newUrl = ""
    var para = trimPara2();

    if (tabType.Competition == curTabType) {
        var re = new RegExp("&mdate=\\d+[-]+\\d+[-]+\\d+");
        url = location.href.replace(re, '');
        newUrl = replaceUrlParam(url, "tournid", data);
        para.tournid = data;
        para.mdate = null;
    } else {
        var re = new RegExp("&tournid=[\\da-z]+");
        url = location.href.replace(re, '');
        newUrl = replaceUrlParam(url, "mdate", data);
        para.mdate = data;
        para.tournid = null;
        mdate = data;
    }

}

function selectAllTournaments() {

    $(".js_selectCompetitionNav").find("li").each(function (index) {
        if (!$(this).hasClass("cur")) {
            $(this).addClass("cur");

            $(this).find("input").prop("checked", true)
        }
    })

    $(".competition_nav").find(".second_ul").each(function () {
        $(this).show();
        if ($("#oddstab_showall").css("display") != "none") {
            $("#oddstab_showall").hide();
            $("#oddstab_hide").show();
        }
    })
}

function resetTournaments() {
    $(".js_selectCompetitionNav").find("li").each(function (index) {
        if (index == 0) {
            $(this).addClass("cur");
            $(this).find("input").prop("checked", true)

            //selectedTournamentIds = [];
            //selectedTournamentIds.push($(this).attr("data-value"));
            //sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify(selectedTournamentIds));
        }
        if ($(this).hasClass("cur")) {
            if (index != 0) {
                $(this).removeClass("cur");

                $(this).find("input").prop("checked", false)
            }
        }
        //when clicked apply btn,the newd data is displayed
        //if (index == 0) {
        //    selectedTournamentIds = [];
        //    selectedTournamentIds.push($(this).attr("data-value"));
        //}
    });

    $(".competition_nav").find(".second_ul").each(function () {
        hiddenTournaOthers($(this));
    })

    $('html, body').animate({ scrollTop: 0 }, 'fast');
}


function setCompetitionCheckbox() {

    $(".js_selectCompetitionNav").find("li").each(function () {
        if ($(this).hasClass("cur")) {
            $(this).find("input").prop("checked", true)
        }
        else {
            $(this).find("input").prop("checked", false)
        }
    });
}

function hideDatePage() {
    $("#datepage").hide();
}

function hiddenTournaOthers(obj) {
    obj.hide();
    if ($("#oddstab_hide").css("display") != "none") {
        $("#oddstab_hide").hide();
        $("#oddstab_showall").show();
    }
    //$("#showall_tournament").hide();
    //$("#partial_tournament").show();
    hideDatePage();
}

function initTabFeature() {

    $(".js_selectNav").find("span[data-value='0']").addClass("cur").siblings().removeClass("cur");
    selectedTabDateArra = [];
    selectedTabDateArra = $.map(allTabDateList, function (value) {
        return value.split("T")[0];
    });

    //$(".competition_nav").hide();
    //$(".date_nav").hide();
    curTabType = tabType.Feature;

    sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify([]));
}

function initTabDate() {

    $(".js_selectNav").find("span[data-value='1']").addClass("cur").siblings().removeClass("cur");

    //date shown
    //$(".date_nav").show();
    //$(".competition_nav").hide();
    $("#datepage").show();
    //hideCompetitionPage();
    curTabType = tabType.Date;
    curDateType = dateType.Single;

    $("#SelectDateTimeId div").each(function (index) {
        if (index == 0) {
            $(this).addClass("cur");
        } else {
            $(this).removeClass("cur");
        }
    });

    sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify([]));
}

function initTabCompetition() {

    curTabType = tabType.Competition;
    $(".js_selectNav").find("span[data-value='2']").addClass("cur").siblings().removeClass("cur");
    //$(".date_nav").hide();
    $(".competition_nav").find(".second_ul").each(function () {
        if ($(this).css("display") != "none") {
            hiddenTournaOthers($(this));
        } else {
            //$("#showall_tournament").hide();
            //$("#partial_tournament").show();
            hideDatePage();
        }
    });
    resetTournaments();
    //$(".competition_nav").show();
    //getAllSelectedTournaments();

    if (oddsPushStatus == 'push') {
        showTabLoading();
        renderPushPortal();        
    } else if (pageName == "MIXALLUPLIST") {
        renderMixAllUpMatchList();
    } else if (pageName == "ALL") {
        renderAllTable(false);
    }else {
        renderAllTable(false);
    }
}


function pushOddsTableTournamentsArr(data, sorted) {
    let tournamentsArr = data;

    if (tournamentsArr.length > 0) {
        if (!sorted) {
            // sort matches by num 
            tournamentsArr = tournamentsArr.sort(sort_by2(["displayOrder"], [false], [parseInt]));
        }
    }

    return tournamentsArr;
}

function renderParimutuelResult(data) {
    try {
        let poolResults, poolNextDraw;
        var hasPMResults = false;
        if (pools == "DHCP") {
            poolResults = data[0];
        } else if (pools == "HFMP") {
            poolResults = data[0];
        }
        poolNextDraw = displaySearchResult ? null : data[1];

        if (poolResults != undefined && poolResults.length > 0) {
            if (displaySearchResult) {
                totalMatch = poolResults.length;
                startMatch = (curPage - 1) * maxMatch + 1;
                endMatch = startMatch + maxMatch - 1;
                endMatch = (endMatch > totalMatch ? totalMatch : endMatch);

                ReactDOM.render(
                    <PageInfo type="header" showHeaderPagination="true" />,
                    document.getElementById('searchTableHeader')
                );
                ReactDOM.render(
                    <PageInfo type="footer" showHeaderPagination="true" />,
                    document.getElementById('searchTableFooter')
                );
                if (FromDate != "")
                    $('.pagination').show();
                else
                    $('.pagination').hide();
            } else {
                startMatch = 1;
                endMatch = poolResults.length;
            }
            drawPariMutuelResultBody(poolResults, displaySearchResult, startMatch, endMatch);
            hasPMResults = true;
        }
        else if (!displaySearchResult) {
            // get latest results from last 10
            getLastestPariMutuelResultFromLast10();
            hasPMResults = true;
        }

        if (!hasPMResults) {
            $('#dContainer').hide();
            $('.noinfo').css('display', 'table-cell');
            $('.pagination').hide();
        }

        if (!displaySearchResult && poolNextDraw != 'N') {
            // sort parimutuel odds
            ReactDOM.render(
                <div className={`pmResultContainer`}>
                    <ParimutuelNextDraw _pool={poolNextDraw} />
                </div>,
                document.getElementById('dNextContainer')
            );
            $('#dNextContainer').show();
        } else {
            $('#dNextContainer').hide();
        }
    } catch (ex) {
        renderEmptyPage();
        debugLog("renderParimutuelResult" + ex);
    }
}


function getLastestPariMutuelResultFromLast10() {
    var mDate = "";
    $.ajax({
        url: last10Path,
        type: "get",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var oData = [];
            if (data != null && data[0] != null) {
                try {
                    for (var i = 0; i < data[0].length; i++) {
                        var dt = data[0][i][(pools == "DHCP" ? "dhcodds" : "hfmodds")]["LEG1"].matchDate;
                        if (mDate == '' || mDate == dt) {
                            oData.push(data[0][i]);
                            mDate = dt;
                        }
                    }
                    if (oData.length > 0) {
                        drawPariMutuelResultBody(oData, false, 1, oData.length);
                    }
                    else {
                        $('#dContainer').hide();
                        $('.noinfo').css('display', 'table-cell');
                        $('.pagination').hide();
                    }
                } catch (ex) {
                    debugLog("getLastestPariMutuelResultFromLast10: " + ex);
                }
            }
        },
        error: function () {
        }
    });
}

function drawPariMutuelResultBody(poolResults, displaySearchResult, startIdx, endIdx) {
    let _coupons = [];
    for (let i = (startIdx - 1); i < endIdx; i++) {
        let pmPool = (pools == "DHCP") ? poolResults[i].dhcodds : poolResults[i].hfmodds;
        let _leg1 = pmPool["LEG1"];
        let _couponID = "c" + i + "_" + _leg1.matchIDinofficial;
        let _couponName = `${formatYYYYMMDD(_leg1.matchTime.substr(0, 10).replace(/-/g, ''))} ${GetGlobalResources(_leg1.matchDay)} ${_leg1.matchNum}`;
        let rightText = (displaySearchResult ? null : `${jsstopselldate}: ${formatYYYYMMDD(_leg1.matchTime.substr(0, 10).replace(/-/g, ''))}`);

        let _void = isPoolRefund(pmPool.POOLSTATUS);

        _coupons.push(<div key={`${_couponID}_container`} className="space2">
            <CouponHeader couponName={_couponName} couponID={_couponID} hasMLMatch={false} couponCount={""} rightText={rightText} />
            <ParimutuelResultPoolDetails couponID={_couponID} _pool={poolResults[i]} _void={_void} />
            <ParimutuelResultPoolTable couponID={_couponID} _pool={poolResults[i]} _void={_void} />
        </div>);
    }
    ReactDOM.render(
        <div className={`pmResultContainer`}>
            {_coupons}
        </div>,
        document.getElementById('dContainer')
    );
    $('.noinfo').hide();
    $('#dContainer').show();
}


function renderParimutuelPage(data, _oddsType, firstLoad) {
    let keepRefresh = false;
    try {
        let poolData = data.matches != null && data.matches.length > 0 ? data.matches : [];//removeRepeat(data.matches) : [];
        let _tableType = (poolData.length > 0 ? "ActiveMatches" : "NoMatch");
        let _poolOdds = (_oddsType == "DHCP" ? "dhcodds" : "hfmodds")
        // render page header
        ReactDOM.render(
            <div>
                <OddsTableInfo tableType={_tableType} oddsType={_oddsType} />
                <div id="oddAllUpCalDiv"><OddsTableAllUpCalculator /></div>
                <OddsTableDateTournTab OddsTableTournaments={data.tournaments} OddsTableMatches={poolData} />
            </div>,
            document.getElementById('dHeader'), () => {
                oddsTableLoaded();
            }
        );
        if (poolData.length > 0) {
            if (poolData.length > 1)
                poolData = poolData.sort(sort_by2(["matchDate", "displayOrder"], [false, false], [trimMatchDate, parseInt]));

            // find displaying matchid 
            if (tMatchID == "")
                setMatchId(poolData[0].matchID);
            // select single match data
            let singlePool = jQuery.grep(poolData, function (_tmpSinglePool) {
                return _tmpSinglePool.matchID == tMatchID;
            })[0];
            let singleTournament;
            if (singlePool != null) {
                singleTournament = jQuery.grep(data.tournaments, function (_tmpSingleTourna) {
                    return _tmpSingleTourna.tournamentID == singlePool.tournament.tournamentID;
                })[0];
            }

            singlePool = singlePool[_poolOdds];

            if (singlePool != null) {

                if (firstLoad) {
                    $(".poolDetails").show();

                    $('#dateVal').html(formatMatchDate(singlePool.LEG1.matchDate) + " " + GetGlobalResources(singlePool.LEG1.matchDay, "js") + " " + singlePool.LEG1.displayOrder);
                    if (singlePool.investment == "")
                        $('#investmentVal').html("-");
                    else
                        $('#investmentVal').html("$" + numberWithCommas(singlePool.investment));
                    if (singlePool.jackpot == "")
                        $('#jackpotVal').html("-");
                    else
                        $('#jackpotVal').html("$" + numberWithCommas(singlePool.jackpot));
                    $('#esstVal').html(formatEsstStr(singlePool.LEG1.matchTime));
                }

                // ************* to be done
                // if cannot find selection with the matchid
                // >> if displayed > turn all cb to dimmed
                // else display first available

                // render DDL - if more than 1 selections
                ReactDOM.render(
                    <MatchDropDownList byCoupon={false} allData={poolData} />,
                    document.getElementById('dMatchListDDL')
                );

                // render pool table
                ReactDOM.render(
                    <ParimutuelPoolTable singlePool={singlePool} singleTournament={singleTournament} poolType={_oddsType} />,
                    document.getElementById('dPoolTable')
                );

                if (_oddsType == "DHCP") {
                    ReactDOM.render(
                        generateDHCPSelectionTable(singlePool, 1),
                        document.getElementById('dCoupon1')
                    );
                    ReactDOM.render(
                        generateDHCPSelectionTable(singlePool, 2),
                        document.getElementById('dCoupon2')
                    );
                }
                ReactDOM.render(
                    <AddBetBtn position="footer" />,
                    document.getElementById('dFooterAddBet')
                );

                keepRefresh = true;
                pmPool = singlePool;
            }
        }
    } catch (ex) {
        debugLog("renderParimutuelPage: " + ex);
    }

    if (!keepRefresh) {
        ReactDOM.render(
            <OddsTableInfo tableType={`NoMatch`} oddsType={_oddsType} />,
            document.getElementById('dHeader')
        );
        displayNoMatch(false);
    }

    return true;
}

function renderEmptyOddsTable() {
    try {
        ReactDOM.render(
            <div></div>,
            document.getElementById('ActiveMatchesOdds')
        );
    } catch (ex) { }
}

function getJSONQueryString() {
    var pathName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    if (pathName == "odds_chp2.aspx" || pathName == "odds_finalists.aspx" || pathName == "odds_winning_continent.aspx" || pathName == "odds_winning_country.aspx") {
        pathName = "odds_chp.aspx";
//    } else if (pageName == "MIXALLUPLIST" && curTabType == tabType.Feature) {
//        pathName = "odds_featured_matches.aspx";
    } else if (pageName == "MIXALLUP") {
        pathName = "odds_mixallup_all.aspx";
    } else if (pageName == "FOCUSMATCH") {
        pathName = "odds_had.aspx";
    } else if (pathName == "index.aspx") {
        if (pageName == "HAD") {
            pathName = "odds_had.aspx";
        }
    } else if (pageName == "RESULT" && displaySearchResult) {
        pathName = "search_result.aspx";
    } else if (pageName == "DHCP_RESULT" && displaySearchResult) {
        if (FromDate == "") {
            pathName = "dhcp_results_search_recent.aspx";
            para = "";
        } else {
            pathName = "dhcp_results_search.aspx";
        }
    } else if (pageName == "HFMP_RESULT" && displaySearchResult) {
        if (FromDate == "") {
            pathName = "hfmp_results_search_recent.aspx";
            para = "";
        } else {
            pathName = "hfmp_results_search.aspx";
        }
    }
    var qs = "?jsontype=" + pathName;
    if (pageName == "ALL" || pageName == "MIXALLUPSHORTCUT" || pageName == "INPLAYALL" || pageName == "MIXALLUP" || pageName == "LASTODDS") {

        let isTourn = false;

        if (curTabType == tabType.Date && mdate.length > 0 && tMatchID == "") {
            qs += "&mdate=" + mdate;
        } else if (tMatchID == "") {  
            if (selectedTournamentIds.length > 0) {
                //let tournId = $($(".js_selectCompetitionNav li.cur")[0]).attr("data-value");
                qs += "&tournid=" + selectedTournamentIds[0];
            }
            if (selectedTabDateArra.length > 0 && selectedTournamentIds.length == 0) {
                let mdate = "";
                mdate = selectedTabDateArra[0];
                qs += "&mdate=" + mdate;
            } else { 
                qs += "&matchid=default";
            }
        } else if (selectedTournamentIds.length > 0 && tMatchID != "") {
            qs += "&matchid=" + tMatchID;
        } else {
            if (selectedMatcheId!="0") {
                setMatchId(selectedMatcheId);
            }
            qs += "&matchid=" + tMatchID;
        }
    } else if (pageName == "TOURN") {
        qs += "&tournid=" + pTournID;
    } else if ((pageName == "RESULT" || pageName == "DHCP_RESULT" || pageName == "HFMP_RESULT") && displaySearchResult) {
        qs += para;
    }

    if (pageName == "RESULT" && displaySearchResult) {
        qs += "&pageno=" + curPage;
    }
    return qs;
}
var tteamcode;
function displaySearchInfo() {
    let srchdate = getParameterByName("srchdate"); // 1 or 0
    let fdate = getParameterByName("fdate"); // start date YYYYMMDD
    let tdate = getParameterByName("tdate"); // end date YYYYMMDD
    let srchteam = getParameterByName("srchteam"); // 1 or 0
    let teamcode = getParameterByName("teamcode"); // guid of team

    $('#searchInfo').html("");
    if (srchdate == "1") {
        $('#searchInfo').append(`<div><strong>${jsdate}:</strong> ${formatYYYYMMDD(fdate)} - ${formatYYYYMMDD(tdate)}</div>`);
    }

    if (srchteam == "1") {
        if (teamList != undefined && teamList.length > 0) {
            tteamcode = teamcode;
            let srchTeamName = $.grep(teamList, function (_sel) { return _sel.teamID == teamcode; })[0]["teamName" + jsLang];

            $('#searchInfo').append(`<div><strong>${jsteam}:</strong> ${srchTeamName}</div>`);
        }
    }
}

function getMatchData(data) {
    if (pageName != "TOURN" && data != null && (data[0] != null || data.matches != null)) {
        if (pageName == "CHP" || pageName == "TQL" || pageName == "MIXALLUP") {
            matchDataList = data;
        } else if ( pageName!="RESULT" ) {
            let _tempMatches = putMatchesToCoupon(data.matches, [], true);
            matchDataList = data.matches = _tempMatches != null ? _tempMatches : [];
        } else {
            if (data.length == 1) {
                let _tempMatches = putMatchesToCoupon(data[0].matches, [], true);
                matchDataList = data[0].matches = _tempMatches != null ? _tempMatches : [];
            } else if (data.length > 1 )
            {
                if (data[1].matchDate != null && data[1].matchDate != undefined) {
                    let _tempMatches = putMatchesToCoupon(data, [], true);
                    matchDataList = data = _tempMatches != null ? _tempMatches : [];
                } else {
                    let _tempMatches = putMatchesToCoupon(data[1].matches, [], true);
                    matchDataList = data[1].matches = _tempMatches != null ? _tempMatches : [];
                }
            } else{
                matchDataList = data;
            }
        }
    } else if (data != null){
        if (pageName != "TOURN" && data[0] != null && data[0] != undefined) {
            let _tempMatches = putMatchesToCoupon(data, [], true);
            matchDataList = data = _tempMatches != null ? _tempMatches : [];
        } else {
            matchDataList = data;
        }
    }
}

function getTournaments(data) {

    if (data == null || data.length == 0)
        allTournaments = [];
    else if (pageName != "TOURN" && data != null && (data[0] != null || data.tournaments != null)) {
        if (pageName == "CHP" || pageName == "TQL" || pageName == "MIXALLUP") {
            allTournaments = data;
        } else if (pageName != "RESULT") {
            allTournaments = data.tournaments = getAvailableTourn(data.tournaments);
        } else if (data != null && data[1] != undefined) {
            allTournaments = data[1].tournaments = getAvailableTourn(data[1].tournaments);
        } else if (pageName == "RESULT" && data[0].tournaments != null) {
            allTournaments = getAvailableTourn(data[0].tournaments);
        }
    } else if (pageName == "TOURN") {
        allTournaments = data;
    }
}

function loadTournamentIdFromQueryString() {

    // skipe load tournament if featured match
    if (pageName == "OFM") {
        return;
    }

    // get tournament id from query string
    var tournExp = location.href.match(new RegExp("&tournid=[\\da-z]+"));
    if (tournExp != null && tournExp.length > 0) {
        let tempId = tournExp[0].split("=")[1];

        // show all tournament if the tournament id = "all"
        if (tempId.toLowerCase() == "all") {
            selectedTournamentIds = getAllTournamentIds();
        }
        else if (selectedTournamentIds.length == 0) {
            selectedTournamentIds.push(tempId);
        }

        curTabType = tabType.Competition;

        // set tournament id in session
        selectedTournamentIds = getTournGroupIdsBytName(selectedTournamentIds);
    }

    sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify(selectedTournamentIds));
}

var noOfFail = 0;
function renderAllTable(firstLoad, retryOnce) {
    if (!firstLoad && oddsPushStatus == 'push')
        return;

    if (!firstLoad && !enableAutoRefresh)
        return;
    try {
        if (firstLoad) {
            //resetClickedCheckBox();
            if (tMatchID == "")
                $('.nopool').hide();
            $('#divLoading').show();
        }
        if (noOfFail <= 2) {
            var queryStr = getJSONQueryString();
            $.ajax({
                url: "/football/getJSON.aspx" + queryStr,
                type: "get",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    isPaginationClick = false;

                    // check if the return JSON matches the request URL
                    if (data!=null && data.name != null && data.name != '' && queryStr.indexOf(data.name) < 0) {
                        return;
                    }

                    try {
                        if (data != null && data.indexOf && data.indexOf(wafKeyword) >= 0 && !retryOnce) {
                            //console.log('Blocked by WAF, retry one time...');
                            $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
                            setTimeout(function () {
                                renderAllTable(firstLoad, true);
                            }, 1000);
                            return;
                        }

                        rawDataForAllOdds = data;
                        dataCache = data;

                        if (pageName != "HFMP_RESULT" && pageName != "DHCP_RESULT") {
                            getMatchData(data);
                            getTournaments(data);
                            loadTournamentIdFromQueryString();
                            if (allTournaments.length == 0) {
                                renderEmptyPage(firstLoad);
                                $('#divLoading').hide();
                                return;
                            }
                        }

                        if (data != null && data.name != null && data.name != '' && queryStr.indexOf(data.name) < 0) {
                            return;
                        }

                        if (pageName == "SPC" || pageName == "INPLAYSPC") {
                            // Hybrid
                            renderSPCTable(data, firstLoad);
                        } else if (pageName == "SGA") {
                            // Hybrid
                            renderSGATable(data, firstLoad);
                        } else if (pageName == "CHP") {
                            // Hybrid
                            renderCHPTable(data, firstLoad);
                        } else if (pageName == "TQL") {
                            renderTQLTable(data, firstLoad);
                        } else if (pageName == "RESULT") {
                            if (displaySearchResult) {
                                sortSearchResults();
                                drawSearchResults();
                            } else {
                                renderResults();
                            }
                        } else if (pageName == "HFMP_RESULT" || pageName == "DHCP_RESULT") {
                            renderParimutuelResult(data);
                        } else if (pageName == "SPC_RESULTS") {
                            renderSPCResults(data);
                        } else if (pageName == "MIXALLUP" || pageName == "MIXALLUPSHORTCUT") {
                            renderAllMatchAllTable(data, firstLoad);
                            if (firstLoad) {
                                allupMatchIdChexkbox = [];
                                for (var key in betValue) {
                                    if (tMatchID.indexOf(betValue[key].matchID) >= 0)
                                        allupMatchIdChexkbox.push(betValue[key].matchIDinofficial);
                                }
                                if (pageName == "MIXALLUP") {
                                    loadDefaultOdds();
                                } else {
                                    $('.cTitle').find('.btext').html($('.oMenuHighlight').text());
                                    initMixallup();

                                    // collapse match
                                    for (var i = defaultExpanedNoOfMatch; i < $('.dMixHeader').length; i++) {
                                        $($('.dMixHeader')[i]).click();
                                    }
                                }
                            }
                        } else if (pageName == "FOCUSMATCH") {
                            renderFocusMatch(data, firstLoad);
                        } else if (pageName != "TOURN") {
                            renderMatchTable(data, firstLoad);
                        } else {
                            renderTournTable(data, firstLoad);
                        }
                        displayRemarks();

                        pageReady = true;
                        initRefreshTime();
                        resetPushSchema();
                    } catch (ex) {
                        if (dataCache == null || dataCache == "") {
                            renderEmptyPage(firstLoad); debugLog(ex);
                        }
                    } finally {
                        isSwitchingDateTournTab = false;
                    }
                    $('#divLoading').hide();

                },
                error: function () {
                    noOfFail++;
                }
            });
        } else { renderEmptyPage(firstLoad); }
    } catch (ex) {
        renderEmptyPage(firstLoad);
    }
    setRefreshInterval();
}

function renderAllTableRoute(data, firstLoad){
    if (pageName == "SPC" || pageName == "INPLAYSPC") {
        // Hybrid
        renderSPCTable(data, firstLoad);
    } else if (pageName == "SGA") {
        // Hybrid
        renderSGATable(data, firstLoad);
    } else if (pageName == "CHP") {
        // Hybrid
        renderCHPTable(data, firstLoad);
    } else if (pageName == "TQL") {
        // Hybrid
        renderTQLTable(data, firstLoad);
    } else if (pageName == "RESULT") {
        if (displaySearchResult) {
            sortSearchResults();
            drawSearchResults();
        } else {
            renderResults();
        }
    } else if (pageName == "HFMP_RESULT" || pageName == "DHCP_RESULT") {
        renderParimutuelResult(data);
    } else if (pageName == "SPC_RESULTS") {
        renderSPCResults(data);
    } else if (pageName == "MIXALLUP" || pageName == "MIXALLUPSHORTCUT") {
        invalidBetTypeArr = [];
        renderAllMatchAllTable(data, firstLoad);
        refreshMixallUpCalculator();
        if (firstLoad) {
            tmatchids = [];
            for (var key in betValue) {
                tmatchids.push(betValue[key].matchIDinofficial);
            }
            if (pageName == "MIXALLUP") {
                loadDefaultOdds();
            } else {
                $('.cTitle').find('.btext').html($('.oMenuHighlight').text());
                initMixallup();

                // collapse match
                for (var i = defaultExpanedNoOfMatch; i < $('.dMixHeader').length; i++) {
                    $($('.dMixHeader')[i]).click();
                }
            }
        }
    } else if (pageName == "FOCUSMATCH") {
        renderFocusMatch(data, firstLoad);
    } else if (pageName != "TOURN") {
        renderMatchTable(data, firstLoad);
    } else {
        renderTournTable(data, firstLoad);
    }
    isSwitchingDateTournTab = false;
}

function renderTableAfterDropdownSelect(firstLoad) {
    if (!firstLoad && !enableAutoRefresh)
        return;
    try {
        if (firstLoad) {
            //resetClickedCheckBox();
            if (tMatchID == "")
                $('.nopool').hide();
            $('#divLoading').show();
        }

        if (noOfFail <= 2) {
            $.ajax({
                url: "/football/getJSON.aspx" + getJSONQueryString(),
                type: "get",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    try {
                        //data = JSON.parse(data);
                        dataCache = data;
                        renderMatchTable(data, firstLoad);
                        displayRemarks();
                        pageReady = true;
                    } catch (ex) {
                        renderEmptyPage(firstLoad);
                        debugLog(ex);
                    }
                    $('#divLoading').hide();
                },
                error: function () {
                    noOfFail++;
                }
            });
        } else { renderEmptyPage(firstLoad); }
    } catch (ex) { renderEmptyPage(firstLoad); }
}

function renderSPCTable(data, firstLoad) {
    let displayNoPoolMsg = false;
    let tournamentData, spcAvailable, singleMatch;
    tournamentData = data.tournaments;
    spcAvailable = data.matches.length > 0;


    if (spcAvailable) {
        // render active SPC item first
        let activeSPCTable = [];

        let hasSelectedDate = false;
        let istMatchIDExist = false;
        let datelist = [];

        if (curTabType == tabType.Date) {

            if (selectedTabDateArra.length == 0 && mdate.length > 0)
                selectedTabDateArra.push(mdate);
            else if (selectedTabDateArra.length > 0 && mdate.length > 0 && $.inArray(mdate, selectedTabDateArra) > -1) {
                selectedTabDateArra = []
                selectedTabDateArra.push(mdate)
            }
            if (tMatchID != "") {
                data.matches.forEach(function (_singleCoupon, couponIndex) {
                    let tmpDt = getFormattedDateStr(_singleCoupon.matchDate);
                    if (_singleCoupon.matchID == tMatchID && tmpDt != mdate) {
                        selectedTabDateArra = []
                        selectedTabDateArra.push(tmpDt);
                        pushHistoryAfterTabChange(selectedTabDateArra[0], false);
                    }
                });
            }

            data.matches.forEach(function (_singleCoupon, couponIndex) {
                datelist.push(getFormattedDateStr(_singleCoupon.matchDate));
                selectedTabDateArra.forEach(function (tabDateItem) {
                    let selectedTabDate = tabDateItem;
                    let matchDateYYYYMMDD = _singleCoupon.matchDate.split("T")[0];
                    if (matchDateYYYYMMDD == selectedTabDate) {
                        hasSelectedDate = true;
                    }
                    if (_singleCoupon.matchID == tMatchID) {
                        istMatchIDExist = true;
                    }
                });
            });

            if (!hasSelectedDate || (!istMatchIDExist && tMatchID != "")) {
                selectedTabDateArra = [];
                tMatchID = '';
                initTabDate();
                let availableDate = getDateTabList(datelist)[0];
                selectedTabDateArra.push(availableDate);
                pushHistoryAfterTabChange(selectedTabDateArra[0], false);
            }

        }

        let isDorpList = false;
        let selectedMatch = null;
        // gen match table
        if (data!=null && data.matches != null) {
            if (curTabType == tabType.Date) {
                selectedTabDateArra.forEach(function (tabDateItem) {
                    let selectedTabDate = tabDateItem;
                    data.matches.forEach(function (_singleMatch, sid) {
                        let matchDateYYYYMMDD = _singleMatch.matchDate.split("T")[0];
                        if (selectedTabDate == matchDateYYYYMMDD) {
                            if (tMatchID == "" && !isDorpList) {
                                singleMatch = new Match(_singleMatch, false);
                                let _matchTable = <SPCContainer singleObj={_singleMatch} key={`dSPC${_singleMatch.matchID}`} objType="match" tableType={data.name} refStr="" objID={`${_singleMatch.matchID}`} />;
                                activeSPCTable.push(_matchTable);
                                selectedMatch = _singleMatch;
                                setMatchId(_singleMatch.matchID);
                                isDorpList = true;
                            } else if (_singleMatch.matchID == tMatchID) {
                                singleMatch = new Match(_singleMatch, false);
                                let _matchTable = <SPCContainer singleObj={_singleMatch} key={`dSPC${_singleMatch.matchID}`} objType="match" tableType={data.name} refStr="" objID={`${_singleMatch.matchID}`} />;
                                activeSPCTable.push(_matchTable);
                                selectedMatch = _singleMatch;
                            }
                        }
                    });
                });
            } else if (curTabType == tabType.Competition) {
                // R0a
                var tmpSessionSelectedTournsId = JSON.parse(sessionStorage.getItem("__extendShareSelectedTournsId"));

                if (tmpSessionSelectedTournsId == null)
                    tmpSessionSelectedTournsId = [];

                let hasSelectedTourn = false;
                tournamentData.forEach(function (singleTournament, tounaIndex) {
                    if (jQuery.inArray(singleTournament.tournamentID, selectedTournamentIds) !== -1) {
                        hasSelectedTourn = true;
                    } else if (jQuery.inArray(singleTournament.tournamentID, tmpSessionSelectedTournsId) !== -1) {
                        hasSelectedTourn = true;
                    }
                });
                if (!hasSelectedTourn) {
                    selectedTournamentIds = [];
                    selectedTournamentIds.push(tournamentData[0].tournamentID);
                }

                tmpSessionSelectedTournsId.forEach(function (id, xidx) {
                    if (jQuery.inArray(id, selectedTournamentIds) === -1) {
                        selectedTournamentIds.push(id);
                    }
                });

                let selectedTournaMatches = [];

                selectedTournamentIds.forEach(function (value, index) {
                    tournamentData.forEach(function (singleTournament, tounaIndex) {
                        if (singleTournament.tournamentID == value) {
                            data.matches.forEach(function (singleCoupon, couponIndex) {
                                if (singleCoupon.tournament.tournamentID == value) {
                                    selectedTournaMatches.push(singleCoupon);
                                }
                            });
                        }
                    });
                });

                selectedTournaMatches.forEach(function (_singleMatch, sid) {
                    if (tMatchID == "" && !isDorpList) {
                        singleMatch = new Match(_singleMatch, false);
                        let _matchTable = <SPCContainer singleObj={_singleMatch} key={`dSPC${_singleMatch.matchID}`} objType="match" tableType={data.name} refStr="" objID={`${_singleMatch.matchID}`} />;
                        activeSPCTable.push(_matchTable);
                        selectedMatch = _singleMatch;
                        isDorpList = true;
                    } else if (_singleMatch.matchID == tMatchID) {
                        singleMatch = new Match(_singleMatch, false);
                        let _matchTable = <SPCContainer singleObj={_singleMatch} key={`dSPC${_singleMatch.matchID}`} objType="match" tableType={data.name} refStr="" objID={`${_singleMatch.matchID}`} />;
                        activeSPCTable.push(_matchTable);
                        selectedMatch = _singleMatch;
                    }
                });
            }

        }

        if (selectedMatch != null) {

            let spcItems = sortDataToItem(selectedMatch, false);

            if (spcItems.length > 0) {
                spcItems.forEach(function (_singleItem, _sind) {
                    if (_singleItem.length > 0) {
                        let _itemTable = <SPCItemContainer key={`dSPC${_singleItem[0].item.ITEM}`} singleItem={_singleItem} tableType={data.name} refStr={false} tournamentData={tournamentData} />;

                        activeSPCTable.push(_itemTable);
                    }
                })
            }
        }

        if (activeSPCTable.length > 0) {
            
            var coupsonList = data.matches;//removeRepeat(data.matches);
            ReactDOM.render(
                <div>
                    <SPCPageHeader tableType="Active" />
                    <OddsTableDateTournTab OddsTableTournaments={tournamentData} OddsTableMatches={coupsonList} />
                    <MatchSelectList OddsTableTournaments={tournamentData} OddsTableMatches={data.matches} SingleMatch={singleMatch} DataList={data} />
                    {activeSPCTable}
                    <AddBetBtn position="footer" />
                </div>,
                document.getElementById("dSPC"), () => {
                    oddsTableLoaded();
                }
            ); 
           
        }

    } else {
        displayNoMatch(true, true);
    }
}

function renderSGATable(data, firstLoad) {
    let displayNoPoolMsg = false;
    let tournamentData, sgaAvailable, singleMatch;
    tournamentData = data.tournaments;
    sgaAvailable = data.matches.length > 0;

    if (sgaAvailable) {
        // render active SGA item first
        let activeSGATable = [];

        let hasSelectedDate = false;
        let istMatchIDExist = false;
        let datelist = [];

        if (curTabType == tabType.Date) {
            if (selectedTabDateArra.length == 0 && mdate.length > 0)
                selectedTabDateArra.push(mdate);
            else if (selectedTabDateArra.length > 0 && mdate.length > 0 && $.inArray(mdate, selectedTabDateArra) > -1) {
                selectedTabDateArra = []
                selectedTabDateArra.push(mdate)
            }
            if (tMatchID != "") {
                data.matches.forEach(function (_singleCoupon, couponIndex) {
                    let tmpDt = getFormattedDateStr(_singleCoupon.matchDate);
                    if (_singleCoupon.matchID == tMatchID && tmpDt!=mdate) {
                        selectedTabDateArra = []
                        selectedTabDateArra.push(tmpDt);
                        pushHistoryAfterTabChange(selectedTabDateArra[0], false);
                    }
                });
            }

            data.matches.forEach(function (_singleCoupon, couponIndex) {
                datelist.push(getFormattedDateStr(_singleCoupon.matchDate));
                selectedTabDateArra.forEach(function (tabDateItem) {
                    let selectedTabDate = tabDateItem;
                    let matchDateYYYYMMDD = _singleCoupon.matchDate.split("T")[0];
                    if (matchDateYYYYMMDD == selectedTabDate) {
                        hasSelectedDate = true;
                    }
                    if (_singleCoupon.matchID == tMatchID) {
                        istMatchIDExist = true;
                    }
                });
            });

            if (!hasSelectedDate || (!istMatchIDExist && tMatchID != "")) {
                selectedTabDateArra = [];
                tMatchID = '';
                initTabDate();
                let availableDate = getDateTabList(datelist)[0];
                selectedTabDateArra.push(availableDate);
                pushHistoryAfterTabChange(selectedTabDateArra[0], false);
            }

        }

        let isDorpList = false;
        let selectedMatch = null;
        // gen match table
        if (data != null && data.matches != null) {
            if (curTabType == tabType.Date) {
                selectedTabDateArra.forEach(function (tabDateItem) {
                    let selectedTabDate = tabDateItem;
                    data.matches.forEach(function (_singleMatch, sid) {
                        let matchDateYYYYMMDD = _singleMatch.matchDate.split("T")[0];
                        if (selectedTabDate == matchDateYYYYMMDD) {
                            if (tMatchID == "" && !isDorpList) {
                                singleMatch = new Match(_singleMatch, false);
                                let _matchTable = <SGAContainer singleObj={_singleMatch} key={`dSGA${_singleMatch.matchID}`} tableType={data.name} objID={`${_singleMatch.matchID}`} />;
                                activeSGATable.push(_matchTable);
                                selectedMatch = _singleMatch;
                                setMatchId(_singleMatch.matchID);
                                isDorpList = true;
                            } else if (_singleMatch.matchID == tMatchID) {
                                singleMatch = new Match(_singleMatch, false);
                                let _matchTable = <SGAContainer singleObj={_singleMatch} key={`dSGA${_singleMatch.matchID}`} tableType={data.name} objID={`${_singleMatch.matchID}`} />;
                                activeSGATable.push(_matchTable);
                                selectedMatch = _singleMatch;
                            }
                        }
                    });
                });
            } else if (curTabType == tabType.Competition) {
                // R0a
                var tmpSessionSelectedTournsId = JSON.parse(sessionStorage.getItem("__extendShareSelectedTournsId"));

                if (tmpSessionSelectedTournsId == null)
                    tmpSessionSelectedTournsId = [];

                let hasSelectedTourn = false;
                tournamentData.forEach(function (singleTournament, tounaIndex) {
                    if (jQuery.inArray(singleTournament.tournamentID, selectedTournamentIds) !== -1) {
                        hasSelectedTourn = true;
                    } else if (jQuery.inArray(singleTournament.tournamentID, tmpSessionSelectedTournsId) !== -1) {
                        hasSelectedTourn = true;
                    }
                });
                if (!hasSelectedTourn) {
                    selectedTournamentIds = [];
                    selectedTournamentIds.push(tournamentData[0].tournamentID);
                }

                tmpSessionSelectedTournsId.forEach(function (id, xidx) {
                    if (jQuery.inArray(id, selectedTournamentIds) === -1) {
                        selectedTournamentIds.push(id);
                    }
                });

                let selectedTournaMatches = [];

                selectedTournamentIds.forEach(function (value, index) {
                    tournamentData.forEach(function (singleTournament, tounaIndex) {
                        if (singleTournament.tournamentID == value) {
                            data.matches.forEach(function (singleCoupon, couponIndex) {
                                if (singleCoupon.tournament.tournamentID == value) {
                                    selectedTournaMatches.push(singleCoupon);
                                }
                            });
                        }
                    });
                });

                selectedTournaMatches.forEach(function (_singleMatch, sid) {
                    if (tMatchID == "" && !isDorpList) {
                        singleMatch = new Match(_singleMatch, false);
                        let _matchTable = <SGAContainer singleObj={_singleMatch} key={`dSGA${_singleMatch.matchID}`} tableType={data.name} objID={`${_singleMatch.matchID}`} />;
                        activeSGATable.push(_matchTable);
                        selectedMatch = _singleMatch;
                        isDorpList = true;
                    } else if (_singleMatch.matchID == tMatchID) {
                        singleMatch = new Match(_singleMatch, false);
                        let _matchTable = <SGAContainer singleObj={_singleMatch} key={`dSGA${_singleMatch.matchID}`} tableType={data.name} objID={`${_singleMatch.matchID}`} />;
                        activeSGATable.push(_matchTable);
                        selectedMatch = _singleMatch;
                    }
                });
            }

        }

         if (activeSGATable.length > 0) {

            var coupsonList = data.matches;//removeRepeat(data.matches);
            ReactDOM.render(
                <div>
                    <SPCPageHeader tableType="Active" />
                    <div id="sgaRemarks" dangerouslySetInnerHTML={{ __html: jsSGARemarks }}></div>
                    <OddsTableDateTournTab OddsTableTournaments={tournamentData} OddsTableMatches={coupsonList} />
                    <MatchSelectList OddsTableTournaments={tournamentData} OddsTableMatches={data.matches} SingleMatch={singleMatch} DataList={data} />
                    {activeSGATable}
                    <AddBetBtn position="footer" />
                </div>,
                document.getElementById("dSGA"), () => {
                    oddsTableLoaded();
                }
            );
        }

    } else {
        displayNoMatch(true, true);
    }
}

function renderAllMatchAllTable(matchData, firstLoad) {

    let allMatchTable = [];

    allMatchID.forEach(function (_matchID, _mInd) {
        var tmpMatch = getAllUpMatch(matchData, _matchID);
        if (tmpMatch != null) {
            let singleMatch = new Match(tmpMatch, false);
            allMatchTable.push(renderMatchAllTable(singleMatch, firstLoad, "ActiveMatch"));
        }
    })

    let displayNoPoolMsg = allMatchTable.length == 0;

    let topCalculator = <AllUpDetailCalculator CalculatorID="ucCalTop" />;
    let bottomCalculator = <AllUpDetailCalculator CalculatorID="ucCalBottom" />;
    let topHeader = <OddsTableInfo tableType="Mix all up detail" oddsType={oddsType} />;

    ReactDOM.render(
        <div>
            {topHeader}
            <div className="oddsMixAllup">
                <div className="oMixSel">
                    <div className="tblMixSel">
                        <div>{jsSelectBetType}</div>
                        <div id="tblMixSelContent">
                            <div>
                                <div id="selcheckboxC0"></div>
                                <div id="selcheckboxC1"></div>
                                <div id="selcheckboxC2"></div>
                                <div id="selcheckboxC3"></div>
                                <div id="selcheckboxC4"></div>
                            </div>
                            <div>
                                <div id="selcheckboxC5"></div>
                                <div id="selcheckboxC6"></div>
                                <div id="selcheckboxC7"></div>
                                <div id="selcheckboxC8"></div>
                                <div id="selcheckboxC9"></div>
                            </div>
                            <div>
                                <div id="selcheckboxC10"></div>
                                <div id="selcheckboxC11"></div>
                                <div id="selcheckboxC12"></div>
                                <div id="selcheckboxC13"></div>
                                <div id="selcheckboxC14"></div>
                            </div>
                        </div>
                    </div>
                    <div className="tblMixSel">
                        <div>
                            <div colSpan="5">
                                <div id="divLoadMix"><img src="/football/info/images/loading.gif?CV=L204R1c" alt="" title="" onError={errImg(this)} /></div>
                            </div>
                        </div>
                    </div>
                    <div className="cCalContent">
                        {topCalculator}
                    </div>
                </div>
                
                <div className="mixHR"></div>
                <div className="oMixMatches" id="dMixMatches">
                    {allMatchTable}
                </div>

                <div className="oMixCal cCalContentBottom" id="dMixCalBottom">
                    {bottomCalculator}
                </div>
            </div>
        </div>,
        document.getElementById('mixAllUpContent'), () => {
            if (firstLoad) {
                getAllUpInfo();
            }
            calculateBet2(true);
        }
    );

    if (displayNoPoolMsg) {
        $('.mixAllUpContent').hide();
        $('.cActions').hide();
        $('.oddsSCMixAllup').hide();
        $('#NoPoolMsg').show();
        $('#NoPoolMsgContent').html(jsNoPoolMsg);
        displayNoMatch(true, true);
    }
    else {
        $('.mixAllUpContent').show();
        $('.cActions').show();
        $('.oddsSCMixAllup').show();
        $('#NoPoolMsg').hide();
    }

    return true;
}

function getAllUpMatch(matchData, matchId) {
    for (var idx in matchData) {
        if (matchData[idx].matchID == matchId)
            return matchData[idx];
    }
    return null;
}

class AllUpDetailCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unitBet: parseInt(getDefaultAmount("ALUPX"))
        };
    }
    onUpdateUnitBet(e) {
        if (chkAmount(e, 0)) {
            this.setState({ unitBet: parseInt(e.target.value) });
        }
        else if (e.target.value == '') {
            this.setState({ unitBet: '' });
        }
    }
    onBlurUnitBet(e) {
        if (!$.isNumeric(e.target.value) || parseInt(e.target.value) < 10) {
            alert(jsunitbeterror);
            $(".mcTxtUnitbet").val(getDefaultAmount("ALUPX"));
        }
        else {
            updateMcTxtUnitbet(e);
        }
        calculateBet2(true);
    }
    render() {
        return <div style={{ width: "634px", padding: "10px 0px 10px 5px" }}>
            <div style={{ float: "left", width: "80%" }}>
                <div className="divCalRow">
                    <div style={{ display: "table-cell", width: "100px" }}>{jsformula}</div>
                    <div style={{ display: "table-cell", width: "90px" }}>{jsunitbet} $</div>
                    <div className="divCalResultHeadCell" style={{ width: "60px" }}>{jsbet}</div>
                    <div className="divCalResultHeadCell" style={{ width: "92px" }}>{jstotalinvestment}</div>
                    <div className="divCalResultHeadCell" style={{ width: "80px" }}>{jsmaxDividend}</div>
                    <div className="divCalResultHeadCell" style={{ width: "93px" }}>{jsmaxNetReturn}</div>
                </div>
                <div className="divCalRow">
                    <div style={{ display: "table-cell" }}><select className="allup_calculator_select mcSelFormula" onChange={(e) => { updateMcSelFormula(e); calculateBet2(true); }}></select></div>
                    <div style={{ display: "table-cell" }}><input className="allup_calculator_input mcTxtUnitbet" value={this.state.unitBet} maxLength="6" onChange={(e) => { this.onUpdateUnitBet(e); }} onBlur={(e) => { this.onBlurUnitBet(e); }} /></div>
                    <div className="divCalResultCell mcBet">-</div>
                    <div className="divCalResultCell mcTotInv">-</div>
                    <div className="divCalResultCell mcDivid">-</div>
                    <div className="divCalResultCell mcNetRtn">-</div>
                </div>
            </div>
            <div style={{ float: "right", width: "20%", padding: "5px 0px 0px 0px" }}>
                <div className="addBet" onClick={() => { addslip(); }} title={jsaddSlip}></div>
            </div>
            <div style={{ clear: "both" }}></div>
        </div>
    }
}

function renderMatchAllTable(_singleMatch, firstLoad, _tableType, tournamentName) {
    let matchAllTables = [];
    let _matchID = _singleMatch.matchIDinofficial;
    let _matchPoolStatus;
    let _extraClass = "";
    mixInplayBetType = [];
    if (_tableType == "result") {
        _singleMatch.arrPools.forEach(function (_singlePool, _spInd) {
            matchAllTables.push(<SingleMatchSingleOddsTypeTable key={`${_matchID}${_singlePool}${_tableType}Holder`} _poolType={_singlePool} _tableType={_tableType} _matchID={_matchID} _singleMatch={_singleMatch} />);
        });
        _extraClass = "dContentResult";
    } else {
        _matchPoolStatus = _singleMatch.GetMatchPoolStatus(pageName);

        if (displayInplayStatement(_matchPoolStatus)) {
            matchAllTables.push(InplayMsg(_singleMatch));
        } else { 
            _singleMatch.arrPools.forEach(function (_singlePool, _spInd) {
                if (pageName =="INPLAYALL") {  
                    if (_singleMatch.matchStatus.toLowerCase() == "defined") {
                        let IsInplay = (_singlePool + "odds").toLowerCase();
                        if (_singleMatch[IsInplay].INPLAY == "true") {
                            matchAllTables.push(<SingleMatchSingleOddsTypeTable key={`${_matchID}${_singlePool}${_tableType}Holder`} _poolType={_singlePool} _tableType={_tableType} _matchID={_matchID} _singleMatch={_singleMatch} />);               
                        }
                  
                    } else if (_singleMatch.matchStatus.toLowerCase() != "defined") {
                            let IsInplay = (_singlePool + "odds").toLowerCase(); 
                            if (_singleMatch[IsInplay].INPLAY == "true") {
                                matchAllTables.push(<SingleMatchSingleOddsTypeTable key={`${_matchID}${_singlePool}${_tableType}Holder`} _poolType={_singlePool} _tableType={_tableType} _matchID={_matchID} _singleMatch={_singleMatch} />);
                            }
                    }
                } else {
                    let IsInplay = (_singlePool + "odds").toLowerCase();
                    if (_singleMatch[IsInplay].INPLAY == "true" && pageName == "MIXALLUP") {
                        if (!$.inArray(_singlePool, mixInplayBetType)) {
                            mixInplayBetType.push(_singlePool);
                        }
                    }
                    matchAllTables.push(<SingleMatchSingleOddsTypeTable key={`${_matchID}${_singlePool}${_tableType}Holder`} _poolType={_singlePool} _tableType={_tableType} _matchID={_matchID} _singleMatch={_singleMatch} tournamentName={tournamentName} />);
                }
            });
           
        }
    }
    let displayHeader = !(pageName == "INPLAYALL" || pageName == "ALL" || pageName == "CRS" || pageName == "FCS" || pageName == "FGS");

    return <div key={`all${_matchID}`} className={`dMixSingleMatch ${_extraClass}`} id={`dMix_${_singleMatch.matchIDinofficial}`}>
        {(displayHeader) ? renderMatchAllTableHeader(_singleMatch, firstLoad, _tableType, _matchID, _matchPoolStatus) : null}
        <div id={`dMixContent_${_matchID}`}>
            {matchAllTables}
        </div>
        {pageName == "MIXALLUP" || pageName == "RESULT" ? <div className="mixHR"></div> : null}
    </div>;
}

function renderMatchAllTableHeader(_singleMatch, firstLoad, _tableType, _matchID, _matchPoolStatus) {
    let tournShortName = _singleMatch.tournament.tournamentShortName;
    let tournName = _singleMatch.tournament['tournamentName' + curLang.toUpperCase()];

    let matchId = "";
    if (_singleMatch.isBAUResult) {
        matchId = jsmatchno + ": " + _singleMatch.matchDay + " " + _singleMatch.matchNum;
    }
    else {
        matchId = _singleMatch.frontEndId;
    }

    return <div className="dMixHeader" id={`dMixHeader_${_matchID}`} onClick={() => { pageName == "MIXALLUPSHORTCUT" ? tgCoupon5(`dMixHeader_${_matchID}`, `dMixContent_${_matchID}`) : null }}>

        <div className="tableCell tdMixAllupHeaderTableLeftCell">
            {/*jsesst1}{jsesst2}: {formatEsst(_singleMatch, false, "HAD")*/}
            {_tableType == "result" ?
                null : formatEsst(_singleMatch, false, "HAD")}
            <span className="space"></span> {matchId}
            <span className="space"></span>
            <span>{formatImageStr([League.GetFlagPath(tournShortName), tournName, tournShortName])}</span>
            <span className="space"></span><span className="space"></span>
            {sTeamString(false, false, _singleMatch, true, true, "ALL")}
            <span className="space"></span>
            <span className="cvenue">{_singleMatch.venue == null ? "" : formatNeutralGroundIcon(_singleMatch.venue, "ng")}</span>
            {_tableType == "result" ? null : <span className="space"></span>}
            {_tableType == "result" ? null : formatInplayIco(_singleMatch, "ico", pageName)}
            {_tableType == "result" ? null : <span className="space"></span>}
            {_tableType == "result" ? null : <span>{formatJumpHeadStr(_singleMatch)}</span>}
        </div>
    </div>
}

class SingleMatchSingleOddsTypeTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hideLSE: true };
        this.onEliminateBtnClicked = this.onEliminateBtnClicked.bind(this);
    }
    onEliminateBtnClicked(event) {
        this.setState({ hideLSE: !this.state.hideLSE });
    }
    renderTournInfo(singleMatch, betType) {

        let sTourn = singleMatch[betType.toLowerCase() + "odds"];

        let expectedStopSellingTime = sTourn.ExpectedStopTime != "" ? formatEsstStr(sTourn.ExpectedStopTime, true) : null;

        let tournamentName = singleMatch.tournament['tournamentName' + curLang.toUpperCase()];

        let tournFrontendId = singleMatch.tournament.frontEndId

        let tournInfo = <div className="tournInfo">
            <p>{tournFrontendId} {tournamentName}</p>
            <p>{jsesst_nobr}: {expectedStopSellingTime}</p>
        </div>


        return tournInfo;
    }
    render() {
        try {
            let _poolType = this.props._poolType;
            let _tableType = this.props._tableType;
            let _matchID = this.props._matchID;
            let _singleMatch = this.props._singleMatch;
            let eliminateBtn = null;
            let tournamentName = this.props.tournamentName;

            let _ref = "";
            if (_tableType.indexOf("Presales") != -1) {
                _ref = "Ref";
            }
            if (_poolType.indexOf("ref") != -1) {
                _ref = "Ref";
                _poolType = "SPC"; // only SPC can have both active and presales odds
                _tableType = "PresalesMatches";
            }

            let innerContent;
            if (_poolType == "CHP") {
                let tournamentID = _singleMatch["chpodds"].tournamentID;
                let hideLSE = this.state.hideLSE;

                eliminateBtn = <EliminateBtn hideLSE={hideLSE} _oddsType={_poolType} objID={_matchID} onClick={this.onEliminateBtnClicked} />

                innerContent = <div id={`dCHPTable${_matchID}`} key={`dCHPTable${_matchID}`} className={`betTypeAllOdds`}>
                    {this.renderTournInfo(_singleMatch, _poolType)}
                    <OddsSelectionTourn hideLSE={hideLSE} singleTourn={_singleMatch} tableType={_tableType} key={`${tournamentID}CHP`} oddsType={`CHP`} refOdds={``} />
                </div>;
            }
            else if (_poolType == "TQL" && pageName!="RESULT" ) {
                var _id = `d${_poolType}Table${_ref}${_matchID}`;
                innerContent = <div id={_id} key={_id} className="betTypeAllOdds">
                    {this.renderTournInfo(_singleMatch, _poolType)}
                    <OddsSelectionHeader singleMatch={_singleMatch} poolType={_poolType} specClass="rBottomBorder" />
                    <MultiPoolPageOddsSelection singleMatch={_singleMatch} tableType={_tableType} key={`${_matchID}_${_poolType}`} oddsType={_poolType} _ref={_ref} />
                </div>;
            } else {
                var _id = `d${_poolType}Table${_ref}${_matchID}`;

                innerContent = <div id={_id} key={_id} className="betTypeAllOdds">
                    <OddsSelectionHeader singleMatch={_singleMatch} poolType={_poolType} specClass="rBottomBorder" />
                    <MultiPoolPageOddsSelection singleMatch={_singleMatch} tableType={_tableType} key={`${_matchID}_${_poolType}`} oddsType={_poolType} _ref={_ref} />
                </div>;
            }
            let specClassName = "";
            let displayValue = "block";
            if (pageName == "MIXALLUP") {
                specClassName = `mixOdds${_poolType}`;
                if ($.cookie("chkMixallup") == null || $.cookie("chkMixallup").indexOf(_poolType) == -1)
                    displayValue = "none";
            }

            let tqlCode = "";
            let tqlStage = "";
            let expectedStopSellingTime = null;
            if (pageName.match(/^(ALL|INPLAYALL)$/) && _poolType == "TQL") {
                let tqlObj = _singleMatch["tqlodds"];
                if (tqlObj != null) {
                    tqlCode = tqlObj.CODE;
                    tqlStage = tqlObj['STAGE'+curLang.toUpperCase()];
                    //expectedStopSellingTime = <div className={`right`} style={{ paddingRight: "5px" }}>
                    //    {tqlObj.ExpectedStopTime != null && tqlObj.ExpectedStopTime != "" ? formatEsstStr(tqlObj.ExpectedStopTime, true) : null} {tournamentName}</div>;
                }
            }

            return <div key={`d_${_matchID}_${_poolType}${_ref}`} style={{ display: displayValue }} className={specClassName}>
                <OddsTypeOuterTable _oddsType={_poolType} tableType={_tableType} objID={_matchID} innerContent={innerContent} eliminateBtn={eliminateBtn} expectedStopSellingTime={expectedStopSellingTime} code={tqlCode} stage={tqlStage} />
            </div>;
        } catch (ex) {
            debugLog("SingleMatchSingleOddsTypeTable: " + ex);
        }
    }
}

function renderFocusMatch(data, firstLoad) {
    try {
        var foundMatch = $.grep(data.matches, function (_as) { return _as.matchID == tMatchID; })[0];
        if (foundMatch == null) {
            $('#focusMatchNoInfo').show();
        }
        else {
            let _item = new Match(foundMatch);
            let _matchID = _item.matchIDinofficial;
            let singleOddsSet = _item.hadodds;
            let poolStatus = singleOddsSet.POOLSTATUS;
            let poolId = singleOddsSet.POOLID;
            let lineId = singleOddsSet.LINEID;
            let isAllup = singleOddsSet.ALLUP;
            let _oddsCell;
            let displayAddBet = false;
            let displayInplayLnk = false;

            if (_item.IsMatchKickOff()) {
                _oddsCell = null;
                if (singleOddsSet.INPLAY != "true") {
                    $('#focusMatchStoppedSell').show();
                } else {
                    displayInplayLnk = true;
                }
            } else {
                let tmpCells = [];
                allCheckBoxType.forEach(function (_cbType) {
                    tmpCells.push(<OddsCell key={`${_matchID}HAD${_cbType}_0OC`} rkey={`${_matchID}HAD${_cbType}_0OC`} _oddsType="HAD" _matchID={_matchID} oddsSet={singleOddsSet} checkboxType={`${_cbType}`} lineNum={`0`} _tableType={`ActiveMatches`} poolStatus={poolStatus} isAllup={isAllup} poolId={poolId} lineId={lineId} isFocusMatch={true} />);
                });
                _oddsCell = <div className="table">
                    {tmpCells}
                </div>;
                if (!isSelling(poolStatus, "100", "1")) {
                    $('#focusMatchNotStartedSell').show();
                } else {
                    displayAddBet = true;
                }
            }
            ReactDOM.render(
                <div>
                    <div className="table">
                        <div className="cday">
                            <span>{_item.frontEndId}</span>
                            <span>{formatImageStr([League.GetFlagPath(_item.tournament.tournamentShortName), _item.tournament['tournamentName' + curLang.toUpperCase()], _item.tournament.tournamentShortName])}</span>
                        </div>
                        <div className="cteams">
                            <span>{oddsAllJump(_item.matchID, sTeamString(true, false, _item, true, false), displayInplayLnk)}</span>
                        </div>
                    </div>
                    {_oddsCell}
                    {displayAddBet ? <AddBetBtn /> : null}
                    {displayInplayLnk ?
                        <div className="table">
                            <div className="inplayLink">
                                {formatInplayIco(_item, "focusmatch", "HAD")}
                            </div>
                        </div>
                        :
                        null}
                </div>,
                document.getElementById('focusMatchContent')
            );
        }

    } catch (ex) { debugLog(ex); }
    return false;
}

function renderMatchTable(data, firstLoad) {

    let keepRefresh = false;
    try {
        if (matchDataList == null || matchDataList.length == 0) {
            //handler either not an array or empty array

            displayNoMatch(true, true);
        }
        if (pageName == "DHCP") {
            // Parimutuel pools
            keepRefresh = renderParimutuelPage(data, pageName, firstLoad);
            if (firstLoad) {
                matchDay = [];
                matchNum = [];
                let hTeam = [];
                let aTeam = [];
                for (var key in betValue) {
                    matchDay[matchDay.length] = betValue[key].matchDay;
                    matchNum[matchNum.length] = betValue[key].matchNum;
                    hTeam[hTeam.length] = betValue[key].homeTeam["teamName" + jsLang];
                    aTeam[aTeam.length] = betValue[key].awayTeam["teamName" + jsLang];

                    if (isQRPortal) {
                        let _otherLang = "EN";
                        if (jsLang == "EN") {
                            _otherLang = "CH";
                        }
                        hTeamOtherLang[hTeamOtherLang.length] = betValue[key].homeTeam["teamName" + _otherLang];
                        aTeamOtherLang[aTeamOtherLang.length] = betValue[key].awayTeam["teamName" + _otherLang];
                    }
                }
            }
        } else if (isDisplayMatchDDLPage()) {
            keepRefresh = renderMatchTableSingleMatch(data, firstLoad);
        } else {
            keepRefresh  = renderMatchTableMultipleMatch(data, firstLoad);
        }
    } catch (e) {
        displayNoMatch(true, true);
    }
    
    return keepRefresh;
}

function renderMatchTableSingleMatch(data, firstLoad) {
    let keepRefresh = false;
    //var _matchList = [];
    couponCount = 0;
    if (data == null || data.length == 0) {
        totalMatch = 0;
    } else {
        totalMatch = data.matches.length;
    }
    var Msg = false;
    var allCouponArr = [];

    if (totalMatch > 0) {
        allCouponArr = [putMatchesToCoupon(data.matches, [], false)];
        if (curTabType == tabType.Feature) {
            curTabType = tabType.Date;
        }

        let displayNoPoolMsg = displayContentWithDDL(allCouponArr, data, firstLoad);

        if (displayNoPoolMsg) {
            displayNoMatch(true, true);
            $('#dContainer').hide();
        } else {
            $('#dContainer').show();
            $('#NoPoolMsg').hide();
            $('#todds .OddsDetails').show();
            // update display update time
            initRefreshTime();
            keepRefresh = true;
        }
    } else {
        displayNoMatch(true, true);
        $('#dContainer').hide();
    }
    return keepRefresh;
}

var resultsSearchPara = '';
var isOnLastOddsPage = false;
function renderResults() {
    try {
        isOnLastOddsPage = false;
        let data = dataCache;
        var tmpMatchId = GetDataStore("__extendresdtls");
        if (tmpMatchId != null && tmpMatchId != "")
            rMatchID = tmpMatchId;

        if (rMatchID != "") {
            renderResultDetails(rMatchID);
            return false;
        }

        if (getMatchLength(data[0]) > 0) {
            // render coupons
            let _sortedMatchList = putUniqueMatchesToCoupon(data[0].matches, null, false);
            // put all coupons to same array
            _sortedMatchList = [].concat.apply([], _sortedMatchList);
            let matchRows = [];
            _sortedMatchList.forEach(function (singleMatch, _mind) {
                let altRow = _mind;
                matchRows.push(<MatchRow_MatchInResults tournaments={data[0].tournaments} altRow={altRow % 2} match={singleMatch} key={singleMatch.matchIDinofficial} />);
            });
            ReactDOM.render(
                <div className={`table`}>
                    {matchRows}
                </div>,
                document.getElementById('resMatchIn')
            );
            $('.trMatchIn').show();
        } else {
            $('.trMatchIn').hide();
        }
        if (getMatchLength(data[1]) > 0) {
            // render coupons
            let _sortedMatchList = putUniqueMatchesToCoupon(data[1].matches, null, false);

            //_sortedMatchList = _sortedMatchList.reverse();
            let _coupons = [];
            _sortedMatchList.forEach(function (_coupon, _cid) {
                _coupons.push(<ResultsCoupon coupon={_coupon} tournaments={data[1].tournaments} key={`d${curPage}_${_cid}`} tableType="result" />)
            });

            ReactDOM.render(
                <div className={`table`}>
                    {_coupons}
                </div>,
                document.getElementById('resMatch')
            );

            $('.lblFullTime').show();
            // display extra time label
            if ($('.lblExtraTime').length > 1) {
                $('.lblExtraTime').show();
            } else {
                $('.lblExtraTime').hide();
            }

            $('.noinfo').hide();
            $('.trMatch').show();
        } else {
            if (getMatchLength(data[0]) > 0) {
                $('#trHeaderMatch').hide();
            }
        }
        if (getMatchLength(data[0]) == 0 && getMatchLength(data[1]) == 0)
            drawEmptyResult();
        return false;
    } catch (ex) {
        debugLog("renderResults:" + ex);
    }
}

function drawSearchResults() {
    $('#trHeaderMatch').show();
    $('.trMatchIn').hide();
    $('#divLoading').hide();

    var tmpMatchId = GetDataStore("__extendresdtls");
    if (tmpMatchId != null && tmpMatchId != "")
        rMatchID = tmpMatchId;

    if (rMatchID != "") {
        renderResultDetails(rMatchID);
        return false;
    }

    totalMatch = parseInt(dataCache[0].matchescount, 10);
    //displaySearchLabel();

    if (totalMatch > 0) {
        startMatch = (curPage - 1) * maxMatch + 1;
        endMatch = startMatch + maxMatch - 1;
        endMatch = (endMatch > totalMatch ? totalMatch : endMatch);

        let matchRows = [];
        let hasExtraTimeMatch = false;
        for (let i = 0; i < dataCache[0].matches.length; i++) {
            let singleMatch = dataCache[0].matches[i];
            matchRows.push(<MatchRow_ResultRow altRow={i % 2} match={singleMatch} key={singleMatch.matchIDinofficial} tableType="result" couponID="" />);
            if (!hasExtraTimeMatch && singleMatch.GetExtraTimeScore() != null) {
                hasExtraTimeMatch = true;
            }
        }

        ReactDOM.render(
            <div className={`table`}>
                {matchRows}
            </div>,
            document.getElementById('resMatch')
        );
        couponCount = 0;
        ReactDOM.render(
            <PageInfo type="header" />,
            document.getElementById('searchTableHeader')
        );
        ReactDOM.render(
            <PageInfo type="footer" />,
            document.getElementById('searchTableFooter')
        );

        $('.pagination').show();

        // display extra time label
        if (hasExtraTimeMatch) {
            $('.lblFullTime').hide();
            $('.lblExtraTime').show();
        } else {
            $('.lblExtraTime').hide();
            $('.lblFullTime').show();
        }

        $('.noinfo').hide();
        $('.trMatch').show();
    } else {
        drawEmptyResult();
    }
    return false;
}

function renderResultDetails(_rMatchID) {
    try {
        rMatchID = _rMatchID;

        // find match from dataCache
        let _resultDetails;
        let _tournament;
        if (dataCache.length > 1) {
            _resultDetails = $.grep(dataCache[1].matches, function (_match) { return _match.matchID == _rMatchID; })[0];
            _tournament= $.grep(dataCache[1].tournaments, function (_tourn) { return _tourn.tournamentID == _resultDetails.tournament.tournamentID; })[0];
        } else {
            _resultDetails = $.grep(dataCache[0].matches, function (_match) { return _match.matchID == _rMatchID; })[0];
            _tournament= $.grep(dataCache[0].tournaments, function (_tourn) { return _tourn.tournamentID == _resultDetails.tournament.tournamentID; })[0];
        }
        let _normalPools = ["HAD", "FHA", "CRS", "FCS", "HFT", "TTG", "OOE", "FGS", "TQL"];
        let _1stHalfPools = ["FHA", "FCS", "FGS"];
        let _ntsPools = ["NTS", "ETS"];
        let _normalFtsPools = ["FTS"];
        let _extraTimePools = ["EHA", "ECS", "ETG"];
        let _entPools = ["ENT"];

        let normalTable = [];
        let ftsTable = [];
        let ntsTable = [];
        let spcTable = [];
        let sgaTable = [];
        let extraTimeTable = [];
        let entTable = [];

        // change title for half time result
        let strHalfTimeDiv = "FCS,FHA,FGS,FTS"; // "fcs,fts,fgs,fha";
        if (_resultDetails.isEndOfHalfTimeWithDiv(strHalfTimeDiv)) {
            $('.matchResultDetail').html(jsdetailsResult_half);
            _normalPools = _1stHalfPools;
        } else {
            $('.matchResultDetail').html(jsdetailsResult);
        }

        let scoreTable = [];
        let scoreAbandonedTable = [];
        let extraTimeScoreTable = [];
        let extraTimeScoreAbandonedTable = [];

        let firstHalfScore = '-';
        let secondHalfScore = '-';
        let abandonedScore = '-';
        let extraTimeScore = '-';
        let extraTimeAbandonedScore = '-';
        let normalCorner = "";
        let abandonedNormalCorner = "";
        let extraTimeCorner = "";
        let abandonedExtraTimeCorner = "";
        let is1stHalfFinal = false;
        let is2ndHalfFinal = false;
        let isExtraFinal = false;        
        let isVoid = _resultDetails.isVoidMatch();
        
        // score result
        if (_resultDetails.accumulatedscore != null) {
            let firstHalfResult = $.grep(_resultDetails.accumulatedscore, function (_as) { return _as.periodvalue == "FirstHalf"; })[0];
            let secondHalfResult = $.grep(_resultDetails.accumulatedscore, function (_as) { return _as.periodvalue == "SecondHalf"; })[0];
            let extraTimeResult = $.grep(_resultDetails.accumulatedscore, function (_as) { return _as.periodvalue == "ExtraTime"; })[0];
            is1stHalfFinal = firstHalfResult != null && firstHalfResult.periodstatus == "ResultFinal";
            is2ndHalfFinal = secondHalfResult != null && secondHalfResult.periodstatus == "ResultFinal";
            isExtraFinal = extraTimeResult != null && extraTimeResult.periodstatus == "ResultFinal";
            if (is1stHalfFinal) {
                firstHalfScore = firstHalfResult.home + " : " + firstHalfResult.away;
            }
            if (is2ndHalfFinal) {
                secondHalfScore = secondHalfResult.home + " : " + secondHalfResult.away;
            }
            if (isExtraFinal) {
                extraTimeScore = extraTimeResult.home + " : " + extraTimeResult.away;
            }
            if (_resultDetails.cornerresult == 'RFD') {
                normalCorner = _resultDetails.abandonedcornerresultfinal != "1" ? jsRFD : '-';
            }
            else if (_resultDetails.cornerresultfinal == "1" && _resultDetails.cornerresult != null && _resultDetails.cornerresult!='') {
                normalCorner = _resultDetails.cornerresult;
            }
            if (_resultDetails.etcornerresult == 'RFD') {
                extraTimeCorner = _resultDetails.abandonedcornerresultfinal != "1" ? jsRFD : '-';
            }
            else if (_resultDetails.etcornerresultfinal == "1" && _resultDetails.etcornerresult != null && _resultDetails.etcornerresult != '') {
                extraTimeCorner = _resultDetails.etcornerresult;
            }
        }

        let isETVoid = isVoid && is1stHalfFinal && is2ndHalfFinal;
        if (isVoid) {
            if (isETVoid) {
                if (_resultDetails.abandonedscore != null) {
                    extraTimeAbandonedScore = _resultDetails.abandonedscore.home + " : " + _resultDetails.abandonedscore.away;
                }
                if (_resultDetails.abandonedcornerresult != null && _resultDetails.abandonedcornerresultfinal == "1") {
                    abandonedExtraTimeCorner = _resultDetails.abandonedcornerresult;
                }
            }
            else {
                if (_resultDetails.abandonedscore != null) {
                    abandonedScore = _resultDetails.abandonedscore.home + " : " + _resultDetails.abandonedscore.away;
                }
                if (_resultDetails.abandonedcornerresult != null && _resultDetails.abandonedcornerresultfinal == "1") {
                    abandonedNormalCorner = _resultDetails.abandonedcornerresult;
                }
            }
        }

        scoreTable = <div className="table border-bottom2">
            <div key="normalResultTitleRow" className="tableRow">
                <div className="tableCell font-bold">{jsresults}</div>
            </div>
            <div className="tableCell border-top2">
                <div className="table">
                    <div className="tableRow tableContent2">
                        <div className="tableCell">{jshalfTimeScoreResult}</div>
                        <div className="tableCell">{firstHalfScore}</div>
                    </div>
                </div>
            </div>
            <div className="tableCell border-top2">
                <div className="table">
                    <div className="tableRow tableContent2">
                        <div className="tableCell">{jsfullTimeScoreResult}</div>
                        <div className="tableCell">{secondHalfScore}</div>
                    </div>
                </div>
            </div>
            {
                normalCorner != '' ?
                <div className="tableRow">
                    <div className="tableCell">
                        <div className="table">
                            <div className="tableRow">
                                <div className="tableCell">{jsTotalCorners}</div>
                                <div className="tableCell">{normalCorner == 'RFD' ? jsRFD : normalCorner}</div>
                            </div>
                        </div>
                    </div>
                </div> : null
            }
        </div>;

        if (abandonedScore != '-' || abandonedNormalCorner != '') {
            scoreAbandonedTable = <div className="table border-bottom2" >
                <div key="normalResultTitleRow" className="tableRow">
                    <div className="tableCell font-bold">{jsabandonedScoreResult}</div>
                </div>
                <div className="tableCell border-top2">
                    <div className="table">
                        <div className="tableRow tableContent2">
                            <div className="tableCell">{jsscoreResult}</div>
                            <div className="tableCell">{abandonedScore}</div>
                        </div>
                    </div>
                </div>
                {abandonedNormalCorner != '' ?
                    <div className="tableRow">
                        <div className="tableCell">
                            <div className="table">
                                <div className="tableRow">
                                    <div className="tableCell">{jsCornerResult}</div>
                                    <div className="tableCell">{abandonedNormalCorner == 'RFD' ? jsRFD : abandonedNormalCorner}</div>
                                </div>
                            </div>
                        </div>
                        <div className="tableCell"></div>
                    </div> : null}
            </div>;
        }

        if (extraTimeScore != '-' || extraTimeCorner != '' || extraTimeAbandonedScore != '-') {
            extraTimeScoreTable = <div className={`table border-bottom2`}>
                <div key={`normalResultTitleRow`} className={`tableRow`}>
                    <div className={`tableCell font-bold`}>{jsextraTimeResult}</div>
                </div>
                <div className={`tableCell border-top2`}>
                    <div className={`table`}>
                        <div className={`tableRow tableContent2`}>
                            <div className="tableCell">{jsextraTimeScoreResult}</div>
                            <div className="tableCell">{extraTimeScore}</div>
                        </div>
                    </div>
                </div>
                    <div className={`tableCell border-top2`}></div>
                    <div className={`tableRow`}>
                        <div className="tableCell">
                        <div className={`table`}>
                            {extraTimeCorner != '' ?
                                <div className={`tableRow`}>
                                    <div className="tableCell">{jsTotalCorners}</div>
                                    <div className="tableCell">{extraTimeCorner}</div>
                                </div> : null}
                            </div>
                        </div>
                    </div> 
            </div>;
        }

        if (extraTimeAbandonedScore != '-' || abandonedExtraTimeCorner != '') {
            extraTimeScoreAbandonedTable = <div className="table border-bottom2" >
                <div key="normalResultTitleRow" className="tableRow">
                    <div className="tableCell font-bold">{jsabandonedScoreResultET}</div>
                </div>
                <div className="tableCell border-top2">
                    <div className="table">
                        <div className="tableRow tableContent2">
                            <div className="tableCell">{jsscoreResult}</div>
                            <div className="tableCell">{extraTimeAbandonedScore}</div>
                        </div>
                    </div>
                </div>
                {abandonedExtraTimeCorner != '' ?
                    <div className="tableRow">
                        <div className="tableCell">
                            <div className="table">
                                <div className="tableRow">
                                    <div className="tableCell">{jsCornerResult}</div>
                                    <div className="tableCell">{abandonedExtraTimeCorner}</div>
                                </div>
                            </div>
                        </div>
                    </div> : null}
                <div className="tableCell border-top2"></div>
            </div>;
        }
        
        // draw normal pools
        for (let i = 0; i < _normalPools.length; i++) {
            if (_resultDetails.HasPoolResults(_normalPools[i])) {
                let displayPoolName;
                if (_normalPools[i] == "HAD") {
                    displayPoolName = jsnts_HAD;
                } else if (_normalPools[i] == "FHA") {
                    displayPoolName = jsnts_FHAD;
                } else {
                    displayPoolName = GetGlobalResources(_normalPools[i]);
                }
                normalTable.push(<div key={`${_normalPools[i]}ResultRow`} className={`tableRow tableContent${(normalTable.length + 1) % 2 + 1}`}>
                    <div className="tableCell">{displayPoolName}</div>
                    <div className="tableCell">{_resultDetails.GetNonNTSResult(_normalPools[i])}</div>
                </div>);
            }
        }

        // draw fts pools (right top table)
        for (let i = 0; i < _normalFtsPools.length; i++) {
            if (_resultDetails.HasPoolResults(_normalFtsPools[i])) {
                ftsTable.push(<div key={`${_normalFtsPools[i]}ResultRow`} className={`tableRow tableContent${(ftsTable.length + 1) % 2 + 1}`}>
                    <div className="tableCell">{GetGlobalResources(_normalFtsPools[i])}</div>
                    <div className="tableCell">{_resultDetails.GetNonNTSResult(_normalFtsPools[i])}</div>
                </div>);
            }
        }

        // draw nts pools (right bottom table)
        for (let i = 0; i < _ntsPools.length; i++) {
            for (let k = 1; k <= 30; k++) {  //assume maximum 30 NTS / ETS items
                if (_resultDetails.HasPoolResults(_ntsPools[i] + k)) {
                    let displayPoolName;
                    let goalnumber = k;
                    let extraTimeInfo = "";
                    if (_ntsPools[i] == "ETS") {
                        goalnumber = parseInt(goalnumber, 10);
                        extraTimeInfo = jsextratime;
                    }
                    if (curLang == 'en') {
                        displayPoolName = <span>{goalnumber}<sup>{getNumberSuffix(goalnumber)}</sup>{GetGlobalResources("ntslastpart", "js")} {extraTimeInfo}</span>;
                    } else {
                        displayPoolName = <span>{GetGlobalResources("ntsfstpart", "js")}{goalnumber}{GetGlobalResources("ntslastpart", "js")} {extraTimeInfo}</span>;
                    }
                    ntsTable.push(<div key={`${_ntsPools[i]}ResultRow_${k}`} className={`tableRow tableContent2`}>
                        <div className="tableCell">{displayPoolName}</div>
                        <div className="tableCell">{_resultDetails.GetNTSResult(_ntsPools[i], k)}</div>
                    </div>);
                }
            }
        }

        // draw spc (bottom table)
        spcTable = drawSPCResultRows(_resultDetails, `dSPC${_resultDetails.matchID}`, 'SPC');

        // draw sga (bottom table)
        sgaTable = drawSPCResultRows(_resultDetails, 'dSGA' + _resultDetails.matchID, 'SGA');

        // draw extra time pools
        for (let i = 0; i < _extraTimePools.length; i++) {
            if (_resultDetails.HasPoolResults(_extraTimePools[i])) {
                let displayPoolName = GetGlobalResources(_extraTimePools[i]);
                extraTimeTable.push(<div key={`${_extraTimePools[i]}ResultRow`} className={`tableRow tableContent${(extraTimeTable.length + 1) % 2 + 1}`}>
                    <div className="tableCell">{displayPoolName}</div>
                    <div className="tableCell">{_resultDetails.GetNonNTSResult(_extraTimePools[i])}</div>
                </div>);
            }
        }

        // draw ent pools (right bottom table)
        for (let i = 0; i < _entPools.length; i++) {
            for (let k = 1; k <= 30; k++) {  //assume maximum 30 NTS / ETS items
                if (_resultDetails.HasPoolResults(_entPools[i] + k)) {
                    let displayPoolName;
                    let goalnumber = k;
                    if (curLang=='en') {
                        displayPoolName = <span>{goalnumber}<sup>{getNumberSuffix(goalnumber)}</sup>{GetGlobalResources("ntslastpart", "js")}</span>;
                    } else {
                        displayPoolName = <span>{GetGlobalResources("ntsfstpart", "js")}{goalnumber}{GetGlobalResources("ntslastpart", "js")}</span>;
                    }
                    entTable.push(<div key={`${_entPools[i]}ResultRow_${k}`} className={`tableRow tableContent2`}>
                        <div className="tableCell">{displayPoolName}</div>
                        <div className="tableCell">{_resultDetails.GetNTSResult(_entPools[i], k)}</div>
                    </div>);
                }
            }
        }

        // add title row to tables
        if (normalTable.length > 0) {
            normalTable = <div className="table">
                <div key="normalResultTitleRow" className="tableRow">
                    <div className="tableCell border-bottom2 font-bold">{jsbettypes}</div>
                    <div className="tableCell border-bottom2 font-bold">{jsmatchresults}</div>
                </div>
                {normalTable}
            </div>;
        }
        if (ftsTable.length > 0) {
            ftsTable = <div className="table paddingBottom">
                <div key="ftsResultTitleRow" className="tableRow">
                    <div className="tableCell border-bottom2 font-bold">{jsbettypes}</div>
                    <div className="tableCell border-bottom2 font-bold">{jsmatchresults}</div>
                </div>
                {ftsTable}
            </div>;
        }
        if (ntsTable.length > 0) {
            ntsTable = <div className="table">
                <div key="ntsResultTitleRow" className="tableRow">
                    <div className="tableCell border-bottom2 font-bold">{jsNTS}</div>
                    <div className="tableCell border-bottom2 font-bold">{jsscoreteam}</div>
                </div>
                {ntsTable}
            </div>;
        }
        if (spcTable.length > 0) {
            spcTable = <div>
                <div className="border-bottom2 font-bold">
                    {jsspcresults}
                </div>
                <div className="table">
                    <div key="spcResultTitleRow" className="tableRow">
                        <div style={{ width: "18%" }} className="tableCell border-bottom2">
                            {jsitemno}
                        </div>
                        <div style={{ width: "55%" }} className="tableCell border-bottom2">
                            {jsitem}
                        </div>
                        <div style={{ width: "22%" }} className="tableCell border-bottom2">
                            {jsresults}
                        </div>
                    </div>
                    {spcTable}
                </div>
            </div>;
        }
        if (sgaTable.length > 0) {
            sgaTable = <div>
                <div className="border-bottom2 font-bold">
                    {jssgaresults}
                </div>
                <div className="table">
                    <div key="spcResultTitleRow" className="tableRow">
                        <div style={{ width: "18%" }} className="tableCell border-bottom2">
                            {jsitemno}
                        </div>
                        <div style={{ width: "55%" }} className="tableCell border-bottom2">
                            {jsitem}
                        </div>
                        <div style={{ width: "22%" }} className="tableCell border-bottom2">
                            {jsresults}
                        </div>
                    </div>
                    {sgaTable}
                </div>
            </div>;
        }
        if (extraTimeTable.length > 0) {
            extraTimeTable = <div className="table">
                <div key="normalResultTitleRow" className="tableRow">
                    <div className="tableCell border-bottom2 font-bold">{jsextraTimeBettypes}</div>
                    <div className="tableCell border-bottom2 font-bold">{jsmatchresults}</div>
                </div>
                {extraTimeTable}
            </div>;
        }
        if (entTable.length > 0) {
            entTable = <div className="table">
                <div key="ftsResultTitleRow" className="tableRow">
                    <div className="tableCell border-bottom2 font-bold">{jsextraTimeBettypes}</div>
                    <div className="tableCell border-bottom2 font-bold">{jsmatchresults}</div>
                </div>
                <div key="ntsResultTitleRow" className="tableRow">
                    <div className="tableCell border-bottom2 font-bold">{jsENT}</div>
                    <div className="tableCell border-bottom2 font-bold">{jsscoreteam}</div>
                </div>
                {entTable}
            </div>;
        }
        let resdetailtourn_img = formatImageStr(
            [League.GetFlagPath(_tournament.tournamentShortName),
                _tournament['tournamentName' + curLang.toUpperCase()],
                _tournament.tournamentShortName]);
        ReactDOM.render(
            <div className={`table`}>
                <ResultDetailTournament tournament={_tournament} match={_resultDetails} imgstr={resdetailtourn_img} />
                <div className={`tableRow`}>
                    <div className={`table`}>
                        <div className={`tableCell padding`}>
                            {scoreTable}
                        </div>
                    </div>
                </div>
                {
                    scoreAbandonedTable.length == 0 ? null :
                    <div className={`tableRow`}>
                        <div className={`table`}>
                            <div className={`tableCell padding`}>
                                {scoreAbandonedTable}
                            </div>
                        </div>
                    </div>
                }
                {
                    (normalTable.length == 0 && ftsTable.length == 0 && ntsTable.length==0 ) ? null :
                        <div className={`tableRow`}>
                            <div className={`table border-bottom2`}>
                                <div className={`tableCell padding`}>
                                    {normalTable}
                                </div>
                                <div className={`tableCell padding tableCellTop`}>
                                    {ftsTable}
                                    {ntsTable}
                                </div>
                            </div>
                        </div>
                }
                {
                    extraTimeScoreTable.length == 0 ? null :
                        <div className={`tableRow`}>
                            <div className={`table`}>
                                <div className={`tableCell padding`}>
                                    {extraTimeScoreTable}
                                </div>
                            </div>
                        </div>
                }
                {
                    extraTimeScoreAbandonedTable.length == 0 ? null :
                        <div className={`tableRow`}>
                            <div className={`table`}>
                                <div className={`tableCell padding`}>
                                    {extraTimeScoreAbandonedTable}
                                </div>
                            </div>
                        </div>
                }
                <div className={`tableRow`}>
                    <div className={`table`}>
                        <div className={`tableCell padding`}>
                            {extraTimeTable}
                        </div>
                        <div className={`tableCell padding tableCellTop`}>
                            {entTable}
                        </div>
                    </div>
                </div>
                <div className="space"></div>
                <div className={`tableRow`}>
                    <div className="tableCell">
                        {spcTable}
                    </div>
                </div>
                <div className="space"></div>
                <div className={`tableRow`}>
                    <div className="tableCell">
                        {sgaTable}
                    </div>
                </div>
                <div id="resultRemark" style={{ marginTop: "20px" }}></div>
            </div>,
            document.getElementById('trResultDetails')
        );

        $("#resultRemark").html('');
        if (_resultDetails.matchStatus == "Canceled") {
            $("#resultRemark").html(jsresultRemark);
        }

        window.scrollTo(0, 0);

        $('.allResults').hide();
        $('.resultsDetails').show();

        $('.hdMatchLastOdds').hide();
        $('.hdResultDetails').show();

        var tmpId = GetDataStore("__extendresdtls");
        if (tmpId == null || tmpId == '') {
            window.scrollTo(0, 0);
            let newUrl = location.href + '#';
            window.history.pushState({ "product": curProduct, "page": curPageId, "lang": curLang, "para": para }, "", newUrl);
        }
        else {
            ClearDataStoreItem("__extendresdtls");
        }
    } catch (ex) {
        debugLog("renderResultDetails" + ex);
    }
}

class ResultDetailTournament extends React.Component  {
    render() {
        let t = this.props.tournament;
        let m = this.props.match;
        let i = this.props.imgstr;

        let eventId = m.isBAUResult ? GetGlobalResources(m.matchDay, "js") + " " + m.matchNum : m.frontEndId

        if (t) {
            return <div className={`tableRow header`} title={t['tournamentName' + curLang.toUpperCase()]}>
                <span className={`tableCell border-bottom2`}>
                    {`${jseventNo}:`}
                    {'\u00A0'}{eventId}{'\u00A0'}
                    {i}
                    {'\u00A0'}{sTeamString(false, false, m, true, true, "HAD")}
                </span>
            </div>;
        } 
        return null;
    }
}

function renderLastOdds(_rMatchID, retryOnce) {
    try {
        // get data
        if (noOfFail <= 2) {
            $.ajax({
                url: "/football/getJSON.aspx?jsontype=last_odds.aspx&matchid=" + _rMatchID,
                type: "get",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.indexOf && data.indexOf(wafKeyword) >= 0 && !retryOnce) {
                        $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
                        setTimeout(function () {
                            renderLastOdds(_rMatchID, true);
                        }, 1000);
                        return;
                    }
                    lastOddsCache = data;
                    drawLastOdds(_rMatchID);
                },
                error: function () {
                    noOfFail++;
                }
            });
        }

    } catch (ex) { debugLog(ex); }
}

function drawLastOdds(_rMatchID) {
    try {
        rMatchID = _rMatchID;
        let _singleMatch = new Match(lastOddsCache);

        ReactDOM.render(
            renderMatchAllTable(_singleMatch, true, "result"),
            document.getElementById('trResultDetails')
        );

        $('#lastOddsRefreshTime').html(formatEsstStr(_singleMatch.statuslastupdated, true));

        $('.allResults').hide();
        $('.resultsDetails').show();

        $('.hdResultDetails').hide();
        $('.hdMatchLastOdds').show();
        $('#sgaRemarks').hide();

        var tmpId = GetDataStore("__extendlastOdds");
        if (tmpId == null || tmpId == '') {
            window.scrollTo(0, 0);
            let newUrl = location.href + "#";
            var p = trimPara2();
            window.history.pushState({ "product": curProduct, "page": curPageId, "lang": curLang, "para": p }, "", newUrl);
        }
        else {
            ClearDataStoreItem("__extendlastOdds");
        }

        isOnLastOddsPage = true;
    } catch (ex) {
        debugLog("drawLastOdds" + ex);
    }
}

function renderFGSResults(firstLoad) {
    let couponList = [];
    let fg = [];
    for (let i in fgsJson) {
        var key = fgsJson[i].matchKODateFormatted.substring(0, 10);
        if (fg[key]) continue;
        fg[key] = true;
        couponList.push(key);
    }
    couponList.sort(function (x, y) {
        let tmpX = x.split('/');
        let tmpY = y.split('/');
        return (new Date(parseInt(tmpY[2]), parseInt(tmpY[1]) - 1, parseInt(tmpY[0]))).getTime() - (new Date(parseInt(tmpX[2]), parseInt(tmpX[1])-1, parseInt(tmpX[0]))).getTime();
    });
    ReactDOM.render(
        <FGSResultsTable couponList={couponList} />,
        document.getElementById('fgsRes')
    );
    return false;
}

function renderSPCResults(data, firstLoad) {
    // display no pool
    if (data == undefined || data == null || data.length == 0) {
        $('#noinformation').show();
        $('#dContainer').show();
        return false;
    }
    // display match SPC result
    let _coupons = [];
    data = data.sort(sort_by2(["matchDate", "matchNum"], [false, false], [trimMatchDate, parseInt]));
    for (var i = 0; i < data.length; i++) {
        let _couponName, _couponID;
        let _resultRow = [];
        let rightText = "";
        let _singleObjectResult;

        let _leagueName, _aTeamName, _hTeamName;
        if (jsLang == "CH") {
            _leagueName = data[i].league.leagueNameCH;
            _hTeamName = data[i].homeTeam.teamNameCH;
            _aTeamName = data[i].awayTeam.teamNameCH;
        } else {
            _leagueName = data[i].league.leagueNameEN;
            _hTeamName = data[i].homeTeam.teamNameEN;
            _aTeamName = data[i].awayTeam.teamNameEN;
        }
        _couponName = <span>{jsmatchno}: {GetGlobalResources(data[i].matchDay, "js")} {data[i].matchNum} {formatMatchFlag(data[i].league.leagueShortName, _leagueName)} {_hTeamName} {jsVS} {_aTeamName}</span>;
        _couponID = `d${data[i].matchIDinofficial}`;
        rightText = `${jsdate}: ${formatYYYYMMDD(data[i].matchIDinofficial.substr(0, 8))}`;
        _singleObjectResult = new Match_Result(data[i], data.name == "SPC Results");;
        _resultRow = drawSPCResultRows(_singleObjectResult, _couponID);

        // coupon 
        _coupons.push(<div key={`${_couponID}_container`}>
            <div className="space2"></div>
            <CouponHeader couponName={_couponName} couponID={_couponID} hasMLMatch={false} couponCount={""} rightText={rightText} />
            <div className={`${_couponID} table`}>
                <div className={`tableRow`}>
                    <div style={{ width: "18%", textAlign: "center" }} className="tableCell tableContentHead">
                        {jsitemno}
                    </div>
                    <div style={{ width: "55%", textAlign: "center" }} className="tableCell tableContentHead">
                        {jsitem}
                    </div>
                    <div style={{ width: "22%", textAlign: "center" }} className="tableCell tableContentHead">
                        {jsresults}
                    </div>
                </div>
                {_resultRow}
            </div>
        </div>);
        // content
    }

    // tourn results
    if (!displaySearchResult) {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(tournXML, "text/xml");

        let tdata = xmlDoc.getElementsByTagName("TOURN");
        let found = false;

        let _content = new StringBuffer();
        for (var i = 0; i < tdata.length; i++) {
            let _tourn = tdata[i];
            let _tournID = _tourn.getAttribute("TOURN_ID");

            let nameAttr = (jsLang == "CH" ? "C_NAME" : "E_NAME");
            let _tournName = _tourn.getAttribute(nameAttr);
            let _tournTitle = <span>
                {jstournamentno} : {_tourn.getAttribute('TOURNAMENT_NO')} {formatTournFlag(_tourn.getAttribute('CODE'), _tournName)} {_tournName}
            </span>;

            let allPools = _tourn.getElementsByTagName('POOL');
            let _singlePool = allPools[0];

            let langPrefix;
            let _spcRFD = _singlePool.getAttribute('REFUND') == "1";
            let items = _singlePool.getElementsByTagName('ITEM');

            let _resultRow = [];
            let rightText = "";
            for (var j = 0; j < items.length; j++) {
                let _itemResult = [];
                if (_spcRFD) {
                    _itemResult.push(<div key={`${_tournID}_r`}><font color="red">{jsrefundforall}</font></div>);
                } else {
                    langPrefix = jsLang[0] + "_";
                }

                let _itemNo = items[j].getAttribute('NUM');
                let _itemQuestion = items[j].getAttribute(nameAttr);
                if (!_spcRFD) {
                    if (items[j].getAttribute('REFUND') == "1") {
                        _itemResult.push(<div key={`${_tournID}_${_itemNo}_r`}><font color="red">{jsRFD}</font></div>);
                    } else {
                        // get all selections
                        let selNum = items[j].getAttribute(`SEL_1`);
                        let answer = items[j].getAttribute(langPrefix + `SEL_1`);
                        _itemResult.push(<div key={`${_tournID}_${_itemNo}_a`}>({parseInt(selNum, 10)}) {answer}</div>);

                        // get all refund selections
                        let refundedSel = items[j].getElementsByTagName('RFD');
                        for (let rfdInd = 0; rfdInd < refundedSel.length; rfdInd++) {
                            let rSelNum = refundedSel[rfdInd].getAttribute('NUM');
                            let rAnswer = refundedSel[rfdInd].getAttribute(nameAttr);
                            _itemResult.push(<div key={`${_tournID}_${_itemNo}_${rfdInd}_r`}>({parseInt(rSelNum, 10)}) {rAnswer} <font color="red"> - {jsRFD}</font></div>);
                        }
                    }
                }
                _resultRow.push(<div key={`${_tournID}_${_itemNo}`} className={`couponRow tableRow rAlt${(++noOfSPCRow) % 2}`}>
                    <div className={`tableCell middle`}>{_itemNo}</div>
                    <div className={`tableCell middle`}>{_itemQuestion}</div>
                    <div className={`tableCell middle`}>{_itemResult}</div>
                </div>);
            }

            _coupons.push(<div key={`${_tournID}_container`}>
                <div className="space2"></div>
                <CouponHeader couponName={_tournTitle} couponID={_tournID} hasMLMatch={false} couponCount={""} rightText={rightText} />
                <div className={`${_tournID} table`}>
                    <div className={`tableRow`}>
                        <div style={{ width: "18%", textAlign: "center" }} className="tableCell tableContentHead">
                            {jsitemno}
                        </div>
                        <div style={{ width: "55%", textAlign: "center" }} className="tableCell tableContentHead">
                            {jsitem}
                        </div>
                        <div style={{ width: "22%", textAlign: "center" }} className="tableCell tableContentHead">
                            {jsresults}
                        </div>
                    </div>
                    {_resultRow}
                </div>
            </div>);
        }
    }


    ReactDOM.render(
        <div>{_coupons}</div>,
        document.getElementById('dContainer')
    );
    return false;
}

function drawSPCSearchResults() {
    noOfSPCRow = 0;
    //displaySearchLabel();

    // display no pool
    if (dataCache == undefined || dataCache == null || dataCache.length == 0) {
        $('#noinformation').show();
        $('#dContainer').hide();
        return false;
    } else {
        $('#noinformation').hide();
        $('#dContainer').show();
    }
    // display match SPC result
    let _coupons = [];
    if (dataCache.length > 0) {
        totalMatch = dataCache.length;
        startMatch = (curPage - 1) * maxMatch + 1;
        endMatch = startMatch + maxMatch - 1;
        endMatch = (endMatch > totalMatch ? totalMatch : endMatch);

        let _typeResult = dataCache;

        _typeResult = _typeResult.sort(sort_by2(["matchDate", "matchNum"], [true, false], [trimMatchDate, parseInt]));

        for (var i = (startMatch - 1); i < endMatch; i++) {
            let _couponName, _couponID;
            let _resultRow = [];
            let _singleObjectResult;
            let rightText = "";

            let _leagueName, _aTeamName, _hTeamName;
            if (jsLang == "CH") {
                _leagueName = _typeResult[i].league.leagueNameCH;
                _hTeamName = _typeResult[i].homeTeam.teamNameCH;
                _aTeamName = _typeResult[i].awayTeam.teamNameCH;
            } else {
                _leagueName = _typeResult[i].league.leagueNameEN;
                _hTeamName = _typeResult[i].homeTeam.teamNameEN;
                _aTeamName = _typeResult[i].awayTeam.teamNameEN;
            }
            _couponName = <span>{jsmatchno}: {GetGlobalResources(_typeResult[i].matchDay, "js")} {_typeResult[i].matchNum} {formatMatchFlag(_typeResult[i].league.leagueShortName, _leagueName)} {_hTeamName} {jsVS} {_aTeamName}</span>;
            _couponID = `d${_typeResult[i].matchIDinofficial}`;

            rightText = `${formatYYYYMMDD(_typeResult[i].matchIDinofficial.substr(0, 8))}`;
            _singleObjectResult = new Match_Result(_typeResult[i], _typeResult.name == "SPC Results");;
            _resultRow = drawSPCResultRows(_singleObjectResult, _couponID);

            // coupon 
            _coupons.push(<div key={`${_couponID}_container`}>
                <div className="space2"></div>
                <CouponHeader couponName={_couponName} couponID={_couponID} hasMLMatch={false} couponCount={""} rightText={rightText} />
                <div className={`${_couponID} table`}>
                    <div className={`tableRow`}>
                        <div style={{ width: "18%", textAlign: "center" }} className="tableCell tableContentHead">
                            {jsitemno}
                        </div>
                        <div style={{ width: "55%", textAlign: "center" }} className="tableCell tableContentHead">
                            {jsitem}
                        </div>
                        <div style={{ width: "22%", textAlign: "center" }} className="tableCell tableContentHead">
                            {jsresults}
                        </div>
                    </div>
                    {_resultRow}
                </div>
            </div>);
        }
    }

    ReactDOM.render(
        <div>{_coupons}</div>,
        document.getElementById('dContainer')
    );

    couponCount = 0;
    ReactDOM.render(
        <PageInfo type="header" />,
        document.getElementById('searchTableHeader')
    );

    $('.pagination').show();

    return false;
}

class FGSResultsTable extends React.Component {
    constructor(props) {
        super(props);
        this.couponList = this.props.couponList;
        this.state = {
            expandCoupon: this.initCouponExpands()
        };
    }
    initCouponExpands() {
        let s = {};
        for (let i in this.couponList) {
            s[this.couponList[i]] = true;
        }
        return s;
    }
    toggleCoupon(i) {
        let cou = this.state.expandCoupon;
        cou[i] = !cou[i];
        this.setState({ expandCoupon: cou });
    }
    render() {
        let tmpBody = [];
        if (fgsJson.length == 0) {
            tmpBody.push(<div className="chpRes" style={{ width: "100%" }}>
                <br /><br />
                <p style={{ textAlign: "center", color: "#CC0000" }}>{jsnoresultannounced}</p>
                <br /><br />
            </div>);
            $('.fgsRmks').hide();
        }
        else {
            let tmpHeader = <div className="tableRow">
                <div className="tableCell tableContentHead" style={{ width: "15%" }}>{jsdate}</div>
                <div className="tableCell tableContentHead" style={{ width: "15%" }}>{jsoddstable_eventid}</div>
                <div className="tableCell tableContentHead" style={{ width: "5%" }}>
                    <a href="javascript:goFlagUrl();">
                        <img src={`/football/info/images/icon_flag.gif${cacheVersion}`} alt={jsleagues_and_tournaments} title={jsleagues_and_tournaments} />
                    </a>
                </div>
                <div className="tableCell tableContentHead" style={{ textAlign: "center", width: "20%" }}>{jsteams1}<br />{jsteams2}</div>
                <div className="tableCell tableContentHead" style={{ textAlign: "center", width: "15%" }}>{jsFGS}</div>
                <div className="cotitle tableCell tableContentHead" style={{ textAlign: "center" }}>
                    <div className="rBottomBorder">{jsRFD}</div>
                    <div className="table">
                        <span className="codds r2">{jsHomeTeam}</span>
                        <span className="codds r2">{jsAwayTeam}</span>
                    </div>
                </div>
            </div>;

            let tmpCoupons = [];
            for (var i in this.couponList) {
                let tmpCoupon = [];
                let dt = this.couponList[i];
                let matches = $.grep(fgsJson, function (_obj) { return _obj.matchKODateFormatted.substring(0, 10) == dt; });
                let dtObj = new Date(dt.substring(6, 10) + '-' + dt.substring(3, 5) + '-' + dt.substring(0, 2));
                tmpCoupon.push(<div style={{ display: "table-caption" }} className="tgAlupCalCoupon" id="divCalCoupon" onClick={() => { this.toggleCoupon(dt); }}>
                    <span className={this.state.expandCoupon[dt] ? "spBtnMinus" : "spBtnPlus"}></span>
                    <span>{dt}({DateWeekLanguageSwitch(toWeekDay(dtObj.getDay()))}) {jstabletitlematches}</span>
                </div>);
                if (this.state.expandCoupon[dt]) {
                    let altRow = 1;
                    matches.sort(function (x, y) {
                        if (x.matchNum != '') {
                            return parseInt(x.matchNum) - parseInt(y.matchNum);
                        }
                        return x.frontEndId - y.frontEndId;
                    });
                    for (var j in matches) {
                        tmpCoupon.push(<MatchRow_FGSResults altRow={altRow++ % 2} match={matches[j]} />);
                    }
                }
                tmpCoupons.push(<div className="couponTable">{tmpCoupon}</div>);
            }

            tmpBody.push(<div className="couponTable tblResults fgsResults" >
                {tmpHeader}
                {tmpCoupons}
            </div>);

            $('.fgsRmks').show();
        }

        return <div>
            <div className="fbGenHeader">
                <div className="left">
                    <span className="cDelim">
                        <img src={`/info/include/images/stroke_yellow.gif${cacheVersion}`} alt="" title="" />
                    </span>
                    {jsfgsresults}
                </div>
                <div className="right divCalPrint text-left" onClick={() => { window.print(); }} title={jsprintdata}>{jsprintdata}</div>
                <div style={{ clear: "both" }}></div>
            </div>
            {tmpBody}
        </div>;
    }
}

function renderMatchTableMultipleMatch(odata, firstLoad) {
    //data = data.map(a => Object.assign({}, a)); << not available in IE
    try {
        let data;
        if (odata.constructor === Array)
            data = odata.map(a => jQuery.extend(true, {}, a));
        else
            data = jQuery.extend(true, {}, odata);

        let keepRefresh = false;
        //var _matchList = [];

        if (data.name != "odds_featured_matches.aspx" && pageName == "OFM") {
            return;
        }

        couponCount = 0;
        if (data.length == 0) {
            totalMatch = 0;
        } else {
            totalMatch = data.matches.length;
        }

        let displayNoPoolMsg = false;
        let allCouponArr = [];
        let allTournamentsArr = [];

        if (totalMatch > 0) {
            var couponArr = null;
            var tournamentsArr = null;
            if (data != undefined && data.matches != undefined && data.matches.length > 0 && data.tournaments != undefined && data.tournaments.length > 0) {
                couponArr = putMatchesToCoupon(data.matches, null, true);
                tournamentsArr = pushOddsTableTournamentsArr(data.tournaments, false);
            }
            allCouponArr.push.apply(allCouponArr, [couponArr]);
            allTournamentsArr.push.apply(allTournamentsArr, [tournamentsArr]);

            if (allCouponArr[0] != undefined && allCouponArr[0] != null && allCouponArr[0].length > 0) {
                renderOddsTable(allCouponArr[0], "ActiveMatches", oddsType, allTournamentsArr[0], firstLoad, data.name);
            } else {
                renderEmptyOddsTable();
            }

            let tempArr = jQuery.isEmptyObject(allCouponArr) ? allTournamentsArr : allCouponArr;
            let isArrayEmpty = jQuery.isEmptyObject(tempArr) ? jQuery.isEmptyObject(tempArr) : false;
            for (var i in tempArr) {
                if (!isArrayEmpty)
                    break;
                isArrayEmpty = jQuery.isEmptyObject(tempArr[i]);
            }

            if (displayNoPoolMsg || isArrayEmpty) {
                displayNoMatch(true);
            } else {
                ReactDOM.render(
                    <PageInfo type="footer" />,
                    document.getElementById('OddsTableFooter')
                );
                if (firstLoad) {
                    showHeaderIcons();
                }
                $('#NoPoolMsg').hide();
                $('#todds .OddsDetails').show();
                updateSimpleMatchList();
                // update display update time
                initRefreshTime();
                keepRefresh = true;
            }
        } else {
            displayNoMatch(true);
            /*
          if(firstLoad) {
            displayNoMatch(true);
          }  else {
            disableAllCheckBox();
          }*/
        }
        return keepRefresh;
    } catch (ex) {
        debugLog("renderMatchTableMultipleMatch:" + ex);
    }
}

var matchInfo = null;
function displayContentWithDDL(allCouponArr, data, firstLoad) {
    let displayNoPoolMsg = false;
    var singleMatch = null;
    let otherDateMatches = [];
    
    let tabDropTournaments = allTournaments.sort(sort_by2(["displayOrder"], [false], [parseInt]));

    // get available date
    let hasSelectedDate = false;
    let tabMatches = matchDataList;
    let availableDate = getAvailabDateListFromMatches(tabMatches);
    let oMatchId = tMatchID;

    selectedTabDateArra = [];
    // set selected date tab
    tabMatches.forEach(function (singleCoupon, couponIndex) {
        let couponMatchDate = singleCoupon.matchDate.split("T")[0];
        let couponMatchID = singleCoupon.matchID;
        if (tMatchID == couponMatchID && tMatchID != "") {
            hasSelectedDate = true;
            selectedTabDateArra.push(couponMatchDate);
            if (mdate != couponMatchDate) {
                mdate = couponMatchDate;
                selectedTournamentIds.push(singleCoupon.tournament.tournamentID)
            }
        } else if (couponMatchDate == mdate && tMatchID == "") {
            hasSelectedDate = true;
            selectedTabDateArra.push(couponMatchDate);
        }
    });

    // refresh page if match not found
    if (firstLoad && ((!hasSelectedDate && tMatchID != "") || (mdate != "" && $.inArray(mdate, availableDate) == -1) || mdate == "")) {
        tMatchID = mdate = "";
        switch (curTabType) {
            case tabType.Date:
                initTabDate();
                mdate = availableDate[0];
                break;
            case tabType.Feature:
                initTabFeature();
                break;
        }
        oddsTableLoadedRender();
        return;
    }

    // show default tournament if match voided or suspended after auto refresh
    if (tabType.Competition == curTabType && selectedTournamentIds.length == 0) {
        selectedTournamentIds.push(allTournaments[0].tournamentID)
        oddsTableLoadedRender();
        return;
    }

    // filter by date tab
    if (tabType.Date == curTabType && selectedTabDateArra.length > 0) {

        // check if date in others tab
        let tempOtherTabList = getOtherTabList(availableDate);
        let inOtherTab = $.inArray(mdate, tempOtherTabList) != -1;
        if (inOtherTab) {
            selectedTabDateArra = tempOtherTabList;
            curDateType = dateType.Other;
        }

        // get single match
        selectedTabDateArra.forEach(function (singleSelectedDate) {
            tabMatches.forEach(function (singleCoupon, couponIndex) {
                let couponMatchDate = singleCoupon.matchDate.split("T")[0];
                if (couponMatchDate == singleSelectedDate) {
                    otherDateMatches.push(singleCoupon);
                }
                if (tMatchID != null && tMatchID != "" && tMatchID == singleCoupon.matchID) {
                    singleMatch = new Match(singleCoupon);
                }
            });
        });

        if (otherDateMatches.length == 0) {
            otherDateMatches.push(tabMatches[0]);
            selectedTabDateArra = [];
        }

        if (tMatchID == null || tMatchID == "") {
            if ($.inArray(mdate, selectedTabDateArra) != -1) {
                singleMatch = $.grep(otherDateMatches, function (elem) {
                    return elem.matchDate2 == mdate;
                })[0];
                setMatchId(singleMatch.matchID)
            } else {
                setMatchId(otherDateMatches[0].matchID)
                singleMatch = new Match(otherDateMatches[0]);
            }
        }
    // filter by competition tab
    } else if (tabType.Competition == curTabType && selectedTournamentIds.length > 0) {

        // get tournament id by season
        selectedTournamentIds = getTournGroupIdsBytName(selectedTournamentIds);

        selectedTournamentIds.forEach(function (singleSelectedTourn) {
            tabMatches.forEach(function (singleCoupon, couponIndex) {
                let couponMatchTourn = singleCoupon.tournament.tournamentID;
                if (couponMatchTourn == singleSelectedTourn) {
                    otherDateMatches.push(singleCoupon);
                }
                if (tMatchID != null && tMatchID != "" && tMatchID == singleCoupon.matchID) {
                    singleMatch = new Match(singleCoupon);
                }
            });
        });

        if (otherDateMatches.length == 0) {
            otherDateMatches.push(tabMatches[0]);
        }
        if (tMatchID == null || tMatchID == "") {
            //tMatchID = otherDateMatches[0].matchID;
            setMatchId(otherDateMatches[0].matchID)
            singleMatch = new Match(otherDateMatches[0]);
        }
    } else if (tMatchID == "" || firstLoad) {
    // check if match list is empty ***************
        for (var ci = 0; ci < allCouponArr.length; ci++) {
            if (allCouponArr[ci] != null && allCouponArr[ci][0] != undefined) { 
                //tMatchID = allCouponArr[ci][0].matchID;
                singleMatch = new Match(allCouponArr[ci][0]);
                break;
            }
        }
    }

    // check if inplay pool is empty
    let isPoolEmpty = false;
    if (pageName == "INPLAYALL" && singleMatch != null && singleMatch.arrInPlayPools.length == 0 && oMatchId == tMatchID)
        isPoolEmpty = true;
    // find singleMatch
    // if not find 
    // >> auto refresh > return null, set all odds info to ---
    // >> first load > select first meeting
    if ((singleMatch == null && !firstLoad) || isPoolEmpty) {
        displayNoPoolMsg = true;
    }
    /*all odds*/
    let tournamentName = "";
    let tmpOptionList = [];
    if (singleMatch != null) {
        tabDropTournaments.forEach(function (tList) {
            if (singleMatch.tournament != undefined) {
                if (singleMatch.tournament.tournamentID == tList.tournamentID) {
                    tournamentName = tList['tournamentName' + curLang.toUpperCase()]
                }
            }
        })

        // get date or compeition dropdown list
        if (pageName == "ALL" || pageName == "FGS" || pageName == "CRS" || pageName == "FCS" || pageName == "INPLAYALL") {
            tmpOptionList = curTabType == tabType.Date ?
                getDateOptinList(tabDropTournaments, tabMatches, singleMatch.matchID)
                : getCompetitionOptinList(tabDropTournaments, tabMatches, singleMatch.matchID);
        }

        matchInfo = <MatchSelectList OddsTableTournaments={tabDropTournaments} OddsTableMatches={tabMatches} OptionList={tmpOptionList} SingleMatch={singleMatch} />
    } else {
        selectedTabDateArra.push(mdate);
    }

    ReactDOM.render(
        <div>
            <OddsTableInfo tableType="ActiveMatches" oddsType={pageName} />
            <div id="oddAllUpCalDiv"><OddsTableAllUpCalculator /></div>
            <OddsTableDateTournTab OddsTableTournaments={tabDropTournaments} OddsTableMatches={tabMatches} />
            {matchInfo}
            {!displayNoPoolMsg ? renderMatchAllTable(singleMatch, firstLoad, "ActiveMatches", tournamentName) : displayNoMatchSection()}
        </div>,
        document.getElementById('dContainer'), () => {
            oddsTableLoaded();
        } 
    );
       
    let _matchPoolStatus = singleMatch != null && singleMatch.GetMatchPoolStatus(pageName);

    if (!displayInplayStatement(_matchPoolStatus)) {
        ReactDOM.render(
            <AddBetBtn position="footer" />,
            document.getElementById('dFooterAddBet')
        );
        showHeaderIcons();
    } else {
        hideHeaderIcons();
    }

}

function renderNoPool() {
    return <div>
        <div className="nopool">
            <div className="nopoolmsg">
                {jsInfoUpdate}
            </div>
        </div>
    </div>;
}

function displayInplayStatement(_matchPoolStatus) {
    if ((pageName != "INPLAYALL" && pageName != "FGS") && (_matchPoolStatus != -1 &&
        _matchPoolStatus != MatchPoolStatus.BEFORE_KICKOFF &&
        _matchPoolStatus != MatchPoolStatus.BEFORE_KICKOFF_WITH_INPLAY &&
        _matchPoolStatus != MatchPoolStatus.BEFORE_KICKOFF_WITH_HALFTIME)) {
        return true;
    }
    return false;
}


function putMatchesToCoupon(currentMatchList, prevMatchList, sorted, isHistorical) {
    /* create match list */
    currentMatchList.forEach(function (item, index) {
        if (currentMatchList[index] != null) {
            if (isResultPage()) {
                currentMatchList[index] = new Match_Result(currentMatchList[index], currentMatchList.name == "PresalesMatches");
            } else {
                currentMatchList[index] = new Match(currentMatchList[index], currentMatchList.name == "PresalesMatches");
            }
        }
    })

    currentMatchList = currentMatchList.filter(function (n) { return n != undefined });
    currentMatchList = currentMatchList.filter(function (n) { return n.matchID != '' });
    let _matchList = filterAvailableMatch(currentMatchList);

    if (_matchList.length > 0) {
        if (!sorted) {
            if (!isHistorical) {
                // sort matches by match date frontEndId 
                _matchList = _matchList.sort(sort_by2(["matchDate2", "frontEndId"], [false, false], [trimMatchDate, parseInt]));
            } else {
                _matchList = _matchList.sort(sort_by2(["matchDate2", "frontEndId", "matchNum"], [true, false, false], [trimMatchDate, trimFrontendId, parseInt]));
            }
        }
    }
    if (_matchList.length == 0) {
        return null;
    } else {
        return _matchList;
    }
}

function putUniqueMatchesToCoupon(currentMatchList, prevMatchList, sorted) {
    /* create match list */
    currentMatchList.forEach(function (item, index) {
        if (currentMatchList[index] != null) {
            if (isResultPage()) {
                currentMatchList[index] = new Match_Result(currentMatchList[index], currentMatchList.name == "PresalesMatches");
            } else {
                currentMatchList[index] = new Match(currentMatchList[index], currentMatchList.name == "PresalesMatches");
            }
        }
    })

    currentMatchList = currentMatchList.filter(function (n) { return n != undefined });
    let _matchList = currentMatchList;
    let couponArr = [];

    if (_matchList.length > 0) {
        if (!sorted) {
            // sort matches by num
            if (_matchList[0].frontEndId != null && _matchList[0].frontEndId != '') {
                _matchList = _matchList.sort(sort_by2(["matchDate2", "matchDate", "tournament.tournamentShortName", "homeTeam.teamNameEN"], [true, false, false, false], [trimMatchDate, trimMatchDate2, trimStr, trimStr]));
            }
            else {
                _matchList = _matchList.sort(sort_by2(["matchDate2", "matchNum"], [true, false], [trimMatchDate, parseInt]));
            }
        }

        //// get unique tournament
        //var tournIds = _matchList.map(function (val) {
        //    return val['tournament']['tournamentID'];
        //});

        //var uniqueTourns = [];
        //$.each(tournIds, function (i, el) {
        //    if ($.inArray(el, uniqueTourns) === -1) uniqueTourns.push(el);
        //});


        // get unique match date
        var matchDate = _matchList.map(function (val) {
            return trimMatchDate(val['matchDate2']); //.substr(0,10).trim();
        });

        var uniqueMatchDate = [];
        $.each(matchDate, function (i, el) {
            if ($.inArray(el, uniqueMatchDate) === -1) uniqueMatchDate.push(el);
        });

        // put matches in couponArr
        for (var i = 0; i < uniqueMatchDate.length; i++) {
            let filteredArray = _matchList.filter(function (val) {
                //return val['tournament']['tournamentID'].indexOf(uniqueTourns[i].toLowerCase()) != -1;
                return val['matchDate2'].toLowerCase().indexOf(uniqueMatchDate[i].toLowerCase()) != -1;
            });
            if (filteredArray.length > 0) {
                couponArr.push(filteredArray);
            }
        }
    }
    if (couponArr.length == 0) {
        return null;
    } else {
        return couponArr;
    }
}

function renderMixAllUpMatchList() {
    if (noOfFail < 2) {
        $.ajax({
            url: "/football/getJSON.aspx" + getJSONQueryString(),
            type: "get",
            contentType: "application/json; charset=utf-8",
            //dataType: "json",
            success: function (data) {
                if (data != undefined && data != "") {
                    try {
                        //data = JSON.parse(data);
                        if (data != undefined) {
                            dataCache = data;
                            getMatchData(data);
                            getTournaments(data);
                            renderMixAllUpMatchListDom(data);
                        } else {
                            displayNoMatch(true, true);
                            displayRemarks();
                            hideHeaderIcons();
                        }
                    } catch (ex) {
                        displayNoMatch(true, true);
                        displayRemarks();
                        hideHeaderIcons();
                        debugLog(ex);
                    }
                } else {
                    displayNoMatch(true, true);
                    hideHeaderIcons();
                    displayRemarks();
                }
                isSwitchingDateTournTab = false;
            },
            error: function () {
                noOfFail++;
            }
        });
    } else {
        displayNoMatch(false);
        hideHeaderIcons();

    }
}

function renderMixAllUpMatchListDom(data) {

    countFeatureMatch = 0;

    matchDataList.forEach(function (singleCoupon, couponIndex) {
        if (singleCoupon.featureMatch != null && isFeaturedEnabled)
            countFeatureMatch++;
    });

    if (curTabType == tabType.Feature && countFeatureMatch == 0) {
        curTabType = tabType.Date;
        renderMixAllUpMatchList();
        return;
    }

    if (data.matches.length > 0 && data.tournaments.length > 0) {
        ReactDOM.render(
            <OddsTable coupons={putMatchesToCoupon(data.matches, null, true)} key="MIXALLUPLIST" tableType="MIXALLUPLIST" oddsType={oddsType} tournaments={data.tournaments} />,
            document.getElementById('dAllCoupons'), () => {
                oddsTableLoaded();
            }
        );
        showHeaderIcons();
    } else {
        displayNoMatch(true, true);
        displayRemarks();
        hideHeaderIcons();
    }
}

function displayRemarks() {
    $('.divRemarks').show();
}

function formatOddsSelection(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, poolId) {
    var selNo = _oddsSet.SEL;
    var _idSuffix = "";
    if (_oddsType == "GPW") {
        selNo = parseInt(selNo, 10);
        _idSuffix = _lineNum;
    } else {
        if (_oddsType == "CHP") {
            _idSuffix = "n_" + selNo;
            selNo = parseInt(selNo, 10);
        } else if (_oddsType == "TPS") {
            if (selNo != "00") {
                selNo = parseInt(_oddsSet.SEL, 10);
            }
            _idSuffix = _lineNum;
        } else {
            _idSuffix = "n_" + selNo;
        }
    }
    var spText = selNo + " " + (jsLang == "CH" ? _oddsSet.CONTENTCH : _oddsSet.CONTENTEN);
    let _id = `s_tourn_${_oddsType}_${_matchID}_${_idSuffix}_${poolId}_${_oddsSet.LINEID}_${_oddsSet.COMBID}`;
    if (_oddsType == "CHP" || _oddsType == "TPS")
        return <div className={`codds`} key={_id} id={_id}><div className={`flexWrap`}>{spText}</div></div>
    else
        return <span className={`codds`} key={_id} id={_id}>{spText}</span>
}

function formatEmptyOddsCell(_key) {
    return <div className={`noBorder codds`} key={`${_key}_codds`}>
    </div>;
}

function formatEmptyTQLOddsCell(_type, _key) {
    return <div className={`noBorder ${_type}`} key={`${_key}_codds`}>
    </div>;
}

function formatRefOdds(_oddsType, _matchID, oddsSet, checkboxType, lineNum) {
    var oddsArr;
    if (oddsSet.length != undefined) {
        oddsArr = oddsSet[lineNum][checkboxType].split('@');
    } else {
        oddsArr = oddsSet[checkboxType].split('@');
    }
    var oddsStr;
    if (oddsArr[0].charAt(2) == '1' && pageName != 'RESULT') {
        // irrational
        oddsStr = '---';
    }
    else {
        oddsStr = formatOddsStr(oddsArr[1], _oddsType);
    }
    var _key = _matchID;
    if (_oddsType == "FGS") {
        _key += oddsSet.SEL;
    } else {
        _key += checkboxType;
    }
    let _extraClass = "";
    if (pageName == "RESULT") {
        _extraClass = "oddsLink";
    }
    return <span key={`${_key}_odds`} id={`${_matchID}_${_oddsType}_${checkboxType}`} className={`ref ${_extraClass}`}>{oddsStr}</span>
}

function formatOddsLink(_oddsType, _matchID, oddsSet, checkboxType, lineNum, poolStatus, isAllup, poolId) {
    let oddsArr;
    let lineStatus = "1";
    let lineId;
    let combId;
    let instNo = "";
    if (oddsSet.ITEM != null) {
        instNo = oddsSet.ITEM;
    }
    if (oddsSet.length != undefined) {
        oddsArr = oddsSet[lineNum][checkboxType].split('@');
        if (isML(_oddsType)) {
            lineStatus = oddsSet[lineNum].LINESTATUS;
        }
    } else {
        oddsArr = oddsSet[checkboxType].split('@');
        if (isML(_oddsType)) {
            lineStatus = oddsSet.LINESTATUS;
        }
        lineId = oddsSet["LINEID"];

        combId = oddsSet[checkboxType + "COMBID"];

        if (_oddsType.match(/^(SPC|SGA)$/))
            combId = oddsSet[oddsSet.SEL + "COMBID"];
        else if (!oddsSet[checkboxType + "COMBID"])
            combId = oddsSet["COMBID"];

    }
    var oddsStr = oddsArr[1];
    if (!(oddsStr == "RFD" || oddsStr == "LSE")) {
        // special handling for SPC

        if (!isQRPortal) {

            let isMatchKickOff = betValue[_matchID] != null && betValue[_matchID].IsMatchKickOff != null ? betValue[_matchID].IsMatchKickOff() : false;

            if (_oddsType == "SPC") {
                if (!isInplay && isMatchKickOff) {
                    oddsStr = "---";
                } else {
                    if (isInplay && !isSelling(poolStatus, "1", "1")) {
                        oddsStr = "---";
                    }
                }
            } else {
                if (isInplay && !isSelling(poolStatus, oddsArr[0], lineStatus) && isMatchKickOff) {
                    oddsStr = "---";
                }
            }
        }
    }

    var combSpanID; // = _matchID + '_' + _oddsType + '_' + checkboxType;
    let selectionType;
    if (_oddsType == "FGS") {
        selectionType = oddsSet.SEL;
    } else if (isTournPool(_oddsType)) {
        if (_oddsType.match(/^(GPW|TPS|GPF|SPC|TSP)$/)) {
            selectionType = lineNum; // add group num
        } else if (_oddsType == "TQL") {
            selectionType = "n_" + checkboxType;
        } else {
            selectionType = "n_" + oddsSet.SEL;
        }
    } else if (_oddsType.match(/^(SPC|SGA)$/)) {
        selectionType = lineNum; // add group num
    } else {
        selectionType = checkboxType;
    }

    //var _key = _matchID;
    if (_oddsType == "FGS") {
        //_key += oddsSet.SEL;
        combSpanID = _matchID + '_' + _oddsType + '_' + selectionType;
    } else if (_oddsType == "CHP") {
        combSpanID = _matchID + '_' + _oddsType + '_n_' + selectionType;
    } else if (_oddsType.match(/^(GPW|TPS|GPF|SPC|TSP)$/)) {
        combSpanID = _matchID + '_' + _oddsType + '_' + selectionType;
    } else {
        //_key += checkboxType;
        combSpanID = _matchID + '_' + _oddsType + '_' + selectionType;
    }
    if (_oddsType == "CHP") {
        combSpanID = "tourn_" + combSpanID;
    } else if (isML(_oddsType)) {
        combSpanID += '_' + lineNum;
    }
    combSpanID += '_' + poolId + '_' + lineId + '_' + combId;
    if (isAllup && oddsStr != '---' && oddsStr != 'LSE' && oddsStr != 'RFD')
        return <OddsLink poolType={_oddsType} link="true" key={combSpanID} className="oddsLink" href={`javascript:calBet(this,'${_matchID}','${_oddsType}','${selectionType}','${lineNum}', '${poolId}', '${lineId}', '${combId}', '${instNo}')`} title={GetGlobalResources("AllupCalculator")} spanID={combSpanID} oddsStr={oddsStr} />
    else
        return <OddsLink poolType={_oddsType} link="false" key={combSpanID} className="oddsLink" spanID={combSpanID} oddsStr={oddsStr} />;
}

function formatLineNum(_oddsType, _matchID, oddsSet, isExpanded, poolStatus) {
    let tmpOddsSet = oddsSet;
    if (isDisplayMultiplePoolPage(pageName)) {
        isExpanded = true;
    } else {
        tmpOddsSet = oddsSet.LINELIST;
    }
    var mlDetail = [];
    for (var i = 0; i < tmpOddsSet.length; i++) {
        var lineClass;
        var lineDisplayValue;
        if (i == 0) {
            lineClass = "mlMainRow ";
        } else {
            lineClass = "mlSubRow ";
        }
        if (tmpOddsSet[i]["MAINLINE"] == "true") {
            lineClass += "mainLineRow";
            lineDisplayValue = "block";
        } else {
            lineClass += "otherLineRow";
            if (isExpanded) {
                lineDisplayValue = "block";
            } else {
                lineDisplayValue = "none";
            }
        }
        let lineStrToDisplayed = `[${tmpOddsSet[i].LINE}]`;
        if (pageName == "INPLAYALL" && (!isSelling(poolStatus, "100", tmpOddsSet[i].LINESTATUS)) && betValue[_matchID].IsMatchKickOff()) {
            lineStrToDisplayed = "---";
        }
        mlDetail.push(<div key={`${_matchID}_lineNum_${tmpOddsSet[i].LINENUM}`} className={lineClass} style={{ display: lineDisplayValue }}>
            <span id={`${_matchID}_${_oddsType}_LINE_${tmpOddsSet[i].LINENUM}`} className="">{lineStrToDisplayed}</span>
            <div className="emptyDiv" style={{ display: 'none' }}></div>
        </div>)
    }
    return <div className="cline" key={`${_matchID}_lineNum`}>
        {mlDetail}
    </div>
}


function formatCRSSelection(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, poolStatus, isAllup, poolId) {
    return [formatCRSSelectionText(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, poolStatus, isAllup, poolId),
        formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, poolStatus, isAllup, poolId)];
}

function formatCRSSelectionText(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, poolStatus, isAllup) {
    let spText, _id;
    if (_checkboxType == "SM1MH") {
        spText = bshomeothers;
    } else if (_checkboxType == "SM1MA") {
        spText = bsawayothers;
    } else if (_checkboxType == "SM1MD") {
        spText = bsdrawothers;
    } else {
        spText = _checkboxType[2] + " : " + _checkboxType[4];
    }
    _id = `${_matchID}_${_oddsType}_${_checkboxType}`;

    return <div className={`codds cCRSSel ${_id}_0_c`} key={`sel${_matchID}${_checkboxType}_${_lineNum}`}>
        <span id={`s${_id}`}>{spText}</span>
    </div>
}

function formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, poolStatus, isAllup, poolId) {
    var _oddsCell;

    if (_oddsType == "DHCP") {
        // only for DHCP case, use isAllUp to pass singleMatch.isVoidMatch() parameter
        isDisabled = isAllup || !isSelling(poolStatus, "1", "1");
        _oddsCell = <div key={`${_matchID}_${_checkboxType}_${_lineNum}`} className="codds">
            <OddsCheckboxPariMutuel _poolType={_oddsType} matchID={_matchID} selectionVal={`${_checkboxType}`} rInd={_lineNum} isDisabled={isDisabled} />
        </div>;
    } else {
        let _key = `${_matchID}${_oddsType}${_checkboxType}_0OC`;
        _oddsCell = <OddsCell key={_key} rkey={_key} _oddsType={_oddsType} _matchID={_matchID} oddsSet={_oddsSet} checkboxType={`${_checkboxType}`} lineNum={`0`} _tableType={_tableType} poolStatus={poolStatus} isAllup={isAllup} poolId={poolId} extraClass={`coddsAlign`} />;
    }

    return _oddsCell;
}


// FOR FGS
function formatSelectionInsideGroup(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, lineCount, poolStatus, isAllup, poolId) {
    var selNo = _oddsSet.SEL;
    var spText = selNo + " " + (jsLang == "CH" ? _oddsSet.CONTENTCH : _oddsSet.CONTENTEN);
    var _className = "coddsSelectionsInnerTable";
    var _id = `s${_matchID}_${_checkboxType}`;

    return [<div key={`${_id}key`} className={`codds c${_oddsType}Name`}>
        <span id={_id}>{spText}</span>
    </div>,
        <OddsCell key={`${_matchID}${_oddsType}${selNo}_OC`} rkey={`${_matchID}${_oddsType}${selNo}_OC`} _oddsType={_oddsType} _matchID={_matchID} oddsSet={_oddsSet} checkboxType={_checkboxType} lineNum={`0`} _tableType={_tableType} poolStatus={poolStatus} isAllup={isAllup} poolId={poolId} />
    ];
}

function formatEmptySelectionInsideGroup(_oddsType, lineCount) {
    var _className = (_oddsType == "GPW" ? "coddsSelectionsInnerTable" : "coddsSelectionsInnerTable");


    return [<div className={`codds c${_oddsType}Name`}></div>,
    <div className={`codds`}></div>]
}

function formatGPFSelection(_oddsType, _tournID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded) {
    let keyPrefix = `${_tournID}GPF${_oddsSet.GROUP}`;
    let gpfHeader = <div className={`gpfHeader`} key={`${keyPrefix}_HEADER`}>
        <div className={`gpfHead left`}>
            {jsLang === "CH" ? _oddsSet.GROUPCH : _oddsSet.GROUPEN} / {jsgroupno}: {_oddsSet.GROUP}
        </div>
        <div className={`gpfHead right`}>
            {_oddsSet.ExpectedStopTime != "" ? jsesst1 : null}
            {_oddsSet.ExpectedStopTime != "" ? jsesst2 : null}:
        {_oddsSet.ExpectedStopTime != "" ? formatEsstStr(_oddsSet.ExpectedStopTime, true) : null}
        </div>
    </div>;
    let gpfTableRows = [];

    let tmpGpfTableCells = [];

    tmpGpfTableCells.push(<div className={`tableCell rBottomBorder cRightBorder gpf12`} key={`${keyPrefix}_HEADER12`}>
        <div className="blk1" style={{ left: `0px`, textAlign: `right`, paddingRight: `5px` }}>{jswinner}</div>
        <div className="blk2" style={{ top: `8px`, left: `0px`, paddingLeft: `2px` }}>{jsrunnerup}</div>
    </div>);
    _oddsSet.NAMELIST.forEach(function (_team, _wInd) {
        let tmpTeamName = `${parseInt(_team.NO, 10)} ${jsLang === "CH" ? _team.CH : _team.EN}`;
        tmpGpfTableCells.push(<div className={`tableCell rBottomBorder center`} title={tmpTeamName} key={`${keyPrefix}_TEAMNAME${_wInd}`}>{tmpTeamName}</div>)
    })

    gpfTableRows.push(<div className={`tableRow`} key={`${keyPrefix}_row${gpfTableRows.length}`}>{tmpGpfTableCells}</div>);

    _oddsSet.SELLIST.forEach(function (_winnerSel, _wInd) {
        tmpGpfTableCells = [];
        var _tmpTeamInfo = _oddsSet.NAMELIST[_wInd - 1];
        let tmpTeamName = `${parseInt(_tmpTeamInfo.NO, 10)} ${jsLang == "CH" ? _tmpTeamInfo.CH : _tmpTeamInfo.EN}`;
        tmpGpfTableCells.push(<div className={`tableCell cRightBorder`} title={tmpTeamName} key={`${keyPrefix}_teamName${_wInd}`}>{tmpTeamName}</div>);

        _winnerSel.forEach(function (_singleSel, _sInd) {
            _lineNum = _oddsSet.GROUP + "_" + _singleSel.SEL.replace(":", "");
            tmpGpfTableCells.push(<div className={`tableCell rRightWhiteBorder`} key={`${keyPrefix}_${_lineNum}`}>
                <OddsCell key={`${_tournID}${_oddsType}${_lineNum}OC`} rkey={`${_tournID}${_oddsType}${_lineNum}OC`} _oddsType={_oddsType} _matchID={_tournID} oddsSet={_singleSel} checkboxType={_checkboxType} lineNum={`${_lineNum}`} _tableType={_tableType} poolStatus={_oddsSet.POOLSTATUS} isAllup={_oddsSet.ALLUP} poolId={_oddsSet.POOLID} />
            </div>);
        });

        // add <div>-</div>
        tmpGpfTableCells.splice((parseInt(_tmpTeamInfo.NO, 10)), 0,
            <div className={`tableCell rRightWhiteBorder center`} key={`${keyPrefix}_EMPTY${_wInd}`}>-</div>);

        gpfTableRows.push(<div key={`${keyPrefix}_row${gpfTableRows.length}`} className={`tableRow rAlt${_wInd % 2}`}>
            {tmpGpfTableCells}
        </div>);
    })

    return <div key={`dGPFTable${_oddsSet.GROUP}`} className={``}>
        {gpfHeader}
        <div className={`table`}>
            {gpfTableRows}
        </div>
    </div>;
}

class OddsTypeOuterTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hideLSE: true };
        this.onEliminateBtnClicked = this.onEliminateBtnClicked.bind(this);
    }
    onEliminateBtnClicked(event) {
        this.setState({ hideLSE: !this.state.hideLSE });
    }
    render() {
        let _oddsType = this.props._oddsType;
        let tableType = this.props.tableType;
        let objID = this.props.objID;
        let innerContent = this.props.innerContent
        let eliminateBtn = this.props.eliminateBtn;
        let expectedStopSellingTime = this.props.expectedStopSellingTime;
        let refOdds = "";//this.props.refOdds;

        let tqlCode = this.props.code;
        let tqlStage = this.props.stage;
        let frontEndId = "";
        var _ref = "";//tableType.indexOf("Presales") != -1 ? "Ref" : "";
        if (pageName == "TOURN") {
            let _dataOddsType = this.props._dataOddsType;
            try {
                let singleTourn = betValue[objID];
                frontEndId = singleTourn.frontEndId;
                if (_oddsType == "TSP") {
                    // Render Active and Presales SPC Odds Table By Tourn
                    if (singleTourn.tspodds != undefined && singleTourn.tspodds != null) {
                        innerContent = <SPCTableByTourn singleTourn={singleTourn} tableType={tableType} key={`${singleTourn.tournamentID}${_oddsType}`} spcOddsType="" />;
                    } else if (singleTourn.spcoddsref != undefined && singleTourn.spcoddsref != null) {
                        innerContent = <SPCTableByTourn singleTourn={singleTourn} tableType={tableType} key={`${singleTourn.tournamentID}${_oddsType}`} spcOddsType="Ref" />;
                    }
                } else if (_oddsType == "TPS0" || _oddsType == "TPS1") {
                    if (singleTourn[_dataOddsType + "odds" + refOdds] != null) {
                        for (var tpsInd = 0; tpsInd < singleTourn[_dataOddsType + "odds" + refOdds].length; tpsInd++) {
                            var _tpsType = (singleTourn[_dataOddsType + "odds" + refOdds][tpsInd].TPSTYPE == "Player" ? "0" : "1");
                            if ((_oddsType == "TPS0" && singleTourn[_dataOddsType + "odds" + refOdds][tpsInd].TPSTYPE == "Player") ||
                                (_oddsType == "TPS1" && singleTourn[_dataOddsType + "odds" + refOdds][tpsInd].TPSTYPE == "Team")) {
                                let _sTourn = singleTourn[_dataOddsType + "odds" + refOdds][tpsInd];
                                expectedStopSellingTime = <div className={`right`} style={{ paddingRight: "5px" }}>
                                    {_sTourn.ExpectedStopTime != "" ? jsesst1 : null}
                                    {_sTourn.ExpectedStopTime != "" ? jsesst2 : null}:
                            {_sTourn.ExpectedStopTime != "" ? formatEsstStr(_sTourn.ExpectedStopTime, true) : null}</div>;
                                innerContent = <OddsSelectionTourn hideLSE={this.state.hideLSE} singleTourn={singleTourn} tableType={tableType} key={`${singleTourn.tournamentID}${_oddsType}`} oddsType={"TPS"} tpsIndex={_tpsType} refOdds={refOdds} />;
                                break;
                            }
                        }
                    }
                } else if (_oddsType == "TQL") {
                    let _sTourn = singleTourn[_dataOddsType + "odds" + refOdds];

                    innerContent = <OddsSelectionTourn hideLSE={this.state.hideLSE} singleTourn={singleTourn} tableType={tableType} key={`${singleTourn.tournamentID}${_oddsType}`} oddsType={_oddsType} refOdds={refOdds} />
                } else {
                    if (singleTourn[_dataOddsType + "odds" + refOdds] != null) {
                        if (_oddsType == "CHP") {
                            let _sTourn = singleTourn[_dataOddsType + "odds" + refOdds];
                            expectedStopSellingTime = <div className={`right`} style={{ paddingRight: "5px" }}>
                                {_sTourn.ExpectedStopTime != "" ? jsesst1 : null}
                                {_sTourn.ExpectedStopTime != "" ? jsesst2 : null}:
                            {_sTourn.ExpectedStopTime != "" ? formatEsstStr(_sTourn.ExpectedStopTime, true) : null}</div>
                        }
                        innerContent = <OddsSelectionTourn hideLSE={this.state.hideLSE} singleTourn={singleTourn} tableType={tableType} key={`${singleTourn.tournamentID}${_oddsType}`} oddsType={_oddsType} refOdds={refOdds} />
                    }

                    $('#d' + _oddsType).show();
                }

                innerContent = <div id={`d${_oddsType}Table${objID}`} className="betTypeAllOdds">{innerContent}</div>;

                if (tableType.indexOf("Active") >= 0 && (_oddsType == "CHP" || _oddsType == "TPS0" || _oddsType == "TPS1" || _oddsType == "GPW")) {
                    eliminateBtn = <EliminateBtn hideLSE={this.state.hideLSE} _oddsType={_oddsType} objID={objID} onClick={this.onEliminateBtnClicked} />
                }
            } catch (ex) {
                debugLog(_dataOddsType + " " + ex);
            }
        }

        if (innerContent === undefined || innerContent === null) {
            innerContent = <div id={`d${_oddsType}Table${objID}`} className="betTypeAllOdds">{displayNoMatchSection()}</div>;
        }

        let displayCoupon = !pageName.match(/^(CRS|FCS|FGS|SPC)$/);

        return <div key={`d${_oddsType}${objID}`} id={`d${_oddsType}${objID}`}>
            {displayCoupon ? drawOddsTypeCoupon(_oddsType, tableType, objID, "", eliminateBtn, expectedStopSellingTime, tqlCode, tqlStage, frontEndId) : null}
            {_oddsType == "SGA" ? <div id="sgaRemarks" dangerouslySetInnerHTML={{ __html: jsSGARemarks }}></div> : null}
            <div className={`odds${_oddsType}`} id={`${_oddsType.toLowerCase().toString()}Holder${objID}`}>
                {innerContent}
            </div>
        </div>
    }
}

function drawOddsTypeCoupon(_oddsType, tableType, objID, _ref, eliminateBtn, expectedStopSellingTime, code, stage, frontEndId) {
    return <div className="tgCoupon" id={`d${_oddsType}Coupon${_ref}${objID}`} onClick={() => { pageName == "MIXALLUPSHORTCUT" ? null : tgCoupon5(`d${_oddsType}Coupon${_ref}${objID}`, `d${_oddsType}Table${_ref}${objID}`); }}>
        {pageName == "MIXALLUPSHORTCUT" ? <span className="space"></span> : <span className="spBtnMinus"></span>} <span id={`lit${_oddsType}Text${_ref}${objID}`}>
            {formatOddsHeader(_oddsType, tableType, objID, "", false, code, stage, frontEndId)}
        </span>
        {eliminateBtn}
        {expectedStopSellingTime}
    </div>;
}

function drawOddsTypeTable(_oddsType, tableType, tournID) {
    var _ref = "";
    if (tableType.indexOf("Presales") != -1) {
        _ref = "Ref";
    }
    if (tournID == null) tournID = "";
    return <div id={`d${_oddsType}${_ref}${tournID}`} key={`d${_oddsType}${_ref}${tournID}`}></div>
}

function formatPageHeader(_singleTourn, _tableType, loadImg, loadSuspend) {
    let tournName = _singleTourn['tournamentName' + curLang.toUpperCase()];
    return <label className="btext">
        <span>{pageName != "TOURN" ? _singleTourn.frontEndId : ""}</span>
        {loadImg ? formatTournFlag(_singleTourn.tournamentShortName, tournName) : ""} {tournName}
        {loadSuspend ? displaySuspendedText() : null}
    </label>;
}

class SPCItemContainer extends React.Component {
    render() {
        let _item = this.props.singleItem;
        let tableType = this.props.tableType;
        let _ref = this.props.refStr;
        let _firstItem = _item[0].item;
        let _couponID = `coupon${_firstItem.ITEM}`;
        let _couponName = `${jsitemno}: ${_firstItem.ITEM} - ${jsLang == "CH" ? _firstItem.ITEMCH : _firstItem.ITEMEN}`;
        let _tournamentData = this.props.tournamentData;
        let matchRow = [];
        _item.forEach(function (_singleObj, altRow) {
            let _singleMatch = _singleObj.match;
            matchRow.push(<MatchRowSPCByItem altRow={altRow % 2} item={_singleObj.item} match={_singleMatch} key={_singleMatch.matchIDinofficial} tableType={tableType} couponID={_couponID} tournamentData={_tournamentData} />);
        });

        return <div className="byItem couponTable">
            {<CouponHeader couponName={_couponName} couponID={_couponID} hasMLMatch={false} couponCount={""} />}
            <ColumnTitleSPCByItem itemInfo={_firstItem} couponID={_couponID}  />
            {matchRow}
        </div>
    }
}

class SPCContainer extends React.Component {
    render() {
        let ref = this.props.refStr;
        let tableType = this.props.tableType;
        let objID = this.props.objID;
        let objType = this.props.objType;
        let singleObj = this.props.singleObj;

        let couponHeaderTxt = "";

        if (objType == "match") {
            couponHeaderTxt = <span>{displayMatchDayDiv(singleObj.matchID, singleObj.matchDay, singleObj.matchNum, pageName, false)} {sTeamString(!isInplay, false, singleObj, false, true, "SPC")}</span>;
        } else {
            couponHeaderTxt = formatPageHeader(singleObj, ref, false, false);
        }

        let displayByMatch;
        if (objType != "match" || pageName != "SPC") {
            displayByMatch = 1;
        } else {
            displayByMatch = 0;
            singleObj.spcodds.forEach(function (_os) {
                if (_os.GROUP == "Match") {
                    displayByMatch++;
                }
            });
        }
        if (displayByMatch == 0) {
            return null;
        } else { 
            return <div id={`dSPC${ref}${objID}`}>

                <div className="oddsSPC">
                    <div id={`dSPCTable${ref}${objID}`} className="betTypeAllOdds">
                        {objType == "match" ?
                            <SPCTableByMatch singleMatch={singleObj} key={singleObj.matchID} spcOddsType="" tableType={tableType} />
                            :
                            <SPCTableByTourn singleTourn={singleObj} key={singleObj.tournamentID} spcOddsType="" tableType={tableType} />
                        }
                    </div>
                </div>
            </div>
        }
    }
}

class SGAContainer extends React.Component {
    render() {
        let tableType = this.props.tableType;
        let objID = this.props.objID;
        let singleObj = this.props.singleObj;
        
        return <div id={`dSGA${objID}`}>
            <div className="oddsSPC">
                <div id={`dSGATable${objID}`} className="betTypeAllOdds">
                    <SGATable singleMatch={singleObj} key={singleObj.matchID} tableType={tableType} />
                </div>
            </div>
        </div>
    }
}

// SPC Page Header
class SPCPageHeader extends React.Component {
    render() {
        //var _oddsType = this.props.oddsType;

        return <div className="oHeader">
            <div className="tblHeader">
                <div className="normalheader">
                    <div className="left">
                        <span className="cDelim">
                            <img src={`/info/include/images/stroke_yellow.gif${cacheVersion}`} alt="" title="" />
                        </span>
                        {formatOddsHeader(pageName, this.props.tableType, "", "")}
                    </div>
                    {(this.props.tableType.toLowerCase().indexOf("presales") >= 0 || this.props.tableType == "NoMatch") ? null :
                        <div className="right">
                            <span>
                                <a className="cActionsPrint" href={`javascript:printNow('${location.pathname}${location.search}&pv=1');`}>{jsprintdata}</a>
                                <a className="spiconPrint"><span className="spicon"><img src={`/info/include/images/icon_print.gif${cacheVersion}`} className="pointer icon" onClick={() => { printNow(`${location.pathname}${location.search}&pv=1`) }} alt={jsprintdata} title={jsprintdata} /></span></a>
                                <a className="nolnk">{jsrefreshat}:<label id="sRefreshTime"></label></a>
                                <a className="refresh" href="javascript:refreshOddsPage();">{jsrefresh}</a>
                                <a className="refresh">
                                    <span className="spicon">
                                        <img src={`/info/include/images/icon_refresh.gif${cacheVersion}`} className="pointer icon" alt={jsrefresh} title={jsrefresh} onClick={() => { refreshOddsPage() }} />
                                    </span>
                                </a>
                            </span>
                            <AddBetBtn />
                        </div>
                    }
                </div>
            </div>
        </div>;
    }
}

class ParimutuelPoolTable extends React.Component {
    render() {
        let _singlePool = this.props.singlePool;
        let _singleTournament = this.props.singleTournament;
        let _poolType = this.props.poolType;

        return <div>
            <div className={`tableRow tblHead`}>
                <div className={`tableCell matchLeg`}>{jsleg}</div>
                <div className={`tableCell matchNum`}>{"ID"}</div>
                <div className={`tableCell matchLeague`}>
                    <a href="javascript:goFlagUrl();">
                        <img src={`/football/info/images/icon_flag.gif${cacheVersion}`} alt={jsleagues_and_tournaments} title={jsleagues_and_tournaments} />
                    </a>
                </div>
                <div className={`tableCell matchTeam`} >
                    {jsteams1}
                    <br />
                    {jsteams2}
                </div>
            </div>
            {getParimutuelPoolTableMatchRows(_singlePool, _poolType, _singleTournament)}
        </div>;
    }
}

function getParimutuelPoolTableMatchRows(_singlePool, _poolType, _singleTournament) {
    let _rows = [];
    let noOfRows = 2;
    let loadLink = false;
    let isDisabled = !isSelling(_singlePool.POOLSTATUS, "1", "1");

    betValue = [];

    for (var rInd = 0; rInd < noOfRows; rInd++) {
        let singleMatch = new Match(_singlePool["LEG" + (rInd + 1)]);
        let _singleMatchDisabled = singleMatch.isVoidMatch() || isDisabled;

        //betValue[singleMatch.matchIDinofficial] = singleMatch;
        betValue[singleMatch.matchID] = singleMatch;
        _rows.push(<div key={`row${rInd}`} className={`tableRow couponRow rAlt${rInd % 2}`}>
            <div className={`tableCell matchLeg`}>{GetLegName(rInd)}</div>
            <div className={`tableCell matchNum`}>{displayMatchDayDiv(singleMatch.matchID, singleMatch.matchDay, singleMatch.matchNum, pageName, false)}</div>
            <div className={`tableCell matchLeague`}>{formatImageStr([League.GetFlagPath(_singleTournament.tournamentShortName), _singleTournament['tournamentName' + curLang.toUpperCase()], _singleTournament.tournamentShortName])}</div>
            <div className={`tableCell matchTeam`}>
                {sTeamString(true, loadLink, singleMatch, false, true, _poolType)}
                {singleMatch.isVoidMatch() ? <span className="void">{"  " + jsvoidmatch}</span> : ""}
                <span className={`cvenue`}>{singleMatch.venue == null ? "" : formatNeutralGroundIcon(singleMatch.venue, "ng")}</span>
            </div>
        </div>)
    }

    return _rows;
}

function generateDHCPSelectionTable(singePool, couponID) {
    let singleMatch = new Match(singePool["LEG" + couponID]);

    return <div key={`coupon${couponID}`} className={`couponLeg1`}>
        <div id={`tgCoupon${couponID}`} className="tgCoupon" onClick={() => { tgCoupon5(`tgCoupon${couponID}`, `couponContent${couponID}`) }}>
            <span className="spBtnMinus"></span>
            {GetLegName(couponID - 1)}
        </div>
        <div id={`couponContent${couponID}`}>
            <OddsSelectionDHCP key={`${couponID}1`} couponID={couponID} indexInCoupon="1" singleMatch={singleMatch} oddsType={`DHCP`} tableType={`ActiveMatches`} poolStatus={singePool.POOLSTATUS} />
            <OddsSelectionDHCP key={`${couponID}2`} couponID={couponID} indexInCoupon="2" singleMatch={singleMatch} oddsType={`DHCP`} tableType={`ActiveMatches`} poolStatus={singePool.POOLSTATUS} />
        </div>
    </div>
}

function calBet(_thisObj, _betValueId, _bType, _optionKey, _itemNo, poolId, lineId, combId, insNo) {
    var divCalStr = toDivCalString(_betValueId, _bType, poolId, lineId, combId, _optionKey, false, _itemNo, insNo);
    SetDataStore("tmpAllupBetline", divCalStr);
    $("#selFormula").val(0)
    let formulaIndex = 0
    divCalErrMsg = '';
    ReactDOM.render(
        <OddsTableAllUpCalculator formulaIdx={formulaIndex} />,
        document.getElementById('oddAllUpCalDiv')
    );
}

function paginationCalculator(dataArray) {
    totalMatch = 0;
    startMatch = (maxMatch * curPage) - maxMatch;
    endMatch = (maxMatch * curPage);
    dataArray.forEach(function (dataList) {
        totalMatch = totalMatch + dataList.length;
    });
    endMatch = endMatch > totalMatch ? totalMatch : endMatch;
}

function refreshMixallUpCalculator() {
    if (invalidBetTypeArr.length>0) {
        var checkedObjs = $(".coddsSelections input:checked");// if checked item changed to invalid bet types , cal
        for (var i = 0; i < checkedObjs.length; i++) {
            var str = $(checkedObjs[i]).attr("id").split("_");
            // var poolId = str[5];
            mixFormula($(checkedObjs[i]), str[0], str[1], str[2]);
            calculateBet2(true);
        }
        alert(jsallUpFormulaChangedStr);//to be provided by business user
        invalidBetTypeArr = [];
    }

}

function getOtherTabList(allDateList) {

    let beforeBizDate = getNowDate() > new Date(allDateList[0]);

    let otherDate = new Date();

    if (beforeBizDate) {
        otherDate = new Date(allDateList[0]);
    } else {
        otherDate = getNowDate();
    }

    otherDate.setDate(otherDate.getDate() + (otherLength - 1));

    let dtOther = processToDate(getFormattedDate(otherDate));
    let otherTabList = [];

    for (var i = 0; i < allDateList.length; i++) {
        let dtTab = processToDate(allDateList[i]);
        if (dtTab >= dtOther || otherLength <= 1) {
            otherTabList.push(getFormattedDateStr(allDateList[i]))
        }
    }

    return otherTabList;
}

function getNormalTabList(allDateList) {

    let beforeBizDate = getNowDate() > new Date(allDateList[0]);

    let otherDate = new Date();

    if (beforeBizDate) {
        otherDate = new Date(allDateList[0]);
    } else {
        otherDate = getNowDate();
    }

    otherDate.setDate(otherDate.getDate() + (otherLength - 1));
    
    let dtOther = processToDate(getFormattedDate(otherDate));
    let list = [];

    for (var i = 0; i < allDateList.length; i++) {
        let dtTab = processToDate(allDateList[i]);
        if (dtTab < dtOther && otherLength > 1) {
            list.push(getFormattedDateStr(allDateList[i]))
        }
    }

    return list;
}

function getDateTabList(allDateList) {

    let list = [];

    for (var i = 0; i < allDateList.length; i++) {
        list.push(getFormattedDateStr(allDateList[i]))
    }

    return list;
}

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    let day = date.getDate().toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + '-' + month + '-' + day;
}

function getFormattedDateStr(date) {
    var parts = date.split("-");

    let year = parts[0];
    let month = (parts[1]).toString();
    let day = (parts[2].split("T")[0]).toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + '-' + month + '-' + day;
}

function processToDate(date) {
    var parts = date.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2].split("T")[0]);
}

function getNowDate() {
    let now = new Date(parseInt((new Date()).getTime(), 10) + (parseInt(jsOffsetTime)) * 1000);

    return new Date(processToDate(getFormattedDate(now)));
}

function getAvailabDateListFromMatches(matches) {

    let datelist = [];
    for (var i = 0; i < matches.length; i++) {
        let matchDate = matches[i].matchDate.split("T")[0];
        if ($.inArray(matchDate, datelist) == -1) {
            if(matchDate)
            datelist.push(matchDate);
        }
    }

    return getDateTabList(datelist).sort();
}

function filterAvailableMatch(matches) {

    let availableDateList = getAvailabDateListFromMatches(matches);

    let availableMatches = $.grep(matches, function (match) {
        return $.inArray(match.matchDate.split("T")[0], availableDateList) != -1;
    });

    if (availableMatches == null)
        availableMatches = [];

    return availableMatches;
}

function getAvailableTourn(tournaments) {
    let _availableTournIds = [];
    if (matchDataList == null || tournaments == null)
        return _availableTournIds;

    for (var i = 0; i < matchDataList.length; i++) {
        if ($.inArray(matchDataList[i].tournament.tournamentID, _availableTournIds) == -1)
            _availableTournIds.push(matchDataList[i].tournament.tournamentID);
    }
    return jQuery.grep(tournaments, function (_singleTourn) {
        return $.inArray(_singleTourn.tournamentID, _availableTournIds) != -1;
    });
}

function getTournGroupIdsBytName(tournamentIds) {
    let newSelectedTournamentIds = [];
    for (var i = 0; i < tournamentIds.length; i++) {
        let tempTourn = $.grep(allTournaments, function (tourn) {
            return tourn.tournamentID == tournamentIds[i];
        });

        if (tempTourn != null && tempTourn.length > 0) {

            for (var j = 0; j < tempTourn.length; j++) {
                let sourceTournName = tempTourn[j].tName;
                let tournGroup = $.grep(allTournaments, function (elem) {
                    return elem.tName == sourceTournName;
                });

                if (tournGroup.length > 0) {
                    let arr1 = tournGroup.map(x => x.tournamentID);
                    for (var j = 0; j < arr1.length; j++) {
                        if (jQuery.inArray(arr1[j], newSelectedTournamentIds) == -1) {
                            newSelectedTournamentIds.push(arr1[j]);
                        }
                    }
                }
            }
        }
    }
    return newSelectedTournamentIds;
}

function getAllTournamentIds() {

    let tournaments = allTournaments;
    let tournIdList = [];

    jQuery.grep(tournaments, function (_singleTourn) {
        if ($.inArray(_singleTourn.tournamentID, tournIdList) == -1) {
            tournIdList.push(_singleTourn.tournamentID);
        }
    });

    return tournIdList;
}

function setMatchId(matchId) {

    tMatchID = matchId
    let newUrl = replaceUrlParam(window.location.href, "tmatchid", matchId)
    let param = trimPara2()
    param.tmatchid = matchId;

    if (matchId.length > 0) {

        window.history.replaceState(
            {
                "html": "",
                "pageTitle": document.title,
                "product": curProduct,
                "page": curPageId,
                "lang": curLang,
                "para": param,
            }, "", newUrl);
    }
}

function showTabLoading() {
    $("#tabLoading").show();
}

function hideTabLoading() {
    $("#tabLoading").hide();
}

//# sourceURL=/football/lib/MatchTable.js