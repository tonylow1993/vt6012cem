

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title></title>
    <meta charset="utf-8"/>
    <meta name="robots" content="noindex" />
</head>
<body>
<div id="container">
        <script type="text/javascript">
            var infoLang = 'en';
            var racePostTime = ''.split('@@@');  
            var racingLandingArray = ["<span style='display:inline-block;vertical-align:middle'>General<br>Info</span>",
                            "<span style='display:inline-block;vertical-align:middle'>&nbsp;<br>Pool Info</span>",
                            "<span style='display:inline-block;vertical-align:middle'>&nbsp;<br>Changes</span>",
                            "<span style='display:inline-block;vertical-align:middle'>Betting<br>Guide</span>"];
            var racingLandingMenuId = ["racingGenInfo", "racingPoolInfo", "racingChanges", "racingGuide"];

            $.when(
                $.getScript("/racing/script/rsdata.js?lang=en&date=2022-09-18&venue=ST&CV=L4.01R0f_CRQ127268"),
                $.getScript("/racing/script/rsstr.js?lang=en&CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/racing/script/racingCommon.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/racing/script/racingComponent.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/racing/script/randomGen.js?CV=L4.01R0f_CRQ127268"),
                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () {
                genSubMenu2('racing');
                initTT();
            });
        </script>
		<div class="block_header">
		    <a href="javascript:;" onClick="switchTo('racing', 'index', 'en');">
		        <img src="/contentserver/jcbw/ekba/images/en/title_racing.gif" title="Racing"/>
	        </a>
	    </div>
		<div class="block_sytle">
			<div class="block_home_info">
                <div class="landingMenuTop">
                    <div id="racingLandingTab"></div>
                </div>
                <div class="landingMenuContent">
                    <div id="racingGenInfo"><div class="racingGenInfoTable"><div class="racingGenInfoTR"><div class="racingGenInfoTD1">Race Meeting:&nbsp;</div><div class="racingGenInfoTD2">18/09/2022 (Sun)</div></div><div class="racingGenInfoTR"><div class="racingGenInfoTD1">Sha Tin Day Race:</div><div class="racingGenInfoTD2">10&nbsp;Races</div></div><div class="racingGenInfoTR"><div class="racingGenInfoTD1">Meeting Start Time:</div><div class="racingGenInfoTD2">13:00</div></div></div><div>ALL WEATHER TRACK</div><div class="racingGenInfoTable"></div></div>

                    <div id="racingPoolInfo" style="display: none;"><div style="padding:5px 0px 2px 0px">Race Meeting: 18/09/2022 (SUN)</div><div class="racingPoolInfoTable"><div class="racingPoolInfoTR"><div class="racingPoolInfoTD1 racingPoolBorder">Pool</div><div class="racingPoolInfoTD2 racingPoolBorder">Est. Dividend</div></div><div class="racingPoolInfoTR"><div class="racingPoolInfoTD1">Triple Trio</div><div class="racingPoolInfoTD2 red">$2,000,000</div></div><div class="racingPoolInfoTR"><div class="racingPoolInfoTD1">Six Win Bonus</div><div class="racingPoolInfoTD2 red">$13,000,000</div></div><div class="racingPoolInfoTR"><div class="racingPoolInfoTD1">1st&nbsp;Double Trio</div><div class="racingPoolInfoTD2 red">$2,000,000</div></div><div class="racingPoolInfoTR"><div class="racingPoolInfoTD1">2nd&nbsp;Double Trio</div><div class="racingPoolInfoTD2 red">$2,000,000</div></div><div class="racingPoolInfoTR"><div class="racingPoolInfoTD1">3rd&nbsp;Double Trio</div><div class="racingPoolInfoTD2 red">$2,000,000</div></div></div></div>

                    <div id="racingChanges" style="display: none;"><div style="padding:5px 0px 0px 0px;text-align:center">No Changes.</div></table></div>

                    <div id="racingGuide" style="display: none;">
                        <ul>
                            <li><a href="javascript:;" onClick="window.open('//special.hkjc.com/root2/racing/info/en/betting/guide_qualifications_pari.asp','_blank');" class="racingLink">Pari-Mutuel Pools</a></li>
                            <li><a href="javascript:;" onClick="window.open('//special.hkjc.com/root2/racing/info/en/betting/guide_qualifications_fixed.asp','_blank');" class="racingLink">Fixed Odds Bet Types</a></li>
                            <li><a href="javascript:;" onClick="window.open('//special.hkjc.com/root2/racing/info/en/betting/guide_rebate.asp','_blank');" class="racingLink">Rebate</a></li>
                        </ul>
                        <div style="text-align:right"><a href="javascript:;" onClick="window.open('//special.hkjc.com/racing/info/en/betting/guide.asp','_blank');" class="racingLink">More</a></div>
                    </div>
                </div>
			</div>
			<div id="block_mid_hr" >
				<div id="block_mid_sytle_hr" >
                    <div class="landingMenuTABLE">
                        <div class="landingMenuTR">
                            <div class="landingMenuTD1">
                                <img src="/racing/info/images/arrow.gif?CV=L4.01R0f_CRQ127268">
                            </div>
                            <div class="landingMenuTD2">
                                <a href="//racing.hkjc.com/racing/info/meeting/Racecard/English/Local" target="_blank" class="content_menu">Race Card</a>
                            </div>
                            <div class="landingMenuTD1">
                                <img src="/racing/info/images/arrow.gif?CV=L4.01R0f_CRQ127268">
                            </div>
                            <div class="landingMenuTD2">
                                <a href="javascript:;" onclick="switchTo('racing', 'pages/odds_wp', 'en');" class="content_menu">Odds</a>
                            </div>
                            <div class="landingMenuTD1">
                                <img src="/racing/info/images/arrow.gif?CV=L4.01R0f_CRQ127268">
                            </div>
                            <div class="landingMenuTD2">
                                <a href="//racing.hkjc.com/racing/information/english/Racing/LocalResults.aspx" target="_blank" class="content_menu">Results /<br>Dividends </a>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
			<div id="block_home_inc_hr">
				
<div class="ttRanTable">
    <div class="ttRanBody" id="ttRanBody" style="display:none">
        <div class="rhead">
            <div class="left">T-T Quick Pick</div>
            <div class="right">18/09/2022 (Sun)</div>
            <div class="clear"></div>
        </div>
	    
    </div>
    <div class="ttRanMsg" id="ttRanMsg" style="display:none">Sorry, selling of T-T has not started yet, please see <a href="javascript:window.open('//special.hkjc.com/infomenu/en/channel/hour.asp?level2=ewin&level3=hour','','width=770,height=550,left=20,top=20,scrollbars=yes');void(0);" style="color:#004b96">service hours</a>.</div>
    <div class="rangenButton" id="ttRanBtn" style="display:none">
        <div class="addBet" id="ttRanAddBet" title="Add To Slip" onclick="processBet('betslip')"></div>
        <div class="rangenRetry" title="Retry" onclick="randomBets();"></div>
        <div class="clear"></div>
    </div>
</div>


<script type="text/javascript">
var isTTSelling = false;
var landingTTSels = [];
var ttBetCnt = 2;

function initTT() {
    if (!isTTSelling) {
        $('#ttRanMsg').show();
        return;
    }
    var tmpLegs = multiRacePoolsStr['T-T'];
    if (tmpLegs != null && tmpLegs.length > 0) {
        raceLegInt = tmpLegs[0].map(Number);
        randomBets();
    }
    else {
        $('#ttRanMsg').show();
    }
}

function randomBets() {
    $('#ttRanBody').show();
    $('#ttRanBtn').show();
    $('#ttRanAddBet').show();
    $('#ttRanMsg').hide();
    landingTTSels = [];
    for (var i = 0; i < ttBetCnt; i++ ) {
        randomBet(i);
    }
}

function randomBet(i) {
    landingTTSels.push([]);
    var r = randomLeg(raceLegInt[0], 3);
    setTTHTML('bet' + i + '1', r);
    landingTTSels[i].push(r);
    r = randomLeg(raceLegInt[1], 3);
    setTTHTML('bet' + i + '2', r);
    landingTTSels[i].push(r);
    r = randomLeg(raceLegInt[2], 3);
    setTTHTML('bet' + i + '3', r);
    landingTTSels[i].push(r);
}

function setTTHTML(eId, r) {
    var tmp = [];
    for (var idx in r) {
        if (r[idx])
            tmp.push(idx.replace('P', ''));
    }
    $('#' + eId).html(tmp.join('+'));
}

function processBet() {
    if (isQRPortal) {
        //betline: ST SUN T-T 4*R1
        var noOfSelections = 1;
        var tmpBetline = venueShort + " " + dayShort + " T-T " + raceLegInt[0] + "*R" + noOfSelections;
        var randomContentLong = '3 selections for all legs';
        var betLineLong = venueLongEn + ' ' + dayLongEn + '<BR>' + longPoolNamesEn["T-T"] + '<BR>' + raceNoLongEn.replace('#', raceLegInt[0]) + '<BR>Quick Pick: ' + randomContentLong;
        return addSelEx(tmpBetline, betLineLong, '', '', 'HR', racePostTime[raceLegInt[0]], racePostTime[raceLegInt[0]], '');
    } else {
        var line = [];
        ranGenFlag = true;
        for (var i = 0; i < ttBetCnt; i++) {
            var betObjArr = [];
            var sels = { lArr: landingTTSels[i][0] };
            var betObj = addHRBetObj('T-T', '', raceLegInt[0], sels, 10, false);
            betObjArr.push(betObj);

            sels = { lArr: landingTTSels[i][1] };
            betObj = addHRBetObj('T-T', '', raceLegInt[1], sels, 10, false);
            betObjArr.push(betObj);

            sels = { lArr: landingTTSels[i][2] };
            betObj = addHRBetObj('T-T', '', raceLegInt[2], sels, 10, false);
            betObjArr.push(betObj);

            betObj = combineMultiLegBet(betObjArr);
            line.push(betObj);
        }
        if (ttBetCnt > 1)
            line[0].pools2 = line[1].pools;
        useCalculator = false;
        addSelExFO(line[0]);
        $('#ttRanBody').hide();
        $('#ttRanAddBet').hide();
        $('#ttRanMsg').show();
        ranGenFlag = false;
        landingTTSels = [];
    }
}
</script>
			</div>			
		</div>
	</div>
</body>
</html>