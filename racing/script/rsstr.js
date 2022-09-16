var MAX_NO_OF_CWA_COMP = 4;
var enableBS = true;
var debugEnabled = false;
var allowOddsPush = false;
var oddsPushIconDisplay = false;
var jcewLang = 'English';
var jsonURL = '/racing/getJSON.aspx';
var obCoupleHeader = 'The grouping of the declared starters in this race as Couple:';
var obCoupleLbl = '(same owner)';
var pageRefreshRate = 5000;
var jsonReloadRate = 30000;
var jsPoolNotDefined = '<BR>The selected pool is not available for this race';
var jsCWANotDefined = '3 Pick 1 betting will be available at 17:45 on the pre-selling day of the next available race meeting.  In the meantime, please view other bet types.';
var jsCWINNotDefined = 'Betting has not yet started. Please come back later.';
var horseProfileUrl = '//racing.hkjc.com/racing/information/English/Horse/Horse.aspx?HorseNo=';
var jockeyProfileUrl = '//racing.hkjc.com/racing/information/English/Jockey/JockeyProfile.aspx?JockeyCode=';
var jockeyOtherUrl = '//racing.hkjc.com/racing/information/English/Jockey/JockeyRanking.aspx';
var trainerProfileUrl = '//racing.hkjc.com/racing/information/English/Trainers/TrainerProfile.aspx?TrainerCode=';
var trainerOtherUrl = '//racing.hkjc.com/racing/information/English/Trainers/TrainerRanking.aspx';
var jkcUserContent = '/contentserver/jcbw/jkc/jockey_en.aspx';
var tncUserContent = '/contentserver/jcbw/tnc/trainer_en.aspx';
var singleRacePool = 'WIN;PLA;QIN;QPL;IWN;CWA;CWB;CWC;FCT;TCE;TRI;F-F;QTT'.split(';');
var multiRacePool = 'DBL;TBL;D-T;T-T;6UP'.split(';');
var raceColorUrl = '/content/images/raceColor/';
var gearLbl = 'Gear';
var gearInfoLbl = 'Gear Details';
var scratchLbl = 'SCR';
var scratchLblEn = 'SCR';
var scratchLblCh = '退出';
var scratch2Lbl = 'SCR';
var reserveLbl = 'R';
var reserveLblEn = 'R';
var reserveLblCh = '備';
var shortPoolNames = {
    "ALUP": "ALUP",
    "WIN": "WIN",
    "PLA": "PLA",
    "W-P": "W-P",
    "QIN": "QIN",
    "QPL": "QPL",
    "QQP": "QQP",
    "FCT": "FCT",
    "TRI": "TRI",
    "D-T": "D-T",
    "T-T": "T-T",
    "DBL": "DBL",
    "TBL": "TBL",
    "TCE": "TCE",
    "6UP": "6UP",
    "F-F": "F-F",
    "JKC": "JKC",
    "TNC": "TNC",
    "QTT": "QTT",
    "CWA": "CWA",
    "CWB": "CWB",
    "CWC": "CWC",
    "IWN": "IWN",
    "QTT S": "QTT(Single)",
    "QTT M": "QTT(Multiple)",
    "QTT B": "QTT(B)",
    "QTT BM": "QTT(BM)",
    "QTT MB": "QTT(MB)",
    "TCE S": "TCE(Single)",
    "TCE M": "TCE(Multiple)",
    "TCE B": "TCE(B)",
    "TCE BM": "TCE(BM)",
    "TCE MB": "TCE(MB)",
    "FCT S": "FCT(Single)",
    "FCT M": "FCT(Multiple)",
    "FCT B": "FCT(B)",
    "FCT BM": "FCT(BM)",
    "FCT MB": "FCT(MB)"
};
var shortPoolNamesEn = {
    "ALUP": "ALUP",
    "WIN": "WIN",
    "PLA": "PLA",
    "W-P": "W-P",
    "QIN": "QIN",
    "QPL": "QPL",
    "QQP": "QQP",
    "FCT": "FCT",
    "TRI": "TRI",
    "D-T": "D-T",
    "T-T": "T-T",
    "DBL": "DBL",
    "TBL": "TBL",
    "TCE": "TCE",
    "6UP": "6UP",
    "F-F": "F-F",
    "JKC": "JKC",
    "TNC": "TNC",
    "QTT": "QTT",
    "CWA": "CWA",
    "CWB": "CWB",
    "CWC": "CWC",
    "IWN": "IWN",
    "QTT S": "QTT(Single)",
    "QTT M": "QTT(Multiple)",
    "QTT B": "QTT(B)",
    "QTT BM": "QTT(BM)",
    "QTT MB": "QTT(MB)",
    "TCE S": "TCE(Single)",
    "TCE M": "TCE(Multiple)",
    "TCE B": "TCE(B)",
    "TCE BM": "TCE(BM)",
    "TCE MB": "TCE(MB)",
    "FCT S": "FCT(Single)",
    "FCT M": "FCT(Multiple)",
    "FCT B": "FCT(B)",
    "FCT BM": "FCT(BM)",
    "FCT MB": "FCT(MB)"
};
var shortPoolNamesCh = {
    "ALUP": "過關",
    "WIN": "獨贏",
    "PLA": "位置",
    "W-P": "獨贏及位置",
    "QIN": "連贏",
    "QPL": "位置Q",
    "QQP": "連贏及位置Q",
    "FCT": "二重彩",
    "TRI": "單T",
    "D-T": "孖T",
    "T-T": "三T",
    "DBL": "孖寶",
    "TBL": "三寶",
    "TCE": "三重彩",
    "6UP": "六環彩",
    "F-F": "四連環",
    "JKC": "騎師王",
    "TNC": "練馬師王",
    "QTT": "四重彩",
    "CWA": "組合獨贏 CWA (3揀1)",
    "CWB": "組合獨贏 CWB (勝出練馬師)",
    "CWC": "組合獨贏 CWC (勝出地區)",
    "IWN": "保險獨贏",
    "QTT S": "四重彩(單式)",
    "QTT M": "四重彩(複式)",
    "QTT B": "四重彩(B)",
    "QTT BM": "四重彩(BM)",
    "QTT MB": "四重彩(MB)",
    "TCE S": "三重彩(單式)",
    "TCE M": "三重彩(複式)",
    "TCE B": "三重彩(B)",
    "TCE BM": "三重彩(BM)",
    "TCE MB": "三重彩(MB)",
    "FCT S": "二重彩(單式)",
    "FCT M": "二重彩(複式)",
    "FCT B": "二重彩(B)",
    "FCT BM": "二重彩(BM)",
    "FCT MB": "二重彩(MB)"
};
var longPoolNamesEn = {
    "ALUP": "All Up",
    "WIN": "Win",
    "PLA": "Place",
    "W-P": "Win & Place",
    "QIN": "Quinella",
    "QPL": "Quinella Place",
    "QQP": "Quinella & Quinella Place",
    "FCT": "Forecast",
    "TRI": "Trio",
    "D-T": "Double Trio",
    "T-T": "Triple Trio",
    "DBL": "Double",
    "TBL": "Treble",
    "TCE": "Tierce",
    "6UP": "Six Up",
    "F-F": "First 4",
    "JKC": "Jockey Challenge",
    "TNC": "Trainer Challenge",
    "QTT": "Quartet",
    "CWA": "Composite Win CWA (3 Pick 1)",
    "CWB": "Composite Win CWB (Winning Trainer)",
    "CWC": "Composite Win CWC (Winning Region)",
    "IWN": "Insurance Win",
    "QTT S": "Quartet Single",
    "QTT M": "Quartet Multiple",
    "QTT B": "Quartet Banker",
    "QTT BM": "Quartet Banker Multiple",
    "QTT MB": "Quartet Multi-Banker",
    "TCE S": "Tierce Single",
    "TCE M": "Tierce Multiple",
    "TCE B": "Tierce Banker",
    "TCE BM": "Tierce Banker Multiple",
    "TCE MB": "Tierce Multi-Banker",
    "FCT S": "Forecast Single",
    "FCT M": "Forecast Multiple",
    "FCT B": "Forecast Banker",
    "FCT BM": "Forecast Banker Multiple",
    "FCT MB": "Forecast Multi-Banker"
};
var longPoolNamesCh = {
    "ALUP": "過關",
    "WIN": "獨贏",
    "PLA": "位置",
    "W-P": "獨贏及位置",
    "QIN": "連贏",
    "QPL": "位置Q",
    "QQP": "連贏及位置Q",
    "FCT": "二重彩",
    "TRI": "單T",
    "D-T": "孖T",
    "T-T": "三T",
    "DBL": "孖寶",
    "TBL": "三寶",
    "TCE": "三重彩",
    "6UP": "六環彩",
    "F-F": "四連環",
    "JKC": "騎師王",
    "TNC": "練馬師王",
    "QTT": "四重彩",
    "CWA": "組合獨贏 CWA (3揀1)",
    "CWB": "組合獨贏 CWB (勝出練馬師)",
    "CWC": "組合獨贏 CWC (勝出地區)",
    "IWN": "保險獨贏",
    "QTT S": "四重彩 單式",
    "QTT M": "四重彩 複式",
    "QTT B": "四重彩 單式馬膽",
    "QTT BM": "四重彩 複式馬膽",
    "QTT MB": "四重彩 指定位置馬膽",
    "TCE S": "三重彩 單式",
    "TCE M": "三重彩 複式",
    "TCE B": "三重彩 單式馬膽",
    "TCE BM": "三重彩 複式馬膽",
    "TCE MB": "三重彩 指定位置馬膽",
    "FCT S": "二重彩 單式",
    "FCT M": "二重彩 複式",
    "FCT B": "二重彩 單式馬膽",
    "FCT BM": "二重彩 複式馬膽",
    "FCT MB": "二重彩 指定位置馬膽"
};
var poolFFLbl = 'First 4';
var poolQTTLbl = 'Quartet';
var poolTRILbl = 'Trio';
var poolTCELbl = 'Tierce';
var odHeaderLbl = 'Guide to Odds Change';
var hfLbl = 'Favourite';
var od20Lbl = 'Odds Drop by 20%';
var od50Lbl = 'Odds Drop by 50%';
var hfBg = '#C80000';
var hfFg = '#FFFFFF';
var od20Bg = '#2AA216';
var od20Fg = '#FFFFFF';
var od50Bg = '#993300';
var od50Fg = '#FFFFFF';
var invChartBarColor = '#777777';
var invChartHiLightBarColor = '#0000aa';
var invChartTextColor = '#333333';
var invChartTableBgColor = '#EEEEEE';
var singleRacePoolList = 'WIN;PLA;W-P;QIN;QPL;QQP;FCT S;FCT M;FCT B;FCT MB;FCT BM;TCE S;TCE M;TCE B;TCE MB;TCE BM;TRI;F-F;QTT S;QTT M;QTT B;QTT MB;QTT BM;CWA;CWB;CWC;IWN';
var jsWebcast = 'Live Racing Web TV';
var top20Lbl = 'Top 20';
var banker10Lbl = 'Banker Top 10';
var showAllOddsLbl = 'All';
var showInvLbl = 'Investment';
var theNthPageLbl = '&nbsp;Page #';
var prevLbl = 'Previous';
var nextLbl = 'Next';
var pos1stLbl = '1<sup>st</sup> Position';
var pos2ndLbl = '2<sup>nd</sup> Position';
var pos3rdLbl = '3<sup>rd</sup> Position';
var pos4thLbl = '4<sup>th</sup> Position';
var invGraphLbl = 'Investment Graph';
var lblMethodFCT = 'Forecast Method';
var lblPosS = 'Single';
var lblPosM = 'Multiple';
var lblPosB = 'Banker';
var lblPosBM = 'Banker Multiple';
var lblPosMB = 'Multi-Banker';
var _1stPlaceLbl = '1st';
var _2ndPlaceLbl = '2nd';
var _3rdPlaceLbl = '3rd';
var _4thPlaceLbl = '4th';
var _LegLbl = 'Sel.';
var _BankerLegLbl = 'Sel.';
var _1stBankerLbl = '1st';
var _2ndBankerLbl = '2nd';
var _3rdBankerLbl = '3rd';
var _4thBankerLbl = '4th';
var _1stBankerMBLbl = '1st';
var _2ndBankerMBLbl = '2nd';
var _3rdBankerMBLbl = '3rd';
var _4thBankerMBLbl = '4th';
var dbl1stLegLbl = '1st Leg';
var dbl2ndLegLbl = '2nd Leg';
var dt1stLegLbl = 'First Leg';
var dt2ndLegLbl = 'Second Leg';
var lblRefreshTime = 'Refresh at';
var lblRefresh = 'Refresh';
var cwinNotDefined = '3 Pick 1 betting will be available at 17:45 on the pre-selling day of the next available race meeting.  In the meantime, please view other bet types.';
var cwinNotExist = 'If your preferred runner is not in the composites, you can consider to bet on Win for the following horses:';
var startersIncludeLbl = 'Starters Included';
var oddsLbl = 'Odds';
var compSelLbl = 'Composite<br>Selection';
var winOddsLbl = 'Win Odds';
var partOfCwin = '* Part of Composite Win';
var horseDetailLbl = 'Horse Detail';
var cwResetLbl = '3 Pick 1 selections will be reset';
var cwAlupResetLbl = '3 Pick 1 All Up selections are not matched with All Up formula, please select again';
var cwAlupResetSelectedLbl = 'Selected All Up formula will be reset';
var cwAlupExceedsMax = 'Cannot select more than 6 levels';
var insuffSLbl = 'Insufficient selections for Race #.';
var insuffSLbl2 = 'Insufficient selections for Race #.';
var onePoolOnlyLbl = 'To compose an All Up bet, please select one pool type only.';
var tooManyBLbl = 'Too many bankers for Race #.';
var chooseOneJTLbl = 'Please choose Jockey and/or Trainer.';
var onePoolOnlyJTLbl = 'To compose an All Up bet, please select one pool type only for Race #.';
var invalidRacesJTLbl = 'To compose an All Up bet, please select pool type for 2 to 6 races!';
var insuffWarningLbl = 'Insufficient selections.';
var insuffWarning1Lbl = 'Insufficient selections for 1st Horse.';
var insuffWarning2Lbl = 'Insufficient selections for 2nd Horse.';
var insuffWarning3Lbl = 'Insufficient selections for 3rd Horse.';
var insuffWarning4Lbl = 'Insufficient selections for 4th Horse.';
var insuffBankerWarning1Lbl = 'Insufficient selections for 1st Banker.';
var insuffBankerWarning2Lbl = 'Insufficient selections for 2nd Banker.';
var insuffBankerWarning3Lbl = 'Insufficient selections for 3rd Banker.';
var insuffBankerWarning4Lbl = 'Insufficient selections for 4th Banker.';
var insuffMultiBankerWarning1Lbl = 'Insufficient selections for 1st Banker.';
var insuffMultiBankerWarning2Lbl = 'Insufficient selections for 2nd Banker.';
var insuffMultiBankerWarning3Lbl = 'Insufficient selections for 3rd Banker.';
var insuffMultiBankerWarning4Lbl = 'Insufficient selections for 4th Banker.';
var qpScrWarningLbl = 'Number of horse selection(s) does not match your Quick Pick combination.';
var calInvAmtLbl = 'Invalid / Nil bet amount input, please enter a valid bet amount.';
var only1BetAllowLbl = 'Only one betline is allowed';
var choosePoolLbl = 'Pool :';
var bankerLbl = 'Banker';
var selLegLbl = 'Sel.';
var selLbl = 'Sel.';
var raceNumLbl = 'Race';
var horseNumLbl = 'No.';
var horseColorLbl = 'Colour';
var horseNameLbl = 'Horse Name';
var barDrawLbl = 'Draw';
var handicapLbl = 'Wt.';
var jockeyLbl = 'Jockey';
var trainerLbl = 'Trainer';
var winLbl = 'Win';
var plaLbl = 'Place';
var wipLbl = 'Win & Place';
var pwinLbl = 'Progressive Win Odds';
var compositeLbl = 'Composite';
var compositeLblEn = 'Composite';
var compositeLblCh = '組合';
var winOddsLbl = 'Win Odds';
var horseDetailLbl = 'Horse Detail';
var poolNotDefinedLbl = '<BR>The selected pool is not available for this race';
var partOfCwinLbl = '* Part of Composite Win';
var chosenHorseLbl = 'Chosen Horse';
var spoilerHorseLbl = 'Spoiler Horse';
var chosenHorseLbl2 = 'Chosen<BR>Horse';
var spoilerHorseLbl2 = 'Spoiler*<BR>Horse';
var firstHorseLbl = '1<sup>st</sup> Horse';
var secondHorseLbl = '2<sup>nd</sup> Horse';
var labelField = 'Field';
var labelFieldEn = 'Field';
var labelFieldCh = '全餐';
var raceNoLongEn = 'Race #';
var raceNoLongCh = '第#場';
var withBankerEn = 'Banker with';
var withBankerCh = '拖';
var alupShort = 'All Up';
var alupLongEn = 'Racing All Up';
var alupLongCh = '賽馬過關';
var randGenLblEn = '(Random Generation)';
var randGenLblCh = '(運財號碼)';
var cwinName = 'Composite Win';
var cwinNameEn = 'Composite Win';
var cwinNameCh = '組合獨贏';
var odds_enquiry_enable = true;
var oesPreventPeriod = '30000';
var oesTimeout = '5000';
var oesJsonUrl = '//infoapi.hkjc.com/ida/rs-odds/v1/opGetSingleQTTOddsJsonP/JCBW';
var oesXmlUrl = '//infoapi.hkjc.com/ida/rs-odds/v1/opGetSingleQTTOdds/JCBW';
var jsPageNum_1 = '1';
var jsPageNum_2 = '2';
var jsPageNum_3 = '3';
var jsPageNum_4 = '4';
var jsPageNum_5 = '5';
var jsPageNum_6 = '6';
var jsPageNum_7 = '7';
var jsPageNum_8 = '8';
var jsPageNum_9 = '9';
var jsPageNum_10 = '10';
var jsPageNum_11 = '11';
var jsPageNum_12 = '12';
var jsPageNum_13 = '13';
var jsPageNum_14 = '14';
var jsPageNum_15 = '15';
var jsPageNum_16 = '16';
var jsPageNum_17 = '17';
var jsPageNum_18 = '18';
var jsPageNum_19 = '19';
var jsPageNum_20 = '20';
var jsPageNum_21 = '21';
var jsPageNum_22 = '22';
var jsPageNum_23 = '23';
var jsPageNum_24 = '24';
var jsPageNum_25 = '25';
var jsPageNum_26 = '26';
var jsPageNum_27 = '27';
var jsPageNum_28 = '28';
var jsPageNum_29 = '29';
var jsPageNum_30 = '30';
var jsPageNum_31 = '31';
var jsPageNum_32 = '32';
var jsPageNum_33 = '33';
var jsPageNum_34 = '34';
var jsPageNum_35 = '35';
var jsPageNum_36 = '36';
var jsPageNum_37 = '37';
var jsPageNum_38 = '38';
var jsPageNum_39 = '39';
var jsPageNum_40 = '40';
var jsMON = 'Monday';
var jsTUE = 'Tuesday';
var jsWED = 'Wednesday';
var jsTHU = 'Thursday';
var jsFRI = 'Friday';
var jsSAT = 'Saturday';
var jsSUN = 'Sunday';
var jsVenueST = 'Sha Tin';
var jsVenueHV = 'Happy Valley';
var jkcOtherDetailEnable = true;
var lblJockeyNum = 'Selection';
var lblJockeyName = 'Jockey';
var lblPtsJKC = 'JKC Points';
var lblPtsTNC = 'TNC Points';
var lblOpOdds = 'Opening Odds';
var lblPrevOdds = 'Previous Odds';
var lblScheduleRides = 'Scheduled Rides';
var lblRemainingRides = 'Remaining Sch. Rides';
var lblTNCEntries = 'Trainers’ Entries';
var lblTNCRemainingEntries = 'Remaining Entries';
var lblRfd = 'REFUND';
var lblLse = 'Out';
var lblOtherDetail = 'Details';
var lblOtherJockey = 'Other Jockeys';
var lblOtherTrainer = 'Other Trainers';
var lblOtherPoint = 'Points';
var lblRefOdds = 'Ref. Odds';
var lblCloseOdds = 'Closing Odds';
var lblCurOdds = 'Current Odds';
var lblJkcAllRaces = 'All Races';
var lblJkcAllRacesExcept1 = ', Except Race&nbsp;';
var lblJkcAllRacesExcept2 = '&nbsp;';
var lblJkcStartsell = 'In Play Betting is currently suspended';
var lblJkcStopsell = 'In Play Betting will stop-sell at the jump of Race #';
var lblJkcResume = 'In Play Betting is currently suspended';
var lblJkcExpiryTime = 'Expected Stop Selling Time';
var lblJkcNotAvail = 'Jockey Challenge betting has not yet started.  Please come back later.  In the meantime, please view other bet types.';
var lblJkcNormalStartsell = 'Start selling time:';
var lblTncNotAvail = 'Trainer Challenge betting has not yet started.  Please come back later.  In the meantime, please view other bet types.';
var lblStopSellJKC = 'Jockey Challenge {0} betting is currently suspended.';
var lblStopSellTNC = 'Trainer Challenge {0} betting is currently suspended.';
var lblSuspendJKC = 'Jockey Challenge {0} betting is currently suspended. A further announcement will be made shortly.';
var lblSuspendTNC = 'Trainer Challenge {0} betting is currently suspended. A further announcement will be made shortly.';
var lblStopSellInplayJKC = 'Jockey Challenge {0} In Play betting is currently suspended.';
var lblStopSellInplayTNC = 'Trainer Challenge {0} In Play betting is currently suspended.';
var lblSuspendInplayJKC = 'Jockey Challenge {0} In Play betting is currently suspended. A further announcement will be made shortly.';
var lblSuspendInplayTNC = 'Trainer Challenge {0} In Play betting is currently suspended. A further announcement will be made shortly.';
var lblPayoutJKC = 'Jockey Challenge {0} dividends are available now.';
var lblPayoutTNC = 'Trainer Challenge {0} dividends are available now.';
var lblRefundJKC = 'Jockey Challenge {0} is refunded.';
var lblRefundTNC = 'Trainer Challenge {0} is refunded.';
var lblResHeaderJKC = 'JKC ';
var lblResHeaderTNC = 'TNC ';
var lblRaceByRace = 'Race-by-race Update';
var lblFOShowPoint = 'Showing Points';
var lblFOResSub1 = 'Selection';
var lblFOResSub2JKC = 'Jockey';
var lblFOResSub2TNC = 'Trainer';
var lblFO1ST = '1st Horse';
var lblFO2ND = '2nd Horse';
var lblFO3RD = '3rd Horse';
var lblFO4TH = '4th Horse';
var lblFOResSub3JKC = 'JKC Points';
var lblFOResSub3TNC = 'TNC Points';
var lblFOResSub4 = 'Last Odds';
var lblFOResSub6 = 'Remarks';
var lblResNotesJKC = 'Substitute Jockeys riding non-scheduled rides are not eligible for Jockey Challenge Points.';
var lblResNotesTNC = ' ';
var lblDHRemarks = '* Dead-heat';
var lblFOResCountPoints = 'Count (Points)';
var lblFOResCountOnly = 'Count';
var lblTP = 'T/P';
var lblWeight = 'Body Wt.';
var lblRating = 'Rtg.';
var lblLast6Run = 'Last 6 Runs';
var lblReserveHorse = 'Reserve Starter';
var lblStandbyHorse = 'Standby Horse';
var lblTPRef = 'Ref:';
var lblTPRefDetail0 = 'T/P: ';
var lblTPRefDetail1 = 'Trump Card';
var lblTPRefDetail2 = 'Horse(s) with priority to run';
var lblTPRefDetail3 = 'P - Order of Trainer Preference';
var lblJTCNoResult = 'No Information.';
var lblTriJackpot = 'Tierce and Trio&nbsp;Jackpot';
var lblCalReset = 'Reset';
var lblAlupFormula = 'All Up Formula';
var lblOtherAlupFormula = 'Others';
var lblSelectedAlupFormula = 'Selected All Up formula: ';
var lblCalClickToOpen = 'Click to expand / collapse';
var lblCalHeader = 'Investment Calculator';
var lblCalChance = 'No. of Bets';
var lblCalUnitbet = 'Unit Bet';
var lblCalTotalbet = 'Total Amount';
var lblCalFlexibetAlt = '&quot;Flexi Bet&quot; - specify a total bet amount for the betline';
var lblCalEnterFlexibet = 'Betline $';
var lblCalUnitbetAlt = 'Unit Bet - specify a unit bet amount for each bet combination';
var lblCalEnterUnitbet = 'Unit Bet $';
var lblCalCalculate = 'Calculate';