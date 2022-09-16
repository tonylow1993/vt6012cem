var cLangENG = 0;
var cLangCHT = 1;

function GetLanguage() {
    if (curLang == 'en')
        return cLangENG;
    return cLangCHT;
}

function GetText(inval) {
    switch (GetLanguage()) {
        case (cLangENG):
            if (array_en_name[inval] != undefined)
                return array_en_name[inval];
        case (cLangCHT):
            if (array_ch_name[inval] != undefined)
                return array_ch_name[inval];
    }
    return inval;
}

function GetError(inval) {
    switch (GetLanguage()) {
        case (cLangENG):
            if (array_en_error[inval] != undefined)
                return array_en_error[inval];
        case (cLangCHT):
            if (array_ch_error[inval] != undefined)
                return array_ch_error[inval];
    }
    return inval;
}

function GetErrorByCode(code, defaultError) {
    var result = '';
    if (code == '1' || code == '-1') {
        result = ParseErrorCode(defaultError);
    } else {
        result = GetError(code);
        if (result == code)
            result = defaultError;
    }
    return GetError(result);
}

function ParseErrorCode(as_error) {
    var pos_start = as_error.lastIndexOf("(");
    if (pos_start < 0)
        return as_error;
    var pos_end = as_error.indexOf(")", pos_start);
    if (pos_end < 0)
        return as_error;
    var result = as_error.substring(pos_start + 1, pos_end);
    if (isNaN(result))
        return as_error;

    return result.trim();
}

function GetImageURL(inval) {
    var imgUrl = ((GetLanguage() == cLangENG) ?
        array_en_name["pic_path"] + array_en_name[inval] :
        array_ch_name["pic_path"] + array_ch_name[inval]);
    imgUrl += window["cacheVersion"];
    return imgUrl;
}

function GetLeagueFlagHTML(leagueShort) {
    if (leagueShort == undefined || leagueShort == null || leagueShort == "" || leagueShort == "0")
        return "";
    var leagueHTML = "<img src='" + nasImagePath + "flag_" + leagueShort + ".gif" + cacheVersion + "'" +
        " style='position:relative;top:1px;width:16px;height:16px;border:0px'>";
    return leagueHTML;
}

var array_en_name = new Array();
var array_ch_name = new Array();
var array_en_error = new Array();
var array_ch_error = new Array();

// ***************************** Image Path **************************************
array_en_name["pic_path"] = "./images/";
array_ch_name["pic_path"] = "./images/";

array_en_name["alt_popup_open"] = "Click Open/Close";
array_ch_name["alt_popup_open"] = "按此開關";
array_en_name["alt_popup_closewin"] = "Close";
array_ch_name["alt_popup_closewin"] = "關閉";
array_en_name["alt_popup_default"] = "Restore Default";
array_ch_name["alt_popup_default"] = "還原預設值";
array_en_name["alt_popup_save"] = "Save";
array_ch_name["alt_popup_save"] = "儲存";

array_en_name["alt_click_open_close"] = "Click to expand/collapse";
array_ch_name["alt_click_open_close"] = "按此開關";

// ***************************** ALT (mouse over) **************************************
array_en_name["alt_logout"] = "Logout";
array_ch_name["alt_logout"] = "登出";
array_en_name["alt_help"] = "eWin User Guide";
array_ch_name["alt_help"] = "「投注區」使用指南";
array_en_name["alt_minimize"] = "Minimize";
array_ch_name["alt_minimize"] = "縮小";
array_en_name["alt_restore"] = "Maximize";
array_ch_name["alt_restore"] = "放大";

// ***************************** Account Info Field Name Before Logon**************************************

array_en_name["fld_account_no"] = "Login name / Betting Account No.";
array_ch_name["fld_account_no"] = "登入名稱 / 投注戶口號碼";

array_en_name["fld_web_password"] = "Online Password";
array_ch_name["fld_web_password"] = "密碼";

array_en_name["alt_login"] = "Login";
array_ch_name["alt_login"] = "登入";

array_en_name["alt_register"] = "Register Online<br>Betting Service";
array_ch_name["alt_register"] = "申請網上<br>投注服務";

array_en_name["alt_reg_online"] = "I already have a betting account";
array_ch_name["alt_reg_online"] = "我已經持有投注戶口";

array_en_name["alt_reg_apply"] = "I do not have a betting account";
array_ch_name["alt_reg_apply"] = "我尚未持有投注戶口";

array_en_name["alt_other_services"] = "Cannot Login";
array_ch_name["alt_other_services"] = "無法登入";

array_en_name["alt_forget_webpass"] = "Forgot your Login Answer?";
array_ch_name["alt_forget_webpass"] = "忘記登入答案?";

array_en_name["alt_details"] = "Click to view bet details";
array_ch_name["alt_details"] = "按此閱覽注項詳情";

array_en_name["alt_brief"] = "Click to collapse";
array_ch_name["alt_brief"] = "按此收合";

array_en_name["alt_dtls_brief"] = "Bet details";
array_ch_name["alt_dtls_brief"] = "詳細資料";

array_en_name["minimize_bets"] = "No. of Bets";
array_ch_name["minimize_bets"] = "總注數";

array_en_name["alt_confirm"] = "Confirm";
array_ch_name["alt_confirm"] = "登入";

array_en_name["alt_next"] = "Next";
array_ch_name["alt_next"] = "下一步";

// ***************************** Account Info Field Name After Logon**************************************

array_en_name["alt_pic_transfer"] = "Funds Transfer";
array_ch_name["alt_pic_transfer"] = "轉賬服務";

array_en_name["alt_pic_settings"] = "Settings";
array_ch_name["alt_pic_settings"] = "設定";

array_en_name["alt_pic_ac_record"] = "Betting A/C<br>Records";
array_ch_name["alt_pic_ac_record"] = "戶口紀錄";

array_en_name["alt_pic_refresh_balance"] = "Refresh balance";
array_ch_name["alt_pic_refresh_balance"] = "更新結餘";

array_en_name["alt_pic_shorten"] = "Shorten";
array_ch_name["alt_pic_shorten"] = "縮短";

array_en_name["alt_pic_shorten_o"] = "Restore";
array_ch_name["alt_pic_shorten_o"] = "還原";

array_en_name["accinfo_fld_account_no"] = "Betting Account No.:";
array_ch_name["accinfo_fld_account_no"] = "投注戶口號碼:";

array_en_name["accinfo_fld_name"] = "Name:";
array_ch_name["accinfo_fld_name"] = "姓名:";

array_en_name["accinfo_fld_balance"] = "Balance:";
array_ch_name["accinfo_fld_balance"] = "結餘:";

array_en_name["Not to display"] = "Not to display";
array_ch_name["Not to display"] = "設定為不顯示";

// ***************************** Account Logon Info **************************************
array_en_name["acc_logon_header"] = "Thank you for using eWin!";
array_ch_name["acc_logon_header"] = "歡迎使用「投注區」";

array_en_name["acc_logon_last_logon"] = "Last successful login";
array_ch_name["acc_logon_last_logon"] = "上次成功登入";

array_en_name["acc_logon_date"] = "Date :";
array_ch_name["acc_logon_date"] = "日期 :";

array_en_name["acc_logon_time"] = "Time :";
array_ch_name["acc_logon_time"] = "時間 :";

array_en_name["acc_logon_hk_remark"] = "(HKT)";
array_ch_name["acc_logon_hk_remark"] = "(香港時間)";

// ***************************** Slip **************************************

array_en_name["txt_confirm"] = "Confirm";
array_ch_name["txt_confirm"] = "確定";
array_en_name["alt_clear"] = "Clear Slip";
array_ch_name["alt_clear"] = "刪除注項";
array_en_name["alt_preview"] = "Send Bet";
array_ch_name["alt_preview"] = "傳送注項";
array_en_name["alt_txn_rec"] = "Transaction Records";
array_ch_name["alt_txn_rec"] = "複查已納入彩池及轉賬交易";
array_en_name["alt_done"] = "Done";
array_ch_name["alt_done"] = "完成";

array_en_name["txt_bets"] = "Bets";
array_ch_name["txt_bets"] = "注";

array_en_name["fld_formula"] = "Formula";
array_ch_name["fld_formula"] = "過關方式";

array_en_name["fld_total_no_of_bets"] = "Total No. of Bets";
array_ch_name["fld_total_no_of_bets"] = "總注數";

array_en_name["fld_bet_total"] = "Bet total";
array_ch_name["fld_bet_total"] = "注項總額";

array_en_name["fld_total_amount"] = "Total Amount";
array_ch_name["fld_total_amount"] = "總投注金額";

array_en_name["fld_unit_bet"] = "Unit Bet";
array_ch_name["fld_unit_bet"] = "投注金額";

array_en_name["alt_del_bet_row"] = "Delete Betting Line";
array_ch_name["alt_del_bet_row"] = "刪除此注項";

array_en_name["alt_pic_allup_help"] = "All Up betting demo";
array_ch_name["alt_pic_allup_help"] = "過關投注示範";

array_en_name["alt_pic_record_help"] = "Betting A/C Records Demo";
array_ch_name["alt_pic_record_help"] = "戶口紀錄示範";

array_en_name["alt_allup_bonus"] = "Bonus";
array_ch_name["alt_allup_bonus"] = "額外彩金";

array_en_name["alt_allup_level"] = "Level";
array_ch_name["alt_allup_level"] = "關";

array_en_name["txt_allup_bets"] = "Combinations: ";
array_ch_name["txt_allup_bets"] = "過關注數:  ";

array_en_name["alt_addnew_all_up"] = "Add All Up Bet";
array_ch_name["alt_addnew_all_up"] = "加入過關注項";

array_en_name["txt_randGen"] = "(Random Generation)";
array_ch_name["txt_randGen"] = "(運財號碼)";

array_en_name["tAndCHeader"] = "Terms & Conditions";
array_ch_name["tAndCHeader"] = "條款及細則";

array_en_name["tAndCProceed"] = "Proceed";
array_ch_name["tAndCProceed"] = "進入主頁";

// **************************************** Setting menu items **************************************************

array_en_name["txt_chg_web_password"] = "Change Online Password";
array_ch_name["txt_chg_web_password"] = "更改網上密碼";

array_en_name["txt_chg_sec_question"] = "Change Login Answers";
array_ch_name["txt_chg_sec_question"] = "更改登入答案";

array_en_name["txt_chg_web_profile"] = "Change Profile";
array_ch_name["txt_chg_web_profile"] = "更改個人檔案";

array_en_name["txt_personal_settings"] = " Personal Settings in eWin";
array_ch_name["txt_personal_settings"] = "「投注區」個人設定";

array_en_name["txt_football_live"] = "Football Live";
array_ch_name["txt_football_live"] = "足智即場睇";

// ***************************** SlipPageDivSendBet Preview Bet **************************************

array_en_name["alt_preview_bet"] = "Preview Bet";
array_ch_name["alt_preview_bet"] = "預覽注項";

array_en_name["btn_close"] = "Close";
array_ch_name["btn_close"] = "關閉";

array_en_name["alt_back"] = "Back";
array_ch_name["alt_back"] = "返回";

array_en_name["alt_delete_bet"] = "Delete";
array_ch_name["alt_delete_bet"] = "刪除";

array_en_name["alt_delete_betline"] = "Delete this betline";
array_ch_name["alt_delete_betline"] = "刪除此注項";

array_en_name["alt_send_bet"] = "Send";
array_ch_name["alt_send_bet"] = "傳送";

array_en_name["confirm_delete"] = "Are you sure you want to delete?";
array_ch_name["confirm_delete"] = "確定刪除注項？";

array_en_name["btn_check_bet"] = "Transaction Record";
array_ch_name["btn_check_bet"] = "複查已納入彩池及轉賬交易";

array_en_name["fld_item_no"] = "Item";
array_ch_name["fld_item_no"] = "注項";

array_en_name["fld_bet_type"] = "Bet Type";
array_ch_name["fld_bet_type"] = "投注類別";

array_en_name["fld_bet_detail"] = "Transaction Detail";
array_ch_name["fld_bet_detail"] = "細節";

array_en_name["fld_bet_amount"] = "Amount";
array_ch_name["fld_bet_amount"] = "金額";

array_en_name["fld_total"] = "Total :";
array_ch_name["fld_total"] = "總額 :";

array_en_name["fld_password"] = "Online Password";
array_ch_name["fld_password"] = "網上密碼";

array_en_name["alt_allup_enabled"] = "Click to select betline to compose All Up bet";
array_ch_name["alt_allup_enabled"] = "按此選取這注項作為過關投注";

array_en_name["alt_allup_selected"] = "Click to select betline to compose All Up bet";
array_ch_name["alt_allup_selected"] = "按此選取這注項作為過關投注";

array_en_name["alt_allup_disabled"] = "Bet cannot be combined with bets already selected into an All Up";
array_ch_name["alt_allup_disabled"] = "此注項不能與已選注項組成過關組合";

array_en_name["txt_in_play_game"] = "Your In Play bet is being processed.<br>Please wait.";
array_ch_name["txt_in_play_game"] = "閣下的「即場投注」注項正在處理中,<br>請稍候.";

array_en_name["txt_football"] = "Football";
array_ch_name["txt_football"] = "足球";

array_en_name["txt_marksix"] = "Mark Six";
array_ch_name["txt_marksix"] = "六合彩";

array_en_name["text_race"] = "Racing";
array_ch_name["text_race"] = "賽馬";

array_en_name["txt_cross_pool"] = "Cross Pool";
array_ch_name["txt_cross_pool"] = "混合";

array_en_name["txt_ALUP"] = "Allup";
array_ch_name["txt_ALUP"] = "過關";

array_en_name["FB_ALUP"] = "Football All Up";
array_ch_name["FB_ALUP"] = "足球過關";

array_en_name["HB_ALUP"] = "Racing All Up";
array_ch_name["HB_ALUP"] = "賽馬過關";

array_en_name["txt_password_alt"] = "If you used a digital certificate to register for eWin, please input digital certificate password; otherwise, please input your eWin password.";
array_ch_name["txt_password_alt"] = "如以數碼證書登記「投注區」即為數碼證書密碼。否則，即為「投注區」密碼。";

array_en_name["btn_send_bet_alt"] = "If you do not see the \"BET CONFIRMATION\" screen within 15 seconds after you press \"SEND\", please use \"Transaction Records\" function to confirm whether the transactions with status \"Unknown\" have been accepted.";
array_ch_name["btn_send_bet_alt"] = "按「傳送」鍵後，若在十五秒內仍未出現「注項紀錄」畫面， 請按「複查已納入彩池及轉賑交易」以確認狀況「不明」之注項是否被接納。";

array_en_name["msg_cancel_counter"] = "Unsent bets will be deleted. Proceed?";
array_ch_name["msg_cancel_counter"] = "未傳送之注項將被删除。 確定?";

array_en_name["txt_changed_to"] = " changed to ";
array_ch_name["txt_changed_to"] = " 更改為 ";
// ***************************** eKBA Area **************************************

array_en_name["ekba_header"] = "Login Question";
array_ch_name["ekba_header"] = "登入問題";

// Support SSO
array_en_name["alt_login_cancel"] = "Cancel";
array_ch_name["alt_login_cancel"] = "取消";
array_en_name["alt_sso_back"] = "Back";
array_ch_name["alt_sso_back"] = "返回";

// ***************************** eWallet Area **************************************
array_en_name["eWallet_header"] = "Upgrade To Full Betting Account";
array_ch_name["eWallet_header"] = "升級至全面投注戶口"

array_en_name["eWallet_msg"] = "Your account can currently access HKJC eWallet function only, you can upgrade to Full Betting Account to place bet online.";
array_ch_name["eWallet_msg"] = "閣下的戶口現在只能使用香港賽馬會電子錢包功能，如需使用網上投注服務，請先完成升級程序。";

// ***************************** SlipPageDivReply Preview Bet **************************************

array_en_name["fld_bet_reply"] = "Bet Confirmation";
array_ch_name["fld_bet_reply"] = "注項紀錄";

array_en_name["fld_item_no_reply"] = "No.";
array_ch_name["fld_item_no_reply"] = "交易";

array_en_name["fld_reply_status"] = "Status";
array_ch_name["fld_reply_status"] = "狀況";

array_en_name["fld_reply_ref_no"] = "Ref. No./Reason";
array_ch_name["fld_reply_ref_no"] = "交易編號/原因";

array_en_name["UNKNOWN"] = "Unknown";
array_ch_name["UNKNOWN"] = "不明";

array_en_name["UNKNOWN_SPECIAL"] = "Unknown";
array_ch_name["UNKNOWN_SPECIAL"] = "不明";

array_en_name["INPLAY_UNKNOWN"] = "Unknown";
array_ch_name["INPLAY_UNKNOWN"] = "不明";

array_en_name["ACCEPTED"] = "Accepted";
array_ch_name["ACCEPTED"] = "接納";

array_en_name["REJECTED"] = "Rejected";
array_ch_name["REJECTED"] = "未被接納";

array_en_name["PROCESSING"] = "Processing";
array_ch_name["PROCESSING"] = "處理中";

array_en_name["max_payout"] = "Maximum  Payout: ";
array_ch_name["max_payout"] = "注項最高派彩: ";

array_en_name["BET_ACCEPTED"] = "BET ACCEPTED";
array_ch_name["BET_ACCEPTED"] = "注項已被接納";

array_en_name["BET_REJECTED"] = "BET REJECTED";
array_ch_name["BET_REJECTED"] = "注項未被接納";

array_en_name["BET_UNKNOWN"] = "UNKNOWN";
array_ch_name["BET_UNKNOWN"] = "注項狀況不明";

array_en_name["lbl_odds_changed"] = "ODDS CHANGED";
array_ch_name["lbl_odds_changed"] = "賠率已變";

array_en_name["lbl_and"] = ", ";
array_ch_name["lbl_and"] = ", ";

array_en_name["lbl_review_betsize"] = "BET AMOUNT CHANGED";
array_ch_name["lbl_review_betsize"] = "投注額已變";

array_en_name["lbl_review_odds_betsize"] = "ODDS CHANGED, BET AMOUNT CHANGED";
array_ch_name["lbl_review_odds_betsize"] = "賠率已變, 投注額已變";

array_en_name["lbl_proposed_amount"] = "Proposed Amount";
array_ch_name["lbl_proposed_amount"] = "建議金額";

array_en_name["lbl_new_odds"] = "New Odds";
array_ch_name["lbl_new_odds"] = "更新賠率";

array_en_name["lbl_accept_odds"] = "Accept odds change?";
array_ch_name["lbl_accept_odds"] = "接受更新賠率?";

array_en_name["lbl_accept_amount"] = "Accept amount change?";
array_ch_name["lbl_accept_amount"] = "接受更新投注額?";

array_en_name["lbl_accept_odd_amount"] = "Accept odds and amount change?";
array_ch_name["lbl_accept_odd_amount"] = "接受更新賠率及投注額?";

array_en_name["lbl_resend_yes"] = "Yes";
array_ch_name["lbl_resend_yes"] = "是";

array_en_name["lbl_resend_no"] = "No";
array_ch_name["lbl_resend_no"] = "否";

array_en_name["lbl_rangen"] = "(Random Generation)";
array_ch_name["lbl_rangen"] = "(運財號碼)";


// ***************************** Flexibet Text *************************************
array_en_name["flexi_s"] = new Array("U", "B");
array_ch_name["flexi_s"] = new Array("注", "總");

array_en_name["flexi_l"] = new Array("Unit Bet", "Betline");
array_ch_name["flexi_l"] = new Array("每注金額", "注項總額");

array_en_name["flexi_opt"] = new Array("Unit Bet (U)", "Betline (B)");
array_ch_name["flexi_opt"] = new Array("每注金額 (注)", "注項總額 (總)");

array_en_name["disable_flexibet"] = "FLEXI BET on selected bet type(s) is not available.";
array_ch_name["disable_flexibet"] = "所選投注種類暫時不能接受靈活玩。";

array_en_name["flexibet_name"] = "FLEXI BET";
array_ch_name["flexibet_name"] = "靈活玩";

array_en_name["dropdownAlt"] = new Array('Unit Bet - specify a unit bet amount for each bet combination', '"Flexi Bet" - specify a total bet amount for the betline');
array_ch_name["dropdownAlt"] = new Array('每注金額方式 - 指示每注的投注金額', '「靈活玩」- 自訂投注總額');

// ***************************** Marksix Unit bet Selection Text *************************************
array_en_name["m6unit_s"] = new Array("PU", "U");
array_ch_name["m6unit_s"] = new Array("部份注", "每注");

array_en_name["m6unit_l"] = new Array("Partial Unit", "Unit Bet");
array_ch_name["m6unit_l"] = new Array("部份注項單位", "每注金額");

array_en_name["m6unit_name"] = "(Partial Unit Investment)";
array_ch_name["m6unit_name"] = "(部份注項單位)";

// ***************************** idle alert message ********************************

array_en_name["idle_alert_msg"] = "You have not sent any transactions in the past {0} mins. " +
    "<br>For security reasons, your current session<br><strong class='important'>will be logged out in {1} minute(s).</strong>";
array_ch_name["idle_alert_msg"] = "過去{0}分鐘，你的帳戶沒有發出任何交易指示。為保安理由，網上投注服務<br>" +
    "<strong class='important'>將於{1}分鐘後自動登出。</strong>";

array_en_name["idle_alert_stay"] = "Continue";
array_ch_name["idle_alert_stay"] = "繼續瀏覽";

array_en_name["idle_alert_logout"] = "Logout";
array_ch_name["idle_alert_logout"] = "登出";

array_en_name["idle_alert_stay_service"] = "Continue to use Online Betting Service";
array_ch_name["idle_alert_stay_service"] = "繼續使用網上投注服務";

array_en_name["idle_alert_logout_service"] = "Logout Service";
array_ch_name["idle_alert_logout_service"] = "登出系統";

array_en_name["idle_alert_logout_tips"] = "You have not sent any transactions for an extended period of time.For security reasons, your current session";
array_ch_name["idle_alert_logout_tips"] = "因閣下於限時內沒有傳送注項或進行轉賬，為保安理由，網上投注服務";

array_en_name["idle_alert_logout_time_tips"] = "<b>will be logged out in {0} minute(s).</b>";
array_ch_name["idle_alert_logout_time_tips"] = "<b>將於{0}分鐘後自動登出。</b>";

array_en_name["idle_alert_logouttime"] = "You can choose to personalise your timeout period";
array_ch_name["idle_alert_logouttime"] = "你可以選擇自行設定登出時限並繼續使用服務";

array_en_name["idle_alert_savedtime"] = "Your personal timeout period have been saved";
array_ch_name["idle_alert_savedtime"] = "你所選擇的登出時限已經儲存";

array_en_name["idle_alert_mins"] = "mins";
array_ch_name["idle_alert_mins"] = "分鐘";

array_en_name["idle_alert_save"] = "Save";
array_ch_name["idle_alert_save"] = "保存";

// ***************************** Betting Type **************************************

// *************** Mark Six (MK6) ************
array_en_name["MK6"] = "Mark Six";
array_ch_name["MK6"] = "六合彩";

// *************** Racing ************
array_en_name["AWN"] = "All-up Win";
array_ch_name["AWN"] = "獨贏過關";

array_en_name["APL"] = "All-up Place";
array_ch_name["APL"] = "位置過關";

array_en_name["AQF"] = "All-up Quinella";
array_ch_name["AQF"] = "連嬴過關";

array_en_name["6UP"] = "6 up";
array_ch_name["6UP"] = "六環彩";

array_en_name["FCT"] = "Forecast";
array_ch_name["FCT"] = "二重彩";

array_en_name["TCE"] = "Tierce";
array_ch_name["TCE"] = "三重彩";

array_en_name["QTT"] = "Quartet";
array_ch_name["QTT"] = "四重彩";

array_en_name["T-T"] = "Triple Trio";
array_ch_name["T-T"] = "三Ｔ";

array_en_name["D-T"] = "Double Trio";
array_ch_name["D-T"] = "孖T";

array_en_name["QAD"] = "QAD";
array_ch_name["QAD"] = "四寶";

array_en_name["TBL"] = "Treble";
array_ch_name["TBL"] = "三寶";

array_en_name["DBL"] = "Double";
array_ch_name["DBL"] = "孖寶";

array_en_name["D-Q"] = "Double Quinella";
array_ch_name["D-Q"] = "孖Ｑ";

array_en_name["QIN"] = "Quinella";
array_ch_name["QIN"] = "連贏";

array_en_name["WIN"] = "Win";
array_ch_name["WIN"] = "獨贏";

array_en_name["PLA"] = "Place";
array_ch_name["PLA"] = "位置";

array_en_name["W-P"] = "Win-Place";
array_ch_name["W-P"] = "獨贏及位置";

array_en_name["TRI"] = "Trio";
array_ch_name["TRI"] = "單Ｔ";

array_en_name["F-F"] = "First 4";
array_ch_name["F-F"] = "四連環";

array_en_name["AUT"] = "All-up Trio";
array_ch_name["AUT"] = "單Ｔ過關";

array_en_name["QPL"] = "Quinella Place";
array_ch_name["QPL"] = "位置Ｑ";

array_en_name["QQP"] = "Quinella-Quinella Place";
array_ch_name["QQP"] = "連贏位置Ｑ";

array_en_name["AQP"] = "All-up Quinella";
array_ch_name["AQP"] = "連贏過關";

array_en_name["JKC"] = "Jockey Challenge";
array_ch_name["JKC"] = "騎師王";

array_en_name["TNC"] = "Trainer Challenge";
array_ch_name["TNC"] = "練馬師王";

array_en_name["CW"] = "Composite Win";
array_ch_name["CW"] = "組合獨羸";

array_en_name["CWA"] = "Composite Win CWA";
array_ch_name["CWA"] = "組合獨羸 CWA";

array_en_name["CWB"] = "Composite Win CWB";
array_ch_name["CWB"] = "組合獨羸 CWB";

array_en_name["CWC"] = "Composite Win CWC";
array_ch_name["CWC"] = "組合獨羸 CWC"

array_en_name["IWN"] = "Insurance Win";
array_ch_name["IWN"] = "保險獨贏"

// *************** Football ************
array_en_name["HAD"] = "Home/<wbr>Away/<wbr>Draw";
array_ch_name["HAD"] = "主客和";

array_en_name["EHA"] = "Home/<wbr>Away/<wbr>Draw (Extra Time)";
array_ch_name["EHA"] = "主客和 (加時)";

array_en_name["FHA"] = "First Half HAD";
array_ch_name["FHA"] = "半場主客和";

array_en_name["HDC"] = "Handicap";
array_ch_name["HDC"] = "讓球";

array_en_name["EDC"] = "Handicap (Extra Time)";
array_ch_name["EDC"] = "讓球 (加時)";

array_en_name["HHA"] = "Handicap HAD";
array_ch_name["HHA"] = "讓球主客和";

array_en_name["HFT"] = "HaFu";
array_ch_name["HFT"] = "半全場";

array_en_name["TQL"] = "To Qualify";
array_ch_name["TQL"] = "晉級隊伍";

array_en_name["NTS"] = "Next Team to Score";
array_ch_name["NTS"] = "下一隊入球";

array_en_name["ENT"] = "Next Team to Score (Extra Time)";
array_ch_name["ENT"] = "下一隊入球 (加時)";

array_en_name["FTS"] = "First Team to Score";
array_ch_name["FTS"] = "第一隊入球";

array_en_name["FHL"] = "First Half HiLo";
array_ch_name["FHL"] = "半場入球大細";

array_en_name["CRS"] = "Correct Score";
array_ch_name["CRS"] = "波膽";

array_en_name["ECS"] = "Correct Score (Extra Time)";
array_ch_name["ECS"] = "波膽 (加時)";

array_en_name["FCS"] = "First Half Correct Score";
array_ch_name["FCS"] = "半場波膽";

array_en_name["DHC"] = "Double HaFu Score";
array_ch_name["DHC"] = "孖寶半全膽";

array_en_name["TTG"] = "Total Goals";
array_ch_name["TTG"] = "總入球";

array_en_name["ETG"] = "Total Goals (Extra Time)";
array_ch_name["ETG"] = "總入球 (加時)";

array_en_name["HIL"] = "HiLo";
array_ch_name["HIL"] = "入球大細";

array_en_name["EHL"] = "HiLo (Extra Time)";
array_ch_name["EHL"] = "入球大細 (加時)";

array_en_name["OOE"] = "Odd/Even";
array_ch_name["OOE"] = "入球單雙";

array_en_name["FGS"] = "First Scorer";
array_ch_name["FGS"] = "首名入球";

array_en_name["CHP"] = "Champion";
array_ch_name["CHP"] = "冠軍";

array_en_name["GPF"] = "Group Forecast";
array_ch_name["GPF"] = "小組一二名";

array_en_name["GPW"] = "Group Winner";
array_ch_name["GPW"] = "小組首名";

array_en_name["TPS"] = "Top Scorer";
array_ch_name["TPS"] = "神射手";

array_en_name["SPC"] = "Specials";
array_ch_name["SPC"] = "特別項目";

array_en_name["SPC1"] = "Specials";
array_ch_name["SPC1"] = "特別項目";

array_en_name["TSPC"] = "Specials";
array_ch_name["TSPC"] = "特別項目";

array_en_name["TSP"] = "Specials";
array_ch_name["TSP"] = "特別項目";

array_en_name["MSP"] = "Specials";
array_ch_name["MSP"] = "特別項目";

array_en_name["STB"] = "SECTION HAD";
array_ch_name["STB"] = "套餐主客和";

array_en_name["SCB"] = array_en_name["STB"];
array_ch_name["SCB"] = array_ch_name["STB"];

array_en_name["CHL"] = "Corner Taken HiLo";
array_ch_name["CHL"] = "開出角球大細";

array_en_name["ECH"] = "Corner Taken HiLo (Extra Time)";
array_ch_name["ECH"] = "開出角球大細 (加時)";

array_en_name["SGA"] = "Same Game All Up";
array_ch_name["SGA"] = "同場過關";

// *************** Football DHCP Selectiong ************

array_en_name["VOID_Match"] = "VOID";
array_ch_name["VOID_Match"] = "無效";

array_en_name["FIELD_ALL"] = "FIELD";
array_ch_name["FIELD_ALL"] = "全餐";

array_en_name["HO_HomeOthers"] = "HOME OTHERS";
array_ch_name["HO_HomeOthers"] = "主其他";

array_en_name["DO_DrawOthers"] = "DRAW OTHERS";
array_ch_name["DO_DrawOthers"] = "和其他";

array_en_name["AO_AwayOthers"] = "AWAY OTHERS";
array_ch_name["AO_AwayOthers"] = "客其他";

// *************** Football 6寶半全場 Selectiong ************

array_en_name["V-V"] = "VOID-VOID";
array_ch_name["V-V"] = "無效-無效";

array_en_name["1-1"] = "HOME-HOME";
array_ch_name["1-1"] = "主-主";

array_en_name["1-X"] = "HOME-DRAW";
array_ch_name["1-X"] = "主-和";

array_en_name["1-2"] = "HOME-AWAY";
array_ch_name["1-2"] = "主-客";

array_en_name["X-1"] = "DRAW-HOME";
array_ch_name["X-1"] = "和-主";

array_en_name["X-X"] = "DRAW-DRAW";
array_ch_name["X-X"] = "和-和";

array_en_name["X-2"] = "DRAW-AWAY";
array_ch_name["X-2"] = "和-客";

array_en_name["2-1"] = "AWAY-HOME";
array_ch_name["2-1"] = "客-主";

array_en_name["2-X"] = "AWAY-DRAW";
array_ch_name["2-X"] = "客-和";

array_en_name["2-2"] = "AWAY-AWAY";
array_ch_name["2-2"] = "客-客";

// *************************************** Current Session Records ***************************************

array_en_name["alt_ac_records"] = "Account Records";
array_ch_name["alt_ac_records"] = "戶口紀錄";

array_en_name["alt_30days_ac_records"] = "Past 30 days Account Records";
array_ch_name["alt_30days_ac_records"] = "過去30天戶口紀錄";

array_en_name["alt_60days_ac_records"] = "Past 60 days Account Records";
array_ch_name["alt_60days_ac_records"] = "過去60天戶口紀錄";

array_en_name["alt_cs_records"] = "Current Session Records";
array_ch_name["alt_cs_records"] = "是次交易紀錄";

array_en_name["alt_tran_records"] = "Transaction Records";
array_ch_name["alt_tran_records"] = "複查已納入彩池及轉賬交易";

array_en_name["alt_print"] = "Print";
array_ch_name["alt_print"] = "列印";

array_en_name["alt_close"] = "Close";
array_ch_name["alt_close"] = "關閉";

array_en_name["alt_cs_records_text1"] = "Current Session Records would be cleared after logging off.";
array_ch_name["alt_cs_records_text1"] = "複查是次登入之每項交易細節。客戶登出「投注區」後，此處紀錄亦將被清除。";

array_en_name["alt_cs_records_text2"] = "Please use <span onclick=\"location.href = '" + BetSlipIBPath + "recall.aspx?lang=0'\" onmouseover=\"change_cursor_hand(this)\" onmouseout=\"change_cursor_default(this)\"><u>Transaction Record</u></span> function to confirm whether the transactions with status <b>Unknown</b> have been accepted.";
array_ch_name["alt_cs_records_text2"] = "*如 閣下發現狀況「<b>不明</b>」之交易紀錄，請按此查閱 <span onclick=\"location.href = '" + BetSlipIBPath + "recall.aspx'\"  onmouseover=\"change_cursor_hand(this)\" onmouseout=\"change_cursor_default(this)\"><u>複查已納入彩池及轉賬交易</u></span>。";

array_en_name["alt_no_cs_records"] = "No records in current session.";
array_ch_name["alt_no_cs_records"] = "是節未有交易紀錄。";

array_en_name["alt_print_tip"] = 'Prints only transaction records displayed on this page. Press "Print" on the last page for the full list of records.';
array_ch_name["alt_print_tip"] = "只列印本頁所顯示的交易紀錄。如要列印全部紀錄，請到最後一頁按列印。";

array_en_name["pic_print"] = "btn_print_en.gif";
array_ch_name["pic_print"] = "btn_print_ch.gif";

array_en_name["pic_print_on"] = "btn_print_on_en.gif";
array_ch_name["pic_print_on"] = "btn_print_on_ch.gif";

array_en_name["pic_close"] = "btn_close_en.gif";
array_ch_name["pic_close"] = "btn_close_ch.gif";

array_en_name["pic_close_on"] = "btn_close_on_en.gif";
array_ch_name["pic_close_on"] = "btn_close_on_ch.gif";

array_en_name["alt_account_no"] = "Betting Account No.: ";
array_ch_name["alt_account_no"] = "投注戶口號碼: ";

array_en_name["alt_balance"] = "Balance: ";
array_ch_name["alt_balance"] = "結餘: ";

array_en_name["alt_time_now"] = "Time: ";
array_ch_name["alt_time_now"] = "時間: ";

array_en_name["alt_transfer"] = "No";
array_ch_name["alt_transfer"] = "交易";

array_en_name["alt_log_status"] = "Status";
array_ch_name["alt_log_status"] = "狀況";

array_en_name["alt_recall_ref_no"] = "Ref No";
array_ch_name["alt_recall_ref_no"] = "交易編號";

array_en_name["alt_recall_bet_type"] = "Bet Type";
array_ch_name["alt_recall_bet_type"] = "投注類別";

array_en_name["alt_recall_transaction_details"] = "Transaction Details";
array_ch_name["alt_recall_transaction_details"] = "細節";

array_en_name["alt_recall_amount"] = "Amount";
array_ch_name["alt_recall_amount"] = "金額";

// ***************************** unknown betting page **************************************
array_en_name["fld_trans_time"] = "Trans. Time : ";
array_ch_name["fld_trans_time"] = "時間 : ";

array_en_name["text_unknown_message"] = "Please use <b>Transaction Records</b> function to confirm whether the transactions with status <b>Unknown</b> have been accepted.";
array_ch_name["text_unknown_message"] = "請按「<b>複查已納入彩池及轉賑交易</b>」以確認狀況「<B>不明</b>」之注項是否被接納。";

array_en_name["fld_number"] = "No.";
array_ch_name["fld_number"] = "交易";

array_en_name["fld_status"] = "Status";
array_ch_name["fld_status"] = "狀況";

array_en_name["fld_trans_no"] = "Ref. No.";
array_ch_name["fld_trans_no"] = "交易編號";

array_en_name["fld_bet_type"] = "Bet Type";
array_ch_name["fld_bet_type"] = "投注類別";

array_en_name["fld_betting_line"] = "Transaction Detail";
array_ch_name["fld_betting_line"] = "細節";

array_en_name["fld_amount"] = "Amount";
array_ch_name["fld_amount"] = "金額";

array_en_name["text_unknown"] = "Unknown";
array_ch_name["text_unknown"] = "不明";

array_en_name["fld_total"] = "Total";
array_ch_name["fld_total"] = "總額";

array_en_name["print"] = "Print";
array_ch_name["print"] = "列印";

// ***************************** Error Message **************************************
var traceFunc = "";
array_en_error["system_busy"] = "SYSTEM BUSY, PLEASE TRY LATER" + ((traceFunc != "") ? (" (" + traceFunc + ")") : "");
array_ch_error["system_busy"] = "系統繁忙，請稍後再試" + ((traceFunc != "") ? (" (" + traceFunc + ")") : "");

array_en_error["system_datetime"] = "Unsuccessful Login. Please <a href='#' onclick='OnClickLoginTimeout()'>click here</a> to check your browser settings and try again. (415)";
array_ch_error["system_datetime"] = "未能成功登入。請<a href='#' onclick='OnClickLoginTimeout()'>按此</a>檢查您的瀏覽器設定後再次嘗試。(415)";

array_en_error["defalut_msg"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818";
array_ch_error["defalut_msg"] = "服務未能提供，請致電1818";

array_en_error["input_webid"] = "Please enter Login Name";
array_ch_error["input_webid"] = "請儲入登入名稱";

array_en_error["wrong_password"] = "Incorrect Password. Please re-enter again. If you have forgotten your Password, please click <a href='#' onclick='OnClickCannotLogin()'>here</a> for reset.";
array_ch_error["wrong_password"] = "密碼不正確，請重新儲入。如閣下已忘記密碼，請<a href='#' onclick='OnClickCannotLogin()'>按此</a>重設。";

array_en_error["wrong_password2"] = "Please enter password";
array_ch_error["wrong_password2"] = "請儲入密碼";

array_en_error["wrong_password3"] = "Wrong Password. Please try again.";
array_ch_error["wrong_password3"] = "密碼錯誤，請重新儲入。";

array_en_error["acc_locked"] = 'Login access is locked.  Please unlock through the "Change Online Password / Change Login Answers" function.';
array_ch_error["acc_locked"] = '登入權限已鎖。請透過「更改網上密碼/更改登入問題」功能進行重設。';

array_en_error["acc_no_empty"] = 'Please enter a valid 8-digit Account Number. If your Account Number is 7 digits, please add a "0" at the beginning.';
array_ch_error["acc_no_empty"] = '請儲入有效的八位數字投注戶口號碼。如你的投注戶口號碼只有七位數字請在前面加"0"。';

array_en_error["duplicate_bet_fixed_oddsFB"] = "Duplicate bet selection not accepted (applicable to fixed odds football betting only)";
array_ch_error["duplicate_bet_fixed_oddsFB"] = "注項選擇不能重複(只適用於足球固定賠率投注)";

array_en_error["duplicate_bet_fixed_oddsHR"] = "Duplicate bet selection not accepted (applicable to fixed odds racing betting only)";
array_ch_error["duplicate_bet_fixed_oddsHR"] = "注項選擇不能重複(只適用於賽馬固定賠率投注)";

array_en_error["duplicate_bet_allup"] = "Duplicate bet selection not accepted (applicable to all up betting only)";
array_ch_error["duplicate_bet_allup"] = "注項選擇不能重複(只適用於過關投注)";

array_en_error["duplicate_bet_line"] = "Duplicate bet selection not accepted.";
array_ch_error["duplicate_bet_line"] = "注項選擇不能重複。";

array_en_error["system_return21"] = "Please use the \"Transaction Records\" function to confirm whether the bets you sent have been accepted.";
array_ch_error["system_return21"] = "你所傳送的注項狀況未能確認。請使用「複查已納入彩池及轉賬交易」功能鍵去確認你所傳送的注項是否被接受。";

array_en_error["change_security_check_code"] = "Please Change Security Code";
array_ch_error["change_security_check_code"] = "Please Change Security Code";

array_en_error["change_security_code"] = "Login cannot continue because you have not changed the default security code of your Betting Account.  Please first change your security code using a Multi-Ticket Betting Terminal at a nearby Off-course Betting Branch or Racecourse, then login again.";
array_ch_error["change_security_code"] = "因閣下之投注戶口預設密碼尚未更改，所以未能登入。請先於任何場外投注處或馬場，使用智財全能投注機更改投注戶口密碼，然後再嘗試登入。";

array_en_error["refresh_warning"] = "All betlines will be deleted.  Press OK to continue refreshing the web page or Cancel to stay on the current page.";
array_ch_error["refresh_warning"] = "所有注項將被刪除，確定更新網頁﹖";

array_en_error["Invalid Session"] = "Invalid Session";
array_ch_error["Invalid Session"] = "此環節已被終止，請重新登入";

array_en_error["EDIT_SEL_NO_LONGER_AVAILABLE"] = "The added selection(s) is no longer available, please re-enter.";
array_ch_error["EDIT_SEL_NO_LONGER_AVAILABLE"] = "已加入的選項已不適用，請重新儲入。";

// Support SSO
array_en_error["SSO_SIGN_OUT_ACTIVE"] = "All unsent bet will be deleted after logoff. If you are using HKJC Web Services in other browser windows, they will also be logged out. Please close those browser windows if needed.";
array_ch_error["SSO_SIGN_OUT_ACTIVE"] = "登出後，如有未傳送的注項將被删除。如你正在其他視窗開啟馬會網上服務，該等服務亦會同時被登出，如有需要請關閉該等視窗。";
array_en_error["SSO_SIGN_OUT_PASSIVE"] = "You have logged out from all HKJC Web Services, all unsent bet has also been deleted. Please login again if needed.";
array_ch_error["SSO_SIGN_OUT_PASSIVE"] = "你已登出所有馬會網上服務，未傳送的注項亦已同時被删除，如有需要請重新登入。";
array_en_error["SSO_SIGN_IN_USER_CHANGED"] = "This user session has been logged out. All unsent bet has been deleted. Please use the \"Betting A/C Record\" function to check the bet record.";
array_ch_error["SSO_SIGN_IN_USER_CHANGED"] = "此用戶環節已被登出，未傳送的注項亦已被删除。請使用\"戶口記錄\"功能查閱注項記錄。";

// ***************************** ERROR MESSAGE FROM TELEBET **************************************
array_en_error["INVALID DRAW OR MEETING"] = "INVALID DRAW OR MEETING.";
array_ch_error["INVALID DRAW OR MEETING"] = "賽事或期數選擇錯誤。";

array_en_error["POOL NOT AVAILABLE"] = "POOL NOT AVAILABLE.";
array_ch_error["POOL NOT AVAILABLE"] = "彩池選擇錯誤。";

array_en_error["POOL CLOSED"] = "POOL CLOSED.";
array_ch_error["POOL CLOSED"] = "彩池截止投注。";

array_en_error["INSUFFICIENT SELECTIONS"] = "INSUFFICIENT SELECTIONS.";
array_ch_error["INSUFFICIENT SELECTIONS"] = "馬匹或號碼不足。";

array_en_error["SELECTION OUT OF RANGE"] = "SELECTION OUT OF RANGE.";
array_ch_error["SELECTION OUT OF RANGE"] = "所選號碼太大。";

array_en_error["DUPLICATE SELECTION"] = "DUPLICATE SELECTION.";
array_ch_error["DUPLICATE SELECTION"] = "不能有重複選擇。";

array_en_error["RACE NO. SEQUENCE ERROR"] = "RACE NO. SEQUENCE ERROR.";
array_ch_error["RACE NO. SEQUENCE ERROR"] = "場次次序錯誤。";

array_en_error["INVALID ACCOUNT NUMBER"] = "INVALID ACCOUNT NUMBER.";
array_ch_error["INVALID ACCOUNT NUMBER"] = "戶口號碼錯誤。";

array_en_error["OUT OF FIELD"] = "OUT OF FIELD.";
array_ch_error["OUT OF FIELD"] = "馬匹或號碼太大。";

array_en_error["AUP FORMULA ERROR"] = "ALL UP FORMULA ERROR.";
array_ch_error["AUP FORMULA ERROR"] = "此過關方式不適用。";

array_en_error["INVALID AMOUNT"] = "INVALID AMOUNT.";
array_ch_error["INVALID AMOUNT"] = "金額錯誤。";

array_en_error["INSUFFICIENT LEGS"] = "INSUFFICIENT LEAGUES.";
array_ch_error["INSUFFICIENT LEGS"] = "關數不足。";

array_en_error["INVALID BANKER"] = "INVALID BANKER.";
array_ch_error["INVALID BANKER"] = "膽拖使用錯誤。";

array_en_error["INVALID FIELD"] = "INVALID FIELD.";
array_ch_error["INVALID FIELD"] = "選擇方式錯誤。";

array_en_error["POOL CODE ERROR"] = "POOL CODE ERROR.";
array_ch_error["POOL CODE ERROR"] = "彩池代號錯誤。";

array_en_error["VALUE TOO BIG"] = "VALUE TOO BIG.";
array_ch_error["VALUE TOO BIG"] = "總金額太大。";

array_en_error["ACCOUNT NOT FOR BETTING"] = "ACCOUNT NOT FOR BETTINGW.";
array_ch_error["ACCOUNT NOT FOR BETTING"] = "戶口不能提供賽事/足球投注。";

array_en_error["INCORRECT SECURITY CODE"] = "INCORRECT SECURITY CODE.";
array_ch_error["INCORRECT SECURITY CODE"] = "電話投注戶口密碼不正確。";

array_en_error["NO SUCH A/C"] = "NO SUCH A/C.";
array_ch_error["NO SUCH A/C"] = "戶口號碼錯誤。";

array_en_error["A/C ACTIVE"] = "A/C ACTIVE.";
array_ch_error["A/C ACTIVE"] = "戶口操作進行中。";

array_en_error["ACCESS NOT PERMITTED"] = "ACCESS NOT PERMITTED.";
array_ch_error["ACCESS NOT PERMITTED"] = "戶口不能使用。";

array_en_error["BALANCE OVERFLOW"] = "BALANCE OVERFLOW.";
array_ch_error["BALANCE OVERFLOW"] = "戶口結存超出限額。";

array_en_error["BANK CARD NOT REGISTERED"] = "BANK CARD NOT REGISTERED.";
array_ch_error["BANK CARD NOT REGISTERED"] = "銀行咭未登記。";

array_en_error["AMOUNT EXCEED LIMIT"] = "AMOUNT EXCEED LIMIT.";
array_ch_error["AMOUNT EXCEED LIMIT"] = "金額超出限額。";

array_en_error["INVALID FORMAT"] = "INVALID FORMAT.";
array_ch_error["INVALID FORMAT"] = "資料不正確。";

array_en_error["INSUFFICIENT BALANCE"] = "INSUFFICIENT BALANCE.";
array_ch_error["INSUFFICIENT BALANCE"] = "戶口結存不足。";

array_en_error["TOO MANY WITHDRAWALS"] = "TOO MANY WITHDRAWALS.";
array_ch_error["TOO MANY WITHDRAWALS"] = "提款次數過多。";

array_en_error["AMOUNT TOO LOW"] = "AMOUNT TOO LOW.";
array_ch_error["AMOUNT TOO LOW"] = "少過最低限額。";

array_en_error["INCORRECT BANK PIN"] = "INCORRECT BANK PIN.";
array_ch_error["INCORRECT BANK PIN"] = "銀行戶口密碼不正確。";

array_en_error["STATUS UNKNOWN"] = "STATUS UNKNOWN.";
array_ch_error["STATUS UNKNOWN"] = "注項情況未明。";

array_en_error["RACE NO. ERROR"] = "RACE NO. ERROR.";
array_ch_error["RACE NO. ERROR"] = "場次錯誤。";

array_en_error["TOO MANY SELECTIONS"] = "TOO MANY SELECTIONS.";
array_ch_error["TOO MANY SELECTIONS"] = "不能有過多選擇。";

array_en_error["ILLEGAL SELECTIONS"] = "ILLEGAL SELECTIONS.";
array_ch_error["ILLEGAL SELECTIONS"] = "選擇不正確。";

array_en_error["RACE SEQUENCE ERROR"] = "RACE SEQUENCE ERROR.";
array_ch_error["RACE SEQUENCE ERROR"] = "場次次序錯誤。";

array_en_error["INSUFFICIENT BALANCE INIT"] = "INSUFFICIENT BALANCE INIT.";
array_ch_error["INSUFFICIENT BALANCE INIT"] = "戶口結存不足。";

array_en_error["SALES NOT AVAILABLE"] = "SALES NOT AVAILABLE.";
array_ch_error["SALES NOT AVAILABLE"] = "尚未接受投注。";

array_en_error["MEETING NOT DEFINED"] = "MEETING NOT DEFINED.";
array_ch_error["MEETING NOT DEFINED"] = "賽事尚未設定。";

array_en_error["DEPOSIT NOT READY, TRY LATER"] = "DEPOSIT NOT READY, TRY LATER.";
array_ch_error["DEPOSIT NOT READY, TRY LATER"] = "存款後不能即時提款， 請稍後再試。";

// ***************************** ERROR MESSAGE FROM EWIN **************************************
array_en_error["SYSTEM NOT READY"] = "SYSTEM NOT READY.<br/>PLEASE TRY AGAIN LATER";
array_ch_error["SYSTEM NOT READY"] = "系統將於稍後恢復，<br/>請稍後再試。";

array_en_error["A/C INACCESSIBLE"] = "A/C Inaccessible. Please try again later.";
array_ch_error["A/C INACCESSIBLE"] = "戶口服務未能提供，請稍候再試。";

array_en_error["FUNCTION NOT AVAILABLE"] = "FUNCTION NOT AVAILABLE.";
array_ch_error["FUNCTION NOT AVAILABLE"] = "功能未能使用。";

array_en_error["INVALID MEETING"] = "INVALID MEETING.";
array_ch_error["INVALID MEETING"] = "賽事選擇錯誤。";

array_en_error["DATA NOT AVAILABLE"] = "DATA NOT AVAILABLE.";
array_ch_error["DATA NOT AVAILABLE"] = "資料未能顯示。";

array_en_error["TELEBET CLOSED"] = "TELEBET CLOSED.";
array_ch_error["TELEBET CLOSED"] = "電話投注停止服務。";

array_en_error["SERVICE NOT AVAILABLE"] = "SERVICE NOT AVAILABLE.  PLEASE TRY AGAIN LATER";
array_ch_error["SERVICE NOT AVAILABLE"] = "暫停服務，請稍後再試。";

array_en_error["PLEASE DO ESTABLISH ENQUIRY"] = "PLEASE DO ESTABLISH ENQUIRY.";
array_ch_error["PLEASE DO ESTABLISH ENQUIRY"] = "請查最新資訊表。";

array_en_error["INVALID ENQUIRY FORMAT"] = "INVALID ENQUIRY FORMAT.";
array_ch_error["INVALID ENQUIRY FORMAT"] = "查詢方式不正確。";

array_en_error["BANK ACCOUNT ACTIVE"] = "BANK ACCOUNT ACTIVE.";
array_ch_error["BANK ACCOUNT ACTIVE"] = "銀行戶口操作進行中，請稍後再試。";

array_en_error["NO SUCH ACCOUNT"] = "NO SUCH ACCOUNT.  PLEASE ENTER A VALID BETTING ACCOUNT NUMBER";
array_ch_error["NO SUCH ACCOUNT"] = "戶口號碼錯誤，請儲入正確投注戶口號碼";

array_en_error["ACCOUNT CLOSED"] = "ACCOUNT CLOSED.";
array_ch_error["ACCOUNT CLOSED"] = "投注戶口已取消。";

array_en_error["SYSTEM BUSY, RETRY LATER"] = "SYSTEM BUSY, RETRY LATER.";
array_ch_error["SYSTEM BUSY, RETRY LATER"] = "系統繁忙， 請稍後再試。";

array_en_error["YOUR DIGITAL CERTIFICATE HAS BEEN RE-REGISTERED"] = "YOUR DIGITAL CERTIFICATE HAS BEEN RE-REGISTERED.";
array_ch_error["YOUR DIGITAL CERTIFICATE HAS BEEN RE-REGISTERED"] = "閣下的數碼証書經已重新註冊。";

array_en_error["SYSTEM BUSY, PLS TRY LATER"] = "SYSTEM BUSY, PLEASE TRY LATER.";
array_ch_error["SYSTEM BUSY, PLS TRY LATER"] = "系統繁忙， 請稍後再試。";

array_en_error["SYSTEM LOGIN TIMEOUT"] = "Unsuccessful Login. Please <a href='#' onclick='OnClickLoginTimeout()'>click here</a> to check your browser settings and try again. (416)";
array_ch_error["SYSTEM LOGIN TIMEOUT"] = "未能成功登入。請<a href='#' onclick='OnClickLoginTimeout()'>按此</a>檢查您的瀏覽器設定後再次嘗試。(416)";

array_en_error["IW CANNOT ACCESS"] = "“Enter Password for Each Txn” function is temporarily unavailable. If you would like to continue to use “eWin”, please uncheck the function and login again.";
array_ch_error["IW CANNOT ACCESS"] = "「每次交易再儲入密碼」功能暫時未能使用。如欲繼續使用「投注區」，請剔除該功能並再次登入。";

// ***************************** 0 **************************************


// ***************************** 100 **************************************

array_en_error["101"] = "INCORRECT BETTING ACCOUNT NO.  IF YOU HAVE NOT YET REGISTERED, PLEASE SELECT \"REGISTER NOW\" (101)";
array_ch_error["101"] = "投注戶口號碼不正確。如閣下未登記網上投注服務，請再按「新用戶登記」(101)";

array_en_error["102"] = "REGISTRATION IS UNSUCCESSFUL. PLEASE CALL 1818 (102)";
array_ch_error["102"] = "註冊錯誤,請致電1818 (102)";

array_en_error["103"] = "ANOTHER SESSION ALREADY LOGGED ON, PLEASE LOGOUT THIS SESSION (103)";
array_ch_error["103"] = "重複登入，請登出此環節 (103)";

array_en_error["104"] = "DIGITAL CERTIFICATE HAS ALREADY EXPIRED, PLEASE RENEW THE DIGITAL CERTIFICATE AND DO A DIGITAL CERTIFICATE REGISTRATION (104)";
array_ch_error["104"] = "數碼證書經已過期,請重新註冊 (104)";

array_en_error["105"] = "PLEASE CALL 1818 (105)";
array_ch_error["105"] = "請致電1818 (105)";

array_en_error["106"] = "THIS SESSION HAS BEEN DISCONNECTED, PLEASE CLOSE THE WINDOW AND RESTART WITH A NEW SESSION (106)";
array_ch_error["106"] = "此環節已被終止,請重新登入 (106)";

array_en_error["107"] = "PLEASE CALL 1818 (107)";
array_ch_error["107"] = "請致電1818 (107)";

array_en_error["108"] = "A CERTIFICATE HAS NOT BEEN REGISTERED WITH THIS ACCOUNT.  PLEASE TRY WITH A VALID DIGITAL CERTIFICATE. (108)";
array_ch_error["108"] = "此戶口未有數碼證書註冊，請以有效的數碼證書重試 (108)";

array_en_error["109"] = "BETTING ACCOUNT WILL BE READY LATER.  PLEASE TRY AGAIN LATER. (109)";
array_ch_error["109"] = "投注戶口將於稍後啟用，請稍後再試 (109)";

array_en_error["110"] = "PLEASE CALL 1818 (110)";
array_ch_error["110"] = "請致電1818 (110)";

array_en_error["111"] = "ANOTHER SESSION ALREADY LOGGED ON VIA ANOTHER DEVICE, PLEASE LOGOUT THIS SESSION (111)";
array_ch_error["111"] = "於其他裝置重複登入，請登出此環節(111)";

array_en_error["112"] = "DATA TRANSFER ERROR, PLEASE PERFORM LOG ON AGAIN (112)";
array_ch_error["112"] = "資料傳送錯誤，請重新登入 (112)";

array_en_error["113"] = "REGISTRATION IS UNSUCCESSFUL.  PLEASE CALL 1818 (113)";
array_ch_error["113"] = "此戶口不被註冊，請致電1818 (113)";

array_en_error["114"] = "REGISTRATION IS UNSUCCESSFUL.  PLEASE CALL 1818 (114)";
array_ch_error["114"] = "此戶口不被註冊，請致電1818 (114)";

array_en_error["115"] = "REGISTRATION IS UNSUCCESSFUL.  PLEASE CALL 1818 (115)";
array_ch_error["115"] = "此戶口不被註冊，請致電1818 (115)";

array_en_error["116"] = "REGISTRATION IS UNSUCCESSFUL.  PLEASE CALL 1818 (116)";
array_ch_error["116"] = "此戶口不被註冊，請致電1818 (116)";

array_en_error["117"] = "REGISTRATION IS UNSUCCESSFUL.  PLEASE CALL 1818 (117)";
array_ch_error["117"] = "此戶口不被註冊，請致電1818 (117)";

array_en_error["118"] = "REGISTRATION IS UNSUCCESSFUL.  PLEASE CALL 1818 (118)";
array_ch_error["118"] = "此戶口不被註冊，請致電1818 (118)";

array_en_error["119"] = "REGISTRATION IS UNSUCCESSFUL.  PLEASE CALL 1818 (119)";
array_ch_error["119"] = "此戶口不被註冊，請致電1818 (119)";

array_en_error["120"] = "THIS SESSION HAS BEEN DISCONNECTED.  PLEASE PERFORM LOG ON AGAIN";
array_ch_error["120"] = "此環節已被終止，請重新登入";
// ****************************** 150 *******************************************
array_en_error["155"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (155)";
array_ch_error["155"] = "服務未能提供，請致電1818 (155)";

array_en_error["156"] = "Transaction in progress, please wait a few moments and check \"Transaction Records\". (156)";
array_ch_error["156"] = "注項處理中，請稍後「複查已納入彩池及轉賬交易」。(156)";

array_en_error["159"] = "Status unknown. Please check \"Transaction Records\". (159)";
array_ch_error["159"] = "狀況不明, 請「複查已納入彩池及轉賬交易」。(159)";

array_en_error["161"] = "We're sorry but the system is very busy. Please use Telebet service (Racing/Mark Six:1883, Football:1889) to place your bets. (161)";
array_ch_error["161"] = "對不起！系統非常繁忙，請使用電話投注服務(賽馬/六合彩:1881,足球:1885)。祝您好運！ (161)";

array_en_error["164"] = "Your Betting Account cannot access this service. Please login through ewin.hkjc.com (164)";
array_ch_error["164"] = "閣下之投注戶口並不適用於此服務，請使用ewin.hkjc.com登入網上投注服務 (164)";

// ***************************** 200 **************************************
// *********************** Security Server Error **************************

array_en_error["201"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (201)";
array_ch_error["201"] = "服務未能提供，請致電1818 (201)";

array_en_error["202"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (202)";
array_ch_error["202"] = "服務未能提供，請致電1818 (202)";

array_en_error["203"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (203)";
array_ch_error["203"] = "服務未能提供，請致電1818 (203)";

array_en_error["204"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (204)";
array_ch_error["204"] = "服務未能提供，請致電1818 (204)";

array_en_error["205"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (205)";
array_ch_error["205"] = "服務未能提供，請致電1818 (205)";

array_en_error["206"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (206)";
array_ch_error["206"] = "服務未能提供，請致電1818 (206)";

array_en_error["207"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (207)";
array_ch_error["207"] = "服務未能提供，請致電1818 (207)";

array_en_error["208"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (208)";
array_ch_error["208"] = "服務未能提供，請致電1818 (208)";

array_en_error["209"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (209)";
array_ch_error["209"] = "服務未能提供，請致電1818 (209)";

array_en_error["210"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (210)";
array_ch_error["210"] = "服務未能提供，請致電1818 (210)";

array_en_error["211"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (211)";
array_ch_error["211"] = "服務未能提供，請致電1818 (211)";

array_en_error["212"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (212)";
array_ch_error["212"] = "服務未能提供，請致電1818 (212)";

array_en_error["213"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (213)";
array_ch_error["213"] = "服務未能提供，請致電1818 (213)";

array_en_error["214"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (214)";
array_ch_error["214"] = "服務未能提供，請致電1818 (214)";

array_en_error["215"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (215)";
array_ch_error["215"] = "服務未能提供，請致電1818 (215)";

array_en_error["216"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (216)";
array_ch_error["216"] = "服務未能提供，請致電1818 (216)";

array_en_error["217"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (217)";
array_ch_error["217"] = "服務未能提供，請致電1818 (217)";

array_en_error["218"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (218)";
array_ch_error["218"] = "服務未能提供，請致電1818 (218)";

array_en_error["219"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (219)";
array_ch_error["219"] = "服務未能提供，請致電1818 (219)";

array_en_error["220"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (220)";
array_ch_error["220"] = "服務未能提供，請致電1818 (220)";

array_en_error["221"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (221)";
array_ch_error["221"] = "服務未能提供，請致電1818 (221)";

array_en_error["222"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (222)";
array_ch_error["222"] = "服務未能提供，請致電1818 (222)";

array_en_error["223"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (223)";
array_ch_error["223"] = "服務未能提供，請致電1818 (223)";

array_en_error["224"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (224)";
array_ch_error["224"] = "服務未能提供，請致電1818 (224)";

array_en_error["225"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (225)";
array_ch_error["225"] = "服務未能提供，請致電1818 (225)";

array_en_error["226"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (226)";
array_ch_error["226"] = "服務未能提供，請致電1818 (226)";

array_en_error["227"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (227)";
array_ch_error["227"] = "服務未能提供，請致電1818 (227)";

array_en_error["228"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (228)";
array_ch_error["228"] = "服務未能提供，請致電1818 (228)";

array_en_error["229"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (229)";
array_ch_error["229"] = "服務未能提供，請致電1818 (229)";

array_en_error["230"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (230)";
array_ch_error["230"] = "服務未能提供，請致電1818 (230)";

array_en_error["231"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (231)";
array_ch_error["231"] = "服務未能提供，請致電1818 (231)";

array_en_error["232"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (232)";
array_ch_error["232"] = "服務未能提供，請致電1818 (232)";

array_en_error["233"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (233)";
array_ch_error["233"] = "服務未能提供，請致電1818 (233)";

array_en_error["234"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (234)";
array_ch_error["234"] = "服務未能提供，請致電1818 (234)";

array_en_error["235"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (235)";
array_ch_error["235"] = "服務未能提供，請致電1818 (235)";

array_en_error["236"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (236)";
array_ch_error["236"] = "服務未能提供，請致電1818 (236)";

array_en_error["237"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (237)";
array_ch_error["237"] = "服務未能提供，請致電1818 (237)";

array_en_error["238"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (238)";
array_ch_error["238"] = "服務未能提供，請致電1818 (238)";

array_en_error["239"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (239)";
array_ch_error["239"] = "服務未能提供，請致電1818 (239)";

array_en_error["240"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (240)";
array_ch_error["240"] = "服務未能提供，請致電1818 (240)";

array_en_error["241"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (241)";
array_ch_error["241"] = "服務未能提供，請致電1818 (241)";

array_en_error["242"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (242)";
array_ch_error["242"] = "服務未能提供，請致電1818 (242)";

array_en_error["245"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (245)";
array_ch_error["245"] = "服務未能提供，請致電1818 (245)";

array_en_error["251"] = "INCORRECT SECURITY KEY.  PLEASE SELECT CORRECT SECURITY KEY UNDER \"OTHER SERVICES\" (251)";
array_ch_error["251"] = "未能確認保安匙。請於「其他服務」選取正確的保安匙 (251)";

array_en_error["252"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (252)";
array_ch_error["252"] = "服務未能提供，請致電1818 (252)";

array_en_error["253"] = "INCORRECT SECURITY KEY.  PLEASE SELECT CORRECT SECURITY KEY UNDER \"OTHER SERVICES\" (253)";
array_ch_error["253"] = "未能確認保安匙。請於「其他服務」選取正確的保安匙 (253)";

array_en_error["254"] = "SERVICE INACCESSIBLE, PLEASE CALL 1818 (254)";
array_ch_error["254"] = "服務未能提供，請致電1818 (254)";

// ********************************** 280 ************************************
array_en_error["280"] = "INVALID HKID/PASSPORT NUMBER. PLEASE INPUT A VALID HKID/PASSPORT NUMBER (280)";
array_ch_error["280"] = "身份證/護照號碼核准錯誤，請輸入正確的身份證/護照號碼 (280)";

array_en_error["281"] = "UNKNOWN DIGITAL CERTIFICATE ISSUER, PLEASE RE-APPLY DIGITAL CERTIFICATE ISSUED BY HONG KONG POST OR DIGI SIGN. (281)";
array_ch_error["281"] = "數碼證書須由認可的核准機構簽發，請重新申請由香港郵政或Digi-Sign簽發的數碼證書 (281)";

array_en_error["282"] = "DIGITAL CERTIFICATE IS MAL-FORMED, PLEASE CHECK WITH YOUR DIGITAL CERTIFICATE ISSUER. (282)";
array_ch_error["282"] = "數碼證書核准錯誤，請與閣下的數碼證書核准機構聯絡 (282)";

array_en_error["283"] = "DIGITAL CERTIFICATE IS REVOKED, PLEASE CHECK WITH YOUR DIGITAL CERTIFICATE ISSUER. (283)";
array_ch_error["283"] = "數碼證書經已無效，請與數碼證書核准機構更新閣下的數碼證書 (283)";

array_en_error["284"] = "DIGITAL CERTIFICATE IS EXPIRED, PLEASE RENEW YOUR DIGITAL CERTIFICATE. (284)";
array_ch_error["284"] = "數碼證書經已過期，請與數碼證書核准機構更新閣下的數碼證書 (284)";

array_en_error["285"] = "DIGITAL CERTIFICATE IS NOT EFFECTIVE, PLEASE CHECK WITH YOUR DIGITAL CERTIFICATE ISSUER. (285)";
array_ch_error["285"] = "數碼證書未生效，請與數碼證書核准機構聯絡 (285)";

array_en_error["286"] = "INCORRECT HKID/PASSPORT NUMBER.  PLEASE INPUT A CORRECT HKID/PASSPORT NUMBER (286)";
array_ch_error["286"] = "身份證/護照號碼核准錯誤，請輸入正確的身份證/護照號碼 (286)";

array_en_error["287"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (287)";
array_ch_error["287"] = "服務未能提供，請致電1818 (287)";

// ***************************** 300 **************************************
// ****************** Application Server Error ****************************

array_en_error["300"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (300)";
array_ch_error["300"] = "服務未能提供，請致電1818 (300)";

array_en_error["301"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (301)";
array_ch_error["301"] = "服務未能提供，請致電1818 (301)";

array_en_error["302"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (302)";
array_ch_error["302"] = "服務未能提供，請致電1818 (302)";

array_en_error["303"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (303)";
array_ch_error["303"] = "服務未能提供，請致電1818 (303)";

array_en_error["304"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (304)";
array_ch_error["304"] = "服務未能提供，請致電1818 (304)";

array_en_error["305"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (305)";
array_ch_error["305"] = "服務未能提供，請致電1818 (305)";

array_en_error["306"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (306)";
array_ch_error["306"] = "服務未能提供，請致電1818 (306)";

array_en_error["307"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (307)";
array_ch_error["307"] = "服務未能提供，請致電1818 (307)";

array_en_error["308"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (308)";
array_ch_error["308"] = "服務未能提供，請致電1818 (308)";

array_en_error["309"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (309)";
array_ch_error["309"] = "服務未能提供，請致電1818 (309)";

array_en_error["310"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (310)";
array_ch_error["310"] = "服務未能提供，請致電1818 (310)";

array_en_error["311"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (311)";
array_ch_error["311"] = "服務未能提供，請致電1818 (311)";

array_en_error["312"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (312)";
array_ch_error["312"] = "服務未能提供，請致電1818 (312)";

array_en_error["313"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (313)";
array_ch_error["313"] = "服務未能提供，請致電1818 (313)";

array_en_error["315"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (315)";
array_ch_error["315"] = "服務未能提供，請致電1818 (315)";

array_en_error["317"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (317)";
array_ch_error["317"] = "服務未能提供，請致電1818 (317)";

array_en_error["318"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (318)";
array_ch_error["318"] = "服務未能提供，請致電1818 (318)";

array_en_error["319"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (319)";
array_ch_error["319"] = "服務未能提供，請致電1818 (319)";

array_en_error["320"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (320)";
array_ch_error["320"] = "服務未能提供，請致電1818 (320)";

array_en_error["321"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (321)";
array_ch_error["321"] = "服務未能提供，請致電1818 (321)";

array_en_error["323"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (323)";
array_ch_error["323"] = "服務未能提供，請致電1818 (323)";

array_en_error["340"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (340)";
array_ch_error["340"] = "服務未能提供，請致電1818 (340)";

array_en_error["341"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (341)";
array_ch_error["341"] = "服務未能提供，請致電1818 (341)";

array_en_error["342"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (342)";
array_ch_error["342"] = "服務未能提供，請致電1818 (342)";

array_en_error["343"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (343)";
array_ch_error["343"] = "服務未能提供，請致電1818 (343)";

array_en_error["350"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (350)";
array_ch_error["350"] = "服務未能提供，請致電1818 (350)";

array_en_error["351"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (351)";
array_ch_error["351"] = "服務未能提供，請致電1818 (351)";

array_en_error["352"] = "EFT SERVICE NOT AVAILABLE, PLEASE RETRY LATER (352)";
array_ch_error["352"] = "轉賬服務暫停,請稍後再試 (352)";

array_en_error["353"] = "EFT SERVICE NOT AVAILABLE, PLEASE RETRY LATER (353)";
array_ch_error["353"] = "轉賬服務暫停,請稍後再試 (353)";

array_en_error["354"] = "EFT SERVICE NOT AVAILABLE, PLEASE RETRY LATER (354)";
array_ch_error["354"] = "轉賬服務暫停,請稍後再試 (354)";

array_en_error["355"] = "EFT SERVICE NOT AVAILABLE, PLEASE RETRY LATER (355)";
array_ch_error["355"] = "轉賬服務暫停,請稍後再試 (355)";

array_en_error["356"] = "EFT SERVICE NOT AVAILABLE, PLEASE RETRY LATER (356)";
array_ch_error["356"] = "轉賬服務暫停,請稍後再試 (356)";

array_en_error["389"] = "THIS SESSION HAS BEEN DISCONNECTED. PLEASE PERFORM LOG ON AGAIN (389)";
array_ch_error["389"] = "此環節已被終止，請重新登入 (389)";

// ***************************** 400 **************************************
// LOGIN & EKBA RELATED

array_en_error["401"] = "Service Inaccessible. Please try again later. (401)";
array_ch_error["401"] = "服務未能提供，請稍候再試。(401)";

array_en_error["402"] = "Service Inaccessible. Please try again later. (402)";
array_ch_error["402"] = "服務未能提供，請稍候再試。(402)";

array_en_error["403"] = "Service Inaccessible. Please try again later. (403)";
array_ch_error["403"] = "服務未能提供，請稍候再試。(403)";

array_en_error["404"] = "Service Inaccessible. Please try again later. (404)";
array_ch_error["404"] = "服務未能提供，請稍候再試。(404)";

array_en_error["405"] = "Service Inaccessible. Please try again later. (405)";
array_ch_error["405"] = "服務未能提供，請稍候再試。(405)";

array_en_error["421"] = "Incorrect login information. Please re-enter the correct login name and password with 8-20 alphanumeric characters.";
array_ch_error["421"] = "登入資料不正確，請重新儲入正確的登入名稱及8-20位元包含英文字母及數字的密碼。";

array_en_error["422"] = "Incorrect login information. Please re-enter the correct login name and password with 8-20 alphanumeric characters.";
array_ch_error["422"] = "登入資料不正確，請重新儲入正確的登入名稱及8-20位元包含英文字母及數字的密碼。";

array_en_error["423"] = "Login access is locked.  Please unlock through the \"<a href='#' onclick='OnClickCannotLogin()'>Forget Password/Web Login Answers</a>\" function.";
array_ch_error["423"] = "登入權限已鎖。請透過「<a href='#' onclick='OnClickCannotLogin()'>忘記密碼/網上登入答案</a>」功能進行重設。";

array_en_error["425"] = "This Login Name is not associated with a Betting Account yet. Please click <a href='#' onclick='OnClickAssociteAccount()'>here</a> for change.";
array_ch_error["425"] = "此登入名稱並未連繫至投注戶口，請<a href='#' onclick='OnClickAssociteAccount()'>按此</a>更改。";

array_en_error["426"] = "You are not authorized to logon eWin in this website. Please proceed to <a href='#' onclick='top.location.href = \"http://eWin.hkjc.com\"'>eWin.hkjc.com</a> to logon to eWin service."
array_ch_error["426"] = "你並沒權限在此網站登入「投注區」，請到<a href='#' onclick='top.location.href = \"http://eWin.hkjc.com\"'>eWin.hkjc.com</a>重新登入。"

array_en_error["427"] = "Incorrect Login Answer. Please re-enter. If you have forgotten the answer, please click <a href='#' onclick='OnClickChgSecQuestion()'>here</a> to reset. [Attempt ### out of @@@]";
array_ch_error["427"] = "登入答案不正確，請重新儲入。如閣下已忘記登入答案，請<a href='#' onclick='OnClickChgSecQuestion()'>按此</a>重設。 [第 ### 次嘗試，共有 @@@ 次機會]";

array_en_error["428"] = "Login access is locked.  Please unlock through the \"<a href='#' onclick='OnClickCannotLogin()'>Forget Password/Web Login Answers</a>\" function.";
array_ch_error["428"] = "登入權限已鎖。請透過「<a href='#' onclick='OnClickCannotLogin()'>忘記密碼/登入答案</a>」功能進行重設。";

array_en_error["445"] = "ACCESS NOT PERMITTED.  PLEASE CALL 1818 (445)";
array_ch_error["445"] = "戶口不能使用，請致電1818 (445)";

array_en_error["451"] = "ACCESS NOT PERMITTED.  PLEASE CALL 1818 (451)";
array_ch_error["451"] = "戶口不能使用，請致電1818 (451)";

array_en_error["453"] = "Service Inaccessible. Please try again later. (453)";
array_ch_error["453"] = "服務未能提供，請稍候再試。(453)";

array_en_error["456"] = "Service Inaccessible. Please try again later. (456)";
array_ch_error["456"] = "服務未能提供，請稍候再試。(456)";

array_en_error["479"] = "Incorrect login information. Please re-enter the correct login name and password with 8-20 alphanumeric characters.";
array_ch_error["479"] = "登入資料不正確，請重新儲入正確的登入名稱及8-20位元包含英文字母及數字的密碼。";

array_en_error["484"] = "Service Inaccessible. Please try again later. (484)";
array_ch_error["484"] = "服務未能提供，請稍候再試。(484)";

array_en_error["485"] = "Service Inaccessible. Please try again later. (485)";
array_ch_error["485"] = "服務未能提供，請稍候再試。(485)";

array_en_error["499"] = "Service Inaccessible. Please try again later. (499)";
array_ch_error["499"] = "服務未能提供，請稍候再試。(499)";

// ***************************** 800 **************************************
// *********************** SSO Releated Error **************************
array_en_error["801"] = "Service Inaccessible. Please try again later. (801)";
array_ch_error["801"] = "服務未能提供，請稍候再試。(801)";

array_en_error["802"] = "Service Inaccessible. Please try again later. (802)";
array_ch_error["802"] = "服務未能提供，請稍候再試。(802)";

array_en_error["803"] = "Service Inaccessible. Please try again later. (803)";
array_ch_error["803"] = "服務未能提供，請稍候再試。(803)";

array_en_error["804"] = "Service Inaccessible. Please try again later. (804)";
array_ch_error["804"] = "服務未能提供，請稍候再試。(804)";

// ***************************** 900 **************************************
array_en_error["900"] = "SERVICE INACCESSIBLE.  PLEASE CALL 1818 (900)";
array_ch_error["900"] = "服務未能提供，請致電1818 (900)";

array_en_error["901"] = "Transaction status unknown,  please check Transaction Records (901)";
array_ch_error["901"] = "交易狀況不明，請複查注項 (901)";

// ***************************** 1000 **************************************

array_en_error["1001"] = "Invalid browser version. Please upgrade to Internet Explorer 6.0 or above. (1001)";
array_ch_error["1001"] = "瀏覽器版本不適用。請更新至Internet Explorer 6.0或以上版本。 (1001)";

array_en_error["1002"] = "Unable to run ActiveX Control. Please first modify your browser settings (1002)";
array_ch_error["1002"] = "未能啟動「ActiveX 控制」。請先更改瀏覽器設定。 (1002)";

// ***************************** 1100 **************************************

array_en_error["1101"] = "Available to logged-in users only. Please first login.";
array_ch_error["1101"] = "只適用於已登入的用戶，請先登入服務。";

array_en_error["1102"] = "You have successfully logged-on. For security reasons, you have been logged out from your other browser window(s).";
array_ch_error["1102"] = "閣下已成功登入「投注區」。為保安理由，其他登入之視窗 將被登出。";

// ***************************** 1200 **************************************

array_en_error["1201"] = "System is busy......";
array_ch_error["1201"] = "系統繁忙......";

array_en_error["1202"] = "Betting on selected bet type(s) is not available.";
array_ch_error["1202"] = "所選投注種類暫時不能接受投注。";

array_en_error["1203"] = "Selections are full. Please send bet first.";
array_ch_error["1203"] = "選擇已滿，請先傳送注項。";

array_en_error["1204"] = "Please add bet to slip first";
array_ch_error["1204"] = "請先儲入注項";

array_en_error["1205"] = "Selections are full. Please send bet first.";
array_ch_error["1205"] = "選擇已滿，請先傳送注項。";

array_en_error["1206"] = "Invalid amount input";
array_ch_error["1206"] = "投注金額錯誤";

array_en_error["1207"] = "Cannot accept more than 36 selections.";
array_ch_error["1207"] = "不接受多於36個選項。";

array_en_error["1208"] = "The entered \"Unit Bet\" amount exceed the allowed limit, please re-enter.";
array_ch_error["1208"] = "所儲入的\"每注金額\"超出限額，請重新儲入。";

// ***************************** 1300 **************************************

array_en_error["1301"] = "Unsent bets will be deleted after logoff. (1301)\r\nConfirm logoff?";
array_ch_error["1301"] = "登出後，未傳送之注項將被删除。 (1301)\r\n確定登出?";

array_en_error["1302A"] = "Your eWin security key is saved on this computer in the following location:";
array_ch_error["1302A"] = "你的「投注區」保安匙已儲存在此電腦的以下位置：";
array_en_error["1302B"] = "If you are currently using a public or shared PC, remember to delete your eWin security key after you logout.";
array_ch_error["1302B"] = "如你現正使用的電腦為公共或與他人共用的話，請緊記於登出「投注區」後刪除你的保安匙。";

array_en_error["1303"] = "Confirm to logout from eWin? (1303)";
array_ch_error["1303"] = "確定登出「投注區」？ (1303)";

array_en_error["1304"] = "Confirm to delete all bets? (1304)";
array_ch_error["1304"] = "確定删除所有注項？ (1304)";

// ***************************** 1400 **************************************

array_en_error["1401"] = "You must logoff before changing language selection. (1401)\r\nConfirm Logoff?";
array_ch_error["1401"] = "閣下須先登出戶口，才可切換語言。 (1401)\r\n確定登出?";

array_en_error["1402"] = "Unsent bets will be deleted after language change. (1402)\r\nConfirm Switch?";
array_ch_error["1402"] = "切換語言後，未傳送之注項將被删除。 (1402)\r\n確定繼續?";

array_en_error["Please click on a bet before delete."] = "Please click on a bet before delete.";
array_ch_error["Please click on a bet before delete."] = "請先點擊其中一條注項以作選擇，然後再按刪除。";

// ***************************** PPS message for Current Session Records ****************************

array_ch_name["lbl_pps_deposit"] = "繳費靈至投注戶口 (參考編號: ###DIGITAL_ORDER###)";
array_en_name["lbl_pps_deposit"] = "PPS to Betting Account (Ref No: ###DIGITAL_ORDER###)";

array_ch_name["lbl_pps_reject_msg"] = "繳費靈存款已被拒絕，請參考<a href='#' onclick='onClickOfficialPPSFAQ(@@@)'>常見問題</a>或致電 1818 查詢。(錯誤訊息：@@@)";
array_en_name["lbl_pps_reject_msg"] = "PPS Deposit has been rejected, please see <a href='#' onclick='onClickOfficialPPSFAQ(@@@)'>FAQ</a> for details or call 1818 (ERROR CODE: @@@)";

array_ch_name["lbl_pps_processing_msg"] = "此繳費靈存款交易正在處理中，請稍後再查閱。";
array_en_name["lbl_pps_processing_msg"] = "This PPS Deposit transaction is currently being processed, please check again later.";

array_en_error["602"] = "The daily PPS deposit amount limit has been exceeded.";
array_ch_error["602"] = "已超出繳費靈每日存款金額上限。";

array_en_error["606"] = "Sorry that the deposit instruction has not been accepted by PPS. Please refer to the <a href='#' onclick='onClickOfficialPPSFAQ(##resCode##)'>FAQ</a> at PPS website or call PPS hotline 2311 9876 for enquiry. (Reject code: ##resCode##)";
array_ch_error["606"] = "很抱歉，存款指示未被繳費靈接納，請參閱繳費靈網頁的<a href='#' onclick='onClickOfficialPPSFAQ(##resCode##)'>常見問題</a>或致電繳費靈熱線2311 9876查詢。 (取消編號: ##resCode##)";

array_en_error["607"] = "Sorry that the deposit instruction has not been accepted by PPS. Please refer to the <a href='#' onclick='onClickOfficialPPSFAQ(##resCode##)'>FAQ</a> at PPS website or call PPS hotline 2311 9876 for enquiry. (Reject code: ##resCode##)";
array_ch_error["607"] = "很抱歉，存款指示未被繳費靈接納，請參閱繳費靈網頁的<a href='#' onclick='onClickOfficialPPSFAQ(##resCode##)'>常見問題</a>或致電繳費靈熱線2311 9876查詢。 (取消編號: ##resCode##)";

array_en_error["608"] = "The maximum number of PPS deposit transactions per-day has been exceeded.";
array_ch_error["608"] = "已超出繳費靈每日存款次數上限。";

array_en_error["609"] = "The daily PPS deposit amount limit has been exceeded.";
array_ch_error["609"] = "已超出繳費靈每日存款金額上限。";

array_en_error["610"] = "Deposit instruction has been accepted by PPS. Since the transaction is under process, it has not been credited to your betting account at this moment. Please check the transaction again on the next business day. (610)";
array_ch_error["610"] = "存款指示已被繳費靈接納，因交易正在處理中，而暫時未能存至你的投注戶口。請於下一個工作天覆查交易紀錄。(610)";

array_en_error["612"] = "Transaction is already processed. (612)";
array_ch_error["612"] = "交易已被處理。 (612)";

array_en_error["613"] = "Deposit instruction has been accepted by PPS. The transaction is under process. Please check your betting account balance to confirm the transaction status later on. (613)";
array_ch_error["613"] = "存款指示已被繳費靈接納，交易正在處理中。請稍後覆查投注戶口結存以核實交易狀況。(613)";

array_en_name["615"] = "Transaction timed out. Please check your bank account to confirm the transaction status.<br>1) If transaction was successful, the funds will be credited to your Betting Account on the next day<br>2) If transaction was not successful, please retry";
array_ch_name["615"] = "交易超越時限。請核對你的銀行戶口確認交易是否被接納。<br>1） 如交易已被接納，款項將於明天存入你的投注戶口<br>2） 如交易不被接納，請重新再試。";

// ***************************** Duplicate HR Betline ****************************
array_en_error["duplicateHRBet"] = "Duplicate bet selection not accepted.  Please remove the duplicated bet(s) and send bet again.";
array_ch_error["duplicateHRBet"] = "不接受重複的投注，請刪除重複的投注及重新發送。";

array_en_name["Duplicate Bet"] = "Duplicate Bet";
array_ch_name["Duplicate Bet"] = "重複注項";

array_en_error["Please click on a bet before delete."] = "Please click on a bet before delete.";
array_ch_error["Please click on a bet before delete."] = "請先點擊其中一條注項以作選擇，然後再按刪除。";

array_en_error["safari_private_mode"] = "Please turn off the \"Private\" mode to proceed to Online Betting Service (eWin)";
array_ch_error["safari_private_mode"] = "請關掉「私密瀏覽」模式以繼續使用網上投注服務「投注區」";

// Personal Settings
//*************** ENG ************
array_en_name["lbl_per_setting"] = "Personal Settings";
array_en_name["lbl_unit_bet_hr"] = "Unit Bet (Horse)";
array_en_name["lbl_unit_bet_fb"] = "Unit Bet (Football)";
array_en_name["lbl_acct_info"] = "Account Information";
array_en_name["lbl_tb_acct_name"] = "Account Name";
array_en_name["lbl_tb_acct_bal"] = "Account Balance";
array_en_name["lbl_back_to_top"] = "Back to top";
array_en_name["lbl_display"] = "Show";
array_en_name["lbl_no_display"] = "Hide";
array_en_name["lbl_on"] = "On";
array_en_name["lbl_off"] = "Off";
array_en_name["lbl_notice"] = "All personalised settings are stored in this computer only. You will lose all personalised settings if you delete the browser cookies.";
array_en_name["lbl_input_err"] = "Invalid unit bet amount";
array_en_name["lbl_disp_lang"] = "Display Language";
array_en_name["lbl_english"] = "English";
array_en_name["lbl_tchinese"] = "Traditional Chinese";
array_en_name["lbl_pilot_only"] = "For pilot version only";
array_en_name["lbl_alup_setting"] = "All Up Setting";
array_en_name["lbl_after_add_alup"] = "When formulate All Up Combination";
array_en_name["lbl_alup_keep_single"] = "Keep individual betline";
array_en_name["lbl_alup_delete_single"] = "Delete individual betline";
array_en_name["lbl_m6drawno_title"] = "Mark Six Multiple Draw Setting";
array_en_name["lbl_m6drawno_content1"] = "Set Mark Six Multiple Draw to ";
array_en_name["lbl_m6drawno_content2"] = " , and apply to";
array_en_name["lbl_m6drawno_content3"] = "Self Select Single, Self Select Multiple, Self Select Banker and Quick Pick.";

// *************** CHT ************
array_ch_name["lbl_per_setting"] = "個人設定";
array_ch_name["lbl_unit_bet_hr"] = "每注投注額(賽馬)";
array_ch_name["lbl_unit_bet_fb"] = "每注投注額(足球)";
array_ch_name["lbl_acct_info"] = "戶口資料顯示";
array_ch_name["lbl_tb_acct_name"] = "投注戶口姓名";
array_ch_name["lbl_tb_acct_bal"] = "投注戶口結餘";
array_ch_name["lbl_back_to_top"] = "回到頁首";
array_ch_name["lbl_display"] = "顯示";
array_ch_name["lbl_no_display"] = "不顯示";
array_ch_name["lbl_on"] = "開啟";
array_ch_name["lbl_off"] = "關閉";
array_ch_name["lbl_notice"] = "你所設定的每注投注額只儲存在這台電腦。如你刪除瀏覽器內的cookies，你所設定的每注投注額將會失去。";
array_ch_name["lbl_input_err"] = "每注金額輸入錯誤";
array_ch_name["lbl_disp_lang"] = "顯示語言";
array_ch_name["lbl_english"] = "英文";
array_ch_name["lbl_tchinese"] = "繁體中文";
array_ch_name["lbl_pilot_only"] = "只供優先版使用";
array_ch_name["lbl_alup_setting"] = "過關設定";
array_ch_name["lbl_after_add_alup"] = "加入過關注項後";
array_ch_name["lbl_alup_keep_single"] = "保留單場注項";
array_ch_name["lbl_alup_delete_single"] = "刪除單場注項";
array_ch_name["lbl_m6drawno_title"] = "六合彩多期攪珠設定";
array_ch_name["lbl_m6drawno_content1"] = "設定六合彩多期攪珠為 ";
array_ch_name["lbl_m6drawno_content2"] = " 期，並同時應用於";
array_ch_name["lbl_m6drawno_content3"] = "自選單式、自選複式、自選膽拖及運財號碼。";


// Account Records
array_en_name["alt_ac_records"] = "Account Records";
array_ch_name["alt_ac_records"] = "戶口紀錄";

array_en_name["alt_30days_ac_records"] = "Past 30 days Account Records";
array_ch_name["alt_30days_ac_records"] = "過去30天戶口紀錄";

array_en_name["alt_60days_ac_records"] = "Past 60 days Account Records";
array_ch_name["alt_60days_ac_records"] = "過去60天戶口紀錄";

array_en_name["alt_cs_records"] = "Current Session Records";
array_ch_name["alt_cs_records"] = "是次交易紀錄";

array_en_name["alt_tran_records"] = "Transaction Records";
array_ch_name["alt_tran_records"] = "複查已納入彩池及轉賬交易";

array_en_name["alt_tran_range_note"] = "Choose a search period of # days or less within the past 30 days. (Based on Hong Kong Time)"
array_ch_name["alt_tran_range_note"] = "每次最多可搜尋過去30天內其中#天。 (以香港時間計算)"

array_en_name["alt_previous_page"] = "Previous";
array_ch_name["alt_previous_page"] = "上一頁";

array_en_name["alt_next_page"] = "Next";
array_ch_name["alt_next_page"] = "下一頁";

array_en_name["alt_search"] = "New Search";
array_ch_name["alt_search"] = "重新搜尋";

array_en_name["alt_print"] = "Print";
array_ch_name["alt_print"] = "列印";

array_en_name["alt_save"] = "Export";
array_ch_name["alt_save"] = "匯出檔案";

array_en_name["alt_close"] = "Close";
array_ch_name["alt_close"] = "關閉";

array_en_name["alt_download"] = "Download version for reference only";
array_ch_name["alt_download"] = "下載版只供參考";

array_en_name["alt_end"] = "- End -";
array_ch_name["alt_end"] = "- 完 -";

array_en_name["alt_cs_records_text1"] = "Current Session Records would be cleared after logging off.";
array_ch_name["alt_cs_records_text1"] = "複查是次登入之每項交易細節。客戶登出「投注區」後，此處紀錄亦將被清除。";

array_en_name["alt_cs_records_text2"] = "Please use <span onclick=\"location.href = 'recall.aspx'\" onmouseover=\"change_cursor_hand(this)\" onmouseout=\"change_cursor_default(this)\"><u>Transaction Record</u></span> function to confirm whether the transactions with status <b>Unknown</b> have been accepted.";
array_ch_name["alt_cs_records_text2"] = "*如 閣下發現狀況「<b>不明</b>」之交易紀錄，請按此查閱 <span onclick=\"location.href = 'recall.aspx'\"  onmouseover=\"change_cursor_hand(this)\" onmouseout=\"change_cursor_default(this)\"><u>複查已納入彩池及轉賬交易</u></span>。";

array_en_name["alt_no_cs_records"] = "No records in current session.";
array_ch_name["alt_no_cs_records"] = "是節未有交易紀錄。";

array_en_name["alt_year"] = "Year";
array_ch_name["alt_year"] = "年";

array_en_name["alt_month"] = "Month";
array_ch_name["alt_month"] = "月";

array_ch_name["alt_day"] = "日";
array_en_name["alt_day"] = "Day";

array_en_name["alt_transfer"] = "No";
array_ch_name["alt_transfer"] = "交易";

array_en_name["alt_amount"] = "Amount";
array_ch_name["alt_amount"] = "金額";

array_en_name["alt_log_status"] = "Status";
array_ch_name["alt_log_status"] = "狀況";

array_en_name["alt_transaction_details"] = "Transaction Details";
array_ch_name["alt_transaction_details"] = "細節";

array_en_name["alt_transaction_bet_type"] = "Bet Type";
array_ch_name["alt_transaction_bet_type"] = "投注類別";

array_en_name["alt_transaction_status"] = "Status";
array_ch_name["alt_transaction_status"] = "狀況";

array_en_name["alt_transaction_ref_no"] = "Ref No";
array_ch_name["alt_transaction_ref_no"] = "交易編號";

array_en_name["alt_account_no"] = "Betting Account No.: ";
array_ch_name["alt_account_no"] = "投注戶口號碼: ";

array_en_name["alt_balance"] = "Balance: ";
array_ch_name["alt_balance"] = "結餘: ";

array_en_name["alt_time_now"] = "Time: ";
array_ch_name["alt_time_now"] = "時間: ";

array_en_name["alt_today"] = "Today Activities";
array_ch_name["alt_today"] = "今日戶口紀錄";

array_en_name["alt_from"] = "From";
array_ch_name["alt_from"] = "由";

array_en_name["alt_to"] = "To";
array_ch_name["alt_to"] = "至";

array_en_name["alt_seek_last_day"] = "Last&nbsp;&nbsp;";
array_ch_name["alt_seek_last_day"] = "最&nbsp;&nbsp;近";

array_en_name["alt_seek_unit"] = "Days";
array_ch_name["alt_seek_unit"] = "日";

array_en_name["alt_transaction_type"] = "Transaction Type";
array_ch_name["alt_transaction_type"] = "交易種類";

array_en_name["alt_display_type"] = "Display Type";
array_ch_name["alt_display_type"] = "顯示種類";

array_en_name["alt_transaction_type_horse"] = "Horse Racing";
array_ch_name["alt_transaction_type_horse"] = "賽馬";

array_en_name["alt_transaction_type_sb"] = "Football";
array_ch_name["alt_transaction_type_sb"] = "足球";

array_en_name["alt_transaction_type_mk6"] = "Mark Six";
array_ch_name["alt_transaction_type_mk6"] = "六合彩";

array_en_name["alt_transaction_type_all"] = "All Betting Transactions";
array_ch_name["alt_transaction_type_all"] = "所有投注種類";

array_en_name["alt_transaction_type_autopay"] = "Autopay Deposit Record";
array_ch_name["alt_transaction_type_autopay"] = "自動轉賬存款紀錄";

array_en_name["alt_transaction_type_others"] = "Others";
array_ch_name["alt_transaction_type_others"] = "其他";

array_en_name["alt_display_type_all"] = "All";
array_ch_name["alt_display_type_all"] = "所有";

array_en_name["alt_display_type_dividend"] = "Transactions With Dividends/Refund/Rebate";
array_ch_name["alt_display_type_dividend"] = "已派彩/已退款/已回扣之交易";

array_en_name["alt_confirm"] = "Comfirm";
array_ch_name["alt_confirm"] = "確定";

array_en_name["alt_reset"] = "Reset";
array_ch_name["alt_reset"] = "重新搜尋";

array_en_name["alt_please_wait"] = "Please wait...";
array_ch_name["alt_please_wait"] = "請稍候...";

array_en_name["alt_acctstmt_ref_no"] = "Ref No";
array_ch_name["alt_acctstmt_ref_no"] = "交易編號";

array_en_name["alt_acctstmt_date_time"] = "Date/Time";
array_ch_name["alt_acctstmt_date_time"] = "日期/時間";

array_en_name["alt_acctstmt_race_day"] = "Race Day";
array_ch_name["alt_acctstmt_race_day"] = "賽事日";

array_en_name["alt_acctstmt_bet_type"] = "Bet Type";
array_ch_name["alt_acctstmt_bet_type"] = "投注類別";

array_en_name["alt_acctstmt_transaction_details"] = "Transaction Details";
array_ch_name["alt_acctstmt_transaction_details"] = "細節";

array_en_name["alt_acctstmt_receipt"] = "Receipt";
array_ch_name["alt_acctstmt_receipt"] = "收據";

array_en_name["alt_acctstmt_receipt_download"] = "Download";
array_ch_name["alt_acctstmt_receipt_download"] = "下載";

array_en_name["alt_acctstmt_debit"] = "Debit";
array_ch_name["alt_acctstmt_debit"] = "支出";

array_en_name["alt_acctstmt_credit"] = "Credit";
array_ch_name["alt_acctstmt_credit"] = "存入";

array_en_name["alt_acctstmt_autopay_records"] = "Autopay Deposit Records";
array_ch_name["alt_acctstmt_autopay_records"] = "自動轉賬存款紀錄";

array_en_name["alt_acctstmt_amount"] = "Amount";
array_ch_name["alt_acctstmt_amount"] = "金額";

array_en_name["alt_print_tip"] = 'Prints only transaction records displayed on this page. Press "Print" on the last page for the full list of records.';
array_ch_name["alt_print_tip"] = "只列印本頁所顯示的交易紀錄。如要列印全部紀錄，請到最後一頁按列印。";

array_en_name["alt_save_tip"] = 'Exports only transaction records displayed on this page. Press "Export" on the last page for the full list of records.';
array_ch_name["alt_save_tip"] = "只匯出本頁所顯示的交易紀錄。如要匯出全部紀錄，請到最後一頁按匯出檔案。";

array_en_name["alt_transaction_cancel"] = "(CANCELLED)";
array_ch_name["alt_transaction_cancel"] = "(交易取消)";

array_en_name["alt_overflow"] = "OVERFLOW";
array_ch_name["alt_overflow"] = "超額彩金";

array_en_name["alt_unsuccessful"] = "UNSUCCESSFUL";
array_ch_name["alt_unsuccessful"] = "交易失敗";

array_en_name["alt_recall_ref_no"] = "Ref No";
array_ch_name["alt_recall_ref_no"] = "交易編號";

array_en_name["alt_recall_bet_type"] = "Bet Type";
array_ch_name["alt_recall_bet_type"] = "投注類別";

array_en_name["alt_recall_transaction_details"] = "Transaction Details";
array_ch_name["alt_recall_transaction_details"] = "細節";

array_en_name["alt_recall_amount"] = "Amount";
array_ch_name["alt_recall_amount"] = "金額";

array_en_name["alt_cancel"] = "(CANCELLED)";
array_ch_name["alt_cancel"] = "(交易取消)";

array_en_name["ACCEPTED"] = "Accepted";
array_ch_name["ACCEPTED"] = "接納";

array_en_name["REJECTED"] = "Rejected";
array_ch_name["REJECTED"] = "未被接納";

array_en_name["UNKNOWN"] = "Unknown";
array_ch_name["UNKNOWN"] = "不明";

array_en_name["INPLAY_UNKNOWN"] = "Unknown";
array_ch_name["INPLAY_UNKNOWN"] = "不明";

array_en_name["CANCELLED"] = "CANCELLED";
array_ch_name["CANCELLED"] = "取消";

array_en_name["UNSUCCESSFUL"] = "UNSUCCESSFUL";
array_ch_name["UNSUCCESSFUL"] = "未成功";

array_en_name["TERMINATED"] = "TERMINATED";
array_ch_name["TERMINATED"] = "交易終止";

array_en_name["alt_page"] = "Page #";
array_ch_name["alt_page"] = "第#頁";

array_en_name["alt_last_page"] = " (Last page)";
array_ch_name["alt_last_page"] = " (最後一頁)";

array_en_name["max_payout"] = "Maximum  Payout: ";
array_ch_name["max_payout"] = "注項最高派彩: ";

array_ch_name["warning_day"] = "所選擇日期超過 # 日，請縮窄所選的日期為 # 日或少於 # 日，然後再試一次。";
array_en_name["warning_day"] = "The selected period is more than # days. Please select a date range that is no longer than # days and try again.";

array_en_name["alt_pic_record_help"] = "Betting A/C Records Demo";
array_ch_name["alt_pic_record_help"] = "戶口紀錄示範";

array_en_name["acctstmt_autopay_request_msg"] = "Autopay Deposit Instruction ##AMOUNT## sent to bank (Ref No. ##REF_NO##)";
array_ch_name["acctstmt_autopay_request_msg"] = "自動轉賬存款指令 ##AMOUNT## 已傳送至銀行 (參考編號: ##REF_NO##)";

array_en_name["acctstmt_autopay_accept_msg"] = "Autopay Deposit ##AMOUNT## successful (Ref No. ##REF_NO##)";
array_ch_name["acctstmt_autopay_accept_msg"] = "自動轉賬存款 ##AMOUNT## 接納 (參考編號: ##REF_NO##)";

array_en_name["acctstmt_autopay_reject_msg"] = "Autopay Deposit ##AMOUNT## unsuccessful (Reject Code: ##REJ_CODE## &nbsp;&nbsp;&nbsp; Ref No. ##REF_NO##)";
array_ch_name["acctstmt_autopay_reject_msg"] = "自動轉賬存款 ##AMOUNT## 未被接納 (取消編號: ##REJ_CODE## &nbsp;&nbsp;&nbsp; 參考編號: ##REF_NO##)";

array_en_name["acctstmt_autopay_pending_msg"] = "Autopay Deposit Instruction ##AMOUNT## sent to bank (Ref No. ##REF_NO##)";
array_ch_name["acctstmt_autopay_pending_msg"] = "自動轉賬存款指令 ##AMOUNT## 已傳送至銀行 (參考編號: ##REF_NO##)";

array_en_name["alt_cs_records_text1"] = "Current Session Records would be cleared after logging off.";
array_ch_name["alt_cs_records_text1"] = "複查是次登入之每項交易細節。客戶登出「投注區」後，此處紀錄亦將被清除。";

array_en_name["alt_cs_records_text2"] = "Please use <a onclick=\"reloadRecall()\">Transaction Record</a> function to confirm whether the transactions with status <strong>Unknown</strong> have been accepted.";
array_ch_name["alt_cs_records_text2"] = "*如 閣下發現狀況「<strong>不明</strong>」之交易紀錄，請按此查閱 <a onclick=\"reloadRecall()\">複查已納入彩池及轉賬交易</a>。";

array_en_name["alt_no_cs_records"] = "No records in current session.";
array_ch_name["alt_no_cs_records"] = "是節未有交易紀錄。";


// ***************************** Error Message **************************************
array_en_name["error_msg_invalid_session"] = "Invalid Session";
array_ch_name["error_msg_invalid_session"] = "此環節已被終止，請重新登入";

array_en_name["error_msg_389"] = "THIS SESSION HAS BEEN DISCONNECTED. PLEASE PERFORM LOG ON AGAIN. (389)";
array_ch_name["error_msg_389"] = "此環節已被終止，請重新登入。 (389)";

array_en_name["error_msg_103a"] = "ANOTHER SESSION ALREADY LOGGED ON, PLEASE LOGOUT THIS SESSION (103)";
array_ch_name["error_msg_103a"] = "重複登入，請登出此環節 (103)";

array_en_name["error_msg_103"] = "ANOTHER SESSION ALREADY LOGGED ON, PLEASE LOGOUT THIS SESSION (103)";
array_ch_name["error_msg_103"] = "重複登入，請登出此環節 (103)";

array_en_name["error_msg_112a"] = "DATA TRANSFER ERROR, PLEASE PERFORM LOG ON AGAIN (112)";
array_ch_name["error_msg_112a"] = "資料傳送錯誤，請重新登入 (112)";

array_en_name["error_msg_112"] = "DATA TRANSFER ERROR, PLEASE PERFORM LOG ON AGAIN (112)";
array_ch_name["error_msg_112"] = "資料傳送錯誤，請重新登入 (112)";

array_en_name["error_msg_system_not_ready"] = "This service is not available now. Please try again later.";
array_ch_name["error_msg_system_not_ready"] = "此服務暫時停用，請於稍後再試。";

array_en_name["error_msg_system_busy"] = "SYSTEM BUSY, PLS TRY LATER";
array_ch_name["error_msg_system_busy"] = "系統繁忙，請稍後再試";

array_en_name["date_period_exceed"] = "The selected period is more than # days. Please select a date range that is no longer than # days and try again.";
array_ch_name["date_period_exceed"] = "所選擇日期超過 # 日，請縮窄所選的日期為 # 日或少於 # 日，然後再試一次。";

array_en_name["export_not_support"] = "Your current browser does not support the “Export” function for Account Records. Please upgrade the browser for the utmost experience of using Online Betting Service (eWin).";
array_ch_name["export_not_support"] = "閣下現時使用之瀏覽器並不支援「戶口記錄」中的「匯出檔案」功能。請升級瀏覽器以享受「投注區」的最佳使用體驗。";