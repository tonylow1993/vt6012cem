function GenRandomMarkSixLineLayout(randomLine) {
    var strLineHtml = "";
    var randomMarkSixAry = new Array(totalRandomBallInIndex);

    for (randomM6LineCounter = 0; randomM6LineCounter < totalRandomBallInIndex; randomM6LineCounter++) {
        var isDuplicate = false;
        var randomWhileLoopCounter = 0;
        var randomNumber = 0;
        do {
            isDuplicate = false;
            randomNumber = Math.floor(Math.random() * 49) + 1;
            for (j = 0; j < randomM6LineCounter; j++) {
                if (randomNumber == randomMarkSixAry[j])
                    isDuplicate = true;
            }

        } while (isDuplicate && randomWhileLoopCounter < 2000)
        randomMarkSixAry[randomM6LineCounter] = randomNumber;
    }

    randomMarkSixAry = SortArrayASC(randomMarkSixAry);

    strLineHtml += "<div style=\"border-bottom: 1px solid #F7E0E0;margin:2px 0px 0px 0px\">";

    var styleStr = '';
    for (i = 0; i < totalRandomBallInIndex; i++) {
        if (randomMarkSixAry[i] < 10) {
            strLineHtml += "<div style=\"display:inline;" + styleStr + "\"><img src=\"/marksix/info/images/icon/no_0" + randomMarkSixAry[i] + "_s.gif" + cacheVersion + "\" width=\"25\" height=\"25\"></div>";
        } else {
            strLineHtml += "<div style=\"display:inline;" + styleStr + "\"><img src=\"/marksix/info/images/icon/no_" + randomMarkSixAry[i] + "_s.gif" + cacheVersion + "\" width=\"25\" height=\"25\"></div>";
        }
        styleStr = 'margin:0px 0px 0px 15px';
    }

    strLineHtml += "<input type=\"hidden\" name=\"randomM6Line_" + randomLine + "\" id=\"randomM6Line_" + randomLine + "\" value=\"" + randomMarkSixAry.join('+') + "\">";
    strLineHtml += "</div>";

    return strLineHtml;
}

function RandomMarkSixBall(totalRandomBankerBall, totalRandomLegBall) {
    var strRandomBankerBall = "";
    var strRandomLegBall = "";
    var strRandomBall = "";

    for (randomCounter = 0; randomCounter < (totalRandomLegBall + totalRandomBankerBall); randomCounter++) {
        strAryMarkSixBall = strRandomBall.split('+');

        var isDuplicate = false;
        var randomWhileLoopCounter = 0;
        do {
            isDuplicate = false;
            randomNumber = Math.floor(Math.random() * 49) + 1;
            for (j = 0; j < strAryMarkSixBall.length; j++) {
                if (strAryMarkSixBall[j] != "") {
                    if (randomNumber == strAryMarkSixBall[j])
                        isDuplicate = true;
                }
            }
            randomWhileLoopCounter++;
        } while (isDuplicate && randomWhileLoopCounter < 2000) //randomWhileLoopCounter is use for prevent the not end loop

        if (strRandomBall == "") {
            strRandomBall = "" + randomNumber;
        } else {
            strRandomBall += "+" + randomNumber;
        }

        if (randomCounter < totalRandomLegBall) {
            if (strRandomLegBall == "") {
                strRandomLegBall = "" + randomNumber;
            } else {
                strRandomLegBall += "+" + randomNumber;
            }
        } else {
            if (strRandomBankerBall == "") {
                strRandomBankerBall = "" + randomNumber;
            } else {
                strRandomBankerBall += "+" + randomNumber;
            }
        }
    }

    if (strRandomBankerBall != "") {
        return strRandomBankerBall + ">" + strRandomLegBall;
    } else {
        return strRandomLegBall;
    }
}

function AddSingleRandomM6ToBetSlip() {
    var addBetSlipResult = 0;
    var txt = parseInt($("#txtRandomNum").val());
    if (!isNaN(txt) && (txt >= 1 && txt <= 49)) {
        var strMarkSixLine = "";
        var randomMarkSixAry = new Array(totalRandomBall);

        randomMarkSixAry[0] = ($("#txtRandomNum").val() / 1);
        if (isQRPortal) {
            addBetSlipResult = addRandomM6(0, 5, 1, false, 0, next_draw_date, next_draw, false, null, '+' + randomMarkSixAry[0]);
        } else {
            for (var randomM6Counter = 1; randomM6Counter < totalRandomBall; randomM6Counter++) {
                var isDuplicate = false;
                var randomWhileLoopCounter = 0;
                var randomNumber = 0;
                do {
                    isDuplicate = false;
                    randomNumber = Math.floor(Math.random() * 49) + 1;
                    for (j = 0; j < randomM6Counter; j++) {
                        if (randomNumber == randomMarkSixAry[j])
                            isDuplicate = true;
                    }

                } while (isDuplicate && randomWhileLoopCounter < 2000)
                randomMarkSixAry[randomM6Counter] = randomNumber;
            }

            randomMarkSixAry = SortArrayASC(randomMarkSixAry);
            strMarkSixLine = randomMarkSixAry.join('+');
            addBetSlipResult = addToBetslipM6(strMarkSixLine, false, true);
        }
    } else {
        alert(m6_must_be_within1_49);
    }

    if (addBetSlipResult == 1) {
        $("#txtRandomNum").val('');
    }
}

var betline = "";
var tmpOut = "";

function rangen_number() {
    try {
        betline = "";
        tmpOut = "";
        var blnRegen = true;
        var Arraynum = new Array();
        var rannum = 0;
        while (blnRegen || Arraynum.length < 6) {
            blnRegen = false;
            rannum = Math.floor(Math.random() * 49) + 1;
            for (var m = 0; m < Arraynum.length; m++) {
                if (rannum == Arraynum[m])
                    blnRegen = true;
            }
            if (!blnRegen)
                Arraynum[Arraynum.length] = rannum;
        }
        Arraynum.sort(sortNumArray2);
        if (Arraynum.length > 0) {
            for (var n = 0; n < Arraynum.length; n++) {
                betline += Arraynum[n] + "+";
                tmpOut += "<span style='padding:0px 2px 0px 2px;'><img src='/marksix/info/images/icon/no_" + (Arraynum[n] < 10 ? "0" + Arraynum[n] : Arraynum[n]) + "_s.gif' width='25' height='25'></span>";
            }
            $('#mk6num').html(tmpOut);
            betline = betline.substr(0, betline.length - 1);
            $('#m6RanMsg').hide();
            $('#mk6num').show();
        }

    } catch (e) {;
    }
}

function RandomLegBall() {
    var totalBallCounter = 0;
    var totalGenBallCounter = 0;
    var strBallLine = "";
    //var aryBallLine = document.getElementById("bankerBallLine").attributes['value'].value.split('+');
    var aryBallLine = $("#bankerBallLine").val().split('+');

    if (aryBallLine[0] != "") {
        totalBallCounter = aryBallLine.length;
        //strBallLine = document.getElementById("bankerBallLine").attributes['value'].value;
        strBallLine = $("#bankerBallLine").val();
    }

    //aryBallLine = document.getElementById("legBallLine").attributes['value'].value.split('+');
    aryBallLine = $("#legBallLine").val().split('+');

    if (aryBallLine[0] != "") {
        totalBallCounter += aryBallLine.length;
        //strBallLine += "+" + document.getElementById("legBallLine").attributes['value'].value;
        strBallLine += "+" + $("#legBallLine").val();
    }

    if (totalBallCounter > 0 && totalBallCounter < 7) {
        totalBallCounter--;
    }

    if (totalBallCounter < 49) {
        totalGenBallCounter = 6 - totalBallCounter;

        if (totalGenBallCounter <= 0) {
            totalGenBallCounter = 1;
        }
    } else {
        totalGenBallCounter = 0;
        alert(betlineIsFullError);
    }

    if ($("#bankerBallLine").val() == '' && $("#legBallLine").val() == '') {
        ranGenFlag = true;
    }

    for (randomLegCounter = 0; randomLegCounter < totalGenBallCounter; randomLegCounter++) {
        aryBallLine = strBallLine.split('+');
        var isDuplicate = false;
        var randomWhileLoopCounter = 0;
        do {
            isDuplicate = false;
            randomNumber = Math.floor(Math.random() * 49) + 1;
            for (var randomCounter = 0; randomCounter < aryBallLine.length; randomCounter++) {
                if (aryBallLine[randomCounter] != "") {
                    if (randomNumber == aryBallLine[randomCounter]) {
                        isDuplicate = true;
                    }
                }
            }
            randomWhileLoopCounter++;
        } while (isDuplicate && randomWhileLoopCounter < 5000) //randomWhileLoopCounter is use for prevent the not end loop

        //if (document.getElementById("legBallLine").attributes['value'].value == "")
        if ($("#legBallLine").val() == "") {
            //document.getElementById("legBallLine").attributes['value'].value = randomNumber;
            $("#legBallLine").val(randomNumber);
        } else {
            //document.getElementById("legBallLine").attributes['value'].value += "+" + randomNumber;
            $("#legBallLine").val($("#legBallLine").val() + "+" + randomNumber);
        }

        if (strBallLine == "") {
            strBallLine = "" + randomNumber;
        } else {
            strBallLine += "+" + randomNumber;
        }

        SelectedLegBall(randomNumber);
    }

    IsAllBallSelect();

    //divBankerBallPanel.innerHTML = GenBankBallPanelLayout(document.getElementById("bankerBallLine").attributes['value'].value, document.getElementById("legBallLine").attributes['value'].value);
    $("#divBankerBallPanel").html(GenBankBallPanelLayout($("#bankerBallLine").val(), $("#legBallLine").val()));
}

function fillAllEntries() {
    var blnRegen = true;
    var Arraynum = new Array();
    var rannum = 0;
    var count = 0;

    for (var n = 0; n < this.entry.length; n++) {
        blnRegen = true;
        Arraynum = new Array();
        rannum = 0;
        count = 0;

        while (blnRegen || Arraynum.length < number_per_entry) {
            blnRegen = false;
            rannum = Math.floor(Math.random() * 49) + 1;
            for (var m = 0; m < Arraynum.length; m++) {
                if (rannum == Arraynum[m])
                    blnRegen = true;
            }
            if (!blnRegen)
                Arraynum[Arraynum.length] = rannum;
        }

        for (var m = 0; m < this.entry[n].num.length; m++) {
            this.entry[n].num[m].value = Arraynum[m];
            if (count < banker_per_entry) {
                this.entry[n].num[m].status = 2;
                count++;
            } else
                this.entry[n].num[m].status = 1
        }
    }
    this.display();
}

function fillOtherNumbers() {
    var blnRegen = true;
    var Arraynum = new Array();
    var rannum = 0;
    var count = 0;

    var n = this.highlighted_entry;

    blnRegen = true;
    Arraynum = new Array();
    rannum = 0;
    count = 0;
    b_count = 0;
    t_count = 0;

    for (var m = 0; m < this.entry[n].num.length; m++) {
        if (this.entry[n].num[m].status == 1 || this.entry[n].num[m].status == 2) {
            Arraynum[Arraynum.length] = this.entry[n].num[m].value;
            if (this.entry[n].num[m].status == 2)
                b_count++;
            t_count++;
        }
    }
    if (b_count == 0) {
        if (t_count >= 6) {
            blnRegen = false;
            number_per_entry = t_count + 1; //6 ;
            if (number_per_entry > 49)
                number_per_entry = 49;
        } else
            number_per_entry = 6;

        banker_per_entry = 0;
    } else if (b_count >= 1 && b_count <= 5) {
        if (t_count >= 7) {
            blnRegen = false;
            number_per_entry = t_count + 1; //7 ;
            if (number_per_entry > 49)
                number_per_entry = 49;
        } else
            number_per_entry = 7;

        banker_per_entry = count;
    } else {
        return false;
    }

    while (blnRegen || Arraynum.length < number_per_entry) {
        blnRegen = false;
        rannum = Math.floor(Math.random() * 49) + 1;
        for (var m = 0; m < Arraynum.length; m++) {
            if (rannum == Arraynum[m])
                blnRegen = true;
        }
        if (!blnRegen)
            Arraynum[Arraynum.length] = rannum;
    }

    for (var m = 0; m < this.entry[n].num.length; m++) {
        for (var x = t_count; x < Arraynum.length; x++) {
            if (this.entry[n].num[m].value == Arraynum[x])
                this.entry[n].num[m].status = 1;

        }
    }

}

function RandomMultMarkSix() {
    var strMarkSixBall = $("#chooseBallLine").val();
    var strAryMarkSixBall = $("#chooseBallLine").val().split('+');
    var genRandomNumberTime = 0;
    var randomNumber = 0;

    if (strAryMarkSixBall.length >= totalBallOnEachLine) {
        genRandomNumberTime = 1;
    } else {
        if (strAryMarkSixBall[0] != "") {
            genRandomNumberTime = (totalBallOnEachLine - strAryMarkSixBall.length);
        } else {
            genRandomNumberTime = totalBallOnEachLine;
            ranGenFlag = true;
        }
    }

    if (strAryMarkSixBall.length == 49) {
        genRandomNumberTime = 0;
        alert(betlineIsFullErrorMsg);
        return;
    }

    for (randomMultCounter = 0; randomMultCounter < genRandomNumberTime; randomMultCounter++) {
        strAryMarkSixBall = strMarkSixBall.split('+');
        var isDuplicate = false;
        var randomWhileLoopCounter = 0;
        do {
            isDuplicate = false;
            randomNumber = Math.floor(Math.random() * 49) + 1;
            for (j = 0; j < strAryMarkSixBall.length; j++) {
                if (strAryMarkSixBall[j] != "") {
                    if (randomNumber == strAryMarkSixBall[j])
                        isDuplicate = true;
                }
            }
            randomWhileLoopCounter++;
        } while (isDuplicate && randomWhileLoopCounter < 2000) //randomWhileLoopCounter is use for prevent the not end loop

        if (strMarkSixBall == "") {
            strMarkSixBall = "" + randomNumber;
        } else {
            strMarkSixBall += "+" + randomNumber;
        }

        if (randomNumber >= 10) {
            eval("document.getElementById(\"n" + randomNumber + "\").src = \"/marksix/info/images/icon/gray/no_" + randomNumber + "_s.gif" + cacheVersion + "\"");
        } else {
            eval("document.getElementById(\"n" + randomNumber + "\").src = \"/marksix/info/images/icon/gray/no_0" + randomNumber + "_s.gif" + cacheVersion + "\"");
        }
    }

    document.getElementById("chooseBallLine").value = strMarkSixBall;

    if (GetTotalSelectBallCount() == 49) {
        document.getElementById("nfull").src = "/marksix/info/images/icon/gray/" + markSixFullBallImageName;
    }

    document.getElementById("divMultMarkSixBallPanel").innerHTML = GenMultipleMarkSixLayout(strMarkSixBall);
    //divMultMarkSixBallPanel.innerHTML = GenMultipleMarkSixLayout(strMarkSixBall);
}

function AddRandomLuckyNum(randomLineNo) {
    var randomNumber = 0;
    var strMarkSixLine = $('#markSixLine' + randomLineNo).val().split(',');
    var needGenBallNo = (totalBallOnEachLine - strMarkSixLine.length);
    var aryRandomMarkSixLine = new ArrayList();

    if (strMarkSixLine[0] == "") {
        needGenBallNo++;
    }

    if (needGenBallNo == 6) {
        $('#markSixRandomGenFlag' + randomLineNo).val('1');
    }

    for (randomGenCounter = 0; randomGenCounter < strMarkSixLine.length; randomGenCounter++) {
        if (strMarkSixLine[randomGenCounter] != "") {
            aryRandomMarkSixLine.add(strMarkSixLine[randomGenCounter]);
        }
    }

    if (needGenBallNo == 0) {
        alert(betLineFullErrorMsg);
    }

    for (i = 0; i < needGenBallNo; i++) {
        var isDuplicate = false;
        var randomWhileLoopCounter = 0;
        do {
            isDuplicate = false;
            randomNumber = Math.floor(Math.random() * 49) + 1;
            for (j = 0; j < aryRandomMarkSixLine.length(); j++) {
                if (aryRandomMarkSixLine.get(j) != "") {
                    if (randomNumber == aryRandomMarkSixLine.get(j))
                        isDuplicate = true;
                }
            }
            randomWhileLoopCounter++;
        } while (isDuplicate && randomWhileLoopCounter < 2000) //randomWhileLoopCounter is use for prevent the not end loop
        //alert("isDuplicate : " + isDuplicate + " and randomWhileLoopCounter : " + randomWhileLoopCounter + " and random Number : " + randomNumber);
        aryRandomMarkSixLine.add(randomNumber);
    }

    $('#divMarkSixLine' + randomLineNo).html(markSixBetLayout(aryRandomMarkSixLine, randomLineNo));
    ResetMarkSixBall(randomLineNo);
    if (randomLineNo < totalLine) //totalLine default is 4
    {
        MarkSixChoosePanelClick(randomLineNo + 1);
    }
    UpdateMarkSixPanelFooter();
}