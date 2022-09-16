function showDiv(obj, opt, show) {
  switch (opt) {
    case 'setting':
      $('#divStmtYellowNote').html(GetText('lbl_notice'));
      $('#divStmtYellowNote').css('left', ($(obj).offset().left - 250) + 'px');
      break;
    case 'save':
      $('#divStmtYellowNote').html(GetText('alt_save_tip'));
      $('#divStmtYellowNote').css('left', ($(obj).offset().left - 100) + 'px');
      break;
    case 'print':
      $('#divStmtYellowNote').html(GetText('alt_print_tip'));
      $('#divStmtYellowNote').css('left', ($(obj).offset().left - 100) + 'px');
      break;
    default:
      $('#divStmtYellowNote').html('');
      break;
  }
  if (show) {
    $('#divStmtYellowNote').show();
    $('#divStmtYellowNote').css('top', ($(obj).offset().top - 50) + 'px');
  } else
    $('#divStmtYellowNote').hide();
}

function reloadBaseInfo() {
  show60Days = extStatement && (parseInt(GetPara('OnlineStatTimeFrame4SpeedBet')) > 30);
  searchDayRange = extStatement ? parseInt(GetPara('OnlineStatTimeFrame4SpeedBet')) : parseInt(GetPara('OnlineStatTimeFrame'));
  asMaxDateRange = show60Days ? 60 : 31;
  stmtCountPerPage = parseInt(GetPara('OnlineStmtRecPerPage'));
  $('#txtAccRecordHeader').html(GetText('alt_ac_records'));
  $('#linkAccountRecord').html(GetText(show60Days ? 'alt_60days_ac_records' : 'alt_30days_ac_records'));
  $('#linkCurSession').html(GetText('alt_cs_records'));
  $('#linkRecall').html(GetText('alt_tran_records'));
  getServerDateTime();
  stmtMaxPageNo = 1;
  stmtCurPageNo = 0;
}

function reloadAccountRecord() {
  reloadBaseInfo();
  switchStatementNav('AccountRecord');
  $('#divStatementSearchBox').show();
  $('#divStatementYellowHeader').show();
  $('#divStatementTable').show();
  $('#divStmtBottom').hide();
  $('#divStatementTable').css('height', '280px');
  $('#stmtTable').css('height', '240px');

  $('#asToday').html(GetText('alt_today'));
  $('#asFrom').html(GetText('alt_from'));
  $('#asFromDay').html(GetText('alt_day'));
  $('#asFromMonth').html(GetText('alt_month'));
  $('#asFromYear').html(GetText('alt_year'));
  $('#asTo').html(GetText('alt_to'));
  $('#asTo_Day').html(GetText('alt_day'));
  $('#asToMonth').html(GetText('alt_month'));
  $('#asToYear').html(GetText('alt_year'));
  $('#seekLastDay').html(GetText('alt_seek_last_day'));
  $('#seekUnit').html(GetText('alt_seek_unit'));
  $('#stmtConfirmButton').prop('title', GetText('alt_confirm'));
  $('#radioToday').prop('checked', 'true');

  $('#asTxnType').html(GetText('alt_transaction_type'));
  $('#asDisplayType').html(GetText('alt_display_type'));
  $('.boHelpPic').attr("title", GetText('alt_pic_record_help'));
  if (extStatement) {
    $('#lastDayOption').show();
    resetLastDayOptions();
  } else {
    $('#lastDayOption').hide();
    $('#asSelDtRange').html(GetText('alt_tran_range_note').replace('#', GetPara('OnlineStatTimeFrame')));
  }

  $('#statementConfirmButton').title = GetText('alt_confirm');

  resetBetAndTxnOptions(true);
  if (isLogon() != 1 || GetDataStore('account') == '') {
    invalidSessionWarning();
  }

  $('#stmtPageNo').html('');
  $('#stmtAccNo').html(GetText('alt_account_no') + GetDataStore('account'));
  $('#stmtAccBal').html(GetText('alt_balance') + '<strong>' + FormatCurrency(GetDataStore('balance')) + '</strong>');
  $('#stmtMsg').html('');
  $('#stmtHeader').html('');
  $('#stmtTable').html('');
  $('#stmtTable').hide();

  $('#stmtClose').prop('title', GetText('alt_close'));
  $('#stmtNext').prop('title', GetText('alt_next_page'));
  $('#stmtNext').prop('class', 'stmtNextDimButton');
  $('#stmtPrev').prop('title', GetText('alt_previous_page'));
  $('#stmtPrev').prop('class', 'stmtPrevDimButton');
  $('#stmtExport').prop('title', GetText('alt_save'));
  $('#stmtPrint').prop('title', GetText('alt_print'));
  $('#stmtNewSearch').prop('title', GetText('alt_search'));
}

function getServerDateTime() {
  var dt = serverDateObj;
  stmtToday = serverDateObj;
  var y = dt.getFullYear();
  var m = dt.getMonth();
  var d = dt.getDate();
  var h = dt.getHours();
  var mi = dt.getMinutes();

  var dateStr = ((d > 9) ? d : "0" + d) + "/" +
    (((m + 1) > 9) ? (m + 1) : "0" + (m + 1)) + "/" +
    y + " " +
    ((h > 9) ? h : "0" + h) + ":" +
    ((mi > 9) ? mi : "0" + mi);
  $('#stmtTime').html(GetText('alt_time_now') + dateStr);
  prepareDayRange(dt);
  resetMonthEle(dt, 'From', false);
  resetMonthEle(dt, 'To', false);
}

function prepareDayRange(dt) {
  var yyyyArr = [];
  dateRangeArr = [];

  for (var i = 0; i < asMaxDateRange; i++) {
    var tmpDt = new Date(dt.getTime() - (i * ONEDAY));
    var y = tmpDt.getFullYear();
    var m = tmpDt.getMonth();
    var d = tmpDt.getDate();
    dateRangeArr.push(y + ((m + 1 > 9) ? '' + (m + 1) : '0' + (m + 1)) + ((d > 9) ? '' + d : '0' + d));

    if (yyyyArr.length == 0 || y != yyyyArr[yyyyArr.length - 1])
      yyyyArr.push(y);
  }
  dateRangeArr.reverse();
  yyyyArr.reverse();

  var old = "";
  var fY = $('#FromYear');
  var tY = $('#ToYear');
  fY.empty();
  tY.empty();
  for (var i = 0; i < yyyyArr.length; i++) {
    fY.append($('<option></option>').val(yyyyArr[i]).html(yyyyArr[i]));
    tY.append($('<option></option>').val(yyyyArr[i]).html(yyyyArr[i]));
  }

  $('#FromYear').val(dt.getFullYear());
  $('#ToYear').val(dt.getFullYear());
}

function resetMonthEle(dt, objPrefix, isDefault) {
  var obj = $('#' + objPrefix + 'Month');
  var yyyy = isDefault ? parseInt($('#' + objPrefix + 'Year').val()) : dt.getFullYear();
  var lSel = -1;

  obj.empty();
  var idx = 0;
  for (var i = 0; i < dateRangeArr.length; i++) {
    if (parseInt(dateRangeArr[i].substring(0, 4)) == yyyy) {
      var tmp = parseInt(dateRangeArr[i].substring(4, 6));
      if (lSel != tmp) {
        obj.append($('<option></option>').val(tmp).html(tmp));
        lSel = tmp;
      }
    }
  }
  if (!isDefault)
    obj.val(lSel);

  resetDayEle(dt, objPrefix, isDefault);
}

function resetDayEle(dt, objPrefix, isDefault) {
  var obj = $('#' + objPrefix + 'Day');
  var yyyy = isDefault ? parseInt($('#' + objPrefix + 'Year').val()) : dt.getFullYear();
  var mm = isDefault ? parseInt($('#' + objPrefix + 'Month').val()) : dt.getMonth() + 1;
  var lSel = -1;

  obj.empty();
  var idx = 0;
  for (var i = 0; i < dateRangeArr.length; i++) {
    if (parseInt(dateRangeArr[i].substring(0, 4)) == yyyy && parseInt(dateRangeArr[i].substring(4, 6)) == mm) {
      var tmp = parseInt(dateRangeArr[i].substring(6, 8));
      if (lSel != tmp) {
        obj.append($('<option></option>').val(tmp).html(tmp));
        lSel = tmp;
      }
    }
  }
  if (!isDefault)
    obj.val(lSel);
}

function resetDate(objPrefix, para) {
  $('#radioDateRange').prop('checked', 'true');
  switch (para) {
    case 2:
      resetMonthEle(null, objPrefix, true);
      break;
    case 1:
      resetDayEle(null, objPrefix, true);
      break;
  }
}

function resetBetAndTxnOptions(useDefault) {
  var bobj = $('#betType');
  var tobj = $('#txnType');
  var bVal = useDefault ? '3' : bobj.val();
  var tVal = useDefault ? '1' : tobj.val();

  bobj.empty();
  bobj.append($('<option></option>').val('0').html(GetText('alt_transaction_type_horse')));
  bobj.append($('<option></option>').val('1').html(GetText('alt_transaction_type_sb')));
  bobj.append($('<option></option>').val('2').html(GetText('alt_transaction_type_mk6')));
  if (tVal == '1')
    bobj.append($('<option></option>').val('4').html(GetText('alt_transaction_type_others')));
  bobj.append($('<option></option>').val('3').html(GetText('alt_transaction_type_all')));
  if (tVal == '1' && GetPara('IsEnabledDDA') == '1')
    bobj.append($('<option></option>').val('5').html(GetText('alt_transaction_type_autopay')));
  bobj.val(bVal);

  tobj.empty();
  if (bVal != '4' && bVal != '5')
    tobj.append($('<option></option>').val('0').html(GetText('alt_display_type_dividend')));
  tobj.append($('<option></option>').val('1').html(GetText('alt_display_type_all')));
  tobj.val(tVal);
}

function resetLastDayOptions() {
  var obj = $('#last_days');
  obj.empty();
  obj.append($('<option></option>').val('8').html('8'));
  obj.append($('<option></option>').val('15').html('15'));
  obj.append($('<option></option>').val('30').html('30'));
  if (show60Days)
    obj.append($('<option></option>').val('60').html('60'));
}

function OnClickStatementSearch() {
  if (isProcessing)
    return;

  isProcessing = true;

  stmtMaxPageNo = 1;

  var dd1, mm1, yyyy1, dd2, mm2, yyyy2;
  var dateType = $('input[name=dateType]:checked').val();

  if (dateType == '0') {
    dd1 = dd2 = stmtToday.getDate();
    mm1 = mm2 = stmtToday.getMonth() + 1;
    yyyy1 = yyyy2 = stmtToday.getFullYear();
  } else if (dateType == '1') {
    dd1 = parseInt($('#FromDay').val());
    mm1 = parseInt($('#FromMonth').val());
    yyyy1 = parseInt($('#FromYear').val());

    dd2 = parseInt($('#ToDay').val());
    mm2 = parseInt($('#ToMonth').val());
    yyyy2 = parseInt($('#ToYear').val());

    var tmpDate1 = new Date(yyyy1, mm1 - 1, dd1);
    var tmpDate2 = new Date(yyyy2, mm2 - 1, dd2);

    var compare = (tmpDate2.getTime() - tmpDate1.getTime()) / ONEDAY;
    if (compare + 1 > searchDayRange || compare < 0) {
      alert(GetText('warning_day').replace(/#/g, searchDayRange));
      isProcessing = false;
      return;
    }
  } else {
    var lastdays = parseInt($('#last_days').val());
    dd2 = stmtToday.getDate();
    mm2 = stmtToday.getMonth() + 1;
    yyyy2 = stmtToday.getFullYear();
    var tmpDt = new Date(stmtToday.getTime() - (lastdays * ONEDAY));
    dd1 = tmpDt.getDate();
    mm1 = tmpDt.getMonth() + 1;
    yyyy1 = tmpDt.getFullYear();
  }

  // append leading zero
  dd1 = dd1 < 10 ? '0' + dd1 : dd1;
  dd2 = dd2 < 10 ? '0' + dd2 : dd2;
  mm1 = mm1 < 10 ? '0' + mm1 : mm1;
  mm2 = mm2 < 10 ? '0' + mm2 : mm2;

  SetDataStore('stmt_startDate', dd1 + '/' + mm1 + '/' + yyyy1);
  SetDataStore('stmt_curDate', dd1 + '/' + mm1 + '/' + yyyy1);
  SetDataStore('stmt_endDate', dd2 + '/' + mm2 + '/' + yyyy2);
  SetDataStore('stmt_lastStatRequest', '');
  SetDataStore('stmt_inSeg', '@@@@@@@@@');
  SetDataStore('stmt_txnType', $('#txnType').val());
  SetDataStore('stmt_betType', $('#betType').val());

  curAction = ACTION_SEARCH;
  SetDataStore('stored_stmt_dtls', '');

  // please wait message
  $('#stmtMsg').html(GetText('alt_please_wait'));

  SetDataStore('reqCount', GetPara('OnlineStmtRecPerPage'));

  ResetIdleTimer(false);

  var sendSuccess;
  if ($('#betType').val() == '5') {
    sendSuccess = enquireDDARecordsRequest(ProcessGetDDARecordsResult, ProcessGetDDARecordsReplyTimeout);
  } else {
    sendSuccess = sendAccountRecordsRequest(ProcessStatmentResult, ProcessStatmentTimeout);
  }

  // send statement confirm WA tagging 
  //WATrackerTrackClickEvent('stmtConfirm');

}

function stmtNextPage() {
  if (showNextPage && !isProcessing) {
    isProcessing = true;

    var sendSuccess = true;
    var recordCount = getTotalRecordCount();
    var endIdx = (stmtCurPageNo + 1) * stmtCountPerPage;
    var unreadRecordCount = recordCount - (stmtCurPageNo * stmtCountPerPage);
    if (GetDataStore('isLastPage') == 'True' || unreadRecordCount >= stmtCountPerPage) {
      curAction = ACTION_NEXT;
      displayRecords();

    } else if (unreadRecordCount >= 0) {
      var preReqCount = GetDataStore('reqCount');
      SetDataStore('reqCount', stmtCountPerPage - unreadRecordCount);
      curAction = ACTION_NEXT;

      ResetIdleTimer(false);
      if ($('#betType').val() == '5') {
        sendSuccess = sendGetDDARecordsRequest();
      } else {
        sendSuccess = sendAccountRecordsRequest(ProcessStatmentResult, ProcessStatmentTimeout);
      }
    }

    // send statement next WA tagging  
    //WATrackerTrackClickEvent('stmtNext');

  }
}

function stmtPrevPage(curPage) {
  if (stmtCurPageNo > 1 && !isProcessing) {
    isProcessing = true;
    curAction = ACTION_PREV;
    displayRecords();
  }
}

function ProcessStatmentResult(msg) {
  if (msg.stmt_status != '0') {
    if (msg.stmt_status == '-3') {
      // do nothing
    } else if (msg.stmt_status == '-2') {
      processSSOExtendResult(msg); // Suppot SSO
    }
    ProcessStatementError(msg);
    isProcessing = false;
    return;
  }

  var dtls = msg.stmt_dtls;
  var stored_dtls = GetDataStore('stored_stmt_dtls');
  SetDataStore('stored_stmt_dtls', stored_dtls + dtls);

  SetDataStore('stmt_lastStatRequest', msg.stmt_lastStatRequest);
  SetDataStore('stmt_inSeg', msg.stmt_inSeg);

  SetDataStore('stmt_curDate', msg.stmt_curDate);
  SetDataStore('stmt_endDate', msg.stmt_endDate);

  SetDataStore('isLastPage', msg.isLastPage);

  displayRecords(msg);

  isProcessing = false;
  document.body.style.cursor = 'auto';
}

function ProcessGetDDARecordsResult(msg) {

  if (msg.dda_status != '0') {
    if (msg.stmt_status == '-3') {
      // do nothing
    } else if (msg.dda_status == '-2') {
      processSSOExtendResult(msg); // Suppot SSO
    }
    ProcessStatementError(msg);
    return;
  }

  var dtls = msg.dda_dtls;
  var stored_dtls = GetDataStore('stored_stmt_dtls');
  SetDataStore('stored_stmt_dtls', stored_dtls + dtls);
  SetDataStore('stmt_lastStatRequest', msg.stmt_lastStatRequest);
  SetDataStore('stmt_inSeg', msg.stmt_inSeg);

  SetDataStore('stmt_curDate', msg.stmt_curDate);
  SetDataStore('stmt_endDate', msg.stmt_endDate);
  SetDataStore('isLastPage', msg.isLastPage);

  displayRecords(msg);

  isProcessing = false;
  document.body.style.cursor = 'auto';
}

function ProcessStatementError(msg) {
  $('#stmtMsg').html(msg.stmt_error);
  isProcessing = false;
  document.body.style.cursor = 'auto';
}

function ProcessStatmentTimeout() {
  $('stmtMsg').html(GetText('error_msg_system_busy'));
  $('stmtHeader').html('');
  $('stmtTable').html('');
  isProcessing = false;
  document.body.style.cursor = 'auto';
}

function ProcessGetDDARecordsReplyTimeout() {
  $('stmtMsg').html(GetText('error_msg_system_busy'));
  $('stmtHeader').html('');
  $('stmtTable').html('');
  isProcessing = false;
  document.body.style.cursor = 'auto';
}

function displayRecords(msg) {
  switch (curAction) {
    case ACTION_SEARCH:
      stmtCurPageNo = 1;
      break;
    case ACTION_NEXT:
      stmtCurPageNo++;
      break;
    case ACTION_PREV:
      stmtCurPageNo--;
      break;
    case ACTION_SAVE:
      break;
    case ACTION_EXPORT:
      break;
  }

  stmtMaxPageNo = (stmtMaxPageNo < stmtCurPageNo) ? stmtCurPageNo : stmtMaxPageNo;

  var lastPage = -1;
  isLastPage = GetDataStore('isLastPage') == 'True';
  if (isLastPage)
    lastPage = stmtMaxPageNo;

  var endIdx = stmtCurPageNo * stmtCountPerPage;
  var totalCnt = getTotalRecordCount();

  showNextPage = (!isLastPage) || (endIdx < totalCnt);
  $('#stmtNext').prop('class', showNextPage ? 'stmtNextButton' : 'stmtNextDimButton');
  $('#stmtPrev').prop('class', (stmtCurPageNo > 1) ? 'stmtPrevButton' : 'stmtPrevDimButton');

  $('#stmtMsg').html('');
  $('#stmtHeader').html(genTableHeader());
  $('#stmtTable').show();
  $('#stmtTable').html(genTableRecords(stmtCurPageNo, stmtCurPageNo, true));
  $('#divStatementTable').css('height', '376px');
  $('#stmtTable').css('height', '310px');
  $('#stmtTable').scrollTop(0);
  $('#divStatementSearchBox').hide();
  $('#divStmtBottom').show();
  $('#stmtPageNo').html(GetText('alt_page').replace('#', stmtCurPageNo));
  isProcessing = false;

  document.body.style.cursor = 'auto';
}

function getTotalRecordCount() {
  var dtls = GetDataStore('stored_stmt_dtls');
  var dtlsArr = dtls.split('@@@');
  return dtlsArr.length - 1;
}

function genTableHeader() {
  var isAutopay = $('#betType').val() == '5';
  var buf = new StringBuffer();
  buf.append('<div class="stmtTableContentHeader">');
  if (!isAutopay) {
    buf.append('<div class="stmtTableContentHead1">').append(GetText('alt_acctstmt_ref_no')).append('</div>');
    buf.append('<div class="stmtTableContentHead2">').append(GetText('alt_acctstmt_date_time')).append('</div>');
    buf.append('<div class="stmtTableContentHead3">').append(GetText('alt_acctstmt_race_day')).append('</div>');
    buf.append('<div class="stmtTableContentHead4">').append(GetText('alt_acctstmt_bet_type')).append('</div>');
    buf.append('<div class="stmtTableContentHead5">').append(GetText('alt_acctstmt_transaction_details')).append('</div>');
    if (statementConfig.enableEwalletIcon) {
      buf.append('<div class="stmtTableContentHead8">').append(GetText('alt_acctstmt_receipt')).append('</div>');
    }
    buf.append('<div class="stmtTableContentHead6">').append(GetText('alt_acctstmt_debit')).append('</div>');
    buf.append('<div class="stmtTableContentHead7">').append(GetText('alt_acctstmt_credit')).append('</div>');
  } else {
    //autopay
    buf.append('<div class="stmtTableContentHeadA">').append(GetText('alt_acctstmt_date_time')).append('</div>');
    buf.append('<div class="stmtTableContentHeadB">').append(GetText('alt_acctstmt_autopay_records')).append('</div>');
    buf.append('<div class="stmtTableContentHeadC">').append(GetText('alt_acctstmt_amount')).append('</div>');
  }
  buf.append('</div>');
  return buf.toString();
}

function genTableRecords(startPageNo, endPageNo, tableTag) {
  var buf = new StringBuffer();
  var dtls = GetDataStore('stored_stmt_dtls');
  var dtlsArr = dtls.split('@@@');
  var startIdx = ((startPageNo - 1) * stmtCountPerPage) + 1;
  var endIdx = endPageNo * stmtCountPerPage;

  for (var i = startIdx; i <= endIdx; i++) {
    if (dtlsArr.length <= i)
      break;

    buf.append(genTableRecord(dtlsArr[i], i));
  }
  return buf.toString();
}

function genTableRecord(rec, i) {
  if ($('#betType').val() == '5') {
    return genTableRecordAutopay(rec, i);
  } else {
    return genTableRecordNorm(rec, i);
  }
}

function genTableRecordAutopay(rec, i) {
  var dtlsArr = rec.split(';;;');
  if (dtlsArr.length < 6)
    return '';

  var txnType = dtlsArr[0];
  var txnDate = dtlsArr[1];
  var txnTime = dtlsArr[2];
  var txnAmount = dtlsArr[3];
  var refNo = dtlsArr[4];
  var txnRejMsg = dtlsArr[5];


  var buf = new StringBuffer();

  var fmtTxnAmt = FormatCurrency(txnAmount);
  var msg = formatAutopayMsg(txnType, refNo, fmtTxnAmt, txnRejMsg);
  var dateTime = '<span style="white-space:nowrap">' + txnDate + '</sapn><br>' + txnTime;

  buf.append('<div class="betslipRow">');
  buf.append('<div class="').append(stmtStyle[i % 2]).append(' stmtTableContentCellA">').append(dateTime).append('</div>');
  buf.append('<div class="').append(stmtStyle[i % 2]).append(' stmtTableContentCellB">').append(msg).append('</div>');
  buf.append(writeTD(i, formatAutopayAmtCol(txnType, txnAmount)));
  buf.append('</div>');

  return buf.toString();
}

function formatAutopayMsg(txnType, refNo, txnAmount, txnRejMsg) {
  var msgTemplate = "";
  if (txnType == "Rejected")
    msgTemplate = "acctstmt_autopay_reject_msg";
  else if (txnType == "Request")
    msgTemplate = "acctstmt_autopay_request_msg";
  else if (txnType == "Success")
    msgTemplate = "acctstmt_autopay_accept_msg";
  else if (txnType == "Pending")
    msgTemplate = "acctstmt_autopay_pending_msg";

  if (msgTemplate != "") {
    return GetText(msgTemplate).replace("##AMOUNT##", txnAmount)
      .replace("##REF_NO##", refNo).replace("##REJ_CODE##", txnRejMsg);
  } else {
    return "";
  }
}

function formatAutopayAmtCol(txnType, txnAmt) {
  var fmtAmt = "0"; //use 0 for non-success txn
  if (txnType == "Success") {
    fmtAmt = txnAmt;
  }
  return FormatCurrency(fmtAmt);
}

function genTableRecordNorm(rec, i) {
  var dtlsArr = rec.split(';;;');
  if (dtlsArr.length < 9)
    return '';

  var txnNo = dtlsArr[0];
  var txnType = dtlsArr[1];
  var txnFlag = dtlsArr[2];
  var txnDate = dtlsArr[3];
  var txnTime = dtlsArr[4];
  var debit = dtlsArr[5];
  var credit = dtlsArr[6];
  var betType = dtlsArr[7];
  var raceDay = dtlsArr[8];
  var txnDtls = dtlsArr[9];
  var isEwallet = dtlsArr[10];

  var buf = new StringBuffer();

  if (txnNo == '')
    return '';

  var str_maxpay = '';
  if (txnDtls.indexOf('MAX PAY') > 0) {
    str_maxpay = txnDtls.substring(txnDtls.indexOf('MAX PAY'));
    str_maxpay = str_maxpay.substring(str_maxpay.indexOf('$'));
    txnDtls = txnDtls.substring(0, txnDtls.indexOf('MAX PAY') - 1);
  }

  var dateTime = '<span style="white-space:nowrap">' + txnDate + '</sapn><br>' + txnTime;

  buf.append('<div class="betslipRow">');
  buf.append('<div class="stmtTableContentCell1 ').append(stmtStyle[i % 2]).append('">').append(txnNo).append('</div>');
  buf.append('<div class="stmtTableContentCell2 ').append(stmtStyle[i % 2]).append('">').append(dateTime).append('</div>');
  buf.append('<div class="stmtTableContentCell3 ').append(stmtStyle[i % 2]).append('">').append(raceDay).append('</div>');
  buf.append('<div class="stmtTableContentCell4 ').append(stmtStyle[i % 2]).append('">').append(betType).append('</div>');
  buf.append('<div class="stmtTableContentCell5 ').append(stmtStyle[i % 2]).append('">').append(txnDtls);

  if (str_maxpay != '') {
    buf.append(GetText('max_payout'));
    buf.append(str_maxpay);
  }

  if (txnFlag == '1') {
    buf.append(GetText('alt_transaction_cancel'));
  }
  buf.append('</div>');

  if (statementConfig.enableEwalletIcon) {
    if (isEwallet == '1') {
      var escRec = rec.replace(new RegExp("'", 'g'), "\\'");
      var escRec1 = escRec.replace(new RegExp(/\\/g), "\\\\\\\\");

      if (txnFlag == "1") {
        escRec1 = escRec1.slice(0, escRec1.lastIndexOf(";;;")) + "<br>" + GetText("alt_cancel") + escRec1.slice(escRec1.lastIndexOf(";;;"));
      }

      buf.append('<div class="stmtTableContentCell6 ').append(stmtStyle[i % 2]).append('">').append('<a href="javascript:OpenReceipt(\'' + escRec1 + '\');"><img src="/info/include/images/btn_receipt.gif"/></a>').append('</div>');
    } else {
      buf.append('<div class="stmtTableContentCell6 ').append(stmtStyle[i % 2]).append('">').append('</div>');
    }
  }

  buf.append(formatDebitTD(i, txnFlag, debit));
  buf.append(formatCreditTD(i, txnType, txnFlag, debit, credit));

  buf.append('</div>');

  return buf.toString();
}

function formatDebitTD(idx, txnFlag, debit, isTxt) {
  var msg = '';
  if (txnFlag == '2')
    msg = get_display_lang('alt_overflow');
  else if (txnFlag == '4')
    msg = get_display_lang('alt_unsuccessful');
  else if (debit == '$')
    msg = isTxt ? ' ' : '&nbsp;';

  if (msg != '' && (debit == '$' || debit == '$0.00' || debit == '$0'))
    return (isTxt ? msg : writeTD(idx, msg, ''));
  else {
    if (debit.charAt(debit.length - 1) == '-')
      debit = '-' + debit.substring(0, debit.length - 1);

    debit = FormatCurrency(debit);
    return (isTxt ? debit : writeTD(idx, debit, ''));
  }
}

function formatCreditTD(idx, txnType, txnFlag, debit, credit, isTxt) {
  var msg = '';
  if (txnFlag == '2')
    msg = GetText('alt_overflow');
  else if (txnFlag == '4')
    msg = GetText('alt_unsuccessful');
  else if (credit == '$')
    msg = isTxt ? ' ' : '&nbsp;';

  if (msg != '' && (credit == '$' || credit == '$0.00' || credit == '$0'))
    return (isTxt ? msg : writeTD(idx, msg, '#000000'));
  else {
    if (credit.charAt(credit.length - 1) == '-')
      credit = '-' + credit.substring(0, credit.length - 1);

    credit = FormatCurrency(credit);

    if (txnType == 'A8')
      return (isTxt ? credit : writeTD(idx, credit, '#008800'));
    else if (debit != '$' && credit != '$')
      return (isTxt ? credit : writeTD(idx, credit, '#008800'));
    else
      return (isTxt ? credit : writeTD(idx, credit, ''));
  }
}

function writeTD(idx, msg, color) {
  var buf = new StringBuffer();
  buf.append('<div class="stmtTableContentAmount ').append(stmtStyle[idx % 2]).append('"');
  if (color != '')
    buf.append('style="color:').append(color).append(';"');
  buf.append('>').append(msg).append('</div>');
  return buf.toString();
}

function openSearchBox() {
  $('#divStatementSearchBox').show();
  $('#divStatementTable').css('height', '280px');
  $('#stmtTable').css('height', '216px');
}

function onclickStmtExport(obj) {
  showDiv(obj, '', false);
  $('#stmtExportMenu').css('top', ($(obj).position().top - 42) + 'px');
  $('#stmtExportMenu').css('left', $(obj).position().left + 'px');
  $('#stmtExportMenu').slideToggle({
    direction: 'up'
  }, 400);
}

function displayExportWarningMsg() {
  alert(GetText('export_not_support'));
}

var acctstmtWorkerFilePath = '/info/include/js/bs_acctstmt_worker.js' + cacheVersion;
var acctstmtExportFuncPath = '/info/include/js/bs_stmt_export_func.js' + cacheVersion;
var acctMomentLibPath = '/info/include/js/moment.min.js' + cacheVersion;

function fileExport(export_type) {
  sendExtendSessionRequest();
  if (!isFileAPISupported() || !isWindowURLSupported()) {
    displayExportWarningMsg();
    return;
  }

  var extension = "html";
  if (export_type == "txt") {
    extension = "txt";
  }

  var fileName = "acctstmt." + extension;

  var options = {
    lang: curLang,
    stmtCurPageNo: stmtCurPageNo,
    stmtMaxPageNo: stmtMaxPageNo,
    stmtCountPerPage: stmtCountPerPage,
    export_type: export_type,
    account: GetDataStore('account'),
    stmt_startDate: GetDataStore('stmt_startDate'),
    stmt_endDate: GetDataStore('stmt_endDate'),
    is_last_page: GetDataStore('isLastPage'),
    session: {
      statement: GetDataStore("stored_stmt_dtls"),
      balance: GetDataStore("balance"),
      betType: GetDataStore("stmt_betType")
    }
  };

  var acctstmt_worker = new Worker(acctstmtWorkerFilePath);
  var data = {
    scripts: [
      acctstmtExportFuncPath,
      acctMomentLibPath
    ],
    options: options
  };

  acctstmt_worker.addEventListener('message', function (e) {
    var blobObj = e.data;
    if (!blobObj) {
      return;
    }
    var wURL = window.URL || window.webkitURL;
    var blobURL = wURL.createObjectURL(blobObj);
    saveAs(blobObj, fileName);
    acctstmt_worker.terminate();
  });
  acctstmt_worker.postMessage(data);
}

function onclickStmtPrint() {
  $('#printDiv').html('');
  var buf = new StringBuffer();
  buf.append(genPrintHeaderTxt());
  buf.append(genTableHeader());
  if (stmtMaxPageNo == stmtCurPageNo && GetDataStore('isLastPage') == 'True')
    buf.append(genTableRecords(1, stmtMaxPageNo, false));
  else
    buf.append(genTableRecords(stmtCurPageNo, stmtCurPageNo, false));
  buf.append(genPrintFooter());

  showDiv(null, '', false);
  $('#printDiv').html(buf.toString());
  window.print();
}

function genPrintHeaderTxt(isDL) {
  var buf = new StringBuffer();
  buf.append(GetText('alt_ac_records'));
  if (isDL) {
    buf.append(' - ')
      .append(GetText('alt_download'))
      .append('\r\n');
  }
  buf.append(GetText('alt_from'))
    .append(' ')
    .append(GetDataStore('stmt_startDate'))
    .append(' ')
    .append(GetText('alt_to'))
    .append(' ')
    .append(GetDataStore('stmt_endDate'))
    .append('\r\n')
    .append(GetText('alt_account_no'))
    .append(' ')
    .append(GetDataStore('account'))
    .append('\r\n')
    .append(GetText('alt_balance'))
    .append(' ')
    .append(FormatCurrency(GetDataStore('balance')))
    .append('\r\n\r\n');
  return buf.toString();
}

function genPrintFooter() {
  var buf = new StringBuffer();
  buf.append('<div class="content" style="text-align:center">')
    .append(GetText('alt_end'))
    .append('</div>');
  return buf.toString();
}

///
/// recall
///
function reloadRecall() {
  if (!isProcessing) {
    reloadBaseInfo();
    switchStatementNav('Recall');

    $('#recallPageNo').html('');
    $('#recallMsg').html(GetText('alt_please_wait'));
    $('#recallHeader').html('');
    $('#recallTable').html('');
    $('#recallTable').hide();

    $('#recallClose').prop('title', GetText('alt_close'));
    $('#recallNext').prop('title', GetText('alt_next_page'));
    $('#recallNext').prop('class', 'stmtNextDimButton');
    $('#recallPrev').prop('title', GetText('alt_previous_page'));
    $('#recallPrev').prop('class', 'stmtPrevDimButton');

    $('#divRecallYellowHeader').show();
    $('#divRecallTable').show();

    SetDataStore('recall_lastTxnNo', '0000');
    isProcessing = true;
    sendRecallRequest(ProcessRecallResult, ProcessRecallTimeout);
  }
}

function ProcessRecallResult(msg) {
  if (msg.recall_status != '0') {
    if (msg.recall_status == '-2') {
      processSSOExtendResult(msg);
    }
    ProcessRecallError(msg);
    return;
  } else {
    $('#recallMsg').html('');
  }

  stmtCurPageNo++;
  var dtls = msg.recall_dtls;
  SetDataStore('stored_recall_dtls_' + stmtCurPageNo, dtls);
  var lastTxnNo = msg.recall_lastTxnNo == undefined ? '0000' : msg.recall_lastTxnNo;
  SetDataStore('recall_lastTxnNo', lastTxnNo);
  displayRecallRecords();

  isProcessing = false;
  document.body.style.cursor = 'auto';
}

function ProcessRecallTimeout() {
  $('#recallMsg').html(GetDataStore('error_msg_system_busy'));
  $('#recallTable').hide();
  isProcessing = false;
  document.body.style.cursor = 'auto';
}

function ProcessRecallError(msg) {
  $('#recallMsg').html(msg.recall_error);
  $('#recallTable').hide();
  isProcessing = false;
  document.body.style.cursor = 'auto';
}

function displayRecallRecords() {
  stmtMaxPageNo = (stmtMaxPageNo < stmtCurPageNo) ? stmtCurPageNo : stmtMaxPageNo;
  $('#recallHeader').html(printRecallHeader());
  $('#recallTable').html(printRecallTable(stmtCurPageNo, stmtCurPageNo));
  $('#recallTable').show();
  $('#recallTable').scrollTop(0);
  $('#divRecallBottom').show();
  $('#recallPageNo').html(GetText('alt_page').replace('#', stmtCurPageNo));
  isProcessing = false;
  initRecallButton();
}

function initRecallButton() {
  if (stmtCurPageNo == 1)
    $('#recallPrev').prop('class', 'stmtPrevDimButton');
  else
    $('#recallPrev').prop('class', 'stmtPrevButton');

  showNextPage = GetDataStore('recall_lastTxnNo') != '0000';
  if (showNextPage || (stmtCurPageNo < stmtMaxPageNo))
    $('#recallNext').prop('class', 'stmtNextButton');
  else
    $('#recallNext').prop('class', 'stmtNextDimButton');
}

function printRecallHeader() {
  var buf = new StringBuffer();
  buf.append('<div class="stmtTableContentHeader">');
  buf.append('<div class="recallTableContentHead1">').append(GetText('alt_recall_ref_no')).append('</div>');
  buf.append('<div class="recallTableContentHead2">').append(GetText('alt_recall_bet_type')).append('</div>');
  buf.append('<div class="recallTableContentHead3">').append(GetText('alt_recall_transaction_details')).append('</div>');
  buf.append('<div class="recallTableContentHead4">').append(GetText('alt_recall_amount')).append('</div>');
  buf.append('</div>');
  return buf.toString();
}

function generateRecallRow(s) {
  if (s == null || s == '')
    return '';

  var styleIdx = 0;
  var buf = new StringBuffer();
  s = s.replace('/SB /g', 'FB ');

  var blines = s.split(';;;');
  for (var i = 0; i < blines.length; i++) {
    var details = blines[i].split('###');
    if (details.length != 5)
      continue;

    var txnNo = details[0];
    var betType = details[1];
    var betDetails = details[2];
    var maxpay = details[3];
    var suffix = '';
    if (maxpay != null && maxpay != '')
      maxpay = '<br>' + maxpay.replace('MAX PAY', GetText('max_payout'));
    var amount = details[4];
    if (amount.indexOf('CANCELLED') >= 0) {
      if (betDetails.lastIndexOf("&nbsp;") >= 0) {
        betDetails = betDetails.substr(0, betDetails.lastIndexOf("&nbsp;"));
      }
      suffix = '<br>' + GetText('alt_cancel');
      amount = GetText("CANCELLED");
    } else if (amount.substring(0, 1) == "(") {
      betDetails = betDetails + " " + amount;
      amount = "";
    } else if (amount.indexOf("%") > 0) {
      betDetails = betDetails + " " + amount;
      amount = "";
    }
    betDetails = betDetails.replace(' | ', '<br>\\<br>') + maxpay + suffix;

    buf.append('<div class="betslipRow">');
    buf.append('<div class="recallTableContentCell1 ').append(stmtStyle[styleIdx % 2]).append('">')
      .append(txnNo).append('</div>');
    buf.append('<div class="recallTableContentCell2 ').append(stmtStyle[styleIdx % 2]).append('">');
    buf.append(betType).append('</div>');
    buf.append('<div class="recallTableContentCell3 ').append(stmtStyle[styleIdx % 2]).append('">')
      .append(betDetails).append('</div>');
    buf.append('<div class="recallTableContentCell4 ').append(stmtStyle[styleIdx % 2]).append('">')
      .append(FormatCurrency(amount)).append('</div>');
    buf.append('</div>');

    styleIdx++;
  }
  return buf.toString();
}

function printRecallTable(startIdx, endIdx) {
  var buf = new StringBuffer();
  for (var i = startIdx; i <= endIdx; i++) {
    var reply = GetDataStore('stored_recall_dtls_' + i);
    buf.append(generateRecallRow(reply));
  }
  return buf.toString();
}

function recallPrevPage() {
  if (stmtCurPageNo > 1) {
    stmtCurPageNo--;
    displayRecallRecords();
  }
}

function recallNextPage() {
  if (stmtCurPageNo + 1 <= stmtMaxPageNo) {
    stmtCurPageNo++;
    displayRecallRecords();
  } else if (showNextPage && !isProcessing) {
    isProcessing = true;
    sendRecallRequest(ProcessRecallResult, ProcessRecallTimeout);
  }
}

function printAcctStmtSaveHeader(type) {
  var buf = new StringBuffer();
  buf.append('<div style="border-bottom:1px solid #CCCCCC"><div style="float:left">');
  if (type == 'recall')
    buf.append(GetText('alt_tran_records'));
  else if (type == 'log')
    buf.append(GetText('alt_cs_records'));
  buf.append('</div><div style="float:right">');
  buf.append($('#stmtTime').html())
    .append(' ')
    .append(GetText('alt_account_no'))
    .append(' ').append(GetDataStore('account'))
    .append(' ')
    .append(GetText('alt_balance'))
    .append(' ').append(FormatCurrency(GetDataStore('balance')))
    .append('</div>');
  buf.append('<div style="clear:both"></div></div>');
  return buf.toString();
}

function onclickRecallPrint() {
  var startPg = stmtCurPageNo;
  var endPg = stmtCurPageNo;
  if (!showNextPage) {
    startPg = 1;
    endPg = stmtMaxPageNo;
  }
  $('#printDiv').html('');
  var buf = new StringBuffer();
  buf.append(printAcctStmtSaveHeader('recall'));
  buf.append(printRecallHeader());
  buf.append(printRecallTable(startPg, endPg));

  showDiv(null, '', false);
  $('#printDiv').html(buf.toString());
  window.print();
}

// current session records
function reloadCurSession() {
  if (!isProcessing) {
    isProcessing = true;
    //check if need to load PPS first
    if (GetDataStore('enablePPSEnquiry') == '1') {
      $.when(sendPPSEnquiryRequest()).done(function () {
        //finish the rest
        completeReloadCurSession();
      });
    } else {
      //finish the rest
      completeReloadCurSession();
    }
  }
}

function completeReloadCurSession() {
  reloadBaseInfo();
  switchStatementNav('CurSession');

  $('#divCurSession').show();
  $('#divCurSessionTable').show();
  $('#divCurSessionYellowHeader').show();
  $('#divCurSessionBottom').show();
  $('#curSessionYellowBar').show();
  $('#curSessionNote1').html(GetText('alt_cs_records_text1'));
  $('#curSessionAccBal').html(GetText('alt_balance') + '<strong>' + FormatCurrency(GetDataStore('balance')) + '</strong>');

  $('#curSessionMsg').html('');
  $('#curSessionHeader').html(printLogHeader());
  $('#curSessionTable').html(printLogTable());
  document.body.style.cursor = 'auto';
  isProcessing = false;
}

function sendPPSEnquiryRequest() {
  return enquirePPSRequest(ProcessPPSEnquireStatusResult, ProcessPPSEnquireStatusResult);
}

function ProcessPPSEnquireStatusResult(msg) {
  var result = msg.PPSEnquireResult.split(';');
  var procRefNo = '';
  var needEnq = '0';

  for (var i = 1; i < result.length; i++) {
    var tmp = result[i].split('=');
    var refNo = tmp[0];
    // only update existing refNo
    if (checkIfRefNoExists(refNo)) {

      var status = tmp[1];
      var txnNo = tmp[2];
      var resCode = tmp[3];
      var amount = tmp[4];
      var rejectMsg = tmp[5];

      var dtls = get_display_lang('lbl_pps_deposit').replace('###DIGITAL_ORDER###', refNo);
      var statusStr = "UNKNOWN";

      var msg = '';
      if (status != "0") {
        if (status == '611' || status == '615') {
          statusStr = "PROCESSING";
          procRefNo += ',' + refNo;
          needEnq = '1';
        } else if (status == '901' || status == '603' || status == '604' || status == '499' || status == '610' || status == '612' || status == '613') {
          statusStr = 'UNKNOWN';
          procRefNo += ',' + refNo;
          needEnq = '1';
        } else
          statusStr = 'REJECTED';

        //update msg
        if (statusStr == "PROCESSING")
          msg = get_display_lang('lbl_pps_processing_msg');
        else if (resCode != '' && parseInt(resCode, 10) > 0 && !opener.logDataAccessor.isBlankString(rejectMsg))
          msg = rejectMsg;
        else {
          msg = GetError(status);
          if (msg == status)
            msg = get_display_lang('lbl_pps_reject_msg');
          msg = msg.replace(/@@@/g, status).replace(/##resCode##/g, resCode);
        }
      } else {
        msg = txnNo;
        statusStr = "ACCEPTED";
      }

      var fullStr = '@@@' + statusStr +
        '|||' + msg +
        '|||' + '' +
        '|||' + dtls +
        '|||' + '' +
        '|||' + amount;


      logDataAccessor.UpdateEFTRecord(refNo, fullStr, 0);
    }
  }

  SetDataStore('refNos', procRefNo);
  SetDataStore('enablePPSEnquiry', needEnq);
}

function checkIfRefNoExists(refNo) {
  // check if valid first
  if (opener.logDataAccessor.isBlankString(refNo)) return false;
  var qRefNo = opener.GetDataStore('refNos');

  if (qRefNo) {
    var qRefNoList = qRefNo.split(',');
    for (var i = 1; i < qRefNoList.length; i++) {
      if (qRefNoList[i] == refNo) return true;
    }
  }
  // no found
  return false;
}

function printLogTable() {
  var buf = new StringBuffer();
  var records = GetDataStore('currentSessionRecords');
  if (records == '')
    $('#curSessionMsg').html(GetText('alt_no_cs_records'));
  else {
    var recArr = records.split('@@@');
    $('#curSessionNote2').html('');
    for (var i = 1; i < recArr.length; i++) {
      var tmpArr = recArr[i].split('|||');
      var transStatus = (tmpArr[0] != '') ? GetText(tmpArr[0]) : '';
      var transNo = tmpArr[1];
      var betType = tmpArr[2];
      var transDetail = tmpArr[3];
      var leagueCode = tmpArr[4];
      var amount = tmpArr[5];
      transDetail = transDetail.replace(/\[flag\]/g, GetLeagueFlagHTML(tmpArr[4]));

      buf.append('<div class="betslipRow">');
      buf.append('<div class="curSessionContentCell1 ').append(stmtStyle[i % 2]).append('">').append(i).append('</div>');

      buf.append('<div class="curSessionContentCell2 ').append(stmtStyle[i % 2]).append('" ');
      if (transStatus == GetText('UNKNOWN')) {
        $('#curSessionNote2').html(GetText('alt_cs_records_text2'));
        $('#curSessionYellowBar').hide();
        buf.append('style="color:#ffae00"');
      }
      buf.append('>').append(transStatus).append('</div>');

      buf.append('<div class="curSessionContentCell3 ').append(stmtStyle[i % 2]).append('">').append(transNo).append('</div>');
      buf.append('<div class="curSessionContentCell4 ').append(stmtStyle[i % 2]).append('">').append(betType.replace(/<br\/>/g, '<br%>').replace(/\//g, '/<wbr>').replace(/<br%>/g, '<br/>')).append('</div>');
      buf.append('<div class="curSessionContentCell5 ').append(stmtStyle[i % 2]).append('">').append(replaceMaxPay(transDetail)).append('</div>');
      buf.append('<div class="curSessionContentCell6 ').append(stmtStyle[i % 2]).append('">');
      if (transStatus == GetText('UNKNOWN'))
        buf.append(unknownAmountBlack);
      else
        buf.append(FormatCurrency(amount));
      buf.append('</div>');
      buf.append('</div>');
    }
  }
  return buf.toString();
}

function printLogHeader() {
  var buf = new StringBuffer();
  buf.append('<div class="stmtTableContentHeader">');
  buf.append('<div class="curSessionContentHead1">').append(GetText('alt_transfer')).append('</div>');
  buf.append('<div class="curSessionContentHead2">').append(GetText('alt_log_status')).append('</div>');
  buf.append('<div class="curSessionContentHead3">').append(GetText('alt_recall_ref_no')).append('</div>');
  buf.append('<div class="curSessionContentHead4">').append(GetText('alt_recall_bet_type')).append('</div>');
  buf.append('<div class="curSessionContentHead5">').append(GetText('alt_recall_transaction_details')).append('</div>');
  buf.append('<div class="curSessionContentHead6">').append(GetText('alt_recall_amount')).append('</div>');
  buf.append('</div>');
  return buf.toString();
}

function replaceMaxPay(inval) {
  return inval.replace('MAX PAY', "<BR>" + GetText("max_payout")) + "&nbsp;";
}

function onclickCurSessionPrint() {
  $('#printDiv').html('');
  var buf = new StringBuffer();
  buf.append(printAcctStmtSaveHeader('log'));
  buf.append(printLogHeader());
  buf.append(printLogTable());
  $('#printDiv').html(buf.toString());
  window.print();
}

function disableStatementNav() {
  $('#linkAccountRecord').removeClass('boHighlight');
  $('#helpAccountRecord').hide();
  $('#linkCurSession').removeClass('boHighlight');
  $('#helpCurSession').hide();
  $('#linkRecall').removeClass('boHighlight');
  $('#helpRecall').hide();
  $('#divStatementSearchBox').hide();
  $('#divStatementYellowHeader').hide();
  $('#divStatementTable').hide();
  $('#divAccountRecord').hide();
  $('#divCurSession').hide();
  $('#divRecall').hide();
  $('#divRecallYellowHeader').hide();
  $('#divRecallTable').hide();
}

function switchStatementNav(item) {
  disableStatementNav();
  $('#help' + item).show();
  $('#link' + item).addClass('boHighlight');
  $('#div' + item).show();
}


function OpenLogoutPopup(isNewAcc) {
  $('#logoutFrame').attr('src', url_logout_box + isNewAcc);
  $('#divLogout').show();
  focusField($('#divLogout'));
  clearWAParam();

  WATrackerTrackClickEvent('betlogoutbox-home-box');

}

function OnClickCloseLogoutPopup() {
  CloseLogoutPopup();
  WATrackerTrackClickEvent('betlogoutbox-home-button-close');
}

function CloseLogoutPopup() {
  $('#divLogout').hide();
  clearWAParam();
}

function closeBetSlipOverlay(e) {
  if (e.target.matches && e.target.matches('#divBetSlipOverlay')) {
    closeAllBetSlipOverlay();
  } else if (e.target.msMatchesSelector && e.target.msMatchesSelector('#divBetSlipOverlay')) {
    closeAllBetSlipOverlay();
  }
}

function closeAllBetSlipOverlay() {
  if (bsUsePopup) {
    window.close();
  } else {
    $('#printDiv').html('');
    $('#divBetSlipOverlay').hide();
    $('#divStatement').hide();
    $('#divStatementSearchBox').hide();
    $('#divStatementYellowHeader').hide();
    $('#divStmtBottom').hide();
    $('#divStatementTable').hide();
    $('#divCurSession').hide();
    $('#divRecall').hide();
    $('#divRecallYellowHeader').hide();
    $('#divRecallTable').hide();
    $('#divRecallBottom').hide();
    $('#divPersonalSetting').hide();
    $('#divFundTransfer').hide();
    disableStatementNav();
  }
}

function OpenReceipt(rec) {
  //clear image
  $('#imgReceipt').attr('src', '');
  $('#btnDownload').attr('href', '');
  $('#btnDownload').prop('text', GetText('alt_acctstmt_receipt_download'));
  $("#DivReceipt").show();
  sendeWalletReceiptRequest(rec, setReceiptImage, setReceiptImageErr);
}

function CloseReceipt() {
  $('#DivReceipt').hide();
}

function setReceiptImage(data) {
  $('#imgReceipt').attr('src', 'data:image/png;base64,' + data["image"]);
  $('#btnDownload').attr('href', 'data:image/png;base64,' + data["image"]);
  $('#btnDownload').attr('download', 'receipt.png');
}

function setReceiptImageErr() {

}

function downloadReceipt() {
  //for IE or Edge
  if (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || window.navigator.userAgent.indexOf("Edge/") > 0) {
    var image = document.getElementById('imgReceipt');
    var canvas = document.getElementById('canReceipt');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = image.width;
    ctx.canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    window.navigator.msSaveBlob(canvas.msToBlob(), 'receipt.png');
  }
}