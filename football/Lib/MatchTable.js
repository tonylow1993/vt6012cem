'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

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

var _isInplayHADPage = false,
    _isHalfTimePage = false;
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
var couponCount = 0;
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
var dateType = {
    Single: "Single",
    Other: "Others",
    groupMidnight: "groupMidnight",
    groupCur: "groupCur",
    All: "All"
};
var invalidBetTypes = {
    Refund: "refund",
    Suspended: "suspended"
}; // value is lowercase
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
    curPage = isNaN(curPage) ? 1 : curPage; // set curPage to 1 if pageNo is not number
} catch (ex) {}
try {
    if (sessionStorage.getItem("__extendShareSelectedTournsId") === null) {
        sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify([]));
    }
} catch (ex) {}

var NoDataDiv = function(_React$Component) {
    _inherits(NoDataDiv, _React$Component);

    function NoDataDiv() {
        _classCallCheck(this, NoDataDiv);

        return _possibleConstructorReturn(this, (NoDataDiv.__proto__ || Object.getPrototypeOf(NoDataDiv)).apply(this, arguments));
    }

    _createClass(NoDataDiv, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div', {
                    className: 'nopool'
                },
                React.createElement('div', {
                    id: 'noPoolContentMsg',
                    className: 'nopoolmsg'
                })
            );
        }
    }]);

    return NoDataDiv;
}(React.Component);

var OddsTable = function(_React$Component2) {
    _inherits(OddsTable, _React$Component2);

    function OddsTable() {
        _classCallCheck(this, OddsTable);

        return _possibleConstructorReturn(this, (OddsTable.__proto__ || Object.getPrototypeOf(OddsTable)).apply(this, arguments));
    }

    _createClass(OddsTable, [{
        key: 'render',
        value: function render() {
            var coupons = [];
            var tableType = this.props.tableType;
            var oddsTable_tournaments = checkTournamentEmpty(this.props.tournaments);
            var oddsTable_coupons = this.props.coupons;
            var _oddsType = oddsType;

            // check if mdate in other tab
            if (curTabType == tabType.Date) {
                var availableDateList = getAvailabDateListFromMatches(oddsTable_coupons);

                // assign to first date tab if mdate not in available date list
                if ($.inArray(mdate, availableDateList) == -1) {
                    mdate = pageName != "OFM" && availableDateList.length > 0 ? availableDateList[0] : "";
                    selectedTabDateArra = [];
                    selectedTabDateArra.push(mdate);
                }
                var tempOtherTabList = getOtherTabList(availableDateList);
                var inOtherTab = $.inArray(mdate, tempOtherTabList) != -1;
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

            var oddsFooter = React.createElement(OddsTableFooter, {
                tableType: tableType
            });
            return React.createElement(
                'div', {
                    className: 'matchesOddsTable ' + this.props.oddsType + 'Table ' + tableType
                },
                React.createElement(OddsTableHeader, {
                    tableType: tableType,
                    oddsType: this.props.oddsType,
                    tournaments: oddsTable_tournaments,
                    coupons: matchDataList
                }),
                curTabType == tabType.Competition ? oddsTable_tournaments.length > 0 ? coupons : React.createElement(NoDataDiv, null) : coupons,
                curTabType == tabType.Competition ? oddsTable_tournaments.length > 0 ? oddsFooter : null : oddsFooter
            );
        }
    }]);

    return OddsTable;
}(React.Component);

function oddsTabCompetitionTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType) {
    var selectedTournaMatches = [];
    var couponTmpArr = [];
    var tNameMap = [];
    var tournamentData = [];
    var tournamentIds = [];

    // get all availabel date
    var allTabDates = [];
    for (var i = 0; i < oddsTable_coupons.length; i++) {
        if (oddsTable_coupons[i] != undefined && oddsTable_coupons[i].matchDate != undefined) {
            var _matchDate = getFormattedDateStr(oddsTable_coupons[i].matchDate);
            if (jQuery.inArray(_matchDate, allTabDates) == -1) {
                allTabDates.push(_matchDate);
            }
        }
    }

    allTabDates.sort();
    // get available tournment list
    var availabledate = getDateTabList(allTabDates);

    for (var i = 0; i < oddsTable_tournaments.length; i++) {
        var _tourn = oddsTable_tournaments[i];
        for (var j = 0; j < oddsTable_coupons.length; j++) {
            var _matchDate2 = getFormattedDateStr(oddsTable_coupons[j].matchDate);
            if (jQuery.inArray(_matchDate2, availabledate) != -1 && jQuery.inArray(_tourn.tournamentID, tournamentIds) == -1) {
                tournamentIds.push(_tourn.tournamentID);
                tournamentData.push(_tourn);
            }
        }
    }

    if (selectedTournamentIds.length == 0 || selectedTournamentIds.length > 0 && jQuery.inArray(selectedTournamentIds[0], tournamentIds) == -1) {
        selectedTournamentIds.push(tournamentData[0].tournamentID);
    }

    // group tournament id by tournament name
    var _selectedTournamentIds = getTournGroupIdsBytName(selectedTournamentIds);
    //sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify(selectedTournamentIds));

    _selectedTournamentIds.forEach(function(value, index) {
        tournamentData.forEach(function(singleTournament, tounaIndex) {
            if (singleTournament.tournamentID == value) {
                oddsTable_coupons.forEach(function(singleCoupon, couponIndex) {
                    var _matchDate = getFormattedDateStr(singleCoupon.matchDate);
                    if (singleCoupon.tournament.tournamentID == value && jQuery.inArray(_matchDate, availabledate) != -1) {
                        selectedTournaMatches.push(singleCoupon);
                    }
                });
            }
        });
    });

    paginationCalculator([selectedTournaMatches]);

    selectedTournaMatches = selectedTournaMatches.slice(startMatch, endMatch);

    var tempTournNameList = [];

    var matchRow = [];
    var altRow = 0;
    var hasMLMatch = false;
    var couponID = '';
    var couponCount = 0;
    _selectedTournamentIds.forEach(function(value, index) {
        oddsTable_tournaments.forEach(function(singleTournament, tounaIndex) {
            if (singleTournament.tournamentID == value) {
                if (jQuery.inArray(singleTournament.tName, tempTournNameList) == -1) {
                    hasMLMatch = false;
                    matchRow = [];
                    altRow = 0;
                    couponCount++;
                    couponID = 'tgCou' + couponCount;
                }
                selectedTournaMatches.forEach(function(singleCoupon, couponIndex) {
                    var tmpTournamentID = singleCoupon.tournament.tournamentID;
                    if (tmpTournamentID == value) {
                        altRow++;

                        if (isML(_oddsType) && !hasMLMatch && singleCoupon[_oddsType.toLowerCase() + "odds"].LINELIST.length > 1 && !checkInplayLink(singleCoupon, _oddsType, pageName)) {
                            hasMLMatch = true;
                        }

                        if (selectedMatcheId != "0" && selectedMatcheId == singleCoupon.matchID) {
                            curPage = 1;
                            matchRow.push(React.createElement(MatchRow, {
                                altRow: altRow % 2,
                                match: singleCoupon,
                                tournament: singleTournament,
                                key: singleCoupon.matchID,
                                tableType: tableType,
                                couponID: couponID
                            }));
                        } else if (selectedMatcheId == "0") {
                            matchRow.push(React.createElement(MatchRow, {
                                altRow: altRow % 2,
                                match: singleCoupon,
                                tournament: singleTournament,
                                key: singleCoupon.matchID,
                                tableType: tableType,
                                couponID: couponID
                            }));
                        }
                    }
                });
                if (matchRow.length > 0) {

                    var param = {
                        "tName": singleTournament.tName,
                        "matchRow": matchRow,
                        "singleTournament": singleTournament,
                        "key": curPage + singleTournament.tournamentID,
                        "hasMLMatch": hasMLMatch,
                        "couponID": couponID
                    };
                    tempTournNameList.push(singleTournament.tName);
                    tNameMap.push(param);
                } else {
                    couponCount--;
                }
            }
        });
    });

    var actionTNameList = [];

    for (var _i = 0; _i < tNameMap.length; _i++) {
        var tempMatchRow = tNameMap[_i].matchRow;
        if (jQuery.inArray(tNameMap[_i].tName, actionTNameList) == -1) {
            actionTNameList.push(tNameMap[_i].tName);
            //for (let j = 0; j < tNameMap.length; j++) {
            //    if (i != j && tNameMap[i].tName == tNameMap[j].tName) {
            //        tempMatchRow = $.merge(tNameMap[j].matchRow, tempMatchRow);
            //    }
            //}
            var couponNo = parseInt(tempMatchRow[0].props.couponID.replace('tgCou', ''));
            couponTmpArr.push(React.createElement(Coupon, {
                matchRow: tempMatchRow,
                tournament: tNameMap[_i].singleTournament,
                key: tNameMap[_i].key,
                hasMLMatch: tNameMap[_i].hasMLMatch,
                couponID: tNameMap[_i].couponID,
                couponNo: couponNo
            }));
        }
    }

    couponCount = 0;

    return couponTmpArr;
}
// Change the drop-down box event function
function matchOptionChange(oddsList, _matchDay, hasMLMatch, _oddsType) {
    var couponTmpArr = [];

    oddsList.forEach(function(item, index) {
        var couponId = "";
        var cyrPageKey = "";
        if (item.key == selectedMatcheId && groupCurType == dateType.groupCur) {
            couponTmpArr.push(React.createElement(Coupon, {
                matchRow: item,
                matchDay: _matchDay,
                key: curPage + "selectedDate",
                hasMLMatch: hasMLMatch,
                couponID: 'tgCou1'
            }));
        } else if (item.key == selectedMatcheId && groupCurType == dateType.groupMidnight) {
            couponTmpArr.push(React.createElement(Coupon, {
                matchRow: item,
                matchDate: jsaftermidnight,
                matchDateType: 'NextDay',
                matchDay: _matchDay,
                key: curPage + "midNightDate",
                hasMLMatch: hasMLMatch,
                couponID: 'tgCou2'
            }));
        }
    });

    return couponTmpArr;
}

// Load Single data list
function oddsTabDateTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType) {
    var matchRow = [];
    var couponTmpArr = [];
    var _matchDay = void 0;
    var midNightMatchRow = [];
    var ordinaryFeaturedMatchRow = [];
    var topFeaturedMatchRow = [];
    var altRow = 1;
    var altRowMid = 1;
    var dateMatchTournament = void 0;
    if (tableType.toLowerCase().indexOf("presales") >= 0) {
        couponID += "ref";
    }
    if (mdate != "") {
        selectedTabDateArra = [];
        selectedTabDateArra.push(mdate);
    }

    selectedTabDateArra.sort();
    selectedTabDateArra.forEach(function(tabDateItem) {
        var selectedTabDate = tabDateItem;
        var hasMLMatch = false;
        var hasMLMatchNextDay = false;
        oddsTable_coupons.forEach(function(singleCoupon, couponIndex) {
            oddsTable_tournaments.forEach(function(singleTournament, tounaIndex) {
                if (singleTournament.tournamentID == singleCoupon.tournament.tournamentID) {
                    dateMatchTournament = singleTournament;
                }
            });
            var dateMatchRow = void 0;
            var matchDateObj = new Date(singleCoupon.matchDate);
            var matchDateYYYYMMDD = singleCoupon.matchDate.split("T")[0];
            var groupCur = matchDateYYYYMMDD == selectedTabDate;
            var groupNextDay = matchDateObj.getTime() >= getNextDateZeroOclock(selectedTabDate).getTime() && matchDateObj.getTime() <= getNextDate(selectedTabDate).getTime();

            if (groupCur || groupNextDay) {
                var tgCouName = "";
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
                dateMatchRow = React.createElement(MatchRow, {
                    altRow: groupCur ? altRow % 2 : altRowMid % 2,
                    match: singleCoupon,
                    tournament: dateMatchTournament,
                    key: singleCoupon.matchID,
                    tableType: tableType,
                    couponID: tgCouName
                });

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
            var matchRowEndMatchCount = "";
            //end page of the current date
            var matchRowEndPage = "";
            var totalRow = [];
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

            var _matchNum = startMatch + matchRowEndMatchCount;
            if (totalRow.length > 0 && selectedMatcheId != "0") {
                curPage = 1;
                couponTmpArr = matchOptionChange(totalRow, _matchDay, hasMLMatch, _oddsType);
            } else {
                if (pageName == "OFM") {
                    if (topFeaturedMatchRow.length > 0 && (curPage < matchRowEndPage || curPage == matchRowEndPage && matchRowEndMatchCount >= 0 || totalMatch <= maxMatch)) {
                        topFeaturedMatchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch && curPage == matchRowEndPage ? totalRow.slice(startMatch, _matchNum) : totalRow.slice(startMatch, endMatch);
                        couponTmpArr.push(React.createElement(Coupon, {
                            matchRow: topFeaturedMatchRow,
                            matchDate: jstopfeaturedmatches,
                            matchDateType: 'NextDay',
                            matchDay: _matchDay,
                            key: curPage + "topFeaturedMatch",
                            hasMLMatch: hasMLMatch,
                            couponID: 'tgCou4',
                            couponNo: 4
                        }));
                    }
                    if (ordinaryFeaturedMatchRow.length > 0 && (curPage > matchRowEndPage || curPage == matchRowEndPage && matchRowEndMatchCount > 0 || totalMatch <= maxMatch)) {
                        ordinaryFeaturedMatchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch && curPage == matchRowEndPage ? totalRow.slice(_matchNum, endMatch) : totalRow.slice(startMatch, endMatch);
                        couponTmpArr.push(React.createElement(Coupon, {
                            matchRow: ordinaryFeaturedMatchRow,
                            matchDate: jsordinaryfeaturedmatches,
                            matchDateType: 'NextDay',
                            matchDay: _matchDay,
                            key: curPage + "OrdinaryFeaturedMatches",
                            hasMLMatch: hasMLMatch,
                            couponID: 'tgCou3',
                            couponNo: 3
                        }));
                    }
                } else {

                    if (matchRow.length > 0 && (curPage < matchRowEndPage || curPage == matchRowEndPage && matchRowEndMatchCount >= 0 || totalMatch <= maxMatch)) {
                        matchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch && curPage == matchRowEndPage ? totalRow.slice(startMatch, _matchNum) : totalRow.slice(startMatch, endMatch);
                        couponTmpArr.push(React.createElement(Coupon, {
                            matchRow: matchRow,
                            matchDate: selectedTabDateFormat,
                            matchDateType: 'CurrentDay',
                            matchDay: _matchDay,
                            key: curPage + "selectedDate",
                            hasMLMatch: hasMLMatch,
                            couponID: 'tgCou1',
                            couponNo: 1
                        }));
                    }

                    if (midNightMatchRow.length > 0 && (curPage > matchRowEndPage || curPage == matchRowEndPage && matchRowEndMatchCount > 0 || totalMatch <= maxMatch)) {
                        midNightMatchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch && curPage == matchRowEndPage ? totalRow.slice(_matchNum, endMatch) : totalRow.slice(startMatch, endMatch);
                        couponTmpArr.push(React.createElement(Coupon, {
                            matchRow: midNightMatchRow,
                            matchDate: selectedNextDateFormat,
                            matchDateType: 'NextDay',
                            matchDay: getNextMatchDay(_matchDay),
                            key: curPage + "midNightDate",
                            hasMLMatch: hasMLMatchNextDay,
                            couponID: 'tgCou2',
                            couponNo: 2
                        }));
                    }
                }
            }
        }
    });

    return couponTmpArr;
}

// Load "other" data list
function oddsTabOtherDateTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType) {
    var otherDateMatches = [];
    var couponTmpArr = [];

    if (curDateType == dateType.All) {
        selectedTabDateArra = [];
        oddsTable_coupons.forEach(function(singleCoupon, couponIndex) {
            var couponMatchDate = singleCoupon.matchDate.split("T")[0];
            if (jQuery.inArray(couponMatchDate, selectedTabDateArra) === -1) {
                selectedTabDateArra.push(couponMatchDate);
            }
        });
    }

    if (pageName == "MIXALLUPLIST" && curTabType != tabType.Feature) selectedTabDateArra.sort();

    oddsTable_coupons.forEach(function(singleCoupon, couponIndex) {
        selectedTabDateArra.forEach(function(singleSelectedDate) {
            var couponMatchDate = singleCoupon.matchDate.split("T")[0];
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
    var _matchDay = void 0;
    var altRow = 1;
    var altRowMid = 1;
    var hasMLMatch = false;
    var dateMatchTournament = void 0;
    var ordinaryFeaturedMatchRow = [];
    var topFeaturedMatchRow = [];
    couponCount = 0;
    if (curDateType != dateType.All || pageName == "MIXALLUPLIST" && curDateType == dateType.All) {

        selectedTabDateArra.forEach(function(tabDateItem) {
            hasMLMatch = false;
            var selectedTabDate = tabDateItem;
            var ofmSum = "1";
            var couponID = 'tgCou' + ++couponCount;
            var otherMatchRow = [];
            if (tableType.toLowerCase().indexOf("presales") >= 0) {
                couponID += "ref";
            }
            otherDateMatches.forEach(function(singleCoupon, couponIndex) {
                var couponMatchDate = singleCoupon.matchDate.split("T")[0];
                if (couponMatchDate == tabDateItem) {
                    _matchDay = singleCoupon.matchDay;
                    oddsTable_tournaments.forEach(function(singleTournament, tounaIndex) {
                        if (singleTournament.tournamentID == singleCoupon.tournament.tournamentID) {
                            dateMatchTournament = singleTournament;
                        }
                    });

                    if (isML(_oddsType) && !hasMLMatch && singleCoupon[_oddsType.toLowerCase() + "odds"].LINELIST.length > 1 && !checkInplayLink(singleCoupon, _oddsType, pageName)) {
                        hasMLMatch = true;
                    }
                    var dateMatchRow = void 0;
                    if (pageName == "OFM") {
                        if (singleCoupon.featureMatch == null || singleCoupon.featureMatch.topPriority == null || singleCoupon.featureMatch.topPriority == "false") {
                            dateMatchRow = React.createElement(MatchRow, {
                                altRow: altRow % 2,
                                match: singleCoupon,
                                tournament: dateMatchTournament,
                                key: singleCoupon.matchID,
                                tableType: tableType,
                                couponID: "tgCouordinaryId"
                            });
                            ordinaryFeaturedMatchRow.push(dateMatchRow);
                            altRow++;
                        } else if (singleCoupon.featureMatch.topPriority == "true") {
                            dateMatchRow = React.createElement(MatchRow, {
                                altRow: altRowMid % 2,
                                match: singleCoupon,
                                tournament: dateMatchTournament,
                                key: singleCoupon.matchID,
                                tableType: tableType,
                                couponID: "tgCoutopFeaturedId"
                            });
                            topFeaturedMatchRow.push(dateMatchRow);
                            altRowMid++;
                        }
                    } else {
                        dateMatchRow = React.createElement(MatchRow, {
                            altRow: altRow % 2,
                            match: singleCoupon,
                            tournament: dateMatchTournament,
                            key: singleCoupon.matchID,
                            tableType: tableType,
                            couponID: couponID
                        });
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
                    var selectedTabDateObj = new Date(selectedTabDate);
                    couponTmpArr.push(React.createElement(Coupon, {
                        matchRow: otherMatchRow,
                        matchDate: selectedTabDateFormat,
                        matchDateType: 'CurrentDay',
                        matchDay: _matchDay,
                        key: selectedTabDateObj.getTime(),
                        hasMLMatch: hasMLMatch,
                        couponID: couponID,
                        couponNo: couponCount
                    }));
                }
            }
        });
    } else {

        otherDateMatches.forEach(function(singleCoupon, couponIndex) {

            var ofmSum = "1";
            var selectedTabDate = "";
            var couponID = 'tgCou' + ++couponCount;
            var otherMatchRow = [];
            if (tableType.toLowerCase().indexOf("presales") >= 0) {
                couponID += "ref";
            }

            selectedTabDateArra.forEach(function(tabDateItem) {

                selectedTabDate = tabDateItem;
                var couponMatchDate = singleCoupon.matchDate.split("T")[0];
                if (couponMatchDate == tabDateItem) {
                    _matchDay = singleCoupon.matchDay;
                    oddsTable_tournaments.forEach(function(singleTournament, tounaIndex) {
                        if (singleTournament.tournamentID == singleCoupon.tournament.tournamentID) {
                            dateMatchTournament = singleTournament;
                        }
                    });

                    if (isML(_oddsType) && !hasMLMatch && singleCoupon[_oddsType.toLowerCase() + "odds"].LINELIST.length > 1 && !checkInplayLink(singleCoupon, _oddsType, pageName)) {
                        hasMLMatch = true;
                    }
                    var dateMatchRow = void 0;
                    if (pageName == "OFM") {
                        if (singleCoupon.featureMatch == null || singleCoupon.featureMatch.topPriority == null || singleCoupon.featureMatch.topPriority == "false") {
                            dateMatchRow = React.createElement(MatchRow, {
                                altRow: altRow % 2,
                                match: singleCoupon,
                                tournament: dateMatchTournament,
                                key: singleCoupon.matchID,
                                tableType: tableType,
                                couponID: "tgCouordinaryId"
                            });
                            ordinaryFeaturedMatchRow.push(dateMatchRow);
                            altRow++;
                        } else if (singleCoupon.featureMatch.topPriority == "true") {
                            dateMatchRow = React.createElement(MatchRow, {
                                altRow: altRowMid % 2,
                                match: singleCoupon,
                                tournament: dateMatchTournament,
                                key: singleCoupon.matchID,
                                tableType: tableType,
                                couponID: "tgCoutopFeaturedId"
                            });
                            topFeaturedMatchRow.push(dateMatchRow);
                            altRowMid++;
                        }
                    } else {
                        dateMatchRow = React.createElement(MatchRow, {
                            altRow: altRow % 2,
                            match: singleCoupon,
                            tournament: dateMatchTournament,
                            key: singleCoupon.matchID,
                            tableType: tableType,
                            couponID: couponID
                        });
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
                    var selectedTabDateObj = new Date(selectedTabDate);
                    couponTmpArr.push(React.createElement(Coupon, {
                        matchRow: otherMatchRow,
                        matchDate: selectedTabDateFormat,
                        matchDateType: 'CurrentDay',
                        matchDay: _matchDay,
                        key: selectedTabDateObj.getTime(),
                        hasMLMatch: hasMLMatch,
                        couponID: couponID,
                        couponNo: couponCount
                    }));
                }
            }
        });
    }

    couponCount = 0;
    return couponTmpArr;
}

// Load "All" Featured Matches data list
function oddsTabAllFeaturedMatchesDateTable(tableType, oddsTable_tournaments, oddsTable_coupons, _oddsType) {
    var otherDateMatches = [];
    var couponTmpArr = [];

    selectedTabDateArra = [];
    var dt = new Date();
    dt.setTime(dt.getTime() + jsOffsetTime * 1000);
    oddsTable_coupons.forEach(function(singleCoupon, couponIndex) {
        if (singleCoupon.featureMatch != null && (singleCoupon.featureMatch.startTime == null || dt >= new Date(singleCoupon.featureMatch.startTime))) {
            var couponMatchDate = singleCoupon.matchDate.split("T")[0];
            if (jQuery.inArray(couponMatchDate, selectedTabDateArra) === -1) {
                selectedTabDateArra.push(couponMatchDate);
            }
            otherDateMatches.push(singleCoupon);
        }
    });

    otherDateMatches.sort(function(x, y) {
        if (x.featureMatch.seq < y.featureMatch.seq) {
            return -1;
        } else if (x.featureMatch.seq > y.featureMatch.seq) {
            return 1;
        }
        return 0;
    });

    var _matchDay = void 0;
    var altRow = 1;
    var altRowMid = 1;
    var hasMLMatch = false;
    var dateMatchTournament = void 0;
    var ordinaryFeaturedMatchRow = [];
    var topFeaturedMatchRow = [];

    otherDateMatches.forEach(function(singleCoupon, couponIndex) {
        var couponID = 'tgCou' + ++couponCount;
        var otherMatchRow = [];
        hasMLMatch = false;

        if (tableType.toLowerCase().indexOf("presales") >= 0) {
            couponID += "ref";
        }
        selectedTabDateArra.forEach(function(tabDateItem) {
            var couponMatchDate = singleCoupon.matchDate.split("T")[0];

            if (couponMatchDate == tabDateItem) {
                oddsTable_tournaments.forEach(function(singleTournament, tounaIndex) {
                    if (singleTournament.tournamentID == singleCoupon.tournament.tournamentID) {
                        dateMatchTournament = singleTournament;
                    }
                });

                if (isML(_oddsType) && !hasMLMatch && singleCoupon[_oddsType.toLowerCase() + "odds"].LINELIST.length > 1 && !checkInplayLink(singleCoupon, _oddsType, pageName)) {
                    hasMLMatch = true;
                }
                var dateMatchRow = React.createElement(MatchRow, {
                    altRow: altRow % 2,
                    match: singleCoupon,
                    tournament: dateMatchTournament,
                    key: singleCoupon.matchID,
                    tableType: tableType,
                    couponID: "tgCouordinaryId"
                });
                ordinaryFeaturedMatchRow.push(dateMatchRow);
                altRow++;
            }
        });
        couponTmpArr = getOFMTableList(topFeaturedMatchRow, ordinaryFeaturedMatchRow, _matchDay, hasMLMatch);
    });

    couponCount = 0;

    return couponTmpArr;
}

function getOFMTableList(topFeaturedMatchRow, ordinaryFeaturedMatchRow, _matchDay, hasMLMatch) {
    var couponTmpArr = [];
    //The number of matches on the last page of matches for the current date
    var matchRowEndMatchCount = "";
    //end page of the current date
    var matchRowEndPage = "";
    var totalRow = [];

    paginationCalculator([topFeaturedMatchRow, ordinaryFeaturedMatchRow]);
    matchRowEndMatchCount = topFeaturedMatchRow.length % maxMatch;
    //end page of the current date
    matchRowEndPage = Math.ceil(topFeaturedMatchRow.length / maxMatch);
    totalRow = [].concat.apply(topFeaturedMatchRow, ordinaryFeaturedMatchRow);

    var matchNum = startMatch + matchRowEndMatchCount;
    if (totalRow.length > 0 && selectedMatcheId != "0") {
        curPage = 1;
        couponTmpArr = matchOptionChange(totalRow, _matchDay, hasMLMatch, _oddsType);
    } else {
        if (topFeaturedMatchRow.length > 0 && (curPage < matchRowEndPage || curPage == matchRowEndPage && matchRowEndMatchCount >= 0 || totalMatch <= maxMatch)) {
            topFeaturedMatchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch && curPage == matchRowEndPage ? totalRow.slice(startMatch, matchNum) : totalRow.slice(startMatch, endMatch);
            couponTmpArr.push(React.createElement(Coupon, {
                matchRow: topFeaturedMatchRow,
                matchDate: jstopfeaturedmatches,
                matchDateType: 'NextDay',
                matchDay: _matchDay,
                key: curPage + "topFeaturedMatch",
                hasMLMatch: hasMLMatch,
                couponID: 'tgCoutopFeaturedId'
            }));
        }
        if (ordinaryFeaturedMatchRow.length > 0 && (curPage > matchRowEndPage || curPage == matchRowEndPage && matchRowEndMatchCount > 0 || totalMatch <= maxMatch)) {
            ordinaryFeaturedMatchRow = matchRowEndMatchCount > 0 && matchRowEndMatchCount < maxMatch && curPage == matchRowEndPage ? totalRow.slice(matchNum, endMatch) : totalRow.slice(startMatch, endMatch);
            couponTmpArr.push(React.createElement(Coupon, {
                matchRow: ordinaryFeaturedMatchRow,
                matchDate: jsordinaryfeaturedmatches,
                matchDateType: 'NextDay',
                matchDay: _matchDay,
                key: curPage + "OrdinaryFeaturedMatches",
                hasMLMatch: hasMLMatch,
                couponID: 'tgCouordinaryId'
            }));
        }
    }
    return couponTmpArr;
}

var OddsTableHeader = function(_React$Component3) {
    _inherits(OddsTableHeader, _React$Component3);

    function OddsTableHeader() {
        _classCallCheck(this, OddsTableHeader);

        return _possibleConstructorReturn(this, (OddsTableHeader.__proto__ || Object.getPrototypeOf(OddsTableHeader)).apply(this, arguments));
    }

    _createClass(OddsTableHeader, [{
        key: 'render',
        value: function render() {

            // Screening date
            var coupsonList = this.props.coupons; //removeRepeat(this.props.coupons);
            if (this.props.oddsType.match(/^(SPC|CRS|FCS|FGS|DHCP|CHP|ALL)$/)) {
                // WUCHeader
                return React.createElement(
                    'div',
                    null,
                    React.createElement(OddsTableInfo, {
                        tableType: this.props.tableType,
                        oddsType: this.props.oddsType
                    }),
                    React.createElement(
                        'div', {
                            id: 'oddAllUpCalDiv'
                        },
                        React.createElement(OddsTableAllUpCalculator, null)
                    ),
                    React.createElement(OddsTableDateTournTab, {
                        OddsTableTournaments: this.props.tournaments,
                        OddsTableMatches: coupsonList,
                        oddsType: this.props.oddsType
                    }),
                    React.createElement(MatchSelectList, {
                        OddsTableTournaments: this.props.tournaments,
                        OddsTableMatches: this.props.coupons
                    }),
                    React.createElement(PageInfo, {
                        type: 'header'
                    }),
                    React.createElement(ColumnTitle, null)
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(OddsTableInfo, {
                        tableType: this.props.tableType,
                        oddsType: this.props.oddsType
                    }),
                    pageName == "MIXALLUPLIST" ? null : React.createElement(
                        'div', {
                            id: 'oddAllUpCalDiv'
                        },
                        React.createElement(OddsTableAllUpCalculator, null)
                    ),
                    pageName == "OFM" ? null : React.createElement(OddsTableDateTournTab, {
                        OddsTableTournaments: this.props.tournaments,
                        OddsTableMatches: coupsonList,
                        oddsType: this.props.oddsType
                    }),
                    curTabType == tabType.Competition ? this.props.tournaments.length > 0 ? React.createElement(PageInfo, {
                        type: 'header'
                    }) : null : React.createElement(PageInfo, {
                        type: 'header'
                    }),
                    curTabType == tabType.Competition ? this.props.tournaments.length > 0 ? React.createElement(ColumnTitle, null) : null : React.createElement(ColumnTitle, null)
                );
            }
        }
    }]);

    return OddsTableHeader;
}(React.Component);

var OddsTableAllUpCalculator = function(_React$Component4) {
    _inherits(OddsTableAllUpCalculator, _React$Component4);

    function OddsTableAllUpCalculator(props) {
        _classCallCheck(this, OddsTableAllUpCalculator);

        var _this4 = _possibleConstructorReturn(this, (OddsTableAllUpCalculator.__proto__ || Object.getPrototypeOf(OddsTableAllUpCalculator)).call(this, props));

        divCalErrMsg = '';
        _this4.state = {
            expand: getDataArr().length > 0,
            unitBet: parseInt(getDivCalUnitbet("ALUPX")),
            validUnitBet: true,
            formulaIdx: _this4.props.formulaIdx == null ? 0 : _this4.props.formulaIdx
        };
        _this4.onItemClick = _this4.onItemClick.bind(_this4);
        return _this4;
    }

    _createClass(OddsTableAllUpCalculator, [{
        key: 'onItemClick',
        value: function onItemClick(event) {
            this.setState({
                expand: !this.state.expand
            });
        }
    }, {
        key: 'onUpdateUnitBet',
        value: function onUpdateUnitBet(e) {
            divCalErrMsg = '';
            if (chkAmount(e, 0)) {
                this.setState({
                    unitBet: parseInt(e.target.value),
                    validUnitBet: true
                });
            } else if (e.target.value == '') {
                this.setState({
                    unitBet: '',
                    validUnitBet: false
                });
            }
        }
    }, {
        key: 'onBlurUnitBet',
        value: function onBlurUnitBet(e) {
            if (!chkAmount(e, 10)) {
                alert(jsunitbeterror);
                this.setState({
                    unitBet: parseInt(getDefaultAmount("ALUPX")),
                    validUnitBet: true
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var para = dataStore.getItem("tmpAllupBetline");
            if (para != null && para != '') {
                var isAddedEntry = tryAddArr(JSON.parse(para));
                dataStore.removeItem("tmpAllupBetline");
                this.setState({
                    expand: true,
                    formulaIdx: 0
                });
            }

            var dataArr = getDataArr();
            var hasLine = hasLinePools();
            var widthStyles = [91, 60, 215, 0, 67, 75, 85, 60];
            if (hasLine) widthStyles = [91, 60, 130, 79, 67, 75, 85, 60];

            var dCalTable = [];
            var dCalRes = [];
            if (dataArr.length > 0) {
                dCalTable.push(React.createElement(
                    'div', {
                        className: 'divCalRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'divCalTableHead',
                            style: {
                                width: widthStyles[0] + 'px'
                            }
                        },
                        jsdivcal_type
                    ),
                    React.createElement(
                        'div', {
                            className: 'divCalTableHead',
                            style: {
                                textAlign: 'left',
                                width: widthStyles[1] + 'px'
                            }
                        },
                        jsoddstable_eventid
                    ),
                    React.createElement(
                        'div', {
                            className: 'divCalTableHead',
                            style: {
                                width: widthStyles[2] + 'px'
                            }
                        },
                        jsteams1,
                        React.createElement('br', null),
                        jsteams2
                    ),
                    hasLine ? React.createElement(
                        'div', {
                            className: 'divCalTableHead',
                            style: {
                                width: widthStyles[3] + 'px'
                            }
                        },
                        jsdivcal_line
                    ) : null,
                    React.createElement(
                        'div', {
                            className: 'divCalTableHead',
                            style: {
                                width: widthStyles[4] + 'px'
                            }
                        },
                        jsdivcal_selection
                    ),
                    React.createElement(
                        'div', {
                            className: 'divCalTableHead',
                            style: {
                                width: widthStyles[5] + 'px'
                            }
                        },
                        jsdivcal_odds
                    ),
                    React.createElement(
                        'div', {
                            className: 'divCalTableHead',
                            style: {
                                width: widthStyles[6] + 'px'
                            }
                        },
                        jsdivcal_results
                    ),
                    React.createElement(
                        'div', {
                            className: 'divCalTableHead',
                            style: {
                                width: widthStyles[7] + 'px'
                            }
                        },
                        jsdivcal_delete
                    )
                ));

                var bgColor = ['divCalTableBg1', 'divCalTableBg2'];
                for (var i = 0; i < dataArr.length; i++) {
                    var pool = dataArr[i][1];
                    var isLinePool = pool.match(/^(HIL|EHL|FHL|CHL|ECH)$/);
                    var winSel = null;
                    var delBtn = drawDelBtn(this, i);
                    if (pool.match(/^(HDC|EDC)$/)) {
                        winSel = drawHDCSelect(this, dataArr[i], i);
                    } else if (isLinePool) {
                        winSel = drawHILSelect(this, dataArr[i], i);
                    } else {
                        winSel = drawWinLossIcon(this, dataArr[i], i);
                    }

                    var itemGoalNo = '';
                    if (pool.match(/^(NTS|ENT)$/)) {
                        itemGoalNo = getGoalNoByItemNo(dataArr[i][23], curLang);
                    }

                    dCalTable.push(React.createElement(
                        'div', {
                            className: 'divCalRow'
                        },
                        React.createElement(
                            'div', {
                                className: 'divCalTableCellLeft ' + bgColor[i % 2]
                            },
                            GetResourcesByLang(pool, curLang),
                            itemGoalNo
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalTableCellLeft ' + bgColor[i % 2]
                            },
                            dataArr[i][3]
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalTableCellLeft ' + bgColor[i % 2]
                            },
                            getTeamVs(dataArr[i])
                        ),
                        hasLine ? React.createElement(
                            'div', {
                                className: 'divCalTableCellCenter ' + bgColor[i % 2]
                            },
                            isLinePool ? '[' + dataArr[i][12] + ']' : '-'
                        ) : null,
                        React.createElement(
                            'div', {
                                className: 'divCalTableCellCenter ' + bgColor[i % 2]
                            },
                            curLang == 'ch' ? dataArr[i][6] : dataArr[i][5]
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalTableCellCenter ' + bgColor[i % 2]
                            },
                            React.createElement(
                                'span', {
                                    className: 'red'
                                },
                                dataArr[i][4]
                            )
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalTableCellCenter ' + bgColor[i % 2]
                            },
                            winSel
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalTableCellCenter ' + bgColor[i % 2]
                            },
                            delBtn
                        )
                    ));
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
                combArr = tmp.split('#'); //if 3x7, 1#2#3#12#13#23#123
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
                                if (tmpLine[k] == 'W') factor += 0.5 * parseFloat(dataArr[idx][4]);
                                else factor += 0.5 * parseFloat(tmpLine[k]);
                            }
                        } else {
                            if (dataArr[idx][17] == 'W') factor = parseFloat(dataArr[idx][4]);
                            else factor = parseFloat(dataArr[idx][17]);
                        }
                        tmpDiv *= factor;
                    }
                    if (tmpDiv > 0) winningBet++;
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

            totalInv = totalInv == '-' ? totalInv : '$' + totalInv;
            totalAmount = totalAmount == '-' ? totalAmount : '$' + totalAmount;
            netReturn = netReturn == '-' ? netReturn : '$' + netReturn;

            dCalRes.push(React.createElement(
                'div', {
                    style: {
                        width: "634px"
                    }
                },
                React.createElement(
                    'div', {
                        style: {
                            float: "left",
                            width: "80%"
                        }
                    },
                    React.createElement(
                        'div', {
                            className: 'divCalRow'
                        },
                        React.createElement(
                            'div', {
                                style: {
                                    display: "table-cell",
                                    width: "100px"
                                }
                            },
                            jsformula
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    display: "table-cell",
                                    width: "90px"
                                }
                            },
                            jsunitbet,
                            ' $'
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultHeadCell',
                                style: {
                                    width: "60px"
                                }
                            },
                            jsbet
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultHeadCell',
                                style: {
                                    width: "92px"
                                }
                            },
                            jstotalinvestment
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultHeadCell',
                                style: {
                                    width: "80px"
                                }
                            },
                            jsmaxDividend
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultHeadCell',
                                style: {
                                    width: "93px"
                                }
                            },
                            jsmaxNetReturn
                        )
                    ),
                    React.createElement(
                        'div', {
                            className: 'divCalRow'
                        },
                        React.createElement(
                            'div', {
                                style: {
                                    display: "table-cell"
                                }
                            },
                            drawDivCalFormulaDropdown(this)
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    display: "table-cell"
                                }
                            },
                            React.createElement('input', {
                                id: 'calDivUnitbet',
                                value: this.state.unitBet,
                                maxLength: '6',
                                onChange: function onChange(e) {
                                    _this5.onUpdateUnitBet(e);
                                },
                                onBlur: function onBlur(e) {
                                    _this5.onBlurUnitBet(e);
                                },
                                className: 'allup_calculator_input'
                            })
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultCell'
                            },
                            noOfComb
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultCell'
                            },
                            totalInv
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultCell'
                            },
                            totalAmount
                        ),
                        React.createElement(
                            'div', {
                                className: netReturnStyle
                            },
                            netReturn
                        )
                    )
                ),
                React.createElement(
                    'div', {
                        style: {
                            float: "right",
                            width: "20%",
                            padding: "5px 0px 0px 0px"
                        }
                    },
                    React.createElement('div', {
                        className: 'addBet',
                        onClick: function onClick() {
                            addDivCalBS();
                        },
                        title: jsaddSlip
                    })
                ),
                React.createElement('div', {
                    style: {
                        clear: "both"
                    }
                })
            ));

            return React.createElement(
                'div', {
                    className: "allUpCalDiv"
                },
                React.createElement(
                    'div', {
                        className: 'tgAlupCalCoupon',
                        id: 'divCalCoupon',
                        onClick: this.onItemClick
                    },
                    React.createElement('span', {
                        className: this.state.expand ? "divCalBtnMinus" : "divCalBtnPlus"
                    }),
                    React.createElement(
                        'span', {
                            style: {
                                fontWeight: "bold"
                            }
                        },
                        jsAllupCalculator
                    )
                ),
                this.state.expand ? React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div', {
                            id: 'divCalTable'
                        },
                        dCalTable
                    ),
                    React.createElement(
                        'div', {
                            id: 'divCalResult'
                        },
                        dCalRes
                    ),
                    React.createElement(
                        'div', {
                            id: 'divCalMsg',
                            style: {
                                padding: "0px 0px 0px 5px"
                            }
                        },
                        divCalErrMsg
                    ),
                    React.createElement(
                        'div', {
                            className: 'divCalButton'
                        },
                        React.createElement('div', {
                            className: 'divCalResetBtn',
                            onClick: function onClick() {
                                return deleteDivCalData(_this5);
                            },
                            title: jsreset
                        }),
                        React.createElement('div', {
                            className: 'clear:both'
                        })
                    )
                ) : null
            );
        }
    }]);

    return OddsTableAllUpCalculator;
}(React.Component);

var OddsTableDateTournTab = function(_React$Component5) {
    _inherits(OddsTableDateTournTab, _React$Component5);

    function OddsTableDateTournTab(props) {
        _classCallCheck(this, OddsTableDateTournTab);

        var _this6 = _possibleConstructorReturn(this, (OddsTableDateTournTab.__proto__ || Object.getPrototypeOf(OddsTableDateTournTab)).call(this, props));

        var tournExp = location.href.match(new RegExp("&tournid=[\\da-z]+"));
        var isExpandTourn = false;
        if (tournExp != null && tournExp.length > 0) {
            isExpandTourn = tournExp[0].split("=")[1].toLowerCase() == "all";
        }
        _this6.state = {
            defaultShowCount: 16,
            expandTourn: isExpandTourn
        };
        return _this6;
    }

    _createClass(OddsTableDateTournTab, [{
        key: 'onClickExpandTournBtn',
        value: function onClickExpandTournBtn() {
            this.setState({
                expandTourn: !this.state.expandTourn
            });
        }
    }, {
        key: 'renderMoreBtn',
        value: function renderMoreBtn(totalTournamentCount) {
            var _this7 = this;

            var showShowallBtn = totalTournamentCount > this.state.defaultShowCount ? {
                display: ""
            } : {
                display: "none"
            };

            if (this.state.expandTourn) {
                return React.createElement(
                    'p', {
                        style: showShowallBtn,
                        className: 'more',
                        onClick: function onClick() {
                            return _this7.onClickExpandTournBtn();
                        }
                    },
                    React.createElement(
                        'span',
                        null,
                        ' ',
                        jsoddstab_hide,
                        ' \u25B2'
                    )
                );
            } else {
                return React.createElement(
                    'p', {
                        style: showShowallBtn,
                        className: 'more',
                        onClick: function onClick() {
                            return _this7.onClickExpandTournBtn();
                        }
                    },
                    React.createElement(
                        'span',
                        null,
                        ' ',
                        jsoddstab_showall,
                        ' \u25BC'
                    )
                );
            }
        }
    }, {
        key: 'onClickSelectAll',
        value: function onClickSelectAll() {
            selectAllTournaments();
            this.setState({
                expandTourn: true
            });
        }
    }, {
        key: 'onClickReset',
        value: function onClickReset() {
            resetTournaments();
            this.setState({
                expandTourn: false
            });
        }
    }, {
        key: 'renderTournAllBtn',
        value: function renderTournAllBtn() {
            var _this8 = this;

            return React.createElement(
                'div', {
                    className: 'btn_submit f_clear'
                },
                React.createElement(
                    'p', {
                        className: 'btn_left'
                    },
                    React.createElement(
                        'span', {
                            id: 'oddstab_selectall',
                            onClick: function onClick() {
                                return _this8.onClickSelectAll();
                            }
                        },
                        jsoddstab_selectall
                    ),
                    '\xA0\xA0\xA0\xA0',
                    React.createElement(
                        'span', {
                            id: 'oddstab_reset',
                            onClick: function onClick() {
                                return _this8.onClickReset();
                            }
                        },
                        jsoddstab_reset
                    )
                ),
                React.createElement(
                    'p', {
                        className: 'btn_right'
                    },
                    React.createElement(
                        'span', {
                            id: 'oddstab_searchbtn'
                        },
                        jsoddstab_searchbtn
                    )
                )
            );
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {

            var onfocusTournTab = $("span[class=cur]").attr("data-value") == "1" ? false : true;
            if (!onfocusTournTab && this.state.expandTourn) {
                this.setState({
                    expandTourn: false
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.state.expandTourn) {
                selectAllTournaments();
            }

            if ($(".second_ul input:checked").length > 0) {
                this.setState({
                    expandTourn: true
                });
                $(".second_ul").show();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var TournamentSpans = [];
            var TournamentSecondSpans = [];
            var TournamentRows = [];
            var TournamentSecondRows = [];
            var MatcheList = [];
            var tournamentBoxCount = 1;
            var tournaRowCount = 1;
            var tournamentData = [];
            var tournamentIds = [];
            var allTabDates = [];
            var defaultShowCount = this.state.defaultShowCount;

            if (pageName == "TQL") {
                tournamentData = this.props.OddsTableTournaments;
            } else if (pageName == "CHP") {
                tournamentData = jQuery.grep(this.props.OddsTableTournaments, function(item) {

                    // hidden Comprtions tab on Champion page which CHP sub type is not null or CHP sub type is not 0
                    var hasCHPSubType = item.chpodds.CHPType == chpSubType || chpSubType == '0' ? true : false;

                    if (hasCHPSubType) {
                        return true;
                    }
                });
            } else {
                for (var i = 0; i < this.props.OddsTableMatches.length; i++) {
                    var _poolcloseDate = "";
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

                    var _tourn = this.props.OddsTableTournaments[i];

                    for (var j = 0; j < this.props.OddsTableMatches.length; j++) {

                        var _match = this.props.OddsTableMatches[j];
                        var _tournId = "";

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
            var tempTournNameList = [];
            tournamentData.forEach(function(item) {

                if (jQuery.inArray(item.tName, tempTournNameList) == -1) {
                    tempTournNameList.push(item.tName);

                    // R0a : check sessionStorage if tournmentID match.
                    var tmpSessionSelectedTournmentIds = JSON.parse(sessionStorage.getItem("__extendShareSelectedTournsId"));
                    if (tmpSessionSelectedTournmentIds == null) tmpSessionSelectedTournmentIds = [];

                    if (tournamentBoxCount <= defaultShowCount) {
                        if (tournamentBoxCount == 1 && selectedTournamentIds.length == 0) {
                            TournamentSpans.push(React.createElement(TournamentSpan, {
                                key: tournamentBoxCount,
                                tournaments: item,
                                selected: 'cur'
                            }));
                        } else if (selectedTournamentIds.length > 0 && jQuery.inArray(item.tournamentID, selectedTournamentIds) !== -1) {
                            TournamentSpans.push(React.createElement(TournamentSpan, {
                                key: tournamentBoxCount,
                                tournaments: item,
                                selected: 'cur'
                            }));
                        } else if (tmpSessionSelectedTournmentIds.length > 0 && jQuery.inArray(item.tournamentID, tmpSessionSelectedTournmentIds) !== -1) {
                            TournamentSpans.push(React.createElement(TournamentSpan, {
                                key: tournamentBoxCount,
                                tournaments: item,
                                selected: 'cur'
                            }));
                        } else {
                            TournamentSpans.push(React.createElement(TournamentSpan, {
                                key: tournamentBoxCount,
                                tournaments: item,
                                selected: ''
                            }));
                        }
                    } else {
                        if (tournamentBoxCount == 1 && selectedTournamentIds.length == 0) {
                            TournamentSecondSpans.push(React.createElement(TournamentSpan, {
                                key: tournamentBoxCount,
                                tournaments: item,
                                selected: 'cur'
                            }));
                        } else if (selectedTournamentIds.length > 0 && jQuery.inArray(item.tournamentID, selectedTournamentIds) !== -1) {
                            TournamentSecondSpans.push(React.createElement(TournamentSpan, {
                                key: tournamentBoxCount,
                                tournaments: item,
                                selected: 'cur'
                            }));
                        } else if (tmpSessionSelectedTournmentIds.length > 0 && jQuery.inArray(item.tournamentID, tmpSessionSelectedTournmentIds) !== -1) {
                            TournamentSecondSpans.push(React.createElement(TournamentSpan, {
                                key: tournamentBoxCount,
                                tournaments: item,
                                selected: 'cur'
                            }));
                        } else {
                            TournamentSecondSpans.push(React.createElement(TournamentSpan, {
                                key: tournamentBoxCount,
                                tournaments: item,
                                selected: ''
                            }));
                        }
                    }
                    if (tournamentBoxCount % 4 == 0 && tournamentBoxCount <= defaultShowCount || tournamentBoxCount == totalTournamentCount) {
                        TournamentRows.push(React.createElement(TournamentRow, {
                            key: tournaRowCount,
                            fourTournaments: TournamentSpans,
                            classStr: 'f_clear js_selectCompetitionNav'
                        }));
                        TournamentSpans = [];
                        tournaRowCount++;
                    }
                    if (tournamentBoxCount % 4 == 0 && tournamentBoxCount > defaultShowCount || tournamentBoxCount == totalTournamentCount) {
                        TournamentSecondRows.push(React.createElement(TournamentRow, {
                            key: tournaRowCount,
                            fourTournaments: TournamentSecondSpans,
                            classStr: 'second_ul f_clear js_selectCompetitionNav'
                        }));
                        TournamentSecondSpans = [];
                        tournaRowCount++;
                    }
                    tournamentBoxCount++;
                }
            });

            if (TournamentSpans.length > 0) {
                TournamentSecondRows.push(React.createElement(TournamentRow, {
                    key: tournaRowCount,
                    fourTournaments: TournamentSpans,
                    classStr: 'f_clear js_selectCompetitionNav'
                }));
                TournamentSpans = [];
                tournamentBoxCount++;
            }
            if (TournamentSecondSpans.length > 0) {
                TournamentSecondRows.push(React.createElement(TournamentRow, {
                    key: tournaRowCount,
                    fourTournaments: TournamentSecondSpans,
                    classStr: 'second_ul f_clear js_selectCompetitionNav'
                }));
                TournamentSecondSpans = [];
                tournamentBoxCount++;
            }
            var totalTournamentCount = tournamentBoxCount - 1;
            var hasOtherTab = false;

            // Filter Date
            if (pageName != "TQL" && this.props.OddsTableMatches != null && this.props.OddsTableMatches != undefined && this.props.OddsTableMatches != "" && this.props.OddsTableMatches.length > 0) {

                var _hasCurTab = false;
                var dateTabList = getNormalTabList(allTabDates);

                var tempMatches = removeRepeat(this.props.OddsTableMatches);
                for (var i = 0; i < dateTabList.length; i++) {
                    for (var y = 0; y < tempMatches.length; y++) {
                        var _matcheDay = tempMatches[y].matchDay;
                        var _matcheDate = GetDateStr(tempMatches[y].matchDate, "0");
                        var _selectedTabDate = getFormattedDateStr(tempMatches[y].matchDate);

                        if (_selectedTabDate == dateTabList[i] && pageName != "OFM" && pageName != "MIXALLUPLIST") {
                            var _seletedTab = "";
                            if (selectedTabDateArra.length > 0 && selectedTabDateArra[0] == _selectedTabDate) {
                                _seletedTab = "cur";
                                _hasCurTab = true;
                            }
                            if (i >= otherLength - 1) {
                                hasOtherTab = true;
                            }
                            MatcheList.push(React.createElement(MatcheSpan, {
                                key: tempMatches[y].matchID,
                                selectedTabDate: _selectedTabDate,
                                matchDate: _matcheDate,
                                matchDay: _matcheDay,
                                selected: _seletedTab,
                                otherNum: i
                            }));
                        } else if ((pageName == "OFM" || pageName == "MIXALLUPLIST") && i == 0 && y == 0) {
                            MatcheList.push(React.createElement(
                                'div', {
                                    'data-value': 'All',
                                    className: 'cur'
                                },
                                jsAll,
                                React.createElement('span', null)
                            ));
                            _hasCurTab = true;
                        }
                    }
                }

                allTabDateList = allTabDates;
                otherTabDates = getOtherTabList(allTabDates);

                if (selectedTabDateArra.length == 1) {
                    var isInOtherTab = false;
                    otherTabDates.forEach(function(_otherTabDate, index) {
                        if (_otherTabDate == selectedTabDateArra[0]) {
                            selectedTabDateArra = [];
                            otherTabDates.forEach(function(_otherTabDate2, index) {
                                selectedTabDateArra.push(_otherTabDate2.split("T")[0]);
                            });
                            isInOtherTab = true;
                        }
                    });

                    curDateType = isInOtherTab ? dateType.Other : dateType.Single;
                }

                if (otherTabDates.length > 0 && !hasOtherTab) {
                    MatcheList.push(React.createElement(
                        'div', {
                            'data-value': 'Others'
                        },
                        React.createElement(
                            'span', {
                                className: 'otherdate'
                            },
                            jsOthers
                        )
                    ));
                }
            }

            var tournAllBtn = this.renderTournAllBtn();
            dateTournaTabInited = false;

            return React.createElement(
                'div', {
                    className: pageName == "OFM" ? "DataCompetition_hide" : "DataCompetition_nav"
                },
                React.createElement(
                    'div', {
                        className: 'nav f_clear js_selectNav'
                    },
                    React.createElement(OddsTableSelectNav, {
                        onlyCompetition: MatcheList != null && MatcheList.length > 0 ? false : true
                    }),
                    React.createElement('div', {
                        id: 'tabLoading'
                    })
                ),
                React.createElement(
                    'div', {
                        className: curTabType == tabType.Date ? "date_nav" : "date_nav DataCompetition_hide"
                    },
                    React.createElement(
                        'div', {
                            id: 'SelectDateTimeId'
                        },
                        MatcheList
                    )
                ),
                React.createElement(
                    'div', {
                        className: curTabType == tabType.Competition ? "competition_nav" : "competition_nav DataCompetition_hide"
                    },
                    TournamentRows,
                    TournamentSecondRows,
                    React.createElement('ul', {
                        className: 'third_ul f_clear js_selectCompetitionNav'
                    }),
                    this.renderMoreBtn(totalTournamentCount),
                    curTabType == tabType.Competition ? this.props.OddsTableTournaments.length > 0 ? tournAllBtn : null : tournAllBtn
                )
            );
        }
    }]);

    return OddsTableDateTournTab;
}(React.Component);

var OddsTableSelectNav = function(_React$Component6) {
    _inherits(OddsTableSelectNav, _React$Component6);

    function OddsTableSelectNav() {
        _classCallCheck(this, OddsTableSelectNav);

        return _possibleConstructorReturn(this, (OddsTableSelectNav.__proto__ || Object.getPrototypeOf(OddsTableSelectNav)).apply(this, arguments));
    }

    _createClass(OddsTableSelectNav, [{
        key: 'render',
        value: function render() {
            var onlyCompetition = this.props.onlyCompetition == null || this.props.onlyCompetition == undefined ? false : this.props.onlyCompetition;

            if (pageName == "MIXALLUPLIST") {
                return React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'span', {
                            className: countFeatureMatch == 0 && curTabType != tabType.Competition || curTabType == tabType.Date ? "cur" : "",
                            'data-value': '1'
                        },
                        jsoddstab_bydate
                    ),
                    React.createElement(
                        'span', {
                            'data-value': '2',
                            className: curTabType == tabType.Competition ? "cur" : ""
                        },
                        jsoddstab_bycompetitions
                    ),
                    countFeatureMatch > 0 ? React.createElement(
                        'span', {
                            className: curTabType == tabType.Feature ? "cur" : "",
                            'data-value': '0'
                        },
                        jsoddstab_byfeaturedmatches
                    ) : null
                );
            } else {
                return React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'span', {
                            className: onlyCompetition || curTabType == tabType.Competition ? "" : "cur",
                            'data-value': '1',
                            style: {
                                display: onlyCompetition ? "none" : ""
                            }
                        },
                        jsoddstab_bydate
                    ),
                    React.createElement(
                        'span', {
                            'data-value': '2',
                            className: onlyCompetition || curTabType == tabType.Competition ? "cur" : ""
                        },
                        jsoddstab_bycompetitions
                    )
                );
            }
        }
    }]);

    return OddsTableSelectNav;
}(React.Component);

var TournamentRow = function(_React$Component7) {
    _inherits(TournamentRow, _React$Component7);

    function TournamentRow() {
        _classCallCheck(this, TournamentRow);

        return _possibleConstructorReturn(this, (TournamentRow.__proto__ || Object.getPrototypeOf(TournamentRow)).apply(this, arguments));
    }

    _createClass(TournamentRow, [{
        key: 'render',
        value: function render() {
            var tournaRow = [];

            this.props.fourTournaments.forEach(function(singleTournament) {
                tournaRow.push(singleTournament);
            });

            return React.createElement(
                'ul', {
                    className: this.props.classStr
                },
                tournaRow
            );
        }
    }]);

    return TournamentRow;
}(React.Component);

var TournamentSpan = function(_React$Component8) {
    _inherits(TournamentSpan, _React$Component8);

    function TournamentSpan() {
        _classCallCheck(this, TournamentSpan);

        return _possibleConstructorReturn(this, (TournamentSpan.__proto__ || Object.getPrototypeOf(TournamentSpan)).apply(this, arguments));
    }

    _createClass(TournamentSpan, [{
        key: 'render',
        value: function render() {
            var item = this.props.tournaments;
            var _tournamentName = item['tournamentName' + curLang.toUpperCase()];
            var tabId = "cbTourn_" + item.frontEndId;

            return React.createElement(
                'li', {
                    className: this.props.selected,
                    'data-value': item.tName,
                    'data-frontEndId': item.frontEndId,
                    'data-code': item.tournamentShortName,
                    'data-namecn': item.tournamentNameCH,
                    'data-nameen': item.tournamentNameEN
                },
                React.createElement(
                    'div',
                    null,
                    React.createElement('input', {
                        id: tabId,
                        type: 'checkbox',
                        defaultChecked: this.props.selected == "cur"
                    }),
                    React.createElement(
                        'span',
                        null,
                        _tournamentName
                    )
                )
            );
        }
    }]);

    return TournamentSpan;
}(React.Component);

var MatcheSpan = function(_React$Component9) {
    _inherits(MatcheSpan, _React$Component9);

    function MatcheSpan() {
        _classCallCheck(this, MatcheSpan);

        return _possibleConstructorReturn(this, (MatcheSpan.__proto__ || Object.getPrototypeOf(MatcheSpan)).apply(this, arguments));
    }

    _createClass(MatcheSpan, [{
        key: 'render',
        value: function render() {
            var tabDate = this.props.selectedTabDate.split("T")[0];
            var spanMatchDay = DateWeekLanguageSwitch(this.props.matchDay);

            if (this.props.otherNum < otherLength - 1) {
                return React.createElement(
                    'div', {
                        className: this.props.selected,
                        'data-value': tabDate
                    },
                    this.props.matchDate,
                    React.createElement('br', null),
                    React.createElement(
                        'span',
                        null,
                        '(',
                        spanMatchDay,
                        ')'
                    )
                );
            } else {
                return React.createElement(
                    'div', {
                        className: this.props.selected,
                        'data-value': 'Others'
                    },
                    React.createElement(
                        'span', {
                            className: 'otherdate'
                        },
                        jsOthers
                    )
                );
            }
        }
    }]);

    return MatcheSpan;
}(React.Component);

// green bar on top of the odds table, may appear twice in a page


var OddsTableInfo = function(_React$Component10) {
    _inherits(OddsTableInfo, _React$Component10);

    function OddsTableInfo() {
        _classCallCheck(this, OddsTableInfo);

        return _possibleConstructorReturn(this, (OddsTableInfo.__proto__ || Object.getPrototypeOf(OddsTableInfo)).apply(this, arguments));
    }

    _createClass(OddsTableInfo, [{
        key: 'render',
        value: function render() {
            var _oddsType = this.props.oddsType;
            var displayRefreshInfo = pageName != "DHCP";

            var _displayAddBet = this.props.tableType.toLowerCase().indexOf("presales") == -1 && this.props.tableType != "NoMatch" && pageName != "INDEX" && pageName != "MIXALLUPLIST" && pageName != "MIXALLUP";
            var _displayPrint = _displayAddBet || pageName == "DHCP" || pageName == "INDEX" || pageName == "MIXALLUPLIST" || pageName == "MIXALLUP";

            var refreshInfo = "";
            var extraInfo = "";
            if (pageName == "DHCP") {
                // calculator
                var _clink = React.createElement(
                    'a', {
                        href: 'javascript:NewWindow(\'/football/cal/dhcp_cal/dhcpcalculator2.aspx?Lang=' + jsLang + '\', \'dhcpcalculator2\', \'730\', \'550\', \'no\', \'no\')'
                    },
                    jsdhcpcalculator
                );
                var _cimg = React.createElement(Img, {
                    src: commonImagePath + 'icon_calculator.gif' + cacheVersion,
                    title: jsdhcpcalculator,
                    alt: '',
                    onClick: function onClick() {
                        return NewWindow('/football/cal/dhcp_cal/dhcpcalculator2.aspx?Lang=' + jsLang, 'dhcpcalculator2', '730', '550', 'no', 'no');
                    }
                });

                // dhcpdividend
                var _dlink = React.createElement(
                    'a', {
                        href: '#',
                        onClick: function onClick() {
                            return switchTo('football', 'results/dhcp_results', curLang);
                        }
                    },
                    jsdhcpdividend
                );
                var _dimg = React.createElement('img', {
                    src: commonImagePath + 'icon_6hafu.gif' + cacheVersion,
                    title: jsdhcpdividend,
                    alt: '',
                    onClick: function onClick() {
                        return switchTo('football', 'results/dhcp_results', curLang);
                    }
                });

                extraInfo = React.createElement(
                    'span',
                    null,
                    ' ',
                    _clink,
                    _cimg,
                    '  ',
                    _dlink,
                    _dimg,
                    ' '
                );
            } else {
                refreshInfo = React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'a', {
                            className: 'nolnk'
                        },
                        jsrefreshat,
                        ':',
                        React.createElement('label', {
                            id: 'sRefreshTime'
                        })
                    ),
                    React.createElement(
                        'a', {
                            className: 'refresh',
                            href: 'javascript:refreshOddsPage();'
                        },
                        jsrefresh
                    ),
                    React.createElement(
                        'a', {
                            className: 'refresh'
                        },
                        React.createElement(
                            'span', {
                                className: 'spicon'
                            },
                            React.createElement('img', {
                                src: '/info/include/images/icon_refresh.gif' + cacheVersion,
                                className: 'pointer icon',
                                alt: jsrefresh,
                                title: jsrefresh,
                                onClick: function onClick() {
                                    refreshOddsPage();
                                }
                            })
                        )
                    )
                );
            }

            if (pageName == "MIXALLUPLIST") {
                refreshInfo = null;
                extraInfo = null;
                _displayAddBet = false;
            }

            var rightContent = null;

            if (this.props.tableType != "NoMatch" && this.props.tableType != "PresalesMatches" && (this.props.hidebutton == undefined || !this.props.hidebutton)) {
                rightContent = React.createElement(
                    'div', {
                        className: 'right'
                    },
                    _displayPrint ? React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'a', {
                                className: 'cActionsPrint',
                                href: 'javascript:printNow(\'' + location.pathname + location.search + '&pv=1\');'
                            },
                            jsprintdata
                        ),
                        React.createElement(
                            'a', {
                                className: 'spiconPrint'
                            },
                            React.createElement(
                                'span', {
                                    className: 'spicon'
                                },
                                React.createElement('img', {
                                    src: '/info/include/images/icon_print.gif' + cacheVersion,
                                    className: 'pointer icon',
                                    onClick: function onClick() {
                                        printNow('' + location.pathname + location.search + '&pv=1');
                                    },
                                    alt: jsprintdata,
                                    title: jsprintdata
                                })
                            )
                        )
                    ) : null,
                    refreshInfo,
                    extraInfo,
                    _displayAddBet ? React.createElement(AddBetBtn, null) : null
                );
            }

            return React.createElement(
                'div', {
                    className: 'oHeader'
                },
                React.createElement(
                    'div', {
                        className: 'tblHeader'
                    },
                    React.createElement(
                        'div', {
                            className: 'normalheader'
                        },
                        React.createElement(
                            'div', {
                                className: 'left'
                            },
                            React.createElement(
                                'span', {
                                    className: 'cDelim'
                                },
                                React.createElement('img', {
                                    src: '/info/include/images/stroke_yellow.gif?CV=L1.00R1a',
                                    alt: '',
                                    title: ''
                                })
                            ),
                            formatOddsHeader(pageName, this.props.tableType, "", "")
                        ),
                        rightContent
                    )
                )
            );
        }
    }]);

    return OddsTableInfo;
}(React.Component);

var PageInfo = function(_React$Component11) {
    _inherits(PageInfo, _React$Component11);

    function PageInfo() {
        _classCallCheck(this, PageInfo);

        return _possibleConstructorReturn(this, (PageInfo.__proto__ || Object.getPrototypeOf(PageInfo)).apply(this, arguments));
    }

    _createClass(PageInfo, [{
        key: 'pageInfo',
        value: function pageInfo() {

            if (isResultPage(pageName)) {
                return React.createElement(
                    'div', {
                        className: 'left'
                    },
                    jsPagination1,
                    ' ',
                    startMatch,
                    ' - ',
                    endMatch,
                    ' ',
                    jsPagination2,
                    ' ',
                    totalMatch,
                    ' ',
                    jsLang.toLowerCase() == 'ch' ? jsPagination3 : ""
                );
            } else if (this.props.type == "header") {
                return React.createElement(
                    'div', {
                        className: 'left'
                    },
                    jsPagination1,
                    ' ',
                    startMatch + 1,
                    ' - ',
                    endMatch,
                    ' ',
                    jsPagination2,
                    ' ',
                    totalMatch,
                    ' ',
                    jsLang.toLowerCase() == 'ch' ? jsPagination3 : ""
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.type != "header" || couponCount == 0) {
                return React.createElement(
                    'div', {
                        className: 'pagination'
                    },
                    React.createElement(
                        'div', {
                            className: 'row'
                        },
                        this.pageInfo(),
                        React.createElement(Pagination, null),
                        React.createElement('div', {
                            className: 'clear'
                        })
                    ),
                    isResultPage(pageName) ? null : React.createElement('div', {
                        className: 'separator'
                    })
                );
            } else {
                return null;
            }
        }
    }]);

    return PageInfo;
}(React.Component);

var Pagination = function(_React$Component12) {
    _inherits(Pagination, _React$Component12);

    function Pagination() {
        _classCallCheck(this, Pagination);

        return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
    }

    _createClass(Pagination, [{
        key: 'render',
        value: function render() {
            if (totalMatch > maxMatch) {
                var totalPage = Math.ceil(totalMatch / maxMatch);
                var maxPage = 10;
                var pagination = void 0;
                var prevPages = [];
                var nextPages = [];

                var pStartPage = void 0,
                    pEndPage = void 0;
                if (totalPage > maxPage) {
                    pStartPage = Math.floor((curPage - 1) / 10) * 10 + 1;
                    if (pStartPage + 9 > totalPage) {
                        pEndPage = totalPage;
                    } else {
                        pEndPage = pStartPage + 9;
                    }
                } else {
                    pStartPage = 1;
                    pEndPage = totalPage;
                }
                if (pStartPage > 1) {
                    prevPages.push(React.createElement(PageSelection, {
                        _className: 'ppnBG',
                        key: 'psPrev',
                        targetPage: pStartPage - 1,
                        displayText: '...'
                    }));
                }
                for (var i = pStartPage; i < curPage; i++) {
                    prevPages.push(React.createElement(PageSelection, {
                        _className: 'pnBG pgNum',
                        key: 'ps' + i,
                        targetPage: i,
                        displayText: i
                    }));
                }
                for (var _i2 = curPage + 1; _i2 <= pEndPage; _i2++) {
                    nextPages.push(React.createElement(PageSelection, {
                        _className: 'pnBG pgNum',
                        key: 'ps' + _i2,
                        targetPage: _i2,
                        displayText: _i2
                    }));
                }
                if (pEndPage < totalPage) {
                    nextPages.push(React.createElement(PageSelection, {
                        key: 'psBext',
                        targetPage: pEndPage + 1,
                        displayText: '...'
                    }));
                }
                var pageContent = React.createElement(
                    'span',
                    null,
                    curPage != 1 ? React.createElement(
                        'span', {
                            className: 'spnLink',
                            onClick: function onClick() {
                                return goToPage(curPage - 1);
                            }
                        },
                        jsPrevious
                    ) : null,
                    ' \xA0',
                    prevPages,
                    React.createElement(
                        'span', {
                            className: 'cpnBG pgNum'
                        },
                        curPage
                    ),
                    '\xA0',
                    nextPages,
                    curPage != totalPage ? React.createElement(
                        'span', {
                            className: 'spnLink',
                            onClick: function onClick() {
                                return goToPage(curPage + 1);
                            }
                        },
                        jsNext
                    ) : null,
                    ' \xA0'
                );
                pagination = React.createElement(
                    'div', {
                        className: 'right'
                    },
                    React.createElement(
                        'span', {
                            className: 'sOpen'
                        },
                        '<<'
                    ),
                    pageContent,
                    React.createElement(
                        'span', {
                            className: 'sClose'
                        },
                        '>>'
                    )
                );
                return pagination;
            } else {
                return null;
            }
        }
    }]);

    return Pagination;
}(React.Component);

var PageSelection = function(_React$Component13) {
    _inherits(PageSelection, _React$Component13);

    function PageSelection() {
        _classCallCheck(this, PageSelection);

        return _possibleConstructorReturn(this, (PageSelection.__proto__ || Object.getPrototypeOf(PageSelection)).apply(this, arguments));
    }

    _createClass(PageSelection, [{
        key: 'render',
        value: function render() {
            var i = this.props.targetPage;
            var displayText = this.props.displayText;
            var _className = this.props._className;
            //return <span><span className="spnLink pnBG" onClick={()=>goToPage(i)}>{displayText}</span> </span>
            return React.createElement(
                'span',
                null,
                React.createElement(
                    'span', {
                        className: 'spnLink ' + _className,
                        onClick: function onClick() {
                            return goToPage(i);
                        }
                    },
                    displayText
                ),
                ' '
            );
        }
    }]);

    return PageSelection;
}(React.Component);

var MatchSelectList = function(_React$Component14) {
    _inherits(MatchSelectList, _React$Component14);

    function MatchSelectList() {
        _classCallCheck(this, MatchSelectList);

        return _possibleConstructorReturn(this, (MatchSelectList.__proto__ || Object.getPrototypeOf(MatchSelectList)).apply(this, arguments));
    }

    _createClass(MatchSelectList, [{
        key: 'render',
        value: function render() {
            var optionList = [];
            var tournamentList = this.props.OddsTableTournaments;
            var matchList = this.props.OddsTableMatches;
            var singleMatch = this.props.SingleMatch;
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
            var tournamentName = "";
            var code = "";

            var _vsStr = jsVS;
            var headerEsst = null;
            var litTotalCorner = null;
            var _ninetyMinsScore = null;
            var spInplay = null;
            if (isInplay) {
                if (!singleMatch.isVoidMatch() && singleMatch.IsMatchKickOff()) {
                    _vsStr = formatInplayTeamAndStatus(singleMatch.ipinfo, "matchresult", singleMatch.matchTime, _isHalfTimePage);
                }

                if (singleMatch.ipinfo[3] != "-1") {
                    var _scoure = _vsStr == "---:---" ? "---:---" : singleMatch.ipinfo[3];
                    _ninetyMinsScore = React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'span', {
                                className: 'utext'
                            },
                            jsres_fulltime
                        ),
                        ' [',
                        _scoure,
                        ']'
                    );
                }

                var statemsg = void 0;
                // check if nts available
                if (singleMatch.isNTSDefined()) {
                    statemsg = React.createElement(
                        'span', {
                            className: 'spntsinfo',
                            id: 'ntsinfo'
                        },
                        React.createElement('span', {
                            className: 'space'
                        }),
                        React.createElement(
                            'a', {
                                href: 'javascript:showNTSPanel();',
                                title: '' + jsscoringInformationAlt
                            },
                            jsscoringInformation
                        ),
                        React.createElement(NTSInfoTable, {
                            _matchID: singleMatch.matchIDinofficial
                        })
                    );
                    //;
                } else {
                    statemsg = null;
                }

                headerEsst = React.createElement(
                    'span', {
                        key: 'headerEsst',
                        className: 'esst left'
                    },
                    React.createElement('input', {
                        type: 'hidden',
                        id: 'hsst' + singleMatch.matchID,
                        value: '' + singleMatch.ipinfo[1]
                    }),
                    React.createElement(
                        'span',
                        null,
                        formatInplayTeamAndStatus(singleMatch.ipinfo, "stagemsg", singleMatch.matchTime, _isHalfTimePage)
                    ),
                    React.createElement(
                        'span', {
                            id: 'statemsg'
                        },
                        statemsg
                    )
                );

                // only display corner no. if match is kick off and CHL is selling
                var displayCorner = (singleMatch.arrPools.indexOf("CHL") != -1 || singleMatch.arrPools.indexOf("ECH") != -1) && singleMatch.IsMatchKickOff();
                var displayCornerNo = singleMatch.chlodds != null && isSelling(singleMatch.chlodds.POOLSTATUS, "100", "1") || singleMatch.echodds != null && isSelling(singleMatch.echodds.POOLSTATUS, "100", "1");
                litTotalCorner = formatTotalCornerStr(singleMatch.ipinfo[4], displayCorner, displayCornerNo, "");
            }
            var homeAndAwayName = React.createElement(
                'span',
                null,
                homeTeamName,
                ' ',
                React.createElement(
                    'label',
                    null,
                    ' ',
                    _vsStr,
                    ' '
                ),
                awayTeamName
            );

            tournamentList.forEach(function(tList) {
                if (singleMatch.tournament != undefined) {
                    if (singleMatch.tournament.tournamentID == tList.tournamentID) {
                        code = tList.tournamentShortName;
                        tournamentName = tList['tournamentName' + curLang.toUpperCase()];
                    }
                }
            });

            var matchOdds = singleMatch[_oddsType.toLowerCase() + "odds"];
            var isInplayOdds = matchOdds != null ? singleMatch.IsMatchKickOff() && matchOdds.INPLAY == "true" : false;

            return React.createElement(
                'div', {
                    className: "clearfloat"
                },
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'span', {
                            id: 'matchValue'
                        },
                        formatEsstStr(singleMatch.matchDate, false) + " " + singleMatch.frontEndId,
                        ' '
                    ),
                    React.createElement('span', {
                        className: 'space'
                    }),
                    React.createElement(
                        'span', {
                            title: tournamentName
                        },
                        formatImageStr([League.GetFlagPath(code), tournamentName, code]),
                        ' '
                    ),
                    React.createElement('span', {
                        className: 'space'
                    }),
                    React.createElement(
                        'span',
                        null,
                        pageName != "ALL" && pageName != "INPLAYALL" ? oddsAllJump(singleMatch.matchID, sTeamString(!isInplay, false, singleMatch, false, true, _oddsType), isInplayOdds) : homeAndAwayName
                    ),
                    React.createElement('span', {
                        className: 'space'
                    }),
                    React.createElement(
                        'span', {
                            className: 'cvenue'
                        },
                        singleMatch.venue == null ? "" : formatNeutralGroundIcon(singleMatch.venue, "ng")
                    ),
                    React.createElement('span', {
                        className: 'space'
                    }),
                    displayInplayClock(pageName) ? React.createElement(
                        'div', {
                            className: 'hinplay'
                        },
                        formatInplayIco(singleMatch, "ico", pageName)
                    ) : null,
                    _ninetyMinsScore,
                    React.createElement('span', {
                        className: 'space'
                    }),
                    React.createElement(
                        'span',
                        null,
                        displayHead2Head(pageName) ? formatJumpHeadStr(singleMatch) : ""
                    ),
                    React.createElement('span', {
                        className: 'space'
                    }),
                    formatTVIcon(singleMatch.channel, "tvall"),
                    React.createElement('span', {
                        className: 'space'
                    }),
                    litTotalCorner
                ),
                headerEsst,
                React.createElement(
                    'div', {
                        className: "float-right"
                    },
                    optionList.length > 1 ? React.createElement(
                        'select', {
                            id: 'matchSelectId'
                        },
                        React.createElement(
                            'option', {
                                value: '0'
                            },
                            jsSelectAnotherMatch
                        ),
                        optionList
                    ) : null
                )
            );
        }
    }]);

    return MatchSelectList;
}(React.Component);

// getDateOptinList


function getDateOptinList(tournamentList, matchList, matchId) {
    var groupCurOptionList = [];
    var optionList = [];
    selectedTabDateArra.forEach(function(tabDateItem) {
        var tabDateTimeName = GetDateTimeLegName(tabDateItem);
        var hasMatch = false;
        groupCurOptionList.push(React.createElement(MatcheOption, {
            key: "curTabTypeOption" + tabDateItem,
            matchID: "",
            matchDate: "",
            frontEndId: "",
            code: "",
            homeAndAwayName: "",
            optionTyple: curTabType,
            optionTitle: tabDateTimeName,
            disabled: true
        }));
        matchList.forEach(function(item, index) {
            if (matchId != item.matchID) {
                var selectedTabDate = tabDateItem;
                var matchDateYYYYMMDD = item.matchDate.split("T")[0];
                var groupCur = matchDateYYYYMMDD == selectedTabDate;
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

                if (groupCur) {
                    groupCurOptionList.push(React.createElement(MatcheOption, {
                        key: "groupCurOption" + item.matchID,
                        matchID: item.matchID,
                        matchDate: matchDate,
                        frontEndId: frontEndId,
                        code: code,
                        homeAndAwayName: homeAndAwayName,
                        optionTyple: dateType.groupCur,
                        optionTitle: ""
                    }));
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
function getCompetitionOptinList(tournamentList, matchList, matchId) {
    var optionList = [];
    var selectedTournaMatches = [];

    selectedTournamentIds.forEach(function(value, index) {
        var selectedTournCount = 0;
        tournamentList.forEach(function(singleTournament, tounaIndex) {
            if (singleTournament.tournamentID == value) {
                var tournamentName = singleTournament['tournamentName' + curLang.toUpperCase()];
                matchList.forEach(function(item, couponIndex) {
                    if (item.tournament != "" && item.tournament != undefined && item.matchID != matchId) {
                        if (item.tournament.tournamentID == value) {
                            if (selectedTournCount == 0) selectedTournaMatches.push("======" + tournamentName + "======");
                            selectedTournaMatches.push(item);
                            selectedTournCount++;
                        }
                    }
                });
            }
        });
    });

    selectedTournaMatches.forEach(function(item, couponIndex) {
        if (item.matchDate != undefined) {
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
            if ((tMatchID == null || tMatchID == "") && item.chlodds != undefined) {
                selectedMatcheId = item.matchID;
                setMatchId(selectedMatcheId);
            }
            optionList.push(React.createElement(MatcheOption, {
                key: "curTabTypeOption" + item.matchID,
                matchID: item.matchID,
                matchDate: matchDate,
                frontEndId: frontEndId,
                code: code,
                homeAndAwayName: homeAndAwayName,
                optionTyple: curTabType,
                optionTitle: ""
            }));
        } else {
            optionList.push(React.createElement(MatcheOption, {
                key: "curTabTypeOption" + couponIndex,
                matchID: "",
                matchDate: "",
                frontEndId: "",
                code: "",
                homeAndAwayName: "",
                optionTyple: curTabType,
                optionTitle: item,
                disabled: true
            }));
        }
    });
    return optionList;
}

var MatcheOption = function(_React$Component15) {
    _inherits(MatcheOption, _React$Component15);

    function MatcheOption() {
        _classCallCheck(this, MatcheOption);

        return _possibleConstructorReturn(this, (MatcheOption.__proto__ || Object.getPrototypeOf(MatcheOption)).apply(this, arguments));
    }

    _createClass(MatcheOption, [{
        key: 'render',
        value: function render() {
            var disabled = this.props.disabled != null ? "disabled" : null;
            if (this.props.optionTitle == "") {
                return React.createElement(
                    'option', {
                        value: this.props.matchID,
                        'data-type': this.props.optionTyple,
                        disabled: disabled
                    },
                    this.props.matchDate,
                    ' ',
                    this.props.frontEndId,
                    ' ',
                    this.props.code,
                    ' ',
                    this.props.homeAndAwayName
                );
            } else {
                return React.createElement(
                    'option', {
                        value: '0',
                        'data-type': this.props.optionTyple,
                        disabled: disabled
                    },
                    this.props.optionTitle
                );
            }
        }
    }]);

    return MatcheOption;
}(React.Component);

var ColumnTitle = function(_React$Component16) {
    _inherits(ColumnTitle, _React$Component16);

    function ColumnTitle() {
        _classCallCheck(this, ColumnTitle);

        return _possibleConstructorReturn(this, (ColumnTitle.__proto__ || Object.getPrototypeOf(ColumnTitle)).apply(this, arguments));
    }

    _createClass(ColumnTitle, [{
        key: 'render',
        value: function render() {
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
                    return React.createElement(
                        'div', {
                            className: 'rhead couponRow'
                        },
                        React.createElement(
                            'div', {
                                className: 'cesst'
                            },
                            jsesst1,
                            React.createElement('br', null),
                            jsesst2
                        ),
                        React.createElement(
                            'div', {
                                className: 'cday'
                            },
                            jsoddstable_eventid
                        ),
                        React.createElement(
                            'div', {
                                className: 'cflag'
                            },
                            React.createElement(
                                'a', {
                                    href: 'javascript:goFlagUrl();'
                                },
                                React.createElement('img', {
                                    src: '/football/info/images/icon_flag.gif' + cacheVersion,
                                    alt: jsleagues_and_tournaments,
                                    title: jsleagues_and_tournaments
                                })
                            )
                        ),
                        React.createElement(
                            'div', {
                                className: 'cteams mixallup_team'
                            },
                            jsteams1,
                            React.createElement('br', null),
                            jsteams2
                        ),
                        React.createElement('div', {
                            className: 'cvenue'
                        }),
                        React.createElement(
                            'div', {
                                className: 'selectedandclear'
                            },
                            jsmixallupselected,
                            React.createElement(
                                'span', {
                                    id: 'mixallup_selected'
                                },
                                '0'
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'a', {
                                    href: "javascript:mixUnSelectedAll()"
                                },
                                jsmixallupclear
                            )
                        )
                    );
                } else if (pageName == "TQL" || pageName == "TOURN" && _poolType == "TQL") {
                    var btmborderStyle = pageName == "TQL" ? "" : "rBottomBorder";

                    return React.createElement(
                        'div', {
                            className: 'rhead couponRow'
                        },
                        React.createElement(
                            'div', {
                                className: 'cesst ' + btmborderStyle
                            },
                            jsesst1,
                            React.createElement('br', null),
                            jsesst2
                        ),
                        React.createElement(
                            'div', {
                                className: 'ccode ' + btmborderStyle
                            },
                            jsTQLCode
                        ),
                        React.createElement(
                            'div', {
                                className: 'ctage ' + btmborderStyle
                            },
                            qualifyingStage
                        ),
                        React.createElement(
                            'div', {
                                className: 'cteams ' + btmborderStyle
                            },
                            jsteam
                        ),
                        React.createElement(
                            'div', {
                                className: 'codds ' + btmborderStyle
                            },
                            jsodds
                        ),
                        React.createElement(
                            'div', {
                                className: 'cteams ' + btmborderStyle
                            },
                            jsteam
                        ),
                        React.createElement(
                            'div', {
                                className: 'codds ' + btmborderStyle
                            },
                            jsodds
                        )
                    );
                } else {
                    return React.createElement(
                        'div', {
                            className: 'rhead couponRow'
                        },
                        React.createElement(
                            'div', {
                                className: 'closeDay'
                            },
                            jsesst1,
                            React.createElement('br', null),
                            jsesst2
                        ),
                        React.createElement(
                            'div', {
                                className: 'cday'
                            },
                            jsoddstable_eventid
                        ),
                        React.createElement(
                            'div', {
                                className: 'cflag'
                            },
                            React.createElement(
                                'a', {
                                    href: 'javascript:goFlagUrl();'
                                },
                                React.createElement('img', {
                                    src: '/football/info/images/icon_flag.gif' + cacheVersion,
                                    alt: jsleagues_and_tournaments,
                                    title: jsleagues_and_tournaments
                                })
                            )
                        ),
                        React.createElement(
                            'div', {
                                className: 'cteams'
                            },
                            jsteams1,
                            React.createElement('br', null),
                            jsteams2
                        ),
                        React.createElement('div', {
                            className: 'cvenue'
                        }),
                        pageName == "INPLAYHAD" ? React.createElement(
                            'div', {
                                className: 'ctv'
                            },
                            jsliveinfo
                        ) : null,
                        displayInplayClock(pageName) ? React.createElement(
                            'div', {
                                className: 'cinplay'
                            },
                            jsinplaybet1,
                            React.createElement('br', null),
                            jsinplaybet2
                        ) : null,
                        pageName == "INDEX" ? React.createElement(
                            'div', {
                                className: 'ctv'
                            },
                            React.createElement(Img, {
                                src: footImagePath + 'icon_tv.gif' + cacheVersion,
                                alt: '',
                                title: ''
                            })
                        ) : null,
                        pageName == "INPLAYHAD" ? React.createElement(
                            'div', {
                                className: 'cesst'
                            },
                            jsmatchstatus
                        ) : null,
                        isML(_poolType) ? React.createElement(
                            'div', {
                                className: 'cline'
                            },
                            jsLine
                        ) : null,
                        React.createElement(
                            'div', {
                                className: 'cotitle'
                            },
                            React.createElement(
                                'div', {
                                    className: pageName == "TTG" ? "" : 'rBottomBorder'
                                },
                                pageName == "INPLAYHAD" || pageName == "INDEX" ? jsHAD : jsodds
                            ),
                            pageName == "TTG" ? null : oddsTD
                        ),
                        isML(_poolType) ? React.createElement('div', {
                            className: 'tgIndMl'
                        }) : null,
                        React.createElement(
                            'div', {
                                className: 'cheadtohead'
                            },
                            jsLang.toLowerCase() == "ch" ? jsheadtohead : jshead1,
                            React.createElement('br', null),
                            jsLang.toLowerCase() == "ch" ? "" : jshead2
                        )
                    );
                }
            } catch (ex) {
                debugLog("ColumnTitle:" + ex);
            }
        }
    }]);

    return ColumnTitle;
}(React.Component);

var ColumnTitleSPCByItem = function(_React$Component17) {
    _inherits(ColumnTitleSPCByItem, _React$Component17);

    function ColumnTitleSPCByItem() {
        _classCallCheck(this, ColumnTitleSPCByItem);

        return _possibleConstructorReturn(this, (ColumnTitleSPCByItem.__proto__ || Object.getPrototypeOf(ColumnTitleSPCByItem)).apply(this, arguments));
    }

    _createClass(ColumnTitleSPCByItem, [{
        key: 'render',
        value: function render() {
            var _itemInfo = this.props.itemInfo;
            var _couponID = this.props.couponID;
            var oddsTD = [];

            _itemInfo.SELLIST.forEach(function(_selInfo, _sInd) {
                oddsTD.push(React.createElement(
                    'div', {
                        key: 'itemAns' + _couponID + _sInd,
                        className: 'codds'
                    },
                    '(',
                    parseInt(_selInfo.SEL, 10),
                    ')',
                    React.createElement('br', null),
                    jsLang == "CH" ? _selInfo.CONTENTCH : _selInfo.CONTENTEN
                ));
            });

            return React.createElement(
                'div', {
                    className: 'rhead couponRow ' + _couponID
                },
                oddsTD
            );
        }
    }]);

    return ColumnTitleSPCByItem;
}(React.Component);

function getOddsTD(_poolType, _cellClassName, _rowClassName) {
    if (_cellClassName == undefined || _cellClassName == null) {
        _cellClassName = "";
    }
    if (_rowClassName == undefined || _rowClassName == null) {
        _rowClassName = "";
    }
    if (_poolType == "HAD" || _poolType == "FHA" || _poolType == "HHA") {
        return React.createElement(
            'div', {
                className: 'table ' + _rowClassName
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsHomeTeamWin
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsDRAW
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsAwayTeamWin
            )
        );
    } else if (_poolType == "HIL" || _poolType == "CHL" || _poolType == "FHL") {
        return React.createElement(
            'div', {
                className: 'table'
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsHight
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsLow
            )
        );
    } else if (_poolType == "HDC") {
        return React.createElement(
            'div', {
                className: 'table'
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsHomeTeamWin
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsAwayTeamWin
            )
        );
    } else if (_poolType == "FTS") {
        return React.createElement(
            'div', {
                className: 'table'
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsHomeTeam
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsNoGoal
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsAwayTeam
            )
        );
    } else if (_poolType == "TQL") {
        return React.createElement(
            'div', {
                className: 'table'
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsHometeamtql
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsAwayteamtql
            )
        );
    } else if (_poolType == "OOE") {
        return React.createElement(
            'div', {
                className: 'table'
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                bsodd
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                bseven
            )
        );
    } else if (_poolType == "HFT") {
        return React.createElement(
            'div', {
                className: 'table ' + _cellClassName
            },
            React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bshomecomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bshomecomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bshomecomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds hftd'
                    },
                    bsdrawcomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds hftd'
                    },
                    bsdrawcomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds hftd'
                    },
                    bsdrawcomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bsawaycomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bsawaycomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bsawaycomb
                )
            ),
            React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bshomecomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bsdrawcomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bsawaycomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds hftd'
                    },
                    bshomecomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds hftd'
                    },
                    bsdrawcomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds hftd'
                    },
                    bsawaycomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bshomecomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bsdrawcomb
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    bsawaycomb
                )
            )
        );
    } else {
        return React.createElement('div', {
            className: 'table'
        });
    }
}

function getOddsTDForAllOdds(_singleMatch, _poolType, _cellClassName, _rowClassName) {
    if (_cellClassName == undefined || _cellClassName == null) {
        _cellClassName = "";
    }
    if (_rowClassName == undefined || _rowClassName == null) {
        _rowClassName = "";
    }
    var hTeamName = jsLang == "CH" ? _singleMatch.homeTeam.teamNameCH : _singleMatch.homeTeam.teamNameEN;
    var aTeamName = jsLang == "CH" ? _singleMatch.awayTeam.teamNameCH : _singleMatch.awayTeam.teamNameEN;

    if (_poolType.match(/^(HAD|EHA|HADINPLAY|FHA|FHAINPLAY)$/)) {
        return React.createElement(
            'div', {
                className: 'table ' + _rowClassName
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                hTeamName,
                '(',
                jsHomeTeamWin,
                ')'
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsDRAW
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                aTeamName,
                '(',
                jsAwayTeamWin,
                ')'
            )
        );
    } else if (_poolType.match(/^(HHA|HHAINPLAY)$/)) {
        var hgStr = renderGoalLine(_singleMatch, _poolType, "HG", false, false, "0");
        var agStr = renderGoalLine(_singleMatch, _poolType, "AG", false, false, "0");

        return React.createElement(
            'div', {
                className: 'table ' + _rowClassName
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                hTeamName,
                hgStr,
                '(',
                jsHomeTeamWin,
                ')'
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsDRAW
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                aTeamName,
                agStr,
                '(',
                jsAwayTeamWin,
                ')'
            )
        );
    } else if (_poolType.match(/^(HIL|EHL|HILINPLAY|FHL|FHLINPLAY|CHL|ECH|CHLINPLAY)$/)) {
        return React.createElement(
            'div', {
                className: 'table ' + _rowClassName
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                _poolType == "CHL" ? jsCornerLine : jsLine
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsHight
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsLow
            )
        );
    } else if (_poolType.match(/^(HDC|EDC|HDCINPLAY)$/)) {
        return React.createElement(
            'div', {
                className: 'table ' + _rowClassName
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jshandicapline
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                hTeamName,
                '(',
                jsHomeTeamWin,
                ')'
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                aTeamName,
                '(',
                jsAwayTeamWin,
                ')'
            )
        );
    } else if (_poolType.match(/^(FTS|NTS|ENT|ETS)$/)) {
        return React.createElement(
            'div', {
                className: 'table rBottomBorder'
            },
            pageName == "RESULT" && _poolType.match(/^(NTS|ENT|ETS)$/) ? React.createElement('span', {
                className: 'codds r2'
            }) : null,
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                hTeamName,
                '(',
                jsHomeTeam,
                ')'
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsNoGoal
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                aTeamName,
                '(',
                jsAwayTeam,
                ')'
            )
        );
    } else if (_poolType == "FGS") {
        return React.createElement(
            'div', {
                className: 'table tOdds rTopBorder rBottomBorder'
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                hTeamName,
                ' (',
                jsHomeTeam,
                ')'
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                aTeamName,
                ' (',
                jsAwayTeam,
                ')'
            )
        );
    } else if (_poolType.match(/^(TQL|TQLINPLAY)$/)) {
        var tqlHTeamName = hTeamName;
        var tqlATeamName = aTeamName;
        if (pageName != 'RESULT' && _singleMatch.tqlodds != null) {
            tqlHTeamName = jsLang == "CH" ? _singleMatch.tqlodds.homeTeam.teamNameCH : _singleMatch.tqlodds.homeTeam.teamNameEN;
            tqlATeamName = jsLang == "CH" ? _singleMatch.tqlodds.awayTeam.teamNameCH : _singleMatch.tqlodds.awayTeam.teamNameEN;
        }
        return React.createElement(
            'div', {
                className: 'table rBottomBorder rTopBorder'
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                tqlHTeamName
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                tqlATeamName
            )
        );
    } else if (_poolType == "OOE") {
        return React.createElement(
            'div', {
                className: 'table'
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                bsodd
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                bseven
            )
        );
    } else if (_poolType.match(/^(CRS|ECS|CRSINPLAY|FCS|FCSINPLAY)$/)) {
        return React.createElement(
            'div', {
                className: 'table tOdds rTopBorder rBottomBorder'
            },
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                hTeamName,
                ' (',
                jsHomeTeamWin,
                ')'
            ),
            pageName == "MIXALLUP" ? null : React.createElement(
                'span', {
                    className: 'codds r2'
                },
                jsDRAW
            ),
            React.createElement(
                'span', {
                    className: 'codds r2'
                },
                aTeamName,
                ' (',
                jsAwayTeamWin,
                ')'
            )
        );
    } else if (_poolType.match(/^(HFT|HFTINPLAY)$/)) {
        var _hLbl = bshomecomb;
        var _aLbl = bsawaycomb;
        var _dLbl = bsdrawcomb;
        if (pageName == "RESULT") {
            _hLbl = jsHOME;
            _aLbl = jsAWAY;
            _dLbl = jsDRAW;
        }
        return React.createElement(
            'div', {
                className: 'rBottomBorder table'
            },
            React.createElement(
                'div', {
                    className: 'tableRow tableRow1'
                },
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _hLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _hLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _hLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _dLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _dLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _dLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _aLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _aLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _aLbl
                )
            ),
            React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _hLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _dLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _aLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _hLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _dLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _aLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _hLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _dLbl
                ),
                React.createElement(
                    'span', {
                        className: 'codds r2'
                    },
                    _aLbl
                )
            )
        );
    } else {
        return null;
    }
}

var OddsTableFooter = function(_React$Component18) {
    _inherits(OddsTableFooter, _React$Component18);

    function OddsTableFooter() {
        _classCallCheck(this, OddsTableFooter);

        return _possibleConstructorReturn(this, (OddsTableFooter.__proto__ || Object.getPrototypeOf(OddsTableFooter)).apply(this, arguments));
    }

    _createClass(OddsTableFooter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div', {
                    className: 'footerAddBet poolDetails'
                },
                React.createElement(AddBetBtn, {
                    position: 'footer'
                })
            );
        }
    }]);

    return OddsTableFooter;
}(React.Component);

var ResultsCoupon = function(_React$Component19) {
    _inherits(ResultsCoupon, _React$Component19);

    function ResultsCoupon() {
        _classCallCheck(this, ResultsCoupon);

        return _possibleConstructorReturn(this, (ResultsCoupon.__proto__ || Object.getPrototypeOf(ResultsCoupon)).apply(this, arguments));
    }

    _createClass(ResultsCoupon, [{
        key: 'render',
        value: function render() {
            var couponName;
            var _oddsType = oddsType;

            var tourns = this.props.tournaments;

            var matchRow = [];
            var altRow = 0;
            var tableType = this.props.tableType;
            var couponID = 'tgCou' + ++couponCount;
            this.props.coupon.forEach(function(singleMatch) {
                //couponName = GetGlobalResources("Coupon" + getMatchDayIndex(singleMatch.matchDay));
                couponName = formatDDMMYYYY(singleMatch.matchDate) + "(" + DateWeekLanguageSwitch(singleMatch.matchDay) + ") " + jstabletitlematches;
                matchRow.push(React.createElement(MatchRow_ResultRow, {
                    altRow: altRow % 2,
                    match: singleMatch,
                    key: singleMatch.matchIDinofficial,
                    tableType: tableType,
                    couponID: couponID
                }));
                altRow++;
            });
            return React.createElement(
                'div', {
                    className: 'couponTable'
                },
                React.createElement(CouponHeader, {
                    couponName: couponName,
                    couponID: couponID,
                    hasMLMatch: false,
                    couponCount: couponCount
                }),
                matchRow
            );
        }
    }]);

    return ResultsCoupon;
}(React.Component);

var Coupon = function(_React$Component20) {
    _inherits(Coupon, _React$Component20);

    function Coupon() {
        _classCallCheck(this, Coupon);

        return _possibleConstructorReturn(this, (Coupon.__proto__ || Object.getPrototypeOf(Coupon)).apply(this, arguments));
    }

    _createClass(Coupon, [{
        key: 'getCouponName',
        value: function getCouponName() {
            var couponName = "";

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
    }, {
        key: 'render',
        value: function render() {
            var couponName = this.getCouponName();
            var couponNo = this.props.couponNo == null ? couponCount : this.props.couponNo;

            return React.createElement(
                'div', {
                    className: 'couponTable'
                },
                pageName == "OFM" ? React.createElement('div', {
                    className: 'separator tableCaption'
                }) : React.createElement(CouponHeader, {
                    couponName: couponName,
                    couponID: this.props.couponID,
                    hasMLMatch: this.props.hasMLMatch,
                    couponCount: couponNo
                }),
                this.props.matchRow
            );
        }
    }]);

    return Coupon;
}(React.Component);

var CouponHeader = function(_React$Component21) {
    _inherits(CouponHeader, _React$Component21);

    function CouponHeader(props) {
        _classCallCheck(this, CouponHeader);

        var _this24 = _possibleConstructorReturn(this, (CouponHeader.__proto__ || Object.getPrototypeOf(CouponHeader)).call(this, props));

        var _oddsType = oddsType;

        _this24.mlExpander = null;
        if (isML(_oddsType)) {
            _this24.mlExpander = React.createElement(
                'span', {
                    style: {
                        textAlign: "right",
                        width: "100px",
                        marginRight: "3px"
                    },
                    onClick: function onClick(e) {
                        e.stopPropagation();
                        tgMl2(_this24, _this24.props.couponID);
                    },
                    className: 'tgMl mlHeader' + _this24.props.couponCount
                },
                React.createElement(
                    'span', {
                        className: 'mlLblExpand',
                        style: {
                            display: "inline"
                        }
                    },
                    jsexpandAll,
                    React.createElement('div', {
                        className: 'emptyDiv',
                        style: {
                            display: "none"
                        }
                    })
                ),
                React.createElement(
                    'span', {
                        className: 'mlLblCollapse',
                        style: {
                            display: "none"
                        }
                    },
                    jscollapseAll,
                    React.createElement('div', {
                        className: 'emptyDiv',
                        style: {
                            display: "none"
                        }
                    })
                ),
                React.createElement(
                    'span', {
                        className: 'mlBtnPlus'
                    },
                    '\xA0\xA0\xA0\xA0\xA0'
                )
            );
        }
        return _this24;
    }

    _createClass(CouponHeader, [{
        key: 'render',
        value: function render() {
            var _this25 = this;

            var rightElement = null;
            var spBtnMinus = null;
            var couponClass = "tgCoupon couponRow";

            if (pageName == "MIXALLUPLIST") {
                rightElement = React.createElement(
                    'span', {
                        className: 'next',
                        onClick: function onClick(e) {
                            e.stopPropagation();
                            mix_nextstep(e);
                        }
                    },
                    React.createElement(
                        'label', {
                            className: 'textcursor'
                        },
                        jsnextstep
                    ),
                    React.createElement('span', {
                        className: 'nexticon',
                        title: jsnextstep
                    })
                );
            } else if (this.props.rightText != undefined) {
                rightElement = React.createElement(
                    'span', {
                        className: 'next'
                    },
                    React.createElement(
                        'label',
                        null,
                        this.props.rightText
                    )
                );
            }

            if (pageName != "SPC") spBtnMinus = React.createElement('span', {
                className: 'spBtnMinus'
            });
            else couponClass = "rhead couponRow tOdds rTopBorder rBottomBorder";

            return React.createElement(
                'div', {
                    id: this.props.couponID,
                    className: couponClass,
                    onClick: function onClick() {
                        pageName == "SPC" ? null : tgCoupon4(_this25, '' + _this25.props.couponID);
                    }
                },
                spBtnMinus,
                this.props.couponName,
                this.props.hasMLMatch ? this.mlExpander : null,
                rightElement
            );
        }
    }]);

    return CouponHeader;
}(React.Component);

var MatchRow = function(_React$Component22) {
    _inherits(MatchRow, _React$Component22);

    function MatchRow(props) {
        _classCallCheck(this, MatchRow);

        var _this26 = _possibleConstructorReturn(this, (MatchRow.__proto__ || Object.getPrototypeOf(MatchRow)).call(this, props));

        var _oddsType = oddsType;
        if (pageName.match(/^(INDEX|INDEX_HAD|MIXALLUPLIST)$/)) {
            _oddsType = "HAD";
        } else if (pageName == "INPLAYHAD") {
            _oddsType = _this26.props.match.ehaodds != null ? "EHA" : "HAD";
        }

        _this26.state = {
            singleMatch: _this26.props.match,
            singleTournament: _this26.props.tournament,
            tableType: _this26.props.tableType,
            altRow: _this26.props.altRow,
            couponID: _this26.props.couponID,
            oddsType: _oddsType
        };
        return _this26;
    }

    _createClass(MatchRow, [{
        key: 'showOddsSelection',
        value: function showOddsSelection() {

            var _singleMatch = this.state.singleMatch;
            var _oddsType = this.state.oddsType;
            var _tableType = this.state.tableType;
            var _matchID = _singleMatch.matchIDinofficial;
            var _showDelayMsg = pageName == "HAD" && _singleMatch.remarkstype == "A";
            var oddsSelection = null;

            // show delay message from index page
            if (_showDelayMsg) {
                oddsSelection = formatDelayMsg(_matchID);
            } else if (pageName != "MIXALLUPLIST" && curTabType != tabType.Feature) {
                oddsSelection = checkInplayLink(_singleMatch, _oddsType, pageName) ? getInplayLinkOddsCellSet(_singleMatch, _oddsType, _matchID, null) : getOddsSelection({
                    "singleMatch": _singleMatch,
                    "tableType": _tableType,
                    "oddsType": _oddsType,
                    "inplayLink": checkInplayLink(_singleMatch, _oddsType, pageName),
                    "_oddsSuffix": "odds"
                });
            }

            return oddsSelection;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (JSON.stringify(this.props.match) !== JSON.stringify(prevProps.match)) {
                this.setState({
                    singleMatch: this.props.match,
                    altRow: this.props.altRow,
                    couponID: this.props.couponID
                });
            } else if (this.props.couponID != prevProps.couponID) {
                this.setState({
                    couponID: this.props.couponID
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var singleMatch = this.state.singleMatch;
            var singleTournament = this.state.singleTournament;
            var loadLink = this.state.tableType.indexOf("Presales") >= 0;
            var _oddsType = this.state.oddsType;
            var isInplayOdds = singleMatch.inplayPools.length > 0 && singleMatch.IsMatchKickOff();
            var _matchID = singleMatch.matchIDinofficial;

            return React.createElement(
                'div', {
                    className: 'couponRow rAlt' + this.state.altRow + ' ' + this.state.couponID + ' ' + (tempMixAlupSelectedList['chk' + singleMatch.matchID] ? 'checkedOdds' : ''),
                    id: 'rmid' + _matchID
                },
                React.createElement(
                    'div', {
                        className: 'closeDay'
                    },
                    formatEsst(singleMatch, true, _oddsType)
                ),
                React.createElement(
                    'div', {
                        className: 'cday'
                    },
                    singleMatch.frontEndId
                ),
                React.createElement(
                    'div', {
                        className: 'cflag'
                    },
                    singleTournament != null ? formatImageStr([League.GetFlagPath(singleTournament.tournamentShortName), singleTournament['tournamentName' + curLang.toUpperCase()], singleTournament.tournamentShortName]) : ""
                ),
                React.createElement(
                    'div', {
                        className: pageName == "MIXALLUPLIST" ? "cteams mixallup_teamcontent" : "cteams"
                    },
                    pageName == "INPLAYHAD" ? displayInplayMatchDiv(singleMatch.isVoidMatch(), singleMatch.matchID, sTeamString(!isInplay, loadLink, singleMatch, false, true, _oddsType)) : oddsAllJump(singleMatch.matchID, sTeamString(!isInplay, loadLink, singleMatch, false, true, _oddsType), isInplayOdds)
                ),
                React.createElement(
                    'div', {
                        className: 'cvenue'
                    },
                    singleMatch.venue == null ? "" : formatNeutralGroundIcon(singleMatch.venue, "ng")
                ),
                pageName == "INPLAYHAD" ? React.createElement(
                    'div', {
                        className: 'ctv'
                    },
                    React.createElement(
                        'span',
                        null,
                        getLiveCastStr(singleMatch)
                    ),
                    React.createElement(
                        'span',
                        null,
                        getTvStr(singleMatch)
                    )
                ) : null,
                displayInplayClock(pageName) ? React.createElement(
                    'div', {
                        className: 'cinplay'
                    },
                    formatInplayIco(singleMatch, "ico", pageName)
                ) : null,
                pageName == "INDEX" ? React.createElement(
                    'div', {
                        className: 'ctv'
                    },
                    formatTVIcon(singleMatch.channel, "tv")
                ) : null,
                pageName == "INPLAYHAD" ? React.createElement(
                    'div', {
                        className: 'cesst'
                    },
                    React.createElement(
                        'span', {
                            id: 'sst' + singleMatch.matchID
                        },
                        React.createElement('input', {
                            type: 'hidden',
                            id: 'hsst' + singleMatch.matchID,
                            value: '' + singleMatch.ipinfo[1]
                        }),
                        React.createElement('span', {
                            dangerouslySetInnerHTML: {
                                __html: formatInplayTeamAndStatus(singleMatch.ipinfo, "stagemsg", singleMatch.matchTime)
                            }
                        })
                    )
                ) : null,
                this.showOddsSelection(),
                pageName == "MIXALLUPLIST" ? React.createElement(
                    'div', {
                        className: 'selectedandclear'
                    },
                    React.createElement('input', {
                        id: 'chk' + singleMatch.matchID,
                        defaultChecked: tempMixAlupSelectedList['chk' + singleMatch.matchID],
                        name: 'chksel',
                        type: 'checkbox',
                        value: singleMatch.matchID,
                        onClick: function onClick() {
                            toggleMix('chk' + singleMatch.matchID, 'rmid' + _matchID);
                            mixSelectedCount();
                        }
                    })
                ) : null,
                pageName != "MIXALLUPLIST" ? React.createElement(
                    'div', {
                        className: 'cheadtohead'
                    },
                    singleTournament != null ? formatJumpHeadStr(singleMatch) : ""
                ) : null
            );
        }
    }]);

    return MatchRow;
}(React.Component);

var MatchRow_MatchInResults = function(_React$Component23) {
    _inherits(MatchRow_MatchInResults, _React$Component23);

    function MatchRow_MatchInResults() {
        _classCallCheck(this, MatchRow_MatchInResults);

        return _possibleConstructorReturn(this, (MatchRow_MatchInResults.__proto__ || Object.getPrototypeOf(MatchRow_MatchInResults)).apply(this, arguments));
    }

    _createClass(MatchRow_MatchInResults, [{
        key: 'render',
        value: function render() {
            var singleMatch = this.props.match;
            var tourns = this.props.tournaments;
            var tourn = tourns.filter(function(valTourn) {
                return valTourn.tournamentID == singleMatch.tournament.tournamentID;
            });
            var fgsIsDefined = this.props.match.fgsresult != undefined && this.props.match.fgsresult != null;
            var fgsResultsDetails = this.props.match.fgsresult;
            var _matchDate = singleMatch.matchDate2.substr(8, 2) + "-" + singleMatch.matchDate2.substr(5, 2) + "-" + singleMatch.matchDate2.substr(0, 4);
            var _matchFGSText = [];
            var _hRefund = []; /*********** */ // or notyetavailable
            var _aRefund = []; /*********** */
            var _refundCell = void 0;
            var _singleTournament = singleMatch.tournament;

            if (fgsIsDefined && singleMatch.HasPoolResults("fgs")) {
                if (isPoolRefund(fgsResultsDetails.POOLSTATUS)) {
                    if (fgsResultsDetails.RESULTFINAL == "true") {
                        _matchFGSText = React.createElement(
                            'div', {
                                key: singleMatch.matchID + '_result',
                                className: 'center middle'
                            },
                            jsnotyetavailable
                        );
                    } else {
                        _matchFGSText = React.createElement(
                            'div', {
                                key: singleMatch.matchID + '_result',
                                className: 'red center middle'
                            },
                            React.createElement(
                                'a', {
                                    href: '/football/results/fgs_results.aspx'
                                },
                                jsfgsrefund
                            )
                        );
                    }
                } else {
                    var _allResult = fgsResultsDetails.RESULT;
                    var displayedFGSResult = false;

                    if (_allResult != undefined && _allResult != null && _allResult.length > 0) {
                        _matchFGSText = singleMatch.GetFGSResultDetailsText(false);
                        displayedFGSResult = true;
                    }
                    if (!displayedFGSResult) {
                        _matchFGSText = React.createElement(
                            'div', {
                                key: singleMatch.matchID + '_result'
                            },
                            jsmatchinprogress
                        );
                    }
                }
            } else {
                _matchFGSText = React.createElement(
                    'div', {
                        key: singleMatch.matchID + '_result'
                    },
                    jsmatchinprogress
                );
            }

            return React.createElement(
                'div', {
                    className: 'couponRow rAlt' + this.props.altRow,
                    id: 'rmid' + singleMatch.matchID
                },
                React.createElement(
                    'div', {
                        className: 'tableCell matchNum'
                    },
                    singleMatch.frontEndId
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell matchLeague'
                    },
                    formatImageStr([League.GetFlagPath(_singleTournament.tournamentShortName), _singleTournament['tournamentName' + curLang.toUpperCase()], _singleTournament.tournamentShortName])
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell resteamvs'
                    },
                    sTeamString(false, false, singleMatch, false, true, "FGS")
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell matchFGS center'
                    },
                    _matchFGSText
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell matchOdds center'
                    },
                    formatLastOddsString(singleMatch)
                )
            );
        }
    }]);

    return MatchRow_MatchInResults;
}(React.Component);

var MatchRow_ResultRow = function(_React$Component24) {
    _inherits(MatchRow_ResultRow, _React$Component24);

    function MatchRow_ResultRow() {
        _classCallCheck(this, MatchRow_ResultRow);

        return _possibleConstructorReturn(this, (MatchRow_ResultRow.__proto__ || Object.getPrototypeOf(MatchRow_ResultRow)).apply(this, arguments));
    }

    _createClass(MatchRow_ResultRow, [{
        key: 'renderMatchNum',
        value: function renderMatchNum(singleMatch) {
            if (singleMatch.isBAUResult) {
                return GetGlobalResources(singleMatch.matchDay, "js") + " " + singleMatch.matchNum;
            } else {
                return singleMatch.frontEndId == "" ? GetGlobalResources(singleMatch.matchDay, "js") + " " + singleMatch.matchNum : singleMatch.frontEndId;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var singleMatch = this.props.match;
            var firstHalfScore = void 0;
            var secondHalfScore = "";
            var extraTimeScore = "";
            var isFTVoid = false;

            var resultsScoreDetails = getResultScoreDetails(singleMatch);

            isFTVoid = resultsScoreDetails[0];
            firstHalfScore = resultsScoreDetails[1];
            secondHalfScore = resultsScoreDetails[2];
            extraTimeScore = resultsScoreDetails[3];

            var matchLeague = React.createElement(
                'div', {
                    className: 'tableCell matchLeague'
                },
                singleMatch.tournament.tournamentShortName != null && singleMatch.tournament.tournamentShortName != "" ? formatImageStr([League.GetFlagPath(singleMatch.tournament.tournamentShortName), singleMatch.tournament['tournamentName' + curLang.toUpperCase()], singleMatch.tournament.tournamentShortName]) : null
            );

            var matchID = singleMatch.frontEndId == "" ? GetGlobalResources(singleMatch.matchDay, "js") + " " + singleMatch.matchNum : singleMatch.frontEndId;

            return React.createElement(
                'div', {
                    className: 'couponRow rAlt' + this.props.altRow + ' ' + this.props.couponID,
                    id: 'rmid' + singleMatch.matchID
                },
                React.createElement(
                    'div', {
                        className: 'tableCell matchDate'
                    },
                    formatEsstStr(singleMatch.matchTime, true).split(' ')[0]
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell matchID'
                    },
                    this.renderMatchNum(singleMatch)
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell matchLeague'
                    },
                    matchLeague
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell resteamvs'
                    },
                    sTeamString(false, false, singleMatch, false, true, "FGS")
                ),
                isFTVoid ? React.createElement(
                    'div', {
                        className: 'tableCell matchHalf matchFT'
                    },
                    React.createElement(
                        'div', {
                            className: 'void'
                        },
                        jsvoidmatch
                    )
                ) : React.createElement(
                    'div', {
                        className: 'tableCell matchHalf'
                    },
                    firstHalfScore
                ),
                isFTVoid ? React.createElement('div', {
                    className: 'tableCell tableCellNoLeftBorder matchFull'
                }) : React.createElement(
                    'div', {
                        className: 'tableCell matchFull'
                    },
                    secondHalfScore,
                    extraTimeScore
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell matchDetail'
                    },
                    formatDetailsString(singleMatch)
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell matchOdds center'
                    },
                    formatLastOddsString(singleMatch)
                )
            );
        }
    }]);

    return MatchRow_ResultRow;
}(React.Component);

var MatchRow_FGSResults = function(_React$Component25) {
    _inherits(MatchRow_FGSResults, _React$Component25);

    function MatchRow_FGSResults() {
        _classCallCheck(this, MatchRow_FGSResults);

        return _possibleConstructorReturn(this, (MatchRow_FGSResults.__proto__ || Object.getPrototypeOf(MatchRow_FGSResults)).apply(this, arguments));
    }

    _createClass(MatchRow_FGSResults, [{
        key: 'render',
        value: function render() {
            var singleMatch = this.props.match;
            var _matchFGSText = [];
            var _hRefund = [];
            var _aRefund = [];
            var _refundCell = void 0;

            if (singleMatch.refundForAll) {
                _matchFGSText.push(React.createElement(
                    'div', {
                        className: 'center middle'
                    },
                    '-'
                ));
                _refundCell = React.createElement(
                    'div', {
                        className: 'crefund refundAll'
                    },
                    jsrefundforall
                );
            } else {
                for (var i = 0; i < singleMatch.results.length; i++) {
                    var res = singleMatch.results[i];
                    if (singleMatch.results[i] != null) {
                        _matchFGSText.push(React.createElement(
                            'div',
                            null,
                            res.SEL,
                            ' ',
                            curLang == "ch" ? res.CONTENTCH : res.CONTENTEN
                        ));
                    } else {
                        _matchFGSText.push(React.createElement(
                            'div', {
                                className: 'center middle'
                            },
                            '-'
                        ));
                    }
                }
                // display refund info
                var _allRefund = singleMatch.refunds;
                if (_allRefund.length == 0) {
                    _hRefund.push(React.createElement('div', null));
                    _aRefund.push(React.createElement('div', null));
                } else {
                    for (var _i3 = 0; _i3 < _allRefund.length; _i3++) {
                        var _refundTxt = _allRefund[_i3].SEL + " " + (curLang == "ch" ? _allRefund[_i3].CONTENTCH : _allRefund[_i3].CONTENTEN);
                        if (_allRefund[_i3].SEL[0] == "1") {
                            // home
                            _hRefund.push(React.createElement(
                                'div',
                                null,
                                _refundTxt
                            ));
                        } else {
                            // away
                            _aRefund.push(React.createElement(
                                'div',
                                null,
                                _refundTxt
                            ));
                        }
                    }
                }
                _refundCell = React.createElement(
                    'div', {
                        className: 'crefund flex'
                    },
                    React.createElement(
                        'div',
                        null,
                        _hRefund
                    ),
                    React.createElement(
                        'div',
                        null,
                        _aRefund
                    )
                );
            }

            var matchKODt = singleMatch.matchKODateFormatted != null && singleMatch.matchKODateFormatted != '' ? singleMatch.matchKODateFormatted : singleMatch.matchKODate;
            var eventId = singleMatch.frontEndId != null && singleMatch.frontEndId != '' ? singleMatch.frontEndId : singleMatch.matchDay + ' ' + singleMatch.matchNum;

            return React.createElement(
                'div', {
                    className: 'couponRow rAlt' + this.props.altRow
                },
                React.createElement(
                    'div', {
                        className: 'cday'
                    },
                    matchKODt
                ),
                React.createElement(
                    'div', {
                        className: 'cdate'
                    },
                    eventId
                ),
                React.createElement(
                    'div', {
                        className: 'cflag'
                    },
                    formatTournFlag(singleMatch.leagueCode, curLang == 'ch' ? singleMatch.leagueCh : singleMatch.leagueEn)
                ),
                React.createElement(
                    'div', {
                        className: 'cteams'
                    },
                    React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'span', {
                                className: 'teamname'
                            },
                            curLang == 'ch' ? singleMatch.homeCh : singleMatch.homeEn
                        ),
                        React.createElement(
                            'span', {
                                className: 'nolnk span_vs'
                            },
                            jsVS
                        ),
                        React.createElement(
                            'span', {
                                className: 'teamname'
                            },
                            curLang == 'ch' ? singleMatch.awayCh : singleMatch.awayEn
                        )
                    )
                ),
                React.createElement(
                    'div', {
                        className: 'cresult'
                    },
                    _matchFGSText
                ),
                _refundCell
            );
        }
    }]);

    return MatchRow_FGSResults;
}(React.Component);

var MatchRow_ParimutuelResults = function(_React$Component26) {
    _inherits(MatchRow_ParimutuelResults, _React$Component26);

    function MatchRow_ParimutuelResults() {
        _classCallCheck(this, MatchRow_ParimutuelResults);

        return _possibleConstructorReturn(this, (MatchRow_ParimutuelResults.__proto__ || Object.getPrototypeOf(MatchRow_ParimutuelResults)).apply(this, arguments));
    }

    _createClass(MatchRow_ParimutuelResults, [{
        key: 'render',
        value: function render() {
            var singleMatch = this.props.match;
            var _couponID = this.props._couponID;
            var rInd = this.props.rInd;
            var _void = this.props._void;
            var pmPool = pools == "DHCP" ? this.props.pool.dhcodds : this.props.pool.hfmodds;
            var divHT = '';
            var divFT = '';
            if (pools == "DHCP" && pmPool.RESULT != null) {
                var legDivs = pmPool.RESULT.split('/');
                if (legDivs.length > 1) {
                    var divs = legDivs[rInd - 1].split('#');
                    if (divs.length > 1) {
                        divHT = divs[0];
                        divFT = divs[1];
                    }
                }
            }

            var resultsScoreDetails = getResultScoreDetails(singleMatch);
            var isFTVoid = resultsScoreDetails[0];
            var firstHalfScore = resultsScoreDetails[1];
            var secondHalfScore = resultsScoreDetails[2];

            var flagStr = null;
            if (singleMatch.league != null) {
                flagStr = formatImageStr([League.GetFlagPath(singleMatch.league.leagueShortName), jsLang.toLowerCase() == 'ch' ? singleMatch.league.leagueNameCH : singleMatch.league.leagueNameEN, singleMatch.league.leagueShortName]);
            }

            return React.createElement(
                'div', {
                    className: 'tableRow couponRow rAlt' + this.props.altRow + ' ' + _couponID
                },
                React.createElement(
                    'div', {
                        className: 'tableCell matchLeg'
                    },
                    GetLegName(rInd - 1)
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell matchNum'
                    },
                    GetGlobalResources(singleMatch.matchDay),
                    ' ',
                    singleMatch.matchNum
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell matchLeague'
                    },
                    flagStr
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell matchTeam'
                    },
                    sTeamString(false, false, singleMatch, false, true, pools)
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell matchDate'
                    },
                    formatYYYYMMDD(singleMatch.matchTime.substr(0, 10).replace(/-/g, ''))
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell cotitle'
                    },
                    isFTVoid ? React.createElement(
                        'span', {
                            className: 'void'
                        },
                        jsvoid_match
                    ) : React.createElement(
                        'div', {
                            className: 'table'
                        },
                        React.createElement(
                            'span', {
                                className: 'codds r2 rRightWhiteBorder'
                            },
                            firstHalfScore,
                            formatDHCPSelectionText(pools, divHT)
                        ),
                        React.createElement(
                            'span', {
                                className: 'codds r2'
                            },
                            secondHalfScore,
                            formatDHCPSelectionText(pools, divFT)
                        )
                    )
                )
            );
        }
    }]);

    return MatchRow_ParimutuelResults;
}(React.Component);

var MatchRowSPCByItem = function(_React$Component27) {
    _inherits(MatchRowSPCByItem, _React$Component27);

    function MatchRowSPCByItem() {
        _classCallCheck(this, MatchRowSPCByItem);

        return _possibleConstructorReturn(this, (MatchRowSPCByItem.__proto__ || Object.getPrototypeOf(MatchRowSPCByItem)).apply(this, arguments));
    }

    _createClass(MatchRowSPCByItem, [{
        key: 'render',
        value: function render() {
            var singleMatch = this.props.match;
            var _item = this.props.item;
            var _oddsType = oddsType;
            var loadLink = false;
            var displayInplayLink = checkInplayLink(singleMatch, _oddsType, pageName);
            var singleTournament = [];

            return React.createElement(
                'div', {
                    className: 'couponRow couponRowSPCItem rAlt' + this.props.altRow + ' ' + this.props.couponID,
                    id: 'rmid' + singleMatch.matchID
                },
                displayInplayLink ? getInplayLinkOddsCellSet(singleMatch, _oddsType, singleMatch.matchIDinofficial, _item) : getOddsSelection({
                    "singleItem": _item,
                    "singleMatch": singleMatch,
                    "tableType": this.props.tableType,
                    "oddsType": oddsType,
                    "_oddsSuffix": "odds"
                })
            );
        }
    }]);

    return MatchRowSPCByItem;
}(React.Component);

var ParimutuelResultPoolDetails = function(_React$Component28) {
    _inherits(ParimutuelResultPoolDetails, _React$Component28);

    function ParimutuelResultPoolDetails() {
        _classCallCheck(this, ParimutuelResultPoolDetails);

        return _possibleConstructorReturn(this, (ParimutuelResultPoolDetails.__proto__ || Object.getPrototypeOf(ParimutuelResultPoolDetails)).apply(this, arguments));
    }

    _createClass(ParimutuelResultPoolDetails, [{
        key: 'render',
        value: function render() {
            var _void = this.props._void;
            var _couponID = this.props.couponID;
            var _pool = this.props._pool;
            var spUnitDividends = void 0,
                spWinningInvestment = void 0;

            var pmPool = pools == "DHCP" ? _pool.dhcodds : _pool.hfmodds;

            var _notPayout = pmPool.POOLSTATUS != "Payout";

            if (!_void) {
                if (pools == "DHCP") {
                    if (pmPool.winningdividend != '' && pmPool.winningdividend > 0) spUnitDividends = '$' + numberWithCommas(Math.round(pmPool.winningdividend * 100) / 100);
                    else spUnitDividends = jsNowinner;
                    spWinningInvestment = '$' + numberWithCommas(Math.round(pmPool.winninginvestment * 100) / 100);
                } else if (pools == "HFMP") {
                    if (pmPool.consolationdividend == null) spUnitDividends = React.createElement(
                        'span',
                        null,
                        ' ',
                        formatHFMPDividend(pmPool.winningdividend),
                        ' '
                    );
                    else {
                        spUnitDividends = React.createElement(
                            'span',
                            null,
                            jswinning,
                            ' ',
                            formatHFMPDividend(pmPool.winningdividend),
                            React.createElement('br', null),
                            jsconsolation,
                            ' ',
                            formatHFMPDividend(pmPool.consolationdividend)
                        );
                    }
                    var conInv = pmPool.consolationinvestment != null ? '$' + numberWithCommas(Math.round(pmPool.consolationinvestment * 100) / 100) : '';
                    spWinningInvestment = React.createElement(
                        'span',
                        null,
                        '$',
                        numberWithCommas(Math.round(pmPool.winninginvestment * 100) / 100),
                        React.createElement('br', null),
                        conInv,
                        React.createElement('br', null)
                    );
                }
            }

            var jpGen = numberWithCommas(pmPool.jackpotgen);
            if (jpGen != '-') jpGen = '$' + jpGen;

            return React.createElement(
                'div', {
                    className: 'yellowBar poolDetails ' + _couponID
                },
                React.createElement(
                    'div', {
                        className: 'tdWinning'
                    },
                    jswinningcombination,
                    ' :',
                    React.createElement('br', null),
                    _void ? "-" : pmPool.RESULT
                ),
                React.createElement(
                    'div', {
                        className: 'tdJackpot'
                    },
                    jsjackpotgenerated,
                    ' :',
                    React.createElement('br', null),
                    _void ? "-" : jpGen
                ),
                React.createElement(
                    'div', {
                        className: 'tdInvestment'
                    },
                    jsinvestment,
                    ' :',
                    React.createElement('br', null),
                    _void ? "-" : '$' + numberWithCommas(pmPool.investment)
                ),
                _void || _notPayout ? null : React.createElement(
                    'div', {
                        className: 'tdUnitdividend'
                    },
                    jsunitdividend,
                    ' :',
                    React.createElement('br', null),
                    spUnitDividends
                ),
                _void || _notPayout ? null : React.createElement(
                    'div', {
                        className: 'tdAmount'
                    },
                    jswinninginvestment,
                    ' :',
                    React.createElement('br', null),
                    spWinningInvestment
                )
            );
        }
    }]);

    return ParimutuelResultPoolDetails;
}(React.Component);

var ParimutuelResultPoolTable = function(_React$Component29) {
    _inherits(ParimutuelResultPoolTable, _React$Component29);

    function ParimutuelResultPoolTable() {
        _classCallCheck(this, ParimutuelResultPoolTable);

        return _possibleConstructorReturn(this, (ParimutuelResultPoolTable.__proto__ || Object.getPrototypeOf(ParimutuelResultPoolTable)).apply(this, arguments));
    }

    _createClass(ParimutuelResultPoolTable, [{
        key: 'render',
        value: function render() {
            var _void = this.props._void;
            var _couponID = this.props.couponID;
            var _pool = this.props._pool;

            var pmPool = pools == "DHCP" ? _pool.dhcodds : _pool.hfmodds;
            var noOfLeg = pools == "DHCP" ? 2 : 6;
            var _matchRows = [];
            //let _matchResult = pmPool.RESULT!=null ? pmPool.RESULT.split('/') : "";


            for (var _legInd = 1; _legInd <= noOfLeg; _legInd++) {
                //  if(_matchResult[_legInd]==undefined) {
                //    _matchResult[_legInd] = "";
                //  }
                _matchRows.push(React.createElement(MatchRow_ParimutuelResults, {
                    pool: _pool,
                    key: _couponID + '_' + _legInd,
                    rInd: _legInd,
                    altRow: (_legInd + 1) % 2,
                    _couponID: _couponID,
                    match: new Match_Result(pmPool['LEG' + _legInd]),
                    _void: _void
                }));
            }

            return React.createElement(
                'div', {
                    key: 'poolTable' + _couponID,
                    className: 'table ' + _couponID
                },
                React.createElement(
                    'div', {
                        className: 'tableRow tblHead'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell matchLeg'
                        },
                        jsleg
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell matchNum'
                        },
                        jsmatchno
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell matchLeague'
                        },
                        React.createElement(
                            'a', {
                                href: 'javascript:goFlagUrl();'
                            },
                            React.createElement('img', {
                                src: '/football/info/images/icon_flag.gif' + cacheVersion,
                                alt: jsleagues_and_tournaments,
                                title: jsleagues_and_tournaments
                            })
                        )
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell matchTeam'
                        },
                        jsteams1,
                        React.createElement('br', null),
                        jsteams2
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell matchDate'
                        },
                        jsdate
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell cotitle'
                        },
                        React.createElement(
                            'div', {
                                className: 'rBottomBorder'
                            },
                            jsmatchresults
                        ),
                        React.createElement(
                            'div', {
                                className: 'table'
                            },
                            React.createElement(
                                'span', {
                                    className: 'codds r2'
                                },
                                jsres_halftime
                            ),
                            React.createElement(
                                'span', {
                                    className: 'codds r2'
                                },
                                jsres_fulltime
                            )
                        )
                    )
                ),
                _matchRows
            );
        }
    }]);

    return ParimutuelResultPoolTable;
}(React.Component);

var ParimutuelNextDraw = function(_React$Component30) {
    _inherits(ParimutuelNextDraw, _React$Component30);

    function ParimutuelNextDraw() {
        _classCallCheck(this, ParimutuelNextDraw);

        return _possibleConstructorReturn(this, (ParimutuelNextDraw.__proto__ || Object.getPrototypeOf(ParimutuelNextDraw)).apply(this, arguments));
    }

    _createClass(ParimutuelNextDraw, [{
        key: 'render',
        value: function render() {
            var lblNextDate = void 0;
            var _pool = this.props._pool;
            var _poolInfo = void 0;
            if (pools == "DHCP") {
                lblNextDate = jsnextdhcpdate;
                _poolInfo = _pool.dhcodds;
            } else if (pools == "HFMP") {
                lblNextDate = jsnext6hafudate;
                _poolInfo = _pool.hfmodds;
            }

            return React.createElement(
                'div', {
                    className: 'yellowBar poolNextDraw'
                },
                React.createElement(
                    'div', {
                        className: 'tdNextDate'
                    },
                    lblNextDate,
                    ' :',
                    React.createElement('br', null),
                    React.createElement(
                        'a', {
                            href: '#',
                            onClick: function onClick() {
                                return switchTo('football', 'odds/odds_' + pools.toLowerCase(), curLang);
                            }
                        },
                        formatYYYYMMDD(_pool.matchTime.substr(0, 10).replace(/-/g, '')),
                        ' ',
                        GetGlobalResources(_pool.matchDay),
                        ' ',
                        _pool.matchNum
                    )
                ),
                React.createElement(
                    'div', {
                        className: 'tdInvestment'
                    },
                    jsinvestment,
                    ' :',
                    React.createElement('br', null),
                    _poolInfo.investment == "" ? "-" : '$' + numberWithCommas(_poolInfo.investment)
                ),
                React.createElement(
                    'div', {
                        className: 'tdJackpot'
                    },
                    jsjackpot,
                    ' :',
                    React.createElement('br', null),
                    _poolInfo.jackpot == "" ? "-" : '$' + numberWithCommas(_poolInfo.jackpot)
                ),
                React.createElement(
                    'div', {
                        className: 'tdEsst'
                    },
                    jsesst_nobr,
                    ' :',
                    React.createElement('br', null),
                    formatEsstStr(_pool.matchTime, false)
                )
            );
        }
    }]);

    return ParimutuelNextDraw;
}(React.Component);

var OddsSelectionHeader = function(_React$Component31) {
    _inherits(OddsSelectionHeader, _React$Component31);

    function OddsSelectionHeader() {
        _classCallCheck(this, OddsSelectionHeader);

        return _possibleConstructorReturn(this, (OddsSelectionHeader.__proto__ || Object.getPrototypeOf(OddsSelectionHeader)).apply(this, arguments));
    }

    _createClass(OddsSelectionHeader, [{
        key: 'render',
        value: function render() {
            var _poolType = this.props.poolType;
            var _specClass = this.props.specClass;
            var _singleMatch = this.props.singleMatch;
            return getOddsTDForAllOdds(_singleMatch, _poolType, 'tableCell', 'tOdds ' + _specClass);
        }
    }]);

    return OddsSelectionHeader;
}(React.Component);

function getInplayLinkOddsCellSet(singleMatch, _oddsType, _matchID, item) {
    if (singleMatch == null) return;
    if (_oddsType.match(/^(HAD|HADINPLAY|FHA|FHAINPLAY|HHA|HHAINPLAY)$/)) {
        return [React.createElement(
            'div', {
                className: 'cInplayLnk inplayLnkInRow width300',
                key: _matchID + _oddsType + "inplay_codds"
            },
            React.createElement(
                'div',
                null,
                formatInplayIco(singleMatch, "url", pageName)
            )
        ), formatEmptyOddsCell(_matchID + _oddsType + "D_codds"), formatEmptyOddsCell(_matchID + _oddsType + "A_codds")];
    } else if (_oddsType.match(/^(HDC|HDCINPLAY)$/)) {
        return [React.createElement(
            'div', {
                className: 'cInplayLnk inplayLnkInRow width200',
                key: _matchID + _oddsType + "inplay_codds"
            },
            React.createElement(
                'div',
                null,
                formatInplayIco(singleMatch, "url", pageName)
            )
        ), formatEmptyOddsCell(_matchID + _oddsType + "A_codds")];
    } else if (_oddsType.match(/^(FTS|NTS|ETS)$/)) {
        return [React.createElement(
            'div', {
                className: 'cInplayLnk inplayLnkInRow width300',
                key: _matchID + _oddsType + "inplay_codds"
            },
            React.createElement(
                'div',
                null,
                formatInplayIco(singleMatch, "url", pageName)
            )
        ), formatEmptyOddsCell(_matchID + _oddsType + "N_codds"), formatEmptyOddsCell(_matchID + _oddsType + "A_codds")];
    } else if (_oddsType == "OOE") {
        return [React.createElement(
            'div', {
                className: 'cInplayLnk inplayLnkInRow width200',
                key: _matchID + _oddsType + "inplay_codds"
            },
            React.createElement(
                'div',
                null,
                formatInplayIco(singleMatch, "url", pageName)
            )
        ), formatEmptyOddsCell(_matchID + _oddsType + "E_codds")];
    } else if (_oddsType == "TQL") {
        return [React.createElement(
            'div', {
                className: 'cInplayLnk inplayLnkInRow width300',
                key: _matchID + _oddsType + "inplay_codds"
            },
            React.createElement(
                'div',
                null,
                formatInplayIco(singleMatch, "url", pageName)
            )
        ), formatEmptyTQLOddsCell("codds", _matchID + _oddsType + "H_codds"), formatEmptyTQLOddsCell("cteams", _matchID + _oddsType + "A_team"), formatEmptyTQLOddsCell("codds", _matchID + _oddsType + "A_codds")];
    } else if (_oddsType.match(/^(HFT|HFTINPLAY)$/)) {
        return [React.createElement(
            'div', {
                className: 'cInplayLnk inplayLnkInRow width900',
                key: _matchID + _oddsType + "inplay_codds"
            },
            React.createElement(
                'div',
                null,
                formatInplayIco(singleMatch, "url", pageName)
            )
        ), formatEmptyOddsCell(_matchID + _oddsType + "HD_codds"), formatEmptyOddsCell(_matchID + _oddsType + "HA_codds"), formatEmptyOddsCell(_matchID + _oddsType + "DH_codds"), formatEmptyOddsCell(_matchID + _oddsType + "DD_codds"), formatEmptyOddsCell(_matchID + _oddsType + "DA_codds"), formatEmptyOddsCell(_matchID + _oddsType + "AH_codds"), formatEmptyOddsCell(_matchID + _oddsType + "AD_codds"), formatEmptyOddsCell(_matchID + _oddsType + "AA_codds")];
    } else if (_oddsType.match(/^(TTG|ETG|TTGINPLAY)$/)) {
        return [React.createElement(
            'div', {
                className: 'cInplayLnk inplayLnkInRow width900',
                key: _matchID + _oddsType + "inplay_codds"
            },
            React.createElement(
                'div',
                null,
                formatInplayIco(singleMatch, "url", pageName)
            )
        )];
    } else if (isML(_oddsType)) {
        return [React.createElement(
            'div', {
                className: 'cInplayLnk inplayLnkInRow width350',
                key: _matchID + _oddsType + "inplay_codds"
            },
            React.createElement(
                'div',
                null,
                formatInplayIco(singleMatch, "url", pageName)
            )
        ), formatEmptyOddsCell(_matchID + _oddsType + "H_codds"), formatEmptyOddsCell(_matchID + _oddsType + "L_codds"), React.createElement('div', {
            className: 'noBorder tgIndMl',
            key: _matchID + _oddsType + "tg"
        })];
    } else if (_oddsType == "SPC") {
        if (item !== undefined && item !== null) {
            var singleItemAns = [];

            singleItemAns.push(React.createElement(
                'div', {
                    className: 'cInplayLnk inplayLnkInRow width300',
                    key: _matchID + _oddsType + "inplay_codds"
                },
                React.createElement(
                    'div',
                    null,
                    formatInplayIco(singleMatch, "url", pageName)
                )
            ));
            item.SELLIST.forEach(function(selItem, ind2) {
                var _itemNum = selItem.SEL + "_" + item.ITEM;
                singleItemAns.push(formatEmptyOddsCell(_matchID + _oddsType + _itemNum + "_codds"));
            });
            return singleItemAns;
        }
    } else {
        return null;
    }
}

function getOddsSelection(props) {
    try {
        var i;

        var _ret = function() {
            var singleMatch = props.singleMatch;
            var _matchID = singleMatch.matchIDinofficial;
            var _oddsType = props.oddsType;
            var _oddsSet = singleMatch[_oddsType.toLowerCase() + props._oddsSuffix];
            var _tableType = props.tableType;
            var _ref = props._ref == undefined || props._ref == null ? "" : props._ref;
            var _rowClasses = "coddsSelections";
            var _checkboxTypeList = props.checkboxTypeList;

            if (isDisplayMultiplePoolPage(pageName) && !isMultiRowPool(_oddsType)) _rowClasses += " rAlt0";
            if (_tableType == "result") {
                _tableType = "presales";
                //_oddsSet = singleMatch[_oddsType.toLowerCase()+"lastodds"]; 
            }

            var isExpanded = false;
            if (isML(_oddsType)) {
                isExpanded = $('#rmid' + _matchID).find('.mlBtnMinus').is(':visible');
            }

            if ((pageName == "INPLAYHAD" || pageName == "OFM") && (_oddsSet === undefined || _oddsSet === null || isPoolClosed(_oddsSet.POOLSTATUS))) {
                return {
                    v: [React.createElement(
                        'div', {
                            className: 'codds',
                            key: _matchID + _oddsType + "D_codds"
                        },
                        React.createElement(
                            'div', {
                                className: 'hadstopsell'
                            },
                            displayInplayAllOddsAfterHADStopsell(singleMatch)
                        )
                    ), formatEmptyOddsCell(_matchID + _oddsType + "D_codds"), formatEmptyOddsCell(_matchID + _oddsType + "A_codds")]
                };
            }

            var poolStatus = "";
            var poolId = "";
            var lineId = "";
            var isAllup = false;
            if (_oddsType != "SPC") {
                poolStatus = _oddsSet.POOLSTATUS;
                poolId = _oddsSet.POOLID;
                lineId = _oddsSet.LINEID;
                isAllup = _oddsSet.ALLUP;
            }

            var tmpAllCheckBoxType = void 0;
            if (isMultiplePoolPage()) {
                tmpAllCheckBoxType = getCheckboxType(_oddsType);
            } else {
                tmpAllCheckBoxType = allCheckBoxType;
            }

            // XXXINPLAY are included for last odds page
            if (_oddsType.match(/^(HAD|EHA|HADINPLAY|FHA|FHAINPLAY|HHA|HHAINPLAY|HDC|EDC|HDCINPLAY|FTS|OOE|HFT|HFTINPLAY|TTG|ETG|TTGINPLAY)$/) || (_oddsType == "NTS" || _oddsType == "ENT" || _oddsType == "ETS") && pageName != "RESULT" || (_oddsType == "TQL" || _oddsType == "TQLINPLAY") && pageName == "RESULT") {
                var tmpCells = [];
                tmpAllCheckBoxType.forEach(function(_cbType) {
                    tmpCells.push(React.createElement(OddsCell, {
                        key: '' + _matchID + _oddsType + _cbType + '_0OC',
                        rkey: '' + _matchID + _oddsType + _cbType + '_0OC',
                        _oddsType: _oddsType,
                        _matchID: _matchID,
                        oddsSet: _oddsSet,
                        checkboxType: '' + _cbType,
                        lineNum: '0',
                        _tableType: _tableType,
                        poolStatus: poolStatus,
                        isAllup: isAllup,
                        poolId: poolId,
                        lineId: lineId
                    }));
                });
                if (_oddsType.match(/^(TTG|ETG|TTGINPLAY)$/)) {
                    return {
                        v: React.createElement(
                            'div', {
                                className: 'cotitle'
                            },
                            React.createElement(
                                'div', {
                                    className: 'tOdds tSel rBottomBorder ttgNo'
                                },
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    '0'
                                ),
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    '1'
                                ),
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    '2'
                                ),
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    '3'
                                ),
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    '4'
                                ),
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    '5'
                                ),
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    '6'
                                ),
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    '7+'
                                )
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' tOdds'
                                },
                                tmpCells
                            )
                        )
                    };
                } else {
                    return {
                        v: tmpCells
                    };
                }
            } else if (_oddsType == "TQL") {
                var _tmpCells = [];
                var firstOddsType = "1";
                var secondOddsType = "2";
                var _tournId = singleMatch.tournament.tournamentID;
                for (i = 0; i < _oddsSet.SELLIST.length; i++) {
                    var teamId = _oddsSet.SELLIST[i].TEAMID;
                    if (teamId == _oddsSet.homeTeam.teamID) {
                        firstOddsType = _oddsSet.SELLIST[i].SEL;
                    } else {
                        secondOddsType = _oddsSet.SELLIST[i].SEL;
                    }
                }

                tmpAllCheckBoxType.forEach(function(_cbType, index) {
                    var oddsName = "";
                    if (index == 0) {
                        oddsName = jsLang.toLowerCase() == 'ch' ? singleMatch.homeTeam.teamNameCH : singleMatch.homeTeam.teamNameEN;
                        _cbType = firstOddsType;
                    } else {
                        oddsName = jsLang.toLowerCase() == 'ch' ? singleMatch.awayTeam.teamNameCH : singleMatch.awayTeam.teamNameEN;
                        _cbType = secondOddsType;
                    }

                    _tmpCells.push(React.createElement(OddsCell, {
                        key: '' + _tournId + _oddsType + _cbType + '_0OC',
                        rkey: '' + _tournId + _oddsType + _cbType + '_0OC',
                        _oddsType: _oddsType,
                        _matchID: _matchID,
                        oddsSet: _oddsSet,
                        checkboxType: '' + _cbType,
                        lineNum: '0',
                        _tableType: _tableType,
                        poolStatus: poolStatus,
                        isAllup: isAllup,
                        poolId: poolId,
                        oddsName: oddsName
                    }));
                });
                return {
                    v: _tmpCells
                };
            } else if (_oddsType.match(/^(NTS|ETS|ENT)$/)) {
                // last odds NTS
                var tmpRows = [];

                var _loop = function _loop(lineInd) {
                    var tmpOddsSet = _oddsSet[lineInd];
                    var tmpCells = [];
                    if (pageName == "RESULT") {
                        var goalnumber = tmpOddsSet.ITEM;
                        if (jsLang == "EN") {
                            goalnumber = React.createElement(
                                'div', {
                                    className: 'codds',
                                    key: 'goalno' + lineInd
                                },
                                goalnumber,
                                React.createElement(
                                    'label', {
                                        className: 'lblSup'
                                    },
                                    getNumberSuffix(goalnumber)
                                ),
                                GetGlobalResources("ntslastpart", "js")
                            );
                        } else {
                            goalnumber = React.createElement(
                                'div', {
                                    className: 'codds',
                                    key: 'goalno' + lineInd
                                },
                                GetGlobalResources("ntsfstpart", "js"),
                                goalnumber,
                                GetGlobalResources("ntslastpart", "js")
                            );
                        }
                        tmpCells.push(goalnumber);
                        /*
                        tmpCells.push(
                          <div className="codds">{GetGlobalResources("ntsfstpart", "js")}{tmpOddsSet.ITEM}</div>
                        );
                        */
                    }
                    tmpAllCheckBoxType.forEach(function(_cbType) {
                        tmpCells.push(React.createElement(OddsCell, {
                            key: '' + _matchID + _oddsType + _cbType + '_' + lineInd + 'OC',
                            rkey: '' + _matchID + _oddsType + _cbType + '_' + lineInd + 'OC',
                            _oddsType: _oddsType,
                            _matchID: _matchID,
                            oddsSet: tmpOddsSet,
                            checkboxType: '' + _cbType,
                            lineNum: lineInd,
                            _tableType: _tableType,
                            poolStatus: '',
                            isAllup: 'false',
                            poolId: ''
                        }));
                    });
                    tmpRows.push(React.createElement(
                        'div', {
                            key: 'ntsLastOddsRow' + lineInd,
                            className: 'coddsSelections rAlt' + lineInd % 2
                        },
                        tmpCells
                    ));
                };

                for (var lineInd = 0; lineInd < _oddsSet.length; lineInd++) {
                    _loop(lineInd);
                }
                return {
                    v: tmpRows
                };
            } else if (_oddsType == "FGS") {
                var allSelections = [];
                allSelections[0] = []; // home 
                allSelections[1] = []; // away
                var noScoreItem = void 0;
                _oddsSet.SELLIST.forEach(function(item) {
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
                    for (var addCellInd = allSelections[1].length; addCellInd < allSelections[0].length; addCellInd++) {
                        allSelections[1].push(formatEmptySelectionInsideGroup(_oddsType, allSelections[0].length));
                    }
                } else {
                    for (var _addCellInd = allSelections[0].length; _addCellInd < allSelections[1].length; _addCellInd++) {
                        allSelections[0].push(formatEmptySelectionInsideGroup(_oddsType, allSelections[1].length));
                    }
                }

                var oddsRows = [];
                for (var rInd = 0; rInd < allSelections[0].length; rInd++) {
                    oddsRows.push(React.createElement(
                        'div', {
                            key: 'FGS' + oddsRows.length,
                            className: _rowClasses + ' rAlt' + rInd % 2
                        },
                        allSelections[0][rInd],
                        allSelections[1][rInd]
                    ));
                }

                return {
                    v: React.createElement(
                        'div', {
                            className: 'table'
                        },
                        oddsRows,
                        React.createElement(
                            'div', {
                                className: 'nofgs'
                            },
                            React.createElement(
                                'div', {
                                    className: 'rAlt0'
                                },
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    React.createElement(
                                        'span', {
                                            id: 's' + _matchID + '_' + noScoreItem.SEL,
                                            className: 'sel'
                                        },
                                        "00 " + (jsLang == "CH" ? noScoreItem.CONTENTCH : noScoreItem.CONTENTEN)
                                    )
                                )
                            ),
                            React.createElement(
                                'div', {
                                    className: 'rAlt1'
                                },
                                React.createElement(OddsCell, {
                                    key: '' + _matchID + _oddsType + noScoreItem.SEL + '_0OC',
                                    rkey: '' + _matchID + _oddsType + noScoreItem.SEL + '_0OC',
                                    _oddsType: _oddsType,
                                    _matchID: _matchID,
                                    oddsSet: noScoreItem,
                                    checkboxType: 'ODDS',
                                    lineNum: '0',
                                    _tableType: _tableType,
                                    poolStatus: poolStatus,
                                    isAllup: isAllup,
                                    poolId: poolId
                                })
                            )
                        )
                    )
                };
            } else if (_oddsType.match(/^(CRS|ECS|CRSINPLAY|FCS|FCSINPLAY)$/)) {
                if (pageName == "MIXALLUP") {
                    return {
                        v: React.createElement(
                            'div', {
                                className: 'allSelections'
                            },
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt0'
                                },
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0100", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0200", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0201", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0300", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0301", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0302", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0400", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0401", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0402", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0500", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0501", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0502", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "SM1MH", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt1'
                                },
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    jsHOME
                                ),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0100", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0200", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0201", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0300", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0301", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0302", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0400", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0401", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0402", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0500", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0501", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0502", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "SM1MH", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt0'
                                },
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0001", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0002", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0102", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0003", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0103", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0203", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0004", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0104", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0204", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0005", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0105", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0205", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "SM1MA", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt1'
                                },
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    jsAWAY
                                ),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0001", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0002", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0102", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0003", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0103", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0203", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0004", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0104", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0204", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0005", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0105", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0205", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "SM1MA", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt0 crsDrawRow'
                                },
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0000", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0101", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0202", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "S0303", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionText(_oddsType, _matchID, _oddsSet, "SM1MD", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt1 crsDrawRow'
                                },
                                React.createElement(
                                    'div', {
                                        className: 'codds'
                                    },
                                    jsDRAW
                                ),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0000", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0101", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0202", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "S0303", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, "SM1MD", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            )
                        )
                    };
                } else {
                    return {
                        v: React.createElement(
                            'div', {
                                className: 'allSelections'
                            },
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt0'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0100", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0000", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0001", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt1'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0200", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0101", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0002", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt0'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0201", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0202", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0102", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt1'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0300", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0303", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0003", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt0'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0301", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0103", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt1'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0302", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0203", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt0'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0400", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0004", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt1'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0401", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0104", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt0'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0402", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0204", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt1'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0500", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0005", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt0'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0501", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0105", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt1'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0502", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                React.createElement('div', {
                                    className: 'codds'
                                }),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0205", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            ),
                            React.createElement(
                                'div', {
                                    className: _rowClasses + ' rAlt0'
                                },
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MH", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MD", 0, _tableType, isExpanded, poolStatus, isAllup, poolId),
                                formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MA", 0, _tableType, isExpanded, poolStatus, isAllup, poolId)
                            )
                        )
                    };
                }
            } else if (isML(_oddsType)) {
                if (isDisplayMultiplePoolPage(pageName)) {
                    var _allSelections = [];
                    var isSkipeOdds = false;
                    _oddsSet.LINELIST.forEach(function(_singleOddsSet, _ind) {
                        isSkipeOdds = false;
                        if (_singleOddsSet["SKIPELINE"] != null && _singleOddsSet["SKIPELINE"] == "1" && !isResultPage()) isSkipeOdds = true;

                        var tmpCells = [];
                        tmpAllCheckBoxType.forEach(function(_cbType) {
                            if (_singleOddsSet[_cbType] != null) {

                                if (_singleOddsSet[_cbType].indexOf("LSE") >= 0) isSkipeOdds = true;

                                tmpCells.push(React.createElement(OddsCell, {
                                    key: '' + _matchID + _oddsType + _cbType + '_' + _singleOddsSet.LINENUM + 'OC',
                                    rkey: '' + _matchID + _oddsType + _cbType + '_' + _singleOddsSet.LINENUM + 'OC',
                                    _oddsType: _oddsType,
                                    _matchID: _matchID,
                                    oddsSet: _singleOddsSet,
                                    checkboxType: '' + _cbType,
                                    lineNum: _singleOddsSet.LINENUM,
                                    _tableType: _tableType,
                                    poolStatus: poolStatus,
                                    isAllup: isAllup,
                                    poolId: poolId
                                }));
                            }
                        });

                        if (!isSkipeOdds) {
                            _allSelections.push(React.createElement(
                                'div', {
                                    key: '' + _oddsType + _singleOddsSet.LINENUM,
                                    className: _rowClasses + ' rAlt' + _ind % 2
                                },
                                formatLineNum(_oddsType, _matchID, [_singleOddsSet], isExpanded, poolStatus),
                                tmpCells
                            ));
                        }
                    });

                    return {
                        v: React.createElement(
                            'div', {
                                className: 'allSelections'
                            },
                            _allSelections
                        )
                    };
                } else {
                    var _tmpCells2 = [];
                    tmpAllCheckBoxType.forEach(function(_cbType) {
                        var tmpTypeCells = [];
                        var hasMainLine = false;
                        _oddsSet.LINELIST.forEach(function(singleOddsSet, index) {
                            var _key = '' + _matchID + _oddsType + _cbType + '_0OC_' + singleOddsSet.LINENUM;
                            var lineClass = "",
                                lineDisplayValue = "";
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
                            tmpTypeCells.push(React.createElement(OddsCell, {
                                key: _key,
                                rkey: _key,
                                _oddsType: _oddsType,
                                _matchID: _matchID,
                                oddsSet: singleOddsSet,
                                checkboxType: '' + _cbType,
                                lineNum: singleOddsSet.LINENUM,
                                _tableType: _tableType,
                                poolStatus: poolStatus,
                                isAllup: isAllup,
                                extraClass: lineClass,
                                displayValue: lineDisplayValue,
                                poolId: poolId
                            }));
                        });
                        _tmpCells2.push(React.createElement(
                            'div', {
                                className: 'codds'
                            },
                            tmpTypeCells
                        ));
                    });

                    return {
                        v: [formatLineNum(_oddsType, _matchID, _oddsSet, isExpanded, poolStatus), _tmpCells2, _oddsSet.LINELIST.length > 1 ? React.createElement(
                            'div', {
                                className: 'tgIndMl',
                                key: _matchID + _oddsType + "tg"
                            },
                            React.createElement('span', {
                                onClick: function onClick() {
                                    tgIndMl(singleMatch.matchIDinofficial);
                                },
                                className: 'mlBtnPlus'
                            })
                        ) : React.createElement('div', {
                            className: 'tgIndMl',
                            key: _matchID + _oddsType + "tg"
                        })]
                    };
                }
            } else if (_oddsType == "SPC" || _oddsType == "SPCINPLAY") {
                var item = props.singleItem;
                if (item !== undefined && item !== null) {
                    var singleItemAns = [];
                    poolStatus = item.POOLSTATUS;
                    isAllup = item.ALLUP;
                    poolId = item.POOLID;
                    item.SELLIST.forEach(function(selItem, ind2) {
                        var _itemNum = selItem.SEL + "_" + item.ITEM;
                        singleItemAns.push(React.createElement(OddsCell, {
                            key: '' + _matchID + _oddsType + _itemNum + 'OC',
                            rkey: '' + _matchID + _oddsType + _itemNum + 'OC',
                            _oddsType: _oddsType,
                            _matchID: _matchID,
                            oddsSet: selItem,
                            checkboxType: 'ODDS',
                            lineNum: '' + _itemNum,
                            _tableType: _tableType,
                            poolStatus: poolStatus,
                            isAllup: isAllup,
                            poolId: poolId
                        }));
                    });
                    return {
                        v: singleItemAns
                    };
                } else {
                    var _tableKey = singleMatch.matchID;
                    if (_oddsType == "SPCINPLAY") {
                        _ref = "inplay";
                        _tableKey = singleMatch.matchID + _ref;
                    }
                    return {
                        v: React.createElement(SPCTableByMatch, {
                            singleMatch: singleMatch,
                            tableType: _tableType,
                            key: _tableKey,
                            spcOddsType: _ref
                        })
                    };
                }
            } else if (_oddsType == "SGA") {
                return {
                    v: React.createElement(SGATable, {
                        singleMatch: singleMatch,
                        key: singleMatch.matchID,
                        tableType: _tableType
                    })
                };
            } else {
                return {
                    v: null
                };
            }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } catch (ex) {
        return null;
    }
}

var MultiPoolPageOddsSelection = function(_React$Component32) {
    _inherits(MultiPoolPageOddsSelection, _React$Component32);

    function MultiPoolPageOddsSelection() {
        _classCallCheck(this, MultiPoolPageOddsSelection);

        return _possibleConstructorReturn(this, (MultiPoolPageOddsSelection.__proto__ || Object.getPrototypeOf(MultiPoolPageOddsSelection)).apply(this, arguments));
    }

    _createClass(MultiPoolPageOddsSelection, [{
        key: 'render',
        value: function render() {
            try {
                var singleMatch = this.props.singleMatch;
                var _tableType = this.props.tableType;
                var _oddsType2 = this.props.oddsType;
                var _oddsSuffix = "odds";

                var _rowClasses = "coddsSelections";
                if (!isMultiRowPool(_oddsType2)) _rowClasses += " rAlt0";
                if (_tableType == "result") {
                    _tableType = "presales";
                    //  _oddsSuffix = "lastodds";
                    if (!(_oddsType2.toLowerCase() + _oddsSuffix) in singleMatch) return null;
                    //_oddsSet = singleMatch[_oddsType.toLowerCase()+"lastodds"];
                }

                var _oddsSelection = getOddsSelection({
                    "singleMatch": singleMatch,
                    "tableType": _tableType,
                    "oddsType": _oddsType2,
                    "inplayLink": false,
                    "_oddsSuffix": _oddsSuffix
                });

                if (_oddsType2.match(/^(HAD|EHA|HADINPLAY|FHA|FHAINPLAY|HHA|HHAINPLAY|OOE|TQL|TQLINPLAY|HFT|HFTINPLAY)$/)) {
                    return React.createElement(
                        'div', {
                            className: _rowClasses
                        },
                        _oddsSelection
                    );
                } else if (_oddsType2.match(/^(HDC|HDCINPLAY|EDC)$/)) {
                    var hTeamName = jsLang.toLowerCase() == 'ch' ? singleMatch.homeTeam.teamNameCH : singleMatch.homeTeam.teamNameEN;
                    var aTeamName = jsLang.toLowerCase() == 'ch' ? singleMatch.awayTeam.teamNameCH : singleMatch.awayTeam.teamNameEN;

                    return React.createElement(
                        'div', {
                            className: _rowClasses
                        },
                        React.createElement(
                            'div', {
                                id: 'hdcGL',
                                className: 'cline'
                            },
                            hTeamName,
                            renderGoalLine(singleMatch, _oddsType2, "HG", false, false, "0"),
                            React.createElement('br', null),
                            aTeamName,
                            renderGoalLine(singleMatch, _oddsType2, "AG", false, false, "0")
                        ),
                        _oddsSelection
                    );
                } else if (_oddsType2.match(/^(FTS|NTS|ENT|ETS)$/)) {
                    if (pageName == "RESULT") {
                        return React.createElement(
                            'div', {
                                className: 'table'
                            },
                            _oddsSelection
                        );
                    } else {
                        return React.createElement(
                            'div', {
                                className: _rowClasses
                            },
                            _oddsSelection
                        );
                    }
                } else if (_oddsType2.match(/^(TTG|ETG|TTGINPLAY|FGS|CRS|ECS|CRSINPLAY|FCS|FCSINPLAY|SPC|SPCINPLAY|SGA)$/) || isML(_oddsType2)) {
                    return _oddsSelection;
                } else {
                    return null;
                }
            } catch (ex) {
                return null;
            }
        }
    }]);

    return MultiPoolPageOddsSelection;
}(React.Component);

var OddsSelectionDHCP = function(_React$Component33) {
    _inherits(OddsSelectionDHCP, _React$Component33);

    function OddsSelectionDHCP() {
        _classCallCheck(this, OddsSelectionDHCP);

        return _possibleConstructorReturn(this, (OddsSelectionDHCP.__proto__ || Object.getPrototypeOf(OddsSelectionDHCP)).apply(this, arguments));
    }

    _createClass(OddsSelectionDHCP, [{
        key: 'render',
        value: function render() {
            var couponID = this.props.couponID;
            var indexInCoupon = this.props.indexInCoupon;
            var lineNum = (parseInt(couponID, 10) - 1) * 2 + (parseInt(indexInCoupon, 10) - 1);
            var singleMatch = this.props.singleMatch;
            var _matchID = singleMatch.matchIDinofficial + "_" + indexInCoupon;
            var _oddsType = this.props.oddsType;
            var _oddsSet = singleMatch[_oddsType.toLowerCase() + "odds"];
            var _tableType = this.props.tableType;
            var poolStatus = this.props.poolStatus;
            var isAllup = singleMatch.isVoidMatch(); //used for void match checking
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
                    wordsInGrayBar = React.createElement(
                        'span',
                        null,
                        'F',
                        React.createElement('br', null),
                        'I',
                        React.createElement('br', null),
                        'R',
                        React.createElement('br', null),
                        'S',
                        React.createElement('br', null),
                        'T',
                        React.createElement('br', null),
                        React.createElement('br', null),
                        'H',
                        React.createElement('br', null),
                        'A',
                        React.createElement('br', null),
                        'L',
                        React.createElement('br', null),
                        'F'
                    );
                } else {
                    wordsInGrayBar = React.createElement(
                        'span',
                        null,
                        'F',
                        React.createElement('br', null),
                        'U',
                        React.createElement('br', null),
                        'L',
                        React.createElement('br', null),
                        'L',
                        React.createElement('br', null),
                        React.createElement('br', null),
                        'T',
                        React.createElement('br', null),
                        'I',
                        React.createElement('br', null),
                        'M',
                        React.createElement('br', null),
                        'E'
                    );
                }
            }
            hTeamName += " (" + jsHomeTeamWin + ")";
            aTeamName += " (" + jsAwayTeamWin + ")";

            _rowClasses += "";

            var isExpanded = false;

            return React.createElement(
                'div', {
                    className: 'pariOddsInCoupon borderT'
                },
                React.createElement(
                    'div', {
                        className: 'grayBar tdProgress'
                    },
                    wordsInGrayBar
                ),
                React.createElement(
                    'div', {
                        className: 'betTypeAllOdds allSelections'
                    },
                    React.createElement(
                        'div', {
                            className: 'tOdds rBottomBorder'
                        },
                        React.createElement(
                            'div', {
                                className: 'codds'
                            },
                            hTeamName
                        ),
                        React.createElement(
                            'div', {
                                className: 'codds'
                            },
                            jsDRAW
                        ),
                        React.createElement(
                            'div', {
                                className: 'codds'
                            },
                            aTeamName
                        )
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt0'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0100", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0000", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0001", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt1'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0200", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0101", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0002", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt0'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0201", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0202", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0102", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt1'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0300", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0303", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0003", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt0'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0301", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0103", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt1'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0302", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0203", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt0'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0400", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0004", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt1'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0401", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0104", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt0'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0402", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0204", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt1'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0500", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0005", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt0'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0501", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0105", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt1'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0502", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        React.createElement('div', {
                            className: 'codds'
                        }),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "S0205", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: _rowClasses + ' rAlt0'
                        },
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MH", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MD", lineNum, _tableType, isExpanded, poolStatus, isAllup),
                        formatCRSSelection(_oddsType, _matchID, _oddsSet, "SM1MA", lineNum, _tableType, isExpanded, poolStatus, isAllup)
                    ),
                    React.createElement(
                        'div', {
                            className: 'tdAll coddsSelections rAlt1'
                        },
                        React.createElement(
                            'div', {
                                className: 'codds fieldCell'
                            },
                            jsallfield,
                            ' ',
                            React.createElement(OddsCheckboxPariMutuel, {
                                _poolType: _oddsType,
                                matchID: _matchID,
                                selectionVal: 'F',
                                rInd: lineNum,
                                isDisabled: isDisabled
                            })
                        )
                    )
                )
            );
        }
    }]);

    return OddsSelectionDHCP;
}(React.Component);

var SPCTableByMatch = function(_React$Component34) {
    _inherits(SPCTableByMatch, _React$Component34);

    function SPCTableByMatch() {
        _classCallCheck(this, SPCTableByMatch);

        return _possibleConstructorReturn(this, (SPCTableByMatch.__proto__ || Object.getPrototypeOf(SPCTableByMatch)).apply(this, arguments));
    }

    _createClass(SPCTableByMatch, [{
        key: 'render',
        value: function render() {
            var singleMatch = this.props.singleMatch;
            var _matchID = singleMatch.matchIDinofficial;
            var _tableType = this.props.tableType;
            var _oddsSet = void 0;
            if (this.props.spcOddsType == "Ref" || _tableType == "PresalesMatches") {
                _oddsSet = singleMatch["spcoddsref"];
                if (_oddsSet == undefined || _oddsSet == null) {
                    _oddsSet = singleMatch["spcodds"];
                }
            } else if (this.props.spcOddsType == "inplay") {
                _oddsSet = singleMatch["spcinplayodds"];
            } else {
                _oddsSet = singleMatch["spcodds"];
            }

            var _rowClasses = "coddsSelections";
            var allItemTable = [];

            _oddsSet.forEach(function(item, ind) {
                if (item.GROUP == undefined || item.GROUP == null || item.GROUP == "Match" || pageName == "ALL" || pageName == "INPLAYALL" || pageName == "INPLAYSPC") {
                    var singleItemTable;
                    var singleItemAns = [];
                    var singleItemOdds = [];
                    item.SELLIST.forEach(function(selItem, ind2) {
                        var _lineNum = selItem.SEL + "_" + item.ITEM;
                        singleItemAns.push(React.createElement(
                            'div', {
                                key: 'SPCAns' + item.ITEM + selItem.SEL,
                                className: 'codds cAns rBottomBorder'
                            },
                            '(',
                            parseInt(selItem.SEL, 10),
                            ')',
                            React.createElement('br', null),
                            jsLang == "CH" ? selItem.CONTENTCH : selItem.CONTENTEN
                        ));
                        singleItemOdds.push(React.createElement(
                            'div', {
                                key: 'SPCOdds' + item.ITEM + selItem.SEL,
                                className: 'rAlt0 codds'
                            },
                            React.createElement(OddsCell, {
                                key: _matchID + 'SPC' + _lineNum + 'OC',
                                rkey: _matchID + 'SPC' + _lineNum + 'OC',
                                _oddsType: 'SPC',
                                _matchID: _matchID,
                                oddsSet: selItem,
                                checkboxType: 'ODDS',
                                lineNum: '' + _lineNum,
                                _tableType: _tableType,
                                poolStatus: item.POOLSTATUS,
                                isAllup: item.ALLUP,
                                poolId: item.POOLID
                            })
                        ));
                    });

                    var _spcTitleEsst = void 0;
                    if (isInplay || pageName == "RESULT") {
                        _spcTitleEsst = null;
                        //      } else if (singleMatch.IsMatchKickOff()) {
                        //          _spcTitleEsst = <div className="spcTitleEsst">
                        //              {formatInplayIco(singleMatch, "ico", pageName)} {formatInplayIco(singleMatch, "url", pageName)}
                        //          </div>;
                    } else {
                        _spcTitleEsst = React.createElement(
                            'div', {
                                className: 'spcTitleEsst'
                            },
                            jsesst1,
                            jsesst2,
                            ': ',
                            formatEsst(singleMatch, true, "SPC")
                        );
                    }

                    singleItemTable = React.createElement(
                        'div', {
                            key: 'SPC' + _matchID + item.ITEM
                        },
                        isInplay && pageName != "INPLAYALL" ? React.createElement(
                            'div', {
                                className: 'spcMatchStatus'
                            },
                            React.createElement('span', {
                                dangerouslySetInnerHTML: {
                                    __html: formatInplayTeamAndStatus(singleMatch.ipinfo, "stagemsg", singleMatch.matchTime, _isHalfTimePage)
                                }
                            })
                        ) : null,
                        React.createElement(
                            'div', {
                                className: 'spcQuestion'
                            },
                            React.createElement(
                                'div', {
                                    className: 'spcTitleQuestion'
                                },
                                jsitemno,
                                ': ',
                                item.ITEM,
                                ' ',
                                React.createElement(
                                    'span', {
                                        id: 'spcq' + _matchID + '_' + item.ITEM
                                    },
                                    jsLang == "CH" ? item.ITEMCH : item.ITEMEN
                                ),
                                pageName != 'RESULT' && item.POOLSTATUS != "" && isSuspended(item.POOLSTATUS) ? React.createElement(
                                    'div', {
                                        className: 'poolstatus redtext'
                                    },
                                    isInplay ? "-" : "",
                                    GetGlobalResources("suspended")
                                ) : ""
                            ),
                            _spcTitleEsst
                        ),
                        React.createElement(
                            'div', {
                                className: 'tblSpc'
                            },
                            React.createElement(
                                'div', {
                                    className: 'betTypeAllOdds'
                                },
                                singleItemAns
                            ),
                            React.createElement(
                                'div', {
                                    className: 'betTypeAllOdds'
                                },
                                singleItemOdds
                            )
                        )
                    );
                }

                allItemTable.push(singleItemTable);
            });
            return React.createElement(
                'div',
                null,
                allItemTable
            );
        }
    }]);

    return SPCTableByMatch;
}(React.Component);

var SPCTableByTourn = function(_React$Component35) {
    _inherits(SPCTableByTourn, _React$Component35);

    function SPCTableByTourn() {
        _classCallCheck(this, SPCTableByTourn);

        return _possibleConstructorReturn(this, (SPCTableByTourn.__proto__ || Object.getPrototypeOf(SPCTableByTourn)).apply(this, arguments));
    }

    _createClass(SPCTableByTourn, [{
        key: 'render',
        value: function render() {
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

                _oddsSet.forEach(function(item, ind) {
                    var singleItemTable;
                    var singleItemAns = [];
                    var singleItemOdds = [];

                    item.SELLIST.forEach(function(selItem, ind2) {
                        var _lineNum = item.ITEM + "_" + selItem.SEL;
                        singleItemAns.push(React.createElement(
                            'div', {
                                key: 'SPCAns' + selItem.ITEM + selItem.SEL,
                                className: 'cAns rBottomBorder codds'
                            },
                            '(',
                            parseInt(selItem.SEL, 10),
                            ')',
                            React.createElement('br', null),
                            jsLang == "CH" ? selItem.CONTENTCH : selItem.CONTENTEN
                        ));
                        singleItemOdds.push(React.createElement(
                            'div', {
                                key: 'SPCAns' + selItem.ITEM + selItem.SEL,
                                className: 'rAlt0 codds'
                            },
                            React.createElement(OddsCell, {
                                key: _tournID + 'TSP' + _lineNum + 'OC',
                                rkey: _tournID + 'TSP' + _lineNum + 'OC',
                                _oddsType: 'TSP',
                                _matchID: _tournID,
                                oddsSet: selItem,
                                checkboxType: 'ODDS',
                                lineNum: _lineNum,
                                _tableType: _tableType,
                                poolStatus: item.POOLSTATUS,
                                isAllup: item.ALLUP,
                                poolId: item.POOLID
                            })
                        ));
                    });
                    singleItemTable = React.createElement(
                        'div', {
                            key: 'TSP' + _tournID + item.POOLID
                        },
                        React.createElement(
                            'div', {
                                className: 'tspcQuestion'
                            },
                            React.createElement(
                                'div', {
                                    className: 'tspcTitleQuestion'
                                },
                                jsitemno,
                                ': ',
                                item.ITEM,
                                ' ',
                                React.createElement(
                                    'span', {
                                        id: 'spcq' + _tournID + '_' + item.ITEM
                                    },
                                    jsLang == "CH" ? item.ITEMCH : item.ITEMEN
                                ),
                                _tableType == "ActiveTournaments" && item.POOLSTATUS != "" && isSuspended(item.POOLSTATUS) ? React.createElement(
                                    'div', {
                                        style: {
                                            fontWeight: "bold"
                                        },
                                        className: 'redtext'
                                    },
                                    GetGlobalResources("suspended")
                                ) : ""
                            ),
                            React.createElement(
                                'div', {
                                    className: 'spcTitleEsst'
                                },
                                item.ExpectedStopTime != "" ? jsesst1 : null,
                                item.ExpectedStopTime != "" ? jsesst2 : null,
                                ':',
                                item.ExpectedStopTime != "" ? formatEsstStr(item.ExpectedStopTime, true) : null
                            )
                        ),
                        React.createElement(
                            'div', {
                                className: 'tblSpc'
                            },
                            React.createElement(
                                'div', {
                                    className: 'betTypeAllOdds'
                                },
                                singleItemAns
                            ),
                            React.createElement(
                                'div', {
                                    className: 'betTypeAllOdds'
                                },
                                singleItemOdds
                            )
                        )
                    );
                    allItemTable.push(singleItemTable);
                });
                return React.createElement(
                    'div',
                    null,
                    allItemTable
                );
            } catch (ex) {
                return null;
            }
        }
    }]);

    return SPCTableByTourn;
}(React.Component);

var SGATable = function(_React$Component36) {
    _inherits(SGATable, _React$Component36);

    function SGATable() {
        _classCallCheck(this, SGATable);

        return _possibleConstructorReturn(this, (SGATable.__proto__ || Object.getPrototypeOf(SGATable)).apply(this, arguments));
    }

    _createClass(SGATable, [{
        key: 'render',
        value: function render() {
            var singleMatch = this.props.singleMatch;
            var _matchID = singleMatch.matchIDinofficial;
            var _tableType = this.props.tableType;
            var _oddsSet = singleMatch["sgaodds"];

            var _rowClasses = "coddsSelections";
            var allItemTable = [];

            _oddsSet.forEach(function(item, ind) {
                var selItem = item.SELLIST[0];
                var lineNum = item.SELLIST[0].id + '_' + item.ITEM;
                allItemTable.push(React.createElement(
                    'div', {
                        key: 'SGA' + _matchID + item.ITEM
                    },
                    React.createElement(
                        'div', {
                            className: 'betTypeAllOdds'
                        },
                        React.createElement(
                            'div', {
                                key: 'SGAAns' + item.ITEM,
                                className: 'cSGAItem rAlt' + ind % 2
                            },
                            jsLang == "CH" ? selItem.CONTENTCH : selItem.CONTENTEN
                        ),
                        React.createElement(
                            'div', {
                                key: 'SGAOdds' + item.ITEM,
                                className: 'codds rAlt' + ind % 2
                            },
                            React.createElement(OddsCell, {
                                key: _matchID + 'SGA' + item.ITEM + 'OC',
                                rkey: _matchID + 'SGA' + item.ITEM + 'OC',
                                _oddsType: 'SGA',
                                _matchID: _matchID,
                                oddsSet: selItem,
                                checkboxType: 'ODDS',
                                lineNum: lineNum,
                                _tableType: _tableType,
                                poolStatus: item.POOLSTATUS,
                                isAllup: item.ALLUP,
                                poolId: item.POOLID
                            })
                        )
                    )
                ));
            });
            return React.createElement(
                'div',
                null,
                allItemTable
            );
        }
    }]);

    return SGATable;
}(React.Component);

function renderOddsTable(couponArr, oddsTableType, oddsType, tournamentsArr, firstLoad, dataName) {
    selectedTournamentIds = getTournGroupIdsBytName(selectedTournamentIds);

    if (dataName != "odds_featured_matches.aspx" && pageName == "OFM") {
        return;
    }

    ReactDOM.render(React.createElement(OddsTable, {
        coupons: couponArr,
        key: oddsTableType,
        tableType: oddsTableType,
        oddsType: oddsType,
        tournaments: tournamentsArr
    }), document.getElementById('ActiveMatchesOdds'), function() {
        oddsTableLoaded();
    });
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

    var dateTabObj = $("#SelectDateTimeId");

    var dateTabWidth = dateTabObj.width() - 5;

    var dateTabCount = dateTabObj.find("div").length;

    dateTabObj.find("div").width(dateTabWidth / dateTabCount - 2);
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

    if (tmpSessionSelectedTournsId == null) tmpSessionSelectedTournsId = [];

    var newSelectedTournsId = [];
    var addSelect = [];
    var removeSelect = [];
    $(".js_selectCompetitionNav").find("li").each(function() {
        var temptName = $(this).attr("data-value");
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
    tmpSessionSelectedTournsId = jQuery.grep(newSelectedTournsId, function(el) {
        return removeSelect.indexOf(el) < 0;
    });
    // R0a: update session
    sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify(tmpSessionSelectedTournsId));
}

function hasSelectedTournament() {

    var count = 0;
    $(".js_selectCompetitionNav").find("li").each(function() {
        if ($(this).hasClass("cur")) {
            var temptName = $(this).attr("data-value");

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

    var newSelectedTName = [];

    $(".js_selectCompetitionNav").find("li").each(function() {
        if ($(this).hasClass("cur")) {
            var temptName = $(this).attr("data-value");

            for (var i = 0; i < allTournaments.length; i++) {
                if (allTournaments[i].tName == temptName) {
                    newSelectedTName.push(temptName);
                }
            }
        }
    });

    var tournGroup = $.grep(allTournaments, function(elem) {
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
    } catch (ex) {} finally {
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
            $(".js_selectCompetitionNav li").click(function() {
                if ($(this).hasClass("cur")) {
                    $(this).removeClass("cur");

                    $(this).find("input").prop("checked", false);
                } else {
                    $(this).addClass("cur");

                    $(this).find("input").prop("checked", true);
                }
            });

            //show all tournaments
            $(".more span").unbind();
            $(".more span").click(function() {
                $(".competition_nav").find(".second_ul").each(function() {
                    if ($(this).css("display") == "none") {
                        $(this).show();
                        if ($("#oddstab_showall").css("display") != "none") {
                            $("#oddstab_showall").hide();
                            $("#oddstab_hide").show();
                        }
                    } else {
                        hiddenTournaOthers($(this));
                    }
                });
            });

            //applay filter event
            $("#oddstab_searchbtn").unbind();
            $("#oddstab_searchbtn").click(function() {
                var changeConfirm = $(".checkedOdds").length > 0 && (curTabType != tabType.Competition || curTabType == tabType.Competition && hasRemovedCurTournamentTab()) ? window.confirm(jstabchangeconfirm) : true;
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
        debugLog("oddsChpTableLoaded:" + ex);
    }
}

function oddsTableLoaded() {
    try {
        adjustHeaderLayout();
        adjustTabWidth();
        setCompetitionCheckbox();
        var noPoolObj = $("#noPoolContentMsg");
        if (noPoolObj != null) {
            noPoolObj.html(jsNoPoolMsg);
        }

        if (dateTournaTabInited == false || dateTournaTabInited == true && dateTabCount != $("#SelectDateTimeId").find("div").length || dropdownCount != $("#matchSelectId").find("option").length) {
            dateTabCount = $("#SelectDateTimeId").find("div").length;
            dropdownCount = $("#matchSelectId").find("option").length;
            dateTournaTabInited = true;
            selectedTabDateArra = [];
            hideTabLoading();

            if (mdate != "" && curTabType == tabType.Date && curDateType != dateType.All) {
                otherTabDates.forEach(function(_otherTabDate, index) {
                    if (_otherTabDate.split("T")[0] == mdate) {
                        curDateType = dateType.Other;
                    }
                });
            }

            if ($("#SelectDateTimeId div.cur").attr("data-value") == dateType.All || curTabType == tabType.Feature) {
                curTabType == tabType.Feature ? $(".date_nav").hide() : null;
                selectedTabDateArra = $.map(allTabDateList, function(value) {
                    return value.split("T")[0];
                });
            } else if (mdate != "" && curDateType != dateType.Other && curTabType == tabType.Date) {
                selectedTabDateArra.push(mdate);
            } else if (mdate != "" && curDateType == dateType.Other && curTabType == tabType.Date) {
                $("#SelectDateTimeId").find("[data-value=" + dateType.Other + "]").attr('class', 'cur');
                selectedTabDateArra = $.map(otherTabDates, function(value) {
                    return value.split("T")[0];
                });
            } else if ($("#SelectDateTimeId div.cur").attr("data-value") == dateType.Other) {
                selectedTabDateArra = $.map(otherTabDates, function(value) {
                    return value.split("T")[0];
                });
            } else if ($($("#SelectDateTimeId div.cur")[0]).attr("data-value") !== undefined) {
                selectedTabDateArra.push($($("#SelectDateTimeId div.cur")[0]).attr("data-value").split("T")[0]);
            } else if ($($("#SelectDateTimeId div")[0]).attr("data-value") !== undefined) {
                selectedTabDateArra.push($($("#SelectDateTimeId div")[0]).attr("data-value").split("T")[0]);
            }

            var hasSelectedDate = false;
            selectedTabDateArra.forEach(function(_date, index) {
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
    $(".js_selectNav span").click(function() {
        //$(".checkedOdds").length > 0 -> checked ODDS? > 0-> YES <=0 -> NO
        if (isSwitchingDateTournTab) return;

        var hasCheckedOdds = $(".checkedOdds").length > 0;
        var isAllupListPage = pageName == "MIXALLUPLIST";

        var changeConfirm = hasCheckedOdds && !isAllupListPage ? window.confirm(jstabchangeconfirm) : true;
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
                    pushHistoryAfterTabChange($(".competition_nav li")[0].getAttribute("data-value"), true);
                }
            }
        }
        setTimeout(function() {
            isSwitchingDateTournTab = false;
        }, 4000);
    });

    //selected competition
    $(".js_selectCompetitionNav li").unbind();
    $(".js_selectCompetitionNav li").click(function() {
        if ($(this).hasClass("cur")) {
            $(this).removeClass("cur");
            $(this).find("input").prop("checked", false);
        } else {
            $(this).addClass("cur");
            $(this).find("input").prop("checked", true);
        }
    });

    //show all tournaments
    $(".more span").unbind();
    $(".more span").click(function() {
        $(".competition_nav").find(".second_ul").each(function() {
            if ($(this).css("display") == "none") {
                $(this).show();
                if ($("#oddstab_showall").css("display") != "none") {
                    $("#oddstab_showall").hide();
                    $("#oddstab_hide").show();
                }
            } else {
                hiddenTournaOthers($(this));
            }
        });
    });
    //date tab change
    $("#SelectDateTimeId div").unbind();
    $("#SelectDateTimeId div").click(function() {
        if (!dateTournaTabInited) return;

        if (isSwitchingDateTournTab) return;

        if (!$(this).hasClass("cur")) {
            //$(".checkedOdds").length > 0 -> checked ODDS? > 0-> YES <=0 -> NO
            var changeConfirm = $(".checkedOdds").length > 0 ? window.confirm(jstabchangeconfirm) : true;
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
                    oddsTableLoadedRender();
                }
            }
        }

        setTimeout(function() {
            isSwitchingDateTournTab = false;
        }, 4000);
    });

    //applay filter event
    $("#oddstab_searchbtn").unbind();
    $("#oddstab_searchbtn").click(function() {
        if (selectedMatcheId != "0") {
            selectedMatcheId = "0";
            $("#matchSelectId option:eq(0)").prop("selected", true);
        }
        tMatchID = "";

        var isCompetitionTab = curTabType == tabType.Competition;
        var hasRemovedTournTab = pageName != "MIXALLUPLIST" && hasRemovedCurTournamentTab();

        //$(".checkedOdds").length > 0 -> checked ODDS? > 0-> YES <=0 -> NO
        var changeConfirm = $(".checkedOdds").length > 0 && (!isCompetitionTab || isCompetitionTab && hasRemovedTournTab) ? window.confirm(jstabchangeconfirm) : true;

        //let changeConfirm = $(".checkedOdds").length > 0 ? window.confirm(jstabchangeconfirm) : true;
        if (changeConfirm) {
            if (pageName == "MIXALLUPLIST") {
                mixUnSelectedAll();
            }

            if (curTabType == tabType.Date) {
                initTablePage();
                selectedTabDateArra.push($($("#SelectDateTimeId div.cur")[0]).attr("data-value"));
                if (selectedTabDateArra.length == 0 || selectedTabDateArra.length > 0 && (selectedTabDateArra[0] == null || selectedTabDateArra[0] == undefined)) {
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
    $("#matchSelectId").change(function() {
        //$(".checkedOdds").length > 0 -> checked ODDS? > 0-> YES <=0 -> NO
        var changeConfirm = $(".checkedOdds").length > 0 ? window.confirm(jstabchangeconfirm) : true;
        if (changeConfirm) {
            if ($(this).val() != "0") {
                //$("#matchValue").html($(this).find("option:selected").text());
                dateTournaTabInited = false;
                selectedMatcheId = $(this).val();
                setMatchId(selectedMatcheId);
                matchDataList.forEach(function(_singleCoupon, couponIndex) {
                    if (tMatchID == _singleCoupon.matchID) {
                        mdate = _singleCoupon.matchDate2;
                    }
                });

                pushHistoryAfterTabChange(mdate, true);

                groupCurType = $("#matchSelectId option:checked").attr("data-type");
                oddsTableLoadedRender();
            }
        } else {
            $(this).val($("#matchSelectId option:first").val());
        }
    });
    // oddsAll select
    $("#matchAllSelectId").unbind();
    $("#matchAllSelectId").change(function() {
        //$(".checkedOdds").length > 0 -> checked ODDS? > 0-> YES <=0 -> NO
        var changeConfirm = $(".checkedOdds").length > 0 ? window.confirm(jstabchangeconfirm) : true;
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
    var dateTabDataVal = $(obj).attr("data-value");
    if (dateTabDataVal == dateType.Other) {
        selectedTabDateArra = $.map(otherTabDates, function(value) {
            return value.split("T")[0];
        });
        curDateType = dateType.Other;
    } else if (dateTabDataVal == "All") {
        curDateType = dateType.All;
        selectedTabDateArra = $.map(allTabDateList, function(value) {
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
    pushHistoryAfterTabChange(selectedTabDateArra[0], true);
}

function pushHistoryAfterTabChange(data, isPushState) {

    var newUrl = "";
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
        window.history.pushState({
            "html": "",
            "pageTitle": document.title,
            "product": curProduct,
            "page": curPageId,
            "lang": curLang,
            "para": para
        }, "", newUrl);
    } else {
        window.history.replaceState({
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

    var newUrl = "";
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

    $(".js_selectCompetitionNav").find("li").each(function(index) {
        if (!$(this).hasClass("cur")) {
            $(this).addClass("cur");

            $(this).find("input").prop("checked", true);
        }
    });

    $(".competition_nav").find(".second_ul").each(function() {
        $(this).show();
        if ($("#oddstab_showall").css("display") != "none") {
            $("#oddstab_showall").hide();
            $("#oddstab_hide").show();
        }
    });
}

function resetTournaments() {
    $(".js_selectCompetitionNav").find("li").each(function(index) {
        if (index == 0) {
            $(this).addClass("cur");
            $(this).find("input").prop("checked", true);

            //selectedTournamentIds = [];
            //selectedTournamentIds.push($(this).attr("data-value"));
            //sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify(selectedTournamentIds));
        }
        if ($(this).hasClass("cur")) {
            if (index != 0) {
                $(this).removeClass("cur");

                $(this).find("input").prop("checked", false);
            }
        }
        //when clicked apply btn,the newd data is displayed
        //if (index == 0) {
        //    selectedTournamentIds = [];
        //    selectedTournamentIds.push($(this).attr("data-value"));
        //}
    });

    $(".competition_nav").find(".second_ul").each(function() {
        hiddenTournaOthers($(this));
    });

    $('html, body').animate({
        scrollTop: 0
    }, 'fast');
}

function setCompetitionCheckbox() {

    $(".js_selectCompetitionNav").find("li").each(function() {
        if ($(this).hasClass("cur")) {
            $(this).find("input").prop("checked", true);
        } else {
            $(this).find("input").prop("checked", false);
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
    selectedTabDateArra = $.map(allTabDateList, function(value) {
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

    $("#SelectDateTimeId div").each(function(index) {
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
    $(".competition_nav").find(".second_ul").each(function() {
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
    } else {
        renderAllTable(false);
    }
}

function pushOddsTableTournamentsArr(data, sorted) {
    var tournamentsArr = data;

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
        var poolResults = void 0,
            poolNextDraw = void 0;
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
                endMatch = endMatch > totalMatch ? totalMatch : endMatch;

                ReactDOM.render(React.createElement(PageInfo, {
                    type: 'header',
                    showHeaderPagination: 'true'
                }), document.getElementById('searchTableHeader'));
                ReactDOM.render(React.createElement(PageInfo, {
                    type: 'footer',
                    showHeaderPagination: 'true'
                }), document.getElementById('searchTableFooter'));
                if (FromDate != "") $('.pagination').show();
                else $('.pagination').hide();
            } else {
                startMatch = 1;
                endMatch = poolResults.length;
            }
            drawPariMutuelResultBody(poolResults, displaySearchResult, startMatch, endMatch);
            hasPMResults = true;
        } else if (!displaySearchResult) {
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
            ReactDOM.render(React.createElement(
                'div', {
                    className: 'pmResultContainer'
                },
                React.createElement(ParimutuelNextDraw, {
                    _pool: poolNextDraw
                })
            ), document.getElementById('dNextContainer'));
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
        success: function success(data) {
            var oData = [];
            if (data != null && data[0] != null) {
                try {
                    for (var i = 0; i < data[0].length; i++) {
                        var dt = data[0][i][pools == "DHCP" ? "dhcodds" : "hfmodds"]["LEG1"].matchDate;
                        if (mDate == '' || mDate == dt) {
                            oData.push(data[0][i]);
                            mDate = dt;
                        }
                    }
                    if (oData.length > 0) {
                        drawPariMutuelResultBody(oData, false, 1, oData.length);
                    } else {
                        $('#dContainer').hide();
                        $('.noinfo').css('display', 'table-cell');
                        $('.pagination').hide();
                    }
                } catch (ex) {
                    debugLog("getLastestPariMutuelResultFromLast10: " + ex);
                }
            }
        },
        error: function error() {}
    });
}

function drawPariMutuelResultBody(poolResults, displaySearchResult, startIdx, endIdx) {
    var _coupons = [];
    for (var i = startIdx - 1; i < endIdx; i++) {
        var _pmPool = pools == "DHCP" ? poolResults[i].dhcodds : poolResults[i].hfmodds;
        var _leg1 = _pmPool["LEG1"];
        var _couponID = "c" + i + "_" + _leg1.matchIDinofficial;
        var _couponName = formatYYYYMMDD(_leg1.matchTime.substr(0, 10).replace(/-/g, '')) + ' ' + GetGlobalResources(_leg1.matchDay) + ' ' + _leg1.matchNum;
        var rightText = displaySearchResult ? null : jsstopselldate + ': ' + formatYYYYMMDD(_leg1.matchTime.substr(0, 10).replace(/-/g, ''));

        var _void = isPoolRefund(_pmPool.POOLSTATUS);

        _coupons.push(React.createElement(
            'div', {
                key: _couponID + '_container',
                className: 'space2'
            },
            React.createElement(CouponHeader, {
                couponName: _couponName,
                couponID: _couponID,
                hasMLMatch: false,
                couponCount: "",
                rightText: rightText
            }),
            React.createElement(ParimutuelResultPoolDetails, {
                couponID: _couponID,
                _pool: poolResults[i],
                _void: _void
            }),
            React.createElement(ParimutuelResultPoolTable, {
                couponID: _couponID,
                _pool: poolResults[i],
                _void: _void
            })
        ));
    }
    ReactDOM.render(React.createElement(
        'div', {
            className: 'pmResultContainer'
        },
        _coupons
    ), document.getElementById('dContainer'));
    $('.noinfo').hide();
    $('#dContainer').show();
}

function renderParimutuelPage(data, _oddsType, firstLoad) {
    var keepRefresh = false;
    try {
        var poolData = data.matches != null && data.matches.length > 0 ? data.matches : []; //removeRepeat(data.matches) : [];
        var _tableType = poolData.length > 0 ? "ActiveMatches" : "NoMatch";
        var _poolOdds = _oddsType == "DHCP" ? "dhcodds" : "hfmodds";
        // render page header
        ReactDOM.render(React.createElement(
            'div',
            null,
            React.createElement(OddsTableInfo, {
                tableType: _tableType,
                oddsType: _oddsType
            }),
            React.createElement(
                'div', {
                    id: 'oddAllUpCalDiv'
                },
                React.createElement(OddsTableAllUpCalculator, null)
            ),
            React.createElement(OddsTableDateTournTab, {
                OddsTableTournaments: data.tournaments,
                OddsTableMatches: poolData
            })
        ), document.getElementById('dHeader'), function() {
            oddsTableLoaded();
        });
        if (poolData.length > 0) {
            if (poolData.length > 1) poolData = poolData.sort(sort_by2(["matchDate", "displayOrder"], [false, false], [trimMatchDate, parseInt]));

            // find displaying matchid 
            if (tMatchID == "") setMatchId(poolData[0].matchID);
            // select single match data
            var singlePool = jQuery.grep(poolData, function(_tmpSinglePool) {
                return _tmpSinglePool.matchID == tMatchID;
            })[0];
            var singleTournament = void 0;
            if (singlePool != null) {
                singleTournament = jQuery.grep(data.tournaments, function(_tmpSingleTourna) {
                    return _tmpSingleTourna.tournamentID == singlePool.tournament.tournamentID;
                })[0];
            }

            singlePool = singlePool[_poolOdds];

            if (singlePool != null) {

                if (firstLoad) {
                    $(".poolDetails").show();

                    $('#dateVal').html(formatMatchDate(singlePool.LEG1.matchDate) + " " + GetGlobalResources(singlePool.LEG1.matchDay, "js") + " " + singlePool.LEG1.displayOrder);
                    if (singlePool.investment == "") $('#investmentVal').html("-");
                    else $('#investmentVal').html("$" + numberWithCommas(singlePool.investment));
                    if (singlePool.jackpot == "") $('#jackpotVal').html("-");
                    else $('#jackpotVal').html("$" + numberWithCommas(singlePool.jackpot));
                    $('#esstVal').html(formatEsstStr(singlePool.LEG1.matchTime));
                }

                // ************* to be done
                // if cannot find selection with the matchid
                // >> if displayed > turn all cb to dimmed
                // else display first available

                // render DDL - if more than 1 selections
                ReactDOM.render(React.createElement(MatchDropDownList, {
                    byCoupon: false,
                    allData: poolData
                }), document.getElementById('dMatchListDDL'));

                // render pool table
                ReactDOM.render(React.createElement(ParimutuelPoolTable, {
                    singlePool: singlePool,
                    singleTournament: singleTournament,
                    poolType: _oddsType
                }), document.getElementById('dPoolTable'));

                if (_oddsType == "DHCP") {
                    ReactDOM.render(generateDHCPSelectionTable(singlePool, 1), document.getElementById('dCoupon1'));
                    ReactDOM.render(generateDHCPSelectionTable(singlePool, 2), document.getElementById('dCoupon2'));
                }
                ReactDOM.render(React.createElement(AddBetBtn, {
                    position: 'footer'
                }), document.getElementById('dFooterAddBet'));

                keepRefresh = true;
                pmPool = singlePool;
            }
        }
    } catch (ex) {
        debugLog("renderParimutuelPage: " + ex);
    }

    if (!keepRefresh) {
        ReactDOM.render(React.createElement(OddsTableInfo, {
            tableType: 'NoMatch',
            oddsType: _oddsType
        }), document.getElementById('dHeader'));
        displayNoMatch(false);
    }

    return true;
}

function renderEmptyOddsTable() {
    try {
        ReactDOM.render(React.createElement('div', null), document.getElementById('ActiveMatchesOdds'));
    } catch (ex) {}
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

        var isTourn = false;

        if (curTabType == tabType.Date && mdate.length > 0 && tMatchID == "") {
            qs += "&mdate=" + mdate;
        } else if (tMatchID == "") {
            if (selectedTournamentIds.length > 0) {
                //let tournId = $($(".js_selectCompetitionNav li.cur")[0]).attr("data-value");
                qs += "&tournid=" + selectedTournamentIds[0];
            }
            if (selectedTabDateArra.length > 0 && selectedTournamentIds.length == 0) {
                var _mdate = "";
                _mdate = selectedTabDateArra[0];
                qs += "&mdate=" + _mdate;
            } else {
                qs += "&matchid=default";
            }
        } else if (selectedTournamentIds.length > 0 && tMatchID != "") {
            qs += "&matchid=" + tMatchID;
        } else {
            if (selectedMatcheId != "0") {
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
    var srchdate = getParameterByName("srchdate"); // 1 or 0
    var fdate = getParameterByName("fdate"); // start date YYYYMMDD
    var tdate = getParameterByName("tdate"); // end date YYYYMMDD
    var srchteam = getParameterByName("srchteam"); // 1 or 0
    var teamcode = getParameterByName("teamcode"); // guid of team

    $('#searchInfo').html("");
    if (srchdate == "1") {
        $('#searchInfo').append('<div><strong>' + jsdate + ':</strong> ' + formatYYYYMMDD(fdate) + ' - ' + formatYYYYMMDD(tdate) + '</div>');
    }

    if (srchteam == "1") {
        if (teamList != undefined && teamList.length > 0) {
            tteamcode = teamcode;
            var srchTeamName = $.grep(teamList, function(_sel) {
                return _sel.teamID == teamcode;
            })[0]["teamName" + jsLang];

            $('#searchInfo').append('<div><strong>' + jsteam + ':</strong> ' + srchTeamName + '</div>');
        }
    }
}

function getMatchData(data) {
    if (pageName != "TOURN" && data != null && (data[0] != null || data.matches != null)) {
        if (pageName == "CHP" || pageName == "TQL" || pageName == "MIXALLUP") {
            matchDataList = data;
        } else if (pageName != "RESULT") {
            var _tempMatches = putMatchesToCoupon(data.matches, [], true);
            matchDataList = data.matches = _tempMatches != null ? _tempMatches : [];
        } else {
            if (data.length == 1) {
                var _tempMatches2 = putMatchesToCoupon(data[0].matches, [], true);
                matchDataList = data[0].matches = _tempMatches2 != null ? _tempMatches2 : [];
            } else if (data.length > 1) {
                if (data[1].matchDate != null && data[1].matchDate != undefined) {
                    var _tempMatches3 = putMatchesToCoupon(data, [], true);
                    matchDataList = data = _tempMatches3 != null ? _tempMatches3 : [];
                } else {
                    var _tempMatches4 = putMatchesToCoupon(data[1].matches, [], true);
                    matchDataList = data[1].matches = _tempMatches4 != null ? _tempMatches4 : [];
                }
            } else {
                matchDataList = data;
            }
        }
    } else if (data != null) {
        if (pageName != "TOURN" && data[0] != null && data[0] != undefined) {
            var _tempMatches5 = putMatchesToCoupon(data, [], true);
            matchDataList = data = _tempMatches5 != null ? _tempMatches5 : [];
        } else {
            matchDataList = data;
        }
    }
}

function getTournaments(data) {

    if (data == null || data.length == 0) allTournaments = [];
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
        var tempId = tournExp[0].split("=")[1];

        // show all tournament if the tournament id = "all"
        if (tempId.toLowerCase() == "all") {
            selectedTournamentIds = getAllTournamentIds();
        } else if (selectedTournamentIds.length == 0) {
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
    if (!firstLoad && oddsPushStatus == 'push') return;

    if (!firstLoad && !enableAutoRefresh) return;
    try {
        if (firstLoad) {
            //resetClickedCheckBox();
            if (tMatchID == "") $('.nopool').hide();
            $('#divLoading').show();
        }
        if (noOfFail <= 2) {
            var queryStr = getJSONQueryString();
            $.ajax({
                url: "/football/getJSON.aspx" + queryStr,
                type: "get",
                contentType: "application/json; charset=utf-8",
                success: function success(data) {
                    isPaginationClick = false;

                    // check if the return JSON matches the request URL
                    if (data != null && data.name != null && data.name != '' && queryStr.indexOf(data.name) < 0) {
                        return;
                    }

                    try {
                        if (data != null && data.indexOf && data.indexOf(wafKeyword) >= 0 && !retryOnce) {
                            //console.log('Blocked by WAF, retry one time...');
                            $('#tFrame').attr('src', '/reload.aspx?a=' + new Date().getTime());
                            setTimeout(function() {
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
                                    if (tMatchID.indexOf(betValue[key].matchID) >= 0) allupMatchIdChexkbox.push(betValue[key].matchIDinofficial);
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
                            renderEmptyPage(firstLoad);
                            debugLog(ex);
                        }
                    } finally {
                        isSwitchingDateTournTab = false;
                    }
                    $('#divLoading').hide();
                },
                error: function error() {
                    noOfFail++;
                }
            });
        } else {
            renderEmptyPage(firstLoad);
        }
    } catch (ex) {
        renderEmptyPage(firstLoad);
    }
    setRefreshInterval();
}

function renderAllTableRoute(data, firstLoad) {
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
    if (!firstLoad && !enableAutoRefresh) return;
    try {
        if (firstLoad) {
            //resetClickedCheckBox();
            if (tMatchID == "") $('.nopool').hide();
            $('#divLoading').show();
        }

        if (noOfFail <= 2) {
            $.ajax({
                url: "/football/getJSON.aspx" + getJSONQueryString(),
                type: "get",
                contentType: "application/json; charset=utf-8",
                success: function success(data) {
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
                error: function error() {
                    noOfFail++;
                }
            });
        } else {
            renderEmptyPage(firstLoad);
        }
    } catch (ex) {
        renderEmptyPage(firstLoad);
    }
}

function renderSPCTable(data, firstLoad) {
    var displayNoPoolMsg = false;
    var tournamentData = void 0,
        spcAvailable = void 0,
        singleMatch = void 0;
    tournamentData = data.tournaments;
    spcAvailable = data.matches.length > 0;

    if (spcAvailable) {
        // render active SPC item first
        var activeSPCTable = [];

        var hasSelectedDate = false;
        var istMatchIDExist = false;
        var datelist = [];

        if (curTabType == tabType.Date) {

            if (selectedTabDateArra.length == 0 && mdate.length > 0) selectedTabDateArra.push(mdate);
            else if (selectedTabDateArra.length > 0 && mdate.length > 0 && $.inArray(mdate, selectedTabDateArra) > -1) {
                selectedTabDateArra = [];
                selectedTabDateArra.push(mdate);
            }
            if (tMatchID != "") {
                data.matches.forEach(function(_singleCoupon, couponIndex) {
                    var tmpDt = getFormattedDateStr(_singleCoupon.matchDate);
                    if (_singleCoupon.matchID == tMatchID && tmpDt != mdate) {
                        selectedTabDateArra = [];
                        selectedTabDateArra.push(tmpDt);
                        pushHistoryAfterTabChange(selectedTabDateArra[0], false);
                    }
                });
            }

            data.matches.forEach(function(_singleCoupon, couponIndex) {
                datelist.push(getFormattedDateStr(_singleCoupon.matchDate));
                selectedTabDateArra.forEach(function(tabDateItem) {
                    var selectedTabDate = tabDateItem;
                    var matchDateYYYYMMDD = _singleCoupon.matchDate.split("T")[0];
                    if (matchDateYYYYMMDD == selectedTabDate) {
                        hasSelectedDate = true;
                    }
                    if (_singleCoupon.matchID == tMatchID) {
                        istMatchIDExist = true;
                    }
                });
            });

            if (!hasSelectedDate || !istMatchIDExist && tMatchID != "") {
                selectedTabDateArra = [];
                tMatchID = '';
                initTabDate();
                var availableDate = getDateTabList(datelist)[0];
                selectedTabDateArra.push(availableDate);
                pushHistoryAfterTabChange(selectedTabDateArra[0], false);
            }
        }

        var isDorpList = false;
        var selectedMatch = null;
        // gen match table
        if (data != null && data.matches != null) {
            if (curTabType == tabType.Date) {
                selectedTabDateArra.forEach(function(tabDateItem) {
                    var selectedTabDate = tabDateItem;
                    data.matches.forEach(function(_singleMatch, sid) {
                        var matchDateYYYYMMDD = _singleMatch.matchDate.split("T")[0];
                        if (selectedTabDate == matchDateYYYYMMDD) {
                            if (tMatchID == "" && !isDorpList) {
                                singleMatch = new Match(_singleMatch, false);
                                var _matchTable = React.createElement(SPCContainer, {
                                    singleObj: _singleMatch,
                                    key: 'dSPC' + _singleMatch.matchID,
                                    objType: 'match',
                                    tableType: data.name,
                                    refStr: '',
                                    objID: '' + _singleMatch.matchID
                                });
                                activeSPCTable.push(_matchTable);
                                selectedMatch = _singleMatch;
                                setMatchId(_singleMatch.matchID);
                                isDorpList = true;
                            } else if (_singleMatch.matchID == tMatchID) {
                                singleMatch = new Match(_singleMatch, false);
                                var _matchTable2 = React.createElement(SPCContainer, {
                                    singleObj: _singleMatch,
                                    key: 'dSPC' + _singleMatch.matchID,
                                    objType: 'match',
                                    tableType: data.name,
                                    refStr: '',
                                    objID: '' + _singleMatch.matchID
                                });
                                activeSPCTable.push(_matchTable2);
                                selectedMatch = _singleMatch;
                            }
                        }
                    });
                });
            } else if (curTabType == tabType.Competition) {
                // R0a
                var tmpSessionSelectedTournsId = JSON.parse(sessionStorage.getItem("__extendShareSelectedTournsId"));

                if (tmpSessionSelectedTournsId == null) tmpSessionSelectedTournsId = [];

                var hasSelectedTourn = false;
                tournamentData.forEach(function(singleTournament, tounaIndex) {
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

                tmpSessionSelectedTournsId.forEach(function(id, xidx) {
                    if (jQuery.inArray(id, selectedTournamentIds) === -1) {
                        selectedTournamentIds.push(id);
                    }
                });

                var selectedTournaMatches = [];

                selectedTournamentIds.forEach(function(value, index) {
                    tournamentData.forEach(function(singleTournament, tounaIndex) {
                        if (singleTournament.tournamentID == value) {
                            data.matches.forEach(function(singleCoupon, couponIndex) {
                                if (singleCoupon.tournament.tournamentID == value) {
                                    selectedTournaMatches.push(singleCoupon);
                                }
                            });
                        }
                    });
                });

                selectedTournaMatches.forEach(function(_singleMatch, sid) {
                    if (tMatchID == "" && !isDorpList) {
                        singleMatch = new Match(_singleMatch, false);
                        var _matchTable = React.createElement(SPCContainer, {
                            singleObj: _singleMatch,
                            key: 'dSPC' + _singleMatch.matchID,
                            objType: 'match',
                            tableType: data.name,
                            refStr: '',
                            objID: '' + _singleMatch.matchID
                        });
                        activeSPCTable.push(_matchTable);
                        selectedMatch = _singleMatch;
                        isDorpList = true;
                    } else if (_singleMatch.matchID == tMatchID) {
                        singleMatch = new Match(_singleMatch, false);
                        var _matchTable3 = React.createElement(SPCContainer, {
                            singleObj: _singleMatch,
                            key: 'dSPC' + _singleMatch.matchID,
                            objType: 'match',
                            tableType: data.name,
                            refStr: '',
                            objID: '' + _singleMatch.matchID
                        });
                        activeSPCTable.push(_matchTable3);
                        selectedMatch = _singleMatch;
                    }
                });
            }
        }

        if (selectedMatch != null) {

            var spcItems = sortDataToItem(selectedMatch, false);

            if (spcItems.length > 0) {
                spcItems.forEach(function(_singleItem, _sind) {
                    if (_singleItem.length > 0) {
                        var _itemTable = React.createElement(SPCItemContainer, {
                            key: 'dSPC' + _singleItem[0].item.ITEM,
                            singleItem: _singleItem,
                            tableType: data.name,
                            refStr: false,
                            tournamentData: tournamentData
                        });

                        activeSPCTable.push(_itemTable);
                    }
                });
            }
        }

        if (activeSPCTable.length > 0) {

            var coupsonList = data.matches; //removeRepeat(data.matches);
            ReactDOM.render(React.createElement(
                'div',
                null,
                React.createElement(SPCPageHeader, {
                    tableType: 'Active'
                }),
                React.createElement(OddsTableDateTournTab, {
                    OddsTableTournaments: tournamentData,
                    OddsTableMatches: coupsonList
                }),
                React.createElement(MatchSelectList, {
                    OddsTableTournaments: tournamentData,
                    OddsTableMatches: data.matches,
                    SingleMatch: singleMatch,
                    DataList: data
                }),
                activeSPCTable,
                React.createElement(AddBetBtn, {
                    position: 'footer'
                })
            ), document.getElementById("dSPC"), function() {
                oddsTableLoaded();
            });
        }
    } else {
        displayNoMatch(true, true);
    }
}

function renderSGATable(data, firstLoad) {
    var displayNoPoolMsg = false;
    var tournamentData = void 0,
        sgaAvailable = void 0,
        singleMatch = void 0;
    tournamentData = data.tournaments;
    sgaAvailable = data.matches.length > 0;

    if (sgaAvailable) {
        // render active SGA item first
        var activeSGATable = [];

        var hasSelectedDate = false;
        var istMatchIDExist = false;
        var datelist = [];

        if (curTabType == tabType.Date) {
            if (selectedTabDateArra.length == 0 && mdate.length > 0) selectedTabDateArra.push(mdate);
            else if (selectedTabDateArra.length > 0 && mdate.length > 0 && $.inArray(mdate, selectedTabDateArra) > -1) {
                selectedTabDateArra = [];
                selectedTabDateArra.push(mdate);
            }
            if (tMatchID != "") {
                data.matches.forEach(function(_singleCoupon, couponIndex) {
                    var tmpDt = getFormattedDateStr(_singleCoupon.matchDate);
                    if (_singleCoupon.matchID == tMatchID && tmpDt != mdate) {
                        selectedTabDateArra = [];
                        selectedTabDateArra.push(tmpDt);
                        pushHistoryAfterTabChange(selectedTabDateArra[0], false);
                    }
                });
            }

            data.matches.forEach(function(_singleCoupon, couponIndex) {
                datelist.push(getFormattedDateStr(_singleCoupon.matchDate));
                selectedTabDateArra.forEach(function(tabDateItem) {
                    var selectedTabDate = tabDateItem;
                    var matchDateYYYYMMDD = _singleCoupon.matchDate.split("T")[0];
                    if (matchDateYYYYMMDD == selectedTabDate) {
                        hasSelectedDate = true;
                    }
                    if (_singleCoupon.matchID == tMatchID) {
                        istMatchIDExist = true;
                    }
                });
            });

            if (!hasSelectedDate || !istMatchIDExist && tMatchID != "") {
                selectedTabDateArra = [];
                tMatchID = '';
                initTabDate();
                var availableDate = getDateTabList(datelist)[0];
                selectedTabDateArra.push(availableDate);
                pushHistoryAfterTabChange(selectedTabDateArra[0], false);
            }
        }

        var isDorpList = false;
        var selectedMatch = null;
        // gen match table
        if (data != null && data.matches != null) {
            if (curTabType == tabType.Date) {
                selectedTabDateArra.forEach(function(tabDateItem) {
                    var selectedTabDate = tabDateItem;
                    data.matches.forEach(function(_singleMatch, sid) {
                        var matchDateYYYYMMDD = _singleMatch.matchDate.split("T")[0];
                        if (selectedTabDate == matchDateYYYYMMDD) {
                            if (tMatchID == "" && !isDorpList) {
                                singleMatch = new Match(_singleMatch, false);
                                var _matchTable = React.createElement(SGAContainer, {
                                    singleObj: _singleMatch,
                                    key: 'dSGA' + _singleMatch.matchID,
                                    tableType: data.name,
                                    objID: '' + _singleMatch.matchID
                                });
                                activeSGATable.push(_matchTable);
                                selectedMatch = _singleMatch;
                                setMatchId(_singleMatch.matchID);
                                isDorpList = true;
                            } else if (_singleMatch.matchID == tMatchID) {
                                singleMatch = new Match(_singleMatch, false);
                                var _matchTable4 = React.createElement(SGAContainer, {
                                    singleObj: _singleMatch,
                                    key: 'dSGA' + _singleMatch.matchID,
                                    tableType: data.name,
                                    objID: '' + _singleMatch.matchID
                                });
                                activeSGATable.push(_matchTable4);
                                selectedMatch = _singleMatch;
                            }
                        }
                    });
                });
            } else if (curTabType == tabType.Competition) {
                // R0a
                var tmpSessionSelectedTournsId = JSON.parse(sessionStorage.getItem("__extendShareSelectedTournsId"));

                if (tmpSessionSelectedTournsId == null) tmpSessionSelectedTournsId = [];

                var hasSelectedTourn = false;
                tournamentData.forEach(function(singleTournament, tounaIndex) {
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

                tmpSessionSelectedTournsId.forEach(function(id, xidx) {
                    if (jQuery.inArray(id, selectedTournamentIds) === -1) {
                        selectedTournamentIds.push(id);
                    }
                });

                var selectedTournaMatches = [];

                selectedTournamentIds.forEach(function(value, index) {
                    tournamentData.forEach(function(singleTournament, tounaIndex) {
                        if (singleTournament.tournamentID == value) {
                            data.matches.forEach(function(singleCoupon, couponIndex) {
                                if (singleCoupon.tournament.tournamentID == value) {
                                    selectedTournaMatches.push(singleCoupon);
                                }
                            });
                        }
                    });
                });

                selectedTournaMatches.forEach(function(_singleMatch, sid) {
                    if (tMatchID == "" && !isDorpList) {
                        singleMatch = new Match(_singleMatch, false);
                        var _matchTable = React.createElement(SGAContainer, {
                            singleObj: _singleMatch,
                            key: 'dSGA' + _singleMatch.matchID,
                            tableType: data.name,
                            objID: '' + _singleMatch.matchID
                        });
                        activeSGATable.push(_matchTable);
                        selectedMatch = _singleMatch;
                        isDorpList = true;
                    } else if (_singleMatch.matchID == tMatchID) {
                        singleMatch = new Match(_singleMatch, false);
                        var _matchTable5 = React.createElement(SGAContainer, {
                            singleObj: _singleMatch,
                            key: 'dSGA' + _singleMatch.matchID,
                            tableType: data.name,
                            objID: '' + _singleMatch.matchID
                        });
                        activeSGATable.push(_matchTable5);
                        selectedMatch = _singleMatch;
                    }
                });
            }
        }

        if (activeSGATable.length > 0) {

            var coupsonList = data.matches; //removeRepeat(data.matches);
            ReactDOM.render(React.createElement(
                'div',
                null,
                React.createElement(SPCPageHeader, {
                    tableType: 'Active'
                }),
                React.createElement('div', {
                    id: 'sgaRemarks',
                    dangerouslySetInnerHTML: {
                        __html: jsSGARemarks
                    }
                }),
                React.createElement(OddsTableDateTournTab, {
                    OddsTableTournaments: tournamentData,
                    OddsTableMatches: coupsonList
                }),
                React.createElement(MatchSelectList, {
                    OddsTableTournaments: tournamentData,
                    OddsTableMatches: data.matches,
                    SingleMatch: singleMatch,
                    DataList: data
                }),
                activeSGATable,
                React.createElement(AddBetBtn, {
                    position: 'footer'
                })
            ), document.getElementById("dSGA"), function() {
                oddsTableLoaded();
            });
        }
    } else {
        displayNoMatch(true, true);
    }
}

function renderAllMatchAllTable(matchData, firstLoad) {

    var allMatchTable = [];

    allMatchID.forEach(function(_matchID, _mInd) {
        var tmpMatch = getAllUpMatch(matchData, _matchID);
        if (tmpMatch != null) {
            var singleMatch = new Match(tmpMatch, false);
            allMatchTable.push(renderMatchAllTable(singleMatch, firstLoad, "ActiveMatch"));
        }
    });

    var displayNoPoolMsg = allMatchTable.length == 0;

    var topCalculator = React.createElement(AllUpDetailCalculator, {
        CalculatorID: 'ucCalTop'
    });
    var bottomCalculator = React.createElement(AllUpDetailCalculator, {
        CalculatorID: 'ucCalBottom'
    });
    var topHeader = React.createElement(OddsTableInfo, {
        tableType: 'Mix all up detail',
        oddsType: oddsType
    });

    ReactDOM.render(React.createElement(
        'div',
        null,
        topHeader,
        React.createElement(
            'div', {
                className: 'oddsMixAllup'
            },
            React.createElement(
                'div', {
                    className: 'oMixSel'
                },
                React.createElement(
                    'div', {
                        className: 'tblMixSel'
                    },
                    React.createElement(
                        'div',
                        null,
                        jsSelectBetType
                    ),
                    React.createElement(
                        'div', {
                            id: 'tblMixSelContent'
                        },
                        React.createElement(
                            'div',
                            null,
                            React.createElement('div', {
                                id: 'selcheckboxC0'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC1'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC2'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC3'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC4'
                            })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement('div', {
                                id: 'selcheckboxC5'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC6'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC7'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC8'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC9'
                            })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement('div', {
                                id: 'selcheckboxC10'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC11'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC12'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC13'
                            }),
                            React.createElement('div', {
                                id: 'selcheckboxC14'
                            })
                        )
                    )
                ),
                React.createElement(
                    'div', {
                        className: 'tblMixSel'
                    },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div', {
                                colSpan: '5'
                            },
                            React.createElement(
                                'div', {
                                    id: 'divLoadMix'
                                },
                                React.createElement('img', {
                                    src: '/football/info/images/loading.gif?CV=L204R1c',
                                    alt: '',
                                    title: '',
                                    onError: errImg(this)
                                })
                            )
                        )
                    )
                ),
                React.createElement(
                    'div', {
                        className: 'cCalContent'
                    },
                    topCalculator
                )
            ),
            React.createElement('div', {
                className: 'mixHR'
            }),
            React.createElement(
                'div', {
                    className: 'oMixMatches',
                    id: 'dMixMatches'
                },
                allMatchTable
            ),
            React.createElement(
                'div', {
                    className: 'oMixCal cCalContentBottom',
                    id: 'dMixCalBottom'
                },
                bottomCalculator
            )
        )
    ), document.getElementById('mixAllUpContent'), function() {
        if (firstLoad) {
            getAllUpInfo();
        }
        calculateBet2(true);
    });

    if (displayNoPoolMsg) {
        $('.mixAllUpContent').hide();
        $('.cActions').hide();
        $('.oddsSCMixAllup').hide();
        $('#NoPoolMsg').show();
        $('#NoPoolMsgContent').html(jsNoPoolMsg);
        displayNoMatch(true, true);
    } else {
        $('.mixAllUpContent').show();
        $('.cActions').show();
        $('.oddsSCMixAllup').show();
        $('#NoPoolMsg').hide();
    }

    return true;
}

function getAllUpMatch(matchData, matchId) {
    for (var idx in matchData) {
        if (matchData[idx].matchID == matchId) return matchData[idx];
    }
    return null;
}

var AllUpDetailCalculator = function(_React$Component37) {
    _inherits(AllUpDetailCalculator, _React$Component37);

    function AllUpDetailCalculator(props) {
        _classCallCheck(this, AllUpDetailCalculator);

        var _this41 = _possibleConstructorReturn(this, (AllUpDetailCalculator.__proto__ || Object.getPrototypeOf(AllUpDetailCalculator)).call(this, props));

        _this41.state = {
            unitBet: parseInt(getDefaultAmount("ALUPX"))
        };
        return _this41;
    }

    _createClass(AllUpDetailCalculator, [{
        key: 'onUpdateUnitBet',
        value: function onUpdateUnitBet(e) {
            if (chkAmount(e, 0)) {
                this.setState({
                    unitBet: parseInt(e.target.value)
                });
            } else if (e.target.value == '') {
                this.setState({
                    unitBet: ''
                });
            }
        }
    }, {
        key: 'onBlurUnitBet',
        value: function onBlurUnitBet(e) {
            if (!$.isNumeric(e.target.value) || parseInt(e.target.value) < 10) {
                alert(jsunitbeterror);
                $(".mcTxtUnitbet").val(getDefaultAmount("ALUPX"));
            } else {
                updateMcTxtUnitbet(e);
            }
            calculateBet2(true);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this42 = this;

            return React.createElement(
                'div', {
                    style: {
                        width: "634px",
                        padding: "10px 0px 10px 5px"
                    }
                },
                React.createElement(
                    'div', {
                        style: {
                            float: "left",
                            width: "80%"
                        }
                    },
                    React.createElement(
                        'div', {
                            className: 'divCalRow'
                        },
                        React.createElement(
                            'div', {
                                style: {
                                    display: "table-cell",
                                    width: "100px"
                                }
                            },
                            jsformula
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    display: "table-cell",
                                    width: "90px"
                                }
                            },
                            jsunitbet,
                            ' $'
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultHeadCell',
                                style: {
                                    width: "60px"
                                }
                            },
                            jsbet
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultHeadCell',
                                style: {
                                    width: "92px"
                                }
                            },
                            jstotalinvestment
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultHeadCell',
                                style: {
                                    width: "80px"
                                }
                            },
                            jsmaxDividend
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultHeadCell',
                                style: {
                                    width: "93px"
                                }
                            },
                            jsmaxNetReturn
                        )
                    ),
                    React.createElement(
                        'div', {
                            className: 'divCalRow'
                        },
                        React.createElement(
                            'div', {
                                style: {
                                    display: "table-cell"
                                }
                            },
                            React.createElement('select', {
                                className: 'allup_calculator_select mcSelFormula',
                                onChange: function onChange(e) {
                                    updateMcSelFormula(e);
                                    calculateBet2(true);
                                }
                            })
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    display: "table-cell"
                                }
                            },
                            React.createElement('input', {
                                className: 'allup_calculator_input mcTxtUnitbet',
                                value: this.state.unitBet,
                                maxLength: '6',
                                onChange: function onChange(e) {
                                    _this42.onUpdateUnitBet(e);
                                },
                                onBlur: function onBlur(e) {
                                    _this42.onBlurUnitBet(e);
                                }
                            })
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultCell mcBet'
                            },
                            '-'
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultCell mcTotInv'
                            },
                            '-'
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultCell mcDivid'
                            },
                            '-'
                        ),
                        React.createElement(
                            'div', {
                                className: 'divCalResultCell mcNetRtn'
                            },
                            '-'
                        )
                    )
                ),
                React.createElement(
                    'div', {
                        style: {
                            float: "right",
                            width: "20%",
                            padding: "5px 0px 0px 0px"
                        }
                    },
                    React.createElement('div', {
                        className: 'addBet',
                        onClick: function onClick() {
                            addslip();
                        },
                        title: jsaddSlip
                    })
                ),
                React.createElement('div', {
                    style: {
                        clear: "both"
                    }
                })
            );
        }
    }]);

    return AllUpDetailCalculator;
}(React.Component);

function renderMatchAllTable(_singleMatch, firstLoad, _tableType, tournamentName) {
    var matchAllTables = [];
    var _matchID = _singleMatch.matchIDinofficial;
    var _matchPoolStatus = void 0;
    var _extraClass = "";
    mixInplayBetType = [];
    if (_tableType == "result") {
        _singleMatch.arrPools.forEach(function(_singlePool, _spInd) {
            matchAllTables.push(React.createElement(SingleMatchSingleOddsTypeTable, {
                key: '' + _matchID + _singlePool + _tableType + 'Holder',
                _poolType: _singlePool,
                _tableType: _tableType,
                _matchID: _matchID,
                _singleMatch: _singleMatch
            }));
        });
        _extraClass = "dContentResult";
    } else {
        _matchPoolStatus = _singleMatch.GetMatchPoolStatus(pageName);

        if (displayInplayStatement(_matchPoolStatus)) {
            matchAllTables.push(InplayMsg(_singleMatch));
        } else {
            _singleMatch.arrPools.forEach(function(_singlePool, _spInd) {
                if (pageName == "INPLAYALL") {
                    if (_singleMatch.matchStatus.toLowerCase() == "defined") {
                        var IsInplay = (_singlePool + "odds").toLowerCase();
                        if (_singleMatch[IsInplay].INPLAY == "true") {
                            matchAllTables.push(React.createElement(SingleMatchSingleOddsTypeTable, {
                                key: '' + _matchID + _singlePool + _tableType + 'Holder',
                                _poolType: _singlePool,
                                _tableType: _tableType,
                                _matchID: _matchID,
                                _singleMatch: _singleMatch
                            }));
                        }
                    } else if (_singleMatch.matchStatus.toLowerCase() != "defined") {
                        var _IsInplay = (_singlePool + "odds").toLowerCase();
                        if (_singleMatch[_IsInplay].INPLAY == "true") {
                            matchAllTables.push(React.createElement(SingleMatchSingleOddsTypeTable, {
                                key: '' + _matchID + _singlePool + _tableType + 'Holder',
                                _poolType: _singlePool,
                                _tableType: _tableType,
                                _matchID: _matchID,
                                _singleMatch: _singleMatch
                            }));
                        }
                    }
                } else {
                    var _IsInplay2 = (_singlePool + "odds").toLowerCase();
                    if (_singleMatch[_IsInplay2].INPLAY == "true" && pageName == "MIXALLUP") {
                        if (!$.inArray(_singlePool, mixInplayBetType)) {
                            mixInplayBetType.push(_singlePool);
                        }
                    }
                    matchAllTables.push(React.createElement(SingleMatchSingleOddsTypeTable, {
                        key: '' + _matchID + _singlePool + _tableType + 'Holder',
                        _poolType: _singlePool,
                        _tableType: _tableType,
                        _matchID: _matchID,
                        _singleMatch: _singleMatch,
                        tournamentName: tournamentName
                    }));
                }
            });
        }
    }
    var displayHeader = !(pageName == "INPLAYALL" || pageName == "ALL" || pageName == "CRS" || pageName == "FCS" || pageName == "FGS");

    return React.createElement(
        'div', {
            key: 'all' + _matchID,
            className: 'dMixSingleMatch ' + _extraClass,
            id: 'dMix_' + _singleMatch.matchIDinofficial
        },
        displayHeader ? renderMatchAllTableHeader(_singleMatch, firstLoad, _tableType, _matchID, _matchPoolStatus) : null,
        React.createElement(
            'div', {
                id: 'dMixContent_' + _matchID
            },
            matchAllTables
        ),
        pageName == "MIXALLUP" || pageName == "RESULT" ? React.createElement('div', {
            className: 'mixHR'
        }) : null
    );
}

function renderMatchAllTableHeader(_singleMatch, firstLoad, _tableType, _matchID, _matchPoolStatus) {
    var tournShortName = _singleMatch.tournament.tournamentShortName;
    var tournName = _singleMatch.tournament['tournamentName' + curLang.toUpperCase()];

    var matchId = "";
    if (_singleMatch.isBAUResult) {
        matchId = jsmatchno + ": " + _singleMatch.matchDay + " " + _singleMatch.matchNum;
    } else {
        matchId = _singleMatch.frontEndId;
    }

    return React.createElement(
        'div', {
            className: 'dMixHeader',
            id: 'dMixHeader_' + _matchID,
            onClick: function onClick() {
                pageName == "MIXALLUPSHORTCUT" ? tgCoupon5('dMixHeader_' + _matchID, 'dMixContent_' + _matchID) : null;
            }
        },
        React.createElement(
            'div', {
                className: 'tableCell tdMixAllupHeaderTableLeftCell'
            },
            _tableType == "result" ? null : formatEsst(_singleMatch, false, "HAD"),
            React.createElement('span', {
                className: 'space'
            }),
            ' ',
            matchId,
            React.createElement('span', {
                className: 'space'
            }),
            React.createElement(
                'span',
                null,
                formatImageStr([League.GetFlagPath(tournShortName), tournName, tournShortName])
            ),
            React.createElement('span', {
                className: 'space'
            }),
            React.createElement('span', {
                className: 'space'
            }),
            sTeamString(false, false, _singleMatch, true, true, "ALL"),
            React.createElement('span', {
                className: 'space'
            }),
            React.createElement(
                'span', {
                    className: 'cvenue'
                },
                _singleMatch.venue == null ? "" : formatNeutralGroundIcon(_singleMatch.venue, "ng")
            ),
            _tableType == "result" ? null : React.createElement('span', {
                className: 'space'
            }),
            _tableType == "result" ? null : formatInplayIco(_singleMatch, "ico", pageName),
            _tableType == "result" ? null : React.createElement('span', {
                className: 'space'
            }),
            _tableType == "result" ? null : React.createElement(
                'span',
                null,
                formatJumpHeadStr(_singleMatch)
            )
        )
    );
}

var SingleMatchSingleOddsTypeTable = function(_React$Component38) {
    _inherits(SingleMatchSingleOddsTypeTable, _React$Component38);

    function SingleMatchSingleOddsTypeTable(props) {
        _classCallCheck(this, SingleMatchSingleOddsTypeTable);

        var _this43 = _possibleConstructorReturn(this, (SingleMatchSingleOddsTypeTable.__proto__ || Object.getPrototypeOf(SingleMatchSingleOddsTypeTable)).call(this, props));

        _this43.state = {
            hideLSE: true
        };
        _this43.onEliminateBtnClicked = _this43.onEliminateBtnClicked.bind(_this43);
        return _this43;
    }

    _createClass(SingleMatchSingleOddsTypeTable, [{
        key: 'onEliminateBtnClicked',
        value: function onEliminateBtnClicked(event) {
            this.setState({
                hideLSE: !this.state.hideLSE
            });
        }
    }, {
        key: 'renderTournInfo',
        value: function renderTournInfo(singleMatch, betType) {

            var sTourn = singleMatch[betType.toLowerCase() + "odds"];

            var expectedStopSellingTime = sTourn.ExpectedStopTime != "" ? formatEsstStr(sTourn.ExpectedStopTime, true) : null;

            var tournamentName = singleMatch.tournament['tournamentName' + curLang.toUpperCase()];

            var tournFrontendId = singleMatch.tournament.frontEndId;

            var tournInfo = React.createElement(
                'div', {
                    className: 'tournInfo'
                },
                React.createElement(
                    'p',
                    null,
                    tournFrontendId,
                    ' ',
                    tournamentName
                ),
                React.createElement(
                    'p',
                    null,
                    jsesst_nobr,
                    ': ',
                    expectedStopSellingTime
                )
            );

            return tournInfo;
        }
    }, {
        key: 'render',
        value: function render() {
            try {
                var _poolType = this.props._poolType;
                var _tableType = this.props._tableType;
                var _matchID = this.props._matchID;
                var _singleMatch = this.props._singleMatch;
                var eliminateBtn = null;
                var tournamentName = this.props.tournamentName;

                var _ref = "";
                if (_tableType.indexOf("Presales") != -1) {
                    _ref = "Ref";
                }
                if (_poolType.indexOf("ref") != -1) {
                    _ref = "Ref";
                    _poolType = "SPC"; // only SPC can have both active and presales odds
                    _tableType = "PresalesMatches";
                }

                var innerContent = void 0;
                if (_poolType == "CHP") {
                    var tournamentID = _singleMatch["chpodds"].tournamentID;
                    var hideLSE = this.state.hideLSE;

                    eliminateBtn = React.createElement(EliminateBtn, {
                        hideLSE: hideLSE,
                        _oddsType: _poolType,
                        objID: _matchID,
                        onClick: this.onEliminateBtnClicked
                    });

                    innerContent = React.createElement(
                        'div', {
                            id: 'dCHPTable' + _matchID,
                            key: 'dCHPTable' + _matchID,
                            className: 'betTypeAllOdds'
                        },
                        this.renderTournInfo(_singleMatch, _poolType),
                        React.createElement(OddsSelectionTourn, {
                            hideLSE: hideLSE,
                            singleTourn: _singleMatch,
                            tableType: _tableType,
                            key: tournamentID + 'CHP',
                            oddsType: 'CHP',
                            refOdds: ''
                        })
                    );
                } else if (_poolType == "TQL" && pageName != "RESULT") {
                    var _id = 'd' + _poolType + 'Table' + _ref + _matchID;
                    innerContent = React.createElement(
                        'div', {
                            id: _id,
                            key: _id,
                            className: 'betTypeAllOdds'
                        },
                        this.renderTournInfo(_singleMatch, _poolType),
                        React.createElement(OddsSelectionHeader, {
                            singleMatch: _singleMatch,
                            poolType: _poolType,
                            specClass: 'rBottomBorder'
                        }),
                        React.createElement(MultiPoolPageOddsSelection, {
                            singleMatch: _singleMatch,
                            tableType: _tableType,
                            key: _matchID + '_' + _poolType,
                            oddsType: _poolType,
                            _ref: _ref
                        })
                    );
                } else {
                    var _id = 'd' + _poolType + 'Table' + _ref + _matchID;

                    innerContent = React.createElement(
                        'div', {
                            id: _id,
                            key: _id,
                            className: 'betTypeAllOdds'
                        },
                        React.createElement(OddsSelectionHeader, {
                            singleMatch: _singleMatch,
                            poolType: _poolType,
                            specClass: 'rBottomBorder'
                        }),
                        React.createElement(MultiPoolPageOddsSelection, {
                            singleMatch: _singleMatch,
                            tableType: _tableType,
                            key: _matchID + '_' + _poolType,
                            oddsType: _poolType,
                            _ref: _ref
                        })
                    );
                }
                var specClassName = "";
                var displayValue = "block";
                if (pageName == "MIXALLUP") {
                    specClassName = 'mixOdds' + _poolType;
                    if ($.cookie("chkMixallup") == null || $.cookie("chkMixallup").indexOf(_poolType) == -1) displayValue = "none";
                }

                var tqlCode = "";
                var tqlStage = "";
                var expectedStopSellingTime = null;
                if (pageName.match(/^(ALL|INPLAYALL)$/) && _poolType == "TQL") {
                    var tqlObj = _singleMatch["tqlodds"];
                    if (tqlObj != null) {
                        tqlCode = tqlObj.CODE;
                        tqlStage = tqlObj['STAGE' + curLang.toUpperCase()];
                        //expectedStopSellingTime = <div className={`right`} style={{ paddingRight: "5px" }}>
                        //    {tqlObj.ExpectedStopTime != null && tqlObj.ExpectedStopTime != "" ? formatEsstStr(tqlObj.ExpectedStopTime, true) : null} {tournamentName}</div>;
                    }
                }

                return React.createElement(
                    'div', {
                        key: 'd_' + _matchID + '_' + _poolType + _ref,
                        style: {
                            display: displayValue
                        },
                        className: specClassName
                    },
                    React.createElement(OddsTypeOuterTable, {
                        _oddsType: _poolType,
                        tableType: _tableType,
                        objID: _matchID,
                        innerContent: innerContent,
                        eliminateBtn: eliminateBtn,
                        expectedStopSellingTime: expectedStopSellingTime,
                        code: tqlCode,
                        stage: tqlStage
                    })
                );
            } catch (ex) {
                debugLog("SingleMatchSingleOddsTypeTable: " + ex);
            }
        }
    }]);

    return SingleMatchSingleOddsTypeTable;
}(React.Component);

function renderFocusMatch(data, firstLoad) {
    try {
        var foundMatch = $.grep(data.matches, function(_as) {
            return _as.matchID == tMatchID;
        })[0];
        if (foundMatch == null) {
            $('#focusMatchNoInfo').show();
        } else {
            var _item = new Match(foundMatch);
            var _matchID = _item.matchIDinofficial;
            var singleOddsSet = _item.hadodds;
            var poolStatus = singleOddsSet.POOLSTATUS;
            var poolId = singleOddsSet.POOLID;
            var lineId = singleOddsSet.LINEID;
            var isAllup = singleOddsSet.ALLUP;
            var _oddsCell = void 0;
            var displayAddBet = false;
            var displayInplayLnk = false;

            if (_item.IsMatchKickOff()) {
                _oddsCell = null;
                if (singleOddsSet.INPLAY != "true") {
                    $('#focusMatchStoppedSell').show();
                } else {
                    displayInplayLnk = true;
                }
            } else {
                var tmpCells = [];
                allCheckBoxType.forEach(function(_cbType) {
                    tmpCells.push(React.createElement(OddsCell, {
                        key: _matchID + 'HAD' + _cbType + '_0OC',
                        rkey: _matchID + 'HAD' + _cbType + '_0OC',
                        _oddsType: 'HAD',
                        _matchID: _matchID,
                        oddsSet: singleOddsSet,
                        checkboxType: '' + _cbType,
                        lineNum: '0',
                        _tableType: 'ActiveMatches',
                        poolStatus: poolStatus,
                        isAllup: isAllup,
                        poolId: poolId,
                        lineId: lineId,
                        isFocusMatch: true
                    }));
                });
                _oddsCell = React.createElement(
                    'div', {
                        className: 'table'
                    },
                    tmpCells
                );
                if (!isSelling(poolStatus, "100", "1")) {
                    $('#focusMatchNotStartedSell').show();
                } else {
                    displayAddBet = true;
                }
            }
            ReactDOM.render(React.createElement(
                'div',
                null,
                React.createElement(
                    'div', {
                        className: 'table'
                    },
                    React.createElement(
                        'div', {
                            className: 'cday'
                        },
                        React.createElement(
                            'span',
                            null,
                            _item.frontEndId
                        ),
                        React.createElement(
                            'span',
                            null,
                            formatImageStr([League.GetFlagPath(_item.tournament.tournamentShortName), _item.tournament['tournamentName' + curLang.toUpperCase()], _item.tournament.tournamentShortName])
                        )
                    ),
                    React.createElement(
                        'div', {
                            className: 'cteams'
                        },
                        React.createElement(
                            'span',
                            null,
                            oddsAllJump(_item.matchID, sTeamString(true, false, _item, true, false), displayInplayLnk)
                        )
                    )
                ),
                _oddsCell,
                displayAddBet ? React.createElement(AddBetBtn, null) : null,
                displayInplayLnk ? React.createElement(
                    'div', {
                        className: 'table'
                    },
                    React.createElement(
                        'div', {
                            className: 'inplayLink'
                        },
                        formatInplayIco(_item, "focusmatch", "HAD")
                    )
                ) : null
            ), document.getElementById('focusMatchContent'));
        }
    } catch (ex) {
        debugLog(ex);
    }
    return false;
}

function renderMatchTable(data, firstLoad) {

    var keepRefresh = false;
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
                var hTeam = [];
                var aTeam = [];
                for (var key in betValue) {
                    matchDay[matchDay.length] = betValue[key].matchDay;
                    matchNum[matchNum.length] = betValue[key].matchNum;
                    hTeam[hTeam.length] = betValue[key].homeTeam["teamName" + jsLang];
                    aTeam[aTeam.length] = betValue[key].awayTeam["teamName" + jsLang];

                    if (isQRPortal) {
                        var _otherLang = "EN";
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
            keepRefresh = renderMatchTableMultipleMatch(data, firstLoad);
        }
    } catch (e) {
        displayNoMatch(true, true);
    }

    return keepRefresh;
}

function renderMatchTableSingleMatch(data, firstLoad) {
    var keepRefresh = false;
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

        var displayNoPoolMsg = displayContentWithDDL(allCouponArr, data, firstLoad);

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
        var data = dataCache;
        var tmpMatchId = GetDataStore("__extendresdtls");
        if (tmpMatchId != null && tmpMatchId != "") rMatchID = tmpMatchId;

        if (rMatchID != "") {
            renderResultDetails(rMatchID);
            return false;
        }

        if (getMatchLength(data[0]) > 0) {
            // render coupons
            var _sortedMatchList = putUniqueMatchesToCoupon(data[0].matches, null, false);
            // put all coupons to same array
            _sortedMatchList = [].concat.apply([], _sortedMatchList);
            var matchRows = [];
            _sortedMatchList.forEach(function(singleMatch, _mind) {
                var altRow = _mind;
                matchRows.push(React.createElement(MatchRow_MatchInResults, {
                    tournaments: data[0].tournaments,
                    altRow: altRow % 2,
                    match: singleMatch,
                    key: singleMatch.matchIDinofficial
                }));
            });
            ReactDOM.render(React.createElement(
                'div', {
                    className: 'table'
                },
                matchRows
            ), document.getElementById('resMatchIn'));
            $('.trMatchIn').show();
        } else {
            $('.trMatchIn').hide();
        }
        if (getMatchLength(data[1]) > 0) {
            // render coupons
            var _sortedMatchList2 = putUniqueMatchesToCoupon(data[1].matches, null, false);

            //_sortedMatchList = _sortedMatchList.reverse();
            var _coupons = [];
            _sortedMatchList2.forEach(function(_coupon, _cid) {
                _coupons.push(React.createElement(ResultsCoupon, {
                    coupon: _coupon,
                    tournaments: data[1].tournaments,
                    key: 'd' + curPage + '_' + _cid,
                    tableType: 'result'
                }));
            });

            ReactDOM.render(React.createElement(
                'div', {
                    className: 'table'
                },
                _coupons
            ), document.getElementById('resMatch'));

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
        if (getMatchLength(data[0]) == 0 && getMatchLength(data[1]) == 0) drawEmptyResult();
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
    if (tmpMatchId != null && tmpMatchId != "") rMatchID = tmpMatchId;

    if (rMatchID != "") {
        renderResultDetails(rMatchID);
        return false;
    }

    totalMatch = parseInt(dataCache[0].matchescount, 10);
    //displaySearchLabel();

    if (totalMatch > 0) {
        startMatch = (curPage - 1) * maxMatch + 1;
        endMatch = startMatch + maxMatch - 1;
        endMatch = endMatch > totalMatch ? totalMatch : endMatch;

        var matchRows = [];
        var hasExtraTimeMatch = false;
        for (var i = 0; i < dataCache[0].matches.length; i++) {
            var singleMatch = dataCache[0].matches[i];
            matchRows.push(React.createElement(MatchRow_ResultRow, {
                altRow: i % 2,
                match: singleMatch,
                key: singleMatch.matchIDinofficial,
                tableType: 'result',
                couponID: ''
            }));
            if (!hasExtraTimeMatch && singleMatch.GetExtraTimeScore() != null) {
                hasExtraTimeMatch = true;
            }
        }

        ReactDOM.render(React.createElement(
            'div', {
                className: 'table'
            },
            matchRows
        ), document.getElementById('resMatch'));
        couponCount = 0;
        ReactDOM.render(React.createElement(PageInfo, {
            type: 'header'
        }), document.getElementById('searchTableHeader'));
        ReactDOM.render(React.createElement(PageInfo, {
            type: 'footer'
        }), document.getElementById('searchTableFooter'));

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
        var _resultDetails = void 0;
        var _tournament = void 0;
        if (dataCache.length > 1) {
            _resultDetails = $.grep(dataCache[1].matches, function(_match) {
                return _match.matchID == _rMatchID;
            })[0];
            _tournament = $.grep(dataCache[1].tournaments, function(_tourn) {
                return _tourn.tournamentID == _resultDetails.tournament.tournamentID;
            })[0];
        } else {
            _resultDetails = $.grep(dataCache[0].matches, function(_match) {
                return _match.matchID == _rMatchID;
            })[0];
            _tournament = $.grep(dataCache[0].tournaments, function(_tourn) {
                return _tourn.tournamentID == _resultDetails.tournament.tournamentID;
            })[0];
        }
        var _normalPools = ["HAD", "FHA", "CRS", "FCS", "HFT", "TTG", "OOE", "FGS", "TQL"];
        var _1stHalfPools = ["FHA", "FCS", "FGS"];
        var _ntsPools = ["NTS", "ETS"];
        var _normalFtsPools = ["FTS"];
        var _extraTimePools = ["EHA", "ECS", "ETG"];
        var _entPools = ["ENT"];

        var normalTable = [];
        var ftsTable = [];
        var ntsTable = [];
        var spcTable = [];
        var sgaTable = [];
        var extraTimeTable = [];
        var entTable = [];

        // change title for half time result
        var strHalfTimeDiv = "FCS,FHA,FGS,FTS"; // "fcs,fts,fgs,fha";
        if (_resultDetails.isEndOfHalfTimeWithDiv(strHalfTimeDiv)) {
            $('.matchResultDetail').html(jsdetailsResult_half);
            _normalPools = _1stHalfPools;
        } else {
            $('.matchResultDetail').html(jsdetailsResult);
        }

        var scoreTable = [];
        var scoreAbandonedTable = [];
        var extraTimeScoreTable = [];
        var extraTimeScoreAbandonedTable = [];

        var firstHalfScore = '-';
        var secondHalfScore = '-';
        var abandonedScore = '-';
        var extraTimeScore = '-';
        var extraTimeAbandonedScore = '-';
        var normalCorner = "";
        var abandonedNormalCorner = "";
        var extraTimeCorner = "";
        var abandonedExtraTimeCorner = "";
        var is1stHalfFinal = false;
        var is2ndHalfFinal = false;
        var isExtraFinal = false;
        var isVoid = _resultDetails.isVoidMatch();

        // score result
        if (_resultDetails.accumulatedscore != null) {
            var firstHalfResult = $.grep(_resultDetails.accumulatedscore, function(_as) {
                return _as.periodvalue == "FirstHalf";
            })[0];
            var secondHalfResult = $.grep(_resultDetails.accumulatedscore, function(_as) {
                return _as.periodvalue == "SecondHalf";
            })[0];
            var extraTimeResult = $.grep(_resultDetails.accumulatedscore, function(_as) {
                return _as.periodvalue == "ExtraTime";
            })[0];
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
            } else if (_resultDetails.cornerresultfinal == "1" && _resultDetails.cornerresult != null && _resultDetails.cornerresult != '') {
                normalCorner = _resultDetails.cornerresult;
            }
            if (_resultDetails.etcornerresult == 'RFD') {
                extraTimeCorner = _resultDetails.abandonedcornerresultfinal != "1" ? jsRFD : '-';
            } else if (_resultDetails.etcornerresultfinal == "1" && _resultDetails.etcornerresult != null && _resultDetails.etcornerresult != '') {
                extraTimeCorner = _resultDetails.etcornerresult;
            }
        }

        var isETVoid = isVoid && is1stHalfFinal && is2ndHalfFinal;
        if (isVoid) {
            if (isETVoid) {
                if (_resultDetails.abandonedscore != null) {
                    extraTimeAbandonedScore = _resultDetails.abandonedscore.home + " : " + _resultDetails.abandonedscore.away;
                }
                if (_resultDetails.abandonedcornerresult != null && _resultDetails.abandonedcornerresultfinal == "1") {
                    abandonedExtraTimeCorner = _resultDetails.abandonedcornerresult;
                }
            } else {
                if (_resultDetails.abandonedscore != null) {
                    abandonedScore = _resultDetails.abandonedscore.home + " : " + _resultDetails.abandonedscore.away;
                }
                if (_resultDetails.abandonedcornerresult != null && _resultDetails.abandonedcornerresultfinal == "1") {
                    abandonedNormalCorner = _resultDetails.abandonedcornerresult;
                }
            }
        }

        scoreTable = React.createElement(
            'div', {
                className: 'table border-bottom2'
            },
            React.createElement(
                'div', {
                    key: 'normalResultTitleRow',
                    className: 'tableRow'
                },
                React.createElement(
                    'div', {
                        className: 'tableCell font-bold'
                    },
                    jsresults
                )
            ),
            React.createElement(
                'div', {
                    className: 'tableCell border-top2'
                },
                React.createElement(
                    'div', {
                        className: 'table'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableRow tableContent2'
                        },
                        React.createElement(
                            'div', {
                                className: 'tableCell'
                            },
                            jshalfTimeScoreResult
                        ),
                        React.createElement(
                            'div', {
                                className: 'tableCell'
                            },
                            firstHalfScore
                        )
                    )
                )
            ),
            React.createElement(
                'div', {
                    className: 'tableCell border-top2'
                },
                React.createElement(
                    'div', {
                        className: 'table'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableRow tableContent2'
                        },
                        React.createElement(
                            'div', {
                                className: 'tableCell'
                            },
                            jsfullTimeScoreResult
                        ),
                        React.createElement(
                            'div', {
                                className: 'tableCell'
                            },
                            secondHalfScore
                        )
                    )
                )
            ),
            normalCorner != '' ? React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'div', {
                        className: 'tableCell'
                    },
                    React.createElement(
                        'div', {
                            className: 'table'
                        },
                        React.createElement(
                            'div', {
                                className: 'tableRow'
                            },
                            React.createElement(
                                'div', {
                                    className: 'tableCell'
                                },
                                jsTotalCorners
                            ),
                            React.createElement(
                                'div', {
                                    className: 'tableCell'
                                },
                                normalCorner == 'RFD' ? jsRFD : normalCorner
                            )
                        )
                    )
                )
            ) : null
        );

        if (abandonedScore != '-' || abandonedNormalCorner != '') {
            scoreAbandonedTable = React.createElement(
                'div', {
                    className: 'table border-bottom2'
                },
                React.createElement(
                    'div', {
                        key: 'normalResultTitleRow',
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell font-bold'
                        },
                        jsabandonedScoreResult
                    )
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell border-top2'
                    },
                    React.createElement(
                        'div', {
                            className: 'table'
                        },
                        React.createElement(
                            'div', {
                                className: 'tableRow tableContent2'
                            },
                            React.createElement(
                                'div', {
                                    className: 'tableCell'
                                },
                                jsscoreResult
                            ),
                            React.createElement(
                                'div', {
                                    className: 'tableCell'
                                },
                                abandonedScore
                            )
                        )
                    )
                ),
                abandonedNormalCorner != '' ? React.createElement(
                    'div', {
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell'
                        },
                        React.createElement(
                            'div', {
                                className: 'table'
                            },
                            React.createElement(
                                'div', {
                                    className: 'tableRow'
                                },
                                React.createElement(
                                    'div', {
                                        className: 'tableCell'
                                    },
                                    jsCornerResult
                                ),
                                React.createElement(
                                    'div', {
                                        className: 'tableCell'
                                    },
                                    abandonedNormalCorner == 'RFD' ? jsRFD : abandonedNormalCorner
                                )
                            )
                        )
                    ),
                    React.createElement('div', {
                        className: 'tableCell'
                    })
                ) : null
            );
        }

        if (extraTimeScore != '-' || extraTimeCorner != '' || extraTimeAbandonedScore != '-') {
            extraTimeScoreTable = React.createElement(
                'div', {
                    className: 'table border-bottom2'
                },
                React.createElement(
                    'div', {
                        key: 'normalResultTitleRow',
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell font-bold'
                        },
                        jsextraTimeResult
                    )
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell border-top2'
                    },
                    React.createElement(
                        'div', {
                            className: 'table'
                        },
                        React.createElement(
                            'div', {
                                className: 'tableRow tableContent2'
                            },
                            React.createElement(
                                'div', {
                                    className: 'tableCell'
                                },
                                jsextraTimeScoreResult
                            ),
                            React.createElement(
                                'div', {
                                    className: 'tableCell'
                                },
                                extraTimeScore
                            )
                        )
                    )
                ),
                React.createElement('div', {
                    className: 'tableCell border-top2'
                }),
                React.createElement(
                    'div', {
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell'
                        },
                        React.createElement(
                            'div', {
                                className: 'table'
                            },
                            extraTimeCorner != '' ? React.createElement(
                                'div', {
                                    className: 'tableRow'
                                },
                                React.createElement(
                                    'div', {
                                        className: 'tableCell'
                                    },
                                    jsTotalCorners
                                ),
                                React.createElement(
                                    'div', {
                                        className: 'tableCell'
                                    },
                                    extraTimeCorner
                                )
                            ) : null
                        )
                    )
                )
            );
        }

        if (extraTimeAbandonedScore != '-' || abandonedExtraTimeCorner != '') {
            extraTimeScoreAbandonedTable = React.createElement(
                'div', {
                    className: 'table border-bottom2'
                },
                React.createElement(
                    'div', {
                        key: 'normalResultTitleRow',
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell font-bold'
                        },
                        jsabandonedScoreResultET
                    )
                ),
                React.createElement(
                    'div', {
                        className: 'tableCell border-top2'
                    },
                    React.createElement(
                        'div', {
                            className: 'table'
                        },
                        React.createElement(
                            'div', {
                                className: 'tableRow tableContent2'
                            },
                            React.createElement(
                                'div', {
                                    className: 'tableCell'
                                },
                                jsscoreResult
                            ),
                            React.createElement(
                                'div', {
                                    className: 'tableCell'
                                },
                                extraTimeAbandonedScore
                            )
                        )
                    )
                ),
                abandonedExtraTimeCorner != '' ? React.createElement(
                    'div', {
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell'
                        },
                        React.createElement(
                            'div', {
                                className: 'table'
                            },
                            React.createElement(
                                'div', {
                                    className: 'tableRow'
                                },
                                React.createElement(
                                    'div', {
                                        className: 'tableCell'
                                    },
                                    jsCornerResult
                                ),
                                React.createElement(
                                    'div', {
                                        className: 'tableCell'
                                    },
                                    abandonedExtraTimeCorner
                                )
                            )
                        )
                    )
                ) : null,
                React.createElement('div', {
                    className: 'tableCell border-top2'
                })
            );
        }

        // draw normal pools
        for (var i = 0; i < _normalPools.length; i++) {
            if (_resultDetails.HasPoolResults(_normalPools[i])) {
                var displayPoolName = void 0;
                if (_normalPools[i] == "HAD") {
                    displayPoolName = jsnts_HAD;
                } else if (_normalPools[i] == "FHA") {
                    displayPoolName = jsnts_FHAD;
                } else {
                    displayPoolName = GetGlobalResources(_normalPools[i]);
                }
                normalTable.push(React.createElement(
                    'div', {
                        key: _normalPools[i] + 'ResultRow',
                        className: 'tableRow tableContent' + ((normalTable.length + 1) % 2 + 1)
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell'
                        },
                        displayPoolName
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell'
                        },
                        _resultDetails.GetNonNTSResult(_normalPools[i])
                    )
                ));
            }
        }

        // draw fts pools (right top table)
        for (var _i4 = 0; _i4 < _normalFtsPools.length; _i4++) {
            if (_resultDetails.HasPoolResults(_normalFtsPools[_i4])) {
                ftsTable.push(React.createElement(
                    'div', {
                        key: _normalFtsPools[_i4] + 'ResultRow',
                        className: 'tableRow tableContent' + ((ftsTable.length + 1) % 2 + 1)
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell'
                        },
                        GetGlobalResources(_normalFtsPools[_i4])
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell'
                        },
                        _resultDetails.GetNonNTSResult(_normalFtsPools[_i4])
                    )
                ));
            }
        }

        // draw nts pools (right bottom table)
        for (var _i5 = 0; _i5 < _ntsPools.length; _i5++) {
            for (var k = 1; k <= 30; k++) {
                //assume maximum 30 NTS / ETS items
                if (_resultDetails.HasPoolResults(_ntsPools[_i5] + k)) {
                    var _displayPoolName = void 0;
                    var goalnumber = k;
                    var extraTimeInfo = "";
                    if (_ntsPools[_i5] == "ETS") {
                        goalnumber = parseInt(goalnumber, 10);
                        extraTimeInfo = jsextratime;
                    }
                    if (curLang == 'en') {
                        _displayPoolName = React.createElement(
                            'span',
                            null,
                            goalnumber,
                            React.createElement(
                                'sup',
                                null,
                                getNumberSuffix(goalnumber)
                            ),
                            GetGlobalResources("ntslastpart", "js"),
                            ' ',
                            extraTimeInfo
                        );
                    } else {
                        _displayPoolName = React.createElement(
                            'span',
                            null,
                            GetGlobalResources("ntsfstpart", "js"),
                            goalnumber,
                            GetGlobalResources("ntslastpart", "js"),
                            ' ',
                            extraTimeInfo
                        );
                    }
                    ntsTable.push(React.createElement(
                        'div', {
                            key: _ntsPools[_i5] + 'ResultRow_' + k,
                            className: 'tableRow tableContent2'
                        },
                        React.createElement(
                            'div', {
                                className: 'tableCell'
                            },
                            _displayPoolName
                        ),
                        React.createElement(
                            'div', {
                                className: 'tableCell'
                            },
                            _resultDetails.GetNTSResult(_ntsPools[_i5], k)
                        )
                    ));
                }
            }
        }

        // draw spc (bottom table)
        spcTable = drawSPCResultRows(_resultDetails, 'dSPC' + _resultDetails.matchID, 'SPC');

        // draw sga (bottom table)
        sgaTable = drawSPCResultRows(_resultDetails, 'dSGA' + _resultDetails.matchID, 'SGA');

        // draw extra time pools
        for (var _i6 = 0; _i6 < _extraTimePools.length; _i6++) {
            if (_resultDetails.HasPoolResults(_extraTimePools[_i6])) {
                var _displayPoolName2 = GetGlobalResources(_extraTimePools[_i6]);
                extraTimeTable.push(React.createElement(
                    'div', {
                        key: _extraTimePools[_i6] + 'ResultRow',
                        className: 'tableRow tableContent' + ((extraTimeTable.length + 1) % 2 + 1)
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell'
                        },
                        _displayPoolName2
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell'
                        },
                        _resultDetails.GetNonNTSResult(_extraTimePools[_i6])
                    )
                ));
            }
        }

        // draw ent pools (right bottom table)
        for (var _i7 = 0; _i7 < _entPools.length; _i7++) {
            for (var _k = 1; _k <= 30; _k++) {
                //assume maximum 30 NTS / ETS items
                if (_resultDetails.HasPoolResults(_entPools[_i7] + _k)) {
                    var _displayPoolName3 = void 0;
                    var _goalnumber = _k;
                    if (curLang == 'en') {
                        _displayPoolName3 = React.createElement(
                            'span',
                            null,
                            _goalnumber,
                            React.createElement(
                                'sup',
                                null,
                                getNumberSuffix(_goalnumber)
                            ),
                            GetGlobalResources("ntslastpart", "js")
                        );
                    } else {
                        _displayPoolName3 = React.createElement(
                            'span',
                            null,
                            GetGlobalResources("ntsfstpart", "js"),
                            _goalnumber,
                            GetGlobalResources("ntslastpart", "js")
                        );
                    }
                    entTable.push(React.createElement(
                        'div', {
                            key: _entPools[_i7] + 'ResultRow_' + _k,
                            className: 'tableRow tableContent2'
                        },
                        React.createElement(
                            'div', {
                                className: 'tableCell'
                            },
                            _displayPoolName3
                        ),
                        React.createElement(
                            'div', {
                                className: 'tableCell'
                            },
                            _resultDetails.GetNTSResult(_entPools[_i7], _k)
                        )
                    ));
                }
            }
        }

        // add title row to tables
        if (normalTable.length > 0) {
            normalTable = React.createElement(
                'div', {
                    className: 'table'
                },
                React.createElement(
                    'div', {
                        key: 'normalResultTitleRow',
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsbettypes
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsmatchresults
                    )
                ),
                normalTable
            );
        }
        if (ftsTable.length > 0) {
            ftsTable = React.createElement(
                'div', {
                    className: 'table paddingBottom'
                },
                React.createElement(
                    'div', {
                        key: 'ftsResultTitleRow',
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsbettypes
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsmatchresults
                    )
                ),
                ftsTable
            );
        }
        if (ntsTable.length > 0) {
            ntsTable = React.createElement(
                'div', {
                    className: 'table'
                },
                React.createElement(
                    'div', {
                        key: 'ntsResultTitleRow',
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsNTS
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsscoreteam
                    )
                ),
                ntsTable
            );
        }
        if (spcTable.length > 0) {
            spcTable = React.createElement(
                'div',
                null,
                React.createElement(
                    'div', {
                        className: 'border-bottom2 font-bold'
                    },
                    jsspcresults
                ),
                React.createElement(
                    'div', {
                        className: 'table'
                    },
                    React.createElement(
                        'div', {
                            key: 'spcResultTitleRow',
                            className: 'tableRow'
                        },
                        React.createElement(
                            'div', {
                                style: {
                                    width: "18%"
                                },
                                className: 'tableCell border-bottom2'
                            },
                            jsitemno
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    width: "55%"
                                },
                                className: 'tableCell border-bottom2'
                            },
                            jsitem
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    width: "22%"
                                },
                                className: 'tableCell border-bottom2'
                            },
                            jsresults
                        )
                    ),
                    spcTable
                )
            );
        }
        if (sgaTable.length > 0) {
            sgaTable = React.createElement(
                'div',
                null,
                React.createElement(
                    'div', {
                        className: 'border-bottom2 font-bold'
                    },
                    jssgaresults
                ),
                React.createElement(
                    'div', {
                        className: 'table'
                    },
                    React.createElement(
                        'div', {
                            key: 'spcResultTitleRow',
                            className: 'tableRow'
                        },
                        React.createElement(
                            'div', {
                                style: {
                                    width: "18%"
                                },
                                className: 'tableCell border-bottom2'
                            },
                            jsitemno
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    width: "55%"
                                },
                                className: 'tableCell border-bottom2'
                            },
                            jsitem
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    width: "22%"
                                },
                                className: 'tableCell border-bottom2'
                            },
                            jsresults
                        )
                    ),
                    sgaTable
                )
            );
        }
        if (extraTimeTable.length > 0) {
            extraTimeTable = React.createElement(
                'div', {
                    className: 'table'
                },
                React.createElement(
                    'div', {
                        key: 'normalResultTitleRow',
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsextraTimeBettypes
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsmatchresults
                    )
                ),
                extraTimeTable
            );
        }
        if (entTable.length > 0) {
            entTable = React.createElement(
                'div', {
                    className: 'table'
                },
                React.createElement(
                    'div', {
                        key: 'ftsResultTitleRow',
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsextraTimeBettypes
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsmatchresults
                    )
                ),
                React.createElement(
                    'div', {
                        key: 'ntsResultTitleRow',
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsENT
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell border-bottom2 font-bold'
                        },
                        jsscoreteam
                    )
                ),
                entTable
            );
        }
        var resdetailtourn_img = formatImageStr([League.GetFlagPath(_tournament.tournamentShortName), _tournament['tournamentName' + curLang.toUpperCase()], _tournament.tournamentShortName]);
        ReactDOM.render(React.createElement(
            'div', {
                className: 'table'
            },
            React.createElement(ResultDetailTournament, {
                tournament: _tournament,
                match: _resultDetails,
                imgstr: resdetailtourn_img
            }),
            React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'div', {
                        className: 'table'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell padding'
                        },
                        scoreTable
                    )
                )
            ),
            scoreAbandonedTable.length == 0 ? null : React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'div', {
                        className: 'table'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell padding'
                        },
                        scoreAbandonedTable
                    )
                )
            ),
            normalTable.length == 0 && ftsTable.length == 0 && ntsTable.length == 0 ? null : React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'div', {
                        className: 'table border-bottom2'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell padding'
                        },
                        normalTable
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell padding tableCellTop'
                        },
                        ftsTable,
                        ntsTable
                    )
                )
            ),
            extraTimeScoreTable.length == 0 ? null : React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'div', {
                        className: 'table'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell padding'
                        },
                        extraTimeScoreTable
                    )
                )
            ),
            extraTimeScoreAbandonedTable.length == 0 ? null : React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'div', {
                        className: 'table'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell padding'
                        },
                        extraTimeScoreAbandonedTable
                    )
                )
            ),
            React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'div', {
                        className: 'table'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell padding'
                        },
                        extraTimeTable
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell padding tableCellTop'
                        },
                        entTable
                    )
                )
            ),
            React.createElement('div', {
                className: 'space'
            }),
            React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'div', {
                        className: 'tableCell'
                    },
                    spcTable
                )
            ),
            React.createElement('div', {
                className: 'space'
            }),
            React.createElement(
                'div', {
                    className: 'tableRow'
                },
                React.createElement(
                    'div', {
                        className: 'tableCell'
                    },
                    sgaTable
                )
            ),
            React.createElement('div', {
                id: 'resultRemark',
                style: {
                    marginTop: "20px"
                }
            })
        ), document.getElementById('trResultDetails'));

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
            var newUrl = location.href + '#';
            window.history.pushState({
                "product": curProduct,
                "page": curPageId,
                "lang": curLang,
                "para": para
            }, "", newUrl);
        } else {
            ClearDataStoreItem("__extendresdtls");
        }
    } catch (ex) {
        debugLog("renderResultDetails" + ex);
    }
}

var ResultDetailTournament = function(_React$Component39) {
    _inherits(ResultDetailTournament, _React$Component39);

    function ResultDetailTournament() {
        _classCallCheck(this, ResultDetailTournament);

        return _possibleConstructorReturn(this, (ResultDetailTournament.__proto__ || Object.getPrototypeOf(ResultDetailTournament)).apply(this, arguments));
    }

    _createClass(ResultDetailTournament, [{
        key: 'render',
        value: function render() {
            var t = this.props.tournament;
            var m = this.props.match;
            var i = this.props.imgstr;

            var eventId = m.isBAUResult ? GetGlobalResources(m.matchDay, "js") + " " + m.matchNum : m.frontEndId;

            if (t) {
                return React.createElement(
                    'div', {
                        className: 'tableRow header',
                        title: t['tournamentName' + curLang.toUpperCase()]
                    },
                    React.createElement(
                        'span', {
                            className: 'tableCell border-bottom2'
                        },
                        jseventNo + ':',
                        '\xA0',
                        eventId,
                        '\xA0',
                        i,
                        '\xA0',
                        sTeamString(false, false, m, true, true, "HAD")
                    )
                );
            }
            return null;
        }
    }]);

    return ResultDetailTournament;
}(React.Component);

function renderLastOdds(_rMatchID, retryOnce) {
    try {
        // get data
        if (noOfFail <= 2) {
            $.ajax({
                url: "/football/getJSON.aspx?jsontype=last_odds.aspx&matchid=" + _rMatchID,
                type: "get",
                contentType: "application/json; charset=utf-8",
                success: function success(data) {
                    if (data.indexOf && data.indexOf(wafKeyword) >= 0 && !retryOnce) {
                        $('#tFrame').attr('src', '/reload.aspx?a=' + new Date().getTime());
                        setTimeout(function() {
                            renderLastOdds(_rMatchID, true);
                        }, 1000);
                        return;
                    }
                    lastOddsCache = data;
                    drawLastOdds(_rMatchID);
                },
                error: function error() {
                    noOfFail++;
                }
            });
        }
    } catch (ex) {
        debugLog(ex);
    }
}

function drawLastOdds(_rMatchID) {
    try {
        rMatchID = _rMatchID;
        var _singleMatch = new Match(lastOddsCache);

        ReactDOM.render(renderMatchAllTable(_singleMatch, true, "result"), document.getElementById('trResultDetails'));

        $('#lastOddsRefreshTime').html(formatEsstStr(_singleMatch.statuslastupdated, true));

        $('.allResults').hide();
        $('.resultsDetails').show();

        $('.hdResultDetails').hide();
        $('.hdMatchLastOdds').show();
        $('#sgaRemarks').hide();

        var tmpId = GetDataStore("__extendlastOdds");
        if (tmpId == null || tmpId == '') {
            window.scrollTo(0, 0);
            var newUrl = location.href + "#";
            var p = trimPara2();
            window.history.pushState({
                "product": curProduct,
                "page": curPageId,
                "lang": curLang,
                "para": p
            }, "", newUrl);
        } else {
            ClearDataStoreItem("__extendlastOdds");
        }

        isOnLastOddsPage = true;
    } catch (ex) {
        debugLog("drawLastOdds" + ex);
    }
}

function renderFGSResults(firstLoad) {
    var couponList = [];
    var fg = [];
    for (var i in fgsJson) {
        var key = fgsJson[i].matchKODateFormatted.substring(0, 10);
        if (fg[key]) continue;
        fg[key] = true;
        couponList.push(key);
    }
    couponList.sort(function(x, y) {
        var tmpX = x.split('/');
        var tmpY = y.split('/');
        return new Date(parseInt(tmpY[2]), parseInt(tmpY[1]) - 1, parseInt(tmpY[0])).getTime() - new Date(parseInt(tmpX[2]), parseInt(tmpX[1]) - 1, parseInt(tmpX[0])).getTime();
    });
    ReactDOM.render(React.createElement(FGSResultsTable, {
        couponList: couponList
    }), document.getElementById('fgsRes'));
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
    var _coupons = [];
    data = data.sort(sort_by2(["matchDate", "matchNum"], [false, false], [trimMatchDate, parseInt]));
    for (var i = 0; i < data.length; i++) {
        var _couponName = void 0,
            _couponID = void 0;
        var _resultRow = [];
        var rightText = "";
        var _singleObjectResult = void 0;

        var _leagueName = void 0,
            _aTeamName = void 0,
            _hTeamName = void 0;
        if (jsLang == "CH") {
            _leagueName = data[i].league.leagueNameCH;
            _hTeamName = data[i].homeTeam.teamNameCH;
            _aTeamName = data[i].awayTeam.teamNameCH;
        } else {
            _leagueName = data[i].league.leagueNameEN;
            _hTeamName = data[i].homeTeam.teamNameEN;
            _aTeamName = data[i].awayTeam.teamNameEN;
        }
        _couponName = React.createElement(
            'span',
            null,
            jsmatchno,
            ': ',
            GetGlobalResources(data[i].matchDay, "js"),
            ' ',
            data[i].matchNum,
            ' ',
            formatMatchFlag(data[i].league.leagueShortName, _leagueName),
            ' ',
            _hTeamName,
            ' ',
            jsVS,
            ' ',
            _aTeamName
        );
        _couponID = 'd' + data[i].matchIDinofficial;
        rightText = jsdate + ': ' + formatYYYYMMDD(data[i].matchIDinofficial.substr(0, 8));
        _singleObjectResult = new Match_Result(data[i], data.name == "SPC Results");;
        _resultRow = drawSPCResultRows(_singleObjectResult, _couponID);

        // coupon 
        _coupons.push(React.createElement(
            'div', {
                key: _couponID + '_container'
            },
            React.createElement('div', {
                className: 'space2'
            }),
            React.createElement(CouponHeader, {
                couponName: _couponName,
                couponID: _couponID,
                hasMLMatch: false,
                couponCount: "",
                rightText: rightText
            }),
            React.createElement(
                'div', {
                    className: _couponID + ' table'
                },
                React.createElement(
                    'div', {
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            style: {
                                width: "18%",
                                textAlign: "center"
                            },
                            className: 'tableCell tableContentHead'
                        },
                        jsitemno
                    ),
                    React.createElement(
                        'div', {
                            style: {
                                width: "55%",
                                textAlign: "center"
                            },
                            className: 'tableCell tableContentHead'
                        },
                        jsitem
                    ),
                    React.createElement(
                        'div', {
                            style: {
                                width: "22%",
                                textAlign: "center"
                            },
                            className: 'tableCell tableContentHead'
                        },
                        jsresults
                    )
                ),
                _resultRow
            )
        ));
        // content
    }

    // tourn results
    if (!displaySearchResult) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(tournXML, "text/xml");

        var tdata = xmlDoc.getElementsByTagName("TOURN");
        var found = false;

        var _content = new StringBuffer();
        for (var i = 0; i < tdata.length; i++) {
            var _tourn = tdata[i];
            var _tournID = _tourn.getAttribute("TOURN_ID");

            var nameAttr = jsLang == "CH" ? "C_NAME" : "E_NAME";
            var _tournName = _tourn.getAttribute(nameAttr);
            var _tournTitle = React.createElement(
                'span',
                null,
                jstournamentno,
                ' : ',
                _tourn.getAttribute('TOURNAMENT_NO'),
                ' ',
                formatTournFlag(_tourn.getAttribute('CODE'), _tournName),
                ' ',
                _tournName
            );

            var allPools = _tourn.getElementsByTagName('POOL');
            var _singlePool = allPools[0];

            var langPrefix = void 0;
            var _spcRFD = _singlePool.getAttribute('REFUND') == "1";
            var items = _singlePool.getElementsByTagName('ITEM');

            var _resultRow2 = [];
            var _rightText = "";
            for (var j = 0; j < items.length; j++) {
                var _itemResult = [];
                if (_spcRFD) {
                    _itemResult.push(React.createElement(
                        'div', {
                            key: _tournID + '_r'
                        },
                        React.createElement(
                            'font', {
                                color: 'red'
                            },
                            jsrefundforall
                        )
                    ));
                } else {
                    langPrefix = jsLang[0] + "_";
                }

                var _itemNo = items[j].getAttribute('NUM');
                var _itemQuestion = items[j].getAttribute(nameAttr);
                if (!_spcRFD) {
                    if (items[j].getAttribute('REFUND') == "1") {
                        _itemResult.push(React.createElement(
                            'div', {
                                key: _tournID + '_' + _itemNo + '_r'
                            },
                            React.createElement(
                                'font', {
                                    color: 'red'
                                },
                                jsRFD
                            )
                        ));
                    } else {
                        // get all selections
                        var selNum = items[j].getAttribute('SEL_1');
                        var answer = items[j].getAttribute(langPrefix + 'SEL_1');
                        _itemResult.push(React.createElement(
                            'div', {
                                key: _tournID + '_' + _itemNo + '_a'
                            },
                            '(',
                            parseInt(selNum, 10),
                            ') ',
                            answer
                        ));

                        // get all refund selections
                        var refundedSel = items[j].getElementsByTagName('RFD');
                        for (var rfdInd = 0; rfdInd < refundedSel.length; rfdInd++) {
                            var rSelNum = refundedSel[rfdInd].getAttribute('NUM');
                            var rAnswer = refundedSel[rfdInd].getAttribute(nameAttr);
                            _itemResult.push(React.createElement(
                                'div', {
                                    key: _tournID + '_' + _itemNo + '_' + rfdInd + '_r'
                                },
                                '(',
                                parseInt(rSelNum, 10),
                                ') ',
                                rAnswer,
                                ' ',
                                React.createElement(
                                    'font', {
                                        color: 'red'
                                    },
                                    ' - ',
                                    jsRFD
                                )
                            ));
                        }
                    }
                }
                _resultRow2.push(React.createElement(
                    'div', {
                        key: _tournID + '_' + _itemNo,
                        className: 'couponRow tableRow rAlt' + ++noOfSPCRow % 2
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell middle'
                        },
                        _itemNo
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell middle'
                        },
                        _itemQuestion
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell middle'
                        },
                        _itemResult
                    )
                ));
            }

            _coupons.push(React.createElement(
                'div', {
                    key: _tournID + '_container'
                },
                React.createElement('div', {
                    className: 'space2'
                }),
                React.createElement(CouponHeader, {
                    couponName: _tournTitle,
                    couponID: _tournID,
                    hasMLMatch: false,
                    couponCount: "",
                    rightText: _rightText
                }),
                React.createElement(
                    'div', {
                        className: _tournID + ' table'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableRow'
                        },
                        React.createElement(
                            'div', {
                                style: {
                                    width: "18%",
                                    textAlign: "center"
                                },
                                className: 'tableCell tableContentHead'
                            },
                            jsitemno
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    width: "55%",
                                    textAlign: "center"
                                },
                                className: 'tableCell tableContentHead'
                            },
                            jsitem
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    width: "22%",
                                    textAlign: "center"
                                },
                                className: 'tableCell tableContentHead'
                            },
                            jsresults
                        )
                    ),
                    _resultRow2
                )
            ));
        }
    }

    ReactDOM.render(React.createElement(
        'div',
        null,
        _coupons
    ), document.getElementById('dContainer'));
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
    var _coupons = [];
    if (dataCache.length > 0) {
        totalMatch = dataCache.length;
        startMatch = (curPage - 1) * maxMatch + 1;
        endMatch = startMatch + maxMatch - 1;
        endMatch = endMatch > totalMatch ? totalMatch : endMatch;

        var _typeResult = dataCache;

        _typeResult = _typeResult.sort(sort_by2(["matchDate", "matchNum"], [true, false], [trimMatchDate, parseInt]));

        for (var i = startMatch - 1; i < endMatch; i++) {
            var _couponName = void 0,
                _couponID = void 0;
            var _resultRow = [];
            var _singleObjectResult = void 0;
            var rightText = "";

            var _leagueName = void 0,
                _aTeamName = void 0,
                _hTeamName = void 0;
            if (jsLang == "CH") {
                _leagueName = _typeResult[i].league.leagueNameCH;
                _hTeamName = _typeResult[i].homeTeam.teamNameCH;
                _aTeamName = _typeResult[i].awayTeam.teamNameCH;
            } else {
                _leagueName = _typeResult[i].league.leagueNameEN;
                _hTeamName = _typeResult[i].homeTeam.teamNameEN;
                _aTeamName = _typeResult[i].awayTeam.teamNameEN;
            }
            _couponName = React.createElement(
                'span',
                null,
                jsmatchno,
                ': ',
                GetGlobalResources(_typeResult[i].matchDay, "js"),
                ' ',
                _typeResult[i].matchNum,
                ' ',
                formatMatchFlag(_typeResult[i].league.leagueShortName, _leagueName),
                ' ',
                _hTeamName,
                ' ',
                jsVS,
                ' ',
                _aTeamName
            );
            _couponID = 'd' + _typeResult[i].matchIDinofficial;

            rightText = '' + formatYYYYMMDD(_typeResult[i].matchIDinofficial.substr(0, 8));
            _singleObjectResult = new Match_Result(_typeResult[i], _typeResult.name == "SPC Results");;
            _resultRow = drawSPCResultRows(_singleObjectResult, _couponID);

            // coupon 
            _coupons.push(React.createElement(
                'div', {
                    key: _couponID + '_container'
                },
                React.createElement('div', {
                    className: 'space2'
                }),
                React.createElement(CouponHeader, {
                    couponName: _couponName,
                    couponID: _couponID,
                    hasMLMatch: false,
                    couponCount: "",
                    rightText: rightText
                }),
                React.createElement(
                    'div', {
                        className: _couponID + ' table'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableRow'
                        },
                        React.createElement(
                            'div', {
                                style: {
                                    width: "18%",
                                    textAlign: "center"
                                },
                                className: 'tableCell tableContentHead'
                            },
                            jsitemno
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    width: "55%",
                                    textAlign: "center"
                                },
                                className: 'tableCell tableContentHead'
                            },
                            jsitem
                        ),
                        React.createElement(
                            'div', {
                                style: {
                                    width: "22%",
                                    textAlign: "center"
                                },
                                className: 'tableCell tableContentHead'
                            },
                            jsresults
                        )
                    ),
                    _resultRow
                )
            ));
        }
    }

    ReactDOM.render(React.createElement(
        'div',
        null,
        _coupons
    ), document.getElementById('dContainer'));

    couponCount = 0;
    ReactDOM.render(React.createElement(PageInfo, {
        type: 'header'
    }), document.getElementById('searchTableHeader'));

    $('.pagination').show();

    return false;
}

var FGSResultsTable = function(_React$Component40) {
    _inherits(FGSResultsTable, _React$Component40);

    function FGSResultsTable(props) {
        _classCallCheck(this, FGSResultsTable);

        var _this45 = _possibleConstructorReturn(this, (FGSResultsTable.__proto__ || Object.getPrototypeOf(FGSResultsTable)).call(this, props));

        _this45.couponList = _this45.props.couponList;
        _this45.state = {
            expandCoupon: _this45.initCouponExpands()
        };
        return _this45;
    }

    _createClass(FGSResultsTable, [{
        key: 'initCouponExpands',
        value: function initCouponExpands() {
            var s = {};
            for (var i in this.couponList) {
                s[this.couponList[i]] = true;
            }
            return s;
        }
    }, {
        key: 'toggleCoupon',
        value: function toggleCoupon(i) {
            var cou = this.state.expandCoupon;
            cou[i] = !cou[i];
            this.setState({
                expandCoupon: cou
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this46 = this;

            var tmpBody = [];
            if (fgsJson.length == 0) {
                tmpBody.push(React.createElement(
                    'div', {
                        className: 'chpRes',
                        style: {
                            width: "100%"
                        }
                    },
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'p', {
                            style: {
                                textAlign: "center",
                                color: "#CC0000"
                            }
                        },
                        jsnoresultannounced
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null)
                ));
                $('.fgsRmks').hide();
            } else {
                var tmpHeader = React.createElement(
                    'div', {
                        className: 'tableRow'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell tableContentHead',
                            style: {
                                width: "15%"
                            }
                        },
                        jsdate
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell tableContentHead',
                            style: {
                                width: "15%"
                            }
                        },
                        jsoddstable_eventid
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell tableContentHead',
                            style: {
                                width: "5%"
                            }
                        },
                        React.createElement(
                            'a', {
                                href: 'javascript:goFlagUrl();'
                            },
                            React.createElement('img', {
                                src: '/football/info/images/icon_flag.gif' + cacheVersion,
                                alt: jsleagues_and_tournaments,
                                title: jsleagues_and_tournaments
                            })
                        )
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell tableContentHead',
                            style: {
                                textAlign: "center",
                                width: "20%"
                            }
                        },
                        jsteams1,
                        React.createElement('br', null),
                        jsteams2
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell tableContentHead',
                            style: {
                                textAlign: "center",
                                width: "15%"
                            }
                        },
                        jsFGS
                    ),
                    React.createElement(
                        'div', {
                            className: 'cotitle tableCell tableContentHead',
                            style: {
                                textAlign: "center"
                            }
                        },
                        React.createElement(
                            'div', {
                                className: 'rBottomBorder'
                            },
                            jsRFD
                        ),
                        React.createElement(
                            'div', {
                                className: 'table'
                            },
                            React.createElement(
                                'span', {
                                    className: 'codds r2'
                                },
                                jsHomeTeam
                            ),
                            React.createElement(
                                'span', {
                                    className: 'codds r2'
                                },
                                jsAwayTeam
                            )
                        )
                    )
                );

                var tmpCoupons = [];

                var _loop2 = function _loop2() {
                    var tmpCoupon = [];
                    var dt = _this46.couponList[i];
                    var matches = $.grep(fgsJson, function(_obj) {
                        return _obj.matchKODateFormatted.substring(0, 10) == dt;
                    });
                    var dtObj = new Date(dt.substring(6, 10) + '-' + dt.substring(3, 5) + '-' + dt.substring(0, 2));
                    tmpCoupon.push(React.createElement(
                        'div', {
                            style: {
                                display: "table-caption"
                            },
                            className: 'tgAlupCalCoupon',
                            id: 'divCalCoupon',
                            onClick: function onClick() {
                                _this46.toggleCoupon(dt);
                            }
                        },
                        React.createElement('span', {
                            className: _this46.state.expandCoupon[dt] ? "spBtnMinus" : "spBtnPlus"
                        }),
                        React.createElement(
                            'span',
                            null,
                            dt,
                            '(',
                            DateWeekLanguageSwitch(toWeekDay(dtObj.getDay())),
                            ') ',
                            jstabletitlematches
                        )
                    ));
                    if (_this46.state.expandCoupon[dt]) {
                        var altRow = 1;
                        matches.sort(function(x, y) {
                            if (x.matchNum != '') {
                                return parseInt(x.matchNum) - parseInt(y.matchNum);
                            }
                            return x.frontEndId - y.frontEndId;
                        });
                        for (j in matches) {
                            tmpCoupon.push(React.createElement(MatchRow_FGSResults, {
                                altRow: altRow++ % 2,
                                match: matches[j]
                            }));
                        }
                    }
                    tmpCoupons.push(React.createElement(
                        'div', {
                            className: 'couponTable'
                        },
                        tmpCoupon
                    ));
                };

                for (var i in this.couponList) {
                    var j;

                    _loop2();
                }

                tmpBody.push(React.createElement(
                    'div', {
                        className: 'couponTable tblResults fgsResults'
                    },
                    tmpHeader,
                    tmpCoupons
                ));

                $('.fgsRmks').show();
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div', {
                        className: 'fbGenHeader'
                    },
                    React.createElement(
                        'div', {
                            className: 'left'
                        },
                        React.createElement(
                            'span', {
                                className: 'cDelim'
                            },
                            React.createElement('img', {
                                src: '/info/include/images/stroke_yellow.gif' + cacheVersion,
                                alt: '',
                                title: ''
                            })
                        ),
                        jsfgsresults
                    ),
                    React.createElement(
                        'div', {
                            className: 'right divCalPrint text-left',
                            onClick: function onClick() {
                                window.print();
                            },
                            title: jsprintdata
                        },
                        jsprintdata
                    ),
                    React.createElement('div', {
                        style: {
                            clear: "both"
                        }
                    })
                ),
                tmpBody
            );
        }
    }]);

    return FGSResultsTable;
}(React.Component);

function renderMatchTableMultipleMatch(odata, firstLoad) {
    //data = data.map(a => Object.assign({}, a)); << not available in IE
    try {
        var data = void 0;
        if (odata.constructor === Array) data = odata.map(function(a) {
            return jQuery.extend(true, {}, a);
        });
        else data = jQuery.extend(true, {}, odata);

        var keepRefresh = false;
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

        var displayNoPoolMsg = false;
        var allCouponArr = [];
        var allTournamentsArr = [];

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

            var tempArr = jQuery.isEmptyObject(allCouponArr) ? allTournamentsArr : allCouponArr;
            var isArrayEmpty = jQuery.isEmptyObject(tempArr) ? jQuery.isEmptyObject(tempArr) : false;
            for (var i in tempArr) {
                if (!isArrayEmpty) break;
                isArrayEmpty = jQuery.isEmptyObject(tempArr[i]);
            }

            if (displayNoPoolMsg || isArrayEmpty) {
                displayNoMatch(true);
            } else {
                ReactDOM.render(React.createElement(PageInfo, {
                    type: 'footer'
                }), document.getElementById('OddsTableFooter'));
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
    var displayNoPoolMsg = false;
    var singleMatch = null;
    var otherDateMatches = [];

    var tabDropTournaments = allTournaments.sort(sort_by2(["displayOrder"], [false], [parseInt]));

    // get available date
    var hasSelectedDate = false;
    var tabMatches = matchDataList;
    var availableDate = getAvailabDateListFromMatches(tabMatches);
    var oMatchId = tMatchID;

    selectedTabDateArra = [];
    // set selected date tab
    tabMatches.forEach(function(singleCoupon, couponIndex) {
        var couponMatchDate = singleCoupon.matchDate.split("T")[0];
        var couponMatchID = singleCoupon.matchID;
        if (tMatchID == couponMatchID && tMatchID != "") {
            hasSelectedDate = true;
            selectedTabDateArra.push(couponMatchDate);
            if (mdate != couponMatchDate) {
                mdate = couponMatchDate;
                selectedTournamentIds.push(singleCoupon.tournament.tournamentID);
            }
        } else if (couponMatchDate == mdate && tMatchID == "") {
            hasSelectedDate = true;
            selectedTabDateArra.push(couponMatchDate);
        }
    });

    // refresh page if match not found
    if (firstLoad && (!hasSelectedDate && tMatchID != "" || mdate != "" && $.inArray(mdate, availableDate) == -1 || mdate == "")) {
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
        selectedTournamentIds.push(allTournaments[0].tournamentID);
        oddsTableLoadedRender();
        return;
    }

    // filter by date tab
    if (tabType.Date == curTabType && selectedTabDateArra.length > 0) {

        // check if date in others tab
        var tempOtherTabList = getOtherTabList(availableDate);
        var inOtherTab = $.inArray(mdate, tempOtherTabList) != -1;
        if (inOtherTab) {
            selectedTabDateArra = tempOtherTabList;
            curDateType = dateType.Other;
        }

        // get single match
        selectedTabDateArra.forEach(function(singleSelectedDate) {
            tabMatches.forEach(function(singleCoupon, couponIndex) {
                var couponMatchDate = singleCoupon.matchDate.split("T")[0];
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
                singleMatch = $.grep(otherDateMatches, function(elem) {
                    return elem.matchDate2 == mdate;
                })[0];
                setMatchId(singleMatch.matchID);
            } else {
                setMatchId(otherDateMatches[0].matchID);
                singleMatch = new Match(otherDateMatches[0]);
            }
        }
        // filter by competition tab
    } else if (tabType.Competition == curTabType && selectedTournamentIds.length > 0) {

        // get tournament id by season
        selectedTournamentIds = getTournGroupIdsBytName(selectedTournamentIds);

        selectedTournamentIds.forEach(function(singleSelectedTourn) {
            tabMatches.forEach(function(singleCoupon, couponIndex) {
                var couponMatchTourn = singleCoupon.tournament.tournamentID;
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
            setMatchId(otherDateMatches[0].matchID);
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
    var isPoolEmpty = false;
    if (pageName == "INPLAYALL" && singleMatch != null && singleMatch.arrInPlayPools.length == 0 && oMatchId == tMatchID) isPoolEmpty = true;
    // find singleMatch
    // if not find 
    // >> auto refresh > return null, set all odds info to ---
    // >> first load > select first meeting
    if (singleMatch == null && !firstLoad || isPoolEmpty) {
        displayNoPoolMsg = true;
    }
    /*all odds*/
    var tournamentName = "";
    var tmpOptionList = [];
    if (singleMatch != null) {
        tabDropTournaments.forEach(function(tList) {
            if (singleMatch.tournament != undefined) {
                if (singleMatch.tournament.tournamentID == tList.tournamentID) {
                    tournamentName = tList['tournamentName' + curLang.toUpperCase()];
                }
            }
        });

        // get date or compeition dropdown list
        if (pageName == "ALL" || pageName == "FGS" || pageName == "CRS" || pageName == "FCS" || pageName == "INPLAYALL") {
            tmpOptionList = curTabType == tabType.Date ? getDateOptinList(tabDropTournaments, tabMatches, singleMatch.matchID) : getCompetitionOptinList(tabDropTournaments, tabMatches, singleMatch.matchID);
        }

        matchInfo = React.createElement(MatchSelectList, {
            OddsTableTournaments: tabDropTournaments,
            OddsTableMatches: tabMatches,
            OptionList: tmpOptionList,
            SingleMatch: singleMatch
        });
    } else {
        selectedTabDateArra.push(mdate);
    }

    ReactDOM.render(React.createElement(
        'div',
        null,
        React.createElement(OddsTableInfo, {
            tableType: 'ActiveMatches',
            oddsType: pageName
        }),
        React.createElement(
            'div', {
                id: 'oddAllUpCalDiv'
            },
            React.createElement(OddsTableAllUpCalculator, null)
        ),
        React.createElement(OddsTableDateTournTab, {
            OddsTableTournaments: tabDropTournaments,
            OddsTableMatches: tabMatches
        }),
        matchInfo, !displayNoPoolMsg ? renderMatchAllTable(singleMatch, firstLoad, "ActiveMatches", tournamentName) : displayNoMatchSection()
    ), document.getElementById('dContainer'), function() {
        oddsTableLoaded();
    });

    var _matchPoolStatus = singleMatch != null && singleMatch.GetMatchPoolStatus(pageName);

    if (!displayInplayStatement(_matchPoolStatus)) {
        ReactDOM.render(React.createElement(AddBetBtn, {
            position: 'footer'
        }), document.getElementById('dFooterAddBet'));
        showHeaderIcons();
    } else {
        hideHeaderIcons();
    }
}

function renderNoPool() {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'div', {
                className: 'nopool'
            },
            React.createElement(
                'div', {
                    className: 'nopoolmsg'
                },
                jsInfoUpdate
            )
        )
    );
}

function displayInplayStatement(_matchPoolStatus) {
    if (pageName != "INPLAYALL" && pageName != "FGS" && _matchPoolStatus != -1 && _matchPoolStatus != MatchPoolStatus.BEFORE_KICKOFF && _matchPoolStatus != MatchPoolStatus.BEFORE_KICKOFF_WITH_INPLAY && _matchPoolStatus != MatchPoolStatus.BEFORE_KICKOFF_WITH_HALFTIME) {
        return true;
    }
    return false;
}

function putMatchesToCoupon(currentMatchList, prevMatchList, sorted, isHistorical) {
    /* create match list */
    currentMatchList.forEach(function(item, index) {
        if (currentMatchList[index] != null) {
            if (isResultPage()) {
                currentMatchList[index] = new Match_Result(currentMatchList[index], currentMatchList.name == "PresalesMatches");
            } else {
                currentMatchList[index] = new Match(currentMatchList[index], currentMatchList.name == "PresalesMatches");
            }
        }
    });

    currentMatchList = currentMatchList.filter(function(n) {
        return n != undefined;
    });
    currentMatchList = currentMatchList.filter(function(n) {
        return n.matchID != '';
    });
    var _matchList = filterAvailableMatch(currentMatchList);

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
    currentMatchList.forEach(function(item, index) {
        if (currentMatchList[index] != null) {
            if (isResultPage()) {
                currentMatchList[index] = new Match_Result(currentMatchList[index], currentMatchList.name == "PresalesMatches");
            } else {
                currentMatchList[index] = new Match(currentMatchList[index], currentMatchList.name == "PresalesMatches");
            }
        }
    });

    currentMatchList = currentMatchList.filter(function(n) {
        return n != undefined;
    });
    var _matchList = currentMatchList;
    var couponArr = [];

    if (_matchList.length > 0) {
        if (!sorted) {
            // sort matches by num
            if (_matchList[0].frontEndId != null && _matchList[0].frontEndId != '') {
                _matchList = _matchList.sort(sort_by2(["matchDate2", "matchDate", "tournament.tournamentShortName", "homeTeam.teamNameEN"], [true, false, false, false], [trimMatchDate, trimMatchDate2, trimStr, trimStr]));
            } else {
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
        var matchDate = _matchList.map(function(val) {
            return trimMatchDate(val['matchDate2']); //.substr(0,10).trim();
        });

        var uniqueMatchDate = [];
        $.each(matchDate, function(i, el) {
            if ($.inArray(el, uniqueMatchDate) === -1) uniqueMatchDate.push(el);
        });

        // put matches in couponArr
        for (var i = 0; i < uniqueMatchDate.length; i++) {
            var filteredArray = _matchList.filter(function(val) {
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
            success: function success(data) {
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
            error: function error() {
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

    matchDataList.forEach(function(singleCoupon, couponIndex) {
        if (singleCoupon.featureMatch != null && isFeaturedEnabled) countFeatureMatch++;
    });

    if (curTabType == tabType.Feature && countFeatureMatch == 0) {
        curTabType = tabType.Date;
        renderMixAllUpMatchList();
        return;
    }

    if (data.matches.length > 0 && data.tournaments.length > 0) {
        ReactDOM.render(React.createElement(OddsTable, {
            coupons: putMatchesToCoupon(data.matches, null, true),
            key: 'MIXALLUPLIST',
            tableType: 'MIXALLUPLIST',
            oddsType: oddsType,
            tournaments: data.tournaments
        }), document.getElementById('dAllCoupons'), function() {
            oddsTableLoaded();
        });
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
    var _id = 's_tourn_' + _oddsType + '_' + _matchID + '_' + _idSuffix + '_' + poolId + '_' + _oddsSet.LINEID + '_' + _oddsSet.COMBID;
    if (_oddsType == "CHP" || _oddsType == "TPS") return React.createElement(
        'div', {
            className: 'codds',
            key: _id,
            id: _id
        },
        React.createElement(
            'div', {
                className: 'flexWrap'
            },
            spText
        )
    );
    else return React.createElement(
        'span', {
            className: 'codds',
            key: _id,
            id: _id
        },
        spText
    );
}

function formatEmptyOddsCell(_key) {
    return React.createElement('div', {
        className: 'noBorder codds',
        key: _key + '_codds'
    });
}

function formatEmptyTQLOddsCell(_type, _key) {
    return React.createElement('div', {
        className: 'noBorder ' + _type,
        key: _key + '_codds'
    });
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
    } else {
        oddsStr = formatOddsStr(oddsArr[1], _oddsType);
    }
    var _key = _matchID;
    if (_oddsType == "FGS") {
        _key += oddsSet.SEL;
    } else {
        _key += checkboxType;
    }
    var _extraClass = "";
    if (pageName == "RESULT") {
        _extraClass = "oddsLink";
    }
    return React.createElement(
        'span', {
            key: _key + '_odds',
            id: _matchID + '_' + _oddsType + '_' + checkboxType,
            className: 'ref ' + _extraClass
        },
        oddsStr
    );
}

function formatOddsLink(_oddsType, _matchID, oddsSet, checkboxType, lineNum, poolStatus, isAllup, poolId) {
    var oddsArr = void 0;
    var lineStatus = "1";
    var lineId = void 0;
    var combId = void 0;
    var instNo = "";
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

        if (_oddsType.match(/^(SPC|SGA)$/)) combId = oddsSet[oddsSet.SEL + "COMBID"];
        else if (!oddsSet[checkboxType + "COMBID"]) combId = oddsSet["COMBID"];
    }
    var oddsStr = oddsArr[1];
    if (!(oddsStr == "RFD" || oddsStr == "LSE")) {
        // special handling for SPC

        if (!isQRPortal) {

            var isMatchKickOff = betValue[_matchID] != null && betValue[_matchID].IsMatchKickOff != null ? betValue[_matchID].IsMatchKickOff() : false;

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
    var selectionType = void 0;
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
    if (isAllup && oddsStr != '---' && oddsStr != 'LSE' && oddsStr != 'RFD') return React.createElement(OddsLink, {
        poolType: _oddsType,
        link: 'true',
        key: combSpanID,
        className: 'oddsLink',
        href: 'javascript:calBet(this,\'' + _matchID + '\',\'' + _oddsType + '\',\'' + selectionType + '\',\'' + lineNum + '\', \'' + poolId + '\', \'' + lineId + '\', \'' + combId + '\', \'' + instNo + '\')',
        title: GetGlobalResources("AllupCalculator"),
        spanID: combSpanID,
        oddsStr: oddsStr
    });
    else return React.createElement(OddsLink, {
        poolType: _oddsType,
        link: 'false',
        key: combSpanID,
        className: 'oddsLink',
        spanID: combSpanID,
        oddsStr: oddsStr
    });
}

function formatLineNum(_oddsType, _matchID, oddsSet, isExpanded, poolStatus) {
    var tmpOddsSet = oddsSet;
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
        var lineStrToDisplayed = '[' + tmpOddsSet[i].LINE + ']';
        if (pageName == "INPLAYALL" && !isSelling(poolStatus, "100", tmpOddsSet[i].LINESTATUS) && betValue[_matchID].IsMatchKickOff()) {
            lineStrToDisplayed = "---";
        }
        mlDetail.push(React.createElement(
            'div', {
                key: _matchID + '_lineNum_' + tmpOddsSet[i].LINENUM,
                className: lineClass,
                style: {
                    display: lineDisplayValue
                }
            },
            React.createElement(
                'span', {
                    id: _matchID + '_' + _oddsType + '_LINE_' + tmpOddsSet[i].LINENUM,
                    className: ''
                },
                lineStrToDisplayed
            ),
            React.createElement('div', {
                className: 'emptyDiv',
                style: {
                    display: 'none'
                }
            })
        ));
    }
    return React.createElement(
        'div', {
            className: 'cline',
            key: _matchID + '_lineNum'
        },
        mlDetail
    );
}

function formatCRSSelection(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, poolStatus, isAllup, poolId) {
    return [formatCRSSelectionText(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, poolStatus, isAllup, poolId), formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, poolStatus, isAllup, poolId)];
}

function formatCRSSelectionText(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, poolStatus, isAllup) {
    var spText = void 0,
        _id = void 0;
    if (_checkboxType == "SM1MH") {
        spText = bshomeothers;
    } else if (_checkboxType == "SM1MA") {
        spText = bsawayothers;
    } else if (_checkboxType == "SM1MD") {
        spText = bsdrawothers;
    } else {
        spText = _checkboxType[2] + " : " + _checkboxType[4];
    }
    _id = _matchID + '_' + _oddsType + '_' + _checkboxType;

    return React.createElement(
        'div', {
            className: 'codds cCRSSel ' + _id + '_0_c',
            key: 'sel' + _matchID + _checkboxType + '_' + _lineNum
        },
        React.createElement(
            'span', {
                id: 's' + _id
            },
            spText
        )
    );
}

function formatCRSSelectionOddsCell(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, poolStatus, isAllup, poolId) {
    var _oddsCell;

    if (_oddsType == "DHCP") {
        // only for DHCP case, use isAllUp to pass singleMatch.isVoidMatch() parameter
        isDisabled = isAllup || !isSelling(poolStatus, "1", "1");
        _oddsCell = React.createElement(
            'div', {
                key: _matchID + '_' + _checkboxType + '_' + _lineNum,
                className: 'codds'
            },
            React.createElement(OddsCheckboxPariMutuel, {
                _poolType: _oddsType,
                matchID: _matchID,
                selectionVal: '' + _checkboxType,
                rInd: _lineNum,
                isDisabled: isDisabled
            })
        );
    } else {
        var _key = '' + _matchID + _oddsType + _checkboxType + '_0OC';
        _oddsCell = React.createElement(OddsCell, {
            key: _key,
            rkey: _key,
            _oddsType: _oddsType,
            _matchID: _matchID,
            oddsSet: _oddsSet,
            checkboxType: '' + _checkboxType,
            lineNum: '0',
            _tableType: _tableType,
            poolStatus: poolStatus,
            isAllup: isAllup,
            poolId: poolId,
            extraClass: 'coddsAlign'
        });
    }

    return _oddsCell;
}

// FOR FGS
function formatSelectionInsideGroup(_oddsType, _matchID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded, lineCount, poolStatus, isAllup, poolId) {
    var selNo = _oddsSet.SEL;
    var spText = selNo + " " + (jsLang == "CH" ? _oddsSet.CONTENTCH : _oddsSet.CONTENTEN);
    var _className = "coddsSelectionsInnerTable";
    var _id = 's' + _matchID + '_' + _checkboxType;

    return [React.createElement(
        'div', {
            key: _id + 'key',
            className: 'codds c' + _oddsType + 'Name'
        },
        React.createElement(
            'span', {
                id: _id
            },
            spText
        )
    ), React.createElement(OddsCell, {
        key: '' + _matchID + _oddsType + selNo + '_OC',
        rkey: '' + _matchID + _oddsType + selNo + '_OC',
        _oddsType: _oddsType,
        _matchID: _matchID,
        oddsSet: _oddsSet,
        checkboxType: _checkboxType,
        lineNum: '0',
        _tableType: _tableType,
        poolStatus: poolStatus,
        isAllup: isAllup,
        poolId: poolId
    })];
}

function formatEmptySelectionInsideGroup(_oddsType, lineCount) {
    var _className = _oddsType == "GPW" ? "coddsSelectionsInnerTable" : "coddsSelectionsInnerTable";

    return [React.createElement('div', {
        className: 'codds c' + _oddsType + 'Name'
    }), React.createElement('div', {
        className: 'codds'
    })];
}

function formatGPFSelection(_oddsType, _tournID, _oddsSet, _checkboxType, _lineNum, _tableType, isExpanded) {
    var keyPrefix = _tournID + 'GPF' + _oddsSet.GROUP;
    var gpfHeader = React.createElement(
        'div', {
            className: 'gpfHeader',
            key: keyPrefix + '_HEADER'
        },
        React.createElement(
            'div', {
                className: 'gpfHead left'
            },
            jsLang === "CH" ? _oddsSet.GROUPCH : _oddsSet.GROUPEN,
            ' / ',
            jsgroupno,
            ': ',
            _oddsSet.GROUP
        ),
        React.createElement(
            'div', {
                className: 'gpfHead right'
            },
            _oddsSet.ExpectedStopTime != "" ? jsesst1 : null,
            _oddsSet.ExpectedStopTime != "" ? jsesst2 : null,
            ':',
            _oddsSet.ExpectedStopTime != "" ? formatEsstStr(_oddsSet.ExpectedStopTime, true) : null
        )
    );
    var gpfTableRows = [];

    var tmpGpfTableCells = [];

    tmpGpfTableCells.push(React.createElement(
        'div', {
            className: 'tableCell rBottomBorder cRightBorder gpf12',
            key: keyPrefix + '_HEADER12'
        },
        React.createElement(
            'div', {
                className: 'blk1',
                style: {
                    left: '0px',
                    textAlign: 'right',
                    paddingRight: '5px'
                }
            },
            jswinner
        ),
        React.createElement(
            'div', {
                className: 'blk2',
                style: {
                    top: '8px',
                    left: '0px',
                    paddingLeft: '2px'
                }
            },
            jsrunnerup
        )
    ));
    _oddsSet.NAMELIST.forEach(function(_team, _wInd) {
        var tmpTeamName = parseInt(_team.NO, 10) + ' ' + (jsLang === "CH" ? _team.CH : _team.EN);
        tmpGpfTableCells.push(React.createElement(
            'div', {
                className: 'tableCell rBottomBorder center',
                title: tmpTeamName,
                key: keyPrefix + '_TEAMNAME' + _wInd
            },
            tmpTeamName
        ));
    });

    gpfTableRows.push(React.createElement(
        'div', {
            className: 'tableRow',
            key: keyPrefix + '_row' + gpfTableRows.length
        },
        tmpGpfTableCells
    ));

    _oddsSet.SELLIST.forEach(function(_winnerSel, _wInd) {
        tmpGpfTableCells = [];
        var _tmpTeamInfo = _oddsSet.NAMELIST[_wInd - 1];
        var tmpTeamName = parseInt(_tmpTeamInfo.NO, 10) + ' ' + (jsLang == "CH" ? _tmpTeamInfo.CH : _tmpTeamInfo.EN);
        tmpGpfTableCells.push(React.createElement(
            'div', {
                className: 'tableCell cRightBorder',
                title: tmpTeamName,
                key: keyPrefix + '_teamName' + _wInd
            },
            tmpTeamName
        ));

        _winnerSel.forEach(function(_singleSel, _sInd) {
            _lineNum = _oddsSet.GROUP + "_" + _singleSel.SEL.replace(":", "");
            tmpGpfTableCells.push(React.createElement(
                'div', {
                    className: 'tableCell rRightWhiteBorder',
                    key: keyPrefix + '_' + _lineNum
                },
                React.createElement(OddsCell, {
                    key: '' + _tournID + _oddsType + _lineNum + 'OC',
                    rkey: '' + _tournID + _oddsType + _lineNum + 'OC',
                    _oddsType: _oddsType,
                    _matchID: _tournID,
                    oddsSet: _singleSel,
                    checkboxType: _checkboxType,
                    lineNum: '' + _lineNum,
                    _tableType: _tableType,
                    poolStatus: _oddsSet.POOLSTATUS,
                    isAllup: _oddsSet.ALLUP,
                    poolId: _oddsSet.POOLID
                })
            ));
        });

        // add <div>-</div>
        tmpGpfTableCells.splice(parseInt(_tmpTeamInfo.NO, 10), 0, React.createElement(
            'div', {
                className: 'tableCell rRightWhiteBorder center',
                key: keyPrefix + '_EMPTY' + _wInd
            },
            '-'
        ));

        gpfTableRows.push(React.createElement(
            'div', {
                key: keyPrefix + '_row' + gpfTableRows.length,
                className: 'tableRow rAlt' + _wInd % 2
            },
            tmpGpfTableCells
        ));
    });

    return React.createElement(
        'div', {
            key: 'dGPFTable' + _oddsSet.GROUP,
            className: ''
        },
        gpfHeader,
        React.createElement(
            'div', {
                className: 'table'
            },
            gpfTableRows
        )
    );
}

var OddsTypeOuterTable = function(_React$Component41) {
    _inherits(OddsTypeOuterTable, _React$Component41);

    function OddsTypeOuterTable(props) {
        _classCallCheck(this, OddsTypeOuterTable);

        var _this47 = _possibleConstructorReturn(this, (OddsTypeOuterTable.__proto__ || Object.getPrototypeOf(OddsTypeOuterTable)).call(this, props));

        _this47.state = {
            hideLSE: true
        };
        _this47.onEliminateBtnClicked = _this47.onEliminateBtnClicked.bind(_this47);
        return _this47;
    }

    _createClass(OddsTypeOuterTable, [{
        key: 'onEliminateBtnClicked',
        value: function onEliminateBtnClicked(event) {
            this.setState({
                hideLSE: !this.state.hideLSE
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _oddsType = this.props._oddsType;
            var tableType = this.props.tableType;
            var objID = this.props.objID;
            var innerContent = this.props.innerContent;
            var eliminateBtn = this.props.eliminateBtn;
            var expectedStopSellingTime = this.props.expectedStopSellingTime;
            var refOdds = ""; //this.props.refOdds;

            var tqlCode = this.props.code;
            var tqlStage = this.props.stage;
            var frontEndId = "";
            var _ref = ""; //tableType.indexOf("Presales") != -1 ? "Ref" : "";
            if (pageName == "TOURN") {
                var _dataOddsType = this.props._dataOddsType;
                try {
                    var singleTourn = betValue[objID];
                    frontEndId = singleTourn.frontEndId;
                    if (_oddsType == "TSP") {
                        // Render Active and Presales SPC Odds Table By Tourn
                        if (singleTourn.tspodds != undefined && singleTourn.tspodds != null) {
                            innerContent = React.createElement(SPCTableByTourn, {
                                singleTourn: singleTourn,
                                tableType: tableType,
                                key: '' + singleTourn.tournamentID + _oddsType,
                                spcOddsType: ''
                            });
                        } else if (singleTourn.spcoddsref != undefined && singleTourn.spcoddsref != null) {
                            innerContent = React.createElement(SPCTableByTourn, {
                                singleTourn: singleTourn,
                                tableType: tableType,
                                key: '' + singleTourn.tournamentID + _oddsType,
                                spcOddsType: 'Ref'
                            });
                        }
                    } else if (_oddsType == "TPS0" || _oddsType == "TPS1") {
                        if (singleTourn[_dataOddsType + "odds" + refOdds] != null) {
                            for (var tpsInd = 0; tpsInd < singleTourn[_dataOddsType + "odds" + refOdds].length; tpsInd++) {
                                var _tpsType = singleTourn[_dataOddsType + "odds" + refOdds][tpsInd].TPSTYPE == "Player" ? "0" : "1";
                                if (_oddsType == "TPS0" && singleTourn[_dataOddsType + "odds" + refOdds][tpsInd].TPSTYPE == "Player" || _oddsType == "TPS1" && singleTourn[_dataOddsType + "odds" + refOdds][tpsInd].TPSTYPE == "Team") {
                                    var _sTourn = singleTourn[_dataOddsType + "odds" + refOdds][tpsInd];
                                    expectedStopSellingTime = React.createElement(
                                        'div', {
                                            className: 'right',
                                            style: {
                                                paddingRight: "5px"
                                            }
                                        },
                                        _sTourn.ExpectedStopTime != "" ? jsesst1 : null,
                                        _sTourn.ExpectedStopTime != "" ? jsesst2 : null,
                                        ':',
                                        _sTourn.ExpectedStopTime != "" ? formatEsstStr(_sTourn.ExpectedStopTime, true) : null
                                    );
                                    innerContent = React.createElement(OddsSelectionTourn, {
                                        hideLSE: this.state.hideLSE,
                                        singleTourn: singleTourn,
                                        tableType: tableType,
                                        key: '' + singleTourn.tournamentID + _oddsType,
                                        oddsType: "TPS",
                                        tpsIndex: _tpsType,
                                        refOdds: refOdds
                                    });
                                    break;
                                }
                            }
                        }
                    } else if (_oddsType == "TQL") {
                        var _sTourn2 = singleTourn[_dataOddsType + "odds" + refOdds];

                        innerContent = React.createElement(OddsSelectionTourn, {
                            hideLSE: this.state.hideLSE,
                            singleTourn: singleTourn,
                            tableType: tableType,
                            key: '' + singleTourn.tournamentID + _oddsType,
                            oddsType: _oddsType,
                            refOdds: refOdds
                        });
                    } else {
                        if (singleTourn[_dataOddsType + "odds" + refOdds] != null) {
                            if (_oddsType == "CHP") {
                                var _sTourn3 = singleTourn[_dataOddsType + "odds" + refOdds];
                                expectedStopSellingTime = React.createElement(
                                    'div', {
                                        className: 'right',
                                        style: {
                                            paddingRight: "5px"
                                        }
                                    },
                                    _sTourn3.ExpectedStopTime != "" ? jsesst1 : null,
                                    _sTourn3.ExpectedStopTime != "" ? jsesst2 : null,
                                    ':',
                                    _sTourn3.ExpectedStopTime != "" ? formatEsstStr(_sTourn3.ExpectedStopTime, true) : null
                                );
                            }
                            innerContent = React.createElement(OddsSelectionTourn, {
                                hideLSE: this.state.hideLSE,
                                singleTourn: singleTourn,
                                tableType: tableType,
                                key: '' + singleTourn.tournamentID + _oddsType,
                                oddsType: _oddsType,
                                refOdds: refOdds
                            });
                        }

                        $('#d' + _oddsType).show();
                    }

                    innerContent = React.createElement(
                        'div', {
                            id: 'd' + _oddsType + 'Table' + objID,
                            className: 'betTypeAllOdds'
                        },
                        innerContent
                    );

                    if (tableType.indexOf("Active") >= 0 && (_oddsType == "CHP" || _oddsType == "TPS0" || _oddsType == "TPS1" || _oddsType == "GPW")) {
                        eliminateBtn = React.createElement(EliminateBtn, {
                            hideLSE: this.state.hideLSE,
                            _oddsType: _oddsType,
                            objID: objID,
                            onClick: this.onEliminateBtnClicked
                        });
                    }
                } catch (ex) {
                    debugLog(_dataOddsType + " " + ex);
                }
            }

            if (innerContent === undefined || innerContent === null) {
                innerContent = React.createElement(
                    'div', {
                        id: 'd' + _oddsType + 'Table' + objID,
                        className: 'betTypeAllOdds'
                    },
                    displayNoMatchSection()
                );
            }

            var displayCoupon = !pageName.match(/^(CRS|FCS|FGS|SPC)$/);

            return React.createElement(
                'div', {
                    key: 'd' + _oddsType + objID,
                    id: 'd' + _oddsType + objID
                },
                displayCoupon ? drawOddsTypeCoupon(_oddsType, tableType, objID, "", eliminateBtn, expectedStopSellingTime, tqlCode, tqlStage, frontEndId) : null,
                _oddsType == "SGA" ? React.createElement('div', {
                    id: 'sgaRemarks',
                    dangerouslySetInnerHTML: {
                        __html: jsSGARemarks
                    }
                }) : null,
                React.createElement(
                    'div', {
                        className: 'odds' + _oddsType,
                        id: _oddsType.toLowerCase().toString() + 'Holder' + objID
                    },
                    innerContent
                )
            );
        }
    }]);

    return OddsTypeOuterTable;
}(React.Component);

function drawOddsTypeCoupon(_oddsType, tableType, objID, _ref, eliminateBtn, expectedStopSellingTime, code, stage, frontEndId) {
    return React.createElement(
        'div', {
            className: 'tgCoupon',
            id: 'd' + _oddsType + 'Coupon' + _ref + objID,
            onClick: function onClick() {
                pageName == "MIXALLUPSHORTCUT" ? null : tgCoupon5('d' + _oddsType + 'Coupon' + _ref + objID, 'd' + _oddsType + 'Table' + _ref + objID);
            }
        },
        pageName == "MIXALLUPSHORTCUT" ? React.createElement('span', {
            className: 'space'
        }) : React.createElement('span', {
            className: 'spBtnMinus'
        }),
        ' ',
        React.createElement(
            'span', {
                id: 'lit' + _oddsType + 'Text' + _ref + objID
            },
            formatOddsHeader(_oddsType, tableType, objID, "", false, code, stage, frontEndId)
        ),
        eliminateBtn,
        expectedStopSellingTime
    );
}

function drawOddsTypeTable(_oddsType, tableType, tournID) {
    var _ref = "";
    if (tableType.indexOf("Presales") != -1) {
        _ref = "Ref";
    }
    if (tournID == null) tournID = "";
    return React.createElement('div', {
        id: 'd' + _oddsType + _ref + tournID,
        key: 'd' + _oddsType + _ref + tournID
    });
}

function formatPageHeader(_singleTourn, _tableType, loadImg, loadSuspend) {
    var tournName = _singleTourn['tournamentName' + curLang.toUpperCase()];
    return React.createElement(
        'label', {
            className: 'btext'
        },
        React.createElement(
            'span',
            null,
            pageName != "TOURN" ? _singleTourn.frontEndId : ""
        ),
        loadImg ? formatTournFlag(_singleTourn.tournamentShortName, tournName) : "",
        ' ',
        tournName,
        loadSuspend ? displaySuspendedText() : null
    );
}

var SPCItemContainer = function(_React$Component42) {
    _inherits(SPCItemContainer, _React$Component42);

    function SPCItemContainer() {
        _classCallCheck(this, SPCItemContainer);

        return _possibleConstructorReturn(this, (SPCItemContainer.__proto__ || Object.getPrototypeOf(SPCItemContainer)).apply(this, arguments));
    }

    _createClass(SPCItemContainer, [{
        key: 'render',
        value: function render() {
            var _item = this.props.singleItem;
            var tableType = this.props.tableType;
            var _ref = this.props.refStr;
            var _firstItem = _item[0].item;
            var _couponID = 'coupon' + _firstItem.ITEM;
            var _couponName = jsitemno + ': ' + _firstItem.ITEM + ' - ' + (jsLang == "CH" ? _firstItem.ITEMCH : _firstItem.ITEMEN);
            var _tournamentData = this.props.tournamentData;
            var matchRow = [];
            _item.forEach(function(_singleObj, altRow) {
                var _singleMatch = _singleObj.match;
                matchRow.push(React.createElement(MatchRowSPCByItem, {
                    altRow: altRow % 2,
                    item: _singleObj.item,
                    match: _singleMatch,
                    key: _singleMatch.matchIDinofficial,
                    tableType: tableType,
                    couponID: _couponID,
                    tournamentData: _tournamentData
                }));
            });

            return React.createElement(
                'div', {
                    className: 'byItem couponTable'
                },
                React.createElement(CouponHeader, {
                    couponName: _couponName,
                    couponID: _couponID,
                    hasMLMatch: false,
                    couponCount: ""
                }),
                React.createElement(ColumnTitleSPCByItem, {
                    itemInfo: _firstItem,
                    couponID: _couponID
                }),
                matchRow
            );
        }
    }]);

    return SPCItemContainer;
}(React.Component);

var SPCContainer = function(_React$Component43) {
    _inherits(SPCContainer, _React$Component43);

    function SPCContainer() {
        _classCallCheck(this, SPCContainer);

        return _possibleConstructorReturn(this, (SPCContainer.__proto__ || Object.getPrototypeOf(SPCContainer)).apply(this, arguments));
    }

    _createClass(SPCContainer, [{
        key: 'render',
        value: function render() {
            var ref = this.props.refStr;
            var tableType = this.props.tableType;
            var objID = this.props.objID;
            var objType = this.props.objType;
            var singleObj = this.props.singleObj;

            var couponHeaderTxt = "";

            if (objType == "match") {
                couponHeaderTxt = React.createElement(
                    'span',
                    null,
                    displayMatchDayDiv(singleObj.matchID, singleObj.matchDay, singleObj.matchNum, pageName, false),
                    ' ',
                    sTeamString(!isInplay, false, singleObj, false, true, "SPC")
                );
            } else {
                couponHeaderTxt = formatPageHeader(singleObj, ref, false, false);
            }

            var displayByMatch = void 0;
            if (objType != "match" || pageName != "SPC") {
                displayByMatch = 1;
            } else {
                displayByMatch = 0;
                singleObj.spcodds.forEach(function(_os) {
                    if (_os.GROUP == "Match") {
                        displayByMatch++;
                    }
                });
            }
            if (displayByMatch == 0) {
                return null;
            } else {
                return React.createElement(
                    'div', {
                        id: 'dSPC' + ref + objID
                    },
                    React.createElement(
                        'div', {
                            className: 'oddsSPC'
                        },
                        React.createElement(
                            'div', {
                                id: 'dSPCTable' + ref + objID,
                                className: 'betTypeAllOdds'
                            },
                            objType == "match" ? React.createElement(SPCTableByMatch, {
                                singleMatch: singleObj,
                                key: singleObj.matchID,
                                spcOddsType: '',
                                tableType: tableType
                            }) : React.createElement(SPCTableByTourn, {
                                singleTourn: singleObj,
                                key: singleObj.tournamentID,
                                spcOddsType: '',
                                tableType: tableType
                            })
                        )
                    )
                );
            }
        }
    }]);

    return SPCContainer;
}(React.Component);

var SGAContainer = function(_React$Component44) {
    _inherits(SGAContainer, _React$Component44);

    function SGAContainer() {
        _classCallCheck(this, SGAContainer);

        return _possibleConstructorReturn(this, (SGAContainer.__proto__ || Object.getPrototypeOf(SGAContainer)).apply(this, arguments));
    }

    _createClass(SGAContainer, [{
        key: 'render',
        value: function render() {
            var tableType = this.props.tableType;
            var objID = this.props.objID;
            var singleObj = this.props.singleObj;

            return React.createElement(
                'div', {
                    id: 'dSGA' + objID
                },
                React.createElement(
                    'div', {
                        className: 'oddsSPC'
                    },
                    React.createElement(
                        'div', {
                            id: 'dSGATable' + objID,
                            className: 'betTypeAllOdds'
                        },
                        React.createElement(SGATable, {
                            singleMatch: singleObj,
                            key: singleObj.matchID,
                            tableType: tableType
                        })
                    )
                )
            );
        }
    }]);

    return SGAContainer;
}(React.Component);

// SPC Page Header


var SPCPageHeader = function(_React$Component45) {
    _inherits(SPCPageHeader, _React$Component45);

    function SPCPageHeader() {
        _classCallCheck(this, SPCPageHeader);

        return _possibleConstructorReturn(this, (SPCPageHeader.__proto__ || Object.getPrototypeOf(SPCPageHeader)).apply(this, arguments));
    }

    _createClass(SPCPageHeader, [{
        key: 'render',
        value: function render() {
            //var _oddsType = this.props.oddsType;

            return React.createElement(
                'div', {
                    className: 'oHeader'
                },
                React.createElement(
                    'div', {
                        className: 'tblHeader'
                    },
                    React.createElement(
                        'div', {
                            className: 'normalheader'
                        },
                        React.createElement(
                            'div', {
                                className: 'left'
                            },
                            React.createElement(
                                'span', {
                                    className: 'cDelim'
                                },
                                React.createElement('img', {
                                    src: '/info/include/images/stroke_yellow.gif' + cacheVersion,
                                    alt: '',
                                    title: ''
                                })
                            ),
                            formatOddsHeader(pageName, this.props.tableType, "", "")
                        ),
                        this.props.tableType.toLowerCase().indexOf("presales") >= 0 || this.props.tableType == "NoMatch" ? null : React.createElement(
                            'div', {
                                className: 'right'
                            },
                            React.createElement(
                                'span',
                                null,
                                React.createElement(
                                    'a', {
                                        className: 'cActionsPrint',
                                        href: 'javascript:printNow(\'' + location.pathname + location.search + '&pv=1\');'
                                    },
                                    jsprintdata
                                ),
                                React.createElement(
                                    'a', {
                                        className: 'spiconPrint'
                                    },
                                    React.createElement(
                                        'span', {
                                            className: 'spicon'
                                        },
                                        React.createElement('img', {
                                            src: '/info/include/images/icon_print.gif' + cacheVersion,
                                            className: 'pointer icon',
                                            onClick: function onClick() {
                                                printNow('' + location.pathname + location.search + '&pv=1');
                                            },
                                            alt: jsprintdata,
                                            title: jsprintdata
                                        })
                                    )
                                ),
                                React.createElement(
                                    'a', {
                                        className: 'nolnk'
                                    },
                                    jsrefreshat,
                                    ':',
                                    React.createElement('label', {
                                        id: 'sRefreshTime'
                                    })
                                ),
                                React.createElement(
                                    'a', {
                                        className: 'refresh',
                                        href: 'javascript:refreshOddsPage();'
                                    },
                                    jsrefresh
                                ),
                                React.createElement(
                                    'a', {
                                        className: 'refresh'
                                    },
                                    React.createElement(
                                        'span', {
                                            className: 'spicon'
                                        },
                                        React.createElement('img', {
                                            src: '/info/include/images/icon_refresh.gif' + cacheVersion,
                                            className: 'pointer icon',
                                            alt: jsrefresh,
                                            title: jsrefresh,
                                            onClick: function onClick() {
                                                refreshOddsPage();
                                            }
                                        })
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

    return SPCPageHeader;
}(React.Component);

var ParimutuelPoolTable = function(_React$Component46) {
    _inherits(ParimutuelPoolTable, _React$Component46);

    function ParimutuelPoolTable() {
        _classCallCheck(this, ParimutuelPoolTable);

        return _possibleConstructorReturn(this, (ParimutuelPoolTable.__proto__ || Object.getPrototypeOf(ParimutuelPoolTable)).apply(this, arguments));
    }

    _createClass(ParimutuelPoolTable, [{
        key: 'render',
        value: function render() {
            var _singlePool = this.props.singlePool;
            var _singleTournament = this.props.singleTournament;
            var _poolType = this.props.poolType;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div', {
                        className: 'tableRow tblHead'
                    },
                    React.createElement(
                        'div', {
                            className: 'tableCell matchLeg'
                        },
                        jsleg
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell matchNum'
                        },
                        "ID"
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell matchLeague'
                        },
                        React.createElement(
                            'a', {
                                href: 'javascript:goFlagUrl();'
                            },
                            React.createElement('img', {
                                src: '/football/info/images/icon_flag.gif' + cacheVersion,
                                alt: jsleagues_and_tournaments,
                                title: jsleagues_and_tournaments
                            })
                        )
                    ),
                    React.createElement(
                        'div', {
                            className: 'tableCell matchTeam'
                        },
                        jsteams1,
                        React.createElement('br', null),
                        jsteams2
                    )
                ),
                getParimutuelPoolTableMatchRows(_singlePool, _poolType, _singleTournament)
            );
        }
    }]);

    return ParimutuelPoolTable;
}(React.Component);

function getParimutuelPoolTableMatchRows(_singlePool, _poolType, _singleTournament) {
    var _rows = [];
    var noOfRows = 2;
    var loadLink = false;
    var isDisabled = !isSelling(_singlePool.POOLSTATUS, "1", "1");

    betValue = [];

    for (var rInd = 0; rInd < noOfRows; rInd++) {
        var singleMatch = new Match(_singlePool["LEG" + (rInd + 1)]);
        var _singleMatchDisabled = singleMatch.isVoidMatch() || isDisabled;

        //betValue[singleMatch.matchIDinofficial] = singleMatch;
        betValue[singleMatch.matchID] = singleMatch;
        _rows.push(React.createElement(
            'div', {
                key: 'row' + rInd,
                className: 'tableRow couponRow rAlt' + rInd % 2
            },
            React.createElement(
                'div', {
                    className: 'tableCell matchLeg'
                },
                GetLegName(rInd)
            ),
            React.createElement(
                'div', {
                    className: 'tableCell matchNum'
                },
                displayMatchDayDiv(singleMatch.matchID, singleMatch.matchDay, singleMatch.matchNum, pageName, false)
            ),
            React.createElement(
                'div', {
                    className: 'tableCell matchLeague'
                },
                formatImageStr([League.GetFlagPath(_singleTournament.tournamentShortName), _singleTournament['tournamentName' + curLang.toUpperCase()], _singleTournament.tournamentShortName])
            ),
            React.createElement(
                'div', {
                    className: 'tableCell matchTeam'
                },
                sTeamString(true, loadLink, singleMatch, false, true, _poolType),
                singleMatch.isVoidMatch() ? React.createElement(
                    'span', {
                        className: 'void'
                    },
                    "  " + jsvoidmatch
                ) : "",
                React.createElement(
                    'span', {
                        className: 'cvenue'
                    },
                    singleMatch.venue == null ? "" : formatNeutralGroundIcon(singleMatch.venue, "ng")
                )
            )
        ));
    }

    return _rows;
}

function generateDHCPSelectionTable(singePool, couponID) {
    var singleMatch = new Match(singePool["LEG" + couponID]);

    return React.createElement(
        'div', {
            key: 'coupon' + couponID,
            className: 'couponLeg1'
        },
        React.createElement(
            'div', {
                id: 'tgCoupon' + couponID,
                className: 'tgCoupon',
                onClick: function onClick() {
                    tgCoupon5('tgCoupon' + couponID, 'couponContent' + couponID);
                }
            },
            React.createElement('span', {
                className: 'spBtnMinus'
            }),
            GetLegName(couponID - 1)
        ),
        React.createElement(
            'div', {
                id: 'couponContent' + couponID
            },
            React.createElement(OddsSelectionDHCP, {
                key: couponID + '1',
                couponID: couponID,
                indexInCoupon: '1',
                singleMatch: singleMatch,
                oddsType: 'DHCP',
                tableType: 'ActiveMatches',
                poolStatus: singePool.POOLSTATUS
            }),
            React.createElement(OddsSelectionDHCP, {
                key: couponID + '2',
                couponID: couponID,
                indexInCoupon: '2',
                singleMatch: singleMatch,
                oddsType: 'DHCP',
                tableType: 'ActiveMatches',
                poolStatus: singePool.POOLSTATUS
            })
        )
    );
}

function calBet(_thisObj, _betValueId, _bType, _optionKey, _itemNo, poolId, lineId, combId, insNo) {
    var divCalStr = toDivCalString(_betValueId, _bType, poolId, lineId, combId, _optionKey, false, _itemNo, insNo);
    SetDataStore("tmpAllupBetline", divCalStr);
    $("#selFormula").val(0);
    var formulaIndex = 0;
    divCalErrMsg = '';
    ReactDOM.render(React.createElement(OddsTableAllUpCalculator, {
        formulaIdx: formulaIndex
    }), document.getElementById('oddAllUpCalDiv'));
}

function paginationCalculator(dataArray) {
    totalMatch = 0;
    startMatch = maxMatch * curPage - maxMatch;
    endMatch = maxMatch * curPage;
    dataArray.forEach(function(dataList) {
        totalMatch = totalMatch + dataList.length;
    });
    endMatch = endMatch > totalMatch ? totalMatch : endMatch;
}

function refreshMixallUpCalculator() {
    if (invalidBetTypeArr.length > 0) {
        var checkedObjs = $(".coddsSelections input:checked"); // if checked item changed to invalid bet types , cal
        for (var i = 0; i < checkedObjs.length; i++) {
            var str = $(checkedObjs[i]).attr("id").split("_");
            // var poolId = str[5];
            mixFormula($(checkedObjs[i]), str[0], str[1], str[2]);
            calculateBet2(true);
        }
        alert(jsallUpFormulaChangedStr); //to be provided by business user
        invalidBetTypeArr = [];
    }
}

function getOtherTabList(allDateList) {

    var beforeBizDate = getNowDate() > new Date(allDateList[0]);

    var otherDate = new Date();

    if (beforeBizDate) {
        otherDate = new Date(allDateList[0]);
    } else {
        otherDate = getNowDate();
    }

    otherDate.setDate(otherDate.getDate() + (otherLength - 1));

    var dtOther = processToDate(getFormattedDate(otherDate));
    var otherTabList = [];

    for (var i = 0; i < allDateList.length; i++) {
        var dtTab = processToDate(allDateList[i]);
        if (dtTab >= dtOther || otherLength <= 1) {
            otherTabList.push(getFormattedDateStr(allDateList[i]));
        }
    }

    return otherTabList;
}

function getNormalTabList(allDateList) {

    var beforeBizDate = getNowDate() > new Date(allDateList[0]);

    var otherDate = new Date();

    if (beforeBizDate) {
        otherDate = new Date(allDateList[0]);
    } else {
        otherDate = getNowDate();
    }

    otherDate.setDate(otherDate.getDate() + (otherLength - 1));

    var dtOther = processToDate(getFormattedDate(otherDate));
    var list = [];

    for (var i = 0; i < allDateList.length; i++) {
        var dtTab = processToDate(allDateList[i]);
        if (dtTab < dtOther && otherLength > 1) {
            list.push(getFormattedDateStr(allDateList[i]));
        }
    }

    return list;
}

function getDateTabList(allDateList) {

    var list = [];

    for (var i = 0; i < allDateList.length; i++) {
        list.push(getFormattedDateStr(allDateList[i]));
    }

    return list;
}

function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    var day = date.getDate().toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + '-' + month + '-' + day;
}

function getFormattedDateStr(date) {
    var parts = date.split("-");

    var year = parts[0];
    var month = parts[1].toString();
    var day = parts[2].split("T")[0].toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + '-' + month + '-' + day;
}

function processToDate(date) {
    var parts = date.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2].split("T")[0]);
}

function getNowDate() {
    var now = new Date(parseInt(new Date().getTime(), 10) + parseInt(jsOffsetTime) * 1000);

    return new Date(processToDate(getFormattedDate(now)));
}

function getAvailabDateListFromMatches(matches) {

    var datelist = [];
    for (var i = 0; i < matches.length; i++) {
        var matchDate = matches[i].matchDate.split("T")[0];
        if ($.inArray(matchDate, datelist) == -1) {
            if (matchDate) datelist.push(matchDate);
        }
    }

    return getDateTabList(datelist).sort();
}

function filterAvailableMatch(matches) {

    var availableDateList = getAvailabDateListFromMatches(matches);

    var availableMatches = $.grep(matches, function(match) {
        return $.inArray(match.matchDate.split("T")[0], availableDateList) != -1;
    });

    if (availableMatches == null) availableMatches = [];

    return availableMatches;
}

function getAvailableTourn(tournaments) {
    var _availableTournIds = [];
    if (matchDataList == null || tournaments == null) return _availableTournIds;

    for (var i = 0; i < matchDataList.length; i++) {
        if ($.inArray(matchDataList[i].tournament.tournamentID, _availableTournIds) == -1) _availableTournIds.push(matchDataList[i].tournament.tournamentID);
    }
    return jQuery.grep(tournaments, function(_singleTourn) {
        return $.inArray(_singleTourn.tournamentID, _availableTournIds) != -1;
    });
}

function getTournGroupIdsBytName(tournamentIds) {
    var newSelectedTournamentIds = [];
    for (var i = 0; i < tournamentIds.length; i++) {
        var tempTourn = $.grep(allTournaments, function(tourn) {
            return tourn.tournamentID == tournamentIds[i];
        });

        if (tempTourn != null && tempTourn.length > 0) {
            var _loop3 = function _loop3() {
                var sourceTournName = tempTourn[j].tName;
                var tournGroup = $.grep(allTournaments, function(elem) {
                    return elem.tName == sourceTournName;
                });

                if (tournGroup.length > 0) {
                    var arr1 = tournGroup.map(function(x) {
                        return x.tournamentID;
                    });
                    for (j = 0; j < arr1.length; j++) {
                        if (jQuery.inArray(arr1[j], newSelectedTournamentIds) == -1) {
                            newSelectedTournamentIds.push(arr1[j]);
                        }
                    }
                }
            };

            for (var j = 0; j < tempTourn.length; j++) {
                var j;

                _loop3();
            }
        }
    }
    return newSelectedTournamentIds;
}

function getAllTournamentIds() {

    var tournaments = allTournaments;
    var tournIdList = [];

    jQuery.grep(tournaments, function(_singleTourn) {
        if ($.inArray(_singleTourn.tournamentID, tournIdList) == -1) {
            tournIdList.push(_singleTourn.tournamentID);
        }
    });

    return tournIdList;
}

function setMatchId(matchId) {

    tMatchID = matchId;
    var newUrl = replaceUrlParam(window.location.href, "tmatchid", matchId);
    var param = trimPara2();
    param.tmatchid = matchId;

    if (matchId.length > 0) {

        window.history.replaceState({
            "html": "",
            "pageTitle": document.title,
            "product": curProduct,
            "page": curPageId,
            "lang": curLang,
            "para": param
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
//# sourceMappingURL=MatchTable.js.map