

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="robots" content="noindex" />
    <title></title>
</head>
<body>
<div id="container">
        <script type="text/javascript">
            var matchIDArr = new Array();
            var betValue = new Array();
            var nameValue = new Array();
            var oddsPushStatus = 'poll';
            var poolCloseTime = new Array();
            var poolSellValue = new Array();
            var isMatchFocus = true;
            var focusData = [{"descC":"歐霸盃","descE":"UE Cup","codeC":"FB2533","codeE":"FB2533","teamC":"舒列夫 Vs 曼聯","teamE":"Sheriff  Vs Manchester Utd","tvC":"FB2533 (FB2533)","tvE":"FB2533 (FB2533)","remark":""}];
            var footballLandingArray = ["Focus",
                                    
                                    "Betting Guide"];
            var footballLandingMenuId = ["footballFocus",
                                    
                                    "footballGuide"];
            var noOfFail = 0;

            $.when(
                $.getScript("/football/Lib/fbstr.js?lang=EN&CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/football/Lib/bet.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/football/Lib/mixallup.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/football/Lib/common.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/football/Lib/BasePage.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/football/Lib/Utilities.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/football/Lib/League.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/football/Lib/Match.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/football/Lib/AllOddsTable.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/football/Lib/MatchTable.js?CV=L4.01R0f_CRQ127268"),
                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () {
                pageName = "FOCUSMATCH";
                pools = "HAD";
                matches = "50005160";
                isInplay = false;

                if (matches == null || matches == "")
                    $('#focusMatchNoInfo').show();

                initPage();

                genSubMenu2('football');

                if (focusData.length > 0)
                   genFootballFocus('en');
                else
                   $('#footballLandingNoFocus').show();
            });
        </script>
        <div class="block_header">
            <a href="javascript:;" onclick="switchTo('football', 'index', 'EN');">
                <img src="/contentserver/jcbw/ekba/images/en/title_football.gif"
                    border="0" title="HKJC Football" /></a>
        </div>
        <div class="block_sytle">
            <div class="block_home_info">
                <div class="landingMenuTop">
                    <div id="footballLandingTab"></div>
                </div>
                <div class="landingMenuContent">
                    <div id="footballFocus">
                        <div class="landingNoFocus" id="footballLandingNoFocus" style="display:none">Sorry, no matches offered today, <br>please visit <a href="javascript:switchTo('football', 'index', curLang);" class="fb1">HKJC Football</a> for other football information.</div>
                    </div>

                    <div id="footballAnalysis" style="display: none;">
                    </div>

                    <div id="footballGuide" style="display: none;">
                        <ul>
                            <li><a href="//www.hkjc.com/english/betting/template_betting_rule_files/pdf/fb_rules_ch3.pdf" target="_blank" class="footballLink">Fixed Odds Football Bets</a></li>
                            <li><a href="//www.hkjc.com/english/betting/template_betting_rule_files/pdf/fb_rules_ch4.pdf" target="_blank" class="footballLink">Pari-Mutuel Football Bets</a></li>
                            <li><a href="javascript:;" onclick="window.open('//is.hkjc.com/football/info/EN/betting/bettypes_inplay.asp','_blank');" class="footballLink">In Play Betting</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="block_mid_fb">
                <div id="block_mid_sytle_fb">
                    <div class="landingMenuTABLE">
                        <div class="landingMenuTR">
                            <div class="landingMenuTD1">
                                <img src="/football/info/images/arrow.gif?CV=L4.01R0f_CRQ127268">
                            </div>
                            <div class="landingMenuTD2">
                                <a href="javascript:;" onclick="switchTo('football', 'odds/odds_had', 'EN');" class="content_menu">Odds</a>
                            </div>
                            <div class="landingMenuTD1">
                                <img src="/football/info/images/arrow.gif?CV=L4.01R0f_CRQ127268">
                            </div>
                            <div class="landingMenuTD2">
                                <a href="javascript:;" onclick="switchTo('football', 'results/results', 'EN');" class="content_menu">Results /<br/> Dividends</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="block_home_inc_fb">
                <div class="focusMatch">
                    <div class="rhead">
                        <div class="left">Match Express</div>
                        <div class="right">Home/Away/Draw</div>
                        <div class="clear"></div>
                    </div>
                    <div id="focusMatchContent">
                    </div>
                    <div id="focusMatchStoppedSell" style="display: none;">Sorry, Match Express has stopped selling.  Please click <a href="javascript:switchTo('football', 'index', curLang);" class='hyperlinktext'>here</a> for other bets or mote football information.</div>
                    <div id="focusMatchNotStartedSell" style="display: none;">Match Express is not available, see <a href="javascript:NewWindow('//special.hkjc.com/root/football/info/en/betting/bet_sellinghours.asp','',770,550,1,0)" class='hyperlinktext'>selling hours</a>.</div>
                    <div id="focusMatchNoInfo" style="display: none; text-align: center">Sorry the information is temporarily unavailable, please visit us later.</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
