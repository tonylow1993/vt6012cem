var hKey = 0;
var para_md5 = 0;
var para_sha1 = 2;

var STATE_NORMAL = 0;
var STATE_EKBA = 1;
var STATE_DISCLAIMER = 2;
var STATE_PREVIEWBET = 3;
var STATE_CONFIRMBET = 4;
var STATE_IDLEALERT = 5;
var STATE_LOGOUT = 6;
var STATE_INTXNPROGRESS = -1;

var betslipState = STATE_NORMAL;
var isProcessing = false;

var unknownReply = "@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||@@@UNKNOWN||||||||||||";

// for sendbet use
var strStyle = ['tdGray', 'tdWhite'];
var getDelayReplyOnce = false;
var getDelayReply2nd = false;
var unknownAmountBlack = '<span style="font-weight:bold">$ ---</span>';
var anyUnknownRow = false;
var selectedBet = -1;

// for statement use
var stmtStyle = ['stmtWhite', 'stmtGray'];
var ONEDAY = 60 * 1000 * 60 * 24;
var curAction = -1;
var ACTION_SEARCH = 0;
var ACTION_NEXT = 1;
var ACTION_PREV = 2;
var ACTION_PRINT = 3;
var ACTION_EXPORT = 4;
var show60Days = false;
var searchDayRange = 8;
var stmtCountPerPage = 10;
var asMaxDateRange = 31;
var dateRangeArr = [];
var stmtMaxPageNo = 1;
var stmtCurPageNo = 0;
var stmtToday = new Date();
var showNextPage = false;

function setBetslipState(s) {
    switch (s) {
        case 0:
            $('#betslipDisableDiv').hide();
            $('#betslipDisableDiv').css('width', '100%');
            $('#betslipDisableDiv').css('z-index', '1000');
            break;
        case 1:
            $('#betslipDisableDiv').hide();
            $('#betslipDisableDiv').css('z-index', '1000');
            break;
        case 5:
            $('#betslipDisableDiv').show();
            $('#betslipDisableDiv').css('width', '331px');
            $('#betslipDisableDiv').css('z-index', '200');
            break;
        default:
            $('#betslipDisableDiv').show();
            $('#betslipDisableDiv').css('z-index', '1000');
            break;
    }
    betslipState = s;
}

function isIDevice() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
}

function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function isMacOS() {
    return (window.navigator.platform.toLowerCase().indexOf("mac") >= 0);
}

function focusField(id) {
    if (!isIDevice()) {
        setTimeout(function() {
            id.focus();
        }, 0);
    } else {
        id.focus();
    }
}

var oPopup = new Array();
var oPopupIB = new Array();
var sCurURL = new Array();

function OpenPopup(popupIndex, sURL, width, height, scrollbar, statusbar) {
    if (oPopup[popupIndex] != null && !oPopup[popupIndex].closed) {
        if (sURL == sCurURL[popupIndex]) {
            focusField(oPopup[popupIndex]);
            return;
        } else {
            oPopup[popupIndex].close();
        }
    }

    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;

    var finalHeight = height;
    var finalWidth = width;

    // For safari in Mac OS 10.10, the window height is including the height of the location bar, which
    // is unlike other browsers. For normal browsers, the window height is the innerHeight of window (
    // exclude the location bar), not the outerHeight.
    if (isMacOS() && isSafari()) {
        finalHeight += 65;
        finalWidth += 10;
    }

    var sFeatures = "left=" + left + ",top=" + top + ",width=" + finalWidth + ",height=" + finalHeight +
        ",scrollbars=" + scrollbar + ",status=" + statusbar +
        ",location=0,menubar=0,resizable=0,titlebar=0";
    oPopup[popupIndex] = window.open(sURL, "_blank", sFeatures);
    sCurURL[popupIndex] = sURL;
}

function OpenPopupIB(popupIndex, sURL, width, height, scrollbar, statusbar, popupName) {
    if (oPopup[popupIndex] != null && !oPopup[popupIndex].closed) {
        oPopup[popupIndex].close();
    }

    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;

    var finalHeight = height;
    var finalWidth = width;

    // For safari in Mac OS 10.10, the window height is including the height of the location bar, which
    // is unlike other browsers. For normal browsers, the window height is the innerHeight of window (
    // exclude the location bar), not the outerHeight.
    if (isMacOS() && isSafari()) {
        finalHeight += 65;
        finalWidth += 10;
    }

    var sFeatures = "left=" + left + ",top=" + top + ",width=" + finalWidth + ",height=" + finalHeight +
        ",scrollbars=" + scrollbar + ",status=" + statusbar +
        ",location=0,menubar=0,resizable=0,titlebar=0";
    oPopupIB[popupIndex] = window.open(sURL, "_blank", sFeatures);
    sCurURL[popupIndex] = sURL;
}

function ClosePopup(idx) {
    try {
        oPopup[idx].close();
        oPopup[idx] = null;
    } catch (e) {}
}

function CloseAllPopup() {
    try {
        for (var i = 0; i < oPopup.length + 1; i++)
            oPopup[i].close();
    } catch (e) {}
}

var timeIdError;

function ShowError(containerId, message, isFormated, timeoutMSec) {
    var strHTML;

    if (isFormated)
        strHTML = message;
    else
        strHTML = "<table border=1 bordercolor=#000000 width=100% cellspacing=0 cellpadding=0 style='table-layout:fixed'>" +
        "<tr><td align=center style='left:0px;width:100%;word-wrap:break-word'>" +
        "<div style='background-color:#ffff00'>" +
        "<font size=-1 color=blue>" + message + "</font>" +
        "</div>" +
        "</td></tr>" +
        "</table>";

    switch (containerId) {
        case 1: // accInfoFrame
            $('#errormsg').html(strHTML);
            $('#errormsg').show();
            break;
        case 2: // slipFrame
            slipClose(true);
            $('#errMsgMiddleTxt').html(strHTML);
            $('#errormsgMiddle').show();
            $('#account').focus();
            break;
        case 3: // slipFrame preview bet      
            $('#txtPreviewWrongPassword').html(strHTML);
            $('#msgColumn').css('visibility', 'visible');
            $('#passwordErrorTxt').show();
            break;
    }

    timeIdError = setTimeout("HideError(" + containerId + ", true)", timeoutMSec);
}

function HideError(containerId, callerIsTimer) {
    if (callerIsTimer)
        clearTimeout(timeIdError);

    switch (containerId) {
        case 1: // accInfoFrame
            $('#errormsg').html('');
            $('#errormsg').hide();
            break;
        case 2: // slipFrame
            $('#errMsgMiddleTxt').html('');
            $('#errormsgMiddle').hide();
            break;
        case 3: // slipFrame preview bet
            $('#msgColumn').css({
                visibility: 'hidden'
            });
            $('#passwordErrorTxt').hide();
            break;
    }
}

function HideAllError() {
    HideError(1, false);
    HideError(2, false);
}

var enableAccInfoButtons = true;

function EnableAccInfo(isEnable) {
    if (isEnable == true || isEnable == false)
        enableAccInfoButtons = isEnable;
    return enableAccInfoButtons;
}

var enableAddBetline = true;

function EnableAddBetline(isEnable) {
    if (isEnable == true || isEnable == false)
        enableAddBetline = isEnable;
    return enableAddBetline;
}

var warningTimeout = 5;
var sessionIdleTime = 30;
var lowSsoIdleTime = 80;
var idleTimer;
var idleAlertTimer;
var renewFlag = false;

function renewSession() {
    if (GetDataStore('is_logon') == 1 && renewFlag) {
        helpFrame.location = BetSlipIBPath + "alive.aspx";
        renewFlag = false;
    }
    setTimeout("renewSession()", sessionIdleTime * 60 * 1000);
}

function ResetIdleTimer(loadDummy) {
    CloseIdleAlert();
    if (GetDataStore('is_logon') != 1)
        return;

    warningTimeout = MyParseInt(GetPara("WarningTimeout"), 2);
    sessionIdleTime = MyParseInt($.cookie("sessionIdleTime"), MyParseInt(GetPara("SessionIdleTime"), 30));

    var msecToWarnUser = (sessionIdleTime - warningTimeout) * 60 * 1000 - 10 * 1000;
    idleTimer = setTimeout("IdleCheck()", msecToWarnUser);
    isClientActionTaken(false);

    if (loadDummy) {
        // Support SSO
        // loadDummy=true means extend the server session, in SSO, SSO ticket has to be extend as well
        // so call a WCF function instead of a dummy page
        // send a parameter, true, so as to ignore failed in ticket extension
        if (isSSOEnabled()) {
            sendSSOTicketExtendRequest(true);
        } else {
            helpFrame.location = BetSlipIBPath + "alive.aspx";
            sendExtendSessionRequest();
        }
    }
}

var hWinIdleAlert = null;

function PopupIdleAlert() {
    clearTimeout(idleTimer);
    if (betslipState == STATE_PREVIEWBET)
        OnClickClosePreview();
    if (betslipState == STATE_CONFIRMBET)
        OnClickClose(true);

    $('#divBetSlipNormal').show();
    $('#divBetSlipMinimize').hide();

    slipOpen();
    setBetslipState(STATE_IDLEALERT);
    idleAlertInit(MyParseInt(GetPara("WarningTimeout"), 5));

    var curTime = new Date();
    var curTimeStr = formatTimeBS(curTime);
    curTime.setMinutes(curTime.getMinutes() + warningTimeout);
    var logoutTimeStr = formatTimeBS(curTime);

    //Set values for Idle Alert Popup
    SetDataStore("idleAlertType", "0");
    SetDataStore("idleAlertLogoutTime", logoutTimeStr);
    SetDataStore("idleAlertCurTime", curTimeStr);
    OpenPopup(1, "/idleAlert.aspx?lang=" + curLang, 320, 210, 0, 1);
}

var isIdleAlert = false;

function idleAlertInit(timeout) {
    if (timeout == 0) {
        idleAlertLogout(true);
        return;
    }

    $('#divIdleAlert').show();
    $("#divIdleAlertLogoutTips").html(GetText("idle_alert_logout_tips"));
    $("#divIdleAlertLogoutTimeTips").html(GetText("idle_alert_logout_time_tips").replace('{0}', timeout));
    $('#divIdleAlertStay').html(GetText('idle_alert_stay_service'));
    $('#divIdleAlertLogout').html(GetText('idle_alert_logout_service'));

    //disbale sound for iOS devices
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS == false) {
        $("#betslipSound").html('');
        $("#betslipSound").html('<audio class="sound-player" autoplay="autoplay" style="display:none;">' +
            '<source src="' + idleSoundAlert + '" />' +
            '<embed src="' + idleSoundAlert + '" hidden="true" autostart="true" loop="false"/>' +
            '</audio>');
    }

    isIdleAlert = true;
    idleAlertTimer = setTimeout('idleAlertInit(' + (timeout - 1) + ')', 60 * 1000);
}

function idleAlertLogout(forceLogout) {
    if (forceLogout) {
        SetDataStore('is_idle_logout', '1');
        if (isRemoveSSOTokenOnTimeOut()) {
            OnClickLogout(true);
        } else {
            sendLogoutASOnlyRequest();
        }
        clearTimeout(idleAlertTimer);
        $('#divIdleAlert').hide();
        $("#betslipSound").html('');
        isIdleAlert = false;
        slipClose();
        setBetslipState(STATE_NORMAL);
        multiSlipPanel.resetPanel();
        CloseAllPopup();
    } else {
        // Support SSO
        SetDataStore('is_idle_logout', '0');
        setBetslipState(STATE_NORMAL);
        buttonLogout();
    }
}

function buttonLogout() {
    if (EnableAccInfo()) {
        // Support SSO
        if (isSSOEnabled()) {
            if (isInSSOChecking()) {
                return;
            }
            CheckStatusOnClickLogout();
        } else {
            OnClickLogout(false);
        }
        clearTimeout(idleAlertTimer);
        $('#divIdleAlert').hide();
        $("#betslipSound").html('');
        isIdleAlert = false;
        slipClose();
    }
}

function formatTimeBS(dateTime) {
    var logoutHours = dateTime.getHours() > 9 ? dateTime.getHours() : '0' + dateTime.getHours().toString();
    var logoutMins = dateTime.getMinutes() > 9 ? dateTime.getMinutes() : '0' + dateTime.getMinutes().toString();
    return logoutHours + ":" + logoutMins;
}

function CloseIdleAlert() {
    clearTimeout(idleTimer);
    clearTimeout(idleAlertTimer);
    $('#divIdleAlert').hide();
    $('#divIdleAlertSound').html('');
    setBetslipState(STATE_NORMAL);
    isIdleAlert = false;
    ClosePopup(1);
}

function SaveSessionIdleTime() {
    var rTime = document.getElementsByName("idleAlertM");
    var time = rTime[0].checked == true ? rTime[0].value : rTime[1].value;
    sessionIdleTime = parseInt(time);
    $.cookie("sessionIdleTime", sessionIdleTime);

    document.getElementById('divIdleAlertLogoutTips').innerHTML = GetText('idle_alert_savedtime');
    document.getElementById('radIdleAlertM30').disabled = true;
    document.getElementById('radIdleAlertM60').disabled = true;
    document.getElementById('btnIdleAlertSave').href = "javascript:void(0);";
    document.getElementById('btnIdleAlertSave').style.color = "#ccc";
}

function IsAllBetsAccepted(betReply) {
    if (!betReply)
        return false;
    else if (betReply == '')
        return false;
    else if ((betReply.indexOf("REJECTED") < 0) && (betReply.indexOf("UNKNOWN") < 0))
        return true;
    else
        return false;
}


// Support SSO
function isSSOSignedIn() {
    return ('' != GetDataStore('sso_sign_in_level') && '0' != GetDataStore('sso_sign_in_level'));
}

// Support SSO
var inSSOChecking = false;

function isInSSOChecking(isEnable) {
    if (isEnable == true || isEnable == false)
        inSSOChecking = isEnable;
    return inSSOChecking;
}

// Support SSO
var clientActionTaken = false;

function isClientActionTaken(isEnable) {
    if (isLogon()) {
        if (isEnable == true || isEnable == false) {
            clientActionTaken = isEnable;
        }
    }
    return clientActionTaken;
}

// Support SSO
function IdleCheck() {
    if (isClientActionTaken()) {
        sendExtendSessionRequest();
        idleTimer = setTimeout("ResetIdleTimer(true)", warningTimeout * 60 * 1000);
    } else {
        PopupIdleAlert();
    }
}

function isSSOEnabled() {
    return (GetDataStore('sso_enabled') == 'true');
}

function isRemoveSSOTokenOnTimeOut() {
    return (GetDataStore('sso_remove_token_on_timeout') == 'true');
}

function onKeyDown(evt, ignoreEnter, frameName) {
    var event = window.event || evt;
    var srcElement = event.srcElement ? event.srcElement : event.target;
    try {
        if (event.altKey && event.keyCode == 37) { // Alt + LeftArrow (history go back)
            return false;
        } else if (ignoreEnter == true && event.keyCode == 13) { // Enter
            if (frameName == 'accInfo' && betslipState == STATE_NORMAL && !isLogon()) {
                OnClickLogin();
                return true;
            } else if (frameName == 'ekba' && betslipState == STATE_EKBA) {
                OnClickLoginEKBA();
                return true;
            } else if (frameName == 'disclaimer') {
                ShowDisclaimer(false, true);
                return true;
            } else if (frameName == 'logout') {
                CloseLogoutPopup();
            }
            return false;
        } else if ((event.altKey) ||
            ((event.keyCode == 8) && // Backspace (history go back, backspace allowed only when inputing values)
                (srcElement.type != "text" &&
                    srcElement.type != "textarea" &&
                    srcElement.type != "password")
            ) ||
            ((event.keyCode == 27) && // Escape (stop downloading a page, Escape allowed only when inputing values)
                (srcElement.type != "text" &&
                    srcElement.type != "textarea" &&
                    srcElement.type != "password")
            ) ||
            ((event.ctrlKey) &&
                ((event.keyCode == 78) || // Ctl + N (new a window)
                    (event.keyCode == 82) // Ctrl + R (page refresh)
                )
            ) ||
            (event.keyCode == 116) // F5 (page refresh)
            ||
            (event.keyCode == 18) // Alt (select IE menu)
            ||
            ((event.keyCode == 9) && (srcElement.type != "text" &&
                srcElement.type != "password")) // Tab
        ) {
            return false;
        }
    } catch (exception1) {}
    return true;
}

// check the browser whether it is supporting File API (HTML5 feature)
function isFileAPISupported() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        return true;
    }

    return false;
}

function isWindowURLSupported() {
    if (window.URL || window.webkitURL) {
        return true;
    }

    return false;
}