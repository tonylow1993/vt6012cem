function slipToogle() {
    //ignore when idle alert
    if (isIdleAlert) {
        return;
    }

    if ($('#slipToggleButton').hasClass('slipExpand')) {
        slipOpen();
    } else {
        slipClose();
    }
}

function slipOpen() {
    $('#divSlip')
        .css('z-index', 200)
        .animate({
            right: '110px',
            width: '331px'
        }, 200);
    $('#slipToggleButton').attr('class', 'slipCollapse');
    RedrawBetlineTable();
}

function slipClose(noMotion) {
    if (noMotion) {
        $('#divSlip').css({
            right: '0px',
            width: '221px',
            zIndex: ''
        });
    } else {
        $('#divSlip').animate({
            right: '0px',
            width: '221px',
            zIndex: ''
        }, 200);
    }
    $('#slipToggleButton').attr('class', 'slipExpand');
    for (var j = 0; j < betlines.length; j++) {
        betlines[j].descOpen = false;
    }
    RedrawBetlineTable();
}

function isSlipOpen() {
    return $('#slipToggleButton').hasClass('slipCollapse');
}

function initBetslip() {

    $('#topHelpButton').attr('title', GetText('alt_help'));
    $('#minimizeButton').attr('title', GetText('alt_minimize'));
    $('#topHelpButtonLogin').attr('title', GetText('alt_help'));
    $('#minimizeButtonLogin').attr('title', GetText('alt_minimize'));
    $('#divBetSlipMinimize').attr('title', GetText('alt_restore'));
    $('#loginButton').attr('title', GetText('alt_login'));
    $('#loginSSONextButton').attr('title', GetText('alt_next'));
    $('#linkAccInfoRegister').html(GetText('alt_register'));
    $('#linkPersonalSettings').html(GetText('alt_pic_settings'));
    $('#linkCannotLogin').html(GetText('alt_other_services'));
    $('#slipToggleButton').attr('title', GetText('alt_click_open_close'));
    $('#bottomHelpButton').attr('title', GetText('alt_pic_allup_help'));
    $('#divAlupFormulaLabel').html(GetText('fld_formula'));
    $('#bsAddBetButton').attr('title', GetText('alt_addnew_all_up'));
    $('#fldTotalNoOfBets').html(GetText('fld_total_no_of_bets'));
    $('#fldTotalAmount').html(GetText('fld_total_amount'));
    $('#bsDeleteBetButton').attr('title', GetText('alt_clear'));
    $('#bsSendPreviewButton').attr('title', GetText('alt_preview'));
    $('#regOnline').html(GetText('alt_reg_online'));
    $('#regApply').html(GetText('alt_reg_apply'));
    $('#txtChgWebPassword').html(GetText('txt_chg_web_password'));
    $('#txtChgSecQuestion').html(GetText('txt_chg_sec_question'));
    $('#txtChgWebProfile').html(GetText('txt_chg_web_profile'));
    $('#txtPersonalSettings').html(GetText('txt_personal_settings'));
    $('#txtFootballLive').html(GetText('txt_football_live'));

    $('#ekbaDivTitle').html(GetText('ekba_header'));
    $('#txtForgetWebPass').html(GetText('alt_forget_webpass'));

    $('#pic_confirm').attr('title', GetText('txt_confirm'));
    $('#pic_cancel').attr('title', GetText('alt_login_cancel'));
    $('#pic_backSSO').attr('title', GetText('alt_sso_back'));
    $('#pic_logoutSSO').attr('title', GetText('alt_logout'));
    $('#pic_confirmSSO').attr('title', GetText('txt_confirm'));

    $('#disclaimerHeader').html(GetText('tAndCHeader'));
    $('#disclaimerProceed').attr('title', GetText('tAndCProceed'));

    $('#linkAccStmt').html(GetText('alt_pic_ac_record'));
    $('#linkPersonalSettingsLogin').html(GetText('alt_pic_settings'));
    $('#linkFundsTransfer').html(GetText('alt_pic_transfer'));

    UpdateBetTotal();
    resetInput();

    if (!isSSOSignedIn()) {
        ShowAccInfoDefault();
    } else {
        ShowAccInfoSSO(GetDataStore('sso_web_id'));
    }

    initPassword();
    initAccountTxt();
}

function resetInput() {
    $('#account').val(GetText('fld_account_no'));
    $('#passwordInput1').val(GetText('fld_web_password'));
    $('#passwordInput1').show();
    $('#password').val('');
    $('#password').hide();
}

function initAccountTxt() {
    $('#account').focus(function() {
        if (this.value == GetText('fld_account_no')) {
            this.value = '';
        }
    });
    $('#account').blur(function() {
        if (this.value == '') {
            this.value = GetText('fld_account_no');
        }
    });
}

function initPassword() {
    if (isIDevice()) {
        //use onclick and remove tab idx to prevent passwordbox not enterable
        $('#passwordInput1').click(function() {
            $(this).hide();
            $('#password').show();
            $('#password').focus();
        });
        $('#passwordInput1').attr("tabindex", -1);
        $('#password').focus(function() {
            $('#account').attr("readonly", "readonly");
        });
        $('#password').blur(function() {
            $('#account').removeAttr("readonly", "readonly");
        });
    } else {
        $('#passwordInput1').focus(function() {
            $(this).hide();
            $('#password').show();
            $('#password').focus();
        });
    }
}

function showOOSMsg() {
    if (!byPassEOD && (GetPara('eWinASDetection') == '' || GetOnlinePara('OosMsgId') != '0')) {
        $('#betslipDimmedDiv').show();
        $('#betslipDimmedText').show();
        var oMsg = (GetLanguage() == cLangENG) ? GetOnlinePara('OosMsgEn') : GetOnlinePara('OosMsgCh');
        if (oMsg == null || oMsg == '') {
            $('#betslipDimmedText').css({
                'margin-top': '170px'
            });
            oMsg = GetError('SYSTEM NOT READY');
        }
        $('#betslipDimmedText').html(oMsg);
    }
}

function CheckRefreshUnitbet(index) {
    CheckUnitBet(index);
    refreshUnitBet(index);
}

function refreshUnitBet(index) {
    UpdateBetTotal();
    betlines[index].unitHit = false;
}

function RedrawBetlineTable() { //keep
    var bufHtml = new StringBuffer();

    for (var i = 0; i < betlines.length; i++) {
        // ALL UP IMAGES
        var allUpImage = '';
        var allUpImageTxt = '';
        switch (betlines[i].enableAllUp) {
            case cAllUpEnabled:
                allUpImage = 'alupIcon';
                allUpImageTxt = GetText('alt_allup_enabled');
                break;
            case cAllUpSelected:
                allUpImage = 'alupIconON';
                allUpImageTxt = GetText('alt_allup_selected');
                break;
            case cAllUpDisabled:
                allUpImage = 'alupIconDim';
                allUpImageTxt = GetText('alt_allup_disabled');
                break;
        }

        var allUpImageHtml = new StringBuffer();
        if (betlines[i].enableAllUp != cAllUpNA) {
            allUpImageHtml.append('<div class="').append(allUpImage).append('" ')
                .append('onclick="OnClickAllUpButton(').append(i).append(');" onMouseOver="betlines[')
                .append(i).append('].alupHit = true;" onMouseOut="betlines[')
                .append(i).append('].alupHit = false;" ')
                .append('title="').append(allUpImageTxt).append('"')
                .append('></div>');
        }

        bufHtml.append('<div class="slipBetBg').append(i % 2).append('" title="');
        bufHtml.append(betlines[i].descOpen ? GetText('alt_brief') : GetText('alt_details'));
        bufHtml.append('" onMouseOut="if(isIDevice()){CheckRefreshUnitbet(')
            .append(i).append(');}betlines[')
            .append(i).append('].resetHit();" onclick="betRowClick(\'').append(i).append('\');" id="betCell')
            .append(i).append('">');
        bufHtml.append('<div class="betslipRow">');

        // LINE 1 NUMBER
        bufHtml.append('<div class="slipBetNumber">').append(i + 1).append('.</div>');
        // LINE 1 UPPER DISPLAY LINE
        bufHtml.append('<div class="slipBet1stLine">');
        bufHtml.append('<div style="float:left;');
        if (betlines[i].descOpen) {
            bufHtml.append('width=200px;max-width:200px;">');
            bufHtml.append(genLongLine(betlines[i].foBetObj));

            if (betlines[i].foBetObj.flexibet)
                bufHtml.append('<br><br>').append(GetText('fld_bet_total')).append(' ').append(FormatCurrency(betlines[i].foBetObj.unitBet)).append(' (').append(GetText('flexibet_name')).append(')');
            else
                bufHtml.append('<br><br>').append(GetText('fld_bet_total')).append(' ').append(FormatCurrency(betlines[i].foBetObj.unitBet * betlines[i].foBetObj.getSelectionSize()));
        } else
            bufHtml.append('">').append(genShortLine1(betlines[i].foBetObj));
        bufHtml.append('</div>');

        bufHtml.append('<div style="float:right; vertical-align:top;">');

        // LINE 1 DELETE BUTTON
        if (betlines[i].enableAllUp != cAllUpSelected) {
            bufHtml.append('<div class="slipDelButton" onclick="DeleteBetlineWithIndex(')
                .append(i).append(', true); isClientActionTaken(true); event.cancelBubble=true;" onMouseOver="betlines[')
                .append(i).append('].delHit = true;" onMouseOut="betlines[')
                .append(i).append('].delHit = false;" id="betDel')
                .append(i).append('" title="')
                .append(GetText('alt_delete_betline')).append('"></div>');
        }
        bufHtml.append('</div></div></div>');

        // LINE 2 LOWER DISPLAY LINE
        var line2 = genShortLine2(betlines[i].foBetObj);
        switch (betlines[i].foBetObj.prod) {
            case "MK6":
                var pos = line2.indexOf('>') >= 0 ? line2.indexOf('>') + 1 : 0;
                if (line2.length > pos + 11)
                    line2 = line2.substring(0, pos + 9) + "...";
                break;
            case "FB":
                var pos = line2.indexOf('>') >= 0 ? line2.indexOf('>') + 1 : 0;
                if (line2.length > pos + 8)
                    line2 = line2.substring(0, pos + 6) + "...";
                break;
            case "HR":
                if (betlines.length < 7) {
                    if (line2.length > 10)
                        if (betlines[i].foBetObj.bType == "CWA" ||
                            betlines[i].foBetObj.bType == "CWB" ||
                            betlines[i].foBetObj.bType == "CWC") {
                            line2 = line2.substring(0, 9) + "...";
                        } else {
                            line2 = line2.substring(0, 8) + "...";
                        }
                } else {
                    if (line2.length > 8)
                        line2 = line2.substring(0, 6) + "...";
                }
                break;
        }

        bufHtml.append('<div class="betslipRow"><div class="betslipCell"></div>');
        bufHtml.append('<div class="slipBet2ndLine">');
        var alup = allUpImageHtml.toString();
        if (alup != '')
            bufHtml.append(alup);

        if (!betlines[i].descOpen) {
            bufHtml.append('<div style="float:left; text-overflow: ellipsis">').append(line2).append('</div>');
        }

        if (betlines[i].foBetObj.prod == 'MK6' && !isSingleM6Bet(betlines[i].foBetObj)) {
            bufHtml.append('<div style="float:right">');
            bufHtml.append(createM6UnitBetDropdown(i, m6DropdownTextPadding(betlines[i].foBetObj.unitBet.toString()), isSlipOpen()));
            bufHtml.append('</div>');
        } else {
            // LINE 2 FLEXIBET OR UNITBET
            bufHtml.append('<div style="float:right">');
            if (betlines[i].betMethod == -1)
                bufHtml.append('$');
            else {
                var defaultBetMethod = 'flexi_' + (isSlipOpen() ? 'l' : 's');
                bufHtml.append(createFlexiDropdown(i, GetText(defaultBetMethod)[betlines[i].betMethod], isSlipOpen()));
            }

            // LINE 2 UNIT BET INPUT BOX
            bufHtml.append('<input id="inputAmount')
                .append(i).append('" type="text" maxlength="7" value="')
                .append(betlines[i].foBetObj.unitBet)
                .append('" autocomplete="off" class="slipBetInputField" onFocus="betlines[')
                .append(i).append('].unitHit = true;" onMouseOver="betlines[')
                .append(i).append('].unitHit = true;" onMouseOut="betlines[')
                .append(i).append('].unitHit = false;"');

            if (betlines[i].foBetObj.prod == "MK6")
                bufHtml.append(' disabled');
            else {
                bufHtml.append(' onblur="CheckRefreshUnitbet(').append(i).append(');"');
            }
            bufHtml.append('></div>');
        }
        bufHtml.append('</div>');
        // POST
        bufHtml.append('</div></div>');
    }

    $('#divBetLayer').html(bufHtml.toString());
    UpdateBetTotal();

    // set background position
    var lastPos = 0;
    if (betlines.length > 0) {
        var constFactor = $('#multiplePanel').is(':visible') ? 30 : 5;
        lastPos = $('#betCell' + (betlines.length - 1)).position().top + $('#betCell' + (betlines.length - 1)).height() - constFactor;
    }
    $('#divBetLayer').css({
        'background-image': 'url(/info/include/images/betslip_slip_bg' + (betlines.length % 2) + '.gif)',
        'background-position': '0px ' + lastPos + 'px'
    });

}


function UpdateBetTotal() {
    var totalSelections = 0;
    var totalBetAmount = 0;
    for (var i = 0; i < betlines.length; i++) {
        totalSelections += betlines[i].foBetObj.getSelectionSize();
        if (betlines[i].foBetObj.flexibet) // flexibet
            totalBetAmount += parseFloat(betlines[i].foBetObj.unitBet);
        else
            totalBetAmount += betlines[i].foBetObj.getSelectionSize() * betlines[i].foBetObj.unitBet;
    }
    $('#total_no_of_bets').html(totalSelections + '');
    $('#fld_total_bet_amount').html(FormatCurrency(totalBetAmount));
}

function DrawAddAllUpButton(isChgSlip) {
    if (allUpFoBetObj != null && allUpFoBetObj.pools.length > 1) {
        $('#bsAddBetButton').show();
        $('#inputAllUp').prop('disabled', false);
        if (tmpAllUpValue != '') {
            $('#inputAllUp').val(tmpAllUpValue);
            tmpAllUpValue = '';
        } else if ($('#inputAllUp').val() == '') {
            $('#inputAllUp').val('$' + GetSetting("UnitBet", "ALUPX", allUpFoBetObj.prod));
            tmpAllUpValue = '';
        }
    } else {
        $('#bsAddBetButton').hide();
        $('#inputAllUp').prop('disabled', true);
        if (allUpFoBetObj != null) {
            if (allUpFoBetObj.pools.length == 0)
                tmpAllUpValue = '';
            else if (!isChgSlip && allUpFoBetObj.pools.length == 1)
                tmpAllUpValue = $('#inputAllUp').val();
        }
        $('#inputAllUp').val('');
    }
}

function LoadAllUpFormula() {
    var sformula = $('#sel_formula');
    sformula.empty();
    sformula.prop('disabled', true);
    if (allUpFoBetObj != null) {
        if (allUpFoBetObj.pools.length >= min_allup && allUpFoBetObj.pools.length <= max_allup) {
            _LoadAllUpFormula(allUpFoBetObj.pools.length);
        }
    }
}

function _LoadAllUpFormula(level) {
    var sformula = $('#sel_formula');
    var allup_flag = array_allup_level;
    for (var i = 0; i < allup_flag.length; i++) {
        if (level == allup_flag[i]) {
            var allup_comb = allup_formula[level];
            var pos = 0;
            for (var j = 0; j < allup_comb.length; j++) {
                var formula = level + "x" + allup_comb[j];
                var bAddAllup = true;

                if (allUpFoBetObj.prod == "FB") {
                    for (var k = 0; k < allUpFoBetObj.pools.length; k++) {
                        if (func_search_allup_xml(allUpFoBetObj.pools[k].bType, formula) == "0") {
                            bAddAllup = false;
                            break;
                        }
                    }
                }

                if (bAddAllup) {
                    sformula.append($('<option></option>').val(allup_comb[j]).html(formula));
                }
            }
            break;
        }
    }
    sformula.prop('disabled', sformula.length < 1);
}

function inputAllUpValueChanged(i) {
    if (!$('#inputAllUp').is(':disabled')) {
        var allUpVal = $('#inputAllUp').val().replace('$', '');
        if (parseInt(allUpVal, 10) + i > 0)
            $('#inputAllUp').val('$' + (parseInt(allUpVal, 10) + i));
    }
}

function ResetBetlineTable() {
    DeleteAllAllUpBetlines();
    DeleteAllBetlines();
    RedrawBetlineTable();
    DrawAddAllUpButton();
    LoadAllUpFormula();
}

function betRowClick(i) {
    if (!betlines[i].delHit && !betlines[i].alupHit && !betlines[i].unitHit) {
        if (!betlines[i].descOpen) {
            if (!isSlipOpen()) {
                slipOpen();
            }
            betlines[i].descOpen = true;
        } else {
            betlines[i].descOpen = false;
            if (getBetClickCount() == 0) {
                if (isSlipOpen()) slipClose();
            }
        }

        var itemOldHeight = $('#betCell' + i).height();

        RedrawBetlineTable();

        var divBetLayer = $('#divBetLayer');
        var divBetLayerTop = divBetLayer.offset().top;
        var divBetLayerHeight = divBetLayer.height();
        var item = $('#betCell' + i);
        var itemTop = item.offset().top;
        var itemNewHeight = item.height();
        if (itemTop + itemNewHeight > divBetLayerTop + divBetLayerHeight) {
            divBetLayer.scrollTop(divBetLayer.scrollTop() + (itemNewHeight - itemOldHeight) + 20);
        }
    }
}

function FormatCurrency(amount) {
    if (typeof(amount) == "string") {
        amount = amount.replace(/,/g, '').replace(/\$/g, '');
    }

    if (isNaN(amount)) {
        return amount;
    }
    return "$ " + CommaFormatted(CurrencyFormatted(amount));
}

function CurrencyFormatted(amount) {
    var i = parseFloat(amount);
    if (isNaN(i)) {
        i = 0.00;
    }
    var minus = '';
    if (i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    var tStr = new String(i);
    if (tStr.indexOf('.') < 0) {
        tStr += '.00';
    }
    if (tStr.indexOf('.') == (tStr.length - 2)) {
        tStr += '0';
    }
    tStr = minus + tStr;
    return tStr;
}

function CommaFormatted(amount) {
    if (amount) {
        amount = amount.toString();
        var delimiter = ","; // replace comma if desired
        var a = amount.split('.', 2)
        var d = a[1];
        var i = parseInt(a[0]);
        var j = parseFloat(amount);
        if (isNaN(i) || isNaN(j)) {
            return '';
        }
        var minus = '';
        if (j < 0) {
            minus = '-';
        }
        i = Math.abs(i);
        var n = new String(i);
        var a = [];
        while (n.length > 3) {
            var nn = n.substr(n.length - 3);
            a.unshift(nn);
            n = n.substr(0, n.length - 3);
        }
        if (n.length > 0) {
            a.unshift(n);
        }
        n = a.join(delimiter);
        if (!d || d.length < 1) {
            amount = n;
        } else {
            amount = n + '.' + d;
        }
        amount = minus + amount;
    }
    return amount;
}

function ShowDisclaimer(isShow, showWelcome) {
    if (isShow) {
        HideAllError();
        setBetslipState(STATE_DISCLAIMER);
        setDisclaimerText();
        $('#divDisclaimer').show();
        focusField($("#divDisclaimer"));
    } else {
        $('#divDisclaimer').hide();

        setBetslipState(STATE_NORMAL);
        ResetIdleTimer(false);
        if (showWelcome)
            ShowWelcome();
    }
    checkFootballLiveDisplay();
    updatePerformTvVisibility();
}

function ShowWelcome() {
    var buf = new StringBuffer();
    buf.append('<div class="welcomeDiv">');
    buf.append('<div class="welcomeTitle1">');
    buf.append(GetText('acc_logon_header'));
    buf.append('</div><div class="welcomeTitle2">');
    buf.append(GetText('acc_logon_last_logon'));
    buf.append('</div><div class="welcomeBody1">');
    buf.append(GetText('acc_logon_date'));
    buf.append(' ');
    buf.append(GetDataStore('last_login_date'))
    buf.append('</div><div class="welcomeBody1">');
    buf.append(GetText('acc_logon_time'));
    buf.append(' ');
    buf.append(GetDataStore('last_login_time'));
    buf.append(GetText('acc_logon_hk_remark'));
    buf.append('</div>');
    buf.append('</div>');
    ShowError(1, buf.toString(), true, 10000);
}

function idleAlertClose() {
    ResetIdleTimer(true);
    clearTimeout(idleAlertTimer);
    isIdleAlert = false;
    slipClose();
    ClosePopup(1);
}