function disabledField(flag) {
    if (!isSSOSignedIn()) {
        $('#account').prop('disabled', flag);
        $('#passwordInput1').prop('disabled', flag);
        $('#password').prop('disabled', flag);
        $('#loginSSONextButton').hide();
        $('#loginButton').show();
        $('#linkAccInfoRegister').css('visibility', 'visible');
        $('#loginButton').prop('class', flag ? 'loginDimmedButton' : 'loginButton');
    } else {
        // Support SSO
        $('#account').prop('disabled', flag);
        $('#passwordInput1').prop('disabled', flag);
        $('#password').prop('disabled', flag);
        $('#password').val("********");
        $('#loginButton').hide();
        $('#loginSSONextButton').show();
        $('#linkAccInfoRegister').css('visibility', 'hidden');
        $('#loginSSONextButton').prop('class', flag ? 'loginSSONextDimmedButton' : 'loginSSONextButton');
    }
}

function ShowAccInfoError(message) {
    ShowError(2, message, true, 60000);
}

var unknownAmount = '<span style="color:#FF0000;font-weight:bold">$ ---</span>';

function ShowAccountBalance(balance1) {
    var valAccBal = (typeof(opn) != "undefined" && bsUsePopup) ? opn.$('#valueAccBal') : $('#valueAccBal');
    var btnAccBal = (typeof(opn) != "undefined" && bsUsePopup) ? opn.$('#buttonAccBal') : $('#buttonAccBal');
    if (GetSetting('AccInfo', 'DISP_BALANCE') == '0') {
        valAccBal.html(GetText('accinfo_fld_balance') + ' ' + FormatCurrency(balance1));
        btnAccBal.removeClass('accBalButtonLoading');
        btnAccBal.addClass('accBalButton');
        btnAccBal.prop('title', GetText('alt_pic_refresh_balance'));
    } else {
        valAccBal.html(GetText('accinfo_fld_balance') + ' ' + GetText('Not to display'));
    }
}

function ShowServerId(obj) {
    //obj.title = bwId + "-" + asId;
}

// Topbar Buttons
//-----------------------------------------------------------------------------
function OnClickHelp() {
    OpenPopup(1, url_faq, 770, 550, 1, 1);
}

function OnClickAllupHelp() {
    OpenPopup(1, url_allup_faq, 770, 550, 1, 1);
}

function OnClickHelpAccountRecord() {
    OpenPopup(1, statementConfig.url_help_acc_rec, 770, 550, 1, 1);
}

function OnClickHelpCurSession() {
    OpenPopup(1, statementConfig.url_help_log, 770, 550, 1, 1);
}

function OnClickHelpRecall() {
    OpenPopup(1, statementConfig.url_help_recall, 770, 550, 1, 1);
}

function OnClickMinimize() {
    slipClose();
    $('#divBetSlipNormal').hide();
    $('#divBetSlipMinimize').show();
    $('#divBetSlipMinimizeText').html(GetText('minimize_bets') + ' : ' + multiSlipPanel.getTotalCount());
}

function OnClickRestore() {
    $('#divBetSlipNormal').show();
    $('#divBetSlipMinimize').hide();
}

function OnClickRegisterNow() {
    $('#divRegDropdownMenu').removeClass('tDisplayNone');
    $('#linkAccInfoRegister').css('color', '#004B96');
}

function OnClickPersonalSettingsLogin() {
    $('#divSettingsMenu').removeClass('tDisplayNone');
    $('#linkPersonalSettingsLogin').css('color', '#004B96');
}

function regDropdownClose(e) {
    try {
        if (e.target.matches && !e.target.matches('.regDropdown')) {
            $('#divRegDropdownMenu').addClass('tDisplayNone');
            $('#divSettingsMenu').addClass('tDisplayNone');
            $('#linkAccInfoRegister').css('color', '#666666');
            $('#linkPersonalSettingsLogin').css('color', '#666666');
        } else if (e.target.msMatchesSelector && !e.target.msMatchesSelector('.regDropdown')) {
            $('#divRegDropdownMenu').addClass('tDisplayNone');
            $('#divSettingsMenu').addClass('tDisplayNone');
            $('#linkAccInfoRegister').css('color', '#666666');
            $('#linkPersonalSettingsLogin').css('color', '#666666');
        }
    } catch (ex) {}
}

function onClickRegonline() {
    if (checkBeforeRedirect()) {
        top.location = url_regonline;
    }
}

function onClickApplybet() {
    if (checkBeforeRedirect()) {
        top.location = url_applybet;
    }
}

function OnClickChgWebPassword() {
    if (confirm(GetError("1303"))) {
        window.bypassForceLogout = true;
        top.location = url_chg_web_pass;
    }
}

function OnClickChgSecQuestion() {
    if (confirm(GetError("1303"))) {
        window.bypassForceLogout = true;
        top.location = url_chg_sec_question;
    }
}

function OnClickChgWebProfile() {
    if (confirm(GetError("1303"))) {
        window.bypassForceLogout = true;
        top.location = url_chg_web_profile;
    }
}

function OnClickReset() {
    if (betlines.length < 1)
        return;

    if (!confirm(GetError("1304"))) {
        return;
    }
    ResetBetlineTable();

    // Support SSO
    isClientActionTaken(true);
}

// Other Account Information Buttons
//-----------------------------------------------------------------------------
var enableRefreshBal = true;

function OnClickRefreshBalance(forceRefresh) {
    if (!enableRefreshBal)
        return;

    showBalLoading();
    var done = sendBalanceRequest(forceRefresh);
    ResetIdleTimer(false);
    enableRefreshBal = false;
    setTimeout('reEnableRefreshBal()', refreshBalInterval * 1000);
    return done;
}

function reEnableRefreshBal() {
    enableRefreshBal = true;
}

function showBalLoading() {
    if (GetSetting('AccInfo', 'DISP_BALANCE') == '0') {
        $('#valueAccBal').html(GetText('accinfo_fld_balance') + ' ' + unknownAmount);
        $('#buttonAccBal').toggleClass('accBalButtonLoading');
    }
}

/*
  GET SID
*/
function OnClickLogin() {
    //check safari private mode
    if ((isIDevice() || isSafari()) && !dataStore) {
        alert(GetError('safari_private_mode'));
        return;
    }

    if (isInSSOChecking())
        return;

    slipClose();
    CloseLogoutPopup();

    setBetslipState(STATE_INTXNPROGRESS);

    // check empty web id / password
    var acc = $('#account').val();
    if (acc == '' || acc == GetText('fld_account_no')) {
        ShowAccInfoError(GetError('421'));
        setBetslipState(STATE_NORMAL);
        return;
    }

    var pwd = $('#password').val();
    if (pwd == '' || pwd.length < 4) {
        ShowAccInfoError(GetError('421'));
        setBetslipState(STATE_NORMAL);
        return;
    }

    $('#loginButton').prop('class', 'loginDimmedButton');

    sendSidRequest();
} // OnClickLogin(), then go to index_request.js sendSidRequest()

/*
  Authenticate Web ID/Account and Password
*/
function ProcessAccountPassword() {
    disabledField(true);

    var accountId;
    var password;
    var sessionId;
    try {
        sessionId = GetDataStore("session_id");
        if (sessionId == '0')
            return;

        accountId = $('#account').val();
        password = $('#password').val();
    } catch (e) {
        $('#password').val('');
        disabledField(false);
        setBetslipState(STATE_NORMAL);
        return;
    }

    sendAuthentAccPwdRequest(accountId, password);
} // ProcessAccountPassword(), then go to index_request.js sendAuthentAccPwdRequest

function ProcessLogin(loginResult) {
    var loginStatus = loginResult.login_status; //GetDataStore('login_status');

    if (loginStatus == "EOD") {
        channelArray[pmapO["OosMsgId"]] = "1";

        var error = GetDataStore('login_error').split('|||');
        if (error.length >= 2) {
            channelArray[pmapO["OosMsgEn"]] = error[0];
            channelArray[pmapO["OosMsgCh"]] = error[1];
        }

        ProcessLogoutResult();
        showOOSMsg();

        return;
    }

    /*
    Success Authenticate Web ID and Password
    */
    if (loginStatus != '0') { // authentAccPwd fail
        var loginError = loginResult.login_error; //GetDataStore('login_error');
        if (loginError == 'PLEASE CHANGE SECURITY CODE')
            ShowAccInfoError(GetError('change_security_code'));
        else
            ShowAccInfoError(GetErrorByCode(loginStatus, loginError));
        SetDataStore('account', '');
        SetDataStore('login_status', '');
        SetDataStore('login_error', '');
        $('#password').val('');
        disabledField(false);
        setBetslipState(STATE_NORMAL);
    } else {
        if (loginResult.eWalletOnly == 'Y') {
            setBetslipState(STATE_EKBA);
            ShowEWallet(true);
        } else {
            setBetslipState(STATE_EKBA);
            ShowEKBA(true);
        }
    }
}

function ShowEWallet(isShow) {
    if (isShow) {
        $('#eWalletDivTitle').html(GetText('eWallet_header'));
        $('#eWalletMsg').html(GetText('eWallet_msg'));
        $('#ewallet_pic_later').attr("src", GetImageURL(''));
        $('#ewallet_pic_later').attr("alt", GetText('alt_later'));

        HideAllError();
        $('#divEWallet').show();
        $('#divEWalletLaterButton').show();
    } else {
        $('#divEWallet').hide();
        setBetslipState(STATE_NORMAL);
    }
}

function OnClickEWalletCancel() {
    ShowEWallet(false);
    disabledField(false);
    resetInput();
}

function OnClickEWalletUpgrade() {
    ShowEWallet(false);
    disabledField(false);
    resetInput();
    setBetslipState(STATE_NORMAL);
    window.open(url_ewallet_upgrade, '_blank');
}

function ShowEKBA(isShow) {
    if (isShow) {
        HideAllError();
        $('#txtForgetWebPass').show();
        $('#txtForgetWebPass2').hide();
        $('#ekbaSeqQuestion').html(GetDataStore('ekbaQ'));
        $('#ekbaDivInput').val('');

        // Support SSO
        if (!isSSOSignedIn()) {
            $('#divEKBADefaultButton').show();
            $('#divEKBASSOButton').hide();
        } else {
            $('#divEKBADefaultButton').hide();
            $('#divEKBASSOButton').show();
        }

        $('#divEKBA').show();
        $('#ekbaDivError').html('');
        focusField($('#ekbaDivInput'));
    } else {
        $('#divEKBA').hide();
        $('#ekbaDivError').html('');
        setBetslipState(STATE_NORMAL);
    }
}

// support SSO
function OnClickLoginEKBALogout() {
    $('#ekbaDivError').html('');
    $('#divEKBA').hide();
    setBetslipState(STATE_NORMAL);
    sendLogoutSSOOnlyRequest();
}

// support SSO
function OnClickLoginEKBABack() {
    $('#ekbaDivError').html('');
    $('#divEKBA').hide();
    setBetslipState(STATE_NORMAL);
    ProcessLogoutResult();
}

/*
  Authenticate Sec Answer
*/
function OnClickLoginEKBA() {
    $('#ekbaDivError').html('');
    setBetslipState(STATE_INTXNPROGRESS);
    sendAuthentEKBARequest(formattedSecurityAnswer());
}

function formattedSecurityAnswer() {
    var lang = GetDataStore('ekbaLang');
    var id = GetDataStore('ekbaID');
    var answer = $('#ekbaDivInput').val();
    return {
        lang: lang,
        id: id,
        answer: answer
    };
}

function ProcessLoginEKBA() {
    $('#divAccInfoLogout').hide();
    $('#divAccInfoLogin').show();

    $('#txtAccNo').html(GetText('accinfo_fld_account_no'));
    $('#valueAccNo').html(GetDataStore('account'));

    if (GetSetting('AccInfo', 'DISP_NAME') == "0") {
        var acc_name = GetDataStore('acc_name');
        if (acc_name.length < 15)
            $('#valueAccName').html(GetText('accinfo_fld_name') + ' ' + acc_name);
        else
            $('#valueAccName').html(GetText('accinfo_fld_name') + ' ' + acc_name.substring(0, 12) + "...");
    } else {
        $('#valueAccName').html(GetText('accinfo_fld_name') + ' ' + GetText('Not to display'));
    }

    ShowAccountBalance(GetDataStore('balance'));

    try {
        SetDataStore('datetime_offset', top.getOffsetTime());
    } catch (e) {
        SetDataStore('datetime_offset', 0);
    }

    resetInput();

    // handle for speedbet after login redirect page
    var speedbetPage = redirectAfterLogin;
    if (redirectAfterLogin != '') {
        var tmp = redirectAfterLogin.split('_');
        switchTo(tmp[0], tmp[1], curLang);
        $('#generalIndexContainer').hide();
        $('#infoDiv').show();
    }
} // ProcessLoginEKBA()

function OnClickLoginEKBACancel() {
    $('#ekbaDivError').html('');
    ShowEKBA(false);
    setBetslipState(STATE_NORMAL);
    ProcessLogoutResult();
}

function checkFootballLiveDisplay() {
    $('#txtFootballLive').closest('li').hide();
    if (GetDataStore('football_live_ind') == "Y") {
        $('#txtFootballLive').closest('li').show();
    }
}

function OnClickLogout(isForce) {
    if (!isForce) {
        if (!EnableAccInfo()) {
            ShowDisclaimer(false, false);
            return;
        }
        if (!confirm(GetError("SSO_SIGN_OUT_ACTIVE"))) {
            return;
        }
    }

    ShowDisclaimer(false, false);

    //close preview page
    if (betslipState == STATE_PREVIEWBET) {
        OnClickClosePreview('');
    } else if (betslipState == STATE_CONFIRMBET) {
        OnClickClose();
    }

    setBetslipState(STATE_INTXNPROGRESS);

    sendLogoutRequest();
    multiSlipPanel.resetPanel();
}

function OnClickPersonalSettings() {
    if (bsUsePopup) {
        OpenPopup(0, "/BetSlip/settings.aspx?lang=" + curLang, 680, 440, 0, 1);
    } else {
        $('#divBetSlipOverlay').show();
        $('#divPersonalSetting').show();
        initSetting();
    }
}

function isBetBasketNotEmpty() {
    return betlines.length > 0 || (typeof(multiSlipPanel) != 'undefined' && multiSlipPanel != null && multiSlipPanel.getTotalCount() > 0);
}

function checkBeforeRedirect() {
    return !isBetBasketNotEmpty() || confirm(GetError("refresh_warning"));
}

function OnClickCannotLogin() {
    if (checkBeforeRedirect()) {
        checkChangesEnabled = false;
        top.location = url_cannotlogin;
    }
}

function OnClickLoginTimeout() {
    if (checkBeforeRedirect()) {
        checkChangesEnabled = false;
        top.location = url_login_timeout;
    }
}

function OnClickAssociteAccount() {
    if (checkBeforeRedirect()) {
        checkChangesEnabled = false;
        top.location = url_associate_account;
    }
}

function OnClickFootballLive() {
    OpenPopup(0, url_FootballLivePath, 700, 650, 0, 1);
}


function OnClickAccountRecord() {
    if (betslipState != STATE_NORMAL)
        return;

    updateServerTime(false);

    if (bsUsePopup) {
        OpenPopup(0, "/BetSlip/acctstmt.aspx?lang=" + curLang, 790, 500, 0, 1);
    } else {
        $('#divBetSlipOverlay').show();
        $('#divStatement').show();
        reloadAccountRecord();
    }
    ResetIdleTimer(false);
}

function OnClickRecall() {
    if (betslipState != STATE_NORMAL)
        return;
    OnClickRefreshBalance(true); // Support SSO

    if (bsUsePopup) {
        OpenPopup(0, "/BetSlip/acctstmt.aspx?t=1&lang=" + curLang, 790, 500, 0, 1);
    } else {
        $('#divBetSlipOverlay').show();
        $('#divStatement').show();
        reloadRecall();
    }
    ResetIdleTimer(false);
}

function OnClickFundTransfer() {
    if (betslipState != STATE_NORMAL)
        return;

    updateServerTime(false);

    OnClickRefreshBalance(true); // Support SSO

    if (bsUsePopup) {
        OpenPopup(0, "/BetSlip/eft.aspx?lang=" + curLang, 760, 690, 0, 1);
    } else {
        $('#divBetSlipOverlay').show();
        $('#divFundTransfer').show();
        EftOnLoad();
    }
    ResetIdleTimer(false);
}

// support SSO
// Called when Next button is clicked
function OnClickNext() {
    if (isInSSOChecking() || !EnableAccInfo() || betslipState == STATE_EKBA)
        return;

    slipClose(true);
    CloseLogoutPopup();

    EnableAccInfo(false);
    EnableAddBetline(false);

    // check empty web id / password
    var acc = $('account').value;
    if (acc == '' || acc == GetText('fld_account_no')) {
        ShowAccInfoError(GetError('421'));
        $('pic_nextSSO').src = GetImageURL('pic_next');
        EnableAccInfo(true);
        EnableAddBetline(true);
        return;
    }

    disabledField(true);

    sendSidRequest();

} // OnClickNext(), then go to index_request.js sendCheckSSOSignInStatusRequest()

// support SSO
// called after sid request success
function ProcessAccountSSO() {
    disabledField(true);

    var accountId;
    var password;
    var sessionId;
    var toVerifyPwd = false;
    //var hashedPassword;
    try {
        sessionId = GetDataStore("session_id");
        if (sessionId == '0')
            return;

        accountId = GetDataStore("sso_web_id");
        password = $('#password').val();
    } catch (e) {
        $('#password').val('');
        disabledField(false);
        EnableAccInfo(true);
        EnableAddBetline(true);
        setBetslipState(STATE_NORMAL);
        return;
    }

    sendAuthentAccSSORequest(accountId, password, toVerifyPwd);
} // ProcessAccountSSO(), then go to index_request.js sendAuthentAccSSORequest

// support SSO
function ProcessLoginSSO() {
    var loginStatus = GetDataStore('login_status');

    if (loginStatus == "EOD") {
        channelArray[pmapO["OosMsgId"]] = "1";

        var error = GetDataStore('login_error').split('|||');
        if (error.length >= 2) {
            channelArray[pmapO["OosMsgEn"]] = error[0];
            channelArray[pmapO["OosMsgCh"]] = error[1];
        }

        ProcessLogoutResult();
        showOOSMsg();
        return;
    }

    if (loginStatus != '0') { // authentAccSSO fail
        if (loginStatus == '-2') {
            var ssoLoginStatus = GetDataStore('sso_login_status');
            var ssoLoginError = GetDataStore('sso_login_error');
            if (ssoLoginError == "SSO_SIGN_OUT_PASSIVE") {
                ProcessLogoutResult();
                alert(GetError(ssoLoginError));
                ShowAccInfoDefault();
            } else if (ssoLoginError == "SSO_SIGN_IN_USER_CHANGED") {
                alert(GetError(ssoLoginError));
                ShowAccInfoSSO(GetDataStore('sso_web_id'));
            } else {
                ShowAccInfoError(GetErrorByCode(ssoLoginStatus, ssoLoginError));

                if (!isSSOSignedIn()) {
                    ShowAccInfoDefault();
                } else {
                    ShowAccInfoSSO(GetDataStore('sso_web_id'));
                }
            }
        } else {
            var loginError = GetDataStore('login_error');
            if (loginError == 'PLEASE CHANGE SECURITY CODE')
                ShowAccInfoError(GetError('change_security_code'));
            else
                ShowAccInfoError(GetErrorByCode(loginStatus, loginError));


            if (!isSSOSignedIn()) {
                ShowAccInfoDefault();
            } else {
                ShowAccInfoSSO(GetDataStore('sso_web_id'));
            }

            //Logout web only account
            if (loginStatus == "425") {
                sendLogoutSSOOnlyRequest();
            }
        }
        SetDataStore('account', '');
        SetDataStore('login_status', '');
        SetDataStore('login_error', '');
        disabledField(false);
        EnableAccInfo(true);
        EnableAddBetline(true);
    } else {
        setBetslipState(STATE_EKBA);
        EnableAccInfo(true);
        ShowEKBA(true);
    }
}

// support SSO
function ShowAccInfoDefault() {
    disabledField(false);
    $('#account').val(GetText('fld_account_no'));
    $('#passwordInput1').val(GetText('fld_password'));
    $('#passwordInput1').show();
    $('#password').val('');
    $('#password').hide();

    $('#divAccInfoLogout').show();
    $('#divAccInfoLogin').hide();
}

// support SSO
function ShowAccInfoSSO(webIDToShow) {
    disabledField(true);
    if (webIDToShow != '') {
        $('#account').val(webIDToShow);
    }

    $('#passwordInput1').val(GetText('fld_password'));
    $('#passwordInput1').hide();

    $('#password').value = '********';
    $('#password').show();

    $('#divAccInfoLogout').show();
    $('#divAccInfoLogin').hide();
    $('#divBetPreview').hide();
    $('#loginButton').hide();
    $('#loginSSONextButton').prop('class', 'loginSSONextButton');
    $('#loginSSONextButton').show();

}

function OnClickPreview() {
    if (!isValidUnitBet)
        return;

    if (betslipState == STATE_IDLEALERT)
        return;

    if (betlines.length < 1) {
        alert(GetError("1204"));
        return;
    }

    if (!isLogon()) {
        alert(GetError("1101"));
        return;
    }

    slipClose(true);
    isClientActionTaken(true);

    HideAllError();
    DeleteAllAllUpBetlines();
    ResetAllAllUpButtons();
    ResetOddsdiff();
    LoadAllUpFormula();
    DrawAddAllUpButton();

    InitBetPreview();

    $('#divBetPreview').show();
    setBetslipState(STATE_PREVIEWBET);

    // START Nielsen Online SiteCensus
    WATrackerTrackClickEvent('betslip-sendbet-01');
    // END Nielsen Online SiteCensus
}