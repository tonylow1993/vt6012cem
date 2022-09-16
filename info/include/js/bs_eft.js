//var EftType = { FundsTransefer: 0, BankAccountBalance: 1,  Primary: 1, Secondary: 2 }
const eftActions = {
    deposit: 0,
    withdrawal: 1,
    linking: 2,
    banklist: 3,
    ppsResult: 4
}
const transactionType = {
    fps: "FPS",
    epsco: "EPSCO",
    autopay: "AUTOPAY"
}
const bankAccType = {
    nba1: "NBA1",
    nba2: "NBA2",
    pps: "PPS"
}

var nba1 = {
    hasDepositFps: false,
    hasDepositEpsco: false,
    hasDepositAutopay: false
}

var nba2 = {
    hasDepositFps: false,
    hasDepositEpsco: false,
    hasDepositAutopay: false
}

var eftAction = eftActions.deposit;
var account;
var sid;
var transactionIndicator = null;
var nba1TransactionType;
var nba2TransactionType;
var amount;
var pwd;
var eftDtls;
var eftDtls2;
var encSessionKey;
var isButtonDisabled = true;

var minDeposit;
var maxDeposit;
var minWithdrawal;
var maxWithdrawal;

var perviousEftAction;
var perviousNba1TransactionType;
var loadFpsInfo = true;

var optIntervalId;
var optPhone;

var ppsInfoTS = new Date();

function EftOnLoad(i) {
    EnableButtons(false);
    if (bsUsePopup || i == 4) {
        if (eftConfig.enableDepositOtherMeans) {
            ResizeWindow(755, 630);
        } else {
            ResizeWindow(755, 574);
        }
    }
    //reset layout
    ResetEftUi();
    initHeader(eftConfig.fpsInfo.IsEnableLink);
    switch (i) {
        case 0:
            eftAction = eftActions.deposit;
            eftMenuActive(0);
            break;
        case 1:
            eftAction = eftActions.withdrawal;
            eftMenuActive(1);
            break;
        case 2:
            eftAction = eftActions.linking;
            eftMenuActive(2);
            break;
        case 3:
            eftAction = eftActions.banklist;
            if (eftConfig.enableDepositOtherMeans) {
                $('#DivFpsTheList').height(570);
            } else {
                $('#DivFpsTheList').height(390);
            }
            break;
        case 4:
            eftAction = eftActions.ppsResult;
            break;
        default:
            eftAction = eftActions.deposit;
            eftMenuActive(0);
            break;
    }

    if (isLogon() != 1 || account == '') {
        invalidSessionWarning();
    }

    GetBanner();
    $('#trans_amount').val('');

    if (eftAction == eftActions.deposit) {
        $('#DivRequest').show();
        $('#DivDeposit').show();
        if (eftConfig.enableDepositOtherMeans) {
            $('#DivDepositType').show();
            $('#DivPpsLink').show();
        }
        LoadDepositLabel();
    }
    if (eftAction == eftActions.withdrawal) {
        $('#DivRequest').show();
        $('#DivWithdrawal').show();
        LoadWithdrawalLabel();
    }
    if (eftAction == eftActions.linking) {
        LoadLinkingLabel();
    }
    if (eftAction == eftActions.banklist) {
        LoadFpsBankList();
    }
    if (eftAction == eftActions.ppsResult) {
        ProcessPPSDRResult(ppsResult);
    }

    var account = GetDataStore('account');

    //get FPS info only on deposit
    if (loadFpsInfo) {
        $('#DivRequest').hide();
        ClearFPSInfo();
        $.when(getFPSTxnPara()).done(function() {
            loadFpsInfo = false;
            if (eftConfig.fpsInfo.IsEnable) {
                if (eftAction == eftActions.deposit) {
                    CheckNotification();
                }
            }

            //preload image
            img1 = new Image();
            img1.src = get_display_lang('pic_path') + get_display_lang('pic_timeout');
            img2 = new Image();
            img2.src = get_display_lang('pic_path') + get_display_lang('pic_progress');
            $.when(getAutopayTxnPara()).done(function() {
                setPrimaryNba();
                setSecondaryNba();
                $.when(setPPS()).done(function() {
                    if (!setNoEft()) {
                        if (eftAction == eftActions.deposit) {
                            setYellowBar();

                        }
                    }
                    OnChangeTransFrom(true);
                    EnableButtons(true);
                    setDepositNba();

                    if (eftAction == eftActions.deposit || eftAction == eftActions.withdrawal) {
                        if (!setNoEft()) {
                            $('#DivRequest').show();
                            //setDepositNbaHeight();
                        }
                    }
                });
            })
        });
    } else {
        if (eftAction == eftActions.linking) {
            if (GetDataStore('primarynba_status') != "1" && GetDataStore('secondarynba_status') != "1") {
                $('#lbl_NoNba').html(get_display_lang('lbl_no_nba_withdrawal') + get_display_lang('lbl_fps_bank_url'));
                $('#DivRequest').hide();
                $('#DivNoNba').show();
            } else {
                transactionIndicator = "";
                linkPrimaryNba(true);
                linkSecondaryNba();
                //UI
                AdjustLinkBankUi();
            }
            EnableButtons(true);
            $('#btnLinkNext').prop("disabled", true);
        } else {
            setPrimaryNba();
            setSecondaryNba();
            $.when(setPPS()).done(function() {
                if (!setNoEft()) {
                    if (eftAction == eftActions.deposit) {
                        setYellowBar();
                    }
                }
                OnChangeTransFrom(true);
                EnableButtons(true);
                setDepositNba();
            });
        }
    }
}

function GetPpsEnabled() {
    return enquirePpsEnabled(ProcessPpsEnabledResult, ProcessPpsEnabledResult, eftConfig.epscoInfo.TimeoutInMs);
}

function ProcessPpsEnabledResult(msg) {
    if (msg) {
        if (msg["GetPPSEnabledResult"] == true) {
            eftConfig.ppsInfo.IsEnable = true;
        } else {
            eftConfig.ppsInfo.IsEnable = false;
        }
    }
}

function initHeader(enableLinkAcc) {
    if (enableLinkAcc) {
        $('#eftMenuBtn2').show();
        $('#eftMenuBtn2Stoke').show();
    } else {
        $('#eftMenuBtn2').hide();
        $('#eftMenuBtn2Stoke').hide();
    }

    $('#asTitle').html(get_display_lang('lbl_eft_title'));
    $('#eftMenuBtn0').val(get_display_lang('lbl_online_deposit'));
    $('#eftMenuBtn1').val(get_display_lang('lbl_online_withdrawal'));
    $('#eftMenuBtn2').val(get_display_lang('lbl_link_account'));
}

function LoadFpsBankList() {
    perviousEftAction = eftAction;
    ResetEftUi();
    $('#DivRequest').hide();
    $('#DivFpsBankList').show();

    $('#lbl_banklist_title').html(get_display_lang('lbl_banklist_title'));
    $('#DivFpsTheList').height($(window).height() - 185);

    sendFPSBankListRequest("", ProcessFpsBankListResult, ProcessFpsBankListTimeout, eftConfig.fpsInfo.TimeoutInMs);
}

function ProcessFpsBankListResult(msg) {
    var result = JSON.parse(msg);
    var header = '<tr><td id="lblBankCode" class="eft_banklist_header" style="text-align: center;"></td><td id="lblBankName" class="eft_banklist_header"></td></tr>';
    $('#dgBanklist').html(header);
    $('#lblBankCode').html(get_display_lang('lbl_bankcode'));
    $('#lblBankName').html(get_display_lang('lbl_bankname'));

    if (GetLanguage() == 0) {
        $.each(result, function(i, item) {
            var $tr = $('<tr>').append(
                $('<td class="eft_banklist_code">').text(item.code),
                $('<td class="eft_banklist_bank">').text(item.name)
            ).appendTo('#dgBanklist');
        });
    } else {
        $.each(result, function(i, item) {
            var $tr = $('<tr>').append(
                $('<td class="eft_banklist_code">').text(item.code),
                $('<td class="eft_banklist_bank">').text(item.nameTC)
            ).appendTo('#dgBanklist');
        });
    }

    EnableButtons(true);
}

function ProcessFpsBankListTimeout(msg) {
    EnableButtons(true);
}

function BackFpsBankList() {
    EftOnLoad(perviousEftAction);
}

function ResetEftUi() {
    nba1TransactionType = "";
    nba2TransactionType = "";
    $('#DivRequest').hide();
    $('#DivDeposit').hide();
    $('#DivWithdrawal').hide();
    $('#DivBankPin').hide();
    $("#DivConfirmCharge").hide();
    $('#DivConfirm').hide();
    $("#DivConfirmAutopay").hide();
    $("#DivProgress").hide();
    $('#DivOtpProgress').hide();
    $("#DivPPSRedirect").hide();
    $("#DivReply").hide();
    $('#DivReplyResult').hide();
    $('#DivResultFee').hide();
    $('#DivRejectReason').hide();
    $('#trans_amount').val('');
    $('#DivLink').hide();
    $('#DivNoNba').hide();
    $('#RequestYellowBar').hide();
    $('#DivLinkSummary').hide();
    $('#DivLinkTandC').hide();
    $('#DivFpsBankList').hide();
    $('#DivLinkOtpFailed').hide();
    $('#DivLinkOtpValidate').hide();
    $('#DivLinkReply').hide();
    $('#DivLinkRejectReason').hide();
    $('#DivPpsResult').hide();
    $('#DivLinkSummaryReject').hide();
    $('#DivReference').hide();
    $('#lblResultRefNo').html('');
    $('#DivBalance').hide();
    SetReminder(null);
    clrPin();
    $('#rd_eft_epsco').prop('checked', true);
    $('#pin').removeAttr('disabled');
    if ($('#rd_nba1').is(':visible')) {
        $('#rd_nba1').prop('checked', true);
    } else if ($('#rd_nba2').is(':visible')) {
        $('#rd_nba2').prop('checked', true);
    } else if ($('#rd_nba3').is(':visible')) {
        $('#rd_nba3').prop('checked', true);
    }
    $('#lbl_NoNba_Link').html('');
    $('#DivLinkFps1').removeClass('eft_link_fps_active');
    $('#DivLinkFps2').removeClass('eft_link_fps_active');
    $('#DivPreviewUseEpsco').hide();
    $('#DivPreviewUseAutopay').hide();
    $('#DivPreviewUseLabel').hide();
    $('#DivLinkNba1Rejected').hide();
    $('#DivLinkNba2Rejected').hide();
    $('#DivLinkNba1Pending').hide();
    $('#DivLinkNba2Pending').hide();
    $('#lblLinkSummaryResultReminder').html('');
    $('#btnNoNbaLink').hide();
    $('#DivDepositMethod').hide();
    $('#div_nba1').removeClass('urlDisabled');
    $('#rd_nba1').attr("disabled", false);
    $('#div_nba2').removeClass('urlDisabled');
    $('#rd_nba2').attr("disabled", false);
    $('#DivDepositType').hide();
    $('#DivPpsLink').hide();
    $('#DivDepositTypeNba').removeClass('eft_deposit_selection_selected');
    $('#DivDepositTypePps').removeClass('eft_deposit_selection_selected');
    $('#trans_amount').prop("disabled", false);
    $('#btnDepositNext').prop('disabled', false);
    if (eftConfig.enableDepositOtherMeans) {
        $('#sep2').show();
    }
}

function loadEftParameter() {
    var secId = 0;
    isButtonDisabled = true;
    var isPPSResult = false;
    var minDeposit;
    var maxDeposit;

    eftConfig.fpsInfo = {
        MinDeposit: parseInt(channelArray["FPSperDepMinAmt"]) / 100,
        MaxDeposit: parseInt(channelArray["FPSperDepMaxAmt"]) / 100,
        DepositCharge: parseInt(channelArray["FPSperDepChargeAmt"]) / 100,
        MonthlyDepositCount: parseInt(channelArray["FPSmonthlyDepMaxCntNoCharge"]),
        DepositMonthlyCharge: parseInt(channelArray["FPSmonthlyDepMaxCntChargeAmt"]) / 100,
        MinWithdrawal: parseInt(channelArray["FPSperWdrMinAmt"]) / 100,
        MaxWithdrawal: parseInt(channelArray["FPSperWdrMaxAmt"]) / 100,
        MaxDailyWithdrawal: parseInt(channelArray["FPSdailyWdrMaxAmt"]) / 100,
        MaxCountDailyWithdrawal: parseInt(channelArray["FPSdailyWdrMaxCnt"]),
        WithdrawalCharge: parseInt(channelArray["FPSperWdrChargeAmt"]) / 100,
        IsEnable: (channelArray["EnabledFPS"] == 1 && eftConfig.enableFPS),
        IsEnableLink: (channelArray["FPSLinkBankAcc"] == 1 && eftConfig.enableLinkAcc),
        TimeoutInMs: parseInt(channelArray["FPSReplyTimeout"]) * 1000,
        OtpResendSeconds: eftConfig.otpResendSeconds,
        OtpMessageDisplayMs: 3000
    };

    eftConfig.epscoInfo = {
        MinDeposit: parseInt(channelArray["TBMinDeposit"]),
        MaxDeposit: parseInt(channelArray["TBMaxDeposit"]),
        MinWithdrawal: parseInt(channelArray["TBMinWithdrawal"]),
        MaxWithdrawal: parseInt(channelArray["TBMaxWithdrawal"]),
        TimeoutInMs: parseInt(channelArray["EFTReplyTimeout"]) * 1000
    };

    eftConfig.autopayInfo = {
        MinDeposit: parseInt(channelArray["DDATransferLowerRange"]),
        MaxDeposit: parseInt(channelArray["DDATransferUpperRange"]),
        MinWithdrawal: parseInt(channelArray["TBMinAutoWithdrawal"]),
        MaxWithdrawal: parseInt(channelArray["TBMaxAutoWithdrawal"]),
        Charge: 0,
        IsEnabledDDA: channelArray["IsEnabledDDA"],
        TimeoutInMs: parseInt(channelArray["EFTReplyTimeout"]) * 1000
    };

    eftConfig.ppsInfo = {
        MinDeposit: parseFloat(channelArray["TransferLowerRange"]),
        MaxDeposit: parseFloat(channelArray["TransferUpperRange"]),
        TimeoutInMs: parseInt(channelArray["PPSTimeout"]) * 1000,
        Charge: parseFloat(channelArray["Charge"]),
        IsEnable: false,
        ppsXMins: parseInt(channelArray["PPSEODB4Min"]),
        IsEnablePPSG: ((channelArray["IsEnablePPSG"] == 1) && eftConfig.enablePPS),
        ppsFAQPage: eftConfig.ppsFAQPage
    };
}

function CheckNotification() {
    var status1 = GetDataStore('primarynba_FPSnotifyEDDAStatus');
    var status2 = GetDataStore('secondarynba_FPSnotifyEDDAStatus');

    var approve = false;
    var hasNotification = false;

    if (status1 == "AP" || status1 == "RJ") {
        hasNotification = true;
        if (status1 == "AP") {
            approve = true;
        }
    } else if (status2 == "AP" || status2 == "RJ") {
        hasNotification = true;
        if (status2 == "AP") {
            approve = true;
        }
    }

    if (hasNotification) {
        $('#DivNotice').show();
        if (approve) {
            $('#lblServiceContent').html(get_display_lang('lbl_service_approve'));
        } else {
            $('#lblServiceContent').html(get_display_lang('lbl_service_reject'));
        }
    }
}

function UpdateNotification() {
    $('#DivNotice').hide();

    var status1 = GetDataStore('primarynba_FPSnotifyEDDAStatus');
    var status2 = GetDataStore('secondarynba_FPSnotifyEDDAStatus');

    if (status1 == "AP" || status1 == "RJ") {
        var seqNo = GetNextSeqNo();

        var para = {
            'lang': GetLanguage(),
            'acc': GetDataStore('account'),
            'sessionId': GetDataStore('session_id'),
            'apimId': GetDataStore('gu_id'),
            'seqNo': seqNo,
            'bankCode': GetDataStore('primarynba_bankcode'),
            'bankAccountNo': GetDataStore('primarynba_bankacno'),
            'eDDAStatus': "",
            'knownWebID': GetDataStore('sso_web_id'),
            'knownSSOGUID': GetDataStore('sso_guid'),
            'bankAccountType': '1'
        };
        sendFPSInfoUpdate(para, ProcessFPSInfoUpdateResult, eftConfig.fpsInfo.TimeoutInMs);
    }

    if (status2 == "AP" || status2 == "RJ") {
        var seqNo = GetNextSeqNo();

        var para = {
            'lang': GetLanguage(),
            'acc': GetDataStore('account'),
            'sessionId': GetDataStore('session_id'),
            'apimId': GetDataStore('gu_id'),
            'seqNo': seqNo,
            'bankCode': GetDataStore('secondarynba_bankcode'),
            'bankAccountNo': GetDataStore('secondarynba_bankacno'),
            'eDDAStatus': "",
            'knownWebID': GetDataStore('sso_web_id'),
            'knownSSOGUID': GetDataStore('sso_guid'),
            'bankAccountType': '2'
        };
        sendFPSInfoUpdate(para, ProcessFPSInfoUpdateResult, eftConfig.fpsInfo.TimeoutInMs);
    }
}

function ProcessFPSInfoUpdateResult(msg) {
    if (msg.result == "-2") {
        processSSOExtendResult(msg); // Support SSO
    }

}

function LoadDepositLabel() {
    $('#lbl_link_nba').html(get_display_lang('lbl_link_nba'));
    $('#lbl_link_pps').html(get_display_lang('lbl_link_pps'));
    $('#lbl_bank_acct').html(get_display_lang('lbl_bank_acct') + ": ");
    $('#lbl_bankname_1').html(GetDataStore("primarynba_bankname"));
    $('#lbl_bank_account_1').html(maskAccNo(GetDataStore('primarynba_bankacno'))); // bank1 to account
    $('#lbl_bankname_2').html(GetDataStore("secondarynba_bankname"));
    $('#lbl_bank_account_2').html(maskAccNo(GetDataStore('secondarynba_bankacno'))); // bank2 to account
    $('#lbl_pps').html(get_display_lang('lbl_from_pps'));
    $('#lbl_pps2').html(get_display_lang('lbl_from_pps2'));
    $('#txtAccount').html(get_display_lang('lbl_bettingacct'));
    $('#txtBettingAcctNo').html(GetDataStore("account"));
    $('#lblSummary').html(get_display_lang("lbl_deposit_summary"));
    $('#lblResultBetAccBal').html(get_display_lang("lbl_tb_acct_balance"));

    $('#lblServiceNotice').html(get_display_lang('lbl_service_notice'));
    $('#lbl_ConfirmCharge').html(get_display_lang('lbl_deposit_confirm_charge_title'));
    $('#lblConfirmChargeText').html(get_display_lang('lbl_deposit_confirm_charge'));

    $('#lblFrom').html(get_display_lang('lbl_from'));
    $('#lblPreviewFrom').html(get_display_lang('lbl_from'));
    $('#lblResultFrom').html(get_display_lang('lbl_from'));
    $('#lblTo').html(get_display_lang('lbl_to'));
    $('#lblPreviewTo').html(get_display_lang('lbl_to'));
    $('#lblResultTo').html(get_display_lang('lbl_to'));
    $('#lblPreviewBet').html(get_display_lang('lbl_bettingacct'));
    $('#lblResultBet').html(get_display_lang('lbl_bettingacct'));
    $('#lblPreviewAmount').html(get_display_lang('lbl_deposit_amount'));
    $('#lblResultAmount').html(get_display_lang('lbl_txn_amount'));
    $('#lblPreviewTransType').html(get_display_lang('lbl_trans_type'));
    $('#lblPreviewTransTypeEpsco').html(get_display_lang('lbl_trans_type'));
    $('#lblResultTransType').html(get_display_lang('lbl_trans_type'));
    $('#lbl_preview_eft_epsco').html(get_display_lang('lbl_trans_instant_deposit_epsco'));
    $('#lbl_preview_eft_autopay').html(get_display_lang('lbl_trans_deposit_autopay'));
    $('#lbl_preview_eft_autopay_note').html(get_display_lang('lbl_trans_deposit_autopay_note'));
    $('#lblTransAmount').html(get_display_lang('lbl_deposit_amount'));
    $('#lblResultRef').html(get_display_lang('lbl_txn_ref_num'));
    $('#txtEFTNotice').html(get_display_lang('lbl_notice'));
    $('#txtServicePin').html(get_display_lang('lbl_bank_pin'));
    $('#txtRedirectMsg').html(get_display_lang('lbl_redirect_msg'));
    $('#pic_help').attr('title', get_display_lang('alt_pic_eft_help'));
    $('#lblPreviewNoPin').html(get_display_lang('lbl_no_pin'));
    $('#lbl_preview').html(get_display_lang('lbl_preview'));
    $('#lbl_preview2').html(get_display_lang('lbl_preview2'));
    $('#lnk_pps').html(get_display_lang('lnk_pps'));
    $('#lnk_pps').attr('href', '//special.hkjc.com' + get_display_lang('lnk_pps_href'));
    $('#lblMethod').html(get_display_lang('lbl_trans_method'));
    $('#lbl_method_pps').html(get_display_lang('pps_instant_funds_transfer'));
    $('#lbl_method_pps_2').html(get_display_lang('lbl_deposit_method_fps').replace("~~~", CommaFormatted(eftConfig.ppsInfo.MinDeposit)));
    $('#lbl_method_pps_3').html(get_display_lang('lbl_eftnote_pps_method').replace("###", CommaFormatted(eftConfig.ppsInfo.Charge)));

    $('.lbl_method_fps').html(get_display_lang('lbl_trans_instant_deposit_fps'));
    $('.lbl_method_fps_2').html(get_display_lang("lbl_deposit_method_fps").replace("~~~", CommaFormatted(eftConfig.fpsInfo.MinDeposit)));
    $('.lbl_method_fps_3').html(get_display_lang('lbl_deposit_method_fee'));
    $('.lbl_method_fps_4').html(get_display_lang('lbl_deposit_method_maintenance'));
    $('.lbl_method_epsco').html(get_display_lang('lbl_trans_instant_deposit_epsco'));
    $('.lbl_method_epsco_2').html(get_display_lang("lbl_deposit_method_epsco").replace("~~~", CommaFormatted(eftConfig.epscoInfo.MinDeposit)));
    $('.lbl_method_autopay').html(get_display_lang('lbl_trans_deposit_autopay'));
    $('.lbl_method_autopay_2').html(get_display_lang("lbl_deposit_method_autopay").replace("~~~", CommaFormatted(eftConfig.autopayInfo.MinDeposit)));
    $('.lbl_method_autopay_3').html(get_display_lang('lbl_deposit_method_fee'));
    $('.btnServiceConfirm').prop('value', get_display_lang('btn_confirm'));
    $('.btnServiceConfirm').prop('title', get_display_lang('btn_confirm'));
    $('.btnReset').prop('value', get_display_lang('btn_reset'));
    $('.btnReset').prop('title', get_display_lang('btn_reset'));
    $('.btnClose').prop('value', get_display_lang('btn_close'));
    $('.btnClose').prop('title', get_display_lang('btn_close'));
    $('.btnNext').prop('value', get_display_lang('btn_next'));
    $('.btnNext').prop('title', get_display_lang('btn_next'));
    $('.btnRedirect').prop('value', get_display_lang('btn_ok'));
    $('.btnRedirect').prop('title', get_display_lang('btn_ok'));
    $('.btnBack').prop('value', get_display_lang('btn_back'));
    $('.btnBack').prop('title', get_display_lang('btn_back'));
    $('.btnConfirm').prop('value', get_display_lang('btn_confirm'));
    $('.btnConfirm').prop('title', get_display_lang('btn_confirm'));
    $('.btnReinput').prop('value', get_display_lang('btn_reinput'));
    $('.btnReinput').prop('title', get_display_lang('btn_reinput'));
    $('.btnDone').prop('value', get_display_lang('btn_done'));
    $('.btnDone').prop('title', get_display_lang('btn_done'));
    $('.btnCancel').prop('value', get_display_lang('btn_cancel'));
    $('.btnCancel').prop('title', get_display_lang('btn_cancel'));
    $('.btnContinue').prop('value', get_display_lang('btn_continue'));
    $('.btnContinue').prop('title', get_display_lang('btn_continue'));
    $('.btnLinkNow').prop('title', get_display_lang('btn_linknow'));
    $('.btnLinkNow').prop('value', get_display_lang('btn_linknow'));
}

function LoadWithdrawalLabel() {
    $('#lbl_bank_acct').html(get_display_lang('lbl_bank_acct') + ": ");
    $('#lbl_bankname_1_withdrawal').html(GetDataStore("primarynba_bankname"));
    $('#lbl_bank_account_1_withdrawal').html(maskAccNo(GetDataStore('primarynba_bankacno'))); // bank1 to account
    $('#txtAccount').html(get_display_lang('lbl_bettingacct'));
    $('#txtBettingAcctNo').html(GetDataStore("account"));
    $('#lblSummary').html(get_display_lang("lbl_withdrawal_summary"));
    $('#lblResultBetAccBal').html(get_display_lang("lbl_tb_acct_balance"));

    $('#lblFrom').html(get_display_lang('lbl_from'));
    $('#lblPreviewFrom').html(get_display_lang('lbl_from'));
    $('#lblResultFrom').html(get_display_lang('lbl_from'));
    $('#lblTo').html(get_display_lang('lbl_from'));
    $('#lblTo_withdrawal').html(get_display_lang('lbl_to'));
    $('#lblPreviewTo').html(get_display_lang('lbl_to'));
    $('#lblResultTo').html(get_display_lang('lbl_to'));
    $('#lblPreviewBet').html(get_display_lang('lbl_bettingacct'));
    $('#lblResultBet').html(get_display_lang('lbl_bettingacct'));
    $('#lblPreviewAmount').html(get_display_lang('lbl_withdrawal_amount'));
    $('#lblResultAmount').html(get_display_lang('lbl_txn_amount'));
    $('#lblPreviewTransType').html(get_display_lang('lbl_trans_type'));
    $('#lblPreviewTransTypeEpsco').html(get_display_lang('lbl_trans_type'));
    $('#lblResultTransType').html(get_display_lang('lbl_trans_type'));
    $('#lbl_preview_eft_epsco').html(get_display_lang('lbl_trans_instant_withdrawal_epsco'));
    $('#lbl_preview_eft_autopay').html(get_display_lang('lbl_trans_withdrawal_autopay'));
    $('#lblTransAmount').html(get_display_lang('lbl_withdrawal_amount'));
    $('#lblResultRef').html(get_display_lang('lbl_txn_ref_num'));
    $('#txtEFTNotice').html(get_display_lang('lbl_notice'));
    $('#txtServicePin').html(get_display_lang('lbl_bank_pin'));
    $('#pic_help').attr("title", get_display_lang('alt_pic_eft_help'));
    $('#lblPreviewNoPin').html(get_display_lang('lbl_no_pin'));
    $('#lbl_preview').html(get_display_lang('lbl_preview'));
    $('#lbl_preview2').html(get_display_lang('lbl_preview2'));
    $('#lbl_ConfirmAutopay').html(get_display_lang('lbl_withdrawal_exceed_limit'));


    $('.btnReset').prop('value', get_display_lang('btn_reset'));
    $('.btnReset').prop('title', get_display_lang('btn_reset'));
    $('.btnClose').prop('value', get_display_lang('btn_close'));
    $('.btnClose').prop('title', get_display_lang('btn_close'));
    $('.btnNext').prop('value', get_display_lang('btn_next'));
    $('.btnNext').prop('title', get_display_lang('btn_next'));
    $('.btnReinput').prop('value', get_display_lang('btn_reinput'));
    $('.btnReinput').prop('title', get_display_lang('btn_reinput'));
    $('.btnBack').prop('value', get_display_lang('btn_back'));
    $('.btnBack').prop('title', get_display_lang('btn_back'));
    $('.btnConfirm').prop('value', get_display_lang('btn_confirm'));
    $('.btnConfirm').prop('title', get_display_lang('btn_confirm'));
    $('.btnDone').prop('value', get_display_lang('btn_done'));
    $('.btnDone').prop('title', get_display_lang('btn_done'));
    $('.btnCancel').prop('value', get_display_lang('btn_cancel'));
    $('.btnCancel').prop('title', get_display_lang('btn_cancel'));
    $('.btnContinue').prop('value', get_display_lang('btn_continue'));
    $('.btnContinue').prop('title', get_display_lang('btn_continue'));
}

function setPrimaryNba() {
    if (GetDataStore('primarynba_bankacno').length != 0 && GetDataStore("primarynba_status") == "1") {
        //Check FPS Global status
        if (eftConfig.fpsInfo.IsEnable) {
            //check FPS provider status 
            if (GetDataStore('primarynba_FPSeDDAStatus') == "AP") {
                //Check FPS error
                if (GetDataStore('primarynba_FPSerrorCode') == "0") {
                    //Check FPS backend processor Status
                    if (GetDataStore('primarynba_FPSPStatus') == "1") {
                        if (eftAction == eftActions.deposit) {
                            nba1.hasDepositFps = true;
                            //Check if bank FPS status
                            if (GetDataStore('primarynba_FPSeDDADepositEnable').toUpperCase() == "TRUE") {
                                //check min & max amount
                                minDeposit = eftConfig.fpsInfo.MinDeposit;
                                maxDeposit = eftConfig.fpsInfo.MaxDeposit;

                                if (minDeposit <= maxDeposit) {
                                    nba1TransactionType = transactionType.fps;
                                    $('#div_nba1').show();
                                }
                            }

                        } else {
                            if (GetDataStore('primarynba_FPSwithdrawalEnable').toUpperCase() == "TRUE") {
                                nba1TransactionType = transactionType.fps;
                                if (eftAction == eftActions.deposit) {
                                    $('#div_nba1').show();
                                    $('#rd_nba1').prop("checked", true);
                                }
                                if (eftAction == eftActions.withdrawal) {
                                    $('#div_nba1_withdrawal').show();
                                }
                                return;
                            }
                        }
                    } else {
                        //has FPS deposit but backend processor is off
                        nba1.hasDepositFps = true;
                    }
                }

            }
        }

        //Check EFT status
        if (GetDataStore("primarynba_status") == 1) {
            //Check EFT activation                
            if (GetDataStore('primarynba_activation') == 1 || GetDataStore('primarynba_activation') == 3) {
                if (!nba1TransactionType) {
                    nba1TransactionType = transactionType.epsco;
                }
                nba1.hasDepositEpsco = true;

                if (eftAction == eftActions.deposit) {
                    $('#div_nba1').show();
                }
                if (eftAction == eftActions.withdrawal) {
                    $('#div_nba1_withdrawal').show();
                    return;
                }
            }
        }

        //Check autopay status
        if (eftAction == eftActions.deposit) {
            if (eftConfig.autopayInfo.IsEnabledDDA == "1") {
                if (GetDataStore("hasValidAutopayDepositAcc") == 1) {
                    if (!nba1TransactionType) {
                        nba1TransactionType = transactionType.autopay;
                    }
                    nba1.hasDepositAutopay = true;
                    ddaMaxDeposit = GetDataStore("dda_transferLimit");
                    $('#div_nba1').show();
                    //return;
                }
            }
        }

        if (eftAction == eftActions.withdrawal) {
            if (GetDataStore('primarynba_status') == 1 && GetDataStore('primarynba_bankacno')) {
                nba1TransactionType = transactionType.autopay;
                $('#div_nba1_withdrawal').show();
                return;
            }
        }

        if (nba1TransactionType) {
            return;
        } else {
            if (nba1.hasDepositFps) {
                $('#div_nba1').show();
                $('#div_nba1').addClass('urlDisabled');
                $('#rd_nba1').attr('disabled', 'disabled');
                return;
            }
        }

        //No deposit / withdrawal method available
        $('#div_nba1').hide();
        $('#div_nba1_withdrawal').hide();
        $("#rd_nba1").prop("checked", false);

        if (eftAction == eftActions.withdrawal) {
            $('#DivRequest').hide();
            $('#lbl_NoNba').html(get_display_lang('lbl_no_nba_withdrawal'));
            $('#DivNoNba').show();
        }
    } else {
        $('#div_nba1').hide();
        $('#div_nba1_withdrawal').hide();
        $('#rd_nba1').attr('checked', false);

        if (eftAction == eftActions.withdrawal) {
            $('#DivRequest').hide();
            $('#lbl_NoNba').html(get_display_lang('lbl_no_nba_withdrawal'));
            $('#DivNoNba').show();
        }
    }
}

function setSecondaryNba() {
    if (eftAction == eftActions.deposit && GetDataStore('secondarynba_bankacno').length != 0 && GetDataStore("secondarynba_status") == "1") {
        //Check FPS global status
        if (eftConfig.fpsInfo.IsEnable) {
            //Check FPS Status
            if (GetDataStore('secondarynba_FPSeDDAStatus') == "AP") {
                //Check FPS error
                if (GetDataStore('secondarynba_FPSerrorCode') == "0") {
                    if (eftAction == eftActions.deposit) {
                        //Check FPS backend processor status
                        if (GetDataStore('secondarynba_FPSPStatus') == "1") {
                            nba2.hasDepositFps = true;
                            //Check if bank FPS status
                            if (GetDataStore('secondarynba_FPSeDDADepositEnable').toUpperCase() == "TRUE") {
                                nba2TransactionType = transactionType.fps;

                                $('#div_nba2').show();
                                //return;
                            }
                        } else {
                            //has FPS deposit but backend processor is off
                            nba2.hasDepositFps = true;
                        }
                    }
                }
            }

        }

        //Check EFT status
        if (GetDataStore("secondarynba_status") == 1) {
            //Check EFT activation                
            if (GetDataStore('secondarynba_activation') == 1 || GetDataStore('secondarynba_activation') == 3) {
                if (!nba2TransactionType) {
                    nba2TransactionType = transactionType.epsco;
                }
                nba2.hasDepositEpsco = true;
                $('#div_nba2').show();
                //return;
            }

        }

        if (nba2TransactionType) {
            if (!nba1TransactionType) {
                $("#rd_nba2").prop("checked", true);
            }
            return;
        } else {
            $("#rd_nba2").prop("checked", false);
            if (nba2.hasDepositFps) {
                $('#div_nba2').show();
                $('#div_nba2').addClass('urlDisabled');
                $('#rd_nba2').attr('disabled', 'disabled');
                return;
            }
        }
        //No deposit method available
        $('#div_nba2').hide();
        $("#rd_nba2").prop("checked", false);
        /*
        if (!nba1TransactionType) {
            $("#rd_pps").prop("checked", true);
        }
        */
    } else {
        //No deposit method available
        $('#div_nba2').hide();
        $('#rd_nba2').attr('checked', false);
        /*
        if (!nba1TransactionType) {
            $("#rd_pps").prop("checked", true);
        }
        */
    }
}

function setPPS() {
    var deferred = $.Deferred();
    var dur = new Date().getTime() - ppsInfoTS.getTime();

    if (!nba1TransactionType && !nba2TransactionType) {
        $("#rd_pps").prop("checked", true);
    }

    //do only every 4 seconds
    if (dur > 4000 || isSetPPSinit) {
        isSetPPSinit = false;
        if (eftAction == eftActions.deposit) {
            if (eftConfig.ppsInfo.IsEnablePPSG) {
                $.when(GetPpsEnabled()).done(function() {
                    //update last visit
                    ppsInfoTS = new Date();

                    //finish the rest
                    $('#DivDepositTypePps').removeAttr("title");
                    $('#DivDepositTypePps').removeClass("eft_deposit_selection_disabled");

                    if (eftConfig.ppsInfo.IsEnable == false) {
                        if (eftConfig.ppsInfo.ppsXMins) {
                            $('#div_pps').attr("title", get_display_lang('pps_unavailable_before_EOD').format(eftConfig.ppsInfo.ppsXMins));

                            $('#DivDepositTypePps').attr("title", get_display_lang('pps_unavailable_before_EOD').format(eftConfig.ppsInfo.ppsXMins));
                            $('#DivDepositTypePps').addClass("eft_deposit_selection_disabled");
                        }
                        $('#rd_pps').attr('disabled', true);
                        // Dimmed the pps option
                        $('#div_pps').css("color", "#BFBFBF");
                    } else {
                        $('#rd_pps').removeAttr('disabled');
                        $('#div_pps').css("color", "");
                    }
                    if (!eftConfig.enableDepositOtherMeans) {
                        $('#DivDepositPps').show();
                        $('#div_pps').show();
                    }
                    deferred.resolve();
                });
            } else {
                $("#div_pps").hide();
                deferred.resolve();

            }
        } else {
            if (eftAction == eftActions.ppsResult) {
                isSetPPSinit = true;
            }

            $("#div_pps").hide();
            deferred.resolve();
        }
    } else {
        deferred.resolve();
    }
    return deferred.promise();
}

function changeDepositType(type) {
    switch (type) {
        case "NBA":
            setPrimaryNba();
            setSecondaryNba();
            $('#DivDepositTypeNba').addClass("eft_deposit_selection_selected");
            $('#DivDepositTypePps').removeClass("eft_deposit_selection_selected");
            $('#DivDepositNba').show();
            $("input:radio[name=trans_from_to]:visible:enabled:first").prop('checked', true);
            $('#DivPpsLink').hide();
            break;
        case "PPS":
            if ($('#DivDepositTypePps').hasClass('eft_deposit_selection_disabled')) {
                return;
            }
            $('#DivDepositTypeNba').removeClass("eft_deposit_selection_selected");
            $('#DivDepositTypePps').addClass("eft_deposit_selection_selected");
            $('#DivDepositNba').hide();
            $('#rd_pps').prop("checked", true);
            $('#DivPpsLink').show();
            break;
    }
    OnChangeTransFrom(true);
    setDepositMethod();
}

function setDepositNba() {
    if (eftAction == eftActions.deposit) {
        if (eftConfig.enableDepositOtherMeans) {
            $('#DivDepositPps').hide();
            if (!nba1TransactionType && !nba2TransactionType) {
                if (nba1.hasDepositFps || nba2.hasDepositFps) {
                    if (nba1.hasDepositFps) {
                        transactionIndicator = bankAccType.nba1;
                    } else if (nba2.hasDepositFps) {
                        transactionIndicator = bankAccType.nba2;
                    }

                    $('#DivDepositTypeNba').show();
                    $('#DivDepositNba').show();
                    $('#DivDepositTypeNba').addClass('eft_deposit_selection_selected');
                    if (eftConfig.ppsInfo.IsEnablePPSG) {
                        $('#DivDepositTypePps').show();
                    } else {
                        $('#DivDepositTypePps').hide();
                    }
                } else {
                    $('#DivDepositTypeNba').hide();
                    $('#DivDepositNba').hide();
                    $('#DivDepositTypePps').show();
                    $('#DivDepositTypePps').addClass('eft_deposit_selection_selected');

                }

                //set default tab
                if (eftConfig.ppsInfo.IsEnablePPSG) {
                    changeDepositType('PPS');
                } else {
                    changeDepositType('NBA');
                }

            } else {
                $('#DivDepositTypeNba').show();
                $('#DivDepositNba').show();
                $('#DivDepositTypeNba').addClass('eft_deposit_selection_selected');
                if (eftConfig.ppsInfo.IsEnablePPSG) {
                    $('#DivDepositTypePps').show();
                } else {
                    $('#DivDepositTypePps').hide();
                }
                changeDepositType('NBA');
            }
            $('#DivDepositMethod').show();
            setDepositMethod();
        } else {
            if (!nba1TransactionType) {
                $('#div_nba1').hide();
            }

            if (!nba2TransactionType) {
                $('#div_nba2').hide();
            }

            $('#DivDepositNba').show();
            $('#DivDepositMethod').hide();
            if (eftConfig.ppsInfo.IsEnablePPSG) {
                $('#DivDepositTypePps').show();
                $('#DivDepositPps').show();
            } else {
                $('#DivDepositTypePps').hide();
                $('#DivDepositPps').hide();
            }
        }
    } else {
        $('#DivDepositMethod').hide();
    }
}

function setDepositMethod() {
    if (eftConfig.enableDepositOtherMeans && eftAction == eftActions.deposit) {
        if ($('#DivDepositTypeNba').hasClass("eft_deposit_selection_selected")) {

            $('#DivDepositMethod').show();

            var methodDiv;
            var currentNba = nba1;
            var nbaId;
            var isMaintenance = true;
            if (transactionIndicator == bankAccType.nba1 || transactionIndicator == bankAccType.pps) {
                currentNba = nba1;

                if (GetDataStore('primarynba_FPSPStatus') == "1" &&
                    GetDataStore('primarynba_FPSeDDADepositEnable').toUpperCase() == "TRUE") {
                    isMaintenance = false;
                }

                $('#DivDepositMethodListNBA1').show();
                $('#DivDepositMethodListNBA2').hide();
                methodDiv = $('#DivDepositMethodListNBA1');
                nbaId = "_nba1";
            }
            if (transactionIndicator == bankAccType.nba2) {
                currentNba = nba2;

                if (GetDataStore('secondarynba_FPSPStatus') == "1" &&
                    GetDataStore('secondarynba_FPSeDDADepositEnable').toUpperCase() == "TRUE") {
                    isMaintenance = false;
                }

                $('#DivDepositMethodListNBA1').hide();
                $('#DivDepositMethodListNBA2').show();
                methodDiv = $('#DivDepositMethodListNBA2');
                nbaId = '_nba2';
            }

            if (currentNba.hasDepositFps) {
                $('#DivDepositMethodFps' + nbaId).show();
                if (!isMaintenance) {
                    $('#DivDepositMethodFpsMain' + nbaId).hide();
                    $('#DivDepositMethodFpsText' + nbaId).show();
                    $('#DivDepositMethodFps' + nbaId).removeClass('urlDisabled');
                    $('#rd_fps' + nbaId).attr("disabled", false);

                    if (eftConfig.fpsInfo.DepositCharge > 0) {
                        $('#lbl_method_fps_3' + nbaId).show();
                        $('#lbl_method_fps_3' + nbaId).html(get_display_lang('lbl_deposit_method_fee').replace('###', CommaFormatted(eftConfig.fpsInfo.DepositCharge)));
                    } else {
                        $('#lbl_method_fps_3' + nbaId).hide();
                    }
                } else {
                    $('#DivDepositMethodFpsMain' + nbaId).show();
                    $('#DivDepositMethodFpsText' + nbaId).hide();
                    $('#DivDepositMethodFps' + nbaId).addClass('urlDisabled');
                    $('#rd_fps' + nbaId).attr("disabled", true);
                }

            } else {
                $('#DivDepositMethodFps' + nbaId).remove();
            }

            if (currentNba.hasDepositEpsco) {
                $('#DivDepositMethodEpsco' + nbaId).show();
            } else {
                $('#DivDepositMethodEpsco' + nbaId).remove();
            }

            if (currentNba.hasDepositAutopay) {
                $('#DivDepositMethodAutopay' + nbaId).show();
                if (eftConfig.autopayInfo.Charge > 0) {
                    $('#lbl_method_autopay_3' + nbaId).show();
                    $('#lbl_method_autopay_3' + nbaId).html(get_display_lang('lbl_deposit_method_fee').replace('###', CommaFormatted(eftConfig.autopayInfo.Charge)));
                } else {
                    $('#lbl_method_autopay_3' + nbaId).hide();
                }
            } else {
                $('#DivDepositMethodAutopay' + nbaId).remove();
            }

            //Other means
            if (currentNba.hasDepositFps && !$('#rd_fps' + nbaId).is(':disabled')) {
                if ($('#rd_fps' + nbaId).is(':disabled')) {
                    methodDiv.children('Div:gt(1)').hide();
                    methodDiv.children('Div:gt(0)').attr("data-hide", 'hide');
                } else {
                    methodDiv.children('Div:gt(0)').hide();
                    methodDiv.children('Div').attr("data-hide", 'hide');
                }

                if (methodDiv.children('Div[data-hide=hide]').length > 1) {
                    $('#lnkOtherMeans' + nbaId).show();
                    $('#lnkOtherMeans' + nbaId).html(get_display_lang('lnk_other_means'));
                } else {
                    $('#lnkOtherMeans' + nbaId).hide();
                }
            }

            //select default
            methodDiv.find('input:enabled:first').prop("checked", true);
            switch (transactionIndicator) {
                case bankAccType.nba1:
                    nba1TransactionType = $("#DivDepositMethodListNBA1").find("input[name='method']:checked").val();
                    if (nba1TransactionType) {
                        $('#trans_amount').prop("disabled", false);
                        $('#btnDepositNext').prop('disabled', false);
                    } else {
                        $('#trans_amount').prop("disabled", true);
                        $('#btnDepositNext').prop('disabled', true);
                    }
                    break;
                case bankAccType.nba2:
                    nba2TransactionType = $("#DivDepositMethodListNBA2").find("input[name='method']:checked").val();
                    if (nba2TransactionType) {
                        $('#trans_amount').prop("disabled", false);
                        $('#btnDepositNext').prop('disabled', false);
                    } else {
                        $('#trans_amount').prop("disabled", true);
                        $('#btnDepositNext').prop('disabled', true);
                    }
                    break;
            }
            if (!methodDiv.find('input:checked').val()) {
                $('#lbl_eftnote').html("");
                $('#trans_amount').attr("disabled", "disabled");
                $('#btnDepositNext').attr("disabled", "disabled");
            } else {
                $('#trans_amount').removeAttr("disabled");
                $('#btnDepositNext').removeAttr("disabled");
            }
            $('#DivDepositMethodListPPS').hide();
        } else if ($('#DivDepositTypePps').hasClass("eft_deposit_selection_selected")) {
            $('#DivDepositMethod').show();
            $('#DivDepositMethodListNBA1').hide();
            $('#DivDepositMethodListNBA2').hide();
            $('#DivDepositMethodListPPS').show();
            if (eftConfig.ppsInfo.Charge > 0) {
                $('#lbl_method_pps_3').show();
            }
            $('#trans_amount').prop("disabled", false);
            $('#btnDepositNext').prop('disabled', false);
            //check PPS EoD
            CheckPpsEod();
        } else {
            $('#DivDepositMethod').hide();
        }
    }
}

function toggleOtherMeans() {
    var methodDiv = $('#DivDepositMethodList' + transactionIndicator);
    var nbaId;
    if (transactionIndicator == "NBA1") {
        nbaId = "_nba1";
    }

    if (transactionIndicator == "NBA2") {
        nbaId = "_nba2";
    }

    if (methodDiv.children('Div:hidden').length >= 1) {
        methodDiv.children('Div:hidden').attr("data-hide", 'hide');
        methodDiv.children('Div').slideDown();
        $('#lnkOtherMeans' + nbaId).html(get_display_lang('lnk_show_less'));
    } else {
        var items = methodDiv.children('Div[data-hide=hide]');
        for (i = 0; i <= items.length; i++) {
            if (!$(items[i]).children('Input').prop("checked")) {
                $(items[i]).slideUp();
            }
        }
        $('#lnkOtherMeans' + nbaId).html(get_display_lang('lnk_other_means'));
    }
}

function setDepositNbaHeight() {
    if (eftAction == eftActions.deposit) {
        if ($('#DivDepositNba').is(":visible")) {
            if ($('#DivDepositNba').height() < $('#DivDepositPps').height()) {
                $('#DivDepositNba').css("min-height", $('#DivDepositPps').height() + "px");
            }
        }
    }
}

function setYellowBar() {
    if (eftConfig.ppsInfo.IsEnablePPSG) {

        if (!nba1TransactionType && !nba2TransactionType) {
            if ((GetDataStore('primarynba_bankacno') && GetDataStore("primarynba_status") == "1") ||
                (GetDataStore('secondarynba_bankacno') && GetDataStore("secondarynba_status") == "1")) {

                //has FPS but bank maintenance
                if (GetDataStore('primarynba_FPSeDDAStatus') == "AP" || GetDataStore('secondarynba_FPSeDDAStatus') == "AP") {
                    $('#lblRequestNoNba').html(get_display_lang("lbl_bank_maintenance"));
                    $('#RequestYellowBar').css('display', 'flex');
                    return;
                }

                if (eftConfig.fpsInfo.IsEnableLink) {
                    if (GetDataStore('primarynba_FPSPStatus') == "1" || GetDataStore('secondarynba_FPSPStatus') == "1") {
                        $('#lblRequestNoNba').html(get_display_lang("lbl_no_nba_linkup"));
                        $('#RequestYellowBar').css('display', 'flex');;
                        $('#DivLinkNow').show();
                    } else {
                        $('#lblRequestNoNba').html(get_display_lang("lbl_bank_maintenance"));
                        $('#RequestYellowBar').css('display', 'flex');;
                    }
                } else {
                    $('#lblRequestNoNba').html(get_display_lang('lbl_no_fps'));
                    $('#RequestYellowBar').css('display', 'flex');;
                    $('#DivLinkNow').hide();
                }
            } else {
                var msg = get_display_lang('lbl_no_nba');
                if (eftConfig.fpsInfo.IsEnableLink) {
                    msg = msg + " " + get_display_lang("lbl_no_nba_link");
                    msg = msg + " " + get_display_lang("lbl_fps_bank_url").replace("@@@", GetLanguage());
                }
                $('#lblRequestNoNba').html(msg);
                $('#RequestYellowBar').css('display', 'flex');
            }
        }
    }
}

function setNoEft() {
    var noEft = false;
    $("#lbl_NoNba_Link").html('');

    if (eftAction == eftActions.deposit) {
        if (!nba1TransactionType && !nba2TransactionType && !eftConfig.ppsInfo.IsEnablePPSG) {
            noEft = true;
        }
    } else if (eftAction == eftActions.withdrawal) {
        if (!nba1TransactionType) {
            noEft = true;
        }
    }

    if (noEft) {
        $("#DivRequest").hide();

        //at least one NBA is not disabled
        var hasActiveNba = false;


        if (eftAction == eftActions.deposit) {
            if ((GetDataStore('primarynba_bankacno') && GetDataStore("primarynba_status") == "1") ||
                (GetDataStore('secondarynba_bankacno') && GetDataStore("secondarynba_status") == "1")) {
                hasActiveNba = true;
            }
        }

        if (eftAction == eftActions.withdrawal) {
            if (GetDataStore('primarynba_bankacno') && GetDataStore("primarynba_status") == "1") {
                hasActiveNba = true;
            }
        }

        if (hasActiveNba) {
            if (eftConfig.fpsInfo.IsEnable) {
                if ((eftAction == eftActions.deposit && !GetDataStore('primarynba_bankacno') && !GetDataStore('secondarynba_bankacno')) ||
                    (eftAction == eftActions.withdrawal && !GetDataStore('primarynba_bankacno'))) {
                    if (eftConfig.fpsInfo.IsEnable) {
                        $("#lbl_NoNba").html(get_display_lang("lbl_no_nba"));
                        if (eftConfig.fpsInfo.IsEnableLink) {
                            $("#lbl_NoNba_Link").html(get_display_lang("lbl_no_nba_link"));
                            $("#lbl_NoNba_Link").append(get_display_lang("lbl_fps_bank_url"));
                        }
                    } else {
                        $("#lbl_NoNba").html(get_display_lang("lbl_no_nba"));
                        $("#lbl_NoNba_Link").html(get_display_lang("lbl_fps_bank_url"));
                    }
                } else {
                    //FPS bank maintainence
                    if (GetDataStore("primarynba_FPSeDDAStatus") == "AP" || GetDataStore("secondarynba_FPSeDDAStatus") == "AP") {
                        if ((GetDataStore("primarynba_FPSeDDAStatus") == "AP" && GetDataStore("primarynba_FPSPStatus") == "0") ||
                            (GetDataStore("secondarynba_FPSeDDAStatus") == "AP" && GetDataStore("secondarynba_FPSPStatus") == "0")) {
                            $("#lbl_NoNba").html(get_display_lang("lbl_bank_maintenance"));
                        }
                        if (GetDataStore('primarynba_FPSeDDADepositEnable').toUpperCase() != "TRUE" || GetDataStore('primarynba_FPSwithdrawalEnable').toUpperCase() != "TRUE") {
                            $("#lbl_NoNba").html(get_display_lang("lbl_bank_maintenance"));
                        }
                    } else if (eftConfig.fpsInfo.IsEnableLink) {
                        $("#lbl_NoNba").html(get_display_lang("lbl_no_nba_linkup"));
                        $('#btnNoNbaLink').show();
                    } else {
                        $("#lbl_NoNba").html(get_display_lang("lbl_no_fps"));
                    }
                }
            } else {
                if ((eftAction == eftActions.deposit && !GetDataStore('primarynba_bankacno') && !GetDataStore('secondarynba_bankacno')) ||
                    (eftAction == eftActions.withdrawal && !GetDataStore('primarynba_bankacno'))) {
                    $("#lbl_NoNba").html(get_display_lang("lbl_no_nba"));
                    if (eftConfig.fpsInfo.IsEnableLink) {
                        $("#lbl_NoNba_Link").html(get_display_lang("lbl_no_nba_link"));
                        $("#lbl_NoNba_Link").append(get_display_lang("lbl_fps_bank_url"));
                    }
                } else {
                    if (GetDataStore("primarynba_FPSeDDAStatus") == "AP" || GetDataStore("secondarynba_FPSeDDAStatus") == "AP" ||
                        eftConfig.autopayInfo.IsEnabledDDA != "1") {
                        $("#lbl_NoNba").html(get_display_lang("lbl_bank_maintenance"));
                    } else {
                        if (eftConfig.fpsInfo.IsEnableLink) {
                            $("#lbl_NoNba").html(get_display_lang("lbl_no_nba_linkup"));
                            $('#btnNoNbaLink').show();
                        } else {
                            $("#lbl_NoNba").html(get_display_lang("lbl_no_fps"));
                        }
                    }
                }
            }
        } else {
            $("#lbl_NoNba").html(get_display_lang("lbl_no_nba"));
            if (eftConfig.fpsInfo.IsEnableLink) {
                $("#lbl_NoNba_Link").html(get_display_lang("lbl_no_nba_link"));
                $("#lbl_NoNba_Link").append(get_display_lang("lbl_fps_bank_url"));
            }
        }

        if (eftConfig.enableDepositOtherMeans &&
            ((eftAction == eftActions.deposit && (nba1.hasDepositFps || nba2.hasDepositFps)) ||
                (eftAction == eftActions.withdrawal && nba1.hasDepositFps))) {
            $('#DivRequest').show();
            return false;
        } else {
            $("#DivNoNba").show();
        }
    }
    return noEft;
}

function parseDateTime(input) {
    var parts;
    if (input.indexOf('T') > -1) {
        parts = input.split("T");
    } else {
        parts = input.split(" ");
    }
    var d = parts[0].split('-');
    var t = parts[1].split(':');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(d[0], d[1] - 1, d[2], t[0], t[1]); // Note: months are 0-based
}

function GetBanner() {
    var banner = JSON.parse(fpsBannerInfo);
    if (banner != null && banner != "null") {
        var startTime = parseDateTime(banner.FPSBannerControl.StartTime);
        var endTime = parseDateTime(banner.FPSBannerControl.EndTime);
        var now = new Date();
        var lang = GetLanguage();

        if (now > startTime && now < endTime) {
            if (banner.FPSBannerControl.Image[lang]) {
                var imgSrc = banner.FPSBannerControl.Image[lang]["@path"];
                imgSrc = "//" + document.location.hostname + "/wcas" + imgSrc;

                $('#imgBanner').prop('src', imgSrc);
                $('#imgBannerLink').prop('src', imgSrc);

                if (lang == 0) {
                    if (banner.FPSBannerControl.ImageLoaderUrlEN) {
                        $('#aBanner').prop('href', banner.FPSBannerControl.ImageLoaderUrlEN);
                        $('#aBanner').prop('target', banner.FPSBannerControl.ImageTargetEN)
                        $('#aBannerLink').prop('href', banner.FPSBannerControl.ImageLoaderUrlEN);
                        $('#aBannerLink').prop('target', banner.FPSBannerControl.ImageTargetEN)
                    }
                } else {
                    if (banner.FPSBannerControl.ImageLoaderUrlTC) {
                        $('#aBanner').prop('href', banner.FPSBannerControl.ImageLoaderUrlTC);
                        $('#aBanner').prop('target', banner.FPSBannerControl.ImageTargetTC)
                        $('#aBannerLink').prop('href', banner.FPSBannerControl.ImageLoaderUrlTC);
                        $('#aBannerLink').prop('target', banner.FPSBannerControl.ImageTargetTC)
                    }
                }

                $('#DivBanner').show();
                $('#DivBannerLink').show();
            }
        }
    }
}

function CheckPpsEod() {
    if (transactionIndicator == bankAccType.pps) {
        if (eftConfig.ppsInfo.IsEnable == false) {
            if (eftConfig.ppsInfo.ppsXMins) {
                $('#trans_amount').prop("disabled", true);
                $('#btnDepositNext').prop('disabled', true);
            }
        }
    }
}

function OnChangeTransFrom(isSetDepositMethod) {
    if (eftAction == eftActions.deposit) {
        transactionIndicator = $("input[name='trans_from_to']:checked").val();
        if (eftConfig.enableDepositOtherMeans) {
            switch (transactionIndicator) {
                case bankAccType.nba1:
                    if ($("#DivDepositMethodListNBA1").find("input[name='method']:checked").val()) {
                        nba1TransactionType = $("#DivDepositMethodListNBA1").find("input[name='method']:checked").val();
                    }
                    break;
                case bankAccType.nba2:
                    if ($("#DivDepositMethodListNBA2").find("input[name='method']:checked").val()) {
                        nba2TransactionType = $("#DivDepositMethodListNBA2").find("input[name='method']:checked").val();
                    }
                    break;

            }
        }
        //check PPS EoD
        CheckPpsEod();
    }
    if (eftAction == eftActions.withdrawal) {
        transactionIndicator = bankAccType.nba1;
    }
    $('#lbl_eftnote').show();
    switch (transactionIndicator) {
        case bankAccType.nba1:
            if (isSetDepositMethod && eftConfig.enableDepositOtherMeans) {
                setDepositMethod();
            }
            switch (nba1TransactionType) {
                case transactionType.fps:
                    //Update min/max deposit amount
                    if (eftAction == eftActions.deposit) {
                        minDeposit = eftConfig.fpsInfo.MinDeposit;
                        maxDeposit = eftConfig.fpsInfo.MaxDeposit;
                        if (eftConfig.enableDepositOtherMeans) {
                            $('#lbl_eftnote').html(get_display_lang("lbl_deposit_minimum_fps2"));
                        } else {
                            $('#lbl_eftnote').html(get_display_lang("lbl_deposit_minimum_fps").replace("@@@", CommaFormatted(minDeposit)) + get_display_lang("lbl_deposit_minimum_fps2"));
                        }
                    }
                    if (eftAction == eftActions.withdrawal) {
                        minWithdrawal = GetSmallerNum(eftConfig.fpsInfo.MinWithdrawal, eftConfig.autopayInfo.MinWithdrawal);
                        maxWithdrawal = GetLargerNum(eftConfig.fpsInfo.MaxWithdrawal, eftConfig.autopayInfo.MaxWithdrawal);
                        $('#lbl_eftnote').html(get_display_lang("lbl_withdrawal_limit_fps")
                            .replace("@@@", CommaFormatted(eftConfig.fpsInfo.MinWithdrawal))
                            .replace("###", CommaFormatted(eftConfig.fpsInfo.MaxWithdrawal))
                            .replace("~~~", CommaFormatted(eftConfig.autopayInfo.MaxWithdrawal)));
                    }
                    break;
                case transactionType.epsco:
                    //Update min/max deposit amount
                    if (eftAction == eftActions.deposit) {
                        minDeposit = eftConfig.epscoInfo.MinDeposit;
                        maxDeposit = eftConfig.epscoInfo.MaxDeposit;
                        if (eftConfig.enableDepositOtherMeans) {
                            $('#lbl_eftnote').html("");
                        } else {
                            $('#lbl_eftnote').html(get_display_lang("lbl_deposit_minimum_epsco")
                                .replace("@@@", CommaFormatted(minDeposit)));
                        }


                    }
                    if (eftAction == eftActions.withdrawal) {
                        minWithdrawal = GetSmallerNum(eftConfig.epscoInfo.MinWithdrawal, eftConfig.autopayInfo.MinWithdrawal);
                        maxWithdrawal = GetLargerNum(eftConfig.epscoInfo.MaxWithdrawal, eftConfig.autopayInfo.MaxWithdrawal);
                        $('#lbl_eftnote').html(get_display_lang("lbl_withdrawal_limit_epsco")
                            .replace("@@@", CommaFormatted(eftConfig.epscoInfo.MinWithdrawal))
                            .replace("###", CommaFormatted(eftConfig.epscoInfo.MaxWithdrawal))
                            .replace("~~~", CommaFormatted(eftConfig.autopayInfo.MaxWithdrawal)));
                    }
                    break;
                case transactionType.autopay:
                    //Update min/max deposit amount
                    if (eftAction == eftActions.deposit) {
                        minDeposit = eftConfig.autopayInfo.MinDeposit;
                        maxDeposit = GetSmallerNum(eftConfig.autopayInfo.MaxDeposit, GetDataStore('dda_transferLimit'));
                        if (eftConfig.enableDepositOtherMeans) {
                            $('#lbl_eftnote').html("");
                        } else {
                            $('#lbl_eftnote').html(get_display_lang("lbl_deposit_minimum") + "$" + CommaFormatted(minDeposit));
                        }
                    }
                    if (eftAction == eftActions.withdrawal) {
                        minWithdrawal = eftConfig.autopayInfo.MinWithdrawal;
                        maxWithdrawal = eftConfig.autopayInfo.MaxWithdrawal;
                        $('#lbl_eftnote').html(get_display_lang("lbl_withdrawal_limit_autopay").replace("@@@", CommaFormatted(eftConfig.autopayInfo.MaxWithdrawal)));
                    }
                    break;
                default:
                    $('#lbl_eftnote').html("");
                    break;

            }
            break;
        case bankAccType.nba2:
            if (isSetDepositMethod && eftConfig.enableDepositOtherMeans) {
                setDepositMethod();
            }
            switch (nba2TransactionType) {
                case transactionType.fps:
                    //Update min/max deposit amount
                    if (eftAction == eftActions.deposit) {
                        minDeposit = eftConfig.fpsInfo.MinDeposit;
                        maxDeposit = eftConfig.fpsInfo.MaxDeposit;
                        if (eftConfig.enableDepositOtherMeans) {
                            $('#lbl_eftnote').html(get_display_lang("lbl_deposit_minimum_fps2"));
                        } else {
                            $('#lbl_eftnote').html(get_display_lang("lbl_deposit_minimum_fps").replace("@@@", CommaFormatted(minDeposit)) + get_display_lang("lbl_deposit_minimum_fps2"));
                        }
                    }
                    break;
                case transactionType.epsco:
                    //Update min/max deposit amount
                    if (eftAction == eftActions.deposit) {
                        minDeposit = eftConfig.epscoInfo.MinDeposit;
                        maxDeposit = eftConfig.epscoInfo.MaxDeposit;
                        if (eftConfig.enableDepositOtherMeans) {
                            $('#lbl_eftnote').html("");
                        } else {
                            $('#lbl_eftnote').html(get_display_lang("lbl_deposit_minimum_epsco").replace("@@@", CommaFormatted(minDeposit)));
                        }


                    }
                    break;
                case transactionType.autopay:
                    //Update min/max deposit amount
                    if (eftAction == eftActions.deposit) {
                        minDeposit = eftConfig.autopayInfo.MinDeposit;
                        maxDeposit = GetSmallerNum(eftConfig.autopayInfo.MaxDeposit, GetDataStore('dda_transferLimit'));
                        if (eftConfig.enableDepositOtherMeans) {
                            $('#lbl_eftnote').html("");
                        } else {
                            $('#lbl_eftnote').html(get_display_lang("lbl_deposit_minimum") + "$" + CommaFormatted(minDeposit));
                        }


                    }
                    break;
            }

            break;
        case bankAccType.pps:
            if (eftConfig.ppsInfo.IsEnable && eftConfig.ppsInfo.Charge > 0) {
                $("#lbl_eftnote").html(get_display_lang("lbl_eftnote_pps").replace('###', CommaFormatted(eftConfig.ppsInfo.Charge)));
            } else {
                $("#lbl_eftnote").html("");
            }
            minDeposit = eftConfig.ppsInfo.MinDeposit;
            maxDeposit = eftConfig.ppsInfo.MaxDeposit;
            break;
        default:
            $("#lbl_eftnote").html("");
            break;
    }
}

function OnClickEftNext() {
    if (isButtonDisabled)
        return;

    EnableButtons(false);

    //validate amount
    amount = $('#trans_amount').val();
    var validAmount = true;

    if (amount == '') {
        alert(get_display_lang('miss_amount'));
        validAmount = false;
        EnableButtons(true);
        return;
    }

    if (!ChkAmt(amount)) {
        alert(get_display_lang('invalid_amount'));
        validAmount = false;
        EnableButtons(true);
        return;
    }

    if (validAmount) {
        if (eftAction == eftActions.deposit) {
            transactionIndicator = $("input[name='trans_from_to']:checked").val();
            //invalid range
            if (minDeposit > maxDeposit) {
                alert(get_display_lang('err_dda_limit'));
                validAmount = false;
                EnableButtons(true);
                return;
            }

            if (amount < minDeposit || amount > maxDeposit) {
                var tt;
                if (transactionIndicator == "NBA1") {
                    tt = nba1TransactionType;
                }

                if (transactionIndicator == "NBA2") {
                    tt = nba2TransactionType;
                }

                switch (tt) {
                    case transactionType.fps:
                        alert(get_display_lang('err_fps_between').replace('@@@', CommaFormatted(minDeposit)).replace('###', CommaFormatted(maxDeposit)));
                        break;
                    case transactionType.epsco:
                        alert(get_display_lang('err_epsco_between').replace('@@@', CommaFormatted(minDeposit)).replace('###', CommaFormatted(maxDeposit)));
                        break;
                    case transactionType.autopay:
                        alert(get_display_lang('err_autopay_between').replace('@@@', CommaFormatted(minDeposit)).replace('###', CommaFormatted(maxDeposit)));
                        break;
                    case transactionType.pps:
                        alert(get_display_lang('err_pps_between').replace('@@@', CommaFormatted(minDeposit)).replace('###', CommaFormatted(maxDeposit)));
                        break;
                    default:
                        alert(get_display_lang('lbl_online_deposit') + get_display_lang('err_range1') + CommaFormatted(minDeposit) + get_display_lang('err_range2') + CommaFormatted(maxDeposit));
                        break;
                }

                validAmount = false;
                EnableButtons(true);
                return;
            }
        }
        if (eftAction == eftActions.withdrawal) {
            transactionIndicator = bankAccType.nba1;
            if (amount < minWithdrawal || amount > maxWithdrawal) {
                alert(get_display_lang('err_autopay_withdrawal_between').replace('@@@', CommaFormatted(eftConfig.autopayInfo.MinWithdrawal)).replace('###', CommaFormatted(eftConfig.autopayInfo.MaxWithdrawal)));

                validAmount = false;
                EnableButtons(true);
                return;
            } else {
                switch (nba1TransactionType) {
                    case transactionType.fps:
                        if (amount < eftConfig.fpsInfo.MinWithdrawal || amount > eftConfig.fpsInfo.MaxWithdrawal) {
                            perviousNba1TransactionType = transactionType.fps;
                            nba1TransactionType = transactionType.autopay;
                        }
                        break;
                    case transactionType.epsco:
                        if (amount < eftConfig.epscoInfo.MinWithdrawal || amount > eftConfig.epscoInfo.MaxWithdrawal) {
                            perviousNba1TransactionType = transactionType.epsco;
                            nba1TransactionType = transactionType.autopay;
                        }
                        break;
                }
            }
        }
    } else {
        EnableButtons(true);
        return;
    }

    $('#DivRequest').hide();
    DisplayPreview();
}


function DisplayPreview() {
    $('#DivConfirmCharge').hide();
    //Show preview screen
    $('#lblPreviewAmountValue').html(CommaFormatted(CurrencyFormatted(amount)));
    $('#lblPreviewBetAcc').html(GetDataStore('account'));
    $('#DivPreviewTransType').show();

    //UI From and To
    if (eftAction == eftActions.deposit) {
        $('#DivConfirmBank').each(function() {
            if (!$(this).text().match(/^\s*$/)) {
                $(this).insertBefore($(this).prev('#DivConfirmBet'));
            }
        });

        $('#lblPreviewTo').html(get_display_lang('lbl_to'));
        $('#lblPreviewFrom').html(get_display_lang('lbl_from'));
    }

    if (eftAction == eftActions.withdrawal) {
        $('#DivConfirmBet').each(function() {
            if (!$(this).text().match(/^\s*$/)) {
                $(this).insertBefore($(this).prev('#DivConfirmBank'));
            }
        });

        $('#lblPreviewTo').html(get_display_lang('lbl_from'));
        $('#lblPreviewFrom').html(get_display_lang('lbl_to'));
    }

    switch (transactionIndicator) {
        case bankAccType.nba1:
            $('#lblPreviewBankName').html(GetDataStore('primarynba_bankname'));
            $('#lblPreviewBankAcc').html(maskAccNo(GetDataStore('primarynba_bankacno')));
            switch (nba1TransactionType) {
                case transactionType.fps:
                    $("#DivPreviewReminder").show();
                    if (eftAction == eftActions.deposit) {
                        $('#lblPreviewTransTypeValue').html(get_display_lang('lbl_trans_instant_deposit_fps'));
                        CheckDepositServiceCharge(transactionType.fps);
                    }
                    if (eftAction == eftActions.withdrawal) {
                        $('#lblPreviewTransTypeValue').html(get_display_lang('lbl_trans_instant_withdrawal_fps'));
                        CheckWithdrawalServiceCharge(transactionType.fps);
                    }
                    break;
                case transactionType.epsco:
                    $("#DivPreviewReminder").hide();
                    if (eftAction == eftActions.deposit) {
                        $('#lblPreviewTransTypeValue').html(get_display_lang('lbl_trans_instant_deposit_epsco'));
                        CheckDepositServiceCharge(transactionType.epsco);
                    }
                    if (eftAction == eftActions.withdrawal) {
                        $('#lblPreviewTransTypeValue').html(get_display_lang('lbl_trans_instant_withdrawal_epsco'));
                        CheckWithdrawalServiceCharge(transactionType.epsco);
                    }
                    $('#DivBankPin').show();
                    //show autopay option
                    if ((GetDataStore("hasValidAutopayDepositAcc") == 1 && eftConfig.toggleOtherMeans == false) || eftAction == eftActions.withdrawal) {
                        $('#DivPreviewTransType').hide();
                        $('#DivPreviewUseEpsco').show();
                        $('#DivPreviewUseAutopay').show();
                        $('#DivPreviewUseLabel').show();
                    }
                    clrPin();
                    genRandBtn();
                    break;
                case transactionType.autopay:
                    $("#DivPreviewReminder").show();
                    if (eftAction == eftActions.deposit) {
                        $('#lblPreviewTransTypeValue').html(get_display_lang('lbl_deposit_autopay'));
                        CheckDepositServiceCharge(transactionType.autopay);
                    }
                    if (eftAction == eftActions.withdrawal) {
                        $('#lblPreviewTransTypeValue').html(get_display_lang('lbl_withdrawal_autopay') + get_display_lang('lbl_withdrawal_autopay_once'));
                        CheckWithdrawalServiceCharge(transactionType.autopay);
                    }
                    break;
            }
            $('#DivConfirm').show();
            break;

        case bankAccType.nba2:
            $('#lblPreviewBankName').html(GetDataStore('secondarynba_bankname'));
            $('#lblPreviewBankAcc').html(maskAccNo(GetDataStore('secondarynba_bankacno')));
            switch (nba2TransactionType) {
                case transactionType.fps:
                    //deposit only
                    $('#lblPreviewTransTypeValue').html(get_display_lang('lbl_trans_instant_deposit_fps'));
                    CheckDepositServiceCharge(transactionType.fps);
                    $("#DivPreviewReminder").show();
                    break;
                case transactionType.epsco:
                    //deposit only
                    $('#lblPreviewTransTypeValue').html(get_display_lang('lbl_trans_instant_deposit_epsco'));
                    $('#DivBankPin').show();
                    clrPin();
                    $("#DivPreviewReminder").hide();
                    genRandBtn();
                    CheckDepositServiceCharge(transactionType.epsco);
                    break;
                case transactionType.autopay:
                    //deposit only
                    $('#lblPreviewTransTypeValue').html(get_display_lang('lbl_deposit_autopay'));
                    $("#DivPreviewReminder").show();
                    CheckDepositServiceCharge(transactionType.autopay);
                    break;
            }
            $('#DivConfirm').show();
            break;

        case bankAccType.pps:
            $('#DivPPSRedirect').show();
            break;
    }
    EnableButtons(true);
}

function OnChangePreviewTrans() {
    var indicator = $("input[name='preview_eft_selection']:checked").val();
    switch (indicator) {
        case transactionType.autopay:
            if (transactionIndicator == bankAccType.nba1) {
                nba1TransactionType = transactionType.autopay;
            }
            $('#pin').attr("disabled", true);
            clrPin();
            break;
        case transactionType.epsco:
        default:
            if (transactionIndicator == bankAccType.nba1) {
                nba1TransactionType = transactionType.epsco;
            }
            if (transactionIndicator == bankAccType.nba2) {
                nba2TransactionType = transactionType.epsco;
            }
            $('#pin').removeAttr("disabled");
            break;

    }
}

function OnClickEftSubmit() {

    if (isButtonDisabled)
        return;

    EnableButtons(false);

    //UI To and From field
    if (eftAction == eftActions.deposit) {
        $('#DivReplyBank').each(function() {
            if (!$(this).text().match(/^\s*$/)) {
                $(this).insertBefore($(this).prev('#DivReplyBet'));
            }
        });

        $('#lblResultTo').html(get_display_lang('lbl_to'));
        $('#lblResultFrom').html(get_display_lang('lbl_from'));
    }

    if (eftAction == eftActions.withdrawal) {
        $('#DivReplyBet').each(function() {
            if (!$(this).text().match(/^\s*$/)) {
                $(this).insertBefore($(this).prev('#DivReplyBank'));
            }
        });

        $('#lblResultTo').html(get_display_lang('lbl_from'));
        $('#lblResultFrom').html(get_display_lang('lbl_to'));
    }

    switch (transactionIndicator) {
        case bankAccType.nba1:
            switch (nba1TransactionType) {
                case transactionType.fps:
                    //Show in progress
                    $('#DivConfirm').hide();
                    $('#DivConfirmCharge').hide();
                    SetResultIcon(resultIcon.Progress);

                    if (eftAction == eftActions.deposit) {
                        sendFPSDeposit(1, true, GetDataStore("primarynba_bankacno"), GetDataStore("primarynba_bankcode"), amount);
                    }
                    if (eftAction == eftActions.withdrawal) {
                        sendFPSWithdrawal(1, true, GetDataStore("primarynba_bankacno"), GetDataStore("primarynba_bankcode"), amount);
                    }
                    break;
                case transactionType.epsco:
                    if (IsValidPin()) {
                        //Show in progress
                        $('#DivConfirm').hide();
                        $('#DivConfirmCharge').hide();
                        SetResultIcon(resultIcon.Progress);

                        $('#lblResultBankName').html(GetDataStore("primarynba_bankname"));
                        if (eftAction == eftActions.deposit) {
                            sendEFT(1, true, amount, g_pin, "5", "");
                        }
                        if (eftAction == eftActions.withdrawal) {
                            sendEFT(1, true, amount, g_pin, "6", "0");
                        }
                    } else {
                        EnableButtons(true);
                        return false;
                    }
                    break;
                case transactionType.autopay:
                    //Show in progress
                    $('#DivConfirm').hide();
                    $('#DivConfirmCharge').hide();
                    SetResultIcon(resultIcon.Progress);

                    if (eftAction == eftActions.deposit) {
                        sendAutopayRequest(1, true, amount, g_pin);
                    }
                    if (eftAction == eftActions.withdrawal) {
                        sendEFT(1, true, amount, "00000000", "6", "1");
                    }
                    break;
            }
            break;

        case bankAccType.nba2:
            switch (nba2TransactionType) {
                case transactionType.fps:
                    //Show in progress
                    $('#DivConfirm').hide();
                    $('#DivConfirmCharge').hide();
                    SetResultIcon(resultIcon.Progress);

                    sendFPSDeposit(2, true, GetDataStore("secondarynba_bankacno"), GetDataStore("secondarynba_bankcode"), amount);
                    break;
                case transactionType.epsco:
                    if (IsValidPin()) {
                        //Show in progress
                        $('#DivConfirm').hide();
                        $('#DivConfirmCharge').hide();
                        SetResultIcon(resultIcon.Progress);

                        $('#lblResultBankName').html(GetDataStore("secondarynba_bankname"));
                        if (eftAction == eftActions.deposit) {
                            sendEFT(2, true, amount, g_pin, "5", "");
                        }
                        if (eftAction == eftActions.withdrawal) {
                            sendEFT(2, true, amount, g_pin, "5", "0");
                        }
                    } else {
                        EnableButtons(true);
                        return false;
                    }
                    break;
            }
            break;
    }


}

function OnClickConfirmAutopay() {
    $('#DivConfirmAutopay').hide();
    SetResultIcon(resultIcon.Progress);

    if (eftAction == eftActions.deposit) {
        sendAutopayRequest(1, true, amount, g_pin);
    }
    if (eftAction == eftActions.withdrawal) {
        nba1TransactionType = transactionType.autopay;
        sendEFT(1, true, amount, "00000000", "6", "1");
    }
}
// ************** FPS **************
function ProcessFPSInfoResult(msg) {
    if (msg.result != "0") {

        if (msg.result == "-2") {
            processSSOExtendResult(msg); // Support SSO
        }

        if (parseInt(msg.result) >= 100 && parseInt(msg.result) <= 120) {
            var errorMsg = GetError(msg.result);
            if (errorMsg) {
                alert(errorMsg);
                closeAllBetSlipOverlay();
            }
        }
    }

    EnableButtons(true);
}

function ProcessFPSInfoTimeout() {
    EnableButtons(true);
}

function sendFPSDeposit(nbaIndicator, needAdvSndSeqNo, bankAccountNo, bankCode, amount) {
    EnableButtons(false);
    var seqNo1 = GetNextSeqNo();
    var seqNo2 = seqNo1;
    if (needAdvSndSeqNo)
        seqNo2 = GetNextSeqNo();

    var para = {
        'lang': GetLanguage(),
        'bettingAccount': GetDataStore('account'),
        'sessionId': GetDataStore('session_id'),
        'apimId': GetDataStore('gu_id'),
        'seqNo': seqNo1,
        'seqNo2': seqNo2,
        'nbaIndicator': nbaIndicator,
        'bankAccountNo': bankAccountNo,
        'bankCode': bankCode,
        'firstName': GetDataStore('firstname'),
        'lastName': GetDataStore('lastname'),
        'transactionAmount': amount,
        'knownSSOGUID': GetDataStore('sso_guid'),
        'knownWebID': GetDataStore('sso_web_id')
    }
    sendFPSDepositRequest(para, ProcessFPSResult, ProcessFPSReplyTimeout, eftConfig.fpsInfo.TimeoutInMs);
}

function sendFPSWithdrawal(nbaIndicator, needAdvSndSeqNo, bankAccountNo, bankCode, amount) {
    EnableButtons(false);
    var seqNo1 = GetNextSeqNo();
    var seqNo2 = seqNo1;
    if (needAdvSndSeqNo)
        seqNo2 = GetNextSeqNo();

    var para = {
        'lang': GetLanguage(),
        'bettingAccount': GetDataStore('account'),
        'sessionId': GetDataStore('session_id'),
        'apimId': GetDataStore('gu_id'),
        'seqNo': seqNo1,
        'seqNo2': seqNo2,
        'bankAccountType': nbaIndicator,
        'bankAccountNo': bankAccountNo,
        'bankCode': bankCode,
        'firstName': GetDataStore('firstname'),
        'lastName': GetDataStore('lastname'),
        'transactionAmount': amount,
        'knownSSOGUID': GetDataStore('sso_guid'),
        'knownWebID': GetDataStore('sso_web_id')
    }
    sendFPSWithdrawalRequest(para, ProcessFPSResult, ProcessFPSReplyTimeout, eftConfig.fpsInfo.TimeoutInMs);
}

function getFPSTxnPara() {
    var seqNo = GetNextSeqNo();
    var para = {
        'lang': GetLanguage(),
        'acc': GetDataStore('account'),
        'sid': GetDataStore('session_id'),
        'apimId': GetDataStore('gu_id'),
        'seqNo': seqNo,
        'bettingAccount': GetDataStore('account'),
        'bankCode1': GetDataStore('primarynba_bankcode'),
        'bankAccountNo1': GetDataStore('primarynba_bankacno'),
        'bankCode2': GetDataStore('secondarynba_bankcode'),
        'bankAccountNo2': GetDataStore('secondarynba_bankacno'),
        'knownWebID': GetDataStore('sso_web_id'),
        'knownSSOGUID': GetDataStore('sso_guid'),
    };
    return sendFPSInfoRequest(para, ProcessFPSInfoResult, ProcessFPSInfoTimeout, eftConfig.fpsInfo.TimeoutInMs);
}

function ProcessFPSResult(msg) {

    if (msg.result == "0") {
        $('#lblResultBetAcc').html(GetDataStore('account'));
        if (eftAction == eftActions.deposit) {
            $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_deposit_fps"));
            if (msg.FPScurrentMonthlyDepCnt) {
                SetDataStore('FPScurrentMonthlyDepCnt', msg.FPScurrentMonthlyDepCnt);
            }
        }
        if (eftAction == eftActions.withdrawal) {
            $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_withdrawal_fps"));
        }

        switch (transactionIndicator) {
            case bankAccType.nba1:
                $('#lblResultBankName').html(GetDataStore("primarynba_bankname"));
                $('#lblResultBankAcc').html(maskAccNo(GetDataStore("primarynba_bankacno")));
                break;
            case bankAccType.nba2:
                $('#lblResultBankName').html(GetDataStore("secondarynba_bankname"));
                $('#lblResultBankAcc').html(maskAccNo(GetDataStore("secondarynba_bankacno")));
                break;
        }

        switch (msg.transStatus) {
            case "AP":
                SetResultIcon(resultIcon.Success);
                $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(msg.transAmt)));
                SetReference(msg.transactionNumber);
                SetBalance(msg.tbBal);
                SetResultServiceCharge(msg.serviceChargeAmt);
                writeCurrentSessionLogs(msg.tbBal, "ACCEPTED", msg.transactionNumber);
                break;
            case "PX":
            case "AA":
            case "MA":
            case "IP":
                SetResultIcon(resultIcon.Pending);
                $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(msg.transAmt)));
                SetReference(msg.transactionNumber);
                SetResultServiceCharge(null);
                writeCurrentSessionLogs(msg.tbBal, "UNKNOWN", "");
                break;
            case "AX":
            case "UX":
                if (eftAction == eftActions.deposit) {
                    SetResultIcon(resultIcon.Pending);
                    SetReference(msg.transactionNumber);
                    SetResultServiceCharge(null);
                }
                if (eftAction == eftActions.withdrawal) {
                    SetResultIcon(resultIcon.Timeout);
                    SetResultServiceCharge(msg.serviceChargeAmt);
                    SetReference(null);
                    SetReminder(get_display_lang('fps_deposit_ax_reminder'));
                }
                $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(msg.transAmt)));
                writeCurrentSessionLogs(msg.tbBal, "UNKNOWN", "");
                break;
            case "RJ":
                SetReference(null);
                if (eftAction == eftActions.deposit) {
                    SetResultIcon(resultIcon.Reject);
                    $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(msg.transAmt)));
                }
                if (eftAction == eftActions.withdrawal) {
                    if ((msg.errorType == "0" && msg.errorCode == "62") || (msg.errorType == "0" && msg.errorCode == "64")) {
                        //exceed amount / count limit, use Autopay
                        if (msg.errorCode == "62") {
                            $('#lbl_ConfirmAutopay').html(get_display_lang('lbl_withdrawal_exceed_limit'));
                            $('#txtConfirmAutopayMsg').html(get_display_lang('lbl_confirm_autopay_amount'));
                        }
                        if (msg.errorCode == "64") {
                            $('#lbl_ConfirmAutopay').html(get_display_lang('lbl_withdrawal_exceed_count'));
                            $('#txtConfirmAutopayMsg').html(get_display_lang('lbl_confirm_autopay_count'));
                        }
                        $('#btnConfirmAutopay').prop('value', get_display_lang('btn_continue_autopay'));
                        $('#btnConfirmAutopay').prop('title', get_display_lang('btn_continue_autopay'));
                        $('#DivReply').hide();
                        $('#DivProgress').hide();
                        $("#DivConfirmAutopay").show();
                        EnableButtons(true);
                        return;
                    } else {
                        SetResultIcon(resultIcon.Reject);
                        $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(amount)));
                        $('#lblResult').html(get_display_lang('lbl_rejected'));
                        $('#lblResultReject').html(get_display_lang('result_rejected_reason'));
                    }
                }

                var rejMsg = "";
                if (GetLanguage() == 1) {
                    rejMsg = msg.errorMsgTC + " (" + msg.errorCode + ")";
                } else {
                    rejMsg = msg.errorMsg + " (" + msg.errorCode + ")";
                }
                SetRejectReason(rejMsg);
                SetBalance(msg.tbBal);
                SetResultServiceCharge(null);
                writeCurrentSessionLogs(msg.tbBal, "REJECTED", rejMsg);
                break;
            default:
                SetResultIcon(resultIcon.Pending);
                SetReference(null);
                $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(amount)));
                writeCurrentSessionLogs(msg.tbBal, "UNKNOWN", "");
                break;
        }

        $('#DivReply').show();
        $('#DivReplyResult').show();
        $('#DivRequest').hide();
        $('#DivConfirm').hide();
        EnableButtons(true);
    } else {
        SetReference(null);

        if (msg.result == "-2") {
            processSSOExtendResult(msg); // Support SSO
        }

        if (parseInt(msg.result) >= 100 && parseInt(msg.result) <= 120) {
            var errorMsg = GetError(msg.result);
            if (errorMsg) {
                alert(errorMsg);
                closeAllBetSlipOverlay();
                return;
            }
        }
    }
}

function ProcessFPSReplyTimeout() {
    $('#lblResultBetAcc').html(GetDataStore('account'));
    $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(amount)));

    if (eftAction == eftActions.deposit) {
        $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_deposit_fps"));
    }
    if (eftAction == eftActions.withdrawal) {
        $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_withdrawal_fps"));
    }

    SetResultIcon(resultIcon.Timeout);

    switch (transactionIndicator) {
        case bankAccType.nba1:
            $('#lblResultBankName').html(GetDataStore('primarynba_bankname'));
            $('#lblResultBankAcc').html(maskAccNo(GetDataStore("primarynba_bankacno")));
            switch (nba1TransactionType) {
                case transactionType.epsco:
                    if (eftAction == eftActions.deposit) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_deposit_epsco"));
                    }
                    if (eftAction == eftActions.withdrawal) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_withdrawal_epsco"));
                    }
                    break;
                case transactionType.autopay:
                    if (eftAction == eftActions.deposit) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_deposit_autopay"));
                    }
                    if (eftAction == eftActions.withdrawal) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_withdrawal_autopay"));
                    }
                    break;
            }
            break;
        case bankAccType.nba2:
            $('#lblResultBankName').html(GetDataStore('secondarynba_bankname'));
            $('#lblResultBankAcc').html(maskAccNo(GetDataStore("secondarynba_bankacno")));
            switch (nba2TransactionType) {
                case transactionType.epsco:
                    if (eftAction == eftActions.deposit) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_deposit_epsco"));
                    }
                    break;
                case transactionType.autopay:
                    if (eftAction == eftActions.deposit) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_deposit_autopay"));
                    }
                    break;
            }
            break;
    }

    $('#DivRequest').hide();
    $('#DivConfirm').hide();
    $('#DivConfirmCharge').hide();
    $('#DivReply').show();
    $('#DivReplyResult').show();

    SetReminder(get_display_lang('eft_timeout_msg'));
    writeCurrentSessionLogs("", "UNKNOWN", "");

    EnableButtons(true);
}

function CheckDepositServiceCharge(transType) {
    var charge = 0;

    switch (transType) {
        case transactionType.fps:
            charge = eftConfig.fpsInfo.DepositCharge;
            if (GetDataStore("FPScurrentMonthlyDepCnt") >= eftConfig.fpsInfo.MonthlyDepositCount) {
                $('#btnPreviewSubmit').hide();
                $('#btnPreviewContinue').show();
            } else {
                $('#btnPreviewSubmit').show();
                $('#btnPreviewContinue').hide();
            }
            break;
        case transactionType.epsco:
            $('#btnPreviewSubmit').show();
            $('#btnPreviewContinue').hide();
            break;
        case transactionType.autopay:
            charge = eftConfig.autopayInfo.Charge;
            $('#btnPreviewSubmit').show();
            $('#btnPreviewContinue').hide();
            break;
    }

    if (charge > 0) {
        $('#lblPreviewCharge').html(get_display_lang('lbl_service_charge'));
        $('#DivPreviewCharge').show();
        $('#lblPreviewChargeValue').html(CommaFormatted(CurrencyFormatted(charge)));
    } else {
        $('#DivPreviewCharge').hide();
    }
}

function CheckWithdrawalServiceCharge(transType) {
    var charge = 0;
    //reset preview button
    $('#btnPreviewSubmit').show();
    $('#btnPreviewContinue').hide();

    switch (transType) {
        case transactionType.fps:
            charge = eftConfig.fpsInfo.WithdrawalCharge;
            break;
        case transactionType.autopay:
            if (eftAction == eftActions.deposit) {
                charge = eftConfig.autopayInfo.Charge;
            }
            break;
    }

    if (charge > 0) {
        $('#lblPreviewCharge').html(get_display_lang('lbl_service_charge'));
        $('#DivPreviewCharge').show();
        $('#lblPreviewChargeValue').html(CommaFormatted(CurrencyFormatted(charge)));
    } else {
        $('#DivPreviewCharge').hide();
    }
}

function ClearFPSInfo() {
    dataStore.removeItem("primarynba_FPSeDDAStatus");
    dataStore.removeItem("primarynba_FPSBankCode");
    dataStore.removeItem("primarynba_FPSerrorType");
    dataStore.removeItem("primarynba_FPSerrorCode");
    dataStore.removeItem("primarynba_FPSdailyDepMaxAmt");
    dataStore.removeItem("primarynba_FPSnotifyEDDAStatus");
    dataStore.removeItem("primarynba_FPSPStatus");
    dataStore.removeItem("primarynba_FPSwithdrawalEnable");
    dataStore.removeItem("primarynba_FPSeDDADepositEnable");

    dataStore.removeItem("secondarynba_FPSeDDAStatus");
    dataStore.removeItem("secondarynba_FPSBankCode");
    dataStore.removeItem("secondarynba_FPSerrorType");
    dataStore.removeItem("secondarynba_FPSerrorCode");
    dataStore.removeItem("secondarynba_FPSdailyDepMaxAmt");
    dataStore.removeItem("secondarynba_FPSnotifyEDDAStatus");
    dataStore.removeItem("secondarynba_FPSPStatus");
    dataStore.removeItem("secondarynba_FPSwithdrawalEnable");
    dataStore.removeItem("secondarynba_FPSeDDADepositEnable");

    dataStore.removeItem("FPScurrentMonthlyDepCnt");
    dataStore.removeItem("fps_status");
    dataStore.removeItem("fps_error");
}

function OnClickDisplayCharge() {

    if (eftAction == eftActions.deposit) {
        //FPS only
        if (transactionIndicator == bankAccType.nba1 && nba1TransactionType != transactionType.fps) {
            return;
        }

        if (transactionIndicator == bankAccType.nba2 && nba2TransactionType != transactionType.fps) {
            return;
        }

        if (GetDataStore("FPScurrentMonthlyDepCnt") >= eftConfig.fpsInfo.MonthlyDepositCount) {
            $("#lblConfirmChargeText").html(get_display_lang("lbl_deposit_confirm_charge").replace("@@@", CommaFormatted(CurrencyFormatted(eftConfig.fpsInfo.DepositMonthlyCharge))));
            $('#DivConfirmCharge').show();
            $('#DivConfirm').hide();
            EnableButtons(true);
        }
    }

}

// ************** EFT **************
function sendEFT(nbaIndicator, needAdvSndSeqNo, amount, PIN, eftType, withdrawType) {
    EnableButtons(false);
    var seqNo1 = GetNextSeqNo();
    var seqNo2 = seqNo1;
    if (needAdvSndSeqNo)
        seqNo2 = GetNextSeqNo();

    var para = {
        'lang': GetLanguage(),
        'acc': GetDataStore('account'),
        'webId': GetDataStore('webID'),
        'knownWebID': GetDataStore('sso_web_id'),
        'knownSSOGUID': GetDataStore('sso_guid'),
        'guid': GetDataStore('gu_id'),
        'sid': GetDataStore('session_id'),
        'seqNo': seqNo1,
        'seqNo2': seqNo2,
        'amount': amount,
        'PIN': PIN,
        'eftType': eftType,
        'showBal': true,
        'withdrawType': withdrawType,
        'nbaIndicator': nbaIndicator,
        'password': ""
    };
    sendEFTRequest(para, ProcessEFTResult, ProcessEFTReplyTimeout, eftConfig.epscoInfo.TimeoutInMs);

}

function IsValidPin() {
    if (g_pin.length < 1) {
        alert(get_display_lang('miss_eft_pin'));
        EnableButtons(true);
        return false;
    }

    if ((g_pin.length != 8 || !ChkNum(g_pin))) {
        alert(get_display_lang('invalid_eft_pin'));
        EnableButtons(true);
        return false;
    }
    return true;
}

function ProcessEFTResult(msg) {
    $('#lblResultBetAcc').html(GetDataStore('account'));
    $('#btnConfirmAutopayBack').attr('onClick', 'OnClickEftBack3()');
    switch (transactionIndicator) {
        case bankAccType.nba1:
            $('#lblResultBankName').html(GetDataStore('primarynba_bankname'));
            if (eftAction == eftActions.deposit) {
                $('#lblResultBankAcc').html(maskAccNo(GetDataStore("primarynba_bankacno")));
                $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_deposit"));
                switch (nba1TransactionType) {
                    case transactionType.epsco:
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_deposit_epsco"));
                        SetBalance(msg.tbBal);
                        break;
                }
            }
            if (eftAction == eftActions.withdrawal) {
                switch (nba1TransactionType) {
                    case transactionType.epsco:
                        $('#lblResultBankAcc').html(maskAccNo(GetDataStore("primarynba_bankacno")));
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_withdrawal_epsco"));
                        SetBalance(msg.tbBal);
                        break;
                    case transactionType.autopay:
                        $('#lblResultBankAcc').html(maskAccNo(GetDataStore("primarynba_bankacno")));
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_withdrawal_autopay"));
                        if (msg.eft_status == '0') {
                            if (eftAction == eftActions.deposit) {
                                SetReminder(get_display_lang('lbl_dda_deposit_accept_msg'));
                            }
                            if (eftAction == eftActions.withdrawal) {
                                SetReminder(get_display_lang('lbl_dda_withdrawal_accept_msg'));
                            }
                        }
                        SetBalance(null);
                        break;
                }

            }
            break;
        case bankAccType.nba2:
            $('#lblResultBankName').html(GetDataStore('secondarynba_bankname'));
            $('#lblResultBankAcc').html(maskAccNo(GetDataStore('secondarynba_bankacno')));
            if (eftAction == eftActions.deposit) {
                $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_deposit_epsco"));
                switch (nba2TransactionType) {
                    case transactionType.epsco:
                        SetBalance(msg.tbBal);
                        break;
                }
            }
            break;
        case bankAccType.pps:
            break;
    }

    if (msg.eft_status == '0') { //success
        SetResultIcon(resultIcon.Success);
        SetReference(msg.transNo);
        $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(msg.transAmt)));
        writeCurrentSessionLogs(msg.tbBal, 'ACCEPTED', msg.transNo);
    } else {
        SetReference(null);
        if (eftAction == eftActions.withdrawal) {
            //exceed limit or service not avaliable, use Autopay for withdrawal
            if ((transactionIndicator == bankAccType.nba1 && nba1TransactionType == transactionType.epsco) || (transactionIndicator == bankAccType.nba2 && nba2TransactionType == transactionType.epsco)) {
                if (msg.eft_errcode == "AMOUNT EXCEEDS LIMIT" ||
                    msg.eft_errcode == "TOO MANY WITHDRAWALS" ||
                    msg.eft_errcode == "EFT SERVICE NOT AVAILABLE" ||
                    msg.eft_errcode == "BANK SYSTEM FAULT" ||
                    msg.eft_errcode == "EPE PIN RETRY EXCEEDED" ||
                    msg.eft_errcode == "EPE PIN ERROR") {
                    if (msg.eft_errcode == "AMOUNT EXCEEDS LIMIT") {
                        $('#lbl_ConfirmAutopay').html(get_display_lang('lbl_withdrawal_exceed_limit'));
                        $('#txtConfirmAutopayMsg').html(get_display_lang('lbl_confirm_autopay_amount'));
                    }
                    if (msg.eft_errcode == "TOO MANY WITHDRAWALS") {
                        $('#lbl_ConfirmAutopay').html(get_display_lang('lbl_withdrawal_exceed_count'));
                        $('#txtConfirmAutopayMsg').html(get_display_lang('lbl_confirm_autopay_count'));
                    }
                    if (msg.eft_errcode == "EFT SERVICE NOT AVAILABLE" || msg.eft_errcode == "BANK SYSTEM FAULT") {
                        $('#lbl_ConfirmAutopay').html(get_display_lang('lbl_confirm_autopay_fault_header'));
                        $('#txtConfirmAutopayMsg').html(get_display_lang('lbl_confirm_autopay_fault'));
                    }
                    if (msg.eft_errcode == "EPE PIN RETRY EXCEEDED") {
                        $('#lbl_ConfirmAutopay').html(get_display_lang('lbl_withdrawal_incorrect_suspend'));
                        $('#txtConfirmAutopayMsg').html(get_display_lang('lbl_confirm_autopay_suspend'));
                    }
                    if (msg.eft_errcode == "EPE PIN ERROR") {
                        $('#lbl_ConfirmAutopay').html(get_display_lang('lbl_withdrawal_incorrect_pin'));
                        $('#txtConfirmAutopayMsg').html(get_display_lang('lbl_confirm_autopay_pin'));
                        $('#btnConfirmAutopayBack').attr('onClick', 'OnClickRetryEpsco()');
                    }
                    $('#btnConfirmAutopay').prop('value', get_display_lang('btn_continue_autopay'));
                    $('#btnConfirmAutopay').prop('title', get_display_lang('btn_continue_autopay'));
                    $("#DivProgress").hide();
                    $('#DivReply').hide();
                    $("#DivConfirmAutopay").show();
                    EnableButtons(true);
                    return;
                }
            }
        }

        //rejected
        $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(amount)));
        SetBalance(msg.tbBal);

        //display error message
        var errorCode = msg.eft_status;
        switch (errorCode) {
            case "-2":
                processSSOExtendResult(msg); // Support SSO
                break;
            case "-3":
                $('#lblResultRejectReason').html(get_display_lang('invalid_password'));
                break;

            case "-4":
                $('#lblResultRejectReason').html(get_display_lang('IW CANNOT ACCESS'));
                break;

            default:
                var resultMsg = '';
                if (msg.eft_error2 && msg.eft_error != msg.eft_error2) {
                    resultMsg = msg.eft_error + '<br>' + (msg.eft_error2 != undefined ? msg.eft_error2 : '');
                } else {
                    resultMsg = msg.eft_error;
                }
                $('#lblResultRejectReason').html(resultMsg);
                break;
        }

        var isTimeout = false;

        switch (msg.eft_errcode) {
            case "EPS BANK TIMEOUT":
            case "EFT BANK TIMEOUT WITHDRAWAL":
            case "EFT BANK TIME OUT WITHDRAWAL":
            case "BANK TIME OUT WITHDRAWAL":
                SetResultIcon(resultIcon.Pending);
                SetBalance(null);
                isTimeout = true;
                break;
            default:
                SetResultIcon(resultIcon.Reject);
                break;
        }

        if (isTimeout) {
            writeCurrentSessionLogs('', 'UNKNOWN', resultMsg);
            $('#lblResultReminder').html(resultMsg);
        } else {
            if (errorCode == '2') {
                writeCurrentSessionLogs('', 'ACCEPTED', msg.transNo);
            } else {
                if (resultMsg.indexOf('112') > 0) {
                    writeCurrentSessionLogs('', 'UNKNOWN', resultMsg);
                    $('#lblResultReminder').html(resultMsg);
                } else {
                    writeCurrentSessionLogs('', 'REJECTED', resultMsg);
                    $('#lblResultRejectReason').html(resultMsg);
                    SetRejectReason(resultMsg);
                }
            }
        }
    }

    $('#DivRequest').hide();
    $('#DivConfirm').hide();
    $('#DivReply').show();
    $('#DivReplyResult').show();
    sendBalanceRequest(true);

    EnableButtons(true);
}

function ProcessEFTReplyTimeout() {
    $('#lblResultBetAcc').html(GetDataStore('account'));
    $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(amount)));

    SetResultIcon(resultIcon.Timeout);
    $('#imgResult').src = get_display_lang('pic_path') + get_display_lang('pic_timeout');
    $('#lblResult').html(get_display_lang('lbl_timeout'));

    switch (transactionIndicator) {
        case bankAccType.nba1:
            $('#lblResultBankName').html(GetDataStore('primarynba_bankname'));
            $('#lblResultBankAcc').html(maskAccNo(GetDataStore("primarynba_bankacno")));
            switch (nba1TransactionType) {
                case transactionType.epsco:
                    if (eftAction == eftActions.deposit) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_deposit_epsco"));
                    }
                    if (eftAction == eftActions.withdrawal) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_withdrawal_epsco"));
                    }
                    break;
                case transactionType.autopay:
                    if (eftAction == eftActions.deposit) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_deposit_autopay"));
                    }
                    if (eftAction == eftActions.withdrawal) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_withdrawal_autopay"));
                    }
                    break;
            }
            break;
        case bankAccType.nba2:
            $('#lblResultBankName').html(GetDataStore('secondarynba_bankname'));
            $('#lblResultBankAcc').html(maskAccNo(GetDataStore("secondarynba_bankacno")));
            switch (nba2TransactionType) {
                case transactionType.epsco:
                    if (eftAction == eftActions.deposit) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_deposit_epsco"));
                    }
                    break;
                case transactionType.autopay:
                    if (eftAction == eftActions.deposit) {
                        $('#lblResultTransTypeValue').html(get_display_lang("lbl_deposit_autopay"));
                    }
                    break;
            }
            break;
    }

    $('#DivRequest').hide();
    $('#DivConfirm').hide();
    $('#DivReply').show();
    $('#DivReplyResult').show();

    SetReminder(get_display_lang('autopay_timeout_msg'));
    writeCurrentSessionLogs('', 'UNKNOWN', "");

    EnableButtons(true);
}

// ************** AUTOPAY **************
function isAutopay() {
    return $('deposit_method2').checked;
}

function getAutopayTxnPara() {
    EnableButtons(false);
    var sBankCode = GetDataStore('dda_shortBankCode');
    return sendDDAOperationRequest(sBankCode, ProcessGetDDATxnParaRequestResult, ProcessGetDDATxnParaReplyTimeout, eftConfig.autopayInfo.TimeoutInMs);
}

function sendAutopayRequest() { // call by user (when user click 'send' button will raise this event)
    EnableButtons(false);
    var seqNo = GetNextSeqNo();

    //opener.PreTxn(false);
    var amount = $('#trans_amount').val();
    var bankShortCode = GetDataStore("dda_shortBankCode");
    var ddaLimit = parseInt(GetDataStore("dda_transferLimit"));

    var password = '';

    var para = {
        'acc': GetDataStore('account'),
        'webId': GetDataStore('webID'),
        'knownWebID': GetDataStore('sso_web_id'),
        'knownSSOGUID': GetDataStore('sso_guid'),
        'guid': GetDataStore('gu_id'),
        'sid': GetDataStore('session_id'),
        'seqNo': seqNo,
        'amount': amount,
        'bankShortCode': bankShortCode,
        'ddaLimit': ddaLimit,
        'password': password
    };

    sendDDAAutopayRequest(para, ProcessDDARequestResult, ProcessDDARequestReplyTimeout, eftConfig.autopayInfo.TimeoutInMs);

}

function ProcessDDARequestResult(msg) {

    //display info
    $('#lblResultBetAcc').html(GetDataStore('account'));
    $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(amount)));
    if (eftAction == eftActions.deposit) {
        $('#lblResultTransTypeValue').html(get_display_lang("lbl_deposit_autopay"));
    }
    if (eftAction == eftActions.withdrawal) {
        $('#lblResultTransTypeValue').html(get_display_lang("lbl_withdrawal_autopay"));
    }

    switch (transactionIndicator) {
        case bankAccType.nba1:
            $('#lblResultBankName').html(GetDataStore('primarynba_bankname'));
            $('#lblResultBankAcc').html(maskAccNo(GetDataStore("primarynba_bankacno")));
            break;
        case bankAccType.nba2:
            $('#lblResultBankName').html(GetDataStore('secondarynba_bankname'));
            $('#lblResultBankAcc').html(maskAccNo(GetDataStore("secondarynba_bankacno")));
            break;
    }

    var result = msg.Result;
    if (result == "0") { //success
        SetResultIcon(resultIcon.Success);
        SetReference(msg.TransactionRefNum)
        if (eftAction == eftActions.deposit) {
            SetReminder(get_display_lang('lbl_dda_deposit_accept_msg'));
            SetResultServiceCharge(eftConfig.autopayInfo.Charge);
        }
        if (eftAction == eftActions.withdrawal) {
            SetReminder(get_display_lang('lbl_dda_withdrawal_accept_msg'));
        }
        SetBalance(null);
        // write current session log
        writeDDALog('ACCEPTED', msg.Result, msg.TransactionRefNum, amount);
    } else { //fail
        SetResultIcon(resultIcon.Reject);
        SetReference(null);
        SetRejectReason(get_display_lang('result_rejected_reason'));

        switch (msg.dda_status) {
            case "-2":
                processSSOExtendResult(msg);
                break;

            case "-4":
                $('#lblResultRejectReason').html(get_display_lang('IW CANNOT ACCESS'));
                break;

            case "-5":
                $('#lblResultRejectReason').html(get_display_lang("err_dda_limit"));
                break;

            default:
                var errMsg = get_display_lang(result);
                if (errMsg == undefined || errMsg == '')
                    errMsg = get_display_lang('lbl_dda_reject_msg').replace(/@@@/g, result);
                $('#lblResultRejectReason').html(errMsg);
                break;
        }
        writeDDALog('REJECTED', msg.Result, "", amount);
    }
    $('#DivRequest').hide();
    $('#DivConfirm').hide();
    $('#DivReply').show();
    $('#DivReplyResult').show();

    EnableButtons(true);
}

function ProcessDDARequestReplyTimeout() {

    $('#lblResultBetAcc').html(GetDataStore('account'));
    $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted(amount)));
    if (eftAction == eftActions.deposit) {
        $('#lblResultTransTypeValue').html(get_display_lang("lbl_deposit_autopay"));
    }
    if (eftAction == eftActions.withdrawal) {
        $('#lblResultTransTypeValue').html(get_display_lang("lbl_withdrawal_autopay"));
    }

    switch (transactionIndicator) {
        case bankAccType.nba1:
            $('#lblResultBankName').html(GetDataStore('primarynba_bankname'));
            $('#lblResultBankAcc').html(maskAccNo(GetDataStore("primarynba_bankacno")));
            break;
        case bankAccType.nba2:
            $('#lblResultBankName').html(GetDataStore('secondarynba_bankname'));
            $('#lblResultBankAcc').html(maskAccNo(GetDataStore("secondarynba_bankacno")));
            break;
    }
    SetBalance(null);
    SetResultIcon(resultIcon.Timeout);
    $('#DivRequest').hide();
    $('#DivConfirm').hide();
    $('#DivReply').show();
    $('#DivReplyResult').show();

    SetReminder(get_display_lang('autopay_timeout_msg'));
    writeCurrentSessionLogs('', 'UNKNOWN', "");
    EnableButtons(true);
}

function writeDDALog(status, result, refNum, amount) {
    // balance@@@status|||[txnNo|err]|||betType|||betDetails|||leagueCode|||amount
    var fmtAmt = CommaFormatted(CurrencyFormatted(amount));
    var record = "";
    if (result == 0) {
        var msgLabel = (refNum == null || refNum == '' || refNum == undefined) ? 'lbl_dda_request_no_ref_msg' : 'lbl_dda_request_msg';
        record = '@@@' + status +
            '|||' + '' +
            '|||' + '' +
            '|||' + get_display_lang(msgLabel).replace('##REF_NO##', refNum).replace('##AMOUNT##', '$' + fmtAmt) +
            '|||' + '' +
            '|||' + '$0.00';
    } else {
        record = '@@@' + status +
            '|||' + '' +
            '|||' + '' +
            '|||' + get_display_lang("lbl_dda_reject_msg").replace('@@@', result) +
            '|||' + '' +
            '|||' + '$0.00';
    }
    logDataAccessor.LogEFTRecord(record);
}

function ProcessGetDDATxnParaRequestResult(msg) {
    var result = msg.Result;
    if (result == "0") {
        var txnFee = msg.TransactionFee;
        eftConfig.autopayInfo.Charge = parseFloat(txnFee);
    } else {
        //get txn para error ...
    }
    EnableButtons(true);
}

function ProcessGetDDATxnParaReplyTimeout() {
    EnableButtons(true);
}

function EftCompleted() {
    if (eftAction == eftActions.withdrawal) {
        EftOnLoad(1);
    } else {
        EftOnLoad(0);
    }
}

// ************** PPS **************
function sendPPSDO() {
    EnableButtons(false);
    var amount = $('#trans_amount').val();
    var para = {
        'lang': GetLanguage(),
        'account': GetDataStore('account'),
        'knownWebID': GetDataStore('sso_web_id'),
        'knownSSOGUID': GetDataStore('sso_guid'),
        'guid': GetDataStore('gu_id'),
        'sessionID': GetDataStore('session_id'),
        'seqNo': GetNextSeqNo(),
        'amount': amount,
        'password': ""
    };
    sendPPSDORequest(para, ProcessPPSDOResult, ProcessPPSDOReplyTimeout, eftConfig.ppsInfo.TimeoutInMs);
}

function OnClickPPSRedirect() {
    EnableButtons(false);
    var ppsUrl = GetDataStore("PPS.PopupURL");
    //redirect to PPS only of DO request success  
    sendPPSDO();
}

function ProcessPPSDOResult(msg) {
    $('#lblResultBetAcc').html(GetDataStore('account'));
    $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_deposit"));
    $('#lblResultBankName').html(get_display_lang("lbl_from_pps"));
    $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted($('#trans_amount').val())));

    $("#DivPPSRedirect").hide();
    //check if password valid first
    if (msg.ppsdo_status == '-3') {
        alert(get_display_lang('invalid_password'));
        g_pin = '';
        $('#pin').val(g_pin);
        pwdField.clearInput();
        EnableButtons(true);
        return;
    }

    if (msg.ppsdo_status == '-4') {
        alert(get_display_lang('IW CANNOT ACCESS'));
        g_pin = '';
        $('#pin').val(g_pin);
        pwdField.clearInput();
        EnableButtons(true);
        return;
    }

    if (msg.ppsdo_status == '-5') {
        processSSOExtendResult(msg); // Support SSO
        $('#DivRequest').hide();
        $('#DivRequestButton').hide();

        $('#DivReply').show();
        $('#DivReplyResult').show();
        $('#DivReplyButton').show();

        var amount = $('trans_amount').val();
        $('#trans_amount').val('');

        var msg = get_display_lang(result);
        if (msg == undefined || msg == '')
            msg = get_display_lang('pps_unavailable_before_EOD').format(eftConfig.ppsInfo.ppsXMins);

        SetResultIcon(resultIcon.Reject);
        SetRejectReason(msg);

        writePPSLog('PPSEOD', '', '', '-', amount, 0);
        EnableButtons(true);

        document.body.style.cursor = 'auto';
        return;
    }

    var result = msg.Result;
    if (result == "0") {
        var amount = $('trans_amount').val();
        writePPSLog('', '', '', msg.ReferenceNo, msg.Amount, 1);

        SetDataStore('PPS.PopupURL', msg.PopupURL);

        $("#DivPPSRedirect").hide();
        var ppsUrl = GetDataStore("PPS.PopupURL");
        window.location.replace(ppsUrl);
        window.resizeTo(885, 685);
        window.focus();
    } else {
        if (msg.ppsdo_status == '-2') {
            processSSOExtendResult(msg); // Support SSO
        }

        SetResultIcon(resultIcon.Reject);

        $('#DivRequest').hide();
        $('#DivRequestButton').hide();

        $('#DivReply').show();
        $('#DivReplyResult').show();
        $('#DivReplyButton').show();

        var amount = $('trans_amount').val();
        $('trans_amount').val('');

        var msg = get_display_lang(result);
        if (msg == undefined || msg == '')
            msg = get_display_lang('lbl_pps_reject_msg').replace(/@@@/g, result);

        SetRejectReason(msg);
        writePPSLog('REJECTED', '', '', '-', amount, 0);

        EnableButtons(true);
        document.body.style.cursor = 'auto';
    }
    EnableButtons(true);
}

function ProcessPPSDOReplyTimeout() {

    SetResultIcon(resultIcon.Timeout);

    $("#DivPPSRedirect").hide();
    $('#DivRequest').hide();
    $('#DivRequestButton').hide();

    $('#DivReply').show();
    $('#DivReplyResult').show();
    $('#DivReplyButton').show();

    $('#lblResultBetAcc').html(GetDataStore('account'));
    $('#lblResultTransTypeValue').html(get_display_lang("lbl_trans_instant_deposit"));
    $('#lblResultBankName').html(get_display_lang("lbl_from_pps"));
    $('#lblResultAmountValue').html(CommaFormatted(CurrencyFormatted($('trans_amount').val())));

    SetRejectReason(get_display_lang('eft_timeout_msg'));
    writePPSLog('UNKNOWN', '', '', '-', CommaFormatted(CurrencyFormatted($('trans_amount').val())), 0);
    SetReminder(null);
    EnableButtons(true);
}

function writePPSLog(status, txnNo, balance, digitOrder, amount, ppsEnquire) {
    // balance@@@status|||[txnNo|err]|||betType|||betDetails|||leagueCode|||amount
    var record = balance + '@@@' + status +
        '|||' + txnNo +
        '|||' + '' +
        '|||' + get_display_lang('lbl_pps_deposit').replace('###DIGITAL_ORDER###', digitOrder) +
        '|||' + '' +
        '|||' + amount;

    logDataAccessor.UpdateEFTRecord(digitOrder, record, ppsEnquire);

}

function ProcessPPSDRReplyTimeout() {
    SetResultIcon(resultIcon.Timeout);

    $("#lbl_result_msg_text").html(get_display_lang('eft_timeout_msg'));
    isButtonDisabled = false;
    $('#DivReplyButton').show();
}

function OnClickTypePPS(eftType) {
    if (eftType == 0) {
        location.href = '/BetSlip/eft.aspx?frompps=1&lang=' + GetLanguage();
    } else {
        location.href = '/BetSlip/eft.aspx?frompps=1&clicktype=1&lang=' + GetLanguage();
    }
}

function onClickOfficialPPSFAQ(resCode) {
    var left = (screen.width - 800) / 2;
    var top = (screen.height - 600) / 2;
    var sFeatures = "left=" + left + ",top=" + top + ",width=800,height=600,scrollbars=1,status=1,location=0,menubar=0,resizable=0,titlebar=0";
    window.open(opener.eftConfig.ppsInfo.ppsFAQPage + '?code=' + resCode, '_blank', sFeatures);
}

// ************** Linking **************
function LoadLinkingLabel() {
    $('#lblLinkMsg').html(get_display_lang('lbl_link_msg'));
    $('#lblLinkMsg2').html(get_display_lang('lbl_link_msg2'));
    $('#lblLinkingNba1').html(get_display_lang('lbl_link_nba1'));
    $('#lblLinkingNba2').html(get_display_lang('lbl_link_nba2'));
    $('#lblLinkingDepWit').html(get_display_lang('lbl_link_dep_wit'));
    $('#lblLinkingDep').html(get_display_lang('lbl_link_dep'));
    $('#lblLinkFullname').html(get_display_lang('lbl_link_fullname'));
    $('#lblLinkBankname').html(get_display_lang('lbl_link_bankname'));
    $('#lblLinkBankac').html(get_display_lang('lbl_link_bankac'));
    $('#lblLinkMobile').html(get_display_lang('lbl_link_mobile'));
    $('#lblTandC').html(get_display_lang('lbl_tandc'));
    $('#lblLinkTandCCheck').html(get_display_lang('lbl_tandc_check'));
    $('#imgOtpFailed').attr("src", get_display_lang('pic_path') + get_display_lang('pic_rejected'));
    $('#lblOtpFailed').html(get_display_lang('lbl_unsuccessful'));
    $('#lblOtpsent').html(get_display_lang("lbl_otp_sent"));
    $('#lblOtpsentIncorrect').html(get_display_lang('lbl_otp_sent_incorrect'));
    $('#lblOtpInput').html(get_display_lang('lbl_opt_input'));
    $('#lblNoOtp').html(get_display_lang('lbl_no_otp'));
    $('#lnkOtpResend').html(get_display_lang('lbl_otp_resend'));
    $('#lblOtpResent').html(get_display_lang('lbl_otp_resend_success'));
    $('#lblOtpInvalid').html(get_display_lang('lbl_otp_invalid'));
    $('#lblLinkReplyName').html(get_display_lang('lbl_link_fullname'));
    $('#lblLinkReplyBankName').html(get_display_lang('lbl_link_bankname'));
    $('#lblLinkReplyBankAc').html(get_display_lang('lbl_link_bankac'));
    $('#lblLinkReplyPhone').html(get_display_lang('lbl_link_mobile'));
    $('#lblLinkReplyReject').html(get_display_lang('result_rejected_reason'));
    $('#lblLinkReplyDefaultDeposit').html(get_display_lang('lbl_link_default_deposit'));

    $('.btnClose').prop('value', get_display_lang('btn_close'));
    $('.btnClose').prop('title', get_display_lang('btn_close'));
    $('.btnNext').prop('value', get_display_lang('btn_next'));
    $('.btnNext').prop('title', get_display_lang('btn_next'));
    $('.btnConfirm').prop('value', get_display_lang('btn_confirm'));
    $('.btnConfirm').prop('title', get_display_lang('btn_confirm'));
    $('.btnDone').prop('value', get_display_lang('btn_done'));
    $('.btnDone').prop('title', get_display_lang('btn_done'));
    $('.btnBack').prop('value', get_display_lang('btn_back'));
    $('.btnBack').prop('title', get_display_lang('btn_back'));
}

function linkPrimaryNba(showDiv) {
    var canClickNba1 = true;
    $('#DivRequest').hide();
    if (showDiv) {
        $('#DivLink').show();
    }

    if (GetDataStore('primarynba_status') != "1" || GetDataStore('primarynba_bankacno').length <= 0) {
        $('#DivLinkNoNba1').show();
        $('#lblLinkNoNba1').html(get_display_lang('lbl_no_nba1') + get_display_lang("lbl_fps_bank_url"));
        $('#DivLinkNba1').hide();
        canClickNba1 = false;
        return;
    }

    //FPS
    if (GetDataStore('primarynba_bankacno').length != 0 && GetDataStore("primarynba_status") == "1") {
        $('#DivLinkNoNba1').hide();
        $('#DivLinkNba1').show();

        $('#lblLinkingBank1').html(GetDataStore("primarynba_bankname"));
        $('#lblLinkingBankAcc1').html(maskAccNo(GetDataStore('primarynba_bankacno')));
        $('#lblLinkFpsMethod').html(get_display_lang('lbl_fps'));

        if (GetDataStore('primarynba_FPSeDDAStatus') == "AP") {
            $('#ImgLinkNba1Fps').attr('src', get_display_lang('pic_path') + get_display_lang('pic_link_bound'));
            $('#lblLinkFpsStatus').html(get_display_lang('lbl_link_linked'));
            $('#DivLinkFps1').show();
        }

        if (GetDataStore('primarynba_FPSeDDAStatus') == "IP") {
            $('#ImgLinkNba1Fps').attr('src', get_display_lang('pic_path') + get_display_lang('pic_link_pending'));
            $('#lblLinkFpsStatus').html(get_display_lang('lbl_link_pending'));
            $('#DivLinkFps1').show();

            $('#lblLinkNba1Pending').html(get_display_lang('lbl_link_pending_reason'));
            $('#DivLinkNba1Pending').show();
        }

        if (GetDataStore('primarynba_FPSeDDAStatus') == "RJ") {
            $('#ImgLinkNba1Fps').attr('src', get_display_lang('pic_path') + get_display_lang('pic_link_failed'));
            $('#lblLinkFpsStatus').html(get_display_lang('lbl_link_failed'));
            $('#DivLinkFps1').show();

            var rejMsg = "";
            if (GetLanguage() == 1) {
                rejMsg = GetDataStore('primarynba_errorMsgTC');
            } else {
                rejMsg = GetDataStore('primarynba_errorMsg');
            }
            $('#lblLinkNba1Rejected').html(get_display_lang('lbl_link_rejected_reason').replace('###', rejMsg));
            $('#DivLinkNba1Rejected').show();
        }

        if (GetDataStore('primarynba_FPSeDDAStatus') == "NO") {
            if (GetDataStore('primarynba_FPSPStatus') == "1") {
                if (GetDataStore('primarynba_FPSeDDADepositEnable').toUpperCase() == "TRUE") {
                    $('#ImgLinkNba1Fps').attr('src', get_display_lang('pic_path') + get_display_lang('pic_link_avaliable'));
                    $('#lblLinkFpsStatus').html(get_display_lang('lbl_link_avaliable'));
                    $('#DivLinkFps1').show();
                } else {
                    $('#DivLinkFps1').hide();
                    if (GetDataStore('primarynba_activation') != 1 && GetDataStore('primarynba_activation') != 3) {
                        $('#DivLinkNba1NotSupport').show();
                        $('#DivLinkNba1Support').hide();
                        $('#lblLinkNba1NotSupport').html(get_display_lang('lbl_link_Fps_notsupport'));
                    }
                    canClickNba1 = false;
                }
            } else {
                $('#DivLinkNba1NotSupport').show();
                $('#DivLinkNba1Support').hide();
                $('#lblLinkNba1NotSupport').html(get_display_lang('lbl_bank_maintenance'));
                canClickNba1 = false;
            }
        }

        if (GetDataStore('primarynba_FPSeDDAStatus') == "") {
            $('#DivLinkNba1NotSupport').show();
            $('#DivLinkNba1Support').hide();
            $('#lblLinkNba1NotSupport').html(get_display_lang('lbl_link_Fps_notsupport'));
            canClickNba1 = false;
        }

        $('#DivLinkFps1').unbind("click").click(function() {
            if (canClickNba1) {
                ClearOtherLinkSelection("DivLinkFps1");

                $('#DivLinkFps1').toggleClass('eft_link_fps_active');
                if ($('#DivLinkFps1').hasClass('eft_link_fps_active')) {
                    transactionIndicator = bankAccType.nba1;
                    nba1TransactionType = transactionType.fps;
                    nba2TransactionType = "";
                    $('#btnLinkNext').removeAttr('disabled');
                } else {
                    transactionIndicator = "";
                    nba1TransactionType = "";
                    $('#btnLinkNext').attr('disabled', 'disabled');
                }
            }
        });
    }

    //EPSCO
    $('#lblLinkEpscoMethod').html(get_display_lang('lbl_epsco'));

    if (GetDataStore("primarynba_status") == 1) {
        //Check EFT activation                
        if (GetDataStore('primarynba_activation') == 1 || GetDataStore('primarynba_activation') == 3) {
            $('#DivLinkNba1Epsco').show();
            $('#ImgLinkNba1Epsco').attr('src', get_display_lang('pic_path') + get_display_lang('pic_link_bound'));
            $('#lblLinkEpscoStatus').html(get_display_lang('lbl_link_linked'));
        } else {
            $('#DivLinkNba1Epsco').hide();
        }
    } else {
        $('#DivLinkNba1Epsco').hide();
    }
}

function linkSecondaryNba() {
    var canClickNba2 = true;
    if (GetDataStore('secondarynba_status') != "1" || GetDataStore('secondarynba_bankacno').length <= 0) {
        $('#DivLinkNoNba2').show();
        $('#lblLinkNoNba2').html(get_display_lang('lbl_no_nba2') + get_display_lang("lbl_fps_bank_url"));
        $('#DivLinkNba2').hide();
        canClickNba2 = false;
        return;
    }

    //FPS
    if (GetDataStore('secondarynba_bankacno').length != 0 && GetDataStore("secondarynba_status") == "1") {
        $('#DivLinkNoNba2').hide();
        $('#DivLinkNba2').show();

        $('#lblLinkingBank2').html(GetDataStore("secondarynba_bankname"));
        $('#lblLinkingBankAcc2').html(maskAccNo(GetDataStore('secondarynba_bankacno')));
        $('#lblLinkFpsMethod2').html(get_display_lang('lbl_fps'));

        if (GetDataStore('secondarynba_FPSeDDAStatus') == "AP") {
            $('#ImgLinkNba2Fps').attr('src', get_display_lang('pic_path') + get_display_lang('pic_link_bound'));
            $('#lblLinkFpsStatus2').html(get_display_lang('lbl_link_linked'));
            $('#DivLinkFps2').show();
        }

        if (GetDataStore('secondarynba_FPSeDDAStatus') == "IP") {
            $('#ImgLinkNba2Fps').attr('src', get_display_lang('pic_path') + get_display_lang('pic_link_pending'));
            $('#lblLinkFpsStatus2').html(get_display_lang('lbl_link_pending'));
            $('#DivLinkFps2').show();

            $('#lblLinkNba2Pending').html(get_display_lang('lbl_link_pending_reason'));
            $('#DivLinkNba2Pending').show();
        }

        if (GetDataStore('secondarynba_FPSeDDAStatus') == "RJ") {
            $('#ImgLinkNba2Fps').attr('src', get_display_lang('pic_path') + get_display_lang('pic_link_failed'));
            $('#lblLinkFpsStatus2').html(get_display_lang('lbl_link_failed'));
            $('#DivLinkFps2').show();

            var rejMsg = "";
            if (GetLanguage() == 1) {
                rejMsg = GetDataStore('secondarynba_errorMsgTC');
            } else {
                rejMsg = GetDataStore('secondarynba_errorMsg');
            }
            $('#lblLinkNba2Rejected').html(get_display_lang('lbl_link_rejected_reason').replace('###', rejMsg));
            $('#DivLinkNba2Rejected').show();
        }

        if (GetDataStore('secondarynba_FPSeDDAStatus') == "NO") {
            if (GetDataStore('secondarynba_FPSPStatus') == "1") {
                if (GetDataStore('secondarynba_FPSeDDADepositEnable').toUpperCase() == "TRUE") {
                    $('#ImgLinkNba2Fps').attr('src', get_display_lang('pic_path') + get_display_lang('pic_link_avaliable'));
                    $('#lblLinkFpsStatus2').html(get_display_lang('lbl_link_avaliable'));
                    $('#DivLinkFps2').show();
                } else {
                    $('#DivLinkFps2').hide();
                    if (GetDataStore('secondarynba_activation') != 1 && GetDataStore('secondarynba_activation') != 3) {
                        $('#DivLinkNba2NotSupport').show();
                        $('#DivLinkNba2Support').hide();
                        $('#lblLinkNba2NotSupport').html(get_display_lang('lbl_link_Fps_notsupport'));
                    }
                    canClickNba2 = false;
                }
            } else {
                $('#DivLinkNba2NotSupport').show();
                $('#DivLinkNba2Support').hide();
                $('#lblLinkNba2NotSupport').html(get_display_lang('lbl_bank_maintenance'));
                canClickNba1 = false;
            }
        }

        if (GetDataStore('secondarynba_FPSeDDAStatus') == "") {
            $('#DivLinkNba2NotSupport').show();
            $('#DivLinkNba2Support').hide();
            $('#lblLinkNba2NotSupport').html(get_display_lang('lbl_link_Fps_notsupport'));
            canClickNba1 = false;
        }

        $('#DivLinkFps2').unbind("click").click(function() {
            if (canClickNba2) {
                ClearOtherLinkSelection("DivLinkFps2");

                $('#DivLinkFps2').toggleClass('eft_link_fps_active');
                if ($('#DivLinkFps2').hasClass('eft_link_fps_active')) {
                    transactionIndicator = bankAccType.nba2;
                    nba1TransactionType = "";
                    nba2TransactionType = transactionType.fps;
                    $('#btnLinkNext').removeAttr('disabled');
                } else {
                    transactionIndicator = "";
                    nba2TransactionType = "";
                    $('#btnLinkNext').attr('disabled', 'disabled');
                }
            }
        });
    }

    //EPSCO
    $('#lblLinkEpscoMethod2').html(get_display_lang('lbl_epsco'));

    if (GetDataStore("secondarynba_status") == "1") {
        //Check EFT activation                
        if (GetDataStore('secondarynba_activation') == 1 || GetDataStore('secondarynba_activation') == 3) {
            $('#DivLinkNba2Epsco').show();
            $('#ImgLinkNba2Epsco').attr('src', get_display_lang('pic_path') + get_display_lang('pic_link_bound'));
            $('#lblLinkEpscoStatus2').html(get_display_lang('lbl_link_linked'));
        } else {
            $('#DivLinkNba2Epsco').hide();
        }
    } else {
        $('#DivLinkNba2Epsco').hide();
    }
}

function ClearOtherLinkSelection(item) {
    if (item != "DivLinkFps1") {
        $('#DivLinkFps1').removeClass('eft_link_fps_active');
    }
    if (item != "DivLinkFps2") {
        $('#DivLinkFps2').removeClass('eft_link_fps_active');
    }
}

function OnClickLinkNext() {
    switch (transactionIndicator) {
        case bankAccType.nba1:
            if (nba1TransactionType == transactionType.fps) {
                if (GetDataStore("primarynba_FPSeDDAStatus") == "NO") {
                    LinkShowTandC();
                    return;
                }

                if (GetDataStore("primarynba_FPSeDDAStatus") == "AP") {
                    $('#lblLinkSummaryResult').html(get_display_lang('lbl_link_Fps_AP'));
                    $('#lblLinkSummaryResultReminder').html(get_display_lang('lbl_link_successful'));
                    $('#lblLinkSummaryResultBankAc').html(maskAccNo(GetDataStore('primarynba_bankacno')));
                    $('#lblLinkSummaryResultPhone').html("+" + GetDataStore('mobile_country') + "-" + maskPhoneNo(GetDataStore('mobile_num')));
                }

                if (GetDataStore("primarynba_FPSeDDAStatus") == "IP") {
                    $('#lblLinkSummaryResult').html(get_display_lang('lbl_link_Fps_IP'));
                    $('#lblLinkSummaryResultReminder').html(get_display_lang("lbl_link_Fps_IP_reminder"));
                    $('#lblLinkSummaryResultBankAc').html(maskAccNo(GetDataStore('primarynba_bankacno')));
                    $('#lblLinkSummaryResultPhone').html("+" + GetDataStore('mobile_country') + "-" + maskPhoneNo(GetDataStore('mobile_num')));
                }

                if (GetDataStore("primarynba_FPSeDDAStatus") == "RJ") {
                    $('#lblLinkSummaryResult').html(get_display_lang('lbl_link_rejected_msg'));
                    $('#lblLinkSummaryResultBankAc').html(GetDataStore('primarynba_bankacno'));
                    $('#lblLinkSummaryResultPhone').html("+" + GetDataStore('mobile_country') + "-" + GetDataStore('mobile_num'));
                    $('#lblLinkSummaryResultReminder').html(get_display_lang('lbl_link_Fps_RJ'));

                    var rejMsg = "";
                    if (GetLanguage() == 1) {
                        rejMsg = GetDataStore('primarynba_errorMsgTC');
                    } else {
                        rejMsg = GetDataStore('primarynba_errorMsg');
                    }
                    if (rejMsg) {
                        $('#DivLinkSummaryReject').show();
                        $('#lblLinkSummaryReject').html(get_display_lang('result_rejected_reason'));
                        $('#lblLinkSummaryResultReject').html(rejMsg);
                    }
                }
            }
            $('#lblLinkSummaryResultBankName').html(GetDataStore('primarynba_bankname'));

            break;

        case bankAccType.nba2:
            if (nba2TransactionType == transactionType.fps) {
                if (GetDataStore("secondarynba_FPSeDDAStatus") == "NO") {
                    LinkShowTandC();
                    return;
                }

                if (GetDataStore("secondarynba_FPSeDDAStatus") == "AP") {
                    $('#lblLinkSummaryResult').html(get_display_lang('lbl_link_Fps_AP2'));
                    $('#lblLinkSummaryResultReminder').html(get_display_lang('lbl_link_successful'));
                    $('#lblLinkSummaryResultBankAc').html(maskAccNo(GetDataStore('secondarynba_bankacno')));
                    $('#lblLinkSummaryResultPhone').html("+" + GetDataStore('mobile_country') + "-" + maskPhoneNo(GetDataStore('mobile_num')));
                }

                if (GetDataStore("secondarynba_FPSeDDAStatus") == "IP") {
                    $('#lblLinkSummaryResult').html(get_display_lang('lbl_link_Fps_IP'));
                    $('#lblLinkSummaryResultReminder').html(get_display_lang("lbl_link_Fps_IP_reminder"));
                    $('#lblLinkSummaryResultBankAc').html(maskAccNo(GetDataStore('secondarynba_bankacno')));
                    $('#lblLinkSummaryResultPhone').html("+" + GetDataStore('mobile_country') + "-" + maskPhoneNo(GetDataStore('mobile_num')));
                }

                if (GetDataStore("secondarynba_FPSeDDAStatus") == "RJ") {
                    $('#lblLinkSummaryResult').html(get_display_lang('lbl_link_rejected_msg'));
                    $('#lblLinkSummaryResultBankAc').html(GetDataStore('secondarynba_bankacno'));
                    $('#lblLinkSummaryResultPhone').html("+" + GetDataStore('mobile_country') + "-" + GetDataStore('mobile_num'));
                    $('#lblLinkSummaryResultReminder').html(get_display_lang('lbl_link_Fps_RJ'));

                    var rejMsg = "";
                    if (GetLanguage() == 1) {
                        rejMsg = GetDataStore('secondarynba_errorMsgTC');
                    } else {
                        rejMsg = GetDataStore('secondarynba_errorMsg');
                    }
                    if (rejMsg) {
                        $('#DivLinkSummaryReject').show();
                        $('#lblLinkSummaryReject').html(get_display_lang('result_rejected_reason'));
                        $('#lblLinkSummaryResultReject').html(rejMsg);
                    }
                }
            }
            $('#lblLinkSummaryResultBankName').html(GetDataStore('secondarynba_bankname'));
            break;
    }
    $('#DivLink').hide();
    $('#DivLinkSummary').show();
    $('#lblLinkSummaryResultName').html(GetDataStore('acc_name'));
    $('#lblLinkSummaryName').html(get_display_lang('lbl_link_fullname'));
    $('#lblLinkSummaryBankName').html(get_display_lang('lbl_link_bankname'));
    $('#lblLinkSummaryBankAc').html(get_display_lang('lbl_link_bankac'));
    $('#lblLinkSummaryPhone').html(get_display_lang('lbl_link_mobile'));
    EnableButtons(true);
}

function ResetLinkBank(nba) {
    EnableButtons(false);
    var bankCode = "primarynba_bankcode";
    var bankAcc = "primarynba_bankacno";
    var nbaNum = "1";

    if (nba == bankAccType.nba2 || nba == 2) {
        bankCode = "secondarynba_bankcode";
        bankAcc = "secondarynba_bankacno";
        nbaNum = "2";
    }

    var para = {
        'lang': GetLanguage(),
        'acc': GetDataStore('account'),
        'sessionId': GetDataStore('session_id'),
        'apimId': GetDataStore('gu_id'),
        'seqNo': GetNextSeqNo(),
        'bankCode': GetDataStore(bankCode),
        'bankAccountNo': GetDataStore(bankAcc),
        'eDDAStatus': "NO",
        'knownWebID': GetDataStore('sso_web_id'),
        'knownSSOGUID': GetDataStore('sso_guid'),
        'bankAccountType': nbaNum
    };
    sendFPSInfoUpdate(para, ProcessResetLinkBankResult, eftConfig.fpsInfo.TimeoutInMs);
}

function ProcessResetLinkBankResult(msg) {
    if (msg.result == "-2") {
        processSSOExtendResult(msg); // Support SSO
    }

    if (msg.result == 0) {
        if (msg.bankAccountType == "1") {
            $('#DivLinkNba1Rejected').hide();
            $.when(getFPSTxnPara()).done(function() {
                linkPrimaryNba(false);
                EnableButtons(true);
            });
        }
        if (msg.bankAccountType == "2") {
            $('#DivLinkNba2Rejected').hide();
            $.when(getFPSTxnPara()).done(function() {
                linkSecondaryNba();
                EnableButtons(true);
            });
        }
    }
    EnableButtons(true);
}

function OnClickLinkTandCCheckbox() {
    if ($('#chkTandC').prop("checked")) {
        $('#btnLinkTandC').removeAttr("disabled");
    } else {
        $('#btnLinkTandC').prop("disabled", true);
    }
}

function LinkShowTandC() {
    $('#chkTandC').prop("checked", false);
    setLinkDisclaimerText();
    if (transactionIndicator == bankAccType.nba1 || transactionIndicator == bankAccType.nba2) {
        $('#DivLink').hide();
        $('#DivLinkTandC').show();
        $('#lblLinkFullnameValue').html(GetDataStore('acc_name'));
        var mobileNo = "";
        if (GetDataStore('mobile_country')) {
            mobileNo = "+" + GetDataStore('mobile_country') + "-";
        }
        if (GetDataStore('mobile_num') && GetDataStore('mobile_num').length > 0) {
            $('#lblLinkMobileValue').html(maskPhoneNo(mobileNo + GetDataStore('mobile_num')));
        } else {
            $('#lblLinkMobileValue').html(get_display_lang('lbl_link_no_mobile'));
        }

        switch (transactionIndicator) {
            case bankAccType.nba1:
                $('#lblLinkBanknameValue').html(GetDataStore('primarynba_bankname'));
                $('#lblLinkBankacValue').html(maskAccNo(GetDataStore('primarynba_bankacno')));
                break;
            case bankAccType.nba2:
                $('#lblLinkBanknameValue').html(GetDataStore('secondarynba_bankname'));
                $('#lblLinkBankacValue').html(maskAccNo(GetDataStore('secondarynba_bankacno')));
                break;
        }
    }

    EnableButtons(true);
    $('#btnLinkTandC').prop("disabled", true);
}

function setLinkDisclaimerText() {
    $.getJSON(eftConfig.linkTandCPath, function(data) {
        var dText = (GetLanguage() == 0) ? data["tAndcEn"] : data["tAndcCh"];
        var buf = new StringBuffer();
        for (idx = 0; idx < dText.length; idx++) {
            var data = dText[idx].split("|");
            buf.append('<div class="disclaimerLink">');
            buf.append('<div class="disclaimerLinkCellLeft">').append(data[0]).append('</div>');
            buf.append('<div class="disclaimerLinkCellRight">').append(data[1]).append('</div>');
            buf.append('</div>');
        }
        $('#lblTandCMsg').html(buf.toString());
    }).fail(function() {
        console.log(arguments)
    });
}

function OnClickLinkBack() {
    $('#DivLink').show();
    $('#DivLinkTandC').hide();
    $('DivLinkOtpValidate').hide();
    $('#DivLinkOtpValidate').hide();
}

function OnClickLinkTandC() {
    SetResultIcon(resultIcon.OtpProgress);
    SendOTPCodeGenerate();
}

function SendOTPCodeGenerate() { // call by user (when user click 'send' button will raise this event)
    EnableButtons(false);
    $('#bracketLeft').show();
    $('#bracketRight').show();
    $('#lnkOtpResend').removeAttr("href");
    $('#lnkOtpResend').addClass("urlDisabled");
    $('#lnkOtpResend').removeClass("urlEnabled");

    var seqNo = GetNextSeqNo();
    var para = {
        'bettingAccount': GetDataStore('account'),
        'knownWebID': GetDataStore('sso_web_id'),
        'knownSSOGUID': GetDataStore('sso_guid'),
        'guid': GetDataStore('gu_id'),
        'sessionId': GetDataStore('session_id'),
        'seqNo': seqNo
    };

    sendOTPCodeGenerateRequest(para, ProcessOtpCodeGenerateResult, ProcessOtpCodeGenerateResult, eftConfig.fpsInfo.TimeoutInMs);
}

function ProcessOtpCodeGenerateResult(msg) {
    $('#DivOtpProgress').hide();

    if (!$('#DivLinkOtpValidate').is(":visible")) {
        $('#DivLinkOtpValidate').show();
    } else {
        $('#divOtpResent').show().delay(eftConfig.fpsInfo.OtpMessageDisplayMs).fadeOut();
    }

    if (!msg || msg.result == "0") {
        //Reset OTP input
        $(".otpCode").each(function() {
            this.value = "";
        });
        $('#otpInput0').focus();
        if (msg) {
            optPhone = msg.phoneNo;
            $('#lblOtpsent').html($('#lblOtpsent').html().replace("###", maskPhoneNo(msg.phoneNo)));
        } else {
            $('#lblOtpsent').html($('#lblOtpsent').html().replace("###", maskPhoneNo("+" + GetDataStore("mobile_country") + "-" + GetDataStore("mobile_num"))));
        }
        if (optIntervalId) {
            clearInterval(optIntervalId);
        }

        //set timer
        var optTimerInMs = parseInt(msg.expireAt) - parseInt(msg.createAt);
        if (optTimerInMs >= 1000) {
            eftConfig.fpsInfo.OtpResendSeconds = (optTimerInMs / 1000).toString();
        }
        $('#otpTimer').html(eftConfig.fpsInfo.OtpResendSeconds.toMMSS());
        optIntervalId = setInterval(startOtpResendTimer, 1000);
    } else {
        if (msg.result == "-2") {
            processSSOExtendResult(msg); // Support SSO
        }

        if (parseInt(msg.result) >= 100 && parseInt(msg.result) <= 120) {
            var errorMsg = GetError(msg.result);
            if (errorMsg) {
                alert(errorMsg);
                closeAllBetSlipOverlay();
                return;
            }
        }

        if (msg.result == "487") {
            if (msg.status == "404") {
                $('#lblOtpFailedMsg').html(get_display_lang('lbl_link_unsuccessful'));
            } else {
                alert(msg.errorMessage);
                closeAllBetSlipOverlay();
                return;
            }
        }

        $('#DivLinkOtpFailed').show();
        $('#DivLinkOtpValidate').hide();
    }

    EnableButtons(true);
    $('#btnOtpValidate').prop("disabled", true);

    //OTP code input
    $(function() {
        var charLimit = 1;
        $(".otpCode").keydown(function(e) {

            var keys = [8, 9, /*16, 17, 18,*/ 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 48, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 144, 145];

            if (e.which == 8 && this.value.length == 0) {
                $(this).prev('.otpCode').focus();
            } else if ($.inArray(e.which, keys) >= 0) {
                return true;
            } else if (this.value.length >= charLimit) {
                $(this).next('.otpCode').focus();
                return false;
            } else if (e.shiftKey || e.which <= 48 || e.which >= 58) {
                return false;
            }
        }).keyup(function() {

            var otpCode = "";
            $(".otpCode").each(function() {
                otpCode += this.value;
            });
            if (otpCode.length == 6) {
                $("#btnOtpValidate").removeAttr("disabled");
            } else {
                $("#btnOtpValidate").prop("disabled", true);
            }

            if (this.value.length >= charLimit) {
                $(this).next('.otpCode').focus();
                return false;
            }
        });
    });
}

function startOtpResendTimer() {
    if ($('#otpTimer').html() == "") {
        var presentTime = eftConfig.fpsInfo.OtpResendSeconds.toMMSS();
    } else {
        var presentTime = $('#otpTimer').html();
    }

    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) {
        m = m - 1
    }
    $('#otpTimer').html(m + ":" + s);

    //completed
    if (m < 0) {
        $('#otpTimer').html("");
        $('#bracketLeft').hide();
        $('#bracketRight').hide();
        $('#lnkOtpResend').attr("href", "javascript:SendOTPCodeGenerate()");
        $('#lnkOtpResend').removeClass("urlDisabled");
        $('#lnkOtpResend').addClass("urlEnabled");
        clearInterval(optIntervalId);
    } else {
        //otpIntervalId = setTimeout(startOtpResendTimer, 1000);
    }
}

String.prototype.toMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - (minutes * 60);

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ':' + seconds;
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
        sec = "0" + sec
    }; // add zero in front of numbers < 10
    if (sec < 0) {
        sec = "59"
    };
    return sec;
}

function ProcessOtpCodeGenerateTimeout() {
    $('#DivOtpProgress').hide();
    $('#DivLinkOtpValidate').show();
    $('#DivLinkOtpFailed').hide();
    EnableButtons(true);
}

function OtpLenCheck() {
    if ($('#otpInput').val().length == 6) {
        $('#btnOtpValidate').removeAttr("disabled");
    } else {
        $('#btnOtpValidate').prop("disabled", true);
    }
}

function OtpCodeConfirm() {
    EnableButtons(false);
    var otpCode = "";
    $(".otpCode").each(function() {
        otpCode += this.value;
    });
    console.log(otpCode);
    var seqNo = GetNextSeqNo();
    var para = {
        'bettingAccount': GetDataStore('account'),
        'knownWebID': GetDataStore('sso_web_id'),
        'knownSSOGUID': GetDataStore('sso_guid'),
        'guid': GetDataStore('gu_id'),
        'sessionId': GetDataStore('session_id'),
        'seqNo': seqNo,
        "otpCode": otpCode
    };

    sendOTPCodeConfirmRequest(para, ProcessOtpCodConfirmResult, ProcessOtpCodeConfirmTimeout, eftConfig.fpsInfo.TimeoutInMs);
}

function ProcessOtpCodConfirmResult(msg) {
    EnableButtons(false);
    if (msg.result == "0") {

        switch (transactionIndicator) {
            case bankAccType.nba1:
                nbaIndicator = 1;
                bankCode = GetDataStore("primarynba_bankcode");
                bankAccountNo = GetDataStore("primarynba_bankacno");
                break;
            case bankAccType.nba2:
                nbaIndicator = 2;
                bankCode = GetDataStore("secondarynba_bankcode");
                bankAccountNo = GetDataStore("secondarynba_bankacno");
                break;
        }

        var seqNo = GetNextSeqNo();
        var para = {
            'lang': GetLanguage(),
            'bettingAccount': GetDataStore('account'),
            'sessionId': GetDataStore('session_id'),
            'apimId': GetDataStore('gu_id'),
            'seqNo': seqNo,
            'bankAccountType': nbaIndicator,
            'bankAccountNo': bankAccountNo,
            'bankCode': bankCode,
            'firstName': GetDataStore('firstname'),
            'lastName': GetDataStore('lastname'),
            'mobileNo': optPhone,
            'knownSSOGUID': GetDataStore('sso_guid'),
            'knownWebID': GetDataStore('sso_web_id')
        }

        $('#DivLinkOtpValidate').hide();
        $('#DivOtpProgress').show();
        sendFpsSetupRequest(para, ProcessFpsSetupResult, ProcessPfsSetupReplyTimout, eftConfig.fpsInfo.TimeoutInMs);

    } else {

        if (parseInt(msg.result) >= 100 && parseInt(msg.result) <= 120) {
            var errorMsg = GetError(msg.result);
            if (errorMsg) {
                alert(errorMsg);
                closeAllBetSlipOverlay();
                return;
            }
        }

        //Reset OTP input
        $(".otpCode").each(function() {
            this.value = "";
        });
        $('#otpInput0').focus();
        $('#divOtpInvalid').show().delay(eftConfig.fpsInfo.OtpMessageDisplayMs).fadeOut();
    }

    EnableButtons(true);
    $('#btnOtpValidate').prop("disabled", true);
}

function ProcessOtpCodeConfirmTimeout() {
    $('#otpInput').val("");
    $('#divOtpInvalid').show().delay(eftConfig.fpsInfo.OtpMessageDisplayMs).fadeOut();
    EnableButtons(true);
}

function ProcessFpsSetupResult(msg) {
    $('#DivOtpProgress').hide();
    $('#DivLinkReply').show();
    $('#DivLinkReplyResult').show();
    $('#DivLinkDefaultDeposit').hide();
    $('#DivLinkRejectReason').hide();
    $('#DivLinkContent').hide();

    //success
    if (msg.result == "0") {
        if (msg.bankAccType == 1) {
            SetDataStore('primarynba_FPSeDDAStatus', msg.eDDAStatus);
        }
        if (msg.bankAccType == 2) {
            SetDataStore('secondarynba_FPSeDDAStatus', msg.eDDAStatus);
        }

        switch (msg.eDDAStatus) {
            case "AP":
                $('#imgLinkResult').attr("src", get_display_lang('pic_path') + get_display_lang('pic_successful'));
                $('#lblLinkResult').html(get_display_lang('lbl_successful'));
                if (msg.bankAccType == 1) {
                    $('#lblLinkReplyMsg').html(get_display_lang('lbl_link_successful_msg'));
                } else {
                    $('#lblLinkReplyMsg').html(get_display_lang('lbl_link_successful_msg2'));
                }
                $('#lblLinkResultName').html(GetDataStore('acc_name'));
                $('#lblLinkResultBankAc').html(maskAccNo(msg.bankAccNo));
                $('#lblLinkResultPhone').html(maskPhoneNo("+" + GetDataStore('mobile_country') + "-" + GetDataStore('mobile_num')));
                if (GetLanguage() == 1) {
                    $('#lblLinkResultBankName').html(msg.bankNameTC);
                } else {
                    $('#lblLinkResultBankName').html(msg.bankName);
                }
                $('#DivLinkDefaultDeposit').show();
                $('#lblLinkResultDefaultDeposit').html(CommaFormatted(CurrencyFormatted(msg.dailyDepMaxAmt)));
                $('#DivLinkReminder').show();
                $('#lblLinkResultReminder').html(get_display_lang('lbl_link_successful'));
                break;
            case "IP":
                $('#imgLinkResult').attr("src", get_display_lang('pic_path') + get_display_lang('pic_pending'));
                $('#lblLinkResult').html(get_display_lang('lbl_link_submitted_pending'));
                $('#lblLinkReplyMsg').html(get_display_lang('lbl_link_pending_msg'));
                $('#lblLinkResultName').html(GetDataStore('acc_name'));
                $('#lblLinkResultBankAc').html(maskAccNo(msg.bankAccNo));
                $('#lblLinkResultPhone').html(maskPhoneNo("+" + GetDataStore('mobile_country') + "-" + GetDataStore('mobile_num')));
                if (GetLanguage() == "1") {
                    $('#lblLinkResultBankName').html(msg.bankNameTC);
                } else {
                    $('#lblLinkResultBankName').html(msg.bankName);
                }
                $('#DivLinkDefaultDeposit').show();
                $('#lblLinkResultDefaultDeposit').html(CommaFormatted(CurrencyFormatted(msg.dailyDepMaxAmt)));
                $('#DivLinkReminder').show();
                $('#lblLinkResultReminder').html(get_display_lang('lbl_link_pending_notify'));
                break;
            case "RJ":
                $('#imgLinkResult').attr("src", get_display_lang('pic_path') + get_display_lang('pic_rejected'));
                $('#lblLinkResult').html(get_display_lang('lbl_rejected'));
                $('#lblLinkReplyMsg').html(get_display_lang('lbl_link_rejected_msg'));
                $('#lblLinkResultName').html(GetDataStore('acc_name'));
                $('#lblLinkResultBankAc').html(msg.bankAccNo);
                $('#lblLinkResultPhone').html("+" + GetDataStore('mobile_country') + "-" + GetDataStore('mobile_num'));
                if (GetLanguage() == 1) {
                    $('#lblLinkResultBankName').html(msg.bankNameTC);
                } else {
                    $('#lblLinkResultBankName').html(msg.bankName);
                }

                var rejMsg = "";
                if (GetLanguage() == 1) {
                    rejMsg = msg.errorMsgTC + " (" + msg.errorCode + ")";
                } else {
                    rejMsg = msg.errorMsg + " (" + msg.errorCode + ")";
                }
                if (rejMsg) {
                    $('#DivLinkRejectReason').show();
                    $('#lblLinkResultReject').html(rejMsg);
                }
                $('#lblLinkResultReminder').html(get_display_lang('lbl_link_rejected'));

                ResetLinkBank(msg.bankAccType);
                break;
            case "NO":
                break;
        }

        EnableButtons(true);
        return;
    } else {

        if (parseInt(msg.result) >= 100 && parseInt(msg.result) <= 120) {
            var errorMsg = GetError(msg.result);
            if (errorMsg) {
                alert(errorMsg);
                closeAllBetSlipOverlay();
                return;
            }
        }
    }

    //failed
    $('#imgLinkResult').attr("src", get_display_lang('pic_path') + get_display_lang('pic_rejected'));
    $('#lblLinkResult').html(get_display_lang('lbl_rejected'));
    $('#lblLinkReplyMsg').html(get_display_lang('lbl_link_rejected_msg'));
    $('#lblLinkResultName').html(GetDataStore('acc_name'));
    $('#lblLinkResultPhone').html("+" + GetDataStore('mobile_country') + "-" + GetDataStore('mobile_num'));
    switch (transactionIndicator) {
        case bankAccType.nba1:
            $('#lblLinkResultBankName').html(GetDataStore("primarynba_bankname"));
            $('#lblLinkResultBankAc').html(GetDataStore("primarynba_bankacno"));
            break;
        case bankAccType.nba2:
            $('#lblLinkResultBankName').html(GetDataStore("secondarynba_bankname"));
            $('#lblLinkResultBankAc').html(GetDataStore("secondarynba_bankacno"));
            break;
    }

    var rejMsg = "";
    if (GetLanguage() == 1) {
        rejMsg = msg.errorMsgTC + " (" + msg.errorCode + ")";
    } else {
        rejMsg = msg.errorMsg + " (" + msg.errorCode + ")";
    }
    if (rejMsg) {
        $('#DivLinkRejectReason').show();
        $('#lblLinkResultReject').html(rejMsg);
    }
    $('#lblLinkResultReminder').html(get_display_lang('lbl_link_rejected'));

    EnableButtons(true);
}

function ProcessPfsSetupReplyTimout() {
    $('#DivOtpProgress').hide();
    $('#DivLinkReply').show();
    $('#imgLinkResult').attr("src", get_display_lang('pic_path') + get_display_lang('pic_timeout'));
    $('#lblLinkResult').html(get_display_lang('lbl_timeout'));
    $('#DivLinkReplyResult').hide();
    $('#DivLinkContent').show();
    $('#lblLinkContent').html(get_display_lang('lbl_link_pending_content'));
    $('#lblLinkReplyMsg').html("");
    EnableButtons(true);
}

function LoadPpsResult() {
    EnableButtons(false);
    var para = {
        'dr': ppsDr,
        'rejectMsg': ppsMsg
    };
    sendPPSDRRequest(para, ProcessPPSDRResult, ProcessPPSDOReplyTimeout, eftConfig.ppsInfo.TimeoutInMs);
}

function ProcessPPSDRResult(msg) {
    loadFpsInfo = true;

    $('#DivRequest').hide();
    $('#lblPpsResultSummary').html(get_display_lang("lbl_deposit_summary"));
    $('#lbl_ppsResult_txn_date').html(get_display_lang("lbl_txn_date"));
    $('#lbl_ppsResult_ref_no').html(get_display_lang("lbl_ref_no"));
    $('#lbl_ppsResult_payment_no').html(get_display_lang("lbl_payment_no"));
    $('#lbl_ppsResult_trans_amount').html(get_display_lang("lbl_txn_amount"));
    $('#lbl_ppsResult_result_msg').html(get_display_lang("lbl_result_msg"));
    $('.btnDone').prop('value', get_display_lang('btn_done'));
    $('.btnDone').prop('title', get_display_lang('btn_done'));

    var tmpTxDt = msg.TxDate.split('T');
    var tmpTxDtToken = tmpTxDt[0].split('-');
    var txnDt = '';
    if (tmpTxDtToken.length == 3) { // year-month-date
        txnDt = tmpTxDtToken[2] + '/' + tmpTxDtToken[1] + '/' + tmpTxDtToken[0];
    }
    $('#lbl_ppsResult_txn_date_text').html(txnDt);
    $('#lbl_ppsResult_ref_no_text').html(msg.ReferenceNo);
    $('#lbl_ppsResult_payment_no_text').html(msg.ISN);
    $('#lbl_ppsResult_trans_amount_text').html(CommaFormatted(CurrencyFormatted(msg.Amount)));

    if (msg.Result == "0") {
        $('#imgPpsResult').attr("src", get_display_lang('pic_path') + get_display_lang('pic_successful'));
        $('#lblPpsResult').html(get_display_lang('lbl_successful'));

        var succText = get_display_lang("err_pps") + " " +
            get_display_lang("lbl_trans_instant_deposit") +
            get_display_lang("accepted") + " " +
            get_display_lang('pps_success_notes');

        $('#lbl_ppsResult_result_msg_text').html(succText);
    } else {
        $('#imgPpsResult').attr("src", get_display_lang('pic_path') + get_display_lang('pic_rejected'));
        $('#lblPpsResult').html(get_display_lang('lbl_rejected'));

        var outMsg = get_display_lang(msg.Result);
        if (msg.ResponseCode != undefined && parseInt(msg.ResponseCode, 10) > 0) {
            outMsg = msg;
        }
        if ((typeof outMsg).toLocaleLowerCase() != 'string' || outMsg == undefined || outMsg == '') {
            outMsg = get_display_lang('lbl_pps_reject_msg');
        }
        outMsg = outMsg.replace(/@@@/g, msg.Result).replace(/##resCode##/g, msg.ResponseCode);
        $('#lbl_ppsResult_result_msg_text').html(outMsg);
    }

    sendBalanceRequest(true);

    $('#DivProgress').hide();
    $('#DivPpsResult').show();

    EnableButtons(true);
}
// ****************************

function mask_eft_num() {
    if (frmEFT.input_eft_num.val() == "") {
        g_eft_number = "";
        alert(get_display_lang("invalid_eft_num"));
        frmEFT.input_eft_num.focus();
        return;
    }

    if (frmEFT.input_eft_num.val() == get_disp_eft_no(g_eft_number))
        return;

    g_eft_number = frmEFT.input_eft_num.val();
    frmEFT.input_eft_num.val() = get_disp_eft_no(g_eft_number);
}

function OnClickEftBack() {
    if (perviousNba1TransactionType) {
        nba1TransactionType = perviousNba1TransactionType;
    }

    //EftOnLoad();
    $('#DivBankPin').hide();
    $('#DivConfirm').hide();
    $('#DivRequest').show();
    clrPin();
    EnableButtons(true);
}

function OnClickEftBack2() {
    $("#DivPreviewCharge").hide();
    $('#DivConfirmCharge').hide();
    $("#DivPPSRedirect").hide();
    OnClickEftBack();
}

function OnClickEftBack3() {
    $("#DivConfirmAutopay").hide();
    DisplayPreview();
}

function OnClickRetryEpsco() {
    $('#DivConfirmAutopay').hide();
    DisplayPreview();
}

function OnClickEftReset() {
    if (eftAction == eftActions.deposit) {
        EftOnLoad(0);
    } else {
        $('#trans_amount').val('');
    }
}

function clearResultDetails() {
    // Clear old result
    $('#out_bank_account').html('');
    $('#out_cur_balance').html('');
    $('#out_avai_balance').html('');
    $('#out_account_number').html('');
    $('#out_account_balance').html('');
    $('#out_message').html('');
}

function debugForm() {
    alert('' +
        'Account = ' + arguments[0] +
        '\nSid = ' + arguments[1] +
        '\nSeqNo = ' + arguments[2] +
        '\nSeqNo2 = ' + arguments[3] +
        '\nLanguage = ' + arguments[4] +
        '\nShow Balance = ' + arguments[5] +
        '\nEFT Type = ' + arguments[6] +
        '\nWithdrawal Type = ' + arguments[7] +
        '\nAmount = ' + arguments[8] +
        '\neWin Password = ' + arguments[9] +
        '\nPIN = ' + arguments[10] +
        '\nEFT Details = ' + arguments[11] +
        '\nEFT Details 2 = ' + arguments[12] +
        '\nEncrypt Session Key = ' + arguments[13]);
}

function writeCurrentSessionLogs(balance, status, txnNo) {
    // balance@@@status|||[txnNo|err]|||betType|||betDetails|||leagueCode|||amount
    var betline = '';

    switch (transactionIndicator) {
        case bankAccType.nba1:
            switch (nba1TransactionType) {
                case transactionType.fps:
                case transactionType.epsco:
                    if (eftAction == eftActions.deposit) {
                        betline = get_display_lang('lbl_deposit') + ' - ' + get_display_lang('lbl_bank_account_1');
                    }
                    if (eftAction == eftActions.withdrawal) {
                        betline = get_display_lang('lbl_withdrawal') + '(' + get_display_lang('lbl_ol_trans') + ')';
                    }
                    break;
                case transactionType.autopay:
                    if (eftAction == eftActions.deposit) {
                        betline = get_display_lang('lbl_deposit') + '(' + get_display_lang('lbl_autopay_deposit') + ')';
                    }
                    if (eftAction == eftActions.withdrawal) {
                        betline = get_display_lang('lbl_withdrawal') + '(' + get_display_lang('lbl_autopay_withdrawal') + ')';
                    }
            }
            break;
        case bankAccType.nba2:
            switch (nba2TransactionType) {
                case transactionType.fps:
                case transactionType.epsco:
                    if (eftAction == eftActions.deposit) {
                        betline = get_display_lang('lbl_deposit') + ' - ' + get_display_lang('lbl_bank_account_2');
                    }
                    if (eftAction == eftActions.withdrawal) {
                        betline = get_display_lang('lbl_withdrawal') + '(' + get_display_lang('lbl_ol_trans') + ')';
                    }
                    break;
                case transactionType.autopay:
                    if (eftAction == eftActions.deposit) {
                        betline = get_display_lang('lbl_deposit') + '(' + get_display_lang('lbl_autopay') + ')';
                    }
                    if (eftAction == eftActions.withdrawal) {
                        betline = get_display_lang('lbl_withdrawal') + '(' + get_display_lang('lbl_autopay') + ')';
                    }
                    break;
            }
            break;
    }

    var record = balance + '@@@' + status +
        '|||' + txnNo +
        '|||' + '' +
        '|||' + betline +
        '|||' + '' +
        '|||' + amount;

    logDataAccessor.LogEFTRecord(record);

}

function EnableButtons(isEnable) {

    if (isEnable) {
        document.body.style.cursor = 'auto';
    } else {
        document.body.style.cursor = 'progress';
    }

    isButtonDisabled = !isEnable;

    $('.btnNext').prop("disabled", !isEnable);
    $('.btnReset').prop("disabled", !isEnable);
    $('.btnContinue').prop("disabled", !isEnable);
    $('.btnClose').prop("disabled", !isEnable);
    $('.btnBack').prop("disabled", !isEnable);
    $('.btnConfirm').prop("disabled", !isEnable);
    $('.btnReinput').prop("disabled", !isEnable);
    $('.btnDeletePin').prop("disabled", !isEnable);
    $('.eftMenu').prop("disabled", !isEnable);

    if ($('.btnRedirect')) {
        $('.btnRedirect').prop("disabled", !isEnable);
    }

    if (eftAction == eftActions.deposit) {
        if (!nba1TransactionType && nba1.hasDepositFps) {
            $('#rd_nba1').attr("disabled", true);
        } else {
            $('#rd_nba1').attr("disabled", !isEnable);
        }

        if (!nba2TransactionType && nba2.hasDepositFps) {
            $('#rd_nba2').attr("disabled", true);
        } else {
            $('#rd_nba2').attr("disabled", !isEnable);
        }

        // PPS will be disabled before EOD
        if (eftConfig.ppsInfo.IsEnable) {
            $('#rd_pps').attr("disabled", !isEnable);
        }
    }
}

// Support SSO
function processSSOExtendResult(msg) {
    if (isSSOEnabled()) {
        if (msg.sso_last_extend_status != undefined && msg.sso_last_extend_status != '') {
            ReceiveAndProcessTicketExtendResults(msg.sso_last_extend_status,
                msg.sso_last_extend_error,
                msg.sso_check_return_status,
                msg.sso_sign_in_level,
                GetDataStore('sso_web_id'),
                GetDataStore('sso_guid'));
        }
    }
}

function setActiveStyleSheet(aFrame) {
    if (GetLanguage() == '1') {
        setActiveStyleSheetByLang(aFrame, "style_ch");
    } else {
        setActiveStyleSheetByLang(aFrame, "style_en");
    }
}

function setActiveStyleSheetByLang(aFrame, title) {
    var i, a;
    for (i = 0;
        (a = aFrame.document.getElementsByTagName("link")[i]); i++) {
        var lHref = a.getAttribute('href');
        if (GetLanguage() == '1') {
            lHref = lHref.replace('_0', '_1');
        } else {
            lHref = lHref.replace('_1', '_0');
        }
        a.setAttribute('href', lHref);
    }
}

function maskAccNo(accNo) {
    var m = "";
    accNo = $.trim(accNo);
    for (var i = 0; i < accNo.length; i++) {
        if (i < 3 || i >= accNo.length - 2) {
            m += accNo[i];
        } else {
            m += '*';
        }
    }
    return m;
}

function maskPhoneNo(phoneNo) {
    var m = "";

    m = phoneNo.substring(0, phoneNo.indexOf("-") + 1);

    phoneNo = $.trim(phoneNo);
    for (var i = phoneNo.indexOf("-") + 1; i < phoneNo.length; i++) {
        if (i < phoneNo.length - 4) {
            if ("0123456789".indexOf(phoneNo[i]) == -1) {
                m += phoneNo[i];
            } else {
                m += "X";
            }
        } else {
            m += phoneNo[i];
        }
    }
    return m;
}

function eft_num_onkeypress() {
    if (event.srcElement.name == "input_eft_num") {
        if (event.keyCode == 42)
            event.returnValue = false;
    }
}

function ChkNum(txt) {
    var c = 0;
    for (i = 0; i < txt.length; i++) {
        c = txt.charAt(i);
        if (isNaN(parseInt(c)) /*&& c != "."*/ ) return false;
    }
    return true;
}

function ChkAmt(txt) {
    var c = 0;
    for (i = 0; i < txt.length; i++) {
        c = txt.charAt(i);
        if (isNaN(parseInt(c)) /*&& c != "."*/ ) return false;
        if ((i == 0) && (c == "0")) return false;
    }
    return true;
}

function MakeCurrency(s, decPt) {
    if (decPt) {
        var t = s.substring(s.length - 3, s.length);
        var s = s.substring(0, s.length - 3);
    } else {
        var t = "." + s.substring(s.length - 2, s.length);
        var s = s.substring(0, s.length - 2);
    }

    while (s.length > 3) {
        t = "," + s.substring(s.length - 3, s.length) + t;
        s = s.substring(0, s.length - 3);
    }
    t = s + t;
    return t;
}

function change_cursor_hand() {
    document.body.style.cursor = 'hand';
}

function change_cursor_default() {
    document.body.style.cursor = 'default';
}

function func_change_image(inobj, inval) {
    inobj.src = get_image_lang(inval);
}

function GetSmallerNum(val1, val2) {
    var val1_int = Number.MAX_SAFE_INTEGER;
    var val2_int = Number.MAX_SAFE_INTEGER;

    if (val1 == "" || val1 != null) {
        val1_int = parseInt(val1);
    }
    if (val2 != "" && val2 != null) {
        val2_int = parseInt(val2);
    }

    if (val1_int > val2_int) {
        return val2_int;
    } else {
        return val1_int
    }
}

function GetLargerNum(val1, val2) {
    var val1_int = Number.MIN_SAFE_INTEGER;
    var val2_int = Number.MIN_SAFE_INTEGER;

    if (val1 != "" && val1 != null) {
        val1_int = parseInt(val1);
    }
    if (val2 != "" && val2 != null) {
        val2_int = parseInt(val2);
    }

    if (val1_int > val2_int) {
        return val1_int;
    } else {
        return val2_int;
    }
}

function SetReference(content) {
    if (content && content != "0" && content != "0000") {
        $('#DivReference').show();
        $('#lblResultRefNo').html(content);
    } else {
        $('#DivReference').hide();
    }
}

function SetReminder(content) {
    if (!content) {
        $('#DivReminder').hide();
        return;
    } else {
        $('#DivReminder').show();
        $('#lblResultReminder').html(content);
    }
}

function SetBalance(content) {
    if (!content) {
        $('#DivBalance').hide();
        return;
    } else {
        $('#DivBalance').show();
        $('#lblResultBetAccBalVal').html(CommaFormatted(CurrencyFormatted(content)));
    }
}

function SetRejectReason(content) {
    $('#lblResultReject').html(get_display_lang('result_rejected_reason'));
    $('#lblResultRejectReason').html(content);
    $('#DivRejectReason').show();
}

function SetResultServiceCharge(amount) {
    if (amount > 0) {
        $('#DivResultFee').show();
        $('#lblResultFee').html(get_display_lang('lbl_service_charge'));
        $('#lblResultFeeValue').html(CurrencyFormatted(CommaFormatted(amount)));
    } else {
        $('#DivResultFee').hide();
    }
}

function EftOnClickHelp() {
    OpenPopup(1, eftConfig.url_help_fund_deposit, 770, 550, 1, 1);
}

String.prototype.format = function() {
    var a = this;
    for (var k in arguments) {
        a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
    }
    return a
}

function ResizeWindow(width, height) {
    if (window.outerWidth) {
        window.resizeTo(
            width + (window.outerWidth - window.innerWidth),
            height + (window.outerHeight - window.innerHeight)
        );
    } else {
        window.resizeTo(500, 500);
        window.resizeTo(
            width + (500 - document.body.offsetWidth),
            height + (500 - document.body.offsetHeight)
        );
    }
};

const resultIcon = {
    Progress: "progress",
    Success: "success",
    Reject: "reject",
    Pending: "pending",
    Timeout: "timeout",
    OtpProgress: "otpProgress"
};

function SetResultIcon(result) {
    $('#DivProgress').hide();
    switch (result) {
        case resultIcon.Progress:
            $('#DivReply').hide();
            $('#DivProgress').show();
            $('#imgProgress').attr("src", get_display_lang('pic_path') + get_display_lang('pic_progress'));
            $('#lblProgress').html(get_display_lang('lbl_progress'));
            break;
        case resultIcon.OtpProgress:
            $('#DivLinkTandC').hide();
            $('#DivOtpProgress').show();
            $('#imgOtpProgress').attr("src", get_display_lang('pic_path') + get_display_lang('pic_progress'));
            break;
        case resultIcon.Success:
            var isAutopay = false;
            switch (transactionIndicator) {
                case bankAccType.nba1:
                    if (nba1TransactionType == transactionType.autopay) {
                        isAutopay = true;
                    }
                    break;
                case bankAccType.nba1:
                    if (nba2TransactionType = transactionType.autopay) {
                        isAutopay = true;
                    }
                    break;
            }
            $('#imgResult').attr("src", get_display_lang('pic_path') + get_display_lang('pic_successful'));
            if (isAutopay) {
                if (eftAction == eftActions.deposit) {
                    $('#lblResult').html(get_display_lang('lbl_deposit_pending'));
                    $('#lblResultTransTypeValue').html(get_display_lang('lbl_deposit_autopay'))
                }
                if (eftAction == eftActions.withdrawal) {
                    $('#lblResult').html(get_display_lang('lbl_withdrawal_pending'));
                    $('#lblResultTransTypeValue').html(get_display_lang('lbl_withdrawal_autopay'))
                }
            } else {
                $('#lblResult').html(get_display_lang('lbl_successful'));
            }
            break;
        case resultIcon.Reject:
            $('#imgResult').attr("src", get_display_lang('pic_path') + get_display_lang('pic_rejected'));
            $('#lblResult').html(get_display_lang('lbl_rejected'));
            break;
        case resultIcon.Pending:
            $('#imgResult').attr("src", get_display_lang('pic_path') + get_display_lang('pic_pending'));
            if (eftAction == eftActions.deposit) {
                $('#lblResult').html(get_display_lang('lbl_deposit_pending'));
                SetReminder(get_display_lang("fps_deposit_bx_reminder"));
            }
            if (eftAction == eftActions.withdrawal) {
                $('#lblResult').html(get_display_lang('lbl_withdrawal_pending'));
                SetReminder(get_display_lang("fps_withdrawal_bx_reminder"));
            }
            break;
        case resultIcon.Timeout:
            $('#imgResult').attr("src", get_display_lang('pic_path') + get_display_lang('pic_timeout'));
            $('#lblResult').html(get_display_lang('lbl_timeout'));
            break;
    }
}

function AdjustLinkBankUi() {

    var height = $('#DivLinkNba1Ph').height();
    if ($('#DivLinkNba2Ph').height() > $('#DivLinkNba1Ph').height()) {
        height = $('#DivLinkNba2Ph').height();
    }

    $('#DivLinkNba1Fps').height(height + 30);
    $('#DivLinkNba2Fps').height(height + 30);

    /*
    if (($('#DivLinkFps1').is(":visible") && $('#DivLinkNba1Epsco').is(":visible")) ||
        ($('#DivLinkFps2').is(":visible") && $('#DivLinkNba2Epsco').is(":visible")) ||
        $('#DivLinkNba1NotSupport').is(":visible") ||
        $('#DivLinkNba2NotSupport').is(":visible")) {
        $('#DivLinkNba1Fps').height(215);
        $('#DivLinkNba2Fps').height(215);
    } else {
        $('#DivLinkNba1Fps').height(160);
        $('#DivLinkNba2Fps').height(160);
    }
    */
}
// *****************************************************************************************************