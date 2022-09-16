function resetPushSchema() {
    if (schema=='' || oddsPushStatus != "push")
        return;

    if (pushPage.getTable("matches") != null)
        pushPage.removeTable("matches");

    var matches_array = new Array("PAGES");
    schemas_array = new Array();
    if (pageName == "MIXALLUP" || pageName == "MIXALLUPSHORTCUT") {
        var tIds = tMatchID.split(',');
        for (var i = 0; i < tIds.length; i++) {
            schemas_array.push("match_" + tIds[i]);
        }
    }
    else if (pageName == "ALL") {
        pushJsonSchema = "match_" + tMatchID;
        schemas_array.push("match_list");
        schemas_array.push("tournament_list");
        schemas_array.push(pushJsonSchema);
    }
    else if (pageName == "INPLAYALL") {
        pushJsonSchema = "match_" + tMatchID;
        schemas_array.push("match_inplay_list");
        schemas_array.push("tournament_inplay_list");
        schemas_array.push(pushJsonSchema);
    }
    else if (pageName == "TOURN") {
        pushJsonSchema = "tournament_" + pTournID;
        schemas_array.push(pushJsonSchema);
    }
    else {
        pushJsonSchema = schema;
        schemas_array.push(pushJsonSchema);
    }
    schemas_array.push("CURRENT_MACHINE");
    schemas_array.push("EMS_STATUS");

    var table = new NonVisualTable(matches_array, schemas_array, "MERGE");
    table.setDataAdapter("MATCH_FO");
    table.setSnapshotRequired(true);
    table.onItemUpdate = pushUpdate;
    pushPage.addTable(table, "matches");
    dateTournaTabInited = true;
}

function pushUpdate(itemPos, updateInfo, itemName) {
    if (updateInfo != null) {
        
        document.getElementById('machineInfo').title = updateInfo.getNewValue('CURRENT_MACHINE');
        
        if (updateInfo.getNewValue('EMS_STATUS') == '0') {
            top.matchEmsStatus = 0;
            AMS.disconnect();
            return;
        }
        var isLoaded = false;
        
        var pushData = [];
        var pushDataMatch = null;
        var pushDataTourn = null;
        
        for (var i = 0; i < schemas_array.length; i++) {
            switch (schemas_array[i]) {
                case "match_list":
                case "match_inplay_list":
                    pushDataMatch = updateInfo.getNewValue(schemas_array[i]);
                    
                    break;
                case "tournament_list":
                case "tournament_inplay_list":
                    pushDataTourn = updateInfo.getNewValue(schemas_array[i]);
                    
                    break;
                case "CURRENT_MACHINE":
                case "EMS_STATUS":                    
                    break;
                default:
                    var pushDataTmp = updateInfo.getNewValue(schemas_array[i]);
                    pushData.push({
                        key: schemas_array[i],
                        val: pushDataTmp
                    });
                    
                    break;
                
            }
            showTabLoading();
            if (i == (schemas_array.length - 1))
            {
                try {
                    for (var j = 0; j < pushData.length; j++) {
                        if (pushData[j].val == "" || pushData[j].val == '[]') {
                            if (pushData[j].key.indexOf("_") > -1) {
                                var type = pushData[j].key.split('_')[0];
                                var tmid = pushData[j].key.split('_')[1];
                                if (type == "match") {
                                    removeMatchFromDataCache(tmid);

                                    if (typeof (allMatchID) != 'undefined' && allMatchID.length > 0) {
                                        var idxTmid = allMatchID.indexOf(tmid);
                                        if (idxTmid >= 0) {
                                            allMatchID.splice(idxTmid, 1);
                                        }
                                    }
                                    var newDataMatch = JSON.parse(pushDataMatch);

                                    for (var iMatch = 0; iMatch < newDataMatch.length; iMatch++) {
                                        if (newDataMatch[iMatch].matchID === tmid) {
                                            newDataMatch.splice(iMatch, 1);

                                            break;
                                        }
                                    }
                                    lastPushUpdate.matches = newDataMatch;
                                }
                                if (type == "tournament") {                                    
                                    if (typeof (dataCache) != 'undefined' && dataCache.length == 1) {
                                        lastPushUpdate = [];
                                    }
                                }
                            }
                        } else {
                            var newData = JSON.parse(pushData[j].val);
                            lastPushUpdate = newData;

                            if (pushDataMatch != null && pushDataMatch != "") {
                                var newDataOrg = JSON.parse(pushData[j].val);
                                var newDataMatch = JSON.parse(pushDataMatch);
                                var rpcId = newData.matches[0].matchID;
                                for (var iMatch = 0; iMatch < newDataMatch.length; iMatch++) {
                                    if (newDataMatch[iMatch].matchID === rpcId) {
                                        newDataMatch[iMatch] = newData.matches[0];
                                        break;
                                    }
                                }
                                newDataMatch = newDataMatch.filter(function (n) { return n != undefined });
                                newDataMatch = newDataMatch.filter(function (n) { return n.matchID != '' });
                                lastPushUpdate.matches = newDataMatch;

                            }
                            if (pushDataTourn != null && pushDataTourn != "") {
                                var newDataOrg = JSON.parse(pushData[j].val);
                                var newDataTourn = JSON.parse(pushDataTourn);
                                var rpcTId = newData.tournaments[0].tournamentID;
                                for (var iTourn = 0; iTourn < newDataTourn.length; iTourn++) {
                                    if (newDataTourn[iTourn].tournamentID === rpcTId) {
                                        newDataTourn[iTourn] = newData.tournaments[0];
                                        break;
                                    }
                                }
                                lastPushUpdate.tournaments = newDataTourn;
                            }
                        }
                        
                      
                        renderPushPortal(lastPushUpdate);
                    }
                } catch (ex) {
                    debugLog("invalid JSON: " + ex);
                } finally {
                    hideTabLoading();
                }
            }
        }
        

        if (pageName != "MIXALLUPLIST")
            displayRemarks();
    }
}
function renderPushPortal(lastUpdate) {
    if ((typeof (lastUpdate) == 'undefined' || lastUpdate == "") && !pageName.match(/^(MIXALLUP|MIXALLUPSHORTCUT|TOURN)$/)) return;
    var newData = lastUpdate;

    if (typeof (lastUpdate) != 'undefined' || lastUpdate != "") {        
        getMatchData(newData);
        getTournaments(newData);
    }
    loadTournamentIdFromQueryString();

    if (pageName == "SPC") {
        dataCache = newData;
        renderSPCTable(dataCache, false);
    } else if (pageName == "SGA") {
        dataCache = newData;
        renderSGATable(dataCache, false);
    }  else if (pageName == "CHP") {
        dataCache = newData;
        renderCHPTable(dataCache, false);
    } else if (pageName == "TQL") {
        dataCache = newData;
        renderTQLTable(dataCache, false);
    } else if (pageName == "MIXALLUP" || pageName == "MIXALLUPSHORTCUT") {
        setNormalMatchFromPushData(newData);
        renderAllMatchAllTable(dataCache, false);
    } else if (pageName != "TOURN") {
        if (pageName == "ALL") {
            setNormalMatchFromPushData(newData);
        }
        else if (pageName == "INPLAYALL") {
            setInplayAllOddsMatchFromPushData(newData);
        }
        else if (pageName == "INDEX" || pageName == "INPLAYHAD" || pageName == "DHCP" || pageName == "HFMP") {
            dataCache = filterDummy(newData);
        }
        else {
            dataCache = newData;
        }
        renderMatchTable(dataCache, false);
    } else {
        dataCache = newData;
        renderTournTable(dataCache, false);
    }
}

function removeReferenceMatch(data) {
    if (data[2].matches == null)
        return;
    for (var i = data[2].matches.length - 1; i>=0; i--) {
        var mId = data[2].matches[i].matchID;
        if (matchExist(data[1].matches, mId))
            data[2].matches.splice(i,1);
    }
}

function matchExist(matchArray, mId) {
    if (matchArray == null)
        return false;
    for (var i = 0; i < matchArray.length; i++) {
        if (matchArray[i].matchID == mId)
            return true;
    }
    return false;
}

function removeMatchFromDataCache(matchId) {
    if (Array.isArray(dataCache)) { //ALLUP
        for (var j = 0; j < dataCache.length; j++) {
            if (dataCache[j].matchID == matchId) {
                dataCache.splice(j, 1);
                break;
            }
        }
    } else {
        for (var i = 0; i < dataCache["matches"].length; i++) {
            if (dataCache["matches"][i].matchID == matchId) {
                dataCache["matches"].splice(i, 1);
                break;
            }
        }
    }
}

function setAllOddsMatchFromPushData(match, anyOddsExist) {
    var notfound = true;
    //dataCache = rawDataForAllOdds;
    if (Array.isArray(dataCache)) { //ALLUP
        for (var j = 0; j < dataCache.length; j++) {
            if (dataCache[j].matchID == match.matchID) {
                if (isValidMatchStatusForNormalMatchList(match.matchStatus) && anyOddsExist) {
                    dataCache[j] = match;
                }
                else {
                    dataCache.splice(j, 1);
                }
                notfound = false;
            }
        }
        if (notfound) dataCache.push(match);
    } else {
        for (var i = 0; i < dataCache["matches"].length; i++) {
            if (dataCache["matches"][i].matchID == match.matchID) {
                if (isValidMatchStatusForNormalMatchList(match.matchStatus) && anyOddsExist) {
                    dataCache["matches"][i] = match;
                }
                else {
                    dataCache["matches"].splice(i, 1);
                }
                notfound = false;
            }
        }
        if (notfound) dataCache["matches"].push(match);
    }    
}

function cloneMatchInfo(match) {
    var cloneMatch = {};
    cloneMatch["matchID"] = match["matchID"];
    cloneMatch["matchIDinofficial"] = match["matchIDinofficial"];
    cloneMatch["matchNum"] = match["matchNum"];
    cloneMatch["matchDate"] = match["matchDate"];
    cloneMatch["matchDay"] = match["matchDay"];
    cloneMatch["homeTeam"] = match["homeTeam"];
    cloneMatch["awayTeam"] = match["awayTeam"];
    cloneMatch["matchStatus"] = match["matchStatus"];
    cloneMatch["matchState"] = match["matchState"];
    cloneMatch["matchTime"] = match["matchTime"];
    cloneMatch["league"] = match["league"];
    cloneMatch["coupon"] = match["coupon"];
    cloneMatch["neutralgroundvenue"] = match["neutralgroundvenue"];
    cloneMatch["statuslastupdated"] = match["statuslastupdated"];
    cloneMatch["accumulatedscore"] = match["accumulatedscore"];
    cloneMatch["definedPools"] = match["definedPools"];
    cloneMatch["inplayPools"] = match["inplayPools"];
    cloneMatch["cornerresult"] = match["cornerresult"];
    cloneMatch["etcornerresult"] = match["etcornerresult"];
    cloneMatch["results"] = match["results"];
    cloneMatch["inplaydelay"] = match["inplaydelay"];
    cloneMatch["channel"] = match["channel"];
    cloneMatch["liveEvent"] = match["liveEvent"];
    cloneMatch['anyInplaySelling'] = match['anyInplaySelling'];
    cloneMatch['tournament'] = match['tournament']; 
    cloneMatch['abandonedscore'] = match['abandonedscore'];
    cloneMatch['channel'] = match['channel'];
    cloneMatch['frontEndId'] = match['frontEndId'];
    cloneMatch['hasExtraTimePools'] = match['hasExtraTimePools'];
    cloneMatch['inplaydelay'] = match['inplaydelay'];
    cloneMatch['venue'] = match['venue'];
    return cloneMatch;
}

function setNormalMatchFromPushData(data) {
    var match = null;
    var tMatchIDArr = null;
    if (tMatchID.indexOf(',') > -1) {
        tMatchIDArr = tMatchID.split(',');
    }
    
    for (mid = 0; mid < data["matches"].length; mid++) {
        if (tMatchIDArr == null) {
            if (tMatchID == data["matches"][mid].matchID) {
                match = data["matches"][mid];
                break;
            }
        } else {
            for (tMid = 0; tMid < tMatchIDArr.length; tMid++) {
                if (tMatchIDArr[tMid] == data["matches"][mid].matchID) {
                    match = data["matches"][mid];
                    break;
                }
            }
        }
    }
    
    
    if (match == null) return;

    var cloneMatch = cloneMatchInfo(match);
    cloneMatch["Cur"] = match["Cur"];
    var anyOddsExist = false;

    if (match['inplayPools'].length == 0 && !isValidMatchStatusForNormalMatchListNonInplayPool(match['matchStatus'])) {
        setAllOddsMatchFromPushData(cloneMatch, false);
        return;
    }

    if (isValidPoolStatusForNormalMatchList(match["hadodds"]) && hasValidOdds(match["hadodds"], "HAD")) {
        cloneMatch["hadodds"] = match["hadodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["ehaodds"]) && hasValidOdds(match["ehaodds"], "EHA")) {
        cloneMatch["ehaodds"] = match["ehaodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["hilodds"]) && hasValidOdds(match["hilodds"], "HIL")) {
        cloneMatch["hilodds"] = match["hilodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["ehlodds"]) && hasValidOdds(match["ehlodds"], "EHL")) {
        cloneMatch["ehlodds"] = match["ehlodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["chlodds"]) && hasValidOdds(match["chlodds"], "CHL")) {
        cloneMatch["chlodds"] = match["chlodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["echodds"]) && hasValidOdds(match["echodds"], "ECH")) {
        cloneMatch["echodds"] = match["echodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["crsodds"]) && hasValidOdds(match["crsodds"], "CRS")) {
        cloneMatch["crsodds"] = match["crsodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["ecsodds"]) && hasValidOdds(match["ecsodds"], "ECS")) {
        cloneMatch["ecsodds"] = match["ecsodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["hhaodds"]) && hasValidOdds(match["hhaodds"], "HHA")) {
        cloneMatch["hhaodds"] = match["hhaodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["hftodds"]) && hasValidOdds(match["hftodds"], "HFT")) {
        cloneMatch["hftodds"] = match["hftodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["fhaodds"]) && hasValidOdds(match["fhaodds"], "FHA")) {
        cloneMatch["fhaodds"] = match["fhaodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["hdcodds"]) && hasValidOdds(match["hdcodds"], "HDC")) {
        cloneMatch["hdcodds"] = match["hdcodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["edcodds"]) && hasValidOdds(match["edcodds"], "EDC")) {
        cloneMatch["edcodds"] = match["edcodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["fhlodds"]) && hasValidOdds(match["fhlodds"], "FHL")) {
        cloneMatch["fhlodds"] = match["fhlodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["fcsodds"]) && hasValidOdds(match["fcsodds"], "FCS")) {
        cloneMatch["fcsodds"] = match["fcsodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["ftsodds"]) && hasValidOdds(match["ftsodds"], "FTS")) {
        cloneMatch["ftsodds"] = match["ftsodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["fgsodds"]) && hasValidOdds(match["fgsodds"], "FGS")) {
        cloneMatch["fgsodds"] = match["fgsodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["ttgodds"]) && hasValidOdds(match["ttgodds"], "TTG")) {
        cloneMatch["ttgodds"] = match["ttgodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["etgodds"]) && hasValidOdds(match["etgodds"], "ETG")) {
        cloneMatch["etgodds"] = match["etgodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["ooeodds"]) && hasValidOdds(match["ooeodds"], "OOE")) {
        cloneMatch["ooeodds"] = match["ooeodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForNormalMatchList(match["chpodds"])) {
        cloneMatch["chpodds"] = match["chpodds"];
        anyOddsExist = true;
    }
    if (match["tqlodds"] != null && match["tqlodds"].length > 0) {
        if (isValidPoolStatusForNormalMatchList(match["tqlodds"][0])) {
            cloneMatch["tqlodds"] = match["tqlodds"][0];
            anyOddsExist = true;
        }
    }

    tmpOdds = getValidStatusSPCPoolForNormalMatch(match["spcodds"]);
    if (tmpOdds != null) {
        cloneMatch["spcodds"] = tmpOdds;
        anyOddsExist = true;
    }
    tmpOdds = getValidStatusSGAPoolForNormalMatch(match["sgaodds"]);
    if (tmpOdds != null) {
        cloneMatch["sgaodds"] = tmpOdds;
        anyOddsExist = true;
    }

    setAllOddsMatchFromPushData(cloneMatch, anyOddsExist);
}

function setInplayAllOddsMatchFromPushData(data) {
    var match;
    for (mid = 0; mid < data["matches"].length; mid++) {
        if (tMatchID == data["matches"][mid].matchID) {
            match = data["matches"][mid];
            break;
        }
    }    
    if (match == null) return;

    var cloneMatch = cloneMatchInfo(match);

    var anyOddsExist = false;

    if (isValidPoolStatusForInplayMatchList(match["hadodds"])) {
        cloneMatch["hadodds"] = match["hadodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["ehaodds"])) {
        cloneMatch["ehaodds"] = match["ehaodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["hilodds"])) {
        cloneMatch["hilodds"] = match["hilodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["ehlodds"])) {
        cloneMatch["ehlodds"] = match["ehlodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["chlodds"])) {
        cloneMatch["chlodds"] = match["chlodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["echodds"])) {
        cloneMatch["echodds"] = match["echodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["crsodds"])) {
        cloneMatch["crsodds"] = match["crsodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["ecsodds"])) {
        cloneMatch["ecsodds"] = match["ecsodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["hhaodds"])) {
        cloneMatch["hhaodds"] = match["hhaodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["hdcodds"])) {
        cloneMatch["hdcodds"] = match["hdcodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["edcodds"])) {
        cloneMatch["edcodds"] = match["edcodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["ttgodds"])) {
        cloneMatch["ttgodds"] = match["ttgodds"];
        anyOddsExist = true;
    }
    if (isValidPoolStatusForInplayMatchList(match["etgodds"])) {
        cloneMatch["etgodds"] = match["etgodds"];
        anyOddsExist = true;
    }

    var tmpOdds = getValidStatusPoolListForInplay(match["ntsodds"], "NTS");
    if (tmpOdds != null) {
        cloneMatch["ntsodds"] = tmpOdds;
        anyOddsExist = true;
    }
    tmpOdds = getValidStatusPoolListForInplay(match["entodds"], "ENT");
    if (tmpOdds != null) {
        cloneMatch["entodds"] = tmpOdds;
        anyOddsExist = true;
    }

    if (isValidPoolStatusForNormalMatchList(match["chpodds"]) && isValidMatchStatusForInplayMatch(match.matchStatus)) {
        cloneMatch["chpodds"] = match["chpodds"];
        anyOddsExist = true;
    }

    if (match["tqlodds"] != null && match["tqlodds"].length > 0) {
        if (isValidMatchStatusForInplayMatch(match.matchStatus)) {
            cloneMatch["tqlodds"] = match["tqlodds"][0];
            anyOddsExist = true;
        }
    }
    
    if (!is1stHalfResultFinal(cloneMatch) && isValidPoolStatusForInplayMatchList(match["fcsodds"])) {
        cloneMatch["fcsodds"] = match["fcsodds"];
        anyOddsExist = true;
    }

    if (!is1stHalfResultFinal(cloneMatch) && isValidPoolStatusForInplayMatchList(match["fhaodds"])) {
        cloneMatch["fhaodds"] = match["fhaodds"];
        anyOddsExist = true;
    }

    if (!is1stHalfResultFinal(cloneMatch) && isValidPoolStatusForInplayMatchList(match["fhlodds"])) {
        cloneMatch["fhlodds"] = match["fhlodds"];
        anyOddsExist = true;
    }

    setAllOddsMatchFromPushData(cloneMatch, anyOddsExist);
}

function isValidMatchStatusForNormalMatchListNonInplayPool(status) {
    return "Initial" == status
        || "Defined" == status;
}

function isValidMatchStatusForNormalMatchList(status) {
    return "Initial" == status
        || "Defined" == status
        || "Closed" == status
        || "ResultIn" == status
        || "Abandoned" == status;
}

function isValidMatchStatusForInplayMatch(status) {
    return "Initial" == status
        || "Defined" == status
        || "Closed" == status
        || "ResultIn" == status;
}

function isValidPoolStatusForInplayMatchList(dict) {
    return dict != null && dict["INPLAY"] == "true" && isValidPoolStatusForNormalMatchList(dict);
}

function isValidPoolStatusForNormalMatchList(dict) {
    if (dict == null || dict["POOLSTATUS"]==null)
        return false;

    var status = dict["POOLSTATUS"];
    return "Initial" == status
        || "Defined" == status
        || "Selling" == status
        || "NotSelling" == status
        || "FinalStopSell" == status
        || "RefundBeforeClosed" == status;
}

function getValidStatusPoolListForInplay(dicts, betType) {
    if (dicts == null)
        return null;

    var newDicts = new Array();
    for(var idx in dicts) {
        if (isValidPoolStatusForInplayMatchList(dicts[idx])
            && hasValidOdds(dicts[idx], betType))
            newDicts.push(dicts[idx]);
    }
    if (newDicts.length > 0)
        return newDicts;
    return null;
}

function getValidStatusSGAPoolForNormalMatch(dicts) {
    if (dicts == null)
        return null;

    var newDicts = new Array();
    for (var idx in dicts) {
        if (isValidPoolStatusForNormalMatchList(dicts[idx]) && hasValidOdds(dicts[idx], "SGA"))
            newDicts.push(dicts[idx]);
    }
    if (newDicts.length > 0)
        return newDicts;
    return null;
}
function getValidStatusSPCPoolForNormalMatch(dicts) {
    if (dicts == null)
        return null;

    var newDicts = new Array();
    for(var idx in dicts) {
        if (isValidPoolStatusForNormalMatchList(dicts[idx]) && hasValidOdds(dicts[idx], "SPC"))
            newDicts.push(dicts[idx]);
    }
    if (newDicts.length > 0)
        return newDicts;
    return null;
}
function getValidStatusSGAPoolForInplay(dicts) {
    if (dicts == null)
        return null;

    var newDicts = new Array();
    for (var idx in dicts) {
        if (isValidPoolStatusForInplayMatchList(dicts[idx]))
            newDicts.push(dicts[idx]);
    }
    if (newDicts.length > 0)
        return newDicts;
    return null;
}
function getValidStatusSPCPoolForInplay(dicts) {
    if (dicts == null)
        return null;

    var newDicts = new Array();
    for (var idx in dicts) {
        if (isValidPoolStatusForInplayMatchList(dicts[idx]))
            newDicts.push(dicts[idx]);
    }
    if (newDicts.length > 0)
        return newDicts;
    return null;
}

function is1stHalfResultFinal(match) {
    if (match["accumulatedscore"] != null) {
        for (var idx in match["accumulatedscore"]) {
            if ("FirstHalf" == match["accumulatedscore"][idx].periodvalue
                && "ResultFinal" == match["accumulatedscore"][idx].periodstatus)
                return true;
        }
    }
    return false;
}

function updatePushAllOdds() {
    if (oddsPushStatus != 'push')
        return;

    if (pageName != "ALL" && pageName != "INPLAYALL")
        return;

    if (pushPage.getTable("matches") != null)
        pushPage.removeTable("matches");

    var matches_array = new Array("PAGES");
    schemas_array = new Array();
    pushJsonSchema = "match_" + tMatchID;
    schemas_array.push(pushJsonSchema);
    schemas_array.push("CURRENT_MACHINE");

    var table = new NonVisualTable(matches_array, schemas_array, "MERGE");
    //table.setDataAdapter("ODDSPUSHMATCHES");
    table.setDataAdapter("MATCH_FO");
    table.setSnapshotRequired(true);
    table.onItemUpdate = pushUpdate;
    pushPage.addTable(table, "matches");
    dateTournaTabInited = true;
}

function hasValidOdds(poolDict, betType) {
    if (poolDict == null)
        return false;

    switch (betType) {
        case "HAD":
        case "EHA":
        case "FHA":
        case "HHA":
        case "HDC":
        case "EDC":
        case "FTS":
        case "NTS":
        case "ENT":
        case "TQL":
            return poolDict["H"]!=null;
        case "HIL":
        case "EHL":
        case "FHL":
        case "CHL":
        case "ECH":
            return poolDict["LINELIST"] != null && poolDict["LINELIST"].length > 0;
        case "CRS":
        case "ECS":
        case "FCS":
            return poolDict["S0000"]!=null;
        case "OOE":
            return poolDict["O"]!=null;
        case "TTG":
        case "ETG":
            return poolDict["P0"]!=null;
        case "HFT":
            return poolDict["HH"]!=null;
        case "FGS":
        case "SPC":
        case "SGA":
            return poolDict["SELLIST"] != null && poolDict["SELLIST"].length > 0;
        default:
            break;
    }
    return false;
}

function filterSPCData(data, isIPSPC) {
    if (!isIPSPC)
        return data;

    var nData = [];
    for (var idx = 0; idx < data.length; idx++) {
        var spcData = [];
        for (idy = 0; idy < data[idx].spcodds.length; idy++) {
            if (data[idx].spcodds[idy].INPLAY == "true") {
                spcData.push(data[idx].spcodds[idy]);
            }
        }
        if (spcData.length > 0) {
            data[idx].spcodds = spcData;
            nData.push(data[idx]);
        }
    }
    return nData;
}
function filterSGAData(data, isIPSGA) {
    if (!isIPSGA)
        return data;

    var nData = [];
    for (var idx = 0; idx < data.length; idx++) {
        var sgaData = [];
        for (idy = 0; idy < data[idx].sgaodds.length; idy++) {
            if (data[idx].sgaodds[idy].INPLAY == "true") {
                sgaData.push(data[idx].sgaodds[idy]);
            }
        }
        if (sgaData.length > 0) {
            data[idx].sgaodds = sgaData;
            nData.push(data[idx]);
        }
    }
    return nData;
}

function getEmptyNTSList()
{
    var poolList = new Array();
    var poolDict = {};
    poolDict["A"] = "000@0.0";
    poolDict["N"] = "000@0.0";
    poolDict["H"] = "000@0.0";
    poolDict["POOLSTATUS"] = "Initial";
    poolDict["INPLAY"] = "true";
    poolDict["ALLUP"] = "true";
    poolDict["ITEM"] = "1";
    poolDict["Cur"] = "0";
    poolList.push(poolDict);
    return poolList;
}

function isAnyOddsExist(match) {
    var anyOddsExist = match.hadodds != null
        || match.ehaodds != null
        || match.fhaodds != null
        || match.crsodds != null
        || match.ecsodds != null
        || match.fcsodds != null
        || match.ftsodds != null
        || match.tqlodds != null
        || match.ooeodds != null
        || match.ttgodds != null
        || match.etgodds != null
        || match.hftodds != null
        || match.hhaodds != null
        || match.hdcodds != null
        || match.edcodds != null
        || match.hilodds != null
        || match.ehlodds != null
        || match.fhlodds != null
        || match.chlodds != null
        || match.echodds != null
        || match.fgsodds != null
        || match.spcodds != null
        || match.sgaodds != null
        || match.ntsodds != null
        || match.entodds != null
        || match.chpodds != null;
    return anyOddsExist;
}

// 1 = selling, 0 = not selling, -1 = other status
function getSellValue(dict) {
    if (dict == null)
        return -1;
    if ("0"==dict["Cur"])
        return -1;

    var status = dict["POOLSTATUS"];
    switch (status) {
        case "Selling":
            return 1;
        case "NotSelling":
        case "FinalStopSell":
        case "Defined":
        case "RefundBeforeClosed":
            return 0;
        default:
            break;
    }
    return -1;
}

// for NTS, ETS, SGA and SPC
function getSellValueFromList(dicts) {
    if (dicts == null)
        return -1;

    for(var idx in dicts) {
        var sVal = getSellValue(dicts[idx]);
        if (sVal > -1)
            return sVal;
    }
    return -1;
}

function anyInplaySelling(m) {
    var sellVal = -1;
    sellVal = Math.max(sellVal, getSellValue(m.hadodds));
    sellVal = Math.max(sellVal, getSellValue(m.ehaodds));
    sellVal = Math.max(sellVal, getSellValue(m.tqlodds));
    sellVal = Math.max(sellVal, getSellValue(m.fhaodds));
    sellVal = Math.max(sellVal, getSellValue(m.ftsodds));
    sellVal = Math.max(sellVal, getSellValueFromList(m.ntsodds));
    sellVal = Math.max(sellVal, getSellValueFromList(m.entodds));
    sellVal = Math.max(sellVal, getSellValue(m.crsodds));
    sellVal = Math.max(sellVal, getSellValue(m.ecsodds));
    sellVal = Math.max(sellVal, getSellValue(m.fcsodds));
    sellVal = Math.max(sellVal, getSellValue(m.hilodds));
    sellVal = Math.max(sellVal, getSellValue(m.ehlodds));
    sellVal = Math.max(sellVal, getSellValue(m.chlodds));
    sellVal = Math.max(sellVal, getSellValue(m.echodds));
    sellVal = Math.max(sellVal, getSellValue(m.fhlodds));
    sellVal = Math.max(sellVal, getSellValue(m.hhaodds));
    sellVal = Math.max(sellVal, getSellValue(m.hdcodds));
    sellVal = Math.max(sellVal, getSellValue(m.edcodds));
    sellVal = Math.max(sellVal, getSellValue(m.ttgodds));
    sellVal = Math.max(sellVal, getSellValue(m.etgodds));
    
    //if ( sellVal > -1 )
    sellVal = Math.max(sellVal, getSellValue(m.chpodds));
    
    return sellVal;
}
function filterDummy(dList) {
    for (var idx = dList["matches"].length - 1; idx >= 0; idx--) {
        if (dList["matches"][idx].matchID && dList["matches"][idx].matchID != '') { } else {
            dList["matches"].splice(idx, 1);
        }
  }
  return dList;
}

//# sourceURL=/football/lib/autorefresh.js