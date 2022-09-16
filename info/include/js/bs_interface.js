var cRetCodeFail = 0;
var cRetCodeSuccess = 1;
var cRetCodeOverMax = 2;
var cRetCodeBusy = 3;
var cRetCodeDuplicate = 4;

function addSelExFO(foBetObj) {
    if (betslipState == STATE_IDLEALERT)
        return cRetCodeBusy;

    if (betslipState != STATE_NORMAL) {
        alert(GetError("1201"));
        return cRetCodeBusy;
    }

    // check number of betlines
    if (betlines.length + 1 > cMaxBetlines) {
        alert(GetError("1205"));
        return cRetCodeOverMax;
    }

    if (!IsAllUpEnabled(foBetObj)) {
        return cRetCodeFail;
    }
    if (foBetObj.bType == 'ALUP' && !IsAllUpBetlineEnabled(foBetObj)) {
        return cRetCodeFail;
    }

    if (!IsBetTypeEnabled(foBetObj.bType)) {
        return cRetCodeFail;
    }

    // check unit bet
    if (!foBetObj.flexibet && foBetObj.unitBet > MyParseInt(GetPara("MaxBetUnit"), 50000)) {
        alert(GetError("1206"));
        return cRetCodeFail;
    }

    // check bet buffer size
    if (IsBufferOverflowFO(foBetObj)) {
        alert(GetError("1203"));
        return cRetCodeOverMax;
    }

    // check duplicate bet
    if (IsDuplicateBetFO(foBetObj)) {
        alert(GetError("duplicate_bet_fixed_odds" + foBetObj.prod));
        return cRetCodeDuplicate;
    }

    var betInfo = new BetlineInfo();
    betInfo.foBetObj = foBetObj;

    // prod related checking
    switch (foBetObj.prod) {
        case "HR":
            if (foBetObj.bType == 'ALUP') {
                if (foBetObj.unitBet < psHBArray['ALUPX'].minAmt)
                    foBetObj.unitBet = MyParseInt(GetSetting("UnitBet", "ALUPX", betInfo.family), 10);
            } else if (foBetObj.unitBet < psHBArray[foBetObj.bType].minAmt)
                foBetObj.unitBet = MyParseInt(GetSetting("UnitBet", betInfo.type, betInfo.family), 10);

            // check flexibet
            if ((!foBetObj.isRandGen || foBetObj.bType == 'QTT') && !updateFlexbetFlag(betInfo))
                return cRetCodeFail;
            //if ( !isValidTTQP(betInfo, betLine, isRandGen) )
            //  return cRetCodeFail;
            break;
        case "FB":
            if (foBetObj.inplay && GetFBPara('InPlayBetting') != 1) {
                return cRetCodeFail;
            }
            if (!IsExtraTimeBetEnabled(foBetObj.extraTime)) {
                return cRetCodeFail;
            }
            // check hdc mini amount
            if (foBetObj.bType == "HDC" && foBetObj.unitBet < 200)
                foBetObj.unitBet = 200;

            if (foBetObj.bType == "MSP" && foBetObj.inplay == 1 && GetFBPara("InPlaySpecial") != "1") {
                return cRetCodeFail;
            }

            if (foBetObj.bType == "FGS" && foBetObj.getSelectionSize() > 36) {
                ShowError(1, GetError("1207"), false, 5000);
                return cRetCodeFail;
            }
            break;
        case "MK6":
            if (foBetObj.snowball && GetPara("Snowball") != "1")
                return cRetCodeFail;
            if (foBetObj.multidraw != "" && GetPara("MK6MultiDraw") != "1")
                return cRetCodeFail;
            break;
    }

    if (!foBetObj.allup)
        betInfo.enableAllUp = cAllUpNA;
    else
        betInfo.enableAllUp = GetDynamicAllUpStateFO(foBetObj);

    AppendBetline(betInfo);

    // redraw betline table
    RedrawBetlineTable();
    $('#divBetSlipMinimizeText').html(GetText('minimize_bets') + ' : ' + multiSlipPanel.getTotalCount());

    if (betlines.length > 0) {
        var divBetLayer = $('#divBetLayer');
        divBetLayer.scrollTop(divBetLayer.prop('scrollHeight'));
    }

    // Support SSO
    isClientActionTaken(true);

    return cRetCodeSuccess;
} // addSelExFO

function setXMLObject(label, xmlDoc) {
    switch (label) {
        case "allupformula":
            return SetXML_allupformula(label, xmlDoc);
    }
    return false;
}

function setXmlData(multiRaceLegList, fieldSize, scratchList, reserveList) {
    setMultiRacesPoolDefLegs(multiRaceLegList);
    setFieldSize(fieldSize);
    clearScratch(scratchList);
    setScratch(scratchList);
    setScratch(reserveList);
}

var meetingDt = new Array();

function getMeetingDt(venue) {
    if (venue == "")
        return "";
    return meetingDt[venue];
}

function setMeetingDate(dateList) {
    var str = dateList.split(';');
    for (var i = 0; i < str.length; i++) {
        var subStr = str[i].split('@');
        meetingDt[subStr[0]] = subStr[1];
    }
}

function getCustomerSegment() {
    return customerSegment;
}

function resetIdleTimer() {
    ResetIdleTimer(true);
}

function getUnitBetAmount(betType) {
    return GetSetting('UnitBet', betType, 'FB');
}

function getMinimumUnitBetAmount(pools, family) {
    var minVal = 0;
    var pool = pools.split(';');
    for (var i = 0; i < pool.length; i++) {
        var s = GetSetting("UnitBet", pool[i], family);
        if (!isNaN(s)) {
            if (minVal == 0 || parseInt(s, 10) < minVal)
                minVal = parseInt(s, 10);
        }
    }
    return minVal;
}

function isFlexBetEnabled(pool) { //keep
    var p = (pool.indexOf('ALUP') >= 0) ? 'ALUP' : pool;
    if (GetFlexiPara('HR') && GetFlexiPara(p))
        return true;
    return false;
}

function updateFlexbetFlag(betInfo) { //keep
    if (betInfo.foBetObj.flexibet) {
        if (isFlexBetEnabled(betInfo.foBetObj.bType)) // JCBW flexibet, BetSlip enable
            betInfo.betMethod = 1;
        else { // JCBW flexibet, BetSlip disable
            alert(GetText('disable_flexibet'));
            return false;
        }
    } else {
        if (isFlexBetEnabled(betInfo.foBetObj.bType)) // JCBW unitbet, BetSlip enable
            betInfo.betMethod = 0;
    }
    return true;
}

function GetM6UnitBet(idx) { // 0 = Partial, 1 = Default
    var val = parseInt(GetPara('Mk6DefaultUnitBetAmount'));
    if (idx == 0)
        val = parseInt(GetPara('Mk6PartialUnitBetAmount'));
    if (isNaN(val))
        val = 10;
    return val;
}

function isM6PartialUnitEnabled(pageType) { // pageType: 0 = Any, 1 = Total Banker Spend, 2 = ByProduct Multiple, 3 = ByProduct Banker
    var type1 = GetPara('Mk6TotalBetSpend') == '1';
    var type2 = GetPara('Mk6ByProdMulti') == '1';
    var type3 = GetPara('Mk6ByProdBanker') == '1';
    if (pageType == 1 && type1)
        return '1';
    if (pageType == 2 && type2)
        return '1';
    if (pageType == 3 && type3)
        return '1';
    if (pageType == 0 && (type1 || type2 || type3))
        return '1';
    return '0';
}

function getM6DrawNo() {
    return GetSetting('M6DrawNo');
}

function setMinBet(minbetStr) {
    try {
        var minbets = minbetStr.split(';');
        for (var i = 1; i < minbets.length; i++) {
            var minbetParts = minbets[i].split(':');
            if (minbetParts.length < 2 || minbetParts[1] == '')
                continue;

            var miniAmt = parseInt(minbetParts[1], 10);
            if (minbetParts[0] == 'JKC' || minbetParts[0] == 'TNC' || minbetParts[0] == 'IWN') {
                psHBArray[minbetParts[0]].minAmt = miniAmt
                if (psHBArray[minbetParts[0]].storedAmt < miniAmt)
                    psHBArray[minbetParts[0]].storedAmt = miniAmt;
                if (psHBArray[minbetParts[0]].defAmt < miniAmt)
                    psHBArray[minbetParts[0]].defAmt = miniAmt;
            } else {
                psSBArray[convertInfohubPoolCode(minbetParts[0])].minAmt = miniAmt;
                if (psSBArray[convertInfohubPoolCode(minbetParts[0])].storedAmt < miniAmt)
                    psSBArray[convertInfohubPoolCode(minbetParts[0])].storedAmt = miniAmt;
                if (psSBArray[convertInfohubPoolCode(minbetParts[0])].defAmt < miniAmt)
                    psSBArray[convertInfohubPoolCode(minbetParts[0])].defAmt = miniAmt;
            }
        }
    } catch (e) {}
}

function convertInfohubPoolCode(str) {
    switch (str) {
        case 'FHA':
            return 'FHAD';
        case 'HHA':
            return 'HHAD';
        case 'HIL':
            return 'HILO';
        case 'FHL':
            return 'FHLO';
        case 'FCS':
            return 'FCRS';
        case 'DHC':
            return 'DHCP';
        case 'HFM':
            return 'HFMP6';
        case 'TOF':
            return 'TOFP';
        case 'ADT':
            return 'ADTP';
        case 'CHL':
            return 'CHLO';
        default:
            return str;
    }
}

//webcast functions
function haveWebcastPermission() {
    var IsEnabledELVA = MyParseInt(GetPara("IsEnabledELVA"), 0) == 1 && enableWebcastAccess; //both EWINAS and web.config are enable
    var haveELVAAccess = GetDataStore('have_webcast_access') == '' ? 'N' : GetDataStore('have_webcast_access');
    return IsEnabledELVA && haveELVAAccess == 'Y';
}

var webcastWin = null;

function openWebcastPopup() {
    if (webcastWin != null && !webcastWin.closed)
        webcastWin.close();

    var tWidth = 800;
    var tHeight = 600;
    var tLeft = (screen.width - tWidth) / 2;
    var tTop = (screen.height - tHeight) / 2;
    var sFeatures = "left=" + tLeft + ",top=" + tTop + ",width=" + tWidth + ",height=" + tHeight +
        ",scrollbars=0,status=0,location=0,menubar=0,resizable=1,titlebar=0";
    window.open(url_SSOAuthen4WebcastURL, "_blank");
}

//webtv functions for SB page
function showWebTVIcon() {
    var footballLive = GetDataStore('football_live_ind');
    return footballLive == "Y";
}

function openWebTVWindow(matchid) {
    var webcastWin;
    if (!matchid) {
        webcastWin = window.open(url_FootballLivePath, "_blank");
    } else {
        webcastWin = window.open(url_FootballLivePath + "&matchid=" + matchid, "_blank");
    }
    webcastWin.focus();
}

function isCWinEnabled() {
    return (GetPara("CW") == "1");
}

function isCWinXAllUpEnabled() {
    return (GetPara("CW") == "1" && GetPara("CrossPoolCW") == "1" && GetPara("HorseRaceCrossPool") == "1");
}