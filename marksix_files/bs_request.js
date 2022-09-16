var requestTimer;
var requestTimeoutInSec;
var isRequestTimeout;

var proxyFrameLoaded = false;
var sendSidParam = {
  count: 0,
  retryMax: 5,
  retryInterval: 5000
};

function txnResult() {}

function ajaxTxnRequest(url, para, successFunc, errorFunc, reqTimeout) {
  var to = requestTimeoutInSec * 1000;
  if (reqTimeout)
    to = reqTimeout;

  $.ajax({
    type: 'POST',
    url: BetSlipIBPath + url,
    xhrFields: {
      withCredentials: true
    },
    data: para,
    dataType: 'json',
    processdata: true,
    success: successFunc,
    error: errorFunc,
    timeout: to
  });
}

function setResultArrayToDataStore(resArr) {
  var arr = [];
  for (var i = 0; i < resArr.length; i++) {
    SetDataStore(resArr[i].Key, resArr[i].Value);
    arr[resArr[i].Key] = resArr[i].Value;
  }
  return arr;
}

function setResultArray(resArr) {
  var arr = [];
  for (var i = 0; i < resArr.length; i++) {
    arr[resArr[i].Key] = resArr[i].Value;
  }
  return arr;
}

function sendSidRequest() {
  ajaxTxnRequest(
    'services/Sid.svc/DoGetSID',
    '',
    function (msg) {
      setResultArrayToDataStore(msg['DoGetSIDResult']);

      traceFunc += 'A1';
      bwId = GetDataStore("bw_id");

      //branch here to deal with login using acc/pwd or using acc/ticket                
      if (isSSOSignedIn()) {
        ProcessAccountSSO();
      } else {
        ProcessAccountPassword();
      }
    },
    function (msg) {
      showSysLoginTimeoutError();
    }
  );
}

function showSysDateTimeError() {
  disabledField(false);
  setBetslipState(STATE_NORMAL);
  ShowError(2, GetError('system_datetime'), true, 60000);
}

function showSysLoginTimeoutError() {
  disabledField(false);
  setBetslipState(STATE_NORMAL);
  ShowError(2, GetError('SYSTEM LOGIN TIMEOUT'), true, 60000);
}

function sendAuthentAccPwdRequest(account, password) {
  var para = {
    'lang': GetLanguage(),
    'acc': account,
    'pass': password,
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id')
  };

  ajaxTxnRequest(
    'services/Login.svc/DoAuthentAccPwdTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArrayToDataStore(msg['DoAuthentAccPwdTRResult']);
      ProcessLogin(content);
      document.body.style.cursor = 'auto';
    },
    function (msg) {
      disabledField(false);
      EnableAccInfo(true);
      EnableAddBetline(true);
      ShowError(2, GetError('system_busy'), true, 6000);
    }
  );
}

function sendAuthentEKBARequest(answer) {
  document.body.style.cursor = 'progress';

  var para = {
    'lang': GetLanguage(),
    'acc': GetDataStore('account'),
    'answer': answer.answer,
    'os': navigator.userAgent,
    'ekbaLang': answer.lang,
    'ekbaId': answer.id,
    'webId': GetDataStore('webID'),
    'hWebId': GetDataStore('hWebId'),
    'knownSSOGUID': GetDataStore('sso_guid'),
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id')
  };

  ajaxTxnRequest(
    'services/LoginEkba.svc/DoAuthentEKBATR',
    JSON.stringify(para),
    function (msg) {
      setResultArrayToDataStore(msg['DoAuthentEKBATRResult']);
      ProcessAuthentEKBAResult();
      document.body.style.cursor = 'auto';
    },
    function (msg) {
      ProcessAuthentEKBATimeout();
    }
  );
}

function setBetSlipPeNoteIcon(hasGeneralNotes) {
  $('#bsPeNoteIcon').prop('class', hasGeneralNotes ? 'bsPeNoteIconUpdate' : 'bsPeNoteIconAdd');
  $('#bsPeNoteIcon').unbind('click').click(function (ev) {
	ev.cancelBubble=true;
    if (hasGeneralNotes)
      goPeNoteGeneralUrl('all');
    else
      goPeNoteGeneralUrl('new');
  });
  $('#bsPeNoteIcon').show();
}

function ProcessAuthentEKBAResult() {
  asId = GetDataStore("as_id");
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

  if (loginStatus == 0 || loginStatus == 9) {
    setCustomerSegment();
    SetDataStore('is_logon', 1);
    SetDataStore('doneLogout', '');
    ShowEKBA(false);
    ShowDisclaimer(true, false);
    ProcessLoginEKBA();
    loadPara(GetDataStore('channelPara'));
    writeCookie();
    logDataAccessor.Init();

    $('#bsPeNoteIcon').hide();

    if (typeof (enquirePeNote) != 'undefined') {
      enquirePeNote();
    }

    var webIDHashed = getWebIDHashed();
    DataLayer = null;
    if (webIDHashed != "") {
      DataLayer = {
        'cuno': webIDHashed
      };
	  try {
		_detector.triggerCustomEvent("hashid", webIDHashed); 
	  } catch (e) {}
    }
    setBetslipState(STATE_NORMAL);
  } else if (loginStatus < 400) {
    var loginError = GetDataStore('login_error');
    ShowEKBA(false);
    disabledField(false);
    EnableAccInfo(true);
    EnableAddBetline(true);
    setBetslipState(STATE_NORMAL);
    $('#password').val('');

    // Support SSO
    var ssoLoginStatus = GetDataStore('sso_login_status');
    var ssoLoginError = GetDataStore('sso_login_error');
    if (!isSSOSignedIn()) {
      ShowAccInfoDefault();
    } else {
      ShowAccInfoSSO(GetDataStore('sso_web_id'));
    }
    if (loginStatus != -2) {
      if (loginError == 'PLEASE CHANGE SECURITY CODE') {
        ShowError(2, GetError('change_security_code'), true, 60000);
      } else {
        ShowError(2, GetErrorByCode(loginStatus, loginError), true, 60000);
      }
    } else {
      if (ssoLoginStatus == -1) {
        if (ssoLoginError == "SSO_SIGN_OUT_PASSIVE") {
          ProcessLogoutResult();
          alert(GetError(ssoLoginError));
        } else if (ssoLoginError == "SSO_SIGN_IN_USER_CHANGED") {
          alert(GetError(ssoLoginError));
        } else {
          ShowError(2, GetErrorByCode(ssoLoginStatus, ssoLoginError), true, 60000);
        }
      } else {
        ShowError(2, GetErrorByCode(ssoLoginStatus, ssoLoginError), true, 60000);
      }
    }
    setBetslipState(STATE_NORMAL);
  } else {
    var loginError = GetDataStore('login_error');
    var failCount = GetDataStore('retryCount');
    var totalCount = GetDataStore('totalRetryCount');

    EnableAccInfo(true);
    $('#ekbaDivError').html(GetErrorByCode(loginStatus, loginError).replace('###', failCount).replace('@@@', totalCount));
    $('#ekbaSeqQuestion').html(GetDataStore('ekbaQ'));

    focusField($('#ekbaDivInput'));
    setBetslipState(STATE_EKBA);
  }
  updateServerTime();
  document.body.style.cursor = 'auto';
}

function ProcessAuthentEKBATimeout() {
  ShowEKBA(false);
  disabledField(false);
  EnableAccInfo(true);
  EnableAddBetline(true);
  setBetslipState(STATE_NORMAL);
  ShowError(2, GetError('system_busy'), true, 60000);
  setBetslipState(STATE_NORMAL);
}

function sendLogoutRequest() {
  traceFunc += 'Z1';

  var para = {
    'acc': GetDataStore('account'),
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id')
  };

  ajaxTxnRequest(
    'services/Logout.svc/DoLogoutTR',
    JSON.stringify(para),
    function (msg) {
      setResultArrayToDataStore(msg['DoLogoutTRResult']);
      ProcessLogoutResult();
    },
    function (msg) {
      ProcessLogoutResult();
    }
  );
}

function forceLogout() {
  sendForceLogoutRequest(); // send request to remove hashed ps from IW and logout from as
  eraseCookie(); // to ensure customer segment cookie is removed
}

function ProcessLogoutResult() {
  var is_new_acc = GetDataStore('is_new_acc');
  var is_idle_logout = GetDataStore('is_idle_logout');
  var language = GetDataStore('language');

  // Support SSO
  var ssoEnabled = GetDataStore('sso_enabled');
  var ssoGUID = GetDataStore('sso_guid');
  var ssoWebID = GetDataStore('sso_web_id');
  var ssoWebIDHashed = GetDataStore('sso_web_id_hashed');
  var ssoSignInLevel = GetDataStore('sso_sign_in_level');
  var isNowLogon = GetDataStore('is_logon');

  ClearDataStore();
  InitDataStore();

  DeleteAllAllUpBetlines();
  ResetAllAllUpButtons();
  LoadAllUpFormula();
  DrawAddAllUpButton();
  DeleteAllBetlines();
  EnableAccInfo(true);
  EnableAddBetline(true);
  CloseIdleAlert();
  HideAllError();
  CloseAllPopup(true);

  bwId = '00';
  asId = '00';
  eraseCookie();
  SetDataStore('is_logon', 0);
  isClientActionTaken(false);

  // Support SSO
  SetDataStore('sso_enabled', ssoEnabled);
  SetDataStore('sso_guid', ssoGUID);
  SetDataStore('sso_web_id', ssoWebID);
  SetDataStore('sso_sign_in_level', ssoSignInLevel);

  multiSlipPanel.resetPanel();

  if (isSSOSignedIn()) {
    ShowAccInfoSSO(GetDataStore('sso_web_id'));
  } else {
    ShowAccInfoDefault();
  }

  if (!isLogon() && !isSSOSignedIn()) {
    customerSegment = '';
    ssoWebIDHashed = '';
    clearWAParam();
  }

  SetDataStore('sso_web_id_hashed', ssoWebIDHashed);

  if (isNowLogon == 1) {
    OpenLogoutPopup(is_new_acc);
  }

  $('#divAccInfoLogout').show();
  $('#divAccInfoLogin').hide();
  $('#ekbaDivInput').val('');
  idleAlertClose();
  RedrawBetlineTable();
  updatePerformTvVisibility();
  AMS.disconnect();

  setBetslipState(STATE_NORMAL);

  //show idle logout popup window
  logoutTimeStr = formatTimeBS(new Date());
  if (is_idle_logout == '1') {
    SetDataStore("idleAlertType", "1");
    SetDataStore("idleAlertLogoutTime", logoutTimeStr);
    OpenPopup(1, "/idleAlert.aspx?lang=" + curLang, 320, 210, 0, 1);
  }
  
  if (typeof (enquirePeNote) != 'undefined') {
    enquirePeNote();
  }

  traceFunc += '0';
}

// Support SSO
var skipSSOTicketExtendError = false;

function sendBalanceRequest(skipHandleExtendError) {
  var deferred = $.Deferred();
  // Support SSO
  skipSSOTicketExtendError = skipHandleExtendError;

  var para = {
    'acc': GetDataStore('account'),
    'seqNo': GetNextSeqNo(),
    'knownWebID': GetDataStore('sso_web_id'),
    'knownSSOGUID': GetDataStore('sso_guid'),
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id')
  };

  ajaxTxnRequest(
    'services/Balance.svc/DoBalanceTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArrayToDataStore(msg['DoBalanceTRResult']);
      ProcessBalanceResult(content);
      deferred.resolve();
    },
    function (msg) {
      $('#buttonAccBal').removeClass('accBalButtonLoading');
      $('#buttonAccBal').addClass('accBalButton');
      deferred.resolve();
    }
  );
  return deferred.promise();
}

function ProcessBalanceResult(content) {
  var balance_status = content.balance_status;

  // Support SSO
  if (balance_status == "-2") {
    if (!skipSSOTicketExtendError) {
      skipSSOTicketExtendError = false;
      processSSOTicketExtendResult();
    }
    return;
  }
  skipSSOTicketExtendError = false;

  if (balance_status == "0") {
    var ac_balance = content.ac_balance;
    SetDataStore("balance", ac_balance);
    ShowAccountBalance(ac_balance);
  } else {
    ShowAccountBalance(unknownAmount);
  }
}

function GetNextSeqNo() {
  var seq_no = parseInt(GetDataStore("seq_no"), 10);
  SetDataStore("seq_no", (seq_no + 1));
  return (seq_no + 1);
}

function setCustomerSegment() {
  var priority = GetDataStore('priority_card') == '' ? '0' : GetDataStore('priority_card');
  var cbp = GetDataStore('cbp_seg');
  if (cbp == '')
    cbp = '00000';
  else if (cbp.length < 5)
    cbp = new Array(6 - cbp.length).join('0') + cbp;
  var racing = GetDataStore('racing_part') == '' ? 'N' : GetDataStore('racing_part');
  var football = GetDataStore('football_part') == '' ? 'N' : GetDataStore('football_part');
  var marksix = GetDataStore('m6_part') == '' ? 'N' : GetDataStore('m6_part');
  var member = GetDataStore('member_type') == '' ? '0' : GetDataStore('member_type');
  var ageGroup = GetDataStore('age_group') == '' ? '00' : GetDataStore('age_group');
  var gender = GetDataStore('gender') == '' ? '0' : GetDataStore('gender');
  var bettingAC = GetDataStore('betting_ac_ind') == '' ? 'N' : GetDataStore('betting_ac_ind');
  var speedbet = GetDataStore('speedbet_cust') == '' ? '0' : GetDataStore('speedbet_cust');
  var footballLive = GetDataStore('football_live_ind') == '' ? 'N' : GetDataStore('football_live_ind');
  customerSegment = priority + cbp + racing + football +
    marksix + member + ageGroup + gender +
    bettingAC + speedbet;
}

function writeCookie() {
  var date = new Date();
  date.setTime(date.getTime() + (60 * 60 * 1000));
  var para = {
    expires: date,
    path: '/',
    domain: document.domain
  };

  var priority = GetDataStore('priority_card') == '' ? '0' : GetDataStore('priority_card');
  var cbp = GetDataStore('cbp_seg');
  if (cbp == '')
    cbp = '00000';
  else if (cbp.length < 5)
    cbp = new Array(6 - cbp.length).join('0') + cbp;
  var racing = GetDataStore('racing_part') == '' ? 'N' : GetDataStore('racing_part');
  var football = GetDataStore('football_part') == '' ? 'N' : GetDataStore('football_part');
  var marksix = GetDataStore('m6_part') == '' ? 'N' : GetDataStore('m6_part');
  var member = GetDataStore('member_type') == '' ? '0' : GetDataStore('member_type');
  var ageGroup = GetDataStore('age_group') == '' ? '00' : GetDataStore('age_group');
  var gender = GetDataStore('gender') == '' ? '0' : GetDataStore('gender');
  var bettingAC = GetDataStore('betting_ac_ind') == '' ? 'N' : GetDataStore('betting_ac_ind');
  var speedbet = GetDataStore('speedbet_cust') == '' ? '0' : GetDataStore('speedbet_cust');
  var footballLive = GetDataStore('football_live_ind') == '' ? 'N' : GetDataStore('football_live_ind');
  var customerSeg = priority + cbp + racing + football +
    marksix + member + ageGroup + gender +
    bettingAC + speedbet;

  var cookie = ['', '', '', '', '', '', customerSeg, ''].join(':');
  $.cookie('custProInBet', cookie, para);
}

function eraseCookie() {
  var para = {
    path: '/',
    domain: document.domain
  };
  $.cookie('custProInBet', '', para);
}

// support SSO
function sendCheckSSOSignInStatusRequest(normalCallBack, errorCallBack) {
  isInSSOChecking(true);

  var para = {
    'knownWebID': GetDataStore('sso_web_id'),
    'knownSSOGUID': GetDataStore('sso_guid')
  };

  ajaxTxnRequest(
    'services/SSOService.svc/DoCheckSSOSignInStatusTR',
    JSON.stringify(para),
    function (msg) {
      traceFunc += 'U1';
      setResultArrayToDataStore(msg['DoCheckSSOSignInStatusTRResult']);
      normalCallBack();
      isInSSOChecking(false);
    },
    function (msg) {
      traceFunc += 'Ut';
      errorCallBack(msg);
      isInSSOChecking(false);
    }
  );
}

// support SSO
function processCheckSSOSignInStatusResult() {
  traceFunc += 'U1';
}

// Support SSO
function processCheckSSOSignInStatusTimeout(errMsg) {
  ShowError(2, GetError(errMsg), true, 60000);
  //alert(errMsg);
}

// Support SSO
// (1) check statue when click Next button
// checking request returned normally
//      if detected logged in user is not changed (i.e. webid is still the same as initial checking), continue login process
//      if detected logged in user is changed, stop login process, alert user changed message and show "Next" button with new detected webid on betslip
//      otherwise, stop login process, alert user signed out message and bring betslip to logout state.
// checking request returned adnormally (e.g. timeout)
//      force to change betslip to logout state
function CheckStatusOnClickNext() {
  sendCheckSSOSignInStatusRequest(
    function () {
      var returnStatus = GetDataStore('sso_check_return_status');
      var signInLevel = GetDataStore('sso_sign_in_level');
      var webID = GetDataStore('sso_web_id');
      var ssoGuid = GetDataStore("sso_guid");
      if (!isLogon() && betslipState == STATE_EKBA) {
        if (returnStatus == 'SSO_SIGN_IN_NO_CHANGE' || returnStatus == 'SSO_RE_SIGN_IN') {
          // User not changed or user is re-login in from other site
          sendSidRequest(); // start SSO ticket login
        } else if (returnStatus == 'SSO_SIGN_IN_USER_CHANGED') {
          // Logged in user is changed
          alert(GetError("SSO_SIGN_IN_USER_CHANGED"));
          ProcessLogoutResult();
        } else {
          // other status
          alert(GetError("SSO_SIGN_OUT_PASSIVE"));
          // restore betslip to not logged in state
          ProcessLogoutResult();
        }
      }
    },
    function () {
      traceFunc += 'T';
      ProcessLogoutResult(); // force to change betslip to logout state
      ShowError(2, GetError("system_datetime"), true, 60000);
    }
  );
}

// Support SSO
// (2) check status when change language (user is logged in)
// checking request returned normally
//      if detected logged in user is not changed, ask user to confirm logout,
//          if user confirm to logout, change the language of betslip and JCBW web page
//      if detected logged in user is re-logged in from outside, alert user changed message and force logout, then change the language of betslip and JCBW web page
//      if detected logged in user is changed, alert user changed message and force logout
//      otherwise, alert user signed out message and force logout, then change the language of betslip and JCBW web page
// checking request returned adnormally (e.g. timeout)
//      do as if user is not changed
function CheckStatusOnChangeLanguage(langToBe) {
  sendCheckSSOSignInStatusRequest(
    function () {
      var returnStatus = GetDataStore('sso_check_return_status');
      var signInLevel = GetDataStore('sso_sign_in_level');
      var webID = GetDataStore('sso_web_id');
      var ssoGuid = GetDataStore("sso_guid");
      var needChangeLang = true;
      if (returnStatus == 'SSO_SIGN_IN_NO_CHANGE') { // User not changed
        var needLogout = confirm(GetError("SSO_SIGN_OUT_ACTIVE"));
        if (needLogout) {
          OnClickLogout(true);
        } else {
          needChangeLang = false;
        }
      } else if (status == 'SSO_RE_SIGN_IN') { // user is re-login in from other site
        if (tightSSOCheck) {
          alert(GetError("SSO_SIGN_IN_USER_CHANGED"));
          ProcessLogoutResult(); // force to change betslip to logout state
        } else {
          var needLogout = confirm(GetError("SSO_SIGN_OUT_ACTIVE"));
          if (needLogout) {
            OnClickLogout(true);
          } else {
            needChangeLang = false;
          }
        }
      } else if (status == 'SSO_SIGN_IN_USER_CHANGED') { // Logged in user is changed
        alert(GetError("SSO_SIGN_IN_USER_CHANGED"));
        ProcessLogoutResult(); // force to change betslip to logout state
      } else if (status == 'SSO_SIGN_OUT') { // User is logged out from other site
        alert(GetError("SSO_SIGN_OUT_PASSIVE"));
        ProcessLogoutResult(); // force to change betslip to logout state
      } else { // other status or unkown error
        alert(GetError("SSO_SIGN_OUT_PASSIVE"));
        ProcessLogoutResult(); // force to change betslip to logout state
      }

      if (needChangeLang && top.endChgLang) {
        //var lang = GetDataStore("tempLang");
        SetDataStore("language", langToBe);
        ShortenAccInfo(false, true);
        setActiveStyleSheet(self);
        initAccInfo();
        initSlipFrame();
        multiSlipPanel.resetPanel();
        CloseAllPopup(false);
        top.endChgLang();
      }
    },
    function () {
      var needChangeLang = true;
      var needLogout = confirm(GetError("SSO_SIGN_OUT_ACTIVE"));
      if (needLogout) {
        OnClickLogout(true);
      } else {
        needChangeLang = false;
      }

      if (needChangeLang && top.endChgLang) {
        var lang = GetDataStore("tempLang");
        SetDataStore("language", lang);
        ShortenAccInfo(false, true);
        setActiveStyleSheet(self);
        initAccInfo();
        initSlipFrame();
        multiSlipPanel.resetPanel();
        CloseAllPopup(false);
        top.endChgLang();
      }
    }
  );
}

// Support SSO
// (3) check status when click logout button
// checking request returned normally
//      if detected logged in user is not changed, ask user to confirm logout
//      if detected logged in user is re-logged in from outside, alert user changed message and force logout (clear betlines as well).
//      if detected logged in user is changed, alert user changed message and force logout (clear betlines as well).
//      otherwise, alert user signed out message and force logout (clear betlines as well).
// checking request returned adnormally (e.g. timeout)
//      do as if user is not changed
function CheckStatusOnClickLogout() {
  sendCheckSSOSignInStatusRequest(
    function () {
      var returnStatus = GetDataStore('sso_check_return_status');
      var signInLevel = GetDataStore('sso_sign_in_level');
      var webID = GetDataStore('sso_web_id');
      var ssoGuid = GetDataStore("sso_guid");
      if (isLogon()) {
        if (returnStatus == 'SSO_SIGN_IN_NO_CHANGE') {
          OnClickLogout(); // ask user confirmation before logout
        } else if (returnStatus == 'SSO_RE_SIGN_IN') {
          if (tightSSOCheck) {
            alert(GetError("SSO_SIGN_IN_USER_CHANGED"));
            ProcessLogoutResult(); // force to change betslip to logout state
          } else {
            OnClickLogout(); // ask user confirmation before logout
          }
        } else if (returnStatus == 'SSO_SIGN_IN_USER_CHANGED') {
          alert(GetError("SSO_SIGN_IN_USER_CHANGED"));
          ProcessLogoutResult(); // force to change betslip to logout state
        } else {
          alert(GetError("SSO_SIGN_OUT_PASSIVE"));
          ProcessLogoutResult(); // force to change betslip to logout state
        }
      }
    },
    function () {
      OnClickLogout(); // ask user confirmation before logout
    }
  );
}

// support SSO
var ignoreError = false;

function sendSSOTicketExtendRequest(toIgnoreError) {
  ignoreError = toIgnoreError;

  if (isSSOEnabled()) {

    var para = {
      'knownWebID': GetDataStore('sso_web_id'),
      'knownSSOGUID': GetDataStore('sso_guid')
    };

    ajaxTxnRequest(
      'services/SSOService.svc/DoTicketExtendTR',
      JSON.stringify(para),
      function (msg) {
        processSSOTicketExtendResult();
      },
      function (msg) {
        processSSOTicketExtendTimeout();
      }
    );
    sendExtendSessionRequest();
  } else {
    ignoreError = false;
  }
}

// support SSO
function processSSOTicketExtendResult() {
  isClientActionTaken(false);
  if (ignoreError) {
    ignoreError = false;
    ResetIdleTimer(false);
    return;
  }
  var extendResult = GetDataStore("sso_last_extend_status");

  // take action when ticket extend failed
  if (extendResult != "0") {
    CloseAllPopup(true);
    setTimeout(function () {
      var newSSOWebID = GetDataStore("sso_web_id");
      if (newSSOWebID != "") {
        alert(GetError("SSO_SIGN_IN_USER_CHANGED"));
      } else {
        alert(GetError("SSO_SIGN_OUT_PASSIVE"));
      }
      closeAllBetSlipOverlay();
      (typeof (opn) != "undefined") ? opn.ProcessLogoutResult(): ProcessLogoutResult(); // force changing betslip to logout state
    }, 100);
  } else {
    ResetIdleTimer(false);
  }
  ignoreError = false;
}

// Support SSO
function processSSOTicketExtendTimeout() {
  traceFunc += 'T';
  isClientActionTaken(false);
  ignoreError = false;
}

// Support SSO
function ReceiveAndProcessTicketExtendResults(lastExtendStatus, lastExtendError, checkStatus, signInLevel, webID, ssoGUID) {
  SetDataStore('sso_last_extend_status', lastExtendStatus);
  SetDataStore('sso_last_extend_error', lastExtendError);
  SetDataStore('sso_check_return_status', checkStatus);
  SetDataStore('sso_sign_in_level', signInLevel);
  SetDataStore('sso_web_id', webID);
  SetDataStore('sso_guid', ssoGUID);
  processSSOTicketExtendResult();
  var webIDHashed = getWebIDHashed();
  DataLayer = null;
  if (webIDHashed != "") {
    DataLayer = {
      'cuno': webIDHashed
    };
    try {
		_detector.triggerCustomEvent("hashid", webIDHashed); 
    } catch (e) {}
  }
}

// support SSO
function sendAuthentAccSSORequest(account, password, toVerifyPassword) {
  var para = {
    'lang': GetLanguage(),
    'acc': account,
    'pass': password,
    'knownSSOGUID': GetDataStore('sso_guid'),
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id')
  };

  ajaxTxnRequest(
    'services/Login.svc/DoAuthentAccSSOTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArrayToDataStore(msg['DoAuthentAccSSOTRResult']);
      ProcessAuthentAccSSOResult();
    },
    function (msg) {
      disabledField(false);
      EnableAccInfo(true);
      EnableAddBetline(true);
      ShowError(2, GetError('system_busy'), true, 60000);
    }
  );
}

// support SSO
function ProcessAuthentAccSSOResult() {
  traceFunc += 'F';
  ProcessLoginSSO();
  document.body.style.cursor = 'auto';
}

// support SSO
function ProcessAuthentAccSSOTimeout() {
  traceFunc += 'T';
  disabledField(false);
  EnableAccInfo(true);
  EnableAddBetline(true);
  ShowError(2, GetError('system_busy'), true, 60000);
}

// support SSO
function sendLogoutSSOOnlyRequest() {
  ajaxTxnRequest(
    'services/Logout.svc/DoLogoutSSOOnly',
    '',
    function (msg) {
      setResultArrayToDataStore(msg['DoLogoutSSOOnlyResult']);
      ProcessLogoutResult();
    },
    ProcessLogoutResult
  );
}

// support SSO
function sendLogoutASOnlyRequest() {
  var para = {
    'acc': GetDataStore('account'),
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id')
  };

  ajaxTxnRequest(
    'services/Logout.svc/DoLogoutASOnlyTR',
    JSON.stringify(para),
    ProcessLogoutResult,
    ProcessLogoutResult
  );
}

function sendExtendSessionRequest() {
  var para = {
    'acc': GetDataStore('account'),
    'seqNo': GetNextSeqNo()
  };

  ajaxTxnRequest(
    'services/Session.svc/ExtendSessionTR',
    JSON.stringify(para),
    function (msg) {},
    function (msg) {
      // fail
    }
  );
}

function sendForceLogoutRequest() {
  var para = {
    'acc': GetDataStore('account'),
    'guid': GetDataStore('gu_id')
  };

  if (!isSafari() && navigator.sendBeacon) {
    navigator.sendBeacon(BetSlipIBPath + 'services/Session.svc/ForceLogoutTR', JSON.stringify(para));
    SetDataStore('is_logon', 0);
  } else {
    ajaxTxnRequest(
      'services/Session.svc/ForceLogoutTR',
      JSON.stringify(para),
      function (msg) {
        //setResultArrayToDataStore(msg['ForceLogoutTRResult']);
        var tLang = curLang == 'ch' ? 'en' : 'ch';
        var tPara = trimPara();
        window.location.href = window.location.pathname + '?lang=' + tLang + (tPara.length > 0 ? '&' + tPara.join('&') : '');
      },
      function (msg) {
        // fail
      }
    );
  }
}

function RequestWcipToken() {
  ajaxTxnRequest(
    'services/WcipToken.svc/RequestWcipToken',
    '',
    function (msg) {
      setResultArrayToDataStore(msg['WcipTokenResult']);
    },
    function (msg) {
      // fail
    }
  );
}

function sendAccountRecordsRequest(successFunc, failFunc) {
  var para = {
    'lang': GetLanguage(),
    'acc': GetDataStore('account'),
    'knownWebID': GetDataStore('sso_web_id'),
    'knownSSOGUID': GetDataStore('sso_guid'),
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id'),
    'reqCount': GetDataStore('reqCount'),
    'curDate': GetDataStore('stmt_curDate'),
    'endDate': GetDataStore('stmt_endDate'),
    'lastStatReq': GetDataStore('stmt_lastStatRequest'),
    'incompleteSeg': GetDataStore('stmt_inSeg'),
    'txnType': GetDataStore('stmt_txnType'),
    'betType': GetDataStore('stmt_betType'),
    'seqNo': GetNextSeqNo()
  };

  document.body.style.cursor = 'progress';
  ajaxTxnRequest(
    'services/Statement.svc/DoStatementSearchTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArrayToDataStore(msg['DoStatementSearchTRResult']);
      successFunc(content);
    },
    function (msg) {
      failFunc();
    }
  );
}


function enquireDDARecordsRequest(successFunc, failFunc) {
  var para = {
    'lang': GetLanguage(),
    'acc': GetDataStore('account'),
    'webId': GetDataStore('webID'),
    'knownWebID': GetDataStore('sso_web_id'),
    'knownSSOGUID': GetDataStore('sso_guid'),
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id'),
    'startDate': GetDataStore('stmt_curDate'),
    'endDate': GetDataStore('stmt_endDate'),
    'seqNo': GetNextSeqNo()
  };

  document.body.style.cursor = 'progress';
  ajaxTxnRequest(
    'services/DDA.svc/GetDDARecordsOperationTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArrayToDataStore(msg['GetDDARecordsOperationTRResult']);
      successFunc(content);
    },
    function (msg) {
      failFunc();
    }
  );
}


function sendRecallRequest(successFunc, failFunc) {
  var acc = GetDataStore('account');
  var lastTxnNo = GetDataStore('recall_lastTxnNo');
  SetDataStore('recall_dtls', '');

  var para = {
    'lang': GetLanguage(),
    'acc': GetDataStore('account'),
    'webId': GetDataStore('webID'),
    'knownWebID': GetDataStore('sso_web_id'),
    'knownSSOGUID': GetDataStore('sso_guid'),
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id'),
    'lastTxnNo': GetDataStore('recall_lastTxnNo'),
    'seqNo': GetNextSeqNo()
  };

  document.body.style.cursor = 'progress';

  ajaxTxnRequest(
    'services/Recall.svc/DoRecallTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArrayToDataStore(msg['DoRecallTRResult']);
      successFunc(content);
    },
    function (msg) {
      failFunc();
    }
  );
}

function enquirePpsEnabled(successFunc, failFunc, timeoutInMs) {
  var deferred = $.Deferred();
  ajaxTxnRequest(
    'services/PPS.svc/GetPPSEnabled',
    "",
    function (msg) {
      successFunc(msg);
      deferred.resolve();
    },
    function (msg) {
      failFunc(msg);
      deferred.resolve();
    },
    timeoutInMs
  );
  return deferred.promise();
}

function enquirePPSRequest(successFunc, failFunc) {
  var deferred = $.Deferred();
  var para = {
    'refNos': GetDataStore('refNos')
  };

  document.body.style.cursor = 'progress';

  ajaxTxnRequest(
    'services/PPS.svc/enquirePPSStatusTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArrayToDataStore(msg['enquirePPSStatusTRResult']);
      successFunc(content);
      deferred.resolve();
    },
    function (msg) {
      failFunc();
      deferred.resolve();
    }
  );
  return deferred.promise();
}

function sendDDAOperationRequest(sBankCode, successFunc, failFunc, timeoutInMs) {
  var deferred = $.Deferred();
  var para = {
    'acc': GetDataStore('account'),
    'shortBankCode': sBankCode,
    'seqNo': GetNextSeqNo(),
    'webId': GetDataStore('webID'),
    'knownWebID': GetDataStore('sso_web_id'),
    'knownSSOGUID': GetDataStore('sso_guid'),
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id')
  };

  ajaxTxnRequest(
    'services/DDA.svc/GetDDATxnParaOperationTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArrayToDataStore(msg['GetDDATxnParaOperationTRResult']);
      successFunc(content);
      deferred.resolve();
    },
    function (msg) {
      failFunc();
    },
    timeoutInMs
  );
  return deferred.promise();
}


function sendEFTRequest(para, successFunc, failFunc, timeoutInMs) {
  ajaxTxnRequest(
    'services/EFT.svc/DoEFTOperationTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArrayToDataStore(msg['DoEFTOperationTRResult']);
      successFunc(content);
    },
    function (msg) {
      failFunc();
    },
    timeoutInMs
  );
}

function sendDDAAutopayRequest(para, successFunc, failFunc, timeoutInMs) {
  ajaxTxnRequest(
    'services/DDA.svc/DoDDARequestOperationTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArrayToDataStore(msg['DoDDARequestOperationTRResult']);
      successFunc(content);
    },
    function (msg) {
      failFunc();
    },
    timeoutInMs
  );
}

function sendPPSDORequest(para, successFunc, failFunc) {
  ajaxTxnRequest(
    'services/PPS.svc/requestPPSDOTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArrayToDataStore(msg['requestPPSDOTRResult']);
      successFunc(content);
    },
    function (msg) {
      failFunc();
    }
  );
}


function sendPPSDRRequest(para, successFunc, failFunc, ppsTimeoutInMs) {
  ajaxTxnRequest(
    'services/PPS.svc/submitPPSDRNewTR',
    JSON.stringify(para),
    function (msg) {
      var content = setResultArray(msg['submitPPSDRNewTRResult']);
      successFunc(content);
    },
    function (msg) {
      failFunc();
    },
    ppsTimeoutInMs
  );
}

function sendFPSInfoRequest(para, successFunc, failFunc, fpsTimeoutInMs) {
  var deferred = $.Deferred();
  ajaxTxnRequest('services/FPS.svc/DoFPSInfoTR',
    JSON.stringify(para),
    function (msg) {
      if (msg != null) {
        if (msg.fps_status != "0") {
          var content = setResultArrayToDataStore(msg['DoFPSInfoTRResult']);
          successFunc(content);
        }
      }
      deferred.resolve();
    },
    function (msg) {
      failFunc();
      deferred.resolve();
    },
    fpsTimeoutInMs
  );
  return deferred.promise();
}

function sendFPSDepositRequest(para, successFunc, failFunc, fpsTimeoutInMs) {
  ajaxTxnRequest('services/FPS.svc/DoFPSDepositTR',
    JSON.stringify(para),
    function (msg) {
      if (msg != null) {
        successFunc(setResultArrayToDataStore(msg['DoFPSDepositTRResult']));
      }
    },
    function (msg) {
      failFunc();
    },
    fpsTimeoutInMs
  );
}

function sendFPSWithdrawalRequest(para, successFunc, failFunc, fpsTimeoutInMs) {
  ajaxTxnRequest('services/FPS.svc/DoFPSWithdrawalTR',
    JSON.stringify(para),
    function (msg) {
      if (msg != null) {
        successFunc(setResultArrayToDataStore(msg['DoFPSWithdrawalTRResult']));
      }
    },
    function (msg) {
      failFunc();
    },
    fpsTimeoutInMs,
    true
  );
}

function sendFPSInfoUpdate(para, successFunc, fpsTimeoutInMs) {
  ajaxTxnRequest('services/FPS.svc/DoFPSInfoUpdateTR',
    JSON.stringify(para),
    function (msg) {
      if (msg != null) {
        successFunc(setResultArray(msg['DoFPSInfoUpdateTRResult']));
      }
    },
    function (msg) {},
    fpsTimeoutInMs
  );
}

function sendFPSBankListRequest(para, successFunc, failFunc, fpsTimeoutInMs) {
  ajaxTxnRequest('services/FPS.svc/DoFPSBankListTR',
    JSON.stringify(para),
    function (msg) {
      if (msg != null) {
        successFunc(msg["DoFPSBankListTRResult"]);
      }
    },
    function (msg) {
      failFunc();
    },
    fpsTimeoutInMs
  );
}

function sendOTPCodeGenerateRequest(para, successFunc, failFunc, fpsTimeoutInMs) {
  ajaxTxnRequest('services/FPS.svc/DoOTPCodeGenerateTR',
    JSON.stringify(para),
    function (msg) {
      if (msg != null) {
        var arr = setResultArray(msg["DoOTPCodeGenerateTRResult"]);
        successFunc(arr);
      }
    },
    function (msg) {
      failFunc();
    },
    fpsTimeoutInMs
  );
}

function sendOTPCodeConfirmRequest(para, successFunc, failFunc, fpsTimeoutInMs) {
  ajaxTxnRequest('services/FPS.svc/DoOTPCodeConfirmTR',
    JSON.stringify(para),
    function (msg) {
      if (msg != null) {
        var arr = setResultArray(msg["DoOTPCodeConfirmTRResult"]);
        successFunc(arr);
      }
    },
    function (msg) {
      failFunc();
    },
    fpsTimeoutInMs
  );
}

function sendFpsSetupRequest(para, successFunc, failFunc, fpsTimeoutInMs) {
  ajaxTxnRequest('services/FPS.svc/DoFPSSetupTR',
    JSON.stringify(para),
    function (msg) {
      if (msg != null) {
        var arr = setResultArray(msg['DoFPSSetupResult']);
        successFunc(arr);
      }
    },
    function (msg) {
      failFunc();
    },
    fpsTimeoutInMs
  );
}

function sendeWalletReceiptRequest(data, successFunc, errorFunc) {

  var url = "services/Ewallet.svc/DoGetReceipt";
  var para = '{"data":"' + data + '"}';

  ajaxTxnRequest(url,
    para,
    function (msg) {
      if (msg != null) {
        successFunc(setResultArray(msg["DoGetReceiptResult"]));
      }
    },
    function (msg) {
      console.log(msg);
      errorFunc();
    },
    null);
}