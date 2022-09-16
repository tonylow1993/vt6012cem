function addToBetslipM6(betLine1, partial, isRandGen, bankerSelections, legSelections) {
    var returnValue;

    try {
        if (validateBets()) {
            if (isQRPortal && isRandGen) {
                var noOfRandomLegs = 6;
                if (legSelections != undefined && legSelections != null && legSelections != '') {
                    noOfRandomLegs = noOfRandomLegs - (legSelections.split('+').length - 1)
                } else {
                    noOfRandomLegs = (betLine1.match(/\+/g) || []).length + 1;
                }
                returnValue = addRandomM6(0, noOfRandomLegs, 1, isAdvSB == 1, parseInt($('#cbMultiDraw').val()), next_draw_date, next_draw, partial, bankerSelections, legSelections);
            } else {
                var betObj = addMK6BetObj(betLine1, parseInt($('#cbMultiDraw').val()), partial, isRandGen);
                returnValue = addSelExFO(betObj);
            }
        }
    } catch (e) {
        console.log(e);
    }

    return returnValue;
}

var check_draw_type = 1;

function validateBets() {
    var returnValue = true;
    if (!isQRPortal) {
        if (check_draw_type == 1 && !draw_start) {
            alert(m6_stopsell_desc);
            returnValue = false;
        } else if (check_draw_type == 2 && !adv_sb_start) {
            alert(m6_stopsell_desc);
            returnValue = false;
        }
    }
    if (next_draw == "-")
        returnValue = false;
    return returnValue;
}

function convertFieldLeg(line) {
    var tmp = line.split('>');
    if (tmp.length > 1) {
        var bArr = tmp[0].split('+');
        var lArr = tmp[1].split('+');
        var total = bArr.length + lArr.length;
        if (total == 49 && lArr.length > 0) {
            return tmp[0] + ">F";
        }
    }
    return line;
}

function addMK6BetObj(betline, multiDraws, partial, isRandGen) {
    var combObj = new FOCombObj();
    combObj.combid = betline;
    combObj.combShortE = convertFieldLeg(betline);
    combObj.combShortC = combObj.combShortE;
    combObj.combLongE = combObj.combShortE.replace(/>/g, ' >').replace(/\+/g, ' +');
    combObj.combLongC = combObj.combLongE;

    var poolObj = new FOPoolObj();
    poolObj.poolid = next_draw;
    poolObj.combs.push(combObj);

    var betObj = new FOBetObj('MK6', 'MK6', false);
    betObj.isRandGen = isRandGen;
    betObj.multidraw = multiDraws > 1 ? multiDraws : "";
    betObj.partial = partial;
    betObj.snowball = isAdvSB == 1;
    betObj.unitBet = GetM6UnitBet(partial ? 0 : 1);
    betObj.pdId = next_draw;
    betObj.pdDate = next_draw_date.substring(6, 10) + '-' + next_draw_date.substring(3, 5) + '-' + next_draw_date.substring(0, 2);
    betObj.stopsellDT = '';
    betObj.pools.push(poolObj);
    betObj.remark = '';
    return betObj;
}