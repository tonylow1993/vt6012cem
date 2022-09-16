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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var isMix = false;
var isInplay = false;
var isHalfTime = false;

//var couponInfo = [];
var allupInfo = [];
var tMatchID = "";
var rMatchID = "";
var allMatchID;
var allupMatchIdChexkbox = [];

var pTournID = "";
var homeTeamName, awayTeamName;
var pageReady = false;
var tmpJsonData;
var lastPushUpdate = "";
var dataCache = "";
var allCheckBoxType = [];

function initPage() {
    isMix = pageName == "MIXALLUP" || pageName == "MIXALLUPSHORTCUT";
    isInplay = pageName.indexOf("INPLAY") > -1;
    isHalfTime = pageName.indexOf("HALFTIME") > -1;

    if (jsHideMatchAndTourn) {
        renderEmptyPage(true);
        return;
    }

    if (pageName != "FOCUSMATCH" || pageName == "MIXALLUP" || pageName == "MIXALLUPSHORTCUT" || pageName == "INPLAYALL") {
        //tMatchID = getParameterByName("matchidstr");
        if (typeof setMatchId !== 'undefined') {
            setMatchId(matches);
        }
        allMatchID = tMatchID.split(",");
    }

    if (!isMultiplePoolPage()) {
        allCheckBoxType = getCheckboxType(pageName);
    }
    if (pageName == "MIXALLUPLIST") {
        renderMixAllUpMatchList();
    } else if (pageName == "RESULT") {
        var loPageMatchID = GetDataStore("__extendlastOdds");
        if (loPageMatchID != null && loPageMatchID != '') {
            renderLastOdds(loPageMatchID);
        } else {
            var searchPara = GetDataStore("__extendresultsSearchPara");
            if (searchPara != null && searchPara != '') {
                displaySearchResult = true;
                para = searchPara;
                curPage = parseInt(GetDataStore("__extendresultsSearchPage"));
                displaySearchLabel();
                ClearDataStoreItem("__extendresultsSearchPara");
                ClearDataStoreItem("__extendresultsSearchPage");
            }
            renderAllTable(true);
        }
    } else if (pageName == "CHP_RESULTS") {
        renderCHPResults(); // preloaded
    } else if (pageName == "TOURN_RESULTS") {
        renderTournResults(); // preloaded
    } else if (pageName == "FGS_RESULTS") {
        renderFGSResults();
    } else if (pageName == "SPC_RESULTS") {
        renderAllTable(true);
    } else if (pageName == "FOCUSMATCH") {
        tMatchID = matches;
        renderAllTable(true);
    } else {
        getAllUpInfo();
        renderAllTable(true);
    }
}

function checkTournamentEmpty(objArray) {
    return objArray.filter(function(item) {
        return item.tournamentNameCH != null && item.tournamentNameEN != null && item.tournamentShortName != null;
    });
}

function showInplayMsg(matchStatus) {
    if (matchStatus != "Initial" && matchStatus != "Defined" && matchStatus != "Canceled") {
        if (pageName == "ALL" || jsInplayPools.indexOf(pageName) != -1) return true;
    }
    return false;
}

function displayInplayClock(pageName) {
    return jsInplayPools.indexOf(pageName) != -1 && pageName != "HFT" || pageName.match(/^(INDEX|INDEX_HAD|INPLAYHAD|ALL|INPLAYALL)$/);
}

function displayHead2Head(pageName) {
    return true;
    //return pageName == "ALL";
}

var isPaginationClick = false;

function goToPage(pageNo) {
    if (pageNo <= 0 || isPaginationClick) return;
    var promptBox = pageName != "MIXALLUPLIST" && $(".checkedOdds").length > 0;
    var changeConfirm = promptBox ? window.confirm(jstabchangeconfirm) : true;
    if (changeConfirm) {
        try {
            curPage = pageNo;

            if (pageName.indexOf("RESULT") > -1) {
                var newUrl = replaceUrlParam(location.href, "pageno", pageNo);
                window.history.pushState({
                    "html": "",
                    "pageTitle": document.title
                }, "", newUrl);
            }
        } catch (ex) {
            debugLog(ex);
        }
        if (pageName == "TQL") {
            renderTQLTable(dataCache, false);
        } else if (pageName == "RESULT") {
            isPaginationClick = true;
            renderAllTable(true);
        } else if (pageName == "DHCP_RESULT" || pageName == "HFMP_RESULT") {
            renderParimutuelResult(dataCache);
        } else if (pageName == "SPC_RESULTS") {
            drawSPCSearchResults();
        } else if (pageName == "MIXALLUPLIST") {
            renderMixAllUpMatchList(false);
        } else if (isMultiplePoolPage()) {
            isPaginationClick = true;
            renderAllTable(false);
        } else {
            renderMatchTable(dataCache, false);
        }
    }
}

function replaceUrlParam(url, paramName, paramValue) {
    if (paramValue === null) paramValue = '';
    var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)');
    if (url.search(pattern) >= 0) {
        return url.replace(pattern, '$1' + paramValue + '$2');
    }
    return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
}

function getFormatDropDownListDate(str) {
    return str.substr(8, 2) + "/" + str.substr(5, 2);
}

function StringBuilder() {
    this.buffer = [];
}

StringBuilder.prototype.append = function(data) {
    this.buffer.push(data);
    return this;
};

StringBuilder.prototype.toString = function() {
    return this.buffer.join("");
};

function renderGoalLineStr(_singleMatch, _oddsType, _oddsOptionGL, _isInplay, _isHalfTime, _lineNum) {
    try {
        var _sel = _singleMatch[_oddsType.toLowerCase() + "odds"];
        var gl = _sel[_oddsOptionGL];

        if (_oddsType.match(/^(HHA|HHAINPLAY|HDC|HDCINPLAY|EDC)$/)) {
            gl = "[" + gl + "]";
        }
        var _isSelling = isSelling(_sel.POOLSTATUS, "100", "1");
        if ((isInplay || isHalfTime) && (!_isSelling || _sel[0] == "0") && _singleMatch.IsMatchKickOff()) {
            gl = "---";
        }

        return gl;
    } catch (ex) {}
    return "";
}

function isPoolClosed(_poolStatus) {
    if (_poolStatus == "Initial" || _poolStatus == "Defined" || _poolStatus == "Selling" || _poolStatus == "NotSelling" || _poolStatus == "StopSell") {
        return false;
    }
    return true;
}

function formatTVIcon(_tv, _cssClass) {
    if (_tv != null) {
        if (_tv.length > 0) {
            var tvIconLink = function tvIconLink(para) {
                return React.createElement(
                    "span", {
                        key: "tvIcon" + para[0],
                        onClick: function onClick() {
                            goTVUrl();
                        },
                        style: {
                            "cursor": "pointer"
                        }
                    },
                    React.createElement(Img, {
                        src: nasImagePath + "icon_tv-" + para[0] + ".gif" + cacheVersion,
                        alt: para[1],
                        title: para[1]
                    })
                );
            };

            if (_cssClass == "tvall") {
                //render all tv icons and text
                var allTvLinks = [];
                _tv.map(function(s, i) {
                    allTvLinks.push(tvIconLink([s.channelID, s.channelID + "-" + (jsLang == "CH" ? s.channelNameCH : s.channelNameEN)]));
                });
                return React.createElement(
                    "span", {
                        className: _cssClass
                    },
                    allTvLinks
                );
            } else {
                //render the first tv icon and all text
                var tvtext = "";

                _tv.map(function(s, i) {
                    tvtext += s.channelID + "-" + (jsLang == "CH" ? s.channelNameCH : s.channelNameEN) + " \n";
                });
                tvtext = tvtext.substring(0, tvtext.length - 2);
                return React.createElement(
                    "span", {
                        className: _cssClass
                    },
                    tvIconLink([_tv[0].channelID, tvtext])
                );
            }
        }
    }
}

function isOddsSetInplayEnabled(_oddsSet) {
    try {
        if (_oddsSet === null) return false;
        return _oddsSet.INPLAY;
    } catch (ex) {
        return false;
    }
}

function formatEsst(singleMatch, displayYear, _poolType) {
    var _oddsSet = void 0;
    if (_poolType == undefined || _poolType === null) {
        _poolType = oddsType;
    }
    try {
        _oddsSet = singleMatch[_poolType.toLowerCase() + "odds"];
    } catch (ex) {}
    var yearStr;
    var esstStrArr;
    if (_oddsSet == null) {
        return formatEsstStr(singleMatch.matchTime, displayYear);
    } else if (!isTournPool(_poolType)) {
        return formatEsstStr(singleMatch.matchTime, displayYear);
    } else {
        return formatEsstStr(_oddsSet.ExpectedStopTime, displayYear);
    }
}

function formatEsstStr(esstStr, displayYear) {
    if (esstStr != "") {
        var yearStr;
        var esstStrArr = esstStr.split('T');
        if (displayYear) {
            yearStr = "/" + esstStrArr[0].substr(0, 4);
        } else {
            yearStr = "";
        }
        //get from pool close date and time
        return esstStrArr[0].substr(8, 2) + '/' + esstStrArr[0].substr(5, 2) + yearStr + ' ' + esstStrArr[1].substr(0, 5);
    } else {
        return "";
    }
}

function formatMatchDate(dateStr) {
    var dateArr = dateStr.split('+')[0].split('-');
    return dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0];
}

function addSignToNumber(_num) {
    if (_num > 0) {
        return "+" + _num;
    } else {
        return _num.toString();
    }
}

// format YYYYMMDD to DD/MM/YYYY
function formatYYYYMMDD(dateStr) {
    return dateStr.substr(6, 2) + "/" + dateStr.substr(4, 2) + "/" + dateStr.substr(0, 4);
}

// format YYYY-MM-DDTHH:mm to DD/MM/YYYY
function formatDDMMYYYY(dateStr) {
    var parts = dateStr.split("T");

    return parts[0].substr(8, 2) + "/" + parts[0].substr(5, 2) + "/" + parts[0].substr(0, 4);
}

function getNextDateFormatDDMMYYYY(dateStr) {
    var parts = dateStr.split("T");
    var nextDay = addDay(1, new Date(parts[0] + "T00:00:00+08:00"));

    return formatDDMMYYYY(formatDate(nextDay));
}

function getNextDateZeroOclock(dateStr) {
    var parts = dateStr.split("T");
    return addDay(1, new Date(parts[0] + "T00:00:00+08:00"));
}

function getNextDateTwelveOclock(dateStr) {
    var parts = dateStr.split("T");
    return addDay(1, new Date(parts[0] + "T12:00:00+08:00"));
}

function getNextDate(dateStr) {
    var parts = dateStr.split("T");
    return addDay(1, new Date(parts[0] + "T23:59:59+08:00"));
}

// return DD/MM/YYYY to date
function dateStrToDate(dateStr, spliter) {
    if (spliter == null) spliter = "/";
    var parts = dateStr.split(spliter);
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function numberWithCommas(x) {
    return x != null ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "-";
}

function isPoolRefund(_poolStatus) {
    if (_poolStatus == "RefundBeforeClosed" || _poolStatus == "ClosedAfterRefund" || _poolStatus == "RefundAfterClosed") {
        return true;
    }
    return false;
}

function isPoolPay(_poolStatus) {
    if (_poolStatus == "Payout") {
        return true;
    }
    return false;
}

function getBettingGuidePath(_type, showTournHelp) {
    switch (_type) {
        case "INPLAYHAD":
        case "INPLAYALL":
        case "NTS":
        case "ETS":
        case "ENT":
        case "HADINPLAY":
        case "HDCINPLAY":
        case "FHAINPLAY":
        case "HILINPLAY":
        case "FHLINPLAY":
        case "CHLINPLAY":
        case "CRSINPLAY":
        case "FCSINPLAY":
        case "HFTINPLAY":
        case "HHAINPLAY":
        case "SPCINPLAY":
        case "TTGINPLAY":
            return "bettypes_inplay.asp";
        case "MIXALLUP":
            return "bettypes.asp";
        case "HAD":
        case "EHA":
            return "bettypes.asp";
        case "FTS":
            return "bettypes_fts.asp";
        case "FHA":
            return "bettypes_fhhad.asp";
        case "HHA":
            return "bettypes_hhad.asp";
        case "HDC":
        case "EDC":
            return "bettypes_hdc.asp";
        case "HIL":
        case "EHL":
            return "bettypes_hilo.asp";
        case "CHL":
        case "ECH":
            return "bettypes_chlo.asp";
        case "FHL":
            return "bettypes_fhlo.asp";
        case "CRS":
        case "ECS":
            return "bettypes_crs.asp";
        case "FCS":
            return "bettypes_fcs.asp";
        case "FGS":
            return "bettypes_fgs.asp";
        case "HFT":
            return "bettypes_hft.asp";
        case "TTG":
        case "ETG":
            return "bettypes_ttg.asp";
        case "OOE":
            return "bettypes_ooe.asp";
        case "ALL":
            break;
        case "GPW":
            return "bettypes_GPW.asp";
        case "GPF":
            return "bettypes_GPF.asp";
        case "TPS1":
        case "TPS0":
        case "TPS":
            return "bettypes_TPS.asp";
        case "SGA":
            return "bettypes_SGA.asp";
        case "SPC":
        case "MSP":
        case "TSP":
            return "bettypes_spe.asp";
        case "TQL":
            return "bettypes_tql.asp";
        case "INPLAYSPC":
            return "bettypes_inplay.asp";
        case "CHP":
            return "bettypes_CHP.asp";
        case "DHCP":
            return "dhcp.asp";
        case "HFMP":
            return "hfmp.asp";
        case "TOURN":
            if (showTournHelp) return "bettypes_spe.asp";
            break;
        default:
            return "bettypes.asp";
    }
}

function poolIsAllUpOnly(_oddsType) {
    return false;
}

function poolIsSingleOnly(_oddsType) {
    if (_oddsType == "TOURN" || _oddsType == "SPC" || _oddsType == "SPCINPLAY" || _oddsType == "INPLAYSPC") {
        return true;
    } else {
        return false;
    }
}

function tgMl2(_obj, _couIdx) {
    var couponHeader = $('#' + _couIdx);
    var isCouponHidden = $('#' + _couIdx).find(".spBtnPlus").is(":visible");
    if (isCouponHidden) {
        tgCoupon4(_obj, _couIdx);
    }

    var isHidden = $('#' + _couIdx).find(".mlBtnPlus").is(":visible");

    if (isHidden) {
        $(couponHeader).find("span.mlBtnPlus").addClass("mlBtnMinus");
        $(couponHeader).find("span.mlBtnPlus").removeClass("mlBtnPlus");
        $(couponHeader).find("span.mlLblExpand").hide();
        $(couponHeader).find("span.mlLblCollapse").show();
    } else {
        $(couponHeader).find("span.mlBtnMinus").addClass("mlBtnPlus");
        $(couponHeader).find("span.mlBtnMinus").removeClass("mlBtnMinus");
        $(couponHeader).find("span.mlLblCollapse").hide();
        $(couponHeader).find("span.mlLblExpand").show();
    }
    $("." + _couIdx + "").each(function() {
        var isIndHidden = $(this).find(".mlBtnPlus").is(":visible");
        if (isHidden == isIndHidden) {
            if (isHidden) {
                $(this).find("span.mlBtnPlus").addClass("mlBtnMinus");
                $(this).find("span.mlBtnPlus").removeClass("mlBtnPlus");
                $(this).find(".otherLineRow").show();
            } else {
                $(this).find("span.mlBtnMinus").addClass("mlBtnPlus");
                $(this).find("span.mlBtnMinus").removeClass("mlBtnMinus");
                $(this).find(".otherLineRow").hide();
            }
        }
    });
}

function renderMixAllUpPoolTypeCheckbox() {

    var tmpAllPoolType = [];
    var allUpCheckboxHTMLs = [];
    allOddsType.forEach(function(tmpPoolType, oInd) {
        if (allupInfo[tmpPoolType] > 1) {
            tmpAllPoolType.push(tmpPoolType);
            allUpCheckboxHTMLs[tmpPoolType] = formatAllupInfo(tmpPoolType, allupInfo[tmpPoolType]);
        }
    });
    allOddsType = tmpAllPoolType;

    var allUpCheckboxs = allOddsType;

    for (var i = 0; i < allUpCheckboxs.length; i++) {
        $("#selcheckboxC" + i).html(allUpCheckboxHTMLs[allUpCheckboxs[i]]);
    }
    initMixallup();
}

function getLastUpdateTime(matchList) {
    matchList.forEach(function(item, index) {
        var itemLastUpdated = new Date(item.lastUpdated);
        if (lastUpdateTime == null) {
            lastUpdateTime = itemLastUpdated;
        } else if (lastUpdateTime < itemLastUpdated) {
            lastUpdateTime = itemLastUpdated;
        }
    });
}

function tgCoupon4(_obj, _couIdx) {
    var isHidden = $('#' + _couIdx).find(".spBtnPlus").length > 0;
    if (isHidden) {
        $('#' + _couIdx).find(".spBtnPlus").addClass("spBtnMinus");
        $('#' + _couIdx).find(".spBtnPlus").removeClass("spBtnPlus");
    } else {
        $('#' + _couIdx).find(".spBtnMinus").addClass("spBtnPlus");
        $('#' + _couIdx).find(".spBtnMinus").removeClass("spBtnMinus");
    }

    $("." + _couIdx + "").each(function() {
        if (isHidden) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function tgCoupon5(_couIdx, _target) {
    var isHidden = $('#' + _couIdx).find(".spBtnPlus").length > 0;

    if (isHidden) {
        $('#' + _couIdx).find(".spBtnPlus").addClass("spBtnMinus");
        $('#' + _couIdx).find(".spBtnPlus").removeClass("spBtnPlus");
        if (pageName != 'RESULT' && $('#' + _couIdx).next().prop('id') == "sgaRemarks" && jsSGARemarks != '') {
            $('#sgaRemarks').show();
        }
    } else {
        $('#' + _couIdx).find(".spBtnMinus").addClass("spBtnPlus");
        $('#' + _couIdx).find(".spBtnMinus").removeClass("spBtnMinus");
        if ($('#' + _couIdx).next().prop('id') == "sgaRemarks") {
            $('#sgaRemarks').hide();
        }
    }
    if (isHidden) {
        $('#' + _target).show();
    } else {
        $('#' + _target).hide();
    }
}

function resetSpBtn() {
    $(".spBtnPlus").addClass("spBtnMinus");
    $(".spBtnPlus").removeClass("spBtnPlus");

    $(".mlBtnMinus").addClass("mlBtnPlus");
    $(".mlBtnMinus").removeClass("mlBtnMinus");

    $(".couponRow").show();
}

var Tournament = function Tournament(data, tableType) {
    $.extend(this, data);

    var singleTourn = this;

    this.tableType = tableType;
    //this.matchDate2 = this.matchDate.substr(0,10);

    this.arrPools = [];

    for (var i = 0; i < allOddsType.length; i++) {
        var _oddsType = singleTourn[allOddsType[i].toLowerCase() + "odds"];
        if (_oddsType !== undefined && _oddsType !== null) {
            singleTourn[allOddsType[i].toLowerCase() + "odds"] = sortOddsContent(_oddsType, allOddsType[i]);
            if (!checkIfRefPool(singleTourn[allOddsType[i].toLowerCase() + "odds"]) || checkIfHybridPool(singleTourn[allOddsType[i].toLowerCase() + "odds"])) singleTourn.arrPools.push(allOddsType[i]);
        }
    }
    betValue[singleTourn.tournamentID] = singleTourn;
};

function getGPFSel(selList, sel) {
    for (var i = 0; i < selList.length; i++) {
        if (selList[i].SEL == sel) return selList[i];
    }
    return null;
}

function sortOddsContent(_oddsType, _tmpPoolType) {
    try {
        // re-format GPF - get all winner and runner up with sort
        // re-format GPF - put selections with same runner up into one sub-group
        // cater missing selection
        if (_tmpPoolType == "GPF") {
            _oddsType = _oddsType.sort(sort_by2(['GROUP'], [false], [parseInt]));

            for (var j = 0; j < _oddsType.length; j++) {
                var _tmpGrpOddsSet = [];
                for (var k = 1; k <= _oddsType[j].NAMELIST.length; k++) {
                    if (_tmpGrpOddsSet[k] === undefined || _tmpGrpOddsSet[k] === null) {
                        _tmpGrpOddsSet[k] = [];
                    }
                    for (var m = 1; m <= _oddsType[j].NAMELIST.length; m++) {
                        if (k == m) continue;

                        var sel1 = m < 10 ? '0' + m : '' + m;
                        var sel2 = k < 10 ? '0' + k : '' + k;
                        var sel = sel1 + ':' + sel2;

                        var selObj = getGPFSel(_oddsType[j].SELLIST, sel);
                        if (selObj == null) {
                            selObj = {
                                'SEL': sel,
                                'ODDS': '000@'
                            };
                        }
                        _tmpGrpOddsSet[k].push(selObj);
                    }
                }
                _oddsType[j].SELLIST = _tmpGrpOddsSet;
                _oddsType[j].NAMELIST = _oddsType[j].NAMELIST.sort(sort_by('NO', false, parseInt));
                /*
                var _tmpGrpOddsSet = [];
                for(let k=0; k<_oddsType[j].SELLIST.length; k++) {
                    if(_oddsType[j].SELLIST[k] !=undefined && _oddsType[j].SELLIST[k]!=null) {
                        let runnerupInd = parseInt(_oddsType[j].SELLIST[k].SEL.split(':')[1]);
                        if(_tmpGrpOddsSet[runnerupInd]===undefined || _tmpGrpOddsSet[runnerupInd]===null) {
                            _tmpGrpOddsSet[runnerupInd] = [];
                        }
                        _tmpGrpOddsSet[runnerupInd].push(_oddsType[j].SELLIST[k]);
                        _tmpGrpOddsSet[runnerupInd].sort(sort_by('SEL', false, parseInt));
                    }
                }
                _oddsType[j].SELLIST = _tmpGrpOddsSet;
                _oddsType[j].NAMELIST = _oddsType[j].NAMELIST.sort(sort_by('NO', false, parseInt));
                */
            }
        } else if (_tmpPoolType == "CHP") {
            _oddsType.SELLIST = _oddsType.SELLIST.sort(sort_by2(['ODDS', 'SEL'], [false, false], [parseOdds, parseInt]));
        } else if (_tmpPoolType == "TSP") {
            if (_oddsType != undefined && _oddsType != null) {
                _oddsType = _oddsType.sort(sort_by("ITEM", false, parseInt));

                _oddsType.forEach(function(_singleItem, _itemInd) {
                    _singleItem.SELLIST.sort(sort_by("SEL", false, parseInt));
                });
            }
            //_oddsType = _oddsType.sort(sort_by("ITEM", false, parseInt));
            //_oddsType.SELLIST = _oddsType.SELLIST.sort(sort_by2(['ODDS', 'SEL'], [false, false], [parseOdds, parseInt]));
        } else if (_tmpPoolType == "GPW" || _tmpPoolType == "TPS") {
            if (_tmpPoolType == "GPW") {
                _oddsType = _oddsType.sort(sort_by2(['GROUP'], [false], [parseInt]));
            }
            // sort by odds and sel no
            for (var j = 0; j < _oddsType.length; j++) {
                _oddsType[j].SELLIST = _oddsType[j].SELLIST.sort(sort_by2(['ODDS', 'ODDS', 'SEL'], [false, false, false], [checkLSEOrRFD, parseOdds, parseInt]));
            }
        } else if (_tmpPoolType == "TQL") {
            _oddsType = _oddsType.sort(sort_by2(['CODE'], [false], [parseInt]));
        }
        return _oddsType;
    } catch (ex) {
        debugLog(_tmpPoolType + ": " + ex);
        return null;
    }
}

function checkLSEOrRFD(str) {
    var oddsStr = str.split('@')[1];
    if (oddsStr == 'LSE' || oddsStr == 'RFD') {
        return 1;
    }
    return 0;
};

var check00 = function check00(str) {
    var strInt = 0;
    if (str == '00') strInt = 1;
    return strInt;
};

var parseIntWith00 = function parseIntWith00(str) {
    var strInt = parseInt(str);
    if (str == '00') strInt = 9999;
    return strInt;
};

var arrayMove = function arrayMove(arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
};

var Match_Common = function Match_Common(mdata, isPre) {
    _classCallCheck(this, Match_Common);

    $.extend(this, mdata);

    this.matchDate2 = this.matchDate.substr(0, 10);
    this.tdate = this.matchDate.substr(8, 2) + "-" + this.matchDate.substr(5, 2) + "-" + this.matchDate.substr(0, 4);
    this.arrPools = [];
};

function isDisplayMatchDDLPage() {
    return pageName.match(/^(ALL|INPLAYALL|FCS|CRS|FGS)$/);
}

function isMultiplePoolPage() {
    return pageName.match(/^(ILC|ALL|INPLAYALL|MIXALLUP|MIXALLUPSHORTCUT|LAST_ODDS|RESULT)$/);
}

function isDisplayMultiplePoolPage() {
    return pageName.match(/^(ALL|INPLAYALL|MIXALLUP|MIXALLUPSHORTCUT|LAST_ODDS|RESULT)$/);
}

function isResultPage() {
    return pageName.indexOf("RESULT") >= 0;
}

var Match = function(_Match_Common) {
    _inherits(Match, _Match_Common);

    function Match(data, isPre) {
        _classCallCheck(this, Match);

        var _this = _possibleConstructorReturn(this, (Match.__proto__ || Object.getPrototypeOf(Match)).call(this, data, isPre));

        var singleMatch = _this;
        var oddsSuffix = "odds";
        if (pageName == "RESULT") {
            //     oddsSuffix = "lastodds";
        }

        _this.isPre = isPre;

        // HIL, CHL, FHL
        if (isML(pageName) || isMultiplePoolPage()) {
            var allMLPools = [];
            if (isMultiplePoolPage()) {
                // hilinplay & chlinplay is for lastodds page only
                allMLPools = ["hil", "ehl", "chl", "ech", "fhl", "hilinplay", "chlinplay"];
            } else {
                allMLPools = [oddsType.toLowerCase()];
            }
            allMLPools.forEach(function(curPool) {
                var oldOddsSet = singleMatch[curPool + oddsSuffix];

                if (oldOddsSet !== undefined && oldOddsSet !== null) {
                    // remove LINESTATUS = 3
                    oldOddsSet.LINELIST = oldOddsSet.LINELIST.filter(function(item) {
                        return item.LINESTATUS != "3";
                    });

                    // remove same line number
                    oldOddsSet.LINELIST.forEach(function(item, j) {
                        var lineArr = item.LINE.split('/');
                        lineArr.forEach(function(lineItem, k) {
                            lineArr[k] = parseFloat(lineItem).toString().trim();
                        });
                        if (lineArr.length > 1 && lineArr[0] == lineArr[1]) {
                            item.LINE = lineArr[0];
                        } else {
                            item.LINE = lineArr.join("/");
                        }
                        item.MAINLINE = item.MAINLINE.trim();
                    });

                    if (oldOddsSet.LINELIST.length > 1) {
                        // sort oddsset with mainline goes first (if isMainLineOnTop), then ascending order of goalline
                        oldOddsSet.LINELIST = oldOddsSet.LINELIST.sort(function(a, b) {
                            var aLine = a.LINE.split('/');
                            var bLine = b.LINE.split('/');
                            return parseFloat(aLine[0]) - parseFloat(bLine[0]) || parseFloat(aLine.length == 1 ? 0 : aLine[1]) - parseFloat(bLine.length == 1 ? 0 : bLine[1]);
                        }).sort(function(a, b) {
                            if (isMainLineOnTop) {
                                if (a.MAINLINE == "true" && b.MAINLINE == "false") return -1;
                                if (a.MAINLINE == "false" && b.MAINLINE == "true") return 1;
                            }
                            return 0;
                        });
                    }

                    singleMatch[curPool + oddsSuffix] = oldOddsSet;
                }
            });
        }

        // FGS sort FGS selections
        if (pageName.match(/^(FGS|MIXALLUP|ALL|INPLAYALL|RESULT)$/)) {

            var oldOddsSet = singleMatch["fgs" + oddsSuffix];

            if (oldOddsSet != undefined && oldOddsSet != null) {
                oldOddsSet.SELLIST = oldOddsSet.SELLIST.sort(sort_by('SEL', false, parseInt));
                singleMatch.fgsodds = oldOddsSet;
            }

            if ('chpodds' in _this && _this.chpodds !== null) {
                // put tournament information to betValue[]
                _this.tournamentID = _this.chpodds.tournamentID;
                _this.tournamentNum = _this.chpodds.tournamentNum;
                _this.tournamentShortName = _this.chpodds.tournamentShortName;
                _this.tournamentNameCH = _this.chpodds.tournamentNameCH;
                _this.tournamentNameEN = _this.chpodds.tournamentNameEN;

                _this.chpodds.SELLIST = sortCHPSellLisInplayAll(_this);
            }
            if ('tqlodds' in _this && _this['tqlodds'] !== null) {
                if (_this['tqlodds'].length > 0) {
                    var tqlctnt = _this['tqlodds'][0];
                    _this['tqlodds'] = null;
                    _this['tqlodds'] = tqlctnt;
                }
            }
        }

        var hOddsSet = singleMatch["hdc" + oddsSuffix];

        if (hOddsSet != undefined && hOddsSet != null) {
            // remove same line number

            var hgArr = hOddsSet.HG.split('/');
            var agArr = hOddsSet.AG.split('/');
            hgArr.forEach(function(lineItem, k) {
                hgArr[k] = addSignToNumber(parseFloat(lineItem.trim()));
            });
            agArr.forEach(function(lineItem, k) {
                agArr[k] = addSignToNumber(parseFloat(lineItem.trim()));
            });
            if (hgArr.length > 1 && hgArr[0] == hgArr[1]) {
                hOddsSet.HG = hgArr[0];
            } else {
                hOddsSet.HG = hgArr.join("/");
            }
            if (agArr.length > 1 && agArr[0] == agArr[1]) {
                hOddsSet.AG = agArr[0];
            } else {
                hOddsSet.AG = agArr.join("/");
            }
            singleMatch["hdc" + oddsSuffix] = hOddsSet;
        }
        //}

        if (pageName == "INPLAYALL" || pageName == "RESULT") {
            if ('ets' + oddsSuffix in _this && _this['ets' + oddsSuffix] !== null) {
                // sort by item no.
                // inplayall descending / result ascending
                _this['ets' + oddsSuffix].sort(sort_by('ITEM', pageName == "INPLAYALL", parseInt));
                _this['ets' + oddsSuffix].forEach(function(obj) {
                    obj.isExtraTime = true;
                });
            }
            if ('nts' + oddsSuffix in _this && _this['nts' + oddsSuffix] !== null && _this['nts' + oddsSuffix].length > 0) {
                // sort by item no.
                // inplayall descending / result ascending
                _this['nts' + oddsSuffix].sort(sort_by('ITEM', pageName == "INPLAYALL", parseInt));
                _this['nts' + oddsSuffix].forEach(function(obj) {
                    obj.isExtraTime = false;
                });
            }
            if ('ent' + oddsSuffix in _this && _this['ent' + oddsSuffix] !== null && _this['ent' + oddsSuffix].length > 0) {
                // sort by item no.
                // inplayall descending / result ascending
                _this['ent' + oddsSuffix].sort(sort_by('ITEM', pageName == "INPLAYALL", parseInt));
                _this['ent' + oddsSuffix].forEach(function(obj) {
                    obj.isExtraTime = true;
                });
            }
            if (pageName == "INPLAYALL") {
                // NTS / ETS - only updated odds is needed
                // remove nts odds if ets is defined
                if ('ent' + oddsSuffix in _this && _this['ent' + oddsSuffix] !== null && _this['ent' + oddsSuffix].length > 0 && hasOdds(_this['ent' + oddsSuffix][0].H)) {
                    _this['nts' + oddsSuffix] = null;
                    _this['ent' + oddsSuffix] = _this['ent' + oddsSuffix][0];
                } else if ('ets' + oddsSuffix in _this && _this['ets' + oddsSuffix] !== null && _this['ets' + oddsSuffix].length > 0 && hasOdds(_this['ets' + oddsSuffix][0].H)) {
                    _this['nts' + oddsSuffix] = null;
                    _this['ets' + oddsSuffix] = _this['ets' + oddsSuffix][0];
                } else if ('nts' + oddsSuffix in _this && _this['nts' + oddsSuffix] !== null && _this['nts' + oddsSuffix].length > 0) {
                    var _found = false;
                    for (var ntsInd = 0; ntsInd < _this['nts' + oddsSuffix].length; ntsInd++) {
                        if (hasOdds(_this['nts' + oddsSuffix][ntsInd].H)) {
                            _this['nts' + oddsSuffix] = _this['nts' + oddsSuffix][ntsInd];
                            _found = true;
                            break;
                        }
                    }
                    if (!_found) {
                        _this['nts' + oddsSuffix] = null;
                    }
                }
            } else if (pageName == "RESULT") {
                // extend ets to nts
                if ('ets' + oddsSuffix in _this && _this['ets' + oddsSuffix] !== null) {
                    if (!('nts' + oddsSuffix in _this) || _this['nts' + oddsSuffix] == null) {
                        _this.ntsodds = [];
                    }
                    _this.ntsodds = _this.ntsodds.concat(_this.etsodds);
                }
            }
        }

        _this.arrInPlayPools = [];

        for (var i = 0; i < allOddsType.length; i++) {
            var _allOddsType = allOddsType[i].toLowerCase();
            var _oddsType = singleMatch[_allOddsType + oddsSuffix];
            if (_oddsType !== undefined && _oddsType !== null) {
                singleMatch.arrPools.push(allOddsType[i]);
                if (allOddsType[i] == "SPC") {
                    if (_oddsType.length > 0 && _oddsType[0].INPLAY == "true") {
                        singleMatch.arrInPlayPools.push(allOddsType[i]);
                    }
                } else {
                    if (_oddsType.INPLAY == "true") {
                        singleMatch.arrInPlayPools.push(allOddsType[i]);
                    }
                }
                //    } else if ( _allOddsType=='nts' || _allOddsType=='ets' ) {
                //        if ( pageName=='INPLAYALL' )
                //          singleMatch.arrPools.push(allOddsType[i]);
            }
            singleMatch[allOddsType[i].toLowerCase() + oddsSuffix] = _oddsType;
        }

        // sort SPC
        if (singleMatch['spc' + oddsSuffix] != undefined && singleMatch['spc' + oddsSuffix] != null && singleMatch['spc' + oddsSuffix].length > 0) {
            // sort by item no
            singleMatch['spc' + oddsSuffix] = singleMatch['spc' + oddsSuffix].sort(sort_by('ITEM', false, parseInt));

            // sort by sel no
            singleMatch['spc' + oddsSuffix].forEach(function(_singleItem, _iind) {
                _singleItem.SELLIST.sort(sort_by('SEL', false, parseInt));
            });
            // create spcoddsref if hybrid for ALL odds
            if (pageName == "ALL") {
                if (checkIfHybridPool(singleMatch['spcodds'])) {
                    singleMatch['spcoddsref'] = [];
                    //create spcoddsref
                    for (var _i = 0; _i < singleMatch['spcodds'].length; _i++) {
                        if (singleMatch['spcodds'][_i].Cur == "0") {
                            singleMatch['spcoddsref'].push(singleMatch['spcodds'][_i]);
                        }
                    }

                    singleMatch['spcodds'] = singleMatch['spcodds'].filter(function(item) {
                        return item.Cur == "1";
                    });
                    _this.arrPools.push("spcref");
                } else if ('spcoddsref' in singleMatch) {
                    _this.arrPools.push("spcref");
                }
            }
        }

        // sort SGA
        if (singleMatch['sga' + oddsSuffix] != undefined && singleMatch['sga' + oddsSuffix] != null && singleMatch['sga' + oddsSuffix].length > 0) {
            // sort by item no
            singleMatch['sga' + oddsSuffix] = singleMatch['sga' + oddsSuffix].sort(sort_by('ITEM', false, parseInt));
        }

        // sort spcinplayodds
        if (singleMatch['spcinplayodds'] != undefined && singleMatch['spcinplayodds'] != null && singleMatch['spcinplayodds'].length > 0) {
            singleMatch['spcinplayodds'] = singleMatch['spcinplayodds'].sort(sort_by('ITEM', false, parseInt));

            // sort by sel no
            singleMatch['spcinplayodds'].forEach(function(_singleItem, _iind) {
                _singleItem.SELLIST.sort(sort_by('SEL', false, parseInt));
            });
        }

        singleMatch.ipinfo = [];
        singleMatch.ipinfo = singleMatch.GetInplayMatchStatusInfo();

        betValue[singleMatch.matchIDinofficial] = singleMatch;
        return _this;
    }

    return Match;
}(Match_Common);

var Match_Result = function(_Match_Common2) {
    _inherits(Match_Result, _Match_Common2);

    function Match_Result(data, isPre) {
        _classCallCheck(this, Match_Result);

        // sort spc, ets and nts result
        var _this2 = _possibleConstructorReturn(this, (Match_Result.__proto__ || Object.getPrototypeOf(Match_Result)).call(this, data, isPre));

        if (_this2.spcresult != undefined && _this2.spcresult != null) {
            _this2.spcresult = _this2.spcresult.sort(sort_by('ITEM', false, parseInt));
            // need to sort result
        }
        if (_this2.ntsresult != undefined && _this2.ntsresult != null) {
            _this2.ntsresult = _this2.ntsresult.sort(sort_by('ITEM', false, parseInt));
        }
        if (_this2.etsresult != undefined && _this2.etsresult != null) {
            _this2.etsresult = _this2.etsresult.sort(sort_by('ITEM', false, parseInt));
        }
        return _this2;
    }

    return Match_Result;
}(Match_Common);

var MatchPoolStatus = {
    BEFORE_KICKOFF: 0,
    BEFORE_KICKOFF_WITH_INPLAY: 1,
    BEFORE_KICKOFF_WITH_HALFTIME: 2,
    KICKOFF_WITH_INPLAY_NON_SELLING: 3,
    KICKOFF_WITH_INPLAY_SELLING: 4,
    KICKOFF_WITH_HALFTIME_SELLING: 5,
    KICKOFF_WITH_HALFTIME_NON_SELLING: 6,
    KICKOFF_WITH_ET_SELLING: 7, //Extra Time started
    KICKOFF_WITH_PS_SELLING: 8, // Penalty Shootout started
    KICKOFF_WITH_ET_NOT_SELLING: 9, //Extra Time started
    KICKOFF_WITH_PS_NOT_SELLING: 10, // Penalty Shootout started
    KICKOFF_WITH_AET_SELLING: 11,
    KICKOFF_WITH_AET_NOT_SELLING: 12,
    KICKOFF_WITH_FIRST_HALF_SELLING: 13,
    KICKOFF_WITH_FIRST_HALF_NOT_SELLING: 14,
    KICKOFF_WITH_HALF_SELLING: 15,
    KICKOFF_WITH_HALF_NOT_SELLING: 16,
    KICKOFF_WITH_SECOND_HALF_SELLING: 17,
    KICKOFF_WITH_SECOND_HALF_NOT_SELLING: 18,
    KICKOFF_WITH_SECOND_SELLING: 19,
    KICKOFF_WITH_SECOND_NOT_SELLING: 20,
    KICKOFF_NOT_SELLING: -1 // new added
};

Match_Common.prototype.IsMatchKickOff = function() {
    try {
        if (this.matchState == "PreEvent") {
            return false;
        }
    } catch (ex) {
        debugLog(ex);
    }
    return true;
};

Match_Common.prototype.HasPoolOddsDefined = function(_poolType) {
    if (this[_poolType.toLowerCase() + "odds"] != undefined && this[_poolType.toLowerCase() + "odds"] != null) {
        return true;
    }
    return null;
};

//isNTSDefined
Match.prototype.isNTSDefined = function() {
    if (this.definedPools.indexOf("NTS") != -1 || this.definedPools.indexOf("ETS") != -1 || this.definedPools.indexOf("ENT") != -1 || this.inplayPools.indexOf("NTS") != -1 || this.inplayPools.indexOf("ETS") != -1 || this.inplayPools.indexOf("ENT") != -1) {
        return true;
    }
    return false;
};

//public string[] GetInplayMatchStatusInfo()
Match_Common.prototype.GetInplayMatchStatusInfo = function() {

    // [0] : isBettingDelayNeeded (true / false)
    // [1] : match status ("InPlayESST_nobr", "firsthalf", "halftimecompleted", "secondhalf", "secondhalfcompleted", "extratime", "fulltime", "penaltyshootout")
    // [2] : score ("2:0")
    // [3] : 90 mins score ("1:0")
    // [4] : within 90 mins total corner
    // matchstatus: Match Status is BeforeKickOff, FirstHalf, HalfTime, 
    // SecondHalf, OverTime, BeforeExtraTime, FirstExtraTime, ExtraHalfTime, SecondExtraTime, BeforePenaltyKick, PenaltyKick, EndedAfterFT, EndedAfterET, EndedAfterPK,
    // Postponed, Delayed, Canceled, Interrupted, Suspended, Abandoned.
    var results = [];

    try {
        if (this.inplaydelay != undefined && this.inplaydelay != null) results[0] = this.inplaydelay == "true";
        else results[0] = false;

        // restructute accumulatedscore to new_accumulatedscore
        // [0] = firsthalf
        // [1] = secondhalf
        // [2] = extratime
        var new_accumulatedscore = [];

        if (this.matchStatus == "Closed" || this.matchStatus == "ResultIn") {
            results[2] = "0 : 0";
            results[3] = "-1";
        } else {
            results[2] = "-1 : -1";
            results[3] = "-1";
        }
        if (this.accumulatedscore != null) {
            var firstHalfResult = $.grep(this.accumulatedscore, function(_as) {
                return _as.periodvalue == "FirstHalf";
            })[0];
            var secondHalfResult = $.grep(this.accumulatedscore, function(_as) {
                return _as.periodvalue == "SecondHalf";
            })[0];
            var extraTimeResult = $.grep(this.accumulatedscore, function(_as) {
                return _as.periodvalue == "ExtraTime";
            })[0];
            switch (this.matchState) {
                case "KickedOff":
                case "FirstHalf":
                case "FirstHalfCompleted":
                    if (firstHalfResult != null) {
                        results[2] = firstHalfResult.home + " : " + firstHalfResult.away;
                    }
                    break;
                case "SecondHalf":
                case "FullTimeCompleted":
                    if (secondHalfResult != null) {
                        results[2] = secondHalfResult.home + " : " + secondHalfResult.away;
                    } else if (firstHalfResult != null) {
                        results[2] = firstHalfResult.home + " : " + firstHalfResult.away;
                    }
                    break;
                case "InplayMatchEnded":
                case "MatchEnded":
                case "PenaltyKick":
                case "PenaltyKickCompleted":
                    if (extraTimeResult != null) {
                        results[2] = extraTimeResult.home + " : " + extraTimeResult.away;
                        if (secondHalfResult != null) {
                            results[3] = secondHalfResult.home + " : " + secondHalfResult.away;
                        }
                    } else if (secondHalfResult != null) {
                        results[2] = secondHalfResult.home + " : " + secondHalfResult.away;
                    }
                    break;
                case "FirstHalfET":
                case "FirstHalfETCompleted":
                case "SecondHalfET":
                case "SecondHalfETCompleted":
                    if (secondHalfResult != null) {
                        results[3] = secondHalfResult.home + " : " + secondHalfResult.away;
                    }
                    if (extraTimeResult != null) {
                        results[2] = extraTimeResult.home + " : " + extraTimeResult.away;
                    } else {
                        results[2] = "0 : 0";
                    }
                    break;
                default:
                    break;
            }
        }

        switch (this.matchState) {
            case "KickedOff":
            case "FirstHalf":
                results[1] = "firsthalf";
                break;
            case "FirstHalfCompleted":
                results[1] = "halftimecompleted";
                break;
            case "SecondHalf":
                results[1] = "secondhalf";
                break;
            case "FullTimeCompleted":
                results[1] = "secondhalfcompleted";
                break;
            case "InplayMatchEnded":
            case "MatchEnded":
                results[1] = "fulltime";
                break;
            case "FirstHalfET":
            case "FirstHalfETCompleted":
            case "SecondHalfET":
                results[1] = "extratime";
                break;
            case "SecondHalfETCompleted":
                results[1] = "extratimefulltime";
                break;
            case "PenaltyKick":
            case "PenaltyKickCompleted":
                results[1] = "penaltyshootout";
                break;
            default:
                results[1] = "InPlayESST_nobr";
                break;
        }

        if (this.matchStatus == "Canceled") {
            results[1] = "voidmatch";
        }

        results[4] = "---";
        if (pageName == "INPLAYALL") {
            if (this.echodds != null && this.echodds.POOLSTATUS == "Selling" && this.matchState != "FullTimeCompleted") {
                results[4] = this.etcornerresult != null ? this.etcornerresult : "0"; // [4] : within 90 mins total corner
            } else if (this.chlodds != null && this.chlodds.POOLSTATUS == "Selling") {
                results[4] = this.cornerresult != null ? this.cornerresult : "0"; // [4] : within 90 mins total corner
            }
        }

        results[5] = this.anyInplaySelling != null && this.anyInplaySelling == "1" ? true : false;
    } catch (ex) {
        results[0] = "false";
        results[1] = "";
        results[2] = "";
        results[3] = "";
        results[4] = "";
        results[5] = "";
    }

    return results;
};

Match_Common.prototype.isVoidMatch = function(_poolType) {
    return this.matchStatus == "Canceled";
};

Match_Result.prototype.GetExtraTimeScore = function() {
    if (this.accumulatedscore != undefined && this.accumulatedscore != null) {
        var extraTimeResult = $.grep(this.accumulatedscore, function(_as) {
            return _as.periodvalue == "ExtraTime";
        });
        if (extraTimeResult.length > 0) {
            extraTimeResult = extraTimeResult[0];
            return extraTimeResult;
        }
    }
    return null;
};

Match.prototype.GetMatchPoolStatus = function(_poolType, _lineNum) {
    var results = -1;

    if (pageName == 'OFM' && _poolType != "EHA") {
        _poolType = "HAD";
    }

    var _singlePoolType = this[_poolType.toLowerCase() + "odds"];
    var _poolInplay = void 0,
        _poolStatus = void 0;

    if (_singlePoolType != null && _singlePoolType.length != null) {
        if (_poolType.match(/^(MSP|SGA)$/)) {
            if (_lineNum == null) _singlePoolType = _singlePoolType[0];
            else _singlePoolType = $.grep(_singlePoolType, function(_item) {
                return _item.ITEM == _lineNum;
            })[0];
        } else {
            _singlePoolType = _singlePoolType[0];
        }
    }
    if (_singlePoolType != null) {
        _poolInplay = _singlePoolType.INPLAY;
        _poolStatus = _singlePoolType.POOLSTATUS;
    } else {
        _poolInplay = this.inplayPools.length > 0 ? "true" : "false";
        _poolStatus = this.anyInplaySelling == "1" ? "Selling" : "NotSelling";
    }
    if (this.IsMatchKickOff()) {
        if (_poolInplay == "true") {
            switch (this.matchState) {
                case "FirstHalf":
                    results = _poolStatus == "Selling" ? MatchPoolStatus.KICKOFF_WITH_FIRST_HALF_SELLING : MatchPoolStatus.KICKOFF_WITH_FIRST_HALF_NOT_SELLING;
                    break;
                case "FirstHalfCompleted":
                    results = _poolStatus == "Selling" ? MatchPoolStatus.KICKOFF_WITH_HALF_SELLING : MatchPoolStatus.KICKOFF_WITH_HALF_NOT_SELLING;
                    break;
                case "SecondHalf":
                    results = _poolStatus == "Selling" ? MatchPoolStatus.KICKOFF_WITH_SECOND_HALF_SELLING : MatchPoolStatus.KICKOFF_WITH_SECOND_HALF_NOT_SELLING;
                    break;
                case "SecondHalfCompleted":
                case "FullTimeCompleted":
                    results = _poolStatus == "Selling" ? MatchPoolStatus.KICKOFF_WITH_SECOND_SELLING : MatchPoolStatus.KICKOFF_WITH_SECOND_NOT_SELLING;
                    break;
                case "FirstHalfET":
                case "FirstHalfETCompleted":
                case "SecondHalfET":
                    results = _poolStatus == "Selling" ? MatchPoolStatus.KICKOFF_WITH_ET_SELLING : MatchPoolStatus.KICKOFF_WITH_ET_NOT_SELLING;
                    break;
                case "SecondHalfETCompleted":
                    results = _poolStatus == "Selling" ? MatchPoolStatus.KICKOFF_WITH_AET_SELLING : MatchPoolStatus.KICKOFF_WITH_AET_NOT_SELLING;
                    break;
                case "PenaltyKick":
                case "PenaltyKickCompleted":
                    results = _poolStatus == "Selling" ? MatchPoolStatus.KICKOFF_WITH_PS_SELLING : MatchPoolStatus.KICKOFF_WITH_PS_NOT_SELLING;
                    break;
                default:
                    results = _poolStatus == "Selling" ? MatchPoolStatus.KICKOFF_WITH_INPLAY_SELLING : MatchPoolStatus.KICKOFF_WITH_INPLAY_NON_SELLING;
                    break;
            }
        } else {
            results = MatchPoolStatus.KICKOFF_NOT_SELLING;
        }
    } else {
        if (_poolInplay == "true") {
            results = MatchPoolStatus.BEFORE_KICKOFF_WITH_INPLAY;
        } else {
            results = MatchPoolStatus.BEFORE_KICKOFF;
        }
    }

    return results;
};

Match_Result.prototype.HasPoolResults = function(poolType, _index) {
    if (this.results[poolType] != null) {
        return true;
    } else if (poolType == "CHL" && "cornerresult" in this) {
        return true;
    }
    return false;
};

Match_Result.prototype.GetNTSResult = function(pooltype, _ind) {
    var strvalue = this.results[pooltype + _ind];
    try {
        if (strvalue == "RFD") {
            return jsRFD;
        }
        if (strvalue == "H") return "1 " + this.homeTeam["teamName" + jsLang];
        else if (strvalue == "A") return "2 " + this.awayTeam["teamName" + jsLang];
        else if (strvalue == "N") //only for FTS
            return "N " + jsNoGoal;
        else if (strvalue == "-") return "-";
    } catch (ex) {
        debugLog("GetNTSResult: " + ex);
    }
    return "";
};

Match_Result.prototype.GetNonNTSResult = function(pooltype) {
    var strvalue = void 0;
    if (pooltype == "CHL") {
        try {
            if (this.chlodds.POOLSTATUS.toLowerCase().indexOf("refund") >= 0) {
                return GetGlobalResources("RFD");
            }
        } catch (ex) {}
        return this.cornerresult != undefined && this.cornerresult != null && this.cornerresult != "-1" ? this.cornerresult : "-";
    } else {
        strvalue = this.results[pooltype];
    }
    try {
        if (strvalue == "RFD") {
            return jsRFD;
        }

        if (strvalue == "-") return strvalue;

        switch (pooltype) {
            case "HAD":
            case "FHA":
            case "EHA":
                if (strvalue == "H") return jsHomeTeamWin;
                else if (strvalue == "A") return jsAwayTeamWin;
                else if (strvalue == "D") return jsDRAW;
                break;
            case "CRS":
            case "FCS":
            case "ECS":
                var score = strvalue.split(":");
                if (strvalue == "HO" || strvalue.indexOf("-H") > 0) return bshomeothers;
                else if (strvalue == "DO" || strvalue.indexOf("-D") > 0) return bsdrawothers;
                else if (strvalue == "AO" || strvalue.indexOf("-A") > 0) return bsawayothers;
                else return parseInt(score[0], 10) + " : " + parseInt(score[1], 10);
                break;
            case "HFT":
                return GetGlobalResources("hft" + strvalue.replace(":", ""), "bs");
            case "OOE":
                if (strvalue == "O") return bsodd;
                else if (strvalue == "E") return bseven;
                break;
            case "TTG":
            case "ETG":
                if (strvalue == "7" || strvalue == "7+") return "7+";
                else return parseInt(strvalue, 10);
                break;
            case "CHL":
                return strvalue;
                break;
            case "FTS":
                if (strvalue == "H") return "1 " + this.homeTeam["teamName" + jsLang];
                else if (strvalue == "A") return "2 " + this.awayTeam["teamName" + jsLang];
                else if (strvalue == "N") //only for FTS
                    return "N " + jsNoGoal;
                else return strvalue;
            case "TQL":
                if (strvalue == "H") return this.homeTeam["teamName" + jsLang];
                else if (strvalue == "A") return this.awayTeam["teamName" + jsLang];
                break;
            case "FGS":
                return this.GetFGSResultDetailsText(false);
        }
    } catch (ex) {
        debugLog("GetNonNTSResult: " + ex);
    }
    return "";
};

Match_Result.prototype.HasConfirmedResults = function() {
    return Object.keys(this.results).length > 0 || this.cornerresult == 'RFD' || this.cornerresultfinal == 1 || this.etcornerresult == 'RFD' || this.etcornerresultfinal == 1 || this.abandonedcornerresult == 1 || Object.keys(this.accumulatedscore).length > 0 && this.accumulatedscore[0].periodstatus == "ResultFinal";
};

Match_Result.prototype.IsEndOfMatchWithDiv = function() {
    if (this.results["HAD"] != undefined && this.results["HAD"] != null) {
        return true;
    }
    return false;
};

Match_Result.prototype.isEndOfHalfTimeWithDiv = function(strHalfTimeDiv) {

    var hasHalfTimePool = false;
    var hasOtherPool = false;

    var allPools = jsLastOddsSeq.split(',');

    for (var i = 0; i < allPools.length; i++) {
        var _tmpDiv = void 0;
        if (this.results[allPools[i]] != undefined && this.results[allPools[i]] != null) {
            if (allPools[i].indexOf(strHalfTimeDiv) > -1) hasHalfTimePool = true;
            else hasOtherPool = true;
        }
    }

    return hasHalfTimePool && !hasOtherPool;
};

Match_Result.prototype.GetFGSResultDetailsText = function(isFgsResultPage) {
    try {
        var _allResult = isFgsResultPage ? this.results : this.results["FGS"];
        var _matchFGSText = [];
        for (var i = 0; i < _allResult.length; i++) {
            var _sel = _allResult[i].SEL;
            if (_sel == '000') _sel = '00';
            _matchFGSText.push(React.createElement(
                "div", {
                    key: this.matchID + "_result_" + _sel
                },
                _sel,
                " ",
                jsLang == "CH" ? _allResult[i].CONTENTCH : _allResult[i].CONTENTEN
            ));
        }
        return _matchFGSText;
    } catch (ex) {}
};

function isTournPool(_pool) {
    if (_pool == "CHP" || _pool == "GPW" || _pool == "GPF" || _pool == "TPS" || _pool == "TSP" || _pool == "TQL") {
        return true;
    }
    return false;
}

function getMatchFromBetValue(_matchid) {
    for (var _key in betValue) {
        if (betValue[_key].matchID == _matchid) {
            return betValue[_key];
        }
    }
    return null;
}

function sortDataToItem(matchData, isRef) {
    var spcItems = [];
    try {
        //matchData.matches.forEach(function(_matchData, _ind) {
        var _singleMatch = new Match(matchData, isRef);
        matchData.spcodds.forEach(function(_oddsData, _oind) {
            if (_oddsData.GROUP == "Item") {
                if (spcItems[_oddsData.ITEM] === undefined) {
                    spcItems[_oddsData.ITEM] = [];
                }
                var _singleItem = {
                    item: _oddsData,
                    match: _singleMatch
                };
                spcItems[_oddsData.ITEM].push(_singleItem);
            }
        });
        //});
    } catch (ex) {}
    return spcItems;
}

function generateMatchesObject(_name, _count) {
    try {
        return {
            "name": _name,
            "matchescount": parseInt(_count),
            "matches": [],
            "tournaments": []
        };
    } catch (ex) {
        return {
            "name": "",
            "matchescount": 0,
            "matches": [],
            "tournaments": []
        };
    }
}

function generateTournamentsObject(_name, _count) {
    try {
        return {
            "name": _name,
            "tournamentscount": parseInt(_count),
            "tournaments": []
        };
    } catch (ex) {
        return {
            "name": "",
            "tournamentscount": 0,
            "tournaments": []
        };
    }
}

function debugLog(ex) {
    if (debugEnabled) {
        console.log("Line#" + ex.lineNumber + " " + ex + " " + new Error().stack);
    }
}

function displaySearchLabel() {
    if (typeof FromDate !== 'undefined') {
        if (FromDate != "") {
            $('#lblSearchByDate').html("<strong>" + jsdate + ":</strong> " + formatYYYYMMDD(FromDate) + " - " + formatYYYYMMDD(ToDate));
            $('#lblSearchByDate').show();
        } else {
            $('#lblSearchByDate').hide();
        }
    }
    if (typeof TeamName !== 'undefined') {
        if (TeamName != "") {
            $('#lblSearchByTeam').html("<strong>" + jsselectedteam + ":</strong> " + TeamName);
            $('#lblSearchByTeam').show();
        } else {
            $('#lblSearchByTeam').hide();
        }
    }
    if (typeof searchRecent !== 'undefined') {
        if (searchRecent) {
            $('#lblSearchRecent').show();
        } else {
            $('#lblSearchRecent').hide();
        }
    }

    $('#searchLbl').show();
    $('html,body').scrollTop(0);
    maxMatch = 20;
}

function parseOdds(str) {
    var oddsStr = str.split('@')[1];
    if (isNaN(oddsStr)) {
        return oddsStr;
    }
    return parseFloat(oddsStr);
};

function trimMatchDate(str) {
    return str.substr(0, 10).trim();
}

function trimMatchDate2(str) {
    return str.substr(0, 16).trim();
}

function trimStr(str) {
    return str.trim();
}

function trimFrontendId(str) {
    return str.substr(2, 4).trim();
}

// error handling
function renderEmptyPage(firstLoad) {
    var data = void 0;

    if (pageName == "SPC" || pageName == "INPLAYSPC") {
        data = generateMatchesObject("ActiveMatches", 0);
        // Hybrid
        renderSPCTable(data, firstLoad);
    } else if (pageName == "SGA") {
        data = generateMatchesObject("ActiveMatches", 0);
        // Hybrid
        renderSGATable(data, firstLoad);
    } else if (pageName == "CHP") {
        data = [];
        renderCHPTable(data, firstLoad);
    } else if (pageName == "TQL") {
        data = [];
        renderTQLTable(data, firstLoad);
    } else if (pageName == "RESULT") {
        drawEmptyResult();
    } else if (pageName == "HFMP_RESULT" || pageName == "DHCP_RESULT") {
        data = [
            [], {}
        ];
        renderParimutuelResult(data);
    } else if (pageName == "SPC_RESULTS") {
        data = [];
        renderSPCResults(data);
    } else if (pageName == "MIXALLUP" || pageName == "MIXALLUPSHORTCUT") {
        data = [];
        renderAllMatchAllTable(data, firstLoad);
    } else if (pageName == "FOCUSMATCH") {
        data = [];
        renderFocusMatch(data, firstLoad);
    } else if (pageName != "TOURN") {
        data = generateMatchesObject("ActiveMatches", 0);
        renderMatchTable(data, firstLoad);
    } else {
        data = [];
        renderTournTable(data, firstLoad);
    }

    displayRemarks();
}

function drawEmptyResult() {
    if (pageName == "RESULT") {
        $('.trMatchIn').hide();
        $('.trMatch').hide();
        $('.noinfo').css('display', 'table-cell');
    } else {
        $('#dContainer').hide();
        $('.pagination').hide();
        $('#noinformation').css('display', 'table-cell');
    }
}

function getMatchesInPage(data) {
    var noOfPassedMatch = 0;
    var noOfSavedMatch = 0;
    for (var i = 0; i < data.length; i++) {
        var tmpItems = [];
        if ("matches" in data[i]) {
            //   if(noOfPassedMatch + getMatchLength(data[i])>=startMatch && noOfPassedMatch<endMatch) {
            if (noOfSavedMatch < endMatch - startMatch - 1) {
                var arrstartMatch = startMatch - noOfPassedMatch - 1 + noOfSavedMatch;
                arrstartMatch = arrstartMatch < 0 ? 0 : arrstartMatch;

                if (arrstartMatch < data[i].matches.length) {
                    // sort matches by num 
                    data[i].matches = data[i].matches.sort(sort_by2(["matchDate", "displayOrder"], [false, false], [trimMatchDate, parseInt]));

                    tmpItems = data[i].matches.slice(arrstartMatch, arrstartMatch + maxMatch - noOfSavedMatch);
                }
            }
            noOfSavedMatch += tmpItems.length;
            noOfPassedMatch += getMatchLength(data[i]);
            data[i].matches = tmpItems;
        }
    }
    return data;
}

function getResultScoreDetails(singleMatch) {
    var isFTVoid = false;
    var firstHalfScore = '-';
    var secondHalfScore = '-';
    var extraTimeScore = '';
    if (singleMatch.accumulatedscore == null) {
        isFTVoid = singleMatch.isVoidMatch();
    } else {
        var firstHalfResult = $.grep(singleMatch.accumulatedscore, function(_as) {
            return _as.periodvalue == "FirstHalf";
        })[0];
        var secondHalfResult = $.grep(singleMatch.accumulatedscore, function(_as) {
            return _as.periodvalue == "SecondHalf";
        })[0];
        var extraTimeResult = $.grep(singleMatch.accumulatedscore, function(_as) {
            return _as.periodvalue == "ExtraTime";
        })[0];
        var isVoid = singleMatch.isVoidMatch();
        if (isVoid && singleMatch.matchState == 'ResultVoided') {
            if (firstHalfResult == null || firstHalfResult.periodstatus != "ResultFinal") {
                isFTVoid = isVoid;
            } else {
                firstHalfScore = firstHalfResult.home + " : " + firstHalfResult.away;
                secondHalfScore = React.createElement(
                    "div", {
                        className: "void"
                    },
                    jsvoidmatch
                );
            }
        } else {
            if (firstHalfResult == null || firstHalfResult.periodstatus != "ResultFinal") {
                isFTVoid = isVoid;
            } else {
                firstHalfScore = firstHalfResult.home + " : " + firstHalfResult.away;
            }

            if (secondHalfResult == null || secondHalfResult.periodstatus != "ResultFinal") {
                if (isVoid) {
                    if (pageName == "DHCP_RESULT" || pageName == "HFMP_RESULT") {
                        secondHalfScore = React.createElement(
                            "div", {
                                className: "void"
                            },
                            jsvoid_match
                        );
                    } else {
                        secondHalfScore = React.createElement(
                            "div", {
                                className: "void"
                            },
                            jsvoidmatch
                        );
                    }
                }
            } else {
                if (isVoid && secondHalfResult != null && secondHalfResult.periodstatus == "ResultFinal") {
                    secondHalfScore = secondHalfResult.home + " : " + secondHalfResult.away;
                } else if (isVoid && extraTimeResult == null) {
                    secondHalfScore = React.createElement(
                        "div", {
                            className: "void"
                        },
                        jsvoidmatch
                    );
                } else {
                    secondHalfScore = secondHalfResult.home + " : " + secondHalfResult.away;
                }
            }

            if (extraTimeResult != null) {
                if (isVoid && singleMatch.matchState == 'InPlayResultVoided' && secondHalfResult != null && secondHalfResult.periodstatus == "ResultFinal") {
                    extraTimeScore = React.createElement(
                        "div", {
                            className: "lblExtraTime void"
                        },
                        "[",
                        jsvoidmatch,
                        "]"
                    );
                } else if (extraTimeResult.periodstatus == "ResultFinal") {
                    extraTimeScore = React.createElement(
                        "div", {
                            className: "lblExtraTime"
                        },
                        "[",
                        extraTimeResult.home,
                        " : ",
                        extraTimeResult.away,
                        "]"
                    );
                }
            } else if (isVoid && singleMatch.matchState == 'InPlayResultVoided' && secondHalfResult != null && secondHalfResult.periodstatus == "ResultFinal") {
                extraTimeScore = React.createElement(
                    "div", {
                        className: "lblExtraTime void"
                    },
                    "[",
                    jsvoidmatch,
                    "]"
                );
            }
        }
    }
    return [isFTVoid, firstHalfScore, secondHalfScore, extraTimeScore];
}

function formatDHCPSelectionText(_pool, resultText) {
    if (_pool == "DHCP") {
        if (resultText == "HO") {
            return "(" + bshomeothers + ")";
        } else if (resultText == "AO") {
            return "(" + bsawayothers + ")";
        } else if (resultText == "DO") {
            return "(" + bsdrawothers + ")";
        }
    }
    return "";
}

function getCheckboxType(_oddsType) {
    // _oddsType = odds type or page name
    switch (_oddsType) {
        case "HAD":
        case "EHA":
        case "FHA":
        case "HHA":
        case "HADINPLAY":
        case "HHAINPLAY":
        case "FHAINPLAY":
        case "INDEX":
        case "INPLAYHAD":
        case "FOCUSMATCH":
        case "OFM":
            return ["H", "D", "A"];
        case "HDC":
        case "EDC":
        case "HDCINPLAY":
        case "TQL":
        case "TQLINPLAY":
            return ["H", "A"];
        case "NTS":
        case "ENT":
        case "FTS":
        case "ETS":
            return ["H", "N", "A"];
        case "OOE":
            return ["O", "E"];
        case "HFT":
        case "HFTINPLAY":
            return ["HH", "HD", "HA", "DH", "DD", "DA", "AH", "AD", "AA"];
        case "TTG":
        case "ETG":
        case "TTGINPLAY":
            return ["P0", "P1", "P2", "P3", "P4", "P5", "P6", "M7"];
        case "HIL":
        case "EHL":
        case "CHL":
        case "ECH":
        case "FHL":
        case "HILINPLAY":
        case "CHLINPLAY":
        case "FHLINPLAY":
            return ["H", "L"];
    }
    return [];
}

function GetDateStr(date, type) {
    var mydate = new Date(date);
    var dateIfJetLag = date.split("T")[1].split("+")[1];
    if (dateIfJetLag == undefined) {
        mydate.setHours(mydate.getHours() - 8);
    }
    var y = mydate.getFullYear();
    var M = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var m = mydate.getMinutes();
    if (type == "0") {
        return d + "/" + M;
    } else if (type == "1") {
        return d + "/" + M + "/" + y;
    } else {
        return d + "/" + M + "/" + y + " " + h + ":" + m;
    }
}

function GetDateStr2(mydate, type) {
    var y = mydate.getFullYear();
    var M = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var m = mydate.getMinutes();
    if (type == "0") {
        return d + "/" + M;
    } else if (type == "1") {
        return d + "/" + M + "/" + y;
    } else {
        return d + "/" + M + "/" + y + " " + h + ":" + m;
    }
}

function AddDayStr(date, AddDayCount) {
    var mydate = new Date(date);
    //mydate.setDate(mydate.getDate() + AddDayCount);
    mydate.setDate(mydate.getDate());
    var dateIfJetLag = date.split("T")[1].split("+")[1];
    if (dateIfJetLag == undefined) {
        mydate.setHours(mydate.getHours() - 8);
    }

    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    return d + "/" + m;
}

function DateWeekLanguageSwitch(_matchDay) {
    var matchDayValue = "";
    if (jsLang.toLowerCase() == 'ch') {
        switch (_matchDay) {
            case "MON":
                matchDayValue = jsMON1;
                break;
            case "TUE":
                matchDayValue = jsTUE2;
                break;
            case "WED":
                matchDayValue = jsWED3;
                break;
            case "THU":
                matchDayValue = jsTHU4;
                break;
            case "FRI":
                matchDayValue = jsFRI5;
                break;
            case "SAT":
                matchDayValue = jsSAT6;
                break;
            case "SUN":
                matchDayValue = jsSUN0;
                break;
        }
    } else {
        matchDayValue = _matchDay;
    }
    return matchDayValue;
}

function getNextMatchDay(_matchDay) {

    var dayList = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    var dayIndex = dayList.indexOf(_matchDay);

    if (dayIndex + 1 == dayList.length) return dayList[0];
    else return dayList[dayIndex + 1];
}

function getMatchDayIndex(_matchDay) {

    var dayList = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];

    return dayList.indexOf(_matchDay) + 1;
}

function getTvStr(match) {
    if (match != null) {
        try {
            if (isLogon() && hasWebTV(match.matchID) && GetDataStore('football_live_ind') == "Y") {
                var srcUrl = footImagePath + "tv.gif?CV=" + cv;
                if (match.IsMatchKickOff()) {
                    return React.createElement(
                        "a", {
                            href: "javascript:;",
                            onClick: function onClick() {
                                top.openWebTVWindow(match.matchID);
                            }
                        },
                        React.createElement("img", {
                            src: srcUrl,
                            title: jsfootballLiveSchedule,
                            onerror: "errImg(this);"
                        })
                    );
                } else {

                    return React.createElement(
                        "a", {
                            href: "javascript:;",
                            onClick: function onClick() {
                                top.openWebTVWindow();
                            }
                        },
                        React.createElement("img", {
                            src: srcUrl,
                            title: jsfootballLiveSchedule,
                            onerror: "errImg(this);"
                        }),
                        " "
                    );
                }
            }
        } catch (ex) {}
    }
}

function getLiveCastStr(match) {
    var _this3 = this;

    var sb = new StringBuffer();
    var srcUrl = footImagePath + 't.gif?CV=' + cv;
    if (match != null && match.liveEvent != null && match.liveEvent.matchIDbetradar != null && match.liveEvent.matchIDbetradar != "") {
        return React.createElement(
            "a", {
                href: "javascript:;",
                onClick: function onClick() {
                    callLiveCast(match.liveEvent.matchIDbetradar);
                }
            },
            " ",
            React.createElement("img", {
                src: srcUrl,
                title: "",
                onError: function onError() {
                    errImg(_this3);
                }
            })
        );
    } else {
        return null;
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function sortCHPSellLisInplayAll(match) {

    var sellList = match.chpodds.SELLIST;
    var awayTeamEN = match.awayTeam.teamNameEN;
    var homeTeamEN = match.homeTeam.teamNameEN;
    var homeOdds = null;
    var awayOdds = null;
    var newList = [];

    sellList.forEach(function(item, index) {
        if (awayTeamEN == item.CONTENTEN) {
            awayOdds = item;
        } else if (homeTeamEN == item.CONTENTEN) {
            homeOdds = item;
        } else {
            newList.push(item);
        }
    });

    if (awayOdds != null) newList.unshift(awayOdds);

    if (homeOdds != null) newList.unshift(homeOdds);

    return newList;
}

var PerformTVLink = function(_React$Component) {
    _inherits(PerformTVLink, _React$Component);

    function PerformTVLink() {
        _classCallCheck(this, PerformTVLink);

        return _possibleConstructorReturn(this, (PerformTVLink.__proto__ || Object.getPrototypeOf(PerformTVLink)).apply(this, arguments));
    }

    _createClass(PerformTVLink, [{
        key: "render",
        value: function render() {
            var linkPerformTvStyle = showWebTVIcon() ? {
                display: "inline"
            } : {
                display: "none"
            };

            // if is login
            // if perform is available in the page
            if (performTvEnabled.indexOf(pageName) != -1) {
                return React.createElement(
                    "a", {
                        style: linkPerformTvStyle,
                        id: "linkPerformTv",
                        target: "_blank",
                        onClick: function onClick() {
                            top.openWebTVWindow();
                            return false;
                        }
                    },
                    React.createElement(Img, {
                        src: "/football/info/images/tv_title.gif" + cacheVersion,
                        title: "HKJC Football Live Schedule"
                    }),
                    React.createElement("div", {
                        className: "emptyDiv"
                    })
                );
            } else {
                return null;
            }
        }
    }]);

    return PerformTVLink;
}(React.Component);

var HelpIcon = function(_React$Component2) {
    _inherits(HelpIcon, _React$Component2);

    function HelpIcon() {
        _classCallCheck(this, HelpIcon);

        return _possibleConstructorReturn(this, (HelpIcon.__proto__ || Object.getPrototypeOf(HelpIcon)).apply(this, arguments));
    }

    _createClass(HelpIcon, [{
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "a",
                null,
                React.createElement(
                    "span", {
                        className: "spicon sphelp"
                    },
                    React.createElement(Img, {
                        className: "pointer icon",
                        src: "/football/info/images/icon_help.gif" + cacheVersion,
                        onClick: function onClick(event) {
                            callBetTypes(getBettingGuidePath(_this6.props.oddsType, false), event);
                        },
                        title: jsBettingGuide
                    })
                )
            );
        }
    }]);

    return HelpIcon;
}(React.Component);

var AddBetBtn = function(_React$Component3) {
    _inherits(AddBetBtn, _React$Component3);

    function AddBetBtn() {
        _classCallCheck(this, AddBetBtn);

        return _possibleConstructorReturn(this, (AddBetBtn.__proto__ || Object.getPrototypeOf(AddBetBtn)).apply(this, arguments));
    }

    _createClass(AddBetBtn, [{
        key: "render",
        value: function render() {
            var addBetBtn = React.createElement(
                "a", {
                    href: "javascript:addslip('');",
                    className: "addslip poolDetails"
                },
                React.createElement(Img, {
                    src: "/info/include/images/" + jsLang + "/btn_addslip.gif" + cacheVersion,
                    alt: jsaddSlip,
                    title: jsaddSlip,
                    className: "imgAddSlip"
                })
            );

            if (pageName == "MIXALLUPLIST") {
                return React.createElement("div", null);
            }

            if (this.props.position != undefined && this.props.position != null && this.props.position == "footer") {
                return React.createElement(
                    "div", {
                        className: "footerAddBet"
                    },
                    addBetBtn,
                    React.createElement("div", {
                        className: "clear"
                    })
                );
            } else {
                return addBetBtn;
            }
        }
    }]);

    return AddBetBtn;
}(React.Component);

//# sourceURL=/football/lib/Match.js
//# sourceMappingURL=Match.js.map