function invalidSessionWarning() {
    alert(get_display_lang('1101'));
    window.close();
}

function get_display_lang(inval) {
    switch (GetLanguage()) {
        case (0):
            return eft_array_en_name[inval];
            break;
        case (1):
            return eft_array_ch_name[inval];
            break;
        default:
            return eft_array_ch_name[inval];
            break;
    }
}

function get_image_lang(inval) {
    switch (GetLanguage()) {
        case (0):
            return eft_array_en_name["pic_path"] + eft_array_en_name[inval] + cacheVersion;
            break;

        case (1):
            return eft_array_ch_name["pic_path"] + eft_array_ch_name[inval] + cacheVersion;
            break;

        default:
            return eft_array_ch_name["pic_path"] + eft_array_ch_name[inval] + cacheVersion;
            break;
    }
}

var ppsFaqUrl = '';

function onClickPPSFAQ(errorCode) {
    var left = (screen.width - 770) / 2;
    var top = (screen.height - 550) / 2;
    var sFeatures = 'left=' + left + ',top=' + top + ',width=770,height=550' +
        ',scrollbars=1,status=1' +
        ',location=0,menubar=0,resizable=0,titlebar=0';
    window.open(ppsFaqUrl + '?ec=' + errorCode, "_blank", sFeatures);
}

function eftMenuActive(id) {
    $(".eftMenu").css("font-weight", "");
    if (id) {
        $("#eftMenuBtn" + id).css("font-weight", "bold");
    } else {
        $("#eftMenuBtn0").css("font-weight", "bold");
    }
}

// ***************************** Images **************************************
var eft_array_ch_name = new Array();
var eft_array_en_name = new Array();

eft_array_ch_name["pic_path"] = "/info/include/images/";
eft_array_en_name["pic_path"] = "/info/include/images/";

eft_array_ch_name["pic_eft"] = "ch_eft.gif";
eft_array_en_name["pic_eft"] = "en_eft.gif";

eft_array_ch_name["pic_0"] = "f0.gif";
eft_array_en_name["pic_0"] = "f0.gif";

eft_array_ch_name["pic_1"] = "f1.gif";
eft_array_en_name["pic_1"] = "f1.gif";

eft_array_ch_name["pic_2"] = "f2.gif";
eft_array_en_name["pic_2"] = "f2.gif";

eft_array_ch_name["pic_3"] = "f3.gif";
eft_array_en_name["pic_3"] = "f3.gif";

eft_array_ch_name["pic_4"] = "f4.gif";
eft_array_en_name["pic_4"] = "f4.gif";

eft_array_ch_name["pic_5"] = "f5.gif";
eft_array_en_name["pic_5"] = "f5.gif";

eft_array_ch_name["pic_6"] = "f6.gif";
eft_array_en_name["pic_6"] = "f6.gif";

eft_array_ch_name["pic_7"] = "f7.gif";
eft_array_en_name["pic_7"] = "f7.gif";

eft_array_ch_name["pic_8"] = "f8.gif";
eft_array_en_name["pic_8"] = "f8.gif";

eft_array_ch_name["pic_9"] = "f9.gif";
eft_array_en_name["pic_9"] = "f9.gif";

eft_array_ch_name["pic_0down"] = "f0a.gif";
eft_array_en_name["pic_0down"] = "f0a.gif";

eft_array_ch_name["pic_1down"] = "f1a.gif";
eft_array_en_name["pic_1down"] = "f1a.gif";

eft_array_ch_name["pic_2down"] = "f2a.gif";
eft_array_en_name["pic_2down"] = "f2a.gif";

eft_array_ch_name["pic_3down"] = "f3a.gif";
eft_array_en_name["pic_3down"] = "f3a.gif";

eft_array_ch_name["pic_4down"] = "f4a.gif";
eft_array_en_name["pic_4down"] = "f4a.gif";

eft_array_ch_name["pic_5down"] = "f5a.gif";
eft_array_en_name["pic_5down"] = "f5a.gif";

eft_array_ch_name["pic_6down"] = "f6a.gif";
eft_array_en_name["pic_6down"] = "f6a.gif";

eft_array_ch_name["pic_7down"] = "f7a.gif";
eft_array_en_name["pic_7down"] = "f7a.gif";

eft_array_ch_name["pic_8down"] = "f8a.gif";
eft_array_en_name["pic_8down"] = "f8a.gif";

eft_array_ch_name["pic_9down"] = "f9a.gif";
eft_array_en_name["pic_9down"] = "f9a.gif";

eft_array_ch_name["pic_progress"] = "eft_progress.gif";
eft_array_en_name["pic_progress"] = "eft_progress.gif";

eft_array_ch_name["pic_pending"] = "eft_pending.png";
eft_array_en_name["pic_pending"] = "eft_pending.png";

eft_array_ch_name["pic_rejected"] = "eft_rejected.png";
eft_array_en_name["pic_rejected"] = "eft_rejected.png";

eft_array_ch_name["pic_successful"] = "eft_successful.png";
eft_array_en_name["pic_successful"] = "eft_successful.png";

eft_array_ch_name["pic_timeout"] = "eft_timeout.png";
eft_array_en_name["pic_timeout"] = "eft_timeout.png";

eft_array_ch_name["pic_link_avaliable"] = "link_avaliable.png";
eft_array_en_name["pic_link_avaliable"] = "link_avaliable.png";

eft_array_ch_name["pic_link_bound"] = "link_bound.png";
eft_array_en_name["pic_link_bound"] = "link_bound.png";

eft_array_ch_name["pic_link_failed"] = "link_failed.png";
eft_array_en_name["pic_link_failed"] = "link_failed.png";

eft_array_ch_name["pic_link_pending"] = "link_pending.png";
eft_array_en_name["pic_link_pending"] = "link_pending.png";

// ***************************** Button Label **************************************

eft_array_ch_name["pic_send"] = "btn_send_ch.gif";
eft_array_en_name["pic_send"] = "btn_send_en.gif";

eft_array_ch_name["pic_send_on"] = "btn_send_on_ch.gif";
eft_array_en_name["pic_send_on"] = "btn_send_on_en.gif";

eft_array_ch_name["pic_reset"] = "btn_reset_ch.gif";
eft_array_en_name["pic_reset"] = "btn_reset_en.gif";

eft_array_ch_name["pic_reset_on"] = "btn_reset_on_ch.gif";
eft_array_en_name["pic_reset_on"] = "btn_reset_on_en.gif";

eft_array_ch_name["pic_close"] = "btn_close_ch.gif";
eft_array_en_name["pic_close"] = "btn_close_en.gif";

eft_array_ch_name["pic_close_on"] = "btn_close_on_ch.gif";
eft_array_en_name["pic_close_on"] = "btn_close_on_en.gif";

eft_array_ch_name["pic_transfer"] = "btn_transfer_ch.gif";
eft_array_en_name["pic_transfer"] = "btn_transfer_en.gif";

eft_array_ch_name["pic_transfer_on"] = "btn_transfer_on_ch.gif";
eft_array_en_name["pic_transfer_on"] = "btn_transfer_on_en.gif";

eft_array_ch_name["pic_backspace"] = "btn_backspace.gif";
eft_array_en_name["pic_backspace"] = "btn_backspace.gif";

eft_array_ch_name["pic_backspace_on"] = "btn_backspace_on.gif";
eft_array_en_name["pic_backspace_on"] = "btn_backspace_on.gif";

eft_array_ch_name["pic_clear"] = "btn_resave_ch.gif";
eft_array_en_name["pic_clear"] = "btn_resave_en.gif";

eft_array_ch_name["pic_clear_on"] = "btn_resave_on_ch.gif";
eft_array_en_name["pic_clear_on"] = "btn_resave_on_en.gif";

eft_array_ch_name["pic_ok"] = "btn_ok_ch.gif";
eft_array_en_name["pic_ok"] = "btn_ok_en.gif";

eft_array_ch_name["pic_ok_on"] = "btn_ok_on_ch.gif";
eft_array_en_name["pic_ok_on"] = "btn_ok_on_en.gif";

eft_array_ch_name["btn_new_trans"] = "開始新的轉賬";
eft_array_en_name["btn_new_trans"] = "Start New Transfer";

eft_array_ch_name["btn_submit"] = "傳送";
eft_array_en_name["btn_submit"] = "Send";

eft_array_ch_name["btn_reset"] = "重設";
eft_array_en_name["btn_reset"] = "Reset";

eft_array_ch_name["btn_close"] = "關閉";
eft_array_en_name["btn_close"] = "Close";

eft_array_ch_name["btn_next"] = "繼續";
eft_array_en_name["btn_next"] = "Next";

eft_array_ch_name["btn_done"] = "完成";
eft_array_en_name["btn_done"] = "Done";

eft_array_ch_name["btn_cancel"] = "取消";
eft_array_en_name["btn_cancel"] = "Cancel";

eft_array_ch_name["btn_backspace"] = "退位";
eft_array_en_name["btn_backspace"] = "Backspace";

eft_array_ch_name["btn_resave"] = "重新儲入";
eft_array_en_name["btn_resave"] = "Re-Input";

eft_array_ch_name["btn_ok"] = "確定";
eft_array_en_name["btn_ok"] = "Confirm";

eft_array_ch_name["alt_pic_eft_help"] = "轉賬服務指南";
eft_array_en_name["alt_pic_eft_help"] = "Fund Transfer Guide";

eft_array_en_name["btn_reinput"] = "Re-input";
eft_array_ch_name["btn_reinput"] = "重新輸入";

eft_array_en_name["btn_back"] = "Back";
eft_array_ch_name["btn_back"] = "返回";

eft_array_en_name["btn_confirm"] = "Confirm";
eft_array_ch_name["btn_confirm"] = "確認";

eft_array_en_name["btn_continue"] = "Continue";
eft_array_ch_name["btn_continue"] = "繼續";

eft_array_en_name["btn_continue_autopay"] = "Continue";
eft_array_ch_name["btn_continue_autopay"] = "改用銀行非即時提款";

eft_array_en_name["btn_linknow"] = "Link Now";
eft_array_ch_name["btn_linknow"] = "立即綁定";

// ***************************** Label **************************************

eft_array_ch_name["lbl_eft_title"] = "轉賬服務";
eft_array_en_name["lbl_eft_title"] = "Funds Transfer";

eft_array_ch_name["lbl_online_deposit"] = "網上存款";
eft_array_en_name["lbl_online_deposit"] = "Online Deposit";

eft_array_ch_name["lbl_online_withdrawal"] = "網上提款";
eft_array_en_name["lbl_online_withdrawal"] = "Online Withdrawal";

eft_array_ch_name["lbl_link_account"] = "綁定銀行戶口";
eft_array_en_name["lbl_link_account"] = "Linking Bank Account"

eft_array_ch_name["lbl_from_bank"] = "由銀行戶口一 {0} 至投注戶口 {1}";
eft_array_en_name["lbl_from_bank"] = "FROM Bank Account 1  {0} TO My Account {1}";

eft_array_ch_name["lbl_from_bank2"] = "由銀行戶口二 {0} 至投注戶口 {1}";
eft_array_en_name["lbl_from_bank2"] = "FROM Bank Account 2 {0} TO My Account {1}";

eft_array_ch_name["lbl_to_bank"] = "由投注戶口 {0} 至銀行戶口一 {1}";
eft_array_en_name["lbl_to_bank"] = "FROM My Account {0} TO Bank Account 1 {1}";

eft_array_ch_name["lbl_bank_account_1"] = "銀行戶口一";
eft_array_en_name["lbl_bank_account_1"] = "Bank Account 1";

eft_array_ch_name["lbl_bank_account_2"] = "銀行戶口二";
eft_array_en_name["lbl_bank_account_2"] = "Bank Account 2";

eft_array_ch_name["lbl_from_pps"] = "繳費靈";
eft_array_en_name["lbl_from_pps"] = "PPS";

eft_array_ch_name["lbl_from_pps2"] = "即時存款";
eft_array_en_name["lbl_from_pps2"] = "Instant Funds Deposit";

eft_array_ch_name["lbl_trans"] = "轉賬";
eft_array_en_name["lbl_trans"] = "Transfer";

eft_array_ch_name["lbl_trans_amount"] = "轉賬金額($)";
eft_array_en_name["lbl_trans_amount"] = "Transfer amount $";

eft_array_ch_name["lbl_trans_method"] = "轉賬途徑";
eft_array_en_name["lbl_trans_method"] = "Transfer method";

eft_array_ch_name["lbl_trans_instant_deposit"] = "即時存款";
eft_array_en_name["lbl_trans_instant_deposit"] = "Instant Deposit";

eft_array_ch_name["lbl_trans_instant_deposit_fps"] = "香港賽馬會轉數快即時存款";
eft_array_en_name["lbl_trans_instant_deposit_fps"] = "HKJC FPS Instant Deposit";

eft_array_ch_name["lbl_trans_instant_deposit_epsco"] = "香港賽馬會易辦事即時存款";
eft_array_en_name["lbl_trans_instant_deposit_epsco"] = "HKJC EPS Instant Deposit";

eft_array_ch_name["lbl_trans_deposit_autopay"] = "銀行非即時存款";
eft_array_en_name["lbl_trans_deposit_autopay"] = "Bank Non-Instant Deposit";

eft_array_ch_name["lbl_trans_deposit_autopay_note"] = "每日只限一次，需時大約一個工作天。";
eft_array_en_name["lbl_trans_deposit_autopay_note"] = "Available once per day and will be processed within 1 working day.";

eft_array_ch_name["lbl_trans_instant_withdrawal"] = "即時提款";
eft_array_en_name["lbl_trans_instant_withdrawal"] = "Instant Withdrawal";

eft_array_ch_name["lbl_trans_instant_withdrawal_fps"] = "香港賽馬會轉數快即時提款";
eft_array_en_name["lbl_trans_instant_withdrawal_fps"] = "HKJC FPS Instant Withdrawal";

eft_array_ch_name["lbl_trans_instant_withdrawal_epsco"] = "香港賽馬會易辦事即時提款";
eft_array_en_name["lbl_trans_instant_withdrawal_epsco"] = "HKJC EPS Instant Withdrawal";

eft_array_ch_name["lbl_trans_withdrawal_autopay"] = "銀行非即時提款";
eft_array_en_name["lbl_trans_withdrawal_autopay"] = "Bank Non-Instant Withdrawal";

eft_array_ch_name["lbl_ol_trans"] = "即時過戶";
eft_array_en_name["lbl_ol_trans"] = "Instant Online Transfer";

eft_array_ch_name["lbl_autopay_deposit"] = "銀行非即時存款";
eft_array_en_name["lbl_autopay_deposit"] = "Bank Non-Instant Deposit";

eft_array_ch_name["lbl_autopay_withdrawal"] = "銀行非即時提款";
eft_array_en_name["lbl_autopay_withdrawal"] = "Bank Non-Instant Withdrawal";

eft_array_ch_name["lbl_cert_pwd"] = "「投注區」密碼";
eft_array_en_name["lbl_cert_pwd"] = "eWin Password";

eft_array_ch_name["lbl_no_pin"] = "此交易毋須儲入密碼";
eft_array_en_name["lbl_no_pin"] = "No PIN is required for this transaction";

eft_array_ch_name["lbl_notice"] = "請使用以下「虛擬鍵盤」儲入密碼。儲入密碼時，需先留意四周環境，以免洩漏密碼。";
eft_array_en_name["lbl_notice"] = "Use this \"Virtual Keypad\" below to enter your PIN. Be aware of your surroundings when entering<br> your PIN-don't let others see what you are typing!";

eft_array_ch_name["lbl_bank_pin"] = "香港賽馬會易辦事轉賬密碼 (8位數字)";
eft_array_en_name["lbl_bank_pin"] = "HKJC EPS EFT PIN (8-digit)";

eft_array_ch_name["lbl_show_balance"] = "顯示銀行戶口結餘";
eft_array_en_name["lbl_show_balance"] = "Show bank account balance";

eft_array_ch_name["lbl_yes"] = "顯示";
eft_array_en_name["lbl_yes"] = "Show";

eft_array_en_name["lbl_no"] = "Hide";
eft_array_ch_name["lbl_no"] = "不顯示";

eft_array_ch_name["lbl_bank_acct"] = "銀行戶口";
eft_array_en_name["lbl_bank_acct"] = "Bank Account";

eft_array_ch_name["lbl_cur_balance"] = "結存金額 $";
eft_array_en_name["lbl_cur_balance"] = "Current balance $";

eft_array_ch_name["lbl_avai_balance"] = "可供提取金額 $";
eft_array_en_name["lbl_avai_balance"] = "Available balance $";

eft_array_ch_name["lbl_acct_number"] = "戶口號碼";
eft_array_en_name["lbl_acct_number"] = "Account number";

eft_array_ch_name["lbl_acct_balance"] = "戶口結存 $";
eft_array_en_name["lbl_acct_balance"] = "Account balance $";

eft_array_ch_name["lbl_txn_ref_num"] = "參考編號";
eft_array_en_name["lbl_txn_ref_num"] = "Reference No.";

eft_array_ch_name["lbl_result_msg"] = "結果/訊息";
eft_array_en_name["lbl_result_msg"] = "Result/Messages";

eft_array_ch_name["lbl_deposit"] = "存款";
eft_array_en_name["lbl_deposit"] = "Deposit";

eft_array_ch_name["lbl_from"] = "由";
eft_array_en_name["lbl_from"] = "From";

eft_array_ch_name["lbl_to"] = "至";
eft_array_en_name["lbl_to"] = "To";

eft_array_ch_name["lbl_bettingacct"] = "投注戶口";
eft_array_en_name["lbl_bettingacct"] = "Betting Account"

eft_array_ch_name["lbl_withdrawal"] = "提款";
eft_array_en_name["lbl_withdrawal"] = "Withdrawal";

eft_array_ch_name["lbl_deposit_autopay"] = "銀行非即時存款";
eft_array_en_name["lbl_deposit_autopay"] = "Bank Non-Instant Deposit";

eft_array_ch_name["lbl_withdrawal_autopay"] = "銀行非即時提款";
eft_array_en_name["lbl_withdrawal_autopay"] = "Bank Non-Instant Withdrawal";

eft_array_ch_name["lbl_withdrawal_autopay_once"] = '<br/><span style="font-size:10px">每日只限一次，需時大約一個工作天。</span>';
eft_array_en_name["lbl_withdrawal_autopay_once"] = '<br/><span style="font-size:10px">Avaliable once per day and will be processed within 1 working day.</span>';

eft_array_ch_name["lbl_bank_balance"] = "銀行戶口結餘";
eft_array_en_name["lbl_bank_balance"] = "Bank Balance";

eft_array_ch_name["lbl_tb_acct_balance"] = "戶口結餘";
eft_array_en_name["lbl_tb_acct_balance"] = "Account Balance";

eft_array_ch_name["lbl_pps_deposit"] = "繳費靈至投注戶口 (參考編號: ###DIGITAL_ORDER###)";
eft_array_en_name["lbl_pps_deposit"] = "PPS to Betting Account (Ref No: ###DIGITAL_ORDER###)";

eft_array_ch_name["lbl_dda_deposit"] = "銀行非即時存款至投注戶口 (參考編號: ###REF_NO###)";
eft_array_en_name["lbl_dda_deposit"] = "Bank Non-Instant Deposit to Betting Account (Ref No: ###REF_NO###)";

eft_array_ch_name["lbl_txn_date"] = "交易日期";
eft_array_en_name["lbl_txn_date"] = "Transaction date";

eft_array_ch_name["lbl_ref_no"] = "商戶交易編號";
eft_array_en_name["lbl_ref_no"] = "Merchant transaction reference";

eft_array_ch_name["lbl_trans_type"] = "轉賬方式";
eft_array_en_name["lbl_trans_type"] = "Transaction Method";

eft_array_ch_name["lbl_payment_no"] = "付款編號";
eft_array_en_name["lbl_payment_no"] = "Payment reference";

eft_array_ch_name["lbl_txn_amount"] = "金額";
eft_array_en_name["lbl_txn_amount"] = "Amount";

eft_array_ch_name["lbl_deposit_amount"] = "存款金額";
eft_array_en_name["lbl_deposit_amount"] = "Deposit Amount";

eft_array_ch_name["lbl_withdrawal_amount"] = "提款金額";
eft_array_en_name["lbl_withdrawal_amount"] = "Withdrawal Amount";

eft_array_ch_name["lbl_pps_reject_msg"] = "繳費靈存款不被接納，請參考<a href='#' onclick='onClickOfficialPPSFAQ(@@@)'>常見問題</a>或致電 1818 查詢。(錯誤訊息：@@@)";
eft_array_en_name["lbl_pps_reject_msg"] = "PPS Deposit has not been accepted, please see <a href='#' onclick='onClickOfficialPPSFAQ(@@@)'>FAQ</a> for details or call 1818 (ERROR CODE: @@@)";

eft_array_ch_name["lbl_dda_accept_msg"] = "請於下一個工作天檢查閣下的戶口紀錄。";
eft_array_en_name["lbl_dda_accept_msg"] = "Please check your account records on the next working day.";

eft_array_ch_name["lbl_dda_deposit_accept_msg"] = "存款指示已提交，請於下一個工作天檢查閣下的戶口紀錄。";
eft_array_en_name["lbl_dda_deposit_accept_msg"] = "The deposit instruction has been submitted, please check your account records on the next working day.";

eft_array_ch_name["lbl_dda_withdrawal_accept_msg"] = "提款指示已提交，請於下一個工作天檢查閣下的戶口紀錄。";
eft_array_en_name["lbl_dda_withdrawal_accept_msg"] = "The withdrawal instruction has been submitted, please check your account records on the next working day.";

eft_array_ch_name["lbl_dda_reject_msg"] = "(@@@) 存款指令並未執行．請再嘗試或致電1818查詢．";
eft_array_en_name["lbl_dda_reject_msg"] = "(@@@) The deposit instruction has not been executed. Please retry or call 1818 for further enquiries.";

eft_array_en_name["lbl_dda_request_msg"] = "Bank Non-Instant Deposit Instruction ##AMOUNT## sent to bank (Ref No. ##REF_NO##)";
eft_array_ch_name["lbl_dda_request_msg"] = "銀行非即時存款指令 ##AMOUNT## 已傳送至銀行 (參考編號: ##REF_NO##)";

eft_array_en_name["lbl_dda_request_no_ref_msg"] = "Bank Non-Instant Deposit Instruction ##AMOUNT## sent to bank";
eft_array_ch_name["lbl_dda_request_no_ref_msg"] = "銀行非即時存款指令 ##AMOUNT## 已傳送至銀行";

eft_array_en_name["lbl_preview"] = "Preview";
eft_array_ch_name["lbl_preview"] = "預覽";

eft_array_en_name["lbl_preview2"] = "Please confirm the transaction details.";
eft_array_ch_name["lbl_preview2"] = "請確認交易詳情。";

eft_array_en_name["lbl_progress"] = "Transaction is being processed by your bank";
eft_array_ch_name["lbl_progress"] = "交易正由銀行處理中";

eft_array_en_name["lbl_successful"] = "Successful";
eft_array_ch_name["lbl_successful"] = "成功";

eft_array_en_name["lbl_rejected"] = "Rejected";
eft_array_ch_name["lbl_rejected"] = "失敗";

eft_array_en_name["lbl_timeout"] = "Time Out";
eft_array_ch_name["lbl_timeout"] = "操作逾時";

eft_array_en_name["lbl_unsuccessful"] = "Unsuccessful";
eft_array_ch_name["lbl_unsuccessful"] = "失敗";

eft_array_en_name["lbl_deposit_pending"] = "Deposit instruction has been submitted";
eft_array_ch_name["lbl_deposit_pending"] = "存款指示已提交";

eft_array_en_name["lbl_withdrawal_pending"] = "Withdrawal instruction has been submitted";
eft_array_ch_name["lbl_withdrawal_pending"] = "提款指示已提交";

eft_array_en_name["lbl_deposit_summary"] = "Summary";
eft_array_ch_name["lbl_deposit_summary"] = "摘要";

eft_array_en_name["lbl_withdrawal_summary"] = "Summary";
eft_array_ch_name["lbl_withdrawal_summary"] = "摘要";

eft_array_en_name["lbl_service_charge"] = "Service Charge";
eft_array_ch_name["lbl_service_charge"] = "手續費";

eft_array_en_name["lbl_no_nba_withdrawal"] = 'Currently you do not have any Nominated Bank Account. You can register Nominated Bank Account online via "<a target="_blank" href="https://m.hkjc.com/en/betting-apps-and-website.html#hkjc-account-opening">HKJC Account Opening</a>" app. Please visit our website <a target="_blank" href="https://m.hkjc.com/en">https://m.hkjc.com</a> for details.';
eft_array_ch_name["lbl_no_nba_withdrawal"] = '閣下並沒有登記任何「指定轉賬銀行戶口」。客戶可於「<a target="_blank" href="https://m.hkjc.com/tc/betting-apps-and-website.html#hkjc-account-opening">馬會開戶口</a>」應用程式內進行登記，詳情可瀏覽本會網頁<a target="_blank" href="https://m.hkjc.com/tc">https://m.hkjc.com</a>。';

eft_array_en_name["lbl_service_notice"] = "Application Notice";
eft_array_ch_name["lbl_service_notice"] = "服務通知";

eft_array_en_name["lbl_no_eft"] = "You have not applied for HKJC EPS Instant EFT, please bring along your identity documents and designated bank card to visit Off-course Betting Branch or Racecourse for registration. ";
eft_array_ch_name["lbl_no_eft"] = "尚未申請香港賽馬會易辦事即時轉賬，請帶同身分證明文件以及指定銀行的提款卡前往場外投注處或馬場登記。"

eft_array_en_name["lbl_service_approve"] = "Your online setup of HKJC FPS Instant EFT has been approved by your bank.";
eft_array_ch_name["lbl_service_approve"] = "閣下就香港賽馬會轉數快即時轉賬的綁定申請已成功獲閣下之銀行批准。";

eft_array_en_name["lbl_service_reject"] = "Your online setup of HKJC FPS Instant EFT has been rejected by your bank.";
eft_array_ch_name["lbl_service_reject"] = "閣下就香港賽馬會轉數快即時轉賬的綁定申請已被閣下之銀行拒絕。";

eft_array_en_name["lbl_confirm_autopay_amount"] = "The instant withdrawal amount has exceeded the daily limit. This transaction will be processed via Bank Non-Instant Withdrawal. Limited to once per day and the amount will be credited to your bank account by the next working day. <br/><br/>Would you like to continue with Bank Non-Instant Withdrawal?";
eft_array_ch_name["lbl_confirm_autopay_amount"] = "即時提款金額已超出每日上限，此筆款項將改爲以銀行非即時提款方式存入閣下之銀行戶口，每日只限一次，需時大約一個工作天。<br/><br/>繼續並使用銀行非即時提款嗎？";

eft_array_en_name["lbl_confirm_autopay_count"] = "The number of requests for instant withdrawal has exceeded the daily limit. This transaction will be processed via Bank Non-Instant Withdrawal. Limited to once per day and the amount will be credited to your bank account by next working day. <br/></br>Would you like to continue with Bank Non-Instant Withdrawal?";
eft_array_ch_name["lbl_confirm_autopay_count"] = "即時提款次數已超出每日上限，此筆款項將改爲以銀行非即時提款方式存入閣下之銀行戶口，每日只限一次，需時大約一個工作天。<br/><br/>繼續並使用銀行非即時提款嗎？";

eft_array_en_name["lbl_confirm_autopay_pin"] = "Instant withdrawal cannot be completed due to incorrect HKJC EPS EFT PIN (8-digit).<br/><br/>Or you can apply the HKJC FPS Instant EFT. After link up your Nominated Bank Account via online betting channels, password will no longer required for instant funds transfer.<br/><br/>You may choose to continue this transaction via Bank Non-Instant Withdrawal. Limited to once per day and the amount will be credited to your bank account by the next working day.<br/></br>Would you like to continue with Bank Non-Instant Withdrawal?";
eft_array_ch_name["lbl_confirm_autopay_pin"] = "由於閣下之香港賽馬會易辦事轉賬密碼(8位數字)不正確，即時提款未能完成。<br/><br/>閣下可選擇申請香港賽馬會轉數快即時轉賬，您只需於投注應用程式綁定銀行戶口，即可使用此即時轉賬服務而不需要密碼。<br/><br/>本次提款可以銀行非即時提款方式存入閣下之銀行戶口，每日只限一次，需時大約一個工作天。<br/><br/>繼續並使用銀行非即時提款嗎？";

eft_array_en_name["lbl_confirm_autopay_suspend"] = "Your HKJC EPS Instant EFT has been suspended. Please visit Off-course Betting Branch or Racecourse to re-register the service.<br/><br/>Or you can apply the HKJC FPS Instant EFT. After link up your Nominated Bank Account via online betting channels, password will no longer required for instant funds transfer.<br/><br/>You may choose to continue this withdrawal transaction via Bank Non-Instant Withdrawal. Limited to once per day and the amount will be credited to your bank account by the next working day.<br/><br/>Would you like to continue with Bank Non-Instant Withdrawal?";
eft_array_ch_name["lbl_confirm_autopay_suspend"] = "由於閣下之香港賽馬會易辦事即時轉賬已被停用。請到本會分行或馬場重新登記服務。<br/></br/>閣下亦可申請香港賽馬會轉數快即時轉賬，您只需於投注應用程式綁定銀行戶口，便可使用此即時轉賬服務而不需要密碼。<br/><br/>本次提款可以銀行非即時提款方式存入閣下之銀行戶口，每日只限一次，需時大約一個工作天。<br/><br/>繼續並使用銀行非即時提款嗎？";

eft_array_en_name["lbl_confirm_autopay_fault_header"] = "System Maintenance Notice";
eft_array_ch_name["lbl_confirm_autopay_fault_header"] = "系統維護通知";

eft_array_en_name["lbl_confirm_autopay_fault"] = "Due to bank system maintenance, HKJC EPS Instant EFT is now suspended. The transaction will be processed via Bank Non-Instant Withdrawal and the amount would be credited to your bank account by next working day.<br/></br>Would you like to continue with Bank Non-Instant Withdrawal?";
eft_array_ch_name["lbl_confirm_autopay_fault"] = "由於銀行系統維護，香港賽馬會電子轉賬服務現正暫停服務。該筆款項將改爲以銀行非即時提款方式存入閣下之銀行戶口，需時大約一個工作天。<br/><br/>繼續使用銀行非即時提款嗎？";

eft_array_en_name["lbl_deposit_confirm_charge_title"] = "Exceeded Monthly Deposit Limit";
eft_array_ch_name["lbl_deposit_confirm_charge_title"] = "超出每月存款限額";

eft_array_en_name["lbl_withdrawal_exceed_limit"] = "Exceeded Daily Instant Withdrawal Limit";
eft_array_ch_name["lbl_withdrawal_exceed_limit"] = "超出每日即時提款限額";

eft_array_en_name["lbl_withdrawal_exceed_count"] = "Exceeded Daily Instant Withdrawal Limit";
eft_array_ch_name["lbl_withdrawal_exceed_count"] = "超出每日即時提款次數";

eft_array_en_name["lbl_withdrawal_incorrect_pin"] = "Incorrect HKJC EPS EFT PIN";
eft_array_ch_name["lbl_withdrawal_incorrect_pin"] = "香港賽馬會易辦事轉賬密碼不正確";

eft_array_en_name["lbl_withdrawal_incorrect_suspend"] = "Your HKJC EPS Instant EFT Has Been Suspended";
eft_array_ch_name["lbl_withdrawal_incorrect_suspend"] = "閣下之香港賽馬會易辦事即時轉賬已被停用";

eft_array_en_name["lbl_deposit_confirm_charge"] = "You have exceeded the monthly limit of transaction number, $@@@ service charge will be imposed to the current transaction.<br/><br/>Would you like to continue?";
eft_array_ch_name["lbl_deposit_confirm_charge"] = "轉賬次數已超出每月上限，是次轉賬將會收取$@@@元手續費。<br/><br/>是否繼續？";

eft_array_en_name["lbl_no_nba"] = 'Currently you do not have any Nominated Bank Account. You can register Nominated Bank Account online via "<a target="_blank" href="https://m.hkjc.com/en/betting-apps-and-website.html#hkjc-account-opening">HKJC Account Opening</a>" app. Please visit our website <a target="_blank" href="https://m.hkjc.com/en">https://m.hkjc.com</a> for details.';
eft_array_ch_name["lbl_no_nba"] = '閣下並沒有登記任何「指定轉賬銀行戶口」。客戶可於「<a target="_blank" href="https://m.hkjc.com/tc/betting-apps-and-website.html#hkjc-account-opening">馬會開戶口</a>」應用程式內進行登記，詳情可瀏覽本會網頁<a target="_blank" href="https://m.hkjc.com/tc">https://m.hkjc.com</a>。';

eft_array_en_name["lbl_no_fps"] = "You have not applied for HKJC FPS Instant EFT, please link up your Nominated Bank Account with HKJC FPS Instant EFT. Or the service is now under maintenance, please retry later.";
eft_array_ch_name["lbl_no_fps"] = "閣下尚未申請香港賽馬會轉數快即時轉賬，請先綁定銀行戶口。或系統現正進行維護，請稍後再試。";

eft_array_en_name["lbl_no_nba_link"] = "<br/> <br/>Then, you can link up your bank account with HKJC FPS Instant EFT under \"Linking Bank Account\" section.";
eft_array_ch_name["lbl_no_nba_link"] = "<br/> <br/>完成登記後，閣下可於「綁定銀行戶口」頁面綁定指定銀行戶口作香港賽馬會轉數快即時轉賬用途。";

eft_array_en_name["lbl_fps_bank_url"] = '<br/><br/><a href="javascript:LoadFpsBankList();">Please click here for FPS supported bank list</a>.';
eft_array_ch_name["lbl_fps_bank_url"] = '<br/><br/><a href="javascript:LoadFpsBankList();">請按此查詢支援轉數快的銀行。</a>';

eft_array_en_name["lbl_no_nba_linkup"] = "You need to link up your Nominated Bank Account with HKJC FPS Instant EFT under \"Linking Bank Account\" section first.";
eft_array_ch_name["lbl_no_nba_linkup"] = "如須使用香港賽馬會轉數快即時轉賬，請先進行銀行戶口綁定。";

eft_array_en_name["lbl_bank_maintenance"] = "Due to bank system maintenance, HKJC FPS Instant EFT is now suspended. Please try again later.";
eft_array_ch_name["lbl_bank_maintenance"] = "由於銀行系統維護，香港賽馬會轉數快即時轉賬現正暫停服務，請稍後再試。";

eft_array_en_name["lbl_bank_maintenance_epsco"] = "Due to bank system maintenance, HKJC EPS Instant EFT is now suspended. Please try again later.";
eft_array_ch_name["lbl_bank_maintenance_epsco"] = "由於銀行系統維護，香港賽馬會易辦事即時轉賬現正暫停服務，請稍後再試。";

eft_array_en_name["lbl_banklist_title"] = "HKJC FPS Instant EFT is applicable to the following banks:";
eft_array_ch_name["lbl_banklist_title"] = "香港賽馬會轉數快即時轉賬適用於以下銀行：";

eft_array_en_name["lbl_bankcode"] = "Bank Code";
eft_array_ch_name["lbl_bankcode"] = "銀行編號";

eft_array_en_name["lbl_bankname"] = "Bank Name";
eft_array_ch_name["lbl_bankname"] = "銀行名稱";

eft_array_en_name["lbl_link_msg"] = "Select your Nominated Bank Account to link up with HKJC FPS Instant EFT or review the linking status.";
eft_array_ch_name["lbl_link_msg"] = "選擇「指定轉賬銀行戶口」作香港賽馬會轉數快即時轉賬用途或查看綁定情況。";

eft_array_en_name["lbl_link_msg2"] = 'If the bank account number shown is not updated, you can update your nominated bank account online via “<a target="_blank" href="https://m.hkjc.com/en/betting-apps-and-website.html#hkjc-account-opening">HKJC Account Opening</a>”app. Please visit our website <a target="_blank" href="https://m.hkjc.com/en">https://m.hkjc.com</a> for details.';
eft_array_ch_name["lbl_link_msg2"] = '如需更新銀行戶口資料，客戶可於「<a target="_blank" href="https://m.hkjc.com/tc/betting-apps-and-website.html#hkjc-account-opening">馬會開戶口</a>」應用程式內更改指定銀行戶口，詳情可瀏覽本會網頁<a target="_blank" href="https://m.hkjc.com/tc">https://m.hkjc.com</a>。';

eft_array_en_name["lbl_link_nba"] = "Nominated Bank Account";
eft_array_ch_name["lbl_link_nba"] = "指定轉賬銀行戶口";

eft_array_en_name["lbl_link_pps"] = "PPS Account";
eft_array_ch_name["lbl_link_pps"] = "繳費靈戶口";

eft_array_en_name["lbl_link_nba1"] = "Nominated Bank Account 1";
eft_array_ch_name["lbl_link_nba1"] = "指定轉賬銀行戶口 1";

eft_array_en_name["lbl_link_nba2"] = "Nomainated Bank Account 2";
eft_array_ch_name["lbl_link_nba2"] = "指定轉賬銀行戶口 2";

eft_array_en_name["lbl_link_dep_wit"] = "(Deposit and Withdrawal)";
eft_array_ch_name["lbl_link_dep_wit"] = "(存款和提款)";

eft_array_en_name["lbl_link_dep"] = "(Deposit only)";
eft_array_ch_name["lbl_link_dep"] = "(只限存款)";

eft_array_en_name["lbl_fps"] = "FPS";
eft_array_ch_name["lbl_fps"] = "轉數快";

eft_array_en_name["lbl_epsco"] = "EPS";
eft_array_ch_name["lbl_epsco"] = "易辦事";

eft_array_en_name["lbl_link_avaliable"] = "(avaliable for linking)";
eft_array_ch_name["lbl_link_avaliable"] = "(可綁定)";

eft_array_en_name["lbl_link_linked"] = "(linked)";
eft_array_ch_name["lbl_link_linked"] = "(已綁定)";

eft_array_en_name["lbl_link_failed"] = "(failed to link)";
eft_array_ch_name["lbl_link_failed"] = "(未能綁定)";

eft_array_en_name["lbl_link_pending"] = "(pending for approval)";
eft_array_ch_name["lbl_link_pending"] = "(待審批)";

eft_array_en_name["lbl_link_no_mobile"] = "Nil";
eft_array_ch_name["lbl_link_no_mobile"] = "未能提供";

eft_array_en_name["lbl_no_nba1"] = "You can register one more bank account for online deposit and online withdrawal. Please visit Off-course Betting Branch or Racecourse with a valid bank card or original bank document that shows your full name and personal bank account number for registration.";
eft_array_ch_name["lbl_no_nba1"] = "閣下可再登記一個「指定轉賬銀行戶口」用於轉賬存款及提款服務。請帶同印有閣下姓名及個人銀行戶口號碼並有效的銀行卡或銀行正本文件到場外投注處或馬場登記。";

eft_array_en_name["lbl_no_nba2"] = "You can register one more bank account for online deposit. Please visit Off-course Betting Branch or Racecourse with a valid bank card or original bank document that shows your full name and personal bank account number for registration.";
eft_array_ch_name["lbl_no_nba2"] = "閣下可再登記一個「指定轉賬銀行戶口」用於轉賬存款服務。請帶同印有閣下姓名及個人銀行戶口號碼並有效的銀行卡或銀行正本文件到場外投注處或馬場登記。";

eft_array_en_name["lbl_link_no_nba"] = 'Currently you do not have any Nominated Bank Account. You can register Nominated Bank Account online via "<a target="_blank" href="https://m.hkjc.com/en/betting-apps-and-website.html#hkjc-account-opening">HKJC Account Opening</a>" app. Please visit our website <a target="_blank" href="https://m.hkjc.com/en">https://m.hkjc.com</a> for details.';
eft_array_ch_name["lbl_link_no_nba"] = '閣下並沒有登記任何「指定轉賬銀行戶口」。客戶可於「<a target="_blank" href="https://m.hkjc.com/tc/betting-apps-and-website.html#hkjc-account-opening">馬會開戶口</a>」應用程式內進行登記，詳情可瀏覽本會網頁<a target="_blank" href="https://m.hkjc.com/tc">https://m.hkjc.com</a>。';

eft_array_en_name["lbl_link_fullname"] = "Full Name";
eft_array_ch_name["lbl_link_fullname"] = "姓名";

eft_array_en_name["lbl_link_bankname"] = "Bank Name";
eft_array_ch_name["lbl_link_bankname"] = "銀行名稱";

eft_array_en_name["lbl_link_bankac"] = "Bank Account Number";
eft_array_ch_name["lbl_link_bankac"] = "銀行戶口號碼";

eft_array_en_name["lbl_link_mobile"] = "Mobile Number";
eft_array_ch_name["lbl_link_mobile"] = "手提電話號碼";

eft_array_en_name["lbl_tandc"] = "Terms & Conditions";
eft_array_ch_name["lbl_tandc"] = "條款及細則";

eft_array_en_name["lbl_tandc_check"] = "I have read and agree to the terms and conditions";
eft_array_ch_name["lbl_tandc_check"] = "本人已細閲並同意接受此條款及細則";

eft_array_en_name["lbl_link_unsuccessful"] = 'Linking bank account failed. We are unable to deliver the verification code to you as your registered mobile number is invalid.<br/><br/>Please login <a href="//wcip.hkjc.com/loginformCSSP.aspx?language=en-us" target="_blank">HKJC Customer eCentre</a> to update your mobile number.';
eft_array_ch_name["lbl_link_unsuccessful"] = '綁定銀行戶口失敗。閣下登記的手提電話號碼不正確，驗證碼無法傳送。<br/><br/>請登入<a href="//wcip.hkjc.com/loginformCSSP.aspx?language=zh-hk" target="_blank">HKJC 網上客戶中心</a>更新手提電話號碼。';

eft_array_en_name["lbl_otp_sent"] = 'A verification code has been sent to your mobile no.<div style="margin-top:10px">###</div>';
eft_array_ch_name["lbl_otp_sent"] = '驗證碼經已發送到手提電話號碼<div style="margin-top:10px">###</div>';

eft_array_en_name["lbl_otp_sent_incorrect"] = "If the mobile number is incorrect, <br/>please update it at HKJC Customer eCentre.";
eft_array_ch_name["lbl_otp_sent_incorrect"] = "如手提電話號碼不正確，<br/>請登入HKJC網上客戶中心進行更新。";

eft_array_en_name["lbl_opt_input"] = "Please input the code below";
eft_array_ch_name["lbl_opt_input"] = "請按入驗證碼";

eft_array_en_name["lbl_no_otp"] = "Did not receive the code?";
eft_array_ch_name["lbl_no_otp"] = "未能接收驗證碼？";

eft_array_en_name["lbl_otp_resend"] = "Resend";
eft_array_ch_name["lbl_otp_resend"] = "重新發送";

eft_array_en_name["lbl_otp_resend_success"] = "Verification code has been resent";
eft_array_ch_name["lbl_otp_resend_success"] = "驗證碼已重新發送";

eft_array_en_name["lbl_otp_invalid"] = "Invalid Verification Code. Please try again";
eft_array_ch_name["lbl_otp_invalid"] = "驗證碼無效, 請再試一次";

eft_array_en_name["lbl_link_rejected"] = "Please contact your bank or visit Off-course Betting Branch or Racecourse with the valid bank card or original bank document that shows your full name and personal bank account number for clarification.";
eft_array_ch_name["lbl_link_rejected"] = "請聯絡有關銀行或帶同印有閣下姓名及個人銀行戶口號碼並有效的銀行卡或銀行正本文件到場外投注處或馬場查詢詳情。";

eft_array_en_name["lbl_link_rejected_msg"] = "The application has been rejected by your bank.";
eft_array_ch_name["lbl_link_rejected_msg"] = "申請已被閣下之銀行拒絕";

eft_array_en_name["lbl_link_successful"] = "If you need to increase your daily deposit limit, please apply via your bank.";
eft_array_ch_name["lbl_link_successful"] = "如需增加每日存款限額，請與閣下之銀行聯絡。";

eft_array_en_name["lbl_link_successful_msg"] = 'Your bank account has been linked up with HKJC FPS Instant EFT, you can now enjoy PIN free online deposit and withdrawal. Your bank may send two notifications about "electronic Direct Debit Authorisation" application result to you. They are corresponding to two applications to our selected FPS partners.';
eft_array_ch_name["lbl_link_successful_msg"] = "以下的「指定轉賬銀行戶口」已成功綁定香港賽馬會轉數快即時轉賬，閣下可即時享用網上存款及提款服務。閣下的銀行有機會就「電子直接付款授權」申請結果發送兩次通知，分別對應本會兩間「轉數快」的合作夥伴。";

eft_array_en_name["lbl_link_successful_msg2"] = 'Your bank account has been linked up with HKJC FPS Instant EFT, you can now enjoy PIN free online deposit. Your bank may send two notifications about "electronic Direct Debit Authorisation" application result to you. They are corresponding to two applications to our selected FPS partners.';
eft_array_ch_name["lbl_link_successful_msg2"] = "以下的「指定轉賬銀行戶口」已成功綁定香港賽馬會轉數快即時轉賬，閣下可即時享用網上存款服務。閣下的銀行有機會就「電子直接付款授權」申請結果發送兩次通知，分別對應本會兩間「轉數快」的合作夥伴。";

eft_array_en_name["lbl_link_pending_notify"] = 'Your bank may send two notifications about "electronic Direct Debit Authorisation" application result to you. They are corresponding to two applications to our selected FPS partners. It may take up to 5 working days from the application date for bank to approve. To check application status or to increase your daily deposit limit, please contact your bank.';
eft_array_ch_name["lbl_link_pending_notify"] = "閣下的銀行可就「電子直接付款授權」申請結果通知閣下。屆時，閣下有機會收到兩次通知，分別對應本會兩間「轉數快」的合作夥伴。從申請日計算，銀行審批需時大概五個工作天。如需查詢審批進度或提升每日存款上限，請向閣下之銀行聯絡。";

eft_array_en_name["lbl_link_submitted_pending"] = "Submitted and pending confirmation";
eft_array_ch_name["lbl_link_submitted_pending"] = "已提交。待銀行確認";

eft_array_en_name["lbl_link_pending_msg"] = "The application has been submitted to your bank.";
eft_array_ch_name["lbl_link_pending_msg"] = "申請已提交閣下之銀行審批";

eft_array_en_name["lbl_link_pending_content"] = "Application confirmation has not been received.<br/><br/>You may check the status in “Linking Bank Account” later.";
eft_array_ch_name["lbl_link_pending_content"] = "尚未收到申請確認。<br/><br/>閣下可於「綁定銀行戶口」查詢申請狀況。";

eft_array_en_name["lbl_link_default_deposit"] = "Default Daily Deposit Limit";
eft_array_ch_name["lbl_link_default_deposit"] = "預設每日存款限額";

eft_array_en_name["lbl_link_Fps_AP"] = "Your bank account has been linked up with HKJC FPS Instant EFT, you can now enjoy PIN free online deposit and withdrawal. ";
eft_array_ch_name["lbl_link_Fps_AP"] = "以下的「指定轉賬銀行戶口」已成功綁定香港賽馬會轉數快即時轉賬，閣下可即時享用網上存款及提款服務。";

eft_array_en_name["lbl_link_Fps_AP2"] = "Your bank account has been linked up with HKJC FPS Instant EFT, you can now enjoy PIN free online deposit.";
eft_array_ch_name["lbl_link_Fps_AP2"] = "以下的「指定轉賬銀行戶口」已成功綁定香港賽馬會轉數快即時轉賬，閣下可即時享用網上存款服務。";

eft_array_en_name["lbl_link_Fps_IP"] = "Linking request has been submitted to your bank.";
eft_array_ch_name["lbl_link_Fps_IP"] = "綁定申請已提交閣下之銀行。";

eft_array_en_name["lbl_link_Fps_IP_reminder"] = "Your bank will notify you when the application is approved. It may take up to 5 working days from the application date. Please contact your bank for status enquiry.<br/><br/> If you need to increase your daily deposit limit, please apply via your bank.";
eft_array_ch_name["lbl_link_Fps_IP_reminder"] = "從申請日計算，審批需時大概五個工作天。申請成功後，閣下會收到銀行的通知。<br/><br/>如需增加每日存款限額或查詢審批進度，請與閣下之銀行聯絡。";

eft_array_en_name["lbl_link_Fps_RJ"] = "Please contact your bank or visit Off-course Betting Branch or Racecourse with the valid bank card or original bank document that shows your full name and personal bank account number for clarification.";
eft_array_ch_name["lbl_link_Fps_RJ"] = "請聯絡有關銀行或帶同印有閣下姓名及個人銀行戶口號碼並有效的銀行卡或銀行正本文件到場外投注處或馬場查詢詳情。";

eft_array_en_name["lbl_link_Fps_notsupport"] = 'Your bank does not support HKJC FPS Instant EFT. If you would like to change your Nominated Bank Account, please visit Off-course Betting Branch or Racecourse with a valid bank card or original bank document that shows your full name and personal bank account number for registration.<br/><br/><a href="javascript:LoadFpsBankList();">Please click here for FPS supported bank list.</a>';
eft_array_ch_name["lbl_link_Fps_notsupport"] = '以上銀行並不支援香港賽馬會轉數快即時轉賬。如需更改「指定轉賬銀行戶口」，請帶同印有閣下姓名及個人銀行戶口號碼並有效的銀行卡或銀行正本文件到場外投注處或馬場辦理更新手續。<br/><br/><a href="javascript:LoadFpsBankList();">請按此查詢支援轉數快的銀行。</a>';

// ***************************** Error **************************************

eft_array_ch_name["miss_amount"] = "請儲入金額";
eft_array_en_name["miss_amount"] = "Please key-in amount";

eft_array_ch_name["invalid_amount"] = "請儲入整數金額";
eft_array_en_name["invalid_amount"] = "Please input your amount rounded up to the nearest dollar";

eft_array_ch_name["balance_updated"] = "戶口結餘已更新。";
eft_array_en_name["balance_updated"] = "Account balance has been updated.";

eft_array_ch_name["accepted"] = "已被接受。";
eft_array_en_name["accepted"] = " has been accepted.";

eft_array_ch_name["err_range1"] = "數目必須介乎 $";
eft_array_en_name["err_range1"] = " amount must be between $";

eft_array_ch_name["err_range2"] = " 至 $";
eft_array_en_name["err_range2"] = " and $";

eft_array_ch_name["err_pps"] = "繳費靈";
eft_array_en_name["err_pps"] = "PPS";

eft_array_ch_name["err_fps_between"] = "香港賽馬會轉數快即時存款的數目必須介乎 $@@@ 至 $###。";
eft_array_en_name["err_fps_between"] = "HKJC FPS Instant Deposit amount must be between $@@@ and $###.";

eft_array_ch_name["err_epsco_between"] = "香港賽馬會易辦事即時存款的數目必須介乎 $@@@ 至 $###。";
eft_array_en_name["err_epsco_between"] = "HKJC EPS Instant Deposit amount must be between $@@@ and $###.";

eft_array_ch_name["err_pps_between"] = "網上存款數目必須介乎 $@@@ 至 $###";
eft_array_en_name["err_pps_between"] = "Online deposit amount must be between $@@@ and $###";

eft_array_ch_name["err_autopay_between"] = "網上存款數目每次限額必須介乎 $@@@ 至 $###";
eft_array_en_name["err_autopay_between"] = "Online deposit amount must be between $@@@ and $###";

eft_array_ch_name["err_fps_withdrawal_between"] = "香港賽馬會轉數快即時提款的每次限額必須介乎 $@@@ 至 $###。";
eft_array_en_name["err_fps_withdrawal_between"] = "HKJC FPS Instant Withdrawal amount must be between $@@@ and $### per transaction.";

eft_array_ch_name["err_epsco_withdrawal_between"] = "香港賽馬會易辦事即時提款的每次限額必須介乎 $@@@ 至 $###。";
eft_array_en_name["err_epsco_withdrawal_between"] = "HKJC EPS Instant Withdrawal amount must be between $@@@ and $### per transaction.";

eft_array_ch_name["err_autopay_withdrawal_between"] = "網上提款數目必須介乎 $@@@ 至 $###";
eft_array_en_name["err_autopay_withdrawal_between"] = "Online withdrawal amount must be between $@@@ and $###";

eft_array_ch_name["err_dda_limit"] = "閣下於網上銀行設定之「最高付款額/付款限額」低於鍵入之數目，請更改閣下於網上銀行之預設限額";
eft_array_en_name["err_dda_limit"] = "Your \"Maximum Bank Non-Instant Deposit Amount/DDA Limit Amount\" at Internet Banking was set below the inputted amount, please amend your preset limit at Internet Banking.";

eft_array_ch_name["miss_password"] = "請儲入密碼";
eft_array_en_name["miss_password"] = "Please key-in password";

eft_array_ch_name["miss_eft_pin"] = "請儲入香港賽馬會易辦事轉賬密碼";
eft_array_en_name["miss_eft_pin"] = "Please enter HKJC EPS EFT PIN";

eft_array_ch_name["miss_eft_num"] = "請儲入香港賽馬會電子轉賬服務編號";
eft_array_en_name["miss_eft_num"] = "Please key-in your HKJC EFT Service Registration Number";

eft_array_ch_name["invalid_eft_num"] = "香港賽馬會易辦事轉賬編號不正確";
eft_array_en_name["invalid_eft_num"] = "Invalid HKJC EPS EFT Service Registration Number";

eft_array_ch_name["invalid_eft_pin"] = "香港賽馬會易辦事轉賬密碼不正確";
eft_array_en_name["invalid_eft_pin"] = "Invalid HKJC EPS EFT PIN";

eft_array_ch_name["please_select"] = "請選擇";
eft_array_en_name["please_select"] = "Please select ";

eft_array_ch_name["check_balance_later"] = "請稍後再查詢你的戶口結餘。";
eft_array_en_name["check_balance_later"] = "Please check your account balance later.";

eft_array_ch_name["invalid_password"] = "密碼錯誤，請重新儲入。";
eft_array_en_name["invalid_password"] = "Wrong Password.  Please try again.";

eft_array_en_name["result_rejected"] = "Rejected";
eft_array_ch_name["result_rejected"] = "Rejected";

eft_array_en_name["result_rejected_reason"] = "Rejected Reason";
eft_array_ch_name["result_rejected_reason"] = "拒絕理由";

eft_array_en_name["result_accepted"] = "Accepted";
eft_array_ch_name["result_accepted"] = "Accepted";

//eft_array_en_name["1101"]			= "Available to logged-in users only. Please first login.";
//eft_array_ch_name["1101"]         = "只適用於已登入的用戶，請先登入服務。";
eft_array_en_name["1101"] = "The page you are visiting has encountered browser issue. Please use other browsers to continue the service.";
eft_array_ch_name["1101"] = "你所使用的瀏覽器發生問題，請使用其他瀏覽器。";

eft_array_en_name["eft_timeout_msg"] = "To confirm whether the transaction is accepted, please check your account records later.";
eft_array_ch_name["eft_timeout_msg"] = "如需確認轉賬是否已被接納，請於稍後檢查閣下的戶口紀錄。";

eft_array_en_name["autopay_timeout_msg"] = "The status of the transaction you requested is unknown. Please use \"Transaction Records\" function to confirm whether the transaction has been accepted.";
eft_array_ch_name["autopay_timeout_msg"] = "你所要求的轉賬交易狀況未能確認，請用\"複查已納入彩池及轉賬交易\"功能鍵去確認這項交易是否被接受。";

eft_array_en_name["lbl_eftnote_pps"] = "Note: For PPS deposit, a transaction fee of HK$### will be deducted from the above Betting Account.";
eft_array_ch_name["lbl_eftnote_pps"] = "請注意：每次繳費靈存款，以上的投注戶口均會被扣除港幣$###元手續費。";

eft_array_en_name["lbl_eftnote_pps_method"] = "<br/>";
eft_array_ch_name["lbl_eftnote_pps_method"] = "<br/>";

eft_array_en_name["lbl_deposit_minimum"] = "Minimum ";
eft_array_ch_name["lbl_deposit_minimum"] = "最低金額 ";

eft_array_en_name["lbl_deposit_minimum_fps"] = "HKJC FPS Instant Deposit requires minimum $@@@.<br/>";
eft_array_ch_name["lbl_deposit_minimum_fps"] = "香港賽馬會轉數快即時存款的最低金額為$@@@。<br/>";

eft_array_en_name["lbl_deposit_minimum_fps2"] = "Please make sure you have sufficient funds in your bank account before making the transfer, or your bank may charge a service fee for a denial of transfer according to the bank's terms and conditions (e.g. HSBC or Hang Seng Bank). Please contact your bank to apply the fee waiver, if such fee has been charged. The HKJC will not charge any fee.";
eft_array_ch_name["lbl_deposit_minimum_fps2"] = "請確保你的銀行賬戶於轉賬前有足夠款項。若銀行拒絕該轉賬，閣下之銀行或會根據其條款收取服務費用(如匯豐或恒生)。如該服務費用已被收取，請即聯絡你的銀行商討退款安排。馬會並不會收取仼何費用。";

eft_array_en_name["lbl_deposit_minimum_epsco"] = "HKJC EPS Instant Deposit requires minimum $@@@. ";
eft_array_ch_name["lbl_deposit_minimum_epsco"] = "香港賽馬會易辦事即時存款的最低金額為 $@@@。";

eft_array_en_name["lbl_withdrawal_limit_fps"] = "HKJC FPS Instant Withdrawal allows from $@@@ to $###. Once exceeded, transaction will be processed via Bank Non-Instant Withdrawal within 1 working day and limited to $~~~.";
eft_array_ch_name["lbl_withdrawal_limit_fps"] = "香港賽馬會轉數快即時提款的限額為$@@@至$###。若超過上限，該筆款項將經由銀行非即時提款方式處理，需時大約一個工作天，上限為$~~~。";

eft_array_en_name["lbl_withdrawal_limit_epsco"] = "HKJC EPS Instant Withdrawal allows from $@@@ to $###. Withdrawal amount other than this range will be processed via Bank Non-Instant Withdrawal within 1 working day and limited to $~~~.";
eft_array_ch_name["lbl_withdrawal_limit_epsco"] = "香港賽馬會易辦事即時提款的限額為$@@@至$###。其它金額將經由銀行非即時提款方式處理，需時大約一個工作天，上限為 $~~~。";

eft_array_en_name["lbl_withdrawal_limit_autopay"] = "Online withdrawal allows up to $@@@ once per day and the transaction will be processed within 1 working day.";
eft_array_ch_name["lbl_withdrawal_limit_autopay"] = "網上提款上限為$@@@，每日只限一次，需時大約一個工作天。";

eft_array_ch_name["lbl_redirect_msg"] = "請先準備以下項目，然後按\"確定\"鍵到繳費靈網頁繼續進行轉賬。<br><br>(1) 繳費靈戶口號碼/戶口名稱<br>(2) 繳費靈網上密碼<br>(3) 已登記之手提電話號碼以便接收「一次有效密碼」<br><br>完成後，你將會被帶回香港賽馬會網頁。<br><br>注意：為確保轉賬能順利完成，於轉賬期間<strong><u>請勿</u></strong>關閉本視窗或登出投注區。";
eft_array_en_name["lbl_redirect_msg"] = "Please have the following items ready and press \"Confirm\" to go to PPS's website to complete the process.<br><br>(1) PPS Account Number / PPS Account Name<br>(2) PPS Internet Password<br>(3) Registered mobile phone to receive the \"one-time password\"<br><br>Upon completed of the process, you will be redirected back to HKJC's website.<br><br>Note: To ensure a smooth transaction, please <strong><u>DO NOT</u></strong> close this Windows<br> or logout eWin while the transaction is in progress.";

eft_array_en_name["602"] = "The daily PPS deposit amount limit has been exceeded.";
eft_array_ch_name["602"] = "已超出繳費靈每日存款金額上限。";

eft_array_en_name["606"] = "Sorry that the deposit instruction has not been accepted by PPS. Please refer to the <a href='#' onclick='onClickOfficialPPSFAQ(##resCode##)'>FAQ</a> at PPS website or call PPS hotline 2311 9876 for enquiry. (Reject code: ##resCode##)";
eft_array_ch_name["606"] = "很抱歉，存款指示未被繳費靈接納，請參閱繳費靈網頁的<a href='#' onclick='onClickOfficialPPSFAQ(##resCode##)'>常見問題</a>或致電繳費靈熱線2311 9876查詢。 (取消編號: ##resCode##)";

eft_array_en_name["607"] = "Sorry that the deposit instruction has not been accepted by PPS. Please refer to the <a href='#' onclick='onClickOfficialPPSFAQ(##resCode##)'>FAQ</a> at PPS website or call PPS hotline 2311 9876 for enquiry. (Reject code: ##resCode##)";
eft_array_ch_name["607"] = "很抱歉，存款指示未被繳費靈接納，請參閱繳費靈網頁的<a href='#' onclick='onClickOfficialPPSFAQ(##resCode##)'>常見問題</a>或致電繳費靈熱線2311 9876查詢。 (取消編號: ##resCode##)";

eft_array_en_name["608"] = "The maximum number of PPS deposit transactions per-day has been exceeded.";
eft_array_ch_name["608"] = "已超出繳費靈每日存款次數上限。";

eft_array_en_name["609"] = "The daily PPS deposit amount limit has been exceeded.";
eft_array_ch_name["609"] = "已超出繳費靈每日存款金額上限。";

eft_array_en_name["610"] = "Deposit instruction has been accepted by PPS. Since the transaction is under process, it has not been credited to your betting account at this moment. Please check the transaction again on the next business day. (610)";
eft_array_ch_name["610"] = "存款指示已被繳費靈接納，因交易正在處理中，而暫時未能存至你的投注戶口。請於下一個工作天覆查交易紀錄。(610)";

eft_array_en_name["612"] = "Transaction is already processed. (612)";
eft_array_ch_name["612"] = "交易已被處理。 (612)";

eft_array_en_name["613"] = "Deposit instruction has been accepted by PPS. The transaction is under process. Please check your betting account balance to confirm the transaction status later on. (613)";
eft_array_ch_name["613"] = "存款指示已被繳費靈接納，交易正在處理中。請稍後覆查投注戶口結存以核實交易狀況。(613)";

eft_array_en_name["615"] = "Transaction timed out. Please check your bank account to confirm the transaction status.<br>1) If transaction was successful, the funds will be credited to your Betting Account on the next day.<br>2) If transaction was not successful, please retry";
eft_array_ch_name["615"] = "交易超越時限。請核對你的銀行戶口確認交易是否被接納。<br>1） 如交易已被接納，款項將於明天存入你的投注戶口。<br>2） 如交易不被接納，請重新再試。";

eft_array_en_name["alt_please_wait"] = "Please wait...";
eft_array_ch_name["alt_please_wait"] = "請稍候...";

eft_array_en_name["pps_success_notes"] = "If the betting account balance has not yet updated on eWin, please click the \"Refresh balance\" button to check the betting account balance.";
eft_array_ch_name["pps_success_notes"] = "如「投注區」上的投注戶口結餘尚未更新，請按\"更新結餘\"按鈕查閱投注戶口結餘。";

eft_array_en_name["pps_unavailable_before_EOD"] = "PPS instant funds deposit service is unavailable {0} minutes before day end processing";
eft_array_ch_name["pps_unavailable_before_EOD"] = "繳費靈(即時存款)服務在系統結算前{0}分鐘暫停使用"

eft_array_en_name["pps_instant_funds_transfer"] = "PPS Instant Deposit";
eft_array_ch_name["pps_instant_funds_transfer"] = "繳費靈(即時存款)";

eft_array_en_name["IW CANNOT ACCESS"] = "“Enter Password for Each Txn” function is temporarily unavailable. If you would like to continue to use “eWin”, please uncheck the function and login again.";
eft_array_ch_name["IW CANNOT ACCESS"] = "「每次交易再儲入密碼」功能暫時未能使用。如欲繼續使用「投注區」，請剔除該功能並再次登入。";

eft_array_en_name["fps_withdrawal_bx_reminder"] = "Your bank is processing the withdrawal instruction, please check your account records later."
eft_array_ch_name["fps_withdrawal_bx_reminder"] = "閣下之銀行正在處理你的提款指示，請於稍後時間檢查閣下的戶口紀錄。";

eft_array_en_name["fps_withdrawal_ax_reminder"] = "To confirm whether the transaction is accepted, please check your account records later.";
eft_array_ch_name["fps_withdrawal_ax_reminder"] = "如需確認轉賬是否已被接納，請於稍後檢查閣下的戶口紀錄。";

eft_array_en_name["fps_deposit_bx_reminder"] = "Your bank is processing the deposit instruction, please check your account records later.";
eft_array_ch_name["fps_deposit_bx_reminder"] = "閣下之銀行正在處理你的存款指示，請於稍後時間檢查閣下的戶口紀錄。";

eft_array_en_name["fps_deposit_ax_reminder"] = "To confirm whether the transaction is accepted, please check your account records later.";
eft_array_ch_name["fps_deposit_ax_reminder"] = "如需確認轉賬是否已被接納，請於稍後檢查閣下的戶口紀錄。";

eft_array_ch_name["fps_withdrawal_ma_reminder"] = "請致電1818查詢．";
eft_array_en_name["fps_withdrawal_ma_reminder"] = "Please call 1818 for further enquiries.";

eft_array_ch_name["fps_deposit_ma_reminder"] = "請致電1818查詢．";
eft_array_en_name["fps_deposit_ma_reminder"] = "Please call 1818 for further enquiries.";

eft_array_ch_name["lbl_link_rejected_reason"] = "拒絕理由：### <br/><u><strong>按此重新綁定</strong></u>";
eft_array_en_name["lbl_link_rejected_reason"] = "Rejected Reason: ### <br/><u><strong>Click here to register again</strong></u>";

eft_array_ch_name["lbl_link_pending_reason"] = "銀行正在處理閣下的申請。請聯絡銀行查詢有關「直接付款授權至香港賽馬會」的申請狀況。";
eft_array_en_name["lbl_link_pending_reason"] = 'The application is being processed by your bank. You may contact your bank to enquire the application status of “Direct Debit Authorisation To HKJC”.';

eft_array_ch_name["lnk_pps"] = "點擊此處查看其他轉賬方式";
eft_array_en_name["lnk_pps"] = "Click here for alternative funds transfer means";

eft_array_ch_name["lnk_pps_href"] = "/infomenu/ch/info/deposit.asp";
eft_array_en_name["lnk_pps_href"] = "/infomenu/en/info/deposit.asp";

eft_array_ch_name["lbl_trans_method"] = "轉賬方式";
eft_array_en_name["lbl_trans_method"] = "Transaction Method";

eft_array_ch_name["lbl_deposit_method_fps"] = "最低金額 $~~~。";
eft_array_en_name["lbl_deposit_method_fps"] = "Minimum $~~~.";

eft_array_ch_name["lbl_deposit_method_epsco"] = "最低金額 $~~~。<br/>須於交易預覽儲入密碼。";
eft_array_en_name["lbl_deposit_method_epsco"] = "Minimum $~~~.<br/>PIN is required in the next step.";

eft_array_ch_name["lbl_deposit_method_autopay"] = "最低金額 $~~~，需時大約一個工作天。";
eft_array_en_name["lbl_deposit_method_autopay"] = "Minimum $~~~ and the transaction will be processed within 1 working day.";

eft_array_ch_name["lbl_deposit_method_fee"] = "<br/>以上的投注戶口會被扣除港幣$###元手續費。";
eft_array_en_name["lbl_deposit_method_fee"] = "<br/>A transaction fee of HK$### will be deducted from the above Betting Account.";

eft_array_ch_name["lbl_deposit_method_maintenance"] = "由於系統維護, 暫停轉賬服務。";
eft_array_en_name["lbl_deposit_method_maintenance"] = "The service is now suspended for maintenance.";

eft_array_ch_name["lnk_other_means"] = "顯示其他方式";
eft_array_en_name["lnk_other_means"] = "Other means";

eft_array_ch_name["lnk_show_less"] = "顯示較少";
eft_array_en_name["lnk_show_less"] = "Show less";