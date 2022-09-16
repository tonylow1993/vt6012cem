// START Nielsen Online SiteCensus
var addBetSuccess = false;
// END Nielsen Online SiteCensus
//add slip
var newBetObj = [];

function addslip() {
    if (pageName == 'DHCP') {
        addslipDHCP();
        return;
    }

    var objs = $(".codds input:checked");
    newBetObj = [];

    if (objs.length == 0) {
        return;
    }

    //get page info
    var isMixAllup = false;

    for (i = 0; i < objs.length; i++) {
        oddsValue = $(objs[i]).siblings(".oddsLink").html();
        if ($(objs[i]).parent().is("label") && $(objs[i]).parent().hasClass("labelWrapper")) {
            oddsValue = $(objs[i]).parent().siblings(".oddsLink").html();
        }
        if (oddsValue != null) {
            var idStr = $(objs[i]).attr("id").split("_");
            var isTournament = (idStr[0] == "tourn");

            if (isTournament) {

                var idStr = $(objs[i]).attr("id").split("_");

                var tournPoolType = idStr[1];
                var tournOptionKey = idStr[4];
                var tournID = idStr[2];
                var groupId = idStr[3];
                var poolId = idStr[5];
                var lineId = idStr[6];
                var combId = idStr[7];

                addFBBetObj(tournID, tournPoolType, poolId, lineId, combId, tournOptionKey, true, groupId);
            } else {
                var matchID = idStr[0];
                var oType = idStr[1];
                var validBetline = true;

                var optionKey = idStr[2];
                var itemNo = "";
                if (oType.match(/^(SPC|SGA)$/)) {
                    itemNo = idStr[3];
                }

                var poolId = idStr[4];
                var lineId = idStr[5];
                var combId = idStr[6];

                if (validBetline) {
                    addFBBetObj(matchID, oType, poolId, lineId, combId, optionKey, false, itemNo);
                }
            }
        }
    }

    if (pageName == "MIXALLUP" || pageName == "MIXALLUPSHORTCUT") {
        var selformatVal = $(".mcSelFormula:first").val().toLowerCase();
        newBetObj = combineAllUpBet(newBetObj, selformatVal);
    }

    if (isQRPortal && newBetObj.length > 1) {
        alert(jsOnlyOneBetline);
        return;
    }

    $.each(newBetObj, function(i, obj) {

        var poolCount = obj.pools.length;
        let isOutOfMaxLeg = false
        $.each(obj.pools, function(j, pool) {
            var letsLimit = formatAllupLegs(pool.bType, "js");
            if ((pageName == "MIXALLUP" || pageName == "MIXALLUPSHORTCUT") && letsLimit != null && poolCount > letsLimit) {
                alert(jsmixallupNsel.replace("{0}", letsLimit));
                isOutOfMaxLeg = true;
                return false;
            }
        });

        if (isOutOfMaxLeg)
            return false;

        for (var j = 0; j < obj.pools.length; j++) {
            switch (obj.pools[j].bType) {
                case 'TQL':
                case 'CHP':
                case 'GPF':
                case 'GPW':
                case 'TPS':
                    obj.pools[j].combs.sort(sortSel);
                    break;
                default:
                    obj.pools[j].combs.sort(sortComb);
            }
        }

        var addedBet = addSelExFO(obj);
        if (addedBet == 1) {
            //clear checkbox
            $(".codds input:checked").each(function() {
                if (pageName == "MIXALLUP") {
                    $(this).click();
                    $(this).blur();
                } else {
                    if (this.id.indexOf(obj.pools[0].poolid) >= 0) {
                        $(this).click();
                        $(this).blur();
                    }
                }
            });
            clearCaculator($(".tblMixCal"));
            addBetSuccess = true;
        } else if (addedBet == 2 || addedBet == 3) {
            addBetSuccess = false;
            return false;
        } else {
            addBetSuccess = false;
        }
    });
}

// clear the Investment Calculator value, for page odds_mixallup_all.aspx
function clearCaculator(caculatorObj) {
    //var calcuText = $(".tblMixCal");
    if (caculatorObj != null && caculatorObj != 'undefined') {
        caculatorObj.find("span").each(function() {
            //alert($(this).text());
            $(this).text("-");
        })
    }
}

function convertToShortContent(content) {
    switch (content.toLowerCase()) {
        case "home":
            content = "H";
            break;
        case "away":
            content = "A";
            break;
        case "draw":
            content = "D";
            break;
    }
    return content;
}

String.prototype.encodeHtml = function() {
    return this.replace(/[<>]/g, function(i) {
        switch (i) {
            case "<":
                return "\&lt;";
            case ">":
                return "\&gt;";
        }
    });
};

function addFBBetObj(betValueId, bTyp, poolId, lineId, combId, selKey, isTourn, groupId) {
    var combObj = new FOCombObj();
    combObj.combid = combId;
    combObj.combShortE = getFBCombStr(betValueId, bTyp, poolId, groupId, selKey, 'en');
    combObj.combShortC = formatHADStr(getFBCombStr(betValueId, bTyp, poolId, groupId, selKey, 'ch'), 'ch');
    combObj.combLongE = formatHADStrLong(combObj.combShortE, 'en');
    combObj.combLongC = combObj.combShortC;
    if (bTyp == "SGA") {
        combObj.combShortE = combObj.combShortE.split('.')[0].encodeHtml();
        combObj.combShortC = combObj.combShortC.split('.')[0].encodeHtml();
        combObj.combLongE = combObj.combLongE.encodeHtml();
        combObj.combLongC = combObj.combLongC.encodeHtml();
    }
    combObj.lineid = lineId;
    combObj.line = getLine(betValueId, bTyp, selKey, lineId, true);
    combObj.goalline = getGoalLine(betValueId, bTyp, selKey, lineId, true);
    combObj.odds = getOdds(betValueId, bTyp, poolId, selKey, lineId);
    combObj.selKey = selKey;

    var betObj = $.grep(newBetObj, function(_obj) {
        return _obj.pools[0].poolid == poolId;
    })[0];
    if (betObj == null) {
        var poolObj = new FOPoolObj();
        if (pageName.match(/^(ALL|INPLAYALL)$/) && bTyp.match(/^(CHP|TQL)$/)) {
            poolObj.feid = betValue[betValueId].tournament.frontEndId;
        } else {
            poolObj.feid = betValue[betValueId].frontEndId;
        }
        poolObj.bType = bTyp;
        poolObj.poolid = poolId;
        poolObj.poolShortE = convertPoolName(bTyp);
        poolObj.poolShortC = GetResourcesByLang(bTyp, "ch");
        poolObj.poolLongE = GetResourcesByLang(bTyp, "en");
        poolObj.poolLongC = GetResourcesByLang(bTyp, "ch");
        switch (poolObj.bType) {
            case 'TQL':
            case 'SGA':
                poolObj.insNo = getInsNo(betValueId, bTyp, poolId);
                break;
            case 'SPC':
            case 'MSP':
                poolObj.poolShortC += groupId;
                poolObj.poolShortE += groupId;
                poolObj.poolLongE += getSPCQuestion(betValueId, bTyp, groupId, 'EN');
                poolObj.poolLongC += getSPCQuestion(betValueId, bTyp, groupId, 'CH');
                poolObj.insNo = getInsNo(betValueId, bTyp, poolId);
                break;
            case 'TSP':
                poolObj.poolLongE += getSPCQuestion(betValueId, bTyp, groupId, 'EN');
                poolObj.poolLongC += getSPCQuestion(betValueId, bTyp, groupId, 'CH');
                poolObj.insNo = getInsNo(betValueId, bTyp, poolId);
                break;
            case 'GPF':
            case 'GPW':
                poolObj.insNo = getInsNo(betValueId, bTyp, poolId);
                poolObj.poolLongE += " " + poolObj.insNo + " " + getGroupName(betValueId, bTyp, groupId, "EN");
                poolObj.poolLongC += poolObj.insNo + " " + getGroupName(betValueId, bTyp, groupId, "CH");
                break;
            case 'NTS':
            case 'ENT':
                poolObj.poolShortE += getGoalNo(betValueId, bTyp, "EN");
                poolObj.poolShortC += getGoalNo(betValueId, bTyp, "CH");
                poolObj.poolLongE += getGoalNo(betValueId, bTyp, "EN");
                poolObj.poolLongC += getGoalNo(betValueId, bTyp, "CH");
                poolObj.insNo = getInsNo(betValueId, bTyp, poolId);
                break;
            case "TPS":
                poolObj.tpsType += "<br />" + GetResourcesByLang(groupId, "");
        }
        if (isTourn) {
            if (pageName == "ALL" || pageName == "INPLAYALL") {
                poolObj.tournCode = betValue[betValueId].tournament.tournamentShortName;
                poolObj.tournE = betValue[betValueId].tournament.tournamentNameEN;
                poolObj.tournC = betValue[betValueId].tournament.tournamentNameCH;
                poolObj.groupId = groupId;
            } else {
                poolObj.tournCode = betValue[betValueId].tournamentShortName;
                poolObj.tournE = betValue[betValueId].tournamentNameEN;
                poolObj.tournC = betValue[betValueId].tournamentNameCH;
                poolObj.groupId = groupId;
            }
        } else {
            poolObj.homeE = betValue[betValueId].homeTeam.teamNameEN;
            poolObj.homeC = betValue[betValueId].homeTeam.teamNameCH;
            poolObj.awayE = betValue[betValueId].awayTeam.teamNameEN;
            poolObj.awayC = betValue[betValueId].awayTeam.teamNameCH;
            poolObj.tournCode = betValue[betValueId].tournament.tournamentShortName;
            poolObj.tournE = betValue[betValueId].tournament.tournamentNameEN;
            poolObj.tournC = betValue[betValueId].tournament.tournamentNameCH;
        }
        poolObj.combs.push(combObj);

        betObj = new FOBetObj('FB', bTyp, isTourn);
        betObj.allup = getAllUp(betValueId, bTyp, poolId);
        betObj.inplay = getInplayDelay(betValueId, bTyp, poolId);
        betObj.unitBet = getUnitBet('FB', bTyp);
        betObj.pdId = poolObj.feid;
        try {
            if (isTourn) {
                betObj.pdDate = getTournStopSellTime(betValueId, bTyp, poolId);
            } else {
                betObj.pdDate = betValue[betValueId].matchTime.substring(0, 16).replace('T', ' ');
            }
        } catch (e) {}
        betObj.stopsellDT = betObj.pdDate.substring(0, 10);
        betObj.remark = poolObj.homeE + '(Home) vs ' + poolObj.awayE + '(Away)';
        betObj.extraTime = bTyp.match(/^(EHA|EDC|EHL|ECH|ECS|ETG|ENT)$/) != null;

        betObj.pools.push(poolObj);
        newBetObj.push(betObj);
    } else {
        var poolObj = betObj.pools[0];
        poolObj.combs.push(combObj);
    }
    return betObj;
}

function getFBCombStr(betValueId, bTyp, poolId, groupId, selKey, lang) {
    var globalResKey = selKey;
    switch (bTyp) {
        case "FTS":
        case "NTS":
        case "ENT":
            if (selKey == "N")
                globalResKey = "nogoal";
            break;
        case "HIL":
        case "EHL":
        case "FHL":
        case "CHL":
        case "ECH":
            if (selKey == "H")
                globalResKey = "high";
            else if (selKey == "L")
                globalResKey = "low";
            break;
        case "CRS":
        case "FCS":
        case "ECS":
            if (selKey == "SM1MH") {
                globalResKey = "homeothers";
            } else if (selKey == "SM1MD") {
                globalResKey = "drawothers";
            } else if (selKey == "SM1MA") {
                globalResKey = "awayothers";
            } else {
                return selKey.substr(2, 1) + ":" + selKey.substr(4, 1);
            }
            break;
        case "OOE":
            if (selKey == "O")
                globalResKey = "odd";
            else if (selKey == "E")
                globalResKey = "even";
            break;
        case "TTG":
        case "ETG":
            globalResKey = selKey.substr(1, 1);
            if (globalResKey == "7") {
                globalResKey = "7+";
            }
            break;
        case "FGS":
            if (selKey == "000") {
                globalResKey = "00";
            } else {
                globalResKey = selKey;
            }
            globalResKey += " " + $.grep(betValue[betValueId]["fgsodds"].SELLIST, function(_sel) {
                return _sel.SEL == selKey;
            })[0]['CONTENT' + lang.toUpperCase()];
            break;
        case "HFT":
            globalResKey = "hft" + selKey;
            break;
        case "SPC":
        case "MSP":
            var _item = $.grep(betValue[betValueId]["spcodds"], function(_sel) {
                return _sel.ITEM == groupId;
            })[0];
            globalResKey = "(" + parseInt(selKey, 10) + ")" + $.grep(_item.SELLIST, function(_sel) {
                return _sel.SEL == selKey;
            })[0]['CONTENT' + lang.toUpperCase()];
            break;
        case "SGA":
            var _item = $.grep(betValue[betValueId]["sgaodds"], function(_sel) {
                return _sel.ITEM == groupId;
            })[0];
            globalResKey = _item.ITEM + ' ' + _item.SELLIST[0]['CONTENT' + lang.toUpperCase()];
            break;
        case "CHP":
            globalResKey = removeLeadingZero(selKey) + " " + $.grep(betValue[betValueId][bTyp.toLowerCase() + "odds"].SELLIST, function(_sel) {
                return _sel.SEL == selKey;
            })[0]['CONTENT' + lang.toUpperCase()];
            break;
        case "TQL":
            var group = [];
            if (pageName == "ALL" || pageName == "INPLAYALL")
                group = betValue[betValueId][bTyp.toLowerCase() + "odds"].POOLID == poolId ? betValue[betValueId][bTyp.toLowerCase() + "odds"] : null;
            else
                group = $.grep(betValue[betValueId][bTyp.toLowerCase() + "odds"], function(_sel) {
                    return _sel.POOLID == poolId;
                })[0];
            //globalResKey = selKey == "1" ? group.homeTeam["teamName" + lang.toUpperCase()] : group.awayTeam["teamName" + lang.toUpperCase()];

            var team = $.grep(group.SELLIST, function(_sel) {
                return _sel.SEL == selKey;
            })[0];
            globalResKey = group.awayTeam.teamID == team.TEAMID ? group.awayTeam["teamName" + lang.toUpperCase()] : group.homeTeam["teamName" + lang.toUpperCase()];
            break;
        case "GPW":
            var group = $.grep(betValue[betValueId][bTyp.toLowerCase() + "odds"], function(_sel) {
                return _sel.GROUP == groupId;
            })[0];
            globalResKey = removeLeadingZero(selKey) + " " + $.grep(group.SELLIST, function(_sel) {
                return _sel.SEL == selKey;
            })[0]['CONTENT' + lang.toUpperCase()];
            break;
        case "TSP":
            var group = $.grep(betValue[betValueId][bTyp.toLowerCase() + "odds"], function(_sel) {
                return _sel.ITEM == groupId;
            })[0];
            globalResKey = removeLeadingZero(selKey) + " " + $.grep(group.SELLIST, function(_sel) {
                return _sel.SEL == selKey;
            })[0]['CONTENT' + lang.toUpperCase()];
            break;
        case "GPF":
            var group = $.grep(betValue[betValueId][bTyp.toLowerCase() + "odds"], function(_sel) {
                return _sel.GROUP == groupId;
            })[0];
            var pos1 = removeLeadingZero(selKey.substring(0, 2));
            var pos2 = removeLeadingZero(selKey.substring(2, 4));
            globalResKey = pos1 + " " + $.grep(group.NAMELIST, function(_sel) {
                    return _sel.NO == pos1;
                })[0][lang.toUpperCase()] +
                " - " + pos2 + " " + $.grep(group.NAMELIST, function(_sel) {
                    return _sel.NO == pos2;
                })[0][lang.toUpperCase()];
            break;
        case "TPS":
            var group = $.grep(betValue[betValueId][bTyp.toLowerCase() + "odds"], function(_sel) {
                return _sel.TPSTYPE.toLowerCase() == groupId;
            })[0];
            globalResKey = removeLeadingZero(selKey) + " " + $.grep(group.SELLIST, function(_sel) {
                return _sel.SEL == selKey;
            })[0]['CONTENT' + lang.toUpperCase()];
            break;
    }
    return GetBetlineResources(globalResKey, lang);
}

function formatHADStr(content, lang) {
    switch (content) {
        case "H":
            content = GetBetlineResources("homecomb", lang);
            break;
        case "A":
            content = GetBetlineResources("awaycomb", lang);
            break;
        case "D":
            content = GetBetlineResources("drawcomb", lang);
            break;
    }
    return content;
}

function formatHADStrLong(content, lang) {
    switch (content) {
        case "H":
            content = GetBetlineResources("Home", lang);
            break;
        case "A":
            content = GetBetlineResources("Away", lang);
            break;
        case "D":
            content = GetBetlineResources("Draw", lang);
            break;
    }
    return content;
}

function getAllUp(betValueId, bTyp, poolId) {
    var poolObj = betValue[betValueId][bTyp.toLowerCase() + "odds"];
    if (poolObj.length != null) {
        poolObj = $.grep(betValue[betValueId][bTyp.toLowerCase() + "odds"], function(_sel) {
            return _sel.POOLID == poolId;
        })[0];
    }
    return poolObj.ALLUP == 'true';
}

function getInplayDelay(betValueId) {
    return betValue[betValueId] != null && betValue[betValueId].inplaydelay == 'true';
}

function getLine(betValueId, bTyp, selKey, lineid, withBracket) {
    var poolObj = betValue[betValueId][bTyp.toLowerCase() + "odds"];
    var line = getGoalLine(betValueId, bTyp, selKey, lineid, withBracket);
    if (line != '') {
        return line;
    } else if (bTyp.match(/^(HDC|EDC|HHA)$/)) {
        var k = selKey;
        if (k == 'D')
            k = 'H';
        if (poolObj[k + 'G'] != null)
            return withBracket ? '[' + poolObj[k + 'G'] + ']' : poolObj[k + 'G'];
    }
    return "";
}

function getGoalLine(betValueId, bTyp, selKey, lineid, withBracket) {
    var poolObj = betValue[betValueId][bTyp.toLowerCase() + "odds"];
    if (poolObj.LINELIST != null) {
        var lineObj = $.grep(poolObj.LINELIST, function(_sel) {
            return _sel.LINEID == lineid;
        })[0];
        return withBracket ? '[' + lineObj['LINE'] + ']' : lineObj['LINE'];
    }
    return "";
}

function getOdds(betValueId, bTyp, poolId, selKey, lineid) {
    var poolObj = betValue[betValueId][bTyp.toLowerCase() + "odds"];
    if (poolObj.length != null) {
        poolObj = $.grep(poolObj, function(_sel) {
            return _sel.POOLID == poolId;
        })[0];
    }
    if (poolObj.LINELIST != null) {
        var lineObj = $.grep(poolObj.LINELIST, function(_sel) {
            return _sel.LINEID == lineid;
        })[0];
        return lineObj[selKey].split('@')[1];
    } else if (poolObj.SELLIST != null) {
        var selObj = null;
        if (bTyp == "GPF") {
            for (var idx in poolObj.SELLIST) {
                selObj = $.grep(poolObj.SELLIST[idx], function(_sel) {
                    return _sel.SEL.replace(':', '') == selKey;
                })[0];
                if (selObj != null)
                    break;
            }
        } else if (bTyp == "SGA") {
            selObj = poolObj.SELLIST[0];
        } else {
            selObj = $.grep(poolObj.SELLIST, function(_sel) {
                return _sel.SEL.replace(':', '') == selKey;
            })[0];
        }
        return selObj['ODDS'].split('@')[1];
    }
    return poolObj[selKey].split('@')[1];
}

function getSPCQuestion(betValueId, bTyp, groupId, lang) {
    return '<br/>' + groupId + ' ' + $.grep(betValue[betValueId][bTyp.toLowerCase() + "odds"], function(_sel) {
        return _sel.ITEM == groupId;
    })[0]['ITEM' + lang];
}

function getGroupName(betValueId, bTyp, groupId, lang) {
    return ' ' + $.grep(betValue[betValueId][bTyp.toLowerCase() + "odds"], function(_sel) {
        return _sel.GROUP == groupId;
    })[0]["GROUP" + lang];
}

function getInsNo(betValueId, bTyp, poolId) {
    var poolObj = $.grep(betValue[betValueId][bTyp.toLowerCase() + "odds"], function(_sel) {
        return _sel.POOLID == poolId;
    })[0];
    if (poolObj === 'undefined' || poolObj == null)
        poolObj = betValue[betValueId][bTyp.toLowerCase() + "odds"].POOLID == poolId ? betValue[betValueId][bTyp.toLowerCase() + "odds"] : null;
    if (poolObj != null) {
        var c = null;
        switch (bTyp) {
            case 'TQL':
                c = poolObj.CODE;
                break;
            case 'GPF':
            case 'GPW':
                c = poolObj.GROUP;
                break;
            case 'SPC':
            case 'SGA':
            case 'MSP':
            case 'TSP':
            case 'NTS':
            case 'ENT':
                c = poolObj.ITEM;
                break;
        }
        if (c != null)
            return c;
    }
    return "";
}

function getGoalNo(betValueId, bTyp, lang) {
    var gNo = betValue[betValueId][bTyp.toLowerCase() + "odds"].ITEM;
    return getGoalNoByItemNo(gNo, lang);
}

function getGoalNoByItemNo(itemNo, lang) {
    return "(" + (lang.toUpperCase() == "EN" ? jsntsfstparten + itemNo + getNumberSuffix(itemNo) + jsntslastparten : jsntsfstpartch + itemNo + jsntslastpartch) + ")";
}

function getTournStopSellTime(betValueId, bTyp, poolId) {
    var poolObj = betValue[betValueId][bTyp.toLowerCase() + "odds"];
    if (poolObj.length != null) {
        poolObj = $.grep(poolObj, function(_sel) {
            return _sel.POOLID == poolId;
        })[0];
    }
    return poolObj['ExpectedStopTime'].substring(0, 16).replace('T', ' ');
}

function getUnitBet(prod, bTyp) {

    bTyp = translateUnitBetType(bTyp);

    var ub = $(".mcTxtUnitbet:first").val();
    try {
        if (ub == null || parseInt(ub) == NaN) {
            if (bTyp.indexOf("ALUP") >= 0)
                return GetSetting("UnitBet", "ALUPX", prod);
            else

                return GetSetting("UnitBet", bTyp, prod);
        }
    } catch (e) {
        ub = '10';
    }
    return parseInt(ub);
}

function translateUnitBetType(bTyp) {
    var tp = bTyp;
    switch (bTyp) {
        case "EHA":
            tp = "HAD";
            break;
        case "EDC":
            tp = "HDC";
            break;
        case "EHL":
            tp = "HIL";
            break;
        case "ECH":
            tp = "CHL";
            break;
        case "ECS":
            tp = "CRS";
            break;
        case "ENT":
            tp = "NTS";
            break;
        case "ETG":
            tp = "TTG";
            break;
        case "MSP":
        case "TSP":
            tp = "SPC";
    }
    return tp;
}

function toDivCalString(betValueId, bTyp, poolId, lineId, combId, _optionKey, isTourn, _itemNo, insNo) {
    var betObj = betValue[betValueId];
    var poolObj = betObj[bTyp.toLowerCase() + "odds"];
    if (poolObj.length != null) {
        poolObj = $.grep(poolObj, function(_sel) {
            return _sel.POOLID == poolId;
        })[0];
    }
    var obj = [betValueId.substring(0, 8),
        bTyp,
        betObj.matchDay,
        betObj.frontEndId,
        getOdds(betValueId, bTyp, poolId, _optionKey, lineId),
        formatHADStr(getFBCombStr(betValueId, bTyp, poolId, _itemNo, _optionKey, 'en'), 'en'),
        formatHADStr(getFBCombStr(betValueId, bTyp, poolId, _itemNo, _optionKey, 'ch'), 'ch'),
        _optionKey,
        betObj.homeTeam.teamNameEN,
        betObj.homeTeam.teamNameCH,
        betObj.awayTeam.teamNameEN,
        betObj.awayTeam.teamNameCH,
        getLine(betValueId, bTyp, 'H', lineId, false),
        getLine(betValueId, bTyp, 'A', lineId, false),
        betObj.tournament.tournamentShortName,
        betObj.matchID,
        betValue[betValueId].matchTime.substring(0, 16).replace('T', ' '),
        "W",
        poolId,
        lineId,
        combId,
        _itemNo,
        false,
        insNo
    ];
    return JSON.stringify(obj);
}

//# sourceURL=/football/lib/bet.js