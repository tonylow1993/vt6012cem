//Configurable setting
var total_number = 49; //Total number of balls
var number_per_row = 10; //Number of balls per row
var number_per_entry = 49; //min is 6 ; max is 49 (number of balls in a betline inc banker)
var banker_per_entry = 5; //min is 0 ; max is 5 (number of bankers in a betline)
var total_entry = 1; //max is 15 enties (15 betlines)

//Global variables
var selectedNumber = 0;
var selectedBanker = 0;

//Sorting expression for numbers (1 < 2)
function sortNumArray(a, b) {
    if (a.value == "" || b.value == "")
        return 0;
    else
        return a.value - b.value;

}

//Sorting expression for number status (2 > 1)
function sortNumArrayStatus(a, b) {
    if (a.value == "" || b.value == "")
        return 0;
    else
        return b.status - a.status;

}

//*****************************************************************************************
//*********************************MATH FUNCTIONS********************************************
// 999,999,999
function numberFormat(n) {
    var numStr = "";
    if (typeof(n) != "undefined") {
        n = String(n).split(",").join("");
    }
    if (n != "" && !isNaN(n)) {
        var n = String(Math.floor(n)); // integer
        var dotPos = n.indexOf(".");
        if (dotPos == -1) {
            dotPos = n.length;
        } else {
            n = n.substring(0, dotPos);
            dotPos = n.length;
        }
        for (var k = dotPos - 3; k > 0; k -= 3) {
            n = n.substring(0, k) + "," + n.substring(k, n.length);
        }
        numStr = n;
    }
    return numStr;
}

// eval(999999999) remove commas
function numberFormat2(n) {
    var n = n.toString().split(",").join("");
    if (!isNaN(n)) {
        n = eval(n);
    } else {
        n = 0;
    }
    return n;
}

var unitBetInfo = ""; // a global variable,will be referred to by ascx file
var isEnableMultiDraw = true;

function GetUnitBetInfoFromBetslipOrXml() {
    if (!isQRPortal) {
        var bTotalBetlineSpend = isM6PartialUnitEnabled(1);
        var bByProductMultiple = isM6PartialUnitEnabled(2);
        var bByProductBanker = isM6PartialUnitEnabled(3);
        var iPartialUnitBet = GetM6UnitBet(0);
        var iDefaultUnitBet = GetM6UnitBet(1);
        isEnableMultiDraw = GetPara("MK6MultiDraw") == "1";
        unitBetInfo = bTotalBetlineSpend + "|" + bByProductMultiple + "|" + bByProductBanker + "|" + iDefaultUnitBet + "|" + iPartialUnitBet;
    } else {
        isEnableMultiDraw = true;
        unitBetInfo = m6DefaultPUBconfig;
    }
}

function setMultiDrawSelectedOption() {
    if (getM6DrawNo() > 0)
        $('#cbMultiDraw').val(getM6DrawNo());
}

function sortNumArray2(a, b) {
    if (a > b)
        return 1
    if (a < b)
        return -1
    return 0

}

function ShowHelpPopup() {
    NewWindow(m6HelpUrl, "HelpPopUp", 764, 600, 1, 0);
}

function ShowChancePopup() {
    NewWindow(m6ChanceUrl, "HelpPopUp", 764, 600, 1, 0);
}

function ShowPUBPopup() {
    NewWindow(m6PUBUrl, "HelpPopUp", 764, 600, 1, 0);
}

function ShowDemoPopup() {
    NewWindow(m6DemoUrl, "DemoPopUp", 770, 550, 1, 0);
}

function toggleM6Box(e, boxId) {
    if ($(e).hasClass("msOpenBtn")) {
        $(e).prop('class', 'msCloseBtn');
        $('#' + boxId).show();
    } else {
        $(e).prop('class', 'msOpenBtn');
        $('#' + boxId).hide();
    }
}