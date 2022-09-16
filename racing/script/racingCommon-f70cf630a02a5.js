function unloadCommon() {
    window.wpTableRS = null;
    window.cwinTableRS = null;
    window.combTableRS = null;
    window.rsCalTopRS = null;
    window.rsCalBtmRS = null;
}

var ranGenFlag = false;

function resetRanGenFlag() {
    ranGenFlag = false;
}

function createEmptyArray(size, cDtl) {
    var a = {};
    for (var i = 1; i <= size; i++) {
        a['P' + i] = false;
    }
    if (cDtl != null) {
        for (var i = 0; i < cDtl.sels.length; i++) {
            a[cDtl.sels[i].selStr] = false;
        }
    }
    return a;
}

function createEmptyOddsArray(size, cDtl) {
    var a = [];
    for (var i = 0; i <= size; i++) {
        a['P' + i] = {};
    }
    if (cDtl != null) {
        for (var i = 0; i < cDtl.sels.length; i++) {
            a[cDtl.sels[i].selStr] = {};
        }
    }
    return a;
}

function checkSCR(odd) {
    return (odd == "SCR" || odd == "---");
}

function loadRaceColorIndex() {
    if (pageName != 'RACECARD' && pageName != 'WP' && pageName != 'PWIN')
        return;

    var rList = normalRunnerList[curRaceNo];
    for (var idx in rList) {
        LoadRaceColorImageIndex(rList[idx].brandNum);
    }
}

function LoadRaceColorImageIndex(brand) {
    var imgUrl = raceColorUrl + brand + (isOverseaMeeting ? '' : '.gif' + cacheVersion);
    $.get(imgUrl).done(function() {
        $('#Img' + brand.replace('.', '\\.')).prop('src', imgUrl);
    }).fail(function() {});
}

//////////////////////////////////////////////////////////////////////////
//  refresh odds update time
//////////////////////////////////////////////////////////////////////////
function updateRefreshTime(inTime) {
    if (inTime == null || inTime == '')
        return;

    var aTime = inTime.replace(/:/g, '');
    if (aTime != '' && !isNaN(aTime)) {
        aTime = aTime.substring(0, 2) + ':' + aTime.substring(2, 4);

        var oTime = $('#oddsRefreshTime').html();
        if (oTime != '' && oTime != null)
            if (oTime > aTime && !(oTime.substring(0, 2) == '23' && aTime.substring(0, 2) == '00'))
                aTime = oTime;

        $('#oddsRefreshTime').html(aTime);
        $('#PwinTime').html(aTime);
        $('#winOddsTime').html(aTime);
    }
}

function getRefreshTime(inTime) {
    var aTime = inTime.replace(/:/g, '');
    if (aTime != '' && !isNaN(aTime)) {
        aTime = aTime.substring(0, 2) + ':' + aTime.substring(2, 4);

        var oTime = $('#oddsRefreshTime').html();
        if (oTime != '' && oTime != null)
            if (oTime > aTime && !(oTime.substring(0, 2) == '23' && aTime.substring(0, 2) == '00'))
                aTime = oTime;
    }

    return aTime;
}


//////////////////////////////////////////////////////////////////////////
//  Get all WIN odds
//////////////////////////////////////////////////////////////////////////
function winOddsLoadDoc(data, start, end) {
    var typePara = 'winodds';
    if (data != null && data != '')
        typePara = 'winoddspre';
    var dataParam = '';
    if (start != null && start != '')
        dataParam += '&start=' + start;
    if (end != null && end != '')
        dataParam += '&end=' + end;
    winOddsRefreshDoc(jsonURL + '?type=' + typePara + '&date=' + mtgDate + '&venue=' + mtgVenue + dataParam, 0);
}

function winOddsRefreshDoc(url, retry) {
    if (retry > 2)
        return;

    $.get(url, function(data) {
        if (data.indexOf && data.indexOf(wafKeyword) >= 0) {
            $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
            setTimeout(function() {
                winOddsRefreshDoc(url, retry + 1);
            }, 1000);
            return;
        }

        var str = data.OUT;
        if (str != '') {
            winOddsByRace = str.split('@@@');
            refreshWinOdds();
            updateRefreshTime(winOddsByRace[0]);
        }


    }).fail(function() {
        window.setTimeout('winOddsRefreshDoc(\'' + url + '\',' + (retry + 1) + ')', 400);
    });
}

//odds push
function winOddsRefreshDocPush() {
    var winStr = meetingPushData['WIN'].split('@@@');
    var plaStr = meetingPushData['PLA'].split('@@@');
    var cwinStrTmp = getCwinOddsPush('CWA');
    var cwinStr = cwinStrTmp != null ? cwinStrTmp.split('@@@') : null;
    if (wpTableRS != null) {
        if (wpTableRS[0] != null) {
            for (let idx in wpTableRS) {
                wpTableRS[idx].updateOddsByPush(winStr, plaStr, cwinStr);
            }
        } else {
            wpTableRS.updateOddsByPush(winStr, plaStr, cwinStr);
        }
    }
    updateRefreshTime(getUpdateTimeByPush(curRaceNo, 'WIN'));
}

function refreshWinOdds() {
    if (wpTableRS != null) {
        if (wpTableRS[0] != null) {
            for (let idx in wpTableRS) {
                wpTableRS[idx].updateOdds();
            }
        } else {
            wpTableRS.updateOdds();
        }
    }

    if (typeof checkQttOddsEnqEnable == 'function') {
        checkQttOddsEnqEnable();
    }
}

//////////////////////////////////////////////////////////////////////////
//  Get single WIN/PLA odds
//////////////////////////////////////////////////////////////////////////
function wpOddsLoadDoc(start, end, data) {
    var typePara = 'winplaodds';
    if (data != null && data != '')
        typePara = 'winplaoddspre';
    wpOddsRefreshDoc(jsonURL + '?type=' + typePara + '&date=' + mtgDate + '&venue=' + mtgVenue + '&start=' + start + '&end=' + end, 0);
}

function wpOddsRefreshDoc(url, retry) {
    if (retry > 2)
        return;

    $.get(url, function(data) {
        if (data.indexOf && data.indexOf(wafKeyword) >= 0) {
            $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
            setTimeout(function() {
                wpOddsRefreshDoc(url, retry + 1);
            }, 1000);
            return;
        }

        wpRefreshOdds(data);
    }).fail(function() {
        window.setTimeout('wpOddsRefreshDoc(\'' + url + '\',' + (retry + 1) + ')', 400);
    });
}

function wpRefreshOdds(data) {
    if (data.OUT && data.OUT != '') {
        winOddsByRace = data.OUT.split('@@@');
        if (wpTableRS != null)
            wpTableRS.updateOdds();
        updateRefreshTime(winOddsByRace[0]);
    }
}

//odds push
function wpRefreshOddsPush() {
    var winStr = meetingPushData['WIN'].split('@@@');
    var plaStr = meetingPushData['PLA'].split('@@@');
    if (wpTableRS != null)
        wpTableRS.updateOddsByPush(winStr, plaStr);
    updateRefreshTime(getUpdateTimeByPush(curRaceNo, 'WIN'));
}

//////////////////////////////////////////////////////////////////////////
//  Get Combination Odds (QIN / QPL / TRI / F-F)
//////////////////////////////////////////////////////////////////////////
function combOddsLoadDoc(raceNo, pool, type, dataType, page) {
    let typePrefix = pool.toLowerCase().replace('-', '');
    let suff = '';
    if (type == 2 && page > 0) {
        suff = '&start=' + (48 * (page - 1));
    } else {
        dataType = '';
    }
    let url = jsonURL + '?type=' + typePrefix + combType[type] + dataType + '&date=' + mtgDate + '&venue=' + mtgVenue +
        '&raceno=' + raceNo + suff;
    combOddsRefreshDocGen(0, pool, url, type, dataType, page);
}

/*using jquery to fetch data*/
function combOddsRefreshDocGen(retry, pool, url, type, dataType, page) {
    if (retry > 2)
        return;
    $.get(url, function(data) {
        if (data.indexOf && data.indexOf(wafKeyword) >= 0) {
            $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
            setTimeout(function() {
                combOddsRefreshDocGen(retry + 1, url, type, dataType, page);
            }, 1000);
            return;
        }
        if (data != null && data.OUT != '') {
            combOdds[pool] = data.OUT.split('@@@');
        } else {
            combOdds[pool] = ["", ""];
        }
        combTableRS[pool].updateOdds(type, dataType, page);
    }).fail(function() {
        setTimeout(function() {
            combOddsRefreshDocGen(retry + 1, url, type, dataType, page);
        }, 400);
    });
}

//////////////////////////////////////////////////////////////////////////
//  Get DBL Odds
//////////////////////////////////////////////////////////////////////////
function twoDLoadDoc(bType, raceNo, data) {
    var typePara = bType.toLowerCase();
    if (data != null && data != '')
        typePara += 'pre';
    twoDRefreshDoc(bType, 0, jsonURL + '?type=' + typePara + '&date=' + mtgDate + '&venue=' + mtgVenue +
        '&raceno=' + raceNo);
}

function twoDRefreshDoc(bType, retry, url) {
    if (retry > 5)
        return;
    $.get(url, function(data) {
        if (data.indexOf && data.indexOf(wafKeyword) >= 0) {
            $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
            setTimeout(function() {
                twoDRefreshDoc(bType, retry + 1, url);
            }, 1000);
            return;
        }
        combOdds[bType] = data.OUT.split('@@@');
        combTableRS[bType].updateOdds();
    }).fail(function() {
        setTimeout(function() {
            twoDRefreshDoc(bType, retry + 1, url)
        }, 400);
    });
}

//////////////////////////////////////////////////////////////////////////
//  Get Progressive Win Odds
//////////////////////////////////////////////////////////////////////////
function progLoadDoc(raceNo) {
    var curTime = $('#oddsRefreshTime').html();
    if (curTime != '') {
        progRefreshDoc(jsonURL + '?type=winprog&date=' + mtgDate + '&venue=' + mtgVenue + '&raceno=' + raceNo, 0);
    }
}

function progRefreshDoc(url, retry) {
    if (retry > 2)
        return;
    $.get(url, function(data) {
        if (data.indexOf && data.indexOf(wafKeyword) >= 0) {
            $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
            setTimeout(function() {
                progRefreshDoc(url, retry + 1);
            }, 1000);
            return;
        }

        wpTableRS.updatePwinOdds(data.OUT);
    }).fail(function() {
        window.setTimeout('progRefreshDoc(\'' + url + '\',' + (retry + 1) + ')', 400);
    });
}

//////////////////////////////////////////////////////////////////////////
//  Get Scratch Horse
//////////////////////////////////////////////////////////////////////////
function scratchLoadDoc() {
    scratchRefreshDoc(jsonURL + '?type=scratched&date=' + mtgDate + '&venue=' + mtgVenue, 0);
}

function scratchRefreshDoc(url, retry) {
    if (retry > 2)
        return;
    $.get(url, function(data) {
        if (data.indexOf && data.indexOf(wafKeyword) >= 0) {
            $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
            setTimeout(function() {
                scratchRefreshDoc(url, retry + 1);
            }, 1000);
            return;
        }

        mtgRanRace = parseInt(data.RAN_RACE);
        if (data) {
            scratchList = data.SCR_LIST;
            reserveList = data.SR;
            refreshScratchHorseNew(scratchList, reserveList);
            sendDataToBetslip();
        }
    }).fail(function() {
        window.setTimeout('scratchRefreshDoc(\'' + url + '\',' + (retry + 1) + ')', 400);
    });
}

function refreshScratchHorseNew(scrList, resList) {
    try {
        //for clear scratch value
        for (var i = 1; i <= mtgTotalRace; i++) {
            if (typeof(normalRunnerList) != "undefined" && typeof(normalRunnerList[i]) != "undefined") {
                for (var idx in normalRunnerList[i]) {
                    normalRunnerList[i][idx].scratched = false;
                    normalRunnerList[i][idx].standbyStatus = 'N';
                }
            }
        }
    } catch (e) {}

    try {
        // SCR_LIST
        var scratchs = scrList.split(';');
        if (scratchs.length > 1) {
            for (var i = 1; i < scratchs.length; i++) {
                var tmp = scratchs[i].split('#');
                var raceNo = parseInt(tmp[0], 10);
                var runnerNo = parseInt(tmp[1], 10);
                if (typeof(normalRunnerList) != "undefined" && typeof(normalRunnerList[raceNo]) != "undefined") {
                    setScratchReserveFromList(normalRunnerList[raceNo], runnerNo, true, false);
                }
            }
        }
    } catch (e) {}


    // RESERVE_LIST
    try {
        var reserves = resList.split(';');
        if (reserves.length > 1) {
            for (var i = 1; i < reserves.length; i++) {
                var tmp = reserves[i].split('#');
                var raceNo = parseInt(tmp[0], 10);
                var runnerNo = parseInt(tmp[1], 10);
                if (typeof(normalRunnerList) != "undefined" && typeof(normalRunnerList[raceNo]) != "undefined") {
                    setScratchReserveFromList(normalRunnerList[raceNo], runnerNo, false, true);
                }
            }
        }
    } catch (e) {}


    try {
        if (typeof checkQttOddsEnqEnable == 'function') {
            checkQttOddsEnqEnable();
        }
    } catch (e) {}
}

function setScratchReserveFromList(objArr, hNum, setScr, setRes) {
    for (var idx in objArr) {
        if (hNum == objArr[idx].num) {
            if (setScr)
                objArr[idx].scratched = true;
            if (setRes)
                objArr[idx].standbyStatus = 'R';
            break;
        }
    }
}

//////////////////////////////////////////////////////////////////////////
//  get cwa cwb cwc odds
//////////////////////////////////////////////////////////////////////////
function cwinOddsLoadDoc(start, end, data) {
    if (pageName == 'CWA' || pageName == 'XPOOL')
        cwinOddsRefreshDoc(jsonURL + '?type=cwaodds&date=' + mtgDate + '&venue=' + mtgVenue, 0);
    else if (pageName == 'CWB')
        cwinOddsRefreshDoc(jsonURL + '?type=cwbodds&date=' + mtgDate + '&venue=' + mtgVenue, 0);
    else if (pageName == 'CWC')
        cwinOddsRefreshDoc(jsonURL + '?type=cwcodds&date=' + mtgDate + '&venue=' + mtgVenue, 0);
}

function cwinOddsRefreshDoc(url, retry) {
    if (retry > 2)
        return;
    $.get(url, function(data) {
        if (data.indexOf && data.indexOf(wafKeyword) >= 0) {
            $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
            setTimeout(function() {
                cwinOddsRefreshDoc(url, retry + 1);
            }, 1000);
            return;
        }
        cwinOdds = data.OUT.split('#');
        if (cwinTableRS != null) {
            cwinTableRS.updateOdds();
        }
    }).fail(function() {
        window.setTimeout(function() {
            cwinOddsRefreshDoc(url, retry + 1);
        }, 400);
    });
}

//////////////////////////////////////////////////////////////////////////
//  get pool investment by poolType, date, venue and race no.
//////////////////////////////////////////////////////////////////////////
function poolTotSLoadDoc(raceNo, pool) {
    poolTotSRefreshDoc(jsonURL + '?type=pooltots&date=' + mtgDate +
        '&venue=' + mtgVenue + '&raceno=' + raceNo + '&pool=' + pool, 0);
}

function poolTotSRefreshDoc(url, retry) {
    if (retry > 2)
        return;
    $.get(url, function(data) {
        if (data.indexOf && data.indexOf(wafKeyword) >= 0) {
            $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
            setTimeout(function() {
                poolTotSRefreshDoc(url, retry + 1);
            }, 1000);
            return;
        }
        var s = addComma(data.OUT);
        if (s == "" || s == "-" || s == "0") {
            $('#poolInvTxt').html('$-');
        } else {
            $('#poolInvTxt').html('$' + s);
        }

    }).fail(function() {
        window.setTimeout('poolTotSRefreshDoc(\'' + url + '\',' + (retry + 1) + ')', 400);
    });
}

//for odds push
function poolTotSRefreshPush(SingleInves) {
    if (SingleInves == "" || SingleInves == "-" || SingleInves == "0")
        $('#poolInvTxt').html('$-');
    else
        $('#poolInvTxt').html('$' + addComma(SingleInves));
}

//////////////////////////////////////////////////////////////////////////
//  HF / Odds drop color schema related
//////////////////////////////////////////////////////////////////////////
function getOddsBgColor(ind) {
    var col = '';
    switch (ind) {
        case '0':
            col = '';
            break;
        case '1':
            col = hfBg;
            break;
        case '2':
            col = od20Bg;
            break;
        case '3':
            col = od50Bg;
            break;
        default:
            col = '';
    }
    return col;
}

function getOddsFgColor(ind) {
    var col = '#000000';
    switch (ind) {
        case '0':
            col = '#000000';
            break;
        case '1':
            col = hfFg;
            break;
        case '2':
            col = od20Fg;
            break;
        case '3':
            col = od50Fg;
            break;
        default:
            col = '#000000';
    }
    return col;
}

//////////////////////////////////////////////////////////////////////////
//   Popup / New Window / Page Redirect Related
//////////////////////////////////////////////////////////////////////////

function goBettingGuide() {
    NewWindow('//special.hkjc.com/root2/racing/info/' + curLang + '/betting/guide_qualifications_pari.asp', '', 800, 600, 1, 1);
}

function goFixedOddsBettingGuide() {
    NewWindow('//special.hkjc.com/root2/racing/info/' + curLang + '/betting/guide_qualifications_fixed.asp', '', 800, 600, 1, 1);
}

function goHorseRecord2(code) {
    NewWindow(horseProfileUrl + code, '', 680, 440, 1, 1);
}

function goJTRecord2(bType, code, isOther) {
    switch (bType) {
        case 'JKC':
            goJockeyRecord2(code, isOther);
            break;
        case 'TNC':
            goTrainerRecord2(code, isOther);
            break;
    }
}

function goJockeyRecord2(code, isOther) {
    if (isOther)
        NewWindow(jockeyOtherUrl, '', 680, 440, 1, 1);
    else
        NewWindow(jockeyProfileUrl + code, '', 680, 440, 1, 1);
}

function goTrainerRecord2(code, isOther) {
    if (isOther)
        NewWindow(trainerOtherUrl, '', 680, 440, 1, 1);
    else
        NewWindow(trainerProfileUrl + code, '', 680, 440, 1, 1);
}

function getRaceByRaceUpate(type, date, venue, lang) {
    NewWindow('/racing/pages/results_' + type.toLowerCase() + 'dtls.aspx?lang=' + lang + '&date=' + date + '&venue=' + venue, '', 680, 345, 1, 1);
}

function changeDateVenue(url, dateVenue) {
    var para = {};
    para['date'] = dateVenue.substr(0, 10);
    para['venue'] = dateVenue.substr(10, 2);
    para["raceno"] = '1';
    switchTo('racing', '', curLang, para);
}

function selectRace(raceNo) {
    if (pageName == 'XPOOL') {
        selectAlupRace(raceNo);
    } else {
        var para = {};
        para['date'] = mtgDate;
        para['venue'] = mtgVenue;
        para["raceno"] = raceNo;
        switchTo('racing', '', curLang, para);
    }
}

//////////////////////////////////////////////////////////////////////////
//   betslip related
//////////////////////////////////////////////////////////////////////////
function getHRUnitBet(pools) {
    try {
        var tmpPool = pools;
        if (pools == null || pools == '-' || pools == 'WP' || pools == 'WPQ')
            return '';
        else if (pools == 'XPOOL')
            tmpPool = 'ALUPX';
        return getMinimumUnitBetAmount(tmpPool, 'HR');
    } catch (e) {
        return 10;
    }
}

function sendDataToBetslip() {
    try {
        setXmlData(multiRacePoolsStr, fieldSizeWithReserve, scratchList, reserveList);
    } catch (e) {}
}

function sendMeetingDateToBetslip(dateStr) {
    try {
        setMeetingDate(dateStr);
    } catch (e) {}
}

//////////////////////////////////////////////////////////////////////////
//   formatting related
//////////////////////////////////////////////////////////////////////////

function syncTableRowHeight(col, isCw1, isCw2, isCw3) {
    var t1 = col * 3;
    var t2 = col * 3 + 1;
    var t3 = col * 3 + 2;

    var t1Exist = $('.wpTitleBar:eq(' + t1 + ')').length > 0;
    var t2Exist = $('.wpTitleBar:eq(' + t2 + ')').length > 0;
    var t3Exist = $('.wpTitleBar:eq(' + t3 + ')').length > 0;

    var h = Math.max(t1Exist ? $('.wpTitleBar:eq(' + t1 + ')').height() : 0,
        t2Exist ? $('.wpTitleBar:eq(' + t2 + ')').height() : 0,
        t3Exist ? $('.wpTitleBar:eq(' + t3 + ')').height() : 0);
    if (t1Exist)
        $('.wpTitleBar:eq(' + t1 + ')').height(h);
    if (t2Exist)
        $('.wpTitleBar:eq(' + t2 + ')').height(h);
    if (t3Exist)
        $('.wpTitleBar:eq(' + t3 + ')').height(h);

    var sh = Math.max(t1Exist ? $('.wpSubTitleBar:eq(' + t1 + ')').height() : 0,
        t2Exist ? $('.wpSubTitleBar:eq(' + t2 + ')').height() : 0,
        t3Exist ? $('.wpSubTitleBar:eq(' + t3 + ')').height() : 0);
    if (sh > 55) {
        sh = 70;
    } else if (sh > 40) {
        sh = 55;
    }
    if (t1Exist)
        $('.wpSubTitleBar:eq(' + t1 + ')').height(sh);
    if (t2Exist)
        $('.wpSubTitleBar:eq(' + t2 + ')').height(sh);
    if (t3Exist)
        $('.wpSubTitleBar:eq(' + t3 + ')').height(sh);

    var str = '';
    if (t1Exist && !isCw1) {
        str = '.wpTable:eq(0) tr';
    } else if (t2Exist && !isCw2) {
        str = '.wpTable:eq(1) tr';
    }
    if (str != '') {
        $(str).each(function(i) {
            if (t1Exist)
                $('.wpTable:eq(' + t1 + ') tr:eq(' + i + ')').height(20);
            if (t2Exist)
                $('.wpTable:eq(' + t2 + ') tr:eq(' + i + ')').height(20);
            if (t3Exist)
                $('.wpTable:eq(' + t3 + ') tr:eq(' + i + ')').height(20);

            var h = Math.max(t1Exist && !isCw1 ? $('.wpTable:eq(' + t1 + ') tr:eq(' + i + ')').height() : 0,
                t2Exist && !isCw2 ? $('.wpTable:eq(' + t2 + ') tr:eq(' + i + ')').height() : 0,
                t3Exist && !isCw3 ? $('.wpTable:eq(' + t3 + ') tr:eq(' + i + ')').height() : 0);
            if (t1Exist && !isCw1)
                $('.wpTable:eq(' + t1 + ') tr:eq(' + i + ')').height(h);
            if (t2Exist && !isCw2)
                $('.wpTable:eq(' + t2 + ') tr:eq(' + i + ')').height(h);
            if (t3Exist && !isCw3)
                $('.wpTable:eq(' + t3 + ') tr:eq(' + i + ')').height(h);
        });
    }
}

//////////////////////////////////////////////////////////////////////////
//   bet calculator related
//////////////////////////////////////////////////////////////////////////

function initRSCal() {
    switch (pageName) {
        case 'XPOOL':
            $('.showFlexi').show();
            selectBetMethod('unitbet');
            break;
        case 'WP':
            if (GetPara('FlexiWIN') == '1' || GetPara('FlexiPLA') == '1') {
                $('.showFlexi').show();
                selectBetMethod('unitbet');
            }
            break;
        case 'WPQ':
            if (GetPara('FlexiQIN') == '1' || GetPara('FlexiQPL') == '1') {
                $('.showFlexi').show();
                selectBetMethod('unitbet');
            }
            break;
        default:
            if (GetPara('Flexi' + pageName) == '1') {
                $('.showFlexi').show();
                selectBetMethod('unitbet');
            }
            break;
    }
    $('.rsInvCalUnitBetInput').val(getHRUnitBet(pageName));
}

var useCalculator = false;

function updateBetCalDisplay(obj, betNo) {
    var input = $('.rsInvCalUnitBetInput').val();
    var isTotal = $('.rsInvCalflexibet').is(':checked');
    if (input != '' && isAllDigits(input) & input > 0 && betNo > 0) {
        let n = '-';
        let u = '-';
        let t = '-';
        if (!isTotal) {
            n = addComma('' + betNo);
            u = '$ ' + addComma(trimLeftZero(input));
            t = '$ ' + addComma('' + betNo * input);
        } else {
            var avAmount = parseFloat(input) / parseFloat(betNo);
            n = addComma('' + betNo);
            u = '$ ' + addComma('' + Math.floor(avAmount * 100) / 100);
            t = '$ ' + addComma('' + input);
        }
        rsCalTopRS.setState({
            noofbet: n,
            unitbet: u,
            total: t
        });
        rsCalBtmRS.setState({
            noofbet: n,
            unitbet: u,
            total: t
        });
        useCalculator = true;
    } else
        useCalculator = false;
}

function copyBetAmountInput(obj) {
    var tmp = $(obj).val();
    $('.rsInvCalUnitBetInput').val(tmp);
}

function betCalReset() {
    useCalculator = false;
    $('.rsInvCalUnitBetInput').val(getHRUnitBet(pageName));
    rsCalTopRS.setState({
        noofbet: "-",
        unitbet: "-",
        total: "-"
    });
    rsCalBtmRS.setState({
        noofbet: "-",
        unitbet: "-",
        total: "-"
    });
}

function isAllDigits(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) < '0' || str.charAt(i) > '9')
            return false;
    }
    return true;
}

function isNumeric(strString) {
    var strValidChars = "0123456789.-";
    var strChar;
    var blnResult = true;

    if (strString == null || strString == undefined || strString.length == 0) return false;

    for (i = 0; i < strString.length && blnResult; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1)
            blnResult = false;
    }
    return blnResult;
}

function isNumericDash(strString) {
    var strValidChars = "0123456789.";
    var strChar;
    var blnResult = true;

    if (strString == null || strString == undefined || strString.length == 0) return false;

    for (i = 0; i < strString.length && blnResult; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1)
            blnResult = false;
    }
    return blnResult;
}

function trimLeftZero(str) {
    var i;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) != '0')
            break;
    }
    return str.substring(i);
}

function isFlexibet() {
    return $('.rsInvCalflexibet').is(':checked');
}

function getBetCalInput() {
    var input = $('.rsInvCalUnitBetInput').val();
    if (input != null && isAllDigits(input) && parseInt(input, 10) > 0)
        return trimLeftZero(input);
    return '';
}

function selectBetMethod(method) {
    resetRanGenFlag();
    try {
        $('.rsInvCalflexibet').prop('checked', false);
        var obj = $('.rsInvCalflexibet').closest('div');
        obj.css('font-weight', '');
        obj.css('background-color', '');
        $('.rsInvCalunitbet').prop('checked', false);
        obj = $('.rsInvCalunitbet').closest('div');
        obj.css('font-weight', '');
        obj.css('background-color', '');

        $('.rsInvCal' + method).prop('checked', true);
        obj = $('.rsInvCal' + method).closest('div');
        obj.css('font-weight', 'bold');
        obj.css('background-color', '#FFF4B0');
    } catch (ex) {}
}

//////////////////////////////////////////////////////////////////////////
//   Cookie function
//////////////////////////////////////////////////////////////////////////
var WPQ_COOKIE_NAME = 'WPQ_sel';
var TCE_COOKIE_NAME = 'TCE_sel';
var T_T_COOKIE_NAME = 'TT_sel';
var TRI_COOKIE_NAME = 'TRI_sel';
var F_F_COOKIE_NAME = 'FF_sel';
var QTT_COOKIE_NAME = 'QTT_sel';
var FCT_COOKIE_NAME = 'FCT_sel';

//////////////////////////////////////////////////////////////////////////
//  Add Bet function
//////////////////////////////////////////////////////////////////////////
var indentStrSt = '<div style="padding-left:32px">';
var indentStrEd = '</div>';

function isSingleRacePool(pool) {
    return singleRacePoolList.indexOf(pool) >= 0;
}

function isCwin(pool) {
    if (pool == "CWA" || pool == "CWB" || pool == "CWC") {
        return true;
    }
    return false;
}

function processQuickBet(pool, raceNo, sel1, sel2) {
    var arr = {};
    var bArr = {};
    var subType = '';
    switch (pool) {
        case 'WIN':
        case 'PLA':
        case 'CWA':
        case 'CWB':
        case 'CWC':
        case 'JKC':
        case 'TNC':
            arr[sel1] = true;
            break;
        case 'FCT':
        case 'TCE':
        case 'QTT':
            subType = ' S';
        case 'QIN':
        case 'QPL':
        case 'TRI':
        case 'F-F':
            var tmp = sel1.split('-');
            for (var i = 0; i < tmp.length; i++) {
                arr['P' + tmp[i]] = true;
            }
            break;
        case 'IWN':
            var tmp = sel1.split('-');
            bArr['P' + tmp[0]] = true;
            arr['P' + tmp[1]] = true;
            break;
    }
    var sels = {
        b1Arr: bArr,
        lArr: arr,
        lField: false
    };
    var foBetObj = addHRBetObj(pool, subType, raceNo, sels, getHRUnitBet(pool), false);
    addSelExFO(foBetObj);
}

function validateBet(pool, tableId, bankerNo, legNo, promptError) {
    switch (pool) {
        case 'WIN':
        case 'PLA':
        case 'W-P':
        case 'CWA':
        case 'CWB':
        case 'CWC':
        case 'DBL':
        case 'TBL':
        case '6UP':
            if (legNo <= 0) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            break;
        case 'QIN':
        case 'QPL':
        case 'QQP':
            if (bankerNo > 1) {
                if (promptError)
                    alert(tooManyBLbl.replace('#', tableId));
                return false;
            }
            if (legNo < 2) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            break;
        case 'TRI':
        case 'D-T':
        case 'T-T':
            if (bankerNo > 2) {
                if (promptError)
                    alert(tooManyBLbl.replace('#', tableId));
                return false;
            }
            if (bankerNo == 0 && legNo < 3) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            if (bankerNo > 0 && bankerNo + legNo < 4) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            break;
        case 'F-F':
            if (bankerNo > 3) {
                if (promptError)
                    alert(tooManyBLbl.replace('#', tableId));
                return false;
            }
            if (bankerNo == 0 && legNo < 4) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            if (bankerNo > 0 && bankerNo + legNo < 5) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            break;
        case 'IWN':
            if (bankerNo != 1 || legNo != 1) {
                if (promptError)
                    alert(insuffSLbl.replace('#', tableId));
                return false;
            }
            break;
        default:
            break;
    }
    return true;
}

function isCurrentOdds() {
    var tmpVal = $("#oddsDataDropDown").val();
    return tmpVal == null || tmpVal == '';
}

function GetGlobalResources(_key, _type) {
    try {
        var type = "js";
        if (_type != null && _type != "" && _type != undefined) {
            type = _type;
        }
        var text = eval(type + _key);
        if (text == "" || text == undefined || text == null) {
            return _key;
        }
        return text;
    } catch (e) {
        return _key;
    }
}

function foRacingLoadDoc(type) {
    foRacingRefreshDoc(jsonURL + '?type=' + type + '&date=' + mtgDate + '&venue=' + mtgVenue, 0);
}

function foRacingRefreshDoc(aUrl, retry) {
    if (retry > 4)
        return;
    $.get(aUrl, function(data) {
        if (data.indexOf && data.indexOf(wafKeyword) >= 0) {
            $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
            setTimeout(function() {
                foRacingRefreshDoc(aUrl, retry + 1);
            }, 1000);
            return;
        }
        foInfo = data;
        wpTableRS.updateOdds(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        window.setTimeout('foRacingRefreshDoc(\'' + aUrl + '\',' + (retry + 1) + ')', 400);
    });
}

function initFORacingUserContent(url, bType, retry) {
    if (retry > 4)
        return;
    $.get(url, function(data) {
        if (data.indexOf && data.indexOf(wafKeyword) >= 0) {
            $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
            setTimeout(function() {
                initFORacingUserContent(url, bType, retry + 1);
            }, 1000);
            return;
        }

        $('#foRacingUserContent').html($(data).find('#container').addBack('#container').children());
        switch (bType) {
            case "JKC":
                getJockeyRanking();
                break;
            case "TNC":
                getTrainerRanking();
                break;
        }
        $('#foRacingUserContent').css('width', '243px');
    }).fail(function(jqXHR, textStatus, errorThrown) {
        window.setTimeout(function() {
            initFORacingUserContent(url, bType, retry + 1);
        }, 400);
    });
}

function toggleCombinationVisibility(eid, iconid) {
    if ($("#" + eid).is(":visible")) {
        $("#" + eid).hide();
        $("#" + iconid).html("<img src=\"/info/include/images/btn_open.gif\">");
    } else {
        $("#" + eid).show();
        $("#" + iconid).html("<img src=\"/info/include/images/btn_close.gif\">");
    }
}

function adjustMtgInfoHeader() {
    // adjust width if venue is too long or it is in English (WP, WPQ, TRI) [local only] or CWA page
    if (curLang != 'en')
        return;

    if ($('.mtgInfoDV').text().length > 30 && (pageName == 'TRI' || pageName == 'WPQ' || pageName == 'WP')) {
        $('.mtgInfoDV').css('max-width', '150px');
    }
}

function changeRadioColor(name, num, total) {
    for (var i = 1; i <= total; i++) {
        var td = document.getElementById((name + i));

        if (td.clicked) {
            td.style.fontWeight = '';
            td.style.backgroundColor = '';
            td.clicked = false;
        }
    }

    var td = document.getElementById((name + num));

    if (!td.clicked) {
        td.style.fontWeight = 'bold';
        td.style.backgroundColor = '#FFF4B0';
        td.clicked = true;
    }
}

function showWebCast() {
    if (haveWebcastPermission()) {
        $('.raceWebCastIcon').prop('title', jsWebcast);
        $('.raceWebCastIcon').show();
    }
}

///
///  Odds Enquiry
///
var currentBetline = "";
var previousBetline = "";
var oddsEnquiryExpireTime = new Date().getTime();
var isOddsEnquiring = false;

function checkQttOddsEnqEnable() {
    if (wpTableRS == null || pageName != 'QTT' || wpTableRS.state.subType != 'S') {
        oddsEquiryBtnOff();
        return;
    }

    if (wpTableRS.getSelCount('banker1') <= 0 ||
        wpTableRS.getSelCount('banker2') <= 0 ||
        wpTableRS.getSelCount('banker3') <= 0 ||
        wpTableRS.getSelCount('leg') <= 0) {
        oddsEquiryBtnOff();
        return;
    }

    var betObj = wpTableRS.createPosBetObject();
    currentBetline = genBetLine(betObj).split('*')[1];
    var curTime = new Date().getTime();
    if (!isOddsEnquiring && (oddsEnquiryExpireTime < curTime || currentBetline != previousBetline)) {
        oddsEquiryBtnOn();
    } else {
        oddsEquiryBtnOff();
    }
}

function oddsEnquiry() {
    if ($('#btn_oddsenq').hasClass('oddsEnquiryButton') && !isOddsEnquiring) {
        isOddsEnquiring = true;
        oddsEquiryBtnOff();

        if (typeof(wpTableRS) != 'undefined') {
            var betObj = wpTableRS.createPosBetObject();
            var requestBetline = genBetLine(betObj).split('*')[1];
            var displayBetline = requestBetline.replace("/+/g", '-');
            var url;

            oddsEnquiryExpireTime = parseInt(new Date().getTime()) + parseInt(oesPreventPeriod);
            previousBetline = currentBetline;

            url = oesXmlUrl + '/' + encodeURIComponent(mtgDate) + '/' + mtgVenue + '/' + curRaceNo + '/QTT/' + encodeURIComponent(requestBetline);
            $.ajax({
                dataType: "xml",
                type: "GET",
                url: url,
                timeout: oesTimeout,
                success: function(data) {
                    oddsEnquirySuccess('xml', data, displayBetline);
                },
                error: function(xhr, status, error) {
                    oddsEnquiryError();
                }
            });
        }
    }
}

function oddsEnquirySuccess(type, data, displayBetline) {
    var returnCode = (type == 'json' ? data.Acknowledgement.ReturnCode : $(data).find('ReturnCode').text());
    if (returnCode == "WIS100") {
        var odds = (type == 'json' ? data.OddsList[0].DisplayOdds : $(data).find('DisplayOdds').text());
        var oddsEnqTime = (type == 'json' ? data.OddsList[0].OddsGernartionTime : $(data).find('OddsGernartionTime').text());

        try {
            if (parseFloat(odds) < 0) {
                odds = '-';
            }
        } catch (e) {}

        $("#enqComb").html(displayBetline);
        $("#enqOdds").html(odds);
        $("#enqRefreshTime").html(oddsEnqTime.substring(11, 16));

        isOddsEnquiring = false;
        setTimeout("checkQttOddsEnqEnable();", oesPreventPeriod);
    } else {
        oddsEnquiryError();
    }

}

function oddsEnquiryError() {
    oddsEnquiryReset();
    isOddsEnquiring = false;
    oddsEnquiryExpireTime -= parseInt(oesPreventPeriod);
    checkQttOddsEnqEnable();
}

function oddsEnquiryReset() {
    $("#enqComb").html("-");
    $("#enqOdds").html("-");
    $("#enqRefreshTime").html("-");
}

function oddsEquiryBtnOn() {
    $('#btn_oddsenq').prop('class', 'oddsEnquiryButton');
}

function oddsEquiryBtnOff() {
    $('#btn_oddsenq').prop('class', 'oddsEnquiryDimButton');
}


function goPeNoteUrl(ev, peUrl, horseId) {
    ev.cancelBubble = true;
    var peNoteLang = curLang == 'en' ? 'english' : 'chinese';
    var trCodeLang = curLang == 'en' ? 'E' : 'C';
    NewWindow(peUrl.replace('{0}', peNoteLang).replace('{1}', horseId).replace('{2}', trCodeLang), 'racingNotes', 680, 440, 1, 1);
}

function getPeNoteIcon(type, horseId) {
    switch (type) {
        case 1:
            return '<div class="peNoteAddIcon" title="' + lblRacingNotesNobr[curLang] + '" onclick="goPeNoteUrl(event, jsPenoteCreateNoteUrl, \'' + horseId + '\');"></div>';
        case 2:
            return '<div class="peNoteUpdateIcon" title="' + lblRacingNotesNobr[curLang] + '" onclick="goPeNoteUrl(event, jsPenoteViewNoteUrl, \'' + horseId + '\');"></div>';
        case 3:
            return '<div class="peNoteImportantIcon" title="' + lblRacingNotesNobr[curLang] + '" onclick="goPeNoteUrl(event, jsPenoteViewNoteUrl, \'' + horseId + '\');"></div>';
        default:
            break;
    }
    return '';
}

function getPeNoteType(peNoteList, horseId) {
    if (peNoteList.data != null && peNoteList.data.index != null) {
        for (var idx in peNoteList.data.index) {
            if (horseId == peNoteList.data.index[idx].horseId) {
                if (peNoteList.data.index[idx].isImportant)
                    return 3;
                else if (peNoteList.data.index[idx].hasNote)
                    return 2;
                break;
            }
        }
        return 1;
    }
    return 0;
}

function showPeNoteIconCol(tbObjList) {
    if (isOverseaMeeting)
        return false;

    switch (pageName) {
        case "RACECARD":
            for (var i = 0; i < normalRunnerList[curRaceNo].length; i++) {
                if (normalRunnerList[curRaceNo][i].peNoteType > 0)
                    return true;
            }
            if (typeof(standbyRunnerList) != 'undefined') {
                for (var i = 0; i < standbyRunnerList.length; i++) {
                    if (standbyRunnerList[i].peNoteType > 0)
                        return true;
                }
            }
            break;
        default:
            for (var i = 0; i < normalRunnerList[curRaceNo].length; i++) {
                if (normalRunnerList[curRaceNo][i].peNoteType > 0)
                    return true;
            }
            break;
    }
    return false;
}

function resetAllPeIcon(peNoteList) {
    for (var i = 0; i < normalRunnerList[curRaceNo].length; i++) {
        var tmpItem = normalRunnerList[curRaceNo][i];
        normalRunnerList[curRaceNo][i].peNoteType = getPeNoteType(peNoteList, normalRunnerList[curRaceNo][i].horseId);
    }
    if (pageName == "RACECARD") {
        for (var i = 0; i < standbyRunnerList.length; i++) {
            var tmpItem = standbyRunnerList[i];
            standbyRunnerList[i].peNoteType = getPeNoteType(peNoteList, standbyRunnerList[i].horseId);
        }
    }
    refreshWPTable();
    loadRaceColorIndex();
}

function showAllUPCheckbox() {
    switch (pageName) {
        case 'CWA':
        case 'WP':
        case 'WPQ':
        case 'XPOOL':
        case 'TRI':
        case 'JTCOMBO':
            $('.allupChkBox').css('display', 'inline-block');
            break;
        case 'FCT':
            if (GetXPoolAllUpEnabled('FCT')) {
                $('.allupChkBox').css('display', 'inline-block');
            }
            break;
    }
}

function refreshWPTable() {
    showAllUPCheckbox();

    if (cwinTableRS != null)
        cwinTableRS.forceUpdate();
    if (wpTableRS == null)
        return;

    switch (pageName) {
        case 'CWIN':
        case 'RACECARD':
        case 'WP':
        case 'WPQ':
        case 'IWN':
        case 'PWIN':
        case 'JTCOMBO':
        case 'FCT':
        case 'TRI':
        case 'TCE':
        case 'F-F':
        case 'QTT':
            wpTableRS.forceUpdate();
            break;
        case 'DBL':
        case 'TBL':
        case 'D-T':
        case 'T-T':
        case '6UP':
        case 'XPOOL':
            for (var i in wpTableRS) {
                wpTableRS[i].forceUpdate();
            }
            break;
    }
}

function addHRBetObj(bTyp, subTyp, rNo, sels, unitBet, flexibet) {
    var betObj = new FOBetObj('HR', bTyp, false);
    betObj.allup = GetXPoolAllUpEnabled(bTyp);
    betObj.flexibet = flexibet;
    betObj.unitBet = unitBet;
    betObj.venueid = mtgVenue;
    betObj.venueE = venueLongEn;
    betObj.venueC = venueLongCh;
    betObj.dayid = dayShort;
    betObj.dayE = dayLongEn;
    betObj.dayC = dayLongCh;
    betObj.pdId = '';
    betObj.pdDate = racePostTime[rNo];
    betObj.stopsellDT = racePostTime[rNo];
    betObj.remark = '';
    betObj.isRandGen = ranGenFlag;

    var poolObj = new FOPoolObj();
    poolObj.bType = bTyp;
    poolObj.poolid = bTyp + subTyp;
    poolObj.poolShortE = shortPoolNamesEn[poolObj.poolid];
    poolObj.poolShortC = shortPoolNamesCh[poolObj.poolid];
    poolObj.poolLongE = longPoolNamesEn[poolObj.poolid];
    poolObj.poolLongC = longPoolNamesCh[poolObj.poolid];
    switch (bTyp) {
        case 'JKC':
        case 'TNC':
            poolObj.insNo = wpTableRS.state.foInfo.instanceNo;
            poolObj.poolid = wpTableRS.state.foInfo.poolId;
            poolObj.dayid = wpTableRS.state.foInfo.MEETING_DT_S.substring(0, 2) + '/' + wpTableRS.state.foInfo.MEETING_DT_S.substring(2, 4) + '/' + wpTableRS.state.foInfo.MEETING_DT_S.substring(4, 8)
            break;
        default:
            poolObj.raceno = rNo;
            poolObj.fs = fieldSizeWithReserve[rNo];
            poolObj.fsNoScrRes = fieldSizeExcludeScratchAndReserve[rNo];
            break;
    }
    betObj.pools.push(poolObj);

    if (sels.b1Arr != null)
        poolObj.bankers = getHRCombArr(bTyp, rNo, sels.b1Arr, sels.b1Field);
    if (sels.b2Arr != null)
        poolObj.bankers2 = getHRCombArr(bTyp, rNo, sels.b2Arr, sels.b2Field);
    if (sels.b3Arr != null)
        poolObj.bankers3 = getHRCombArr(bTyp, rNo, sels.b3Arr, sels.b3Field);
    poolObj.combs = getHRCombArr(bTyp, rNo, sels.lArr, sels.lField);

    return betObj;
}

function getHRCombArr(bTyp, rNo, sArr, sField) {
    var arr = [];
    if (sField) {
        arr.push(getHRCombObj('F', 'F', 'F', labelFieldEn, labelFieldCh));
    } else {
        for (var i in sArr) {
            if (sArr[i]) {
                switch (bTyp) {
                    case 'CWA':
                    case 'CWB':
                    case 'CWC':
                        var cDtls = $.grep(cwinInfo, function(_obj) {
                            return _obj.raceNo == rNo;
                        })[0];
                        var cSel = $.grep(cDtls.sels, function(_obj) {
                            return _obj.selStr == i;
                        })[0];
                        var rArrE = [];
                        var rArrC = [];
                        for (var idx in cSel.runners) {
                            var runner = $.grep(normalRunnerList[rNo], function(_obj) {
                                return _obj.num == cSel.runners[idx];
                            })[0];
                            rArrE.push(runner.num + ' ' + runner.nameEn);
                            rArrC.push(runner.num + ' ' + runner.nameCh);
                        }
                        var combE = '(' + cSel.selEN + '): (' + rArrE.join('+') + ')';
                        combE = combE.replace("()", "");
                        var combC = '(' + cSel.selCH + '): (' + rArrC.join('+') + ')';
                        combC = combC.replace("()", "");
                        var combObj = getHRCombObj(i, '', '', combE, combC);
                        combObj.composite = compositeLbl + " ";
                        arr.push(combObj);
                        break;
                    case 'JKC':
                    case 'TNC':
                        var sel = $.grep(wpTableRS.state.foInfo.S, function(_obj) {
                            return _obj.num == parseInt(i.replace('P', ''));
                        })[0];
                        let comb = getHRCombObj(sel.combId, sel.num, sel.num, sel.nameEN, sel.nameCH);
                        comb.lineid = sel.lineId;
                        comb.odds = sel.latestOdds;
                        arr.push(comb);
                        break;
                    default:
                        var runner = $.grep(normalRunnerList[rNo], function(_obj) {
                            return _obj.num == parseInt(i.replace('P', ''));
                        })[0];
                        arr.push(getHRCombObj(runner.num, runner.num, runner.num, runner.nameEn, runner.nameCh));
                        break;
                }
            }
        }
    }
    return arr;
}

function getHRCombObj(id, sE, sC, lE, lC) {
    var combObj = new FOCombObj();
    combObj.combid = id;
    combObj.combShortE = sE;
    combObj.combShortC = sC;
    combObj.combLongE = lE;
    combObj.combLongC = lC;
    return combObj;
}

//# sourceURL=/racing/script/racingCommon.js