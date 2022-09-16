var newBetlines = [];

function InitBetPreview() {

  $('#msgColumn').hide();
  $('#inplayMsg').hide();
  $('#betHeaderCell1').html(GetText('alt_preview_bet'));
  $('#betHeaderCell2').html('');
  $('#betHeaderCell3').html('');
  $('#betHeaderPrint').hide();
  $('#betHeaderPrint').html(GetText('print'));
  $('#betHeaderPrint').prop('title', GetText('print'));
  $('#txtBetTotal').html(GetText('fld_total'));
  $('#txtBetTotalReply').html(GetText('fld_total'));
  $('.inplayMsgTxt').hide();
  $('.inplayMsgTxt').html(GetText("txt_in_play_game"));
  $('#betSubHeader').html('');
  $('#previewTable').html('');
  $('#replyTable').html('');
  $('#divBetReply').hide();
  $('#divPreviewBottom').show();
  $('#divReplyBottom').hide();
  $('#divReplyTotal').hide();
  $('#replyRecall').hide();
  $('#replyClose').hide();
  $('#replySend').hide();

  $('#previewDel').prop('class', 'previewDeleteDimButton');
  enablePreviewButton();
  DrawPreviewTable();

  selectedBet = -1;

  $('#previewTable').scrollTop(0);

}

function DrawPreviewTable() {
  var totalBetAmount = 0;
  for (var i = 0; i < betlines.length; i++) {
    if (betlines[i].betMethod == 1)
      totalBetAmount += parseInt(betlines[i].foBetObj.unitBet, 10);
    else
      totalBetAmount += betlines[i].foBetObj.unitBet * betlines[i].foBetObj.getSelectionSize();
  }

  $('#valueBetTotal').html(FormatCurrency(totalBetAmount));
  $('#previewTable').html(CreatePreviewBetTable(betlines.length));
}

function CreatePreviewBetTable(totalBetlines) {
  var buf = new StringBuffer();

  // header
  buf.append('<div>');
  buf.append('<div class="previewTableHead1">').append(GetText('fld_item_no')).append('</div>');
  buf.append('<div class="previewTableHead2">').append(GetText('fld_bet_type')).append('</div>');
  buf.append('<div class="previewTableHead3">').append(GetText('fld_bet_detail')).append('</div>');
  buf.append('<div class="previewTableHead4">').append(GetText('fld_bet_amount')).append('</div>');
  buf.append('</div>');

  buf.append('<div class="previewBody">');
  for (var i = 0; i < totalBetlines; i++) {
    buf.append('<div class="betslipRow" onclick="selectPreviewRow(this, ').append(i).append(')">');
    buf.append('<div class="previewTableCell1 ')
      .append(strStyle[i % 2]).append('">')
      .append(i + 1).append('</div>');
    buf.append('<div class="previewTableCell2 ')
      .append(strStyle[i % 2]).append('">')
      .append(GetDispBetType(betlines[i].foBetObj))
      .append('</div>');
    buf.append('<div class="previewTableCell3 ')
      .append(strStyle[i % 2]).append('">')
      .append(genLongLine(betlines[i].foBetObj));
    buf.append('<br/><br/>');

    buf.append(FormatCurrency(betlines[i].foBetObj.unitBet));
    if (betlines[i].betMethod == 1) { // flexibet
      buf.append(' (').append(GetText('flexibet_name')).append(')');
    }

    buf.append('</div>');
    buf.append('<div class="previewTableCell4 ')
      .append(strStyle[i % 2]).append('">');

    if (betlines[i].betMethod == 1) // flexibet
      buf.append(FormatCurrency(betlines[i].foBetObj.unitBet));
    else
      buf.append(FormatCurrency(betlines[i].foBetObj.unitBet * betlines[i].foBetObj.getSelectionSize()));

    buf.append('</div>');
    buf.append('</div>');
  }
  buf.append('</div>');

  return buf.toString();
}


function selectPreviewRow(obj, idx) {
  if (isProcessing)
    return;

  resetPreviewRow();
  if (selectedBet == idx) {
    selectedBet = -1;
    $('#previewDel').prop('class', 'previewDeleteDimButton');
  } else {
    $(obj).children().addClass("tdHL");
    selectedBet = idx;
    $('#previewDel').prop('class', 'previewDeleteButton');
  }
}

function resetPreviewRow() {
  $('[class^="previewTableCell"]').removeClass("tdHL");
}


function OnClickDeleteBet() {
  if (selectedBet < 0) {
    alert(GetError("Please click on a bet before delete."));
    return;
  }

  if (isProcessing)
    return;
  isProcessing = true;

  var truthBeTold = confirm(GetText("confirm_delete"));
  if (truthBeTold) {
    Bet_DeleteItem();
  } else {
    isProcessing = false;
  }
}

function Bet_DeleteItem() {
  DeleteBetlineWithIndex(selectedBet, false);
  selectedBet = -1;

  isProcessing = false;
  if (betlines.length < 1) {
    OnClickClosePreview();
  } else {
    DrawPreviewTable();
    $('#previewDel').prop('class', 'previewDeleteDimButton');
  }
}

function OnClickClosePreview() {
  if (isProcessing)
    return;

  HideAllError();
  RedrawBetlineTable();
  multiSlipPanel.updatePanel();
  ResetCounterOfferBetlines();

  $('#divBetPreview').hide();
  $('#divPreviewBottom').hide();
  $('#divReplyBottom').hide();
  $('#valueBetTotal').html('');
  $('#previewTable').html('');
  setBetslipState(STATE_NORMAL);
}

function OnClickClose(forceClose) {
  if (isProcessing)
    return;
  
  var c = true;

  if (newBetlines.length > 0 && forceClose != true) {
    c = false;
    c = confirm(GetText("msg_cancel_counter"));
  }

  if (c == true) {
    newBetlines = [];

    ResetBetlineTable();
    $('#divBetPreview').hide();
    $('#divPreviewBottom').hide();
    $('#divReplyBottom').hide();
    $('#valueBetTotal').html('');
    $('#previewTable').html('');
    $('#printDiv').html('');
    setBetslipState(STATE_NORMAL);
    $("#bg-for-print").text('');
  }
}

// send bet txn

function OnClickConfirmBet() {
  if (isProcessing || betlines.length <= 0)
    return;

  isProcessing = true;

  ProcessConfirmBet();
}

function OnClickResendConfirmBet() {
  if (isProcessing || betlines.length <= 0)
    return;
  
  if (!$('.counterResendYes').is(':checked'))
    return;
  
  var tmpBetlines = [];
  for ( var i=0; i<newBetlines.length; i++ ) {
	  if ( $('#resend_yes'+i).is(':checked') ) {
		  tmpBetlines.push(newBetlines[i]);
	  }
  }
  
  betlines = tmpBetlines;
  OnClickPreview();
}

function ProcessConfirmBet() {
  newBetlines = [];
  resetPreviewRow();
  disablePreviewButton();
  $('#divPrint').html('');

  ProcessConfirmBet2();
}

function ProcessConfirmBet2() {
  sendBet_BetMessage = CreateBetMsg();
  SubmitBet();
}

function ShowInplayMsg() {
  $('.inplayMsgTxt').show();
}

function HideInplayMsg() {
  $('.inplayMsgTxt').hide();
}

function SubmitBet() {
  SetDataStore('sendbet_reply', '');
  SetDataStore('sendbet_status', '');
  SetDataStore('sendbet_error', '');
  SetDataStore('new_balance', '');
  SetDataStore('bet_total', '');
  SetDataStore('trans_time', '');

  var para = {
    'lang': GetLanguage(),
    'acc': GetDataStore('account'),
    'seqNo': GetNextSeqNo(),
    'betlines': CreateBetMsg(),
    'betlinesAT': CreateBetMsg(true),
    'knownWebID': GetDataStore('sso_web_id'),
    'knownSSOGUID': GetDataStore('sso_guid'),
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id'),
    'delayReq': '0'
  };

  ajaxTxnRequest(
    'services/SendBet.svc/DoSendBetTR',
    JSON.stringify(para),
    function (msg) {
      var resArr = setResultArrayToDataStore(msg["DoSendBetTRResult"]);
      ProcessSendBetResult(resArr);
    },
    function (msg) {
      var resArr = {
        sendbet_reply: unknownReply
      };
      ProcessSendBetResult(resArr);
    }
  );
}

function SendDelayRequest(seqNo, betlines) {
  SetDataStore('sendbet_reply', '');
  SetDataStore('sendbet_status', '');
  SetDataStore('sendbet_error', '');
  SetDataStore('new_balance', '');
  SetDataStore('bet_total', '');
  SetDataStore('trans_time', '');

  var para = {
    'lang': GetLanguage(),
    'acc': GetDataStore('account'),
    'seqNo': seqNo,
    'betlines': betlines,
    'delayReq': '1',
    'knownWebID': GetDataStore('sso_web_id'),
    'knownSSOGUID': GetDataStore('sso_guid'),
    'guid': GetDataStore('gu_id'),
    'sid': GetDataStore('session_id')
  };

  ajaxTxnRequest(
    'services/SendBet.svc/DoSendBetTR',
    JSON.stringify(para),
    function (msg) {
      var resArr = setResultArrayToDataStore(msg["DoSendBetTRResult"]);
      ProcessSendBetResult(resArr);
    },
    function (msg) {
      var resArr = {
        sendbet_reply: unknownReply
      };
      ProcessSendBetResult(resArr);
    }
  );
}

function CreateBetMsg(isRef) {
  var betmsg = "";
  var haveInPlay = false;

  for (var i = 0; i < betlines.length; i++) {
    
    if (!betlines[i].isSendout) {
      continue;
    }
    betlines[i].foBetObj.resetOddsdiff();
  
    if (isRef) {
      betmsg += genBetLineRef(betlines[i].foBetObj);
      betmsg = betmsg.replace('FBF ', '');
      if (betlines[i].foBetObj.counterid) {
        betmsg = betmsg.replace(betlines[i].foBetObj.counterid, '');
      }
    } else {
      betmsg += genBetLine(betlines[i].foBetObj);
    }
    
    if (betlines[i].foBetObj.inplay) {
      betmsg += " I$" + betlines[i].foBetObj.unitBet;
    } else {
      var partial = "";

      // M6 partial bet
      if (betlines[i].foBetObj.partial)
        partial = "P";

      var rg = "";
      if (betlines[i].foBetObj.isRandGen)
        rg = "(RG)";
      var sb = "";
      if (betlines[i].foBetObj.snowball)
        sb = "S";
      var unitBet = betlines[i].foBetObj.unitBet;

      betmsg += " " + partial + rg + sb;

	  // HB flexibet
      if (betlines[i].betMethod == 1)
        betmsg += "$";

      betmsg += "$" + unitBet;
    }
	
	if (IsFixedOddsBetType(betlines[i].foBetObj)) {
      if (!isRef) {
        betmsg += "$" + betlines[i].counterOfferCount + "\\";
      } else {
        betmsg += "\\";
      }
    } else {
      betmsg += "\\";
    }
  }

  var i = betlines.length;
  while (i--) {
    if (!betlines[i].isSendout) {
      betlines.splice(i, 1);
    }
  }

  return betmsg;
}

function ProcessSendBetResult(result) {
  sendbetResult = result;

  var is_delay_reply = result.is_delay_reply;
  var sendbet_status = result.sendbet_status;
  var sendbet_error = result.sendbet_error;
  var delay_request_seq_no = result.delay_request_seq_no || "";
  var betlines = result.betlines || "";

  if (sendbet_error && sendbet_error.indexOf('159') >= 0 && !getDelayReply2nd) { // retry 1 more
    getDelayReply2nd = true;
    ShowInplayMsg();
    setTimeout(
      function () {
        SendDelayRequest(delay_request_seq_no, betlines);
      }, inplayDelayRetryTime * 1000);
  } else if (is_delay_reply == "1" && !getDelayReplyOnce && sendbet_status == "0") {
    var delay_time_in_seconds = result.delay_time_in_seconds;
    getDelayReplyOnce = true;
    ShowInplayMsg();
    setTimeout(
      function () {
        SendDelayRequest(delay_request_seq_no, betlines);
      }, parseInt(delay_time_in_seconds, 10) * 1000);
  }
  // Support SSO
  else if (sendbet_status == '-2') {
    isProcessing = false;
    processSSOExtendResult(result); // Support SSO
    $('#previewTable').html('');
    $('#replyTable').html('');
    $('#divBetPreview').hide();
    HideInplayMsg();
    return;
  }
  // End Support SSO        
  else {
    getDelayReplyOnce = false;
    getDelayReply2nd = false;
    HideInplayMsg();
    ProcessNormalBetResult(result);
   
  }

  $('#previewTable').scrollTop(0);
}


function ProcessNormalBetResult(result) {
  ResetIdleTimer(false);
  setBetslipState(STATE_CONFIRMBET);
  CreateBetReplyHeader(result);

  $('#previewTable').html('');
  $('#divPreviewBottom').hide();
  $('#divReplyBottom').show();
  $('#divReplyTotal').show();

  $('#replyTable').html(CreateBetReplyTable(false, result));
  $('#valueBetTotalReply').html(CreateBetReplyAmount(result));


  // update balance
  var long_new_balance = -1;
  var bet_total = result.bet_total;
  if (typeof bet_total != 'undefined' && bet_total != "" && bet_total != "0") {
    var new_balance = result.new_balance;
    if (typeof new_balance != 'undefined' && new_balance != "" && new_balance.toUpperCase() != "NA" && new_balance.toUpperCase() != "N/A") {
      long_new_balance = parseFloat(new_balance) - parseFloat(bet_total);
    } else {
      long_new_balance = parseFloat(balance) - parseFloat(bet_total);
    }
  }

  // log current txn records
  if (typeof result.sendbet_reply != "undefined") {
    logDataAccessor.LogRecord(result.sendbet_reply, betlines);
  }

  if (anyUnknownRow)
    ShowAccountBalance(unknownAmount);
  else if (long_new_balance >= 0)
    ShowAccountBalance(long_new_balance);

  if (anyUnknownRow) {
	$('#replyClose').hide();
    $('#replyRecall').show();
  }
  else
    $('#replyClose').show();

  setTimeout("disableBlocking()", 100);
} // ProcessNormalBetResult()

function disableBlocking() {
  isProcessing = false;
}

function CreateBetReplyHeader(result) {
  $('#betHeaderCell1').html(GetText('fld_bet_reply'));
  $('#betHeaderCell2').html(GetText('acc_logon_time'));
  $('#betHeaderCell3').html(GetTxnTime(result));
  $('#betHeaderPrint').show();
  $('#betSubHeader').html(CreateBetSummary(false, result));
}

function GetTxnTime(result) {
  var txnTime = '';
  var sendbet_status = result.sendbet_status;
  if (sendbet_status == "0") {
    txnTime = result.trans_time;
  } else if (sendbet_status == "-21") {
    txnTime = GetError("system_return21");
  } else if (undefined == sendbet_status || sendbet_status == "") {
    txnTime = result.trans_time;
  } else {
    txnTime = GetError(result.sendbet_error);
  }
  return txnTime;
}

function IsAllBetsAccepted() {
  var betReply = GetDataStore("sendbet_reply");
  if (betReply == '')
    return false;
  else if ((betReply.indexOf("REJECTED") < 0) && (betReply.indexOf("UNKNOWN") < 0))
    return true;
  else
    return false;
}

function CreateBetSummary(isPrint, result) {
  var allBetReply_Message = result.sendbet_reply;
  var aryBetReply_Message = allBetReply_Message.split("@@@");
  var acceptedCount = 0;
  var rejectedCount = 0;
  var unknownCount = 0;

  for (var i = 1; i < betlines.length + 1; i++) {
    if (aryBetReply_Message[i] != undefined) {
      tmp = aryBetReply_Message[i].split("|||");
    }

    var record_status = (tmp.length < 1 || tmp[0] == '' || tmp[0] == ' ') ? 'UNKNOWN' : tmp[0];

    switch (record_status) {
      case "ACCEPTED":
        acceptedCount++;
        break;
      case "REJECTED":
        rejectedCount++
        break;
      case "COUNTER":
        rejectedCount++
        break;
      case "UNKNOWN":
      case "UNKNOWN_SPECIAL":
        unknownCount++;
        break
    }
  }

  var buf = new StringBuffer();
  if (acceptedCount > 0)
    buf.append('<div class="divSummaryYes">' + GetText("BET_ACCEPTED") + ' : ' + acceptedCount + '</div>');
  if (rejectedCount > 0)
    buf.append('<div class="divSummaryNo">' + GetText("BET_REJECTED") + ' : ' + rejectedCount + '</div>');
  if (unknownCount > 0)
    buf.append('<div class="divSummaryUnknown">' + GetText("BET_UNKNOWN") + ' : ' + unknownCount + '</div>');

  return buf.toString();
}

function CreateBetReplyTable(isPrint, result) {
  var strStyle = new Array('tdGray', 'tdWhite');

  anyUnknownRow = false;

  var allBetReply_Message = result.sendbet_reply;
  var aryBetReply_Message = allBetReply_Message.split("@@@");
  var buf = new StringBuffer();

  buf.append('<div style="display:inline-block">');
  buf.append('<div class="replyTableHead1">').append(GetText('fld_item_no_reply')).append('</div>');
  buf.append('<div class="replyTableHead2">').append(GetText('fld_reply_status')).append('</div>');
  buf.append('<div class="replyTableHead3">').append(GetText('fld_reply_ref_no')).append('</div>');
  buf.append('<div class="replyTableHead4">').append(GetText('fld_bet_type')).append('</div>');
  buf.append('<div class="replyTableHead5">').append(GetText('fld_bet_detail')).append('</div>');
  buf.append('<div class="replyTableHead6">').append(GetText('fld_bet_amount')).append('</div>');
  buf.append('</div>');

  var styleIdx = 0;
  var x = 0;
  var y = 0;
  newBetlines = [];
  var counterCount = 0;

  buf.append('<div class="replyBody">');

  //sort betline and reply by COUNTER > REJECTED > Other
  var counterBets = [];
  var counterReply = [];
  var rejectBets = [];
  var rejectReply = [];
  var normalBets = [];
  var normalReply = [];
  var unknownBets = [];
  var unknownReply = [];
  for (var i = 0; i < betlines.length; i++) {
    var tmp = new Array();
    var reply = '';
    if (aryBetReply_Message[i + 1] != undefined) {
      reply = aryBetReply_Message[i + 1];
      tmp = aryBetReply_Message[i + 1].split("|||");
    }

    var status = (tmp.length < 1 || tmp[0] == '' || tmp[0] == ' ') ? 'UNKNOWN' : tmp[0];
    if (status == "COUNTER") {
      counterBets.push(betlines[i]);
      counterReply.push(reply);
    } else if (status == "REJECTED") {
      rejectBets.push(betlines[i]);
      rejectReply.push(reply);
    } else if (status =="ACCEPTED") {
      normalBets.push(betlines[i]);
      normalReply.push(reply);
    } else {
      unknownBets.push(betlines[i]);
      unknownReply.push(reply);
    }
  }

  var betlineSorted = counterBets.concat(rejectBets).concat(unknownBets).concat(normalBets);
  var replySorted = counterReply.concat(rejectReply).concat(unknownReply).concat(normalReply);
  //sort finish

  for (var i = 0; i < betlineSorted.length; i++) {
    var tmp = new Array();
    if (replySorted[i] != undefined) {
      tmp = replySorted[i].split("|||");
    }

    var record_status = (tmp.length < 1 || tmp[0] == '' || tmp[0] == ' ') ? 'UNKNOWN' : tmp[0];
    var trans_no = (tmp.length < 2) ? '' : tmp[1];
    var maxpay = (tmp.length < 4) ? '' : tmp[3];
    var flexibet = (tmp.length < 5) ? '' : tmp[4];
    var bet_type = GetDispBetType(betlineSorted[i].foBetObj);
    var betdetail = genLongLine(betlineSorted[i].foBetObj);
    var unitbet = betlineSorted[i].foBetObj.unitBet;

    var newCounterOfferCount = (tmp.length < 7) ? '' : tmp[5];
    var newCounterOfferKey = (tmp.length < 7) ? '' : tmp[6];
    var newUnitbet = (tmp.length < 7) ? '' : tmp[7];
    var newBetline = (tmp.length < 7) ? '' : tmp[8];
    var newBetDetail = '';

    //new betline info for counter offer
    if (record_status == "COUNTER") {
      var newBet = betlineSorted[i].cloneBetlineInfo();
      newBet.counterOfferCount = newCounterOfferCount;

      if (newBetline) {
        newBet.foBetObj = UpdateCounterOfferBetline(newBet.foBetObj, newBetline);
      }

  	  newBetDetail = genLongLine(newBet.foBetObj);

      if (newUnitbet) {
        newBet.foBetObj.unitBet = parseInt(newUnitbet);
        newBetDetail += CreateCounterOfferUnitbet(unitbet, newUnitbet);
      } else {
        newBetDetail += '<br/><br/>' + FormatCurrency(unitbet);
      }

      if (newCounterOfferKey) {
        newBet.foBetObj.counterid = '(' + newCounterOfferKey + ') ';  //add a space after )
      }

      newBetlines.push(newBet);
    }

    //new betline info for auto accept
    if (record_status == "ACCEPTED") {
      var newBet = betlineSorted[i].cloneBetlineInfo();
      if (newBetline) {
        newBet.foBetObj = UpdateCounterOfferBetline(newBet.foBetObj, newBetline);
	    }
      betdetail = genLongLine(newBet.foBetObj)
    }
      
    if (flexibet != '') {
      var flexiComb = flexibet.split('/');
      if (flexiComb.length > 1)
        betdetail += '<br/><br/>' + FormatCurrency(flexiComb[0]) + '/' + flexiComb[1];
      else
        betdetail += '<br>';
      var flexiStr = ' (' + GetText('flexibet_name') + ')';
      if (betdetail.indexOf(flexiStr) < 0)
        betdetail += flexiStr;
    } 
	else {
      betdetail += '<br/><br/>' + FormatCurrency(unitbet);
    }
    if (maxpay != '') {
      betdetail += '<br/><br/>' + GetText('max_payout') + '&nbsp;' + FormatCurrency(maxpay);
    }

    var amount = replySorted[i].split("|||")[2];
    amount = amount.toString(10);
    amount = FormatCurrency(amount);

    var betslipRow = new StringBuffer();

    betslipRow.append('<div class="betslipRow">');
    betslipRow.append('<div class="replyTableCell1 ')
      .append(strStyle[styleIdx % 2]).append('">').append(i + 1).append('</div>');

    var isUnknownRow = false;
    var tmp = GetText(record_status);
    if (record_status == "UNKNOWN" || record_status == "INPLAY_UNKNOWN" || record_status == "UNKNOWN_SPECIAL") {
      tmp = "<font color=#FF0000>" + GetText(record_status) + "*</font>";
      isUnknownRow = true;
      anyUnknownRow = true;
      $('pic_txn_rec').src = GetImageURL('pic_txn_rec');

      tmp = "<font color=#ffae00>" + GetText(record_status) + "*</font>" + '<div class="divCellUnknown"><img src="/info/include/images/icon_unknown.gif"/></div>';
      isUnknownRow = true;
      anyUnknownRow = true;
      $('pic_txn_rec').src = GetImageURL('pic_txn_rec');
    } else if (record_status == "ACCEPTED") {
      tmp = "<font color=#009900>" + GetText(record_status) + "</font>" + '<div class="divCellYes"><img src="/info/include/images/icon_yes.gif"/></div>';
    } else if (record_status == "REJECTED") {
      tmp = "<font color=#ff0000>" + GetText(record_status) + "</font>" + '<div class="divCellNo"><img src="/info/include/images/icon_no.gif"/></div>';

    } else if (record_status == "COUNTER") {
      tmp = "<font color=#ff0000>" + GetText("REJECTED") + "</font>" + '<div class="divCellNo"><img src="/info/include/images/icon_no.gif"/></div>';
    }
    betslipRow.append('<div style="display:flex">');
    betslipRow.append('<div class="replyTableCell2 ')
      .append(strStyle[styleIdx % 2]).append('">').append(tmp).append('</div>');

    tmp = trans_no;
    if (record_status == "UNKNOWN") {
      tmp = GetError("901");
    }
    //Counter offer row
    if (record_status == "COUNTER") {
      var tmp = '';
      var resend = '';
      if (newBetline) {
        tmp = GetText("lbl_odds_changed");
        resend = GetText("lbl_accept_odds");
      }
      if (newUnitbet) {
        tmp = GetText("lbl_review_betsize");
        resend = GetText("lbl_accept_amount");
      }
      if (newBetline && newUnitbet) {
        tmp = GetText("lbl_review_odds_betsize");
        resend = GetText("lbl_accept_odd_amount");
      }

      betslipRow.append('<div class="replyTableCell3 ')
        .append(strStyle[styleIdx % 2]).append('">').append(tmp).append('</div>');

      betslipRow.append('<div class="replyTableCell4 ')
        .append(strStyle[styleIdx % 2]).append('">').append(bet_type).append('</div>');
     
      var checkResend = '';
      var printSubfix = '';
      if (isPrint) {
        printSubfix = '_p';
      }
      if (checkCounterOfferResend) {
        checkResendYes = ' checked="checked" ';
        checkResendNo = '';
      } else {
        checkResendYes = '';
        checkResendNo = ' checked="checked" ';
      }
      
      betslipRow.append('<div class="replyTableCell5 ').append(strStyle[styleIdx % 2]).append('">');
      betslipRow.append(newBetDetail).append('</div>');
      betslipRow.append('<div class="replyTableCell6 ').append(strStyle[styleIdx % 2]).append('">');
      betslipRow.append('<div>' + FormatCurrency(newBet.foBetObj.unitBet * newBet.foBetObj.getSelectionSize())).append('</div>');
      betslipRow.append('<div style="position:relative; bottom:1px; padding-top:10px; text-align:left">')
        .append(resend)
        .append('<br/>')
        .append('<input id="resend_yes' + counterCount + printSubfix + '" type="radio" ' + checkResendYes + ' name="resend' + counterCount + printSubfix + '" onclick="UpdateCounterBetline(' + counterCount + printSubfix + ')" class="counterResendYes' + printSubfix + '" />')
        .append('<label for="resend_yes' + counterCount + printSubfix+ '">' + GetText("lbl_resend_yes") + '</label> ')
        .append('<input id="resend_no' + counterCount + printSubfix + '" type="radio" ' + checkResendNo + ' name="resend' + counterCount + printSubfix + '" onclick="UpdateCounterBetline(' + counterCount + printSubfix + ')" class="counterResendNo' + printSubfix + '" />')
        .append('<label for="resend_no' + counterCount + printSubfix + '">' + GetText("lbl_resend_no") + '</label> ')
        .append('</div > ');
      betslipRow.append('</div>');
      counterCount++;
      //Counter offer row end
    } else {
      betslipRow.append('<div class="replyTableCell3 ')
        .append(strStyle[styleIdx % 2]).append('">').append(tmp).append('</div>');

      betslipRow.append('<div class="replyTableCell4 ')
        .append(strStyle[styleIdx % 2]).append('">').append(bet_type).append('</div>');
      betslipRow.append('<div class="replyTableCell5 ');
      betslipRow.append(strStyle[styleIdx % 2]).append('">').append(betdetail).append('</div>');
      
      betslipRow.append('<div class="replyTableCell6 ')
        .append(strStyle[styleIdx % 2]).append('"><nobr>');
      if (isUnknownRow) {
        betslipRow.append(unknownAmountBlack);
      } else {
        betslipRow.append(amount);
      }
      betslipRow.append('</nobr></div>');
    }
    betslipRow.append('</div>');
    betslipRow.append('</div>');
    if (isUnknownRow) {
      betslipRow.append('<div class="')
        .append(strStyle[styleIdx % 2]).append(' betReplyRecall" onclick="OnClickCloseAndRecall()">');
      betslipRow.append(GetText('text_unknown_message')).append('</div>');
    }

    styleIdx++;

    buf.append(betslipRow);
  } // for each transaction
    
  if (newBetlines.length > 0) {
    $('#replySend').show();
    if (!isPrint) {
      if (checkCounterOfferResend) {
        enableReplySendButton();
      } else {
        disableReplySendButton();
      }
    }
  } else {
    $('#replySend').hide();
  }


  return buf.toString();
} // CreateBetReplyTable()

function CreateBetReplyAmount(result) {
  if (anyUnknownRow)
    return unknownAmountBlack;
  return FormatCurrency(result.bet_total);
}

function disablePreviewButton() {
  $('#previewDel').prop('class', 'previewDeleteDimButton');
  $('#previewClose').prop('class', 'previewCloseDimButton');
  $('#previewSend').prop('class', 'previewSendDimButton');
  $('#previewClose').addClass('previewSendCell');
  $('#previewSend').addClass('previewSendCell');
  $('#replySend').prop('class', 'previewSendDimButton');
}

function enablePreviewButton() {
  $('#previewClose').prop('class', 'previewCloseButton');
  $('#previewSend').prop('class', 'previewSendButton');
  $('#previewClose').addClass('previewSendCell');
  $('#previewSend').addClass('previewSendCell');
  $('#replySend').prop('class', 'previewSendButton');
}

function disableReplySendButton() {
  $('#replySend').prop('class', 'previewSendDimButton');
}

function enableReplySendButton() {
  $('#replySend').prop('class', 'previewSendButton');
}

function OnCancelSendBet() {
  enablePreviewButton();
  isProcessing = false;
}

function OnClickCloseAndRecall() {
  OnClickClose();
  OnClickRecall();
}

function CreateCounterOfferUnitbet(oldAmountVal, newAmountVal) {
  var textColor = '';
  var arrow = '';
  if (oldAmountVal && newAmountVal) {

    if (newAmountVal > oldAmountVal) {
      textColor = "greentext";
      arrow = ' <span class="oddsUp"></span>';
    } else if (newAmountVal < oldAmountVal) {
      textColor = "redtext";
      arrow = ' <span class="oddsDown"></span>';
    } else {
      return '<br/><br/>' + FormatCurrency(oldAmountVal);
    }

    return '<br/><br/>' + FormatCurrency(oldAmountVal) + GetText('txt_changed_to') + '<span class="nowrap"><span class="' + textColor + '">' + FormatCurrency(newAmountVal) + arrow + '</span>';
  }

  if (oldAmountVal) {
    return '<br/><br/>' + FormatCurrency(oldAmountVal);
  }

  if (newAmountVal) {
    return '<br/><br/>' + FormatCurrency(newAmountVal);
  }
}

function UpdateCounterBetline(idx) {
  newBetlines[idx].isSendout = $('.counterResendYes:eq('+idx+')').is(':checked');
  if ( $('.counterResendYes').is(':checked') )
    enableReplySendButton();
  else
    disableReplySendButton();
}

function UpdateCounterOfferBetline(foBetObj, newBetline) {
  var newBetlineArr = [];
  if (newBetline.indexOf('+') > 0) {
    newBetlineArr = newBetline.split('+');
  } else {
    newBetlineArr.push(newBetline);
  }

  for (var i = 0; i < newBetlineArr.length; i++) {
     foBetObj = findAndUpdateFoBetObj(foBetObj, parseCounterOfferBet(newBetlineArr[i]));
  }
  return foBetObj;
}

function parseCounterOfferBet(line) {
	// 708001,0,3@5.9
	var tmp = line.split('@');
	var o = tmp[1];
	var tmp2 = tmp[0].split(',');
	var p = tmp2[0];
	var l = tmp2[1];
	var c = tmp2[2];
    return { poolid: p, lineid: l, combid: c, odds: o };
}

function findAndUpdateFoBetObj(foBetObj, newObj) {
	for ( var i=0; i<foBetObj.pools.length; i++ ) {
		if ( foBetObj.pools[i].poolid==newObj.poolid ) {
			for ( var j=0; j<foBetObj.pools[i].combs.length; j++ ) {
				var comb = foBetObj.pools[i].combs[j];
				if (comb.lineid==newObj.lineid && comb.combid==newObj.combid ) {
					 comb.oddsdiff = parseFloat(comb.odds) - parseFloat(newObj.odds);
           comb.oldOdds = comb.odds;
           comb.odds = newObj.odds;
				}
			}
		}
	}
	return foBetObj;
}

// layout

function betReplyPrint() {
  $("#bg-for-print").text(
  	"@media print {" +
  		"#infoDiv{" +
  			"display: none !important;" +
  		"}" +
  	"}"
  );
  $('#printDiv').html('');
  var buf = new StringBuffer();
  buf.append('<div style="font-size:14px;font-weight:bold">');
  buf.append(GetText('fld_bet_reply') + ' ' + GetText('acc_logon_time') + ' ' + GetTxnTime(sendbetResult));
  buf.append('</div>');
  buf.append(CreateBetSummary(true, sendbetResult));
  buf.append(CreateBetReplyTable(true, sendbetResult));
  buf.append('<div style="text-align:right;width:550px;font-weight:bold">');
  buf.append($('#txtBetTotal').html() + '  ');
  buf.append(CreateBetReplyAmount(sendbetResult));
  buf.append('</div>');
  $('#printDiv').html(buf.toString());
  window.print();
}