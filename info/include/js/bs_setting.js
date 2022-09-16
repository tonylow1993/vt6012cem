var cookieUseNewValue = 'DefAmtUseNewValue';
var cookiePrefixHB = 'DefAmtHB';
var cookiePrefixSB = 'DefAmtSB';
var cookieM6DrawNo = 'M6DrawNo';
var cookieAccInfo = 'AccInfo';
var cookieAlupSetting = 'AlupSetting';
var cookiePeNote = 'showPeNote';
var cookieTbStatus = 'SettingsTableStatus';
var textboxPrefixHB = 'txtDefAmtHB';
var textboxPrefixSB = 'txtDefAmtSB';
var psHBArray = new Array();
var psSBArray = new Array();

var valueMap = new Array();
valueMap['DISP_NAME'] = 0;
valueMap['DISP_BALANCE'] = 1;


function initSetting() {
    $('#divSettingTable').show();
    $('#divSettingBottom').show();
    $('#settingTable').scrollTop(0);

    $('#settingClose').prop('title', GetText('alt_popup_closewin'));
    $('#settingDefault').prop('title', GetText('alt_popup_default'));
    $('#settingSave').prop('title', GetText('alt_popup_save'));

    $('#txtSettingHeader').html(GetText('lbl_per_setting'));
    $('#settingHeader1').html(GetText('lbl_unit_bet_hr'));
    $('#settingHeader2').html(GetText('lbl_unit_bet_fb'));
    $('#settingHeader3').html(GetText('lbl_m6drawno_title'));
    $('#settingHeader4').html(GetText('lbl_acct_info'));
    $('#settingHeader5').html(GetText('lbl_alup_setting'));

    if (jsPeNoteGlobalFlag) {
        $('#settingHeader6').html(lblRacingNotesNobr[curLang]);
        $('#settingHeader6').show();
    } else {
        $('#settingHeader6').hide();
    }

    $('[id^=settingHeader]').prop('title', GetText('alt_click_open_close'));
    $('[id^=settingHeader]').prop('class', 'settingHeaderOpen');
    $('[id^=settingBody]').hide();

    //load amount
    loadPSValues();

    // racing table
    createHBTable();

    // football table
    if (IsBetTypeEnabled('Football'))
        createSBTable();

    //load M6DrawNo
    createM6DrawNoTable();
    loadM6DrawNoSetting();

    //load Acc. Info
    createAccTable();
    loadAccountInfo();

    //load Alup Setting
    createAlupTable();
    loadAlupSetting();

    if (jsPeNoteGlobalFlag) {
        //load PeNote Setting
        createPeNoteTable();
        loadPeNoteSetting();
    }

    var st = $.cookie('SettingsTableStatus');
    if (st != null && st != '') {
        var arr = st.split(',');
        for (var i = 1; i <= 6; i++) {
            if (arr[i] == '1') {
                settingToggleTable(i);
            }
        }
    }

    if (GetPara('MK6MultiDraw') != '1') {
        $('#settingHeader3').hide();
        $('#settingBody3').hide();
    }
}

function settingToggleTable(idx) {
    var hObj = $('#settingHeader' + idx);
    var bObj = $('#settingBody' + idx);
    if (hObj.hasClass('settingHeaderOpen')) {
        hObj.prop('class', 'settingHeaderClose');
        bObj.show();
        $('#settingHeader' + idx)[0].scrollIntoView();
    } else {
        hObj.prop('class', 'settingHeaderOpen');
        bObj.hide();
    }
}

function createHBTable() {
    $('#settingBody1').html(genSettingAmountTable(psHBArray, textboxPrefixHB));
}

function createSBTable() {
    $('#settingBody2').html(genSettingAmountTable(psSBArray, textboxPrefixSB));
}

function genSettingAmountTable(arr, prefix) {
    var buf = new StringBuffer();
    var count = 0;
    for (var i in arr) {
        if (arr[i].display) {
            if (count % 3 == 0)
                buf.append('<div class="betslipRow">');

            buf.append('<div class="settingCellLeft">').append(arr[i].getName()).append('</div>');
            buf.append('<div class="settingCellRight">$ <input type="text" id="').append(prefix).append(arr[i].pool).append('" value="')
                .append(addComma(arr[i].storedAmt)).append('" class="inputField2" style="width:50px;" maxlength="7"></div>');

            if (count % 3 == 2)
                buf.append('</div>');

            count++;
        }
    }
    // empty cell
    if (count % 3 == 1) {
        buf.append('<div class="settingCellLeft"></div><div class="settingCellRight"></div>');
        count++;
    }
    if (count % 3 == 2) {
        buf.append('<div class="settingCellLeft"></div><div class="settingCellRight"></div>');
        buf.append('</div>');
        count++;
    }
    //bottom line
    buf.append('<div style="margin:2px 5px 0px 0px; border-top: 1px solid #E5E5E5"></div>');
    return buf.toString();
}

function createM6DrawNoTable() {
    var buf = new StringBuffer();
    buf.append('<div class="settingCellM6">');
    buf.append(GetText("lbl_m6drawno_content1"));
    buf.append('<select id="M6DrawNoDropdown" >');
    buf.append('<option value="0">----</option>');
    for (var i = 5; i <= 30; i++) {
        buf.append('<option value="').append(i).append('">').append(i).append('</option>');
    }
    buf.append('</select>');
    buf.append(GetText("lbl_m6drawno_content2"));
    buf.append('<br>');
    buf.append(GetText("lbl_m6drawno_content3"));
    buf.append('</div>');
    buf.append('<div style="margin:2px 5px 0px 0px; border-top: 1px solid #E5E5E5"></div>');
    $('#settingBody3').html(buf.toString());
}

function createAccTable() {
    var buf = new StringBuffer();
    buf.append('<div class="betslipRow"><div class="settingCellAcc1">');
    buf.append(GetText("lbl_tb_acct_name"));
    buf.append(':</div>');
    buf.append('<div class="settingCellAcc1"><input type="radio" name="AccName" id="settingAccNameYes" value="0" /><label for="settingAccNameYes">');
    buf.append(GetText("lbl_display"));
    buf.append('</label></div>');
    buf.append('<div class="settingCellAcc2"><input type="radio" name="AccName" id="settingAccNameNo" value="1" /><label for="settingAccNameNo">');
    buf.append(GetText("lbl_no_display"));
    buf.append('</label></div></div>');
    buf.append('<div class="betslipRow"><div class="settingCellAcc1">');
    buf.append(GetText("lbl_tb_acct_bal"));
    buf.append(':</div>');
    buf.append('<div class="settingCellAcc1"><input type=radio name="AccBal" id="settingAccBalYes" value="0" /><label for="settingAccBalYes">');
    buf.append(GetText("lbl_display"));
    buf.append('</label></div>');
    buf.append('<div class="settingCellAcc2"><input type=radio name="AccBal" id="settingAccBalNo" value="1" /><label for="settingAccBalNo">');
    buf.append(GetText("lbl_no_display"));
    buf.append('</label></div></div>');
    buf.append('<div style="margin:2px 5px 0px 0px; border-top: 1px solid #E5E5E5"></div>');
    $('#settingBody4').html(buf.toString());
}

function createAlupTable() {
    var buf = new StringBuffer();
    buf.append('<div class="betslipRow"><div class="settingCellAcc1">');
    buf.append(GetText("lbl_after_add_alup"));
    buf.append(':</div>');
    buf.append('<div class="settingCellAcc1"><input type=radio name="AlupSetting" id="settingAlupYes" value="1" /><label for="settingAlupYes">');
    buf.append(GetText("lbl_alup_keep_single"));
    buf.append('</label></div>');
    buf.append('<div class="settingCellAcc2"><input type=radio name="AlupSetting" id="settingAlupNo" value="2" /><label for="settingAlupNo">');
    buf.append(GetText("lbl_alup_delete_single"));
    buf.append('</label></div></div>');
    buf.append('<div style="margin:2px 5px 0px 0px; border-top: 1px solid #E5E5E5"></div>');
    $('#settingBody5').html(buf.toString());
}

function createPeNoteTable() {
    var buf = new StringBuffer();
    buf.append('<div class="betslipRow">');
    buf.append('<div class="settingCellAcc1"><input type=radio name="PeNoteSetting" id="settingPeNoteOn" value="1" /><label for="settingPeNoteOn">');
    buf.append(GetText("lbl_on"));
    buf.append('</label></div>');
    buf.append('<div class="settingCellAcc2"><input type=radio name="PeNoteSetting" id="settingPeNoteOff" value="0" /><label for="settingPeNoteOff">');
    buf.append(GetText("lbl_off"));
    buf.append('</label></div><div class="settingCellAcc1"></div></div>');
    buf.append('<div style="margin:2px 5px 0px 0px; border-top: 1px solid #E5E5E5"></div>');
    $('#settingBody6').html(buf.toString());
}

function SettingVO() {
    this.pool = arguments[0];
    this.display = arguments[1];
    this.defAmt = arguments[2];
    this.storedAmt = arguments[2];
    this.minAmt = arguments[3];
    this.oldOrder = arguments[4];
    this.nameEn = arguments[5];
    this.nameCh = arguments[6];

    this.getName = function() {
        return ((GetLanguage() == cLangENG) ? this.nameEn : this.nameCh);
    }
}

function initPSObj() {
    // [poolType], [display flag from AT], [default amount], [minimum amount], [old cookies order], [english name], [chinese name]
    psHBArray['WIN'] = new SettingVO('WIN', IsBetTypeEnabled('WIN'), 10, 10, 0, 'Win', '獨贏');
    psHBArray['PLA'] = new SettingVO('PLA', IsBetTypeEnabled('PLA'), 10, 10, 1, 'Place', '位置');
    psHBArray['W-P'] = new SettingVO('W-P', IsBetTypeEnabled('W-P'), 10, 10, 2, 'Win - Place', '獨贏及位置');
    psHBArray['QIN'] = new SettingVO('QIN', IsBetTypeEnabled('QIN'), 10, 10, 3, 'Quinella', '連贏');
    psHBArray['QPL'] = new SettingVO('QPL', IsBetTypeEnabled('QPL'), 10, 10, 4, 'Quinella Place', '位置Q');
    psHBArray['QQP'] = new SettingVO('QQP', IsBetTypeEnabled('QQP'), 10, 10, 5, 'Quinella - Q Place', '連贏及位置Q');
    psHBArray['CW'] = new SettingVO("CW", IsBetTypeEnabled('CW'), 10, 10, -1, 'Composite Win', '組合獨贏');
    psHBArray['CWA'] = new SettingVO("CWA", false, 10, 10, -1, 'Composite Win', '組合獨贏');
    psHBArray['CWB'] = new SettingVO("CWB", false, 10, 10, -1, 'Composite Win', '組合獨贏');
    psHBArray['CWC'] = new SettingVO("CWC", false, 10, 10, -1, 'Composite Win', '組合獨贏');
    psHBArray['IWN'] = new SettingVO('IWN', IsBetTypeEnabled('IWN'), 10, 10, -1, 'Insurance Win', '保險獨贏');
    psHBArray['FCT'] = new SettingVO('FCT', IsBetTypeEnabled('FCT'), 10, 1, -1, 'Forecast', '二重彩');
    psHBArray['TCE'] = new SettingVO('TCE', IsBetTypeEnabled('TCE'), 10, 1, 6, 'Tierce', '三重彩');
    psHBArray['TRI'] = new SettingVO('TRI', IsBetTypeEnabled('TRI'), 10, 1, 7, 'Trio', '單T');
    psHBArray['F-F'] = new SettingVO('F-F', IsBetTypeEnabled('F-F'), 10, 1, -1, 'First 4', '四連環');
    psHBArray['QTT'] = new SettingVO('QTT', IsBetTypeEnabled('QTT'), 10, 1, -1, 'Quartet', '四重彩');
    psHBArray['DBL'] = new SettingVO('DBL', IsBetTypeEnabled('DBL'), 10, 1, 10, 'Double', '孖寶');
    psHBArray['TBL'] = new SettingVO('TBL', IsBetTypeEnabled('TBL'), 10, 1, 11, 'Treble', '三寶');
    psHBArray['D-T'] = new SettingVO('D-T', IsBetTypeEnabled('D-T'), 10, 1, 8, 'Double Trio', '孖T');
    psHBArray['T-T'] = new SettingVO('T-T', IsBetTypeEnabled('T-T'), 10, 1, 9, 'Triple Trio', '三T');
    psHBArray['6UP'] = new SettingVO('6UP', IsBetTypeEnabled('6UP'), 10, 1, 12, 'Six Up', '六環彩');
    psHBArray['JKC'] = new SettingVO('JKC', IsBetTypeEnabled('JKC'), 10, 10, -1, 'Jockey Challenge', '騎師王');
    psHBArray['TNC'] = new SettingVO('TNC', IsBetTypeEnabled('TNC'), 10, 10, -1, 'Trainer Challenge', '練馬師王');
    psHBArray['ALUPX'] = new SettingVO('ALUPX', true, 10, 1, 13, 'All Up/Cross Pool All Up', '過關/混合過關');

    // [poolType], [display flag from AT], [default amount], [minimum amount], [old cookies order], [english name], [chinese name]
    psSBArray['ALUPX'] = new SettingVO('ALUPX', true, 10, 10, 15, 'All Up<br>/Cross Pool All Up', '過關/混合過關');
    psSBArray['SGA'] = new SettingVO('SGA', IsBetTypeEnabled('SGA'), 10, 10, 46, 'Same Game All Up', '同場過關');
    psSBArray['HAD'] = new SettingVO('HAD', IsBetTypeEnabled('HAD'), 10, 10, 14, 'Home/Away/Draw', '主客和');
    psSBArray['TQL'] = new SettingVO('TQL', IsBetTypeEnabled('TQL'), 10, 10, 49, 'To Qualify', '晉級隊伍');
    psSBArray['FHA'] = new SettingVO('FHA', IsBetTypeEnabled('FHA'), 10, 10, -1, 'First Half HAD', '半場主客和');
    psSBArray['HHA'] = new SettingVO('HHA', IsBetTypeEnabled('HHA'), 10, 10, 16, 'Handicap HAD', '讓球主客和');
    psSBArray['HDC'] = new SettingVO('HDC', IsBetTypeEnabled('HDC'), 200, 200, 20, 'Handicap', '讓球');
    psSBArray['HIL'] = new SettingVO('HIL', IsBetTypeEnabled('HIL'), 10, 10, 28, 'HiLo', '入球大細');
    psSBArray['FHL'] = new SettingVO('FHL', IsBetTypeEnabled('FHL'), 10, 10, -1, 'First Half HiLo', '半場入球大細');
    psSBArray['CHL'] = new SettingVO('CHL', IsBetTypeEnabled('CHL'), 10, 10, -1, 'Corner Taken HiLo', '開出角球大細');
    psSBArray['NTS'] = new SettingVO('NTS', IsBetTypeEnabled('NTS'), 10, 10, 49, 'Next Team to Score', '下一隊入球');
    psSBArray['CRS'] = new SettingVO('CRS', IsBetTypeEnabled('CRS'), 10, 10, 22, 'Correct Score', '波膽');
    psSBArray['FCS'] = new SettingVO('FCS', IsBetTypeEnabled('FCS'), 10, 10, -1, 'First Half Correct Score', '半場波膽');
    psSBArray['FTS'] = new SettingVO('FTS', IsBetTypeEnabled('FTS'), 10, 10, 14, 'First Team to Score', '第一隊入球');
    psSBArray['TTG'] = new SettingVO('TTG', IsBetTypeEnabled('TTG'), 10, 10, 24, 'Total Goals', '總入球');
    psSBArray['OOE'] = new SettingVO('OOE', IsBetTypeEnabled('OOE'), 10, 10, 26, 'Odd/Even', '入球單雙');
    psSBArray['FGS'] = new SettingVO('FGS', IsBetTypeEnabled('FGS'), 10, 10, 30, 'First Scorer', '首名入球');
    psSBArray['HFT'] = new SettingVO('HFT', IsBetTypeEnabled('HFT'), 10, 10, 18, 'HaFu', '半全場');
    psSBArray['SPC'] = new SettingVO('SPC', IsBetTypeEnabled('SPC'), 10, 10, 46, 'Specials', '特別項目');
    psSBArray['GPW'] = new SettingVO('GPW', IsBetTypeEnabled('GPW'), 10, 10, 41, 'Group Winner', '小組首名');
    psSBArray['GPF'] = new SettingVO('GPF', IsBetTypeEnabled('GPF'), 10, 10, 43, 'Group Forecast', '小組一二名');
    psSBArray['TPS'] = new SettingVO('TPS', IsBetTypeEnabled('TPS'), 10, 10, 45, 'Top Scorer', '神射手');
    psSBArray['CHP'] = new SettingVO('CHP', IsBetTypeEnabled('CHP'), 10, 10, 38, 'Champion', '冠軍');
}

function loadPSValues() {
    // get racing units from cookies
    try {
        var amtStr = $.cookie(cookiePrefixHB);
        if (amtStr != null && amtStr != '') {
            var amtArray = amtStr.split(',');
            for (var i = 0; i < amtArray.length; i++) {
                var tmp = amtArray[i].split(':');
                if (psHBArray[tmp[0]].minAmt > parseInt(tmp[1], 10))
                    psHBArray[tmp[0]].storedAmt = psHBArray[tmp[0]].minAmt;
                else
                    psHBArray[tmp[0]].storedAmt = parseInt(tmp[1], 10);
            }
        }
    } catch (e) {}

    // get football units from cookies
    var amtStr = $.cookie(cookiePrefixSB);
    try {
        if (amtStr != null && amtStr != '') {
            var amtArray = amtStr.split(',');
            for (var i = 0; i < amtArray.length; i++) {
                var tmp = amtArray[i].split(':');
                if (psSBArray[tmp[0]].minAmt > parseInt(tmp[1], 10))
                    psSBArray[tmp[0]].storedAmt = psSBArray[tmp[0]].minAmt;
                else
                    psSBArray[tmp[0]].storedAmt = parseInt(tmp[1], 10);
            }
        }
    } catch (e) {}
}

function GetSetting(type, name, family, m6PartialFlag) {
    switch (type) {
        case "UnitBet":
            loadPSValues();
            if (family == 'MK6') {
                return GetM6UnitBet(m6PartialFlag);
            } else if (family == 'FB')
                return psSBArray[name].storedAmt;
            else if (family == 'HR')
                return psHBArray[name].storedAmt;
            else
                return 10;
        case "MinBet":
            loadPSValues();
            if (family == 'MK6') {
                return GetM6UnitBet(m6PartialFlag);
            } else if (family == 'FB')
                return psSBArray[name].minAmt;
            else if (family == 'HR')
                return psHBArray[name].minAmt;
            else
                return 10;
        case "AccInfo":
            return getAccountInfoFromCookie(valueMap[name]);
        case "ALUP":
            return getAlupSettingsFromCookie();
        case "M6DrawNo":
            return getM6DrawNoFromCookie();
        case "PeNote":
            return getPeNoteSettingsFromCookie();
    }
    return null;
}

function getAccountInfoFromCookie(idx) {
    var accInfoStr = $.cookie(cookieAccInfo);
    if (accInfoStr != null && accInfoStr != '') {
        var accInfoArray = accInfoStr.split(',');
        return accInfoArray[idx] == '1' ? '1' : '0';
    }
    return '0';
}

function loadAccountInfo() {
    $("input[name=AccName][value='" + getAccountInfoFromCookie(0) + "']").prop('checked', true);
    $("input[name=AccBal][value='" + getAccountInfoFromCookie(1) + "']").prop('checked', true);
}

function getM6DrawNoFromCookie() {
    var m6DrawNo = $.cookie(cookieM6DrawNo);
    if (m6DrawNo != null && m6DrawNo != '')
        return parseInt(m6DrawNo, 10);
    return '0';
}

function loadM6DrawNoSetting() {
    $('#M6DrawNoDropdown').val(getM6DrawNoFromCookie());
}

function getAlupSettingsFromCookie() {
    st = $.cookie(cookieAlupSetting);
    return st == '2' ? '2' : '1';
}

function loadAlupSetting() {
    $("input[name=AlupSetting][value='" + getAlupSettingsFromCookie() + "']").prop('checked', true);
}

function getPeNoteSettingsFromCookie() {
    st = $.cookie(cookiePeNote);
    return st == '0' ? '0' : '1';
}

function loadPeNoteSetting() {
    $("input[name=PeNoteSetting][value='" + getPeNoteSettingsFromCookie() + "']").prop('checked', true);
}

function setDefaultAmt() {
    for (var i in psHBArray) {
        $('#' + textboxPrefixHB + psHBArray[i].pool).val(psHBArray[i].defAmt);
    }

    for (var i in psSBArray) {
        $('#' + textboxPrefixSB + psSBArray[i].pool).val(psSBArray[i].defAmt);
    }
    $('#M6DrawNoDropdown').val(0);
    $("input[name=AccName][value='0']").prop('checked', true);
    $("input[name=AccBal][value='0']").prop('checked', true);
    $("input[name=AlupSetting][value='1']").prop('checked', true);
    $("input[name=PeNoteSetting][value='1']").prop('checked', true);
}

function saveAmt(closeWin) {
    var para = {
        expires: 365,
        path: '/',
        domain: document.domain
    };
    var removePara = {
        expires: 0,
        path: '/BetSlip',
        domain: document.domain
    };

    // racing validation
    for (var i in psHBArray) {
        var txtBox = $('#' + textboxPrefixHB + psHBArray[i].pool);
        if (txtBox.length > 0 && !checkInput(txtBox, psHBArray[i]))
            return;
    }
    // football validation
    for (var i in psSBArray) {
        var txtBox = $('#' + textboxPrefixSB + psSBArray[i].pool);
        if (txtBox.length > 0 && !checkInput(txtBox, psSBArray[i]))
            return;
    }

    // save racing amount
    var buf = [];
    for (var i in psHBArray) {
        var txtBox = $('#' + textboxPrefixHB + psHBArray[i].pool);
        if ($.inArray(psHBArray[i].pool, ["CWA", "CWB", "CWC"]) != -1) {
            txtBox = $('#' + textboxPrefixHB + "CW");
        }
        var txtStr = '' + psHBArray[i].pool + ':' + (txtBox.length > 0 ? delComma(txtBox.val()) : psHBArray[i].storedAmt);
        buf.push(txtStr);
    }
    $.cookie(cookiePrefixHB, '', removePara);
    $.cookie(cookiePrefixHB, buf.join(','), para);

    // save football amount
    buf = [];
    for (var i in psSBArray) {
        var txtBox = $('#' + textboxPrefixSB + psSBArray[i].pool);
        var txtStr = '' + psSBArray[i].pool + ':' + (txtBox.length > 0 ? delComma(txtBox.val()) : psSBArray[i].storedAmt);
        buf.push(txtStr);
    }
    $.cookie(cookiePrefixSB, '', removePara);
    $.cookie(cookiePrefixSB, buf.join(','), para);

    // save M6DrawNo cookie
    var sM6DrawNo = $('#M6DrawNoDropdown').val();
    $.cookie(cookieM6DrawNo, '', removePara);
    $.cookie(cookieM6DrawNo, sM6DrawNo, para);

    // save Acc Info cookie
    var aName = $("input[name='AccName']:checked").val();
    var aBal = $("input[name='AccBal']:checked").val();
    $.cookie(cookieAccInfo, '', removePara);
    $.cookie(cookieAccInfo, aName + ',' + aBal, para);

    // save Alup Setting cookie
    var alup = $("input[name='AlupSetting']:checked").val();
    $.cookie(cookieAlupSetting, '', removePara);
    $.cookie(cookieAlupSetting, alup, para);

    var peOpt = $("input[name='PeNoteSetting']:checked").val();
    $.cookie(cookiePeNote, peOpt, para);
    if (jsPeNoteGlobalFlag) {
        if (typeof(opn.enquirePeNote) != 'undefined')
            opn.enquirePeNote();
        else
            enquirePeNote();
    }

    // save table open status
    var aBuf = new StringBuffer();
    aBuf.append('_');
    for (var i = 1; i <= 6; i++) {
        if ($('#settingHeader' + i).hasClass('settingHeaderClose'))
            aBuf.append(',1');
        else
            aBuf.append(',0');
    }
    $.cookie(cookieTbStatus, '', removePara);
    $.cookie(cookieTbStatus, aBuf.toString(), para);

    showDiv(null, '', false);
}

function isInteger(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) < '0' || str.charAt(i) > '9')
            return false;
    }
    return true;
}

function checkInput(inputObj, psObj) {
    var txt = delComma(inputObj.val());
    var isError = (txt == '') ||
        isNaN(txt) ||
        !isInteger(txt) ||
        (parseInt(txt, 10) < psObj.minAmt); // lower than minimum amount
    if (isError) {
        alert(GetText('lbl_input_err') + ': ' + psObj.getName());
        inputObj.focus();
        return false;
    }
    return true;
}