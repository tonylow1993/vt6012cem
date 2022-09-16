var arrSize = 35;

///////////////////////////////////////////////////
// JTTable Checkbox Object
///////////////////////////////////////////////////
function searchJTCombo() {
    // cannot perform full searching
    var jo = $('#jockey').val();
    var tr = $('#trainer').val();
    if (jo == 'ALL' && tr == 'ALL') {
        alert(chooseOneJTLbl);
        return;
    }

    redrawJTCTable();
    if (wpTableRS.hasRecord) {
        $('#jtNoResult').hide();
        $('#allupCheckbox').prop('disabled', false);
    } else {
        wpTableRS = null;
        $('#winplaceTable').html('');
        $('#jtNoResult').show();
        $('#jtNoResult').html(lblJTCNoResult);
        $('#allupCheckbox').prop('disabled', true);
    }
}

function showJTCRecord(runner, wOdds) {
    var jo = $('#jockey').val();
    var tr = $('#trainer').val();
    var wo = $('#winodds').val();

    // filter jockey
    if (jo != 'ALL') {
        if (jo == 'TOP5')
            jo = top5Jockey;
        var tmp = jo.split(';');
        tmp = $.grep(tmp, function(a) {
            return a == runner.jockeyCode;
        });
        if (tmp.length == 0)
            return false;
    }

    // filter trainer
    if (tr != 'ALL') {
        if (tr == 'TOP5')
            tr = top5Trainer;
        var tmp = tr.split(';');
        tmp = $.grep(tmp, function(a) {
            return a == runner.trainerCode;
        });
        if (tmp.length == 0)
            return false;
    }

    if (wo != 0) {
        var odds = parseFloat(wOdds);
        if (odds == NaN)
            return false;
        else if (wo == "1" && (odds < 1 || odds > 5))
            return false;
        else if (wo == "2" && (odds < 5.1 || odds > 15))
            return false;
        else if (wo == "3" && (odds < 15.1))
            return false;
    }
    return true;
}

///////////////////////////////////////////////////
// JKC Other Details
///////////////////////////////////////////////////
function generateOtherDetailTable(foInfo, foOSList, isResultPage) {
    //alert(jkcOtherData);
    var buf = new StringBuffer();
    if (foOSList.length > 0) {
        buf.append('<table class=\'jkcOtherDetail\' >');
        buf.append('<tr>');
        buf.append(generateOtherDetailTableHeader(foInfo.STAGE, isResultPage));
        buf.append(generateOtherDetailTableHeader(foInfo.STAGE, isResultPage));
        buf.append('</tr>');

        try {
            var row = Math.ceil(foOSList.length / 2);
            for (i = 0; i < row; i++) {
                buf.append('<tr>');
                buf.append(generateOtherDetailTableInnerRow(foInfo.STAGE, foOSList[i], isResultPage));
                buf.append(generateOtherDetailTableInnerRow(foInfo.STAGE, foOSList[row + i], isResultPage));
                buf.append('</tr>');
            }
        } catch (e) {}

        buf.append('</table>');
    } else {
        buf.append('');
    }

    return buf.toString();
}

function generateOtherDetailTableHeader(stage, isResultPage) {
    var buf = new StringBuffer();
    buf.append('<td class=\'otherJockeyHeader\'>');
    buf.append(pageName == 'JKC' ? lblOtherJockey : lblOtherTrainer);
    if (isResultPage || stage == 5) {
        buf.append('</td>');
        buf.append('<td class=\'jkcPtsHeader\'>');
        buf.append(pageName == 'JKC' ? lblPtsJKC : lblPtsTNC);
        buf.append('</td>');
        if (!isResultPage) {
            buf.append('<td class=\'remainingRidesHeader\'>');
            buf.append(pageName == 'JKC' ? lblRemainingRides : lblTNCRemainingEntries);
            buf.append('</td>');
        }
    } else {
        buf.append('</td>');
        buf.append('<td class=\'scheduleRidesHeader\'>');
        buf.append(pageName == 'JKC' ? lblScheduleRides : lblTNCEntries);
        buf.append('</td>');
    }
    return buf;
}

function generateOtherDetailTableInnerRow(stage, sel, isResultPage) {
    if (sel == null)
        return '<td></td><td></td>' + (stage == 5 && !isResultPage ? '<td></td>' : '');

    var buf = new StringBuffer();
    buf.append('<td>');
    buf.append('<a href="javascript:goJTRecord2(\'');
    buf.append(pageName).append('\', \'');
    buf.append(sel.code).append('\', false);" >');
    buf.append(sel['name' + curLang.toUpperCase()]);
    buf.append('</a>');
    buf.append('</td>');
    if (isResultPage || stage == 5) {
        let pt = isResultPage ? sel.details.points : sel.Points;
        buf.append('<td class=\'detailCenter\'>');
        buf.append(pt >= 0 ? pt : '---');
        buf.append('</td>');
        if (!isResultPage) {
            buf.append('<td class=\'detailCenter\'>');
            buf.append(sel.RRides >= 0 ? sel.RRides : '---');
            buf.append('</td>');
        }
    } else {
        buf.append('<td class=\'detailCenter\'>');
        buf.append(sel.sRides >= 0 ? sel.sRides : '---');
        buf.append('</td>');
    }
    return buf.toString();
}

function handleEmptyStr(str) {
    return (!str || str == '') ? '&nbsp;' : str;
}

function getCoupleTable(i) {
    var buf = new StringBuffer();
    buf.append('<div class="subTitleBar">').append(obCoupleHeader).append('</div>');
    buf.append('<div style="display:table;width:100%">');
    var couples = obCoupleByRace[i].split(';');
    for (var idx = 0; idx < couples.length; idx++) {
        buf.append('<div style="display:table-row">');
        buf.append('<div class="tableContent').append(idx % 2 == 0 ? '1' : '2').append('" style="display:table-cell">').append(couples[idx]).append('</div>');
        buf.append('<div class="tableContent').append(idx % 2 == 0 ? '1' : '2').append('" style="display:table-cell;text-align:center">').append(obCoupleLbl).append('</div>');
        buf.append('</div>');
    }
    buf.append('</div>');
    return buf.toString();
}

//# sourceURL=/racing/script/racingComponent.js