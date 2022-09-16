var formula_mixallup = new Array();
formula_mixallup[0] = "";
formula_mixallup[1] = "";

function initMixallup() {
    var mixAllUpFormal = "2@1,3|3@1,3,4,6,7|4@1,4,5,6,10,11,14,15|5@1,5,6,10,15,16,20,25,26,30,31|6@1,6,7,15,20,21,22,35,41,42,50,56,57,62,63|7@1,7,8,21,35,120,127|8@1,8,9,28,56,70,247,255";

    for (var i = 0; i < mixAllUpFormal.split("|").length; i++) {
        var curkey = mixAllUpFormal.split("|")[i].split("@")[0];
        var curvalue = mixAllUpFormal.split("|")[i].split("@")[1];
        var tmpArry = new Array();
        for (var j = 0; j < curvalue.split(",").length; j++) {
            tmpArry[tmpArry.length] = curkey + "X" + curvalue.split(",")[j];
        }
        formula_mixallup[parseFloat(curkey)] = tmpArry;
    }
}

//check all selected matches for mix all up
function mix_nextstep(ev) {
    cancelPropagation(ev);
    var selectedMatches = [];
    for (var idx in tempMixAlupSelectedList) {
        if (tempMixAlupSelectedList[idx])
            selectedMatches.push(idx.replace('chk', ''));
    }

    if (selectedMatches.length > 1) {
        if (selectedMatches.length > 8) {
            alert(jsMixallOver8);
            return false;
        } else {
            pageName = "MIXALLUP";
            tMatchID = selectedMatches.join(',');
            allMatchID = selectedMatches;
            $('.mixAllUpList').hide();
            $('.mixAllUpContent').show();
            $('.betContent').show();
            getAllUpInfo();
            renderAllTable(true);
        }
    } else {
        alert(jsMixallNoSelction);
        return false;
    }
}

//load default odds selection for mix all up
function loadDefaultOdds() {
    if ($.cookie("chkMixallup") != null && $.cookie("chkMixallup") != "") {
        var chkMixallup = $.cookie("chkMixallup").split(',');
        if ($('#chksel' + chkMixallup[0]).length > 0) {
            chkMixallup.forEach(function(_poolType) {
                $('#chksel' + _poolType).click();
                toggleMixContent($('#chksel' + _poolType), _poolType);
            });
        }
    } else {
        $('#chkselHAD').click();
        toggleMixContent($('#chkselHAD'), 'HAD');
    }
    $("#divLoadMix").hide();
}

//toggle odds content for mix all up
function toggleMixContent(_obj, poolType) {
    var checkedOTypes;
    if ($.cookie("chkMixallup") == null || $.cookie("chkMixallup") == "") {
        checkedOTypes = [];
    } else {
        checkedOTypes = $.cookie("chkMixallup").split(',');
    }
    $("#divLoadMix").show();
    if ($(_obj).is(':checked')) {
        $('.mixOdds' + poolType).show();
        // add to cookies if not exist
        if (checkedOTypes.indexOf(poolType) == -1) {
            checkedOTypes.push(poolType);
        }
    } else {
        $('.mixOdds' + poolType).find('input[type=checkbox]:checked').click();
        $('.mixOdds' + poolType).hide();
        if (checkedOTypes.indexOf(poolType) != -1) {
            removeA(checkedOTypes, poolType);
        }
    }
    $.cookie("chkMixallup", checkedOTypes)
    $("#divLoadMix").hide();
}


//load odds content
function LoadOddsContent(tmatchid, toddstype) {

    var contentid = "#dMix_" + tmatchid + "_" + toddstype;
    var ourl = "display_odds.aspx?tmatchid=" + tmatchid + "&lang=" + jsLang + "&oddsTypeToShow=" + toddstype;

    var $dobj = $(contentid);

    if ($dobj.html() != "") {
        $dobj.show();
    } else {
        $dobj.load(ourl, function() {
            if ($("." + tmatchid + "_inplay").length > 0) {
                var $objs = $("div[id*='dMix_" + tmatchid + "_']");
                $objs.hide();
                var $objInplay = $("div[id*='dMix_" + tmatchid + "_Inplay']");
                $objInplay.show();
                $objInplay.html($objs.find(":nth-child(1)").html());
            }
        });
    }
    $("#divLoadMix").hide();
}

function LoadShortCutOddsContent(tmatchid, toddstype) {
    var arrtoddstype = toddstype.split(',');
    var arrtmatchid = tmatchid.toString().split(',');
    var contentid = [];
    var checkID = [];
    var ourl = "display_odds_sc.aspx?tmatchid=" + tmatchid + "&lang=" + jsLang + "&oddsTypeToShow=" + toddstype;
    for (var i = 0; i < arrtmatchid.length; i++) {
        contentid[i] = "#dMix_" + arrtmatchid[i];
        checkID[i] = "#dMix_" + arrtmatchid[i] + "_" + arrtoddstype[0];
    }

    var $dobj = $(contentid[0]);


    if ($('dMix_' + arrtmatchid[0] + '_Inplay').html() != "" && $(checkID[0]).length > 0) {
        $dobj.show();
    } else {
        $dobj.hide();
        $dobj.load(ourl, function() {
            $('.tgCoupon .spBtnMinus').remove();
            $('.tgCoupon').attr('onclick', '').unbind('click');
            $('[id=dContainer]').remove();

            for (var j = 0; j < arrtmatchid.length; j++) {
                if ($("." + arrtmatchid[j] + "_inplay").length > 0) {
                    var $objs = $("div[id*='dMix_" + arrtmatchid[j] + "_']");
                    $objs.hide();
                    var $objInplay = $("div[id*='dMix_" + arrtmatchid[j] + "_Inplay']");
                    $objInplay.show();
                    $objInplay.html($objs.find(":nth-child(1)").html());
                } else {
                    for (var i = 0; i < arrtoddstype.length; i++) {
                        $('#dContainer' + arrtmatchid[j]).find('#d' + arrtoddstype[i]).wrap('<div id="dMix_' + arrtmatchid[j] + '_' + arrtoddstype[i] + '"><div id="dContainer' + arrtmatchid[j] + '"></div></div>');
                        var targetObj = $('#dContainer' + arrtmatchid[j]).find('#dMix_' + arrtmatchid[j] + '_' + arrtoddstype[i]);
                        $('#dMix_' + arrtmatchid[j]).append(targetObj);
                    }
                }
                if (j > 0) {
                    var targetMatchObj = $('#dMix' + arrtmatchid[j]);
                    $(contentid[j]).append(targetMatchObj);
                    $('#dMix_' + arrtmatchid[j] + '_Inplay').append($('#dContainer' + arrtmatchid[j]));
                } else {
                    $('#dContainer' + arrtmatchid[j]).wrap('<div id="dMix_' + arrtmatchid[j] + '_Inplay"></div>');
                }
                if ($("." + arrtmatchid[j] + "_inplay").length == 0) {
                    $('#dMix_' + arrtmatchid[j] + '_Inplay').hide().html('');
                }
            }
            $dobj.show();
        });
    }
}

//toggle selected mixallup
function toggleMix(_this, _matchCell) {
    var chkObj = $('#' + _this);
    if (chkObj.is(':checked')) {
        $('#' + _matchCell).addClass('checkedOdds');
        tempMixAlupSelectedList[_this] = true;
        chkObj.prop('checked', true);
    } else {
        $('#' + _matchCell).removeClass('checkedOdds');
        tempMixAlupSelectedList[_this] = false;
        chkObj.prop('checked', false);
    }

    let temp = {}
    $.each(matchDataList, function(index, item) {
        $.each(tempMixAlupSelectedList, function(mixIndex, mixItem) {
            let tempMatch = mixIndex.split('chk')[1]
            if (tempMatch == item.matchID) {
                temp[mixIndex] = mixItem;
            }
        })
    });

    tempMixAlupSelectedList = temp;
}

function mixSelectedCount() {
    var cnt = 0;
    for (var idx in tempMixAlupSelectedList) {
        if (tempMixAlupSelectedList[idx])
            cnt++;
    }
    $("#mixallup_selected").text(cnt);
}

function mixUnSelectedAll() {
    tempMixAlupSelectedList = {};
    $(".couponTable .checkedOdds").find("input").each(function() {
        $(this).prop("checked", false);
    });
    $(".couponTable .selectedandclear").find("input").each(function() {
        $(this).prop('checked', false);;
    });
    $(".couponTable .checkedOdds").each(function() {
        $(this).removeClass('checkedOdds');
    });
    $("#mixallup_selected").text(0);
}
var invalidBetTypeArr = [];

var uncheckingSameMatchOtherPoolsSelection = false;
//toggle mixall up formula
function mixFormula(_chkObj, _matchID, _oddsType, _oddsOption) {
    //uncheck other selections of the same match
    //uncheckElementOfSameMatch(_chkObj, _matchID, _oddsType);
    if ($(_chkObj).is(':checked')) {
        var sameMatchOtherPoolsSelection = $('#dMixContent_' + _matchID).find('input[type=checkbox]:checked').not($('input[name=chk' + _oddsType + ']'));
        if (sameMatchOtherPoolsSelection.length > 0) {
            uncheckingSameMatchOtherPoolsSelection = true;
            sameMatchOtherPoolsSelection.click();
            uncheckingSameMatchOtherPoolsSelection = false;
        }
    }
    var selectedMatches = 0;
    var selectedFormula = $(".mcSelFormula:first").val();
    $('.dMixSingleMatch').each(function() {
        if ($(this).find('input[type=checkbox]:checked').length > 0) {
            selectedMatches++;
        }
    });

    if (selectedMatches > 1) {
        //only render if selected matches are different from no. of legs
        if (selectedFormula != null) {
            if (selectedFormula.toLowerCase().split("x")[0] != selectedMatches) {
                renderMixDropDown(selectedMatches);
            }
        } else {
            renderMixDropDown(selectedMatches);
        }
    } else {
        $(".mcSelFormula").empty();
    }
}

// update mixall up formula after auto unchecked
function updateMixAllUpFormual() {

    var selectedMatches = 0;
    var selectedFormula = $(".mcSelFormula:first").val();
    $('.dMixSingleMatch').each(function() {
        if ($(this).find('input[type=checkbox]:checked').not(':disabled').length > 0) {
            selectedMatches++;
        }
    });

    if (selectedMatches > 1) {
        //only render if selected matches are different from no. of legs
        if (selectedFormula != null) {
            if (selectedFormula.toLowerCase().split("x")[0] != selectedMatches) {
                renderMixDropDown(selectedMatches);
            }
        } else {
            renderMixDropDown(selectedMatches);
        }
    } else {
        $(".mcSelFormula").empty();
    }
}


//render formula dropdown
function renderMixDropDown(_noOfMatches) {
    var formulaObj = formula_mixallup[_noOfMatches];

    $(".mcSelFormula").empty();

    $.each(formulaObj, function(val, text) {
        $(".mcSelFormula").append($('<option></option>').val(text).html(text));
    });
}

function calculateBet2(_updateCal) {
    var inputObj = $(".mcTxtUnitbet:first");
    var selFormulaTopObj = $(".mcSelFormula:first");

    //only check integers and unibet >= $10
    if ($.isNumeric(inputObj.val()) && parseInt(inputObj.val()) >= 10) {

        if (!$.isNullOrEmpty(selFormulaTopObj.val())) {

            //get formula item
            var formulaItem = null;
            for (var i = 0; i < formula_mixallup.length; i++) {
                if (formula_mixallup[i].toString().indexOf(selFormulaTopObj.val()) > -1) {
                    formulaItem = formula_mixallup[i];
                }
            }

            //get checked odds
            var oddsObjs = $("input:checked");
            newBetObj = [];

            for (var i = 0; i < oddsObjs.length; i++) {
                oddsValue = $(oddsObjs[i]).siblings(".oddsLink").html();
                if (oddsValue != null) {
                    var idStr = $(oddsObjs[i]).attr("id").split("_");
                    var isTournament = (idStr[0] == "tourn");

                    if (!isTournament) {
                        var matchID = idStr[0];
                        var oType = idStr[1];
                        var optionKey = idStr[2];
                        var itemNo = "";
                        if (oType == "SPC" || ((oType == "HIL" || oType == "CHL" || oType == "FHL") && idStr.length > 4)) {
                            itemNo = idStr[3];
                        }

                        var poolId = idStr[4];
                        var lineId = idStr[5];
                        var combId = idStr[6];

                        addFBBetObj(matchID, oType, poolId, lineId, combId, optionKey, false, itemNo);
                    }
                }
            }

            //group betlines by matchobjs
            var selformatVal = $(".mcSelFormula:first").val().toLowerCase();
            newBetObj = combineAllUpBet(newBetObj, selformatVal);

            //get no selection Array
            var noSelArr = [];
            var maxOddsArr = [];
            var minOddsArr = [];

            for (var i = 0; i < newBetObj[0].pools.length; i++) {
                newBetObj[0].pools[i].combs.sort(sortComb);
                noSelArr.push(newBetObj[0].pools[i].combs.length);

                var maxodds = parseFloat(newBetObj[0].pools[i].combs[0].odds);
                var minodds = parseFloat(newBetObj[0].pools[i].combs[0].odds);
                if (newBetObj[0].pools[i].bType != "HIL" && newBetObj[0].pools[i].bType != "CHL" && newBetObj[0].pools[i].bType != "FHL") {
                    for (var j = 1; j < newBetObj[0].pools[i].combs.length; j++) {
                        if (parseFloat(newBetObj[0].pools[i].combs[j].odds) > maxodds) {
                            maxodds = parseFloat(newBetObj[0].pools[i].combs[j].odds);
                        }
                        if (parseFloat(newBetObj[0].pools[i].combs[j].odds) < minodds) {
                            minodds = parseFloat(newBetObj[0].pools[i].combs[j].odds);
                        }
                    }
                } else {
                    // find all possible sum of odds, only H>L
                    // all Low odds
                    var lOdds = 0;
                    for (var j = 0; j < newBetObj[0].pools[i].combs.length; j++) {
                        if (newBetObj[0].pools[i].combs[j].combShortE == "Low")
                            lOdds += parseFloat(newBetObj[0].pools[i].combs[j].odds);
                    }
                    maxodds = lOdds;

                    // cross
                    var hOdds = 0;
                    for (var j = 0; j < newBetObj[0].pools[i].combs.length; j++) {
                        if (newBetObj[0].pools[i].combs[j].combShortE == "High") {
                            hOdds += parseFloat(newBetObj[0].pools[i].combs[j].odds);
                        }
                        var tmpOdds = 0;
                        for (var k = j + 1; k < newBetObj[0].pools[i].combs.length; k++) {
                            if (newBetObj[0].pools[i].combs[k].goalline != newBetObj[0].pools[i].combs[j].goalline &&
                                newBetObj[0].pools[i].combs[k].combShortE == "Low") {
                                tmpOdds += parseFloat(newBetObj[0].pools[i].combs[k].ODDS);
                            }
                        }
                        if ((hOdds + tmpOdds) > maxodds)
                            maxodds = hOdds + tmpOdds;
                    }
                }
                maxOddsArr.push(maxodds);
                minOddsArr.push(minodds);
            }

            //call multi sel and update values
            calMultiSel(noSelArr, maxOddsArr, minOddsArr, selFormulaTopObj.val().toLowerCase(), parseInt(inputObj.val()), _updateCal);
        } else {
            $(".mcBet").html("-");
            $(".mcTotInv").html("-");
            $(".mcDivid").html("-");
            $(".mcNetRtn").html("-");
        }
    } else {
        alert(jsunitbeterror);
        $(".mcTxtUnitbet").val(getDefaultAmount("ALUPX"));
        return false;
    }
    $(".mcTxtUnitbet").val(inputObj.val());
    return true;
}

var mixallupselections = 0;

function calMultiSel(noOfSelArr, maxOddsArr, minOddsArr, allupFormula, tmpUnitBet, _updateDivCal) {
    var noofLeg = allupFormula.split("x")[0];
    var selIdx = parseInt($(".mcSelFormula:first").prop("selectedIndex"));
    var allSelection = formulaItem[noofLeg][selIdx];

    var totalSel = 0;
    var tmpSel = 0;
    var tmpMaxDiv = 0;
    var estMaxDiv = 0;
    var tmpMinDiv = 0;
    var estMinDiv = 0;

    for (var i = 0; i < allSelection.split("#").length; i++) { //allSelection == 1#2#3#12#13#23#123
        tmpSel = 1;
        tmpMaxDiv = 1;
        tmpMinDiv = 1;
        tvalue = allSelection.split("#")[i]; //tvalue == 1, tvalue == 2, tvalue == 3, tvalue == 12

        if (tvalue.length == 1) {
            tmpSel = noOfSelArr[tvalue - 1];
            tmpMaxDiv = maxOddsArr[tvalue - 1];
            tmpMinDiv = minOddsArr[tvalue - 1];
        } else {
            for (var j = 0; j < tvalue.length; j++) {
                tmpSel *= noOfSelArr[tvalue.substr(j, 1) - 1];
                tmpMaxDiv *= maxOddsArr[tvalue.substr(j, 1) - 1];
                tmpMinDiv *= minOddsArr[tvalue.substr(j, 1) - 1];
            }
        }
        totalSel += tmpSel;
        estMaxDiv += tmpMaxDiv;
        estMinDiv += tmpMinDiv;
    }

    estMaxDiv *= tmpUnitBet;
    estMinDiv *= tmpUnitBet;

    //alert(FormatNumber);
    mixallupselections = totalSel;

    if (_updateDivCal) {
        $(".mcBet").html(totalSel);
        $(".mcTotInv").html("$" + tmpUnitBet * totalSel);
        $(".mcDivid").html("$" + FormatNumber(estMaxDiv, 1, false, false, true));
        var netRtn = Math.round(estMaxDiv * 10) / 10 - tmpUnitBet * totalSel;
        $(".mcNetRtn").html("$" + FormatNumber(netRtn, 1, false, false, true));
    }
}

function updateMcSelFormula(e) {
    $(".mcSelFormula").val(e.target.value);
}

function updateMcTxtUnitbet(e) {
    $(".mcTxtUnitbet").val(e.target.value);
}

//# sourceURL=/football/lib/mixallup.js