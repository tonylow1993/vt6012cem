function BetlineInfo() {
    this.foBetObj;

    // for new display
    this.descOpen = false;
    this.delHit = false;
    this.alupHit = false;
    this.unitHit = false;

    //for counter offer
    this.counterOfferCount = '0000';
    this.counterOfferKey = '';
    this.isSendout = true;

    this.enableAllUp = ""; // all up button use
    this.betMethod = -1; // flexibet use; -1 == disabled, 0 == unitbet, 1 == flexibet

    this.cloneBetlineInfo = function() {
        var dest = new BetlineInfo();
        dest.foBetObj = this.foBetObj.clone();
        dest.descOpen = this.descOpen;
        dest.delHit = this.delHit;
        dest.alupHit = this.alupHit;
        dest.unitHit = this.unitHit;
        dest.enableAllUp = this.enableAllUp;
        dest.betMethod = this.betMethod;
        dest.isSendout = this.isSendout;
        dest.counterOfferCount = this.counterOfferCount;
        dest.counterOfferKey = this.counterOfferKey;
        return dest;
    }

    this.Clear = function() {
        this.foBetObj = null;
        this.enableAllUp = "";
        this.descOpen = false;
        this.delHit = false;
        this.alupHit = false;
        this.unitHit = false;
        this.betMethod = -1;
        this.isSendout = true;
        this.counterOfferCount = '0000';
        this.counterOfferKey = "";
    }

    this.isFlexiBet = function() {
        return this.betMethod == 1;
    }

    this.resetHit = function() {
        this.delHit = false;
        this.alupHit = false;
        this.unitHit = false;
    }

    this.debugData = function() {
        return genLine(this.foBetObj) +
            '\nthis.enableAllUp : ' + this.enableAllUp +
            '\nthis.descOpen : ' + this.descOpen +
            '\nthis.delHit : ' + this.delHit +
            '\nthis.alupHit : ' + this.alupHit +
            '\nthis.unitHit : ' + this.unitHit +
            '\nthis.betMethod : ' + this.betMethod +
            '\nthis.counterOfferCount : ' + this.counterOfferCount +
            '\nthis.counterOfferKey : ' + this.counterOfferKey;
    }

    this.clearRandGen = function() {
        this.isRandGen = 0;
    }
}

var betlines = [];
var allUpBetlines = []; //remove
var allUpFoBetObj = null; //keep
var allup_formula = [
    [],
    [1],
    [1, 3],
    [1, 3, 4, 6, 7],
    [1, 4, 5, 6, 10, 11, 14, 15],
    [1, 5, 6, 10, 15, 16, 20, 25, 26, 30, 31],
    [1, 6, 7, 15, 20, 21, 22, 35, 41, 42, 50, 56, 57, 62, 63],
    [1, 7, 8, 21, 35, 120, 127],
    [1, 8, 9, 28, 56, 70, 247, 255]
];
var array_allup_level = [2, 3, 4, 5, 6, 7, 8];
var max_allup = array_allup_level[array_allup_level.length - 1]; // the max allup number
var min_allup = array_allup_level[0]; // the min allup number

// for duplicate bet checking only
var array_str_fb_fixed_odds_type = new Array("HAD", "HHA", "TTG", "OOE", "HIL",
    "CRS", "HFT", "HDC", "GPF", "MSP",
    "GPW", "TSP", "TPS", "CHP", "FGS",
    "FHA", "TQL", "NTS", "FTS", "FHL",
    "FCS", "CHL", "SPC", "EHA", "EDC",
    "EHL", "ECH", "ECS", "ENT", "ETG",
    "SGA");
var array_str_hb_fixed_odds_type = new Array("JKC", "TNC");
// This for old Type//?
var array_str_allup_fb_type = new Array("HFMP", "HFMP8", "CRSP", "HCSP", "HILO", "TOFP", "STB", "HAFU");
var array_str_allup_hr_type = new Array("WIN", "PLA", "W-P", "QIN", "QPL", "QQP", "TRI");
var array_str_allup_hr_type_allup = new Array("AWN", "APL", "AQF", "AUT", "AQP");

// Dynamic Selection Allup State
var cAllUpNA = -1;
var cAllUpDisabled = 0;
var cAllUpEnabled = 2;
var cAllUpSelected = -2;

function getSingleBetLineTotalByte(foBetObj) { //keep
    var addon = 3; // " $" and "\"
    if (foBetObj.flexibet)
        addon += 1; //extra "$"
    if (foBetObj.inPlay)
        addon += 1; // I		
    if (foBetObj.isRandGen)
        addon += 4; // " (RG)"
    if (foBetObj.snowball)
        addon += 1; // S
    return genBetLine(foBetObj).length + foBetObj.unitBet.toString().length + addon;
}

function IsBufferOverflowFO(foBetObj) { //keep
    var totalBytes = 0;
    var buffer = cMaxBetBuffer;
    for (var i = 0; i < betlines.length; i++) {
        totalBytes += getSingleBetLineTotalByte(betlines[i].foBetObj);
    }
    totalBytes += getSingleBetLineTotalByte(foBetObj);
    return (totalBytes > buffer);
}

function IsFixedOddsBetType(foBetObj) { //keep
    if (foBetObj.prod == 'FB' && foBetObj.bType == 'ALUP')
        return true;
    for (var i = 0; i < array_str_fb_fixed_odds_type.length; i++) {
        if (foBetObj.bType == array_str_fb_fixed_odds_type[i] || foBetObj.bType == array_str_hb_fixed_odds_type[i])
            return true;
    }
    return false;
}

function IsDuplicateBetFO(foBetObj) { //keep
    for (var i = 0; i < betlines.length; i++) {
        if (IsFixedOddsBetType(foBetObj) && genBetLine(foBetObj) == genBetLine(betlines[i].foBetObj)) {
            return true;
        }
    }
    return false;
}

function AppendBetline(betInfo) { //keep
    betlines.push(betInfo);
    multiSlipPanel.updatePanel();
}

function DeleteAllAllUpBetlines() {
    allUpFoBetObj = null;
}

function DeleteBetlineWithIndex(index, refreshBetTable) {
    betlines.splice(index, 1);

    if (refreshBetTable) {
        if (getBetClickCount() == 0)
            slipClose();

        RedrawBetlineTable();
        multiSlipPanel.updatePanel();
    }
}

function DeleteAllBetlines() {
    betlines = [];

    if (typeof(multiSlipPanel) != 'undefined')
        multiSlipPanel.updatePanel();
}

function ResetAllAllUpButtons() {
    for (var i = 0; i < betlines.length; i++) {
        if (betlines[i].canFormAllUp == 0)
            betlines[i].enableAllUp = cAllUpNA;
        else
            betlines[i].enableAllUp = GetDynamicAllUpStateFO(betlines[i].foBetObj);
    }
}

function ResetOddsdiff() {
    for (var i = 0; i < betlines.length; i++) {
        betlines[i].foBetObj.resetOddsdiff();
    }
}

function ResetCounterOfferBetlines() {
    for (var i = 0; i < betlines.length; i++) {
        betlines[i].counterOfferCount = "0000";
        betlines[i].foBetObj.counterid = "";
    }
}

function GetDispBetType(foBetObj) {
    var betType = foBetObj.bType;
    if (betType.indexOf("ALUP") < 0) {
        return GetText(betType);
    }

    betType = foBetObj.pools[0].bType;
    var betTypeLong = GetText(betType); //(curLang=='en' ? foBetObj.pools[0].poolLongE : foBetObj.pools[0].poolLongC)
    var isXPool = false;
    var sub_types = "";
    for (var i = 0; i < foBetObj.pools.length; i++) {
        if (betType != foBetObj.pools[i].bType) {
            isXPool = true;
        }
        sub_types += "<br/>" + GetText(foBetObj.pools[i].bType); //(curLang=='en' ? foBetObj.pools[i].poolLongE : foBetObj.pools[i].poolLongC);
    }

    if (!isXPool) {
        if (GetLanguage() == cLangENG) {
            return GetText("txt_ALUP") + " " + betTypeLong + " " + foBetObj.formula;
        } else {
            return betTypeLong + GetText("txt_ALUP") + " " + foBetObj.formula;
        }
    }
    if (GetLanguage() == cLangENG) {
        return GetText("txt_cross_pool") + " " + GetText("txt_ALUP") + " " + foBetObj.formula + sub_types;
    }
    return GetText("txt_cross_pool") + GetText("txt_ALUP") + " " + foBetObj.formula + sub_types;
}

function GetTextWithChecking(str) {
    if (str == null || str == undefined)
        return "";
    return str;
}

//if (isRandGen == null || isRandGen == undefined || isRandGen == '')
function GetNumberWithChecking(str) {
    try {
        if (!isNaN(parseInt(str)))
            return parseInt(str);
    } catch (e) {}
    return 0;
}

function ParseBetType(betline, family) {
    var retBetType = null;
    switch (family) {
        case "MK6":
            retBetType = "MK6";
            break;
        case "HR":
            var dummy = betline.split(" ");
            if (dummy[2] != "ALUP") {
                retBetType = dummy[2];
            } else {
                var dummy2 = betline.split("/");
                var dummy3 = dummy2[0].split(" ");
                var retBetType = "ALUP " + dummy3[3];
                for (var i = 1; i < dummy2.length; i++) {
                    dummy3 = dummy2[i].split(" ");
                    retBetType += "|" + dummy3[0];
                }
            }
            break;
        case "FB":
            var dummy = betline.split(" ");
            if (dummy[1] != "ALUP") {
                retBetType = ParseSpecialBetTypeFB(dummy[1]);
            } else {
                var dummy2 = betline.split("/");
                var dummy3 = dummy2[0].split(" ");
                var retBetType = "ALUP " + dummy3[2];
                for (var i = 1; i < dummy2.length; i++) {
                    var sub1 = dummy2[i];
                    for (var j = i + 1; j < dummy2.length; j++) {
                        var ch = dummy2[j].substring(0, 1);
                        if (!isNaN(ch) || ch == "-" || ch == "+") {
                            sub1 += "/" + dummy2[j];
                        } else {
                            break;
                        }
                    }
                    i = j - 1;
                    dummy3 = sub1.split(" ");
                    retBetType += "|" + ParseSpecialBetTypeFB(dummy3[0]);
                }
            }
            break;
    } // switch (family)
    return retBetType;
} // ParseBetType

function ParseSpecialBetTypeFB(betType) {
    var map1 = new Array("CHPP", "TOFP", "CHP", "HFMP6", "HFMP8", "HFMP", "HAFU", "ADTP", "GPF", "SPC", "TPS", "GPW", "STB", "OOU");
    var map2 = new Array("TOFP", "TOFP", "CHP", "HFMP6", "HFMP8", "HFMP", "HFT", "ADTP", "GPF", "SPC", "TPS", "GPW", "STB", "HILO");
    for (var i = 0; i < map1.length; i++) {
        if (betType.indexOf(map1[i]) == 0)
            return map2[i];
    }
    return betType;
}

function ParseMatchNumber(betline, family, betType) {
    var retMatchNum;
    var dummy1, dummy2, dummy3;
    switch (family) {
        case "MK6":
            retMatchNum = "MK6";
            break;

        case "HR":
            dummy1 = betline.split(" ");
            if (dummy1[2] != "ALUP") {
                if (dummy1[2] == "JKC" || dummy1[2] == "TNC") {
                    retMatchNum = dummy1[0] + " " + dummy1[1];
                    break;
                } else if (dummy1[2] == "TCE" || dummy1[2] == "QTT")
                    dummy2 = dummy1[4].split("*");
                else
                    dummy2 = dummy1[3].split("*");
                retMatchNum = dummy1[0] + " " + dummy1[1] + " " + dummy2[0];
            } else {
                dummy2 = betline.split("/");
                dummy3 = dummy2[0].split(" ");
                retMatchNum = "ALUP " + dummy3[3];
                for (var i = 1; i < dummy2.length; i++) {
                    var dummy4 = dummy2[i].split("*");
                    var dummy5 = dummy4[0].split(" ");
                    retMatchNum += "|" + dummy3[0] + " " + dummy3[1] + " " + dummy5[1];
                }
            }
            break;
        case "FB":
            if (betType.indexOf("ALUP") == 0) {
                dummy1 = betline.split("/");
                dummy2 = dummy1[0].split(" ");
                retMatchNum = "ALUP " + dummy2[2];
                for (var i = 1; i < dummy1.length; i++) {
                    var sub1 = dummy1[i];
                    for (var j = i + 1; j < dummy1.length; j++) {
                        var ch = dummy1[j].substring(0, 1);
                        if (!isNaN(ch) || ch == "-" || ch == "+") {
                            sub1 += "/" + dummy1[j];
                        } else {
                            break;
                        }
                    }
                    i = j - 1;
                    dummy2 = sub1.split("*");
                    dummy3 = dummy2[0].split(" ");
                    retMatchNum += "|FB " + dummy3[1] + " " + dummy3[2];
                }
            } else {
                dummy1 = betline.split(" ");
                switch (betType) {
                    case "CHP":
                    case "CHPP":
                    case "TOFP":
                    case "TPS":
                    case "ADTP":
                        retMatchNum = dummy1[0] + " " + dummy1[1] + " " + dummy1[2].split("*")[0];
                        break;
                    case "GPF":
                    case "GPW":
                        retMatchNum = dummy1[0] + " " + dummy1[1] + " " + dummy1[2].split("*")[0];
                        break;
                    case "SPC":
                        if (dummy1[1].length > 3) {
                            retMatchNum = dummy1[0] + " " + dummy1[1] + " " + dummy1[2] + " " + dummy1[3].split("*")[0];
                        } else {
                            retMatchNum = dummy1[0] + " " + dummy1[1] + " " + dummy1[2] + " " + dummy1[3] + " " + dummy1[4].split("*")[0];
                        }
                        break;
                    default:
                        retMatchNum = dummy1[0] + " " + dummy1[2];
                } // switch(betType)
            }
            break;

    } // switch (family)
    return retMatchNum;
} // ParseMatchNumber

var isValidUnitBet = true;

function CheckUnitBet(index) {
    isValidUnitBet = true;
    inobj = $('#inputAmount' + index)[0];

    if (index < 0)
        return;

    if (inobj.value == "" || inobj.value == undefined || isNaN(inobj.value) || parseFloat(inobj.value) <= 0) {
        ShowError(2, GetError("1206"), true, 60000);
        inobj.value = betlines[index].foBetObj.unitBet;
        focusField(inobj);
        return false;
    }

    var unitBet = Math.round(parseFloat(inobj.value));
    var invalid = false;

    if (betlines[index].foBetObj.prod == 'HR') {
        if (betlines[index].foBetObj.bType == 'ALUP') {
            if (IsLessThanPSMinAmt(unitBet, psHBArray, 'ALUPX'))
                invalid = true;
        } else if (betlines[index].foBetObj.bType == 'JKC' || betlines[index].foBetObj.bType == 'TNC') {
            if (IsLessThanPSMinAmt(unitBet * betlines[index].foBetObj.getSelectionSize(), psHBArray, betlines[index].foBetObj.bType))
                invalid = true;
        } else if (IsLessThanPSMinAmt(unitBet, psHBArray, betlines[index].foBetObj.bType))
            invalid = true;
    } else {
        if (betlines[index].foBetObj.bType == 'ALUP') {
            if (IsLessThanPSMinAmt(unitBet, psSBArray, 'ALUPX') && IsLessThanPSMinAmt(unitBet * betlines[index].foBetObj.getSelectionSize(), psSBArray, 'ALUPX')) {
                invalid = true;
            }
        } else {
            switch (betlines[index].foBetObj.bType) {
                case "DHC":
                    if (IsLessThanPSMinAmt(unitBet, psSBArray, betlines[index].foBetObj.bType) && (unitBet * betlines[index].foBetObj.getSelectionSize()) < 100) {
                        invalid = true;
                    }
                    break;
                default:
                    if (unitBet < 10 || IsLessThanPSMinAmt(unitBet * betlines[index].foBetObj.getSelectionSize(), psSBArray, betlines[index].foBetObj.bType)) {
                        invalid = true;
                    }
            } // switch
        }
    }

    if (!betlines[index].foBetObj.flexibet && unitBet > MyParseInt(GetPara("MaxBetUnit"), 50000))
        invalid = true;

    if (invalid) {
        //isValidUnitBet = false;
        ShowError(2, GetError("1206"), true, 60000);
        inobj.value = betlines[index].foBetObj.unitBet;
        focusField(inobj);
        return false;
    }

    betlines[index].foBetObj.unitBet = unitBet;
    inobj.value = betlines[index].foBetObj.unitBet;
    HideAllError();
    return true;
}

function IsLessThanPSMinAmt(val, psArray, type) {
    let transType = TranslateBetType(type);
    if (psArray[transType] != undefined && psArray[transType].minAmt != undefined) {
        try {
            return val < psArray[transType].minAmt;
        } catch (ex) {
            //do nothing
        }
    }

    return false;
}

function CheckAlupBoxUnitBet(inobj) {
    var val = inobj.value.replace('$', '');
    if (val == "" || val <= 0 || isNaN(val) || val > MyParseInt(GetPara("MaxBetUnit"), 50000)) {
        ShowError(2, GetError("1206"), true, 60000);
        inobj.value = '$' + GetSetting("UnitBet", "ALUPX", allUpFoBetObj.prod);
        focusField(inobj);
        return false;
    } else if (val < MyParseInt(GetSetting("UnitBet", "ALUPX", allUpFoBetObj.prod))) {
        inobj.value = '$' + GetSetting("UnitBet", "ALUPX", allUpFoBetObj.prod);
    } else {
        inobj.value = Math.round(parseFloat(val));
    }
}

function getBetClickCount() {
    var cnt = 0;
    for (var i = 0; i < betlines.length; i++) {
        if (betlines[i].descOpen)
            cnt++;
    }
    return cnt;
}

function createBetObjectString() {
    var buf = new StringBuffer();
    for (var i = 0; i < betlines.length; i++) {
        buf.append('|||');
        buf.append(JSON.stringify(betlines[i], null));
    }
    return buf.toString();
}

function format() {
    var ret = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var s = "return ret.replace(/\\{" + (i - 1) + "\\}/ig, val)";
        var func = new Function("ret", "val", s);
        ret = func(ret, arguments[i]);
    }
    return ret;
}

//	Multiple Panel support, Rivers Zhao, 2010-07-21
//	Design: Needn't modify old logic flow, just suitably change current active betlines variable and it's pointer.
var tmpAllUpValue = '';

function MultiSlipPanel(panels) {
    this.init(panels);
    return this;
}
MultiSlipPanel.prototype = {
    panelList: null,
    slipList: new Array(),
    activeSlip: 0,
    init: function(panelList) {
        this.panelList = panelList;
        this.activeSlip = 0;
        for (var i = 0; i < panelList.length; i++) {
            this.slipList[i] = {
                betlines: this.buildBetlines(),
                allUpBetlines: this.buildBetlines(),
                sel_formula: -1,
                inputAllUp: "",
                tmpAllUpValue: ""
            };
            var panellbl = String.fromCharCode("A".charCodeAt(0) + i);
            var betcount = this.slipList[i].betlines.length;
            var title = betcount > 0 ? format("{0}({1})", panellbl, betcount) : panellbl;
            var curPanel = panelList[i];
            curPanel.innerHTML = title;
            curPanel["Self"] = this;
            curPanel["PanelId"] = i;
            curPanel.onclick = this.updatePanel;
            curPanel.className = (i == this.activeSlip) ? "slipActivePanel" : "slipInactivePanel";
        }
    },
    sel_formula: null,
    inputAllUp: null,
    updatePanel: function() {
        var self = this["Self"] || this;
        var pslip = typeof(this.activeSlip) == "number" ? this.activeSlip : parseInt(this["PanelId"]);
        var isChangedPanel = typeof this.PanelId != 'undefined' && this.PanelId != self.activeSlip;
        if (!self.sel_formula || !self.inputAllUp) {
            self.sel_formula = $("#sel_formula");
            self.inputAllUp = $("#inputAllUp");
        }

        self.slipList[self.activeSlip] = {
            betlines: betlines,
            allUpBetlines: allUpBetlines,
            sel_formula: self.sel_formula.prop('selectedIndex'),
            inputAllUp: self.inputAllUp.val(),
            tmpAllUpValue: tmpAllUpValue
        };
        betlines = self.slipList[pslip].betlines;
        allUpBetlines = self.slipList[pslip].allUpBetlines;
        tmpAllUpValue = self.slipList[pslip].tmpAllUpValue;
        self.activeSlip = pslip;

        for (var i = 0; i < self.panelList.length; i++) {
            var panellbl = String.fromCharCode("A".charCodeAt(0) + i);
            var betcount = self.slipList[i].betlines.length;
            var title = betcount > 0 ? format("{0}({1})", panellbl, betcount) : panellbl;
            var curPanel = self.panelList[i];
            curPanel.innerHTML = title;
            curPanel.className = (i == self.activeSlip) ? "slipActivePanel" : "slipInactivePanel";
        }

        if (isChangedPanel && !isSlipOpen()) {
            for (var i = 0; i < betlines.length; i++) {
                betlines[i].descOpen = false;
            }
        }

        RedrawBetlineTable();
        DrawAddAllUpButton(true);
        LoadAllUpFormula();
        self.sel_formula.prop('selectedIndex', self.slipList[pslip].sel_formula);
        self.inputAllUp.val(self.slipList[pslip].inputAllUp);

        // todo: tab style control.
    },
    resetPanel: function() {
        var self = this["Self"] || this;
        self.init(self.panelList);
    },
    buildBetlines: function() {
        var blines = [];
        for (var i = 0; i < blines.length; i++) {
            blines[i] = new BetlineInfo();
        }
        return blines;
    },
    getTotalCount: function() {
        var count = 0;
        for (var i = 0; i < this.slipList.length; i++) {
            count += this.slipList[i].betlines.length;
        }
        return count;
    }
}

function GetIHubMapping(betType) {
    var ihub_map = {
        "FHAD": "FHA",
        "HHAD": "HHA",
        "HILO": "HIL",
        "FHLO": "FHL",
        "CHLO": "CHL",
        "FCRS": "FCS"
    };
    if (ihub_map[betType] != undefined)
        return ihub_map[betType];
    return betType;
}

//********************************************************************************
// allupformula
var AllUpFormula = [];
//********************************************************************************
function SetAllupformula(doc) {
    //OOE:8;FGS:8;FCS:8;NTS:8;HFT:8;FTS:8;GPW:8;FHL:8;HHA:8;FHA:8;HAD:8;HDC:8;CHL:8;CRS:7;HIL:8;TTG:8;GPF:8
    if (doc == null || doc == '')
        return false;

    var poolMaxLegs = doc.split(';');
    for (var i = 0; i < poolMaxLegs.length; i++) {
        var tempParts = poolMaxLegs[i].split(':');
        var type = tempParts[0];
        var maxLeg = parseInt(tempParts[1], 10);
        var pool = new Array();
        pool['XPOOL_BET'] = '1';


        for (var j = 0; j < array_allup_level.length; j++) {
            var level = array_allup_level[j];
            if (level <= maxLeg) {
                var allup_comb = allup_formula[level];
                for (var k = 0; k < allup_comb.length; k++) {
                    var formula = level + "X" + allup_comb[k];
                    pool[formula] = '1';
                }
            }
        }
        AllUpFormula[type] = pool;
    }
    return true;
}

function func_search_allup_xml(betType, formula) {
    formula = formula.toUpperCase();
    var formulaEnableFlag;
    try {
        formulaEnableFlag = AllUpFormula[betType][formula];
    } catch (e) {
        return 0;
    }
    if (formulaEnableFlag == undefined || formulaEnableFlag == "")
        return 0;
    return formulaEnableFlag;
}